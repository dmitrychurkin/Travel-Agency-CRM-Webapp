import Utilities from "../sections/Utilities";
export default class Chip extends Utilities {
    // private readonly AttrName: string = "data-star-count";
    private readonly AnimClass1: string = "chip__anim";
    private readonly AnimClass2: string = "chip__star_init";
    private readonly Count: number = 5;
    private readonly StartUpDelay: number = 300;
    private Chips: NodeListOf<Element> | null;
    private readonly StarContainers: NodeListOf<Element> = document.querySelectorAll(".chip__stars");
    private readonly StarTemp: Element = this.StarContainers[0].firstElementChild;
    private RootTimeline: TimelineLite;

    constructor() {
        super();
        this._starFact();
    }
    _insertStar(starCont: Element) {
        for (let i = 0, sC = this._getCount(starCont), { Count, StarTemp} = this; i < Count; ++i) {
            let newStar = <Element>StarTemp.cloneNode(true);
            if (StarTemp === starCont.firstElementChild && i === 0) {
                continue;
            }
            starCont.appendChild(newStar);
            let path = newStar.firstElementChild;
            if (i + 1 <= sC) {
                path.setAttribute("fill", "#f8d64e");
            }else {
                path.setAttribute("fill", "#949492");
            }
        }
    }
    private _getCount(starCont: any): number {
        // return starCont.getAttribute('data-star-count');
        return +starCont.dataset.starCount;
    }
    private _starFact() {
        const{ StarContainers } = this;
        for (let starCont of <any>StarContainers){
            this._insertStar(starCont);
        }
    }
    private _timer(fn: () => void, delay: number) {
        setTimeout(fn, delay);
    }
    private _Rate(slideChips: Element) {
        this.Chips = slideChips.querySelectorAll(".chip");
        // console.log(slideChips.querySelectorAll(".chip__stars"));
        return slideChips.querySelectorAll(".chip__stars")[Symbol.iterator]();
        // return function*(){
        //     for (let starCont of <any>slideChips.querySelectorAll('.chip__stars')){
        //         yield starCont.children;
        //     }
        // };
    }
    private _clearAnim() {
        // let t = this.RootTimeline;
        // if (t) {
        //     t.kill();
        // }
        this._U_animationKill(this.RootTimeline);
    }
    Activate(slideChips: Element) {
        // let _cb = this._Rate(slideChips);
        let g = this._Rate(slideChips);
        // console.log("Activate", g);
        const{ Chips, AnimClass1, AnimClass2, StartUpDelay } = this;
        let arrFn = [];
        for (let i = 0/*, g = _cb()*/; i < Chips!.length; i++) {
            let svgSet = g.next().value.children;
            // console.log("Activate for ", svgSet);
            arrFn.push(() => {
                Chips![i].classList.add(AnimClass1);
                this._timer(() => {
                    for (let i = 0; i < svgSet.length; ++i) {
                        this._timer(() => {
                            svgSet[i].classList.add(AnimClass2);
                        }, i * (StartUpDelay - 200));
                    }
                }, StartUpDelay);
            });
        }
        this.RootTimeline = this._U_timelineFactory()
                                .add(arrFn, "+=0", "start", StartUpDelay / 1000);
    }

    Reset() {
        const{ AnimClass1, AnimClass2 } = this;
        this._clearAnim();
        Array.from(/*Chips*/document.querySelectorAll(`.${AnimClass1}`)).forEach(chip => {
            chip.classList.remove(AnimClass1);
            Array.from(chip.querySelectorAll(`.${AnimClass2}`)).forEach(star => star.classList.remove(AnimClass2));
        });
        this.Chips = null;
    }
}
/*let chip = new Stars();
setTimeout(()=>{
    chip.Activate(document.querySelector('.chips-material'));
},1000);
setTimeout(()=>{
    chip.Reset();
},5000);
setTimeout(()=>{
    chip.Activate(document.querySelector('.chips-material'));
},6000);
setTimeout(()=>{
    chip.Reset();
},10000);*/