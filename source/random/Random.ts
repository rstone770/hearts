export type RandomNumberFunction = () => number;

export interface RandomNumerGenerator {
    next: RandomNumberFunction;
}
