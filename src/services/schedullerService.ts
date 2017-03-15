import HttpController, { ICommonOptionsToPass }  from "../plugins/http.module";

type HttpOptions = { url: string | string[], options: ICommonOptionsToPass };
export default class Scheduller {
    private Timer: number | null;
    private col: null | Array<string>;
    private OnLine: null | (() => void);
    private Timeout: number = 5000;
    constructor(private Http: HttpController) {}
    private _onOnLine(token: string, httpOpts: HttpOptions) {
        this.OnLine = () => {
            this.watch(token, httpOpts);
            window.ononline = () => "";
        };
        return this.OnLine;
    }
    private _send(token: string, httpOpts: HttpOptions, item: string) {
        this.Http.sendReq(httpOpts)
            .then(() => {
                this.col = this.col!.filter(el => el === item ? false : true);
                localStorage.setItem(token, this.col.join(", "));
                this._clearAll(token);
            });
    }
    private _clearAll(token: string) {
        if (!localStorage.getItem(token) && typeof this.Timer === "number") {
            localStorage.removeItem(token);
            clearInterval(this.Timer);
            window.ononline = () => "";
            this.col = this.OnLine = this.Timer = null;
        }
    }
    watch(token: string, httpOpts: HttpOptions) {
        this.Timer = setInterval(() => {
            if (navigator.onLine) {
                let items = localStorage.getItem(token);
                if (items) {
                    this.col = items.split(", ");
                    this.col.forEach(item => {
                        let b = httpOpts.options.body,
                            body = typeof b === "string" ? JSON.parse(b) : b;
                        body.reqId = item;
                        httpOpts.options.body = body;
                        this._send(token, httpOpts, item);
                    });
                }else {
                    this._clearAll(token);
                }
            }else {
                clearInterval(this.Timer!);
                this.Timer = null;
                window.ononline = this._onOnLine(token, httpOpts);
            }
        }, this.Timeout);

    }
}