import { Injector } from '@angular/core';
import { MdDialog, MdButton } from '@angular/material';
import { Response, RequestMethod, RequestOptionsArgs } from '@angular/http';
import { IModalData, ModalDialogComponent } from './modal-dialog.component';
import { SelectedTabService } from './selected-tab.service';
import { ErrorEmmiter, errorMessages } from 'app/error.service';
import { ProgressBarService } from 'app/progress-bar.service';
import { BackendService, JSON_API_HEADER_BASIC, JSON_API_HEADER_EXTENDED } from 'app/backend.service';


export class BasicComponentClass {
    modalData: IModalData = { message: 'Please specify group name', placeholder: 'Group name' };
    notSpecifiedMessage = '[Not Specified]';
    protected _customDialogMessage: string;
    protected _isRequestSent = false;
    protected _isEditing = false;
    private _objectRecord: string;

    private _dialog: MdDialog;
    protected _selectedTabService: SelectedTabService;
    protected _progressBarService: ProgressBarService;
    private _errorService: ErrorEmmiter;
    private _backendService: BackendService;

    constructor(injector: Injector) {
        this._dialog = injector.get(MdDialog);
        this._selectedTabService = injector.get(SelectedTabService);
        this._errorService = injector.get(ErrorEmmiter);
        this._backendService = injector.get(BackendService);
        this._progressBarService = injector.get(ProgressBarService);
    }
    protected _getResource(actionOnSuccess: (responseModel: any) => void, url: string, reqOptions: RequestOptionsArgs = {}) {
        const ReqArgs: RequestOptionsArgs = Object.assign({ headers: JSON_API_HEADER_BASIC }, reqOptions);
        return this._backendService.sendRequest(url, ReqArgs)
                    .then((response: Response) => {
                        const jsonResp = response.json();
                        actionOnSuccess.call(this, jsonResp);
                    })
                    .catch(() => this._showErrMess());
    }

    protected _setBtn(btnRef: MdButton, value: boolean) {
        btnRef.disabled = this._isRequestSent = value;
    }
    protected _requestBlockers(btnRef: MdButton, value= true) {
        this._setBtn(btnRef, value);
        this._progressBarService.emmiter.emit(value);
    }
    protected _onUpdateSuccess(ModelObject: any, message?: string) {
        this._showSucMess(message);
        this._selectedTabService.isChangesSaved = true;
        this._setModelRecord(ModelObject);
    }
    protected _showSucMess(message= 'Changes saved') {
        this._errorService.emmiter.emit(message);
    }
    protected _showErrMess(flagOrMessage: 1 | 0 | string = 1) {
        let errorMessage: string;
        if (typeof flagOrMessage === 'string') {
            errorMessage = flagOrMessage;
        }else if (typeof flagOrMessage === 'number') {
            errorMessage = flagOrMessage ? errorMessages.load : 'Oops, error occured!';
        }
        this._errorService.emmiter.emit(errorMessage);
    }
    protected _setModelRecord(modelTarget: any) {
        this._objectRecord = JSON.stringify(modelTarget);
    }
    protected _getModalMessage(subject: string) {
        return `Are you sure to delete ${subject}?`;
    }

    protected _isEditComplete<T>(modelIterableObject: Array<T>) {
        for (const item of modelIterableObject) {
            if (item) {
                return false;
            }
        }
        return true;
    }
    protected _cloneObj(obj: any) {
        const objStr = JSON.stringify(obj);
        return JSON.parse(objStr);
    }
    protected _patchRequest(url, { id, type, attr, meta= {} }, reqOptArgs: RequestOptionsArgs= {}) {
        reqOptArgs = Object.assign({
            method: RequestMethod.Patch,
            headers: JSON_API_HEADER_EXTENDED,
            body: (id && type && attr) ? this._backendService.serializeResource(type, id , attr, meta) : null
        }, reqOptArgs);
        return this._backendService.sendRequest(url, reqOptArgs);
    }
    protected _onSaveChanges<T>(url: string, ModelObject: T, method= RequestMethod.Patch, headers= JSON_API_HEADER_EXTENDED) {
        return (btnSaveRef: MdButton, { id, type, attr }) => {
            if (this._isRequestSent) {
                return;
            }
            this._requestBlockers(btnSaveRef);
            return this._patchRequest(url, { id, type, attr }, { method, headers })
                .then(() => this._onUpdateSuccess(ModelObject))
                .catch(() => this._showErrMess(0))
                .then(() => this._requestBlockers(btnSaveRef, false));
        };
    }
    isNeedSaveChanges(current: { [key: string]: any }) {
        const isDiff = this._objectRecord !== JSON.stringify(current);
        if (isDiff) {
            this._selectedTabService.isChangesSaved = false;
        }
        return isDiff;
    }
    // subject: 'contact' | 'group' | 'slide' | 'tour'
    openDialog(action: (result: boolean | string, subject: string | IModalData) => void, subject?: string | IModalData) {
        const data = typeof subject === 'object' ? this.modalData : this._customDialogMessage || this._getModalMessage(subject);
        const dialogRef = this._dialog.open(ModalDialogComponent, { data });
        const sub = dialogRef
                    .afterClosed()
                    .subscribe((result: boolean | string) => {
                        if (result) {
                            action(result, subject);
                            sub.unsubscribe();
                        }
                    });
    }
}
