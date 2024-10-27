import { Router } from "express";
import { assignSantaRouter } from "../modules/assign-secret-santa/routes/assign-santa.route";

const apiRouter = Router();

apiRouter.use("/v1", assignSantaRouter);

export { apiRouter };
