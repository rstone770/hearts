export interface SignalPayload<TTarget, TData> {
    data: TData;
    sender: any;
    target: TTarget;
}

export type SignalListener<TTarget, TData> = (e: SignalPayload<TTarget, TData>) => void;
export type SignalListenerDisposer = () => void;

export class Signal<TTarget = unknown, TData = unknown> {
    private listeners: Array<SignalListener<TTarget, TData>>;
    private target: TTarget;

    public constructor(target: TTarget) {
        this.listeners = [];
        this.target = target;
    }

    public attach(listener: SignalListener<TTarget, TData>): SignalListenerDisposer {
        if (this.listeners.indexOf(listener) === -1) {
            this.listeners.push(listener);
        }

        return () => this.detach(listener);
    }

    public detach(listener: SignalListener<TTarget, TData>) {
        this.listeners = this.listeners.filter((l) => l !== listener);
    }

    public clear() {
        this.listeners = [];
    }

    public notify(data: TData, sender?: any) {
        const payload: SignalPayload<TTarget, TData> = {
            target: this.target,
            data,
            sender
        };

        for (let listener of this.listeners) {
            listener(payload);
        }
    }
}
