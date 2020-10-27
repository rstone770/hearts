import { Lifecycle } from "../Lifecycle";

describe("lifecycle/Lifecycle", () => {
    describe(".bind()", () => {
        it("should mount immediately if lifecycle has been mounted.", () => {
            const mount = jest.fn();
            const l = new Lifecycle();
            l.mount();
            l.bind({ mount });

            expect(mount).toBeCalled();
        });

        it("should dispose immediatly if lifecyle has been disposed.", () => {
            const dispose = jest.fn();
            const l = new Lifecycle();
            l.dispose();
            l.bind({ dispose });

            expect(dispose).toBeCalled();
        });
    });

    describe(".mount()", () => {
        it("should mount if lifecycle is unmounted.", () => {
            const mount = jest.fn();
            const l = new Lifecycle();

            l.bind({ mount });
            expect(mount).not.toBeCalled();

            l.mount();
            expect(mount).toBeCalledTimes(1);

            l.mount();
            expect(mount).toBeCalledTimes(1);
        });

        it("should not mount if lifecycle is disposed.", () => {
            const mount = jest.fn();
            const l = new Lifecycle();
            l.bind({ mount });

            l.dispose();
            l.mount();
            expect(mount).not.toBeCalled();
        });
    });

    describe(".unmount()", () => {
        it("should unmount if lifecycle is mounted.", () => {
            const unmount = jest.fn();
            const l = new Lifecycle();

            l.bind({ unmount });
            l.mount();
            expect(unmount).not.toBeCalled();

            l.unmount();
            expect(unmount).toBeCalledTimes(1);
        });

        it("should not mount if lifecycle is disposed.", () => {
            const unmount = jest.fn();
            const l = new Lifecycle();
            l.bind({ unmount });

            l.dispose();
            l.mount();
            l.dispose();
            expect(unmount).not.toBeCalled();
        });
    });

    describe(".dispose()", () => {
        it("should unmount if mounted.", () => {
            const unmount = jest.fn();
            const dispose = jest.fn();
            const l = new Lifecycle();

            l.bind({ unmount, dispose });
            l.mount();
            expect(unmount).not.toBeCalled();

            l.dispose();
            expect(unmount).toBeCalledTimes(1);
            expect(dispose).toBeCalledTimes(1);
        });

        it("should not be called multiple times.", () => {
            const dispose = jest.fn();
            const l = new Lifecycle();

            l.bind({ dispose });
            l.dispose();
            l.dispose();
            expect(dispose).toBeCalledTimes(1);
        });
    });
});
