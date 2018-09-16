import * as dotEnv from "dotenv";
import * as http from "http";
import { Server } from "http";
import { Express, Request, Response, NextFunction } from "express";
import * as express from "express";
import * as path from "path";
import * as favicon from "serve-favicon";
import * as logger from "morgan";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import { IO } from "./socket";
import { ApplicationError } from "./errors";

import { AppRouter } from "./routes";
import { MongoDB } from "./database";
import ServerConfig from "./serverConfig";
dotEnv.config();
/*import indexRoutes from "./routes/index";
import usersRoutes from "./routes/users";
import servicesRoutes from "./routes/services";*/

// caching variables:
// 1. offers
// 2. siteContacts
// 3. sliderPromo
// 4. keyPeople
// 5. customerReviews
// 6. sponsores

class App {
  server: Server;
  express: Express;
  socketIO: IO;
  private appRouter: AppRouter;
  constructor() {
    const app = express();

    this.express = app;
    this.server = http.createServer(app);
    this.socketIO = IO.createSocketIOServer(this.server);
    this.appRouter = new AppRouter(app);
    this._middleware(app);
    this._views(app);
    this._routes(app);
    this._errorHandlers(app);
    MongoDB.configureAndCreate();
  }
  private _views(app: Express) {
    // view engine setup
    app.set("views", path.join(__dirname, "views"));
    app.set("view engine", "ejs");
  }
  private _middleware(app: Express) {
    // uncomment after placing your favicon in /public
    app.use(favicon(path.join(__dirname, "assets", "favicon", "favicon.ico")));
    app.use(logger("dev"));
    app.use(bodyParser.json({ type: "application/*" }));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser(ServerConfig.COOKIE_SECRET));
    app.use(express.static(path.join(__dirname, "assets")));
    this.appRouter.securityMiddleware();
  }
  private _routes(app: Express) {
    /*this.express.use("/", indexRoutes);
    this.express.use("/users", usersRoutes);
    this.express.use(servicesRoutes);*/

    app.use(this.appRouter.configureAppRoutes());
  }
  private _errorHandlers(app: Express) {
    // catch 404 and forward to error handler
    app.use((...args: any[]) => {
      const next: NextFunction = args[2];
      const err = new ApplicationError("Not Found");
      err.status = 404;
      next(err);
    });
    // error handler
    app.use((err: ApplicationError, req: Request, res: Response, next: NextFunction) => {
      next;
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get("env") === "development" ? err : {};

      // render the error page
      res.status(err.status || 500);

      res.render("error");
    });
  }
}

export default new App;
