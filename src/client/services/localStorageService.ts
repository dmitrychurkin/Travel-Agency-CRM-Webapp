export default class LocalStorageService {
    H_Flag: string;
    U_Flag: string;
    LS: boolean;
    isLSSupport() {
       this.LS = ("localStorage" in window) || false;
    }
    userDataBuffLS(dataAttr = "data-cache") {
        const LS__MODEL: IS = {};

        return (input?: HTMLInputElement) => {
            if (input && input.hasAttribute(dataAttr)) {
                LS__MODEL[input.id] = input.value;
            }
            return () => {
                if (this.LS) {
                    localStorage.setItem(this.U_Flag, JSON.stringify(LS__MODEL));
                }
            };
        };
    }
    userDataUnBuffLS() {
        let userData = localStorage.getItem(this.U_Flag);
        const LS__MODEL = userData && JSON.parse(userData);
        if (!this.LS || !LS__MODEL) return false;
        return (input: HTMLInputElement) => {
            let field = input.id.toString();
            if (field in LS__MODEL) {
                input.setAttribute("value", LS__MODEL[field]);
            }
        };
    }
    userDataKillBuffLS() {
        this.LS && localStorage.removeItem(this.U_Flag);
    }
    hydratorLS(reqId: string) {
        if (this.LS) {
            const{ H_Flag } = this;
            let str = localStorage.getItem(H_Flag);
            if (!str) {
                localStorage.setItem(H_Flag, [reqId].join(", "));
            }else {
                let arr = str.split(", ");
                arr.push(reqId);
                localStorage.setItem(H_Flag, arr.join(", "));
            }
            return true;
        }
        return false;
    }
}