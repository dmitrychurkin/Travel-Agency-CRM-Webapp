"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const models_1 = require("../models");
const serverConfig_1 = require("../serverConfig");
const app_1 = require("../app");
class SiteContactsController {
    _contactsFetcher() {
        const CACHE = app_1.Application.express.get("siteContacts");
        if (CACHE) {
            return Promise.resolve(CACHE);
        }
        return models_1.SiteModel.findById(serverConfig_1.default.SITE_ID)
            .select("siteContacts -_id")
            .then(({ siteContacts }) => {
            app_1.Application.express.set("siteContacts", siteContacts);
            return siteContacts;
        });
    }
    getContacts_JsonAPI() {
        return (req, res) => {
            if (!services_1.JsonAPI.validateRequest(req, res)) {
                return;
            }
            return this._contactsFetcher()
                .then((siteContacts) => {
                services_1.JsonAPI.sendData({
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
        return (req, res) => {
            if (req && req.body && req.body.data && req.body.data.attributes && req.body.data.attributes.contacts && services_1.JsonAPI.validateRequest(req, res)) {
                const { contacts } = req.body.data.attributes;
                const siteContacts = { siteContacts: contacts };
                return models_1.SiteModel.findByIdAndUpdate(serverConfig_1.default.SITE_ID, { $set: siteContacts }, { new: true, select: "siteContacts -_id" })
                    .then(({ siteContacts }) => {
                    app_1.Application.express.set("siteContacts", siteContacts);
                    res.status(204).end();
                })
                    .catch(() => !res.headersSent ? res.status(500).end() : null);
            }
            return !res.headersSent ? res.status(403).end() : null;
        };
    }
}
exports.siteContactsController = new SiteContactsController();
