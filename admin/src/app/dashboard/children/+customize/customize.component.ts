import { Component, Injector, Renderer2 } from '@angular/core';
import { IMenuSubTab, IMenuTab } from 'app/Interfaces';
import { BasicComponentClass } from './basic-component.class';
import { FroalaEditorService } from './froala-text-editor.service';

@Component({
    selector: 'app-admin-customize',
    templateUrl: 'customize.component.html',
    styleUrls: ['customize.component.css']
})
export class CustomizeComponent extends BasicComponentClass {

    constructor(injector: Injector, renderer2: Renderer2, froalaEditorService: FroalaEditorService) {
        super(injector);
        froalaEditorService.resolveLinks(renderer2);
    }
    isActiveStyle(childItem: IMenuSubTab) {
        const {currentlySelectedChild} = this._selectedTabService;
        return currentlySelectedChild &&
               currentlySelectedChild._name === childItem._name &&
               currentlySelectedChild.isActive;
    }
    onIntroCardClick(item: IMenuTab) {
        this._selectedTabService.currentlySelectedTab = item;
        const childrenArray = this._selectedTabService.currentlySelectedTab.children;
        if (childrenArray.length === 1) {
            childrenArray[0].isActive = true;
            this._selectedTabService.currentlySelectedChild = childrenArray[0];
        }
    }
    async onListItemSelected(childItem: IMenuSubTab, listItem?: IMenuTab) {
        if (childItem.isActive) {
            return;
        }
        if (!this._selectedTabService.isChangesSaved) {
            const result = await this._showModalOnUnsaved();
            if (!result) {
                return;
            }
            this._selectedTabService.isChangesSaved = true;
        }

        if (listItem) {
            this._selectedTabService.currentlySelectedTab = listItem;
        }

        childItem.isActive = true;
        const {currentlySelectedChild} = this._selectedTabService;
        if (currentlySelectedChild && currentlySelectedChild.isActive) {
            this._selectedTabService.currentlySelectedChild.isActive = false;
        }
        this._selectedTabService.currentlySelectedChild = childItem;
    }
    private _showModalOnUnsaved() {
        return new Promise(resolve => {
            this._customDialogMessage = 'All changes will be lost, continue?';
            this.openDialog(resolve);
        });
    }
}
