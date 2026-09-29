export const scenarioWhatIfLessons = [
  { id: "scenario-foundations", number: "01", title: "Scenario modeling foundations and guardrails", duration: "18 min", type: "concept" },
  { id: "scenario-version-design", number: "02", title: "Design the Scenario and Version structure", duration: "28 min", type: "assessment" },
  { id: "baseline-copy-control", number: "03", title: "Freeze and copy the approved baseline", duration: "28 min", type: "wizard" },
  { id: "driver-assumptions", number: "04", title: "Define governed what-if drivers", duration: "30 min", type: "assessment" },
  { id: "scenario-model", number: "05", title: "Run the Upside and Downside model", duration: "36 min", type: "simulation" },
  { id: "compare-decide", number: "06", title: "Compare outcomes and make a decision", duration: "30 min", type: "simulation" },
  { id: "promote-publish", number: "07", title: "Promote, approve, and publish the selected case", duration: "28 min", type: "assessment" },
  { id: "scenario-walkthrough", number: "08", title: "Execute the scenario walkthrough", duration: "30 min", type: "guided-screenshot" },
  { id: "scenario-homework", number: "09", title: "Applied what-if planning lab", duration: "46 min", type: "assessment" },
  { id: "scenario-exit-gate", number: "10", title: "Decision package, evidence, and exit gate", duration: "24 min", type: "exit-gate" },
] as const;

export type ScenarioWhatIfLessonId = (typeof scenarioWhatIfLessons)[number]["id"];

export const scenarioReadinessControls = [
  "The Phase 17 approved Forecast / Working planning unit has been copied to a protected Forecast / Final baseline with retained job and approval evidence",
  "Plan1 remains the calculation cube and ApexPlan ASO remains the reconciled comparison and management-reporting cube",
  "Upside and Downside are controlled Version members under the Forecast Scenario; Sandboxes and Strategic Modeling remain disabled and out of scope",
  "Every what-if driver has a definition, unit, source, owner, permitted range, effective period, dependency, and approval requirement",
  "Alternative versions cannot overwrite Actual, Budget, Forecast / Final, or another user's approved planning scope",
] as const;

export const scenarioVersionCases = [
  {
    id: "SV-01",
    issue: "Apex wants comparable Base, Upside, and Downside outcomes without changing the meaning of Actual, Budget, or Forecast.",
    correct: "Keep Forecast as the Scenario and use Final, Upside, and Downside Version members for controlled alternatives",
    options: [
      "Keep Forecast as the Scenario and use Final, Upside, and Downside Version members for controlled alternatives",
      "Create a new application for every alternative",
      "Store scenario names in comments only",
    ],
  },
  {
    id: "SV-02",
    issue: "The approved Forecast / Final baseline must remain unchanged while alternatives are modeled.",
    correct: "Protect Final, copy it to separate writable what-if versions, and retain the source scope and copy-job evidence",
    options: [
      "Protect Final, copy it to separate writable what-if versions, and retain the source scope and copy-job evidence",
      "Edit Final and rely on Undo",
      "Export Final to an offline workbook and make it the new source of truth",
    ],
  },
  {
    id: "SV-03",
    issue: "A planner requests a private Sandbox, but Sandboxes were disabled when ApexPlan was created.",
    correct: "Use the approved Version-based method; enabling Sandboxes would require a separate governed design decision and impact review",
    options: [
      "Use the approved Version-based method; enabling Sandboxes would require a separate governed design decision and impact review",
      "Assume every form has a Sandbox",
      "Enable Strategic Modeling instead",
    ],
  },
  {
    id: "SV-04",
    issue: "Management asks for a currency-rate sensitivity in this Simplified Multicurrency application.",
    correct: "Keep the operating scenario in INR, document the governed INR-per-USD rate assumption, and translate only monetary reporting results before comparison",
    options: [
      "Keep the operating scenario in INR, document the governed INR-per-USD rate assumption, and translate only monetary reporting results before comparison",
      "Type converted values directly into reporting accounts",
      "Change the application's main currency for each case",
    ],
  },
] as const;

