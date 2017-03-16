import { Router, Request, Response } from "express";
const router = Router(),
    Services = require("./services.json");

router.get("/air-ticketing-and-reservation/", (...args: Array<any>) => {
    const res: Response = args[1];
    res.render("services/air_ticketing_and_reservation");
});
router.get("/services/", (...args: Array<any>) => {
    const res: Response = args[1];
    res.json(Services);
});
router.post("/order/", (req: Request, res: Response) => {
    console.log(req.body);
    if (req && req.body && req.body.ACTION === "REGISTER") {
        res.json({ info: "Your data has been sent, our agent will contact you.", reqId: "f4ydhsg53igfhfgs==" });
    }
});
router.delete("/order/", (req: Request, res: Response) => {
    console.log(req.body);
    if (req && req.body && req.body.ACTION === "CANCEL"){
        res.send("Your request successfully canceled.");
    }
});
export default router;