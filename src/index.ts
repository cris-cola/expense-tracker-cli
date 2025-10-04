#! /usr/bin/env node
// ^ That “shebang” line makes it runnable as an executable if you chmod +x it.
console.log("Hello from Expenses Planner CLI!");

// initStore();

import { Command } from "commander";


export function validateCommand(argv: string[]) {

  const program = new Command();

  program
    .name('task-cli')
    .description('CLI task tracker')
    .version('1.0f.0');

  // program
  //   .command('add <description>')
  //   .description('Add a new task')
  //   .action((description) => {
  //     addTask(description);
  //   });

  // program
  //   .command('delete <id>')
  //   .description('Delete a task')
  //   .action((id) => {
  //     deleteTask(parseInt(id));
  //   });

  // program
  //   .command('list [status]')
  //   .description('List tasks (optional: todo, in-progress, done)')
  //   .action((status) => {
  //     listTasks(status);
  //   });

  // program
  //   .command('update <id> <description>')
  //   .description('Update task description')
  //   .action((id, description) => {
  //     updateTask(parseInt(id), description);
  //   });

  // program
  //   .command('mark-done <id>')
  //   .action((id) => {
  //     markTask(parseInt(id), 'done');
  //   });

  // program
  //   .command('mark-in-progress <id>')
  //   .action((id) => {
  //     markTask(parseInt(id), 'in-progress');
  //   });

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

function addTask(description: any) {
  console.log("addTask");
}
function deleteTask(arg0: number) {
  throw new Error("Function not implemented.");
}

function listTasks(status: any) {
  throw new Error("Function not implemented.");
}

function updateTask(arg0: number, description: any) {
  throw new Error("Function not implemented.");
}

function markTask(arg0: number, arg1: string) {
  throw new Error("Function not implemented.");
}

