import * as tslib_1 from "tslib";
import Utilities from "../sections/Utilities";
var ScrollToTop = (function (_super) {
    tslib_1.__extends(ScrollToTop, _super);
    function ScrollToTop() {
        var _this = _super.call(this) || this;
        _this.isAnim = false;
        _this.svg = document.querySelector(".Top svg").classList;
        var fn = _this._onScr();
        _this._U_EventListSetter("click", _this._onCl());
        _this._U_EventListSetter("scroll", fn);
        return _this;
    }
    ScrollToTop.prototype._onCl = function () {
        var _this = this;
        var lastPos = 0;
        return function (e) {
            if (_this.isAnim)
                return;
            var targ = e.target;
            if (targ.closest(".Top")) {
                var pageYOffset_1 = window.pageYOffset;
                if (pageYOffset_1 > 0) {
                    lastPos = pageYOffset_1;
                }
                _this._animate(!pageYOffset_1 ? lastPos : 0);
            }
        };
    };
    ScrollToTop.prototype._onScr = function () {
        var _this = this;
        var bCl = document.querySelector(".Top").classList, S1 = document.querySelector(".S1");
        return function () {
            if (_this.isAnim)
                return;
            if (S1.getBoundingClientRect().bottom < 0 && !bCl.contains("Top__on")) {
                bCl.add("Top__on");
            }
            else if (S1.getBoundingClientRect().bottom >= 0 && bCl.contains("Top__on")) {
                bCl.remove("Top__on"),
                    _this.svg.remove("Top__cl");
            }
        };
    };
    ScrollToTop.prototype._animate = function (pos) {
        var _this = this;
        !pos ? this.svg.add("Top__cl") : this.svg.remove("Top__cl");
        this.isAnim = true;
        TweenLite.to(window, 1, {
            scrollTo: { y: pos, autoKill: false },
            ease: Circ.easeOut,
            onComplete: function () { return setTimeout(function () { return _this.isAnim = false; }, 100); }
        });
    };
    return ScrollToTop;
}(Utilities));
export default ScrollToTop;
