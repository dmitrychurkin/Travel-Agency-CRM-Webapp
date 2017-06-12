import * as mongoose from "mongoose";
import ServerConfig from "../serverConfig";

const LandingPageSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: ServerConfig.LANDING_PAGE_ID
    },
    fileStorageRef: {
        type: mongoose.SchemaTypes.String,
        ref: "FileStorage"
    },
    siteRef: {
        type: mongoose.SchemaTypes.String,
        ref: "SiteWingsForWorldSettings"
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
    keyPeople: {
        title: {
            type: String,
            trim: true
        },
        article: {
            type: String,
            trim: true
        },
        people: [
            {
                avatarUrl: String,
                name: {
                    type: String,
                    trim: true
                },
                position: {
                    type: String,
                    trim: true
                },
                review: {
                    type: String,
                    trim: true
                }
            }
        ]
    },
    customerReviews: [
        {
            avatarUrl: String,
            name: {
                type: String,
                trim: true
            },
            designation: {
                type: String,
                trim: true
            },
            review: {
                type: String,
                trim: true
            }
        }
    ],
    sponsores: [{ avatarUrl: String }]
}, {
    collection: "landing_page",
    autoIndex: false,
    timestamps: true,
    bufferCommands: false,
    skipVersioning: true
});

export const LandingPageModel = mongoose.model("LandingPage", LandingPageSchema);