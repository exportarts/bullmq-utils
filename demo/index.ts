import { DemoManager } from './manager';
import { TaskNames } from './settings';
import { DemoWorker } from './worker';

// Connection settings according to docker-compose.yml
process.env.REDIS_HOST = 'localhost';
process.env.REDIS_PORT = '6999';
process.env.REDIS_PASSWORD = 'redis';
process.env.BULLMQ_PREFIX = 'bullmq-utils';

const manager = new DemoManager();
const worker = new DemoWorker();

manager.add(TaskNames.RUNS_10_TIMES, undefined, {
    repeat: {
        limit: 10,
        every: 5000
    }
});
