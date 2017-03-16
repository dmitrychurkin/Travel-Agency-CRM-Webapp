"use strict";
const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const errors_1 = require("./errors");
const index_1 = require("./routes/index");
const users_1 = require("./routes/users");
const services_1 = require("./routes/services");
class App {
    constructor() {
        this.express = express();
        this._middleware();
        this._views();
        this._routes();
        this._errorHandlers();
    }
    _views() {
        this.express.set("views", path.join(__dirname, "views"));
        this.express.set("view engine", "ejs");
    }
    _middleware() {
        this.express.use(logger("dev"));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(cookieParser());
        this.express.use(express.static(path.join(__dirname, "public")));
    }
    _routes() {
        this.express.use("/", index_1.default);
        this.express.use("/users", users_1.default);
        this.express.use(services_1.default);
    }
    _errorHandlers() {
        this.express.use((...args) => {
            const next = args[2];
            const err = new errors_1.ApplicationLevelError("Not Found");
            err.status = 404;
            next(err);
        });
        this.express.use(function (...args) {
            const err = args[0];
            const req = args[1];
            const res = args[2];
            res.locals.message = err.message;
            res.locals.error = req.app.get("env") === "development" ? err : {};
            res.status(err.status || 500);
            res.render("error");
        });
    }
}
module.exports = new App().express;
