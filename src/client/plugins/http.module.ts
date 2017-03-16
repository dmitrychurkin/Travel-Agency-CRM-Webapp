interface IPayload {
    status: number;
    statusText: string;
    responseText: string;
    response: any;
    xhr: boolean;
}
export type ICommonOptionsToPass = {
    method?: string;
    body?: null | IS | string;
    mode?: string;
    credentials?: string;
    cache?: string;
    redirect?: string;
    referrer?: string;
    referrerPolicy?: string;
    responseAs?: string;
    headers?: { [i: string]: string };
    timeout?: number;
};
type Actions = {
    actionsOnSuccess?: Array<(a?: any) => void>;
    actionsOnFail?: Array<(a?: any) => void>;
    actionsOnAlways?: Array<(a?: any) => void>;
};
interface ICommonArg {
    options?: ICommonOptionsToPass;
    actions?: Actions;
}
interface IArrReqArg {
    url: string;
    afterEach: Actions;
    options: ICommonOptionsToPass;
}

declare let fetch: any;
// let DEBUG = false;
export default class HttpController {
    static _xhrDetector(res: IPayload) {
        return res.xhr && (res.status === 200 || res.status === 304);
    }
    private XMLHttp: boolean;
    private Fetch: boolean;
    private XMLHttpRequest: XMLHttpRequest | XDomainRequest;
    constructor() {
        this.XMLHttpRequest = this._setOrbitraryMethod();
    }
    _stringify(body: string | IS) {
        if (body) {
            body = typeof body === "string" ? body : JSON.stringify(body);
        }
        return body;
    }
    _setOrbitraryMethod() {
        if ("fetch" in window) {
            this.Fetch = true;
        }else {
            this.XMLHttp = true;
        }
        return ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    }

