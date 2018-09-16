"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const app_1 = require("../app");
const models_1 = require("../models");
class OrdersController {
    addNewOrderController() {
        return (req, res) => {
            const ORDER = req.body;
            let sessionToken;
            let webSoketId;
            let isOnline;
            if (ORDER && ORDER.ACTION === "REGISTER") {
                const NORMALIZED_ORDER = services_1.orderNormalizator(ORDER);
                return models_1.AdminModel.where("status", "admin")
                    .sort("ordersCount")
                    .limit(1)
                    .select("sessionToken isOnline webSoketId")
                    .then(adminDocArr => {
                    if (Array.isArray(adminDocArr)) {
                        ({ sessionToken, isOnline, webSoketId } = adminDocArr[0]);
                        return adminDocArr[0].update({ $inc: { ordersCount: 1, counterOfOrders: 1 }, $push: { orders: NORMALIZED_ORDER } });
                    }
                    throw new Error("Doc cant be null!");
                })
                    .then((resultSet) => {
                    const { ok, nModified, n } = resultSet;
                    if (!ok || !nModified || !n) {
                        throw new Error("Order not added!");
                    }
                    if (isOnline && webSoketId && sessionToken) {
                        app_1.default.socketIO.emitOnNewOrder(sessionToken, webSoketId, NORMALIZED_ORDER);
                    }
                    const orderPort = { info: "Your data has been sent, our agent will contact you.", reqId: NORMALIZED_ORDER.orderId };
                    res.json(orderPort);
                })
                    .catch(() => res.status(500).end());
            }
            return res.status(403).end();
        };
    }
    selectOrdersForAdminAsync({ adminId, lastTimestamp }) {
        adminId = typeof adminId !== "string" ? "" : adminId;
        return new Promise((resolve, reject) => models_1.AdminModel.aggregate([
            { $match: { sessionToken: adminId, isOnline: true } },
            { $project: { _id: 0, orders: { $filter: { input: "$orders", as: "order", cond: { $lt: ["$$order.timestamp", lastTimestamp] } } } } },
        ])
            .cursor({})
            .exec()
            .stream()
            .on("data", ({ orders }) => {
            if (Array.isArray(orders)) {
                const OUT = [];
                for (let end = orders.length - 1; end >= 0; end--) {
                    delete orders[end]._id;
                    OUT.push(orders[end]);
                }
                return resolve(OUT);
            }
            reject("No Such Admin!");
        })
            .on("error", reject));
    }
    deleteOrderController() {
        return (req, res) => {
            if (req && req.body && req.body.ACTION === "CANCEL") {
                const { reqId } = req.body;
                let sessionToken;
                let isOnline;
                let webSoketId;
                return models_1.AdminModel.findOne({ "orders.orderId": reqId })
                    .select("sessionToken isOnline webSoketId")
                    .then((result) => {
                    ({ sessionToken, isOnline, webSoketId } = result);
                    if (result) {
                        return result.update({ $inc: { ordersCount: -1, counterOfOrders: -1 }, $pull: { orders: { orderId: reqId } } });
                    }
                    throw new Error("Document wasn't found");
                })
                    .then((result) => {
                    const { ok, nModified, n } = result;
                    if (ok && nModified && n) {
                        if (sessionToken && isOnline) {
                            app_1.default.socketIO.emitOnUserCanceledOrder(sessionToken, webSoketId, reqId);
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
    deleteOrdersByAdminAsync(arrayToRemove) {
        const decrement = arrayToRemove.length;
        return models_1.AdminModel.update({ "orders.orderId": { $in: arrayToRemove } }, {
            $inc: { ordersCount: -decrement, counterOfOrders: -decrement },
            $pull: { orders: { orderId: { $in: arrayToRemove } } }
        })
            .then((result) => {
            const { ok, nModified, n } = result;
            if (ok && nModified && n) {
                return result;
            }
            throw "Orders couldn't deleted!";
        });
    }
}
const ordersController = new OrdersController();
exports.ordersController = ordersController;
