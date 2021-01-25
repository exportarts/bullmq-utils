import { Job } from 'bullmq';
import { QueueWorker, TaskProcessorLogger } from '../dist';
import { QueueNames, TaskNames, timeout } from './settings';

export class DemoWorker extends QueueWorker<QueueNames> {

    private readonly taskLogger = new TaskProcessorLogger(DemoWorker.name);

    constructor() {
        super(
            QueueNames.DEMO_QUEUE,
            async job => {
                switch (job.name) {
                    case TaskNames.RUNS_EVERY_5_SECS: return this.returnRandom(job);
                    case TaskNames.RUNS_10_TIMES: return this.longRunningJob(job);
                    default: this.reportMissingProcessHandler(job)
                }
            },
            {
                workerOptions: {
                    concurrency: 3
                }
            }
        );
    }

    private async returnRandom(job: Job) {
        const start = this.taskLogger.start(job);


        const result = Math.random();
        await timeout(1000 + result * 1000);

        this.taskLogger.end(job, start, `The result is ${result}`);
        return result;
    }

    private async longRunningJob(job: Job) {
        const start = this.taskLogger.start(job);

        await timeout(15000);

        this.taskLogger.end(job, start);
    }

}
