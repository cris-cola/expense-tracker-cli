import { Expense } from "../types";
import { consoleError, consoleInfo, getTotalAmount } from "../utils";
import { ExpenseRepository } from "../repositories/expense-repository";
import { safeReadExpenses } from "../helpers/repository.helpers";

export function getExpensesByMonth(month: string | undefined, expenses: Expense[]) {
  if (!month) return expenses;
  const monthIndex = parseInt(month, 10);
  if(!isNaN(monthIndex)) return expenses.filter(x => new Date(x.createdAt).getMonth() === monthIndex - 1 );
  
  return month 
    ? expenses.filter(x => (x.createdAt as Date).toLocaleString('default', { month: 'long'}) === month)
    : expenses;
}

export async function getExpensesSummary(repo: ExpenseRepository, month?: string) {
  const expenses = await safeReadExpenses(repo, "load expenses");
  if (!expenses || expenses.length === 0) {
    consoleError("No expenses found!");
    return;
  }

  if(!month) {
    consoleInfo(`Total expenses: $${getTotalAmount(expenses)}`);
    return;
  }

  const monthExpenses = getExpensesByMonth(month, expenses);
  if(monthExpenses.length === 0) {
    consoleError(`No expenses found for month: ${month}`);
    return;
  }

  const monthTotal = monthExpenses.reduce((acc, item) => acc + item.amount, 0);
  consoleInfo(`Total expenses for ${month}: $${monthTotal}`);
  return;
}
