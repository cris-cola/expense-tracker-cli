#! /usr/bin/env node
// ^ That “shebang” line makes it runnable as an executable if you chmod +x it.

import { Command } from 'commander';
import { parseMoney } from './validation';
import { initStore } from './store';
import { addExpense, deleteTask, listExpenses, summaryExpenses } from './execution';

initStore();

export function validateCommand() {
  const program = new Command();

  program
    .name('expense-tracker-cli')
    .description('CLI expense tracker')
    .version('1.0.0');

  // $ expense-tracker add --description 'Lunch' --amount 20
  program
    .command('add')
    .description('Add a new expense')
    .option('-d, --description <text>', 'Description of the expense')
    .option('-a, --amount <value>', 'Expense amount', parseMoney, 1000)
    .action((options) => {
      addExpense(options.description, options.amount);
    });
  
  // $ expense-tracker delete an expense
  program
    .command('delete')
    .description('Delete an expense')
    .option('--id <id>', 'Expense id', (v) => parseInt(v, 10))
    .action((options) => {
      deleteTask(options.id)
    });

  // $ expense-tracker list
  program
    .command('list')
    .description('List expenses')
    .action(() => {
      listExpenses()
    });

  // $ expense-tracker summary
  program
    .command('summary')
    .description('Summary of all expenses')
    .option('-m, --month [text]', "Month's expenses")
    .action((options) => {
      const month = options.month;
      summaryExpenses(month ?? undefined);
    });
  program.parse();
}

class App {
  static start () {
    try {
      validateCommand();
    } catch (err) {
      console.error((err as Error).message);
      process.exit(1);
    }
  }
}

App.start();
