import type { LessonDefinition } from "@/types/course";

export const cutoverLessons = [
  { id: "cutover-foundations", number: "01", title: "Cutover foundations and entry criteria", duration: "18 min", type: "concept" },
  { id: "cutover-runbook", number: "02", title: "Build the integrated cutover runbook", duration: "30 min", type: "wizard" },
  { id: "cutover-configuration", number: "03", title: "Control configuration migration and freeze", duration: "30 min", type: "assessment" },
  { id: "cutover-data", number: "04", title: "Execute data cutover and reconciliation", duration: "34 min", type: "simulation" },
  { id: "cutover-readiness", number: "05", title: "Prepare production operations and support", duration: "28 min", type: "assessment" },
  { id: "cutover-rehearsal", number: "06", title: "Rehearse the cutover window", duration: "32 min", type: "simulation" },
  { id: "cutover-rollback", number: "07", title: "Design rollback and contingency controls", duration: "28 min", type: "assessment" },
  { id: "cutover-command-center", number: "08", title: "Run the command-center walkthrough", duration: "28 min", type: "simulation" },
  { id: "cutover-homework", number: "09", title: "Applied cutover rehearsal lab", duration: "48 min", type: "assessment" },
  { id: "cutover-exit-gate", number: "10", title: "Cutover package and exit gate", duration: "24 min", type: "exit-gate" },
] as const satisfies readonly LessonDefinition[];

export type CutoverLessonId = (typeof cutoverLessons)[number]["id"];

export const cutoverEntryControls = [
  "Phase 22 confirms no uncontrolled release blocker and records approved residual risks, owners, workarounds, and target releases",
  "The production tenant, identity integration, connectivity, service accounts, maintenance window, and support access are ready",
  "The release package identifies the exact snapshot, configuration, rules, integrations, reports, templates, and dependency versions",
  "Final source extracts, data owners, freeze times, control totals, reconciliation tolerances, and rerun rules are approved",
  "The cutover window, command center, decision authority, escalation path, rollback deadline, communications, and business blackout are approved",
] as const;

export const cutoverRunbookSteps = [
  { id: "RUN-01", title: "Open command center and verify entry gate", owner: "Cutover Manager", predecessor: "None", evidence: "Attendance, release ID, entry checklist, decision log opened" },
  { id: "RUN-02", title: "Enforce business and configuration freeze", owner: "Business Owner / Release Manager", predecessor: "RUN-01", evidence: "Freeze confirmation and exception log" },
  { id: "RUN-03", title: "Create production recovery snapshot", owner: "Service Administrator", predecessor: "RUN-02", evidence: "Snapshot name, timestamp, content, completion status" },
  { id: "RUN-04", title: "Import approved application artifacts", owner: "EPM Technical Lead", predecessor: "RUN-03", evidence: "Migration job ID, warnings, errors, artifact counts" },
  { id: "RUN-05", title: "Validate metadata, rules, forms, security, and substitutions", owner: "Functional / Security Leads", predecessor: "RUN-04", evidence: "Component checklist and exception disposition" },
  { id: "RUN-06", title: "Load final metadata, actuals, drivers, and opening state", owner: "Data Integration Lead", predecessor: "RUN-05", evidence: "Source files, checksums, process IDs, accepted/rejected counts" },
  { id: "RUN-07", title: "Run calculations, aggregations, and Plan1-to-ASO publish", owner: "Planning Lead", predecessor: "RUN-06", evidence: "Rule/job status, elapsed time, POV, repeatability" },
  { id: "RUN-08", title: "Reconcile data and execute smoke tests", owner: "Finance / Test / Security Leads", predecessor: "RUN-07", evidence: "Control totals, variances, positive/negative access, workflow and Smart View results" },
  { id: "RUN-09", title: "Prepare Go/No-Go evidence pack", owner: "Cutover Manager", predecessor: "RUN-08", evidence: "Completed runbook, open issues, risks, deviations, recommendation" },
] as const;

