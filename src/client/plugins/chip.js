import * as tslib_1 from "tslib";
import Utilities from "../sections/Utilities";
var Chip = (function (_super) {
    tslib_1.__extends(Chip, _super);
    function Chip() {
        var _this = _super.call(this) || this;
        _this.AnimClass1 = "chip__anim";
        _this.AnimClass2 = "chip__star_init";
        _this.Count = 5;
        _this.StartUpDelay = 300;
        _this.StarContainers = document.querySelectorAll(".chip__stars");
        _this.StarTemp = _this.StarContainers[0].firstElementChild;
        _this._starFact();
        return _this;
    }
    Chip.prototype._insertStar = function (starCont) {
        for (var i = 0, sC = this._getCount(starCont), _a = this, Count = _a.Count, StarTemp = _a.StarTemp; i < Count; ++i) {
            var newStar = StarTemp.cloneNode(true);
            if (StarTemp === starCont.firstElementChild && i === 0) {
                continue;
            }
            starCont.appendChild(newStar);
            var path = newStar.firstElementChild;
            if (i + 1 <= sC) {
                path.setAttribute("fill", "#f8d64e");
            }
            else {
                path.setAttribute("fill", "#949492");
            }
        }
    };
    Chip.prototype._getCount = function (starCont) {
        return +starCont.dataset.starCount;
    };
    Chip.prototype._starFact = function () {
        var StarContainers = this.StarContainers;
        try {
            for (var _a = tslib_1.__values(StarContainers), _b = _a.next(); !_b.done; _b = _a.next()) {
                var starCont = _b.value;
                this._insertStar(starCont);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var e_1, _c;
    };
    Chip.prototype._timer = function (fn, delay) {
        setTimeout(fn, delay);
    };
    Chip.prototype._Rate = function (slideChips) {
        this.Chips = slideChips.querySelectorAll(".chip");
        return slideChips.querySelectorAll(".chip__stars")[Symbol.iterator]();
    };
    Chip.prototype._clearAnim = function () {
        this._U_animationKill(this.RootTimeline);
    };
    Chip.prototype.Activate = function (slideChips) {
        var _this = this;
        var g = this._Rate(slideChips);
        var _a = this, Chips = _a.Chips, AnimClass1 = _a.AnimClass1, AnimClass2 = _a.AnimClass2, StartUpDelay = _a.StartUpDelay;
        var arrFn = [];
        var _loop_1 = function (i) {
            var svgSet = g.next().value.children;
            arrFn.push(function () {
                Chips[i].classList.add(AnimClass1);
                _this._timer(function () {
                    var _loop_2 = function (i_1) {
                        _this._timer(function () {
                            svgSet[i_1].classList.add(AnimClass2);
                        }, i_1 * (StartUpDelay - 200));
                    };
                    for (var i_1 = 0; i_1 < svgSet.length; ++i_1) {
                        _loop_2(i_1);
                    }
                }, StartUpDelay);
            });
        };
        for (var i = 0; i < Chips.length; i++) {
            _loop_1(i);
        }
        this.RootTimeline = this._U_timelineFactory()
            .add(arrFn, "+=0", "start", StartUpDelay / 1000);
    };
    Chip.prototype.Reset = function () {
        var _a = this, AnimClass1 = _a.AnimClass1, AnimClass2 = _a.AnimClass2;
        this._clearAnim();
        Array.from(document.querySelectorAll("." + AnimClass1)).forEach(function (chip) {
            chip.classList.remove(AnimClass1);
            Array.from(chip.querySelectorAll("." + AnimClass2)).forEach(function (star) { return star.classList.remove(AnimClass2); });
        });
        this.Chips = null;
    };
    return Chip;
}(Utilities));
export default Chip;
