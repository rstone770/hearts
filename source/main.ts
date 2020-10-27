import { createFactory } from "./app/factory";

export const mount = (container: HTMLElement) => {
    createFactory(document)(container).mount();
};
