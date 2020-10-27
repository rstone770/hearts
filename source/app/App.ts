import { DomHelpers } from "@hearts/dom/DomHelpers";
import { Lifecycle } from "@hearts/lifecycle/Lifecycle";
import { Emitter } from "./Emitter/Emitter";
import { Model, ModelState } from "./Model";
import { template, View } from "./template";

export class App {
    private container: HTMLElement;
    private model: Model;
    private view: View;
    private emitter: Emitter;

    public constructor(
        $: DomHelpers,
        lifecycle: Lifecycle,
        emitterFactory: (canvas: HTMLCanvasElement, lifecycle: Lifecycle) => Emitter,
        container: HTMLElement
    ) {
        this.container = container;
        this.model = new Model();
        this.view = template($);
        this.emitter = emitterFactory(this.view.canvas, lifecycle);
        this.bind(lifecycle);
    }

    private bind(lifecycle: Lifecycle) {
        const onLike = () => {
            this.emitter.emit();
            this.model.like();
        };

        const mount = () => {
            this.model.subject.subscribe((e) => this.update(e));

            this.view.like.addEventListener("click", onLike);
            this.container.appendChild(this.view.root);

            this.update(this.model.state);
        };

        const unmount = () => {
            this.model.subject.unbind();

            this.view.like.removeEventListener("click", onLike);
            this.container.removeChild(this.view.root);
        };

        lifecycle.bind({
            mount,
            unmount
        });
    }

    private update(state: ModelState) {
        this.view.likes.innerText = `${state.likes}`;
    }
}
