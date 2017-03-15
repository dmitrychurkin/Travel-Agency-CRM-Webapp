import * as tslib_1 from "tslib";
import { RequestAnimFrame } from "parallax";
var Utilities = (function () {
    function Utilities() {
        this._S_reserved = Symbol();
    }
    Utilities.prototype._U_Polyfill_Helper = function () {
        RequestAnimFrame();
    };
    Utilities.prototype._U_FnShim = function () {
        Function.isFn = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
                var a = args_1[_a];
                if (typeof a !== "function")
                    return false;
            }
            return true;
        };
    };
    Utilities.prototype._U_SetScrollOnLoad = function () {
        this._U_EventListSetter("beforeunload", function () { return window.scrollTo(0, 0); });
    };
    Utilities.prototype._U_WebFontsLoaderWrapper = function (arrOfFonts) {
        var families = [];
        for (var _i = 0, arrOfFonts_1 = arrOfFonts; _i < arrOfFonts_1.length; _i++) {
            var family = arrOfFonts_1[_i].family;
            families.push(family);
        }
        var fontHandler = function (flag) {
            var Fn = function (fn) {
                if (Function.isFn(fn)) {
                    fn();
                }
            };
            return function (fontFamily) {
                var obj = arrOfFonts.find(function (el) { return el.family.split(":", 1).join("") === fontFamily; });
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
                families: families,
            },
            timeout: 5000,
            fontloading: fontHandler(3),
            fontactive: fontHandler(1),
            fontinactive: fontHandler(2)
        });
    };
    Utilities.prototype._U_WaitForImagesPlugin = function (className, callbacks) {
        var _this = this;
        var COUNTER = 0, TargetElements = Array.from(document.querySelectorAll(className)), totalImages = TargetElements.length;
        TargetElements.forEach(function (el) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var BackGrounImage, URLLink, fnCheckComplete, img, totalCount;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        BackGrounImage = window.getComputedStyle(el).backgroundImage, URLLink = /http.+\.png|jpg$/i.exec(BackGrounImage)[0], fnCheckComplete = function (resolver) { return function () { return resolver(++COUNTER); }; }, img = new Image();
                        img.src = URLLink;
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                img.onerror = fnCheckComplete(reject);
                                img.onload = fnCheckComplete(resolve);
                            })];
                    case 1:
                        totalCount = _a.sent();
                        if (totalCount === totalImages) {
                            callbacks.forEach(function (fn) { return fn(); });
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    };
    Utilities.prototype._U_TagsFact = function (tagName, content, parentEl, attr) {
        if (!content) {
            content = "";
        }
        var tag = document.createElement(tagName);
        for (var a in attr) {
            tag.setAttribute(a, attr[a]);
        }
        tag.innerHTML = content;
        return (parentEl) ? this._h_(parentEl).appendChild(tag) : document.head.appendChild(tag);
    };
    Utilities.prototype._U_GC = function (propsObjAvoidToDel, target, killProto) {
        if (propsObjAvoidToDel === void 0) { propsObjAvoidToDel = {}; }
        if (target === void 0) { target = {}; }
        if (killProto === void 0) { killProto = true; }
        for (var _i = 0, _a = Object.getOwnPropertyNames(target); _i < _a.length; _i++) {
            var prop = _a[_i];
            if (prop in propsObjAvoidToDel)
                continue;
            delete target[prop];
        }
        if (killProto) {
            Object.setPrototypeOf(target, Object.prototype);
        }
    };
    Utilities.prototype._U_GC_TO_DEL = function (propsObjToDel, target, killProto) {
        if (propsObjToDel === void 0) { propsObjToDel = {}; }
        if (target === void 0) { target = {}; }
        if (killProto === void 0) { killProto = true; }
        for (var _i = 0, _a = Object.getOwnPropertyNames(target); _i < _a.length; _i++) {
            var prop = _a[_i];
            if (prop in propsObjToDel) {
                delete target[prop];
            }
        }
        if (killProto) {
            Object.setPrototypeOf(target, Object.prototype);
        }
    };
    Utilities.prototype._U_objVarsForTimeline = function (objProps, callbacks) {
        if (objProps === void 0) { objProps = {}; }
        if (callbacks === void 0) { callbacks = []; }
        return Object.assign({}, {
            paused: true,
            onComplete: function (t) {
                var callbacks = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    callbacks[_i - 1] = arguments[_i];
                }
                t.kill();
                for (var _a = 0, callbacks_1 = callbacks; _a < callbacks_1.length; _a++) {
                    var Fn = callbacks_1[_a];
                    if (Function.isFn(Fn))
                        Fn();
                }
            },
            onCompleteParams: ["{self}"].concat(callbacks)
        }, objProps);
    };
    Utilities.prototype._U_timelineFactory = function (arg) {
        if (arg === void 0) { arg = {}; }
        return new TimelineMax(arg);
    };
    Utilities.prototype._U_animationPlay = function (timeLine) {
        timeLine && timeLine.play();
    };
    Utilities.prototype._U_animationPause = function (timeLine) {
        timeLine && timeLine.pause();
    };
    Utilities.prototype._U_animationKill = function (timeLine) {
        timeLine && timeLine.kill();
    };
    Utilities.prototype._U_FromValToPer = function (maxValue, curValue) {
        return (curValue * 100) / maxValue;
    };
    Utilities.prototype._U_FromPerToVal = function (maxValue, curPerc) {
        return (maxValue * curPerc) / 100;
    };
    Utilities.prototype._U_DefaultHelperForIO = function (target, classModifier) {
        var _this = this;
        var _U_ = function () {
            var r = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                r[_i] = arguments[_i];
            }
            _this._h_(target).classList.add(classModifier);
            r && r[1] && r[1].disconnect();
        };
        _U_[this._S_reserved] = true;
        return _U_;
    };
    Utilities.prototype._U_StateTrigger = function (fnIfFalse, fnIfTrue) {
        var _this = this;
        return function () {
            var $this = _this, state = $this.state;
            !state ? fnIfFalse() : fnIfTrue();
            $this.state = !state;
        };
    };
    Utilities.prototype._h_ = function (targetElem) {
        return typeof targetElem === "string" ? document.querySelector(targetElem) : targetElem;
    };
    Utilities.prototype._U_IOSetter = function (selector, actions, toDisconnect, treshold) {
        var _this = this;
        if (actions === void 0) { actions = []; }
        if (toDisconnect === void 0) { toDisconnect = true; }
        if (treshold === void 0) { treshold = 1; }
        Array.from(document.querySelectorAll(selector)).forEach(function (el, i) {
            _this._U_IntersectionObserver(el, function () {
                if (Function.isFn(actions[i])) {
                    actions[i]();
                }
            }, toDisconnect, treshold);
        });
    };
    Utilities.prototype._U_IntersectionObserver = function (targetElem, handler, toDisconnect, treshold) {
        if (toDisconnect === void 0) { toDisconnect = true; }
        if (treshold === void 0) { treshold = 1; }
        var fn = function () {
            var r = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                r[_i] = arguments[_i];
            }
            handler(r);
            if (toDisconnect) {
                r[1].disconnect();
            }
        };
        fn = Object.getOwnPropertySymbols(handler)[0] === this._S_reserved ? handler : fn;
        new IntersectionObserver(fn, { treshold: treshold }).observe(this._h_(targetElem));
    };
    Utilities.prototype._U_EventListSetter = function (eventName, handler, root) {
        if (typeof root === "undefined") {
            window.addEventListener(eventName, handler);
        }
        else {
            this._h_(root).addEventListener(eventName, handler);
        }
    };
    return Utilities;
}());
export default Utilities;
export var U = Utilities.prototype;
