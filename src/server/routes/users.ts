import {  Router, Response } from "express";
const router = Router();

/* GET users listing. */
router.get("/", (...args: Array<any>) => {
  const res: Response = args[1];
  res.send("respond with a resource");
});

export default router;
