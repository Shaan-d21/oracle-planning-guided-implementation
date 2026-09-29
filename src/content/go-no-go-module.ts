import type { LessonDefinition } from "@/types/course";

export const goNoGoLessons = [
  { id: "go-no-go-foundations", number: "01", title: "Decision-gate foundations", duration: "18 min", type: "concept" },
  { id: "go-no-go-evidence", number: "02", title: "Evaluate gate evidence", duration: "28 min", type: "assessment" },
  { id: "go-no-go-risk", number: "03", title: "Separate blockers from residual risk", duration: "32 min", type: "assessment" },
  { id: "go-no-go-conditions", number: "04", title: "Control conditional approval", duration: "26 min", type: "assessment" },
  { id: "go-no-go-meeting", number: "05", title: "Run the decision meeting", duration: "28 min", type: "wizard" },
  { id: "go-no-go-simulator", number: "06", title: "Build the release decision", duration: "32 min", type: "simulation" },
  { id: "go-no-go-authorization", number: "07", title: "Authorize and communicate the decision", duration: "24 min", type: "simulation" },
  { id: "go-no-go-homework", number: "08", title: "Applied decision-board lab", duration: "48 min", type: "assessment" },
  { id: "go-no-go-exit-gate", number: "09", title: "Signed decision record and exit gate", duration: "26 min", type: "exit-gate" },
] as const satisfies readonly LessonDefinition[];

export type GoNoGoLessonId = (typeof goNoGoLessons)[number]["id"];

export const decisionEntryControls = [
  "Phase 23 identifies the exact production release, completed runbook version, actual cutover state, deviations, and evidence repository",
  "Critical reconciliations, representative smoke tests, access and workflow checks, integration and schedule status, and rollback state are current",
  "Every open defect, deviation, waiver, and residual risk has business impact, workaround, owner, target time, monitoring, and approval status",
  "The decision authority, quorum, presenters, recorder, decision deadline, rollback deadline, and communication owner are named",
  "The meeting evaluates predefined gates and retained evidence; schedule pressure, sunk cost, and readiness percentages cannot redefine a gate",
] as const;

export const releaseGates = [
  { id: "G-01", gate: "Release and cutover integrity", owner: "Cutover Manager", hardStop: true, evidence: "Release ID, package versions, completed runbook, deviations, job IDs, reviewer acceptance" },
  { id: "G-02", gate: "Data and financial reconciliation", owner: "Finance Data Owner", hardStop: true, evidence: "Source, staged, rejected, Plan1, ApexPlan ASO, dashboard, and Smart View controls" },
  { id: "G-03", gate: "Security and access", owner: "Security Lead", hardStop: true, evidence: "Representative positive and negative access, rule launch, workflow, audit, and service accounts" },
  { id: "G-04", gate: "Calculations, integration, and reporting", owner: "Planning Lead", hardStop: true, evidence: "Repeatable rules, interfaces, schedules, cube publish, statements, reports, and exception results" },
  { id: "G-05", gate: "Defects and release risk", owner: "Release Manager", hardStop: true, evidence: "Authoritative register, zero open blocker, retests, regression, waivers, and residual-risk approvals" },
  { id: "G-06", gate: "Performance and capacity", owner: "Performance Lead", hardStop: false, evidence: "Production smoke timing, agreed targets, capacity headroom, monitored limitations, and escalation" },
  { id: "G-07", gate: "Workflow and operating calendar", owner: "Business Process Owner", hardStop: false, evidence: "Approval ownership, task schedule, business calendar, cutoff, and exception route" },
  { id: "G-08", gate: "Recovery and business continuity", owner: "Service Administrator", hardStop: true, evidence: "Named recovery point, tested restore path, rollback deadline, decision authority, and continuity instructions" },
  { id: "G-09", gate: "Support and hypercare readiness", owner: "Support Lead", hardStop: false, evidence: "Roster, monitoring, severity, SLA, contacts, escalation, runbooks, and handoff acceptance" },
  { id: "G-10", gate: "Business readiness and acceptance", owner: "Executive Business Owner", hardStop: true, evidence: "Named user readiness, training, known limitations, operational ownership, and explicit acceptance" },
] as const;

