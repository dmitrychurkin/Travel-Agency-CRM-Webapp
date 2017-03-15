import * as tslib_1 from "tslib";
import Utilities from "./Utilities";
var Section4 = (function (_super) {
    tslib_1.__extends(Section4, _super);
    function Section4() {
        var _this = _super.call(this) || this;
        _this._U_IntersectionObserver(".S4__lim", function () { return _this._crAn(); });
        return _this;
    }
    Section4.prototype._crAn = function () {
        var _this = this;
        this._U_timelineFactory(this._U_objVarsForTimeline({ paused: false }, [function () { return _this._U_GC({}, _this); }]))
            .add((function () {
            var arr = [];
            var _loop_1 = function (d) {
                arr.push(function () { return d.classList.remove("S4__init"); });
            };
            for (var _i = 0, _a = document.querySelectorAll(".S4__init"); _i < _a.length; _i++) {
                var d = _a[_i];
                _loop_1(d);
            }
            return arr;
        })(), "+=0", "start", 0.3)
            .add(function () { return (document.querySelector(".S4__text").classList.add("S4__text_v"), document.querySelector(".S4__s").classList.add("S4__text_v"), document.querySelector(".S4__tit").classList.add("S4__tit_v")); })
            .add(function () { return (Array.from(document.querySelectorAll(".S4__ia")).forEach(function (el) { return el.classList.add("S4__ia_v"); }), Array.from(document.querySelectorAll(".S4__ia-c")).forEach(function (el) { return el.classList.add("S4__ia-c_v"); })); });
    };
    return Section4;
}(Utilities));
export default Section4;
