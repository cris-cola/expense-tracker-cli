import { Expense, ExpenseUpdate } from "../types";
import { consoleError, consoleInfo, filterUndefined } from "../utils";
import { withExpenses } from "../helpers/repository.helper";
import { IExpenseRepository, ICommandDefinition, CommandOptions } from "../interfaces";
import { parseMoney } from "../validation";

async function updateExpense(repo: IExpenseRepository, id: number, description?: string, amount?: number, category?: string) {
  if (description !== undefined && !description.trim()) {
    consoleError("Description cannot be empty");
    return;
  }

  if (amount !== undefined && (!Number.isFinite(amount) || amount <= 0)) {
    consoleError("Amount must be a positive number");
    return;
  }

  await withExpenses(repo, "load expenses", async (expenses) => {
    const [updatedList, success] = updateExpenseById(id, expenses, { description, amount, category });

    try {
      await repo.writeExpenses([...updatedList].sort((a, b) => a.id - b.id));
      if (success) consoleInfo(`Expense updated successfully (ID: ${id})`);
      else consoleError(`Expense with id ${id} could not be found`);
    } catch (err) {
      consoleError(`Could not update expense. Error: ${err}`);
    }
  });
}

export function updateExpenseById(
  id: number,
  expenses: Expense[],
  updates: ExpenseUpdate
): [Expense[], boolean] {
  let success = false;
  const updatedList = expenses.map((expense) => {
    if (expense.id === id) {
      success = true;
      return {
        ...expense,
        ...filterUndefined(updates),
        updatedAt: new Date()
      };
    }
    return expense;
  });

  return [updatedList, success];
}

export function createUpdateCommand(repo: IExpenseRepository): ICommandDefinition {
  return {
    name: 'update',
    description: 'Update an expense',
    options: [
      { flags: '--id <value>', description: 'Expense id', parser: (value: string) => parseInt(value, 10), required: true },
      { flags: '-d, --description <text>', description: 'Description of the expense' },
      { flags: '-a, --amount <value>', description: 'Expense amount', parser: parseMoney },
      { flags: '-c, --category <text>', description: 'Expense category' }
    ],
    hooks: [
      {
        event: 'preAction',
        listener: (options: CommandOptions) => {
          const updateFields = ['description', 'amount', 'category'];
          const providedFields = updateFields.filter((field) => options[field] !== undefined);

          if (providedFields.length === 0) {
            throw new Error('At least one update field must be provided (--description, --amount, or --category)');
          }
        }
      }
    ],
    action: async (options: CommandOptions) => {
      await updateExpense(
        repo,
        options.id as number,
        options.description as string | undefined,
        options.amount as number | undefined,
        options.category as string | undefined
      );
    }
  };
}