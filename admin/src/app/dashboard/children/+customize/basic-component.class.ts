import { Injector, ChangeDetectorRef } from '@angular/core';
import { MdDialog, MdButton } from '@angular/material';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Response, RequestMethod, RequestOptionsArgs } from '@angular/http';
import { IModalData, ModalDialogComponent } from './modal-dialog.component';
import { SelectedTabService } from './selected-tab.service';
import { ErrorEmmiter, errorMessages } from 'app/error.service';
import { ProgressBarService } from 'app/progress-bar.service';
import { BackendService, JSON_API_HEADER_BASIC, JSON_API_HEADER_EXTENDED } from 'app/backend.service';
import { IPublicImgs, ModelBasic, ModelImageService, IModelService, IEditedChip, ModelChip } from './basic-model-types.class';

// export interface ISomeObj {
//     [key: string]: any;
// }
// interface IImagesProps {
//     type: 'image';
//     id: string;
//     links: {
//         self: string;
//     };
// }
// interface IPublicImgs {
//     isRequestSent: boolean;
//     forChip: boolean;
//     data?: Array<IImagesProps>;
// }

export const filesUrl = '/api/files';
export class BasicComponentClass {
    componentModel: any;
    tabIndex = 0;
    modalData: IModalData = { message: 'Please specify group name', placeholder: 'Group name' };
    notSpecifiedMessage = '[Not Specified]';
    protected _componentModelsArray: Array<Array<IModelService | IEditedChip> | IModelService | IEditedChip | undefined> = [];
    protected _customDialogMessage: string;
    protected _isRequestSent = false;
    _isEditing = false;
    private _objectRecord: string;

    publicImages: IPublicImgs = { isRequestSent: false, forChip: false };

    private _dialog: MdDialog;
    _selectedTabService: SelectedTabService;
    protected _progressBarService: ProgressBarService;
    protected _sanitizer: DomSanitizer;
    private _errorService: ErrorEmmiter;
    private _backendService: BackendService;
    private _changeDetectorRef: ChangeDetectorRef;

    constructor(injector: Injector) {
        this._dialog = injector.get(MdDialog);
        this._selectedTabService = injector.get(SelectedTabService);
        this._errorService = injector.get(ErrorEmmiter);
        this._backendService = injector.get(BackendService);
        this._progressBarService = injector.get(ProgressBarService);
        this._changeDetectorRef = injector.get(ChangeDetectorRef);
        this._sanitizer = injector.get(DomSanitizer);
    }
    protected _sanitize(content: string): SafeHtml {
        return this._sanitizer.bypassSecurityTrustHtml(content);
    }
    protected _setArrayOfComponentModels(...args: Array<IModelService | IEditedChip | Array<IModelService | IEditedChip>>) {
        this._componentModelsArray.push(...args);
    }
    protected _clearModel(modelItem: IModelService | IEditedChip) {
        if (modelItem instanceof ModelBasic) {
            for (const prop in modelItem) {
                if (typeof modelItem[prop] === 'boolean') {
                    modelItem[prop] = false;
                }else if (prop === 'sanitizedContent') {
                        /*typeof model[prop] === 'object' && !(model[prop] instanceof HTMLImageElement)*/
                    continue;
                }else {
                    delete modelItem[prop];
                }
            }
        }else if (modelItem instanceof ModelChip) {
            for (const prop in modelItem) {
                if (prop in modelItem) {
                    delete modelItem[prop];
                }
            }
        }
    }
    protected _clearAllModels(model: any) {
        const modelArray = Array.isArray(model) ? model : [model];
        for (const modelItem of modelArray) {
            if (Array.isArray(modelItem)) {
                this._clearAllModels(modelItem);
            }else {
                this._clearModel(modelItem);
            }

        }
    }
    protected _resetAllModels() {
        if (Array.isArray(this._componentModelsArray) && this._componentModelsArray.length > 0) {
            this._clearAllModels(this._componentModelsArray);
        }else {
            const OwnPropertyNamesArr = Object.getOwnPropertyNames(this);
            for (const item of OwnPropertyNamesArr) {
                const objProp: any = this[item];
                this._clearAllModels(objProp);
            }
        }
        this._isEditing = false;
    }
    protected _isArrayOfModelEditing(model?: Array</*IModelService | IEditedChip | Array<IModelService | IEditedChip>*/ any>) {

        for ( const itemModel of model || this._componentModelsArray ) {
            if (Array.isArray(itemModel)) {
                const recursionResult = this._isArrayOfModelEditing(itemModel);
                if (recursionResult) {
                    return true;
                }
            }else {
                if (itemModel instanceof ModelBasic) {
                    if (itemModel.isEditing === true) {
                        return true;
                    }
                }else if (itemModel instanceof ModelChip) {
                    if (itemModel) {
                        return true;
                    }
                }
            }
        }
        return false;

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
    protected _setArrayOfModels<T>(typeOfModel: typeof ModelBasic | typeof ModelImageService, length: number): Array<T> {
        return Array(length).fill(new typeOfModel);
    }
    protected _getPublicImages(forChip= false) {
        if (!this.publicImages.data) {
            if (forChip) {
                this.publicImages.forChip = true;
            }
            this.publicImages.isRequestSent = true;
            this._getResource(res => this.publicImages.data = res.data, filesUrl, { params: 'fields[locationFlag]=P&fields[type]=0' })
                .then(() => this.publicImages.isRequestSent = false);
        }
    }

    getNaturalSize(imgRef: HTMLImageElement, property: string) {
        if (!imgRef[property] && !imgRef.onload) {
            imgRef.onload = () => this._changeDetectorRef.detectChanges();
        }else if (imgRef[property] && imgRef.onload) {
            imgRef.onload = null;
        }
        return imgRef[property];
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
