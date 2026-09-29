# Phase 17 — Security & Workflow practice pack

Use this pack to design and test Apex Home Appliances' security and monthly planning workflow before configuring production access.

## Scenario boundary

- Application: ApexPlan custom Planning application
- Cubes: Plan1 (detailed input and calculations) and ApexPlan ASO (reconciled management reporting)
- Approval scope: Forecast / Working by Entity, using a Bottom Up promotion path
- Representative entities: Pune and Noida
- Representative roles: Sales Planner, Operations Planner, Finance Reviewer, Finance Approver, Executive Viewer, Process Owner, and Service Administrator

## Recommended order

1. Complete `security-role-matrix.csv` and obtain business-owner approval.
2. Complete member and artifact matrices without using Service Administrator as a workaround.
3. Configure groups, roles, members, artifacts, and rule launch access in a non-production environment.
4. Configure the Entity approval-unit hierarchy and Task Manager schedule from `workflow-design.csv`.
5. Execute every allow and deny case in both security test files with representative non-admin accounts.
6. Compare actual results with `expected-security-results.csv` and record every variance in `security-exception-log.csv`.
7. Reconcile Role Assignment reports, member access, artifact behavior, Planning Approval state, Task Manager state, and business sign-off.

## Screenshot folder

Place reviewed PNG files in this folder using these exact names:

1. `01-access-control-groups.png`
2. `02-application-role-assignment.png`
3. `03-dimension-member-access.png`
4. `04-artifact-permissions.png`
5. `05-business-rule-launch-access.png`
6. `06-smart-view-role-test.png`
7. `07-planning-unit-hierarchy.png`
8. `08-approvals-workflow-status.png`
9. `09-task-manager-schedule.png`
10. `10-security-workflow-reconciliation.png`

Use only authorized training identities. Hide tenant URLs, email addresses, personal data, connection details, notifications, and unrelated environments before committing screenshots.
