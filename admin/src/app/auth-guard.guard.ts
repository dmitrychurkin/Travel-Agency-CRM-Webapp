import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Route } from '@angular/router';
import { Router, CanActivate, CanActivateChild, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BackendService } from './backend.service';
import { REGISTER_API } from './app.config';
import { AdminCredentialsDataResolver } from './admin-credentials-data.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private backendService: BackendService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this._sendRequest();
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
      return this._sendRequest();
  }
  canLoad(route: Route): Observable<boolean>|Promise<boolean>|boolean {
    if (route.path === 'registration' && AdminCredentialsDataResolver.adminData && 'r' in AdminCredentialsDataResolver.adminData) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
  private _sendRequest() {
    return this.backendService.sendRequest(REGISTER_API)
                                .then((data: Response) => {
                                  console.log('Everithing Ok', data);
                                  if (!AdminCredentialsDataResolver.adminData) {
                                    AdminCredentialsDataResolver.adminData = data.json();
                                  }
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
