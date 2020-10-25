import { configure } from "./app/services";

export const mount = (container: HTMLElement) => {
    const factory = configure(document);
    const app = factory(container);

    return app.mount();
};
