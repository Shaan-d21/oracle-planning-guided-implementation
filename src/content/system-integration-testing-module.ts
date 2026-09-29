export const systemIntegrationTestingLessons = [
  { id: "sit-foundations", number: "01", title: "SIT purpose, scope, and readiness", duration: "18 min", type: "concept" },
  { id: "sit-coverage", number: "02", title: "Trace requirements, flows, and test coverage", duration: "28 min", type: "assessment" },
  { id: "sit-data-environment", number: "03", title: "Baseline the environment and test data", duration: "28 min", type: "wizard" },
  { id: "sit-end-to-end", number: "04", title: "Execute the end-to-end planning cycle", duration: "38 min", type: "simulation" },
  { id: "sit-negative-recovery", number: "05", title: "Test interfaces, failures, and recovery", duration: "32 min", type: "assessment" },
  { id: "sit-reconciliation", number: "06", title: "Reconcile modules, cubes, and statements", duration: "32 min", type: "assessment" },
  { id: "sit-channels-defects", number: "07", title: "Test security, workflow, channels, and defects", duration: "30 min", type: "assessment" },
  { id: "sit-walkthrough", number: "08", title: "Execute the SIT evidence walkthrough", duration: "30 min", type: "guided-screenshot" },
  { id: "sit-homework", number: "09", title: "Applied end-to-end SIT lab", duration: "48 min", type: "assessment" },
  { id: "sit-exit-gate", number: "10", title: "SIT results, evidence, and exit gate", duration: "24 min", type: "exit-gate" },
] as const;

export type SystemIntegrationTestingLessonId = (typeof systemIntegrationTestingLessons)[number]["id"];

export const sitReadinessControls = [
  "Phases 6–18 configuration, metadata, integrations, rules, forms, security, workflow, reporting, and scenario design are deployed to a stable SIT environment",
  "Every in-scope requirement and interface has an approved test case, expected result, owner, dependency, evidence method, and traceability reference",
  "The SIT data pack is synthetic or authorized, versioned, repeatable, reconciled to source controls, and isolated from production data",
  "Representative non-admin users, groups, forms, rules, Smart View workbooks, approval units, Task Manager schedules, and integrations are available",
  "Entry criteria, severity definitions, defect workflow, retest rules, regression scope, daily status, exit criteria, and decision authority are agreed",
] as const;

export const sitCoverageCases = [
  {
    id: "CV-01",
    issue: "A requirement is marked covered because a form opens, but its integration, rule, security, workflow, and reporting path are not tested.",
    correct: "Map the requirement to all affected components, interfaces, positive and negative cases, expected controls, and evidence",
    options: [
      "Map the requirement to all affected components, interfaces, positive and negative cases, expected controls, and evidence",
      "Treat the form screenshot as complete coverage",
      "Move the missing checks to UAT",
    ],
  },
  {
    id: "CV-02",
    issue: "The sales-to-production handoff has no explicit interface test.",
    correct: "Create a test that fixes source and target POV, grain, cutoff, calculation order, control totals, exceptions, and rerun behavior",
    options: [
      "Create a test that fixes source and target POV, grain, cutoff, calculation order, control totals, exceptions, and rerun behavior",
      "Assume downstream production proves the handoff",
      "Check only the company total",
    ],
  },
  {
    id: "CV-03",
    issue: "A test case contains the instruction Test planning and expected result Works correctly.",
    correct: "Rewrite it with preconditions, role, data, steps, exact expected results, tolerances, evidence, cleanup, and trace IDs",
    options: [
      "Rewrite it with preconditions, role, data, steps, exact expected results, tolerances, evidence, cleanup, and trace IDs",
      "Keep it because experienced testers understand",
      "Use pass or fail without values",
    ],
  },
  {
    id: "CV-04",
    issue: "Management asks SIT to prove response under 200 concurrent users.",
    correct: "Record functional timings and defer controlled concurrency, load, stress, endurance, and capacity evidence to Phase 20",
    options: [
      "Record functional timings and defer controlled concurrency, load, stress, endurance, and capacity evidence to Phase 20",
      "Ask 200 people to log in during SIT",
      "Ignore all timing during SIT",
    ],
  },
] as const;

