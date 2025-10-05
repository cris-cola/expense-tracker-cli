#! /usr/bin/env node
// ^ That “shebang” line makes it runnable as an executable if you chmod +x it.

// initStore();

import { Command } from "commander";
import numbro from "numbro";

function parseMoney(value: string): number {
  const parsedAmount = numbro.unformat(value);
  if (!Number.isFinite(parsedAmount)) {
    throw new Error(`Invalid number value: ${value}`);
  }
  return parsedAmount;
}

export function validateCommand(argv: string[]) {
  const program = new Command();

  program
    .name('expense-tracker-cli')
    .description('CLI task tracker')
    .version('1.0f.0');

  // expense-tracker add --description "Lunch" --amount 20
  program
    .command('add')
    .description('Add a new task')
    .option("--description", "task description")
    .argument("<string>")
    .option("--amount")
    .argument('<amount>', 'integer argument', parseMoney, 1000)
    .action((description: string, amount: number) => {
      console.log(`Add: ${description} — ${amount.toFixed(2)}`);
    });

    /* program
      .command('add')
      .argument('<first>', 'integer argument', myParseInt)
      .option("--second")
      .argument('[second]', 'integer argument', myParseInt, 1000)
      .action((first, second) => {
        console.log(`${first} + ${second} = ${first + second}`);
      })
    ; */

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

/* 
  program
    .command('delete <id>')
    .description('Delete a task')
    .action((id) => {
      deleteTask(parseInt(id));
    });

  program
    .command('list [status]')
    .description('List tasks (optional: todo, in-progress, done)')
    .action((status) => {
      listTasks(status);
    });

  program
    .command('update <id> <description>')
    .description('Update task description')
    .action((id, description) => {
      updateTask(parseInt(id), description);
    });

  program
    .command('mark-done <id>')
    .action((id) => {
      markTask(parseInt(id), 'done');
    });

  program
    .command('mark-in-progress <id>')
    .action((id) => {
      markTask(parseInt(id), 'in-progress');
    }); */

  program.parse();
}

class App {
  static start () {
    try {
      validateCommand(process.argv);
			// executeCommand([command, ...args]);
    } catch (err) {
      console.error((err as Error).message);
      process.exit(1);
    }
  }
}

App.start();

