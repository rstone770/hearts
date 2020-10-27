enum LifeCycleState {
    Unmounted = "Unmounted",
    Mounted = "Mounted",
    Disposed = "Disposed"
}

interface LifeCycleDescriptor {
    mount: () => void;
    unmount: () => void;
    dispose: () => void;
}

const NOOP = () => {};

export class LifeCycle {
    private descriptors: LifeCycleDescriptor[];
    public state: LifeCycleState;

    public constructor() {
        this.descriptors = [];
        this.state = LifeCycleState.Unmounted;
    }

    public bind(descriptor: Partial<LifeCycleDescriptor>) {
        if (this.state !== LifeCycleState.Disposed) {
            const safeDescriptor: LifeCycleDescriptor = {
                mount: descriptor.mount ?? NOOP,
                unmount: descriptor.unmount ?? NOOP,
                dispose: descriptor.dispose ?? NOOP
            };

            if (this.state === LifeCycleState.Mounted) {
                safeDescriptor.mount();
            }

            this.descriptors.push(safeDescriptor);
        }
    }

    public dispose() {
        if (this.state !== LifeCycleState.Disposed) {
            this.unmount();
            this.state = LifeCycleState.Disposed;

            for (let descriptor of this.descriptors) {
                descriptor.dispose();
            }

            this.descriptors = [];
        }
    }

    public mount() {
        if (this.state === LifeCycleState.Unmounted) {
            this.state = LifeCycleState.Mounted;

            for (let descriptor of this.descriptors) {
                descriptor.mount();
            }
        }
    }

    public unmount() {
        if (this.state === LifeCycleState.Mounted) {
            this.state = LifeCycleState.Unmounted;

            for (let descriptor of this.descriptors) {
                descriptor.unmount();
            }
        }
    }
}