export const evidenceDecisionCases = [
  { id: "EV-01", issue: "The migration job is green, but artifact counts, warnings, environment values, and functional validation are absent.", correct: "Gate remains not evidenced until the complete approved acceptance evidence is available", options: ["Gate remains not evidenced until the complete approved acceptance evidence is available", "Pass because the job is green", "Mark conditional without an owner", "Use a screenshot of the success icon"] },
  { id: "EV-02", issue: "Plan1 reconciles to the staged file, but ApexPlan ASO and the management dashboard are lower.", correct: "Fail the reconciliation gate and hold activation until cube-to-cube and reporting outputs reconcile", options: ["Fail the reconciliation gate and hold activation until cube-to-cube and reporting outputs reconcile", "Pass the source and Plan1 portion", "Accept the reporting difference temporarily", "Remove reporting from the gate"] },
  { id: "EV-03", issue: "One Service Administrator tested access; representative planners, approvers, and negative roles were not tested.", correct: "Keep the security gate incomplete and execute role-based positive and negative tests", options: ["Keep the security gate incomplete and execute role-based positive and negative tests", "Pass because administrator access works", "Grant temporary administrator access", "Defer all access testing to hypercare"] },
  { id: "EV-04", issue: "A performance limitation is inside the approved operating threshold and has monitoring, an owner, and a dated corrective release.", correct: "Present it as an evidenced residual risk for authorized acceptance, not as a hidden pass", options: ["Present it as an evidenced residual risk for authorized acceptance, not as a hidden pass", "Delete the limitation from the pack", "Automatically declare No-Go", "Change the performance target after execution"] },
  { id: "EV-05", issue: "Evidence was valid at rehearsal but a configuration change was promoted during cutover.", correct: "Re-establish impacted evidence through controlled regression and reconciliation for the production release", options: ["Re-establish impacted evidence through controlled regression and reconciliation for the production release", "Reuse rehearsal evidence unchanged", "Accept verbal confirmation", "Ignore the change if it was small"] },
] as const;

export const blockerRiskCases = [
  { id: "BR-01", issue: "Opening inventory is materially unreconciled and changes production, COGS, and cash.", correct: "Hard No-Go until corrected, rerun, reconciled, and accepted", options: ["Hard No-Go until corrected, rerun, reconciled, and accepted", "Go with a note", "Approve a manual plug without evidence", "Move the issue to hypercare"] },
  { id: "BR-02", issue: "An unauthorized user can submit data to a protected Entity.", correct: "Hard No-Go because the security control is ineffective", options: ["Hard No-Go because the security control is ineffective", "Go if the user promises not to submit", "Remove the negative test", "Monitor after activation"] },
  { id: "BR-03", issue: "One low-volume dashboard takes 0.8 seconds longer than target, while core journeys remain within limits and support monitoring is active.", correct: "Candidate residual risk if impact, owner, workaround, threshold, target release, and authority are documented", options: ["Candidate residual risk if impact, owner, workaround, threshold, target release, and authority are documented", "Automatic Go with no record", "Hard No-Go in every case", "Change the target to match the result"] },
  { id: "BR-04", issue: "A critical interface has not completed once in production and its service account is unverified.", correct: "Hard No-Go because a critical production path is unproven", options: ["Hard No-Go because a critical production path is unproven", "Go because it passed in UAT", "Let the first live cycle test it", "Ask support to watch it"] },
  { id: "BR-05", issue: "A help-text typo has no calculation, access, workflow, reporting, or support impact and a correction is scheduled.", correct: "Record as a low residual risk or planned correction without blocking activation", options: ["Record as a low residual risk or planned correction without blocking activation", "Hard No-Go", "Correct directly in production without change control", "Remove it from the register"] },
] as const;

