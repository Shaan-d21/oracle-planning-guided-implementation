# Phase 14 — Financial Statement Integration practice pack

Use these files in `Plan1`, `Forecast`, `Working` for the ApexPlan management-financial integration lab. Build and reconcile Pune and Noida operating results in INR, translate approved India Operations results to USD, and move only reconciled USD management-reporting results to the `ApexPlan` ASO cube.

The practice pack uses a controlled Jan FY27 training rate of 80 INR per USD for both average and ending rates so learners can focus on account behavior and reconciliation. This is a fictional workshop assumption, not a live exchange rate. Periodic P&L and cash-flow movements use the average rate; closing balance-sheet values use the ending rate; units, hours, headcount, percentages, days, and other nonmonetary drivers use No Currency and are not translated.

This is not a statutory consolidation solution. Legal consolidation, intercompany elimination, accounting journals, close orchestration, statutory adjustments, tax provision, audit, and external reporting remain outside scope.

## Controlled flow

1. Freeze approved revenue, COGS, inventory, workforce, CapEx, financing, tax, and opening-balance versions.
2. Validate account mappings, signs, flows, source grains, target grains, Entity-currency assignments, rate types, and aggregation.
3. Calculate management P&L and net income.
4. Calculate working-capital balance movements and cash effects.
5. Build operating, investing, and financing cash flows.
6. Roll cash, PPE, debt, liabilities, and equity into the closing balance sheet.
7. Translate the approved INR results to USD using the account-specific rate type.
8. Prove local and reporting-currency cash tie-out, statement balance, reporting movement, and repeatability.

## Currency files

- `exchange-rate-baseline.csv` contains the approved fictional workshop rate and ownership.
- `currency-reconciliation.csv` provides independent INR-to-USD control totals for representative P&L, cash-flow, and balance-sheet lines.
- `expected-financial-results.csv` remains the local INR statement baseline; it is not a USD result set.

## Screenshot files to add here

- `01-financial-workspace.png`
- `02-account-flow-mapping.png`
- `03-management-pnl.png`
- `04-working-capital-form.png`
- `05-indirect-cash-flow.png`
- `06-integrated-balance-sheet.png`
- `07-financial-exception-review.png`
- `08-financial-integration-job.png`
- `09-three-statement-reconciliation.png`
- `10-financial-outlook-dashboard.png`

Capture one consistent training cycle. Hide URLs, users, notifications, client data, and identifiers. Retain full-precision calculations, negative tests, reruns, reporting reconciliation, limitations, and reviewer approval.
