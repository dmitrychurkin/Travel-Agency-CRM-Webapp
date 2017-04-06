"use strict";
const tslib_1 = require("tslib");
const models_1 = require("../models");
const serverConfig_1 = require("../serverConfig");
const services_1 = require("../services");
const DefaultCookieOptions = {
    signed: true,
    httpOnly: true,
    sameSite: true
};
class AdminController {
    testAsyncRejection() {
        return services_1.tokenStorage()();
    }
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
    checkForNewComerAsync(...args) {
        const [, res] = args;
        const { userName, pass } = { userName: "admin123", pass: "Mirissa007" };
        let thenHandler = (result, isEditorHave) => {
            if (!res.headersSent && result) {
                res.cookie(serverConfig_1.default.ASSUMED_ADMIN_COOKIE_KEY, services_1.tokenStorage()(), DefaultCookieOptions);
                if (!isEditorHave) {
                    res.json({ r: true, canEdit: true });
                }
                else {
                    res.json({ r: true });
                }
                return 0;
            }
            return 1;
        };
        return new Promise((resolve, reject) => {
            models_1.SiteModel.findOne({ login: userName })
                .select("password passwordSalt isEditorHave")
                .lean()
                .exec((err, resultSet) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                console.log(resultSet);
                const { password: hash, passwordSalt, isEditorHave } = resultSet;
                services_1.comparePwdsAsync()(hash, passwordSalt, pass)
                    .then(result => resolve(thenHandler(result, isEditorHave)))
                    .catch(reject);
            });
        });
    }
    SaveRootAdminBackupCredentialsAsync(ReqBody) {
        const UpdateEditorGlobally = () => {
            return new Promise((resolve, reject) => {
                models_1.SiteModel.findOneAndUpdate({ isEditorHave: false }, { isEditorHave: true }, err => err ? reject(err) : resolve(0));
            });
        };
        let RootAdmin = Object.assign({}, ReqBody);
        if (RootAdmin && RootAdmin.role === "E") {
            return Promise.all([
                services_1.writeFileAsync(serverConfig_1.default.BACK_UP_FILE_NAME, JSON.stringify(RootAdmin)),
                UpdateEditorGlobally()
            ]);
        }
        return Promise.resolve(0);
    }
    checkUniqueNameAsync(userName) {
        return models_1.AdminModel.count({ name: userName }).exec();
    }
    registerAdmin(res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ReqBody = {
                userName: "Dmitry",
                pass: "12345",
                role: "E"
            };
            const { userName, pass, role } = ReqBody;
            let RESULT = null;
            try {
                const sameNameCount = yield this.checkUniqueNameAsync(userName);
                if (sameNameCount !== 0) {
                    return res.status(403).end();
                }
                let passwordSalt = null;
                const asyncArray = yield Promise.all([
                    this.SaveRootAdminBackupCredentialsAsync(ReqBody),
                    services_1.generateRandStrAsync().then(salt => {
                        passwordSalt = salt;
                        return services_1.encryptPwdAsync(pass, salt.toString());
                    })
                ]);
                const [, passwordHash] = asyncArray;
                RESULT = yield new models_1.AdminModel({
                    name: userName,
                    password: passwordHash,
                    passwordSalt,
                    role
                }).save();
            }
            catch (e) {
                return res.status(500).end(e.message);
            }
            res.json(JSON.stringify(RESULT));
            return RESULT;
        });
    }
}
const adminController = new AdminController();
exports.adminController = adminController;
