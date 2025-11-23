#!/usr/bin/env node
// ^ That "shebang" line makes it runnable as an executable if you chmod +x it.

import { CommandRegistry } from './handlers/command.registry';
import { ExpenseTrackerCli } from './commands';
import { CsvExpenseRepository } from './repositories/csv-expense.repository';

new ExpenseTrackerCli(new CommandRegistry(), new CsvExpenseRepository()).run();
