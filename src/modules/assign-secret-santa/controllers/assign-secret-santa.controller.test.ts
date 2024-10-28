import request from "supertest";
import express from "express";
import multer from "multer";
import { assignSantaController } from "./assign-secret-santa.controller";
import Employee from "../../../models/employee";
import SecretSantaGame from "../../../models/secret-santa-game";
import { parseFile } from "./assign-santa-helper";
import fs from "fs";

const app = express();
const upload = multer();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post(
  "/assign-santa",
  upload.fields([
    { name: "employeeFile" },
    { name: "previousAssignmentsFile" },
  ]),
  assignSantaController,
);

jest.mock("./assign-santa-helper");
jest.mock("../../../models/secret-santa-game");
jest.mock("fs");

describe("POST /assign-santa", () => {
  let employeeFile: Buffer;
  let previousAssignmentsFile: Buffer;

  beforeEach(() => {
    employeeFile = Buffer.from(
      "Employee_Name,Employee_EmailID\nAlice,alice@example.com\nBob,bob@example.com",
    );
    previousAssignmentsFile = Buffer.from(
      "Employee_Name,Employee_EmailID,Secret_Child_Name,Secret_Child_EmailID\nCharlie,charlie@example.com,Alice,alice@example.com",
    );

    jest.clearAllMocks();
  });

  it("should generate assignments and return formatted response", async () => {
    (parseFile as jest.Mock)
      .mockResolvedValueOnce([
        { Employee_Name: "Alice", Employee_EmailID: "alice@example.com" },
        { Employee_Name: "Bob", Employee_EmailID: "bob@example.com" },
      ])
      .mockResolvedValueOnce([
        {
          Employee_Name: "Charlie",
          Employee_EmailID: "charlie@example.com",
          Secret_Child_Name: "Alice",
          Secret_Child_EmailID: "alice@example.com",
        },
      ])
      .mockResolvedValue([]);

    // Mocking the SecretSantaGame implementation
    const alice = new Employee("Alice", "alice@example.com");
    const bob = new Employee("Bob", "bob@example.com");
    const mockAssignments = new Map<Employee, Employee>();
    mockAssignments.set(alice, bob); // Alice gives to Bob

    (SecretSantaGame as jest.Mock).mockImplementation(() => ({
      generateAssignments: jest.fn().mockReturnValue(mockAssignments),
    }));

    const response = await request(app)
      .post("/assign-santa")
      .attach("employeeFile", employeeFile, { filename: "employees.csv" })
      .attach("previousAssignmentsFile", previousAssignmentsFile, {
        filename: "previousAssignments.csv",
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: [
        {
          Employee_Name: "Alice",
          Employee_EmailID: "alice@example.com",
          Secret_Child_Name: "Bob",
          Secret_Child_EmailID: "bob@example.com",
        },
      ],
    });

    expect(fs.unlink).toHaveBeenCalledTimes(2);
  });
});
