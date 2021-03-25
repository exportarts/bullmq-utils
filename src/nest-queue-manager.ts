import { QueueManager } from './queue-manager';

/**
 * An extension of the `QueueManager` class that implements the [NestJS](https://docs.nestjs.com)
 * [`onModuleDestroy`](https://docs.nestjs.com/fundamentals/lifecycle-events) lifecycle hook
 * to shut down the queue manager and scheduler gracefully.
 */
export abstract class NestQueueManager<QueueName extends string, TaskNameEnum extends string> extends QueueManager<QueueName, TaskNameEnum> {

    /**
     * @private This method implements the `OnModuleDestroy` NestJS interface.
     *
     * @see [Lifecycle Events in the NestJS docs](https://docs.nestjs.com/fundamentals/lifecycle-events)
     */
    async onModuleDestroy() {
        this.logger.verbose(`Disconnecting from queue and stopping scheduler`);
        await this.queue.close();
        await this.scheduler.close();
    }

}
