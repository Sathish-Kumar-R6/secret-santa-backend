import { Request, Response } from "express";
import Employee from "../../../models/employee";
import SecretSantaGame from "../../../models/secret-santa-game";
import { SecretGiversInterface } from "../../../models/model.types";
import * as XLSX from "xlsx";
import fs from "fs";
import { EmployeeData, UploadedFiles } from "./assign-secret-santa.types";

// Function to parse CSV/XLSX files using xlsx

// eslint-dsiable-next-line  @typescript-eslint/no-explicit-any
const parseFile = <T>(filePath: string): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    try {
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0]; // Get the first sheet
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json<T>(sheet); // Convert sheet to JSON
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const assignSantaController = async (req: Request, res: Response) => {
  const employeeFilePath = (req.files as unknown as UploadedFiles)
    .employeeFile[0].path;
  const previousAssignmentsFilePath = (req.files as unknown as UploadedFiles)
    .previousAssignmentsFile[0].path;
  try {
    // Parse both files
    const employeesData = await parseFile<EmployeeData>(employeeFilePath);
    const previousAssignmentsData = await parseFile<EmployeeData>(
      previousAssignmentsFilePath,
    );

    // Map employee data to Employee instances
    const employees = employeesData.map(
      (data) => new Employee(data.Employee_Name, data.Employee_EmailID),
    );

    // Map previous assignments data to SecretGiversInterface array
    const previousAssignments: SecretGiversInterface[] =
      previousAssignmentsData.map((data) => ({
        employee_name: data.Employee_Name,
        employee_email: data.Employee_EmailID,
        secret_emp_name: data.Secret_Child_Name,
        secret_emp_email: data.Secret_Child_EmailID,
      }));

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

    res.status(200).json({
      success: true,
      data: formattedAssignments,
    });
  } catch (error) {
    console.error("Error in assignSantaController:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  } finally {
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
  }
};
