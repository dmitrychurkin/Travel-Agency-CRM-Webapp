"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const AdminsSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true
    },
    siteRef: {
        type: mongoose.SchemaTypes.String,
        ref: "SiteWingsForWorldSettings"
    },
    name: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    passwordSalt: String,
    jwt: String,
    orders: [{
            orderNumber: Number,
            date: Date,
            first_name: String,
            last_name: String
        }],
    ordersCount: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        enum: ["E", "O"]
    },
    webSoketId: String
}, {
    timestamps: true,
    bufferCommands: false
});
exports.AdminModel = mongoose.model("Admin", AdminsSchema);
