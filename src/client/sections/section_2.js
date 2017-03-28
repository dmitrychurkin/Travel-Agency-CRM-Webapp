import * as tslib_1 from "tslib";
import Utilities from "./Utilities";
var Section2 = (function (_super) {
    tslib_1.__extends(Section2, _super);
    function Section2() {
        var _this = _super.call(this) || this;
        _this.MainText = document.querySelector(".S2__mT");
        _this.BottomTextAll = Array.from(document.querySelectorAll(".S2__bc"));
        _this._U_IntersectionObserver(".S2", function () { return _this._combineScene1(); }, true, .5);
        return _this;
    }
    Section2.prototype._combineScene1 = function () {
        var _this = this;
        var Plane = document.querySelector(".S2__plane");
        return this._U_timelineFactory(this._U_objVarsForTimeline({ paused: false }, [function () { return document.querySelector(".S2__mr2").remove(); }]))
            .to(Plane, 0.5, {
            autoAlpha: 1,
            ease: Power4.easeIn
        })
            .to(Plane, 0.7, {
            attr: {
                transform: "matrix(1,0,0,1,0,0)"
            },
            ease: Power4.easeIn
        })
            .to(Plane, 0.2, {
            autoAlpha: 0,
            ease: Power4.easeIn
        }, "-=0.1")
            .to(".S2__bird", 0.5, {
            attr: {
                transform: "matrix(1,0,0,1,0,0)"
            },
            ease: Power4.easeIn
        }, "-=0.3")
            .to(".S2__blueObj", 0.4, {
            attr: {
                transform: "matrix(1,0,0,1,0,0)"
            },
            autoAlpha: 1,
            ease: Elastic.easeOut
        })
            .to(this.MainText, 1.5, {
            strokeDashoffset: 0,
            ease: Sine.easeIn
        })
            .to(this.MainText, 1, {
            attr: {
                fill: "#053961"
            },
            ease: Power4.easeIn
        }, "-=1.2")
            .call(function () {
            var color = "#ff7f00";
            _this.MainText.setAttribute("fill", "url('#S2__shine')");
            Plane.remove();
            document.querySelector(".S2__mr1").remove();
            _this.BottomTextAll.forEach(function (el) { return (el.setAttribute("fill", color), el.setAttribute("stroke", color)); });
        })
            .to(".S2__line", 1.5, {
            attr: {
                x2: 978,
                stroke: "#00f"
            },
            ease: Power4.easeOut
        })
            .to(this.MainText, 0.7, {
            strokeDashoffset: function () {
                var target = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    target[_i] = arguments[_i];
                }
                return +target[1].getAttribute("stroke-dasharray");
            },
            ease: Power4.easeIn
        }, "-=2")
            .to(".S2__bottomText", 1, {
            attr: {
                transform: "matrix(1,0,0,1,0,0)"
            },
            ease: Sine.easeOut
        }, "-=1")
            .add(function () { return _this._combineScene2(); }, "-=0.5");
    };
    Section2.prototype._combineScene2 = function () {
        var _this = this;
        var onRepeat = null, Bird = document.querySelector(".S2__bird"), BlueObj = document.querySelector(".S2__blueObj"), Gradient = Array.from(document.querySelectorAll("#S2__shine stop")).reverse();
        new Promise(function (res) { return (onRepeat = res); }).then(function () { return (_this._U_GC({ TimelineLooped: !!1 }, _this, false),
            _this._U_GC({}, Object.getPrototypeOf(_this), false)); });
        this.TimelineLooped = this._U_timelineFactory({ paused: false, repeat: -1, repeatDelay: 5, onRepeat: onRepeat })
            .staggerTo(Gradient, 0.3, {
            attr: {
                offset: "100%"
            }
        }, 0.1, function () {
            Gradient.forEach(function (item) { return item.setAttribute("offset", "0%"); });
        })
            .to(Bird, 0.5, {
            attr: {
                transform: "matrix(1,0,0,1,0,10)"
            },
            ease: Sine.easeOut
        })
            .to(Bird, 0.5, {
            attr: {
                transform: "matrix(1,0,0,1,0,0)"
            },
            ease: Sine.easeOut
        })
            .to(BlueObj, 0.5, {
            attr: {
                transform: "matrix(1,0,0,1,0,10)"
            },
            ease: Sine.easeOut
        }, "-=0.5")
            .to(BlueObj, 0.5, {
            attr: {
                transform: "matrix(1,0,0,1,0,0)"
            },
            ease: Sine.easeOut
        });
    };
    Section2.prototype.FBS2 = function () {
        var _this = this;
        var link = null, p = new Promise(function (res) { return (link = res); });
        p.then(function () { return (_this.MainText.classList.remove("S2__nOk"),
            _this.BottomTextAll.forEach(function (el) { return el.classList.remove("S2__nOk"); }),
            _this.BottomTextAll.forEach(function (el) { return el.setAttribute("y", "255"); })); });
        return link;
    };
    return Section2;
}(Utilities));
export default Section2;
