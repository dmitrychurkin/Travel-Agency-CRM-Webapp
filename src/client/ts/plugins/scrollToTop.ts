import Utilities from "../sections/Utilities";
export default class ScrollToTop extends Utilities {
    private isAnim: boolean = false;
    private svg = document.querySelector(".Top svg")!.classList;
    constructor() {
        super();
        let fn = this._onScr();
        this._U_EventListSetter("click", this._onCl());
        this._U_EventListSetter("scroll", fn);
    }
    private _onCl() {
        let lastPos = 0;
        return (e: any) => {
            if (this.isAnim) return;
            let targ = e.target;
            if (targ.closest(".Top")) {
                let { pageYOffset } = window;
                if (pageYOffset > 0) {
                    lastPos = pageYOffset;
                }
                this._animate(!pageYOffset ? lastPos : 0);
            }
        };
    }
    private _onScr() {
        let bCl = document.querySelector(".Top")!.classList,
            S1 = document.querySelector(".S1")!;

        return () => {
            if (this.isAnim) return;
            if (S1.getBoundingClientRect().bottom < 0 && !bCl.contains("Top__on")) {
                bCl.add("Top__on");
            }else if (S1.getBoundingClientRect().bottom >= 0 && bCl.contains("Top__on")) {
                bCl.remove("Top__on"),
                this.svg.remove("Top__cl");
            }
        };
    }
    private _animate(pos: number) {
        !pos ? this.svg.add("Top__cl") : this.svg.remove("Top__cl");

        this.isAnim = true;
        TweenLite.to(window, 1, {
            scrollTo: { y: pos, autoKill: false },
            ease: Circ.easeOut,
            onComplete: () => setTimeout(() => this.isAnim = false, 100)
        });
    }
}