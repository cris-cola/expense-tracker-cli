import assert from "node:assert";
import { test } from "node:test";
import { ExpenseTrackerCli } from "../commands/index";
import { ICommandRegistry, ICommandDefinition } from "../interfaces";
import { CsvExpenseRepository } from "../repositories/csv-expense.repository";

class TestRegistry implements ICommandRegistry {
	public registeredCommands: string[] = [];
	public parsed?: string[];

	name() {
		return this;
	}

	description() {
		return this;
	}

	version() {
		return this;
	}

	registerCommand(command: ICommandDefinition) {
		this.registeredCommands.push(command.name);
	}

	parse(argv?: string[]) {
		this.parsed = argv ?? [];
	}
}

test("CLI registers expected commands", () => {
	const registry = new TestRegistry();
	const csvExpenseRepository = new CsvExpenseRepository();
	new ExpenseTrackerCli(registry, csvExpenseRepository);

	assert.deepStrictEqual(registry.registeredCommands,
		["add", "delete", "update", "list", "summary", "set-budget", "export", "usage"]);
});
