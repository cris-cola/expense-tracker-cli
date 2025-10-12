import { exportToCsv, readFromCsv } from "../store";
import { consoleError, consoleInfo, makeExpense, getNextId } from "../utils";

export async function addExpense(description: string, amount: number) {
  const expenses = await readFromCsv();

  const nextId = getNextId(expenses.map(x => x.id));
  expenses.push(makeExpense(description, amount, getNextId(expenses.map(x => x.id))));

  try{
    exportToCsv([...expenses].sort((a, b) => a.id - b.id));
    consoleInfo(`${description} — $${amount.toFixed(2)}\nExpense added successfully (ID: ${nextId})`);
  } catch(err) {
    consoleError(`Could not add expense. Error: ${err}`);
   }
}
