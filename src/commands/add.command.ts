import { readBudgetFromCsv } from "../store";
import { ExpenseRepository } from "../repositories/expense-repository";
import { consoleError, consoleInfo, createExpense, getNextId, getTotalAmount } from "../utils";

export async function addExpense(repo: ExpenseRepository, description: string, amount: number, category?: string) {
  const expenses = await repo.readExpenses();
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
