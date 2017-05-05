"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FileStorageSchema = new Schema({
    _id: {
        type: String,
        default: "FileStorage"
    },
    currentStorageSize: {
        type: Number,
        default: 0
    },
    files: [{
            _id: {
                type: String,
                unique: true
            },
            fileSize: Number,
            storageFilename: {
                type: String,
                unique: true
            },
            isInPublic: {
                type: Boolean,
                default: false
            }
        }]
}, {
    collection: "FileStorage",
    skipVersioning: true
});
const FileStorageModel = mongoose.model("FileStorage", FileStorageSchema);
exports.FileStorageModel = FileStorageModel;
