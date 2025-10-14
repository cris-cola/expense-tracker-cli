import fs from "fs";
import { Budget, Expense } from "./types";
import { consoleError, createBudget, createExpense, toString } from "./utils";
import csvParser from "csv-parser";

const DEFAULT_CSV_STORE_FILENAME = "store.csv";
const DEFAULT_CSV_BUDGET_STORE_FILENAME = "budget.csv";
const getStorePath = () => process.env.TASK_STORE_PATH ?? DEFAULT_CSV_STORE_FILENAME;
const getBudgetStorePath = () => process.env.TASK_STORE_PATH ?? DEFAULT_CSV_BUDGET_STORE_FILENAME;

export function exportBudgetToCsv(budget: Budget) {
  const data: string[][] = [Object.keys(createBudget())];
  data.push(Object.values(budget).map(x => toString(x)));
  writeBudgetToFileAsync(data.map(row => row.join(",")).join("\n"));
}

export function exportToCsv(expenses: Expense[]) {
  const data: string[][] = [Object.keys(createExpense())];
  expenses.forEach(exp => data.push(Object.values(exp).map(x => toString(x))));
  writeToFileAsync(data.map(row => row.join(",")).join("\n"));
}

export function writeBudgetToFileAsync(data: string) {
  const filePath = getBudgetStorePath();
  fs.writeFile(filePath, data, "utf-8", (err) => {
    if (err) consoleError(`Error writing to ${filePath} file`, err);
  })
}

export function writeToFileAsync(data: string) {
  const filePath = getStorePath();
  fs.writeFile(filePath, data, "utf-8", (err) => {
    if (err) consoleError(`Error writing to ${filePath} file`, err);
  })
}

export async function readBudgetFromCsv(): Promise<Budget | undefined> {
	const filePath = getBudgetStorePath();
	if (!fs.existsSync(filePath)) return;

  return new Promise<Budget>((resolve, reject) => {
    let budget: Budget = createBudget();
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (row: Budget) => {
        budget = ({ amount: Number(row.amount)});
      })
      .on("end", () => {
        resolve(budget);
      })
      .on("error", (error: Error) => {
        consoleError('Error reading store:', error.message);
        reject(error);
      });
  });
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