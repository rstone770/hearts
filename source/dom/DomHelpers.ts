export class DomHelpers {
    public document: Document;

    public constructor(document: Document) {
        this.document = document;
    }

    public html(source: string): Element {
        const $container = this.document.createElement("div");
        $container.innerHTML = source;

        return $container.firstElementChild ?? $container;
    }
}
