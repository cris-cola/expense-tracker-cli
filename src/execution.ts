import { getExpenses, writeExpensesToFile } from "./store";
import { colorizeGreen, getNextId } from "./utils";

export function addExpense (description: string, amount: number) {
  const expenses = getExpenses();
  let newTaskId = getNextId(expenses.map(x => x.id));

	expenses.push({ 
		id: newTaskId,
    description,
    amount,
		createdAt: new Date(),
	});
  const sortedTasks = [...expenses].sort((a, b) => a.id - b.id);
	writeExpensesToFile(sortedTasks);
	console.log(colorizeGreen(`${description} — ${amount.toFixed(2)}\nExpense added successfully (ID: ${newTaskId})`));
}