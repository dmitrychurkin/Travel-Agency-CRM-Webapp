import { Request, Response } from "express";
import { JsonAPI } from "../services";
import { SiteModel } from "../models";
import ServerConfig from "../serverConfig";
import { Application } from "../app";


class SiteContactsController {
    private _contactsFetcher() {
        const CACHE = Application.express.get("siteContacts");
        if (CACHE) {
            return Promise.resolve(CACHE);
        }
        return SiteModel.findById(ServerConfig.SITE_ID)
                            .select("siteContacts -_id")
                            .then(({ siteContacts }: any) => {
                                Application.express.set("siteContacts", siteContacts);
                                return siteContacts;
                            });
    }
    getContacts_JsonAPI() {
        return (req: Request, res: Response) => {
            if (!JsonAPI.validateRequest(req, res)) {
                return;
            }

            return this._contactsFetcher()
                        .then((siteContacts: any) => {
                            JsonAPI.sendData({
                                data: {
                                    id: "1",
                                    type: "contacts",
                                    attributes: {
                                        contacts: siteContacts
                                    }
                                }
                            }, res);
                        })
                        .catch(() => !res.headersSent ? res.status(500).end() : null);
        };
    }
    updateContacts_JsonAPI() {
        return (req: Request, res: Response) => {
            if (req && req.body && req.body.data && req.body.data.attributes && req.body.data.attributes.contacts && JsonAPI.validateRequest(req, res)) {
                const{ contacts } = req.body.data.attributes;
                const siteContacts = { siteContacts: contacts };
                return SiteModel.findByIdAndUpdate(ServerConfig.SITE_ID, { $set: siteContacts }, { new: true, select: "siteContacts -_id" })
                                .then(({ siteContacts }: any) => {
                                    Application.express.set("siteContacts", siteContacts);
                                    res.status(204).end();
                                })
                                .catch(() => !res.headersSent ? res.status(500).end() : null);
            }
            return !res.headersSent ? res.status(403).end() : null;
        };
    }
}

export const siteContactsController = new SiteContactsController();