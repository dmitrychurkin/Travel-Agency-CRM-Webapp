// for debag only
/*import Utilities from "../sections/Utilities";
window._WFW_ = new Utilities;
let a: any = window._WFW_;
a._U_FnShim();*/
//
import SnackBarService from "./snackBarService";
import Scheduller from "./schedullerService";

type FormModuleInitParamsObject = {
    onClS?: (a?: any) => void;
    onClF?: (a?: any) => void;
    onAfClose?: (a?: any) => void;
};
class ClientFormValidator {
    protected _checkValidity(target: HTMLInputElement) {
        if (target.checkValidity) {
            return target.checkValidity();
        }
        // stub
        return true;
    }
    protected _whiteSpaceWatcher(value: string, target: HTMLInputElement) {
        let arrValue = value.split(" ").filter((item: string) => !!item);
        if (arrValue.length > 1) {
            target.value = arrValue.join(" ");
        }else {
            target.value = arrValue.join("");
        }
    }
    protected _validateField(target: HTMLInputElement) {
        let value = target.value.trim();
        let targetParent = <HTMLElement>target.parentNode;
        if (value) {
            targetParent.classList.add("F__dirty");
            if (this._checkValidity(target)) {
                this._whiteSpaceWatcher(value, target);
                this._setMessage(target);
                targetParent.classList.add("F__valid");
            }else {
                this._setMessage(target);
                targetParent.classList.add("F__invalid");
            }
        }else {
            if (target.required) {
                this._setMessage(target);
                targetParent.classList.add("F__invalid");
            }
            targetParent.classList.remove("F__dirty");
            target.value = "";
        }
        targetParent.classList.remove("F__active");
    }
    protected _setMessage(target: any) {
        target.parentNode.querySelector(".F__inform").innerHTML = target.validationMessage || "";
    }
}


export default class FormModule extends ClientFormValidator {
    private OnRes: (a?: any) => void;
    private OnFocus: (a?: any) => void;
    private OnBlur: (a?: any) => void;
    private OnSub: (a?: any) => void;
    private Base: any = window._WFW_;
    private H_Flag: string = "que";
    private scheduller: Scheduller;
    private snackBar: SnackBarService = new SnackBarService();
    constructor() {
        super();
        this.scheduller = new Scheduller(this.Base.httpService);
        this._setOnAllInputs();
        this.OnRes = this._onLayoutChange(Array.from(document.querySelectorAll(".F__textarea")), document.querySelectorAll(".F__layout-block"));
        this.OnRes();
        this.Base._U_EventListSetter("resize", this.OnRes);
    }
    private get LANG(){
        return window.SITE_LANG || "EN";
    }
    private get Default_btn(){
        return document.getElementById("Default_btn")!.innerHTML;
    }
    private _httpOpts(url: string | Array<string>, body: IS, method: string= "POST") {
        return {
            url,
            options: {
                method,
                cache: "no-cache",
                headers: {
                    "Content-type": "application/json; charset=utf-8",
                    "Accept": "application/json"
                },
                body
            }
        };
    }
    private _formSerializer(form: HTMLFormElement) {
        let resultElements = form.querySelectorAll(".F__form-wrap input:not([type=submit]), .F__form-wrap textarea");
        let outPut: IS = {};
        for (let input of <any>resultElements){
            if (input.type === "radio" || input.type === "checkbox") {
                if (input.checked) {
                    outPut[input.id] = true;
                }
            }else {
                if (!input.value.trim()) {
                    continue;
                }
                outPut[input.id] = input.value.trim();
            }
        }

        return Object.assign({ ACTION: "REGISTER", SITE_LANG: this.LANG }, outPut);
    }
    private _delay(fn: () => void) {
        setTimeout(fn, 1000);
    }

