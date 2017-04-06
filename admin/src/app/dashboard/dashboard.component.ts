import {Component, AfterViewChecked, OnInit, OnDestroy, ViewChild, AfterViewInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { OrdersService } from './orders.service';
import 'rxjs/add/operator/map';
import {Subscription} from 'rxjs/Subscription';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked {
  @ViewChild('mdButt') mdButton: any;
  private adminName = 'Dmitry';
  // private sub: Subscription;
  /*private navLinks = [
    {
      link: './orders',
      label: 'Overview'
    },
    {
      link: './features',
      label: 'Features'
    },
    {
      link: './details',
      label: 'Details'
    },
    {
      link: './technology',
      label: 'Technology'
    },
    {
      link: './faq',
      label: 'FAQ'
    }
  ];*/
  constructor(private router: ActivatedRoute, private ordersService: OrdersService) { }
  ngAfterViewChecked() {
    if (this.ordersService.cancelAll) {
      this.ordersService.onCancelAll();
    }
  }
  ngAfterViewInit() {
    // console.log('ngOnViewChange ', this.mdButton);
  }
  ngOnInit() {
    console.log('DashBoard!');
    /*this.sub = this.router.data.map(data => {
      console.log(data);
      // this.whoIs = data.admin.name;
    }).subscribe();*/
  }
  ngOnDestroy() {
    // this.sub.unsubscribe();
  }
}
