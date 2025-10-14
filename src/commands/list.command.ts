import { readFromCsv } from "../store";
import { Expense } from "../types";
import { consoleError, consoleInfo } from "../utils";

export async function listExpenses(category?: string): Promise<void> {
  const expenses = await readFromCsv();
	if(!expenses.length) consoleError("No expenses found!");

  if(!category) printExpenses(expenses);

  consoleInfo(`Expenses by category: ${category}\n`)
  printExpenses(expenses.filter(x => x?.category?.trim().toLowerCase() === category?.trim().toLowerCase()));
}

function printExpenses(expenses: Expense[]) {
	const output = expenses.map((exp) => `ID: ${exp.id}\nDESCRIPTION: ${exp.description}\nAMOUNT: $${exp.amount}\nDATE: ${exp.createdAt.toDateString()}`);
	consoleInfo(output.join('\n------------------------------\n'));
}
