import { readExpensesFromJson, writeExpensesToJson, writeExpensesToFileAsync, writeToCsv as writeExpensesToCsv } from "../store";
import { makeExpense } from "../types";
import { consoleError, consoleInfo } from "../utils";

export function addExpense(description: string, amount: number) {
  const expenses = readExpensesFromJson();
  const newExpense = makeExpense(description, amount, expenses.map(x => x.id));
  expenses.push(newExpense);

  const sortedExpenses = [...expenses].sort((a, b) => a.id - b.id);
  try{
    writeExpensesToJson(sortedExpenses);
    writeExpensesToCsv(sortedExpenses);
    consoleInfo(`${description} — $${amount.toFixed(2)}\nExpense added successfully (ID: ${newExpense})`);
  } catch(err) {
    consoleError(`Could not add expense. Error: ${err}`);
   }
}
