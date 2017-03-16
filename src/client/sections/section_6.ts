import Utilities from "./Utilities";
export default class Section6 extends Utilities {
    constructor() {
        super();
        this._OnInit(window.innerWidth);
        let f = this._OnInit;
        this._U_EventListSetter("resize", () => f.call(this, window.innerWidth));
        this._U_IOSetter(".S6__lim", [
            () => {
                let tit = document.querySelector(".S6__a_tit")!;
                tit.classList.add("S6__v");
                tit.nextElementSibling!.classList.add("S6__v");
            },
            ...this._combineToAn()
        ]);
    }
    private _OnInit(curWidth: number) {

            const MAXWIDTH = 1366,
                MINWIDTH = 1030,
                FULLPATH = MAXWIDTH - MINWIDTH,
                MAXANGLE = 90,
                MINANGLE = 65,
                FULLANGLEPATH = MAXANGLE - MINANGLE;
                if (curWidth < MINWIDTH) return;
                let PercentWin = this._U_FromValToPer(FULLPATH, curWidth - MINWIDTH),
                    ValueToSet = this._U_FromPerToVal(FULLANGLEPATH, PercentWin),
                    jR = <Array<HTMLElement>>Array.from(document.querySelectorAll(".S6__j-r")),
                    jL = <Array<HTMLElement>>Array.from(document.querySelectorAll(".S6__j-l"));

                jR.forEach(el => (el.style.transform = `rotate(${MAXANGLE - ValueToSet}deg)`));
                jL.forEach(el => (el.style.transform = `rotate(-${(MAXANGLE - ValueToSet) + 180}deg)`));

    }
    private _combineToAn() {
        let arrG = [];
        for (let i = 0, p = document.querySelectorAll(".S6__p"); i < p.length; ++i) {
                let arr: Array<(() => void) | TweenLite> = [];
                if (i === 0) {
                    arr.push(() => document.querySelector(".S6__kp_h")!.classList.add("S6__v"));
                }
                arr.push(() => {
                    p[i].firstElementChild!.classList.add("S6__v");
                    p[i].querySelector(".S6__p_i")!.classList.add("S6__v");
                });
                let Joint = p[i].querySelector(".S6__mk");
                if (Joint) {
                    arr.push(TweenLite.to(Joint, 1, {
                        css: {
                            width: "0%"
                        },
                        delay: .1,
                        ease: Power4.easeIn
                    }));
                }
                let Tl = this._U_timelineFactory(this._U_objVarsForTimeline({}, [i + 1 === p.length ? () => this._U_GC({}, Object.getPrototypeOf(this), false) : () => ""])).add(arr);
                arrG.push(() => this._U_animationPlay(Tl));

        }
        return arrG;
    }
}