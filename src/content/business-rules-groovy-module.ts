export const businessRulesGroovyLessons = [
  { id: "rule-foundations", number: "01", title: "Rule strategy, boundaries, and prerequisites", duration: "18 min", type: "concept" },
  { id: "rule-design-contract", number: "02", title: "Create the rule inventory and design contract", duration: "26 min", type: "assessment" },
  { id: "scoped-business-rules", number: "03", title: "Design scoped business rules and runtime prompts", duration: "30 min", type: "simulation" },
  { id: "groovy-patterns", number: "04", title: "Use Groovy for grid-aware validation and calculation", duration: "34 min", type: "simulation" },
  { id: "rulesets-dependencies", number: "05", title: "Orchestrate rulesets and calculation dependencies", duration: "26 min", type: "wizard" },
  { id: "validate-deploy", number: "06", title: "Validate, deploy, and control rule access", duration: "26 min", type: "assessment" },
  { id: "test-observe", number: "07", title: "Test jobs, logs, repeatability, and performance", duration: "30 min", type: "assessment" },
  { id: "rule-walkthrough", number: "08", title: "Execute the functional rule walkthrough", duration: "30 min", type: "guided-screenshot" },
  { id: "rule-homework", number: "09", title: "Applied rule engineering lab", duration: "45 min", type: "assessment" },
  { id: "rule-exit-gate", number: "10", title: "Rule catalogue, evidence package, and exit gate", duration: "24 min", type: "exit-gate" },
] as const;

export type BusinessRulesGroovyLessonId = (typeof businessRulesGroovyLessons)[number]["id"];

export const ruleReadinessControls = [
  "Phase 14 calculation ownership, source-to-target mappings, statement controls, approved scenarios, and Plan1-to-ApexPlan movement are baselined",
  "Every requested automation has a business owner, trigger, input, output, target cube, processing grain, dependency, and measurable acceptance result",
  "Rule authors have a controlled development tenant, Calculation Manager access, representative data, source control or export discipline, and named reviewers",
  "The design distinguishes stored calculations from dynamic formulas, form validation, data movement, aggregation, and orchestration instead of treating every need as Groovy",
  "Production data, metadata administration, external REST integration, and broad ASO calculations require separate approval and are not introduced casually in this phase",
] as const;

export const ruleSelectionCases = [
  {
    id: "RS-01",
    issue: "Calculate the same approved margin formula over a known Scenario, Version, Entity, Product, Account, Year, and Period slice.",
    correct: "Use a scoped Calculation Manager business rule or calc script with explicit prompts and controls",
    options: [
      "Use a scoped Calculation Manager business rule or calc script with explicit prompts and controls",
      "Use Groovy only because it is newer",
      "Place the calculation in every form cell",
    ],
  },
  {
    id: "RS-02",
    issue: "A planner changes eight cells and only the affected Product and Period combinations should be validated and recalculated.",
    correct: "Use a Groovy rule to inspect edited grid cells and generate or execute a tightly scoped calculation",
    options: [
      "Use a Groovy rule to inspect edited grid cells and generate or execute a tightly scoped calculation",
      "Recalculate the entire Plan1 cube",
      "Create eight manual rules",
    ],
  },
  {
    id: "RS-03",
    issue: "Revenue, COGS, statements, validation, aggregation, and reporting movement must run in an approved sequence.",
    correct: "Use a ruleset or controlled orchestration rule with stop conditions and step evidence",
    options: [
      "Use a ruleset or controlled orchestration rule with stop conditions and step evidence",
      "Ask users to launch rules in any order",
      "Combine all logic into one undocumented script",
    ],
  },
  {
    id: "RS-04",
    issue: "A ratio is required only at query time and derives safely from existing stored values.",
    correct: "Evaluate a governed dynamic member formula before creating a stored rule",
    options: [
      "Evaluate a governed dynamic member formula before creating a stored rule",
      "Store the ratio at every intersection",
      "Use a nightly Groovy REST call",
    ],
  },
  {
    id: "RS-05",
    issue: "Approved detailed Plan1 results must move to the ApexPlan reporting cube using an existing data map.",
    correct: "Use the governed data map or Smart Push and reconcile the moved slice",
    options: [
      "Use the governed data map or Smart Push and reconcile the moved slice",
      "Copy values manually from a form",
      "Rebuild the financial logic in ASO",
    ],
  },
] as const;

