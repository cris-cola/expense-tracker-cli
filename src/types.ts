export type ExpenseUpdate = Partial<Pick<Expense, 'description' | 'amount' | 'category'>>;

export type Expense = {
	id: number;
	description: string;
	amount: number;
	category: string;
	createdAt: Date;
	updatedAt: Date;
};

export type Budget = {
	amount: number;
};