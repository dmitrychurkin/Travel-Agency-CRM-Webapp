import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestMethod, Headers, Response } from '@angular/http';
import { ErrorEmmiter } from '../error.service';
import { BackendService } from '../backend.service';
import { POST_HEADER } from '../app.config';
import { AdminCredentialsDataResolver } from '../admin-credentials-data.service';
import { ProgressBarService } from '../progress-bar.service';
import { IRegistrationCredentials, IRequestForRegistration, IAdminData } from '../Interfaces';


@Component({
    selector: 'app-admin-register',
    templateUrl: 'admin-registration.component.html',
    styleUrls: ['admin-registration.component.css']
})
export class AdminRegistrationComponent implements OnInit, AfterViewChecked {
    checked: boolean;
    isCanEdit = false;
    fbMess = 'Incorrect input';
    endPoint = '/api/register-new/';
    _isSend = false;
    constructor(
        private backendService: BackendService,
        private router: Router,
        private errorEmmiter: ErrorEmmiter,
        private adminDataResolver: AdminCredentialsDataResolver,
        private progressBarService: ProgressBarService
    ) {}
    ngAfterViewChecked() {
        this.checked = true;
    }
    onBlur(ngInputRef, refOfInput) {
        if (ngInputRef.touched && ngInputRef.invalid) {
            refOfInput.focus();
        }
    }
    ngOnInit() {
        this.isCanEdit = (<IRequestForRegistration>this.adminDataResolver.getAdminData()).canEdit;
        this.adminDataResolver.clearAdminData();
    }
    onSubmit(form: NgForm) {
        if (form.invalid) {
            form.resetForm();
            return;
        }
        if (this._isSend) {
            return;
        }
        this._isSend = true;
        this.progressBarService.emmiter.emit(true);
        const newAdmin: IRegistrationCredentials = form.value;
        if (this.isCanEdit) {
            newAdmin.role = newAdmin.role || 'E';
        }else {
            newAdmin.role = 'O';
        }
        delete newAdmin.repeatPass;
        this.backendService.sendRequest(this.endPoint, {
            method: RequestMethod.Post,
            body: JSON.stringify(newAdmin),
            headers: POST_HEADER
        })
        .then((res: Response) => {
            console.log('AdminRegistrationComponent = ', res);
            if (res.ok) {
                const adminData: IAdminData = res.json();
                this.adminDataResolver.setAdminData(adminData);
                return this.router.navigate(['dashboard']);
            }
            throw new Error('(:0_^_0:)');
        })
        .catch((err: Response) => {
            let errMessage: string;
            let serverInfo: {exists: boolean} | {expired: boolean};
            const navigateFn = () => this.router.navigate(['login'], { skipLocationChange: true, replaceUrl: false });
            if (err.status === 403) {
                const textResponse = err.text();

                serverInfo = textResponse && JSON.parse(textResponse);
                if ( (<any>serverInfo).exists ) {
                    errMessage = 'This name has already taken!';
                }else {
                    return navigateFn();
                }
            }else {
                navigateFn();
            }
            this.errorEmmiter.emmiter.emit(errMessage || 'Error occured, try again later');
        })
        .then( () => this.progressBarService.emmiter.emit(this._isSend = false) );
    }
}
