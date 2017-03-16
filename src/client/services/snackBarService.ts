
type Notificator = {
    mes: string;
    btn: string;
    disabled?: boolean;
    autoClose?: boolean;
};
export default class SnackBarService {
    private TimerId: number | null;
    private OnRes: () => void;
    private OnClickBtn: () => void;
    private OnTransitEnd: () => void;
    private _isCicleFinish: boolean = true;
    private delayToClose: number = 5000;

    constructor() {
        setTimeout(() => document.querySelector(".SBP")!.classList.add("SBP__r"), 500);
    }

    private _resetTime() {
        clearTimeout(this.TimerId!);
        this.TimerId = null;
    }
    private _resetPane(pane: HTMLElement) {
        window.removeEventListener("resize", this.OnRes);
        pane.style.left = "";
    }
    private _onClickBtn(target: HTMLElement, actionFn: (a?: any) => void, linkToPane: HTMLElement) {
        this.OnClickBtn = () => {
            target.removeEventListener("click", this.OnClickBtn);
            this._resetTime();
            if (Function.isFn(actionFn)) {
                actionFn(linkToPane);
            }
        };
        return this.OnClickBtn;
    }
    private _normCbs(input: any): Array<any> {
        return (Array.isArray(input)) ? input : [input];
    }
    private _onTransitEnd(transTarg: Element, callbacksArr: any) {
        this.OnTransitEnd = () => {
            transTarg.removeEventListener("transitionend", this.OnTransitEnd);
            for (let cb of <Array<(a?: any) => void>>this._normCbs(callbacksArr)){
                if (Function.isFn(cb)) {
                    cb(transTarg);
                }
            }

        };
        return this.OnTransitEnd;
    }
    private _onRes(pane: HTMLElement) {
        this.OnRes = () => {
            this._alignPane(pane);
        };
        return this.OnRes;
    }
    private _alignPane(pane= <HTMLElement>document.querySelector(".SBP")) {
        let winWidth = document.body.offsetWidth, paneWidth = pane.offsetWidth;
        if (paneWidth >= winWidth) {
            pane.style.left = 0 + "px";
        }else {
            pane.style.left = ((winWidth - paneWidth) / 2) + "px";
        }
    }
    private _delayedClose(autoClose: boolean, onBeforePaneClose?: null | ((a?: any) => void), onAfterPaneClose?: null | ((a?: any) => void), linkToPane?: HTMLElement) {
        if (autoClose) {
            this.TimerId = setTimeout(() => this.closePane(onBeforePaneClose!, onAfterPaneClose!, linkToPane), this.delayToClose);
        }
    }
    showBar(withBar= true) {
        if (!withBar) return;
        let SB = document.querySelector(".SB")!;
        for (let b of <any>SB.children){
            b.classList.remove("SB_stop");
        }
        SB.classList.add("SB__show");
    }
    setNotificator({ mes, btn, disabled= false, autoClose= false }: Notificator, actionFnOnClick?: (a?: any) => void, onAfterPaneClose?: (a?: any) => void) {
        let linkToPane = <HTMLElement>document.querySelector(".SBP"), b = <HTMLButtonElement>document.querySelector(".SBP__btn");
        document.querySelector(".SBP__message")!.innerHTML = mes;
        b.removeEventListener("click", this.OnClickBtn);
        b.innerHTML = btn;
        b.disabled = disabled;
        if (!this._isCicleFinish) {
            this._alignPane(linkToPane);
        }
        if (!disabled) {
            b.addEventListener("click", this._onClickBtn(b, actionFnOnClick!, linkToPane));
        }

        this._delayedClose(autoClose, null, onAfterPaneClose, linkToPane);
    }
    hideBar(withBar= true, openSnakeBar: any= null) {
        setTimeout(() => {
            if (withBar) {
                let SB = document.querySelector(".SB")!;
                SB.addEventListener("transitionend", this._onTransitEnd( SB, [(transTarg: Element) => Array.from(transTarg.children).forEach(child => child.classList.add("SB_stop")), openSnakeBar] ));
                SB.classList.remove("SB__show");
            }else {
                if (Function.isFn(openSnakeBar)) {
                    openSnakeBar();
                }
            }
        }, 1000);

    }
    closePane(onBeforePaneClose?: ((a?: any) => void) | null, onAfterPaneClose?: ((a?: any) => void) | null, paneTarg= <HTMLElement>document.querySelector(".SBP")) {
        this._resetTime();
        let b = <HTMLButtonElement>document.querySelector(".SBP__btn");
        b.disabled = true;
        this._normCbs(onBeforePaneClose).forEach(fn => Function.isFn(fn) ? fn(paneTarg) : fn);
        paneTarg.addEventListener("transitionend", this._onTransitEnd(paneTarg, [() => b.removeEventListener("click", this.OnClickBtn), (paneTarg: HTMLElement) => this._resetPane(paneTarg), () => {this._isCicleFinish = true; }, ...this._normCbs(onAfterPaneClose)]));
        paneTarg.classList.remove("SBP__open");
    }
    openPane(onBeforePaneOpen?: ((a?: any) => void) | null, onAfterPaneOpen?: ((a?: any) => void) | null, onBeforePaneClose?: ((a?: any) => void) | null, onAfterPaneClose?: ((a?: any) => void) | null, withAutoClose= false) {
        let SBP = <HTMLElement>document.querySelector(".SBP");
        this._normCbs(onBeforePaneOpen).forEach(fn => Function.isFn(fn) ? fn(SBP) : fn);
        this._alignPane(SBP);
        window.addEventListener("resize", this._onRes(SBP));
        SBP.addEventListener("transitionend", this._onTransitEnd(SBP, [...this._normCbs(onAfterPaneOpen), (pane: HTMLElement) => this._delayedClose(withAutoClose, onBeforePaneClose, onAfterPaneClose, pane)]));

        SBP.classList.add("SBP__open");
    }
    config(withBar= true) {

        if (!this._isCicleFinish) return function(){};
        this._isCicleFinish = false;
        this.showBar(withBar);
        return (Extractor: any, actionFnOnClick?: Array<(a?: any) => void> | ((a?: any) => void), onAfterPaneClose?: Array<(a?: any) => void> | ((a?: any) => void)) => {
            let ext = Function.isFn(Extractor) ? Extractor() : Extractor;
            this.hideBar(withBar, () => this.openPane( this.setNotificator.bind(this, ext, actionFnOnClick, onAfterPaneClose) ));
        };
    }
};