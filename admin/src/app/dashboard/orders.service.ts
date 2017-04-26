import { Injectable } from '@angular/core';
import { IPortUserOrder, IOrdersData } from '../Interfaces';

@Injectable()
export class OrdersService {
    static DATA: Array<IOrdersData> = [];
    static RemovableOrders = [];
    static ordersRegistry: Array<string> = [];
    // not implemented yet
    static lastElementTimestamp: number;

    private _WeekDays = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
        ];
    private _Monthes = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
        ];
    counterOfChecks = 0;
    cancelAll = false;

    onCancelAll() {
        OrdersService.RemovableOrders.length = 0;
        setTimeout(() => this.counterOfChecks = +(this.cancelAll = false));
    }
    private _getToday(): string {
        const d = new Date();
        return [d.getFullYear(), d.getMonth(), d.getDate()].toString();
    }
    private _getYesterday(): string {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        return [yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate()].toString();
    }
    private _getSomeDay(dateMs: number): string {
        const someDay = new Date(dateMs);
        return [someDay.getFullYear(), someDay.getMonth(), someDay.getDate()].toString();
    }
    private _sortData(data: Array<IPortUserOrder>): Array<IPortUserOrder> {
        if (!Array.isArray(data)) {
            return [];
        }
        return data.sort((a: IPortUserOrder, b: IPortUserOrder) => b.timestamp - a.timestamp);
    }
    private compileDate(order, splitedOrderTimeArray) {
        return `${this._WeekDays[new Date((order && order.timestamp) || Date.now()).getDay()]}, 
                            ${this._Monthes[splitedOrderTimeArray[1]]} ${splitedOrderTimeArray[2]}, 
                            ${splitedOrderTimeArray[0]}`;
    }

    private _removeZeroFirstCard() {
        const{ DATA } = OrdersService;
        while (true) {
            const firstDay = DATA[0];
            if (firstDay && firstDay.orders.length === 0) {
                OrdersService.DATA.shift();
            }else {
                break;
            }
        }
    }
    private _removeItemFromOrderRegistry(id: string) {
        const{ ordersRegistry } = OrdersService;
        const position = ordersRegistry.indexOf(id);
        ordersRegistry.splice(position, 1);
    }
    private _checkUnique(ORDER: IPortUserOrder): boolean {
        return OrdersService.ordersRegistry.indexOf(ORDER.orderId) === -1 ? true : false;
    }
    private _addItemToDelete(id: string): void {
        OrdersService.RemovableOrders.push(id);
    }
    private _removeItemToDelete(id: string): void {
        const { RemovableOrders } = OrdersService;
        const position = RemovableOrders.lastIndexOf(id);
        RemovableOrders.splice(position, 1);
    }

    /** orders.component.html evaluates current title for cards */
    getCaption(order: IPortUserOrder | undefined, orderTimemark: string | undefined) {

        const splitedOrderTimeArray = orderTimemark.split(',');
        let MESSAGE = '';
        if ( orderTimemark === this._getToday() ) {
            MESSAGE = `Today - ${this.compileDate(order, splitedOrderTimeArray)}`;
        }else if ( orderTimemark === this._getYesterday() ) {
            MESSAGE = `Yesterday - ${this.compileDate(order, splitedOrderTimeArray)}`;
        }else {
            MESSAGE = this.compileDate(order, splitedOrderTimeArray);
        }
        return MESSAGE;
    }

    /** web-socket.service action OnCANCEL_ORDER_FOR_<ADMIN_id> */
    markToDelete(idToMark: string) {
        const{ DATA } = OrdersService;
       for (const ordersPerDay of DATA) {
           for (const order of ordersPerDay.orders) {
                if (order.orderId === idToMark) {
                    order.isCanDelete = true;
                }
           }
       }
    }
    /** web-socket.service helper in emitDelete */
    filterOnIsCanDelete(): boolean {
        const{ DATA } = OrdersService;
        if (DATA.length > 0) {
            for (const ordersPerDay of DATA) {
                const { orders } = ordersPerDay;
                for (let i = 0; i < orders.length; i++) {
                    if (orders[i].isCanDelete) {
                        this._removeItemToDelete(orders[i].orderId);
                        this._removeItemFromOrderRegistry(orders[i].orderId);
                        orders.splice(i--, 1);
                        --this.counterOfChecks;
                    }
                }
            }
            this._removeZeroFirstCard();
            return true;
        }

        return false;
    }
    /** web-socket.service helper in emitDelete */
    removeItems() {
        const{ RemovableOrders, DATA } = OrdersService;
        RemovableOrders.forEach(orderId => {
            for (const ordersPerDay of DATA) {
                const { orders } = ordersPerDay;
                for (let i = 0; i < orders.length; i++) {
                    if (orders[i].orderId === orderId) {
                        this._removeItemFromOrderRegistry(orderId);
                        orders.splice(i--, 1);
                        --this.counterOfChecks;
                    }
                }
            }
        });
        RemovableOrders.length = 0;
        this._removeZeroFirstCard();
    }
    /** OrderComponent incremental connector with checkbox */
    checkOnToDeleteAdmin(id: string) {
        ++this.counterOfChecks;
        this._addItemToDelete(id);
    }
    /** OrderComponent decremental connector with checkbox */
    unCheckOnToDeleteAdmin(id: string) {
        --this.counterOfChecks;
        this._removeItemToDelete(id);
    }
    /** web-socket.service action OnNEW_ORDER_FOR_<ADMIN_id> */
    addNewOrder(ORDER: IPortUserOrder) {
        if (!this._checkUnique) {
            return;
        }
        const { DATA, ordersRegistry } = OrdersService;
        if (typeof DATA[0] !== 'object') {
            this.groupData( Array.isArray(ORDER) ? ORDER : [ORDER]);
        }else {
            const firstElementToCompareTimemark = DATA[0].timemark;
            const timemarkOfNewOrder = this._getSomeDay(ORDER.timestamp);
            if (timemarkOfNewOrder !== firstElementToCompareTimemark) {
                DATA.unshift({
                    orders: [],
                    timemark: timemarkOfNewOrder
                });
            }
            DATA[0].orders.unshift(ORDER);
            ordersRegistry.unshift(ORDER.orderId);
        }

    }
    /** web-socket.service action OnREADY */
    groupData(ORDERS: Array<IPortUserOrder>): void {
        const PartialOrders = this._sortData(ORDERS);
        const { DATA, ordersRegistry } = OrdersService;
        for (const order of PartialOrders) {
            const orderTime = this._getSomeDay(order.timestamp);


            if ( !DATA[ DATA.length - 1 ] ) {
                    DATA.push({
                        orders: [],
                        timemark: orderTime
                    });
            }else {

                if (DATA[ DATA.length - 1 ].timemark !== orderTime) {
                    DATA.push({
                        orders: [],
                        timemark: orderTime
                    });
                }
            }
            DATA[ DATA.length - 1 ].orders.push(order);
            ordersRegistry.push(order.orderId);
        }
    }

}
