import { Request, Response } from "express";
// import * as fs from "fs";
import { AdminModel, SiteModel } from "../models";
import ServerConfig from "../serverConfig";
import {
    readFileAsync,
    encryptPwdAsync,
    generateRandStrAsync,
    comparePwdsAsync,
    tokenStorage,
    writeFileAsync } from "../services";
import { IRegistrationAdminInfo } from "../interfaces";

const DefaultCookieOptions = {
    signed: true,
    httpOnly: true,
    sameSite: true
};
class AdminController {
/** This helpers ony for debag */
    testAsyncRejection() {
        return tokenStorage()();
    }
   async recordToDB() {
        let adminCredentialsString = await readFileAsync("credentialsForAdminRegistration.json");
        let { login, password } = JSON.parse(adminCredentialsString.toString());
        let salt = await generateRandStrAsync();
        let hash = await encryptPwdAsync(password, salt.toString());

        return new SiteModel({
            login,
            password: hash,
            passwordSalt: salt.toString()
        }).save((err, product, numAffected) => {
            if (err) console.log(err);
            console.log("Admin Credentils is ", product);
            console.log("Status code ", numAffected);
        });

    }
    async comparePasswords() {
        let adminCredentialsString = await readFileAsync("credentialsForAdminRegistration.json");
        let { password, passwordSalt } = JSON.parse(adminCredentialsString.toString());
        let hash = await encryptPwdAsync(password, passwordSalt);
        return hash;
    }
/**end debag helpers */

    checkAdminSingInAsync(req: Request, res: Response) {
        const { userName } = req.body;
        return new Promise((resolve, reject) => {
            AdminModel.findOne({ login: userName }, (err, admin) => {
                if (err) {
                    reject();
                }else {
                    if (admin) {
                        console.log("res.headersSent ", res.headersSent);
                        if (!res.headersSent) {
                            res.json({name: "Anonim"});
                        }
                        resolve();
                    }else {
                        reject();
                    }

                }
            });
        });
    }
    checkForNewComerAsync(...args: Array<any>): Promise<boolean> {
        const[, res] = args;
        const { userName, pass } = { userName: "admin123", pass: "Mirissa007" }; // req.body;
        let thenHandler = (result: boolean, isEditorHave: boolean) => {
                if (!res.headersSent && result) {
                    res.cookie(
                        ServerConfig.ASSUMED_ADMIN_COOKIE_KEY,
                        tokenStorage()(),
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
        return new Promise((resolve, reject) => {
            SiteModel.findOne({ login: userName })
                    .select("password passwordSalt isEditorHave")
                    .lean()
                    .exec((err, resultSet: { password: string, passwordSalt: string, isEditorHave: boolean }) => {
                        if (err) {
                            console.log(err);
                            return reject(err);
                        }
                        console.log(resultSet);
                        const{ password : hash, passwordSalt, isEditorHave} = resultSet;
                        comparePwdsAsync()(hash, passwordSalt, pass)
                                .then(result => resolve( thenHandler(result, isEditorHave) ))
                                .catch(reject);
                    });
        });
    }
    SaveRootAdminBackupCredentialsAsync(ReqBody: IRegistrationAdminInfo) {
        const UpdateEditorGlobally = () => {
            return new Promise((resolve, reject) => {
                SiteModel.findOneAndUpdate(
                    { isEditorHave: false },
                    { isEditorHave: true }, err => err ? reject(err) : resolve(0)
                );
            });
        };
        let RootAdmin = Object.assign({}, ReqBody);
        if ( RootAdmin && RootAdmin.role === "E" ) {
            return Promise.all([
                writeFileAsync(ServerConfig.BACK_UP_FILE_NAME, JSON.stringify(RootAdmin)),
                UpdateEditorGlobally()
            ]);
        }
        return Promise.resolve(0);
    }
    checkUniqueNameAsync(userName: string) {
        return AdminModel.count({ name: userName }).exec();
    }
    async registerAdmin(/*req: Request*/ res: Response) {
        // debag
        const ReqBody: IRegistrationAdminInfo = {
            userName: "Dmitry",
            pass: "12345",
            role: "E"
        };
        const{ userName, pass, role } = ReqBody;
        let RESULT = null;
        try {
            const sameNameCount = await this.checkUniqueNameAsync(userName);
            if (sameNameCount !== 0) {
                return res.status(403).end();
            }
            let passwordSalt = null;
            const asyncArray = await Promise.all([
                this.SaveRootAdminBackupCredentialsAsync(ReqBody),
                generateRandStrAsync().then(salt => {
                    passwordSalt = salt;
                    return encryptPwdAsync(pass, salt.toString());
                })
            ]);

            const[, passwordHash] = asyncArray;

            RESULT = await new AdminModel({
                name: userName,
                password: passwordHash,
                passwordSalt,
                role
            }).save();

        }catch (e) {
            return res.status(500).end(e.message);
        }
        res.json(JSON.stringify(RESULT));
        return RESULT;
    }
}
const adminController = new AdminController();
export {adminController};