export const runbookDecisionCases = [
  { id: "PLAN-01", issue: "An activity has two teams named but no single accountable owner.", correct: "Assign one accountable owner and retain contributors separately", options: ["Assign one accountable owner and retain contributors separately", "Allow either team to act", "Assign the Cutover Manager to every task", "Remove ownership from the runbook"] },
  { id: "PLAN-02", issue: "A data load starts at 02:00 but its source extract finishes between 01:45 and 02:20.", correct: "Use a completion dependency and latest-start threshold, not only a fixed clock time", options: ["Use a completion dependency and latest-start threshold, not only a fixed clock time", "Start the load at 02:00 regardless", "Ignore the source dependency", "Extend the window after execution"] },
  { id: "PLAN-03", issue: "A task is complete but has no retained job ID, totals, or approver.", correct: "Keep it incomplete until required evidence and acceptance are recorded", options: ["Keep it incomplete until required evidence and acceptance are recorded", "Treat verbal confirmation as final", "Mark complete and collect evidence later", "Delete the evidence requirement"] },
  { id: "PLAN-04", issue: "A noncritical activity exceeds duration but remains inside its latest finish and has no downstream impact.", correct: "Record the variance, reassess the critical path, and continue only if the authorized window remains protected", options: ["Record the variance, reassess the critical path, and continue only if the authorized window remains protected", "Rollback immediately", "Ignore all elapsed-time variance", "Skip the next validation task"] },
] as const;

export const configurationCases = [
  { id: "CFG-01", issue: "A developer asks to update a business rule directly in production during cutover.", correct: "Reject the direct change; use the approved release package and emergency change path if genuinely required", options: ["Reject the direct change; use the approved release package and emergency change path if genuinely required", "Permit it if the developer is experienced", "Update production and document later", "Replace the complete snapshot"] },
  { id: "CFG-02", issue: "The Migration import completes with warnings about missing referenced members.", correct: "Stop dependent execution, inspect warnings against the approved inventory, correct through controlled packaging, and revalidate", options: ["Stop dependent execution, inspect warnings against the approved inventory, correct through controlled packaging, and revalidate", "Ignore warnings because the job completed", "Create missing members manually", "Proceed directly to data load"] },
  { id: "CFG-03", issue: "A form exists after migration but its rule launch and Smart View template were omitted.", correct: "Treat the release inventory as incomplete and migrate the approved dependent artifacts before functional validation", options: ["Treat the release inventory as incomplete and migrate the approved dependent artifacts before functional validation", "Ask users to run the rule elsewhere", "Remove the form from scope without approval", "Create an untracked template in production"] },
  { id: "CFG-04", issue: "Production substitution variables still reference the UAT year and scenario.", correct: "Apply environment-specific values from the approved configuration sheet and validate affected rules, forms, integrations, and reports", options: ["Apply environment-specific values from the approved configuration sheet and validate affected rules, forms, integrations, and reports", "Copy every UAT value unchanged", "Ask each user to select the correct POV", "Correct variables after go-live"] },
] as const;

export const dataCutoverCases = [
  { id: "DATA-01", issue: "The final actuals file total is 125.4M, but the source control total is 126.1M.", correct: "Reject the file, reconcile the extract scope and cutoff, regenerate with a new checksum, and retain the superseded file", options: ["Reject the file, reconcile the extract scope and cutoff, regenerate with a new checksum, and retain the superseded file", "Load it and post a manual adjustment", "Change the control total to 125.4M", "Accept the variance because it is below 1%"] },
  { id: "DATA-02", issue: "The load has 20 rejected Product members and the rejected value is material.", correct: "Stop downstream calculation, resolve mappings or source master data through the approved path, rerun, and reconcile accepted plus rejected totals", options: ["Stop downstream calculation, resolve mappings or source master data through the approved path, rerun, and reconcile accepted plus rejected totals", "Ignore rejected records", "Map every rejection to No Product", "Enter the missing value in a form"] },
  { id: "DATA-03", issue: "Plan1 balances reconcile, but ApexPlan ASO is lower after publish.", correct: "Hold completion, reconcile the publish POV and mapping, correct and rerun safely, then confirm cube-to-cube and reporting totals", options: ["Hold completion, reconcile the publish POV and mapping, correct and rerun safely, then confirm cube-to-cube and reporting totals", "Approve Plan1 only", "Refresh the dashboard until totals change", "Disable the ASO report"] },
  { id: "DATA-04", issue: "A corrected final file is delivered after the approved source freeze.", correct: "Use the cutover exception process to assess authorization, impact, rerun path, elapsed time, reconciliation, and downstream dependencies", options: ["Use the cutover exception process to assess authorization, impact, rerun path, elapsed time, reconciliation, and downstream dependencies", "Load it immediately", "Reject all late corrections automatically", "Replace the file without changing its name or checksum"] },
] as const;

