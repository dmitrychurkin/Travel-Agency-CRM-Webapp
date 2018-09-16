import { Request, Response } from "express";
import { JsonAPI } from "../services";
import Application from "../app";
import ServerConfig from "../serverConfig";
import { LandingPageModel } from "../models";

class KeyPeopleController {
    private _resourceFetcher() {
        const CACHE = Application.express.get("keyPeople");
        if (CACHE) {
            return Promise.resolve(CACHE);
        }
        return LandingPageModel.findById(ServerConfig.LANDING_PAGE_ID)
                        .select("keyPeople -_id")
                        .then(({ keyPeople }: any) => {
                            Application.express.set("keyPeople", keyPeople);
                            return keyPeople;
                        });
    }
    getKeyPeople_JsonAPI() {

        return (req: Request, res: Response) => {
            if (!JsonAPI.validateRequest(req, res)) {
                return;
            }
            this._resourceFetcher()
                .then(keyPeople => {
                    JsonAPI.sendData({
                        data: {
                            id: "1",
                            type: "key_people",
                            attributes: {
                                keyPeople
                            }
                        }
                    }, res);
                })
                .catch(() => res.status(500).end());
        };
    }

    updateKeyPeople_JsonAPI() {

        return (req: Request, res: Response) => {
            if (!JsonAPI.validateRequest(req, res)) {
                return;
            }
            if (req && req.body && req.body.data && req.body.data.attributes && req.body.data.attributes.keyPeople) {
                const{ keyPeople } = req.body.data.attributes;
                return LandingPageModel.findByIdAndUpdate(ServerConfig.LANDING_PAGE_ID, { $set: { keyPeople } }, { new: true, select: "keyPeople -_id" })
                                .then(({ keyPeople }: any) => {
                                    Application.express.set("keyPeople", keyPeople);
                                    return res.status(204).end();
                                })
                                .catch(() => res.status(500).end());
            }
            return res.status(403).end();
        };
    }
}

export const keyPeopleController = new KeyPeopleController();