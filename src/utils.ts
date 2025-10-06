// ANSI color codes
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const RESET = '\x1b[0m';

export const colorizeGreen = (text: string) => `${GREEN}${text}${RESET}`;
export const colorizeRed = (text: string) => `${RED}${text}${RESET}`;

export function getNextId(ids: number[]){
	if(ids.length === 0) return 1;

	const sortedIds = [...ids].sort((a, b) => a - b);
	let nextId = 1;

	for (const id of sortedIds){
		if (id > nextId) break;
		if (id === nextId) nextId += 1;
	}

	return nextId;
}
