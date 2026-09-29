# Phase 09 · Sales Planning Build practice pack

This pack supports one connected Apex training case at the approved sales grain: `Product × Market × Channel × Month × Scenario × Version`, with Entity fixed to `India_Operations`. Currency is explicit: unit and percentage measures use No Currency, while list price, provisions, and revenue are entered and calculated in INR for the India operation. USD is produced later through the governed reporting-currency translation at the Apex Home Appliances reporting root; never treat the same numeric value as both INR and USD.

1. Reconcile `historical-sales-12-month.csv` to Phase 08 and calculate the 3-, 6-, and 12-month averages.
2. Use `baseline-assumptions.csv`; weights must total 100% before calculation.
3. Use `promotion-assumptions.csv` to explain the bridge from baseline to promotional demand.
4. Use `consensus-inputs.csv`; preserve every input and the separate management adjustment.
5. Use `pricing-assumptions.csv` to calculate net price and net revenue without rounding intermediate values.
6. Compare results with `expected-sales-results.csv`, execute the positive and negative cases, and retain the runbook evidence.

The member names match the ApexPlan training baseline but must still be verified in the authorized tenant before any load or calculation. Confirm Plan1, Forecast/Working, valid intersections, security, unit, Currency member, period, and calculation scope. Do not use these files against production.

## Screenshot files

Add sanitized PNG captures to this folder with these exact names. Until a capture is approved, the lesson displays a reserved screenshot slot.

1. `01-sales-workspace.png`
2. `02-historical-foundation-form.png`
3. `03-baseline-assumptions-form.png`
4. `04-baseline-result-job.png`
5. `05-promotion-override-form.png`
6. `06-consensus-review-form.png`
7. `07-price-revenue-form.png`
8. `08-sales-calculation-job.png`
9. `09-sales-reconciliation-form.png`
10. `10-sales-exception-review.png`

Use the approved ApexPlan training POV and preserve enough context to show the form, selected POV, result, or job evidence described by the walkthrough. Hide tenant URLs, user names, client data, notifications, and identifiers.
