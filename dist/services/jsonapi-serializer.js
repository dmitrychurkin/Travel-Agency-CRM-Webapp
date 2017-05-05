"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
;
var JsonAPI;
(function (JsonAPI) {
    function serializeDATA(DATA) {
        return JSON.stringify(DATA);
    }
    function setHeader(res) {
        res.set("Content-Type", "application/vnd.api+json");
        return res;
    }
    function validateRequest(req, res) {
        const MEDIA_TYPE = "application/vnd.api+json";
        if (req.get("Content-Type") && req.get("Content-Type") !== MEDIA_TYPE) {
            res.status(415).end();
            return false;
        }
        if (req.get("Accept") && req.get("Accept") !== MEDIA_TYPE) {
            res.status(406).end();
            return false;
        }
        return true;
    }
    JsonAPI.validateRequest = validateRequest;
    function sendData(DATA, res) {
        setHeader(res)
            .send(serializeDATA(DATA));
    }
    JsonAPI.sendData = sendData;
})(JsonAPI = exports.JsonAPI || (exports.JsonAPI = {}));
