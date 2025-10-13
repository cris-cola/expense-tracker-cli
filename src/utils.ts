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

export function isValidMonthNumber(num: number) {
  return Number.isInteger(num) && num <= 12 && num >= 1;
}

export function isValidMonth(str: string): boolean {
	return isAlphabetic(str) && isValidMonthName(str);
}

function isValidMonthName(str: string): boolean {
  const fmt = new Intl.DateTimeFormat(undefined, { month: 'long' });
  const names = Array.from({ length: 12 }, (_, i) =>
    fmt.format(new Date(2000, i, 1)).toLowerCase()
  );
  return names.includes(str.trim().toLowerCase());
}

function isAlphabetic(str: string): boolean {
  return str
    .trim()
    .split('')
    .every(ch => {
      const code = ch.charCodeAt(0)
      return (code >= 65 && code <= 90) || (code >= 97 && code <= 122)
    })
}