import * as tslib_1 from "tslib";
import OrderFieldsConverter from "./orderPortService";
import SnackBarService from "./snackBarService";
import Scheduller from "./schedullerService";
import ClientFormValidator from "./formValidator";
import LocalStorageService from "./localStorageService";
import ModalPop from "./modalPop";
function applyMixins(derivedCtor, baseCtors) {
    baseCtors.forEach(function (baseCtor) {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
var FormModule = (function () {
    function FormModule(subject) {
        this.H_Flag = "que";
        this.U_Flag = "user";
        this.Base = window._WFW_;
        this.snackBar = new SnackBarService();
        switch (subject) {
            case "form": {
                this.isLSSupport();
                this.scheduller = new Scheduller(this.Base.httpService);
                this._setOnAllInputs();
                this.OnRes = this._onLayoutChange(Array.from(document.querySelectorAll("[data-layout]")), document.querySelectorAll(".F__layout-block"));
                this.OnRes();
                this.Base._U_EventListSetter("resize", this.OnRes);
                break;
            }
            default: {
                this.modalPopIns = ModalPop.setPlugin();
            }
        }
    }
    Object.defineProperty(FormModule.prototype, "LANG", {
        get: function () {
            return window.SITE_LANG || "EN";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormModule.prototype, "Default_btn", {
        get: function () {
            return document.getElementById("Default_btn").innerHTML;
        },
        enumerable: true,
        configurable: true
    });
    FormModule.prototype._httpOpts = function (url, body, method) {
        if (method === void 0) { method = "POST"; }
        return {
            url: url,
            options: {
                method: method,
                cache: "no-cache",
                headers: {
                    "Content-type": "application/json; charset=utf-8",
                    "Accept": "application/json"
                },
                body: body
            }
        };
    };
    FormModule.prototype._formSerializer = function (form) {
        var resultElements = form.querySelectorAll(".F__form-wrap input:not([type=submit]), .F__form-wrap textarea");
        var ORDER = {};
        var DataServiceCode = this.Base.S7.flipTarget.dataset.code;
        ORDER.service = OrderFieldsConverter.serviceCodeConverter[DataServiceCode];
        var buffer = this.userDataBuffLS();
        try {
            for (var _a = tslib_1.__values(resultElements), _b = _a.next(); !_b.done; _b = _a.next()) {
                var input = _b.value;
                buffer(input);
                if (input.type === "radio" || input.type === "checkbox") {
                    if (input.checked) {
                        var inputId = input.id;
                        var airClass = OrderFieldsConverter.airClassConverter[inputId];
                        ORDER.class = airClass;
                    }
                }
                else {
                    if (!input.value.trim()) {
                        continue;
                    }
                    var field = input.id;
                    ORDER[field] = input.value.trim();
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return [Object.assign({ ACTION: "REGISTER", SITE_LANG: this.LANG }, ORDER), buffer()];
        var e_1, _c;
    };
    FormModule.prototype._delay = function (fn) {
        setTimeout(fn, 1000);
    };
    FormModule.prototype._disableBtn = function (btn) {
        btn.disabled = true;
    };
    FormModule.prototype._enableBtn = function (btn) {
        btn.disabled = false;
    };
    FormModule.prototype._onSubmit = function (_a, OnSuccess, OnFail) {
        var _this = this;
        var onClS = _a.onClS, onClF = _a.onClF, onAfClose = _a.onAfClose;
        return function (e) {
            e.preventDefault();
            var target = e.target, invalidCollection = target.querySelectorAll(".F__invalid"), submitBtn = target.action;
            if (!e.isTrusted || !(target.checkValidity && target.checkValidity()) || invalidCollection.length > 0 || !_this.Base.S7.isCanSendForm)
                return;
            _this.Base.S7.isCanSendForm = false;
            var SB = _this.snackBar.config();
            _this._disableBtn(submitBtn);
            var outputFormSerializer = _this._formSerializer(target);
            _this.Base.httpService.sendReq(_this._httpOpts(_this.Base.S7.URIs.order, outputFormSerializer[0]))
                .then(function (res) {
                res = JSON.parse(res);
                _this.Base.ReqID = res.reqId;
                if (Function.isFn(OnSuccess))
                    OnSuccess();
                outputFormSerializer[1]();
                SB({ mes: res.info, btn: document.querySelector("#N__register .N__success .btn").innerHTML, autoClose: true, disabled: false }, onClS, onAfClose);
            })
                .catch(function () {
                if (Function.isFn(OnFail))
                    OnFail();
                SB(_this._forWidgetExtractor({ selectorName: "#N__register .N__fail" }), function () { return onClF(function () { _this.Base.S7.isCanSendForm = true; _this._enableBtn(submitBtn); _this.snackBar.destroyPane(); }); }, [function () { return _this._enableBtn(submitBtn); }, onAfClose]);
            })
                .then(function () {
                SB = null;
            });
        };
    };
    FormModule.prototype._forWidgetExtractor = function (_a, _b) {
        var _this = this;
        var selectorName = _a.selectorName, _c = _a.mesSel, mesSel = _c === void 0 ? ".mes" : _c, _d = _a.btnSel, btnSel = _d === void 0 ? ".btn" : _d;
        var _e = _b === void 0 ? {} : _b, _f = _e.autoClose, autoClose = _f === void 0 ? true : _f, _g = _e.disabled, disabled = _g === void 0 ? false : _g;
        if (!selectorName)
            throw new Error("You Idiot!");
        return function () {
            var Root = document.querySelector(selectorName), mes = Root.querySelector(mesSel).innerHTML, btn = Root.querySelector(btnSel) ? Root.querySelector(btnSel).innerHTML : _this.Default_btn;
            return {
                mes: mes, btn: btn,
                autoClose: autoClose, disabled: disabled
            };
        };
    };
    FormModule.prototype._setDefDate = function (input) {
        if (input.type.includes("date")) {
            input.parentNode.classList.add("F__dirty");
            setTimeout(function () {
                input.value = new Date().toISOString().substring(0, 10);
            });
            input.min = new Date().toISOString().substring(0, 10);
        }
    };
    FormModule.prototype._checkDefaults = function (input) {
        if (input.value) {
            input.parentNode.classList.add("F__dirty");
        }
    };
    FormModule.prototype._createMesPh = function (input) {
        var div = document.createElement("div");
        div.className = "F__inform";
        div.innerHTML = "";
        input.parentNode.insertBefore(div, input.nextElementSibling);
    };
    FormModule.prototype._setOnAllInputs = function () {
        var _this = this;
        var inputsArr = document.querySelectorAll(".F__form-wrap input:not([type=submit]), .F__form-wrap textarea");
        this.OnFocus = function (e) {
            var target = e.target, targetParent = target.parentNode;
            targetParent.classList.remove("F__valid");
            targetParent.classList.remove("F__invalid");
            targetParent.classList.add("F__active");
        },
            this.OnBlur = function (e) {
                var target = e.target;
                _this.validateField(target);
            };
        var userDataFromLS = this.userDataUnBuffLS();
        try {
            for (var inputsArr_1 = tslib_1.__values(inputsArr), inputsArr_1_1 = inputsArr_1.next(); !inputsArr_1_1.done; inputsArr_1_1 = inputsArr_1.next()) {
                var input = inputsArr_1_1.value;
                if (userDataFromLS) {
                    userDataFromLS(input);
                }
                if (input.type === "checkbox" || input.type === "radio")
                    continue;
                this._createMesPh(input);
                this._setDefDate(input);
                this._checkDefaults(input);
                this.Base._U_EventListSetter("focus", this.OnFocus, input);
                this.Base._U_EventListSetter("blur", this.OnBlur, input);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (inputsArr_1_1 && !inputsArr_1_1.done && (_a = inputsArr_1.return)) _a.call(inputsArr_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        var e_2, _a;
    };
    FormModule.prototype._onLayoutChange = function (elementsToAppend, appendTo) {
        var DEADLINE = 923;
        var insertionPointToUp = document.querySelectorAll("[data-ins-point]");
        var isLayoutChanged = false;
        return function () {
            var docWidth = document.documentElement.offsetWidth;
            if (docWidth < DEADLINE && !isLayoutChanged) {
                isLayoutChanged = true;
                elementsToAppend.forEach(function (el) {
                    var isDataLayoutUp = el.hasAttribute("data-layout-up");
                    isDataLayoutUp ? appendTo[0].insertBefore(el, insertionPointToUp[0]) : appendTo[1].appendChild(el);
                });
            }
            else if (docWidth >= DEADLINE && isLayoutChanged) {
                isLayoutChanged = false;
                elementsToAppend.forEach(function (el) {
                    var isDataLayoutUp = el.hasAttribute("data-layout-up");
                    isDataLayoutUp ? appendTo[1].insertBefore(el, insertionPointToUp[1]) : appendTo[0].appendChild(el);
                });
            }
        };
    };
    FormModule.prototype.canceller = function () {
        var _this = this;
        var _a = this, LANG = _a.LANG, Base = _a.Base, H_Flag = _a.H_Flag, scheduller = _a.scheduller, snackBar = _a.snackBar;
        var onAfterClose = function () {
            Base.S7.isCanSendForm = true;
            Base.ReqID = null;
            snackBar.destroyPane();
        }, Fn = function (mes, onClick) {
            if (onClick === void 0) { onClick = function () { return snackBar.closePane(null, onAfterClose); }; }
            return snackBar.setNotificator({ mes: mes, btn: _this.Default_btn, autoClose: true, disabled: false }, onClick, onAfterClose);
        }, body = { ACTION: "CANCEL", SITE_LANG: LANG, reqId: Base.ReqID };
        snackBar.setNotificator(this._forWidgetExtractor({ selectorName: "#N__cancel .N__inprocess" }, { autoClose: false, disabled: true })());
        var httpOptions = this._httpOpts(Base.S7.URIs.order, body, "DELETE");
        Base.httpService.sendReq(httpOptions)
            .then(function (res) { return _this._delay(function () { return Fn(res); }); })
            .catch(function () { return _this._delay(function () {
            _this.hydratorLS(Base.ReqID) ? (scheduller && Function.isFn(scheduller.watch) && scheduller.watch(H_Flag, httpOptions)) : null;
            Fn(document.querySelector("#N__cancel .N__fail .mes").innerHTML);
        }); })
            .then(function () { return _this.userDataKillBuffLS(); });
    };
    FormModule.prototype.onCloseForm = function () {
        window.removeEventListener("resize", this.OnRes);
        try {
            for (var _a = tslib_1.__values(document.forms), _b = _a.next(); !_b.done; _b = _a.next()) {
                var form = _b.value;
                form.removeEventListener("submit", this.OnSub);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_3) throw e_3.error; }
        }
        try {
            for (var _d = tslib_1.__values(document.querySelectorAll(".F__form-wrap input:not([type=submit]), .F__form-wrap textarea")), _e = _d.next(); !_e.done; _e = _d.next()) {
                var input = _e.value;
                input.removeEventListener("focus", this.OnFocus);
                input.removeEventListener("blur", this.OnBlur);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_f = _d.return)) _f.call(_d);
            }
            finally { if (e_4) throw e_4.error; }
        }
        var e_3, _c, e_4, _f;
    };
    FormModule.prototype.setModule = function (args, onSuccess, onFail) {
        this.OnSub = this._onSubmit(args, onSuccess, onFail);
        try {
            for (var _a = tslib_1.__values(document.forms), _b = _a.next(); !_b.done; _b = _a.next()) {
                var form = _b.value;
                this.Base._U_EventListSetter("submit", this.OnSub, form);
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_5) throw e_5.error; }
        }
        var e_5, _c;
    };
    FormModule.prototype.unsetModule = function () {
        if (this.modalPopIns) {
            this.modalPopIns.unsetPlugin();
        }
        else {
            this.onCloseForm();
        }
    };
    return FormModule;
}());
export default FormModule;
;
applyMixins(FormModule, [ClientFormValidator, LocalStorageService]);
