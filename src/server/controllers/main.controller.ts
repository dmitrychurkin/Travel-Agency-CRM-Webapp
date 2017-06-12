import { Document } from "mongoose";
import { Response } from "express";
import { Application } from "../app";
import { LandingPageModel } from "../models";
import { ApplicationError } from "../errors";
import ServerConfig from "../serverConfig";

class MainController {
    private _siteProperties = "siteContacts sliderPromo";
    private get _DBRef() {
        return LandingPageModel.findById(ServerConfig.LANDING_PAGE_ID);
    }
    getSitePropsController() {
        let DBRef: Document;

        return async (...args: Array<any>) => {
            let res: Response;
            [, res] = args;
            try {
                for (const siteProperty of this._siteProperties.split(" ")) {
                    let CachedProps = Application.express.get(siteProperty);
                    if (!CachedProps) {
                        if (!DBRef) {
                            DBRef = await this._DBRef.select(this._siteProperties).exec();
                        }
                        CachedProps = DBRef.get(siteProperty);
                        if (CachedProps) {
                            Application.express.set(siteProperty, CachedProps);
                        }else {
                            throw new ApplicationError("Property can't to be undefined");
                        }
                    }
                }

                res.render("index", { app: Application.express.locals.settings });
            }catch (err) {
                res.status(500).end(err.message);
            }
        };
    }
}

export const mainController = new MainController();