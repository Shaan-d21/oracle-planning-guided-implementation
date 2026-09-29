import type { LessonDefinition } from "@/types/course";

export const defectManagementLessons = [
  { id: "defect-foundations", number: "01", title: "Defect management foundations", duration: "18 min", type: "concept" },
  { id: "defect-classification", number: "02", title: "Classify severity, priority, and release impact", duration: "28 min", type: "assessment" },
  { id: "defect-record", number: "03", title: "Build a reproducible defect record", duration: "30 min", type: "wizard" },
  { id: "defect-triage", number: "04", title: "Triage, ownership, and service levels", duration: "28 min", type: "simulation" },
  { id: "defect-lifecycle", number: "05", title: "Control status, fixes, and environments", duration: "30 min", type: "simulation" },
  { id: "defect-retest", number: "06", title: "Retest, regression, and reconciliation", duration: "30 min", type: "assessment" },
  { id: "defect-metrics", number: "07", title: "Metrics, ageing, and release readiness", duration: "26 min", type: "evidence" },
  { id: "defect-war-room", number: "08", title: "Run the defect governance walkthrough", duration: "28 min", type: "simulation" },
  { id: "defect-homework", number: "09", title: "Applied defect-management lab", duration: "45 min", type: "assessment" },
  { id: "defect-exit-gate", number: "10", title: "Closure package and exit gate", duration: "24 min", type: "exit-gate" },
] as const satisfies readonly LessonDefinition[];

export type DefectManagementLessonId = (typeof defectManagementLessons)[number]["id"];

export const defectReadinessControls = [
  "The UAT release, test environment, configuration, metadata, rules, data set, and integration versions are frozen and identifiable",
  "One defect register is authoritative across SIT, performance testing, UAT, security, data, and reporting observations",
  "Severity, priority, status, ownership, SLA, duplicate, change-request, and deferral rules are approved",
  "Functional, technical, integration, security, data, and business owners are available for triage and retest",
  "Cutover entry criteria explicitly state which defect severities may remain open and who can accept residual risk",
] as const;

export const defectClassificationCases = [
  {
    id: "DEF-021",
    issue: "A West Region planner can edit East Region Forecast / Working intersections.",
    correct: "Security defect · Severity 1 · release blocker",
    options: ["Security defect · Severity 1 · release blocker", "Cosmetic defect · Severity 4 · defer", "Training question · no defect", "Enhancement request · future backlog"],
  },
  {
    id: "DEF-022",
    issue: "Approved production requirement is 15,000 units; the signed expected result is 13,000 because yield is applied twice.",
    correct: "Calculation defect · Severity 2 · fix before cutover",
    options: ["Calculation defect · Severity 2 · fix before cutover", "Data request · load another file", "Cosmetic defect · Severity 4 · close", "Duplicate without comparing evidence"],
  },
  {
    id: "DEF-023",
    issue: "Plan1 approved revenue is 48.2M while ApexPlan ASO displays 47.6M after publish.",
    correct: "Integration/reconciliation defect · Severity 2 · release impact pending triage",
    options: ["Integration/reconciliation defect · Severity 2 · release impact pending triage", "Expected difference · approve without evidence", "Performance defect · Severity 3", "User-access request"],
  },
  {
    id: "OBS-024",
    issue: "A user asks for a new promotion-elasticity method that is outside the approved requirement baseline.",
    correct: "Change request · assess scope, value, cost, and release timing",
    options: ["Change request · assess scope, value, cost, and release timing", "Severity 1 defect", "Close as passed UAT", "Apply immediately without approval"],
  },
] as const;

export const defectRecordFields = [
  "Unique ID and concise business-impact title",
  "Requirement, test case, process, module, cube, form/rule/integration, and environment",
  "Release/build plus metadata, rule, data, and configuration versions",
  "Preconditions, user/role, POV, input data, exact steps, and actual result",
  "Expected result with calculation, source, control total, or approved requirement",
  "Reproducibility, frequency, severity rationale, priority, owner, and target date",
  "Evidence links: screenshots where useful, logs, job IDs, data extracts, Smart View files, and reconciliations",
  "Fix version, deployment evidence, retest result, regression scope, closure approver, and residual risk",
] as const;

