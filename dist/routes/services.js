"use strict";
const express_1 = require("express");
const fs = require("fs");
const path = require("path");
const router = express_1.Router();
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