export const baselineCopyCases = [
  {
    id: "BC-01",
    issue: "The Upside version is created from an unapproved Working plan.",
    correct: "Stop and use the approved, reconciled Forecast / Final baseline with a recorded cutoff and approval reference",
    options: [
      "Stop and use the approved, reconciled Forecast / Final baseline with a recorded cutoff and approval reference",
      "Continue because Working is newer",
      "Average Working and Final",
    ],
  },
  {
    id: "BC-02",
    issue: "A planner needs Final copied to Upside, but Copy Versions is an administrator function.",
    correct: "Use an approved administrator-operated copy request with exact Scenario, source, target, Entity, period, data types, and evidence",
    options: [
      "Use an approved administrator-operated copy request with exact Scenario, source, target, Entity, period, data types, and evidence",
      "Grant the planner Service Administrator permanently",
      "Copy values manually without control totals",
    ],
  },
  {
    id: "BC-03",
    issue: "Comments and supporting detail explain material assumptions in Final.",
    correct: "Decide explicitly whether comments, attachments, and supporting detail are copied, then verify each selected data type",
    options: [
      "Decide explicitly whether comments, attachments, and supporting detail are copied, then verify each selected data type",
      "Assume Copy Versions always includes everything",
      "Delete the explanatory detail before copying",
    ],
  },
  {
    id: "BC-04",
    issue: "The source version belongs to an approved approval unit.",
    correct: "Recognize that copying a version does not copy data into approved approval units; define the target workflow and state separately",
    options: [
      "Recognize that copying a version does not copy data into approved approval units; define the target workflow and state separately",
      "Assume approval status is copied with the data",
      "Reopen Final just to perform the copy",
    ],
  },
] as const;

export const driverGovernanceCases = [
  {
    id: "DG-01",
    issue: "The Upside case says sales will be better without quantifying the change.",
    correct: "Define volume and price changes by Product, Market, Channel, Entity, and month with source, range, owner, and rationale",
    options: [
      "Define volume and price changes by Product, Market, Channel, Entity, and month with source, range, owner, and rationale",
      "Increase total revenue directly",
      "Add a positive comment and leave drivers unchanged",
    ],
  },
  {
    id: "DG-02",
    issue: "Demand increases but production, inventory, workforce, CapEx, COGS, cash, and statements are not rerun.",
    correct: "Execute the governed dependency chain and expose capacity, inventory, cost, cash, and financial exceptions",
    options: [
      "Execute the governed dependency chain and expose capacity, inventory, cost, cash, and financial exceptions",
      "Change revenue only",
      "Copy the baseline financial statements unchanged",
    ],
  },
  {
    id: "DG-03",
    issue: "One scenario changes volume, price, material cost, capacity, and payment timing simultaneously.",
    correct: "Retain a driver bridge and run single-driver sensitivities before interpreting the combined case",
    options: [
      "Retain a driver bridge and run single-driver sensitivities before interpreting the combined case",
      "Attribute the full outcome to volume",
      "Remove the baseline comparison",
    ],
  },
  {
    id: "DG-04",
    issue: "A driver is outside its approved range but produces an attractive outcome.",
    correct: "Flag it as an exception, require evidence and approval, and keep it out of the recommended case until resolved",
    options: [
      "Flag it as an exception, require evidence and approval, and keep it out of the recommended case until resolved",
      "Accept it because the result is favorable",
      "Hide the range breach from the dashboard",
    ],
  },
] as const;

export const comparisonCases = [
  {
    id: "CP-01",
    issue: "Upside has higher revenue but exceeds the approved 95% capacity threshold.",
    correct: "Show the capacity breach, required action, cost, timing, owner, and residual risk before recommending it",
    options: [
      "Show the capacity breach, required action, cost, timing, owner, and residual risk before recommending it",
      "Recommend it on revenue alone",
      "Suppress utilization from the comparison",
    ],
  },
  {
    id: "CP-02",
    issue: "Downside protects cash but materially reduces gross margin and service level.",
    correct: "Compare the full KPI set and explicitly document the trade-off, trigger, and contingency decision",
    options: [
      "Compare the full KPI set and explicitly document the trade-off, trigger, and contingency decision",
      "Choose the case with the highest cash automatically",
      "Ignore operational service measures",
    ],
  },
  {
    id: "CP-03",
    issue: "Dashboard totals differ from the detailed Plan1 scenario calculation.",
    correct: "Do not decide until the scoped data movement and Plan1-to-ApexPlan ASO reconciliation are corrected",
    options: [
      "Do not decide until the scoped data movement and Plan1-to-ApexPlan ASO reconciliation are corrected",
      "Use whichever total looks reasonable",
      "Adjust the dashboard formula manually",
    ],
  },
  {
    id: "CP-04",
    issue: "Management asks which driver caused the result.",
    correct: "Use a baseline-to-scenario bridge and single-driver sensitivity evidence rather than only the final variance",
    options: [
      "Use a baseline-to-scenario bridge and single-driver sensitivity evidence rather than only the final variance",
      "Attribute all variance to the scenario name",
      "Provide only the ending net income",
    ],
  },
] as const;

