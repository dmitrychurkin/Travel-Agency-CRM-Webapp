"use strict";
const mongoose_1 = require("mongoose");
const AdminsSchema = new mongoose_1.Schema({
    name: {
        type: String
    },
    passwordHash: {
        type: String
    },
    orders: {
        orderNumber: Number,
        date: Date,
        first_name: String,
        last_name: String
    },
    ordersCount: Number
}, {
    autoIndex: false,
    timestamps: true,
    bufferCommands: false
});
exports.AdminModel = new mongoose_1.Mongoose().model("Admin", AdminsSchema);