    private _hydratorLS(reqId: string) {
        if ("localStorage" in window) {
            const{ H_Flag } = this;
            let str = localStorage.getItem(H_Flag);
            if (!str) {
                localStorage.setItem(H_Flag, [reqId].join(", "));
            }else {
                let arr = str.split(", ");
                arr.push(reqId);
                localStorage.setItem(H_Flag, arr.join(", "));
            }
            return true;
        }
        return false;
    }
    private _disableBtn(btn: HTMLButtonElement) {
        btn.disabled = true;
    }
    private _enableBtn(btn: HTMLButtonElement) {
        btn.disabled = false;
    }
    private _onSubmit({ onClS, onClF, onAfClose }: FormModuleInitParamsObject, OnSuccess?: () => void, OnFail?: () => void) {

        return (e: Event) => {
            e.preventDefault();
            let target: any = e.target,
                invalidCollection = target.querySelectorAll(".F__invalid"),
                submitBtn = target.action;
            if (!e.isTrusted || invalidCollection.length > 0 || !this.Base.S7.isCanSendForm) return;
            this.Base.S7.isCanSendForm = false;
            let SB: ((Extractor: any, actionFnOnClick?: ((a?: any) => void)[] | ((a?: any) => void) | undefined, onAfterPaneClose?: ((a?: any) => void)[] | ((a?: any) => void) | undefined) => void) | null = this.snackBar.config();
            this._disableBtn(submitBtn);

            this.Base.httpService.sendReq(this._httpOpts(this.Base.S7.URIs.order, this._formSerializer(target)))
                .then((res: any) => {
                    res = JSON.parse(res);
                    this.Base.ReqID = res.reqId;
                    if (Function.isFn(OnSuccess)) OnSuccess!();
                    SB!({ mes: res.info, btn: document.querySelector("#N__register .N__success .btn")!.innerHTML, autoClose: true, disabled: false }, onClS, onAfClose);

                })
                .catch(() => {
                    if (Function.isFn(OnFail)) OnFail!();
                    SB!(
                        this._forWidgetExtractor({ selectorName: "#N__register .N__fail" }),
                        () => onClF!(() => { this.Base.S7.isCanSendForm = true; this._enableBtn(submitBtn); }),
                        [() => this._enableBtn(submitBtn)!, onAfClose!]
                    );

                })
                .then(() => {
                    SB = null;
                });
        };
    }
    private _forWidgetExtractor({ selectorName, mesSel= ".mes", btnSel= ".btn" }: { selectorName: string, mesSel?: string, btnSel?: string }, { autoClose= true, disabled= false }= {}) {
        if (!selectorName) throw new Error("You Idiot!");
        return () => {
            let Root = document.querySelector(selectorName)!,
                mes = Root.querySelector(mesSel)!.innerHTML,
                btn = Root.querySelector(btnSel) ? Root.querySelector(btnSel)!.innerHTML : this.Default_btn;

            return {
                mes, btn,
                autoClose, disabled
            };
        };
    }
    private _setDefDate(input: any) {
        if (input.type.includes("date")) {
            input.parentNode.classList.add("F__dirty");
            setTimeout(() => {
                input.value = new Date().toISOString().substring(0, 10);
            });
            input.min = new Date().toISOString().substring(0, 10);
        }
    }
    private _checkDefaults(input: any) {
        if (input.value) {
            input.parentNode.classList.add("F__dirty");
        }
    }
    private _createMesPh(input: HTMLInputElement) {
        let div = document.createElement("div");
        div.className = "F__inform";
        div.innerHTML = "";
        input.parentNode!.insertBefore(div, input.nextElementSibling);
    }
    private _setOnAllInputs() {
        let inputsArr: any = document.querySelectorAll(".F__form-wrap input:not([type=submit]), .F__form-wrap textarea");
            this.OnFocus = (e: Event) => {
                let target: any = e.target, targetParent = target.parentNode;

                targetParent.classList.remove("F__valid");
                targetParent.classList.remove("F__invalid");
                targetParent.classList.add("F__active");
            },
            this.OnBlur = (e: Event) => {
                let target: any = e.target;
                this._validateField(target);
            };

        for (let input of inputsArr){
            if (input.type === "checkbox" || input.type === "radio") continue;
            this._createMesPh(input);
            this._setDefDate(input);
            this._checkDefaults(input);
            this.Base._U_EventListSetter("focus", this.OnFocus, input);
            this.Base._U_EventListSetter("blur", this.OnBlur, input);
        }
    }
    private _onLayoutChange(elementsToAppend: Array<Element>, appendTo: NodeListOf<Element>) {
        const DEADLINE = 923;
        return () => {
            if (document.documentElement.offsetWidth < DEADLINE) {
                elementsToAppend.forEach(el => {
                    appendTo[1].appendChild(el);
                });
            }else {
                elementsToAppend.forEach(el => {
                    appendTo[0].appendChild(el);
                });
            }
        };
    }
    canceller() {
        const{ LANG, Base, H_Flag, scheduller, snackBar } = this;
        let onAfterClose = () => {
                Base.S7.isCanSendForm = true;
            },
            Fn = (mes: string, onClick= () => snackBar.closePane(null!, onAfterClose)) => snackBar.setNotificator({ mes, btn: this.Default_btn, autoClose: true, disabled: false }, onClick, onAfterClose),
            body = { ACTION: "CANCEL", SITE_LANG: LANG, reqId: Base.ReqID };
        snackBar.setNotificator(this._forWidgetExtractor({ selectorName: "#N__cancel .N__inprocess" }, { autoClose: false, disabled: true })());

        let httpOptions = this._httpOpts(Base.S7.URIs.order, body, "DELETE");
        Base.httpService.sendReq(httpOptions)
            .then((res: any) => this._delay(() => Fn(res)))
            .catch(() => this._delay(() => {
                this._hydratorLS(Base.ReqID) ? (scheduller && Function.isFn(scheduller.watch) && scheduller.watch(H_Flag, httpOptions)) : null;
                Fn(document.querySelector("#N__cancel .N__fail .mes")!.innerHTML);
            }));
    }
    onCloseForm() {
        window.removeEventListener("resize", this.OnRes);
        for (let form of <any>document.forms){
            form.removeEventListener("submit", this.OnSub);
        }
        for (let input of <any>document.querySelectorAll(".F__form-wrap input:not([type=submit]), .F__form-wrap textarea")){
            input.removeEventListener("focus", this.OnFocus);
            input.removeEventListener("blur", this.OnBlur);
        }
    }

    setModule(args: FormModuleInitParamsObject, onSuccess?: (a?: any) => void, onFail?: (a?: any) => void) {
        this.OnSub = this._onSubmit(args, onSuccess, onFail);
        for (let form of <any>document.forms){
            this.Base._U_EventListSetter("submit", this.OnSub, form);
        }
    }
};
