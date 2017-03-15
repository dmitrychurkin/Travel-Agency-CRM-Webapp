import * as tslib_1 from "tslib";
import Utilities from "./Utilities";
var Section13 = (function (_super) {
    tslib_1.__extends(Section13, _super);
    function Section13() {
        var _this = _super.call(this) || this;
        document.getElementById("year").innerHTML = new Date().getFullYear().toString();
        var OnScr = _this._onScr();
        OnScr();
        _this._U_EventListSetter("scroll", OnScr);
        _this._U_GC({}, _this);
        return _this;
    }
    Section13.prototype._onScr = function () {
        var tarEl = document.querySelector(".I__edge"), Intersector = document.querySelector(".Intersector"), Icl = Intersector.classList;
        return function () {
            if (window.getComputedStyle(tarEl).display === "none")
                return;
            if (tarEl.getBoundingClientRect().top < window.innerHeight && !Icl.contains("I__a")) {
                Icl.add("I__a");
            }
            else if (tarEl.getBoundingClientRect().top >= window.innerHeight && Icl.contains("I__a")) {
                Icl.remove("I__a");
            }
        };
    };
    return Section13;
}(Utilities));
export default Section13;