export const promotionCases = [
  {
    id: "PP-01",
    issue: "Management selects Upside as the operating candidate.",
    correct: "Copy the approved driver set and results into the governed Forecast / Working cycle, rerun dependencies, and re-enter approval workflow",
    options: [
      "Copy the approved driver set and results into the governed Forecast / Working cycle, rerun dependencies, and re-enter approval workflow",
      "Rename Upside to Final immediately",
      "Publish the dashboard without workflow",
    ],
  },
  {
    id: "PP-02",
    issue: "Only revenue and margin are moved into Working while operational drivers remain baseline.",
    correct: "Reject the partial promotion and move the coherent driver set through the full dependency chain",
    options: [
      "Reject the partial promotion and move the coherent driver set through the full dependency chain",
      "Accept the financial totals as overrides",
      "Keep operational calculations in Upside permanently",
    ],
  },
  {
    id: "PP-03",
    issue: "The selected case changes an approved planning unit.",
    correct: "Use the controlled reopen or new-cycle process with impact analysis, authorization, validation, and reapproval",
    options: [
      "Use the controlled reopen or new-cycle process with impact analysis, authorization, validation, and reapproval",
      "Overwrite approved data as administrator",
      "Delete the prior approval history",
    ],
  },
  {
    id: "PP-04",
    issue: "The selected case is published to ApexPlan ASO.",
    correct: "Retain source and target POV, job ID, control totals, scenario label, reconciliation, approver, and publish timestamp",
    options: [
      "Retain source and target POV, job ID, control totals, scenario label, reconciliation, approver, and publish timestamp",
      "Treat a successful job status as sufficient evidence",
      "Remove the scenario label after publishing",
    ],
  },
] as const;

export const scenarioTestCases = [
  { id: "SC-01", issue: "Forecast / Final is edited during an Upside analysis.", correct: "Fail: the protected approved baseline must remain unchanged", options: ["Fail: the protected approved baseline must remain unchanged", "Pass if the total improves", "Pass for administrators"] },
  { id: "SC-02", issue: "Upside is copied from Final for the approved Entity and period scope and reconciles before driver changes.", correct: "Pass: the candidate begins from a controlled, like-for-like baseline", options: ["Pass: the candidate begins from a controlled, like-for-like baseline", "Fail because copies are never allowed", "Pass without retaining the copy job"] },
  { id: "SC-03", issue: "Demand changes are calculated but capacity and cash are not rerun.", correct: "Fail: the scenario is incomplete and cannot support a decision", options: ["Fail: the scenario is incomplete and cannot support a decision", "Pass because revenue is available", "Pass if the change is positive"] },
  { id: "SC-04", issue: "Plan1 and ApexPlan ASO agree for Units, Revenue, Gross Margin, Net Income, Closing Cash, and exception counts.", correct: "Pass: reporting is reconciled to the calculated source scope", options: ["Pass: reporting is reconciled to the calculated source scope", "Fail because ASO totals should differ", "Pass only if the dashboard is faster"] },
  { id: "SC-05", issue: "A selected scenario is promoted without owner, rationale, trigger, risk, and approval evidence.", correct: "Fail: selection and promotion are not governed or auditable", options: ["Fail: selection and promotion are not governed or auditable", "Pass if management mentioned it in a meeting", "Pass if the planner created it"] },
] as const;

export const scenarioExecutionSequence = [
  "Confirm decision question, horizon, planning grain, owners, security, driver ranges, and success measures",
  "Freeze and reconcile the approved Forecast / Final baseline in Plan1 and ApexPlan ASO",
  "Copy Final to separate Upside and Downside versions for the exact Entity, account, period, and custom-dimension scope",
  "Validate copied values, comments, attachments, supporting detail, security, and target workflow state",
  "Enter governed driver assumptions without overwriting calculated outputs or unrelated intersections",
  "Run sales, inventory, production, capacity, cost, dependency, financial, and reporting calculations in controlled order",
  "Compare outcomes, driver bridges, thresholds, exceptions, sensitivity, feasibility, cash, and residual risks",
  "Approve the selected case, promote it through Forecast / Working, reapprove affected units, publish, and reconcile",
] as const;