export const conditionalApprovalCases = [
  { id: "CA-01", issue: "The board says ‘Go if the team watches it closely’ without a named condition or deadline.", correct: "Reject the wording; define measurable condition, accountable owner, due time, monitoring, breach action, and authority", options: ["Reject the wording; define measurable condition, accountable owner, due time, monitoring, breach action, and authority", "Accept because the intent is clear", "Let support define it later", "Record a general amber status"] },
  { id: "CA-02", issue: "A noncritical limitation has a workaround, but the workaround was not tested with the affected user role.", correct: "Do not approve the condition until the workaround is executed, evidenced, supportable, and accepted", options: ["Do not approve the condition until the workaround is executed, evidenced, supportable, and accepted", "Approve based on design", "Ask the user to discover whether it works", "Hide the limitation from users"] },
  { id: "CA-03", issue: "A condition expires six hours after Go-Live; failure would make a critical planning path unavailable.", correct: "Define the six-hour checkpoint, evidence owner, escalation, and automatic containment or rollback decision", options: ["Define the six-hour checkpoint, evidence owner, escalation, and automatic containment or rollback decision", "Leave the expiry informal", "Extend it automatically if missed", "Close the condition at activation"] },
  { id: "CA-04", issue: "Three individually minor risks interact across integration, calculation, and support capacity.", correct: "Assess cumulative exposure and dependencies before deciding whether conditions remain acceptable", options: ["Assess cumulative exposure and dependencies before deciding whether conditions remain acceptable", "Approve each risk independently", "Use the average risk score", "Ignore support capacity"] },
] as const;

export const decisionMeetingSequence = [
  "Confirm authority, quorum, exact release, production state, decision deadline, and rollback deadline",
  "Review only critical gate evidence, deviations, and changes since the evidence snapshot",
  "Hear accountable gate owners state Pass, Fail, or Conditional with evidence references",
  "Review blockers first, then cumulative residual risk, workarounds, conditions, and recovery exposure",
  "Record the authorized Go, Go with conditions, or No-Go decision with rationale and dissent",
  "Freeze the record, trigger the approved communication, and transfer owned actions to Go-Live or recovery",
] as const;

export const decisionMeetingControls = [
  "One facilitator protects the agenda and decision deadline; one recorder maintains the authoritative decision log",
  "Gate owners present facts and recommendations; only named authority accepts business risk and authorizes activation",
  "Evidence links identify the exact release and timestamp; stale, partial, verbal, or rehearsal-only evidence is challenged",
  "A failed hard-stop gate produces No-Go regardless of aggregate readiness score, schedule pressure, or sunk cost",
  "Conditions, dissent, abstentions, conflicts, assumptions, decision time, rollback state, and next checkpoint are retained",
] as const;

export const simulatorGates = [
  { id: "SIM-01", label: "Data and financial reconciliation", hardStop: true, initial: "Fail", ready: "Pass" },
  { id: "SIM-02", label: "Security and representative access", hardStop: true, initial: "Pass", ready: "Pass" },
  { id: "SIM-03", label: "Critical integration and calculation", hardStop: true, initial: "Pass", ready: "Pass" },
  { id: "SIM-04", label: "Rollback and recoverability", hardStop: true, initial: "Pass", ready: "Pass" },
  { id: "SIM-05", label: "Performance limitation", hardStop: false, initial: "Conditional", ready: "Conditional" },
  { id: "SIM-06", label: "Support and hypercare readiness", hardStop: false, initial: "Pass", ready: "Pass" },
] as const;

