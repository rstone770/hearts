import { cosine } from "./math/interpolation";
import { ValueNoise } from "./noise/ValueNoise";

export const mount = ($container: HTMLElement) => {
    const $canvas = document.createElement("canvas");
    $container.append($canvas);

    return () => {
        $canvas.remove();
    };
};
