"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const app_1 = require("../app");
const serverConfig_1 = require("../serverConfig");
const models_1 = require("../models");
class CustomerReviewsController {
    _resourceFetcher() {
        const CACHE = app_1.default.express.get("customerReviews");
        if (CACHE) {
            return Promise.resolve(CACHE);
        }
        return models_1.LandingPageModel.findById(serverConfig_1.default.LANDING_PAGE_ID)
            .select("customerReviews -_id")
            .then(({ customerReviews }) => {
            app_1.default.express.set("customerReviews", customerReviews);
            return customerReviews;
        });
    }
    getCustomerReviews_JsonAPI() {
        return (req, res) => {
            if (!services_1.JsonAPI.validateRequest(req, res)) {
                return;
            }
            this._resourceFetcher()
                .then(customerReviews => {
                services_1.JsonAPI.sendData({
                    data: {
                        id: "1",
                        type: "customer_reviews",
                        attributes: {
                            customerReviews
                        }
                    }
                }, res);
            })
                .catch(() => res.status(500).end());
        };
    }
    updateCustomerReviews_JsonAPI() {
        return (req, res) => {
            if (!services_1.JsonAPI.validateRequest(req, res)) {
                return;
            }
            if (req && req.body && req.body.data && req.body.data.attributes && req.body.data.attributes.customerReviews) {
                const { customerReviews } = req.body.data.attributes;
                return models_1.LandingPageModel.findByIdAndUpdate(serverConfig_1.default.LANDING_PAGE_ID, { $set: { customerReviews } }, { new: true, select: "customerReviews -_id" })
                    .then(({ customerReviews }) => {
                    app_1.default.express.set("customerReviews", customerReviews);
                    return res.status(204).end();
                })
                    .catch(() => res.status(500).end());
            }
            return res.status(403).end();
        };
    }
}
exports.customerReviewsController = new CustomerReviewsController();
