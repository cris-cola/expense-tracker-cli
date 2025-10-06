#! /usr/bin/env node
// ^ That “shebang” line makes it runnable as an executable if you chmod +x it.

import { Command } from 'commander';
import { parseMoney, parseMonth } from './validation';
import { initStore } from './store';
import { addExpense } from './execution';

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
      const id: number = options.id;
      console.log(`Delete expense id ${id}`);
    });

  // $ expense-tracker list
  program
    .command('list')
    .description('List expenses')
    .action(() => {
      console.log('List expenses');
    });

  // $ expense-tracker summary
  program
    .command('summary')
    .description('Summary of all expenses')
    .option('-m, --month [month]', "Month's expenses", parseMonth)
    .action((options) => {
      const month = options.month;
      console.log(`Expenses month ${month}`);
    });
  commanderExamples(program);
  program.parse();
}

function commanderExamples(program: Command){
  program
    .command('adds')
    .argument('<first>', 'integer argument', parseInt)
    .option('--second')
    .argument('[second]', 'integer argument', parseInt, 1000)
    .action((first, second) => {
      console.log(`${first} + ${second} = ${first + second}`);
    });

  program
    .command('clone <source> [destination]')
    .description('clone a repository into a newly created directory')
    .action((source, destination) => {
      console.log('clone command called');
    });

  program.command('split')
    .description('Split a string into substrings and display as an array')
    .argument('<string>', 'string to split')
    .option('--first', 'display just the first substring')
    .option('-s, --separatodr <chadr>', 'separator character', ',')
    .action((str, options) => {
      const limit = options.first ? 1 : undefined;
      
      console.log(str.split(options.separatodr, limit));
    });
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
