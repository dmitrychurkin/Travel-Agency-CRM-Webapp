"use strict";
const express_1 = require("express");
const router = express_1.Router(), Services = require("./services.json");
router.get("/air-ticketing-and-reservation/", (...args) => {
    const res = args[1];
    res.render("services/air_ticketing_and_reservation");
});
router.get("/services/", (...args) => {
    const res = args[1];
    res.json(Services);
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
