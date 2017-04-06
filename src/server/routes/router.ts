import { Application, Router, Request, Response } from "express";
import * as fs from "fs";
import * as path from "path";
// import ServerConfig from "../serverConfig";

import { adminController } from "../controllers";
export class AppRouter {
    Router = Router();
    private App: Application;

    constructor(app: Application) {
        this.App = app;
    }

    configureAppRoutes() {
        const{ Router: router } = this;
        router.get("/", (...args: Array<any>): void => {
            const res: Response = args[1];
            return res.render("index", { title: "Express" });
        });

        /**Debag service routes */
        router.get("/air-ticketing-and-reservation/", (...args: Array<any>) => {
            const res: Response = args[1];
            res.render("services/air_ticketing_and_reservation");
        });
        router.get("/visa-assist/", (...args: Array<any>) => {
            const res: Response = args[1];
            res.render("services/visa_assist");
        });
        router.get("/travel-insurance/", (...args: Array<any>) => {
            const res: Response = args[1];
            res.render("services/travel_insurance");
        });
        router.get("/consular-services/", (...args: Array<any>) => {
            const res: Response = args[1];
            res.render("services/consular_services");
        });
        router.get("/hotel-booking/", (...args: Array<any>) => {
            const res: Response = args[1];
            res.render("services/world_wide_hotel_booking");
        });
        router.get("/group-travel/", (...args: Array<any>) => {
            const res: Response = args[1];
            res.render("services/incentive_group_travel");
        });
        router.get("/honeymoon-packages/", (...args: Array<any>) => {
            const res: Response = args[1];
            res.render("services/honeymoon_packages");
        });
        router.get("/family-packages/", (...args: Array<any>) => {
            const res: Response = args[1];
            res.render("services/family_packages");
        });
        router.get("/holiday-packages/", (...args: Array<any>) => {
            const res: Response = args[1];
            res.render("services/holiday_packages");
        });
        router.get("/pilgrimage-travel/", (...args: Array<any>) => {
            const res: Response = args[1];
            res.render("services/pilgrimage_travel");
        });
        /**end */
        router.get("/services/", (...args: Array<any>) => {
            const res: Response = args[1];
            res.setHeader("content-type", "application/json");
            fs.createReadStream( path.resolve(__dirname, "servicesModel.json") ).pipe(res);
        });
        router.post("/order/", (req: Request, res: Response) => {
            console.log(req.body);
            if (req && req.body && req.body.ACTION === "REGISTER") {
                res.json({ info: "Your data has been sent, our agent will contact you.", reqId: "f4ydhsg53igfhfgs==" });
            }
        });
        router.delete("/order/", (req: Request, res: Response) => {
            console.log(req.body);
            if (req && req.body && req.body.ACTION === "CANCEL") {
                res.send("Your request successfully canceled.");
            }
        });


        /**Debag admin panel */
        router.get(["/login", "/dashboard", "/dashboard/*", "/registration"], (...args: Array<any>) => {
            // const pathToExperimentalFile = path.resolve("../../../../WebstormProjects/WFW_admin/dist/index.html");
            const pathToExperimentalFile = path.resolve(__dirname, "../../admin/dist/index.html");
            const res: Response = args[1];
            res.setHeader("content-type", "text/html");
            fs.createReadStream(pathToExperimentalFile).pipe(res);
        });

        router.get(["/*\.js", "/*\.map"], (req: Request, res: Response) => {
            // const PATH_TO_DIR = "../../../../WebstormProjects/WFW_admin/dist/";
            // const PATH_TO_FILES = path.resolve(PATH_TO_DIR, req.path.slice(1));
            const PATH_TO_FILES = path.resolve(__dirname, "../../admin/dist/", req.path.slice(1));
            fs.createReadStream(PATH_TO_FILES).pipe(res);
        });
        router.get("/api/register/",  (...args: Array<any>) => {
            const res: Response = args[1];
            res.json({
                name: "Dmitry"
            });
        });
        router.post("/api/register/", async (...args: Array<any>) => {
            const req: Request = args[0];
            const res: Response = args[1];
            for (let promise of [adminController.checkForNewComerAsync(), adminController.checkAdminSingInAsync(req, res)]) {
                await promise.catch(rej => rej);
            }
            if (!res.headersSent) {
                res.status(401).end();
            }
        });
        router.get("/api/test-route", async (...args: Array<any>) => {
            const res: Response = args[1];
            // const req: Request = args[0];

            // adminController.recordToDB().then(() => res.send("Saved!")).catch(err => res.send(err.message));

            try {
               // let result: boolean = await adminController.checkForNewComerAsync(req, res); // .then(result => res.json(result)).catch(err => res.send(err.message));
               const RESULT = await adminController.registerAdmin(res);
               // result ? res.send(result) : res.status(401).end();
               console.log("Result adminController.registerAdmin ", RESULT );
               // res.end(sameNameCount.toString());
            }catch (e) {
                console.log(e);
                res.send(e.message);
            }
            // res.send(adminController.testAsyncRejection());
        });
        return this;
    }
}