import type { LessonDefinition } from "@/types/course";

export const hypercareLessons = [
  { id: "hypercare-foundations", number: "01", title: "Hypercare foundations and entry controls", duration: "18 min", type: "concept" },
  { id: "hypercare-command-center", number: "02", title: "Run the stabilization command center", duration: "28 min", type: "wizard" },
  { id: "hypercare-triage", number: "03", title: "Triage incidents and service requests", duration: "32 min", type: "assessment" },
  { id: "hypercare-monitoring", number: "04", title: "Monitor solution and business controls", duration: "32 min", type: "simulation" },
  { id: "hypercare-fix", number: "05", title: "Govern fixes, workarounds, and changes", duration: "30 min", type: "assessment" },
  { id: "hypercare-problem-management", number: "06", title: "Remove recurring root causes", duration: "30 min", type: "assessment" },
  { id: "hypercare-exit-readiness", number: "07", title: "Prove exit readiness and BAU ownership", duration: "28 min", type: "simulation" },
  { id: "hypercare-homework", number: "08", title: "Applied stabilization lab", duration: "50 min", type: "assessment" },
  { id: "hypercare-exit-gate", number: "09", title: "Hypercare closure pack and exit gate", duration: "26 min", type: "exit-gate" },
] as const satisfies readonly LessonDefinition[];

export type HypercareLessonId = (typeof hypercareLessons)[number]["id"];

export const hypercareEntryControls = [
  "The accepted Go-Live handoff identifies the exact release, enabled and disabled scope, first-cycle evidence, open conditions, incidents, workarounds, owners, and recovery state",
  "Business, functional, integration, security, service-administration, operations, and support owners have named primary and backup coverage with escalation contacts",
  "The authoritative command-center register, incident channels, severity and SLA model, evidence repository, change route, and decision authority are active",
  "Monitoring covers jobs, integrations, calculations, workflow, reconciliations, performance, access, support demand, and critical business-calendar checkpoints",
  "Entry baseline and measurable exit thresholds are approved, including stability window, open-severity limits, reconciliation status, recurring issues, knowledge transfer, and BAU acceptance",
] as const;

export const hypercareCadence = [
  { id: "DAY 1", title: "Protect the live service", cadence: "Frequent checkpoints", focus: "Confirm access, integrations, jobs, planning flow, reconciliations, alerts, conditions, and support intake after activation." },
  { id: "DAY 7", title: "Stabilize the operating pattern", cadence: "Daily command center", focus: "Review volume, severity, ageing, repeat incidents, workarounds, changes, performance, and business-calendar risk." },
  { id: "DAY 14", title: "Reduce exceptional support", cadence: "Risk-based cadence", focus: "Remove recurring causes, close knowledge gaps, prove BAU ownership, and track remaining exit exceptions." },
  { id: "DAY 30", title: "Decide controlled exit", cadence: "Formal exit review", focus: "Use the agreed stability window and evidence thresholds to exit, extend with actions, or retain a bounded exception." },
] as const;

export const commandCenterCases = [
  { id: "CMD-01", issue: "The daily meeting lists every ticket but does not review business-calendar impact or decisions required today.", correct: "Lead with service health, business milestones, threshold breaches, decisions, owners, and due times; use the ticket list as supporting detail", options: ["Lead with service health, business milestones, threshold breaches, decisions, owners, and due times; use the ticket list as supporting detail", "Read every ticket chronologically", "Discuss only technical failures", "Cancel the meeting when no Severity 1 incident is open"] },
  { id: "CMD-02", issue: "A workaround is shared in chat, but the authoritative register, affected scope, expiry, owner, and support article are not updated.", correct: "Record and approve the workaround, affected scope, risk, expiry, owner, communication, and knowledge reference in the authoritative sources", options: ["Record and approve the workaround, affected scope, risk, expiry, owner, communication, and knowledge reference in the authoritative sources", "Treat the chat message as the record", "Let each analyst document it locally", "Close the ticket because users can continue"] },
  { id: "CMD-03", issue: "Incident count falls, but unresolved data variances are ageing past the agreed reconciliation checkpoint.", correct: "Report the stability threshold as breached and escalate the business-control risk even though ticket volume declined", options: ["Report the stability threshold as breached and escalate the business-control risk even though ticket volume declined", "Declare improvement from ticket count", "Raise the tolerance without approval", "Exclude reconciliations from Hypercare"] },
  { id: "CMD-04", issue: "Several teams publish different status totals from separate spreadsheets.", correct: "Reconcile to one timestamped command-center register and publish one approved service-health view with defined metric owners", options: ["Reconcile to one timestamped command-center register and publish one approved service-health view with defined metric owners", "Average the totals", "Publish all versions", "Use the largest total as a precaution"] },
] as const;

