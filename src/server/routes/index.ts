import { Router, Response } from "express";
const router = Router();

/* GET home page. */
router.get("/", (...args: Array<any>): void => {
    const res: Response = args[1];
    return res.render("index", { title: "Express" });
});
export default router;

