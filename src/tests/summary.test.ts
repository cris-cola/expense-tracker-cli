import assert from "node:assert";
import { test } from "node:test";
import { createExpense } from "../utils";
import { getExpensesByMonth } from "../commands/summary.command";

test("filters expenses by month name or number", () => {
  const sampleExpenses = [
    createExpense(1, "One", 10, "Food", new Date("2025-02-01T00:00:00Z"), new Date("2025-02-01T00:00:00Z")),
    createExpense(2, "Two", 20, "Misc", new Date("2025-02-15T00:00:00Z"), new Date("2025-02-15T00:00:00Z")),
    createExpense(3, "Three", 5, "Misc", new Date("2025-03-01T00:00:00Z"), new Date("2025-03-01T00:00:00Z"))
  ];

  assert.strictEqual(getExpensesByMonth(undefined, sampleExpenses).length, 3);
  assert.strictEqual(getExpensesByMonth("2", sampleExpenses).length, 2);
  assert.strictEqual(getExpensesByMonth("March", sampleExpenses).length, 1);
});
