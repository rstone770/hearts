export class DomHelpers {
    private document: Document;

    public constructor(document: Document) {
        this.document = document;
    }

    public element<K extends keyof HTMLElementTagNameMap>(tag: K): HTMLElementTagNameMap[K] {
        return this.document.createElement(tag);
    }

    public html<T extends Element = Element>(source: string): T {
        const $container = this.element("div");
        $container.innerHTML = source;

        return ($container.firstElementChild ?? $container) as T;
    }
}
