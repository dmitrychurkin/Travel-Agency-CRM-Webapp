import { Component, ViewChild } from '@angular/core';
import { MdSidenav } from '@angular/material';
import { SelectedTabService } from './selected-tab.service';
import { IMenuSubTab, IMenuTab } from '../../../Interfaces';

@Component({
    selector: 'app-admin-customize',
    templateUrl: 'customize.component.html',
    styleUrls: ['customize.component.css'],
    viewProviders: []
})
export class CustomizeComponent {
    // selectedItem: IMenuSubTab;
    @ViewChild('sideNav') sideNav: MdSidenav;

    constructor(
        private selectedTabService: SelectedTabService
        ) {}
    isActiveStyle(childItem: IMenuSubTab) {
        const {currentlySelectedChild} = this.selectedTabService;
        return currentlySelectedChild &&
               currentlySelectedChild._name === childItem._name &&
               currentlySelectedChild.isActive;
    }
    onIntroCardClick(item: IMenuTab) {
        this.selectedTabService.currentlySelectedTab = item;
        const childrenArray = this.selectedTabService.currentlySelectedTab.children;
        if (childrenArray.length === 1) {
            childrenArray[0].isActive = true;
            this.selectedTabService.currentlySelectedChild = childrenArray[0];
        }
    }
    onListItemSelected(childItem: IMenuSubTab, listItem?: IMenuTab) {
        console.log(childItem.isActive, this.selectedTabService.currentlySelectedChild);
        if (childItem.isActive) {
            return;
        }
        if (listItem) {
            this.selectedTabService.currentlySelectedTab = listItem;
        }

        childItem.isActive = true;
        const {currentlySelectedChild} = this.selectedTabService;
        if (currentlySelectedChild && currentlySelectedChild.isActive) {
            this.selectedTabService.currentlySelectedChild.isActive = false;
        }
        this.selectedTabService.currentlySelectedChild = childItem;
    }

}
