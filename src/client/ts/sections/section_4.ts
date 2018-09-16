import Utilities from "./Utilities";

export default class Section4 extends Utilities {
    constructor() {
        super();
        this._U_IntersectionObserver(".S4__lim", () => this._crAn());
    }
    private _crAn() {
        this._U_timelineFactory(this._U_objVarsForTimeline({ paused: false }, [() => this._U_GC({}, this)]))
            .add((() => {
                let arr = [];
                    for (let d of <any>document.querySelectorAll(".S4__init")) {
                        arr.push(() => d.classList.remove("S4__init"));
                    }
                    return arr;
            })(), "+=0", "start", 0.3)
            .add(() => (document.querySelector(".S4__text")!.classList.add("S4__text_v"), document.querySelector(".S4__s")!.classList.add("S4__text_v"), document.querySelector(".S4__tit")!.classList.add("S4__tit_v")))
            .add(() => (Array.from(document.querySelectorAll(".S4__ia")).forEach(el => el.classList.add("S4__ia_v")), Array.from(document.querySelectorAll(".S4__ia-c")).forEach(el => el.classList.add("S4__ia-c_v"))));
    }
}
