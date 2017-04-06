import {Component, Inject} from '@angular/core';
import {RequestMethod, Headers, RequestOptionsArgs, Response} from '@angular/http';
import {Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import { BackendService } from '../backend.service';
import { REGISTER_API, POST_HEADER } from '../app.config';
import { IRequestForRegistration, IAdminSignInCredentials } from '../Interfaces';
import { AdminCredentialsDataResolver } from '../admin-credentials-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  fbMess = 'Incorrect input';
  constructor(
    private router: Router,
    private backendService: BackendService,
  ) { }
  onSubmit(form: NgForm) {
    if (form.invalid) {
      form.resetForm();
      return;
    }
      const adminSignInCred: IAdminSignInCredentials = form.value;
      const ReqArgs: RequestOptionsArgs = {
        method: RequestMethod.Post,
        headers: POST_HEADER,
        body: JSON.stringify(adminSignInCred)
      };
      return this.backendService.sendRequest(REGISTER_API, ReqArgs)
                            .then((data: Response) => {
                              console.log('From login component ', data);
                              const adminRequest: IRequestForRegistration = data.json();
                              if (adminRequest.r) {
                                AdminCredentialsDataResolver.adminData = adminRequest;
                                this.router.navigate(['registration'],
                                { skipLocationChange: true, replaceUrl: false });
                              }else {
                                // this.router.navigate(['dashboard']);
                                form.resetForm();
                              }

                            })
                            .catch((err: any) => {
                              console.log(err);
                              form.resetForm();
                            });

  }
  onBlur(ngInputRef, refOfInput) {
    if (ngInputRef.touched && ngInputRef.invalid) {
      refOfInput.focus();
    }
  }
}
