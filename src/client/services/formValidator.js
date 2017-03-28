var ClientFormValidator = (function () {
    function ClientFormValidator() {
    }
    ClientFormValidator.prototype.checkValidity = function (target) {
        if (target.checkValidity) {
            return target.checkValidity();
        }
        return true;
    };
    ClientFormValidator.prototype.whiteSpaceWatcher = function (value, target) {
        var arrValue = value.split(" ").filter(function (item) { return !!item; });
        if (arrValue.length > 1) {
            target.value = arrValue.join(" ");
        }
        else {
            target.value = arrValue.join("");
        }
    };
    ClientFormValidator.prototype.validateField = function (target) {
        var value = target.value.trim();
        var targetParent = target.parentNode;
        if (value) {
            targetParent.classList.add("F__dirty");
            if (this.checkValidity(target)) {
                this.whiteSpaceWatcher(value, target);
                this.setMessage(target);
                targetParent.classList.add("F__valid");
            }
            else {
                this.setMessage(target);
                targetParent.classList.add("F__invalid");
            }
        }
        else {
            if (target.required) {
                this.setMessage(target);
                targetParent.classList.add("F__invalid");
            }
            targetParent.classList.remove("F__dirty");
            target.value = "";
        }
        targetParent.classList.remove("F__active");
    };
    ClientFormValidator.prototype.setMessage = function (target) {
        target.parentNode.querySelector(".F__inform").innerHTML = target.validationMessage || "";
    };
    return ClientFormValidator;
}());
export default ClientFormValidator;
