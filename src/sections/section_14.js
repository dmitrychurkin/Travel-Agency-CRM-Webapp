import * as tslib_1 from "tslib";
import Utilities from "./Utilities";
var Section14 = (function (_super) {
    tslib_1.__extends(Section14, _super);
    function Section14(imgSrc) {
        var _this = _super.call(this) || this;
        _this.imgSrc = imgSrc;
        _this._U_IntersectionObserver(".S14__lim", function () { return _this._a(); });
        return _this;
    }
    Section14.prototype._a = function () {
        var _this = this;
        var pre = document.querySelectorAll(".S14__pre,.S14__gr,.S14__image"), chars = Array.from(document.querySelectorAll(".S14__f, .S14__b"));
        this._U_timelineFactory(this._U_objVarsForTimeline({ paused: false }, [function () { return _this._U_GC({}, _this); }]))
            .add(function () { return pre[0].classList.add("S14__a"); })
            .add(function () { return pre[1].classList.add("S14__a"); }, "+=1.3")
            .add(function () { return (pre[2].classList.add("S14__a"), pre[3].classList.add("S14__a")); }, "+=1.3")
            .add(function () { return chars.forEach(function (item) { return item.classList.add("S14__a"); }); }, "+=1.3");
    };
    Section14.prototype.imLoader = function () {
        var img = document.querySelector(".S14__image");
        img.src = this.imgSrc;
        img.onload = function (e) { return console.log("Image promo loaded! ", e); };
        img.onerror = function (e) { return console.log("Image promo not loaded! ", e); };
    };
    return Section14;
}(Utilities));
export default Section14;
