import { Command } from "commander";
import { addExpense } from "./add.command";
import { parseMoney } from "../validation";
import { deleteTask } from "./delete.command";
import { listExpenses } from "./list.command";
import { getExpensesSummary } from "./summary.command";

export default function buildCommands() {
  const commands = new Command();

  commands
    .name('expense-tracker-cli')
    .description('Expense tracker CLI')
    .version('1.0.0');

  // $ expense-tracker add --description 'Lunch' --amount 20
  commands
    .command('add')
    .description('Add a new expense')
    .option('-d, --description <text>', 'Description of the expense')
    .option('-a, --amount <value>', 'Expense amount', parseMoney, 1000)
    .action((options) => {
      addExpense(options.description, options.amount);
    });
  
  // $ expense-tracker delete --id 2
  commands
    .command('delete')
    .description('Delete an expense')
    .option('--id <id>', 'Expense id', (v) => parseInt(v, 10))
    .action((options) => {
      deleteTask(options.id)
    });

  // $ expense-tracker list
  commands
    .command('list')
    .description('List expenses')
    .action(async () => {
      await listExpenses()
    });

  // $ expense-tracker summary --month 8
  commands
    .command('summary')
    .description('Summary of all expenses')
    .option('-m, --month [text]', "Month's expenses")
    .action((options) => {
      const month = options.month;
      getExpensesSummary(month ?? undefined);
    });
  
  return commands;  
}
