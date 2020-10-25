import { DomHelpers } from "@hearts/dom/DomHelpers";
import { imageFromSVGPath } from "@hearts/dom/images";
import { NoiseFunction3D, NoiseGenerator3D } from "@hearts/noise/Noise";
import { RandomNumberFunction, RandomNumberGenerator } from "@hearts/random/Random";
import { Effect } from "@hearts/reactive/Effect";
import { heart } from "../icons";
import { Model } from "./Model";

const DRAW_X_BASIS = -36; // -1 * (computed canvas padding + heart icon size)
const DRAW_Y_BASIS = -36;

export class Emitter {
    private running: boolean = false;
    private readonly canvas: HTMLCanvasElement;
    private readonly context: CanvasRenderingContext2D | null;
    private readonly binding: Effect;
    private readonly icon: HTMLImageElement;
    private readonly model: Model;

    public constructor(
        $: DomHelpers,
        noise: NoiseGenerator3D,
        random: RandomNumberGenerator,
        canvas: HTMLCanvasElement
    ) {
        this.canvas = canvas;
        this.icon = imageFromSVGPath($, heart.fill);
        this.context = this.canvas.getContext("2d");
        this.binding = this.bind();
        this.model = new Model(noise, random);
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
