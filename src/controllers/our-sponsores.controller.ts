import { Request, Response } from "express";
import { JsonAPI } from "../services";
import Application from "../app";
import ServerConfig from "../serverConfig";
import { LandingPageModel } from "../models";

class SponsoresController {
    private _resourceFetcher() {
        const CACHE = Application.express.get("sponsores");
        if (CACHE) {
            return Promise.resolve(CACHE);
        }
        return LandingPageModel.findById(ServerConfig.LANDING_PAGE_ID)
                        .select("sponsores -_id")
                        .then(({ sponsores }: any) => {
                            Application.express.set("sponsores", sponsores);
                            return sponsores;
                        });
    }
    getSponsores_JsonAPI() {

        return (req: Request, res: Response) => {
            if (!JsonAPI.validateRequest(req, res)) {
                return;
            }
            this._resourceFetcher()
                .then(sponsores => {
                    JsonAPI.sendData({
                        data: {
                            id: "1",
                            type: "sponsores",
                            attributes: {
                                sponsores
                            }
                        }
                    }, res);
                })
                .catch(() => res.status(500).end());
        };
    }

    updateSponsores_JsonAPI() {

        return (req: Request, res: Response) => {
            if (!JsonAPI.validateRequest(req, res)) {
                return;
            }
            if (req && req.body && req.body.data && req.body.data.attributes && req.body.data.attributes.sponsores) {
                const{ sponsores } = req.body.data.attributes;
                return LandingPageModel.findByIdAndUpdate(ServerConfig.LANDING_PAGE_ID, { $set: { sponsores } }, { new: true, select: "sponsores -_id" })
                                .then(({ sponsores }: any) => {
                                    Application.express.set("sponsores", sponsores);
                                    return res.status(204).end();
                                })
                                .catch(() => res.status(500).end());
            }
            return res.status(403).end();
        };
    }
}

export const sponsoresController = new SponsoresController();