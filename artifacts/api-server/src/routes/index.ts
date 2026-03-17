import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import brawlRouter from "./brawl";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/auth", authRouter);
router.use("/brawl", brawlRouter);

export default router;
