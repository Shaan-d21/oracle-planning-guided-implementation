import type { LessonDefinition } from "@/types/course";

export const requirementTraceabilityLessons = [
  { id: "rtm-orientation", number: "01", title: "Traceability foundations", duration: "10 min", type: "concept" },
  { id: "rtm-quality", number: "02", title: "Requirement and acceptance quality", duration: "22 min", type: "simulation" },
  { id: "rtm-chain", number: "03", title: "RTM structure and lifecycle trace", duration: "26 min", type: "wizard" },
  { id: "rtm-priority", number: "04", title: "Ownership, priority, and release", duration: "22 min", type: "simulation" },
  { id: "rtm-coverage", number: "05", title: "Coverage and change control", duration: "24 min", type: "simulation" },
  { id: "rtm-homework", number: "06", title: "Applied RTM homework", duration: "30 min", type: "simulation" },
  { id: "rtm-handoff", number: "07", title: "RTM baseline and exit gate", duration: "20 min", type: "exit-gate" },
] as const satisfies readonly LessonDefinition[];

export type RequirementTraceabilityLessonId = (typeof requirementTraceabilityLessons)[number]["id"];

export const requirementQualityCases = [
  {
    id: "REQ-SAL-001",
    source: "Market sales teams need controlled forecast overrides.",
    correct: "Enable assigned Sales Managers to adjust Sales Units by Product × Market × Channel × Month in Working version, with reason comments and manager approval before Final publication; accepted when approved overrides recalculate Revenue and retain user, timestamp, old value, new value, and comment.",
  },
  {
    id: "REQ-PRD-004",
    source: "Production must respond to demand and inventory policy.",
    correct: "Calculate monthly production requirement by Product × Plant as allocated demand + target ending inventory − beginning inventory, and flag required hours above available capacity; accepted when the result matches the approved test dataset and every breach creates an owned exception.",
  },
  {
    id: "REQ-INT-002",
    source: "ERP actuals must be available for the planning cycle.",
    correct: "Load approved ERP sales and financial actuals at the agreed grain by 06:00 on business day 2, reject unmapped records, and reconcile record counts and amounts to source; accepted when variances are zero or approved with documented ownership.",
  },
  {
    id: "REQ-NFR-003",
    source: "The main sales form should be fast.",
    correct: "For the agreed representative POV, data volume, and concurrent-user load, open the Sales Forecast form within the approved 95th-percentile response target; accepted through the approved performance test protocol with no functional-result regression.",
  },
] as const;

export const requirementClassificationCases = [
  { id: "CL-01", statement: "Calculate capacity-aware production requirements and route exceptions.", correct: "Functional" },
  { id: "CL-02", statement: "Load ERP actuals with mappings, rejects, recovery, and reconciliation.", correct: "Data / Integration" },
  { id: "CL-03", statement: "Limit planners to assigned Entity, Market, Product, and workflow actions.", correct: "Security / Control" },
  { id: "CL-04", statement: "Open a representative form within the approved response-time and concurrency threshold.", correct: "Non-functional" },
  { id: "CL-05", statement: "Provide management variance, exception, and reconciliation views.", correct: "Reporting / Analytics" },
] as const;

export const traceabilityCases = [
  { id: "REQ-SAL-001", requirement: "Controlled Market forecast overrides", correct: "Outcome FS-01 → process design PD-SAL-01 → Sales Forecast form + approval rule → SIT-SAL-01 → UAT-SAL-01 → release R1" },
  { id: "REQ-PRD-004", requirement: "Capacity-aware production requirement", correct: "Finding AS03 → process design PD-PRD-02 → production rule + capacity exception view → SIT-PRD-04 → UAT-PRD-02 → release R1" },
  { id: "REQ-INT-002", requirement: "Controlled ERP actuals load and reconciliation", correct: "Control gap AS06 → integration design ID-ERP-01 → load rule + reject/reconciliation report → SIT-INT-02 → business reconciliation BR-02 → release R1" },
  { id: "REQ-NFR-003", requirement: "Sales form response time at representative concurrency", correct: "NFR target NFR-PERF-03 → performance design PERF-D-03 → optimized form/rule scope → PT-03 evidence → owner acceptance → release R1" },
] as const;

export const priorityCases = [
  { id: "PR-01", requirement: "Capacity validation before production approval", correct: "Must", owner: "Production Planning Lead", release: "R1" },
  { id: "PR-02", requirement: "Optional alternate dashboard colour palette", correct: "Could", owner: "Reporting Product Owner", release: "Backlog" },
  { id: "PR-03", requirement: "Audit trail for forecast overrides and approvals", correct: "Must", owner: "Sales Planning Director", release: "R1" },
  { id: "PR-04", requirement: "Detailed BOM, material, and supplier planning for a later rollout", correct: "Won't this release", owner: "Production Planning Lead", release: "Future release" },
] as const;

