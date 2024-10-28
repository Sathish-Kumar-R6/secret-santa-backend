import { Request, Response } from "express";
import Employee from "../../../models/employee";
import SecretSantaGame from "../../../models/secret-santa-game";
import { SecretGiversInterface } from "../../../models/model.types";
import fs from "fs";
import { EmployeeData, UploadedFiles } from "./assign-secret-santa.types";
import { parseFile } from "./assign-santa-helper";

export const assignSantaController = async (req: Request, res: Response) => {
  console.log("request files", req.files);
  const employeeFilePath = (req.files as unknown as UploadedFiles)
    .employeeFile[0].path;
  const previousAssignmentsFilePath = (req.files as unknown as UploadedFiles)
    .previousAssignmentsFile[0].path;

  const employeesData = await parseFile<EmployeeData>(employeeFilePath);
  const previousAssignmentsData = await parseFile<EmployeeData>(
    previousAssignmentsFilePath,
  );
  const employees = employeesData.map(
    (data) => new Employee(data.Employee_Name, data.Employee_EmailID),
  );
  const previousAssignments: SecretGiversInterface[] =
    previousAssignmentsData.map((data) => ({
      employee_name: data.Employee_Name,
      employee_email: data.Employee_EmailID,
      secret_emp_name: data.Secret_Child_Name,
      secret_emp_email: data.Secret_Child_EmailID,
    }));

  console.log("prev assignments", previousAssignments);
  // Create SecretSantaGame instance and generate assignments
  const secretSantaGame = new SecretSantaGame(employees, previousAssignments);
  const assignments = secretSantaGame.generateAssignments();

  // Format assignments for output
  const formattedAssignments = Array.from(assignments.entries()).map(
    ([giver, receiver]) => ({
      Employee_Name: giver.name,
      Employee_EmailID: giver.email,
      Secret_Child_Name: receiver.name,
      Secret_Child_EmailID: receiver.email,
    }),
  );
  console.log("formatted assignments", formattedAssignments);
  // Clean up uploaded files
  fs.unlink(employeeFilePath, (err) => {
    if (err) console.error(`Failed to delete file: ${employeeFilePath}`, err);
  });
  fs.unlink(previousAssignmentsFilePath, (err) => {
    if (err)
      console.error(
        `Failed to delete file: ${previousAssignmentsFilePath}`,
        err,
      );
  });

  res.status(200).json({
    success: true,
    data: formattedAssignments,
  });
};
