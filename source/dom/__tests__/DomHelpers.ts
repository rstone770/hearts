import { DomHelpers } from "../DomHelpers";

describe("dom/DomHelpers", () => {
    describe("element()", () => {
        it("should create an element by tag.", () => {
            const $ = new DomHelpers(document);
            const div = $.element("div");

            expect(div).not.toEqual(null);
            expect(div.tagName).toBe("DIV");
        });
    });

    describe("html()", () => {
        const TEMPLATE = `
            <button>hello <span>world</span></button>
        `;

        it("should return a rendered html tag.", () => {
            const $ = new DomHelpers(document);
            const view = $.html(TEMPLATE);

            expect(view).not.toEqual(null);
            expect(view.tagName).toBe("BUTTON");
            expect(view.firstElementChild?.tagName).toBe("SPAN");
            expect(view.firstElementChild?.textContent).toBe("world");
        });

        it("should return wrapper div if child is text content.", () => {
            const $ = new DomHelpers(document);
            const view = $.html("hello world");

            expect(view).not.toBe(null);
            expect(view.tagName).toBe("DIV");
            expect(view.textContent).toBe("hello world");
        });
    });
});
