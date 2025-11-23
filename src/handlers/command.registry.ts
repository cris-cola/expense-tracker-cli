import { Command } from "commander";
import {
	ICommandDefinition,
	ICommandOption,
	ICommandHook,
	ICommandRegistry
} from "../interfaces";

export class CommandRegistry implements ICommandRegistry {
	private readonly program: Command;

	constructor() {
		this.program = new Command();
	}

	name(value: string) {
		this.program.name(value);
		return this;
	}

	description(value: string) {
		this.program.description(value);
		return this;
	}

	version(value: string) {
		this.program.version(value);
		return this;
	}

	registerCommand(command: ICommandDefinition) {
		const registered = this.program.command(command.name);

		if (command.description) {
			registered.description(command.description);
		}

		command.options?.forEach((option: ICommandOption) => {
			if (option.required) {
				registered.requiredOption(option.flags, option.description, option.parser as any);
				return;
			}

			if (option.parser !== undefined && option.defaultValue !== undefined) {
				registered.option(option.flags, option.description, option.parser as any, option.defaultValue as any);
			} else if (option.parser !== undefined) {
				registered.option(option.flags, option.description, option.parser as any);
			} else if (option.defaultValue !== undefined) {
				registered.option(option.flags, option.description, option.defaultValue as any);
			} else {
				registered.option(option.flags, option.description);
			}
		});

		command.hooks?.forEach((hook: ICommandHook) => {
			registered.hook(hook.event, (context) => hook.listener(context.opts()));
		});

		registered.action(command.action as any);
	}

	parse(argv?: string[]) {
		this.program.parse(argv);
	}
}