export const sitDataCases = [
  {
    id: "TD-01",
    issue: "A tester edits the shared file during execution, so a rerun produces different results.",
    correct: "Freeze a versioned input fixture, checksum or otherwise identify it, and require a new controlled version for every change",
    options: [
      "Freeze a versioned input fixture, checksum or otherwise identify it, and require a new controlled version for every change",
      "Let each tester keep a personal copy",
      "Update expected results after every rerun",
    ],
  },
  {
    id: "TD-02",
    issue: "The environment already contains values from an earlier test cycle.",
    correct: "Run an approved reset or clear procedure, reload the baseline, verify zero or opening controls, and record the reset evidence",
    options: [
      "Run an approved reset or clear procedure, reload the baseline, verify zero or opening controls, and record the reset evidence",
      "Add the new data on top",
      "Ignore differences below company total",
    ],
  },
  {
    id: "TD-03",
    issue: "SIT uses a Service Administrator for every test because the account never encounters access errors.",
    correct: "Use representative business and technical roles; reserve administration for setup and explicitly administrative test steps",
    options: [
      "Use representative business and technical roles; reserve administration for setup and explicitly administrative test steps",
      "Continue because functional results matter more than access",
      "Disable security for SIT",
    ],
  },
  {
    id: "TD-04",
    issue: "The expected result spreadsheet was calculated from the same Planning output it is meant to verify.",
    correct: "Use independently derived source controls and transparent formulas with reviewer approval",
    options: [
      "Use independently derived source controls and transparent formulas with reviewer approval",
      "Copy Planning values into expected results",
      "Accept matching screenshots as independent evidence",
    ],
  },
] as const;

export const sitInterfaceCases = [
  {
    id: "IF-01",
    issue: "The source file contains an unmapped Product and the integration is executed.",
    correct: "Validation fails before export, the reject is visible in Workbench or logs, no partial target result is accepted, and the corrected fixture is retested",
    options: [
      "Validation fails before export, the reject is visible in Workbench or logs, no partial target result is accepted, and the corrected fixture is retested",
      "Map the product to No Product automatically",
      "Ignore one rejected row",
    ],
  },
  {
    id: "IF-02",
    issue: "A data load or ruleset fails after earlier steps succeeded.",
    correct: "Inspect Process Details or Jobs, prove the target state, correct the cause, execute the documented restart point, and reconcile the rerun",
    options: [
      "Inspect Process Details or Jobs, prove the target state, correct the cause, execute the documented restart point, and reconcile the rerun",
      "Rerun the entire month repeatedly without checking state",
      "Change target values manually",
    ],
  },
  {
    id: "IF-03",
    issue: "The same integration is rerun after a timeout and doubles the target values.",
    correct: "Fail the idempotency test, restore the baseline, correct import and export modes or clearing logic, and retest repeatability",
    options: [
      "Fail the idempotency test, restore the baseline, correct import and export modes or clearing logic, and retest repeatability",
      "Divide totals by two",
      "Accept the first run only",
    ],
  },
  {
    id: "IF-04",
    issue: "A rule is launched with Actual / Final instead of Forecast / Working.",
    correct: "The prompt or rule guardrail denies execution, protected data remains unchanged, and the negative result is retained",
    options: [
      "The prompt or rule guardrail denies execution, protected data remains unchanged, and the negative result is retained",
      "Allow the run and reload Actual afterward",
      "Hide the job record",
    ],
  },
  {
    id: "IF-05",
    issue: "Plan1 calculation succeeds but the data map to ApexPlan ASO fails.",
    correct: "Keep the reporting result unreleased, correct and rerun the scoped movement, then reconcile source and target before continuing",
    options: [
      "Keep the reporting result unreleased, correct and rerun the scoped movement, then reconcile source and target before continuing",
      "Use the previous dashboard values",
      "Enter ASO totals manually",
    ],
  },
] as const;