export const triageCases = [
  { id: "TRI-01", issue: "A planner asks how to select the approved Forecast Version; the feature works as designed.", correct: "Classify as a service request or knowledge need, give the approved guidance, link the article, and trend repeat demand", options: ["Classify as a service request or knowledge need, give the approved guidance, link the article, and trend repeat demand", "Classify as Severity 1", "Change the form immediately", "Close without recording"] },
  { id: "TRI-02", issue: "The overnight actuals integration failed and blocks the morning planning cycle for all planners.", correct: "Log an incident, assess business impact and recovery deadline, assign severity and owner, contain, communicate, and preserve job evidence", options: ["Log an incident, assess business impact and recovery deadline, assign severity and owner, contain, communicate, and preserve job evidence", "Log a training request", "Wait for a user complaint", "Rerun repeatedly without diagnosis"] },
  { id: "TRI-03", issue: "Three tickets describe the same calculation symptom for the same release and POV.", correct: "Link them to one parent incident, preserve affected-user impact, remove duplicate counting, and assess a recurring problem record", options: ["Link them to one parent incident, preserve affected-user impact, remove duplicate counting, and assess a recurring problem record", "Fix all three separately", "Delete two tickets", "Lower severity because they are duplicates"] },
  { id: "TRI-04", issue: "One executive dashboard is unavailable; an approved report provides the same reconciled result before the decision deadline.", correct: "Set severity from real impact and urgency, invoke the approved workaround, monitor cumulative exposure, and retain restoration ownership", options: ["Set severity from real impact and urgency, invoke the approved workaround, monitor cumulative exposure, and retain restoration ownership", "Always classify as critical", "Close permanently because a workaround exists", "Grant the user administrator access"] },
  { id: "TRI-05", issue: "A request to add a new KPI is presented as a production defect.", correct: "Validate against the approved requirement and release baseline; route a genuine new need through enhancement and change governance", options: ["Validate against the approved requirement and release baseline; route a genuine new need through enhancement and change governance", "Treat every user request as a defect", "Build directly in production", "Reject all post-live requests"] },
] as const;

export const monitoringCases = [
  { id: "MON-01", issue: "All scheduled jobs are green, but source-to-Plan1 reconciliation is outside tolerance.", correct: "Treat service health as failed until the business control reconciles; investigate data, mapping, scope, calculation, and publish state", options: ["Treat service health as failed until the business control reconciles; investigate data, mapping, scope, calculation, and publish state", "Report healthy because jobs succeeded", "Increase tolerance", "Refresh the dashboard only"] },
  { id: "MON-02", issue: "Median form response is normal, but the 95th percentile exceeds the agreed threshold during the planner peak.", correct: "Open a performance investigation using peak workload, user role, form, rule, concurrency, and timestamp evidence", options: ["Open a performance investigation using peak workload, user role, form, rule, concurrency, and timestamp evidence", "Use the median only", "Ask users to work off-hours", "Disable response-time monitoring"] },
  { id: "MON-03", issue: "A calculation completes, yet the ApexPlan ASO publish is stale by one cycle.", correct: "Hold reporting acceptance, verify the dependency and publish job, reconcile Plan1 to ASO, and communicate the reporting state", options: ["Hold reporting acceptance, verify the dependency and publish job, reconcile Plan1 to ASO, and communicate the reporting state", "Assume the next publish will fix it", "Hide the refresh timestamp", "Approve Plan1 and ignore reporting"] },
  { id: "MON-04", issue: "Support volume is low because planners are sharing a manual offline file instead of using the governed form.", correct: "Treat adoption and control bypass as a Hypercare signal; investigate the reason, secure the process, and restore the approved journey", options: ["Treat adoption and control bypass as a Hypercare signal; investigate the reason, secure the process, and restore the approved journey", "Report low ticket volume as success", "Adopt the offline file permanently", "Stop tracking usage"] },
  { id: "MON-05", issue: "A Go-Live condition has a threshold and owner but no evidence was captured at its checkpoint.", correct: "Mark the checkpoint incomplete, obtain the evidence or execute the breach action, and keep the condition visible to decision authority", options: ["Mark the checkpoint incomplete, obtain the evidence or execute the breach action, and keep the condition visible to decision authority", "Close it because no failure was reported", "Move it to a private note", "Extend it automatically"] },
] as const;

