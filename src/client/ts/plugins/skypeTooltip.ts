import Utilities from "../sections/Utilities";
export default class SkypeTooltip extends Utilities {
    constructor() {
        super();
        this._U_EventListSetter("click", this._onCl());
    }
    private _onCl() {
        let ToolTip = <HTMLElement>document.querySelector(".sk__tt");
        return (e: any) => {
            let targ = e.target.closest(".skype");
            if (targ) {
                this._selectBestPosition(ToolTip, () => this._calcDist(targ));
            }
        };
    }
    private _selectBestPosition(tooltip: HTMLElement, fn: () => [number , ClientRect]) {
        let res = fn(), offWidth = tooltip.offsetWidth, top = res[1].top + window.pageYOffset;
        if (offWidth + 100 <= res[0]) {
            this._showTooltip(tooltip, {left: res[1].right, top});
        }else if (offWidth + 100 <= res[0] - res[1].width) {
            this._showTooltip(tooltip, {left: res[1].left - offWidth - 5, top});
        }else {
            this._showTooltip(tooltip, {left: res[1].left - (offWidth / 2) + (res[1].width / 2), top: top + res[1].height + 5});
        }
    }
    private _calcDist(targ: HTMLElement): [number, ClientRect] {
        let targClientRect: any = targ.getBoundingClientRect();
        if ( !("width" in targClientRect) ) {
            targClientRect.width = targ.clientWidth;
        }
        if ( !("height" in targClientRect) ) {
            targClientRect.height = targ.clientHeight;
        }
        return [(window.innerWidth - targClientRect.left) + targClientRect.width, targClientRect];
    }
    private _showTooltip(tooltip: HTMLElement, {left, top}: { left: number, top: number }) {
        this._hideTooltip(tooltip);
        tooltip.style.visibility = "visible";
        tooltip.style.opacity = "1";
        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
    }
    private _hideTooltip(tooltip: HTMLElement) {
        setTimeout(() => {
            tooltip.style.visibility = "hidden";
            tooltip.style.opacity = "0";
        }, 2000);
    }
}