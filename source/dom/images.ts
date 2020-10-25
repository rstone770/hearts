import { DomHelpers } from "./DomHelpers";

export const imageFromSVGPath = ($: DomHelpers, path: string) => {
    const img = $.element("img");
    img.src = `data:image/svg+xml;base64,${btoa(path)}`;

    return img;
};