export const operationalReadinessCases = [
  { id: "OPS-01", issue: "Service Administrator smoke tests pass, but named planners have not logged in.", correct: "Execute role-based positive and negative tests with representative users before readiness is accepted", options: ["Execute role-based positive and negative tests with representative users before readiness is accepted", "Accept administrator testing", "Grant planners temporary administrator access", "Defer login testing to go-live"] },
  { id: "OPS-02", issue: "Scheduled integrations are enabled before the final manual cutover loads finish.", correct: "Keep schedules disabled until the runbook activation point and confirm no overlapping or duplicate processing", options: ["Keep schedules disabled until the runbook activation point and confirm no overlapping or duplicate processing", "Let schedules run and remove duplicates later", "Disable audit logs", "Delete manual load evidence"] },
  { id: "OPS-03", issue: "The support team has a runbook but no monitoring, severity, or escalation ownership.", correct: "Complete monitoring, alert, incident, ownership, SLA, escalation, contact, and handoff controls before Go/No-Go", options: ["Complete monitoring, alert, incident, ownership, SLA, escalation, contact, and handoff controls before Go/No-Go", "Send the project plan only", "Ask users to contact developers directly", "Wait for the first incident"] },
  { id: "OPS-04", issue: "Smart View templates point to UAT connections.", correct: "Update controlled production connections, test refresh and submit with representative roles, and distribute the approved version", options: ["Update controlled production connections, test refresh and submit with representative roles, and distribute the approved version", "Ask users to edit connections individually", "Leave UAT available indefinitely", "Remove Smart View from support scope"] },
] as const;

export const rehearsalSteps = [
  ["snapshotMinutes", "Recovery snapshot", 30],
  ["migrationMinutes", "Configuration migration", 60],
  ["validationMinutes", "Configuration validation", 35],
  ["dataMinutes", "Final data loads", 90],
  ["calculationMinutes", "Calculations and publish", 70],
  ["reconciliationMinutes", "Reconciliation and smoke tests", 55],
] as const;

export const rollbackCases = [
  { id: "RB-01", issue: "Migration fails before any final production data is loaded.", correct: "Stop, diagnose against the package and window; restore the pre-cutover snapshot if the issue cannot be resolved within the approved threshold", options: ["Stop, diagnose against the package and window; restore the pre-cutover snapshot if the issue cannot be resolved within the approved threshold", "Continue with partial artifacts", "Create missing objects manually", "Open production to users"] },
  { id: "RB-02", issue: "After final data and calculations, a material logic defect is found beyond the rollback decision deadline.", correct: "Invoke the authorized decision forum using impact, recoverability, elapsed time, data state, workaround, and business continuity evidence", options: ["Invoke the authorized decision forum using impact, recoverability, elapsed time, data state, workaround, and business continuity evidence", "Let the technical lead decide alone", "Always rollback regardless of evidence", "Always continue because the deadline passed"] },
  { id: "RB-03", issue: "Rollback restores the application snapshot but external source files and downstream reports have changed.", correct: "Execute the complete rollback runbook for application, data, integrations, schedules, files, communications, and downstream consumers", options: ["Execute the complete rollback runbook for application, data, integrations, schedules, files, communications, and downstream consumers", "Treat snapshot restore as complete rollback", "Delete downstream evidence", "Leave schedules active"] },
  { id: "RB-04", issue: "A nonblocking issue has an approved workaround through the first planning cycle.", correct: "Continue only when Go/No-Go authority accepts the residual risk, owner, monitoring, support instructions, target date, and rollback implications", options: ["Continue only when Go/No-Go authority accepts the residual risk, owner, monitoring, support instructions, target date, and rollback implications", "Continue because any workaround is sufficient", "Close the issue as fixed", "Hide it from business users"] },
] as const;

