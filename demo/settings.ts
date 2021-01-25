export enum QueueNames {
    DEMO_QUEUE = 'demo_queue'
}

export enum TaskNames {
    RUNS_EVERY_5_SECS = 'RUNS_EVERY_5_SECS',
    RUNS_10_TIMES = 'RUNS_10_TIMES',
    NO_HANDLER = 'NO_HANDLER'
}

export function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
