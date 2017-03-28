import * as tslib_1 from "tslib";
import Utilities, { U } from "./Utilities";
import { Parallax } from "parallax";
import ScrollerCustom from "../plugins/scroller";
var ParallaxNsp = (function () {
    function ParallaxNsp() {
    }
    ParallaxNsp._attrHandler = function (state) {
        var el = this.P_mod;
        el.dataset.status = state;
    };
    ParallaxNsp.set = function (Scene) {
        var _this = this;
        this.Parallax_Plugin = new Parallax(Scene);
        U._U_EventListSetter("resize", function () { return _this.enableParallax(); });
        this.enableParallax();
    };
    ParallaxNsp.enableParallax = function () {
        this.Parallax_Plugin.enable();
        this._attrHandler("on");
    };
    ParallaxNsp.disableParallax = function () {
        this.Parallax_Plugin.disable();
        this._attrHandler("off");
    };
    return ParallaxNsp;
}());
ParallaxNsp.P_mod = document.querySelector(".S1__par");
var Section1 = (function (_super) {
    tslib_1.__extends(Section1, _super);
    function Section1() {
        var _this = _super.call(this) || this;
        _this.Scene = document.getElementById("S1__sc");
        _this.BgImg = ".S1__bgi";
        _this.isReadyForCl = false;
        _this._U_EventListSetter("click", _this._onCl());
        _this.ScrollerPlg = new ScrollerCustom({ $target: ".S1__p_h", $placeholder: ".S1" });
        return _this;
    }
    Section1.prototype._onCl = function () {
        var _this = this;
        return function (e) {
            if (!_this.isReadyForCl)
                return;
            var targ = e.target;
            if (targ.closest(".S1__r-g")) {
                TweenLite.to(window, 3, {
                    scrollTo: {
                        y: "#offer",
                        autoKill: false
                    },
                    ease: Sine.easeOut
                });
            }
        };
    };
    Section1.prototype.actionsWaitForImagesPlugin = function () {
        var _this = this;
        var link = null, promise = new Promise(function (resolve) {
            link = resolve;
        });
        promise.then(function () {
            var spinner = document.querySelector(".S1__sp"), mockLayer = document.querySelector(".S1__m-lay");
            spinner.remove();
            mockLayer.remove();
            ParallaxNsp.P_mod.classList.add("S1__ok");
            ParallaxNsp.set(_this.Scene);
            setTimeout(function () { _this.isReadyForCl = true; }, 2000);
            _this._U_IntersectionObserver(".S1", _this._U_StateTrigger(function () { return ParallaxNsp.enableParallax(); }, function () { return ParallaxNsp.disableParallax(); }), false, 0);
            _this._U_GC_TO_DEL({
                Scene: !!1,
                BgImg: !!1
            }, _this, false);
            _this._U_GC_TO_DEL({
                actionsWaitForImagesPlugin: !!1,
                _onCl: !!1
            }, Object.getPrototypeOf(_this), false);
        });
        return link;
    };
    Section1.prototype.OnFontLoaded = function () {
        var _this = this;
        var link = null, promise = new Promise(function (resolve) {
            link = resolve;
        });
        promise.then(function () {
            var p_head = document.querySelector(".S1__p_h"), p_down = document.querySelector(".S1__p_d");
            p_head.classList.add("S1__res-h");
            p_down.classList.add("S1__res-d");
            _this.ScrollerPlg.setPlugin();
            _this._U_GC_TO_DEL({
                actionOnDinamicLoadingFont: !!1
            }, Object.getPrototypeOf(_this), false);
        });
        return link;
    };
    return Section1;
}(Utilities));
export default Section1;
