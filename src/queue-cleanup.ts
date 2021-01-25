import { Job } from 'bullmq';
import { DurationObject } from 'luxon';

/**
 * This is the list of types that are accepted by `Queue.clean()`.
 * BullMQ does not export this as a type, therefore it is written
 * out here literally.
 */
export type JobStatus = 'completed' | 'wait' | 'active' | 'paused' | 'delayed' | 'failed';

const nameDelimiter = '_';
const nameSuffix = 'cleanup';
export const queueCleanUpJobName = (queueName: string, status: JobStatus) => `${queueName}${nameDelimiter}${status}${nameDelimiter}${nameSuffix}`;

export function getJobStatus(job: Job): JobStatus | undefined {
    const parts = job.name.split(nameDelimiter);
    const status = parts[parts.length - 2];
    return status as JobStatus;
}

export function isCleanUpJob(job: Job, queueName: string) {
    const parts = job.name.split(nameDelimiter);
    if (parts.length < 3) {
        return false;
    }
    const suffix = parts[parts.length - 1];
    const status = parts[parts.length - 2];
    return job.name.startsWith(queueName) &&
        isJobStatus(status) &&
        suffix === nameSuffix;
}

export function isJobStatus(str: string): str is JobStatus {
    const types: JobStatus[] = [
        'completed',
        'wait',
        'active',
        'paused',
        'delayed',
        'failed'
    ];
    return types.includes(str as JobStatus);
}

export interface JobStatusCleanUpOptions {
    /**
     * Time that must have passed before
     * removing jobs from the queue.
     */
    threshold: DurationObject;
    /**
     * Maximum number of jobs to remove at once.
     * 
     * If more jobs are in the queue, they will be cleaned
     * up at the next cron execution.
     */
    limit: number;
}

export type QueueCleanUpOptions = {
    /**
     * You can customize the clean up behaviour
     * for each job status.
     */
    [status in JobStatus]?: JobStatusCleanUpOptions
} & {
    /**
     * CRON Pattern to run the clean up job.
     * 
     * @default '0 0 * * *'
     */
    cronSchedule?: string;
};

const CRON_PATTERN_EVERY_DAY_AT_MIDNIGHT = '0 0 * * *';
export const defaultCleanUpAmount = 1000;

export const defaultQueueCleanUpOptions: QueueCleanUpOptions = {
    cronSchedule: CRON_PATTERN_EVERY_DAY_AT_MIDNIGHT,
    completed: {
        threshold: {
            weeks: 1
        },
        limit: defaultCleanUpAmount
    },
    failed: {
        threshold: {
            weeks: 4
        },
        limit: defaultCleanUpAmount
    }
}
