import fs from "fs";
import { colorizeGreen } from "./utils";
import { Expense, ExpenseRecord } from "./types";

const DEFAULT_STORE_FILENAME = "store.json";

function getStoreFilename() {
	return process.env.TASK_STORE_PATH ?? DEFAULT_STORE_FILENAME;
}

export function writeToCsv() {
  const expenses: Expense[] = getExpenses();
  const classProps = Object.keys(expenses[0] ?? {});
  const expensesCsv: string[][] = [classProps];

  for (let index = 0; index < expenses.length; index++) {
    const expense = expenses[index];
    // map headers to values for the CSV row (convert undefined to empty string)
    const row = classProps.map((key) => {
      const val = (expense as any)[key];
      if (val === undefined || val === null) return '';
      // keep dates as ISO strings; leave other values as-is
      if (val instanceof Date) return val.toISOString();
      return String(val);
    });
    expensesCsv[index + 1] = row;
  }
}

export function initStore() {
	const filename = getStoreFilename();
	if(!fs.existsSync(filename)){
		const initialData: Expense[] = [];
		fs.writeFileSync(filename, JSON.stringify(initialData, null, 2));
	  console.log(colorizeGreen("Espenses store initialized!"));
	}
}	

export function getExpenses() {
	const filename = getStoreFilename();
	if (!fs.existsSync(filename)) return [];

  try {
    const storeJson = fs.readFileSync(filename, 'utf8');
    return storeJson.trim() ? JSON.parse(storeJson) as Expense[]: [];
  } catch (err) {
		console.error('\x1b[31mError reading store:\x1b[0m', err);
    return [];
  }
}

export function writeExpensesToFile(expenses: Expense[]) {
  const filename = getStoreFilename();
  try {
    fs.writeFileSync(filename, JSON.stringify(expenses, null, 2));
  } catch (err) {
		console.error('\x1b[31mError writing file:\x1b[0m', err);
  }
}
