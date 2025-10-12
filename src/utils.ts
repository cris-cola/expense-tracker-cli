import { Expense } from "./types";

// ANSI color codes
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const RESET = '\x1b[0m';

const colorizeGreen = (text: string) => `${GREEN}${text}${RESET}`;
const colorizeRed = (text: string) => `${RED}${text}${RESET}`;

export const consoleInfo = (text: string) => console.log(colorizeGreen(text));
export const consoleError = (text: string, err?: unknown) => console.error(colorizeRed(text), err);

export function printExpenses(expenses: Expense[]) {
	if(!expenses.length) consoleError("No expenses found!");
	const output = expenses.map((exp) => `ID: ${exp.id}\nDESCRIPTION: ${exp.description}\nDATE: ${exp.createdAt}`);
	consoleInfo(output.join('\n------------------------------\n'));
}

export function toString(val: string | number | Date) {
	if (val instanceof Date) return new Date(val).toISOString();
	return val.toString(); 
}

export function makeExpense(description: string = "", amount: number = 0, id: number = 1) {
	return {
		id,
		description,
		amount,
		createdAt: new Date()
	}
};

export function getNextId(ids: number[]) {
	if(ids.length === 0) return 1;
	return Math.max(...ids) + 1;
}