import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestMethod, Headers, Response } from '@angular/http';
import { MdSnackBar } from '@angular/material';
import { BackendService } from '../backend.service';
import { REGISTER_API, POST_HEADER } from '../app.config';
import { AdminCredentialsDataResolver } from '../admin-credentials-data.service';
import { IRegistrationCredentials, IRequestForRegistration } from '../Interfaces';


@Component({
    selector: 'app-admin-register',
    templateUrl: 'admin-registration.component.html',
    styleUrls: ['admin-registration.component.css']
})
export class AdminRegistrationComponent implements OnInit, AfterViewChecked {
    checked: boolean;
    isCanEdit = false;
    constructor(
        private backendService: BackendService,
        private router: Router,
        private snackBar: MdSnackBar
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
        // For debag only
        // const info: RequestForRegistration = {
        //     r: true,
        //     canEdit: null
        // };
        this.isCanEdit = (<IRequestForRegistration>AdminCredentialsDataResolver.adminData).canEdit;
        AdminCredentialsDataResolver.adminData = null;
    }
    onSubmit(form: NgForm) {
        if (form.invalid) {
            form.resetForm();
            return;
        }
        const newAdmin: IRegistrationCredentials = form.value;
        if (this.isCanEdit) {
            newAdmin.role = newAdmin.role || 'E';
        }else {
            newAdmin.role = 'O';
        }
        delete newAdmin.repeatPass;
        this.backendService.sendRequest(REGISTER_API, {
            method: RequestMethod.Post,
            body: JSON.stringify(newAdmin),
            headers: POST_HEADER
        })
        .then((res: Response) => {
            console.log(res);
            if (res.ok) {
                return this.router.navigate(['dashboard']);
            }
            throw new Error('(:0_^_0:)');
        })
        .catch(err => {
            this.snackBar.open('Error occured, try again later', 'Ok', {
                duration: 3000
            });
        });
    }
}
