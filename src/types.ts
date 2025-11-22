export type ExpenseUpdate = Partial<Pick<Expense, 'description' | 'amount' | 'category'>>;

export type Expense = {
	id: number;
	description: string;
	amount: number;
	category: string;
	createdAt: Date;
	updatedAt: Date;
};

export const EXPENSE_KEYS: Array<keyof Expense> = [
	'id',
	'description',
	'amount',
	'category',
	'createdAt',
	'updatedAt'
];

export type Budget = {
	amount: number;
};