    configureAndSendRequest(ArrReqObj: Array<IArrReqArg | string> | string, commonObj: ICommonArg = {}, afterAll: Actions = {}) {
        let ArrReqCore = (Array.isArray(ArrReqObj)) ? ArrReqObj : [ArrReqObj],
            OnSuccessSet: ((a?: any) => void)[] | null | undefined = null,
            OnFailSet: ((a?: any) => void)[] | null | undefined = null,
            OnAlwaysSet: ((a?: any) => void)[] | null | undefined = null,
            optionsToPassIfCommonExists: ICommonOptionsToPass | null = null;

        if (commonObj!.options && commonObj!.actions) {
            let body = commonObj!.options!.body;
            commonObj!.options!.body = this._stringify(body!);
            optionsToPassIfCommonExists = Object.assign({
                method: "GET",
                body: null,
                mode: "same-origin",
                credentials: "same-origin",
                cache: "default",
                redirect: "follow",
                referrer: "client",
                referrerPolicy: "origin",
                responseAs: "text"
            }, commonObj!.options || {});
            let { headers= {} }: ICommonOptionsToPass  = commonObj!.options!;
            optionsToPassIfCommonExists.headers = optionsToPassIfCommonExists.mode === "cors" ? headers : Object.assign({ "X-Requested-With": "XMLHttpRequest" }, headers);
            ({ actionsOnSuccess: OnSuccessSet = null, actionsOnFail: OnFailSet = null, actionsOnAlways: OnAlwaysSet = null } = commonObj!.actions!);

        }

        if (this.Fetch) {

            let resultsSet = ArrReqCore.map(async request => {

                let { url= "", afterEach: { actionsOnSuccess= null, actionsOnFail= null, actionsOnAlways= null }= {},  options: { method= "GET", headers= {}, body= null, mode= "same-origin", credentials= "same-origin", cache= "default", redirect= "follow", referrer= "client", referrerPolicy= "origin", responseAs= "text" }= {} } = typeof request === "object" ? request : { url: ""};

                let FnFailHandler = (res: any) => {
                    OnFailSet && OnFailSet.forEach(fn => fn(res));
                    actionsOnFail && actionsOnFail.forEach(fn => fn(res));
                    OnAlwaysSet && OnAlwaysSet.forEach(fn => fn(res));
                    actionsOnAlways && actionsOnAlways.forEach(fn => fn(res));
                    return false;
                };
                let FnSuccessAlwaysHandler = (res: any) => {
                    OnSuccessSet && OnSuccessSet.forEach(fn => fn(res));
                    actionsOnSuccess && actionsOnSuccess.forEach(fn => fn(res));
                    OnAlwaysSet && OnAlwaysSet.forEach(fn => fn(res));
                    actionsOnAlways && actionsOnAlways.forEach(fn => fn(res));

                    return true;
                };

                body = this._stringify(body!);

                const response = await fetch(typeof request === "string" ? request : url, optionsToPassIfCommonExists || {
                    method,
                    headers: Object.assign(mode === "cors" ? {} : {
                        "X-Requested-With": "XMLHttpRequest"
                    }, headers),
                    body,
                    mode,
                    credentials,
                    cache,
                    redirect,
                    referrer,
                    referrerPolicy
                }).catch(() => false);
                if (typeof response !== "boolean") {
                    let ResPromise = null;
                    switch (responseAs) {
                        case "arrayBuffer": {
                            ResPromise = response.arrayBuffer();
                            break;
                        }
                        case "blob": {
                            ResPromise = response.blob();
                            break;
                        }
                        case "formData": {
                            ResPromise = response.formData();
                            break;
                        }
                        case "json": {
                            ResPromise = response.json();
                            break;
                        }
                        case "text": {
                            ResPromise = response.text();
                            break;
                        }
                        case "none": {
                            return FnSuccessAlwaysHandler(response);
                        }
                    }
                    let payload = await ResPromise;
                    return FnSuccessAlwaysHandler(payload);
                }
                return FnFailHandler(response);
            });

            return Promise.all(resultsSet).then(arr => {
                    if (arr.includes(false)) {
                        afterAll.actionsOnFail && afterAll.actionsOnFail.forEach(fn => fn());
                    }else {
                        afterAll.actionsOnSuccess && afterAll.actionsOnSuccess.forEach(fn => fn());
                    }
                })
                .catch(() => {
                    afterAll.actionsOnFail && afterAll.actionsOnFail.forEach(fn => fn());
                })
                .then(() => {
                    afterAll.actionsOnAlways && afterAll.actionsOnAlways.forEach(fn => fn());
                });

        }else {

            let resultSet: Array<boolean> = [];
            return new Promise(resolve => {

                ArrReqCore.forEach(request => {

                    let xhr = new this.XMLHttpRequest();
                    let { url= "", afterEach: { actionsOnSuccess= null, actionsOnFail= null, actionsOnAlways= null }= {}, options: { method= "GET", headers= {}, body= null, timeout= 30000, mode= "same-origin", responseAs= "text" }= {} } = typeof request === "object" ? request : { url: ""};

                    body = this._stringify(body!);

                    if (optionsToPassIfCommonExists) {
                        ({ method= "GET", headers= {}, body= null, timeout= 30000, mode= "same-origin", responseAs= "text" } = optionsToPassIfCommonExists);
                    }

                    xhr.open(method, typeof request === "string" ? request : url, "async");
                    xhr.timeout = timeout;
                    setHeadersForXMLHttp(xhr, mode, headers);
                    xhr.responseType = responseAs;
                    xhr.send(body);
                    let FnHandlersOnFail = (res: any) => {
                        OnFailSet && OnFailSet.forEach(fn => fn(res));
                        actionsOnFail && actionsOnFail.forEach(fn => fn(res));
                        resultSet.push(false);
                    };
                    xhr.onload = function(this: XMLHttpRequest | XDomainRequest){
                        let payload = ResponseConstructor(this);
                        if (HttpController._xhrDetector(payload)) {
                            OnSuccessSet && OnSuccessSet.forEach(fn => fn(payload.response));
                            actionsOnSuccess && actionsOnSuccess.forEach(fn => fn(payload.response));
                            resultSet.push(true);
                        }else {
                            FnHandlersOnFail(payload);
                        }

                    };
                    xhr.onerror = function(this: XMLHttpRequest | XDomainRequest){
                        let response = ResponseConstructor(this);
                        FnHandlersOnFail(response);
                    };
                    xhr.onloadend = function(this: XMLHttpRequest | XDomainRequest){
                        let response = ResponseConstructor(this);
                        OnAlwaysSet && OnAlwaysSet.forEach(fn => fn(response));
                        actionsOnAlways && actionsOnAlways.forEach(fn => fn(response));
                        if (resultSet.length === ArrReqCore.length) {
                            resolve(resultSet);
                        }
                    };

                });
            })
            .then((resultSet: Array<boolean>) => {
                if (resultSet.includes(false)) {
                    afterAll.actionsOnFail && afterAll.actionsOnFail.forEach(fn => fn());
                }else {
                   afterAll.actionsOnSuccess && afterAll.actionsOnSuccess.forEach(fn => fn());
                }
            })
            .catch(() => {

                afterAll.actionsOnFail && afterAll.actionsOnFail.forEach(fn => fn());
            })
            .then(() => {
                afterAll.actionsOnAlways && afterAll.actionsOnAlways.forEach(fn => fn());
            });
        }
        function setHeadersForXMLHttp(xhr: XMLHttpRequest | XDomainRequest, mode: string, objWithHeaders: { [i: string]: string }) {

            let mergedObjWithHeaders = Object.assign(mode === "cors" ? {} : {
                "X-Requested-With": "XMLHttpRequest"
            }, objWithHeaders);

            for (let header in mergedObjWithHeaders) {
                xhr.setRequestHeader(header, mergedObjWithHeaders[header]);
            }
        }
        function ResponseConstructor($this: XMLHttpRequest | XDomainRequest) {
            return {
                status: $this.status,
                statusText: $this.statusText,
                responseText: $this.responseText,
                response: $this.response,
                xhr: true
            };
        }
    }
    sendReq({ url= "", options= {} }: { url: string | string[], options: ICommonOptionsToPass }) {
        return new Promise((resolve, reject) => {
            this.configureAndSendRequest(url, {
                actions: {
                    actionsOnSuccess: [resolve],
                    actionsOnFail: [reject]
                },
                options
            });
        });
    }
}
