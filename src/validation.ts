import { Command } from "commander";


export function validateCommand(argv: string[]) {

  const program = new Command();

  program
    .name('task-cli')
    .description('CLI task tracker')
    .version('1.0.0');

  program
    .command('add <description>')
    .description('Add a new task')
    .action((description) => {
      // addTask(description);
    });

  program
    .command('delete <id>')
    .description('Delete a task')
    .action((id) => {
      // deleteTask(parseInt(id));
    });

  program
    .command('list [status]')
    .description('List tasks (optional: todo, in-progress, done)')
    .action((status) => {
      // listTasks(status);
    });

  program
    .command('update <id> <description>')
    .description('Update task description')
    .action((id, description) => {
      // updateTask(parseInt(id), description);
    });

  program
    .command('mark-done <id>')
    .action((id) => {
      // markTask(parseInt(id), 'done');
    });

  program
    .command('mark-in-progress <id>')
    .action((id) => {
      // markTask(parseInt(id), 'in-progress');
    });

  program.parse();
}

