"use strict";
const express_1 = require("express");
const router = express_1.Router();
router.get("/", (...args) => {
    const res = args[1];
    return res.render("index", { title: "Express" });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
