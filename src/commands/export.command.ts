import fs from "fs";
import { consoleError, consoleInfo } from "../utils";
import { ExpenseRepository, serializeExpensesToCsv } from "../repositories/expense-repository";
import { safeReadExpenses } from "../helpers/repository.helpers";

export async function exportExpenses(repo: ExpenseRepository, outputPath?: string) {
  const target = outputPath?.trim() || "expenses-export.csv";
  const expenses = await safeReadExpenses(repo, "load expenses");
  if (!expenses || expenses.length === 0) {
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
}
