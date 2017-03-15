import * as tslib_1 from "tslib";
import Utilities from "../sections/Utilities";
var ScrollerCustom = (function (_super) {
    tslib_1.__extends(ScrollerCustom, _super);
    function ScrollerCustom(_a) {
        var $target = _a.$target, $placeholder = _a.$placeholder, _b = _a.initialPos, initialPos = _b === void 0 ? 0 : _b;
        var _this = _super.call(this) || this;
        _this._PH_height_SnapshotConst = 350;
        _this.FullPathtargetConst = 110;
        _this.$ph = document.querySelector($placeholder);
        _this.$target = document.querySelector($target);
        _this.initialPos = initialPos;
        _this.Computation();
        return _this;
    }
    ScrollerCustom.prototype.Computation = function () {
        var _a = this, offsetHeight = _a.$ph.offsetHeight, _PH_height_SnapshotConst = _a._PH_height_SnapshotConst, FullPathtargetConst = _a.FullPathtargetConst, getPercentage = this._U_FromValToPer(_PH_height_SnapshotConst, offsetHeight);
        this.FullPathtarget = this._U_FromPerToVal(FullPathtargetConst, getPercentage);
    };
    ;
    Object.defineProperty(ScrollerCustom.prototype, "PH_height", {
        get: function () {
            return this.$ph.offsetHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollerCustom.prototype, "ScrollTop", {
        get: function () {
            return window.pageYOffset;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollerCustom.prototype, "TargetFullPath", {
        get: function () {
            return this.FullPathtarget;
        },
        enumerable: true,
        configurable: true
    });
    ScrollerCustom.prototype.setPlugin = function () {
        var _this = this;
        var Fn = function () {
            var _a = _this, ScrollTop = _a.ScrollTop, initialPos = _a.initialPos, style = _a.$target.style;
            _this.Computation();
            if (ScrollTop >= initialPos) {
                var generalPerc = _this._U_FromValToPer(_this.PH_height, ScrollTop);
                if (generalPerc > 100) {
                    return;
                }
                style.transform = "translate(0, " + _this._U_FromPerToVal(_this.TargetFullPath, generalPerc) + "px)";
                style.opacity = (1 - (generalPerc / 100)).toString();
            }
        };
        Fn();
        this._U_EventListSetter("scroll", Fn);
        this._U_EventListSetter("resize", function () { return setTimeout(function () {
            _this.Computation();
            Fn();
        }, 500); });
    };
    return ScrollerCustom;
}(Utilities));
export default ScrollerCustom;
