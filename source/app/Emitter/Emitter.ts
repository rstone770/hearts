import { DomHelpers } from "@hearts/dom/DomHelpers";
import { imageFromSVGPath } from "@hearts/dom/images";
import { Lifecycle } from "@hearts/lifecycle/Lifecycle";
import { FrameScheduler } from "@hearts/scheduling/frame";
import { heart } from "../icons";
import { Model } from "./Model";

const DRAW_X_BASIS = -36; // -1 * (computed canvas padding + heart icon size)
const DRAW_Y_BASIS = -36;

export class Emitter {
    private running: boolean = false;
    private readonly canvas: HTMLCanvasElement;
    private readonly context: CanvasRenderingContext2D | null;
    private readonly frame: FrameScheduler;
    private readonly icon: HTMLImageElement;
    private readonly model: Model;

    public constructor(
        $: DomHelpers,
        lifecycle: Lifecycle,
        frame: FrameScheduler,
        model: Model,
        canvas: HTMLCanvasElement
    ) {
        this.canvas = canvas;
        this.frame = frame;
        this.icon = imageFromSVGPath($, heart.fill);
        this.context = this.canvas.getContext("2d");
        this.model = model;
        this.bind(lifecycle);
    }

    public emit() {
        this.model.emit();
    }

    private bind(lifecycle: Lifecycle) {
        const mount = () => {
            this.run();
        };

        const unmount = () => {
            this.stop();
        };

        lifecycle.bind({
            mount,
            unmount
        });
    }

    private run() {
        if (!this.running) {
            const step = () => {
                this.model.step();
                this.update();
            };

            this.running = true;
            this.frame(step, () => !this.running);
            this.model.emitRandom();
        }
    }

    private stop() {
        this.running = false;
        this.model.clear();
    }

    private update() {
        const canvas = this.canvas;
        const context = this.context;
        const particles = this.model.state.particles;
        const w = this.canvas.width;
        const h = this.canvas.height;

        if (context != null) {
            context.clearRect(0, 0, w, h);

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                context.globalAlpha = 1 - Math.pow(1 - p.x * p.y, 2);
                context.drawImage(this.icon, w * p.x + DRAW_X_BASIS, h * p.y + DRAW_Y_BASIS);
            }
        }

        if (canvas.width !== canvas.clientWidth) {
            canvas.width = canvas.clientWidth;
        }

        if (canvas.height !== canvas.clientHeight) {
            canvas.height = canvas.clientHeight;
        }
    }
}
