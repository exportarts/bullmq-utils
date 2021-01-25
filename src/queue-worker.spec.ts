import { Queue, Worker } from 'bullmq';
import { DefaultLogger } from './logger';
import { QueueWorker } from './queue-worker';
import { TaskProcessorLogger } from './task-processor.logger';

process.env.REDIS_HOST = 'host';
process.env.REDIS_PORT = '1234';
process.env.REDIS_PASSWORD = 'password';
process.env.BULLMQ_PREFIX = 'prefix';

jest.mock('bullmq');

class TestWorker extends QueueWorker<string> {
    constructor() {
        super(
            'test',
            async job => {
                return {
                    processed: true
                }
            }
        );
    }
}

class TestWorkerWithOptions extends QueueWorker<string> {
    constructor() {
        super(
            'test',
            async job => {
                return {
                    processed: true
                }
            },
            {
                logger: new DefaultLogger('custom')
            }
        );
    }
}

describe(QueueWorker.name, () => {
    let worker: TestWorker;
    let workerWithOptions: TestWorkerWithOptions;

    beforeEach(() => {
        worker = new TestWorker();
        workerWithOptions = new TestWorkerWithOptions();
    });
    
    describe('Constructor', () => {
        it('should create an instance', () => {
            expect(worker).toBeInstanceOf(TestWorker);
            expect((worker as any).logger).toBeInstanceOf(DefaultLogger);
            expect((worker as any).taskProcessorLogger).toBeInstanceOf(TaskProcessorLogger);
            expect((worker as any).worker).toBeInstanceOf(Worker);
            expect((worker as any).queue).toBeInstanceOf(Queue);
        });
        it('should have the default logger', () => {
            const logger = (worker as any).logger;
            const tpl = (worker as any).taskProcessorLogger;
            expect(logger).toBeInstanceOf(DefaultLogger);
            expect(logger.context).toEqual(TestWorker.name);
            expect(tpl.logger).toEqual(logger);
        });
        it('should accept a custom logger', () => {
            const logger = (workerWithOptions as any).logger;
            const tpl = (workerWithOptions as any).taskProcessorLogger;
            expect(logger).toBeInstanceOf(DefaultLogger);
            expect(logger.context).toEqual('custom');
            expect(tpl.logger).toEqual(logger);
        });
    });
});
