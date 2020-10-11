import { NoiseFunction3D, NoiseGenerator3D } from "./Noise";
import { noise as perlin } from "./PerlinNoise3D";

interface OctaveNoise3DOptions {
    noise: NoiseFunction3D;
    octaves: number;
    persistence: number;
}

const DEFAULT_OPTIONS: OctaveNoise3DOptions = {
    noise: perlin,
    octaves: 6,
    persistence: 0.5
};

export class OctaveNoise3D implements NoiseGenerator3D {
    private readonly noise: NoiseFunction3D;
    private readonly octaves: number;
    private readonly persistence: number;

    public static readonly default: OctaveNoise3D = new OctaveNoise3D();

    public constructor(options?: Partial<OctaveNoise3DOptions>) {
        this.noise = options?.noise ?? DEFAULT_OPTIONS.noise;
        this.octaves = options?.octaves ?? DEFAULT_OPTIONS.octaves;
        this.persistence = options?.persistence ?? DEFAULT_OPTIONS.persistence;
    }

    public eval(x: number, y: number, z: number) {
        let total = 0;
        let frequency = 1;
        let amplitude = 1;
        let range = 1;

        for (let i = 0; i < this.octaves; i++) {
            total += this.noise(x * frequency, y * frequency, z * frequency) * amplitude;
            range += amplitude;
            amplitude *= this.persistence;
            frequency *= 2;
        }

        return total / range;
    }
}

export const noise: NoiseFunction3D = (x: number, y: number, z: number) => {
    return OctaveNoise3D.default.eval(x, y, z);
};
