# Phase 08 data integration practice pack

This pack supports a controlled file-based historical-sales integration for the current ApexPlan design.

The target is the `Plan1` BSO cube in the ApexPlan Custom Planning application. The clean source covers FY26 monthly historical sales at Product × Market × Channel grain, with Entity fixed to `India_Operations`, Account fixed to `Historical_Sales_Units`, Scenario / Version fixed to `Actual / Final`, and unit data stored at `No Currency`. The `ApexPlan` ASO cube is not a direct input target. Approved results move to it through governed BSO-to-ASO data movement; only monetary accounts translate to USD.

## Clean-file controls

- 576 records and 66,240 sales units
- 12 months: Jan through Dec FY26
- 4 Products: MIXER_GRINDER, ELECTRIC_KETTLE, AIR_FRYER, and INDUCTION_COOKTOP
- 4 Markets: NORTH, CENTRAL, WEST, and SOUTH
- 3 Channels: DISTRIBUTOR, RETAIL, and ONLINE
- One controlled POV for Account, Entity, Scenario, Version, Year, and Currency

The source columns use a proper delimited-file integration layout: one column per target dimension plus a numeric AMOUNT column. The file retains a header row and comma delimiter. PERIOD and YEAR map explicitly to Planning time dimensions; SCENARIO may be governed through category mapping when that is the tenant design.

Before loading:

1. Confirm `Plan1`, the FY26 period range, Actual category, Final Version, No Currency, and the isolated writable target POV.
2. Verify every target member against the Phase 07 metadata baseline.
3. Record the clean source controls from `expected-control-totals.csv`.
4. Configure and preview the file. Map dimensions, periods, category, and members.
5. Run Import Source with No Export first. Reconcile all 576 staged rows and 66,240 units.
6. Resolve every defect in the defective file. Do not force invalid members, periods, missing values, text amounts, duplicates, or an invalid currency intersection into Planning.
7. Export only to the isolated training POV using the approved mode.
8. Reconcile source, staging, validation, export, rejected cells, and the Plan1 retrieval. Repeat the run once to prove idempotency.

Never run the exercise against production or use Replace mode without explicit target-POV approval, rollback evidence, and a controlled change window.

## Screenshot files

Add sanitized PNG captures to this folder with these exact names. Until a capture is approved, the lesson displays a reserved screenshot slot.

1. `01-data-integration-home.png`
2. `02-integration-general.png`
3. `03-file-preview.png`
4. `04-map-dimensions.png`
5. `05-period-mapping.png`
6. `06-category-mapping.png`
7. `07-map-members.png`
8. `08-run-integration-options.png`
9. `09-workbench-staged-data.png`
10. `10-process-details.png`
11. `11-planning-reconciliation.png`

Use the Apex historical-sales integration and Plan1 target shown in the lesson. Hide tenant URLs, user names, client data, notifications, and identifiers. Retain enough navigation and run context for the learner to reproduce the step.
