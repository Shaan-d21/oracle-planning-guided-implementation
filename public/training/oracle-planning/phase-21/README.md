# Phase 21 — User Acceptance Testing practice pack

Use this pack to plan, execute, evidence, and sign off business-led UAT for the ApexPlan release candidate.

## UAT boundary

- Business representatives execute realistic journeys and decide acceptance. The implementation team supports but does not perform or approve UAT for them.
- UAT does not replace SIT or performance testing. It confirms that the tested release supports approved business processes, roles, controls, outputs, workflow, reporting, training, and operating responsibilities.
- A new request is a change request unless the existing release fails an approved requirement or acceptance criterion.
- Do not use shared administrator accounts. Use named representative roles, user variables, and authorized synthetic or masked data.
- Do not treat an email saying “looks good” as complete sign-off. Acceptance must identify the release, scope, results, exceptions, conditions, risks, owners, authority, and date.

## Suggested execution order

1. Approve the UAT charter, entry and exit rules, severity model, business owners, schedule, support route, and sign-off authority.
2. Complete `uat-scenario-catalog.csv` to map requirements to complete business journeys.
3. Prepare named users, representative roles, user variables, test data, expected controls, workflow state, and reset evidence in `uat-data-user-register.csv`.
4. Copy and complete `uat-script.csv` for each journey. Record actual results and evidence at every material step.
5. Track executions in `uat-execution-log.csv` and classify observations in `uat-issue-log.csv`.
6. Retest controlled fixes, run risk-based regression, and reconcile operational, financial, workflow, Smart View, and Plan1-to-ApexPlan ASO results.
7. Reconcile scope, business-role coverage, pass/fail/blocked counts, issues, training, support, and conditions in `uat-daily-status.csv`.
8. Complete `uat-signoff.csv` with the authorized business decision and every exception, owner, target date, workaround, risk, and deployment restriction.

## Only six screenshots are required

Screenshots are reserved only for Oracle interactions that materially help a learner execute the journey:

1. `01-planner-form-validation.png`
2. `02-business-rule-result.png`
3. `03-approval-rejection-history.png`
4. `04-task-manager-uat-workflow.png`
5. `05-smart-view-business-journey.png`
6. `06-approved-dashboard-reconciliation.png`

Do not create screenshots of the scenario catalogue, script, issue log, daily meeting, or sign-off. Use the structured templates instead. Crop or redact tenant URLs, names, email addresses, notifications, attachments, connections, and unauthorized business data.
