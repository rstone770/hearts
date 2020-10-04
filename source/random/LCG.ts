import { Random } from "./Random";

// numerical recipes values
// https://en.wikipedia.org/wiki/Linear_congruential_generator#Parameters_in_common_use
const MODULUS = 0x100000000;
const MULTIPLIER = 0x19660d;
const INCREMENT = 0x3c6ef35f;

export class LCG implements Random {
    private state: number;
    public readonly seed: number;

    public constructor(seed?: number) {
        this.seed = seed ?? Date.now();
        this.state = this.seed & 0xffffffff;
    }

    public next(): number {
        this.state = Math.imul(MULTIPLIER, this.state);
        this.state += INCREMENT;
        this.state %= MODULUS;

        return (this.state >>> 0) / MODULUS;
    }
}
