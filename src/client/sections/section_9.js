import * as tslib_1 from "tslib";
import Utilities from "./Utilities";
var Section9 = (function (_super) {
    tslib_1.__extends(Section9, _super);
    function Section9() {
        var _this = _super.call(this) || this;
        _this._U_IntersectionObserver(".S9", _this.Animate(), true, 0);
        return _this;
    }
    Section9.prototype.Animate = function () {
        var counter = 0;
        var fn = function () {
            var targetEl = document.getElementById("S9__sc");
            if (targetEl.scrollTop + targetEl.offsetHeight < targetEl.scrollHeight) {
                targetEl.scrollTop = ++counter;
            }
            else {
                targetEl.scrollTop = counter = 0;
            }
            window.requestAnimationFrame(fn);
        };
        return fn;
    };
    return Section9;
}(Utilities));
export default Section9;
