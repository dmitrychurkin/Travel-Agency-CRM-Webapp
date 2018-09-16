export default class ParserS7 {
    private GLOB_LAYOUT = "globLayout";
    private CONTENT = "content";
    private REFER = "ref";
    private FORM = "form";
    private JS = "js";
    private CSS = "css";
    private DATA_CODE = "data_code";
    private ADDONS = "addons";

    private _m: any;

    get Model() {
        return this._m;
    }
    set Model(data) {
        this._m = data;
    }
    private _decode(base64: string) {
        return window.decodeURIComponent(window.atob(base64).split("").map(function(c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(""));
    }
    private _compose(arrOfDecodedContents: Array<string>) {
        return arrOfDecodedContents.join("");
    }
    private _decoder(keyToDecode: string, obj: any, layout= false) {
        if (layout) {
            if (obj.isDecoded) return [obj[keyToDecode][0], obj[keyToDecode][1]];
            obj.isDecoded = true;
            return obj[keyToDecode].map((el: string, i: number) => {
               let decodedContent = this._decode(el);
               obj[keyToDecode][i] = decodedContent;
               return decodedContent;
            });
        }
        if (obj.isDecoded) return obj[keyToDecode];
        let encodedContent = obj[keyToDecode];
        let decodedContent = this._decode(encodedContent);
        obj[keyToDecode] = decodedContent;
        obj.isDecoded = true;
        return decodedContent;
    }
    private _formHandler(formLink: string, obj: any) {
        const{ FORM, CONTENT } = this;
        let arrOfFormItems = obj[formLink];
        let outputArr: Array<string> = [];
        let traverser = (arrItems: Array<string>) => {
            arrItems.forEach((inputFormItem: any) => {
                if (typeof inputFormItem === "object") {
                    let layoutArray = null;
                    let remServiceKey = Object.keys(inputFormItem)[0];
                    if (remServiceKey) {
                        layoutArray = this._decoder(CONTENT, this.Model[FORM][remServiceKey], true);
                        outputArr.push(layoutArray[0]);
                    }
                    // if (Array.isArray(inputFormItem)) {
                    //     traverser(inputFormItem);
                    // }else {
                    //     if (typeof inputFormItem === "object") {
                            // let key = Object.keys(inputFormItem)[0];
                            if (Array.isArray(inputFormItem[remServiceKey])) {
                                traverser(inputFormItem[remServiceKey]);
                            }
                    //     }else {
                    //         outputArr.push(this._decoder(CONTENT, this.Model[FORM][inputFormItem]));
                    //     }
                    // }
                    outputArr.push(layoutArray[1]);
                }else {
                    outputArr.push(this._decoder(CONTENT, this.Model[FORM][inputFormItem]));
                }
            });
        };
        traverser(arrOfFormItems);
        return outputArr;
    }
    private _contentHandler(extractedItem: any) {
        const META = extractedItem.meta;
        const{ REFER, CONTENT, GLOB_LAYOUT } = this;
        let referLinkArr = META[REFER];
        let globalLayoutDecodedArr = this._decoder(CONTENT, this.Model[GLOB_LAYOUT], true);
        let outputArray = [globalLayoutDecodedArr[0]];
        outputArray.push(this._decoder(CONTENT, META));

        if (/*typeof referLinkArr !== "boolean"*/ Array.isArray(referLinkArr)) {
            outputArray.push( ...referLinkArr.map( (el: string) => this._decoder(CONTENT, this.Model[REFER][el]) ) );
        }
        outputArray.push(globalLayoutDecodedArr[1]);
        return outputArray;
    }
    private _extractItem(dataCode: string) {
        return this.Model[this.DATA_CODE][dataCode];
    }
    private _readMeta(extractedItem: any) {
        const{ FORM } = this;
        let outputArray = [];

        outputArray.push(...this._contentHandler(extractedItem));
        const formLink = extractedItem.meta[FORM];
        if (/*typeof formLink !== "boolean"*/ typeof formLink === "string") {
            outputArray.push(...this._formHandler(formLink, this.Model[FORM]));
        }

        return outputArray;
    }
    AllocateAddons() {
        const{ADDONS} = this;
        const ads = this.Model[ADDONS];
        let body = document.body;

        if (!ads) return;
        for (let addon in ads) {
            let customFragment = document.createElement("div");
            customFragment.innerHTML = this._decode(ads[addon]);
            while (customFragment.firstElementChild) {
                body.appendChild( customFragment.firstElementChild! );
            }
        }
        delete this.Model[ADDONS];
    }
    InitParsing(dataCode: DOMStringMap) {
        const{ JS, CSS } = this;
        const extractedItem = this._extractItem(dataCode.toString());
        let arrOfDecodedContents = this._readMeta(extractedItem);
        let c = this._compose(arrOfDecodedContents);
        if (this.Model.isDecoded) {
            return {
                c
            };
        }
        this.Model.isDecoded = true;
        return {
            c,
            j: this._decode(this.Model[JS]),
            s: this._decode(this.Model[CSS])
        };
    }
}