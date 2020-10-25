export type FrameScheduler = (cb: () => void, done: () => boolean) => void;

export const frame: FrameScheduler = (cb, done) => {
    const step = () => {
        cb();

        if (!done()) {
            requestAnimationFrame(step);
        }
    };

    step();
};
