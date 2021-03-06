"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
exports.default = {
    MONGOLAB_URI: "mongodb://dmitry:dmitry1988@ds157667.mlab.com:57667/wingsforworld",
    DEFAULT_CREDENTIALS: {
        "login": "dimonMX",
        "password": "dron1988"
    },
    TTL: 360000,
    SITE_ID: "WFW",
    ASSUMED_ADMIN_COOKIE_KEY: "_wfwa_",
    COOKIE_SECRET: "FUCK_you-bitch",
    HASHIDS_SALT: "Same_toYou",
    BACK_UP_FILE_NAME: "rootAdmin.json",
    BACK_UP_CREDENTIALS_FOR_ADMIN_REGISTRATION: "credentialsForAdminRegistration.json",
    JWT_OPTIONS_FOR_ISSUE: {
        algorithm: "HS256",
        expiresIn: "1h"
    },
    JWT_OPTIONS_FOR_VERIFICATION: {
        algorithms: ["HS256"]
    },
    SECRET_JWT: "FUckOff",
    COOKIE_JWT_NAME: "_xt",
    JWT_MAX_AGE: 5400000,
    SESSION_COOKIE_NAME: "_wfw",
    SESSION_TOKEN_NAME: "_st",
    FILE_STORAGE: {
        DB_ID: "FileStorage",
        PATH_TO_STORAGE: path.resolve(__dirname, "./assets/fileUploads"),
        MAX_STORAGE_SIZE: 100000 * 1024,
        PATH_TO_OFFERS: path.resolve(__dirname, "./assets/offers"),
        PATH_TO_PUBLIC_IMAGES: path.resolve(__dirname, "./assets/images"),
        PATH_TO_PUBLIC_MEDIA: path.resolve(__dirname, "./assets/media"),
        PATH_TO_PUBLIC_DOCS: path.resolve(__dirname, "./assets/docs"),
        MAX_FILE_SIZE: 0,
        SERVED_STORAGE_PATH: "/storage/",
        SERVED_OFFERS_PATH: "/offers/",
        SERVED_PUBLIC_IMAGES: "/images/",
        SERVED_PUBLIC_MEDIA: "/media/",
        SERVED_PUBLIC_DOCS: "/docs/"
    },
    LANDING_PAGE_ID: "LandingPageWFW"
};