export const scenarioReconciliationControls = [
  "Each Upside and Downside opening value agrees with Forecast / Final for the copied baseline scope before changes",
  "Driver inputs, effective periods, ranges, owners, sources, and comments agree with the approved assumption register",
  "Demand, inventory, production, capacity, workforce, CapEx, COGS, financial statements, and cash agree across the dependency chain",
  "Plan1 and ApexPlan ASO agree for Units, Revenue, Gross Margin, Net Income, Closing Cash, and exception counts",
  "The comparison dashboard and Smart View analysis use identical Scenario, Version, Entity, Product, period, currency, and cutoff context",
  "The selected case, promotion, workflow state, publish job, decision rationale, rejected alternatives, exceptions, and approvals are traceable",
] as const;

export const scenarioWalkthroughControls = [
  "Use one authorized ApexPlan training cycle and keep Forecast, Version, Entity, Year, Period, currency, cube, and user role visible",
  "Capture the protected Forecast / Final baseline, separate Upside and Downside versions, and the exact copy scope before driver changes",
  "Show driver inputs separately from calculated outputs and retain validation messages, job scope, timestamps, and reconciliation controls",
  "Include operational feasibility, financial outcome, cash effect, sensitivity, exception ownership, and the decision—not only revenue variance",
  "Capture selected-case promotion and reapproval without exposing users, tenant URLs, connection details, notifications, or unrelated data",
] as const;

export const scenarioHomeworkMissions = [
  { id: "design", label: "Version design", purpose: "Choose the governed member structure and protected baseline." },
  { id: "copy", label: "Baseline and copy", purpose: "Control the source, scope, data types, workflow state, and evidence." },
  { id: "drivers", label: "Driver governance", purpose: "Define traceable assumptions and dependency reruns." },
  { id: "model", label: "Upside and Downside", purpose: "Run both cases and compare operational and financial outcomes." },
  { id: "readout", label: "Decision readout", purpose: "Reconcile, select, govern, and defend the release recommendation." },
] as const;

export const scenarioArtifacts = [
  "Approved Scenario and Version design with member purpose, security, time range, exchange-rate treatment, workflow use, retention, and owner",
  "Protected Forecast / Final baseline record with cutoff, approval reference, Plan1 and ApexPlan ASO controls, and copy authorization",
  "Version-copy evidence covering source, destination, Entity, accounts, periods, custom dimensions, comments, attachments, supporting detail, operator, and job result",
  "Governed driver register with definitions, units, source, range, effective periods, dependencies, owners, reviewers, rationale, and exceptions",
  "Upside and Downside calculation results with dependency jobs, operational feasibility, full financial statements, cash impact, and driver bridges",
  "Reconciled comparison dashboard and Smart View package with common POV, KPI definitions, sensitivities, thresholds, exceptions, and drill evidence",
  "Selected-case decision and promotion record with rationale, triggers, rejected alternatives, risks, actions, owners, workflow, and approval evidence",
  "Scenario operating guide with creation, copy, calculation, comparison, promotion, publish, reconciliation, retention, security, support, and rollback procedures",
] as const;

export const scenarioKnowledgeQuestions = [
  { id: "K-01", prompt: "How are alternatives modeled in this ApexPlan release?", correct: "As controlled Version members under the Forecast Scenario", options: ["As controlled Version members under the Forecast Scenario", "As separate applications", "As private Sandboxes"] },
  { id: "K-02", prompt: "What is the approved comparison baseline?", correct: "Protected and reconciled Forecast / Final", options: ["Protected and reconciled Forecast / Final", "Whichever Working data was edited last", "An offline spreadsheet"] },
  { id: "K-03", prompt: "What must happen after a demand driver changes?", correct: "The governed operational, cost, financial, cash, and reporting dependency chain must rerun", options: ["The governed operational, cost, financial, cash, and reporting dependency chain must rerun", "Only the revenue total changes", "Nothing until year end"] },
  { id: "K-04", prompt: "What makes scenarios comparable?", correct: "A common baseline, grain, horizon, POV, formulas, cutoff, and reconciled KPI definitions", options: ["A common baseline, grain, horizon, POV, formulas, cutoff, and reconciled KPI definitions", "Different measures for each case", "Similar scenario names"] },
  { id: "K-05", prompt: "How does a selected case enter the official plan?", correct: "Through controlled promotion into Forecast / Working, dependency reruns, workflow, approval, publish, and reconciliation", options: ["Through controlled promotion into Forecast / Working, dependency reruns, workflow, approval, publish, and reconciliation", "By renaming the what-if version Final", "By emailing the dashboard"] },
] as const;

