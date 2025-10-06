import { getExpenses, writeExpensesToFile } from "./store";
import { colorizeGreen, colorizeRed, getNextId } from "./utils";

export function addExpense(description: string, amount: number) {
  const expenses = getExpenses();
  let newTaskId = getNextId(expenses.map(x => x.id));
	const mockDate = new Date("August 17, 2025 03:24:00");
	expenses.push({ 
		id: newTaskId,
    description,
    amount,
		createdAt: mockDate,
	});
  const sortedTasks = [...expenses].sort((a, b) => a.id - b.id);
	writeExpensesToFile(sortedTasks);
	console.log(colorizeGreen(`${description} — $${amount.toFixed(2)}\nExpense added successfully (ID: ${newTaskId})`));
}

export function deleteTask(expenseId: number) {
	const expenses = getExpenses();
	const expense = expenses.find(tsk => tsk.id === expenseId);
	if(!expense) {
		throw new Error(colorizeRed(`Can't delete expense (ID: ${expenseId}): not found`));
	}
	
	expenses.splice(expenses.indexOf(expense), 1);

	writeExpensesToFile(expenses);
	console.log(colorizeGreen("Expense deleted successfully"));
}

export function listExpenses() {
	const expenses = getExpenses();
	console.log(colorizeGreen(JSON.stringify(expenses, null, 2)));
}

export function summaryExpenses(month?: string) {
	const expenses = getExpenses();
	
	if (month){
		const monthExpenses = month ? expenses.filter( x => new Date(x.createdAt).toLocaleString('default', { month: 'long'}) === month): expenses;
	 
		if(month && monthExpenses.length === expenses.length){
			console.error(`No expenses found for month: ${month}`);
			return;
		}
		const monthTotal = monthExpenses.reduce((acc, item) => item.amount + acc, 0);
		console.log(colorizeGreen(`Total expenses for ${month}: $${monthTotal}`));
		return;
	}
	const totalAmount = expenses.reduce((acc, item) => item.amount + acc, 0);
	console.log(colorizeGreen(`Total expenses: $${totalAmount}`));
}
