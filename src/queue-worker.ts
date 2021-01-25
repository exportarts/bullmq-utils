import { Job, Processor, Queue, Worker, WorkerOptions } from 'bullmq';
import { Duration } from 'luxon';
import { DefaultLogger, Logger } from './logger';
import { getJobStatus, isCleanUpJob, JobStatus, JobStatusCleanUpOptions } from './queue-cleanup';
import { queueBaseOptions } from './queue-options';
import { TaskProcessorLogger } from './task-processor.logger';

interface QueueWorkerOptions {
    logger?: Logger;
    workerOptions?: WorkerOptions;
}

export abstract class QueueWorker<QueueName extends string> {

    protected readonly logger: Logger;
    private readonly taskProcessorLogger: TaskProcessorLogger;

    private readonly worker: Worker;
    private readonly queue: Queue;

    constructor(
        queueName: QueueName,
        processor: Processor,
        options?: QueueWorkerOptions
    ) {
        this.logger = options?.logger || new DefaultLogger(this.constructor.name);
        this.taskProcessorLogger = new TaskProcessorLogger(this.logger);
        if (!options?.workerOptions?.concurrency || options?.workerOptions?.concurrency === 1) {
            this.logger.warn(`Setting the concurrency to a low number can cause dead-lock situations!`);
        }

        const wrappedProcessor = this.makeWrappedProcessor(processor, queueName);
        this.worker = new Worker(queueName, wrappedProcessor, {
            ...queueBaseOptions(),
            ...options?.workerOptions || {}
        });
        this.queue = new Queue(queueName, queueBaseOptions());
    }

    private makeWrappedProcessor(processor: Processor, queueName: string): Processor {
        return (job: Job<JobStatusCleanUpOptions>) => {
            if (isCleanUpJob(job, queueName)) {
                const status = getJobStatus(job);
                return this.deleteOldJobs(status, job);
            }

            return processor(job);
        };
    }

    private async deleteOldJobs(status: JobStatus, job: Job<JobStatusCleanUpOptions>) {
        this.taskProcessorLogger.start(job);
        const threshold = Duration.fromObject(job.data.threshold).as('milliseconds');
        const jobs = await this.queue.getJobs(status);
        const jobsToDelete = jobs.filter(job => (Date.now() - job.finishedOn) > threshold);
        
        if (jobsToDelete.length > 0) {
            this.taskProcessorLogger.verbose(job, `${jobsToDelete.length}/${jobs.length} in status "${status}" will be deleted.`);
            await this.queue.clean(threshold, job.data.limit, status);
            this.taskProcessorLogger.end(job);
        } else {
            this.taskProcessorLogger.end(job, undefined, `No jobs to delete in status "${status}".`);
        }
    }

    protected reportMissingProcessHandler(job: Job) {
        const message = `Missing process handler for job "${job.name}"`;
        this.taskProcessorLogger.error(job, message);
        throw new Error(message);
    }

}