export const fixGovernanceCases = [
  { id: "FIX-01", issue: "A developer can correct a production rule in five minutes, but there is no packaged change or test evidence.", correct: "Use the approved emergency or normal change path with impact, approval, versioned build, focused test, regression, deployment, rollback, and reconciliation", options: ["Use the approved emergency or normal change path with impact, approval, versioned build, focused test, regression, deployment, rollback, and reconciliation", "Edit production because the change is small", "Document the edit next month", "Ask the developer to self-approve"] },
  { id: "FIX-02", issue: "A workaround restores planning but adds a manual control and one-hour delay.", correct: "Document scope, steps, owner, control, risk, expiry, user communication, and permanent-fix link; monitor whether it remains acceptable", options: ["Document scope, steps, owner, control, risk, expiry, user communication, and permanent-fix link; monitor whether it remains acceptable", "Close the incident with no further action", "Hide the delay from metrics", "Let users invent alternatives"] },
  { id: "FIX-03", issue: "A fix passes its original failing case but changes a shared calculation used by inventory and margin.", correct: "Run impact-based regression and downstream reconciliation before production promotion and closure", options: ["Run impact-based regression and downstream reconciliation before production promotion and closure", "Promote because the original test passed", "Test only with administrator", "Approve from code review alone"] },
  { id: "FIX-04", issue: "The production deployment succeeds, but the incident owner has not validated the real business journey.", correct: "Keep the incident in validation until the authorized business owner confirms the corrected journey, data, controls, and monitoring", options: ["Keep the incident in validation until the authorized business owner confirms the corrected journey, data, controls, and monitoring", "Close from deployment status", "Ask the developer to act as business owner", "Wait until Hypercare exit"] },
] as const;

export const problemCases = [
  { id: "PRB-01", issue: "The same integration failure recurs after three successful reruns.", correct: "Create a problem record, preserve linked incidents, analyze the recurring mechanism, implement preventive action, and verify recurrence stops", options: ["Create a problem record, preserve linked incidents, analyze the recurring mechanism, implement preventive action, and verify recurrence stops", "Continue rerunning indefinitely", "Close each incident as isolated", "Increase the schedule frequency"] },
  { id: "PRB-02", issue: "The team believes a timeout caused failures, but has no log, timeline, workload, or dependency evidence.", correct: "Record it as a hypothesis and collect evidence before declaring root cause or selecting a permanent fix", options: ["Record it as a hypothesis and collect evidence before declaring root cause or selecting a permanent fix", "Record timeout as confirmed root cause", "Tune every timeout", "Close because the job later succeeded"] },
  { id: "PRB-03", issue: "A known error has a safe workaround, but the permanent fix cannot enter the current release window.", correct: "Retain the known-error record, approved workaround, risk, monitoring, owner, target release, and BAU acceptance", options: ["Retain the known-error record, approved workaround, risk, monitoring, owner, target release, and BAU acceptance", "Delete the problem because service is restored", "Keep it only in project notes", "Apply an untested fix"] },
  { id: "PRB-04", issue: "Training questions repeatedly arrive for one form despite an existing guide.", correct: "Analyze discoverability and task design, update contextual guidance and training, measure repeat demand, and treat redesign as a governed improvement if needed", options: ["Analyze discoverability and task design, update contextual guidance and training, measure repeat demand, and treat redesign as a governed improvement if needed", "Tell users to read the same guide", "Classify users as the root cause", "Disable the form"] },
] as const;

export const exitReadinessCases = [
  { id: "EXT-01", issue: "No critical incident is open, but two recurring failures appeared inside the agreed stability window.", correct: "Do not claim stable exit; evaluate recurrence, cause, control, and a bounded extension or accepted exception through decision authority", options: ["Do not claim stable exit; evaluate recurrence, cause, control, and a bounded extension or accepted exception through decision authority", "Exit because both incidents are closed", "Reset the stability window silently", "Exclude recurring failures from metrics"] },
  { id: "EXT-02", issue: "All technical thresholds pass, but BAU support cannot execute the monthly recovery runbook without project help.", correct: "Keep knowledge-transfer and operational-readiness criteria open until BAU demonstrates the procedure and accepts ownership", options: ["Keep knowledge-transfer and operational-readiness criteria open until BAU demonstrates the procedure and accepts ownership", "Exit because the system works", "Transfer ownership by email", "Remove recovery from support scope"] },
  { id: "EXT-03", issue: "A low-severity known error will remain after Hypercare with an approved workaround and next-release fix.", correct: "Exit only if residual risk, workaround, control, monitoring, owner, target, escalation, and BAU acceptance are formally recorded", options: ["Exit only if residual risk, workaround, control, monitoring, owner, target, escalation, and BAU acceptance are formally recorded", "Require zero open records in all cases", "Close the known error before exit", "Leave it with the project team"] },
  { id: "EXT-04", issue: "The planned Day 30 date arrives, but agreed exit thresholds have not been met.", correct: "Use the evidence to extend or condition Hypercare with specific gaps, owners, actions, funding, checkpoints, and decision authority", options: ["Use the evidence to extend or condition Hypercare with specific gaps, owners, actions, funding, checkpoints, and decision authority", "Exit automatically on the calendar date", "Lower thresholds after the meeting", "Continue with no revised plan"] },
] as const;

