"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const errors_1 = require("./errors");
const routes_1 = require("./routes");
const database_1 = require("./database");
const serverConfig_1 = require("./serverConfig");
class App {
    constructor() {
        this.express = express();
        this._middleware();
        this._views();
        this._routes(this.express);
        this._errorHandlers();
        database_1.MongoDB.configureAndCreate();
    }
    _views() {
        this.express.set("views", path.join(__dirname, "views"));
        this.express.set("view engine", "ejs");
    }
    _middleware() {
        this.express.use(favicon(path.join(__dirname, "public", "favicon.ico")));
        this.express.use(logger("dev"));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(cookieParser(serverConfig_1.default.COOKIE_SECRET));
        this.express.use(express.static(path.join(__dirname, "public")));
    }
    _routes(app) {
        this.express.use(new routes_1.AppRouter(app).configureAppRoutes().Router);
    }
    _errorHandlers() {
        this.express.use((...args) => {
            const next = args[2];
            const err = new errors_1.ApplicationError("Not Found");
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
