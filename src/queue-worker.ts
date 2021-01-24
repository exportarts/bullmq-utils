import { Job, Processor, Worker, WorkerOptions } from 'bullmq';
import { DefaultLogger, Logger } from './logger';
import { queueBaseOptions } from './queue-options';

export abstract class QueueWorker<QueueName extends string> {

    protected readonly logger: Logger

    private readonly worker: Worker;

    constructor(
        queueName: QueueName,
        processor: Processor,
        logger?: Logger,
        workerOptions?: WorkerOptions,
    ) {
        if (!logger) {
            this.logger = new DefaultLogger(this.constructor.name);
        }
        if (!workerOptions?.concurrency || workerOptions?.concurrency === 1) {
            this.logger.warn(`Setting the concurrency to a low number can cause dead-lock situations!`);
        }

        this.worker = new Worker(queueName, processor, {
            ...queueBaseOptions(),
            ...workerOptions
        });
    }

    protected reportMissingProcessHandler(job: Job) {
        const message = `[${job.id}] Missing process handler for job "${job.name}"`;
        this.logger.error(message);
        throw new Error(message);
    }

}
