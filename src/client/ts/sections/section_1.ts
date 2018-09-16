import Utilities, { U } from "./Utilities";
import { Parallax } from "../plugins/parallax";
import  ScrollerCustom  from "../plugins/scroller";

class ParallaxNsp {
    static Parallax_Plugin: Parallax;
    private static _attrHandler(state: string) {
        let el: any = this.P_mod;
        el.dataset.status =  state;
    }
    static P_mod: HTMLElement = <HTMLElement>document.querySelector(".S1__par");

    static set(Scene: HTMLElement) {
        this.Parallax_Plugin = new Parallax(Scene);
        U._U_EventListSetter("resize", () => this.enableParallax());
        this.enableParallax();
    }
    static enableParallax() {
        this.Parallax_Plugin.enable();
        this._attrHandler("on");
    }
    static disableParallax() {
        this.Parallax_Plugin.disable();
        this._attrHandler("off");
    }

}
export default class Section1 extends Utilities {
    private ScrollerPlg: ScrollerCustom;
    // private offer = document.querySelector(".S1__r-g");
    Scene: HTMLElement = document.getElementById("S1__sc")!;
    BgImg: string = ".S1__bgi";
    private isReadyForCl = false;

    constructor() {
        super();
        this._U_EventListSetter("click", this._onCl());
        this.ScrollerPlg = new ScrollerCustom({ $target: ".S1__p_h", $placeholder: ".S1" });
    }
    _onCl() {
        return (e: any) => {
            if (!this.isReadyForCl) return;
            let targ = e.target;
            if (targ.closest(".S1__r-g")) {
                TweenLite.to(window, 3, {
                    scrollTo: {
                        y: "#offer",
                        autoKill: false
                    },
                    ease: Sine.easeOut
                });
            }
        };
    }
    actionsWaitForImagesPlugin(): PromiseResolverFn {
        let link: PromiseResolverFn = null,
            promise = new Promise(resolve => {
                link = resolve;
            });
            promise.then(() => {
                 let spinner = document.querySelector(".S1__sp")!, mockLayer = document.querySelector(".S1__m-lay")!;
                    spinner.remove();
                    mockLayer.remove();

                ParallaxNsp.P_mod.classList.add("S1__ok");
                ParallaxNsp.set(this.Scene);
                setTimeout(() => { this.isReadyForCl = true; }, 2000);
                this._U_IntersectionObserver(".S1", this._U_StateTrigger(
                    () => ParallaxNsp.enableParallax(),
                    () => ParallaxNsp.disableParallax()
                ), false, 0);
                this._U_GC_TO_DEL({
                    Scene: !!1,
                    BgImg: !!1
                }, this, false);

                this._U_GC_TO_DEL({
                    actionsWaitForImagesPlugin: !!1,
                    _onCl: !!1
                }, Object.getPrototypeOf(this), false);
            });
        return link!;

    }
    OnFontLoaded(): PromiseResolverFn {

        let link: PromiseResolverFn = null,
            promise = new Promise((resolve) => {
                link = resolve;
            });
            promise.then(() => {
                let p_head = document.querySelector(".S1__p_h")!, p_down = document.querySelector(".S1__p_d")!;
                p_head.classList.add("S1__res-h");
                p_down.classList.add("S1__res-d");
                this.ScrollerPlg.setPlugin();
                this._U_GC_TO_DEL({
                    actionOnDinamicLoadingFont: !!1
                }, Object.getPrototypeOf(this), false);
            });
        return link!;
    }
}
