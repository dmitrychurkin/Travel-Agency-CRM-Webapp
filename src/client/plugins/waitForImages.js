import * as tslib_1 from "tslib";
var WaitForImages = (function () {
    function WaitForImages() {
    }
    WaitForImages.configure = function (_a) {
        var _this = this;
        var cN = _a.cN, cB = _a.cB;
        var COUNTER = 0, TargetElements = Array.from(document.querySelectorAll(cN)), totalImages = TargetElements.length;
        TargetElements.forEach(function (el) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var BackGrounImage, URLLink, fnCheckComplete, img, totalCount;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        BackGrounImage = window.getComputedStyle(el).backgroundImage, URLLink = /http.+\.png|jpg$/i.exec(BackGrounImage)[0], fnCheckComplete = function (resolver) {
                            return function () { return resolver(++COUNTER); };
                        }, img = new Image();
                        img.src = URLLink;
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                img.onerror = fnCheckComplete(reject);
                                img.onload = fnCheckComplete(resolve);
                            })];
                    case 1:
                        totalCount = _a.sent();
                        if (totalCount === totalImages) {
                            cB.forEach(function (fn) { return fn(); });
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    };
    return WaitForImages;
}());
export default WaitForImages;
