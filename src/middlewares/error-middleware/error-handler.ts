import type { ErrorRequestHandler } from "express";
import { logger } from "../../lib/winston/winston";
import { createHttpError } from "../../lib/http-errors/http-errors";

export const errorMiddleware: ErrorRequestHandler = (err, _req, res) => {
  logger.error({ error: err, stack: err.stack });
  const httpError = createHttpError(err);

  res.status(httpError.status).json({
    success: false,
    error: { code: httpError.code, message: err.message },
  });
};
