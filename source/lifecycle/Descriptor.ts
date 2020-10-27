export interface Descriptor {
    mount: () => void;
    unmount: () => void;
    dispose: () => void;
}

const nop = () => {};

const EMPTY_DESCRIPTOR: Descriptor = {
    mount: nop,
    unmount: nop,
    dispose: nop
};

export const createSafeDescriptor = (descriptor?: Partial<Descriptor>) => {
    let result: Descriptor | undefined;

    if (descriptor != null) {
        result = {
            mount: descriptor.mount ?? nop,
            unmount: descriptor.unmount ?? nop,
            dispose: descriptor.dispose ?? nop
        };
    }

    return result ?? EMPTY_DESCRIPTOR;
};