export const sitReconciliationCases = [
  {
    id: "RC-01",
    issue: "Consensus demand is 1,380 units, but production plus inventory response does not explain the requirement.",
    correct: "Trace demand, opening inventory, target inventory, yield, lot rounding, planned production, and closing inventory at the same grain",
    options: [
      "Trace demand, opening inventory, target inventory, yield, lot rounding, planned production, and closing inventory at the same grain",
      "Compare only total revenue",
      "Adjust production until totals match",
    ],
  },
  {
    id: "RC-02",
    issue: "Gross margin agrees at company level but differs by Product and Entity.",
    correct: "Fail the reconciliation and resolve dimensional mapping, aggregation, allocation, or sign logic at the lowest controlled grain",
    options: [
      "Fail the reconciliation and resolve dimensional mapping, aggregation, allocation, or sign logic at the lowest controlled grain",
      "Pass because company total agrees",
      "Suppress the detailed variance",
    ],
  },
  {
    id: "RC-03",
    issue: "The balance-sheet control is 0.01 when the approved full-precision tolerance is zero.",
    correct: "Fail the test, diagnose the source or formula at full precision, correct it, and rerun affected dependencies",
    options: [
      "Fail the test, diagnose the source or formula at full precision, correct it, and rerun affected dependencies",
      "Round the dashboard to zero",
      "Increase the tolerance after execution",
    ],
  },
  {
    id: "RC-04",
    issue: "Plan1 and ApexPlan ASO agree for revenue but not for exception counts.",
    correct: "Reconcile all approved controls, including exception definitions and counts, before releasing reporting",
    options: [
      "Reconcile all approved controls, including exception definitions and counts, before releasing reporting",
      "Release because financial totals agree",
      "Remove exceptions from ASO",
    ],
  },
] as const;

export const sitChannelCases = [
  {
    id: "CH-01",
    issue: "A planner can submit an unauthorized Smart View cell that is protected on the web.",
    correct: "Raise a critical security defect, preserve evidence, block exit, and correct effective access across both channels",
    options: [
      "Raise a critical security defect, preserve evidence, block exit, and correct effective access across both channels",
      "Document Smart View as an exception",
      "Remove the web form",
    ],
  },
  {
    id: "CH-02",
    issue: "The Task Manager task is approved but the Planning approval unit remains with the preparer.",
    correct: "Fail the workflow reconciliation and correct the process or integration; one status does not replace the other",
    options: [
      "Fail the workflow reconciliation and correct the process or integration; one status does not replace the other",
      "Treat Task Manager as final authority",
      "Manually change the report status",
    ],
  },
  {
    id: "CH-03",
    issue: "A defect fix changes a shared rule used by sales, production, costing, and statements.",
    correct: "Retest the defect and execute risk-based regression across every impacted requirement, interface, module, role, and report",
    options: [
      "Retest the defect and execute risk-based regression across every impacted requirement, interface, module, role, and report",
      "Retest only the original failed step",
      "Wait for UAT to find regressions",
    ],
  },
  {
    id: "CH-04",
    issue: "A medium defect has an approved workaround and no material control or financial impact.",
    correct: "Record severity, workaround, residual risk, owner, target release, approver, and exit-gate disposition",
    options: [
      "Record severity, workaround, residual risk, owner, target release, approver, and exit-gate disposition",
      "Close it without evidence",
      "Reclassify it as passed",
    ],
  },
] as const;

