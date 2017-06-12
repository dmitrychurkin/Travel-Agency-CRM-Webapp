import { Injectable } from '@angular/core';
declare const io: any;
import { SOUNDS } from '../app.config';
import { OrdersService } from './orders.service';
import { ErrorEmmiter, errorMessages } from '../error.service';
import { IPortUserOrder, IPortSocketInfo } from '../Interfaces';



@Injectable()
export class WebSocketService {
  private socket: any;
  public isAcknowlegeRecieved: boolean;
  constructor(
    private ordersService: OrdersService,
    private errorEmmiterService: ErrorEmmiter
  ) { }
  connetTo(adminId: string, url= '/orders') {
    this.socket = io(url);

    this.socket.on('connect', () => {
            const { DATA, lastElementTimestamp } = OrdersService;

            if (DATA.length === 0) {
              const socketAdminObj: IPortSocketInfo = { adminId, lastTimestamp: Date.now() };
              /**Fist time connected */
              this.socket.emit('READY', socketAdminObj, (data: Array<IPortUserOrder> | { error: boolean }) => {

                if ( (<{ error: boolean }>data).error ) {
                  return this.errorEmmiterService.emmiter.emit(errorMessages.load);
                }

                this.ordersService.groupData(<Array<IPortUserOrder>>data);

                this.isAcknowlegeRecieved = true;
              });
            }
            this.socket.on(`NEW_ORDER_FOR_${adminId}`, (data_1: IPortUserOrder) => {
                console.log('Recieve new ORDER= ', data_1);
                console.log(SOUNDS.notification);
                new Audio(SOUNDS.notification).play();
                this.ordersService.addNewOrder(data_1);
            });
            this.socket.on(`CANCEL_ORDER_FOR_${adminId}`, (reqId: string) => {
                console.log('User cancel order number = ', reqId);
                new Audio(SOUNDS.cancel).play();
                this.ordersService.markToDelete(reqId);
            });
    });
    this.socket.on('error', () => this.errorEmmiterService.emmiter.emit(errorMessages.load));
    return this;
  }
  emitDelete() {
    const isCanProceed = this.ordersService.filterOnIsCanDelete();
    const{ RemovableOrders } = OrdersService;
    console.log('Removable orders = ', RemovableOrders);
    if (isCanProceed && this.socket.connected && RemovableOrders.length > 0) {
      this.socket.emit('ORDERS_TO_DELETE', RemovableOrders, (data: { ok: boolean }) => {
        console.log('ORDERS_TO_DELETE responce => ', data);
        if (data.ok) {
          this.ordersService.removeItems();
        }else {
          this.errorEmmiterService.emmiter.emit(errorMessages.load);
        }
      });
    }
  }
  disconnect() {
    this.socket.close();
    delete this.isAcknowlegeRecieved;
    delete this.socket;
  }
}
