import { DomHelpers } from "@hearts/dom/DomHelpers";
import { Effect } from "@hearts/reactive/Effect";
import { Emitter } from "./Emitter/Emitter";
import { Model, ModelState } from "./Model";
import { template, View } from "./template";

export class App {
    private $container: HTMLElement;
    private binding: Effect;
    private model: Model;
    private view: View;
    private emitter: Emitter;

    public constructor($: DomHelpers, $container: HTMLElement) {
        this.$container = $container;
        this.binding = this.bind();
        this.model = new Model();
        this.view = template($);
        this.emitter = new Emitter(this.view.$canvas);
    }

    public mount() {
        return this.binding.apply();
    }

    private bind() {
        const onLike = () => {
            this.emitter.emit();
            this.model.like();
        };

        const apply = () => {
            this.model.updated.attach((e) => this.update(e.data));

            this.view.$like.addEventListener("click", onLike);
            this.$container.appendChild(this.view.$root);

            this.emitter.mount();
            this.update(this.model.state);
        };

        const dispose = () => {
            this.model.updated.clear();

            this.view.$like.removeEventListener("click", onLike);
            this.$container.removeChild(this.view.$root);

            this.emitter.unmount();
        };

        return Effect.create(apply, dispose);
    }

    private update(state: ModelState) {
        const view = this.view;
        view.$likes.innerText = `${state.likes}`;
    }
}
