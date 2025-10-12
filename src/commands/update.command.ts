import { exportToCsv, readFromCsv } from "../store";
import { Expense, ExpenseUpdate } from "../types";
import { consoleError, consoleInfo } from "../utils";

export async function updateExpense(id: number, description: string, amount: number) {
  const expenses = await readFromCsv();
  const [updatedList, success] = updateExpenseById(id, expenses, { description, amount });
  
  try {
    exportToCsv([...updatedList].sort((a, b) => a.id - b.id));
    if (success) consoleInfo(`Expense updated successfully (ID: ${id})`);
    else consoleError(`Expense with id ${id} could not be found`);
  } catch (err) {
    consoleError(`Could not update expense. Error: ${err}`);
  }
}

function updateExpenseById (
    id: number,
    expenses: Expense[],
    updates: ExpenseUpdate
): [Expense[], boolean] {
  let success = false;
  const updatedList = expenses.map((expense) => {
    if (expense.id === id) {
      success = true
      return { ...expense, ...updates, updateAt: new Date()};
    } 
    return expense
  });

  return [updatedList, success];
}