import { Request, Response } from "express";
import { HttpStatusCodes } from "../../../constants";
import { Readable } from "stream";
import { validateFileUploads } from "./assign-santa.validator";

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockNext = jest.fn();

const createMockFile = (filename: string): Express.Multer.File => ({
  fieldname: filename,
  originalname: filename,
  encoding: "7bit",
  mimetype: "text/csv",
  size: 1024,
  destination: "uploads/",
  filename,
  path: `uploads/${filename}`,
  buffer: Buffer.from(""),
  stream: new Readable(),
});

describe("validateFileUploads Middleware", () => {
  let req: Partial<Request>;
  let res: Response;

  beforeEach(() => {
    req = { files: {} };
    res = mockResponse();
    mockNext.mockClear();
  });

  it("should call next when both 'employeeFile' and 'previousAssignmentsFile' are provided", async () => {
    req.files = {
      employeeFile: [createMockFile("employeeFile.csv")],
      previousAssignmentsFile: [createMockFile("previousAssignmentsFile.csv")],
    };

    validateFileUploads(req as Request, res, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it("should return 400 if 'employeeFile' is missing", async () => {
    req.files = {
      previousAssignmentsFile: [createMockFile("previousAssignmentsFile.csv")],
    };

    validateFileUploads(req as Request, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(HttpStatusCodes.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message:
        "Both 'employeeFile' and 'previousAssignmentsFile' must be uploaded.",
    });
  });

  it("should return 400 if 'previousAssignmentsFile' is missing", async () => {
    req.files = {
      employeeFile: [createMockFile("employeeFile.csv")],
    };

    validateFileUploads(req as Request, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(HttpStatusCodes.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message:
        "Both 'employeeFile' and 'previousAssignmentsFile' must be uploaded.",
    });
  });

  it("should return 400 if neither file is provided", async () => {
    req.files = {};

    validateFileUploads(req as Request, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(HttpStatusCodes.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message:
        "Both 'employeeFile' and 'previousAssignmentsFile' must be uploaded.",
    });
  });
});
