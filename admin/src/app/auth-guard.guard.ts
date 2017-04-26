import { Injectable } from '@angular/core';
import { Response, RequestMethod } from '@angular/http';
import { Route } from '@angular/router';
import { Router, CanActivate, CanActivateChild, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BackendService } from './backend.service';
import { VALIDATE } from './app.config';
import { AdminCredentialsDataResolver } from './admin-credentials-data.service';
// import { IAdminData, IRequestForRegistration } from './Interfaces';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private backendService: BackendService,
    private router: Router,
    private adminDataResolver: AdminCredentialsDataResolver
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this._sendRequest();
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
      if (state.url.includes('customize')) {
        const adminData: any = this.adminDataResolver.getAdminData();
        if (adminData && adminData.role === 'E') {
          console.log('From can activate child target CUSTOMIZE');
          return this._sendRequest();
        }
        return false;
      }
      return this._sendRequest();
  }
  canLoad(route: Route): Observable<boolean>|Promise<boolean>|boolean {
    const adminRegisterData: any = this.adminDataResolver.getAdminData();
    switch (route.path) {
      case 'registration': {
        if (adminRegisterData && adminRegisterData.r) {
          return true;
        }
        this.router.navigate(['login']);
        return false;
      }
      // tslint:disable-next-line:no-switch-case-fall-through
      case 'customize': {
        if (adminRegisterData && adminRegisterData.role === 'E') {
          console.log('From can load target CUSTOMIZE');
          return true;
        }
        this.router.navigate(['dashboard']);
        return false;
      }
    }
  }
  private _sendRequest() {
    return this.backendService.sendRequest(VALIDATE, { method: RequestMethod.Head })
                                .then((data: Response) => {
                                  console.log('Everithing Ok', data);
                                  /*if (AdminCredentialsDataResolver.adminData
                                      && !(<IAdminData>AdminCredentialsDataResolver.adminData).tokenId) {

                                    (<IAdminData>AdminCredentialsDataResolver.adminData).tokenId = data.json();
                                  }*/
                                  return true;
                                })
                                .catch((err: Response) => {
                                    console.log('Error occured', err);
                                    this.router.navigate(['/login']);
                                    return false;
                                   // return true;
                                });
  }
}
