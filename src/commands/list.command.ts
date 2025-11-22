import { Expense } from "../types";
import { consoleError, consoleInfo, formatDateDisplay } from "../utils";
import { ExpenseRepository } from "../repositories/expense-repository";
import { safeReadExpenses } from "../helpers/repository.helpers";

export async function listExpenses(repo: ExpenseRepository, category?: string): Promise<void> {
  const expenses = await safeReadExpenses(repo, "load expenses");
  if (!expenses) return;

  if(!expenses.length) {
    consoleInfo("No expenses found");
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
  const header = '# ID  Date         Description    Amount';
  const rows = expenses.map((exp) => {
    const date = formatDateDisplay(exp.createdAt);
    return `# ${exp.id}   ${date}  ${exp.description}  $${exp.amount}`;
  });
  consoleInfo([header, ...rows].join('\n'));
}
