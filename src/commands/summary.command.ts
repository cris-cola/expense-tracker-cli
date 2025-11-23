import { Expense } from "../types";
import { consoleError, consoleInfo, getTotalAmount } from "../utils";
import { withExpenses } from "../helpers/repository.helper";
import { IExpenseRepository, ICommandDefinition, CommandOptions } from "../interfaces";
import { parseMonth } from "../validation";

export function getExpensesByMonth(month: string | undefined, expenses: Expense[]) {
  if (!month) return expenses;
  const monthIndex = parseInt(month, 10);
  if (!isNaN(monthIndex)) return expenses.filter((x) => new Date(x.createdAt).getMonth() === monthIndex - 1);

  return month
    ? expenses.filter((x) => (x.createdAt as Date).toLocaleString('default', { month: 'long' }) === month)
    : expenses;
}

async function getExpensesSummary(repo: IExpenseRepository, month?: string) {
  await withExpenses(repo, "load expenses", async (expenses) => {
    if (!expenses || expenses.length === 0) {
      consoleError("No expenses found!");
      return;
    }

    if (!month) {
      consoleInfo(`Total expenses: $${getTotalAmount(expenses)}`);
      return;
    }

    const monthExpenses = getExpensesByMonth(month, expenses);
    if (monthExpenses.length === 0) {
      consoleError(`No expenses found for month: ${month}`);
      return;
    }

    const monthTotal = monthExpenses.reduce((acc, item) => acc + item.amount, 0);
    consoleInfo(`Total expenses for ${month}: $${monthTotal}`);
  });
}

export function createSummaryCommand(repo: IExpenseRepository): ICommandDefinition {
  return {
    name: 'summary',
    description: 'Summary of all expenses',
    options: [
      { flags: '-m, --month <text>', description: "Month's expenses", parser: parseMonth }
    ],
    action: async (options: CommandOptions) => {
      await getExpensesSummary(repo, (options.month as string) ?? undefined);
    }
  };
}
