import { handleValidationErrors } from "../../../middlewares/validation-error/validation-error";
import multer from "multer";
import { NextFunction, Request, Response } from "express";
import { HttpStatusCodes } from "../../../constants";

const upload = multer({ dest: "uploads/" }); // 'uploads/' is the directory where files will be stored

const uploadFileValidation = upload.fields([
  { name: "employeeFile", maxCount: 1 },
  { name: "previousAssignmentsFile", maxCount: 1 },
]);

export const validateFileUploads = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const files = req.files as
    | { [key: string]: Express.Multer.File[] }
    | undefined;

  if (!files || !files.employeeFile || !files.previousAssignmentsFile) {
    res.status(HttpStatusCodes.BAD_REQUEST).json({
      success: false,
      message:
        "Both 'employeeFile' and 'previousAssignmentsFile' must be uploaded.",
    });
  }

  next();
};

export const assignSantaValidationChain = [
  uploadFileValidation,
  validateFileUploads,
  handleValidationErrors,
];