export const ruleContractCases = [
  {
    id: "RC-01",
    issue: "The requirement says only: calculate the forecast.",
    correct: "Define trigger, cube, inputs, outputs, POV, prompts, dependencies, ownership, validation, evidence, failure behavior, and rollback",
    options: [
      "Define trigger, cube, inputs, outputs, POV, prompts, dependencies, ownership, validation, evidence, failure behavior, and rollback",
      "Start coding and infer the rest",
      "Use the form POV without documenting it",
    ],
  },
  {
    id: "RC-02",
    issue: "A runtime prompt allows any Entity and Version even though the rule is intended for forecast working data.",
    correct: "Restrict valid selections, provide safe defaults, validate combinations in the rule, and reject out-of-scope execution",
    options: [
      "Restrict valid selections, provide safe defaults, validate combinations in the rule, and reject out-of-scope execution",
      "Rely on the user to remember the scope",
      "Hide every prompt and use the last value",
    ],
  },
  {
    id: "RC-03",
    issue: "The design clears target data before confirming that sources and prompts are valid.",
    correct: "Validate prerequisites first, then clear only the approved target slice immediately before a controlled write",
    options: [
      "Validate prerequisites first, then clear only the approved target slice immediately before a controlled write",
      "Clear the whole Scenario first",
      "Never clear data and accept duplicates",
    ],
  },
  {
    id: "RC-04",
    issue: "A failed rule leaves partially updated downstream outputs with no recovery instruction.",
    correct: "Define atomic steps where possible, stop conditions, affected scope, restart point, cleanup, reconciliation, and owner",
    options: [
      "Define atomic steps where possible, stop conditions, affected scope, restart point, cleanup, reconciliation, and owner",
      "Rerun everything until it works",
      "Hide the failed job from planners",
    ],
  },
] as const;

export const runtimePromptCases = [
  {
    id: "RTP-01",
    issue: "Year and Period prompts are optional, so a blank launch may calculate an unintended default range.",
    correct: "Require and validate Year and Period, show the resolved scope, and block blank or invalid combinations",
    options: [
      "Require and validate Year and Period, show the resolved scope, and block blank or invalid combinations",
      "Use all years when blank",
      "Use the last administrator selection",
    ],
  },
  {
    id: "RTP-02",
    issue: "The rule accepts Actual and Final as writable Scenario and Version values.",
    correct: "Allow only approved writable members such as Forecast and Working and verify the combination before execution",
    options: [
      "Allow only approved writable members such as Forecast and Working and verify the combination before execution",
      "Write to every supplied member",
      "Redirect all values to Actual",
    ],
  },
  {
    id: "RTP-03",
    issue: "A rule launched from a form silently overrides the visible Entity with a stored prompt value.",
    correct: "Define whether form context or an explicit override wins and display the resolved Entity before launch",
    options: [
      "Define whether form context or an explicit override wins and display the resolved Entity before launch",
      "Always use the last prompt",
      "Calculate every Entity",
    ],
  },
  {
    id: "RTP-04",
    issue: "Validation succeeded in Calculation Manager, but the launch user cannot access part of the prompted scope.",
    correct: "Perform a launch-user security and valid-intersection test in Planning in addition to designer validation",
    options: [
      "Perform a launch-user security and valid-intersection test in Planning in addition to designer validation",
      "Assume designer validation proves user access",
      "Grant administrator access to all planners",
    ],
  },
] as const;

export const groovyCases = [
  {
    id: "GR-01",
    issue: "A form-attached Groovy rule reads operation.grid without checking whether a grid exists.",
    correct: "Check operation.hasGrid() when grid context is optional and fail with a clear controlled message when it is required",
    options: [
      "Check operation.hasGrid() when grid context is optional and fail with a clear controlled message when it is required",
      "Catch and ignore every exception",
      "Assume every launch has a grid",
    ],
  },
  {
    id: "GR-02",
    issue: "The rule scans every form cell even though only edited driver cells can affect the calculation.",
    correct: "Filter dataCellIterator to edited and relevant cells, collect unique members, and calculate only that governed slice",
    options: [
      "Filter dataCellIterator to edited and relevant cells, collect unique members, and calculate only that governed slice",
      "Scan the entire cube",
      "Run one job per form cell",
    ],
  },
  {
    id: "GR-03",
    issue: "A Groovy script builds member names directly from user text inside a generated calc script.",
    correct: "Use typed RTPs or validated metadata members, approved quoting helpers, allow-lists, and explicit scope controls",
    options: [
      "Use typed RTPs or validated metadata members, approved quoting helpers, allow-lists, and explicit scope controls",
      "Concatenate any text supplied by the user",
      "Remove quotation marks",
    ],
  },
  {
    id: "GR-04",
    issue: "The final expression of a diagnostic Groovy rule is an unintended String.",
    correct: "Avoid an unintended final String because Oracle may treat it as an Essbase calculation script",
    options: [
      "Avoid an unintended final String because Oracle may treat it as an Essbase calculation script",
      "End every Groovy rule with a message String",
      "Convert the String to a number and execute it",
    ],
  },
] as const;

