import { Command } from "commander";
import { addExpense } from "./add.command";
import { setBudget } from "./budget.command";
import { deleteTask } from "./delete.command";
import { listExpenses } from "./list.command";
import { updateExpense } from "./update.command";
import { parseMoney, parseMonth } from "../validation";
import { getExpensesSummary } from "./summary.command";
import { showHelp } from "./help.command";
import { consoleError } from "../utils";

export class Program {
  commands: Command;
  
  constructor() {
    this.commands = new Command();
    this.buildCommands();
  }

  buildCommands() {
    this.commands
      .name('expense-tracker')
      .description('Expense tracker CLI')
      .version('1.0.0');

    // $ expense-tracker add --description 'Lunch' --amount 20
    this.commands
      .command('add')
      .description('Add a new expense')
      .requiredOption('-d, --description <text>', 'Description of the expense')
      .requiredOption('-a, --amount <value>', 'Expense amount', parseMoney)
      .option('-c, --category <text>', 'Expense category')
      .action((options) => {
        addExpense(options.description, options.amount, options.category);
      });
    
    // $ expense-tracker delete --id 2
   this.commands
      .command('delete')
      .description('Delete an expense')
      .requiredOption('--id <value>', 'Expense id', (v) => parseInt(v, 10))
      .action((options) => {
        deleteTask(options.id)
      });

    // $ expense-tracker update --description 'Lunch' --amount 20
    this.commands
      .command('update')
      .description('Update an expense')
      .requiredOption('--id <value>', 'Expense id', (v) => parseInt(v, 10))
      .option('-d, --description <text>', 'Description of the expense')
      .option('-a, --amount <value>', 'Expense amount', parseMoney)
      .option('-c, --category <text>', 'Expense category')
      .hook('preAction', (thisCommand) => {
        const options = thisCommand.opts();
        const updateFields = ['description', 'amount', 'category'];
        const providedFields = updateFields.filter(field => options[field] !== undefined);
        
        if (providedFields.length === 0) {
          thisCommand.error('At least one update field must be provided (--description, --amount, or --category)');
        }
      })
      .action((options) => {
        updateExpense(options.id, options.description, options.amount, options.category);
      });

    // $ expense-tracker list
    this.commands
      .command('list')
      .description('List expenses')
      .option('-c, --category <text>', "Category's Expenses")
      .action((options) => {
        listExpenses(options.category);
      });

    // $ expense-tracker summary --month 8
    this.commands
      .command('summary')
      .description('Summary of all expenses')
      .option('-m, --month <text>', "Month's expenses", parseMonth)
      .action((options) => {
        getExpensesSummary(options.month ?? undefined);
      });

    // $ expense-tracker set-budget --a 'Lunch' --amount 20
    this.commands
      .command('set-budget')
      .description('Set a budget')
      .requiredOption('-a, --amount <value>', 'Budget amount', parseMoney)
      .action((options) => {
        setBudget(options.amount);
      });

    this.commands
      .command('help')
      .description('Show usage examples')
      .action(() => {
        showHelp();
      });
  }

  run () {
    try {
      this.commands.parse();
    } catch (err) {
      consoleError((err as Error).message);
      process.exit(1);
    }
  }
}

