import { Job } from 'bullmq';
import { getJobStatus, isCleanUpJob, isJobStatus, queueCleanUpJobName } from './queue-cleanup';

describe('QueueCleanUp', () => {
    const queue = {
        name: 'queue'
    };
    const completed = { name: queueCleanUpJobName(queue.name, 'completed') };
    const wait = { name: queueCleanUpJobName(queue.name, 'wait') };
    const active = { name: queueCleanUpJobName(queue.name, 'active') };
    const paused = { name: queueCleanUpJobName(queue.name, 'paused') };
    const delayed = { name: queueCleanUpJobName(queue.name, 'delayed') };
    const failed = { name: queueCleanUpJobName(queue.name, 'failed') };
    const nonCleanupJob = { name: 'test' };

    describe(queueCleanUpJobName.name, () => {
        it('should build the job name', () => {
            expect(queueCleanUpJobName('queue', 'completed')).toEqual('queue_completed_cleanup');
            expect(queueCleanUpJobName('queue', 'wait')).toEqual('queue_wait_cleanup');
            expect(queueCleanUpJobName('queue', 'active')).toEqual('queue_active_cleanup');
            expect(queueCleanUpJobName('queue', 'paused')).toEqual('queue_paused_cleanup');
            expect(queueCleanUpJobName('queue', 'delayed')).toEqual('queue_delayed_cleanup');
            expect(queueCleanUpJobName('queue', 'failed')).toEqual('queue_failed_cleanup');
        });
    });

    describe(getJobStatus.name, () => {
        it('should return the job status', () => {
            expect(getJobStatus(completed as Job)).toEqual('completed');
            expect(getJobStatus(wait as Job)).toEqual('wait');
            expect(getJobStatus(active as Job)).toEqual('active');
            expect(getJobStatus(paused as Job)).toEqual('paused');
            expect(getJobStatus(delayed as Job)).toEqual('delayed');
            expect(getJobStatus(failed as Job)).toEqual('failed');
            expect(getJobStatus(nonCleanupJob as Job)).toBeUndefined();
        });
    });

    describe(isCleanUpJob.name, () => {
        it('should detect if a job is a cleanup job', () => {
            expect(isCleanUpJob(completed as Job, queue.name)).toEqual(true);
            expect(isCleanUpJob(wait as Job, queue.name)).toEqual(true);
            expect(isCleanUpJob(active as Job, queue.name)).toEqual(true);
            expect(isCleanUpJob(paused as Job, queue.name)).toEqual(true);
            expect(isCleanUpJob(delayed as Job, queue.name)).toEqual(true);
            expect(isCleanUpJob(failed as Job, queue.name)).toEqual(true);
            expect(isCleanUpJob(nonCleanupJob as Job, queue.name)).toEqual(false);
        });
    });

    describe(isJobStatus.name, () => {
        it('should detect if a string is a job status', () => {
            expect(isJobStatus('completed')).toEqual(true);
            expect(isJobStatus('wait')).toEqual(true);
            expect(isJobStatus('active')).toEqual(true);
            expect(isJobStatus('paused')).toEqual(true);
            expect(isJobStatus('delayed')).toEqual(true);
            expect(isJobStatus('failed')).toEqual(true);
            expect(isJobStatus('test')).toEqual(false);
            expect(isJobStatus(undefined)).toEqual(false);
            expect(isJobStatus(null)).toEqual(false);
        });
    });

});
