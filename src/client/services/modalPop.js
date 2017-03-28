var ModalPop = (function () {
    function ModalPop(targetSelector, containerSelector, onBeforeAdd) {
        this.targetSelector = targetSelector;
        this.containerSelector = containerSelector;
        this.memPosition = null;
        this.ModalContainer = document.querySelector(".Modal__cont");
        this.OnCl = this._onCl(onBeforeAdd);
        window.addEventListener("click", this.OnCl);
        this._createSkypeLink();
    }
    ModalPop.setPlugin = function (targetSelector, containerSelector, onBeforeAdd) {
        if (targetSelector === void 0) { targetSelector = ".S__cel"; }
        if (containerSelector === void 0) { containerSelector = ".S__mod"; }
        if (onBeforeAdd === void 0) { onBeforeAdd = OnBeforeAdd(); }
        return new ModalPop(targetSelector, containerSelector, onBeforeAdd);
    };
    ModalPop.prototype._onCl = function (onBeforeAdd) {
        var _this = this;
        return function (e) {
            try {
                var target = e.target;
                var el = target.closest(_this.targetSelector);
                if (target.closest(".Modal__close-btn") || target.closest(".Modal__can")) {
                    _this._deactivate();
                }
                else if (el) {
                    _this.memPosition = el.parentNode.querySelector(_this.containerSelector);
                    _this._addContent(_this.memPosition.firstElementChild, onBeforeAdd);
                }
                else if (!el) {
                    return;
                }
            }
            catch (e) {
                console.error("Please Insert Content Here!");
            }
        };
    };
    ModalPop.prototype._addContent = function (content, onBeforeAdd) {
        onBeforeAdd(content);
        this.ModalContainer.appendChild(content);
        this._activate();
    };
    ModalPop.prototype._activate = function () {
        document.body.classList.add("Modal__A");
    };
    ModalPop.prototype._deactivate = function () {
        document.body.classList.remove("Modal__A");
        this._replaceContent();
    };
    ModalPop.prototype._replaceContent = function () {
        this.memPosition.appendChild(this.ModalContainer.firstElementChild);
        this.memPosition = null;
    };
    ModalPop.prototype._createSkypeLink = function () {
        var skypeLinkModal = document.querySelector(".Modal__call-link");
        var shypeLinkGlobal = document.getElementById("call");
        if (shypeLinkGlobal && shypeLinkGlobal.href) {
            skypeLinkModal.href = shypeLinkGlobal.href;
        }
    };
    ModalPop.prototype.unsetPlugin = function () {
        window.removeEventListener("click", this.OnCl);
    };
    return ModalPop;
}());
export default ModalPop;
;
export function OnBeforeAdd() {
    var warn = document.querySelector(".S__embedd-warn");
    var fee = document.querySelector(".S__embedd-fee");
    return function (content) {
        if (content && !content.hasAttribute("data-content")) {
            content.appendChild(warn.cloneNode(true));
            content.setAttribute("data-content", "");
            var pseudoFeeContainer = content.querySelector(".S__ph-fee");
            if (pseudoFeeContainer) {
                pseudoFeeContainer.parentNode.insertBefore(fee.cloneNode(true), pseudoFeeContainer);
                pseudoFeeContainer.remove();
            }
        }
    };
}
