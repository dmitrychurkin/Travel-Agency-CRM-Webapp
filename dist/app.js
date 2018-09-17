"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotEnv = require("dotenv");
const http = require("http");
const express = require("express");
const compression = require("compression");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const socket_1 = require("./socket");
const errors_1 = require("./errors");
const routes_1 = require("./routes");
const database_1 = require("./database");
const serverConfig_1 = require("./serverConfig");
dotEnv.config();
class App {
    constructor() {
        const app = express();
        if (process.env.NODE_ENV === "production") {
            app.use(compression());
            app.disable("x-powered-by");
        }
        this._views(app);
        this.express = app;
        this.server = http.createServer(app);
        this.socketIO = socket_1.IO.createSocketIOServer(this.server);
        this.appRouter = new routes_1.AppRouter(app);
        this._middleware(app);
        this._routes(app);
        this._errorHandlers(app);
        database_1.MongoDB.configureAndCreate();
    }
    _views(app) {
        app.set("views", path.join(__dirname, "views"));
        app.set("view engine", "ejs");
    }
    _middleware(app) {
        app.use(logger("dev"));
        app.use(favicon(path.join(__dirname, "assets", "favicon", "favicon.ico")));
        app.use(express.static(path.join(__dirname, "assets")));
        app.use(bodyParser.json({ type: "application/*" }));
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(cookieParser(serverConfig_1.default.COOKIE_SECRET));
        this.appRouter.securityMiddleware();
    }
    _routes(app) {
        app.use(this.appRouter.configureAppRoutes());
    }
    _errorHandlers(app) {
        app.use((...args) => {
            const next = args[2];
            const err = new errors_1.ApplicationError("Not Found");
            err.status = 404;
            next(err);
        });
        app.use((err, req, res, next) => {
            next;
            res.locals.message = err.message;
            res.locals.error = req.app.get("env") === "development" ? err : {};
            res.status(err.status || 500);
            res.render("error");
        });
    }
}
exports.default = new App;
