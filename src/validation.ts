import numbro from "numbro";

export function parseMoney(value: string): number {
  const parsedAmount = numbro.unformat(value);
  if (!Number.isFinite(parsedAmount)) {
    throw new Error(`Invalid number value: ${value}`);
  }
  return parsedAmount;
}
