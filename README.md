# expense-tracker-cli
A simple expense tracker application

Project: https://roadmap.sh/projects/expense-tracker

## Quick start

Build and link the CLI locally so you can run the `expense-tracker` command from your shell:

```bash
npm install
npm run build
npm link
expense-tracker --help
```

## Commands

- `expense-tracker add --description "Lunch" --amount 12 --category Food`
- `expense-tracker delete --id 3`
- `expense-tracker update --id 4 --amount 15 --category Dining`
- `expense-tracker list [--category Food]`
- `expense-tracker summary [--month March|3]`
- `expense-tracker set-budget --amount 500`
- `expense-tracker export [--output my-expenses.csv]`
- `expense-tracker usage`

Commands read and write the CSV store (`store.csv`). Budget limits are checked automatically when adding expenses, and exports generate standalone CSV snapshots for sharing or backups.
