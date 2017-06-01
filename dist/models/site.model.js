"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const shortid = require("shortid");
const SiteSchema = new mongoose.Schema({
    _id: String,
    fileStorageRef: {
        type: mongoose.SchemaTypes.String,
        ref: "FileStorage"
    },
    siteContacts: [
        {
            group: {
                type: String,
                trim: true
            },
            values: [
                {
                    type: {
                        type: String,
                        trim: true
                    },
                    values: [{
                            type: String,
                            trim: true
                        }]
                }
            ]
        }
    ],
    sliderPromo: [
        {
            _id: {
                type: String,
                "default": shortid.generate
            },
            backgroundImage: String,
            title: {
                type: String,
                trim: true
            },
            description: {
                type: String,
                trim: true
            },
            chips: [
                {
                    _id: {
                        type: String,
                        "default": shortid.generate
                    },
                    destination: {
                        type: String,
                        trim: true
                    },
                    avatar: String,
                    starCount: Number
                }
            ]
        }
    ],
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
