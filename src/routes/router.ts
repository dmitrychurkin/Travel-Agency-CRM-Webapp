import { Application, Router, Request, Response, NextFunction } from "express";
import * as fs from "fs";
import * as path from "path";
import * as shortid from "shortid";
import ServerConfig from "../serverConfig";


import {
    adminController,
    ordersController,
    fileUploaderController,
    keyPeopleController,
    offersImgsController,
    siteContactsController,
    sliderPromoController,
    mainController,
    customerReviewsController,
    sponsoresController } from "../controllers";
export class AppRouter {
    Router = Router();
    App: Application;

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

        router.get("/", mainController.getSitePropsController());

        router.get("/services/", (...args: Array<any>) => {
            const res: Response = args[1];
            res.setHeader("content-type", "application/json");
            fs.createReadStream( path.resolve(__dirname, "../app-files/servicesModel.json") ).pipe(res);
        });
        router.post("/order/", ordersController.addNewOrderController());
        router.delete("/order/", ordersController.deleteOrderController());


/**Admin panel */
        router.get(["/login", "/dashboard", "/registration"], (...args: Array<any>) => {
            args[1].sendFile(path.resolve(__dirname, "../assets/admin", "index.html"));
        });
        router.get(["/*\.js", "/*\.css", "/*\.map"], (req: Request, res: Response) => {
            res.sendFile(path.resolve(__dirname, "../assets/admin", req.path.slice(1)));
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

// key people
        router.get("/api/key-people", [adminController.tokenValidatorController(true), keyPeopleController.getKeyPeople_JsonAPI()]);
        router.patch("/api/key-people", [adminController.tokenValidatorController(true), keyPeopleController.updateKeyPeople_JsonAPI()]);

// customer reviews
        router.get("/api/customer-reviews", [adminController.tokenValidatorController(true), customerReviewsController.getCustomerReviews_JsonAPI()]);
        router.patch("/api/customer-reviews", [adminController.tokenValidatorController(true), customerReviewsController.updateCustomerReviews_JsonAPI()]);

// slider promo
        router.get("/api/slider-promo/", [adminController.tokenValidatorController(true), sliderPromoController.getSlides_JsonAPI()]);
        router.patch("/api/slider-promo/", [adminController.tokenValidatorController(true), sliderPromoController.setSlides_JsonAPI()]);

// sponsores
        router.get("/api/sponsores", [adminController.tokenValidatorController(true), sponsoresController.getSponsores_JsonAPI()]);
        router.patch("/api/sponsores", [adminController.tokenValidatorController(true), sponsoresController.updateSponsores_JsonAPI()]);

        return router;
    }
}