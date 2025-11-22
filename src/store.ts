import fs from "fs";
import { Budget } from "./types";
import { consoleError, createBudget, toString } from "./utils";
import csvParser from "csv-parser";

const DEFAULT_CSV_BUDGET_STORE_FILENAME = "budget.csv";
const getBudgetStorePath = () => process.env.TASK_STORE_PATH ?? DEFAULT_CSV_BUDGET_STORE_FILENAME;

export function exportBudgetToCsv(budget: Budget) {
  const data: string[][] = [Object.keys(createBudget())];
  data.push(Object.values(budget).map(x => toString(x)));

  writeBudgetToFileAsync(data.map(row => row.join(",")).join("\n"));
}

export function writeBudgetToFileAsync(data: string) {
  const filePath = getBudgetStorePath();
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