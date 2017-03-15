import * as tslib_1 from "tslib";
import Utilities from "../sections/Utilities";
var SkypeTooltip = (function (_super) {
    tslib_1.__extends(SkypeTooltip, _super);
    function SkypeTooltip() {
        var _this = _super.call(this) || this;
        _this._U_EventListSetter("click", _this._onCl());
        return _this;
    }
    SkypeTooltip.prototype._onCl = function () {
        var _this = this;
        var ToolTip = document.querySelector(".sk__tt");
        return function (e) {
            var targ = e.target.closest(".skype");
            if (targ) {
                _this._selectBestPosition(ToolTip, function () { return _this._calcDist(targ); });
            }
        };
    };
    SkypeTooltip.prototype._selectBestPosition = function (tooltip, fn) {
        var res = fn(), offWidth = tooltip.offsetWidth, top = res[1].top + window.pageYOffset;
        if (offWidth + 100 <= res[0]) {
            this._showTooltip(tooltip, { left: res[1].right, top: top });
        }
        else if (offWidth + 100 <= res[0] - res[1].width) {
            this._showTooltip(tooltip, { left: res[1].left - offWidth - 5, top: top });
        }
        else {
            this._showTooltip(tooltip, { left: res[1].left - (offWidth / 2) + (res[1].width / 2), top: top + res[1].height + 5 });
        }
    };
    SkypeTooltip.prototype._calcDist = function (targ) {
        var targClientRect = targ.getBoundingClientRect();
        if (!("width" in targClientRect)) {
            targClientRect.width = targ.clientWidth;
        }
        if (!("height" in targClientRect)) {
            targClientRect.height = targ.clientHeight;
        }
        return [(window.innerWidth - targClientRect.left) + targClientRect.width, targClientRect];
    };
    SkypeTooltip.prototype._showTooltip = function (tooltip, _a) {
        var left = _a.left, top = _a.top;
        this._hideTooltip(tooltip);
        tooltip.style.visibility = "visible";
        tooltip.style.opacity = "1";
        tooltip.style.left = left + "px";
        tooltip.style.top = top + "px";
    };
    SkypeTooltip.prototype._hideTooltip = function (tooltip) {
        setTimeout(function () {
            tooltip.style.visibility = "hidden";
            tooltip.style.opacity = "0";
        }, 2000);
    };
    return SkypeTooltip;
}(Utilities));
export default SkypeTooltip;
