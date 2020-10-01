import { LCG } from "../LCG";

describe("random/LCG", () => {
    describe("random()", () => {
        it("should return values between [0, 1)", () => {
            const rng = new LCG(0xdeadbeef);
            const values = Array.from({ length: 100 }, () => rng.next());

            for (let value of values) {
                expect(value).toBeLessThan(1);
                expect(value).toBeGreaterThanOrEqual(0);
            }
        });
    });
});
