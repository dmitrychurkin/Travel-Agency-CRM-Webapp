import * as mongoose from "mongoose";
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
export const SiteModel = mongoose.model("SiteWingsForWorldSettings", SiteSchema);