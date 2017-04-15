"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose = require("mongoose");
const HashIds = require("hashids");
const models_1 = require("../models");
const serverConfig_1 = require("../serverConfig");
const services_1 = require("../services");
const errors_1 = require("../errors");
class AdminController {
    constructor() {
        this.inMemoryStorage = new Map();
        this.isMessage = process.env.NODE_ENV === "development";
    }
    recordToDB() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let adminCredentialsString = yield services_1.readFileAsync("credentialsForAdminRegistration.json");
            let { login, password } = JSON.parse(adminCredentialsString.toString());
            let salt = "6267697b9df59c89f317d37f372eeddd71de9460788cd1277f13e379c83c92bd6bf4f80637552487d73303450ef44d50";
            let hash = yield services_1.encryptPwdAsync(password, salt.toString());
            return new models_1.SiteModel({
                _id: serverConfig_1.default.SITE_ID,
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
    cancelTimer(uuidToken) {
        if (uuidToken && this.inMemoryStorage.has(uuidToken)) {
            console.log("checkForNewComerAsync : uuidToken && this.inMemoryStorage.has(uuidToken)");
            let timerId = this.inMemoryStorage.get(uuidToken);
            timerId && clearTimeout(timerId);
            this.inMemoryStorage.delete(uuidToken);
            return true;
        }
        return false;
    }
    adminSignOutSync(...args) {
        const res = args[1];
        let config = { path: "/" };
        res.clearCookie(serverConfig_1.default.SESSION_TOKEN_NAME, config)
            .clearCookie(serverConfig_1.default.COOKIE_JWT_NAME, config)
            .end();
    }
    adminSingInAsync(req, res) {
        const { userName, pass } = req.body;
        const uuidToken = req && req.signedCookies[serverConfig_1.default.ASSUMED_ADMIN_COOKIE_KEY];
        this.cancelTimer(uuidToken);
        let ADMIN_DOC;
        let SESSION_TOKEN;
        let JWT;
        let _id;
        let hash;
        let role;
        let passwordSalt;
        let name;
        return this.checkUnMatchWithSiteLoginAsync(userName)
            .then(() => models_1.AdminModel.findOne({ name: userName })
            .select("password passwordSalt name role"))
            .then((admin) => {
            if (!admin)
                throw new errors_1.AuthenticationError("No such user");
            ({ password: hash, passwordSalt, _id, name, role } = ADMIN_DOC = admin);
            return services_1.comparePwdsAsync()(hash, passwordSalt, pass);
        })
            .then(ComparedResult => {
            if (ComparedResult) {
                SESSION_TOKEN = new HashIds(serverConfig_1.default.HASHIDS_SALT).encodeHex(_id);
                return services_1.issueTokenJWTAsync({ subject: SESSION_TOKEN });
            }
            throw new errors_1.AuthenticationError("Wrong password");
        })
            .then(jwt => {
            JWT = jwt;
            return ADMIN_DOC.update({ jwt });
        })
            .then(() => {
            if (!res.headersSent) {
                const adminData = role === "E" ? { name, id: SESSION_TOKEN, role } : { name, id: SESSION_TOKEN };
                const sessOpts = req.secure ? {
                    signed: true,
                    httpOnly: true,
                    sameSite: true,
                    secure: true
                } : services_1.basicCookieSessOptions;
                const jwtOpts = req.secure ? {
                    signed: true,
                    httpOnly: true,
                    sameSite: true,
                    secure: true,
                    maxAge: serverConfig_1.default.JWT_MAX_AGE
                } : services_1.basicCookieJwtOptions;
                res.clearCookie(serverConfig_1.default.ASSUMED_ADMIN_COOKIE_KEY, { path: "/" })
                    .cookie(serverConfig_1.default.SESSION_TOKEN_NAME, SESSION_TOKEN, sessOpts)
                    .cookie(serverConfig_1.default.COOKIE_JWT_NAME, JWT, jwtOpts)
                    .json(adminData);
            }
        });
    }
    checkForNewComerAsync(req, res) {
        const { userName, pass } = req.body;
        const uuidToken = req && req.signedCookies[serverConfig_1.default.ASSUMED_ADMIN_COOKIE_KEY];
        let thenHandler = (result, isEditorHave) => {
            if (!res.headersSent && result) {
                const CookieOpts = req.secure ? {
                    signed: true,
                    httpOnly: true,
                    sameSite: true,
                    secure: true,
                    maxAge: serverConfig_1.default.TTL + 1000
                } : {
                    signed: true,
                    httpOnly: true,
                    sameSite: true,
                    maxAge: serverConfig_1.default.TTL + 1000
                };
                res.cookie(serverConfig_1.default.ASSUMED_ADMIN_COOKIE_KEY, services_1.tokenStorage(this.inMemoryStorage, { ttl: serverConfig_1.default.TTL })(), CookieOpts);
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
        this.cancelTimer(uuidToken);
        return models_1.SiteModel.findById(serverConfig_1.default.SITE_ID)
            .select("login password passwordSalt isEditorHave")
            .then((resultSet) => {
            const { password: hash, passwordSalt, isEditorHave, login } = resultSet;
            if (login !== userName)
                return false;
            return services_1.comparePwdsAsync()(hash, passwordSalt, pass)
                .then(result => thenHandler(result, isEditorHave));
        });
    }
    signInController() {
        return (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                for (let promise of [this.adminSingInAsync(req, res), this.checkForNewComerAsync(req, res)]) {
                    yield promise.catch(err => console.log(err.message));
                }
                if (!res.headersSent) {
                    res.status(401).end();
                }
            }
            catch (e) {
                if (!res.headersSent) {
                    res.status(500).end(this.isMessage ? e.message : null);
                }
                else {
                    console.log("Error from signInController ", e.message);
                }
            }
        });
    }
    SaveRootAdminBackupCredentialsAsync(ReqBody) {
        const UpdateEditorGlobally = () => models_1.SiteModel.findByIdAndUpdate(serverConfig_1.default.SITE_ID, { isEditorHave: true }).then(() => 0);
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
        return models_1.AdminModel.count({ name: userName })
            .then(count => {
            if (count !== 0)
                throw new errors_1.RegistrationError("Name must to be unique");
            return 0;
        });
    }
    checkUnMatchWithSiteLoginAsync(userName) {
        return services_1.readFileAsync(serverConfig_1.default.BACK_UP_CREDENTIALS_FOR_ADMIN_REGISTRATION)
            .then((result) => {
            if (JSON.parse(result).login === userName) {
                throw new errors_1.RegistrationError("User name must to be unique!");
            }
            return 0;
        });
    }
    verifyUniqAsync(userName, res) {
        return Promise.all([
            this.checkUnMatchWithSiteLoginAsync(userName),
            this.checkUniqueNameAsync(userName)
        ])
            .then(result => {
            if (res) {
                return res.send(JSON.stringify(result));
            }
            return result;
        })
            .catch(err => {
            if (res) {
                if (err instanceof errors_1.RegistrationError) {
                    return res.status(403).end(this.isMessage ? err.message : null);
                }
                return res.status(500).end(this.isMessage ? err.message : null);
            }
            throw err;
        });
    }
    registerNewAdminController(isSendForbiden = true) {
        return (req, res) => {
            const ReqBody = req.body;
            const { userName, pass, role } = ReqBody;
            const uuidToken = req && req.signedCookies[serverConfig_1.default.ASSUMED_ADMIN_COOKIE_KEY];
            if (!uuidToken || !(userName && pass && role)) {
                return res
                    .clearCookie(serverConfig_1.default.ASSUMED_ADMIN_COOKIE_KEY)
                    .status(403)
                    .json({ expired: true });
            }
            let _id;
            let HASHED_ID;
            let jwt;
            let passwordSalt;
            let passwordHash;
            let adminData;
            return this.verifyUniqAsync(userName)
                .then(() => {
                this.cancelTimer(uuidToken);
                _id = new mongoose.Types.ObjectId;
                HASHED_ID = new HashIds(serverConfig_1.default.HASHIDS_SALT).encodeHex(_id.toString());
                adminData = role === "E" ? { name: userName, id: HASHED_ID, role } : { name: userName, id: HASHED_ID };
                return Promise.all([
                    this.SaveRootAdminBackupCredentialsAsync(ReqBody),
                    services_1.generateRandStrAsync().then(salt => {
                        passwordSalt = salt.toString();
                        return services_1.encryptPwdAsync(pass, passwordSalt);
                    }),
                    services_1.issueTokenJWTAsync({ subject: HASHED_ID })
                ]);
            })
                .then((resultArray) => {
                [, passwordHash, jwt] = resultArray;
                return new models_1.AdminModel({
                    _id,
                    name: userName,
                    password: passwordHash,
                    passwordSalt,
                    role,
                    siteRef: serverConfig_1.default.SITE_ID
                }).save();
            })
                .then(() => {
                const sessOpts = req.secure ? {
                    signed: true,
                    httpOnly: true,
                    sameSite: true,
                    secure: true
                } : services_1.basicCookieSessOptions;
                const jwtOpts = req.secure ? {
                    signed: true,
                    httpOnly: true,
                    sameSite: true,
                    secure: true,
                    maxAge: serverConfig_1.default.JWT_MAX_AGE
                } : services_1.basicCookieJwtOptions;
                res.clearCookie(serverConfig_1.default.ASSUMED_ADMIN_COOKIE_KEY)
                    .cookie(serverConfig_1.default.SESSION_TOKEN_NAME, HASHED_ID, sessOpts)
                    .cookie(serverConfig_1.default.COOKIE_JWT_NAME, jwt, jwtOpts)
                    .json(adminData);
            })
                .catch(err => {
                if (err instanceof errors_1.RegistrationError) {
                    return isSendForbiden ? res.status(403).end(this.isMessage ? err.message : null) : res.status(403).json({ exists: true });
                }
                return res.status(500).end(this.isMessage ? err.message : null);
            });
        };
    }
    tokenValidatorController(isMiddleware = false) {
        return (req, res, next) => {
            const { _xt, _st } = req.signedCookies;
            let expireTimeHelper = (err, sessToken) => {
                if (err.name === "TokenExpiredError") {
                    return updateJwt(sessToken);
                }
                throw err;
            };
            let updateJwt = (sessToken) => {
                return services_1.issueTokenJWTAsync({ subject: sessToken })
                    .then(jwt => {
                    const sessOpts = req.secure ? {
                        signed: true,
                        httpOnly: true,
                        sameSite: true,
                        secure: true
                    } : services_1.basicCookieSessOptions;
                    const jwtOpts = req.secure ? {
                        signed: true,
                        httpOnly: true,
                        sameSite: true,
                        secure: true,
                        maxAge: serverConfig_1.default.JWT_MAX_AGE
                    } : services_1.basicCookieJwtOptions;
                    !isMiddleware ? res.cookie(serverConfig_1.default.COOKIE_JWT_NAME, jwt, jwtOpts)
                        .cookie(serverConfig_1.default.SESSION_TOKEN_NAME, sessToken, sessOpts)
                        .end() : next();
                });
            };
            let PromiseResult = null;
            switch (true) {
                case (_xt !== undefined && _st !== undefined): {
                    PromiseResult = services_1.verifyTokenJWTAsync(_xt, { subject: _st })
                        .then(() => !isMiddleware ? res.end() : next())
                        .catch(err => expireTimeHelper(err, _st));
                    break;
                }
                case (_xt === undefined && _st !== undefined): {
                    PromiseResult = updateJwt(_st);
                    break;
                }
                case (_xt !== undefined && _st === undefined): {
                    const sessToken = services_1.decodeTokenJWTSync(_xt).payload.sub;
                    PromiseResult = services_1.verifyTokenJWTAsync(_xt, { subject: sessToken })
                        .then(() => {
                        const sessOpts = req.secure ? {
                            signed: true,
                            httpOnly: true,
                            sameSite: true,
                            secure: true
                        } : services_1.basicCookieSessOptions;
                        !isMiddleware ? res.cookie(serverConfig_1.default.SESSION_TOKEN_NAME, sessToken, sessOpts)
                            .end() : next();
                    })
                        .catch(err => expireTimeHelper(err, sessToken));
                    break;
                }
                default: {
                    return res.status(401).end();
                }
            }
            PromiseResult && PromiseResult.catch(err => res.status(401).end(this.isMessage ? err.message : null));
        };
    }
    getAdminInfoController() {
        return (req, res) => {
            const { _st } = req.signedCookies;
            if (!_st) {
                return res.status(403).end();
            }
            const decodedSt = new HashIds(serverConfig_1.default.HASHIDS_SALT).decodeHex(_st);
            return models_1.AdminModel.findById(decodedSt)
                .select("name role")
                .then((admin) => {
                if (admin && admin.name) {
                    return res.json({ name: admin.name, id: _st, role: admin.role });
                }
                throw new errors_1.ApplicationError("Admin with this id doesn't exists!");
            })
                .catch(() => res.status(403).end());
        };
    }
}
const adminController = new AdminController();
exports.adminController = adminController;
