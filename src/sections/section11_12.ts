import Utilities from "./Utilities";
export default class Section1112 extends Utilities {
    constructor() {
        super();
        let target11: Element = document.querySelector(".S11__det-o-m")!,
            target12: Element = document.querySelector(".S12__row")!;
        for (let { el, cl } of [{ el: target11, cl: "S11__show-m" }, { el: target12, cl: "S12__a" }]) {
           this._U_IntersectionObserver(el, this._U_DefaultHelperForIO(el, cl));
        }
        this._U_GC({}, Object.getPrototypeOf(this), false);
    }
};