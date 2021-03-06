export interface Logger {
    log(message: string): void;
    warn(message: string): void;
    error(message: string, trace?: string): void;
    verbose(message: string): void;
    debug(message: string): void;
}

export class DefaultLogger implements Logger {

    constructor(
        private readonly context: string
    ) {}

    log(message: string) {
        console.log(`[${this.context}] ${message}`);
    }

    warn(message: string) {
        console.warn(`[${this.context}] ${message}`);
    }

    error(message: string, trace?: string) {
        console.error(`[${this.context}] ${message}`, trace);
    }

    verbose(message: string) {
        console.info(`[${this.context}] ${message}`);
    }

    debug(message: string) {
        console.debug(`[${this.context}] ${message}`);
    }

}
