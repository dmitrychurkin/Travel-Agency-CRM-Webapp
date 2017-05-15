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
            try {
                for (var _a = tslib_1.__values(document.querySelectorAll(".S4__init")), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var d = _b.value;
                    _loop_1(d);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return arr;
            var e_1, _c;
        })(), "+=0", "start", 0.3)
            .add(function () { return (document.querySelector(".S4__text").classList.add("S4__text_v"), document.querySelector(".S4__s").classList.add("S4__text_v"), document.querySelector(".S4__tit").classList.add("S4__tit_v")); })
            .add(function () { return (Array.from(document.querySelectorAll(".S4__ia")).forEach(function (el) { return el.classList.add("S4__ia_v"); }), Array.from(document.querySelectorAll(".S4__ia-c")).forEach(function (el) { return el.classList.add("S4__ia-c_v"); })); });
    };
    return Section4;
}(Utilities));
export default Section4;
