import { Queue, QueueScheduler } from 'bullmq';
import { DefaultLogger } from './logger';
import { QueueManager } from './queue-manager';

process.env.REDIS_HOST = 'host';
process.env.REDIS_PORT = '1234';
process.env.REDIS_PASSWORD = 'password';
process.env.BULLMQ_PREFIX = 'prefix';

jest.mock('bullmq');

class TestQueueManager extends QueueManager<string, string> {
    constructor() {
        super(
            'test'
        );
    }
}

class TestQueueManagerWithOptions extends QueueManager<string, string> {
    constructor() {
        super(
            'test',
            {
                logger: new DefaultLogger('custom')
            }
        );
    }
}

describe(QueueManager.name, () => {
    let manager: TestQueueManager;
    let managerWithOptions: TestQueueManager;
    let queueAddSpy: jest.SpyInstance;
    
    beforeEach(() => {
        manager = new TestQueueManager();
        managerWithOptions = new TestQueueManagerWithOptions();
        queueAddSpy = jest.spyOn(manager.queue, 'add');
    });

    describe('Constructor', () => {
        it('should create an instance', () => {
            expect(manager).toBeInstanceOf(TestQueueManager);
            expect(manager.queue).toBeInstanceOf(Queue);
            expect(manager.add).toBeInstanceOf(Function);
            expect((manager as any).scheduler).toBeInstanceOf(QueueScheduler);
        });
        it('should have the default logger', () => {
            const logger = (manager as any).logger;
            expect(logger).toBeInstanceOf(DefaultLogger);
            expect(logger.context).toEqual(TestQueueManager.name);
        });
        it('should accept a custom logger', () => {
            const logger = (managerWithOptions as any).logger;
            expect(logger).toBeInstanceOf(DefaultLogger);
            expect(logger.context).toEqual('custom');
        });
    });

    describe('add()', () => {
        it('should add a task to the queue', () => {
            manager.add('test');
            expect(queueAddSpy).toHaveBeenCalledWith('test', undefined, undefined);
        })
    });
});
