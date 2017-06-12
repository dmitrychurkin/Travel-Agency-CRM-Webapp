import { Component, OnInit, Injector } from '@angular/core';
import { MdButton } from '@angular/material';
import { IModalData } from './modal-dialog.component';
import { BasicComponentClass } from './basic-component.class';

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

    isSkypeHas = false;
    modelEdit: Array<IContactType | undefined> = [];

    selectedTab: IContactGroup;
    contactsModel: Array<IContactGroup>;

    constructor(injector: Injector) {
        super(injector);
    }
    ngOnInit() {
        this._getResource(this._onGetResourse, this._api);
    }

    deleteAction(values?: Array<IContactGroup | IContactType>, index?: number) {
        return (newTabName: string, subject: string | IModalData) => {
            if (typeof subject === 'string') {
                values.splice(index, 1);

                switch (subject) {
                    case 'group': {
                        this.selectedTab = (index === values.length - 1 || index === 0) ?
                                        <IContactGroup>values[ index ] :
                                        <IContactGroup>values[ index - 1 ];
                        this.modelEdit.length = 0;
                        this._isEditing = false;
                    }
                    break;
                    case 'contact': {
                        delete this.modelEdit[index];
                        this._isEditing = !this._isEditComplete<IContactType>(this.modelEdit);
                    }
                    this.isSkypeHas = false;
                }
            }else {
                if (this._isNewGropMatched(newTabName)) {
                   return this._showErrMess('Group with this name already exists!');
                }
                this.contactsModel.push({ group: newTabName, values: [] });
                if (!this.selectedTab) {
                    this.selectedTab = this.contactsModel[this.tabIndex = 0];
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
        this._isEditing = true;
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

        this._isEditing = !this._isEditComplete<IContactType>(this.modelEdit);
    }
    onTabChange(tabIndex: number) {
        this.modelEdit.length = 0;
        this.isSkypeHas = false;
        this.selectedTab = this.contactsModel[tabIndex];
    }
    onSave(btnSaveRef: MdButton) {
        super._onSaveChanges<Array<IContactGroup>>(this._api, this.contactsModel)
        (btnSaveRef, { id: '1', type: 'contacts', attr: { contacts: this.contactsModel } });

    }
    private _onGetResourse(jsRes) {
        this._setModelRecord(this.contactsModel = jsRes.data.attributes.contacts);
        this.selectedTab = this.contactsModel[0];
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
