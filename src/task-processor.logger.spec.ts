import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { TaskProcessorLogger } from './task-processor.logger';

describe('TaskProcessorLogger', () => {
    const logger = new TaskProcessorLogger('Test');
    let logMethodSpy: jasmine.Spy;
    let job: Job;
    beforeEach(() => {
        logMethodSpy = spyOn<Logger>((logger as any).logger, 'log');
        job = {
            id: '1',
            name: 'test',
            attemptsMade: 0
        } as Job;
    })
    
    describe('end()', () => {
        it('should handle job', () => {
            logger.end(job);
            expect(logMethodSpy).toHaveBeenCalledWith(`[1] test ended.`);
        });
        it('should handle job, start time', () => {
            logger.end(job, Date.now());
            expect(logMethodSpy).toHaveBeenCalledWith(`[1] test ended. Took 00:00:00.0.`);
        });
        it('should handle job, message', () => {
            logger.end(job, undefined, 'hello');
            expect(logMethodSpy).toHaveBeenCalledWith(`[1] test ended. hello`);
        });
        it('should handle job, start time, message', () => {
            logger.end(job, Date.now(), 'hello');
            expect(logMethodSpy).toHaveBeenCalledWith(`[1] test ended. Took 00:00:00.0. hello`);
        });
    });
});
