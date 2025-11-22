import { ExpenseRepository } from "../repositories/expense-repository";
import { consoleError, consoleInfo } from "../utils";

export async function deleteTask(repo: ExpenseRepository, expenseId: number) {
  const expenses = await repo.readExpenses();
  const expense = expenses.find(exp => exp.id === expenseId);
  if(!expense) {
    consoleError(`Can't delete expense (ID: ${expenseId}): not found`);
    return;
  }
  expenses.splice(expenses.indexOf(expense), 1);
  await repo.writeExpenses(expenses);
  consoleInfo("Expense deleted successfully");
}
