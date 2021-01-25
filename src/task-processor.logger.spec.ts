import { Job } from 'bullmq';
import { DefaultLogger, Logger } from './logger';
import { TaskProcessorLogger } from './task-processor.logger';

describe(TaskProcessorLogger.name, () => {
    const tpl = new TaskProcessorLogger('Test');
    const tplWithLogger = new TaskProcessorLogger(new DefaultLogger('logger'));
    let logMethodSpy: jest.SpyInstance;
    let job: Job;
    let jobWithAttempts: Job;
    beforeEach(() => {
        logMethodSpy = jest.spyOn(((tpl as any).logger as Logger), 'log');
        job = {
            id: '1',
            name: 'test',
            attemptsMade: 0
        } as Job;
        jobWithAttempts = {
            id: '2',
            name: 'test',
            attemptsMade: 1
        } as Job;
    });

    describe('Constructor', () => {
        it('should accept a name', () => {
            const logger = (tpl as any).logger;
            expect(logger).toBeInstanceOf(DefaultLogger);
            expect(logger.context).toEqual('Test');
        });
        it('should accept a logger', () => {
            const logger = (tplWithLogger as any).logger;
            expect(logger).toBeInstanceOf(DefaultLogger);
            expect(logger.context).toEqual('logger');
        });
    });

    describe('start()', () => {
        it('should handle job', () => {
            tpl.start(job);
            expect(logMethodSpy).toHaveBeenCalledWith(`[1] test started.`);
        });
        it('should handle job, message', () => {
            tpl.start(job, 'test');
            expect(logMethodSpy).toHaveBeenCalledWith(`[1] test started. test`);
        });
        it('should handle job, attempts', () => {
            tpl.start(jobWithAttempts);
            expect(logMethodSpy).toHaveBeenCalledWith(`[2] test started. Previous attempts: 1.`);
        });
        it('should handle job, attempts, message', () => {
            tpl.start(jobWithAttempts, 'test');
            expect(logMethodSpy).toHaveBeenCalledWith(`[2] test started. Previous attempts: 1. test`);
        });
        it('should return the current time', () => {
            const date = tpl.start(job);
            expect(typeof date).toEqual('number');
            expect(new Date(date)).toBeInstanceOf(Date);
        });
    });
    
    describe('end()', () => {
        it('should handle job', () => {
            tpl.end(job);
            expect(logMethodSpy).toHaveBeenCalledWith(`[1] test ended.`);
        });
        it('should handle job, start time', () => {
            tpl.end(job, Date.now());
            expect(logMethodSpy).toHaveBeenCalledWith(`[1] test ended. Took 00:00:00.0.`);
        });
        it('should handle job, message', () => {
            tpl.end(job, undefined, 'hello');
            expect(logMethodSpy).toHaveBeenCalledWith(`[1] test ended. hello`);
        });
        it('should handle job, start time, message', () => {
            tpl.end(job, Date.now(), 'hello');
            expect(logMethodSpy).toHaveBeenCalledWith(`[1] test ended. Took 00:00:00.0. hello`);
        });
    });
});
