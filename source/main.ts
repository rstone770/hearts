import { App } from "./app/App";
import { DomHelpers } from "./dom/DomHelpers";

export const mount = ($container: HTMLElement) => {
    const $ = new DomHelpers(document);
    const app = new App($, $container);

    return app.mount();
};
