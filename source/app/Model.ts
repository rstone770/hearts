import { Subject } from "@hearts/reactive/Subject";

export interface ModelState {
    likes: number;
}

const DEFAULT_STATE: ModelState = {
    likes: 0
};

export class Model {
    public state: ModelState;
    public subject: Subject<ModelState>;

    public constructor(state?: Partial<ModelState>) {
        this.state = { ...DEFAULT_STATE, ...state };
        this.subject = new Subject();
    }

    public update(state: Partial<ModelState>) {
        this.state = { ...this.state, ...state };
        this.subject.publish(this.state);
    }

    public like() {
        this.update({ likes: this.state.likes + 1 });
    }
}
