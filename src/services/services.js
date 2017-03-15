import * as tslib_1 from "tslib";
import SnackBarService from "./snackBarService";
import Scheduller from "./schedullerService";
var ClientFormValidator = (function () {
    function ClientFormValidator() {
    }
    ClientFormValidator.prototype._checkValidity = function (target) {
        if (target.checkValidity) {
            return target.checkValidity();
        }
        return true;
    };
    ClientFormValidator.prototype._whiteSpaceWatcher = function (value, target) {
        var arrValue = value.split(" ").filter(function (item) { return !!item; });
        if (arrValue.length > 1) {
            target.value = arrValue.join(" ");
        }
        else {
            target.value = arrValue.join("");
        }
    };
    ClientFormValidator.prototype._validateField = function (target) {
        var value = target.value.trim();
        var targetParent = target.parentNode;
        if (value) {
            targetParent.classList.add("F__dirty");
            if (this._checkValidity(target)) {
                this._whiteSpaceWatcher(value, target);
                this._setMessage(target);
                targetParent.classList.add("F__valid");
            }
            else {
                this._setMessage(target);
                targetParent.classList.add("F__invalid");
            }
        }
        else {
            if (target.required) {
                this._setMessage(target);
                targetParent.classList.add("F__invalid");
            }
            targetParent.classList.remove("F__dirty");
            target.value = "";
        }
        targetParent.classList.remove("F__active");
    };
    ClientFormValidator.prototype._setMessage = function (target) {
        target.parentNode.querySelector(".F__inform").innerHTML = target.validationMessage || "";
    };
    return ClientFormValidator;
}());
var FormModule = (function (_super) {
    tslib_1.__extends(FormModule, _super);
    function FormModule() {
        var _this = _super.call(this) || this;
        _this.Base = window._WFW_;
        _this.H_Flag = "que";
        _this.snackBar = new SnackBarService();
        _this.scheduller = new Scheduller(_this.Base.httpService);
        _this._setOnAllInputs();
        _this.OnRes = _this._onLayoutChange(Array.from(document.querySelectorAll(".F__textarea")), document.querySelectorAll(".F__layout-block"));
        _this.OnRes();
        _this.Base._U_EventListSetter("resize", _this.OnRes);
        return _this;
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
        var outPut = {};
        for (var _i = 0, _a = resultElements; _i < _a.length; _i++) {
            var input = _a[_i];
            if (input.type === "radio" || input.type === "checkbox") {
                if (input.checked) {
                    outPut[input.id] = true;
                }
            }
            else {
                if (!input.value.trim()) {
                    continue;
                }
                outPut[input.id] = input.value.trim();
            }
        }
        return Object.assign({ ACTION: "REGISTER", SITE_LANG: this.LANG }, outPut);
    };
    FormModule.prototype._delay = function (fn) {
        setTimeout(fn, 1000);
    };
    FormModule.prototype._hydratorLS = function (reqId) {
        if ("localStorage" in window) {
            var H_Flag = this.H_Flag;
            var str = localStorage.getItem(H_Flag);
            if (!str) {
                localStorage.setItem(H_Flag, [reqId].join(", "));
            }
            else {
                var arr = str.split(", ");
                arr.push(reqId);
                localStorage.setItem(H_Flag, arr.join(", "));
            }
            return true;
        }
        return false;
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
            if (!e.isTrusted || invalidCollection.length > 0 || !_this.Base.S7.isCanSendForm)
                return;
            _this.Base.S7.isCanSendForm = false;
            var SB = _this.snackBar.config();
            _this._disableBtn(submitBtn);
            _this.Base.httpService.sendReq(_this._httpOpts(_this.Base.S7.URIs.order, _this._formSerializer(target)))
                .then(function (res) {
                res = JSON.parse(res);
                _this.Base.ReqID = res.reqId;
                if (Function.isFn(OnSuccess))
                    OnSuccess();
                SB({ mes: res.info, btn: document.querySelector("#N__register .N__success .btn").innerHTML, autoClose: true, disabled: false }, onClS, onAfClose);
            })
                .catch(function () {
                if (Function.isFn(OnFail))
                    OnFail();
                SB(_this._forWidgetExtractor({ selectorName: "#N__register .N__fail" }), function () { return onClF(function () { _this.Base.S7.isCanSendForm = true; _this._enableBtn(submitBtn); }); }, [function () { return _this._enableBtn(submitBtn); }, onAfClose]);
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
                _this._validateField(target);
            };
        for (var _i = 0, inputsArr_1 = inputsArr; _i < inputsArr_1.length; _i++) {
            var input = inputsArr_1[_i];
            if (input.type === "checkbox" || input.type === "radio")
                continue;
            this._createMesPh(input);
            this._setDefDate(input);
            this._checkDefaults(input);
            this.Base._U_EventListSetter("focus", this.OnFocus, input);
            this.Base._U_EventListSetter("blur", this.OnBlur, input);
        }
    };
    FormModule.prototype._onLayoutChange = function (elementsToAppend, appendTo) {
        var DEADLINE = 923;
        return function () {
            if (document.documentElement.offsetWidth < DEADLINE) {
                elementsToAppend.forEach(function (el) {
                    appendTo[1].appendChild(el);
                });
            }
            else {
                elementsToAppend.forEach(function (el) {
                    appendTo[0].appendChild(el);
                });
            }
        };
    };
    FormModule.prototype.canceller = function () {
        var _this = this;
        var _a = this, LANG = _a.LANG, Base = _a.Base, H_Flag = _a.H_Flag, scheduller = _a.scheduller, snackBar = _a.snackBar;
        var onAfterClose = function () {
            Base.S7.isCanSendForm = true;
        }, Fn = function (mes, onClick) {
            if (onClick === void 0) { onClick = function () { return snackBar.closePane(null, onAfterClose); }; }
            return snackBar.setNotificator({ mes: mes, btn: _this.Default_btn, autoClose: true, disabled: false }, onClick, onAfterClose);
        }, body = { ACTION: "CANCEL", SITE_LANG: LANG, reqId: Base.ReqID };
        snackBar.setNotificator(this._forWidgetExtractor({ selectorName: "#N__cancel .N__inprocess" }, { autoClose: false, disabled: true })());
        var httpOptions = this._httpOpts(Base.S7.URIs.order, body, "DELETE");
        Base.httpService.sendReq(httpOptions)
            .then(function (res) { return _this._delay(function () { return Fn(res); }); })
            .catch(function () { return _this._delay(function () {
            _this._hydratorLS(Base.ReqID) ? (scheduller && Function.isFn(scheduller.watch) && scheduller.watch(H_Flag, httpOptions)) : null;
            Fn(document.querySelector("#N__cancel .N__fail .mes").innerHTML);
        }); });
    };
    FormModule.prototype.onCloseForm = function () {
        window.removeEventListener("resize", this.OnRes);
        for (var _i = 0, _a = document.forms; _i < _a.length; _i++) {
            var form = _a[_i];
            form.removeEventListener("submit", this.OnSub);
        }
        for (var _b = 0, _c = document.querySelectorAll(".F__form-wrap input:not([type=submit]), .F__form-wrap textarea"); _b < _c.length; _b++) {
            var input = _c[_b];
            input.removeEventListener("focus", this.OnFocus);
            input.removeEventListener("blur", this.OnBlur);
        }
    };
    FormModule.prototype.setModule = function (args, onSuccess, onFail) {
        this.OnSub = this._onSubmit(args, onSuccess, onFail);
        for (var _i = 0, _a = document.forms; _i < _a.length; _i++) {
            var form = _a[_i];
            this.Base._U_EventListSetter("submit", this.OnSub, form);
        }
    };
    return FormModule;
}(ClientFormValidator));
export default FormModule;
;
