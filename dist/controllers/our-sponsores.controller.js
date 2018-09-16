"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const app_1 = require("../app");
const serverConfig_1 = require("../serverConfig");
const models_1 = require("../models");
class SponsoresController {
    _resourceFetcher() {
        const CACHE = app_1.default.express.get("sponsores");
        if (CACHE) {
            return Promise.resolve(CACHE);
        }
        return models_1.LandingPageModel.findById(serverConfig_1.default.LANDING_PAGE_ID)
            .select("sponsores -_id")
            .then(({ sponsores }) => {
            app_1.default.express.set("sponsores", sponsores);
            return sponsores;
        });
    }
    getSponsores_JsonAPI() {
        return (req, res) => {
            if (!services_1.JsonAPI.validateRequest(req, res)) {
                return;
            }
            this._resourceFetcher()
                .then(sponsores => {
                services_1.JsonAPI.sendData({
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
        return (req, res) => {
            if (!services_1.JsonAPI.validateRequest(req, res)) {
                return;
            }
            if (req && req.body && req.body.data && req.body.data.attributes && req.body.data.attributes.sponsores) {
                const { sponsores } = req.body.data.attributes;
                return models_1.LandingPageModel.findByIdAndUpdate(serverConfig_1.default.LANDING_PAGE_ID, { $set: { sponsores } }, { new: true, select: "sponsores -_id" })
                    .then(({ sponsores }) => {
                    app_1.default.express.set("sponsores", sponsores);
                    return res.status(204).end();
                })
                    .catch(() => res.status(500).end());
            }
            return res.status(403).end();
        };
    }
}
exports.sponsoresController = new SponsoresController();
