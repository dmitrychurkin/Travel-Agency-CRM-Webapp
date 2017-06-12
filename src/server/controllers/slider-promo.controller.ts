import { Request, Response } from "express";
import { Document } from "mongoose";
import { JsonAPI, IJsonAPISpec } from "../services";
import { Application } from "../app";
import { LandingPageModel } from "../models";
import ServerConfig from "../serverConfig";

interface ISlide {
    _id?: string;
    backgroundImage: string;
    title: string;
    description: string;
    chip: Array<{
        destination: string;
        avatar: string;
        starCount: number;
    }>;
}
interface ISlides {
    sliderPromo: Array<ISlide>;
}

class SliderPromoController {
    private _slidesFetcher(): Promise<ISlide[]> {
        const CACHE: ISlide[] = Application.express.get("sliderPromo");
        if (CACHE) {
            return Promise.resolve(CACHE);
        }
        return LandingPageModel.findById(ServerConfig.LANDING_PAGE_ID)
                        .select("sliderPromo -_id")
                        .then(({ sliderPromo }: Document & ISlides) => {
                            if (!CACHE) {
                                Application.express.set("sliderPromo", sliderPromo);
                            }
                            return sliderPromo;
                        });
    }
    getSlides_JsonAPI() {
        return (req: Request, res: Response) => {
            if (!JsonAPI.validateRequest(req, res)) return;
            this._slidesFetcher()
                        .then((sliderPromo: ISlide[]) => {
                            const responseJsonObject: IJsonAPISpec = {
                                data: {
                                    id: "1",
                                    type: "slides",
                                    attributes: {
                                        slides: sliderPromo
                                    }
                                }
                            };
                            return JsonAPI.sendData(responseJsonObject, res);
                        })
                        .catch(() => res.status(500).end());
        };
    }
    setSlides_JsonAPI() {
        return (req: Request, res: Response) => {
            if (!JsonAPI.validateRequest(req, res)) return;
            if (req && req.body && req.body.data && req.body.data.attributes && req.body.data.attributes.slides) {
                const{ slides: sliderPromo } = req.body.data.attributes;
                return LandingPageModel.findByIdAndUpdate(ServerConfig.LANDING_PAGE_ID, { $set: { sliderPromo } }, { new: true, select: "sliderPromo -_id" })
                                .then(({ sliderPromo }: Document & ISlides) => {
                                    Application.express.set("sliderPromo", sliderPromo);
                                    return res.status(204).end();
                                })
                                .catch(() => res.status(500).end());
            }
            return res.status(403).end();
        };
    }
}

export const sliderPromoController = new SliderPromoController();