"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const app_1 = require("../app");
const serverConfig_1 = require("../serverConfig");
const models_1 = require("../models");
class KeyPeopleController {
    _resourceFetcher() {
        const CACHE = app_1.Application.express.get("keyPeople");
        if (CACHE) {
            return Promise.resolve(CACHE);
        }
        return models_1.LandingPageModel.findById(serverConfig_1.default.LANDING_PAGE_ID)
            .select("keyPeople -_id")
            .then(({ keyPeople }) => {
            app_1.Application.express.set("keyPeople", keyPeople);
            return keyPeople;
        });
    }
    getKeyPeople_JsonAPI() {
        return (req, res) => {
            if (!services_1.JsonAPI.validateRequest(req, res)) {
                return;
            }
            this._resourceFetcher()
                .then(keyPeople => {
                services_1.JsonAPI.sendData({
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
        return (req, res) => {
            if (!services_1.JsonAPI.validateRequest(req, res)) {
                return;
            }
            if (req && req.body && req.body.data && req.body.data.attributes && req.body.data.attributes.keyPeople) {
                const { keyPeople } = req.body.data.attributes;
                return models_1.LandingPageModel.findByIdAndUpdate(serverConfig_1.default.LANDING_PAGE_ID, { $set: { keyPeople } }, { new: true, select: "keyPeople -_id" })
                    .then(({ keyPeople }) => {
                    app_1.Application.express.set("keyPeople", keyPeople);
                    return res.status(204).end();
                })
                    .catch(() => res.status(500).end());
            }
            return res.status(403).end();
        };
    }
}
exports.keyPeopleController = new KeyPeopleController();
