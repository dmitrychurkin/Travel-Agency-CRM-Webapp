import { Request, Response } from "express";
import * as fs from "fs";
import { AdminModel, SiteModel } from "../models";
import ServerConfig from "../serverConfig";
import { readFileAsync, encryptPwdAsync, generateRandStrAsync } from "../services";

class AdminController {
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
    checkForNewComerAsync(req: Request, res: Response) {
        const { userName, pass } = req.body;
        let matcher = (login: string, password: string) => {
            if ( login === userName && password === pass ) {
                if (!res.headersSent) {
                    res.json({r: true, canEdit: true});
                }
                return true;
            }
            return false;
        };
        return new Promise((resolve, reject) => {
            fs.readFile("adminCredentials.json", "utf8", (err, data) => {
                let result = null;
                if (err && err.code === "ENOENT") {
                    const { login, password } = ServerConfig.DEFAULT_CREDENTIALS;
                    result = matcher(login, password);
                }else {
                    if ( data ) {
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
export {adminController};