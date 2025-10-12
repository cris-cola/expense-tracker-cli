import { readFromCsv } from "../store";
import { Expense } from "../types";
import { consoleError, consoleInfo } from "../utils";

function getExpensesByMonth(month: string, expenses: Expense[]) {
  const monthIndex = parseInt(month, 10);
  if(!isNaN(monthIndex)) return expenses.filter(x => new Date(x.createdAt).getMonth() === monthIndex - 1 );
  
  return month 
    ? expenses.filter(x => (x.createdAt as Date).toLocaleString('default', { month: 'long'}) === month)
    : expenses;
}

export async function getExpensesSummary(month?: string) {
  const expenses = await readFromCsv();
  if(!expenses.length) consoleError("No expenses found!");

  if(!month){
    const totalAmount = expenses.reduce((acc, item) => item.amount + acc, 0);
    consoleInfo(`Total expenses: $${totalAmount}`);
    return;
  }

  const monthExpenses = getExpensesByMonth(month, expenses);
  if(monthExpenses.length === 0) consoleError(`No expenses found for month: ${month}`);

  const monthTotal = monthExpenses.reduce((acc, item) => acc + item.amount, 0);
  consoleInfo(`Total expenses for ${month}: $${monthTotal}`);
  return;
}
