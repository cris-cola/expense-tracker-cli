import { readFromCsv } from "../store";
import { printExpenses } from "../utils";

export async function listExpenses(): Promise<void> {
  printExpenses(await readFromCsv());
}
