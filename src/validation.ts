import numbro from "numbro";
import { isValidMonth, isValidMonthNumber } from "./utils";

export function parseMoney(value: string): number {
  const parsedAmount = numbro.unformat(value);
  if (!Number.isFinite(parsedAmount)) {
    throw new Error(`Invalid number value: ${value}`);
  }
  return parsedAmount;
}

export function parseMonth(month: string) {
  if (!month) return;

  if(!isValidMonthNumber(Number(month)) && !isValidMonth(month)) {
    throw new Error(`Invalid month value: ${month}`);
  }

  return month;
}

