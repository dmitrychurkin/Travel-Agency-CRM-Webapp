import { Injectable } from '@angular/core';

@Injectable()
export class OrdersService {
    counterOfChecks = 0;
    cancelAll = false;
    onCancelAll() {
        setTimeout(() => this.counterOfChecks = +(this.cancelAll = false));
    }
}
