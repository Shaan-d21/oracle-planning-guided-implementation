# Phase 22 — Defect Management practice pack

Use these templates during the applied lab. They are intentionally tool-neutral so the same controls can be used in Jira, Azure DevOps, ServiceNow, another ALM tool, or a governed spreadsheet.

## Files

- `defect-register.csv` — authoritative record for classification, ownership, evidence, fix, retest, regression, reconciliation, deferral, and closure.
- `triage-agenda.csv` — focused meeting view for release-relevant decisions and accountable actions.
- `release-readiness.csv` — final defect exit and residual-risk control before cutover.

## Working rules

1. Identify the exact release, environment, data cut, metadata/rule/configuration version, user, role, and POV.
2. Link the requirement and failed test; preserve actual and expected results with evidence.
3. Severity represents impact. Priority represents governed execution order.
4. A developer may propose and unit-test a fix, but independent retest and required regression support closure.
5. Never overwrite defect history. Link duplicates, related defects, changes, fixes, builds, retests, and deferrals.
6. A deferred item requires a safe workaround, residual-risk assessment, owner, target release, rationale, and authorized approval.
7. Phase 22 exits only when no uncontrolled blocker remains and every accepted open item is explicitly owned and authorized.
