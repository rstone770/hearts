import { createSafeDescriptor, Descriptor } from "./Descriptor";

const enum LifecycleState {
    Mounted,
    Unmounted,
    Disposed
}

export class Lifecycle {
    private descriptor: Array<Descriptor>;
    private state: LifecycleState;

    public constructor() {
        this.descriptor = [];
        this.state = LifecycleState.Unmounted;
    }

    public bind(descriptor: Partial<Descriptor>) {
        const sd = createSafeDescriptor(descriptor);

        if (this.state === LifecycleState.Disposed) {
            sd.dispose();
        } else {
            this.descriptor.push(sd);

            if (this.state === LifecycleState.Mounted) {
                sd.mount();
            }
        }
    }

    public mount() {
        if (this.state === LifecycleState.Unmounted) {
            this.state = LifecycleState.Mounted;
            this.descriptor.forEach((d) => d.mount());
        }
    }

    public unmount() {
        if (this.state === LifecycleState.Mounted) {
            this.state = LifecycleState.Unmounted;
            this.descriptor.forEach((d) => d.unmount());
        }
    }

    public dispose() {
        const state = this.state;

        if (state !== LifecycleState.Disposed) {
            this.state = LifecycleState.Disposed;

            if (state === LifecycleState.Mounted) {
                this.descriptor.forEach((d) => d.unmount());
            }

            this.descriptor.forEach((d) => d.dispose());
            this.descriptor = [];
        }
    }
}
