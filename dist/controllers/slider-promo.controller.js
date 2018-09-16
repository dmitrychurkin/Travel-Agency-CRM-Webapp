"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const app_1 = require("../app");
const models_1 = require("../models");
const serverConfig_1 = require("../serverConfig");
class SliderPromoController {
    _slidesFetcher() {
        const CACHE = app_1.default.express.get("sliderPromo");
        if (CACHE) {
            return Promise.resolve(CACHE);
        }
        return models_1.LandingPageModel.findById(serverConfig_1.default.LANDING_PAGE_ID)
            .select("sliderPromo -_id")
            .then(({ sliderPromo }) => {
            if (!CACHE) {
                app_1.default.express.set("sliderPromo", sliderPromo);
            }
            return sliderPromo;
        });
    }
    getSlides_JsonAPI() {
        return (req, res) => {
            if (!services_1.JsonAPI.validateRequest(req, res))
                return;
            this._slidesFetcher()
                .then((sliderPromo) => {
                const responseJsonObject = {
                    data: {
                        id: "1",
                        type: "slides",
                        attributes: {
                            slides: sliderPromo
                        }
                    }
                };
                return services_1.JsonAPI.sendData(responseJsonObject, res);
            })
                .catch(() => res.status(500).end());
        };
    }
    setSlides_JsonAPI() {
        return (req, res) => {
            if (!services_1.JsonAPI.validateRequest(req, res))
                return;
            if (req && req.body && req.body.data && req.body.data.attributes && req.body.data.attributes.slides) {
                const { slides: sliderPromo } = req.body.data.attributes;
                return models_1.LandingPageModel.findByIdAndUpdate(serverConfig_1.default.LANDING_PAGE_ID, { $set: { sliderPromo } }, { new: true, select: "sliderPromo -_id" })
                    .then(({ sliderPromo }) => {
                    app_1.default.express.set("sliderPromo", sliderPromo);
                    return res.status(204).end();
                })
                    .catch(() => res.status(500).end());
            }
            return res.status(403).end();
        };
    }
}
exports.sliderPromoController = new SliderPromoController();