export const defectRecordCases = [
  { id: "REC-01", issue: "The record says only: 'Revenue is wrong.'", correct: "Add POV, release, steps, actual 47.6M, expected 48.2M, evidence, job ID, and reconciliation source", options: ["Add POV, release, steps, actual 47.6M, expected 48.2M, evidence, job ID, and reconciliation source", "Assign Severity 1 and send it to development", "Close because a screenshot is missing", "Create separate defects for every reviewer"] },
  { id: "REC-02", issue: "The issue occurs for one planner but not for the Service Administrator.", correct: "Capture both users' effective groups, member access, user variables, POV, and positive/negative evidence", options: ["Capture both users' effective groups, member access, user variables, POV, and positive/negative evidence", "Test only as administrator", "Remove the user's groups until the symptom disappears", "Treat access behavior as a training issue"] },
  { id: "REC-03", issue: "A failed data load is reported without a process ID or rejected-record file.", correct: "Record the integration job/process ID, source file checksum, mappings, rejected rows, logs, and control totals", options: ["Record the integration job/process ID, source file checksum, mappings, rejected rows, logs, and control totals", "Reload repeatedly and keep the final successful screenshot", "Change mappings directly in production", "Classify it as cosmetic"] },
] as const;

export const defectTriageCases = [
  { id: "TRI-01", issue: "West can edit East forecasts; UAT is still running.", correct: "Security lead owns diagnosis now; release manager treats it as an immediate blocker and expands negative-access regression", options: ["Security lead owns diagnosis now; release manager treats it as an immediate blocker and expands negative-access regression", "Wait for weekly triage", "Assign to the reporting team", "Defer because only one user found it"] },
  { id: "TRI-02", issue: "The same ASO revenue mismatch is logged by Finance and Sales with the same release, POV, and evidence.", correct: "Link as duplicates to one authoritative defect and retain both business impacts and evidence", options: ["Link as duplicates to one authoritative defect and retain both business impacts and evidence", "Fix both records independently", "Delete one report with no trace", "Count both as separate open blockers"] },
  { id: "TRI-03", issue: "A proposed fix changes the approved allocation method.", correct: "Stop defect processing and raise controlled change assessment because the proposed behavior changes the baseline", options: ["Stop defect processing and raise controlled change assessment because the proposed behavior changes the baseline", "Implement it as a defect fix", "Ask the developer to decide", "Update expected results after deployment"] },
  { id: "TRI-04", issue: "A Severity 3 dashboard label issue has a safe workaround and no financial or control impact.", correct: "Prioritize against release criteria; defer only with owner, target release, rationale, and authorized residual-risk acceptance", options: ["Prioritize against release criteria; defer only with owner, target release, rationale, and authorized residual-risk acceptance", "Close as fixed", "Upgrade automatically to Severity 1", "Ignore it because a workaround exists"] },
] as const;

export const defectLifecycle = ["New", "Validated", "Triaged", "Assigned", "In progress", "Ready for retest", "Retest passed", "Closed"] as const;

export const invalidLifecycleActions = [
  { id: "LIFE-01", issue: "Developer marks a defect Closed immediately after committing code.", correct: "Move to Ready for retest only after controlled deployment; an independent tester closes after passed retest and required regression", options: ["Move to Ready for retest only after controlled deployment; an independent tester closes after passed retest and required regression", "Keep Closed because unit testing is enough", "Delete the original evidence", "Change severity to reduce backlog"] },
  { id: "LIFE-02", issue: "Retest fails with the original symptom.", correct: "Reopen the same defect with new execution evidence, retain fix history, and reassess owner and target", options: ["Reopen the same defect with new execution evidence, retain fix history, and reassess owner and target", "Create an unrelated new defect and close the first", "Mark retest passed with a note", "Move directly to deferred"] },
  { id: "LIFE-03", issue: "The symptom changes after the fix and indicates a separate root cause.", correct: "Keep traceability to the original defect and create a linked defect when the new behavior has a distinct cause or remediation", options: ["Keep traceability to the original defect and create a linked defect when the new behavior has a distinct cause or remediation", "Overwrite the first defect description", "Close both without testing", "Treat every new symptom as a duplicate"] },
] as const;

export const defectRetestCases = [
  { id: "TEST-01", issue: "DEF-022 yield fix returns 13,000 for one product/month.", correct: "Retest the exact failed intersection, boundary cases, other products/plants/periods, consolidated totals, and downstream cost/COGS/reporting", options: ["Retest the exact failed intersection, boundary cases, other products/plants/periods, consolidated totals, and downstream cost/COGS/reporting", "Retest only the original cell", "Approve from the code review", "Compare only screen formatting"] },
  { id: "TEST-02", issue: "DEF-021 member-security fix blocks West from East.", correct: "Run negative and positive tests for West, East, reviewers, administrators, inherited groups, forms, Smart View, rules, and workflow", options: ["Run negative and positive tests for West, East, reviewers, administrators, inherited groups, forms, Smart View, rules, and workflow", "Test only that West is blocked", "Use the administrator for all tests", "Remove workflow from regression"] },
  { id: "TEST-03", issue: "DEF-023 publish fix aligns Plan1 and ASO for Revenue.", correct: "Reconcile record counts and balances by POV, rerun safely, verify other accounts, dashboards and Smart View, and retain source-to-target evidence", options: ["Reconcile record counts and balances by POV, rerun safely, verify other accounts, dashboards and Smart View, and retain source-to-target evidence", "Compare only total Revenue", "Accept any variance below 5%", "Skip repeatability testing"] },
] as const;

