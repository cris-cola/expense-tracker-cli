// ANSI color codes
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const RESET = '\x1b[0m';

const colorizeGreen = (text: string) => `${GREEN}${text}${RESET}`;
const colorizeRed = (text: string) => `${RED}${text}${RESET}`;

export const consoleInfo = (text: string) => console.log(colorizeGreen(text));
export const consoleError = (text: string, err?: unknown) => console.error(colorizeRed(text), err);

export function toString(val: string | number | Date) {
	if (val instanceof Date) return new Date(val).toISOString();
	return val.toString(); 
}

export function makeExpense(id?: number, description?: string, amount?: number, createdAt?: Date, updateAt?: Date) {
	return {
		id: id ?? 1,
		description: description ?? "",
		amount: amount ?? 0,
		createdAt: (createdAt ?? new Date()),
		updatedAt: (updateAt ?? new Date())
	}
};

export function getNextId(ids: number[]) {
	if(ids.length === 0) return 1;
	return Math.max(...ids) + 1;
}