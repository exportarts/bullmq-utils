import { queueBaseOptions } from './queue-options';

describe('queue-options.ts', () => {
    describe('queueBaseOptions()', () => {
        const envVarNames = {
            prefix: 'TEST_PREFIX',
            host: 'TEST_HOST',
            port: 'TEST_PORT',
            password: 'TEST_PASSWORD'
        };
        describe('Validation', () => {
            beforeEach(() => {
                process.env[envVarNames.prefix] = 'prefix';
                process.env[envVarNames.host] = 'host';
                process.env[envVarNames.port] = '1234';
                process.env[envVarNames.password] = 'password';
            })
            it('should throw if all are undefined', () => {
                delete process.env[envVarNames.prefix];
                delete process.env[envVarNames.host];
                delete process.env[envVarNames.port];
                delete process.env[envVarNames.password];
                expect(() => queueBaseOptions(
                    envVarNames.prefix,
                    envVarNames.host,
                    envVarNames.port,
                    envVarNames.password
                )).toThrow();
            });
            it('should throw if prefix is undefined', () => {
                delete process.env[envVarNames.prefix];
                expect(() => queueBaseOptions(
                    envVarNames.prefix,
                    envVarNames.host,
                    envVarNames.port,
                    envVarNames.password
                )).toThrow();
            });
            it('should throw if host is undefined', () => {
                delete process.env[envVarNames.host];
                expect(() => queueBaseOptions(
                    envVarNames.prefix,
                    envVarNames.host,
                    envVarNames.port,
                    envVarNames.password
                )).toThrow();
            });
            it('should throw if port is undefined', () => {
                delete process.env[envVarNames.port];
                expect(() => queueBaseOptions(
                    envVarNames.prefix,
                    envVarNames.host,
                    envVarNames.port,
                    envVarNames.password
                )).toThrow();
            });
            it('should throw if password is undefined', () => {
                delete process.env[envVarNames.port];
                expect(() => queueBaseOptions(
                    envVarNames.prefix,
                    envVarNames.host,
                    envVarNames.port,
                    envVarNames.password
                )).toThrow();
            });
            it('should not throw if all are defined', () => {
                expect(() => queueBaseOptions(
                    envVarNames.prefix,
                    envVarNames.host,
                    envVarNames.port,
                    envVarNames.password
                )).not.toThrow();
            });
        });
    });
});
