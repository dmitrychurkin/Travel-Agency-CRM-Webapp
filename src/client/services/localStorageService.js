var LocalStorageService = (function () {
    function LocalStorageService() {
    }
    LocalStorageService.prototype.isLSSupport = function () {
        this.LS = ("localStorage" in window) || false;
    };
    LocalStorageService.prototype.userDataBuffLS = function (dataAttr) {
        var _this = this;
        if (dataAttr === void 0) { dataAttr = "data-cache"; }
        var LS__MODEL = {};
        return function (input) {
            if (input && input.hasAttribute(dataAttr)) {
                LS__MODEL[input.id] = input.value;
            }
            return function () {
                if (_this.LS) {
                    localStorage.setItem(_this.U_Flag, JSON.stringify(LS__MODEL));
                }
            };
        };
    };
    LocalStorageService.prototype.userDataUnBuffLS = function () {
        var userData = localStorage.getItem(this.U_Flag);
        var LS__MODEL = userData && JSON.parse(userData);
        if (!this.LS || !LS__MODEL)
            return false;
        return function (input) {
            var field = input.id.toString();
            if (field in LS__MODEL) {
                input.setAttribute("value", LS__MODEL[field]);
            }
        };
    };
    LocalStorageService.prototype.userDataKillBuffLS = function () {
        this.LS && localStorage.removeItem(this.U_Flag);
    };
    LocalStorageService.prototype.hydratorLS = function (reqId) {
        if (this.LS) {
            var H_Flag = this.H_Flag;
            var str = localStorage.getItem(H_Flag);
            if (!str) {
                localStorage.setItem(H_Flag, [reqId].join(", "));
            }
            else {
                var arr = str.split(", ");
                arr.push(reqId);
                localStorage.setItem(H_Flag, arr.join(", "));
            }
            return true;
        }
        return false;
    };
    return LocalStorageService;
}());
export default LocalStorageService;
