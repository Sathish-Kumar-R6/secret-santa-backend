import type { Request, Response, NextFunction } from "express";
import { createHttpError } from "../../lib/http-errors/http-errors";
import { HttpStatusCodes } from "../../constants";

export const notFoundMiddleware = (
  _req: Request,
  _res: Response,
  next: NextFunction,
) => {
  next(
    createHttpError(HttpStatusCodes.NOT_FOUND, "Route path not found", {
      code: "ROUTE_NOT_FOUND",
    }),
  );
};
