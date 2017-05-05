import {Component, Inject} from '@angular/core';
import {RequestMethod, Headers, RequestOptionsArgs, Response} from '@angular/http';
import {Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import { BackendService } from '../backend.service';
// import { AdminCredentialsStorageService } from '../admin-credentials-storage.service';
import { REGISTER_API, POST_HEADER } from '../app.config';
import { IRequestForRegistration, IAdminSignInCredentials, IAdminData } from '../Interfaces';
import { AdminCredentialsDataResolver } from '../admin-credentials-data.service';
import { ProgressBarService } from '../progress-bar.service';
import { ErrorEmmiter } from '../error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formReset = true;
  fbMess = 'Incorrect input';
  private _isSend = false;
  constructor(
    private router: Router,
    private backendService: BackendService,
    private adminDataResolver: AdminCredentialsDataResolver,
    private progressBarService: ProgressBarService,
    private errorEmmiterService: ErrorEmmiter
  ) { }
  onSubmit(form: NgForm) {
    if (form.invalid) {
      form.resetForm();
      return;
    }
    if (this._isSend) {
      return;
    }
    this.progressBarService.emmiter.emit(this._isSend = true);
      const adminSignInCred: IAdminSignInCredentials = form.value;
      const ReqArgs: RequestOptionsArgs = {
        method: RequestMethod.Post,
        headers: POST_HEADER,
        body: JSON.stringify(adminSignInCred)
      };
      return this.backendService.sendRequest(REGISTER_API, ReqArgs)
                            .then((data: Response) => {
                              console.log('From login component ', data);
                              const adminRequest: IRequestForRegistration | IAdminData = data.json();
                              this.adminDataResolver.setAdminData(adminRequest);
                              if ((<IRequestForRegistration>adminRequest).r) {
                                return this.router.navigate(['registration'], { skipLocationChange: true, replaceUrl: false });
                              }
                              return this.router.navigate(['dashboard']);
                            })
                            .catch((err: Response) => {
                              if (err.status === 403) {
                                return this.errorEmmiterService.emmiter.emit(err.text());
                              }
                            })
                            .then(() => {
                                this.progressBarService.emmiter.emit(this._isSend = this.formReset = false);
                                setTimeout(() => this.formReset = true);
                            });


  }
  onBlur(ngInputRef, refOfInput) {
    if (ngInputRef.touched && ngInputRef.invalid) {
      refOfInput.focus();
    }
  }
}
