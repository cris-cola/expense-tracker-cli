import { readFromCsv, exportToCsv } from "../store";
import { consoleError, consoleInfo } from "../utils";

export async function deleteTask(expenseId: number) {
  const expenses = await readFromCsv();
  const expense = expenses.find(exp => exp.id === expenseId);
  if(!expense) {
    consoleError(`Can't delete expense (ID: ${expenseId}): not found`);
    return;
  }
  expenses.splice(expenses.indexOf(expense), 1);
  exportToCsv(expenses);
  consoleInfo("Expense deleted successfully");
}
