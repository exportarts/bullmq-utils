import { BackoffOptions } from 'bullmq';

/**
 * Creates a fixed backoff strategy.
 *
 * @param delay milliseconds
 *
 * @see https://github.com/taskforcesh/bullmq/blob/47fd1ea5eec49dcb9d74293b8f99ed5aecc01239/src/classes/backoffs.ts#L15-L19
 */
export const fixedBackoff = (delay: number): BackoffOptions => ({
    type: 'fixed',
    delay
});

/**
 * Creates an exponential backoff strategy.
 *
 * @param delay milliseconds
 *
 * @see https://github.com/taskforcesh/bullmq/blob/47fd1ea5eec49dcb9d74293b8f99ed5aecc01239/src/classes/backoffs.ts#L21-L25
 */
export const exponentialBackoff = (delay: number): BackoffOptions => ({
    type: 'exponential',
    delay
});
