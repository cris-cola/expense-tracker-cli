import { consoleInfo } from "../utils";

export function showUsageGuide() {
  consoleInfo(`
Expense Tracker CLI - Usage Guide

Add a new expense:
  $ expense-tracker add --description "Lunch" --amount 20

Add an expense with category:
  $ expense-tracker add --description "Groceries" --amount 50 --category "Food"

Update an expense:
  $ expense-tracker update --id 1 --description "Dinner" --amount 30 --category "Food"

Delete an expense:
  $ expense-tracker delete --id 1

List all expenses:
  $ expense-tracker list

List expenses by category:
  $ expense-tracker list --category "Food"

View summary of all expenses:
  $ expense-tracker summary

View summary for a specific month (by name):
  $ expense-tracker summary --month "August"

View summary for a specific month (by number):
  $ expense-tracker summary --month 8

Set a budget for a month:
  $ expense-tracker set-budget --amount 1000

Export expenses to CSV:
  $ expense-tracker export
`);
}
