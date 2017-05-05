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
import { ErrorEmmiter, errorMessages } from '../error.service';
import { ProgressBarService } from '../progress-bar.service';
import { WebSocketService } from './web-socket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [AppearAnimation]
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked {
  @ViewChildren(RouterLinkActive) routLinkActive: any;
  private adminInfo: IAdminData;
  private sub: Subscription;

  // private componentState: 'inactive' | 'active' = 'inactive';
  // private dateStr = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ordersService: OrdersService,
    private backendService: BackendService,
    private errorEmmiter: ErrorEmmiter,
    private adminDataResolver: AdminCredentialsDataResolver,
    private progressBarEmmiter: ProgressBarService,
    private webSocketService: WebSocketService
    ) { }
  private signOut() {
    this.progressBarEmmiter.emmiter.emit(true);
    this.backendService.sendRequest(SIGN_OUT, {
      method: RequestMethod.Head
    })
    .then(() => this.router.navigate(['/login']))
    .catch(() => this.errorEmmiter.emmiter.emit(errorMessages.load))
    .then(() => {
      this.progressBarEmmiter.emmiter.emit(false);
      this.adminDataResolver.clearAdminData();
    });
  }
  onSendDelete() {
    this.webSocketService.emitDelete();
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
    this.sub = this.activatedRoute.data.map(data => {
      console.log('From ngOnInit DashBoard =>', data);
      this.adminInfo = <IAdminData>data.admin;
      this.webSocketService.connetTo(data.admin.id);
    }).subscribe();
    console.log('OrdersService.ordersRegistry = ', OrdersService.ordersRegistry);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
    this.webSocketService.disconnect();
    OrdersService.RemovableOrders.length =
    OrdersService.ordersRegistry.length =
    OrdersService.DATA.length = 0;
  }
  onActivate(e) {
    console.log('RouterOutlet onActivate', e);
  }
  onDeactivate(e) {
    console.log('RouterOutlet onDeactivate', e);
  }
}
