import { NoiseGenerator3D } from "@hearts/noise/Noise";
import { RandomNumberGenerator } from "@hearts/random/Random";

const NOISE_Z_STEP = 0.005;
const PARTICLE_TIME_MULTIPLIER = 0.5;
const PARTICLE_VELOCITY_MULTIPLIER = 0.007;
const PARTICLE_VELOCITY_BASIS = 0.0075;

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
    public random: RandomNumberGenerator;

    public constructor(
        noise: NoiseGenerator3D,
        random: RandomNumberGenerator,
        state?: Partial<ModelState>
    ) {
        this.noise = noise;
        this.random = random;
        this.state = { ...DEFAULT_STATE, ...state };
    }

    public emit() {
        this.state.particles.push({
            x: 1,
            y: 1,
            time: this.random.next() * PARTICLE_TIME_MULTIPLIER,
            velocity: this.random.next() * PARTICLE_VELOCITY_MULTIPLIER + PARTICLE_VELOCITY_BASIS
        });
    }

    public step() {
        const particles = this.state.particles;

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            const theta = -1 * this.noise.eval(p.x, p.y, p.time) * Math.PI - Math.PI / 4;

            p.x += Math.cos(theta) * p.velocity;
            p.y += Math.sin(theta) * p.velocity;
            p.time += NOISE_Z_STEP;

            if (p.x < 0 || p.x > 1 || p.y < 0 || p.y > 1) {
                this.state.particles.splice(i, 1);
            }
        }
    }

    public clear() {
        this.state.particles = [];
    }
}
