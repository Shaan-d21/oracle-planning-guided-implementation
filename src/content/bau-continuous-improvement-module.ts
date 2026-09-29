import type { LessonDefinition } from "@/types/course";

export const bauLessons = [
  { id: "bau-foundations", number: "01", title: "BAU foundations and service ownership", duration: "18 min", type: "concept" },
  { id: "bau-operating-rhythm", number: "02", title: "Run the planning service rhythm", duration: "30 min", type: "wizard" },
  { id: "bau-service-health", number: "03", title: "Govern service health and controls", duration: "30 min", type: "assessment" },
  { id: "bau-improvement-intake", number: "04", title: "Intake and prioritize improvements", duration: "34 min", type: "simulation" },
  { id: "bau-release-governance", number: "05", title: "Govern releases and production change", duration: "34 min", type: "assessment" },
  { id: "bau-regression-knowledge", number: "06", title: "Protect regression and operational knowledge", duration: "30 min", type: "assessment" },
  { id: "bau-value-adoption", number: "07", title: "Improve adoption and realize value", duration: "32 min", type: "simulation" },
  { id: "bau-homework", number: "08", title: "Applied BAU operating lab", duration: "50 min", type: "assessment" },
  { id: "bau-exit-gate", number: "09", title: "BAU charter and program completion gate", duration: "30 min", type: "exit-gate" },
] as const satisfies readonly LessonDefinition[];

export type BauLessonId = (typeof bauLessons)[number]["id"];

export const bauEntryControls = [
  "The signed Hypercare exit identifies the production baseline, accepted residual risks, known errors, open enhancements, monitoring, controls, support knowledge, owners, and escalation routes",
  "A named business service owner, product or application owner, process owners, support lead, technical owners, data owners, security, and release authority understand their decision rights",
  "The planning calendar, service levels, support channels, control schedule, maintenance windows, release calendar, blackout periods, and vendor escalation path are approved",
  "Versioned runbooks, architecture and configuration records, data contracts, security model, test assets, reconciliation controls, and knowledge articles are accessible and owned",
  "Baseline service, adoption, planning-cycle, data-quality, performance, and business-value measures are agreed so improvement can be demonstrated rather than assumed",
] as const;

export const bauRhythm = [
  { id: "DAILY / EVENT", title: "Protect service", focus: "Monitor jobs and alerts, fulfil support, contain incidents, preserve controls, and communicate material service state." },
  { id: "MONTHLY CYCLE", title: "Run planning", focus: "Execute source cutoffs, loads, calculations, workflow, reconciliations, publish, reporting, close, and retrospective checkpoints." },
  { id: "QUARTERLY", title: "Improve product", focus: "Review backlog, adoption, technical debt, capacity, value, roadmap, release scope, and vendor or platform changes." },
  { id: "ANNUAL / POLICY", title: "Refresh governance", focus: "Review planning assumptions, calendar, security, retention, recovery, architecture, support model, and benefit targets." },
] as const;

export const operatingRhythmCases = [
  { id: "OPS-01", issue: "The monthly actuals load succeeds, but source-to-Plan1 and Plan1-to-ApexPlan ASO controls are not signed before planners open the cycle.", correct: "Keep the cycle checkpoint incomplete until full-precision reconciliations and named control ownership confirm the governed opening state", options: ["Keep the cycle checkpoint incomplete until full-precision reconciliations and named control ownership confirm the governed opening state", "Open planning because the job is green", "Ask planners to identify errors", "Sign the controls after submission"] },
  { id: "OPS-02", issue: "A public holiday changes the source cutoff, but the approved planning calendar and downstream schedule remain unchanged.", correct: "Run calendar change governance, assess dependencies and business deadlines, approve revised times, update automation and tasks, and communicate affected owners", options: ["Run calendar change governance, assess dependencies and business deadlines, approve revised times, update automation and tasks, and communicate affected owners", "Let each team adjust locally", "Keep automation unchanged", "Skip the affected source"] },
  { id: "OPS-03", issue: "A recurring support task depends on one former project member's personal notes.", correct: "Transfer the procedure into the controlled knowledge base, demonstrate it with primary and backup owners, and remove the single-person dependency", options: ["Transfer the procedure into the controlled knowledge base, demonstrate it with primary and backup owners, and remove the single-person dependency", "Keep the notes as the runbook", "Call the former project member when needed", "Automate without documenting the current control"] },
  { id: "OPS-04", issue: "Quarterly platform maintenance overlaps the approved forecast submission window.", correct: "Assess impact early, use the service and release calendar to reschedule or approve a controlled business alternative, and validate after maintenance", options: ["Assess impact early, use the service and release calendar to reschedule or approve a controlled business alternative, and validate after maintenance", "Accept the overlap", "Cancel the forecast cycle", "Move the date without stakeholder approval"] },
] as const;

