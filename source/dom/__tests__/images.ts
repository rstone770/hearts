import { DomHelpers } from "../DomHelpers";
import * as images from "../images";

describe("dom/images", () => {
    const $ = new DomHelpers(document);
    const SVG_PATH = `
        <svg width="32" height="32">
            <rect width="32" height="32" style="fill:rgb(0,0,0);" />
        </svg>
    `;

    describe("imageFromSVGPath()", () => {
        it("should create an image element from an svg path.", () => {
            const image = images.imageFromSVGPath($, SVG_PATH);

            expect(image).not.toBe(null);
            expect(image.tagName).toBe("IMG");
            expect(image.src).not.toBe("");
        });
    });
});
