import fs from "fs";
import { consoleError, consoleInfo } from "../utils";
import { serializeExpensesToCsv } from "../repositories/csv-expense.repository";
import { withExpenses } from "../helpers/repository.helper";
import { IExpenseRepository, ICommandDefinition, CommandOptions } from "../interfaces";

async function exportExpenses(repo: IExpenseRepository, outputPath?: string) {
  const target = outputPath?.trim() || "expenses-export.csv";
  await withExpenses(repo, "load expenses", async (expenses) => {
    if (!expenses.length) {
      consoleInfo("No expenses found to export");
      return;
    }

    try {
      const csv = serializeExpensesToCsv(expenses);
      await fs.promises.writeFile(target, csv, "utf-8");
      consoleInfo(`Exported ${expenses.length} expense(s) to ${target}`);
    } catch (error) {
      consoleError("Could not export expenses", (error as Error).message);
    }
  });
}

export function createExportCommand(repo: IExpenseRepository): ICommandDefinition {
  return {
    name: 'export',
    description: 'Export expenses to CSV',
    options: [
      { flags: '-o, --output <path>', description: 'Destination path', defaultValue: 'expenses-export.csv' }
    ],
    action: async (options: CommandOptions) => {
      await exportExpenses(repo, options.output as string | undefined);
    }
  };
}
