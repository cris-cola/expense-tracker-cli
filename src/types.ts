export type ExpenseUpdate = Partial<Pick<Expense, 'description' | 'amount'>>;

export type Expense = {
	id: number;
	description: string;
	amount: number;
	createdAt: Date;
	updatedAt: Date;
};