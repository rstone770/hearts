export const clamp = (value: number, x: number, y: number) => {
    const min = Math.min(x, y);
    const max = Math.max(x, y);

    return Math.max(min, Math.min(max, value));
};