export const sitTestCases = [
  { id: "ST-01", issue: "Clean integration fixture: 240 source rows, all mapped, zero rejects, and 1,380 controlled units.", correct: "Pass only when Process Details, Workbench, target counts, units, and source-to-Plan1 reconciliation agree", options: ["Pass only when Process Details, Workbench, target counts, units, and source-to-Plan1 reconciliation agree", "Pass when the job status is green", "Pass when 239 rows load"] },
  { id: "ST-02", issue: "A negative fixture contains one invalid Product member.", correct: "Pass the negative test only when validation blocks export and identifies the rejected member without an accepted partial result", options: ["Pass the negative test only when validation blocks export and identifies the rejected member without an accepted partial result", "Pass when the file partially loads", "Pass when the tester knows the problem"] },
  { id: "ST-03", issue: "End-to-end plan finishes with balance control zero and Plan1-to-ASO reporting variance zero.", correct: "Pass after independent detailed and aggregate controls confirm the same POV, cutoff, currency, and calculation version", options: ["Pass after independent detailed and aggregate controls confirm the same POV, cutoff, currency, and calculation version", "Pass from dashboard appearance", "Pass if values are close"] },
  { id: "ST-04", issue: "An approved-unit rejection returns ownership and preserves the annotation; Task Manager also returns the related task.", correct: "Pass when both workflows show the expected owner, state, reason, timestamps, and retained evidence", options: ["Pass when both workflows show the expected owner, state, reason, timestamps, and retained evidence", "Pass when an email is sent", "Pass when an administrator can change the state"] },
  { id: "ST-05", issue: "The same controlled cycle is rerun after reset.", correct: "Pass when results and controls repeat within approved tolerances without duplicate data or unexplained artifacts", options: ["Pass when results and controls repeat within approved tolerances without duplicate data or unexplained artifacts", "Pass if only revenue repeats", "Pass if the second run is faster"] },
] as const;

export const sitExecutionSequence = [
  "Approve SIT scope, requirements coverage, interfaces, roles, environment, data pack, expected results, entry criteria, and schedule",
  "Reset the SIT environment, deploy the approved build, capture configuration versions, and prove opening controls",
  "Load and validate actuals, mappings, exchange rates, opening balances, source counts, control totals, rejects, logs, and target results",
  "Execute sales, consensus demand, inventory, production, capacity, cost, workforce, CapEx, and financial dependencies in governed order",
  "Publish approved results from Plan1 to ApexPlan ASO and reconcile detailed and aggregate controls",
  "Execute forms, dashboards, Smart View, rules, security, approval units, Task Manager, reports, and cross-channel tests with representative users",
  "Run negative, boundary, failure, restart, repeatability, and regression tests; log defects with complete evidence and impact",
  "Reconcile coverage, executions, passes, failures, blocked tests, defects, retests, residual risks, waivers, and obtain the SIT exit decision",
] as const;

export const sitReconciliationControls = [
  "Source files, staged rows, mappings, rejected rows, loaded rows, source totals, and Plan1 target totals agree",
  "Consensus demand, inventory targets, production requirements, plant allocations, capacity, workforce, and CapEx dependencies reconcile at controlled grain",
  "Material, labor, overhead, inventory valuation, COGS, gross margin, P&L, cash flow, balance sheet, and balance control reconcile at full precision",
  "Plan1 and ApexPlan ASO agree for Units, Revenue, COGS, Gross Margin, Net Income, Closing Cash, and material exception counts",
  "Web forms, dashboards, Smart View, business rules, member access, rule launch rights, approval units, and Task Manager show consistent authorized behavior",
  "Requirements, test cases, executions, evidence, defects, fixes, retests, regression, residual risks, waivers, and exit approval are completely traceable",
] as const;

export const sitWalkthroughControls = [
  "Use one versioned SIT cycle with visible environment, build version, data-pack version, Scenario, Version, Entity, Year, Period, currency, role, and execution ID",
  "Capture source controls, Process Details, Workbench or validation evidence, target results, jobs, prompts, timestamps, messages, and rerun identifiers",
  "Keep every cross-module handoff and reconciliation at the same approved grain before relying on company-level totals",
  "Include at least one expected failure, controlled recovery, repeatability test, security denial, workflow rejection, defect retest, and regression result",
  "Hide tenant URLs, users, email addresses, connections, client data, notifications, and unrelated environments in every retained screenshot",
] as const;

export const sitHomeworkMissions = [
  { id: "coverage", label: "Coverage and data", purpose: "Design traceable cases and a repeatable environment baseline." },
  { id: "cycle", label: "End-to-end cycle", purpose: "Execute the integrated planning chain with controlled evidence." },
  { id: "recovery", label: "Failure and recovery", purpose: "Prove rejects, guardrails, restart points, and idempotency." },
  { id: "controls", label: "Controls and channels", purpose: "Reconcile modules, cubes, roles, workflow, and Smart View." },
  { id: "readout", label: "SIT exit readout", purpose: "Summarize coverage, defects, retest, risks, and the exit decision." },
] as const;

