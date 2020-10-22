import { NoiseGenerator3D } from "@hearts/noise/Noise";
import { PerlinNoise3D } from "@hearts/noise/PerlinNoise3D";

interface Particle {
    x: number;
    y: number;
    time: number;
    velocity: number;
}

export interface ModelState {
    particles: Particle[];
}

const DEFAULT_STATE: ModelState = {
    particles: []
};

export class Model {
    public state: ModelState;
    public noise: NoiseGenerator3D;

    public constructor(state?: Partial<ModelState>) {
        this.noise = new PerlinNoise3D();
        this.state = { ...DEFAULT_STATE, ...state };
    }

    public emit() {
        this.state.particles.push({
            x: 1,
            y: 1,
            time: Math.random() / 2,
            velocity: Math.random() / 125 + 0.0075
        });
    }

    public step() {
        const particles = this.state.particles;

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            const theta = -1 * this.noise.eval(p.x, p.y, p.time) * Math.PI - Math.PI / 4;

            p.x += Math.cos(theta) * p.velocity;
            p.y += Math.sin(theta) * p.velocity;
            p.time += 0.005;
        }

        this.state.particles = this.state.particles.filter((p) => {
            let result = true;

            if (p.x > 1 || p.y > 1 || p.x < 0 || p.y < 0) {
                result = false;
            }

            return result;
        });
    }

    public clear() {
        this.state.particles = [];
    }
}
