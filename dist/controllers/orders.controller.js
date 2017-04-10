"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
class OrdersController {
    save() {
        console.log(models_1.AdminModel);
    }
}
const ordersController = new OrdersController();
exports.ordersController = ordersController;
