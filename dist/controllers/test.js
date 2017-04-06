"use strict";
const tslib_1 = require("tslib");
const fs = require("fs");
const models_1 = require("../models");
const serverConfig_1 = require("../serverConfig");
const services_1 = require("../services");
class AdminController {
    recordToDB() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let adminCredentialsString = yield services_1.readFileAsync("credentialsForAdminRegistration.json");
            let { login, password } = JSON.parse(adminCredentialsString.toString());
            let salt = yield services_1.generateRandStrAsync();
            let hash = yield services_1.encryptPwdAsync(password, salt.toString());
            return new models_1.SiteModel({
                login,
                password: hash,
                passwordSalt: salt.toString()
            }).save((err, product, numAffected) => {
                if (err)
                    console.log(err);
                console.log("Admin Credentils is ", product);
                console.log("Status code ", numAffected);
            });
        });
    }
    comparePasswords() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let adminCredentialsString = yield services_1.readFileAsync("credentialsForAdminRegistration.json");
            let { password, passwordSalt } = JSON.parse(adminCredentialsString.toString());
            let hash = yield services_1.encryptPwdAsync(password, passwordSalt);
            return hash;
        });
    }
    checkAdminSingInAsync(req, res) {
        const { userName } = req.body;
        return new Promise((resolve, reject) => {
            models_1.AdminModel.findOne({ login: userName }, (err, admin) => {
                if (err) {
                    reject();
                }
                else {
                    if (admin) {
                        console.log("res.headersSent ", res.headersSent);
                        if (!res.headersSent) {
                            res.json({ name: "Anonim" });
                        }
                        resolve();
                    }
                    else {
                        reject();
                    }
                }
            });
        });
    }
    checkForNewComerAsync(req, res) {
        const { userName, pass } = req.body;
        let matcher = (login, password) => {
            if (login === userName && password === pass) {
                if (!res.headersSent) {
                    res.json({ r: true, canEdit: true });
                }
                return true;
            }
            return false;
        };
        return new Promise((resolve, reject) => {
            fs.readFile("adminCredentials.json", "utf8", (err, data) => {
                let result = null;
                if (err && err.code === "ENOENT") {
                    const { login, password } = serverConfig_1.default.DEFAULT_CREDENTIALS;
                    result = matcher(login, password);
                }
                else {
                    if (data) {
                        let parsedData = JSON.parse(data);
                        const { login, password } = parsedData;
                        result = matcher(login, password);
                    }
                }
                result ? resolve() : reject();
            });
        });
    }
}
const adminController = new AdminController();
exports.adminController = adminController;
