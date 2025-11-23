import { Expense } from "../types";
import { consoleError, consoleInfo, formatDateDisplay } from "../utils";
import { withExpenses } from "../helpers/repository.helper";
import { IExpenseRepository, ICommandDefinition, CommandOptions } from "../interfaces";

async function listExpenses(repo: IExpenseRepository, category?: string): Promise<void> {
  await withExpenses(repo, "load expenses", async (expenses) => {
    if (!expenses.length) {
      consoleInfo("No expenses found");
      return;
    }

    let list = expenses;
    if (category) {
      list = expenses.filter((x) => x?.category?.trim().toLowerCase() === category?.trim().toLowerCase());
      consoleInfo(`Expenses in category: ${category}\n`);
      if (!list.length) {
        consoleError(`No expenses found for category "${category}"`);
        return;
      }
    }

    printExpenses(list);
  });
}

export function createListCommand(repo: IExpenseRepository): ICommandDefinition {
  return {
    name: 'list',
    description: 'List expenses',
    options: [
      { flags: '-c, --category <text>', description: "Category's Expenses" }
    ],
    action: async (options: CommandOptions) => {
      await listExpenses(repo, options.category as string | undefined);
    }
  };
}

function printExpenses(expenses: Expense[]) {
  const header = '# ID  Date         Description    Amount';
  const rows = expenses.map((exp) => {
    const date = formatDateDisplay(exp.createdAt);
    return `# ${exp.id}   ${date}  ${exp.description}  $${exp.amount}`;
  });
  consoleInfo([header, ...rows].join('\n'));
}
