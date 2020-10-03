import { linear } from "../interpolation";

describe("math/interpolation", () => {
    describe("linear()", () => {
        it.each([
            [1, 1, 0, 1],
            [0, 1, 0.5, 0.5],
            [3.5, 4.5, 1, 4.5]
        ])("linear(%d, %d, %d) === %d", (x, y, n, expected) => {
            expect(linear(x, y, n)).toBe(expected);
        });
    });
});
