"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const SiteSchema = new mongoose.Schema({
    _id: String,
    login: {
        type: String
    },
    password: {
        type: String
    },
    passwordSalt: String,
    isEditorHave: {
        type: Boolean,
        default: false
    }
}, {
    autoIndex: false,
    timestamps: true,
    bufferCommands: false
});
exports.SiteModel = mongoose.model("SiteWingsForWorldSettings", SiteSchema);
