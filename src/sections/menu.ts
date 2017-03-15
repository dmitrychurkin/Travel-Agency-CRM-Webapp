import Utilities from "./Utilities";
export default class Menu extends Utilities {
    private Menu: HTMLElement = <HTMLElement>document.querySelector(".Menu");
    private Uls: Array<HTMLUListElement> = <Array<HTMLUListElement>>Array.from(document.querySelectorAll(".M__l-sub"));
    private isDisabled: boolean = false;
    private RootUl: HTMLUListElement | null = null;
    private osHeight: number;
    constructor() {
        super();
        this._memorizeHeight();
        this._U_EventListSetter("click", this._onCl());
    }
    private _memorizeHeight() {
        this.Uls.reverse().forEach((item: any) => {
            item.dataset.offsetHeight = item.offsetHeight;
            this._killHeight(item);
        });
    }
    private _killHeight(UlElem: any) {
        if (UlElem) {
            UlElem.style.height = "0";
        }
    }
    private _resetAll(assumedUl?: HTMLElement) {
        if (assumedUl && this._checkContains(assumedUl)) return;
        this.Uls.reverse().forEach(el => {
            this._killHeight(el);
        });
        this._removeActive();
        this.RootUl = null;
        this.osHeight = 0;
    }
    private _removeActive(ul?: Element) {
        let el = ul || document;
        Array.from(el.querySelectorAll(".M__a")).reverse().forEach(item => {
            item.classList.remove("M__a");
            let UlElem = item.nextElementSibling;
            this._killHeight(UlElem);
        });
    }
    private _setActiveOnLink(targ: HTMLAnchorElement) {
        targ.classList.add("M__a");
    }
    private _removeActiveOnLink(targ: HTMLAnchorElement) {
        targ.classList.remove("M__a");
    }
    private _clearOnClose(ul: HTMLUListElement) {
        this._removeActive(ul);
        this._removeActiveOnLink(<HTMLAnchorElement>ul.previousElementSibling);
    }
    private _traverseTreeUp(elUl: Element, flag: number) {
        if (elUl.tagName === "UL") {
            let parentUl: any = elUl.parentNode!.parentNode;
            if (parentUl.dataset.root) return;

            parentUl.style.height = `${flag ? (parentUl.offsetHeight + this.osHeight) : (parentUl.offsetHeight - this.osHeight)}px`;
            this.RootUl = parentUl;
            this._traverseTreeUp(parentUl, flag);
        }
    }
    private _handleHeightOnOpen(elUl: any): HTMLUListElement {
        let offsetHeight = +elUl.dataset.offsetHeight;
        this.osHeight = offsetHeight;
        elUl.style.height = `${offsetHeight}px`;
        return elUl;
    }
    private _handleHeightOnClose(elUl: HTMLUListElement): HTMLUListElement {
        let offsetHeight = elUl.offsetHeight;
        this.osHeight = offsetHeight;
        this._killHeight(elUl);
        this._clearOnClose(elUl);
        return elUl;
    }
    private _traverseUls(elUl: HTMLUListElement, flag: number) {
        this.RootUl =  flag ? this._handleHeightOnOpen(elUl) : this._handleHeightOnClose(elUl);
        this._traverseTreeUp(this.RootUl, flag);
    }
    private _checkIfNew(assumedUl: HTMLElement) {
        if (!this.RootUl) {
            return this._removeActive();
        }
        if (!this.RootUl.contains(assumedUl)) {
            this._resetAll(assumedUl);
        }
    }
    private _checkContains(assumedUl: HTMLElement) {
        if (this.RootUl && this.RootUl.contains(assumedUl)) {
            return true;
        }
        return false;
    }
    private _checkIfHaveUl(target: HTMLAnchorElement, flag: number) {
        let assumedUl = <HTMLUListElement | null>target.nextElementSibling;
        if (assumedUl) {
            this._checkIfNew(assumedUl);
            this._traverseUls(assumedUl, flag);
        }else {
            this._resetAll(target);
        }
        flag ? this._setActiveOnLink(target) : (this._removeActive(target), this._removeActiveOnLink(target));
    }
    private _onCl() {
        let bodyCl = document.body.classList;
        return (e: any) => {
            if (this.isDisabled) return;
            let targ = e.target, link;
            if (targ.closest(".M__tg") && !bodyCl.contains("👍")) {
                this.openMenu();
            }else if ( (targ.closest(".M__tg") || targ.classList.contains("M__ol")) && bodyCl.contains("👍") ) {
                this.closeMenu();
            }else if ( (link = targ.closest(".M__lia")) && !link.classList.contains("M__a") ) {
                this._checkIfHaveUl(link, 1);
            }else if ( (link = targ.closest(".M__lia")) && link.classList.contains("M__a") ) {
                this._checkIfHaveUl(link, 0);
            }
        };
    }
    openMenu() {
        document.body.classList.add("👍");
        this.Menu.classList.remove("👎");
    }
    closeMenu() {
        document.body.classList.remove("👍");
        this.isDisabled = true;
        setTimeout(() => (this._resetAll(), this.isDisabled = false, this.Menu.classList.add("👎")), 1300);
    }
}