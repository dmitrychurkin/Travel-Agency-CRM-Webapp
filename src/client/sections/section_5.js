import * as tslib_1 from "tslib";
import Utilities, { U } from "./Utilities";
var AnimModule = (function () {
    function AnimModule() {
    }
    AnimModule.SettingsObj = function (r, windmill, _a) {
        if (windmill === void 0) { windmill = false; }
        var _b = _a === void 0 ? { animType: "rotate", y: 0 } : _a, animType = _b.animType, y = _b.y;
        var ease = Power0.easeNone, position = "absolute";
        switch (animType) {
            case "rotate": {
                return {
                    rotation: r > 0 ? "360deg" : "-360deg",
                    position: position,
                    svgOrigin: windmill ? "331px 201px" : "200px 200px",
                    ease: ease
                };
            }
            case "hover": {
                return {
                    y: y,
                    position: position,
                    ease: ease
                };
            }
        }
        return {};
    };
    AnimModule.rotateAnimation = function () {
        var Planes = U._U_timelineFactory({ repeat: -1, tweens: [
                TweenLite.to(["#S5__m-s #airplane1", "#S5__m-s #airplane2"], 60, this.SettingsObj(1))
            ] }), CountryObj = U._U_timelineFactory({ repeat: -1, tweens: [
                TweenLite.to("#S5__m-s #countryObjects", 240, this.SettingsObj(1))
            ] }), FlotingGlobe = U._U_timelineFactory({ repeat: -1, tweens: [
                TweenLite.to("#S5__m-s #floatingGlobe", 360, this.SettingsObj(-1))
            ] }), Windmill = U._U_timelineFactory({ repeat: -1, tweens: [
                TweenLite.to("#S5__m-s #windmill", 2, this.SettingsObj(1, true))
            ] }), CirclesRight = U._U_timelineFactory({ repeat: -1, tweens: [
                TweenLite.to(["#S5__m-s #circle1", "#S5__m-s #circle5"], 12, this.SettingsObj(1))
            ] }), CirclesLeft = U._U_timelineFactory({ repeat: -1, tweens: [
                TweenLite.to("#S5__m-s #circle4", 24, this.SettingsObj(-1))
            ] });
        return [
            Planes,
            CountryObj,
            FlotingGlobe,
            Windmill,
            CirclesRight,
            CirclesLeft
        ];
    };
    AnimModule.hoverAnimation = function () {
        var h = function () { return U._U_timelineFactory({ repeat: -1, yoyo: true }); };
        return [
            h().to("#S5__m-s #cloud1", 3, this.SettingsObj(0, false, { animType: "hover", y: 5 })),
            h().to("#S5__m-s #cloud2", 3, this.SettingsObj(0, false, { animType: "hover", y: -3 })),
            h().to("#S5__m-s #cloud3", 3, this.SettingsObj(0, false, { animType: "hover", y: 3 })),
            h().to("#S5__m-s #globe", 5, this.SettingsObj(0, false, { animType: "hover", y: 10 }))
        ];
    };
    AnimModule.cWAn = function (selector1, selector2) {
        var group1 = U._U_timelineFactory().staggerTo(document.querySelectorAll(selector1), 1, {
            attr: {
                transform: function () {
                    var target = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        target[_i] = arguments[_i];
                    }
                    var a = target[1].getAttribute("transform"), s = "scale";
                    return "" + a.slice(0, a.indexOf(s)) + s + "(1)";
                }
            },
            ease: Elastic.easeOut.config(1, 0.5)
        }, 0.3);
        var group2 = U._U_timelineFactory().staggerTo(document.querySelectorAll(selector2), 1, {
            attr: {
                transform: function () {
                    var target = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        target[_i] = arguments[_i];
                    }
                    var a = target[1].getAttribute("transform"), s = "scale";
                    return "" + a.slice(0, a.indexOf(s)) + s + "(1)";
                }
            },
            ease: Elastic.easeOut.config(1, 0.5)
        }, 0.3);
        return [
            group1,
            group2
        ];
    };
    AnimModule.AnL = function () {
        return U._U_timelineFactory({ tweens: tslib_1.__spread(this.rotateAnimation(), this.hoverAnimation()), align: "start", paused: true });
    };
    AnimModule.AnWGr1 = function () {
        return U._U_timelineFactory(U._U_objVarsForTimeline({ paused: false, delay: 1, tweens: tslib_1.__spread(this.cWAn("#S5__m-s .cloud1 text", "#S5__m-s .cloud2 text")), align: "start", autoRemoveChildren: true }));
    };
    AnimModule.AnWGr2 = function () {
        return U._U_timelineFactory(U._U_objVarsForTimeline({ paused: false, tweens: tslib_1.__spread(this.cWAn("#S5__m-s .cloud3 text", "#S5__m-s .cloud4 text")), align: "start", autoRemoveChildren: true }));
    };
    return AnimModule;
}());
var Section5 = (function (_super) {
    tslib_1.__extends(Section5, _super);
    function Section5() {
        var _this = this;
        var _$this = _this = _super.call(this) || this;
        var CentralScene = document.querySelector(".S5__c-s");
        (function (w, cs) {
            if (navigator.userAgent.match(/msie/i) || navigator.userAgent.match(/trident/i)) {
                var IE = function () {
                    cs.style.height = window.innerWidth + "px";
                };
                IE();
                w.onresize = IE;
                _$this._U_EventListSetter("resize", IE);
            }
        })(window, CentralScene);
        _this.RootAnim = AnimModule.AnL();
        _this._U_IntersectionObserver(".S5", _this._U_StateTrigger(function () { return _this._U_animationPlay(_this.RootAnim); }, function () { return _this._U_animationPause(_this.RootAnim); }), false, 0);
        _this._U_IOSetter(".S5__lim", [
            function () {
                CentralScene.classList.add("S5_v");
                AnimModule.AnWGr1();
            },
            function () { return AnimModule.AnWGr2(); }
        ]);
        return _this;
    }
    Section5.prototype.OnFontLoaded = function () {
        var link = null;
        new Promise(function (res) { return (link = res); }).then(function () {
            document.querySelector(".S5__notOk").classList.remove("S5__notOk"),
                document.querySelector(".S5__t-notOk").classList.remove("S5__t-notOk"),
                Array.from(document.querySelectorAll(".S5__b-notOk")).forEach(function (el) { return el.classList.remove("S5__b-notOk"); });
        });
        this._U_GC({}, Object.getPrototypeOf(this), false);
        return link;
    };
    return Section5;
}(Utilities));
export default Section5;
