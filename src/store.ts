import fs from "fs";
import { Expense, makeExpense } from "./types";
import { consoleError, consoleInfo } from "./utils";
import csvParser from "csv-parser";

const DEFAULT_JSON_STORE_FILENAME = "store.json";
const DEFAULT_CSV_STORE_FILENAME = "store.csv";

export enum FileType {
  JSON = "json",
  CSV = "csv"
}

const getStorePath = (store: FileType) => process.env.TASK_STORE_PATH ?? (store === FileType.JSON ? DEFAULT_JSON_STORE_FILENAME : DEFAULT_CSV_STORE_FILENAME);

export function initStore() {
	const filename = getStorePath(FileType.JSON);
	if(!fs.existsSync(filename)){
		const initialData: Expense[] = [];
		fs.writeFileSync(filename, JSON.stringify(initialData, null, 2));
	  consoleInfo("Espenses store initialized!");
	}
}	

export function writeToCsv(expenses: Expense[]) {
  const headers = Object.keys(makeExpense());
  const data: string[][] = [headers];
  
  for (let index = 0; index < expenses.length; index++) {
    const expense = expenses[index];
    // map headers to values for the CSV row (convert undefined to empty string)
    const row = headers.map((key) => {
      const val = (expense as any)[key];
      if (val === undefined || val === null) return '';
      // keep dates as ISO strings; leave other values as-is
      if (val instanceof Date) return val.toISOString();
      return String(val);
    });
    data[index + 1] = row;
  }
  
  writeExpensesToFileAsync(data.map(row => row.join(",")).join("\n"), FileType.CSV);
}

export function writeExpensesToJson(expenses: Expense[]) { 
  writeExpensesToFileAsync(JSON.stringify(expenses, null, 2), FileType.JSON); 
}

export function writeExpensesToFileAsync(data: string, fileType: FileType) {
  const filePath = getStorePath(fileType);
  fs.writeFile(filePath, data, "utf-8", (err) => {
    if (err) consoleError(`Error writing to ${filePath} file`, err);
    else consoleInfo(`Expenses have been saved to ${filePath}`);
  })
}

export async function readExpensesFromCsv(): Promise<Expense[]> {
	const filePath = getStorePath(FileType.CSV);
	if (!fs.existsSync(filePath)) return [];

  // while(stream) {
  //   const row = stream.read();
  //   data.push(row.split(","));
  // }
  return new Promise<Expense[]>((resolve, reject) => {
    const expenses: Expense[] = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (row: Expense) => {
        expenses.push(row);
      })
      .on("end", () => {
        resolve(expenses);
      })
      .on("error", (error: Error) => {
        consoleError('Error reading store:', error.message);
        reject(error);
      });
  });
}

export function readExpensesFromJson() {
	const filename = getStorePath(FileType.JSON);
	if (!fs.existsSync(filename)) return [];

  try {
    const storeJson = fs.readFileSync(filename, 'utf8');
    return storeJson.trim() ? JSON.parse(storeJson) as Expense[]: [];
  } catch (err) {
		consoleError('Error reading store:', err);
    return [];
  }
}