export const authorizationCases = [
  { id: "AU-01", issue: "All gates pass, but the executive business owner is absent and delegated authority is not recorded.", correct: "Do not activate until the named authority or documented delegate records the decision", options: ["Do not activate until the named authority or documented delegate records the decision", "Let the technical lead authorize", "Treat silence as approval", "Open access and obtain approval later"] },
  { id: "AU-02", issue: "The board records Go with conditions, but the user communication says the release has no known limitations.", correct: "Correct the communication so approved limitations, affected users, workaround, support path, and checkpoints are explicit", options: ["Correct the communication so approved limitations, affected users, workaround, support path, and checkpoints are explicit", "Keep conditions internal", "Send the technical register to every user", "Wait for incidents before communicating"] },
  { id: "AU-03", issue: "The signed record says Go, but a hard-stop gate fails before production access is enabled.", correct: "Reopen the gate and decision; authorization is tied to the evidenced state and is not permanent", options: ["Reopen the gate and decision; authorization is tied to the evidenced state and is not permanent", "Proceed because the record is signed", "Let support decide", "Delete the new evidence"] },
  { id: "AU-04", issue: "A No-Go decision is recorded.", correct: "Keep production closed, invoke the approved recovery or continuity path, communicate facts, assign remediation, and set a new decision checkpoint", options: ["Keep production closed, invoke the approved recovery or continuity path, communicate facts, assign remediation, and set a new decision checkpoint", "Open read-only access without approval", "Discard the cutover evidence", "Schedule Go-Live without remediation"] },
] as const;

export const goNoGoHomeworkMissions = [
  { id: "evidence", title: "Challenge the evidence", description: "Decide whether the gate pack proves the exact production release." },
  { id: "risk", title: "Classify blockers and risks", description: "Protect hard stops while recording proportionate residual risk." },
  { id: "conditions", title: "Write safe conditions", description: "Make every condition measurable, owned, monitored, and time-bounded." },
  { id: "meeting", title: "Sequence the board", description: "Run the decision forum in an auditable order." },
  { id: "decision", title: "Record the decision", description: "Write the evidence-backed authorized decision and immediate actions." },
] as const;

export const goNoGoArtifacts = [
  "Approved gate catalogue with hard-stop classification, accountable owner, acceptance rule, and required evidence",
  "Versioned decision pack identifying the exact release, production state, evidence snapshot, and changes since snapshot",
  "Completed gate register with Pass, Fail, or Conditional status, evidence link, reviewer, timestamp, and rationale",
  "Open-issue and residual-risk register with cumulative impact, workaround, monitoring, owner, target, and acceptance authority",
  "Conditional-approval register with measurable condition, due time, checkpoint, breach action, support instruction, and closure authority",
  "Meeting attendance, quorum, role, conflict, dissent, question, response, and decision-log evidence",
  "Signed Go, Go with conditions, or No-Go record with decision time, rollback state, rationale, scope, and authorization",
  "Approved stakeholder communication plus Go-Live or recovery handoff, owners, checkpoints, and evidence repository",
] as const;

export const goNoGoKnowledgeQuestions = [
  { id: "K-01", question: "Can a 95% readiness score override one failed hard-stop gate?", options: ["No; a failed hard-stop gate produces No-Go until the defined acceptance rule is met", "Yes, if the sponsor agrees", "Yes, if the schedule is fixed", "Only when the project is over budget"], correct: "No; a failed hard-stop gate produces No-Go until the defined acceptance rule is met" },
  { id: "K-02", question: "What makes a Go with conditions decision valid?", options: ["No failed hard stop plus explicit, accepted, measurable, owned, monitored, time-bounded conditions and breach actions", "A general amber status", "A verbal promise to fix later", "A majority vote without authority"], correct: "No failed hard stop plus explicit, accepted, measurable, owned, monitored, time-bounded conditions and breach actions" },
  { id: "K-03", question: "Who accepts residual business risk?", options: ["The named business decision authority using evidence and advice from accountable gate owners", "Any developer", "The meeting recorder", "The loudest stakeholder"], correct: "The named business decision authority using evidence and advice from accountable gate owners" },
  { id: "K-04", question: "What happens if material state changes after authorization but before activation?", options: ["Reopen impacted gates and the decision because authorization applies to the evidenced state", "Proceed using the signed record", "Delete the later evidence", "Wait until hypercare"], correct: "Reopen impacted gates and the decision because authorization applies to the evidenced state" },
  { id: "K-05", question: "What does Phase 24 hand to Phase 25?", options: ["A signed, scoped, time-stamped decision with conditions, communications, recovery state, owners, and activation authority", "A readiness percentage", "Only meeting minutes", "An unsigned recommendation"], correct: "A signed, scoped, time-stamped decision with conditions, communications, recovery state, owners, and activation authority" },
] as const;