export const coverageCases = [
  { id: "CV-01", requirement: "REQ-SAL-001", gap: "No UAT scenario or business acceptance evidence mapped", blocking: true },
  { id: "CV-02", requirement: "REQ-PRD-004", gap: "No accountable business owner assigned", blocking: true },
  { id: "CV-03", requirement: "REQ-INT-002", gap: "Reconciliation expected result and evidence reference are missing", blocking: true },
  { id: "CV-04", requirement: "BUILD-RPT-09", gap: "A configured dashboard has no approved source requirement", blocking: true },
  { id: "CV-05", requirement: "REQ-RPT-008", gap: "Dashboard icon preference is undecided but acceptance and coverage are complete", blocking: false },
] as const;

export const rtmArtifacts = [
  "Approved requirement catalogue with unique IDs, type, source, and rationale",
  "Business owners, priorities, release assignments, and approval status",
  "Testable requirement statements and measurable acceptance criteria",
  "Future-state, design, and build-object mappings",
  "SIT, UAT, reconciliation, security, and performance evidence references",
  "Coverage report with missing links and orphan-item register",
  "Versioned baseline, decision history, and approved change log",
  "RTM review summary, unresolved gaps, actions, and business sign-off",
] as const;

export const rtmHomeworkMissions = [
  { id: "quality", title: "Rewrite and accept a requirement", output: "One implementation-ready requirement and measurable acceptance criteria", purpose: "Practises turning a broad business request into a controlled RTM row without prematurely choosing the full design." },
  { id: "trace", title: "Build lifecycle trace chains", output: "Three requirements mapped to the right design, build, verification, and acceptance evidence", purpose: "Builds forward and backward traceability across functional, security, and data requirements." },
  { id: "coverage", title: "Triage coverage failures", output: "Correct action for missing evidence, orphan build, and failed acceptance", purpose: "Teaches that a populated RTM is not necessarily a complete or healthy RTM." },
  { id: "change", title: "Perform change-impact analysis", output: "Impacted requirements, designs, builds, tests, data, controls, release, and approvals", purpose: "Prevents an approved change from bypassing lifecycle coverage and regression planning." },
  { id: "readout", title: "Prepare the RTM baseline review", output: "Coverage position, blockers, decisions, owners, actions, and baseline recommendation", purpose: "Practises the governance discussion used to approve or reject an RTM baseline." },
] as const;

export type RtmHomeworkId = (typeof rtmHomeworkMissions)[number]["id"];

export const homeworkTraceCases = [
  { id: "HT-01", requirement: "Only assigned Market planners can edit Working forecast intersections.", correct: "Security design → access configuration → positive and negative security tests → business owner acceptance" },
  { id: "HT-02", requirement: "Unmapped ERP products are rejected and reconciled before dependent calculations.", correct: "Integration design → mapping/reject controls → SIT load and recovery evidence → business reconciliation acceptance" },
  { id: "HT-03", requirement: "Approved forecast overrides retain user, timestamp, comment, and old/new value.", correct: "Workflow/audit design → form and approval build → SIT audit evidence → UAT override and approval acceptance" },
] as const;

export const homeworkCoverageCases = [
  { id: "HC-01", observation: "A production dashboard was configured but no approved requirement justifies it.", correct: "Treat as an orphan build item: stop release inclusion until it is removed or linked through approved change control" },
  { id: "HC-02", observation: "A Must requirement has design and build mappings but no executed SIT evidence.", correct: "Keep coverage incomplete and block readiness until the mapped SIT case passes with retained evidence" },
  { id: "HC-03", observation: "SIT passed, but the business rejected the result during UAT.", correct: "Do not mark accepted: log the issue, assess requirement/design impact, resolve, retest, and obtain business acceptance" },
] as const;

export const rtmKnowledgeQuestions = [
  { id: "K-01", question: "What is the primary purpose of an RTM?", answers: ["Control approved scope and prove each requirement has complete lifecycle ownership, implementation, and verification coverage", "Create a list of screens after configuration is finished", "Replace the requirement catalogue and test repository"], correct: 0 },
  { id: "K-02", question: "What is backward traceability?", answers: ["Confirm every design, build, and test item is justified by an approved requirement or controlled change", "Read the RTM from the last row to the first", "Move a requirement into an earlier release without approval"], correct: 0 },
  { id: "K-03", question: "Does one evidence type fit every requirement?", answers: ["No; functional, data, security, reporting, and non-functional requirements need evidence appropriate to their acceptance criteria", "Yes; one UAT screenshot proves every requirement", "Yes; a build-complete status is sufficient"], correct: 0 },
  { id: "K-04", question: "What happens when an approved requirement changes?", answers: ["Assess impact, approve or reject the change, version the baseline, update every affected trace, and plan regression evidence", "Edit the build immediately and document it after release", "Delete the original history so only the latest wording remains"], correct: 0 },
  { id: "K-05", question: "When is the RTM ready to baseline?", answers: ["When requirements are approved, owned, prioritized, assigned to releases, testable, traced, coverage-reviewed, versioned, and remaining gaps are explicitly controlled", "When every row contains some text", "Only after production deployment"], correct: 0 },
] as const;
