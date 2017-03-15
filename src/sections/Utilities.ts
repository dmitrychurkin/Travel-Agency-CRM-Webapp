
import { RequestAnimFrame } from "parallax";

export interface IArrOfFontsArgs {
    family: string;
    success?: Array<() => void>;
    error?: Array<() => void>;
    loading?: Array<() => void>;
}

export default class Utilities {
    // Release a polyfills method
    private _S_reserved: symbol = Symbol();
    _U_Polyfill_Helper() {
        RequestAnimFrame();
    }
    _U_FnShim() {
        Function.isFn = function(...args){
            for (let a of args){
                if (typeof a !== "function") return false;
            }
            return true;
        };
    }
    _U_SetScrollOnLoad() {
        this._U_EventListSetter("beforeunload", () => window.scrollTo(0, 0));
    }
    _U_WebFontsLoaderWrapper(arrOfFonts: Array<IArrOfFontsArgs>) {

        // TODO see webfont loader API how to off styles in html tag
        let families: Array<string> = [];
        for ( let { family } of arrOfFonts) {
            families.push(family);
        }

        let fontHandler = (flag: number) => {
            let Fn = (fn: () => any) => {
                if (Function.isFn(fn)) {
                    fn();
                }
            };
            return (fontFamily: string) => {
                let obj = arrOfFonts.find(el => el.family.split(":", 1).join("") === fontFamily);
                if (obj) {
                    switch (flag) {
                        case 1: {
                            obj.success && obj.success.forEach(Fn);
                            break;
                        }
                        case 2: {
                            obj.error && obj.error.forEach(Fn);
                            break;
                        }
                        case 3: {
                            obj.loading && obj.loading.forEach(Fn);
                        }
                    }

                }
            };
        };


        WebFont.load({
            google: {
                families,
            },
            timeout: 5000,
            fontloading: fontHandler(3),
            fontactive: fontHandler(1),
            fontinactive: fontHandler(2)
        });

    }
    _U_WaitForImagesPlugin(className: string, callbacks: Array<() => void>) {
        let COUNTER = 0,
            TargetElements = Array.from(document.querySelectorAll(className)),
            totalImages = TargetElements.length;
            TargetElements.forEach(async el => {
                let BackGrounImage = window.getComputedStyle(el).backgroundImage!,
                    URLLink = /http.+\.png|jpg$/i.exec(BackGrounImage)![0],
                    fnCheckComplete = (resolver: (value?: {} | PromiseLike<{}> | undefined) => void) => () => resolver(++COUNTER),
                    img = new Image();
                    img.src = URLLink;
                    let totalCount = await new Promise((resolve, reject) => {
                                        img.onerror = fnCheckComplete(reject);
                                        img.onload = fnCheckComplete(resolve);
                                    });
                    if (totalCount === totalImages) {
                        callbacks.forEach(fn => fn());
                    }
            });
    }
    _U_TagsFact(tagName: string, content: string, parentEl?: HTMLElement | Element | string, attr?: IS) {
        if (!content) {
            content = "";
        }
        let tag = document.createElement(tagName);

        for (let a in attr!) {
            tag.setAttribute(a, attr![a]);
        }
        tag.innerHTML = content;
        return (parentEl) ? this._h_(parentEl)!.appendChild(tag) : document.head.appendChild(tag);
    }
    _U_GC(propsObjAvoidToDel = {}, target: IS = {}, killProto = true) {
        for (let prop of Object.getOwnPropertyNames(target)) {
            if (prop in propsObjAvoidToDel)
                continue;
            delete target[prop];
        }
        if (killProto) {

            Object.setPrototypeOf(target, Object.prototype);
        }
    }
    _U_GC_TO_DEL(propsObjToDel = {}, target: IS = {}, killProto = true) {
        for (let prop of Object.getOwnPropertyNames(target)) {
            if (prop in propsObjToDel) {
                delete target[prop];
            }
        }
        if (killProto) {
            Object.setPrototypeOf(target, Object.prototype);
        }
    }
    _U_objVarsForTimeline(objProps = {}, callbacks: Array<(a?: any) => void> = []) {
        return Object.assign({}, {
            paused: true,
            onComplete: (t: any, ...callbacks: Array<(a?: any) => void>) => {
                t.kill();
                for (let Fn of callbacks) {
                    if (Function.isFn(Fn)) Fn();
                }
            },
            onCompleteParams: ["{self}", ...callbacks]
        }, objProps);
    }
    _U_timelineFactory(arg = {}) {
        return new TimelineMax(arg);
    }
    _U_animationPlay(timeLine: any) {
        timeLine && timeLine.play();
    }
    _U_animationPause(timeLine: any) {
        timeLine && timeLine.pause();
    }
    _U_animationKill(timeLine: any) {
        timeLine && timeLine.kill();
    }
    _U_FromValToPer(maxValue: number, curValue: number) {
        return (curValue * 100) / maxValue;
    }
    _U_FromPerToVal(maxValue: number, curPerc: number) {
        return (maxValue * curPerc) / 100;
    }
    _U_DefaultHelperForIO(target: string | Element | HTMLElement, classModifier: string) {
        let _U_: any = (...r: Array<any>) => {
            this._h_(target)!.classList.add(classModifier);
            r && r[1] && r[1].disconnect();
        };
        _U_[this._S_reserved] = true;
        return _U_;
    }
    _U_StateTrigger(fnIfFalse: () => any, fnIfTrue: () => any) {
        return () => {
            let $this: any = this, { state } = $this;
            !state ? fnIfFalse() : fnIfTrue();
            $this.state = !state;
        };
    }
    private _h_(targetElem: string | Element | HTMLElement) {
        return typeof targetElem === "string" ? document.querySelector(targetElem) : targetElem;
    }

    _U_IOSetter(selector: string, actions: Array<() => void> = [], toDisconnect: boolean = true, treshold: number = 1) {
        Array.from(document.querySelectorAll(selector)).forEach((el, i) => {
            this._U_IntersectionObserver(el, () => {
                if (Function.isFn(actions[i])) {
                    actions[i]();
                }
            }, toDisconnect, treshold);
        });
    }
    _U_IntersectionObserver(targetElem: string | Element | HTMLElement, handler: (a?: any) => void, toDisconnect: boolean = true, treshold: number = 1) {
        let fn = (...r: Array<any>) => {
            handler(r);
            if (toDisconnect) {
                r[1].disconnect();
            }
        };
        fn = Object.getOwnPropertySymbols(handler)[0] === this._S_reserved ? handler : fn;
        new IntersectionObserver(fn, { treshold }).observe(this._h_(targetElem));
    }
    _U_EventListSetter(eventName: string, handler: (a?: any) => void, root?: string | Element | HTMLElement) {
        if (typeof root === "undefined") {
            window.addEventListener(eventName, handler);
        }else {
            this._h_(root)!.addEventListener(eventName, handler);
        }
    }
    // _U_IReady(elName: string, clName: string) {
    //     return () => document.querySelector(elName)!.classList.add(clName);
    // }
}

export const U = Utilities.prototype;