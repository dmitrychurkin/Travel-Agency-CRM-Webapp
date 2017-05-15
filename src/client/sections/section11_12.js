import * as tslib_1 from "tslib";
import Utilities from "./Utilities";
var Section1112 = (function (_super) {
    tslib_1.__extends(Section1112, _super);
    function Section1112() {
        var _this = _super.call(this) || this;
        var target11 = document.querySelector(".S11__det-o-m"), target12 = document.querySelector(".S12__row");
        try {
            for (var _a = tslib_1.__values([{ el: target11, cl: "S11__show-m" }, { el: target12, cl: "S12__a" }]), _b = _a.next(); !_b.done; _b = _a.next()) {
                var _c = _b.value, el = _c.el, cl = _c.cl;
                _this._U_IntersectionObserver(el, _this._U_DefaultHelperForIO(el, cl), true, 0);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        _this._U_GC({}, Object.getPrototypeOf(_this), false);
        return _this;
        var e_1, _d;
    }
    return Section1112;
}(Utilities));
export default Section1112;
;
