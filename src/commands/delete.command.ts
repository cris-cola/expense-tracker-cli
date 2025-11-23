
import { consoleError, consoleInfo } from "../utils";
import { IExpenseRepository, ICommandDefinition, CommandOptions } from "../interfaces";
import { withExpenses } from "../helpers/repository.helper";

async function deleteTask(repo: IExpenseRepository, expenseId: number) {
  await withExpenses(repo, "load expenses", async (expenses) => {
    const expense = expenses.find((exp) => exp.id === expenseId);
    if (!expense) {
      consoleError(`Can't delete expense (ID: ${expenseId}): not found`);
      return;
    }

    expenses.splice(expenses.indexOf(expense), 1);
    await repo.writeExpenses(expenses);
    consoleInfo("Expense deleted successfully");
  });
}

export function createDeleteCommand(repo: IExpenseRepository): ICommandDefinition {
  return {
    name: 'delete',
    description: 'Delete an expense',
    options: [
      { flags: '--id <value>', description: 'Expense id', parser: (v: string) => parseInt(v, 10), required: true }
    ],
    action: async (options: CommandOptions) => {
      await deleteTask(repo, options.id as number);
    }
  };
}
