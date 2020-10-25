import { doc } from "prettier";
import { App } from "./app/App";
import { DomHelpers } from "./dom/DomHelpers";
import { noise, PerlinNoise3D } from "./noise/PerlinNoise3D";
import { LCG, random } from "./random/LCG";

export const mount = ($container: HTMLElement) => {
    const $ = new DomHelpers(document);
    const noise = PerlinNoise3D.default;
    const random = LCG.default;
    const app = new App(new DomHelpers(document), noise, random, $container);

    return app.mount();
};
