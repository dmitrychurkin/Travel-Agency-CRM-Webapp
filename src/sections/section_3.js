import * as tslib_1 from "tslib";
import Utilities from "./Utilities";
var Section3 = (function (_super) {
    tslib_1.__extends(Section3, _super);
    function Section3(fn) {
        var _this = _super.call(this) || this;
        _this._Helper = function (obj1, obj2, fn) {
            obj1.done = true;
            if (obj2.visible) {
                fn.call(this);
            }
        };
        _this.Figure_1 = _this._Obj;
        _this.Figure_2 = _this._Obj;
        _this.Figure_3 = _this._Obj;
        _this._U_IOSetter(".S3__lim", [function () { return (_this.Figure_1.visible = true, _this._icon1(), fn()); }, function () { return (_this.Figure_2.visible = true, _this._icon2()); }, function () { return (_this.Figure_3.visible = true, _this._icon3()); }]);
        return _this;
    }
    Object.defineProperty(Section3.prototype, "_Obj", {
        get: function () {
            return {
                done: false,
                visible: false
            };
        },
        enumerable: true,
        configurable: true
    });
    Section3.prototype._icon1 = function () {
        var halfTitle = document.querySelector(".S3__ht"), halfTitleWrapper = document.querySelector(".S3__ht-w"), _a = this, Figure_1 = _a.Figure_1, Figure_2 = _a.Figure_2, _Helper = _a._Helper, _icon2 = _a._icon2;
        return new TimelineMax(this._U_objVarsForTimeline({ paused: false }))
            .add(function () { return document.querySelector(".S3__t").classList.add("S3__a_o"); })
            .add(function () {
            halfTitle.classList.add("S3__a_tw");
            halfTitleWrapper.classList.add("S3__a_th");
        }, "+=1")
            .to("#S3__leadership .S3__mC", 1, {
            attr: {
                r: 75
            },
            ease: Strong.easeOut
        }, "+=1")
            .to(".S3__pr-c.S3__f-i-c", 1, {
            css: {
                x: 0,
                opacity: 1
            },
            ease: Circ.easeOut
        })
            .to("#S3__bowl", 2, {
            attr: {
                transform: "matrix(1,0,0,1,0,0)"
            },
            ease: Strong.easeOut
        }, "-=1.5")
            .call(_Helper, [Figure_1, Figure_2, _icon2], this, "-=2");
    };
    Section3.prototype._icon2 = function () {
        if (!this.Figure_1.done)
            return;
        var _a = this, Figure_2 = _a.Figure_2, Figure_3 = _a.Figure_3, _Helper = _a._Helper, _icon3 = _a._icon3;
        return new TimelineMax(this._U_objVarsForTimeline({ paused: false }))
            .to("#S3__people .S3__mC", 1, {
            attr: {
                r: 75
            },
            ease: Strong.easeOut
        })
            .to(".S3__pr-c.S3__s-i-c", 1, {
            css: {
                x: 0,
                opacity: 1
            },
            ease: Circ.easeOut
        })
            .to(".S3__H1", 0.7, {
            attr: {
                transform: "matrix(0.7,0,0,0.7,43.3951,51.464)"
            },
            ease: Back.easeInOut.config(1)
        }, "-=1.3")
            .to(".S3__R2", 0.7, {
            attr: {
                transform: "matrix(1,0,0,1,0,0)"
            },
            ease: Back.easeInOut.config(1)
        }, "-=0.55")
            .to(".S3__R3", 0.7, {
            attr: {
                transform: "matrix(1,0,0,1,0,-10)"
            },
            ease: Back.easeInOut.config(1)
        }, "-=1.1")
            .to(".S3__R4", 0.6, {
            attr: {
                transform: "matrix(1,0,0,1,0,0)"
            },
            ease: Back.easeInOut.config(1)
        }, "-=0.35")
            .call(_Helper, [Figure_2, Figure_3, _icon3], this, "-=1.9");
    };
    Section3.prototype._icon3 = function () {
        var _this = this;
        if (!this.Figure_2.done)
            return;
        return new TimelineMax(this._U_objVarsForTimeline({ paused: false }, [
            function () {
                _this.Figure_3.done = true;
                document.querySelector(".S3__pr.S3__a-a").classList.remove("S3__a-a");
                _this._U_GC({}, _this);
            }
        ]))
            .to("#S3__price .S3__mC", 1, {
            attr: {
                r: 92
            },
            ease: Strong.easeOut
        })
            .to(".S3__pr-c.S3__t-i-c", 1, {
            css: {
                x: 0,
                opacity: 1
            },
            ease: Circ.easeOut
        })
            .to(".S3__pT", 0.7, {
            attr: {
                transform: "matrix(-1, 1.7, 1.7, 1, -200, 400)"
            }
        }, "-=1")
            .to(".S3__rM", 0.1, {
            attr: {
                r: 0
            }
        }, "-=0.9")
            .to(".S3_pric", 0.5, {
            attr: {
                transform: "matrix(0.2, 0, 0, 0.2, 20, 0)"
            }
        }, "-=1");
    };
    return Section3;
}(Utilities));
export default Section3;
