import Utilities from "./Utilities";
export default class Section14 extends Utilities {
    constructor(private imgSrc: string) {
        super();
        this._U_IntersectionObserver(".S14__lim", () => this._a());
    }
    private _a() {
        let pre = document.querySelectorAll(".S14__pre,.S14__gr,.S14__image"),
            chars = Array.from(document.querySelectorAll(".S14__f, .S14__b"));
        this._U_timelineFactory(this._U_objVarsForTimeline({ paused: false }, [ () => this._U_GC({}, this) ]))
            .add(() => pre[0].classList.add("S14__a"))
            .add(() => pre[1].classList.add("S14__a"), "+=1.3")
            .add(() => (pre[2].classList.add("S14__a"), pre[3].classList.add("S14__a")), "+=1.3")
            .add(() => chars.forEach(item => item.classList.add("S14__a")), "+=1.3");
    }
    imLoader() {
        let img = <HTMLImageElement>document.querySelector(".S14__image");
        img.src = this.imgSrc;
        img.onload = (e: any) => console.log("Image promo loaded! ", e);
        img.onerror = (e: any) => console.log("Image promo not loaded! ", e);
    }
}