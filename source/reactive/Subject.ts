export type Observer<TData> = (data: TData) => void;

export class Subject<TData = unknown> {
    private observers: Array<Observer<TData>>;

    public constructor() {
        this.observers = [];
    }

    public subscribe(observer: Observer<TData>) {
        if (this.observers.indexOf(observer) === -1) {
            this.observers.push(observer);
        }

        return () => {
            const index = this.observers.indexOf(observer);

            if (index !== -1) {
                this.observers.splice(index, 1);
            }
        };
    }

    public unbind() {
        this.observers = [];
    }

    public publish(value: TData) {
        for (let i = 0; i < this.observers.length; i++) {
            this.observers[i](value);
        }

        return this;
    }
}
