export interface EmployeeData {
  Employee_Name: string;
  Employee_EmailID: string;
  Secret_Child_Name: string;
  Secret_Child_EmailID: string;
}

export interface UploadedFiles {
  employeeFile: Express.Multer.File[];
  previousAssignmentsFile: Express.Multer.File[];
}
