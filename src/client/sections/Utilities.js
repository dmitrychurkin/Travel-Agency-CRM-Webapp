import * as tslib_1 from "tslib";
import { RequestAnimFrame } from "parallax";
var Utilities = (function () {
    function Utilities() {
        this._bgAttr = "data-background-url";
        this._S_reserved = Symbol();
    }
    Utilities.prototype._U_setBgAttrs = function () {
        var targets = Array.from(document.querySelectorAll("[" + this._bgAttr + "]"));
        try {
            for (var targets_1 = tslib_1.__values(targets), targets_1_1 = targets_1.next(); !targets_1_1.done; targets_1_1 = targets_1.next()) {
                var el = targets_1_1.value;
                el.style.backgroundImage = "url(" + el.getAttribute(this._bgAttr) + ")";
                el.removeAttribute(this._bgAttr);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (targets_1_1 && !targets_1_1.done && (_a = targets_1.return)) _a.call(targets_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var e_1, _a;
    };
    Utilities.prototype._U_Polyfill_Helper = function () {
        RequestAnimFrame();
    };
    Utilities.prototype._U_FnShim = function () {
        Function.isFn = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            try {
                for (var args_1 = tslib_1.__values(args), args_1_1 = args_1.next(); !args_1_1.done; args_1_1 = args_1.next()) {
                    var a = args_1_1.value;
                    if (typeof a !== "function")
                        return false;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (args_1_1 && !args_1_1.done && (_a = args_1.return)) _a.call(args_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return true;
            var e_2, _a;
        };
    };
    Utilities.prototype._U_SetScrollOnLoad = function () {
        this._U_EventListSetter("beforeunload", function () { return window.scrollTo(0, 0); });
    };
    Utilities.prototype._U_WebFontsLoaderWrapper = function (arrOfFonts) {
        var families = [];
        try {
            for (var arrOfFonts_1 = tslib_1.__values(arrOfFonts), arrOfFonts_1_1 = arrOfFonts_1.next(); !arrOfFonts_1_1.done; arrOfFonts_1_1 = arrOfFonts_1.next()) {
                var family = arrOfFonts_1_1.value.family;
                families.push(family);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (arrOfFonts_1_1 && !arrOfFonts_1_1.done && (_a = arrOfFonts_1.return)) _a.call(arrOfFonts_1);
            }
            finally { if (e_3) throw e_3.error; }
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
        var e_3, _a;
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
                        return [4, new Promise(function (resolve, reject) {
                                img.onerror = fnCheckComplete(reject);
                                img.onload = fnCheckComplete(resolve);
                            })];
                    case 1:
                        totalCount = _a.sent();
                        if (totalCount === totalImages) {
                            callbacks.forEach(function (fn) { return fn(); });
                        }
                        return [2];
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
        try {
            for (var _a = tslib_1.__values(Object.getOwnPropertyNames(target)), _b = _a.next(); !_b.done; _b = _a.next()) {
                var prop = _b.value;
                if (prop in propsObjAvoidToDel)
                    continue;
                delete target[prop];
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_4) throw e_4.error; }
        }
        if (killProto) {
            Object.setPrototypeOf(target, Object.prototype);
        }
        var e_4, _c;
    };
    Utilities.prototype._U_GC_TO_DEL = function (propsObjToDel, target, killProto) {
        if (propsObjToDel === void 0) { propsObjToDel = {}; }
        if (target === void 0) { target = {}; }
        if (killProto === void 0) { killProto = true; }
        try {
            for (var _a = tslib_1.__values(Object.getOwnPropertyNames(target)), _b = _a.next(); !_b.done; _b = _a.next()) {
                var prop = _b.value;
                if (prop in propsObjToDel) {
                    delete target[prop];
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_5) throw e_5.error; }
        }
        if (killProto) {
            Object.setPrototypeOf(target, Object.prototype);
        }
        var e_5, _c;
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
                try {
                    for (var callbacks_1 = tslib_1.__values(callbacks), callbacks_1_1 = callbacks_1.next(); !callbacks_1_1.done; callbacks_1_1 = callbacks_1.next()) {
                        var Fn = callbacks_1_1.value;
                        if (Function.isFn(Fn))
                            Fn();
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (callbacks_1_1 && !callbacks_1_1.done && (_a = callbacks_1.return)) _a.call(callbacks_1);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
                var e_6, _a;
            },
            onCompleteParams: tslib_1.__spread(["{self}"], callbacks)
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
        var _U_ = function (entries, intersectionObserver) {
            if (entries[0].intersectionRatio <= 0)
                return;
            _this._h_(target).classList.add(classModifier);
            intersectionObserver.disconnect();
        };
        _U_[this._S_reserved] = true;
        return _U_;
    };
    Utilities.prototype._U_StateTrigger = function (fnIfFalse, fnIfTrue) {
        var _U_ = function (entries) { return entries[0].intersectionRatio <= 0 ? fnIfTrue() : fnIfFalse(); };
        _U_[this._S_reserved] = true;
        return _U_;
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
            _this._U_IntersectionObserver(el, actions[i], toDisconnect, treshold);
        });
    };
    Utilities.prototype._U_IntersectionObserver = function (targetElem, handler, toDisconnect, threshold) {
        if (toDisconnect === void 0) { toDisconnect = true; }
        if (threshold === void 0) { threshold = 1; }
        var fn = function (entries, intersectionObserver) {
            if (entries[0].intersectionRatio <= 0)
                return;
            handler();
            if (toDisconnect) {
                intersectionObserver.disconnect();
            }
        };
        fn = Object.getOwnPropertySymbols(handler)[0] === this._S_reserved ? handler : fn;
        new IntersectionObserver(fn, { threshold: threshold }).observe(this._h_(targetElem));
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