export const serviceHealthCases = [
  { id: "HLT-01", issue: "Ticket volume is down, but cycle completion is two days late and spreadsheet workarounds have increased.", correct: "Report service health as degraded; combine support, cycle-time, adoption, workaround, control, and business-outcome evidence", options: ["Report service health as degraded; combine support, cycle-time, adoption, workaround, control, and business-outcome evidence", "Report healthy from ticket volume", "Exclude manual work", "Reduce the cycle-time target"] },
  { id: "HLT-02", issue: "A reconciliation variance remains within tolerance for three months but is increasing each cycle.", correct: "Trend and investigate the movement before it breaches tolerance; tolerance is a control boundary, not a reason to ignore deterioration", options: ["Trend and investigate the movement before it breaches tolerance; tolerance is a control boundary, not a reason to ignore deterioration", "Take no action until breach", "Widen tolerance", "Round the values"] },
  { id: "HLT-03", issue: "A nightly job fails outside the planning window and succeeds automatically on retry.", correct: "Record and trend the failure, verify downstream state and controls, assess recurrence and capacity risk, and keep restoration evidence", options: ["Record and trend the failure, verify downstream state and controls, assess recurrence and capacity risk, and keep restoration evidence", "Ignore because retry succeeded", "Disable the alert", "Classify every retry as critical"] },
  { id: "HLT-04", issue: "A quarterly access review lists users but does not test entitlement appropriateness, leavers, privileged access, or negative behavior.", correct: "Execute the owned access-control procedure with business approval, joiner-mover-leaver evidence, privileged review, exceptions, remediation, and sign-off", options: ["Execute the owned access-control procedure with business approval, joiner-mover-leaver evidence, privileged review, exceptions, remediation, and sign-off", "Archive the user list", "Let administrators approve themselves", "Review only failed logins"] },
] as const;

export const improvementCases = [
  { id: "IMP-01", issue: "A senior stakeholder requests a new dashboard without a decision, user, measure definition, source, owner, or expected benefit.", correct: "Return the request for discovery and value definition before scoring or committing delivery", options: ["Return the request for discovery and value definition before scoring or committing delivery", "Prioritize it because the requester is senior", "Build a prototype directly in production", "Add it to the next release without scope"] },
  { id: "IMP-02", issue: "A regulatory control gap and a cosmetic formatting request receive the same backlog priority.", correct: "Score business value, mandatory risk, urgency, affected users, control exposure, effort, dependency, and opportunity cost transparently", options: ["Score business value, mandatory risk, urgency, affected users, control exposure, effort, dependency, and opportunity cost transparently", "Use request date only", "Give every request equal priority", "Choose the easier item"] },
  { id: "IMP-03", issue: "A request appears small but changes Product grain shared by sales, production, inventory, cost, integrations, forms, rules, and reports.", correct: "Treat it as high-impact design change with architecture, metadata, data, calculation, performance, security, migration, regression, and reconciliation assessment", options: ["Treat it as high-impact design change with architecture, metadata, data, calculation, performance, security, migration, regression, and reconciliation assessment", "Approve from screen effort", "Add the member in production", "Test only the requesting form"] },
  { id: "IMP-04", issue: "The backlog contains duplicate symptoms and solution ideas but no underlying business problem.", correct: "Consolidate duplicates, restate the problem and outcome, retain traceability, and score one governed candidate", options: ["Consolidate duplicates, restate the problem and outcome, retain traceability, and score one governed candidate", "Deliver each request separately", "Delete all duplicates", "Prioritize the most detailed solution"] },
] as const;

export const improvementCandidates = [
  { id: "CI-01", title: "Close a regulatory access-control gap", correct: true, value: 5, risk: 5, urgency: 5, effort: 2 },
  { id: "CI-02", title: "Automate recurring full-precision reconciliation", correct: true, value: 5, risk: 4, urgency: 4, effort: 3 },
  { id: "CI-03", title: "Change dashboard accent colors", correct: false, value: 1, risk: 1, urgency: 1, effort: 2 },
  { id: "CI-04", title: "Add an unvalidated KPI requested by one user", correct: false, value: 2, risk: 2, urgency: 1, effort: 4 },
  { id: "CI-05", title: "Remove a repeated manual forecast handoff", correct: true, value: 4, risk: 3, urgency: 4, effort: 3 },
] as const;

