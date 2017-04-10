import { Request, Response } from "express";
import * as mongoose from "mongoose";
// import * as fs from "fs";
import * as HashIds from "hashids";
import { AdminModel, SiteModel } from "../models";
import ServerConfig from "../serverConfig";
import {
    readFileAsync,
    encryptPwdAsync,
    generateRandStrAsync,
    comparePwdsAsync,
    tokenStorage,
    writeFileAsync,
    issueTokenJWTAsync,
    verifyTokenJWTAsync,
    decodeTokenJWTSync } from "../services";
import { /*TokenValidationError,*/ AuthenticationError, RegistrationError } from "../errors";
import {
    IRegistrationAdminInfo,
    // IVerifyPayloadJWT,
    // IIssuedPayloadJWT,
    IDocOnAdminSingin,
    IDocOnAdminRegister } from "../interfaces";

const DefaultCookieOptions = {
    signed: true,
    httpOnly: true,
    sameSite: true
};
class AdminController {
    private inMemoryStorage = new Map<string, number>();

/** This helpers ony for debag */
   async recordToDB() {
        let adminCredentialsString = await readFileAsync("credentialsForAdminRegistration.json");
        let { login, password } = JSON.parse(adminCredentialsString.toString());
        let salt = "6267697b9df59c89f317d37f372eeddd71de9460788cd1277f13e379c83c92bd6bf4f80637552487d73303450ef44d50"; // await generateRandStrAsync();
        let hash = await encryptPwdAsync(password, salt.toString());

        return new SiteModel({
            _id: ServerConfig.SITE_ID,
            login,
            password: hash,
            passwordSalt: salt.toString()
        }).save((err, product, numAffected) => {
            if (err) console.log(err);
            console.log("Admin Credentils is ", product);
            console.log("Status code ", numAffected);
        });

    }
/**end debag helpers */

