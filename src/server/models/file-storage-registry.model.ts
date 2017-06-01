import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const FileStorageSchema = new Schema({
    _id: {
        type: String,
        default: "FileStorage"
    },
    siteRef: {
        type: mongoose.SchemaTypes.String,
        ref: "SiteWingsForWorldSettings"
    },
    currentStorageSize: {
        type: Number,
        default: 0
    },
    offers: {
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
            enum: [ "sequensed", "static" ],
            default: "sequensed"
        },
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
        locationFlag: {
            type: String,
            enum: ["S", "P", "O"],
            default: "S"
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
},
{
    collection: "FileStorage",
    skipVersioning: true
});

const FileStorageModel = mongoose.model("FileStorage", FileStorageSchema);

// only dev!
// new FileStorageModel().save();

export { FileStorageModel };