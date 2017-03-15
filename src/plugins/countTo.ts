type ICountToOptsIS = ICountToOpts & IS;
export interface ICountToOpts {
    from?: number;
    to?: number;
    speed?: number;
    refreshInterval?: number;
    decimals?: number;
    formatter?: (a: number, o: ICountToOpts) => number;
    onComplete?: ((a: any) => void) | null;
}
export default class CountTo {
    private static DEFAULTS: ICountToOptsIS = {
        from: 0,
        to: 0,
        speed: 1000,
        refreshInterval: 100,
        decimals: 0,
        formatter: (value: number, options: ICountToOpts) => +value!.toFixed(options.decimals),
        onComplete: null
    };
    private $element: HTMLElement;
    private options: ICountToOpts;
    private value: number | undefined;
    private loops: number;
    private loopCount: number;
    private increment: number;
    private interval: number;
    constructor(element: Element, opts?: ICountToOpts) {
        this.$element = element as HTMLElement;
        this.options = this._opts(opts);
        this._init();
    }
    private _opts(opts?: ICountToOptsIS) {
        let newObj: ICountToOptsIS = {};
        for (let o in CountTo.DEFAULTS) {
            newObj[o] = opts![o] || CountTo.DEFAULTS[o];
        }
        return newObj;
    }
    private _init() {
        const { options: { from, to, speed, refreshInterval } }: CountTo  = this;
        this.value     = from;
        this.loops     = Math.ceil(speed / refreshInterval);
        this.loopCount = 0;
        this.increment = (to - from) / this.loops;
    }
    private _update() {
        const { increment, value, loopCount, interval, loops, options: { onComplete, to } }: CountTo  = this;
        this.value += increment;
        this.loopCount++;

        this._render();

        if (loopCount >= loops) {
        clearInterval(interval);
        this.value = to;

            if (typeof onComplete === "function") {
                onComplete(value);
            }
        }
    }
    private _render() {
        const { value, options, options: { formatter } }: CountTo = this;
        let formattedValue = formatter!(value!, options);
        this.$element.innerHTML = formattedValue!.toString();
    }
    private _stop() {
        const { interval } = this;
        if (interval) {
            clearInterval(interval);
        }
    }
    start() {
        this._stop();
        this._render();
        this.interval = setInterval(this._update.bind(this), this.options.refreshInterval);
    }
}
