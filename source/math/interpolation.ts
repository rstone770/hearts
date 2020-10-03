export type Interpolation = (x: number, y: number, n: number) => number;

export const linear: Interpolation = (x: number, y: number, n: number) =>
    x * (1 - n) + y * n;