export const scenarioScreenshots = [
  { id: "SC-UI-01", title: "Review Scenario and Version members", path: "Application → Overview → Dimensions → Scenario / Version", asset: "01-scenario-version-members.png", capture: "Forecast Scenario and Final, Working, Upside, and Downside Version members with relevant properties.", action: "Confirm member purpose, aliases, storage, workflow use, security, and that Sandboxes remain disabled for this release.", evidence: "Member names, properties, cube participation, security owner, workflow purpose, and approval captured." },
  { id: "SC-UI-02", title: "Verify version access", path: "Dimensions → Version → Assign Access / Access reports", asset: "02-version-security.png", capture: "Representative group access showing Final protected and only assigned what-if versions writable.", action: "Test planner and reviewer access to Final, Upside, and Downside before copying data.", evidence: "Allowed and denied behavior agrees with the Phase 17 security matrix and has negative-test evidence." },
  { id: "SC-UI-03", title: "Copy Final to a what-if version", path: "Navigator → Actions → Copy Versions", asset: "03-copy-versions.png", capture: "Forecast Scenario, Final source, Upside or Downside destination, selected Entity scope, and optional data-type choices.", action: "Verify the approved request, select the exact target scope, copy only approved data types, and wait for completion.", evidence: "Source, destination, entities, periods, accounts, custom dimensions, data types, operator, timestamp, status, and log retained." },
  { id: "SC-UI-04", title: "Reconcile the copied baseline", path: "Scenario Planning → Baseline reconciliation", asset: "04-baseline-reconciliation.png", capture: "Final versus Upside or Downside before driver changes, with zero variances for controlled KPIs.", action: "Compare the copied version with Final at identical POV and resolve every unexplained opening variance.", evidence: "Units, revenue, gross margin, net income, closing cash, detailed control totals, and zero baseline variance captured." },
  { id: "SC-UI-05", title: "Enter governed scenario drivers", path: "Scenario Planning → Driver assumptions", asset: "05-scenario-driver-inputs.png", capture: "Writable volume, price, material-cost, or capacity assumptions with visible Version, period, range, source, owner, and comment.", action: "Enter approved Upside or Downside drivers only in owned cells and resolve range or completeness validations.", evidence: "POV, old and new values, units, range result, source, rationale, owner, and timestamp retained." },
  { id: "SC-UI-06", title: "Run the dependency calculation", path: "Scenario Planning → Calculate scenario / Application → Jobs", asset: "06-scenario-calculation-job.png", capture: "Scenario ruleset or job details covering sales through reporting with Version, Entity, period, status, duration, and messages.", action: "Run the approved dependency order, inspect each job, resolve failures, and refresh the results.", evidence: "Rule versions, prompts, execution order, operator, timestamps, messages, reruns, duration, and final success retained." },
  { id: "SC-UI-07", title: "Compare scenarios on the dashboard", path: "Scenario Planning → Scenario comparison dashboard", asset: "07-scenario-comparison-dashboard.png", capture: "Final, Upside, and Downside for demand, production, utilization, revenue, margin, net income, cash, and material exceptions.", action: "Apply one common POV, review variances and thresholds, and drill to the driver or exception behind each material movement.", evidence: "KPI definitions, values, variances, filters, thresholds, drill result, exception owner, and recommendation captured." },
  { id: "SC-UI-08", title: "Perform Smart View sensitivity", path: "Excel → Smart View → Scenario comparison workbook", asset: "08-smart-view-sensitivity.png", capture: "Connected sensitivity grid or form with Final, Upside, and Downside columns and governed driver changes.", action: "Refresh, change one approved driver at a time, calculate, compare, and restore or retain the controlled result.", evidence: "Connection, POV, driver, before and after results, submit or no-save decision, and web reconciliation retained." },
  { id: "SC-UI-09", title: "Promote the selected case", path: "Scenario Planning → Promote selected case / Approvals", asset: "09-selected-case-promotion.png", capture: "Selected what-if case, destination Forecast / Working scope, decision rationale, workflow owner, and approval status.", action: "Move the coherent selected driver set into Working, rerun dependencies, validate, and submit affected approval units.", evidence: "Decision ID, source and target, changed drivers, jobs, reconciliations, owner, workflow state, approval, and rollback reference retained." },
  { id: "SC-UI-10", title: "Publish and reconcile the decision", path: "Scenario Planning → Publish / ApexPlan ASO comparison", asset: "10-scenario-publish-reconciliation.png", capture: "Approved selected case in the reporting cube with source-to-target controls and retained alternative comparison.", action: "Run the governed data movement, reconcile Plan1 to ApexPlan ASO, and record the management decision and residual risks.", evidence: "Job ID, source and target POV, control totals, zero differences, scenario label, approver, publish timestamp, and sign-off captured." },
] as const;
