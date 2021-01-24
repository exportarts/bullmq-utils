import { DefaultLogger } from './logger';

describe('Logger', () => {
    describe(DefaultLogger.name, () => {
        let logger: DefaultLogger;
        let logSpy: jest.SpyInstance;
        let warnSpy: jest.SpyInstance;
        let errorSpy: jest.SpyInstance;

        beforeEach(() => {
            logger = new DefaultLogger('ctx');
            logSpy = jest.spyOn(console, 'log');
            warnSpy = jest.spyOn(console, 'warn');
            errorSpy = jest.spyOn(console, 'error');
        });

        it('should create a new instance', () => {
            expect(logger).toBeInstanceOf(DefaultLogger);
        });

        describe('log()', () => {
            it('should log', () => {
                logger.log('message');
                expect(logSpy).toHaveBeenCalledWith('[ctx] message');
            });
        });

        describe('warn()', () => {
            it('should log warnings', () => {
                logger.warn('message');
                expect(warnSpy).toHaveBeenCalledWith('[ctx] message');
            });
        });

        describe('error()', () => {
            it('should log errors', () => {
                logger.error('message');
                expect(errorSpy).toHaveBeenCalledWith('[ctx] message');
            });
        });
    });
});
