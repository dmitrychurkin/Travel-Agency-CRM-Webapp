import Utilities from "./Utilities";
import Chip from "../plugins/chip";
export default class Section8 extends Utilities {
    private a: string = "S8__active";
    private ia: string = "S8__inactive";
    private animCl: string = "S8__animating";
    private S8: Element = document.querySelector(".S8")!;
    private Slider = document.querySelector(".S8__slides") as HTMLElement;
    private slideBGs = Array.from(document.querySelectorAll(".S8__s-b")) as Array<HTMLElement>;
    private diff: number = 0;
    private curSlide: number = 0;
    private numOfSlides: number = document.querySelectorAll(".S8__slide").length;
    private animating: boolean = false;
    private animTime: number = 500;
    private autoSlideTimeout: NodeJS.Timer;
    private autoSlideDelay: number = 6000;



    constructor(private readonly Chip: Chip) {
        super();
        this._createBullets();
        this._setEvList();
        this._U_IntersectionObserver(".S8__lim", () => this._changeSlides(true));
        this._U_GC_TO_DEL({ _createBullets: !!1, _setEvList: !!1 }, Object.getPrototypeOf(this));
    }
    private _clearCl(sel: string, cl: string) {
        let activeEl = this.S8.querySelector(`${sel}.${cl}`);
            if (activeEl) {
                activeEl.classList.remove(cl);
            }
    }
    private _createBullets() {
        const { numOfSlides, a } = this;

        for (let i = 0; i < numOfSlides; i++) {
            let li = <HTMLElement>this._U_TagsFact("li", "", ".S8__b"/*pagin*/, { "class": `S8__b-el S8__b-el-${i}`, "data-slide": i });
            if (!i) li.classList.add(a);
        }
    }
    private _manageControls() {
        const { curSlide, numOfSlides, S8, ia } = this;
        this._clearCl(".S8__ctrl", ia);
        if (!curSlide) S8.querySelector(`.S8__s${curSlide} .S8__c_left`)!.classList.add(ia);
        if (curSlide === numOfSlides - 1) S8.querySelector(`.S8__s${curSlide} .S8__c_right`)!.classList.add(ia);
    }
    private _autoSlide() {
        const { numOfSlides, autoSlideDelay } = this;

        this.autoSlideTimeout = setTimeout(() => {

            if (++this.curSlide > numOfSlides - 1) this.curSlide = 0;
            this._changeSlides();
        }, autoSlideDelay);
    }
    private _changeSlides(instant?: boolean) {
        const{ Slider, animTime, S8, curSlide, slideBGs, a, animCl, Chip } = this;
        let addActive = (el: HTMLElement, targClass: string) => {
            this._clearCl(targClass, a);
            if (el) {
                el.classList.add(a);
            }
        };
        setTimeout(() => {
                if (this.animating) return;
                Chip.Reset();
                Chip.Activate(S8.querySelector(".S8__active .S8__plugin")!);
        }, instant ? 0 : 1000);
        if (!instant) {
            this.animating = true;
            this._manageControls();
            Slider!.classList.add(animCl);
            addActive(<HTMLElement>Slider!.querySelector(`.S8__s${curSlide}`), ".S8__slide");
            setTimeout(() => {
                Chip.Reset();
                Slider!.classList.remove(animCl);
                this.animating = false;
            }, animTime);
        }
        clearTimeout(this.autoSlideTimeout);
        addActive(<HTMLElement>S8.querySelector(`.S8__b-el-${curSlide}`), ".S8__b-el");
        Slider!.style.transform = `translate3d(${-curSlide * 100}%,0,0)`;
        slideBGs.forEach(el => {
            el.style.transform = `translate3d(${curSlide * 50}%,0,0)`;
        });
        this.diff = 0;

        this._autoSlide();
    }
    private _navL() {
        const{ animating, curSlide } = this;
        if (!animating && curSlide > 0) {
            this.curSlide--;
            this._changeSlides();
        }
    }
    private _navR() {
        const{ animating, curSlide, numOfSlides } = this;
        if (!animating && curSlide < numOfSlides - 1) {
            this.curSlide++;
            this._changeSlides();
        }
    }

    private _onClick() {
        return (e: any) => {
            let targ = e.target, ctrl = targ.closest(".S8__ctrl"), bul = targ.closest(".S8__b-el");
            const{ curSlide, animating } = this;
            switch (true) {
                case !!ctrl:
                    return ctrl.classList.contains("S8__c_left") ? this._navL() : this._navR();
                case !!bul: {
                    let num = +bul.dataset.slide;
                    if (num === curSlide || animating) return;
                    this.curSlide = num;
                    this._changeSlides();
                }
            }
        };
    }
    private _onRes() {
        let btn: any = this.S8.querySelectorAll(".S8__t-h-link button");
        let OnRes = () => {
            if (window.innerWidth >= 946 && btn[0].classList.contains("ripple")) {
                for (let b of btn){
                    b.classList.remove("ripple");
                    b.style.overflow = "";
                }
            }else if (window.innerWidth < 946 && !btn[0].classList.contains("ripple")) {
                for (let b of btn) {
                    b.classList.add("ripple");
                    b.style.overflow = "hidden";
                }
            }
        };
        OnRes();
        return OnRes;
    }
    private _setEvList() {
        this._U_EventListSetter("click", this._onClick(), this.S8);
        this._U_EventListSetter("resize", this._onRes());
    }
}
