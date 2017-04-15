import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MdSidenav } from '@angular/material';

@Component({
    selector: 'app-admin-customize',
    templateUrl: 'customize.component.html',
    styleUrls: ['customize.component.css']
})
export class CustomizeComponent implements AfterViewInit {
    @ViewChild('sideNav') sideNav: MdSidenav;

    ngAfterViewInit() {
        // this.sideNav.open();
    }

}
