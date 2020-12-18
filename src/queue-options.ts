import { QueueBaseOptions } from 'bullmq';

export const queueBaseOptions = (
    prefixEnvVar = 'BULLMQ_PREFIX',
    hostEnvVar = 'REDIS_HOST',
    portEnvVar = 'REDIS_PORT',
    passwordEnvVar = 'REDIS_PASSWORD'
): QueueBaseOptions => ({
    prefix: process.env[prefixEnvVar],
    connection: {
        host: process.env[hostEnvVar],
        port: +process.env[portEnvVar],
        password: process.env[passwordEnvVar],
    }
});
