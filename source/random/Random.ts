export type RandomNumberFunction = () => number;

export interface RandomNumberGenerator {
    next: RandomNumberFunction;
}
