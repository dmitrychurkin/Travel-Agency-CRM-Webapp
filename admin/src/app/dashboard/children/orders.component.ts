import { Component, HostBinding } from '@angular/core';
import { slideInAnimation } from '../animation';
import { OrdersService } from '../orders.service';

@Component({
    selector: 'app-user-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css'],
    animations: [slideInAnimation]
})
export class OrdersComponent {
    @HostBinding('@routeAnimation') routeAnimation = true;
    private orders = [
        {name: 'Dmitry', country: 'Russia'},
        {name: 'Name 1', country: 'Country 1'},
        {name: 'Name 2', country: 'Country 2'},
        {name: 'Name 3', country: 'Country 3'},
        {name: 'Name 4', country: 'Country 4'},
        {name: 'Name 5', country: 'Country 5'}
    ];
    constructor(private ordersService: OrdersService) {}
    private onCheckboxChange(e) {
        if (e.checked) {
            ++this.ordersService.counterOfChecks;
        }else {
            --this.ordersService.counterOfChecks;
        }
    }
}
