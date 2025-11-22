import { consoleError } from "../utils";
import { ExpenseRepository } from "../repositories/expense-repository";

export async function safeReadExpenses(repo: ExpenseRepository, context: string) {
  try {
    return await repo.readExpenses();
  } catch (error) {
    consoleError(`Unable to ${context}: ${(error as Error).message}`);
    return undefined;
  }
}