    private cancelTimer(uuidToken: string): boolean {
        if (uuidToken && this.inMemoryStorage.has(uuidToken)) {
            console.log("checkForNewComerAsync : uuidToken && this.inMemoryStorage.has(uuidToken)");
            let timerId = this.inMemoryStorage.get(uuidToken);
            timerId && clearTimeout(timerId);
            this.inMemoryStorage.delete(uuidToken);
            return true;
        }
        return false;
    }
    adminSingInAsync(req: Request, res: Response) {
        // const { userName } = req.body;
        // debag
        const ReqBody = { userName: "admin123", pass: "Mirissa007" };
        // const ReqBody = { userName: "Dmitry", pass: "12345" };
        const uuidToken = req && req.signedCookies[ServerConfig.ASSUMED_ADMIN_COOKIE_KEY];
        this.cancelTimer(uuidToken);


        let ADMIN_DOC: mongoose.Document;
        let SESSION_TOKEN: string;
        let JWT: string;
        let _id: string;
        let hash;
        let passwordSalt;
        let name: string;
        return this.checkUnMatchWithSiteLoginAsync(ReqBody.userName)
                        .then(() => AdminModel.findOne({ name: ReqBody.userName })
                                               .select("password passwordSalt name")
                         )
                        .then((admin: mongoose.Document & IDocOnAdminSingin) => {
                            if (!admin) throw new AuthenticationError("No such user");
                           ({ password: hash, passwordSalt, _id, name } = ADMIN_DOC = admin);
                           return comparePwdsAsync()(hash, passwordSalt, ReqBody.pass);
                        })
                        .then(ComparedResult => {
                            if (ComparedResult) {
                                SESSION_TOKEN = new HashIds(ServerConfig.HASHIDS_SALT).encodeHex(_id);
                                return issueTokenJWTAsync({ subject: SESSION_TOKEN });
                            }
                            throw new AuthenticationError("Wrong password");
                        })
                        .then(jwt => {
                            JWT = <string>jwt;
                            return ADMIN_DOC.update({ jwt });
                        })
                        .then(() => {
                            if (!res.headersSent) {
                                res.clearCookie(ServerConfig.ASSUMED_ADMIN_COOKIE_KEY, {path: "/"})
                                    .cookie(
                                        ServerConfig.SESSION_TOKEN_NAME,
                                        SESSION_TOKEN,
                                        DefaultCookieOptions
                                    )
                                    .cookie(
                                        ServerConfig.COOKIE_JWT_NAME,
                                        JWT,
                                            // TODO provide apropriate max age
                                        DefaultCookieOptions
                                    )
                                    .json({
                                        name
                                    });
                            }
                        });
    }
    private checkForNewComerAsync(req: Request, res: Response): Promise<boolean> {
        // const[req, res] = args;
        // debag
        const ReqBody = { userName: "admin123", pass: "Mirissa007" };
       // const ReqBody = { userName: "Dmitry", pass: "12345" };
        const { userName, pass } = ReqBody; // req.body;
        const uuidToken = req && req.signedCookies[ServerConfig.ASSUMED_ADMIN_COOKIE_KEY];
        let thenHandler = (result: boolean, isEditorHave: boolean) => {
                if (!res.headersSent && result) {
                    res.cookie(
                        ServerConfig.ASSUMED_ADMIN_COOKIE_KEY,
                        tokenStorage(this.inMemoryStorage, { ttl: 20000 })(),
                        DefaultCookieOptions);
                    if (!isEditorHave) {
                        res.json({r: true, canEdit: true});
                    }else {
                        res.json({r: true});
                    }
                    return 0;
                }
            return 1;
        };
        this.cancelTimer(uuidToken);
        return SiteModel.findById(ServerConfig.SITE_ID)
                    .select("login password passwordSalt isEditorHave")
                    .then((resultSet: mongoose.Document & { login: string, password: string, passwordSalt: string, isEditorHave: boolean }) => {
                        const{ password : hash, passwordSalt, isEditorHave, login } = resultSet;
                        if (login !== userName) return false;
                        return comparePwdsAsync()(hash, passwordSalt, pass)
                                .then(result => thenHandler(result, isEditorHave));
                    });
    }
    async signInController(req: Request, res: Response) {
        try {
            for (let promise of [this.adminSingInAsync(req, res), this.checkForNewComerAsync(req, res)]) {
                await promise.catch(err => console.log(err.message));
            }
            if (!res.headersSent) {
                res.status(401).end();
            }
        }catch (e) {
            if (!res.headersSent) {
                res.status(500).end(e.message);
            }else {
                console.log("Error from signInController ", e.message);
            }
        }
    }
    private SaveRootAdminBackupCredentialsAsync(ReqBody: IRegistrationAdminInfo): Promise<number[] | number> {
        const UpdateEditorGlobally = () => SiteModel.findByIdAndUpdate( ServerConfig.SITE_ID, { isEditorHave: true }).then(() => 0);

        let RootAdmin = Object.assign({}, ReqBody);
        if ( RootAdmin && RootAdmin.role === "E" ) {
            return Promise.all<number>([
                writeFileAsync(ServerConfig.BACK_UP_FILE_NAME, JSON.stringify(RootAdmin)),
                UpdateEditorGlobally()
            ]);
        }
        return Promise.resolve(0);
    }
    private checkUniqueNameAsync(userName: string) {
        return AdminModel.count({ name: userName })
                            .then(count => {
                                if (count !== 0) throw new RegistrationError("Name must to be unique");
                                return 0;
                            });
    }
    private checkUnMatchWithSiteLoginAsync(userName: string) {
        return readFileAsync(ServerConfig.BACK_UP_CREDENTIALS_FOR_ADMIN_REGISTRATION)
                        .then((result: any) => {
                            if (JSON.parse(result).login === userName) {
                                throw new RegistrationError("User name must to be unique!");
                            }
                            return 0;
                        });
    }
    verifyUniq(userName: string, res?: Response) {
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
                        if (err instanceof RegistrationError) {
                            return res.status(403).end(err.message);
                        }
                        return res.status(500).end(err.message);
                    }
                    throw err;
                });
    }
    registerAdmin(req: Request, res: Response) {
        // debag
        const ReqBody: IRegistrationAdminInfo = {
            userName: "Dmitry",
            pass: "12345",
            role: "E"
        };
        const uuidToken = req && req.signedCookies[ServerConfig.ASSUMED_ADMIN_COOKIE_KEY];
        if (!this.cancelTimer(uuidToken)) {
            return res
                    .clearCookie(ServerConfig.ASSUMED_ADMIN_COOKIE_KEY)
                    .status(403)
                    .end();
        }
        const{ userName, pass, role } = ReqBody;
        let _id: mongoose.Types.ObjectId;
        let HASHED_ID: string;
        let jwt: string;
        let passwordSalt: string;
        let passwordHash: string;
        return this.verifyUniq(userName)
                .then(() => {
                    _id = new mongoose.Types.ObjectId;
                    HASHED_ID = new HashIds(ServerConfig.HASHIDS_SALT).encodeHex(_id.toString());
                    return Promise.all([
                        this.SaveRootAdminBackupCredentialsAsync(ReqBody),
                        generateRandStrAsync().then(salt => {
                            passwordSalt = salt.toString();
                            return encryptPwdAsync(pass, passwordSalt);
                        }),
                        issueTokenJWTAsync({ subject: HASHED_ID })
                    ]);
                })
                .then((resultArray: [number, string, string]) => {
                    [, passwordHash, jwt ] = resultArray;
                    return new AdminModel({
                        _id,
                        name: userName,
                        password: passwordHash,
                        passwordSalt,
                        role,
                        siteRef: ServerConfig.SITE_ID
                    }).save();
                })
                .then((adminDoc: mongoose.Document & IDocOnAdminRegister) =>
                            res.clearCookie(ServerConfig.ASSUMED_ADMIN_COOKIE_KEY)
                                .cookie(
                                    ServerConfig.SESSION_TOKEN_NAME,
                                    HASHED_ID,
                                    DefaultCookieOptions
                                )
                                .cookie(
                                    ServerConfig.COOKIE_JWT_NAME,
                                    jwt,
                                    // TODO provide apropriate max age
                                    DefaultCookieOptions
                                )
                                .json({ name: adminDoc.name }) )
                .catch(err => {
                    if (err instanceof RegistrationError) {
                        return res.status(403).end(err.message);
                    }
                    return res.status(500).end(err.message);
                });
    }
    validate(req: Request, res: Response) {
        const{ _xt, _st } = req.signedCookies;
        let expireTimeHelper = (err: any, sessToken: string) => {
            if (err.name === "TokenExpiredError") {
                return updateJwt(sessToken);
            }
            throw err;
        };
        let updateJwt = (sessToken: string) => {
            return issueTokenJWTAsync({ subject: sessToken })
                        .then(jwt =>
                            res.cookie(ServerConfig.COOKIE_JWT_NAME, jwt, /* TODO provide apropriate max age*/ DefaultCookieOptions)
                                .cookie(ServerConfig.SESSION_TOKEN_NAME, sessToken, DefaultCookieOptions)
                                .end(jwt));
        };
        let PromiseResult = null;
        switch (true) {
                case ( _xt !== undefined && _st !== undefined ): {
                   PromiseResult = verifyTokenJWTAsync(_xt, { subject: _st })
                                            .then(rawResult => res.json(rawResult))
                                            .catch(err => expireTimeHelper(err, _st));
                   break;
                }
                case ( _xt === undefined && _st !== undefined ): {
                    PromiseResult = updateJwt(_st);
                    break;
                }
                case ( _xt !== undefined && _st === undefined ): {
                    const sessToken = decodeTokenJWTSync(_xt).payload.sub;
                    PromiseResult = verifyTokenJWTAsync(_xt, { subject: sessToken })
                                            .then(rawResult => res
                                                                .cookie(ServerConfig.SESSION_TOKEN_NAME, sessToken, DefaultCookieOptions)
                                                                .json(rawResult)
                                            )
                                            .catch(err => expireTimeHelper(err, sessToken));
                    break;
                }
                default: {
                    return res.status(401).end();
                }
        }
        PromiseResult && PromiseResult.catch(err => res.status(401).end(err.message));
    }
}
const adminController = new AdminController();
export {adminController};