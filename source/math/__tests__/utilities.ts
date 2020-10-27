import { lerp } from "../utilities";

describe("math/utilities", () => {
    describe("lerp()", () => {
        it.each([
            [1, 2, 0.5, 1.5],
            [-1, 1, 0.25, -0.5],
            [0, 100, 0.99, 99]
        ])("should interpolate(%p, %p, %p) to %p.", (x, y, n, expected) => {
            expect(lerp(x, y, n)).toBe(expected);
        });
    });
});
