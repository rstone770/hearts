import { DomHelpers } from "@hearts/dom/DomHelpers";
import { Lifecycle } from "@hearts/lifecycle/Lifecycle";
import { PerlinNoise3D } from "@hearts/noise/PerlinNoise3D";
import { LCG } from "@hearts/random/LCG";
import { frame } from "@hearts/scheduling/frame";
import { schedule } from "@hearts/scheduling/schedule";
import { App } from "./App";
import { Emitter } from "./Emitter/Emitter";
import { Model as EmitterModel } from "./Emitter/Model";

export const createFactory = (document: Document) => {
    const $ = new DomHelpers(document);
    const noise = new PerlinNoise3D();
    const random = new LCG();
    const lifecycle = new Lifecycle();

    const emitterFactory = (canvas: HTMLCanvasElement, lifecycle: Lifecycle) => {
        return new Emitter($, lifecycle, frame, new EmitterModel(noise, random, schedule), canvas);
    };

    const appFactory = (container: HTMLElement) => {
        const component = new App($, lifecycle, emitterFactory, container);

        const app = {
            component,
            lifecycle,
            mount: () => lifecycle.mount()
        };

        return app;
    };

    return appFactory;
};
