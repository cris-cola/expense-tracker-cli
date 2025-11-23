import { createAddCommand } from "./add.command";
import { createBudgetCommand } from "./budget.command";
import { createDeleteCommand } from "./delete.command";
import { createListCommand } from "./list.command";
import { createUpdateCommand } from "./update.command";
import { createSummaryCommand } from "./summary.command";
import { createExportCommand } from "./export.command";
import { createUsageCommand } from "./usage.command";
import { consoleError } from "../utils";
import { CsvExpenseRepository } from "../repositories/csv-expense.repository";
import { ICommandRegistry, IExpenseRepository } from "../interfaces";

export class ExpenseTrackerCli {
  private readonly registry: ICommandRegistry;
  private readonly expenseRepository: IExpenseRepository;
  
  constructor(registry: ICommandRegistry, expenseRepository: CsvExpenseRepository) {
    this.registry = registry;
    this.expenseRepository = expenseRepository;
    this.buildCommands();
  }

  private buildCommands() {
    this.registry
      .name('expense-tracker')
      .description('Expense tracker CLI')
      .version('1.0.0');

    const commands = [
      createAddCommand(this.expenseRepository),
      createDeleteCommand(this.expenseRepository),
      createUpdateCommand(this.expenseRepository),
      createListCommand(this.expenseRepository),
      createSummaryCommand(this.expenseRepository),
      createBudgetCommand(),
      createExportCommand(this.expenseRepository),
      createUsageCommand()
    ];

    commands.forEach((command) => {
      this.registry.registerCommand(command);
    });
  }

  run(argv?: string[]) {
    try {
      this.registry.parse(argv);
    } catch (err) {
      consoleError((err as Error).message);
      process.exit(1);
    }
  }
}

