import Utilities from "./Utilities";
export default class Section13 extends Utilities {
    constructor() {
        super();
        document.getElementById("year")!.innerHTML = new Date().getFullYear().toString();
        let OnScr = this._onScr();
        OnScr();
        this._U_EventListSetter("scroll", OnScr);
        this._U_GC({}, this);
    }
    private _onScr() {
        let tarEl: Element = document.querySelector(".I__edge")!,
            Intersector: Element = document.querySelector(".Intersector")!,
            Icl = Intersector.classList;
        return () => {
            if (window.getComputedStyle(tarEl).display === "none") return;
            if (tarEl.getBoundingClientRect().top < window.innerHeight && !Icl.contains("I__a")) {
                Icl.add("I__a");
            }else if (tarEl.getBoundingClientRect().top >= window.innerHeight && Icl.contains("I__a")) {
                Icl.remove("I__a");
            }
        };
    }
}