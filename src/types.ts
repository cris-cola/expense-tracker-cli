import { getNextId } from "./utils";

export type Expense = {
	id: number;
	description: string;
	amount: number;
	createdAt: Date;
};

export function makeExpense(description: string = "", amount: number = 0, ids: number[] = []) {
	return {
		id: getNextId(ids),
		description,
		amount,
		createdAt: new Date()
	}
};

const data: string[][] = [
  ['Name', 'Age', 'Occupation'],
  ['John', '28', 'Engineer'],
  ['Alice', '34', 'Doctor'],
  ['Bob', '23', 'Artist']
];

// Lightweight runtime representation of an Expense.
// Using public constructor parameters keeps this concise and
// compatible with the `Expense` type.
export class ExpenseRecord {
	constructor(
		public id: number,
		public description: string,
		public amount: number,
		public createdAt: Date
	) {}
}