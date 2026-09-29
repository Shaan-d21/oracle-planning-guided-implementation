# Phase 18 — Scenario & What-If Planning practice pack

Use this pack to model governed alternatives for Apex Home Appliances without changing the approved plan or creating an offline shadow model.

## ApexPlan scenario design

- Application: ApexPlan custom Planning application
- Calculation cube: Plan1
- Reporting cube: ApexPlan ASO
- Scenario: Forecast
- Protected baseline Version: Final
- Writable alternative Versions: Upside and Downside
- Official planning Version: Working
- Sandboxes: disabled
- Strategic Modeling: disabled

Upside and Downside begin as controlled copies of Forecast / Final. The selected case does not become official merely because it looks favorable. Its coherent driver set must enter Forecast / Working, rerun every affected dependency, pass Planning workflow, publish to ApexPlan ASO, and reconcile.

## Recommended order

1. Approve `scenario-version-register.csv` and confirm Version security.
2. Freeze and reconcile Forecast / Final using `baseline-control.csv`.
3. Submit an administrator-operated copy request for Final to Upside and Downside.
4. Reconcile both targets to Final before changing any driver.
5. Enter assumptions from `what-if-driver-inputs.csv` and validate ranges, owners, periods, and rationale.
6. Execute calculations in the order defined by `scenario-formulas.csv` and retain job evidence.
7. Compare actual results with `expected-scenario-results.csv` and execute `scenario-test-cases.csv`.
8. Record the selected case, rejected alternatives, triggers, actions, risks, and approval in `scenario-decision-log.csv`.
9. Resolve or approve every variance in `scenario-exception-log.csv`.

## Screenshot folder

Place reviewed PNG files in this folder using these exact names:

1. `01-scenario-version-members.png`
2. `02-version-security.png`
3. `03-copy-versions.png`
4. `04-baseline-reconciliation.png`
5. `05-scenario-driver-inputs.png`
6. `06-scenario-calculation-job.png`
7. `07-scenario-comparison-dashboard.png`
8. `08-smart-view-sensitivity.png`
9. `09-selected-case-promotion.png`
10. `10-scenario-publish-reconciliation.png`

Use only the authorized training environment. Hide tenant URLs, user identities, email addresses, notifications, connection details, and unrelated data before committing images.
