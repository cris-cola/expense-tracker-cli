import numbro from "numbro";

export function parseMonth(value: string) {
  console.log("month parsed, ", value);
  return value;
}

export function parseMoney(value: string): number {
  const parsedAmount = numbro.unformat(value);
  if (!Number.isFinite(parsedAmount)) {
    throw new Error(`Invalid number value: ${value}`);
  }
  return parsedAmount;
}
