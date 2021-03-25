import { Job, JobsOptions, Queue, QueueOptions, QueueScheduler, QueueSchedulerOptions, RepeatOptions } from 'bullmq';
import cronstrue from 'cronstrue';
import { DefaultLogger, Logger } from './logger';
import { defaultQueueCleanUpOptions, isJobStatus, queueCleanUpJobName, QueueCleanUpOptions } from './queue-cleanup';
import { queueBaseOptions } from './queue-options';

interface QueueManagerCronOptions {
    pattern: string;
    payload?: any;
}

interface QueueManagerOptions<TaskNameEnum extends string> {
    logger?: Logger;
    scheduleCronJobs?: Partial<Record<TaskNameEnum, QueueManagerCronOptions>>;
    queueOptions?: QueueOptions;
    schedulerOptions?: QueueSchedulerOptions;
    cleanUpOptions?: QueueCleanUpOptions;
}

export abstract class QueueManager<QueueName extends string, TaskNameEnum extends string> {

    protected readonly logger: Logger;

    readonly queue: Queue;
    /**
     * The scheduler handles stalled and delayed jobs
     * and re-schedules them accordingly.
     * 
     * @see https://docs.bullmq.io/guide/queuescheduler
     */
    protected readonly scheduler: QueueScheduler;

    constructor(
        queueName: QueueName,
        options?: QueueManagerOptions<TaskNameEnum>
    ) {
        this.logger = options?.logger || new DefaultLogger(this.constructor.name);
        this.queue = new Queue(queueName, {
            ...queueBaseOptions(),
            ...options?.queueOptions || {}
        });
        this.scheduler = new QueueScheduler(queueName, {
            ...queueBaseOptions(),
            ...options?.schedulerOptions || {}
        });
        this.createRepeatableJobs(options?.scheduleCronJobs);
        this.createCleanUpJobs(queueName, options?.cleanUpOptions || defaultQueueCleanUpOptions);
    }

    async add<T = any, R = any>(name: TaskNameEnum, data?: any, options?: JobsOptions): Promise<Job<T, R>> {
        return this.queue.add(name, data, options);
    }

    private async createCleanUpJobs(queueName: string, options: QueueCleanUpOptions) {
        for (const key in options) {
            if (isJobStatus(key)) {
                const name = queueCleanUpJobName(queueName, key);
                await this.scheduleRepeatableJob(
                    name,
                    { cron: options.cronSchedule },
                    options[key],
                    {
                        removeOnComplete: true,
                        removeOnFail: true
                    }
                );
            }
        }
    }

    private async createRepeatableJobs(jobs: Partial<Record<TaskNameEnum, QueueManagerCronOptions>>) {
        for (const jobName in jobs) {
            const cron = jobs[jobName].pattern;
            await this.scheduleRepeatableJob(jobName, { cron }, jobs[jobName].payload);
        }
    }

    private async scheduleRepeatableJob(name: string, repeat: RepeatOptions, payload?: any, jobOptions?: Omit<JobsOptions, 'repeat'>) {
        await this.add(name as TaskNameEnum, payload, {
            repeat,
            ...(jobOptions || {})
        });
        this.logger.log(`Cron-Job ${name} has been scheduled with pattern ${repeat.cron} (${this.printCronPattern(repeat.cron)}).`);
    }

    private printCronPattern(pattern: string): string {
        return cronstrue.toString(pattern, {
            use24HourTimeFormat: true
        });
    }

}
