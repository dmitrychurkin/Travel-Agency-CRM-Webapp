"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const fs = require("fs");
const path = require("path");
const controllers_1 = require("../controllers");
class AppRouter {
    constructor(app) {
        this.Router = express_1.Router();
        this.App = app;
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
        router.post("/order/", (req, res) => {
            console.log(req.body);
            if (req && req.body && req.body.ACTION === "REGISTER") {
                res.json({ info: "Your data has been sent, our agent will contact you.", reqId: "f4ydhsg53igfhfgs==" });
            }
        });
        router.delete("/order/", (req, res) => {
            console.log(req.body);
            if (req && req.body && req.body.ACTION === "CANCEL") {
                res.send("Your request successfully canceled.");
            }
        });
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
        router.get("/api/register/", (...args) => {
            const res = args[1];
            res.json({
                name: "Dmitry"
            });
        });
        router.post("/api/register/", (...args) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const res = args[1];
            if (!res.headersSent) {
                res.status(401).end();
            }
        }));
        router.get("/api/sign-admin", (...args) => {
            const res = args[1];
            const req = args[0];
            controllers_1.adminController.signInController(req, res);
        });
        router.get("/api/register-new-admin", (req, res) => {
            controllers_1.adminController.registerAdmin(req, res);
        });
        router.get("/api/add-site-to-db", (...args) => {
            const res = args[1];
            controllers_1.adminController.recordToDB().then(() => res.send("Saved!")).catch(err => res.send(err.message));
        });
        router.get("/api/validate-tokens", (...args) => {
            const res = args[1];
            const req = args[0];
            controllers_1.adminController.validate(req, res);
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
        router.get("/api/unique-name", (...args) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const res = args[1];
            try {
                yield controllers_1.adminController.verifyUniq("admin123", res);
            }
            catch (e) {
                res.send(e.message);
            }
        }));
        return this;
    }
}
exports.AppRouter = AppRouter;