export const releaseCases = [
  { id: "REL-01", issue: "Three approved changes have incompatible metadata, rule, and integration dependencies but are planned as independent deployments.", correct: "Build one dependency-aware release scope and runbook with versioned packages, sequence, test coverage, rollback, reconciliation, and owners", options: ["Build one dependency-aware release scope and runbook with versioned packages, sequence, test coverage, rollback, reconciliation, and owners", "Deploy them independently", "Let each technical owner choose timing", "Merge directly in production"] },
  { id: "REL-02", issue: "A release is functionally correct in test, but representative peak performance and security regression were skipped.", correct: "Hold authorization until risk-based non-functional and security regression satisfy approved release criteria", options: ["Hold authorization until risk-based non-functional and security regression satisfy approved release criteria", "Approve from functional testing", "Test after production deployment", "Accept verbal assurance"] },
  { id: "REL-03", issue: "Oracle publishes a platform update note that may affect Smart View and browser support.", correct: "Assess applicability, supported versions, user impact, test scope, communication, deployment timing, and fallback before the update window", options: ["Assess applicability, supported versions, user impact, test scope, communication, deployment timing, and fallback before the update window", "Wait for user complaints", "Block all platform updates", "Notify users without testing"] },
  { id: "REL-04", issue: "A production change succeeds technically, but post-deployment control totals and business journey have not been validated.", correct: "Keep the release checkpoint open until smoke tests, full-precision controls, representative journey, monitoring, and business acceptance pass", options: ["Keep the release checkpoint open until smoke tests, full-precision controls, representative journey, monitoring, and business acceptance pass", "Close from deployment status", "Validate at quarter end", "Ask the developer to sign for business"] },
] as const;

export const regressionKnowledgeCases = [
  { id: "REG-01", issue: "A pricing rule change is tested only on its new condition and not on unchanged products or downstream revenue, margin, and ASO reports.", correct: "Use requirement and dependency traceability to test the changed case, unchanged cases, downstream calculations, reporting, performance, and reconciliation", options: ["Use requirement and dependency traceability to test the changed case, unchanged cases, downstream calculations, reporting, performance, and reconciliation", "Test only the new condition", "Compare one dashboard total", "Rely on code review"] },
  { id: "REG-02", issue: "The regression pack has many scripts, but several no longer match current forms, rules, roles, and expected results.", correct: "Version and curate the pack after each approved release; retire obsolete tests only with traceability and coverage review", options: ["Version and curate the pack after each approved release; retire obsolete tests only with traceability and coverage review", "Keep every historical test", "Let each tester edit local copies", "Use production outcomes as expected results"] },
  { id: "REG-03", issue: "A runbook says 'run the rule' but omits prerequisites, POV, prompts, success criteria, failure handling, evidence, and escalation.", correct: "Rewrite it as an executable controlled procedure and demonstrate it with a primary and backup operator", options: ["Rewrite it as an executable controlled procedure and demonstrate it with a primary and backup operator", "Add the rule name only", "Keep expert knowledge informal", "Record a video without control steps"] },
  { id: "REG-04", issue: "A knowledge article resolves many tickets, but the owning team has changed and its screenshots and navigation are stale.", correct: "Assign the new owner, update and validate the procedure, preserve version history, communicate the change, and measure reuse", options: ["Assign the new owner, update and validate the procedure, preserve version history, communicate the change, and measure reuse", "Delete the article", "Leave it until it fails", "Copy it into email"] },
] as const;

export const valueAdoptionCases = [
  { id: "VAL-01", issue: "Login count is high, but planners export data and make final decisions outside ApexPlan.", correct: "Measure governed journey completion, override and workaround behavior, decision use, cycle time, and control adherence—not login alone", options: ["Measure governed journey completion, override and workaround behavior, decision use, cycle time, and control adherence—not login alone", "Report adoption from login count", "Prevent all exports", "Count dashboard views"] },
  { id: "VAL-02", issue: "Forecast accuracy improved, but the team cannot separate system benefit from market stability and policy changes.", correct: "Use the approved benefit definition, baseline, comparator, period, owner, contributing factors, and evidence before claiming causation", options: ["Use the approved benefit definition, baseline, comparator, period, owner, contributing factors, and evidence before claiming causation", "Attribute all improvement to the application", "Remove external factors", "Use one favorable month"] },
  { id: "VAL-03", issue: "Users repeatedly override the baseline for one product family and their overrides improve accuracy.", correct: "Analyze the pattern as an improvement signal: validate driver data and model assumptions, govern a change, test, and measure whether override need falls", options: ["Analyze the pattern as an improvement signal: validate driver data and model assumptions, govern a change, test, and measure whether override need falls", "Block overrides", "Ignore because users compensate", "Replace the baseline manually"] },
  { id: "VAL-04", issue: "Training completion is 100 percent, but the same planning errors continue each cycle.", correct: "Diagnose task, process, guidance, role, design, and data causes; apply targeted enablement or product improvement and measure behavior change", options: ["Diagnose task, process, guidance, role, design, and data causes; apply targeted enablement or product improvement and measure behavior change", "Repeat the same course", "Blame users", "Lower the adoption target"] },
] as const;

