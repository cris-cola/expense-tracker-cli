import { readFromCsv } from "../store";
import { Expense } from "../types";
import { consoleError, consoleInfo } from "../utils";

export async function listExpenses(category?: string): Promise<void> {
  const expenses = await readFromCsv();

  if(!expenses.length) {
    consoleError("No expenses found!");
    return;
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
	consoleInfo('# ID  Date         Description    Amount');
	expenses.forEach((exp) => {
		const date = exp.createdAt.toISOString().split('T')[0];
		consoleInfo(`# ${exp.id}   ${date}  ${exp.description}  $${exp.amount}`);
	});
}
