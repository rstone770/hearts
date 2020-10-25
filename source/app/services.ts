import { DomHelpers } from "@hearts/dom/DomHelpers";
import { PerlinNoise3D } from "@hearts/noise/PerlinNoise3D";
import { LCG } from "@hearts/random/LCG";
import { App } from "./App";
import { Emitter } from "./Emitter/Emitter";
import { Model as EmitterModel } from "./Emitter/Model";

export const configure = (document: Document) => {
    const $ = new DomHelpers(document);
    const noise = new PerlinNoise3D();
    const random = new LCG();

    const emitterFactory = (canvas: HTMLCanvasElement) => {
        return new Emitter($, new EmitterModel(noise, random), canvas);
    };

    const createApp = (container: HTMLElement) => {
        return new App($, emitterFactory, container);
    };

    return createApp;
};
