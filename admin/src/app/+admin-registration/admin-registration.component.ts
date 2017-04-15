import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestMethod, Headers, Response } from '@angular/http';
import { MdSnackBar } from '@angular/material';
import { BackendService } from '../backend.service';
import { POST_HEADER } from '../app.config';
import { AdminCredentialsDataResolver } from '../admin-credentials-data.service';
import { IRegistrationCredentials, IRequestForRegistration, IAdminData } from '../Interfaces';


@Component({
    selector: 'app-admin-register',
    templateUrl: 'admin-registration.component.html',
    styleUrls: ['admin-registration.component.css']
})
export class AdminRegistrationComponent implements OnInit, AfterViewChecked {
    checked: boolean;
    isCanEdit = false;
    endPoint = '/api/register-new/';
    isSend = false;
    constructor(
        private backendService: BackendService,
        private router: Router,
        private snackBar: MdSnackBar,
        private adminDataResolver: AdminCredentialsDataResolver
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
        if (this.isSend) {
            return;
        }
        this.isSend = true;
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
        .catch(err => {
            console.log(err);
            let errMessage = '';
            const serverInfo: {exists: boolean} | {expired: boolean} = err && err.json && err.json();
            if (serverInfo && (<any>serverInfo).exists) {
                errMessage = 'This name has already taken!';
            }
            if (serverInfo && (<any>serverInfo).expired) {
                return this.router.navigate(['login'], { skipLocationChange: true, replaceUrl: false });
            }
            this.snackBar.open(errMessage || 'Error occured, try again later', 'Ok', {
                duration: 3000
            });
        })
        .then(() => this && this.isSend && (this.isSend = false)); ;
    }
}
