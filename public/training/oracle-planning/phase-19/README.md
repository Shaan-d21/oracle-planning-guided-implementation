# Phase 19 — System Integration Testing practice pack

Use this pack to prove that the ApexPlan solution works as one controlled system rather than as isolated forms, rules, or reports.

## SIT boundary

- Environment: dedicated SIT environment
- Application: ApexPlan custom Planning application
- Input and calculation cube: Plan1
- Reporting cube: ApexPlan ASO
- Clean fixture: `SIT-CYCLE-01`
- Controlled POV: Forecast / Working / FY25 / Company with detailed Product, Entity, Market, Channel, Period, and Currency controls
- Clean-fixture row control: 240 source rows, 240 mapped rows, zero rejects
- Controlled demand and production volume: 1,380 units
- Required closing controls: balance variance 0 and Plan1-to-ApexPlan ASO variance 0

SIT proves functional integration, security, workflow, failure recovery, repeatability, and reconciliation. Phase 20 separately proves concurrency, volume, stress, endurance, response-time, and capacity behavior. Phase 21 separately confirms business acceptance.

## Execution order

1. Approve coverage and interfaces using `sit-requirement-coverage.csv` and `sit-interface-inventory.csv`.
2. Freeze the build, users, fixture, expected results, and reset procedure in `sit-test-data-register.csv`.
3. Reset and verify the environment opening state.
4. Execute `sit-end-to-end-script.csv` in order and stop at the first unresolved failure.
5. Compare results with `sit-expected-results.csv` and `sit-reconciliation-controls.csv`.
6. Execute controlled mapping, prompt, rule, publish, restart, repeatability, security, and workflow failures.
7. Record every variance in `sit-defect-log.csv`; retest the fix and execute risk-based regression.
8. Reconcile detailed records to `sit-daily-status.csv` and obtain the authorized exit decision.

## Screenshot folder

Place reviewed PNG files in this folder using these exact names:

1. `01-sit-environment-baseline.png`
2. `02-data-integration-process-details.png`
3. `03-workbench-validation.png`
4. `04-planning-job-chain.png`
5. `05-cross-module-reconciliation.png`
6. `06-financial-statement-controls.png`
7. `07-aso-publish-reconciliation.png`
8. `08-security-workflow-integration.png`
9. `09-smart-view-dashboard-reconciliation.png`
10. `10-sit-results-exit.png`

Use only synthetic or specifically authorized data. Hide tenant URLs, users, email addresses, connections, notifications, and unrelated environments.
