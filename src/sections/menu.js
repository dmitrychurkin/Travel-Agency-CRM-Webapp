import * as tslib_1 from "tslib";
import Utilities from "./Utilities";
var Menu = (function (_super) {
    tslib_1.__extends(Menu, _super);
    function Menu() {
        var _this = _super.call(this) || this;
        _this.Menu = document.querySelector(".Menu");
        _this.Uls = Array.from(document.querySelectorAll(".M__l-sub"));
        _this.isDisabled = false;
        _this.RootUl = null;
        _this._memorizeHeight();
        _this._U_EventListSetter("click", _this._onCl());
        return _this;
    }
    Menu.prototype._memorizeHeight = function () {
        var _this = this;
        this.Uls.reverse().forEach(function (item) {
            item.dataset.offsetHeight = item.offsetHeight;
            _this._killHeight(item);
        });
    };
    Menu.prototype._killHeight = function (UlElem) {
        if (UlElem) {
            UlElem.style.height = "0";
        }
    };
    Menu.prototype._resetAll = function (assumedUl) {
        var _this = this;
        if (assumedUl && this._checkContains(assumedUl))
            return;
        this.Uls.reverse().forEach(function (el) {
            _this._killHeight(el);
        });
        this._removeActive();
        this.RootUl = null;
        this.osHeight = 0;
    };
    Menu.prototype._removeActive = function (ul) {
        var _this = this;
        var el = ul || document;
        Array.from(el.querySelectorAll(".M__a")).reverse().forEach(function (item) {
            item.classList.remove("M__a");
            var UlElem = item.nextElementSibling;
            _this._killHeight(UlElem);
        });
    };
    Menu.prototype._setActiveOnLink = function (targ) {
        targ.classList.add("M__a");
    };
    Menu.prototype._removeActiveOnLink = function (targ) {
        targ.classList.remove("M__a");
    };
    Menu.prototype._clearOnClose = function (ul) {
        this._removeActive(ul);
        this._removeActiveOnLink(ul.previousElementSibling);
    };
    Menu.prototype._traverseTreeUp = function (elUl, flag) {
        if (elUl.tagName === "UL") {
            var parentUl = elUl.parentNode.parentNode;
            if (parentUl.dataset.root)
                return;
            parentUl.style.height = (flag ? (parentUl.offsetHeight + this.osHeight) : (parentUl.offsetHeight - this.osHeight)) + "px";
            this.RootUl = parentUl;
            this._traverseTreeUp(parentUl, flag);
        }
    };
    Menu.prototype._handleHeightOnOpen = function (elUl) {
        var offsetHeight = +elUl.dataset.offsetHeight;
        this.osHeight = offsetHeight;
        elUl.style.height = offsetHeight + "px";
        return elUl;
    };
    Menu.prototype._handleHeightOnClose = function (elUl) {
        var offsetHeight = elUl.offsetHeight;
        this.osHeight = offsetHeight;
        this._killHeight(elUl);
        this._clearOnClose(elUl);
        return elUl;
    };
    Menu.prototype._traverseUls = function (elUl, flag) {
        this.RootUl = flag ? this._handleHeightOnOpen(elUl) : this._handleHeightOnClose(elUl);
        this._traverseTreeUp(this.RootUl, flag);
    };
    Menu.prototype._checkIfNew = function (assumedUl) {
        if (!this.RootUl) {
            return this._removeActive();
        }
        if (!this.RootUl.contains(assumedUl)) {
            this._resetAll(assumedUl);
        }
    };
    Menu.prototype._checkContains = function (assumedUl) {
        if (this.RootUl && this.RootUl.contains(assumedUl)) {
            return true;
        }
        return false;
    };
    Menu.prototype._checkIfHaveUl = function (target, flag) {
        var assumedUl = target.nextElementSibling;
        if (assumedUl) {
            this._checkIfNew(assumedUl);
            this._traverseUls(assumedUl, flag);
        }
        else {
            this._resetAll(target);
        }
        flag ? this._setActiveOnLink(target) : (this._removeActive(target), this._removeActiveOnLink(target));
    };
    Menu.prototype._onCl = function () {
        var _this = this;
        var bodyCl = document.body.classList;
        return function (e) {
            if (_this.isDisabled)
                return;
            var targ = e.target, link;
            if (targ.closest(".M__tg") && !bodyCl.contains("👍")) {
                _this.openMenu();
            }
            else if ((targ.closest(".M__tg") || targ.classList.contains("M__ol")) && bodyCl.contains("👍")) {
                _this.closeMenu();
            }
            else if ((link = targ.closest(".M__lia")) && !link.classList.contains("M__a")) {
                _this._checkIfHaveUl(link, 1);
            }
            else if ((link = targ.closest(".M__lia")) && link.classList.contains("M__a")) {
                _this._checkIfHaveUl(link, 0);
            }
        };
    };
    Menu.prototype.openMenu = function () {
        document.body.classList.add("👍");
        this.Menu.classList.remove("👎");
    };
    Menu.prototype.closeMenu = function () {
        var _this = this;
        document.body.classList.remove("👍");
        this.isDisabled = true;
        setTimeout(function () { return (_this._resetAll(), _this.isDisabled = false, _this.Menu.classList.add("👎")); }, 1300);
    };
    return Menu;
}(Utilities));
export default Menu;
