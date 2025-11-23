import { consoleError } from "../utils";
import { Expense } from "../types";
import { IExpenseRepository } from "../interfaces";

export async function safeReadExpenses(repo: IExpenseRepository, context: string) {
  try {
    return await repo.readExpenses();
  } catch (error) {
    consoleError(`Unable to ${context}: ${(error as Error).message}`);
    return undefined;
  }
}

export async function withExpenses<T>(
  repo: IExpenseRepository,
  context: string,
  handler: (expenses: Expense[]) => Promise<T> | T
) {
  const expenses = await safeReadExpenses(repo, context);
  if (!expenses) return undefined;

  return handler(expenses);
}