export const defectMetrics = [
  ["Open blockers", "0", "Severity 1 and release-blocking Severity 2 must be zero"],
  ["Overdue defects", "0", "No item beyond the approved target without escalation"],
  ["Retest pass rate", "100%", "For release-required fixes in the final candidate"],
  ["Reopened defects", "0", "In the release-readiness observation window"],
  ["Unowned defects", "0", "Every open or deferred item has an accountable owner"],
  ["Unapproved deferrals", "0", "Residual risk requires explicit authority and target release"],
] as const;

export const defectWarRoomControls = [
  "Confirm release/build, environment, data cut, register timestamp, and attendance before reviewing counts",
  "Review blockers and ageing by business impact—not only raw totals—and open the evidence for challenged items",
  "Confirm owner, next action, target, dependency, fix build, and retest window for every release-relevant defect",
  "Separate defects, duplicates, data corrections, access requests, support questions, and change requests",
  "Record decisions, deferrals, residual risks, approvals, and the next governed checkpoint in the register",
] as const;

export const defectHomeworkMissions = [
  { id: "classify", title: "Classify the queue", description: "Separate defects, change requests, severity, priority, and release impact." },
  { id: "record", title: "Repair the records", description: "Turn weak observations into reproducible, evidence-backed defect records." },
  { id: "triage", title: "Run triage", description: "Assign ownership, response, duplicates, escalation, and target decisions." },
  { id: "retest", title: "Design retest", description: "Prove the fix, regression boundary, reconciliation, and repeatability." },
  { id: "readout", title: "Recommend release", description: "Sequence the governance steps and write a defensible release recommendation." },
] as const;

export const defectReadoutSequence = ["Freeze register snapshot", "Review blockers and ageing", "Confirm fixes and retest", "Assess deferred residual risk", "Authorize release recommendation"] as const;

export const defectArtifacts = [
  "Approved defect-management plan and RACI",
  "Authoritative defect register with requirement/test traceability",
  "Triage decisions, SLA, ageing, and escalation evidence",
  "Fix-build and controlled-promotion evidence",
  "Retest, regression, and reconciliation results",
  "Duplicate, rejected, change-request, and deferred-item decisions",
  "Release-readiness dashboard and meeting minutes",
  "Authorized defect closure and residual-risk statement",
] as const;

export const defectKnowledgeQuestions = [
  { id: "K-01", question: "Who should close a corrected defect?", options: ["The independent tester or authorized business validator after passed retest and required regression", "The developer after committing code", "Any meeting attendee", "The application administrator before deployment"], correct: "The independent tester or authorized business validator after passed retest and required regression" },
  { id: "K-02", question: "What determines severity?", options: ["Business, financial, security, control, and operational impact", "Who reported it", "How difficult the fix is", "How old the record is"], correct: "Business, financial, security, control, and operational impact" },
  { id: "K-03", question: "When is deferral controlled?", options: ["When workaround, residual risk, owner, target release, rationale, and authorized approval are recorded", "Whenever the fix is inconvenient", "When UAT ends", "When a screenshot exists"], correct: "When workaround, residual risk, owner, target release, rationale, and authorized approval are recorded" },
  { id: "K-04", question: "What makes retest sufficient?", options: ["Original reproduction passes, impacted regression passes, reconciliations remain correct, and evidence identifies the tested build", "The developer says the issue is fixed", "One happy-path screen looks correct", "The severity is reduced"], correct: "Original reproduction passes, impacted regression passes, reconciliations remain correct, and evidence identifies the tested build" },
  { id: "K-05", question: "What must Phase 22 prove before cutover?", options: ["No release blocker remains and every accepted open item has controlled residual-risk ownership and authorization", "Every defect ever recorded is deleted", "All enhancements are implemented", "Only the defect count is known"], correct: "No release blocker remains and every accepted open item has controlled residual-risk ownership and authorization" },
] as const;
