import { createSafeDescriptor } from "../Descriptor";

describe("lifecycle/Descriptor", () => {
    describe("createSafeDescriptor()", () => {
        it("should fill in missing descriptor methods.", () => {
            const mount = () => {};
            const descriptor = createSafeDescriptor({
                mount
            });

            expect(descriptor.mount).toBe(mount);
            expect(descriptor.dispose).not.toEqual(null);
            expect(descriptor.unmount).not.toEqual(null);
        });

        it("should defaults everything if nullish.", () => {
            const descriptor = createSafeDescriptor();

            expect(descriptor.mount).not.toEqual(null);
            expect(descriptor.dispose).not.toEqual(null);
            expect(descriptor.unmount).not.toEqual(null);
        });
    });
});
