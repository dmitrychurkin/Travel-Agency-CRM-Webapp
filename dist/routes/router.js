"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express = require("express");
const fs = require("fs");
const path = require("path");
const shortid = require("shortid");
const serverConfig_1 = require("../serverConfig");
const controllers_1 = require("../controllers");
class AppRouter {
    constructor(app) {
        this.Router = express_1.Router();
        this.App = app;
    }
    ensureSameOrigin() {
        return (req, res, next) => {
            const isExistSessionGeneralCookie = !!req.signedCookies[serverConfig_1.default.SESSION_COOKIE_NAME];
            if (req.method === "GET" || req.method === "HEAD") {
                if (!isExistSessionGeneralCookie) {
                    const sessOpts = req.secure ? {
                        signed: true,
                        httpOnly: true,
                        sameSite: true,
                        secure: true
                    } : { signed: true, httpOnly: true, sameSite: true };
                    res.cookie(serverConfig_1.default.SESSION_COOKIE_NAME, shortid.generate(), sessOpts);
                }
                return next();
            }
            else if (req.method === "POST" || req.method === "DELETE" || req.method === "PATCH") {
                const HOST = req.get("host");
                const REFERER = req.get("referer");
                if (!isExistSessionGeneralCookie || !(REFERER.includes(HOST)) || !req.xhr) {
                    return res.status(403).end();
                }
                return next();
            }
            return res.status(403).end();
        };
    }
    securityMiddleware() {
        const { Router } = this;
        Router.use(this.ensureSameOrigin());
    }
    configureAppRoutes() {
        const { Router: router } = this;
        router.get("/", controllers_1.mainController.getSitePropsController());
        router.get("/services/", (...args) => {
            const res = args[1];
            res.setHeader("content-type", "application/json");
            fs.createReadStream(path.resolve(__dirname, "../app-files/servicesModel.json")).pipe(res);
        });
        router.post("/order/", controllers_1.ordersController.addNewOrderController());
        router.delete("/order/", controllers_1.ordersController.deleteOrderController());
        router.use(["/login", "/dashboard", "/registration"], express.static(path.resolve(__dirname, "../../admin/dist")));
        router.head("/api/validate/", controllers_1.adminController.tokenValidatorController());
        router.get("/api/get-admin-info/", [controllers_1.adminController.tokenValidatorController(true), controllers_1.adminController.getAdminInfoController()]);
        router.post("/api/register/", controllers_1.adminController.signInController());
        router.post("/api/register-new/", controllers_1.adminController.registerNewAdminController());
        router.head("/api/sign-out/", [controllers_1.adminController.tokenValidatorController(true), controllers_1.adminController.adminSignOutController()]);
        router.post("/api/uploads/", controllers_1.fileUploaderController.onUploadController());
        router.delete("/api/uploads/:uuid", controllers_1.fileUploaderController.onDeleteController());
        router.get("/api/files", [controllers_1.adminController.tokenValidatorController(true), controllers_1.fileUploaderController.fetchStoreController_JsonAPI()]);
        router.get("/storage/:file", [controllers_1.adminController.tokenValidatorController(true), controllers_1.fileUploaderController.serveRequestToStorage()]);
        router.patch("/api/files/:fileId", [controllers_1.adminController.tokenValidatorController(true), controllers_1.fileUploaderController.actionFile_JsonAPI()]);
        router.delete("/api/files/:fileId", [controllers_1.adminController.tokenValidatorController(true), controllers_1.fileUploaderController.actionFile_JsonAPI()]);
        router.get("/api/download", [controllers_1.adminController.tokenValidatorController(true), controllers_1.fileUploaderController.downloadFileAsync()]);
        router.get("/offers", controllers_1.offersImgsController.getOffers_JsonAPI());
        router.patch("/offers", controllers_1.offersImgsController.editSliderMeta_JsonAPI);
        router.patch("/offers/:fileid", [controllers_1.adminController.tokenValidatorController(true), controllers_1.offersImgsController.editOffersMeta_JsonAPI]);
        router.get("/api/contacts", [controllers_1.adminController.tokenValidatorController(true), controllers_1.siteContactsController.getContacts_JsonAPI()]);
        router.patch("/api/contacts", [controllers_1.adminController.tokenValidatorController(true), controllers_1.siteContactsController.updateContacts_JsonAPI()]);
        router.get("/api/key-people", [controllers_1.adminController.tokenValidatorController(true), controllers_1.keyPeopleController.getKeyPeople_JsonAPI()]);
        router.patch("/api/key-people", [controllers_1.adminController.tokenValidatorController(true), controllers_1.keyPeopleController.updateKeyPeople_JsonAPI()]);
        router.get("/api/customer-reviews", [controllers_1.adminController.tokenValidatorController(true), controllers_1.customerReviewsController.getCustomerReviews_JsonAPI()]);
        router.patch("/api/customer-reviews", [controllers_1.adminController.tokenValidatorController(true), controllers_1.customerReviewsController.updateCustomerReviews_JsonAPI()]);
        router.get("/api/slider-promo/", [controllers_1.adminController.tokenValidatorController(true), controllers_1.sliderPromoController.getSlides_JsonAPI()]);
        router.patch("/api/slider-promo/", [controllers_1.adminController.tokenValidatorController(true), controllers_1.sliderPromoController.setSlides_JsonAPI()]);
        router.get("/api/sponsores", [controllers_1.adminController.tokenValidatorController(true), controllers_1.sponsoresController.getSponsores_JsonAPI()]);
        router.patch("/api/sponsores", [controllers_1.adminController.tokenValidatorController(true), controllers_1.sponsoresController.updateSponsores_JsonAPI()]);
        return router;
    }
}
exports.AppRouter = AppRouter;
