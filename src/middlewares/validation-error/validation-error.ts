import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { HttpStatusCodes } from "../../constants";

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrorArray = errors.array().map((errItem) => {
      const { msg, ...rest } = errItem;
      return {
        ...rest,
        message: msg,
      };
    });
    res.status(HttpStatusCodes.BAD_REQUEST).json(formattedErrorArray);
  }
  next();
};
