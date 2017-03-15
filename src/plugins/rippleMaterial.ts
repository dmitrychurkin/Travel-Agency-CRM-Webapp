export default class RippleMaterial {
    private readonly classTargSel: string = ".ripple";
    private readonly classNameRip: string = "rippleEffect";
    private readonly OffsetTop: number = 15;
    private readonly OffsetLeft: number = 25;
    constructor() {
        this.setOnClick();
    }
    private _createDinEl(target: Element, { top, left }: { top: number, left: number }) {
        let i = document.createElement("i"),
            OnAnimEnd = () => {
                i.removeEventListener("animationend", OnAnimEnd);
                i.remove();
            };
        i.className = this.classNameRip;
        i.style.top = `${top}px`;
        i.style.left = `${left}px`;

        i.addEventListener("animationend", OnAnimEnd);
        target.appendChild(i);
    }
    private setOnClick() {
        document.addEventListener("click", e => {
            let t: any = e.target,
                target = t.closest(this.classTargSel);
            if (target) {
                if (target.disabled) return;
                target.style.position = "relative";
                target.style.overflow = "hidden";
                target.style.zIndex = "0";
                const { pageYOffset, pageXOffset } = window, { top, left } = target.getBoundingClientRect();
                this._createDinEl(target, { top: e.pageY - (top + pageYOffset) - this.OffsetTop,
                    left: e.pageX - (left + pageXOffset) - this.OffsetLeft
                });
            }
        });
        delete this.setOnClick;
    }
}

