import * as tslib_1 from "tslib";
var SnackBarService = (function () {
    function SnackBarService() {
        this._isCicleFinish = true;
        this.delayToClose = 5000;
        setTimeout(function () {
            SnackBarService.SBP.classList.add("SBP__r");
            SnackBarService.SB.classList.add("SB__r");
        }, 500);
    }
    SnackBarService.prototype._resetTime = function () {
        clearTimeout(this.TimerId);
        this.TimerId = null;
    };
    SnackBarService.prototype._resetPane = function (pane) {
        window.removeEventListener("resize", this.OnRes);
        pane.style.left = "";
    };
    SnackBarService.prototype._onClickBtn = function (target, actionFn, linkToPane) {
        var _this = this;
        this.OnClickBtn = function () {
            target.removeEventListener("click", _this.OnClickBtn);
            _this._resetTime();
            if (Function.isFn(actionFn)) {
                actionFn(linkToPane);
            }
        };
        return this.OnClickBtn;
    };
    SnackBarService.prototype._normCbs = function (input) {
        return (Array.isArray(input)) ? input : [input];
    };
    SnackBarService.prototype._onTransitEnd = function (transTarg, callbacksArr) {
        var _this = this;
        this.OnTransitEnd = function () {
            transTarg.removeEventListener("transitionend", _this.OnTransitEnd);
            try {
                for (var _a = tslib_1.__values(_this._normCbs(callbacksArr)), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var cb = _b.value;
                    if (Function.isFn(cb)) {
                        cb(transTarg);
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
            var e_1, _c;
        };
        return this.OnTransitEnd;
    };
    SnackBarService.prototype._onRes = function (pane) {
        var _this = this;
        this.OnRes = function () {
            _this._alignPane(pane);
        };
        return this.OnRes;
    };
    SnackBarService.prototype._alignPane = function (pane) {
        if (pane === void 0) { pane = SnackBarService.SBP; }
        var winWidth = document.body.offsetWidth, paneWidth = pane.offsetWidth;
        if (paneWidth >= winWidth) {
            pane.style.left = 0 + "px";
        }
        else {
            pane.style.left = ((winWidth - paneWidth) / 2) + "px";
        }
    };
    SnackBarService.prototype._delayedClose = function (autoClose, onBeforePaneClose, onAfterPaneClose, linkToPane) {
        var _this = this;
        if (autoClose) {
            this.TimerId = setTimeout(function () { return _this.closePane(onBeforePaneClose, onAfterPaneClose, linkToPane); }, this.delayToClose);
        }
    };
    SnackBarService.prototype.destroyPane = function () {
        var SBP_btn = SnackBarService.SBP_btn, SBP_mes = SnackBarService.SBP_mes;
        SBP_mes.innerHTML = SBP_btn.innerHTML = "";
    };
    SnackBarService.prototype.showBar = function (withBar) {
        if (withBar === void 0) { withBar = true; }
        if (!withBar)
            return;
        var SB = SnackBarService.SB;
        try {
            for (var _a = tslib_1.__values(SB.children), _b = _a.next(); !_b.done; _b = _a.next()) {
                var b = _b.value;
                b.classList.remove("SB_stop");
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_2) throw e_2.error; }
        }
        SB.classList.add("SB__show");
        var e_2, _c;
    };
    SnackBarService.prototype.setNotificator = function (_a, actionFnOnClick, onAfterPaneClose) {
        var mes = _a.mes, btn = _a.btn, _b = _a.disabled, disabled = _b === void 0 ? false : _b, _c = _a.autoClose, autoClose = _c === void 0 ? false : _c;
        var SBP = SnackBarService.SBP, SBP_btn = SnackBarService.SBP_btn, SBP_mes = SnackBarService.SBP_mes;
        SBP_mes.innerHTML = mes;
        SBP_btn.removeEventListener("click", this.OnClickBtn);
        SBP_btn.innerHTML = btn;
        SBP_btn.disabled = disabled;
        if (!this._isCicleFinish) {
            this._alignPane(SBP);
        }
        if (!disabled) {
            SBP_btn.addEventListener("click", this._onClickBtn(SBP_btn, actionFnOnClick, SBP));
        }
        this._delayedClose(autoClose, null, onAfterPaneClose, SBP);
    };
    SnackBarService.prototype.hideBar = function (withBar, openSnakeBar) {
        var _this = this;
        if (withBar === void 0) { withBar = true; }
        if (openSnakeBar === void 0) { openSnakeBar = null; }
        setTimeout(function () {
            if (withBar) {
                var SB = SnackBarService.SB;
                SB.addEventListener("transitionend", _this._onTransitEnd(SB, [function (transTarg) { return Array.from(transTarg.children).forEach(function (child) { return child.classList.add("SB_stop"); }); }, openSnakeBar]));
                SB.classList.remove("SB__show");
            }
            else {
                if (Function.isFn(openSnakeBar)) {
                    openSnakeBar();
                }
            }
        }, 1000);
    };
    SnackBarService.prototype.closePane = function (onBeforePaneClose, onAfterPaneClose, paneTarg) {
        var _this = this;
        if (paneTarg === void 0) { paneTarg = SnackBarService.SBP; }
        this._resetTime();
        var SBP_btn = SnackBarService.SBP_btn;
        SBP_btn.disabled = true;
        this._normCbs(onBeforePaneClose).forEach(function (fn) { return Function.isFn(fn) ? fn(paneTarg) : fn; });
        paneTarg.addEventListener("transitionend", this._onTransitEnd(paneTarg, tslib_1.__spread([function () { return SBP_btn.removeEventListener("click", _this.OnClickBtn); }, function (paneTarg) { return _this._resetPane(paneTarg); }, function () { _this._isCicleFinish = true; }], this._normCbs(onAfterPaneClose))));
        paneTarg.classList.remove("SBP__open");
    };
    SnackBarService.prototype.openPane = function (onBeforePaneOpen, onAfterPaneOpen, onBeforePaneClose, onAfterPaneClose, withAutoClose) {
        var _this = this;
        if (withAutoClose === void 0) { withAutoClose = false; }
        var SBP = SnackBarService.SBP;
        this._normCbs(onBeforePaneOpen).forEach(function (fn) { return Function.isFn(fn) ? fn(SBP) : fn; });
        this._alignPane(SBP);
        window.addEventListener("resize", this._onRes(SBP));
        SBP.addEventListener("transitionend", this._onTransitEnd(SBP, tslib_1.__spread(this._normCbs(onAfterPaneOpen), [function (pane) { return _this._delayedClose(withAutoClose, onBeforePaneClose, onAfterPaneClose, pane); }])));
        SBP.classList.add("SBP__open");
    };
    SnackBarService.prototype.config = function (withBar) {
        var _this = this;
        if (withBar === void 0) { withBar = true; }
        if (!this._isCicleFinish)
            return function () { };
        this._isCicleFinish = false;
        this.showBar(withBar);
        return function (Extractor, actionFnOnClick, onAfterPaneClose) {
            var ext = Function.isFn(Extractor) ? Extractor() : Extractor;
            _this.hideBar(withBar, function () { return _this.openPane(_this.setNotificator.bind(_this, ext, actionFnOnClick, onAfterPaneClose)); });
        };
    };
    return SnackBarService;
}());
export default SnackBarService;
SnackBarService.SBP = document.querySelector(".SBP");
SnackBarService.SB = document.querySelector(".SB");
SnackBarService.SBP_btn = document.querySelector(".SBP__btn");
SnackBarService.SBP_mes = document.querySelector(".SBP__message");
;
