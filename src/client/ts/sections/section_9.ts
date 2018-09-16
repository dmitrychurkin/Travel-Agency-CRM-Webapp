
import Utilities from "./Utilities";

export default class Section9 extends Utilities {
    // private status: boolean = false;
    // private FLink: () => void;
    constructor() {
        super();
        // this.FLink = this.Animate();
        // this._U_IntersectionObserver(".S9", () => { this.status = !this.status; this.FLink(); }, false, 0);
        this._U_IntersectionObserver(".S9", this.Animate(), true, 0);
    }
    private Animate() {
        let counter = 0;

        let fn = () => {
            let targetEl: HTMLElement = <HTMLElement>document.getElementById("S9__sc");
                if (targetEl.scrollTop + targetEl.offsetHeight < targetEl.scrollHeight) {
                    targetEl.scrollTop = ++counter;
                }else {
                    targetEl.scrollTop = counter = 0;
                }
                // if (this.status) {
                    window.requestAnimationFrame(fn);
                // }
        };
        return fn;
    }
}
