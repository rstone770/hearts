import { arrayToVector3DLiteral } from "../Vector3D";

describe("math/Vector3D", () => {
    describe("arrayToVector3DLiteral()", () => {
        it("should convert an array to a Vector3DLiteral", () => {
            expect(arrayToVector3DLiteral([1, 2, 3])).toEqual({
                x: 1,
                y: 2,
                z: 3
            });
        });

        it("should default values not provided in tuple.", () => {
            expect(arrayToVector3DLiteral([2])).toEqual({
                x: 2,
                y: 0,
                z: 0
            });
        });
    });
});
