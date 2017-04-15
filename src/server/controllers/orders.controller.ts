import { /*Request,*/ Response } from "express";
import { Application } from "../app";
import { AdminModel } from "../models";

class OrdersController {
    addNewOrderController() {
        return (/*req: Request,*/ res: Response) => {
            Application.socketIO.socketIOServer.emit("test", "Hi from Socket!");
            return AdminModel.where("status", "admin")
                            .sort("ordersCount")
                            .limit(1)
                            // .select("orders")
                            .then(resultSet => {
                                console.log(resultSet);
                                res.send(resultSet);
                            })
                            .catch(err => res.status(500).end(err.message));
        };
    }
}
const ordersController = new OrdersController();
export {ordersController};