import { readExpensesFromCsv, readExpensesFromJson } from "../store";
import { printExpenses } from "../utils";

export async function listExpenses(): Promise<void> { 
  printExpenses(readExpensesFromJson()); 
  printExpenses(await readExpensesFromCsv());
}