export const commandCenterControls = [
  "Use one timestamped runbook and decision log; every task has an accountable owner, predecessor, latest finish, evidence, and acceptance",
  "Report actual elapsed time, critical-path effect, issue severity, and recovery estimate—not subjective red/amber/green alone",
  "Keep technical execution, business validation, risk acceptance, and final Go/No-Go authority distinct",
  "Record every deviation, emergency change, rerun, rollback checkpoint, file checksum, job ID, reconciliation, and approver",
  "Communicate only approved status, impacts, actions, blackout changes, and next checkpoints to users and stakeholders",
] as const;

export const cutoverHomeworkMissions = [
  { id: "runbook", title: "Repair the runbook", description: "Resolve ownership, dependencies, evidence, and critical-path decisions." },
  { id: "configuration", title: "Control the release", description: "Protect the package, freeze, environment settings, and dependent artifacts." },
  { id: "data", title: "Reconcile final data", description: "Resolve extract, rejection, publish, and late-file decisions." },
  { id: "rollback", title: "Protect recovery", description: "Choose rollback and controlled-continuation responses." },
  { id: "recommendation", title: "Recommend Go/No-Go review", description: "Sequence the evidence review and write the cutover completion recommendation." },
] as const;

export const cutoverRecommendationSequence = ["Freeze the completed runbook", "Confirm final reconciliations", "Review deviations and open risks", "Verify rollback state and deadline", "Submit the Go/No-Go evidence pack"] as const;

export const cutoverArtifacts = [
  "Approved cutover strategy, scope, entry criteria, window, blackout, and RACI",
  "Version-controlled integrated runbook with dependencies, timings, evidence, and acceptance",
  "Approved release inventory, snapshots, migration results, and environment configuration validation",
  "Final source files, checksums, load results, rejects, control totals, and reconciliations",
  "Calculation, aggregation, publish, security, workflow, integration, form, dashboard, and Smart View smoke evidence",
  "Rehearsal results, critical-path timing, contingency reserve, deviations, and corrective actions",
  "Rollback and business-continuity plan with triggers, authority, recovery validation, and communications",
  "Completed command-center log, open risks, support handoff, and Go/No-Go recommendation",
] as const;

export const cutoverKnowledgeQuestions = [
  { id: "K-01", question: "What makes a cutover activity complete?", options: ["Execution plus required evidence and authorized acceptance", "The owner says it finished", "Its planned end time passes", "The next task starts"], correct: "Execution plus required evidence and authorized acceptance" },
  { id: "K-02", question: "Why is a rehearsal required?", options: ["To prove sequence, dependencies, duration, evidence, resourcing, recovery, and window feasibility under representative conditions", "To replace production cutover", "To allow direct production changes", "To remove rollback planning"], correct: "To prove sequence, dependencies, duration, evidence, resourcing, recovery, and window feasibility under representative conditions" },
  { id: "K-03", question: "What should happen when a final load does not reconcile?", options: ["Hold dependent steps, diagnose the controlled source-to-target path, correct or rerun safely, and reconcile before completion", "Post an unexplained manual adjustment", "Accept a percentage tolerance automatically", "Continue to Go/No-Go without recording it"], correct: "Hold dependent steps, diagnose the controlled source-to-target path, correct or rerun safely, and reconcile before completion" },
  { id: "K-04", question: "Who authorizes rollback or controlled continuation?", options: ["The named decision authority using technical, business, time, risk, and recoverability evidence", "The developer who found the issue", "Any Service Administrator", "The first planner available"], correct: "The named decision authority using technical, business, time, risk, and recoverability evidence" },
  { id: "K-05", question: "What does Phase 23 hand to Phase 24?", options: ["A completed, reconciled cutover evidence pack with deviations, risks, recovery state, support readiness, and a recommendation", "A promise that tasks probably completed", "Only a migration screenshot", "An unapproved production opening message"], correct: "A completed, reconciled cutover evidence pack with deviations, risks, recovery state, support readiness, and a recommendation" },
] as const;
