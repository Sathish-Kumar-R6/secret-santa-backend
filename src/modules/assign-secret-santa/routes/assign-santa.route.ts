import { Router } from "express";
import { assignSantaController } from "../controllers/assign-secret-santa.controller";
import { assignSantaValidationChain } from "../validators/assign-santa.validator";
const assignSantaRouter = Router();

assignSantaRouter.post(
  "/assign-santa",
  assignSantaValidationChain,
  assignSantaController,
);

export { assignSantaRouter };
