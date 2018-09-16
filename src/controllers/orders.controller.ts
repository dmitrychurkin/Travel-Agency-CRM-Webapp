import { Request, Response } from "express";
import { orderNormalizator } from "../services";
import Application from "../app";
import { AdminModel } from "../models";

import { IPortOrder, IPortSocketInfo, IPortUserOrder, IUpdatePayload } from "../interfaces";

class OrdersController {
    addNewOrderController() {
        return (req: Request, res: Response) => {
            const ORDER = req.body;
            let sessionToken: string;
            let webSoketId: string;
            let isOnline: boolean;
            if (ORDER && ORDER.ACTION === "REGISTER") {
                const NORMALIZED_ORDER = orderNormalizator(ORDER);
                return AdminModel.where("status", "admin")
                                .sort("ordersCount")
                                .limit(1)
                                .select("sessionToken isOnline webSoketId")
                                .then(adminDocArr => {

                                    if ( Array.isArray(adminDocArr) ) {
                                        ({ sessionToken, isOnline, webSoketId } = adminDocArr[0]);

                                        return adminDocArr[0].update({ $inc: { ordersCount: 1, counterOfOrders: 1 }, $push: { orders: NORMALIZED_ORDER } });
                                    }
                                    throw new Error("Doc cant be null!");
                                })
                                .then((resultSet: IUpdatePayload) => {
                                    const{ok, nModified, n} = resultSet;
                                    if ( !ok || !nModified || !n ) {
                                        throw new Error("Order not added!");
                                    }

                                    if (isOnline && webSoketId && sessionToken) {
                                        Application.socketIO.emitOnNewOrder(sessionToken, webSoketId, NORMALIZED_ORDER);
                                    }

                                    const orderPort: IPortOrder = { info: "Your data has been sent, our agent will contact you.", reqId: NORMALIZED_ORDER.orderId };
                                    res.json(orderPort);
                                })
                                .catch(() => res.status(500).end());
            }
            return res.status(403).end();
        };
    }
    selectOrdersForAdminAsync({ adminId, lastTimestamp }: IPortSocketInfo) {
        adminId = typeof adminId !== "string" ? "" : adminId;
        return new Promise((resolve, reject) => AdminModel.aggregate([
                { $match: { sessionToken: adminId, isOnline: true } },
                { $project: { _id: 0, orders: { $filter: { input: "$orders", as: "order", cond: { $lt: [ "$$order.timestamp", lastTimestamp ] } } } } },
                // { $project: { orders: { $slice: [ "$orders", -10 ] } } } this project for future :)
            ])
            .cursor({ /*batchSize: 1000*/ })
            .exec()
            .stream()
            .on("data", ({ orders }: { orders: IPortUserOrder }) => {

                if (Array.isArray(orders)) {

                    const OUT: Array<IPortUserOrder> = [];

                    for (let end = orders.length - 1; end >= 0; end--) {
                        delete orders[end]._id;
                        OUT.push(<IPortUserOrder>orders[end]);
                    }

                    return resolve(OUT);
                }

                reject("No Such Admin!");

            })
            .on("error", reject));
    }
    deleteOrderController() {
        return (req: Request, res: Response) => {
            if (req && req.body && req.body.ACTION === "CANCEL") {
                const{ reqId } = req.body;
                // Only development "counterOfOrders" only increment up
                // { $inc: { "ordersCount": -1, "counterOfOrders": -1 }, $pull: { orders: { orderId: "in progress" } } }
                // const orderId = "0d88f674-bc27-4f07-82e0-3bc27dfc9f93";
                let sessionToken: string;
                let isOnline: boolean;
                let webSoketId: string;
                return AdminModel.findOne({ "orders.orderId": reqId })
                                .select("sessionToken isOnline webSoketId")
                                .then((result: any) => {
                                    ({ sessionToken, isOnline, webSoketId } = result);
                                    if (result) {
                                        return result.update({ $inc: { ordersCount: -1, counterOfOrders: -1 }, $pull: { orders: { orderId: reqId } } });
                                    }

                                    throw new Error("Document wasn't found");
                                })
                                .then((result: IUpdatePayload) => {
                                    const{ok, nModified, n} = result;

                                    if (ok && nModified && n) {
                                        if ( sessionToken && isOnline ) {
                                            Application.socketIO.emitOnUserCanceledOrder(sessionToken, webSoketId, reqId);
                                        }
                                        return res.send("Your request successfully canceled.");
                                    }
                                    throw new Error("Document wasn't updated");
                                })
                                .catch(() => res.status(500).end());
            }
            return res.status(403).end();
        };
    }
    deleteOrdersByAdminAsync(arrayToRemove: Array<string>) {
        // const sessionToken = "35564a10-bc1d-4a99-997e-2e2d93cb38c4";
        const decrement = arrayToRemove.length;
        return AdminModel.update({ "orders.orderId": { $in: arrayToRemove } }, {
            // Only development "counterOfOrders" only increment up
          $inc: { ordersCount: -decrement, counterOfOrders: -decrement },
          $pull: { orders: { orderId: { $in: arrayToRemove } } }
        })
        .then((result: IUpdatePayload) => {
            const{ok, nModified, n} = result;
            if (ok && nModified && n) {
                return result;
            }
            throw "Orders couldn't deleted!";
        });
    }
}
const ordersController = new OrdersController();
export {ordersController};