export const sitArtifacts = [
  "Approved SIT strategy and plan covering objectives, scope, exclusions, environment, roles, schedule, entry, suspension, resumption, severity, evidence, and exit criteria",
  "Requirement-to-test and interface coverage matrix with positive, negative, boundary, recovery, repeatability, security, workflow, and regression cases",
  "Versioned SIT data pack with authorized source fixtures, expected results, independent formulas, control totals, reset procedure, owners, and approvals",
  "End-to-end execution evidence covering integrations, Workbench, jobs, runtime prompts, forms, rules, modules, workflows, reports, Smart View, and timestamps",
  "Cross-module, statement, source-to-Plan1, and Plan1-to-ApexPlan ASO reconciliation package with full-precision controls and reviewer sign-off",
  "Defect register with reproducible steps, expected and actual results, evidence, severity, impact, root cause, owner, fix build, retest, regression, and disposition",
  "SIT status and results report with planned and executed tests, pass/fail/blocked counts, coverage, defects by severity, aging, retest, risks, waivers, and trend",
  "Approved SIT exit record with unresolved items, workarounds, residual risks, owners, target releases, regression scope, UAT handoff, and decision authority",
] as const;

export const sitKnowledgeQuestions = [
  { id: "K-01", prompt: "What is SIT proving?", correct: "Configured components and interfaces work together end to end under controlled data, roles, workflow, and evidence", options: ["Configured components and interfaces work together end to end under controlled data, roles, workflow, and evidence", "Business users prefer the application", "The system supports peak concurrent load"] },
  { id: "K-02", prompt: "What makes expected results independent?", correct: "They come from approved source controls and transparent calculations rather than the output being tested", options: ["They come from approved source controls and transparent calculations rather than the output being tested", "They are copied from the dashboard", "They were produced by an administrator"] },
  { id: "K-03", prompt: "What must happen after an integration or ruleset failure?", correct: "Prove the resulting state, correct the cause, restart from the documented point, rerun, and reconcile", options: ["Prove the resulting state, correct the cause, restart from the documented point, rerun, and reconcile", "Keep rerunning until green", "Edit the target totals"] },
  { id: "K-04", prompt: "When is a defect fix complete?", correct: "The original case passes on the fix build and risk-based regression proves no unacceptable impact", options: ["The original case passes on the fix build and risk-based regression proves no unacceptable impact", "The developer marks it fixed", "The error message disappears"] },
  { id: "K-05", prompt: "What is required for SIT exit?", correct: "Agreed coverage and pass criteria, controlled defect disposition, reconciled evidence, residual-risk approval, and formal decision", options: ["Agreed coverage and pass criteria, controlled defect disposition, reconciled evidence, residual-risk approval, and formal decision", "Every screen has a screenshot", "No tester has more time"] },
] as const;

