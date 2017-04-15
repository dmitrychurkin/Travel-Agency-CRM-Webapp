declare const io: any;
import { Component, OnInit } from '@angular/core';
// import { slideInAnimation } from '../animation';
import { OrdersService } from '../orders.service';

@Component({
    selector: 'app-user-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
    // animations: [slideInAnimation]
})
export class OrdersComponent implements OnInit {
    // @HostBinding('@routeAnimation') routeAnimation = true;
    private orders: any[];
    constructor(private ordersService: OrdersService) {}
    ngOnInit() {
        const socket = io();
        socket.on('test', data => console.log('SOCKET_IO channel test', data));
        setTimeout(() => {
            this.orders = [
                {id: 1, first_name: 'Dmitry', last_name: 'Churkin', phone_number: '12345'},
                {id: 2, first_name: 'Person1', last_name: 'Churkin', phone_number: '12345'},
                {id: 3, first_name: 'Person2', last_name: 'Churkin', phone_number: '12345'},
                {id: 4, first_name: 'Person3', last_name: 'Churkin', phone_number: '12345'},
                {id: 5, first_name: 'Person4', last_name: 'Churkin', phone_number: '12345'},
                {id: 6, first_name: 'Person5', last_name: 'Churkin', phone_number: '12345'},
            ];
        }, 3000);
    }
    private onCheckboxChange(e) {
        console.log('onCheckboxChange = ', e);
        if (e.checked) {
            ++this.ordersService.counterOfChecks;
        }else {
            --this.ordersService.counterOfChecks;
        }
    }
}
