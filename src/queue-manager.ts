// must come first
import 'reflect-metadata';

import { Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Job, JobsOptions, Queue, QueueOptions, QueueScheduler, QueueSchedulerOptions } from 'bullmq';
import cronstrue from 'cronstrue';
import { Duration, DurationObject } from 'luxon';
import { queueBaseOptions } from './queue-options';

interface QueueManagerCronOptions {
    pattern: string;
    payload?: any;
}

export abstract class QueueManager<QueueName extends string, TaskNameEnum extends string> {

    private readonly logger = new Logger(this.constructor.name);

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
        scheduleCronJobs?: Partial<Record<TaskNameEnum, QueueManagerCronOptions>>,
        queueOptions?: QueueOptions,
        schedulerOptions?: QueueSchedulerOptions
    ) {
        this.queue = new Queue(queueName, {
            ...queueBaseOptions(),
            ...queueOptions
        });
        this.scheduler = new QueueScheduler(queueName, {
            ...queueBaseOptions(),
            ...schedulerOptions
        });
        this.createRepeatableJobs(scheduleCronJobs);
    }

    async add<T = any, R = any>(name: TaskNameEnum, data?: any, options?: JobsOptions): Promise<Job<T, R>> {
        return this.queue.add(name, data, options);
    }

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    private async deleteOldJobsCron() {
        await this.deleteOldJobs('completed', { weeks: 1 });
        await this.deleteOldJobs('failed', { weeks: 4 });
    }

    private async deleteOldJobs(
        status: 'completed' | 'wait' | 'active' | 'paused' | 'delayed' | 'failed',
        duration: DurationObject,
        limit = 1000
    ) {
        const threshold = Duration.fromObject(duration).as('milliseconds');
        const jobs = await this.queue.getJobs(status);
        const jobsToDelete = jobs.filter(job => (Date.now() - job.finishedOn) > threshold);
        
        if (jobsToDelete.length > 0) {
            this.logger.verbose(`${jobsToDelete.length}/${jobs.length} in status "${status}" will be deleted.`);
            await this.queue.clean(threshold, limit, status);
        } else {
            this.logger.verbose(`No jobs to delete in status "${status}".`);
        }
    }

    private async createRepeatableJobs(jobs: Partial<Record<TaskNameEnum, QueueManagerCronOptions>>) {
        for (const jobName in jobs) {
            const cron = jobs[jobName].pattern;
            await this.add(jobName, jobs[jobName].payload, {
                repeat: {
                    cron
                }
            });
            this.logger.verbose(`Cron-Job ${jobName} has been scheduled with pattern ${cron} (${this.printCronPattern(cron)}).`);
        }
    }

    private printCronPattern(pattern: string): string {
        return cronstrue.toString(pattern, {
            use24HourTimeFormat: true
        });
    }

}
