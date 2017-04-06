import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, RequestMethod, Headers } from '@angular/http';


@Injectable()
export class BackendService {
  private static get defaultReqOpts(): RequestOptionsArgs {
    return {
      method: RequestMethod.Get,
      withCredentials: true
    };
  }
  constructor(private httpService: Http) {}
  sendRequest(url: string, options?: RequestOptionsArgs) {
    if (options && options.headers instanceof Headers) {
      options = Object.assign({}, BackendService.defaultReqOpts, options);
      options.headers.set('X-Requested-With', 'XMLHttpRequest');
    }else {
      options = BackendService.defaultReqOpts;
      options.headers = new Headers({'X-Requested-With': 'XMLHttpRequest'});
    }
    return new Promise((res, rej) => {
      const subsription = this.httpService.request(url, options).subscribe(
        data => (console.log('Subscripton successed'), res(data), subsription.unsubscribe()),
        err => (console.log('Subscripton failed'), rej(err), subsription.unsubscribe())
      );
    });
  }
}
