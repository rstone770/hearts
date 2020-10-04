export type InterpolationFunction = (x: number, y: number, n: number) => number;

export const linear: InterpolationFunction = (x: number, y: number, n: number) => x * (1 - n) + y * n;

export const cosine: InterpolationFunction = (x: number, y: number, n: number) => {
    const mu = 1 - Math.cos(n * Math.PI) / 2;

    return x * (1 - mu) + y * mu;
};
