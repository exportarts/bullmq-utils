import { Logger } from '@nestjs/common';
import { Job, Processor, Worker, WorkerOptions } from 'bullmq';
import { queueBaseOptions } from './queue-options';

export abstract class QueueWorker<QueueName extends string> {

    protected readonly logger = new Logger(this.constructor.name);

    private readonly worker: Worker;

    constructor(
        queueName: QueueName,
        processor: Processor,
        _logger: Logger,
        workerOptions?: WorkerOptions,
    ) {
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
