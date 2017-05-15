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
    if (options) {
      if (options.headers instanceof Headers) {
        options.headers.set('X-Requested-With', 'XMLHttpRequest');
      }else {
        options.headers = new Headers({'X-Requested-With': 'XMLHttpRequest'});
      }
      options = Object.assign({}, BackendService.defaultReqOpts, options);
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
  serializeResource(type: string, id: string, attributes: { [key: string]: any }, meta= {}) {
      return JSON.stringify({
          data: { type, id, attributes},
          meta
      });
  }
}
