import { exportToCsv, readFromCsv } from "../store";
import { consoleError, consoleInfo, createExpense, getNextId } from "../utils";

export async function addExpense(description: string, amount: number, category?: string) {
  const expenses = await readFromCsv();

  const nextId = getNextId(expenses.map(x => x.id));
  expenses.push(createExpense(nextId, description, amount, category));

  try{
    exportToCsv([...expenses].sort((a, b) => a.id - b.id));
    consoleInfo(`Expense added successfully (ID: ${nextId})`);
  } catch(err) {
    consoleError(`Could not add expense. Error: ${err}`);
   }
}
