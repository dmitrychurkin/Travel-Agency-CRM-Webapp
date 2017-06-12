import * as mongoose from "mongoose";
// import * as shortid from "shortid";
const SiteSchema = new mongoose.Schema({
    _id: String,
    fileStorageRef: {
        type: mongoose.SchemaTypes.String,
        ref: "FileStorage"
    },
    landingPageRef: {
        type: String,
        ref: "LandingPage"
    },
    // siteContacts: [
    //     {
    //         group: {
    //             type: String,
    //             trim: true
    //         },
    //         values: [
    //             {
    //                 type: {
    //                     type: String,
    //                     trim: true
    //                 },
    //                 values: [{
    //                     type: String,
    //                     trim: true
    //                 }]
    //             }
    //         ]
    //     }
    // ],
    // sliderPromo: [
    //     {
    //         /*_id: {
    //             type: String,
    //             "default": shortid.generate
    //         },*/
    //         backgroundImage: String,
    //         title: {
    //             type: String,
    //             trim: true
    //         },
    //         description: {
    //             type: String,
    //             trim: true
    //         },
    //         chips: [
    //             {
    //                 /*_id: {
    //                     type: String,
    //                     "default": shortid.generate
    //                 },*/
    //                 destination: {
    //                     type: String,
    //                     trim: true
    //                 },
    //                 avatar: String,
    //                 starCount: Number
    //             }
    //         ]
    //     }
    // ],
    // keyPeople: {
    //     title: {
    //         type: String,
    //         trim: true
    //     },
    //     article: {
    //         type: String,
    //         trim: true
    //     },
    //     people: [
    //         {
    //             avatarUrl: String,
    //             name: {
    //                 type: String,
    //                 trim: true
    //             },
    //             position: {
    //                 type: String,
    //                 trim: true
    //             },
    //             review: {
    //                 type: String,
    //                 trim: true
    //             }
    //         }
    //     ]
    // },
    // customerReviews: [
    //     {
    //         avatarUrl: String,
    //         name: {
    //             type: String,
    //             trim: true
    //         },
    //         designation: {
    //             type: String,
    //             trim: true
    //         },
    //         review: {
    //             type: String,
    //             trim: true
    //         }
    //     }
    // ],
    // sponsores: [{ avatarUrl: String }],
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