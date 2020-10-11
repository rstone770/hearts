export const fract = (n: number) => n - Math.floor(n);

export const lerp = (a: number, b: number, t: number) => a + t * (b - a);
