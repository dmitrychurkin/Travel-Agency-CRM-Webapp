import * as tslib_1 from "tslib";
import Utilities from "./Utilities";
var Section6 = (function (_super) {
    tslib_1.__extends(Section6, _super);
    function Section6() {
        var _this = _super.call(this) || this;
        _this._OnInit(window.innerWidth);
        var f = _this._OnInit;
        _this._U_EventListSetter("resize", function () { return f.call(_this, window.innerWidth); });
        _this._U_IOSetter(".S6__lim", tslib_1.__spread([
            function () {
                var tit = document.querySelector(".S6__a_tit");
                tit.classList.add("S6__v");
                tit.nextElementSibling.classList.add("S6__v");
            }
        ], _this._combineToAn()));
        return _this;
    }
    Section6.prototype._OnInit = function (curWidth) {
        var MAXWIDTH = 1366, MINWIDTH = 1030, FULLPATH = MAXWIDTH - MINWIDTH, MAXANGLE = 90, MINANGLE = 65, FULLANGLEPATH = MAXANGLE - MINANGLE;
        if (curWidth < MINWIDTH)
            return;
        var PercentWin = this._U_FromValToPer(FULLPATH, curWidth - MINWIDTH), ValueToSet = this._U_FromPerToVal(FULLANGLEPATH, PercentWin), jR = Array.from(document.querySelectorAll(".S6__j-r")), jL = Array.from(document.querySelectorAll(".S6__j-l"));
        jR.forEach(function (el) { return (el.style.transform = "rotate(" + (MAXANGLE - ValueToSet) + "deg)"); });
        jL.forEach(function (el) { return (el.style.transform = "rotate(-" + ((MAXANGLE - ValueToSet) + 180) + "deg)"); });
    };
    Section6.prototype._combineToAn = function () {
        var _this = this;
        var arrG = [];
        var _loop_1 = function (i, p) {
            var arr = [];
            if (i === 0) {
                arr.push(function () { return document.querySelector(".S6__kp_h").classList.add("S6__v"); });
            }
            arr.push(function () {
                p[i].firstElementChild.classList.add("S6__v");
                p[i].querySelector(".S6__p_i").classList.add("S6__v");
            });
            var Joint = p[i].querySelector(".S6__mk");
            if (Joint) {
                arr.push(TweenLite.to(Joint, 1, {
                    css: {
                        width: "0%"
                    },
                    delay: .1,
                    ease: Power4.easeIn
                }));
            }
            var Tl = this_1._U_timelineFactory(this_1._U_objVarsForTimeline({}, [i + 1 === p.length ? function () { return _this._U_GC({}, Object.getPrototypeOf(_this), false); } : function () { return ""; }])).add(arr);
            arrG.push(function () { return _this._U_animationPlay(Tl); });
        };
        var this_1 = this;
        for (var i = 0, p = document.querySelectorAll(".S6__p"); i < p.length; ++i) {
            _loop_1(i, p);
        }
        return arrG;
    };
    return Section6;
}(Utilities));
export default Section6;
