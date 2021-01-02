import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';

export class TaskProcessorLogger {

    private readonly logger: Logger;
    private readonly prefix = (job: Job) => `[${job.id}]`;

    constructor(name: string) {
        this.logger = new Logger(name);
    }

    start(job: Job, message?: string): number {
        this.logger.log(`${this.prefix(job)} ${job.name} started${job.attemptsMade ? '. Previous attempts: ' + job.attemptsMade : ''}.${message ? ' ' + message : ''}`);
        return Date.now();
    }

    end(job: Job, start?: number, message?: string) {
        let msg = `${this.prefix(job)} ${job.name} ended.`;
        if (start) {
            msg += ` Took ${this.msToTime(Date.now() - start)}.`;
        }
        if (message) {
            msg += ` ${message}`;
        }
        this.logger.log(msg);
    }

    error(job: Job, message: string, trace?: string) {
        this.logger.error(`${this.prefix(job)} ${message}`, trace);
    }

    warn(job: Job, message: string) {
        this.logger.warn(`${this.prefix(job)} ${message}`);
    }

    verbose(job: Job, message: string) {
        this.logger.verbose(`${this.prefix(job)} ${message}`);
    }

    debug(job: Job, message: string) {
        this.logger.debug(`${this.prefix(job)} ${message}`);
    }

    /**
     * From: https://stackoverflow.com/a/19700358
     * 
     * @param duration duration in milliseconds
     * @returns formated string like "00:05:00.0"
     */
    private msToTime(duration: number) {
        const milliseconds = parseInt(`${((duration % 1000) / 100)}`);
        const seconds = Math.floor((duration / 1000) % 60);
        const minutes = Math.floor((duration / (1000 * 60)) % 60);
        const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

        const HH = (hours < 10) ? "0" + hours : hours;
        const MM = (minutes < 10) ? "0" + minutes : minutes;
        const SS = (seconds < 10) ? "0" + seconds : seconds;

        return `${HH}:${MM}:${SS}.${milliseconds}`;
    }

}
