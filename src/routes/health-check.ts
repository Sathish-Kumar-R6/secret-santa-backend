import { HttpStatusCodes } from "../constants";
import { Router } from "express";

const healthCheckRouter = Router();

healthCheckRouter.get("/health-check", (_, res) => {
  res.status(HttpStatusCodes.OK).json({ message: "Hello from SANTA 🎅" });
});

export default healthCheckRouter;
