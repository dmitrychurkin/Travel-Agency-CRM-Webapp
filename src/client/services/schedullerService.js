var Scheduller = (function () {
    function Scheduller(Http) {
        this.Http = Http;
        this.Timeout = 5000;
    }
    Scheduller.prototype._onOnLine = function (token, httpOpts) {
        var _this = this;
        this.OnLine = function () {
            _this.watch(token, httpOpts);
            window.ononline = function () { return ""; };
        };
        return this.OnLine;
    };
    Scheduller.prototype._send = function (token, httpOpts, item) {
        var _this = this;
        this.Http.sendReq(httpOpts)
            .then(function () {
            _this.col = _this.col.filter(function (el) { return el === item ? false : true; });
            localStorage.setItem(token, _this.col.join(", "));
            _this._clearAll(token);
        });
    };
    Scheduller.prototype._clearAll = function (token) {
        if (!localStorage.getItem(token) && typeof this.Timer === "number") {
            localStorage.removeItem(token);
            clearInterval(this.Timer);
            window.ononline = function () { return ""; };
            this.col = this.OnLine = this.Timer = null;
        }
    };
    Scheduller.prototype.watch = function (token, httpOpts) {
        var _this = this;
        this.Timer = setInterval(function () {
            if (navigator.onLine) {
                var items = localStorage.getItem(token);
                if (items) {
                    _this.col = items.split(", ");
                    _this.col.forEach(function (item) {
                        var b = httpOpts.options.body, body = typeof b === "string" ? JSON.parse(b) : b;
                        body.reqId = item;
                        httpOpts.options.body = body;
                        _this._send(token, httpOpts, item);
                    });
                }
                else {
                    _this._clearAll(token);
                }
            }
            else {
                clearInterval(_this.Timer);
                _this.Timer = null;
                window.ononline = _this._onOnLine(token, httpOpts);
            }
        }, this.Timeout);
    };
    return Scheduller;
}());
export default Scheduller;
