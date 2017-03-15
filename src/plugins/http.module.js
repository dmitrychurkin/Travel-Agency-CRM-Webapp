import * as tslib_1 from "tslib";
var HttpController = (function () {
    function HttpController() {
        this.XMLHttpRequest = this._setOrbitraryMethod();
    }
    HttpController._xhrDetector = function (res) {
        return res.xhr && (res.status === 200 || res.status === 304);
    };
    HttpController.prototype._stringify = function (body) {
        if (body) {
            body = typeof body === "string" ? body : JSON.stringify(body);
        }
        return body;
    };
    HttpController.prototype._setOrbitraryMethod = function () {
        if ("fetch" in window) {
            this.Fetch = true;
        }
        else {
            this.XMLHttp = true;
        }
        return ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    };
    HttpController.prototype.configureAndSendRequest = function (ArrReqObj, commonObj, afterAll) {
        var _this = this;
        if (commonObj === void 0) { commonObj = {}; }
        if (afterAll === void 0) { afterAll = {}; }
        var ArrReqCore = (Array.isArray(ArrReqObj)) ? ArrReqObj : [ArrReqObj], OnSuccessSet = null, OnFailSet = null, OnAlwaysSet = null, optionsToPassIfCommonExists = null;
        if (commonObj.options && commonObj.actions) {
            var body = commonObj.options.body;
            commonObj.options.body = this._stringify(body);
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
            }, commonObj.options || {});
            var _a = commonObj.options.headers, headers = _a === void 0 ? {} : _a;
            optionsToPassIfCommonExists.headers = optionsToPassIfCommonExists.mode === "cors" ? headers : Object.assign({ "X-Requested-With": "XMLHttpRequest" }, headers);
            (_b = commonObj.actions, _c = _b.actionsOnSuccess, OnSuccessSet = _c === void 0 ? null : _c, _d = _b.actionsOnFail, OnFailSet = _d === void 0 ? null : _d, _e = _b.actionsOnAlways, OnAlwaysSet = _e === void 0 ? null : _e);
        }
        if (this.Fetch) {
            var resultsSet = ArrReqCore.map(function (request) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var _a, _b, url, _c, _d, _e, actionsOnSuccess, _f, actionsOnFail, _g, actionsOnAlways, _h, _j, _k, method, _l, headers, _m, body, _o, mode, _p, credentials, _q, cache, _r, redirect, _s, referrer, _t, referrerPolicy, _u, responseAs, FnFailHandler, FnSuccessAlwaysHandler, response, ResPromise, payload;
                return tslib_1.__generator(this, function (_v) {
                    switch (_v.label) {
                        case 0:
                            _a = typeof request === "object" ? request : { url: "" }, _b = _a.url, url = _b === void 0 ? "" : _b, _c = _a.afterEach, _d = _c === void 0 ? {} : _c, _e = _d.actionsOnSuccess, actionsOnSuccess = _e === void 0 ? null : _e, _f = _d.actionsOnFail, actionsOnFail = _f === void 0 ? null : _f, _g = _d.actionsOnAlways, actionsOnAlways = _g === void 0 ? null : _g, _h = _a.options, _j = _h === void 0 ? {} : _h, _k = _j.method, method = _k === void 0 ? "GET" : _k, _l = _j.headers, headers = _l === void 0 ? {} : _l, _m = _j.body, body = _m === void 0 ? null : _m, _o = _j.mode, mode = _o === void 0 ? "same-origin" : _o, _p = _j.credentials, credentials = _p === void 0 ? "same-origin" : _p, _q = _j.cache, cache = _q === void 0 ? "default" : _q, _r = _j.redirect, redirect = _r === void 0 ? "follow" : _r, _s = _j.referrer, referrer = _s === void 0 ? "client" : _s, _t = _j.referrerPolicy, referrerPolicy = _t === void 0 ? "origin" : _t, _u = _j.responseAs, responseAs = _u === void 0 ? "text" : _u;
                            FnFailHandler = function (res) {
                                OnFailSet && OnFailSet.forEach(function (fn) { return fn(res); });
                                actionsOnFail && actionsOnFail.forEach(function (fn) { return fn(res); });
                                OnAlwaysSet && OnAlwaysSet.forEach(function (fn) { return fn(res); });
                                actionsOnAlways && actionsOnAlways.forEach(function (fn) { return fn(res); });
                                return false;
                            };
                            FnSuccessAlwaysHandler = function (res) {
                                OnSuccessSet && OnSuccessSet.forEach(function (fn) { return fn(res); });
                                actionsOnSuccess && actionsOnSuccess.forEach(function (fn) { return fn(res); });
                                OnAlwaysSet && OnAlwaysSet.forEach(function (fn) { return fn(res); });
                                actionsOnAlways && actionsOnAlways.forEach(function (fn) { return fn(res); });
                                return true;
                            };
                            body = this._stringify(body);
                            return [4 /*yield*/, fetch(typeof request === "string" ? request : url, optionsToPassIfCommonExists || {
                                    method: method,
                                    headers: Object.assign(mode === "cors" ? {} : {
                                        "X-Requested-With": "XMLHttpRequest"
                                    }, headers),
                                    body: body,
                                    mode: mode,
                                    credentials: credentials,
                                    cache: cache,
                                    redirect: redirect,
                                    referrer: referrer,
                                    referrerPolicy: referrerPolicy
                                }).catch(function () { return false; })];
                        case 1:
                            response = _v.sent();
                            if (!response.ok) {
                                return [2 /*return*/, FnFailHandler(response)];
                            }
                            ResPromise = null;
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
                                    return [2 /*return*/, FnSuccessAlwaysHandler(response)];
                                }
                            }
                            return [4 /*yield*/, ResPromise];
                        case 2:
                            payload = _v.sent();
                            return [2 /*return*/, FnSuccessAlwaysHandler(payload)];
                    }
                });
            }); });
            return Promise.all(resultsSet).then(function (arr) {
                if (arr.includes(false)) {
                    afterAll.actionsOnFail && afterAll.actionsOnFail.forEach(function (fn) { return fn(); });
                }
                else {
                    afterAll.actionsOnSuccess && afterAll.actionsOnSuccess.forEach(function (fn) { return fn(); });
                }
            })
                .catch(function () {
                afterAll.actionsOnFail && afterAll.actionsOnFail.forEach(function (fn) { return fn(); });
            })
                .then(function () {
                afterAll.actionsOnAlways && afterAll.actionsOnAlways.forEach(function (fn) { return fn(); });
            });
        }
        else {
            var resultSet_1 = [];
            return new Promise(function (resolve) {
                ArrReqCore.forEach(function (request) {
                    var xhr = new _this.XMLHttpRequest();
                    var _a = typeof request === "object" ? request : { url: "" }, _b = _a.url, url = _b === void 0 ? "" : _b, _c = _a.afterEach, _d = _c === void 0 ? {} : _c, _e = _d.actionsOnSuccess, actionsOnSuccess = _e === void 0 ? null : _e, _f = _d.actionsOnFail, actionsOnFail = _f === void 0 ? null : _f, _g = _d.actionsOnAlways, actionsOnAlways = _g === void 0 ? null : _g, _h = _a.options, _j = _h === void 0 ? {} : _h, _k = _j.method, method = _k === void 0 ? "GET" : _k, _l = _j.headers, headers = _l === void 0 ? {} : _l, _m = _j.body, body = _m === void 0 ? null : _m, _o = _j.timeout, timeout = _o === void 0 ? 30000 : _o, _p = _j.mode, mode = _p === void 0 ? "same-origin" : _p, _q = _j.responseAs, responseAs = _q === void 0 ? "text" : _q;
                    body = _this._stringify(body);
                    if (optionsToPassIfCommonExists) {
                        (_r = optionsToPassIfCommonExists.method, method = _r === void 0 ? "GET" : _r, _s = optionsToPassIfCommonExists.headers, headers = _s === void 0 ? {} : _s, _t = optionsToPassIfCommonExists.body, body = _t === void 0 ? null : _t, _u = optionsToPassIfCommonExists.timeout, timeout = _u === void 0 ? 30000 : _u, _v = optionsToPassIfCommonExists.mode, mode = _v === void 0 ? "same-origin" : _v, _w = optionsToPassIfCommonExists.responseAs, responseAs = _w === void 0 ? "text" : _w);
                    }
                    xhr.open(method, typeof request === "string" ? request : url, "async");
                    xhr.timeout = timeout;
                    setHeadersForXMLHttp(xhr, mode, headers);
                    xhr.responseType = responseAs;
                    xhr.send(body);
                    var FnHandlersOnFail = function (res) {
                        OnFailSet && OnFailSet.forEach(function (fn) { return fn(res); });
                        actionsOnFail && actionsOnFail.forEach(function (fn) { return fn(res); });
                        resultSet_1.push(false);
                    };
                    xhr.onload = function () {
                        var payload = ResponseConstructor(this);
                        if (HttpController._xhrDetector(payload)) {
                            OnSuccessSet && OnSuccessSet.forEach(function (fn) { return fn(payload.response); });
                            actionsOnSuccess && actionsOnSuccess.forEach(function (fn) { return fn(payload.response); });
                            resultSet_1.push(true);
                        }
                        else {
                            FnHandlersOnFail(payload);
                        }
                    };
                    xhr.onerror = function () {
                        var response = ResponseConstructor(this);
                        FnHandlersOnFail(response);
                    };
                    xhr.onloadend = function () {
                        var response = ResponseConstructor(this);
                        OnAlwaysSet && OnAlwaysSet.forEach(function (fn) { return fn(response); });
                        actionsOnAlways && actionsOnAlways.forEach(function (fn) { return fn(response); });
                        if (resultSet_1.length === ArrReqCore.length) {
                            resolve(resultSet_1);
                        }
                    };
                    var _r, _s, _t, _u, _v, _w;
                });
            })
                .then(function (resultSet) {
                if (resultSet.includes(false)) {
                    afterAll.actionsOnFail && afterAll.actionsOnFail.forEach(function (fn) { return fn(); });
                }
                else {
                    afterAll.actionsOnSuccess && afterAll.actionsOnSuccess.forEach(function (fn) { return fn(); });
                }
            })
                .catch(function () {
                afterAll.actionsOnFail && afterAll.actionsOnFail.forEach(function (fn) { return fn(); });
            })
                .then(function () {
                afterAll.actionsOnAlways && afterAll.actionsOnAlways.forEach(function (fn) { return fn(); });
            });
        }
        function setHeadersForXMLHttp(xhr, mode, objWithHeaders) {
            var mergedObjWithHeaders = Object.assign(mode === "cors" ? {} : {
                "X-Requested-With": "XMLHttpRequest"
            }, objWithHeaders);
            for (var header in mergedObjWithHeaders) {
                xhr.setRequestHeader(header, mergedObjWithHeaders[header]);
            }
        }
        function ResponseConstructor($this) {
            return {
                status: $this.status,
                statusText: $this.statusText,
                responseText: $this.responseText,
                response: $this.response,
                xhr: true
            };
        }
        var _b, _c, _d, _e;
    };
    HttpController.prototype.sendReq = function (_a) {
        var _this = this;
        var _b = _a.url, url = _b === void 0 ? "" : _b, _c = _a.options, options = _c === void 0 ? {} : _c;
        return new Promise(function (resolve, reject) {
            _this.configureAndSendRequest(url, {
                actions: {
                    actionsOnSuccess: [resolve],
                    actionsOnFail: [reject]
                },
                options: options
            });
        });
    };
    return HttpController;
}());
export default HttpController;
