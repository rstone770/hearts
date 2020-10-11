export type NoiseFunction3D = (x: number, y: number, z: number) => number;

export interface NoiseGenerator3D {
    eval: NoiseFunction3D;
}
