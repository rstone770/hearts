import { NoiseGenerator } from "./NoiseGenerator";

export class ValueNoise implements NoiseGenerator {
    public at(x: number, y: number) {
        return x + y;
    }
}
