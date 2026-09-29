# Phase 15 — Business Rules & Groovy practice pack

Use this pack to design and test one governed ApexPlan rule release. Work only in the authorized training tenant. Do not copy these examples into production without replacing illustrative members, completing code review, validating representative runtime prompts, and executing the full test pack.

## Recommended exercise

1. Catalogue `BR_Plan1_Recalculate_Financial_Outlook` and decide whether each requirement belongs in a standard rule, Groovy rule, ruleset, member formula, or data map.
2. Complete the rule design and runtime-prompt contract before coding.
3. Prove the default scope estimate: 2 Entities × 4 Products × 12 Periods × 10 Accounts × 1 Scenario × 1 Version = 960 intersections.
4. Compare the baseline with 8 edited cells × 3 dependent accounts = 24 targeted intersections. This is an estimate, not a performance guarantee.
5. Validate with representative prompts, deploy the reviewed version, test as the intended planner, and record every job ID.
6. Prove expected results, negative controls, security, unchanged rerun, performance, recovery, and Plan1-to-ApexPlan reconciliation.

## Screenshot folder and filenames

Store reviewed PNGs in this folder using these exact names:

- `01-calculation-manager-rule-inventory.png`
- `02-scoped-business-rule-designer.png`
- `03-runtime-prompts.png`
- `04-groovy-rule-editor.png`
- `05-ruleset-sequence.png`
- `06-validate-deploy.png`
- `07-form-rule-launch.png`
- `08-rule-job-details.png`
- `09-script-analysis-performance.png`
- `10-rule-output-reconciliation.png`

Hide tenant URLs, user names, notifications, client data, and unrelated identifiers. Use one consistent Forecast / Working / FY25 training cycle across all captures.

## Completion standard

A successful job is not sufficient. The release passes only when the resolved scope is approved, expected outputs reconcile, unrelated intersections remain unchanged, invalid and unauthorized launches are blocked, an unchanged rerun is repeatable, performance stays within the agreed threshold, recovery is tested, and the ApexPlan reporting slice agrees with Plan1.
