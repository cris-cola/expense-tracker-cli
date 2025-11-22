import assert from "node:assert";
import fs from "fs";
import os from "os";
import path from "path";
import { test } from "node:test";
import { CsvExpenseRepository } from "../repositories/expense-repository";
import { createExpense } from "../utils";

test("expense repository round trips CSV data", async () => {
  const tempFile = path.join(os.tmpdir(), `expense-repo-test-${Date.now()}.csv`);
  const repo = new CsvExpenseRepository(tempFile);
  const expenses = [
    createExpense(1, "Lunch", 10, "Food", new Date("2025-02-01T00:00:00Z"), new Date("2025-02-01T00:00:00Z")),
    createExpense(2, "Dinner", 20, "Food", new Date("2025-03-15T00:00:00Z"), new Date("2025-03-15T00:00:00Z"))
  ];

  try {
    await repo.writeExpenses(expenses);
    const read = await repo.readExpenses();

    assert.strictEqual(read.length, 2);
    assert.strictEqual(read[0].description, "Lunch");
    assert.strictEqual(read[1].amount, 20);
    assert.strictEqual(read[1].category, "Food");
    assert(read[0].createdAt instanceof Date);
  } finally {
    await fs.promises.rm(tempFile, { force: true });
  }
});
