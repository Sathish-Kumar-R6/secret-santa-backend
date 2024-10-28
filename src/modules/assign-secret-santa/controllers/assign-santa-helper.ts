import * as XLSX from "xlsx";

export const parseFile = <T>(filePath: string): Promise<T[]> => {
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
