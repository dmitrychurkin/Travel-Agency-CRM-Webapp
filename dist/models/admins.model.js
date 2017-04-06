"use strict";
const mongoose = require("mongoose");
const AdminsSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    passwordSalt: String,
    orders: [{
            orderNumber: Number,
            date: Date,
            first_name: String,
            last_name: String
        }],
    ordersCount: Number,
    role: {
        type: String,
        enum: ["E", "O"]
    }
}, {
    timestamps: true,
    bufferCommands: false
});
exports.AdminModel = mongoose.model("Admin", AdminsSchema);
