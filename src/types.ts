export type Expense = {
	id: number;
	description: string;
	amount: number;
	createdAt: Date;
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