export const sitScreenshots = [
  { id: "SIT-UI-01", title: "Confirm the SIT baseline", path: "SIT control sheet + Oracle Home / About / configuration evidence", asset: "01-sit-environment-baseline.png", capture: "Stable SIT environment with build, metadata, rule, form, security, data-pack, Scenario, Version, Entity, period, currency, and tester-role references.", action: "Match every deployed component and fixture to the approved baseline before execution begins.", evidence: "Environment, build IDs, artifact versions, fixture checksum or identifier, opening controls, date, owner, and reviewer retained." },
  { id: "SIT-UI-02", title: "Inspect Data Integration Process Details", path: "Application → Data Exchange → Data Integration → Actions → Process Details", asset: "02-data-integration-process-details.png", capture: "Clean actuals load showing import, validation, export steps, process ID, status, operator, timestamps, warnings, and log or output access.", action: "Open each process step, verify the controlled fixture and runtime options, and download logs when warnings or errors exist.", evidence: "Process ID, location, source, target, periods, modes, file version, steps, messages, row controls, duration, and log reference captured." },
  { id: "SIT-UI-03", title: "Validate mappings and rejected data", path: "Data Integration → integration → Workbench / validation results", asset: "03-workbench-validation.png", capture: "Mapped clean fixture or deliberately rejected invalid Product with source values, target members, validation status, and reject evidence.", action: "Prove the clean case maps all 240 rows and the negative case blocks export with the precise unmapped member.", evidence: "Source rows, mapped rows, rejects, member, mapping rule, correction, rerun, target rows, and reviewer retained." },
  { id: "SIT-UI-04", title: "Execute the planning dependency chain", path: "Forms / Rules / Application → Jobs", asset: "04-planning-job-chain.png", capture: "Sales through inventory, production, cost, workforce, CapEx, statements, and reporting jobs with common POV and governed order.", action: "Run each approved rule or ruleset, inspect prompts and results, and stop when a dependency fails.", evidence: "Rule versions, order, prompts, operator, job IDs, start and end times, messages, values, and restart reference captured." },
  { id: "SIT-UI-05", title: "Reconcile cross-module handoffs", path: "SIT controls → demand, inventory, production, capacity, cost, and dependency reconciliation forms", asset: "05-cross-module-reconciliation.png", capture: "Detailed bridge from 1,380 consensus units through inventory, production starts, hours, utilization, costs, and dependency impacts.", action: "Compare source and target at the lowest controlled Product × Entity × Month grain before confirming aggregate totals.", evidence: "Inputs, formulas, outputs, differences, tolerances, exception owner, correction, rerun, and reviewer captured." },
  { id: "SIT-UI-06", title: "Validate integrated statements", path: "Financial Statement Integration → P&L / cash flow / balance sheet / reconciliation", asset: "06-financial-statement-controls.png", capture: "Revenue, COGS, gross margin, net income, working capital, closing cash, balance sheet, and full-precision balance control.", action: "Trace every material line to its operational or financial source and require balance control to equal zero.", evidence: "Statement values, source versions, movement bridge, signs, currency, balance control, tolerance, and finance review retained." },
  { id: "SIT-UI-07", title: "Publish and reconcile ApexPlan ASO", path: "Data map / Smart Push / Jobs → ApexPlan ASO comparison", asset: "07-aso-publish-reconciliation.png", capture: "Plan1 source, ApexPlan ASO target, data-movement job, and side-by-side controls for approved measures and exceptions.", action: "Run the scoped publish only after Plan1 passes, then compare identical POVs and block reporting on any unexplained difference.", evidence: "Job ID, source and target POV, units, revenue, COGS, margin, income, cash, exceptions, zero differences, and sign-off captured." },
  { id: "SIT-UI-08", title: "Test security and workflow together", path: "Forms / Smart View + Manage Approvals + Task Manager", asset: "08-security-workflow-integration.png", capture: "Representative allowed input, denied action, approval-unit ownership, rejection annotation, related Task Manager state, and retained timestamps.", action: "Execute with distinct planner, reviewer, approver, viewer, and administrator roles and reconcile both workflow systems.", evidence: "Identity role, allowed and denied result, owner, state, reason, task status, timestamps, alerts, and audit reference captured." },
  { id: "SIT-UI-09", title: "Verify Smart View and dashboard results", path: "Connected Smart View workbook + ApexPlan dashboard", asset: "09-smart-view-dashboard-reconciliation.png", capture: "Common POV showing web form, connected workbook, dashboard KPIs, refresh-submit-refresh behavior, and reconciled results.", action: "Prove consistent authorized behavior and values across channels, including a protected cell and a data-validation result.", evidence: "Connection, role, POV, input, refresh, submission, denial, KPI values, variances, and reviewer captured." },
  { id: "SIT-UI-10", title: "Review SIT status and exit evidence", path: "SIT results dashboard / defect register / traceability matrix", asset: "10-sit-results-exit.png", capture: "Coverage, execution, pass/fail/blocked totals, defects by severity, retest, regression, open risks, waivers, and exit criteria.", action: "Reconcile every count to detailed records, challenge open critical items, and obtain the authorized exit decision.", evidence: "Scope, totals, coverage, defect IDs, aging, fix builds, retest, regression, risks, waivers, owners, decision, and date captured." },
] as const;
