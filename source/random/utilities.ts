import { Random } from "./Random";

export const randomizeArray = (random: Random, length: number) => {
    return Array.from({ length: Math.max(0, length) }, () => {
        return random.next();
    });
};
