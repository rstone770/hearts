import { InterpolationFunction, linear } from "@hearts/math/interpolation";
import { Size } from "@hearts/math/Size";
import { LCG } from "@hearts/random/LCG";
import { Random } from "@hearts/random/Random";
import { randomizeArray } from "@hearts/random/utilities";
import { NoiseGenerator } from "./NoiseGenerator";

export interface ValueNoiseOptions {
    interpolation: InterpolationFunction;
    size: Size;
    random: Random;
}

const DEFAULT_OPTIONS: ValueNoiseOptions = {
    interpolation: linear,
    size: { width: 10, height: 10 },
    random: new LCG()
};

export class ValueNoise implements NoiseGenerator {
    public readonly lattice: number[];
    public readonly length: number;
    public interpolate: InterpolationFunction;
    public readonly random: Random;
    public readonly size: Size;

    public constructor(options?: Partial<ValueNoiseOptions>) {
        this.interpolate = options?.interpolation ?? DEFAULT_OPTIONS.interpolation;
        this.random = options?.random ?? DEFAULT_OPTIONS.random;
        this.size = options?.size ?? DEFAULT_OPTIONS.size;
        this.length = this.size.height * this.size.width;
        this.lattice = randomizeArray(this.random, this.length);
    }

    public eval(x: number, y: number) {
        const xi = x | 0;
        const yi = y | 0;
        const xd = x - xi;
        const yd = y - yi;

        const x0 = xi % this.size.width;
        const x1 = (xi + 1) % this.size.width;
        const y0 = yi % this.size.height;
        const y1 = (yi + 1) % this.size.height;

        const p0 = this.lattice[y0 * this.size.width + x0]; // top left
        const p1 = this.lattice[y0 * this.size.width + x1]; // top right
        const p2 = this.lattice[y1 * this.size.width + x0]; // bottom left
        const p3 = this.lattice[y1 * this.size.width + x1]; // bottom right;

        const nx0 = this.interpolate(p0, p1, xd);
        const nx1 = this.interpolate(p2, p3, xd);

        return this.interpolate(nx0, nx1, yd);
    }
}
