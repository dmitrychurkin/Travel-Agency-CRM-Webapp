import CountTo, { ICountToOpts } from "../plugins/countTo";
import Utilities from "./Utilities";
export default class Section10 extends Utilities {

    constructor() {
        super();
        let OnRes = this._onRes();
        OnRes();
        this._U_EventListSetter("resize", OnRes);
        let mainCapt: Element = document.querySelector(".S10__cont")!,
            slaveCapt: Element = document.querySelector(".S10__wrap2")!;
        this._U_IOSetter(".S10__lim", [ this._U_DefaultHelperForIO(mainCapt, "S10__a"), this._U_DefaultHelperForIO(slaveCapt, "S10__a"), ...this._setCount() ]);
        this._U_GC({}, Object.getPrototypeOf(this), false);
    }
    private _setCount() {
        function lambda(elem: Element) {
            return () => elem.classList.add("S10__a");
        }
        let arrOfCounters: Element[] = Array.from(document.querySelectorAll(".S10__num")),
            objToPass: ICountToOpts = {
                        from: 0,
                        speed: 1000,
                        refreshInterval: 25,
                        onComplete: lambda
            };
            // arrFn = [];

        // for (let counterEl of arrOfCounters) {
        //     let countTo: CountTo = new CountTo(counterEl, Object.assign({}, objToPass, { to: this._parser(counterEl), onComplete: lambda(counterEl) }));
        //     let act = () => setTimeout(() => countTo.start(), 500);
        //     arrFn.push(act);
        // }
        // return arrFn;
        return arrOfCounters.map(counterEl => {
            let countTo: CountTo = new CountTo(counterEl, Object.assign({}, objToPass, { to: this._parser(counterEl), onComplete: lambda(counterEl) }));
            return () => setTimeout(() => countTo.start(), 500);
        });
    }
    private _parser(elem: Element): number {
        let to = +elem.innerHTML;
        elem.innerHTML = "0";
        return to;
    }
    private _onRes() {
        return () => {
            let mainCapt: HTMLElement = document.querySelector(".S10__wrap1") as HTMLElement;
            if (window.innerWidth < 775) {
                mainCapt.style.height = "";
                return;
            };

            let videoEl: HTMLVideoElement  = document.querySelector(".S10__vid") as HTMLVideoElement,
                height = videoEl.offsetHeight;
            mainCapt.style.height = `${height}px`;
        };
    }
}
