import * as tslib_1 from "tslib";
import CountTo from "../plugins/countTo";
import Utilities from "./Utilities";
var Section10 = (function (_super) {
    tslib_1.__extends(Section10, _super);
    function Section10() {
        var _this = _super.call(this) || this;
        var OnRes = _this._onRes();
        OnRes();
        _this._U_EventListSetter("resize", OnRes);
        var mainCapt = document.querySelector(".S10__cont"), slaveCapt = document.querySelector(".S10__wrap2");
        _this._U_IOSetter(".S10__lim", [_this._U_DefaultHelperForIO(mainCapt, "S10__a"), _this._U_DefaultHelperForIO(slaveCapt, "S10__a")].concat(_this._setCount()));
        _this._U_GC({}, Object.getPrototypeOf(_this), false);
        return _this;
    }
    Section10.prototype._setCount = function () {
        var _this = this;
        function lambda(elem) {
            return function () { return elem.classList.add("S10__a"); };
        }
        var arrOfCounters = Array.from(document.querySelectorAll(".S10__num")), objToPass = {
            from: 0,
            speed: 1000,
            refreshInterval: 25,
            onComplete: lambda
        };
        return arrOfCounters.map(function (counterEl) {
            var countTo = new CountTo(counterEl, Object.assign({}, objToPass, { to: _this._parser(counterEl), onComplete: lambda(counterEl) }));
            return function () { return setTimeout(function () { return countTo.start(); }, 500); };
        });
    };
    Section10.prototype._parser = function (elem) {
        var to = +elem.innerHTML;
        elem.innerHTML = "0";
        return to;
    };
    Section10.prototype._onRes = function () {
        return function () {
            var mainCapt = document.querySelector(".S10__wrap1");
            if (window.innerWidth < 775) {
                mainCapt.style.height = "";
                return;
            }
            ;
            var videoEl = document.querySelector(".S10__vid"), height = videoEl.offsetHeight;
            mainCapt.style.height = height + "px";
        };
    };
    return Section10;
}(Utilities));
export default Section10;
