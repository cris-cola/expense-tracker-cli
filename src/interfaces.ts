import { HookEvent } from "commander";
import { Expense } from "./types";

export type CommandOptions = Record<string, unknown>;

export interface ICommandOption {
	flags: string;
	description: string;
	parser?: (value: string) => any;
	defaultValue?: unknown;
	required?: boolean;
}

export interface ICommandHook {
	event: HookEvent;
	listener: (options: CommandOptions) => void;
}

export interface ICommandDefinition {
	name: string;
	description?: string;
	options?: ICommandOption[];
	hooks?: ICommandHook[];
	action: (options: CommandOptions) => void | Promise<void>;
}

export interface ICommandRegistry {
	name(value: string): this;
	description(value: string): this;
	version(value: string): this;
	registerCommand(command: ICommandDefinition): void;
	parse(argv?: string[]): void;
}

export interface IExpenseRepository {
	readExpenses(): Promise<Expense[]>;
	writeExpenses(expenses: Expense[]): Promise<void>;
}
