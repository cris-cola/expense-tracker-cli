import assert from "node:assert";
import { test } from "node:test";
import { IExpenseRepository } from "../src/interfaces";
import { createExpense } from "../src/utils";
import { withExpenses } from "../src/helpers/repository.helper";

test("withExpenses forwards loaded expenses to the handler", async () => {
  let handlerCalls = 0;
  const repo: IExpenseRepository = {
    async readExpenses() {
      return [createExpense(1, "Coffee", 3)];
    },
    async writeExpenses() {
      throw new Error("not needed");
    }
  };

  const result = await withExpenses(repo, "load", async (expenses) => {
    handlerCalls += 1;
    assert.strictEqual(expenses.length, 1);
    return "ok";
  });

  assert.strictEqual(result, "ok");
  assert.strictEqual(handlerCalls, 1);
});

test("withExpenses swallows read failures and skips the handler", async () => {
  let handlerCalls = 0;
  const repo: IExpenseRepository = {
    async readExpenses() {
      throw new Error("boom");
    },
    async writeExpenses() {
      throw new Error("not needed");
    }
  };

  const result = await withExpenses(repo, "load", async () => {
    handlerCalls += 1;
    return "should-not-run";
  });

  assert.strictEqual(result, undefined);
  assert.strictEqual(handlerCalls, 0);
});
