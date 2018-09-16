import Utilities from "../sections/Utilities";

export default class ScrollerCustom extends Utilities {
    private readonly $ph: HTMLElement;
    private readonly $target: HTMLElement;
    private readonly initialPos: number;
    private readonly _PH_height_SnapshotConst: number = 350;
    private readonly FullPathtargetConst: number = 110;
    private FullPathtarget: number;

    constructor({$target, $placeholder, initialPos = 0}: { $target: string, $placeholder: string, initialPos?: number }) {
        super();
        this.$ph = <HTMLElement>document.querySelector($placeholder);
        this.$target = <HTMLElement>document.querySelector($target);
        this.initialPos = initialPos;
        this.Computation();
    }
    private Computation() {
        let { $ph: { offsetHeight }, _PH_height_SnapshotConst, FullPathtargetConst } = this,
            getPercentage =  this._U_FromValToPer(_PH_height_SnapshotConst, offsetHeight);
            this.FullPathtarget = this._U_FromPerToVal(FullPathtargetConst, getPercentage);
    };
    get PH_height(){
        return this.$ph.offsetHeight;
    }

    get ScrollTop(){
        return window.pageYOffset;
    }
    get TargetFullPath(){
        return this.FullPathtarget;
    }

    setPlugin() {
        let Fn = () => {
            let { ScrollTop, initialPos, $target: { style } } = this;
            this.Computation();
            if (ScrollTop >= initialPos) {
                let generalPerc = this._U_FromValToPer(this.PH_height, ScrollTop);
                if (generalPerc > 100) {
                    return;
                }

                style.transform = `translate(0, ${this._U_FromPerToVal(this.TargetFullPath, generalPerc)}px)`;
                style.opacity = (1 - (generalPerc / 100)).toString();

            }

        };

        Fn();
        this._U_EventListSetter("scroll", Fn);
        this._U_EventListSetter("resize", () => setTimeout(() => {
             this.Computation();
             Fn();
        }, 500));
    }
}

