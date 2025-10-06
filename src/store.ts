import fs from "fs";
import { colorizeGreen } from "./utils";
import { Expense } from "./types";

const DEFAULT_STORE_FILENAME = "store.json";

function getStoreFilename() {
	return process.env.TASK_STORE_PATH ?? DEFAULT_STORE_FILENAME;
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
