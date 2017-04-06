import { AdminModel } from "../models";

class OrdersController {
    save() {
        console.log(AdminModel);
    }
}
const ordersController = new OrdersController();
export {ordersController};