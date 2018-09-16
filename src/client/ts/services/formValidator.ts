export default class ClientFormValidator {
    checkValidity(target: HTMLInputElement) {
        if (target.checkValidity) {
            return target.checkValidity();
        }
        // stub
        return true;
    }
    whiteSpaceWatcher(value: string, target: HTMLInputElement) {
        let arrValue = value.split(" ").filter((item: string) => !!item);
        if (arrValue.length > 1) {
            target.value = arrValue.join(" ");
        }else {
            target.value = arrValue.join("");
        }
    }
    validateField(target: HTMLInputElement) {
        let value = target.value.trim();
        let targetParent = <HTMLElement>target.parentNode;
        if (value) {
            targetParent.classList.add("F__dirty");
            if (this.checkValidity(target)) {
                this.whiteSpaceWatcher(value, target);
                this.setMessage(target);
                targetParent.classList.add("F__valid");
            }else {
                this.setMessage(target);
                targetParent.classList.add("F__invalid");
            }
        }else {
            if (target.required) {
                this.setMessage(target);
                targetParent.classList.add("F__invalid");
            }
            targetParent.classList.remove("F__dirty");
            target.value = "";
        }
        targetParent.classList.remove("F__active");
    }
    setMessage(target: any) {
        target.parentNode.querySelector(".F__inform").innerHTML = target.validationMessage || "";
    }
}