export const rulesetCases = [
  {
    id: "OR-01",
    issue: "COGS runs before production, inventory, and manufacturing-cost results are current.",
    correct: "Enforce demand, production, inventory, cost, COGS, statements, validation, and reporting movement in dependency order",
    options: [
      "Enforce demand, production, inventory, cost, COGS, statements, validation, and reporting movement in dependency order",
      "Run COGS first",
      "Let the fastest step decide the order",
    ],
  },
  {
    id: "OR-02",
    issue: "A validation step finds a nonzero balance control, but the reporting push still runs.",
    correct: "Stop the chain, record the failed control and scope, and prevent downstream publication",
    options: [
      "Stop the chain, record the failed control and scope, and prevent downstream publication",
      "Push the data with a warning",
      "Post the difference to cash",
    ],
  },
  {
    id: "OR-03",
    issue: "An unchanged rerun doubles a movement account in the reporting cube.",
    correct: "Make the target write idempotent through approved clear-and-replace or overwrite behavior and test repeatability",
    options: [
      "Make the target write idempotent through approved clear-and-replace or overwrite behavior and test repeatability",
      "Tell users not to rerun",
      "Divide the reporting result by two",
    ],
  },
  {
    id: "OR-04",
    issue: "One giant ruleset hides which step failed and requires a full rerun after every issue.",
    correct: "Use bounded restartable steps with logged inputs, outputs, dependencies, status, duration, and reconciliation",
    options: [
      "Use bounded restartable steps with logged inputs, outputs, dependencies, status, duration, and reconciliation",
      "Remove step names",
      "Always restart from the beginning",
    ],
  },
] as const;

export const deploymentCases = [
  {
    id: "DP-01",
    issue: "A rule is deployed without first validating members, functions, variables, and generated script syntax.",
    correct: "Save and validate with representative RTP values, resolve every error, then deploy the reviewed artifact",
    options: [
      "Save and validate with representative RTP values, resolve every error, then deploy the reviewed artifact",
      "Deploy first and test in production",
      "Ignore validation when deployment succeeds",
    ],
  },
  {
    id: "DP-02",
    issue: "A rule exists in Planning but normal planners cannot launch it.",
    correct: "Grant only the required launch privilege and test with the intended role, form, POV, and writable slice",
    options: [
      "Grant only the required launch privilege and test with the intended role, form, POV, and writable slice",
      "Make every planner an administrator",
      "Launch only from Calculation Manager",
    ],
  },
  {
    id: "DP-03",
    issue: "A lower-level variable was removed, but a partial deployment leaves the old definition in use.",
    correct: "Assess variable precedence and use the required full application redeployment when removal must propagate",
    options: [
      "Assess variable precedence and use the required full application redeployment when removal must propagate",
      "Rename the variable only on the form",
      "Keep both definitions indefinitely",
    ],
  },
  {
    id: "DP-04",
    issue: "The production deployment has no version, migration reference, approver, rollback artifact, or smoke test.",
    correct: "Package the rule version, dependencies, migration evidence, approvals, rollback, and post-deploy smoke test",
    options: [
      "Package the rule version, dependencies, migration evidence, approvals, rollback, and post-deploy smoke test",
      "Use the developer's local copy",
      "Rely on the rule name alone",
    ],
  },
] as const;

