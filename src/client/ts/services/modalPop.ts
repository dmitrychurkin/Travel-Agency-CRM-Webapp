export default class ModalPop {
    private memPosition: Element | null = null;
    private ModalContainer = document.querySelector(".Modal__cont")!;
    private OnCl: (a: any) => void;
    static setPlugin(targetSelector= ".S__cel", containerSelector= ".S__mod", onBeforeAdd= OnBeforeAdd()) {
        return new ModalPop(targetSelector, containerSelector, onBeforeAdd);
    }

    private constructor(private targetSelector: string, private containerSelector: string, onBeforeAdd: (a: any) => any) {
        this.OnCl = this._onCl(onBeforeAdd);
        window.addEventListener("click", this.OnCl);
        this._createSkypeLink();
    }
    private _onCl(onBeforeAdd: (a: any) => any) {

        return (e: any) => {
            try {
                let target = e.target;
                const el = target.closest(this.targetSelector);

                if (target.closest(".Modal__close-btn") || target.closest(".Modal__can")) {
                    this._deactivate();
                }else if (el) {
                    this.memPosition = el.parentNode.querySelector(this.containerSelector);
                    this._addContent(this.memPosition!.firstElementChild!, onBeforeAdd);
                }else if (!el) {
                    return;
                }
            }catch (e) {
                console.error("Please Insert Content Here!");
            }
        };
    }
    private _addContent(content: Element, onBeforeAdd: (a: any) => any) {
        onBeforeAdd(content);
        this.ModalContainer.appendChild(content);
        this._activate();
    }
    private _activate() {
        document.body.classList.add("Modal__A");
    }
    private _deactivate() {
        document.body.classList.remove("Modal__A");
        this._replaceContent();
    }
    private _replaceContent() {
        this.memPosition!.appendChild(this.ModalContainer.firstElementChild!);
        this.memPosition = null;
    }
    private _createSkypeLink() {
        let skypeLinkModal = document.querySelector(".Modal__call-link") as HTMLAnchorElement;
        let shypeLinkGlobal = document.getElementById("call") as HTMLAnchorElement;
        if (shypeLinkGlobal && shypeLinkGlobal.href) {
            skypeLinkModal.href = shypeLinkGlobal.href;
        }
    }
    unsetPlugin() {
        window.removeEventListener("click", this.OnCl);
    }
};
export function OnBeforeAdd() {
    let warn = document.querySelector(".S__embedd-warn")!;
    let fee = document.querySelector(".S__embedd-fee")!;
        return (content: Element) => {
            if (content && !content.hasAttribute("data-content")) {
                content.appendChild(warn.cloneNode(true));
                content.setAttribute("data-content", "");
                let pseudoFeeContainer = content.querySelector(".S__ph-fee");
                if (pseudoFeeContainer) {
                    pseudoFeeContainer.parentNode!.insertBefore(fee.cloneNode(true), pseudoFeeContainer);
                    pseudoFeeContainer.remove();
                }
            }

        };
}