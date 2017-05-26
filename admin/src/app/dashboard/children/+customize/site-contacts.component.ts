import { Component, OnInit } from '@angular/core';
import { Response, RequestMethod } from '@angular/http';
import { MdDialog } from '@angular/material';
import { IModalData } from './modal-dialog.component';
import { BasicComponentClass } from './basic-component.class';
import { ErrorEmmiter, errorMessages } from 'app/error.service';
import { BackendService, JSON_API_HEADER_BASIC, JSON_API_HEADER_EXTENDED } from 'app/backend.service';
import { ProgressBarService } from 'app/progress-bar.service';

@Component({
    selector: 'app-site-contacts',
    templateUrl: 'site-contacts.component.html',
    styles: [`
        .btn-gap {
            margin-left:40px
        }
    `]
})
export class SiteContactsComponent extends BasicComponentClass implements OnInit {
    private _api = '/api/contacts';
    objectRecord: string;
    isEditing = false;
    isSkypeHas = false;
    modelEdit: Array<IContactType | undefined> = [];
    selectedIndex = 0;
    selectedTab: IContactGroup;
    contactsModel: Array<IContactGroup>;

    constructor(
        private _errorService: ErrorEmmiter,
        private _backendService: BackendService,
        private _progressBarService: ProgressBarService,
        _dialog: MdDialog) {
        super(_dialog);
    }
    ngOnInit() {
        this._backendService.sendRequest(this._api, { headers: JSON_API_HEADER_BASIC })
                            .then((response: Response) => {
                                const jsonResp = response.json();
                                this.contactsModel = jsonResp.data.attributes.contacts;
                                this.objectRecord = JSON.stringify(this.contactsModel);
                                this.selectedTab = this.contactsModel[0];
                            })
                            .catch(() => this._errorService.emmiter.emit(errorMessages.load));
    }

    deleteAction(values?: Array<IContactGroup | IContactType>, index?: number) {
        return (subject: string | IModalData, newTabName: string) => {
            if (typeof subject === 'string') {
                values.splice(index, 1);

                switch (subject) {
                    case 'group': {
                        this.selectedTab = (index === values.length - 1 || index === 0) ?
                                        <IContactGroup>values[ index ] :
                                        <IContactGroup>values[ index - 1 ];
                        this.modelEdit.length = 0;
                        this.isEditing = false;
                    }
                    break;
                    case 'contact': {
                        delete this.modelEdit[index];
                        this.isEditing = !this._isEditComplete<IContactType>(this.modelEdit);
                    }
                    this.isSkypeHas = false;
                }
            }else {
                if (this._isNewGropMatched(newTabName)) {
                    return this._errorService.emmiter.emit('Group with this name already exists!');
                }
                this.contactsModel.push({ group: newTabName, values: [] });
                if (!this.selectedTab) {
                    this.selectedTab = this.contactsModel[this.selectedIndex = 0];
                }
            }
        };
    }
    getValues(group: string, obj, index: number) {
        const model = this.modelEdit[index];
        if (model && model.$modelValue) {
            const splittedArray = model.$modelValue.split(',');
            this.isSkypeHas = splittedArray.length > 1;
            return this._modifyUnique(splittedArray, group, index);
        }else if (obj.values.toString()) {
            return this._modifyUnique(obj.values, group, index);
        }
        return this.notSpecifiedMessage;
    }

    onEdit(obj: IContactType, index: number) {
        this.modelEdit[index] = this._cloneObj(Object.assign({ $modelValue: obj.values.join(', ') }, obj));
        this.isEditing = true;
    }
    onOk(obj: IContactType, index: number) {
        const editedModel = this.modelEdit[index];
        if (!editedModel.type || !editedModel.$modelValue) {
            return;
        }
        editedModel.values = editedModel.$modelValue
                                        .split(',')
                                        .map(addr => addr.trim());
        for (const prop in obj) {
            if (prop in obj) {
                obj[prop] = this.modelEdit[index][prop];
            }
        }
        delete this.modelEdit[index];

        this.isEditing = !this._isEditComplete<IContactType>(this.modelEdit);
    }
    onTabChange(tabIndex: number) {
        this.modelEdit.length = 0;
        this.isSkypeHas = false;
        this.selectedTab = this.contactsModel[tabIndex];
    }
    onSaveChanges() {
        this._progressBarService.emmiter.emit(true);
        this._backendService.sendRequest(this._api, {
            method: RequestMethod.Patch,
            headers: JSON_API_HEADER_EXTENDED,
            body: this._backendService.serializeResource('contacts', '1', { contacts: this.contactsModel })
        })
        .then(() => this._errorService.emmiter.emit(`Contacts successfully updated.`))
        .catch(() => this._errorService.emmiter.emit(`Couldn't update contacts due network error.`))
        .then(() => this._progressBarService.emmiter.emit(false));
    }
    private _isNewGropMatched(newGroupName: string) {
        for (const { group } of this.contactsModel) {
            if (newGroupName.toLowerCase() === group.toLowerCase()) {
                return true;
            }
        }
        return false;
    }
    private _modifyUnique(arrayValues: Array<string>, group: string, valuesIndex: number) {
        return arrayValues.map((item, i, array) => {
                    if (group.toLowerCase() === 'skype' && valuesIndex === 0 && i === 0 && array.length > 1) {
                        this.isSkypeHas = true;
                        return `${item}*`;
                    }
                    return item;
                }).join(', ');
    }
}

interface IContactGroup {
    group: string;
    values: Array<IContactType>;
}
interface IContactType {
    type: string;
    values: Array<string>;
    $modelValue?: string;
}
