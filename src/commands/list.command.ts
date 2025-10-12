import { readFromCsv } from "../store";
import { Expense } from "../types";
import { consoleError, consoleInfo } from "../utils";

export async function listExpenses(): Promise<void> {
  const expenses = await readFromCsv();
	if(!expenses.length) consoleError("No expenses found!");
  printExpenses(expenses);
}

function printExpenses(expenses: Expense[]) {
	const output = expenses.map((exp) => `ID: ${exp.id}\nDESCRIPTION: ${exp.description}\nAMOUNT: $${exp.amount}\nDATE: ${exp.createdAt.toDateString()}`);
	consoleInfo(output.join('\n------------------------------\n'));
}
