var ParserS7 = (function () {
    function ParserS7() {
        this.GLOB_LAYOUT = "globLayout";
        this.CONTENT = "content";
        this.REFER = "ref";
        this.FORM = "form";
        this.JS = "js";
        this.CSS = "css";
        this.DATA_CODE = "data_code";
        this.ADDONS = "addons";
    }
    Object.defineProperty(ParserS7.prototype, "Model", {
        get: function () {
            return this._m;
        },
        set: function (data) {
            this._m = data;
        },
        enumerable: true,
        configurable: true
    });
    ParserS7.prototype._decode = function (base64) {
        return window.decodeURIComponent(window.atob(base64).split("").map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(""));
    };
    ParserS7.prototype._compose = function (arrOfDecodedContents) {
        return arrOfDecodedContents.join("");
    };
    ParserS7.prototype._decoder = function (keyToDecode, obj, layout) {
        var _this = this;
        if (layout === void 0) { layout = false; }
        if (layout) {
            if (obj.isDecoded)
                return [obj[keyToDecode][0], obj[keyToDecode][1]];
            obj.isDecoded = true;
            return obj[keyToDecode].map(function (el, i) {
                var decodedContent = _this._decode(el);
                obj[keyToDecode][i] = decodedContent;
                return decodedContent;
            });
        }
        if (obj.isDecoded)
            return obj[keyToDecode];
        var encodedContent = obj[keyToDecode];
        var decodedContent = this._decode(encodedContent);
        obj[keyToDecode] = decodedContent;
        obj.isDecoded = true;
        return decodedContent;
    };
    ParserS7.prototype._formHandler = function (formLink, obj) {
        var _this = this;
        var _a = this, FORM = _a.FORM, CONTENT = _a.CONTENT;
        var arrOfFormItems = obj[formLink];
        var outputArr = [];
        var traverser = function (arrItems) {
            arrItems.forEach(function (inputFormItem) {
                if (typeof inputFormItem === "object") {
                    var layoutArray = null;
                    var remServiceKey = Object.keys(inputFormItem)[0];
                    if (remServiceKey) {
                        layoutArray = _this._decoder(CONTENT, _this.Model[FORM][remServiceKey], true);
                        outputArr.push(layoutArray[0]);
                    }
                    if (Array.isArray(inputFormItem[remServiceKey])) {
                        traverser(inputFormItem[remServiceKey]);
                    }
                    outputArr.push(layoutArray[1]);
                }
                else {
                    outputArr.push(_this._decoder(CONTENT, _this.Model[FORM][inputFormItem]));
                }
            });
        };
        traverser(arrOfFormItems);
        return outputArr;
    };
    ParserS7.prototype._contentHandler = function (extractedItem) {
        var _this = this;
        var META = extractedItem.meta;
        var _a = this, REFER = _a.REFER, CONTENT = _a.CONTENT, GLOB_LAYOUT = _a.GLOB_LAYOUT;
        var referLinkArr = META[REFER];
        var globalLayoutDecodedArr = this._decoder(CONTENT, this.Model[GLOB_LAYOUT], true);
        var outputArray = [globalLayoutDecodedArr[0]];
        outputArray.push(this._decoder(CONTENT, META));
        if (Array.isArray(referLinkArr)) {
            outputArray.push.apply(outputArray, referLinkArr.map(function (el) { return _this._decoder(CONTENT, _this.Model[REFER][el]); }));
        }
        outputArray.push(globalLayoutDecodedArr[1]);
        return outputArray;
    };
    ParserS7.prototype._extractItem = function (dataCode) {
        return this.Model[this.DATA_CODE][dataCode];
    };
    ParserS7.prototype._readMeta = function (extractedItem) {
        var FORM = this.FORM;
        var outputArray = [];
        outputArray.push.apply(outputArray, this._contentHandler(extractedItem));
        var formLink = extractedItem.meta[FORM];
        if (typeof formLink === "string") {
            outputArray.push.apply(outputArray, this._formHandler(formLink, this.Model[FORM]));
        }
        return outputArray;
    };
    ParserS7.prototype.AllocateAddons = function () {
        var ADDONS = this.ADDONS;
        var ads = this.Model[ADDONS];
        var body = document.body;
        if (!ads)
            return;
        for (var addon in ads) {
            var customFragment = document.createElement("div");
            customFragment.innerHTML = this._decode(ads[addon]);
            while (customFragment.firstElementChild) {
                body.appendChild(customFragment.firstElementChild);
            }
        }
        delete this.Model[ADDONS];
    };
    ParserS7.prototype.InitParsing = function (dataCode) {
        var _a = this, JS = _a.JS, CSS = _a.CSS;
        var extractedItem = this._extractItem(dataCode.toString());
        var arrOfDecodedContents = this._readMeta(extractedItem);
        var c = this._compose(arrOfDecodedContents);
        if (this.Model.isDecoded) {
            return {
                c: c
            };
        }
        this.Model.isDecoded = true;
        return {
            c: c,
            j: this._decode(this.Model[JS]),
            s: this._decode(this.Model[CSS])
        };
    };
    return ParserS7;
}());
export default ParserS7;
