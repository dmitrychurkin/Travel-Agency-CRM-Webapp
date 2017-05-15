import * as tslib_1 from "tslib";
import Utilities from "./Utilities";
var Section8 = (function (_super) {
    tslib_1.__extends(Section8, _super);
    function Section8(Chip) {
        var _this = _super.call(this) || this;
        _this.Chip = Chip;
        _this.a = "S8__active";
        _this.ia = "S8__inactive";
        _this.animCl = "S8__animating";
        _this.S8 = document.querySelector(".S8");
        _this.Slider = document.querySelector(".S8__slides");
        _this.slideBGs = Array.from(document.querySelectorAll(".S8__s-b"));
        _this.diff = 0;
        _this.curSlide = 0;
        _this.numOfSlides = document.querySelectorAll(".S8__slide").length;
        _this.animating = false;
        _this.animTime = 500;
        _this.autoSlideDelay = 6000;
        _this._createBullets();
        _this._setEvList();
        _this._U_IntersectionObserver(".S8__lim", function () { return _this._changeSlides(true); });
        _this._U_GC_TO_DEL({ _createBullets: !!1, _setEvList: !!1 }, Object.getPrototypeOf(_this));
        return _this;
    }
    Section8.prototype._clearCl = function (sel, cl) {
        var activeEl = this.S8.querySelector(sel + "." + cl);
        if (activeEl) {
            activeEl.classList.remove(cl);
        }
    };
    Section8.prototype._createBullets = function () {
        var _a = this, numOfSlides = _a.numOfSlides, a = _a.a;
        for (var i = 0; i < numOfSlides; i++) {
            var li = this._U_TagsFact("li", "", ".S8__b", { "class": "S8__b-el S8__b-el-" + i, "data-slide": i });
            if (!i)
                li.classList.add(a);
        }
    };
    Section8.prototype._manageControls = function () {
        var _a = this, curSlide = _a.curSlide, numOfSlides = _a.numOfSlides, S8 = _a.S8, ia = _a.ia;
        this._clearCl(".S8__ctrl", ia);
        if (!curSlide)
            S8.querySelector(".S8__s" + curSlide + " .S8__c_left").classList.add(ia);
        if (curSlide === numOfSlides - 1)
            S8.querySelector(".S8__s" + curSlide + " .S8__c_right").classList.add(ia);
    };
    Section8.prototype._autoSlide = function () {
        var _this = this;
        var _a = this, numOfSlides = _a.numOfSlides, autoSlideDelay = _a.autoSlideDelay;
        this.autoSlideTimeout = setTimeout(function () {
            if (++_this.curSlide > numOfSlides - 1)
                _this.curSlide = 0;
            _this._changeSlides();
        }, autoSlideDelay);
    };
    Section8.prototype._changeSlides = function (instant) {
        var _this = this;
        var _a = this, Slider = _a.Slider, animTime = _a.animTime, S8 = _a.S8, curSlide = _a.curSlide, slideBGs = _a.slideBGs, a = _a.a, animCl = _a.animCl, Chip = _a.Chip;
        var addActive = function (el, targClass) {
            _this._clearCl(targClass, a);
            if (el) {
                el.classList.add(a);
            }
        };
        setTimeout(function () {
            if (_this.animating)
                return;
            Chip.Reset();
            Chip.Activate(S8.querySelector(".S8__active .S8__plugin"));
        }, instant ? 0 : 1000);
        if (!instant) {
            this.animating = true;
            this._manageControls();
            Slider.classList.add(animCl);
            addActive(Slider.querySelector(".S8__s" + curSlide), ".S8__slide");
            setTimeout(function () {
                Chip.Reset();
                Slider.classList.remove(animCl);
                _this.animating = false;
            }, animTime);
        }
        clearTimeout(this.autoSlideTimeout);
        addActive(S8.querySelector(".S8__b-el-" + curSlide), ".S8__b-el");
        Slider.style.transform = "translate3d(" + -curSlide * 100 + "%,0,0)";
        slideBGs.forEach(function (el) {
            el.style.transform = "translate3d(" + curSlide * 50 + "%,0,0)";
        });
        this.diff = 0;
        this._autoSlide();
    };
    Section8.prototype._navL = function () {
        var _a = this, animating = _a.animating, curSlide = _a.curSlide;
        if (!animating && curSlide > 0) {
            this.curSlide--;
            this._changeSlides();
        }
    };
    Section8.prototype._navR = function () {
        var _a = this, animating = _a.animating, curSlide = _a.curSlide, numOfSlides = _a.numOfSlides;
        if (!animating && curSlide < numOfSlides - 1) {
            this.curSlide++;
            this._changeSlides();
        }
    };
    Section8.prototype._onClick = function () {
        var _this = this;
        return function (e) {
            var targ = e.target, ctrl = targ.closest(".S8__ctrl"), bul = targ.closest(".S8__b-el");
            var _a = _this, curSlide = _a.curSlide, animating = _a.animating;
            switch (true) {
                case !!ctrl:
                    return ctrl.classList.contains("S8__c_left") ? _this._navL() : _this._navR();
                case !!bul: {
                    var num = +bul.dataset.slide;
                    if (num === curSlide || animating)
                        return;
                    _this.curSlide = num;
                    _this._changeSlides();
                }
            }
        };
    };
    Section8.prototype._onRes = function () {
        var btn = this.S8.querySelectorAll(".S8__t-h-link button");
        var OnRes = function () {
            if (window.innerWidth >= 946 && btn[0].classList.contains("ripple")) {
                try {
                    for (var btn_1 = tslib_1.__values(btn), btn_1_1 = btn_1.next(); !btn_1_1.done; btn_1_1 = btn_1.next()) {
                        var b = btn_1_1.value;
                        b.classList.remove("ripple");
                        b.style.overflow = "";
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (btn_1_1 && !btn_1_1.done && (_a = btn_1.return)) _a.call(btn_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            else if (window.innerWidth < 946 && !btn[0].classList.contains("ripple")) {
                try {
                    for (var btn_2 = tslib_1.__values(btn), btn_2_1 = btn_2.next(); !btn_2_1.done; btn_2_1 = btn_2.next()) {
                        var b = btn_2_1.value;
                        b.classList.add("ripple");
                        b.style.overflow = "hidden";
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (btn_2_1 && !btn_2_1.done && (_b = btn_2.return)) _b.call(btn_2);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            var e_1, _a, e_2, _b;
        };
        OnRes();
        return OnRes;
    };
    Section8.prototype._setEvList = function () {
        this._U_EventListSetter("click", this._onClick(), this.S8);
        this._U_EventListSetter("resize", this._onRes());
    };
    return Section8;
}(Utilities));
export default Section8;
