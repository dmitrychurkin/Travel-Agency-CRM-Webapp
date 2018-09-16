"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const app_1 = require("../app");
const models_1 = require("../models");
const errors_1 = require("../errors");
const serverConfig_1 = require("../serverConfig");
class MainController {
    constructor() {
        this._siteProperties = "siteContacts sliderPromo";
    }
    get _DBRef() {
        return models_1.LandingPageModel.findById(serverConfig_1.default.LANDING_PAGE_ID);
    }
    getSitePropsController() {
        let DBRef;
        return (...args) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            let res;
            [, res] = args;
            try {
                for (const siteProperty of this._siteProperties.split(" ")) {
                    let CachedProps = app_1.default.express.get(siteProperty);
                    if (!CachedProps) {
                        if (!DBRef) {
                            DBRef = yield this._DBRef.select(this._siteProperties).exec();
                        }
                        CachedProps = DBRef.get(siteProperty);
                        if (CachedProps) {
                            app_1.default.express.set(siteProperty, CachedProps);
                        }
                        else {
                            throw new errors_1.ApplicationError("Property can't to be undefined");
                        }
                    }
                }
                res.render("index", { app: app_1.default.express.locals.settings });
            }
            catch (err) {
                res.status(500).end(err.message);
            }
        });
    }
}
exports.mainController = new MainController();
