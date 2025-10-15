import { exportBudgetToCsv } from "../store";
import { consoleError, consoleInfo, createBudget, getNextId } from "../utils";

export async function setBudget(amount: number) {
  try{
    exportBudgetToCsv(createBudget(amount));
    consoleInfo(`Budget setup successfully: $${amount}`);
  } catch(err) {
    consoleError(`Could not setup budget. Error: ${err}`);
   }
}