export const observabilityCases = [
  {
    id: "TS-01",
    issue: "The job is successful, but no output control was compared with the expected result.",
    correct: "Treat job success as execution evidence only and independently reconcile inputs, outputs, balances, and reporting movement",
    options: [
      "Treat job success as execution evidence only and independently reconcile inputs, outputs, balances, and reporting movement",
      "Approve every successful job",
      "Compare only the duration",
    ],
  },
  {
    id: "TS-02",
    issue: "A rule becomes slow after a hierarchy grows, but the test records no POV size or duration baseline.",
    correct: "Record scope, intersection estimate, elapsed time, edited-cell count, message volume, baseline, threshold, and regression result",
    options: [
      "Record scope, intersection estimate, elapsed time, edited-cell count, message volume, baseline, threshold, and regression result",
      "Increase the timeout without analysis",
      "Remove logging and assume improvement",
    ],
  },
  {
    id: "TS-03",
    issue: "An unchanged rerun produces a different closing balance.",
    correct: "Fail repeatability, identify additive writes or unstable dependencies, correct the rule, clear the approved slice, and retest",
    options: [
      "Fail repeatability, identify additive writes or unstable dependencies, correct the rule, clear the approved slice, and retest",
      "Accept the latest result",
      "Lock the form after the first run",
    ],
  },
  {
    id: "TS-04",
    issue: "The job log prints detailed data values and user-entered text that are not needed for support.",
    correct: "Log rule version, resolved scope, counts, controls, status, duration, and safe error context without exposing unnecessary data",
    options: [
      "Log rule version, resolved scope, counts, controls, status, duration, and safe error context without exposing unnecessary data",
      "Print the entire grid",
      "Disable all job messages",
    ],
  },
] as const;

export const ruleExecutionSequence = [
  "Confirm approved source versions, cutoff, writable Scenario and Version, Year, Period, Entity, currency, and calculation purpose",
  "Resolve form context and runtime prompts, validate allowed members and combinations, then display or record the final execution scope",
  "Verify prerequisites and control totals before any destructive clear, copy, allocation, calculation, or reporting movement",
  "Execute the smallest governed Plan1 calculation slice and capture rule version, operator, job ID, timestamps, status, and messages",
  "Run downstream validation and stop publication when a required control fails",
  "Move only approved results to ApexPlan ASO using the governed data map or Smart Push and record the moved scope",
  "Reconcile detailed results, reporting totals, unchanged rerun behavior, security, duration, and exception status",
  "Retain evidence, approvals, known limitations, rollback or restart instructions, and the downstream user-experience handoff",
] as const;

export const ruleReconciliationControls = [
  "Resolved prompts and form context match the approved Scenario, Version, Year, Period, Entity, Product, Account, currency, and source versions",
  "Rule output agrees with an independent expected result for production, inventory, COGS, margin, cash, and the balance control",
  "Edited-cell or bounded FIX scope excludes unrelated intersections and leaves Actual, approved versions, and other Entities unchanged",
  "A failed prerequisite or validation stops downstream writes and produces an actionable, non-sensitive job message",
  "An unchanged rerun is repeatable and does not duplicate movements, allocations, or reporting-cube values",
  "Plan1 results agree with the ApexPlan ASO moved slice and all job IDs, durations, rule versions, reviewers, and exceptions are traceable",
] as const;

export const ruleWalkthroughControls = [
  "The capture uses only the authorized ApexPlan training environment and hides tenant URLs, user identities, notifications, and unrelated data",
  "One consistent Forecast, Working, FY25 training cycle is used across the rule, prompts, form, job, performance, rerun, and reconciliation evidence",
  "Every screenshot is paired with navigation, trainee action, expected result, validation evidence, and the exact reviewed filename",
  "Calculation Manager evidence shows the reviewed rule version and representative prompts; Planning evidence proves the intended launch-user experience",
  "Screenshots supplement rather than replace the rule catalogue, source artifact, job ID, test result, reconciliation, reviewer, and approval evidence",
] as const;

export const ruleHomeworkMissions = [
  { id: "pattern", title: "Select the implementation pattern", output: "Rule decision record" },
  { id: "scope", title: "Prove the calculation scope", output: "Scope estimate" },
  { id: "groovy", title: "Review the Groovy guardrails", output: "Grid-aware design" },
  { id: "orchestration", title: "Order and control the rule chain", output: "Execution runbook" },
  { id: "evidence", title: "Present the rule release decision", output: "Technical readout" },
] as const;

export const ruleArtifacts = [
  "Approved rule catalogue with purpose, owner, trigger, type, cube, source, target, POV, prompts, dependencies, consumers, criticality, and status",
  "Rule design specifications with formulas or pseudocode, member scope, data behavior, validation, failure handling, restart, rollback, and evidence requirements",
  "Runtime-prompt and form-context contract with types, defaults, allowed members, precedence, valid combinations, security, and negative tests",
  "Reviewed Calculation Manager and Groovy artifacts with naming, comments, versions, typed inputs, allow-lists, grid guards, logging, and reusable components",
  "Ruleset dependency map with sequence, stop conditions, restart points, idempotent target behavior, data movement, and reconciliation gates",
  "Validation and deployment evidence with representative RTPs, syntax result, member and variable checks, deployment reference, access grants, migration, rollback, and smoke test",
  "Functional, negative, security, repeatability, regression, performance, job-log, Plan1, and ApexPlan reporting test evidence with resolved exceptions",
  "Operating runbook and Phase 16 handoff with launch locations, user messages, form behavior, limitations, support owner, approvals, and screenshot inventory",
] as const;

