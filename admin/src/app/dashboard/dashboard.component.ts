import {Component, AfterViewChecked, OnInit, OnDestroy, ViewChildren, AfterViewInit} from '@angular/core';
import { Router, ActivatedRoute, RouterLinkActive} from '@angular/router';
import { RequestMethod } from '@angular/http';
import { MdSnackBar } from '@angular/material';
import { BackendService } from '../backend.service';
import { SIGN_OUT } from '../app.config';
import { OrdersService } from './orders.service';
import { AppearAnimation } from './animation';
import { AdminCredentialsDataResolver } from '../admin-credentials-data.service';
import { IAdminData } from '../Interfaces';
import 'rxjs/add/operator/map';
import {Subscription} from 'rxjs/Subscription';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [AppearAnimation]
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked {
  @ViewChildren(RouterLinkActive) routLinkActive: any;
  private adminName: string;
  private sub: Subscription;
  // private componentState: 'inactive' | 'active' = 'inactive';
  // private dateStr = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ordersService: OrdersService,
    private backendService: BackendService,
    private mdSnackBar: MdSnackBar,
    private adminDataResolver: AdminCredentialsDataResolver
    ) { }
  private signOut() {
    this.backendService.sendRequest(SIGN_OUT, {
      method: RequestMethod.Head
    })
    .then(() => this.router.navigate(['/login']))
    .catch(() => this.mdSnackBar.open('Error occured, try later', 'Ok', { duration: 3000 }))
    .then(() => this.adminDataResolver.clearAdminData());
  }
  ngAfterViewChecked() {
    if (this.ordersService.cancelAll) {
      this.ordersService.onCancelAll();
    }
  }
  ngAfterViewInit() {
    // console.log('ngOnViewChange ', this.routLinkActive);
    // this.componentState = 'active';
  }
  ngOnInit() {
    console.log('DashBoard! AdminCredentialsDataResolver.adminData = ', AdminCredentialsDataResolver.adminData);
    // delete AdminCredentialsDataResolver.adminData;
    this.sub = this.activatedRoute.data.map(data => {
      console.log('From ngOnInit DashBoard =>', data);
      this.adminName = data.admin;
    }).subscribe();
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
