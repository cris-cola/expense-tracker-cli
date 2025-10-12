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
	consoleInfo(output.join('\n'));
}

export function getNextId(ids: number[]){
	if(ids.length === 0) return 1;

	const sortedIds = [...ids].sort((a, b) => a - b);
	let nextId = 1;

	for (const id of sortedIds){
		if (id > nextId) break;
		if (id === nextId) nextId += 1;
	}

	return nextId;
}