export const ruleKnowledgeQuestions = [
  {
    id: "RK-01",
    prompt: "When is Groovy justified instead of a standard scoped business rule?",
    correct: "When the requirement needs grid context, edited-cell targeting, richer validation, dynamic orchestration, or EPM object-model behavior",
    options: [
      "When the requirement needs grid context, edited-cell targeting, richer validation, dynamic orchestration, or EPM object-model behavior",
      "For every calculation because Groovy is more advanced",
      "Only when a form has no data",
    ],
  },
  {
    id: "RK-02",
    prompt: "What must happen before a target slice is cleared?",
    correct: "Resolve and validate scope, sources, dependencies, permissions, and recovery behavior",
    options: [
      "Resolve and validate scope, sources, dependencies, permissions, and recovery behavior",
      "Clear the entire Scenario immediately",
      "Deploy the rule again",
    ],
  },
  {
    id: "RK-03",
    prompt: "Does a successful Calculation Manager validation prove that the intended planner can launch the rule safely?",
    correct: "No; test launch privileges, data security, valid intersections, form context, prompts, and writable scope in Planning",
    options: [
      "No; test launch privileges, data security, valid intersections, form context, prompts, and writable scope in Planning",
      "Yes, validation proves every user path",
      "Yes, if the developer is an administrator",
    ],
  },
  {
    id: "RK-04",
    prompt: "Why test an unchanged rerun?",
    correct: "To prove the rule is repeatable and does not duplicate stored movements, allocations, or reporting results",
    options: [
      "To prove the rule is repeatable and does not duplicate stored movements, allocations, or reporting results",
      "To make the job history longer",
      "To update Actual data",
    ],
  },
  {
    id: "RK-05",
    prompt: "What does a successful job status prove?",
    correct: "Only that execution completed; business results and reconciliations still require independent validation",
    options: [
      "Only that execution completed; business results and reconciliations still require independent validation",
      "That every calculated value is correct",
      "That all downstream cubes agree",
    ],
  },
] as const;

