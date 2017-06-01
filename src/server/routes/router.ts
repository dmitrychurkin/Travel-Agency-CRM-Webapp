import { Application, Router, Request, Response, NextFunction } from "express";
import * as fs from "fs";
import * as path from "path";
import * as shortid from "shortid";
import ServerConfig from "../serverConfig";

// only test purpose
import { AdminModel, FileStorageModel } from "../models";

import {
    adminController,
    ordersController,
    fileUploaderController,
    offersImgsController,
    siteContactsController,
    sliderPromoController,
    mainController } from "../controllers";
export class AppRouter {
    Router = Router();
    private App: Application;

    constructor(app: Application) {
        this.App = app;
    }
    private ensureSameOrigin() {
        return (req: Request, res: Response, next: NextFunction) => {
            const isExistSessionGeneralCookie = !!req.signedCookies[ServerConfig.SESSION_COOKIE_NAME];
            if (req.method === "GET" || req.method === "HEAD") {
                if (!isExistSessionGeneralCookie) {
                    const sessOpts: any = req.secure ? {
                                        signed: true,
                                        httpOnly: true,
                                        sameSite: true,
                                        secure: true
                    } : { signed: true, httpOnly: true, sameSite: true };

                    res.cookie(ServerConfig.SESSION_COOKIE_NAME, shortid.generate(), sessOpts);
                }
                return next();

            }else if (req.method === "POST" || req.method === "DELETE" || req.method === "PATCH") {
                const HOST = req.get("host");
                const REFERER = req.get("referer");

                if ( !isExistSessionGeneralCookie || !(REFERER.includes(HOST)) || !req.xhr) {
                    return res.status(403).end();
                }
                return next();
            }
            return res.status(403).end();
        };
    }
    securityMiddleware() {
        const{ Router } = this;
        Router.use(this.ensureSameOrigin());
    }
    configureAppRoutes() {
        const{ Router: router } = this;
        /*router.get("/", (...args: Array<any>): void => {
            const res: Response = args[1];
            return res.render("index", { title: "Express" });
        });*/
        router.get("/", mainController.getSitePropsController());
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
        router.post("/order/", ordersController.addNewOrderController());
        router.delete("/order/", ordersController.deleteOrderController());


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
        router.head("/api/validate/",  adminController.tokenValidatorController());
        router.get("/api/get-admin-info/", [adminController.tokenValidatorController(true), adminController.getAdminInfoController()]);
        router.post("/api/register/", adminController.signInController());
        router.post("/api/register-new/", adminController.registerNewAdminController());
        router.head("/api/sign-out/", [adminController.tokenValidatorController(true), adminController.adminSignOutController()]);

// qq service routes
        router.post("/api/uploads/", fileUploaderController.onUploadController());
        router.delete("/api/uploads/:uuid", fileUploaderController.onDeleteController());

// file uploader init and serve routes
        router.get("/api/files", [adminController.tokenValidatorController(true), fileUploaderController.fetchStoreController_JsonAPI()]);
        router.get("/storage/:file", [adminController.tokenValidatorController(true), fileUploaderController.serveRequestToStorage()]);

// file uploader action routes
        router.patch("/api/files/:fileId", [adminController.tokenValidatorController(true), fileUploaderController.actionFile_JsonAPI()]);
        router.delete("/api/files/:fileId", [adminController.tokenValidatorController(true), fileUploaderController.actionFile_JsonAPI()]);
        router.get("/api/download", [adminController.tokenValidatorController(true), fileUploaderController.downloadFileAsync()]);

// files in public usage
        router.get("/offers", offersImgsController.getOffers_JsonAPI());
        router.patch("/offers", offersImgsController.editSliderMeta_JsonAPI);
        router.patch("/offers/:fileid", [adminController.tokenValidatorController(true), offersImgsController.editOffersMeta_JsonAPI]);

// contacts
        router.get("/api/contacts", [adminController.tokenValidatorController(true), siteContactsController.getContacts_JsonAPI()]);
        router.patch("/api/contacts", [adminController.tokenValidatorController(true), siteContactsController.updateContacts_JsonAPI()]);

// slider promo
        router.get("/api/slider-promo/", [adminController.tokenValidatorController(true), sliderPromoController.getSlides_JsonAPI()]);
        router.patch("/api/slider-promo/", [adminController.tokenValidatorController(true), sliderPromoController.setSlides_JsonAPI()]);
        // router.get("/api/files", [adminController.tokenValidatorController(true), sliderPromoController.getPublicImages_JsonAPI()]);
/**Test routes */
        router.get("/api/sign-admin", (...args: Array<any>) => {
            const res: Response = args[1];
            const req: Request = args[0];

            //

            // try {
               // let result: boolean = await adminController.checkForNewComerAsync(req, res); // .then(result => res.json(result)).catch(err => res.send(err.message));
                adminController.signInController()(req, res);
               // result ? res.send(result) : res.status(401).end();
               // console.log("Result adminController.registerAdmin ", RESULT );
               // res.end(sameNameCount.toString());
            // }catch (e) {
                // console.log(e);
                // res.send(e.message);
            // }
        });
        router.get("/api/register-new-admin", (req: Request, res: Response) => {
            adminController.registerNewAdminController()(req, res);
        });
        router.get("/api/add-site-to-db", (...args: Array<any>) => {
            const res: Response = args[1];
            adminController.recordToDB().then(() => res.send("Saved!")).catch(err => res.send(err.message));
        });
        // router.get("/api/issue-tokenjwt", (...args: Array<any>) => {
        //     const res: Response = args[1];
        //     issueTokenJWTAsync({subject: "hui"}).then((result) => {
        //         res.send(result);
        //     }).catch(err => res.send(err.message));
        // });
        // router.get("/api/decode-tokenjwt", (...args: Array<any>) => {
        //     const res: Response = args[1];
        //     const decodedTokenJwt = decodeTokenJWTSync("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0OTE1NjQxNzksImV4cCI6MTQ5MTU2NDIwOSwic3ViIjoielFYYTZOYVFMQnNub1dvN0xKZ3oifQ.bLaj5gIukEQOoVY9MXXSEpdlK1qIfIOPX_5qoM440ck");

        //     res.send(new HashIds(ServerConfig.HASHIDS_SALT).decodeHex(decodedTokenJwt.payload.sub));
        // });
        router.get("/api/validate-tokens", (...args: Array<any>) => {
            const res: Response = args[1];
            const req: Request = args[0];
            const next: NextFunction = args[2];
            adminController.tokenValidatorController()(req, res, next);
            // let payload = await adminController.validate(req, res);
            // if (!res.headersSent) res.send(payload);
        });
        router.get("/api/check-signin", async (...args: Array<any>) => {
            const res: Response = args[1];
            const req: Request = args[0];
            try {
                let payload = await adminController.adminSingInAsync(req, res);
                console.log("payload= ", payload);
                if (!res.headersSent)  return res.send(payload);
            }catch (e) {
                return res.status(500).end(e.message);
            }

        });
        router.get("/api/order", async (...args: Array<any>) => {
            const res: Response = args[1];
            // const req: Request = args[0];
            try {
              let RESULT = await AdminModel.aggregate([
                  { $match: { name:  "Dmitry"  }  },
                  {
                    $project: {
                        _id: false,

                        orders: {
                            $filter: {
                                input: "$orders",
                                as: "order",
                                cond: { $lt: [ "$$order.timestamp", Date.now() ] }
                            }
                        }
                    }
                  },
                  {
                     $project: {
                         orders: {
                             $slice: [ "$orders", -10 ]
                         }
                     }
                  }
              ])
            .exec();

            let [ orderField ] = RESULT;

            const OUT = [];
            for (let end = orderField.orders.length - 1; end >= 0; end--) {
                delete orderField.orders[end]._id;
                OUT.push(orderField.orders[end]);
            }
              res.json(OUT);
              // console.log(RESULT);
              // res.end(RESULT.toString());
            }catch (e) {
                res.send(e.message);
            }
        });
        router.get("/api/order1", async (...args: Array<any>) => {
            const res: Response = args[1];
            try {
                let RESULT = await AdminModel.where("status", "admin")
                                .sort("ordersCount")
                                .limit(1)
                                .then(result => {
                                    return result[0].update({$inc: { ordersCount: 1 }}, { new: true });
                                });

                res.json(RESULT);
            }catch (err) {
                res.send(err.message);
            }
        });
        router.get("/test-populate", (...args: Array<any>) => {
            let [, res] = args;
            FileStorageModel.findById("FileStorage")
                            .populate("siteRef", "isEditorHave")
                            .then(result => {
                                res.json(result);
                            })
                            .catch(err => res.send(err.message));
        });
        return router;
    }
}