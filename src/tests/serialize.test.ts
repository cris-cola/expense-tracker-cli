import assert from "node:assert";
import { test } from "node:test";
import { createExpense } from "../utils";
import { serializeExpensesToCsv } from "../repositories/csv-expense.repository";

test("serializeExpensesToCsv emits headers and values", () => {
  const expenses = [
    createExpense(1, "Coffee", 3, "Beverage", new Date("2025-01-01T00:00:00Z"), new Date("2025-01-01T00:00:00Z")),
    createExpense(2, "Book", 12, "Education", new Date("2025-02-01T00:00:00Z"), new Date("2025-02-01T00:00:00Z"))
  ];

  const csv = serializeExpensesToCsv(expenses);
  assert(csv.startsWith("id,description,amount,category,createdAt,updatedAt"));
  assert(csv.includes("Coffee"));
  assert(csv.includes("Book"));
});
