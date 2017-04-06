"use strict";
const mongoose = require("mongoose");
const SiteSchema = new mongoose.Schema({
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
exports.SiteModel = mongoose.model("Site", SiteSchema);
