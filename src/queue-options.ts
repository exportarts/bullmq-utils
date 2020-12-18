import { QueueBaseOptions } from 'bullmq';

function throwValidationError(envVarName: string) {
    throw new Error(`process.env.${envVarName} is not set!`);
}

export const queueBaseOptions = (
    prefixEnvVar = 'BULLMQ_PREFIX',
    hostEnvVar = 'REDIS_HOST',
    portEnvVar = 'REDIS_PORT',
    passwordEnvVar = 'REDIS_PASSWORD'
): QueueBaseOptions => {
    const prefix = process.env[prefixEnvVar];
    const host = process.env[hostEnvVar];
    const port = +process.env[portEnvVar];
    const password = process.env[passwordEnvVar];

    if (!prefix) {
        throwValidationError(prefixEnvVar);
    }
    if (!host) {
        throwValidationError(hostEnvVar);
    }
    if (!port) {
        throwValidationError(portEnvVar);
    }
    if (!password) {
        throwValidationError(passwordEnvVar);
    }

    return {
        prefix,
        connection: {
            host,
            port,
            password,
        }
    };
};
