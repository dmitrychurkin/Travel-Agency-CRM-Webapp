var SnackBarService = (function () {
    function SnackBarService() {
        this._isCicleFinish = true;
        this.delayToClose = 5000;
        setTimeout(function () { return document.querySelector(".SBP").classList.add("SBP__r"); }, 500);
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
            for (var _i = 0, _a = _this._normCbs(callbacksArr); _i < _a.length; _i++) {
                var cb = _a[_i];
                if (Function.isFn(cb)) {
                    cb(transTarg);
                }
            }
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
        if (pane === void 0) { pane = document.querySelector(".SBP"); }
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
    SnackBarService.prototype.showBar = function (withBar) {
        if (withBar === void 0) { withBar = true; }
        if (!withBar)
            return;
        var SB = document.querySelector(".SB");
        for (var _i = 0, _a = SB.children; _i < _a.length; _i++) {
            var b = _a[_i];
            b.classList.remove("SB_stop");
        }
        SB.classList.add("SB__show");
    };
    SnackBarService.prototype.setNotificator = function (_a, actionFnOnClick, onAfterPaneClose) {
        var mes = _a.mes, btn = _a.btn, _b = _a.disabled, disabled = _b === void 0 ? false : _b, _c = _a.autoClose, autoClose = _c === void 0 ? false : _c;
        var linkToPane = document.querySelector(".SBP"), b = document.querySelector(".SBP__btn");
        document.querySelector(".SBP__message").innerHTML = mes;
        b.removeEventListener("click", this.OnClickBtn);
        b.innerHTML = btn;
        b.disabled = disabled;
        if (!this._isCicleFinish) {
            this._alignPane(linkToPane);
        }
        if (!disabled) {
            b.addEventListener("click", this._onClickBtn(b, actionFnOnClick, linkToPane));
        }
        this._delayedClose(autoClose, null, onAfterPaneClose, linkToPane);
    };
    SnackBarService.prototype.hideBar = function (withBar, openSnakeBar) {
        var _this = this;
        if (withBar === void 0) { withBar = true; }
        if (openSnakeBar === void 0) { openSnakeBar = null; }
        setTimeout(function () {
            if (withBar) {
                var SB = document.querySelector(".SB");
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
        if (paneTarg === void 0) { paneTarg = document.querySelector(".SBP"); }
        this._resetTime();
        var b = document.querySelector(".SBP__btn");
        b.disabled = true;
        this._normCbs(onBeforePaneClose).forEach(function (fn) { return Function.isFn(fn) ? fn(paneTarg) : fn; });
        paneTarg.addEventListener("transitionend", this._onTransitEnd(paneTarg, [function () { return b.removeEventListener("click", _this.OnClickBtn); }, function (paneTarg) { return _this._resetPane(paneTarg); }, function () { _this._isCicleFinish = true; }].concat(this._normCbs(onAfterPaneClose))));
        paneTarg.classList.remove("SBP__open");
    };
    SnackBarService.prototype.openPane = function (onBeforePaneOpen, onAfterPaneOpen, onBeforePaneClose, onAfterPaneClose, withAutoClose) {
        var _this = this;
        if (withAutoClose === void 0) { withAutoClose = false; }
        var SBP = document.querySelector(".SBP");
        this._normCbs(onBeforePaneOpen).forEach(function (fn) { return Function.isFn(fn) ? fn(SBP) : fn; });
        this._alignPane(SBP);
        window.addEventListener("resize", this._onRes(SBP));
        SBP.addEventListener("transitionend", this._onTransitEnd(SBP, this._normCbs(onAfterPaneOpen).concat([function (pane) { return _this._delayedClose(withAutoClose, onBeforePaneClose, onAfterPaneClose, pane); }])));
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
;
