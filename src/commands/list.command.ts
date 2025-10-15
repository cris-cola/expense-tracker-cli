import { readFromCsv } from "../store";
import { Expense } from "../types";
import { consoleError, consoleInfo } from "../utils";

export async function listExpenses(category?: string): Promise<void> {
  const expenses = await readFromCsv();

  if(!expenses.length) {
    consoleError("No expenses found");
  } 

  let list = expenses;
  if(category) {
    list = expenses.filter(x => x?.category?.trim().toLowerCase() === category?.trim().toLowerCase());
    consoleInfo(`Expenses in category: ${category}\n`)
    if (!list.length) {
      consoleError(`No expenses found for category "${category}"`);
      return;
    }
  }
  
  printExpenses(list);
}

function printExpenses(expenses: Expense[]) {
	const output = expenses.map((exp) => `ID: ${exp.id}\nDESCRIPTION: ${exp.description}\nAMOUNT: $${exp.amount}\nDATE: ${exp.createdAt.toDateString()}`);
	consoleInfo(output.join('\n------------------------------\n'));
}
