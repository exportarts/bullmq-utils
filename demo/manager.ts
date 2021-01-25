import { QueueManager } from '../dist';
import { QueueCleanUpOptions } from '../dist/queue-cleanup';
import { QueueNames, TaskNames } from './settings';

const cleanUpOptions: QueueCleanUpOptions = {
    cronSchedule: '*/10 * * * * *',
    completed: {
        threshold: {
            seconds: 10
        },
        limit: 5
    },
    failed: {
        threshold: {
            seconds: 10
        },
        limit: 5
    }
}

export class DemoManager extends QueueManager<QueueNames, TaskNames> {

    constructor() {
        super(
            QueueNames.DEMO_QUEUE,
            {
                cleanUpOptions,
                scheduleCronJobs: {
                    [TaskNames.RUNS_EVERY_5_SECS]: {
                        pattern: '*/5 * * * * *'
                    },
                    [TaskNames.NO_HANDLER]: {
                        pattern: '*/10 * * * * *'
                    }
                }
            }
        );
    }

}
