import { Effect } from "@hearts/reactive/Effect";
import { Model } from "./Model";

import { heart } from "../icons";

var img = new Image();
img.src = `data:image/svg+xml;base64,${btoa(heart.fill)}`;

export class Emitter {
    private running: boolean = false;
    private readonly $canvas: HTMLCanvasElement;
    private readonly binding: Effect;
    private readonly context: CanvasRenderingContext2D | null;
    private readonly model: Model;

    public constructor($canvas: HTMLCanvasElement) {
        this.$canvas = $canvas;
        this.context = this.$canvas.getContext("2d");
        this.binding = this.bind();
        this.model = new Model();
    }

    public emit() {
        this.model.emit();
    }

    public mount() {
        this.binding.apply();
    }

    public unmount() {
        this.binding.dispose();
    }

    private bind() {
        const apply = () => {
            this.run();
        };

        const dispose = () => {
            this.stop();
        };

        return Effect.create(apply, dispose);
    }

    private run() {
        if (!this.running) {
            const step = () => {
                this.model.step();
                this.update();
                requestAnimationFrame(step);
            };

            step();
        }

        this.running = true;
    }

    private stop() {
        this.running = false;
    }

    private update() {
        const context = this.context;
        const particles = this.model.state.particles;
        const w = this.$canvas.width;
        const h = this.$canvas.height;

        if (context != null) {
            this.$canvas.width = this.$canvas.clientWidth;
            this.$canvas.height = this.$canvas.clientHeight;

            context.clearRect(0, 0, w, h);

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                context.globalAlpha = 1 - Math.pow(1 - p.x * p.y, 2);
                context.drawImage(img, w * p.x - 36, h * p.y - 36);
            }
        }
    }
}
