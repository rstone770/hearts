export interface Vector2DLiteral {
    x: number;
    y: number;
}

export class Vector2D implements Vector2DLiteral {
    public x: number;
    public y: number;

    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
