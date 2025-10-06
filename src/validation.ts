import numbro from "numbro";

export function parseMonth(value: string) {
  console.log("month parsed, ", value);
  const date = new Date();
  const month = date.toLocaleString('deault', { month: 'long'});
  return value === month ? value : `No expenses for month ${value} were found!`;
}

export function parseMoney(value: string): number {
  const parsedAmount = numbro.unformat(value);
  if (!Number.isFinite(parsedAmount)) {
    throw new Error(`Invalid number value: ${value}`);
  }
  return parsedAmount;
}
