import { Job, JobsOptions, Queue, QueueOptions, QueueScheduler, QueueSchedulerOptions, RepeatOptions } from 'bullmq';
import cronstrue from 'cronstrue';
import { DefaultLogger, Logger } from './logger';
import { defaultQueueCleanUpOptions, isJobStatus, queueCleanUpJobName, QueueCleanUpOptions } from './queue-cleanup';
import { queueBaseOptions } from './queue-options';

interface QueueManagerCronOptions {
    pattern: string;
    payload?: any;
}

export abstract class QueueManager<QueueName extends string, TaskNameEnum extends string> {

    private readonly logger: Logger;

    readonly queue: Queue;
    /**
     * The scheduler handles stalled and delayed jobs
     * and re-schedules them accordingly.
     * 
     * @see https://docs.bullmq.io/guide/queuescheduler
     */
    private readonly scheduler: QueueScheduler;

    constructor(
        queueName: QueueName,
        logger?: Logger,
        scheduleCronJobs?: Partial<Record<TaskNameEnum, QueueManagerCronOptions>>,
        queueOptions?: QueueOptions,
        schedulerOptions?: QueueSchedulerOptions,
        cleanUpOptions = defaultQueueCleanUpOptions
    ) {
        this.logger = logger || new DefaultLogger(this.constructor.name);
        this.queue = new Queue(queueName, {
            ...queueBaseOptions(),
            ...queueOptions
        });
        this.scheduler = new QueueScheduler(queueName, {
            ...queueBaseOptions(),
            ...schedulerOptions
        });
        this.createRepeatableJobs(scheduleCronJobs);
        this.createCleanUpJobs(queueName, cleanUpOptions);
    }

    async add<T = any, R = any>(name: TaskNameEnum, data?: any, options?: JobsOptions): Promise<Job<T, R>> {
        return this.queue.add(name, data, options);
    }

    private async createCleanUpJobs(queueName: string, options: QueueCleanUpOptions) {
        for (const key in options) {
            if (isJobStatus(key)) {
                const name = queueCleanUpJobName(queueName, key);
                await this.scheduleCronJob(name, { cron: options.cronSchedule }, options[key]);
            }
        }
    }

    private async createRepeatableJobs(jobs: Partial<Record<TaskNameEnum, QueueManagerCronOptions>>) {
        for (const jobName in jobs) {
            const cron = jobs[jobName].pattern;
            await this.scheduleCronJob(jobName, { cron }, jobs[jobName].payload);
        }
    }

    private async scheduleCronJob(name: string, options: RepeatOptions, payload?: any) {
        await this.add(name as TaskNameEnum, payload, options);
        this.logger.log(`Cron-Job ${name} has been scheduled with pattern ${options.cron} (${this.printCronPattern(options.cron)}).`);
    }

    private printCronPattern(pattern: string): string {
        return cronstrue.toString(pattern, {
            use24HourTimeFormat: true
        });
    }

}
