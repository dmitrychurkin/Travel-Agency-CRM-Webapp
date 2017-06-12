import { Component, OnInit } from '@angular/core';
import { MdCheckboxChange } from '@angular/material';
// import { slideInAnimation } from '../animation';
import { OrdersService } from '../orders.service';
import { WebSocketService } from '../web-socket.service';
import { IOrdersData, IPortUserOrder } from '../../Interfaces';

@Component({
    selector: 'app-user-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
    // animations: [slideInAnimation]
})
export class OrdersComponent implements OnInit {
    // @HostBinding('@routeAnimation') routeAnimation = true;

    private MainOrders: Array<IOrdersData>;
    constructor(
        private ordersService: OrdersService,
        public webSocketService: WebSocketService
        ) {}
    calcIndex(item: IPortUserOrder) {
        return OrdersService.ordersRegistry.indexOf(item.orderId) + 1;
    }
    ngOnInit() {
        console.log('OrdersComponent Init!');
        this.MainOrders = OrdersService.DATA;
    }

    private onCheckboxChange(e: MdCheckboxChange) {
        const{ RemovableOrders } = OrdersService;
        const id = e.source.id;
        if (e.checked) {
            this.ordersService.checkOnToDeleteAdmin(id);
        }else {
            this.ordersService.unCheckOnToDeleteAdmin(id);
        }
    }
}
