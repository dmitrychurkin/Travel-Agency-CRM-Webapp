"use strict";
const mongoose = require("mongoose");
const serverConfig_1 = require("../serverConfig");
class MongoDB {
    static get DatabaseConnectionOptions() {
        return {
            promiseLibrary: global.Promise,
            server: {
                reconnectTries: Number.MAX_VALUE
            }
        };
    }
    static configureAndCreate(dbURL = serverConfig_1.default.MONGOLAB_URI) {
        const endPointDbURI = process.env.MONGOLAB_URI ||
            process.env.MONGOHQ_URL ||
            dbURL;
        return new MongoDB(endPointDbURI);
    }
    constructor(endPointDbURI) {
        mongoose.Promise = global.Promise;
        mongoose.connect(endPointDbURI, MongoDB.DatabaseConnectionOptions)
            .then(() => console.log("Connected to DB"))
            .catch((err) => (console.log("Error occured, while connecting to DB"), console.error(err)));
    }
}
exports.MongoDB = MongoDB;
