import fs from "fs";
import { Expense } from "./types";
import { consoleError, makeExpense, toString } from "./utils";
import csvParser from "csv-parser";

const DEFAULT_CSV_STORE_FILENAME = "store.csv";
const getStorePath = () => process.env.TASK_STORE_PATH ?? DEFAULT_CSV_STORE_FILENAME;

export function exportToCsv(expenses: Expense[]) {
  const data: string[][] = [Object.keys(makeExpense())];
  expenses.forEach(exp => data.push(Object.values(exp).map(x => toString(x))));
  writeToFileAsync(data.map(row => row.join(",")).join("\n"));
}

export function writeToFileAsync(data: string) {
  const filePath = getStorePath();
  fs.writeFile(filePath, data, "utf-8", (err) => {
    if (err) consoleError(`Error writing to ${filePath} file`, err);
  })
}

export async function readFromCsv(): Promise<Expense[]> {
	const filePath = getStorePath();
	if (!fs.existsSync(filePath)) return [];

  return new Promise<Expense[]>((resolve, reject) => {
    const expenses: Expense[] = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (row: Expense) => {
        expenses.push({ ...row, id: Number(row.id), amount: Number(row.amount), createdAt: new Date(row.createdAt)});
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