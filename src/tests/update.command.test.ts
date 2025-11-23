import assert from "node:assert";
import { test } from "node:test";
import { createExpense } from "../utils";
import { updateExpenseById } from "../commands/update.command";

const fixedCreatedAt = new Date("2025-01-01T00:00:00Z");
const fixedUpdatedAt = new Date("2025-01-02T00:00:00Z");

test("updateExpenseById applies provided updates", () => {
  const [updatedList, success] = updateExpenseById(
    1,
    [createExpense(1, "Lunch", 12, "Food", fixedCreatedAt, fixedUpdatedAt)],
    { amount: 15, category: "Dining" }
  );

  assert.strictEqual(success, true);
  const updated = updatedList[0];
  assert.strictEqual(updated.amount, 15);
  assert.strictEqual(updated.category, "Dining");
  assert.strictEqual(updated.description, "Lunch");
  assert.notStrictEqual(updated.updatedAt.getTime(), fixedUpdatedAt.getTime());
});

test("updateExpenseById signals when an expense is missing", () => {
  const expenses = [createExpense(1, "Lunch", 12, "Food", fixedCreatedAt, fixedUpdatedAt)];
  const [updatedList, success] = updateExpenseById(99, expenses, { amount: 20 });

  assert.strictEqual(success, false);
  assert.deepStrictEqual(updatedList, expenses);
});
