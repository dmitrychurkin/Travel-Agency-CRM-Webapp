"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
const models_1 = require("../models");
class OrdersController {
    addNewOrderController() {
        return (res) => {
            app_1.Application.socketIO.socketIOServer.emit("test", "Hi from Socket!");
            return models_1.AdminModel.where("status", "admin")
                .sort("ordersCount")
                .limit(1)
                .then(resultSet => {
                console.log(resultSet);
                res.send(resultSet);
            })
                .catch(err => res.status(500).end(err.message));
        };
    }
}
const ordersController = new OrdersController();
exports.ordersController = ordersController;
