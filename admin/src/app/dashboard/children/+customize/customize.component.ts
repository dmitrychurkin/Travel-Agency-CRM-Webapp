import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MdSidenav } from '@angular/material';


import { SelectedTabService } from './selected-tab.service';

@Component({
    selector: 'app-admin-customize',
    templateUrl: 'customize.component.html',
    styleUrls: ['customize.component.css'],
    viewProviders: []
})
export class CustomizeComponent implements OnInit, AfterViewInit {
    @ViewChild('sideNav') sideNav: MdSidenav;

    constructor(
        private selectedTabService: SelectedTabService
        ) {}
    ngAfterViewInit() {
        // this.sideNav.open();

    }
    ngOnInit() {

    }

    onIntroCardClick(item) {
        this.selectedTabService.currentlySelectedTab = item;
    }

}
