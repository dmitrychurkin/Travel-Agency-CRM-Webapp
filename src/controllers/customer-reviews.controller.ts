import { Request, Response } from "express";
import { JsonAPI } from "../services";
import Application from "../app";
import ServerConfig from "../serverConfig";
import { LandingPageModel } from "../models";

class CustomerReviewsController {
    private _resourceFetcher() {
        const CACHE = Application.express.get("customerReviews");
        if (CACHE) {
            return Promise.resolve(CACHE);
        }
        return LandingPageModel.findById(ServerConfig.LANDING_PAGE_ID)
                        .select("customerReviews -_id")
                        .then(({ customerReviews }: any) => {
                            Application.express.set("customerReviews", customerReviews);
                            return customerReviews;
                        });
    }
    getCustomerReviews_JsonAPI() {

        return (req: Request, res: Response) => {
            if (!JsonAPI.validateRequest(req, res)) {
                return;
            }
            this._resourceFetcher()
                .then(customerReviews => {
                    JsonAPI.sendData({
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

        return (req: Request, res: Response) => {
            if (!JsonAPI.validateRequest(req, res)) {
                return;
            }
            if (req && req.body && req.body.data && req.body.data.attributes && req.body.data.attributes.customerReviews) {
                const{ customerReviews } = req.body.data.attributes;
                return LandingPageModel.findByIdAndUpdate(ServerConfig.LANDING_PAGE_ID, { $set: { customerReviews } }, { new: true, select: "customerReviews -_id" })
                                .then(({ customerReviews }: any) => {
                                    Application.express.set("customerReviews", customerReviews);
                                    return res.status(204).end();
                                })
                                .catch(() => res.status(500).end());
            }
            return res.status(403).end();
        };
    }
}

export const customerReviewsController = new CustomerReviewsController();