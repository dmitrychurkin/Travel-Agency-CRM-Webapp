import { Application, Request, Response, NextFunction } from "express";
import * as express from "express";
import * as path from "path";
import * as favicon from "serve-favicon";
import * as logger from "morgan";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import { ApplicationLevelError } from "./errors";

import indexRoutes from "./routes/index";
import usersRoutes from "./routes/users";
import servicesRoutes from "./routes/services";

class App {
  express: Application;
  constructor() {
    this.express = express();
    this._middleware();
    this._views();
    this._routes();
    this._errorHandlers();
  }
  private _views() {
    // view engine setup
    this.express.set("views", path.join(__dirname, "views"));
    this.express.set("view engine", "ejs");
  }
  private _middleware() {
    // uncomment after placing your favicon in /public
    this.express.use(favicon(path.join(__dirname, "public", "favicon.ico")));
    this.express.use(logger("dev"));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(cookieParser());
    this.express.use(express.static(path.join(__dirname, "public")));
  }
  private _routes() {
    this.express.use("/", indexRoutes);
    this.express.use("/users", usersRoutes);
    this.express.use(servicesRoutes);
  }
  private _errorHandlers() {
    // catch 404 and forward to error handler
    this.express.use((...args: any[]) => {
      const next: NextFunction = args[2];
      const err = new ApplicationLevelError("Not Found");
      err.status = 404;
      next(err);
    });
    // error handler
    this.express.use(function(/*err, req, res, next*/...args: any[]) {
      const err: ApplicationLevelError = args[0];
      const req: Request = args[1];
      const res: Response = args[2];

      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get("env") === "development" ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render("error");
    });
  }
}
module.exports = new App().express;

