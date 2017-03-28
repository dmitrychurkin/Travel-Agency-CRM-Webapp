new class ModalPop {
    constructor(targetSelector, containerSelector, onBeforeAdd) {
        this.targetSelector = targetSelector;
        this.containerSelector = containerSelector;
        this.memPosition = null;
        // this.ModalCloseBtn = ".Modal__close-btn";
        this.ModalContainer = document.querySelector(".Modal__cont");
        window.addEventListener("click", this._onCl(onBeforeAdd));
    }
    _onCl(onBeforeAdd) {
        
        return e => {
            try{
                let target = e.target;
                const el = target.closest(this.targetSelector);
                
                if (target.closest(".Modal__close-btn") || target.closest(".Modal__can")) {
                    this._deactivate();
                }else if (el) {
                    this.memPosition = el.parentNode.querySelector(this.containerSelector);
                    this._addContent(this.memPosition.firstElementChild, onBeforeAdd);
                }else if (!el) {
                    return;
                }
            }catch(e) {
                console.error('Please Insert Content Here!');
            }
        };
    }
    _addContent(content, onBeforeAdd) {
        onBeforeAdd(content);
        this.ModalContainer.appendChild(content);
        this._activate();
    }
    _activate() {
        document.body.classList.add("Modal__A");
    }
    _deactivate() {
        document.body.classList.remove("Modal__A");
        this._replaceContent();
    }
    _replaceContent() {
        this.memPosition.appendChild(this.ModalContainer.firstElementChild);
        this.memPosition = null;
    }
}(".S__cel", ".S__mod", OnBeforeAdd());
function OnBeforeAdd() {
    let warn = document.querySelector(".S__embedd-warn");
    let fee = document.querySelector(".S__embedd-fee");
        return content => {
            if (content && !content.hasAttribute("data-content")) {
                content.appendChild(warn.cloneNode(true));
                content.setAttribute("data-content", "");
                let pseudoFeeContainer = content.querySelector(".S__ph-fee");
                if (pseudoFeeContainer) {
                    pseudoFeeContainer.parentNode.insertBefore(fee.cloneNode(true), pseudoFeeContainer);
                    pseudoFeeContainer.remove();
                }
            }
            
        }
}