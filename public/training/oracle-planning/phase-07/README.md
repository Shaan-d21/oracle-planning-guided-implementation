# Phase 07 metadata build practice pack

These CSV files are **source/staging exercises**, not universal Oracle Planning import templates.

They implement the ApexPlan baseline: Product, Entity, Market, Channel, and Account members for the Plan1 BSO input/calculation cube and ApexPlan ASO reporting cube. The Entity hierarchy is `Apex Home Appliances → India Operations → Manufacturing Plants → Pune / Noida`; Plant, Customer, Production Line, and Cost Element are not separate dimensions in this release.

The approved currency contract is USD as the application main and company-reporting currency, INR as the local input currency for Pune and Noida, and No Currency for nonmonetary measures such as units, hours, headcount, percentages, and days. `entity-currency-assignment.csv` records the assignment and `account-design-policy.csv` records the account-group behavior. The training rate values are introduced later in the financial-integration lab; do not invent or load live rates during metadata build.

1. Export each target dimension from the authorized training tenant.
2. Preserve the tenant-exported headers and supported property values.
3. Map the staged rows into copies of those exports.
4. Validate parentage, duplicates, required values, cube validity, delimiter, encoding, row counts, Entity currency assignment, and Account behavior.
5. Import in the approved order, review the job details, correct rejects, refresh when required, and reconcile.

The Account staging hierarchy contains the measures required by the sales, inventory, production, capacity, manufacturing-cost, workforce, CapEx, and integrated-financial labs. It is intentionally larger than a demonstration hierarchy: 161 members in total, including 149 leaves. Treat it as a governed workshop baseline and map its properties into a fresh Account export from the target tenant.

## Included design controls

- `entity-currency-assignment.csv`: local-input and reporting-currency responsibility by Entity.
- `account-design-policy.csv`: group-level data type, time balance, currency, rate, and editability rules.
- `expected-control-totals.csv`: expected root, parent, leaf, and total counts after the controlled build.

Never import these files into a production or client tenant. Use only the disposable training environment and approved change window.

## Screenshot files

Add sanitized PNG captures to this folder with these exact names. Until a capture is approved, the lesson displays a reserved screenshot slot.

1. `01-dimensions-overview.png`
2. `02-dimension-editor-add-member.png`
3. `03-export-metadata.png`
4. `04-import-metadata-files.png`
5. `05-import-options.png`
6. `06-metadata-job-status.png`
7. `07-error-file-review.png`
8. `08-refresh-database.png`
9. `09-post-refresh-verification.png`

Capture only from the authorized ApexPlan training tenant. Hide tenant URLs, user names, client data, notifications, and identifiers; keep navigation and the fields needed by the walkthrough visible.
