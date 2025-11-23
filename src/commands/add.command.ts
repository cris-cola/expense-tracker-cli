import { readBudgetFromCsv } from "../store";
import { consoleError, consoleInfo, createExpense, getNextId, getTotalAmount } from "../utils";
import { IExpenseRepository, ICommandDefinition, CommandOptions } from "../interfaces";
import { parseMoney } from "../validation";
import { withExpenses } from "../helpers/repository.helper";

async function addExpense(repo: IExpenseRepository, description: string, amount: number, category?: string) {
  if (!description?.trim()) {
    consoleError("Description is required");
    return;
  }

  if (!Number.isFinite(amount) || amount <= 0) {
    consoleError("Amount must be a positive number");
    return;
  }

  await withExpenses(repo, "load expenses", async (expenses) => {
    const budgetAmount = (await readBudgetFromCsv())?.amount ?? undefined;
    const totalAmount = getTotalAmount(expenses);

    if (budgetAmount && totalAmount + amount > budgetAmount) {
      consoleError(`Budget exceeded by: ${totalAmount + amount - budgetAmount}`);
    }

    const nextId = getNextId(expenses.map((x) => x.id));
    expenses.push(createExpense(nextId, description, amount, category));

    try {
      await repo.writeExpenses([...expenses].sort((a, b) => a.id - b.id));
      consoleInfo(`Expense added successfully (ID: ${nextId})`);
    } catch (err) {
      consoleError(`Could not add expense. Error: ${err}`);
    }
  });
}

export function createAddCommand(repo: IExpenseRepository): ICommandDefinition {
  return {
    name: 'add',
    description: 'Add a new expense',
    options: [
      { flags: '-d, --description <text>', description: 'Description of the expense', required: true },
      { flags: '-a, --amount <value>', description: 'Expense amount', parser: parseMoney, required: true },
      { flags: '-c, --category <text>', description: 'Expense category' }
    ],
    action: async (options: CommandOptions) => {
      await addExpense(
        repo,
        options.description as string,
        options.amount as number,
        options.category as string | undefined
      );
    }
  };
}
