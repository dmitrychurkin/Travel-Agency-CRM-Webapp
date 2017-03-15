import * as tslib_1 from "tslib";
import Utilities from "./Utilities";
var Section1112 = (function (_super) {
    tslib_1.__extends(Section1112, _super);
    function Section1112() {
        var _this = _super.call(this) || this;
        var target11 = document.querySelector(".S11__det-o-m"), target12 = document.querySelector(".S12__row");
        for (var _i = 0, _a = [{ el: target11, cl: "S11__show-m" }, { el: target12, cl: "S12__a" }]; _i < _a.length; _i++) {
            var _b = _a[_i], el = _b.el, cl = _b.cl;
            _this._U_IntersectionObserver(el, _this._U_DefaultHelperForIO(el, cl));
        }
        _this._U_GC({}, Object.getPrototypeOf(_this), false);
        return _this;
    }
    return Section1112;
}(Utilities));
export default Section1112;
;