export const hypercareOperatingSequence = [
  "Receive monitoring alerts, business observations, user contacts, condition checkpoints, and scheduled-control results",
  "Validate the symptom, affected production state, evidence, duplicates, work type, ownership, and authoritative record",
  "Assess business impact, urgency, severity, SLA, planning-calendar exposure, security or data risk, and recovery deadline",
  "Contain the impact, invoke an approved workaround where safe, preserve evidence, and communicate the known state",
  "Diagnose using logs and traceability; route incidents, problems, service requests, and changes through their correct controls",
  "Build and approve a controlled fix, test the failed case and regression scope, deploy, reconcile, monitor, and obtain business validation",
  "Update trends, conditions, known errors, knowledge, metrics, owners, and permanent preventive actions in the command center",
  "Evaluate the agreed stability window and exit thresholds; transfer accepted residual ownership and obtain BAU acceptance",
] as const;

export const hypercareHomeworkMissions = [
  { id: "cadence", title: "Run the command center", description: "Turn production evidence into one decision-oriented daily service-health view." },
  { id: "triage", title: "Triage the queue", description: "Classify, prioritize, deduplicate, contain, and own realistic user and system contacts." },
  { id: "monitor", title: "Read stability signals", description: "Combine technical, business-control, performance, adoption, and condition evidence." },
  { id: "fix", title: "Control fixes and recurrence", description: "Govern workarounds, changes, regression, business validation, and root-cause removal." },
  { id: "closure", title: "Recommend Hypercare exit", description: "Sequence the operating model and write an evidence-backed BAU handoff recommendation." },
] as const;

export const hypercareArtifacts = [
  "Timestamped command-center register and service-health dashboard",
  "Incident, service-request, problem, known-error, workaround, and change traceability",
  "Monitoring and reconciliation evidence across Plan1, ApexPlan ASO, forms, dashboards, and Smart View",
  "Severity, SLA, ageing, recurrence, performance, adoption, condition, and support-volume trends",
  "Controlled fix, regression, deployment, rollback, reconciliation, and business-validation evidence",
  "Updated runbooks, knowledge articles, support scripts, escalation routes, and demonstrated BAU capability",
  "Residual-risk, open-item, owner, target, monitoring, funding, and accepted-exception register",
  "Signed Hypercare exit decision, BAU acceptance, final communication, and continuous-improvement backlog",
] as const;

export const hypercareKnowledgeQuestions = [
  { id: "K-01", question: "What makes a Hypercare command center effective?", correct: "One authoritative, decision-oriented view of service health, business impact, thresholds, owners, and due actions", options: ["One authoritative, decision-oriented view of service health, business impact, thresholds, owners, and due actions", "A meeting that reads every ticket", "A developer-only incident chat"] },
  { id: "K-02", question: "When is a workaround sufficient for closure?", correct: "Only when restoration and risk are controlled; permanent ownership, expiry, monitoring, and problem or change follow-up remain explicit", options: ["Whenever users can continue", "Only when restoration and risk are controlled; permanent ownership, expiry, monitoring, and problem or change follow-up remain explicit", "When the original analyst leaves"] },
  { id: "K-03", question: "Why monitor business controls as well as job status?", correct: "A successful job can still produce stale, incomplete, unauthorized, or unreconciled business outcomes", options: ["A successful job can still produce stale, incomplete, unauthorized, or unreconciled business outcomes", "Business controls replace technical monitoring", "It reduces the need for owners"] },
  { id: "K-04", question: "What distinguishes problem management from incident restoration?", correct: "Problem management removes or controls recurring cause; incident management restores service and limits immediate impact", options: ["Problem management removes or controls recurring cause; incident management restores service and limits immediate impact", "Problems always have higher severity", "There is no difference"] },
  { id: "K-05", question: "What authorizes Hypercare exit?", correct: "Evidence that agreed stability, control, knowledge, ownership, residual-risk, and BAU-acceptance criteria are met", options: ["The planned calendar date", "Zero tickets of any type", "Evidence that agreed stability, control, knowledge, ownership, residual-risk, and BAU-acceptance criteria are met"] },
] as const;
