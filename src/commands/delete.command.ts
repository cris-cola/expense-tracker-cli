import { readExpensesFromJson, writeExpensesToJson } from "../store";
import { consoleError, consoleInfo } from "../utils";

export function deleteTask(expenseId: number) {
  const expenses = readExpensesFromJson();
  const expense = expenses.find(tsk => tsk.id === expenseId);
  if(!expense) {
    consoleError(`Can't delete expense (ID: ${expenseId}): not found`);
    return;
  }
  expenses.splice(expenses.indexOf(expense), 1);
  writeExpensesToJson(expenses);
  consoleInfo("Expense deleted successfully");
}
