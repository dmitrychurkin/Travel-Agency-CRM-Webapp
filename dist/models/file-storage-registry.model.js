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
    maxWidth: {
        type: Number,
        default: 600,
        min: 10
    },
    slideShow: {
        type: Number,
        default: 10,
        min: 4
    },
    sliderMode: {
        type: String,
        enum: ["sequensed", "static"],
        default: "sequensed"
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
            },
            meta: {
                alt: {
                    type: String,
                    default: "",
                    trim: true
                },
                title: {
                    type: String,
                    default: "",
                    trim: true
                }
            }
        }]
}, {
    collection: "FileStorage",
    skipVersioning: true
});
const FileStorageModel = mongoose.model("FileStorage", FileStorageSchema);
exports.FileStorageModel = FileStorageModel;
