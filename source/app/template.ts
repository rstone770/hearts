import { DomHelpers } from "@hearts/dom/DomHelpers";
import { heart } from "./icons";
import css from "./style.m.scss";

const TEMPLATE = `
    <div class="${css.Hearts}">
        <div class="${css.controls}">
            <span data-id="likes" class="${css.likes}"></span>
            <button data-id="like" class="${css.like}">
                ${heart.outline}
            </button>
        </div>
        <canvas data-id="canvas" class="${css.canvas}"></canvas>
    </div>
`;

export interface View {
    $: (selector: string) => Element | null;
    root: HTMLElement;
    canvas: HTMLCanvasElement;
    like: HTMLElement;
    likes: HTMLElement;
}

export const template = ($: DomHelpers): View => {
    const $root = $.html(TEMPLATE);
    const $$ = (selector: string) => $root.querySelector(selector);

    return {
        $: $$,
        root: $root as HTMLElement,
        canvas: $$('[data-id="canvas"]') as HTMLCanvasElement,
        like: $$('[data-id="like"]') as HTMLElement,
        likes: $$('[data-id="likes"]') as HTMLElement
    };
};
