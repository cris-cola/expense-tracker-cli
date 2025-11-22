import { readBudgetFromCsv } from "../store";
import { ExpenseRepository } from "../repositories/expense-repository";
import { safeReadExpenses } from "../helpers/repository.helpers";
import { consoleError, consoleInfo, createExpense, getNextId, getTotalAmount } from "../utils";

export async function addExpense(repo: ExpenseRepository, description: string, amount: number, category?: string) {
  if (!description?.trim()) {
    consoleError("Description is required");
    return;
  }

  if (!Number.isFinite(amount) || amount <= 0) {
    consoleError("Amount must be a positive number");
    return;
  }

  const expenses = await safeReadExpenses(repo, "load expenses");
  if (!expenses) return;
  const budgetAmount = (await readBudgetFromCsv())?.amount ?? undefined;
  
  const totalAmount = getTotalAmount(expenses);
  if(budgetAmount && totalAmount + amount > budgetAmount)
    consoleError(`Budget exceeded by: ${totalAmount + amount - budgetAmount}`);
  
  const nextId = getNextId(expenses.map(x => x.id));
  expenses.push(createExpense(nextId, description, amount, category));

  try{
    await repo.writeExpenses([...expenses].sort((a, b) => a.id - b.id));
    consoleInfo(`Expense added successfully (ID: ${nextId})`);
  } catch(err) {
    consoleError(`Could not add expense. Error: ${err}`);
   }
}
