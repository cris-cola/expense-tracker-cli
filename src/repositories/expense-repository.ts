import fs from "fs";
import csvParser from "csv-parser";
import { consoleError, toString } from "../utils";
import { EXPENSE_KEYS, Expense } from "../types";

const DEFAULT_CSV_STORE_FILENAME = "store.csv";
const getDefaultStorePath = () => process.env.TASK_STORE_PATH ?? DEFAULT_CSV_STORE_FILENAME;

function escapeCsvValue(value: string) {
	const shouldQuote = value.includes(",") || value.includes("\"") || value.includes("\n");
	return shouldQuote ? `"${value.replace(/"/g, '""')}"` : value;
}

export interface ExpenseRepository {
	readExpenses(): Promise<Expense[]>;
	writeExpenses(expenses: Expense[]): Promise<void>;
}

export class CsvExpenseRepository implements ExpenseRepository {
	private readonly filePath: string;

	constructor(filePath?: string) {
		this.filePath = filePath ?? getDefaultStorePath();
	}

	async readExpenses(): Promise<Expense[]> {
		if (!fs.existsSync(this.filePath)) return [];

		return new Promise<Expense[]>((resolve, reject) => {
			const expenses: Expense[] = [];
			fs.createReadStream(this.filePath)
				.pipe(csvParser())
				.on("data", (row: Expense) => {
					expenses.push({
						...row,
						id: Number(row.id),
						amount: Number(row.amount),
						createdAt: new Date(row.createdAt),
						updatedAt: new Date(row.updatedAt)
					});
				})
				.on("end", () => resolve(expenses))
				.on("error", (error: Error) => {
					consoleError("Error reading store:", error.message);
					reject(error);
				});
		});
	}

	async writeExpenses(expenses: Expense[]): Promise<void> {
		const rows = [
			EXPENSE_KEYS,
			...expenses.map(expense =>
				EXPENSE_KEYS.map(key => escapeCsvValue(toString(expense[key])))
			)
		];

		const csv = rows.map(row => row.join(",")).join("\n");
		await fs.promises.writeFile(this.filePath, csv, "utf-8");
	}
}
