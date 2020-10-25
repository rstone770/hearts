import { NoiseGenerator3D } from "@hearts/noise/Noise";
import { RandomNumberGenerator } from "@hearts/random/Random";
import { Scheduler, scheduleRandom } from "@hearts/scheduling/schedule";

const PI1_4 = Math.PI / 4;
const NOISE_Z_STEP = 0.005;
const PARTICLE_Z_VARIANCE = 0.5;
const PARTICLE_VELOCITY_VARIANCE = 0.01;
const PARTICLE_VELOCITY_BASIS = 0.003125;
const PARTICLE_OFFSET_VARIANCE = 0.125;

interface Particle {
    x: number;
    y: number;
    o: number;
    z: number;
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
    public scheduler: Scheduler;

    public constructor(
        noise: NoiseGenerator3D,
        random: RandomNumberGenerator,
        scheduler: Scheduler,
        state?: Partial<ModelState>
    ) {
        this.noise = noise;
        this.random = random;
        this.scheduler = scheduler;
        this.state = { ...DEFAULT_STATE, ...state };
    }

    public emit() {
        this.state.particles.push({
            x: 1,
            y: 1,
            z: this.random.next() * PARTICLE_Z_VARIANCE,
            o: this.random.next() * PARTICLE_OFFSET_VARIANCE - PARTICLE_OFFSET_VARIANCE / 2,
            velocity: this.random.next() * PARTICLE_VELOCITY_VARIANCE + PARTICLE_VELOCITY_BASIS
        });
    }

    public emitRandom() {
        scheduleRandom(this.random, this.scheduler, () => {
            this.emit();
        });
    }

    public step() {
        const particles = this.state.particles;
        const noise = this.noise;

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            const n = noise.eval(p.x + p.o, p.y + p.o, p.z);
            const theta = -1 * n * Math.PI - PI1_4;

            p.x += Math.cos(theta) * p.velocity;
            p.y += Math.sin(theta) * p.velocity;
            p.z += NOISE_Z_STEP;

            if (p.x < 0 || p.x > 1 || p.y < 0 || p.y > 1) {
                particles.splice(i, 1);
            }
        }
    }

    public clear() {
        this.state.particles = [];
    }
}
