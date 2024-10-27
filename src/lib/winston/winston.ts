import { createLogger, format, transports } from "winston";
import type { Request, Response, NextFunction } from "express";
import configs from "../../../config/config";
import { NodeEnvs } from "../../constants";

const { combine, timestamp, label, ms, json, prettyPrint, colorize } = format;

const createPromptLogger = () => {
  const formats = [
    label({ label: "secret-santa-backend" }),
    timestamp({ format: "YYYY-MM-DD hh:mm:ss.SSS A" }),
    ms(),
    json({
      bigint: true,
    }),
  ];

  if (configs.nodeEnv !== NodeEnvs.Production) {
    formats.push(prettyPrint());
    formats.push(
      colorize({
        all: true,
        level: true,
        colors: {
          info: "white",
          error: "red",
        },
      }),
    );
  }
  return createLogger({
    format: combine(...formats),
    transports: [new transports.Console()],
  });
};

const logger = createPromptLogger();

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const start = Date.now();
  res.on("finish", () => {
    logger.info({
      message: "Request processed",
      response: { statusCode: res.statusCode, headers: res.headersSent },
      request: {
        method: req.method,
        url: req.originalUrl,
        headers: req.headers,
        query: req.query,
        body: req.body,
      },
      duration: Date.now() - start,
    });
  });
  next();
};

export { logger };
