var RippleMaterial = (function () {
    function RippleMaterial() {
        this.classTargSel = ".ripple";
        this.classNameRip = "rippleEffect";
        this.OffsetTop = 15;
        this.OffsetLeft = 25;
        this.setOnClick();
    }
    RippleMaterial.prototype._createDinEl = function (target, _a) {
        var top = _a.top, left = _a.left;
        var i = document.createElement("i"), OnAnimEnd = function () {
            i.removeEventListener("animationend", OnAnimEnd);
            i.remove();
        };
        i.className = this.classNameRip;
        i.style.top = top + "px";
        i.style.left = left + "px";
        i.addEventListener("animationend", OnAnimEnd);
        target.appendChild(i);
    };
    RippleMaterial.prototype.setOnClick = function () {
        var _this = this;
        document.addEventListener("click", function (e) {
            var t = e.target, target = t.closest(_this.classTargSel);
            if (target) {
                if (target.disabled)
                    return;
                target.style.position = "relative";
                target.style.overflow = "hidden";
                target.style.zIndex = "0";
                var pageYOffset_1 = window.pageYOffset, pageXOffset_1 = window.pageXOffset, _a = target.getBoundingClientRect(), top_1 = _a.top, left = _a.left;
                _this._createDinEl(target, { top: e.pageY - (top_1 + pageYOffset_1) - _this.OffsetTop,
                    left: e.pageX - (left + pageXOffset_1) - _this.OffsetLeft
                });
            }
        });
        delete this.setOnClick;
    };
    return RippleMaterial;
}());
export default RippleMaterial;
