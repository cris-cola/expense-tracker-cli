import { exportBudgetToCsv } from "../store";
import { consoleError, consoleInfo, createBudget } from "../utils";
import { ICommandDefinition, CommandOptions } from "../interfaces";
import { parseMoney } from "../validation";

async function setBudget(amount: number) {
  try {
    exportBudgetToCsv(createBudget(amount));
    consoleInfo(`Budget setup successfully: $${amount}`);
  } catch (err) {
    consoleError(`Could not setup budget. Error: ${err}`);
  }
}

export function createBudgetCommand(): ICommandDefinition {
  return {
    name: 'set-budget',
    description: 'Set a budget',
    options: [
      { flags: '-a, --amount <value>', description: 'Budget amount', parser: parseMoney, required: true }
    ],
    action: (options: CommandOptions) => {
      setBudget(options.amount as number);
    }
  };
}
