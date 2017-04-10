import { Application, Request, Response, NextFunction } from "express";
import * as express from "express";
import * as path from "path";
import * as favicon from "serve-favicon";
import * as logger from "morgan";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import { ApplicationError } from "./errors";

import { AppRouter } from "./routes";
import { MongoDB } from "./database";
import ServerConfig from "./serverConfig";
/*import indexRoutes from "./routes/index";
import usersRoutes from "./routes/users";
import servicesRoutes from "./routes/services";*/

class App {
  express: Application;
  constructor() {
    this.express = express();
    this._middleware();
    this._views();
    this._routes(this.express);
    this._errorHandlers();
    MongoDB.configureAndCreate();
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
    this.express.use(cookieParser(ServerConfig.COOKIE_SECRET));
    this.express.use(express.static(path.join(__dirname, "public")));
  }
  private _routes(app: Application) {
    /*this.express.use("/", indexRoutes);
    this.express.use("/users", usersRoutes);
    this.express.use(servicesRoutes);*/

    this.express.use(new AppRouter(app).configureAppRoutes().Router);
  }
  private _errorHandlers() {
    // catch 404 and forward to error handler
    this.express.use((...args: any[]) => {
      const next: NextFunction = args[2];
      const err = new ApplicationError("Not Found");
      err.status = 404;
      next(err);
    });
    // error handler
    this.express.use(function(/*err, req, res, next*/...args: any[]) {
      const err: ApplicationError = args[0];
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

