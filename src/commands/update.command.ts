import { Expense, ExpenseUpdate } from "../types";
import { consoleError, consoleInfo, filterUndefined } from "../utils";
import { ExpenseRepository } from "../repositories/expense-repository";

export async function updateExpense(repo: ExpenseRepository, id: number, description?: string, amount?: number, category?: string) {
  const expenses = await repo.readExpenses();
  const [ updatedList, success ] = updateExpenseById(id, expenses, { description, amount, category });
  
  try {
    await repo.writeExpenses([...updatedList].sort((a, b) => a.id - b.id));
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
      return { 
        ...expense, 
        ...filterUndefined(updates), 
        updatedAt: new Date()};
      } 
    return expense
  });

  return [updatedList, success];
}