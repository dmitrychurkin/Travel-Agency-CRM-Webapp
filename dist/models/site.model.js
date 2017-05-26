"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
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
