type EffectDisposer = () => void;

type DisposableEffect = () => EffectDisposer;
type NonDisposableEffect = () => void;
type AnyEffect = DisposableEffect | NonDisposableEffect;

export class Effect {
    public active: boolean = false;
    private effect: AnyEffect;
    private disposer: EffectDisposer | undefined | null;

    public constructor(effect: AnyEffect) {
        this.effect = effect;
    }

    public apply() {
        if (!this.active) {
            const disposer = this.effect();

            if (disposer != null) {
                this.disposer = disposer;
            }

            this.active = true;
        }

        return () => this.dispose();
    }

    public dispose() {
        if (this.active) {
            if (this.disposer != null) {
                this.disposer();
            }

            this.disposer = null;
            this.active = false;
        }
    }
}
