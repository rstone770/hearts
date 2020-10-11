export interface Vector3DLiteral {
    x: number;
    y: number;
    z: number;
}

export const arrayToVector3DLiteral = (array: number[]): Vector3DLiteral => {
    return { x: array[0] ?? 0, y: array[1] ?? 0, z: array[2] ?? 0 };
};
