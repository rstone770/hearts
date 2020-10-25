import { RandomNumberGenerator } from "@hearts/random/Random";

export type ScheduleDisposer = () => void;
export type Scheduler = (cb: () => void, delay?: number) => ScheduleDisposer;

export const schedule: Scheduler = (cb, delay) => {
    const handle = setTimeout(cb, delay);

    return () => {
        clearTimeout(handle);
    };
};

export interface ScheduleRandomOptions {
    count: number;
    basis: number;
    variance: number;
}

const DEFAULT_SCHEDULE_RANDOM_OPTIONS: ScheduleRandomOptions = {
    count: 10,
    basis: 100,
    variance: 400
};

export const scheduleRandom = (
    random: RandomNumberGenerator,
    schedule: Scheduler,
    cb: () => void,
    options?: Partial<ScheduleRandomOptions>
) => {
    const o = { ...DEFAULT_SCHEDULE_RANDOM_OPTIONS, ...options };
    const tokens = [];
    let time = 0;

    for (let i = 0; i < o.count; i++) {
        time += random.next() * o.variance + o.basis;

        tokens.push(schedule(cb, time));
    }

    return linkScheduleDisposers(tokens);
};

export const linkScheduleDisposers = (disposers: ScheduleDisposer[]) => {
    return () => {
        disposers.forEach((dispose) => dispose());
    };
};
