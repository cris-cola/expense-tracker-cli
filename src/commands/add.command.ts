import { exportToCsv, readBudgetFromCsv, readFromCsv } from "../store";
import { consoleError, consoleInfo, createExpense, getNextId, getTotalAmount } from "../utils";

export async function addExpense(description: string, amount: number, category?: string) {
  const expenses = await readFromCsv();
  const budgetAmount = (await readBudgetFromCsv())?.amount ?? undefined;
  
  const totalAmount = getTotalAmount(expenses);
  if(budgetAmount && totalAmount + amount > budgetAmount)
    consoleError(`Budget exceeded by: ${totalAmount + amount - budgetAmount}`);
  
  const nextId = getNextId(expenses.map(x => x.id));
  expenses.push(createExpense(nextId, description, amount, category));

  try{
    exportToCsv([...expenses].sort((a, b) => a.id - b.id));
    consoleInfo(`Expense added successfully (ID: ${nextId})`);
  } catch(err) {
    consoleError(`Could not add expense. Error: ${err}`);
   }
}
