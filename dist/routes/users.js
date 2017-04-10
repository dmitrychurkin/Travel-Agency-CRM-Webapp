"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.get("/", (...args) => {
    const res = args[1];
    res.send("respond with a resource");
});
exports.default = router;
