import { QueueWorker } from './queue-worker';

/**
 * An extension of the `QueueWorker` class that implements the [NestJS](https://docs.nestjs.com)
 * [`onModuleDestroy`](https://docs.nestjs.com/fundamentals/lifecycle-events) lifecycle hook
 * to shut down the worker gracefully.
 */
export abstract class NestQueueWorker<QueueName extends string> extends QueueWorker<QueueName> {

    /**
     * @private This method implements the `OnModuleDestroy` NestJS interface.
     *
     * @see [Lifecycle Events in the NestJS docs](https://docs.nestjs.com/fundamentals/lifecycle-events)
     */
    async onModuleDestroy() {
        this.logger.verbose(`Stopping to accept more jobs and waiting for jobs to finish (or fail)`);
        await this.worker.close();
    }

}
