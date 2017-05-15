"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const fs = require("fs");
const path = require("path");
const shortid = require("shortid");
const serverConfig_1 = require("../serverConfig");
const models_1 = require("../models");
const controllers_1 = require("../controllers");
class AppRouter {
    constructor(app) {
        this.Router = express_1.Router();
        this.App = app;
    }
    ensureSameOrigin() {
        return (req, res, next) => {
            const isExistSessionGeneralCookie = !!req.signedCookies[serverConfig_1.default.SESSION_COOKIE_NAME];
            if (req.method === "POST" || req.method === "DELETE" || req.method === "PATCH") {
                const HOST = req.get("host");
                const REFERER = req.get("referer");
                if (!isExistSessionGeneralCookie || !(REFERER.includes(HOST)) || !req.xhr) {
                    return res.status(403).end();
                }
            }
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
        };
    }
    securityMiddleware() {
        const { Router } = this;
        Router.use(this.ensureSameOrigin());
    }
    configureAppRoutes() {
        const { Router: router } = this;
        router.get("/", (...args) => {
            const res = args[1];
            return res.render("index", { title: "Express" });
        });
        router.get("/air-ticketing-and-reservation/", (...args) => {
            const res = args[1];
            res.render("services/air_ticketing_and_reservation");
        });
        router.get("/visa-assist/", (...args) => {
            const res = args[1];
            res.render("services/visa_assist");
        });
        router.get("/travel-insurance/", (...args) => {
            const res = args[1];
            res.render("services/travel_insurance");
        });
        router.get("/consular-services/", (...args) => {
            const res = args[1];
            res.render("services/consular_services");
        });
        router.get("/hotel-booking/", (...args) => {
            const res = args[1];
            res.render("services/world_wide_hotel_booking");
        });
        router.get("/group-travel/", (...args) => {
            const res = args[1];
            res.render("services/incentive_group_travel");
        });
        router.get("/honeymoon-packages/", (...args) => {
            const res = args[1];
            res.render("services/honeymoon_packages");
        });
        router.get("/family-packages/", (...args) => {
            const res = args[1];
            res.render("services/family_packages");
        });
        router.get("/holiday-packages/", (...args) => {
            const res = args[1];
            res.render("services/holiday_packages");
        });
        router.get("/pilgrimage-travel/", (...args) => {
            const res = args[1];
            res.render("services/pilgrimage_travel");
        });
        router.get("/services/", (...args) => {
            const res = args[1];
            res.setHeader("content-type", "application/json");
            fs.createReadStream(path.resolve(__dirname, "servicesModel.json")).pipe(res);
        });
        router.post("/order/", controllers_1.ordersController.addNewOrderController());
        router.delete("/order/", controllers_1.ordersController.deleteOrderController());
        router.get(["/login", "/dashboard", "/dashboard/*", "/registration"], (...args) => {
            const pathToExperimentalFile = path.resolve(__dirname, "../../admin/dist/index.html");
            const res = args[1];
            res.setHeader("content-type", "text/html");
            fs.createReadStream(pathToExperimentalFile).pipe(res);
        });
        router.get(["/*\.js", "/*\.map"], (req, res) => {
            const PATH_TO_FILES = path.resolve(__dirname, "../../admin/dist/", req.path.slice(1));
            fs.createReadStream(PATH_TO_FILES).pipe(res);
        });
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
        router.get("/api/download", [controllers_1.adminController.tokenValidatorController(true), controllers_1.fileUploaderController.downloadFileAsync]);
        router.get("/offers", controllers_1.offersImgsController.getOffers_JsonAPI);
        router.patch("/offers", controllers_1.offersImgsController.editSliderMeta_JsonAPI);
        router.patch("/offers/:fileid", [controllers_1.adminController.tokenValidatorController(true), controllers_1.offersImgsController.editOffersMeta_JsonAPI]);
        router.get("/api/sign-admin", (...args) => {
            const res = args[1];
            const req = args[0];
            controllers_1.adminController.signInController()(req, res);
        });
        router.get("/api/register-new-admin", (req, res) => {
            controllers_1.adminController.registerNewAdminController()(req, res);
        });
        router.get("/api/add-site-to-db", (...args) => {
            const res = args[1];
            controllers_1.adminController.recordToDB().then(() => res.send("Saved!")).catch(err => res.send(err.message));
        });
        router.get("/api/validate-tokens", (...args) => {
            const res = args[1];
            const req = args[0];
            const next = args[2];
            controllers_1.adminController.tokenValidatorController()(req, res, next);
        });
        router.get("/api/check-signin", (...args) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const res = args[1];
            const req = args[0];
            try {
                let payload = yield controllers_1.adminController.adminSingInAsync(req, res);
                console.log("payload= ", payload);
                if (!res.headersSent)
                    return res.send(payload);
            }
            catch (e) {
                return res.status(500).end(e.message);
            }
        }));
        router.get("/api/order", (...args) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const res = args[1];
            try {
                let RESULT = yield models_1.AdminModel.aggregate([
                    { $match: { name: "Dmitry" } },
                    {
                        $project: {
                            _id: false,
                            orders: {
                                $filter: {
                                    input: "$orders",
                                    as: "order",
                                    cond: { $lt: ["$$order.timestamp", Date.now()] }
                                }
                            }
                        }
                    },
                    {
                        $project: {
                            orders: {
                                $slice: ["$orders", -10]
                            }
                        }
                    }
                ])
                    .exec();
                let [orderField] = RESULT;
                const OUT = [];
                for (let end = orderField.orders.length - 1; end >= 0; end--) {
                    delete orderField.orders[end]._id;
                    OUT.push(orderField.orders[end]);
                }
                res.json(OUT);
            }
            catch (e) {
                res.send(e.message);
            }
        }));
        router.get("/api/order1", (...args) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const res = args[1];
            try {
                let RESULT = yield models_1.AdminModel.where("status", "admin")
                    .sort("ordersCount")
                    .limit(1)
                    .then(result => {
                    return result[0].update({ $inc: { ordersCount: 1 } }, { new: true });
                });
                res.json(RESULT);
            }
            catch (err) {
                res.send(err.message);
            }
        }));
        return router;
    }
}
exports.AppRouter = AppRouter;