export const continuousImprovementSequence = [
  "Observe service, planning-cycle, control, user-behavior, performance, risk, and benefit evidence",
  "Define the business problem, affected decision or control, users, baseline, expected outcome, owner, and success measure",
  "Consolidate duplicates and assess value, mandatory risk, urgency, effort, dependency, architecture impact, and opportunity cost",
  "Prioritize transparently through the product and service governance forum; fund, defer, reject, or request discovery",
  "Design and trace the approved change across requirements, metadata, data, calculations, security, interfaces, reporting, and operations",
  "Build, review, test the change and regression scope, reconcile outcomes, prove performance and security where relevant, and prepare adoption",
  "Authorize and deploy through the release runbook; validate production controls, business journey, monitoring, communication, and recovery",
  "Measure adoption, service effect, realized benefit, residual risk, and learning; update knowledge, baseline, roadmap, and next backlog decision",
] as const;

export const bauHomeworkMissions = [
  { id: "operate", title: "Operate the planning rhythm", description: "Control a monthly planning service across calendar, data, calculation, workflow, reporting, and support checkpoints." },
  { id: "health", title: "Read service health", description: "Use technical and business evidence to decide whether the service is healthy and improving." },
  { id: "portfolio", title: "Prioritize the backlog", description: "Select defensible improvements using value, risk, urgency, effort, dependency, and expected outcome." },
  { id: "release", title: "Protect the release", description: "Control scope, regression, knowledge, deployment, reconciliation, acceptance, and rollback." },
  { id: "value", title: "Close the improvement loop", description: "Sequence continuous improvement and recommend the next operating-period roadmap from measured adoption and value." },
] as const;

export const bauArtifacts = [
  "Approved BAU service charter, scope, decision rights, RACI, primary and backup owners, service levels, and escalation model",
  "Integrated planning, support, control, maintenance, release, blackout, access-review, recovery-test, and governance calendar",
  "Service-health scorecard covering jobs, data controls, cycle performance, incidents, recurrence, performance, security, adoption, and workarounds",
  "Governed improvement backlog with problem statements, value, measures, risk, urgency, effort, dependencies, architecture impact, decision, and owner",
  "Versioned release roadmap, package inventory, runbook, change approvals, regression coverage, rollback, communication, and production validation",
  "Curated regression pack, reconciliation controls, operational runbooks, knowledge articles, support scripts, and demonstrated operator capability",
  "Adoption and benefits register with baselines, targets, attribution assumptions, evidence periods, owners, actuals, variance, and corrective actions",
  "Quarterly service-and-product review, accepted residual risks, technical debt, lessons learned, funded roadmap, and signed program completion record",
] as const;

export const bauKnowledgeQuestions = [
  { id: "K-01", question: "What is the central BAU ownership principle?", correct: "The planning service has explicit business, product, process, technical, data, support, security, and release decision rights", options: ["The planning service has explicit business, product, process, technical, data, support, security, and release decision rights", "The implementation team remains the permanent owner", "Every request goes directly to developers"] },
  { id: "K-02", question: "What makes an improvement ready for prioritization?", correct: "A defined problem, affected outcome or control, users, baseline, expected value, success measure, owner, impact, and dependencies", options: ["A senior requester's email", "A defined problem, affected outcome or control, users, baseline, expected value, success measure, owner, impact, and dependencies", "A proposed screen design"] },
  { id: "K-03", question: "Why retain regression traceability after implementation?", correct: "Every production change can affect shared data, rules, security, performance, controls, and downstream decisions", options: ["Every production change can affect shared data, rules, security, performance, controls, and downstream decisions", "It increases the number of test documents", "Regression is required only for major releases"] },
  { id: "K-04", question: "What is stronger evidence of adoption than login count?", correct: "Completion of governed planning journeys with expected controls, decision use, reduced workarounds, and measurable behavior", options: ["Completion of governed planning journeys with expected controls, decision use, reduced workarounds, and measurable behavior", "Number of passwords reset", "Number of emails sent"] },
  { id: "K-05", question: "When is continuous improvement complete?", correct: "It is an ongoing loop; each change closes only after production validation, adoption, benefit measurement, learning, and backlog update", options: ["After the first enhancement release", "At project closure", "It is an ongoing loop; each change closes only after production validation, adoption, benefit measurement, learning, and backlog update"] },
] as const;
