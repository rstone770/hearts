import { Signal } from "@hearts/reactive/Signal";

export interface ModelState {
    likes: number;
}

const DEFAULT_STATE: ModelState = {
    likes: 0
};

export class Model {
    public state: ModelState;
    public updated: Signal<Model, ModelState>;

    public constructor(state?: Partial<ModelState>) {
        this.state = { ...DEFAULT_STATE, ...state };
        this.updated = new Signal<Model, ModelState>(this);
    }

    public update(state: Partial<ModelState>) {
        this.state = { ...this.state, ...state };
        this.updated.notify(this.state);
    }

    public like() {
        this.update({ likes: this.state.likes + 1 });
    }
}
