import { exponentialBackoff, fixedBackoff } from './backoff';

describe('backoff', () => {
    describe('fixedBackoff', () => {
        it('should create a fixed backoff', () => {
            expect(fixedBackoff(1)).toEqual({
                type: 'fixed',
                delay: 1
            });
        });
    });
    describe('exponentialBackoff', () => {
        it('should create an exponential backoff', () => {
            expect(exponentialBackoff(1)).toEqual({
                type: 'exponential',
                delay: 1
            });
        });
    });
});