export const ruleScreenshots = [
  { id: "BR-UI-01", title: "Open Calculation Manager and the ApexPlan rule inventory", path: "Navigator → Rules or Calculation Manager → Planning → ApexPlan → Plan1 → Rules", asset: "01-calculation-manager-rule-inventory.png", capture: "System View showing the ApexPlan application, Plan1 cube, Rules and Rulesets nodes, rule names, and selected training rule.", action: "Confirm the development environment, application, cube, naming standard, rule owner, and expected rule catalogue entry.", evidence: "Environment, application, cube, rule name, type, version, owner, and catalogue reference captured." },
  { id: "BR-UI-02", title: "Create or open a scoped business rule", path: "Calculation Manager → Plan1 → Rules → New or Open", asset: "02-scoped-business-rule-designer.png", capture: "Rule Designer showing the rule name, application, cube, graphical or script mode, properties, and bounded calculation logic.", action: "Review the purpose, FIX or member range, input accounts, output accounts, clear or write behavior, comments, and exclusions.", evidence: "Rule design version, scope, formulas, dependencies, exclusions, reviewer, and expected results captured." },
  { id: "BR-UI-03", title: "Configure runtime prompts and safe defaults", path: "Rule Designer → Variables or Runtime Prompts", asset: "03-runtime-prompts.png", capture: "Runtime prompt definitions for Scenario, Version, Year, Period, Entity, and optional Product with types, defaults, limits, and prompt text.", action: "Prove that invalid, blank, read-only, and unauthorized combinations are rejected and form-context precedence is documented.", evidence: "Prompt names, types, defaults, limits, precedence, negative results, security result, and approval captured." },
  { id: "BR-UI-04", title: "Create or review the Groovy rule", path: "Calculation Manager → Plan1 → Rules → Edit Script → Groovy Script", asset: "04-groovy-rule-editor.png", capture: "Groovy editor showing the RTP reference header, grid guard, edited-cell iterator, validated member collection, scoped calculation or Smart Push, and controlled messages.", action: "Trace each code block to the rule contract and confirm that no unvalidated user text creates calculation scope.", evidence: "Groovy version, API usage, guards, inputs, allow-lists, scope, logging, reviewer, and code review result captured." },
  { id: "BR-UI-05", title: "Build the dependency-controlled ruleset", path: "Calculation Manager → Rulesets → New or Open", asset: "05-ruleset-sequence.png", capture: "Ruleset Designer showing ordered calculation, validation, aggregation, and reporting-movement steps with variables and stop conditions.", action: "Confirm upstream dependencies, downstream gates, restart points, failure behavior, and unchanged-rerun behavior.", evidence: "Ruleset version, ordered steps, dependencies, prompts, stop conditions, restart point, owner, and approval captured." },
  { id: "BR-UI-06", title: "Validate and deploy the reviewed artifacts", path: "Rule Designer or System View → Validate → Deploy", asset: "06-validate-deploy.png", capture: "Validation result followed by deployment status for the reviewed rule or ruleset and representative runtime prompt values.", action: "Resolve every syntax, member, function, variable, and generated-script error before deploying the approved version.", evidence: "Validation timestamp, representative RTPs, result, deployment reference, artifact version, operator, and approval retained." },
  { id: "BR-UI-07", title: "Attach and launch the rule from the intended form", path: "Planning → Data Forms → ApexPlan functional form → Rules or action menu", asset: "07-form-rule-launch.png", capture: "ApexPlan form with the intended POV, rule association, launch option, runtime prompt dialog, and resolved scope.", action: "Launch as the intended planner role, confirm visible context and prompts, and verify that unrelated and protected intersections remain unchanged.", evidence: "User role, form, POV, prompts, launch location, writable slice, protected-cell result, and output captured." },
  { id: "BR-UI-08", title: "Inspect the rule job and messages", path: "Home → Application → Jobs → recent activity → job details", asset: "08-rule-job-details.png", capture: "Job details showing rule or ruleset name, status, start and end time, duration, user, prompts or scope, and safe messages.", action: "Connect the job ID and resolved scope to expected results, negative tests, performance thresholds, and any exception.", evidence: "Job ID, artifact version, operator, timestamps, duration, status, messages, test case, and exception reference retained." },
  { id: "BR-UI-09", title: "Analyze calculation scope and performance", path: "Calculation Manager → Rule → Actions → Analyze Script or approved performance evidence", asset: "09-script-analysis-performance.png", capture: "Script analysis or performance evidence showing the tested scope, slow section, elapsed time, baseline, and optimized result.", action: "Compare the broad baseline with bounded FIX or edited-cell execution and confirm that the optimized rule returns identical business results.", evidence: "Hierarchy sizes, intersection estimate, job duration, slow step, change, before and after results, threshold, and reviewer retained." },
  { id: "BR-UI-10", title: "Reconcile Plan1 and ApexPlan after execution", path: "Planning → Rule validation and reporting reconciliation forms", asset: "10-rule-output-reconciliation.png", capture: "Control view comparing expected and actual Plan1 results, unchanged rerun, moved ApexPlan ASO totals, variances, and exception status.", action: "Prove calculation correctness, scope isolation, repeatability, balance controls, reporting movement, and zero unresolved critical exceptions.", evidence: "Expected and actual controls, variance, rerun result, reporting totals, job references, reviewer, and exit approval captured." },
] as const;

export const standardRulePattern = `/* Illustrative Plan1 pattern — use reviewed member names and RTPs */
SET EMPTYMEMBERSETS ON;

FIX(<approved Scenario>, <approved Version>, <Year>, <Period>, <Entity>)
  /* Calculate only the documented target accounts and products. */
  /* Validate sources before any clear-and-replace behavior. */
ENDFIX

/* Reconcile expected outputs and unchanged rerun behavior. */`;

export const groovyRulePattern = `/* RTPS: {rtpScenario}, {rtpVersion}, {rtpYear}, {rtpPeriod} */
if (!operation.hasGrid()) {
  throwVetoException("Launch this rule from its approved ApexPlan form.")
}

Set<String> editedProducts = []
operation.grid.dataCellIterator({ DataCell cell -> cell.edited }).each { cell ->
  editedProducts << cell.getMemberName("Product")
}

/* Validate RTPs and collected members against the approved scope. */
/* Generate or execute a bounded Plan1 calculation only when work exists. */`;
