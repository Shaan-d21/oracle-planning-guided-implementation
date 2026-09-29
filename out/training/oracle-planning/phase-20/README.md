# Phase 20 — Performance Testing practice pack

Use this pack to measure the frozen ApexPlan release under representative workloads. Replace the workshop assumptions with approved project NFRs before using it on a real implementation.

## Safety boundary

- Run load and concurrency tests only in an authorized non-production environment.
- Oracle `simulateConcurrentUsage` operations can update data. Approve the workload, reset, stop conditions, reconciliation, cleanup, and test-user lifecycle before execution.
- Never store real passwords, tokens, tenant URLs, personal email addresses, or connection secrets in this folder or the simulation package.
- Use synthetic or properly authorized masked data.
- A faster result passes only when the same functional, security, workflow, financial, and Plan1-to-ApexPlan ASO controls still reconcile.

## Suggested execution order

1. Complete `performance-nfr-catalog.csv` and obtain business-owner approval.
2. Model representative normal, peak, stress, recovery, and endurance workloads in `performance-workload-model.csv`; execute only the types actually required.
3. Freeze the SIT release, environment configuration, data-volume profile, test users, POVs, reset procedure, background-job window, and workload package.
4. Record cold and warm single-user samples in `performance-execution-log.csv`.
5. Peer-review the redacted example `concurrent-usage-requirement.csv`, build the Oracle-required package outside source control, and execute it only in the test environment.
6. Consolidate the raw evidence in `performance-results.csv` without deleting errors or outliers.
7. Correlate issues in `performance-bottleneck-register.csv` with Activity Report, Jobs, Process Details, Calculation Manager logs, Application Diagnostics, artifact design, and data shape.
8. Record one versioned change at a time in `performance-optimization-log.csv`, rerun the equivalent workload, and reconcile results.
9. Complete `performance-exit-summary.csv` with capacity limits, defects, monitoring, residual risks, waivers, and the authorized decision.

## Screenshot files to add

Store reviewed PNG files in this folder with these exact names:

1. `01-performance-environment-baseline.png`
2. `02-activity-report-overview.png`
3. `03-business-rule-performance.png`
4. `04-form-dashboard-performance.png`
5. `05-integration-publish-performance.png`
6. `06-concurrent-usage-input.png`
7. `07-concurrent-usage-results.png`
8. `08-application-diagnostics.png`
9. `09-before-after-comparison.png`
10. `10-performance-exit-decision.png`

Crop or redact tenant URLs, usernames, email addresses, passwords, tokens, connections, notification recipients, and unrelated client data. Keep artifact names, POVs, job or process IDs, timestamps, test name, workload conditions, results, and reviewer evidence visible where authorized.
