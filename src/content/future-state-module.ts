import type { LessonDefinition } from "@/types/course";

export const futureStateLessons = [
  { id: "future-state-orientation", number: "01", title: "Future-state design foundations", duration: "10 min", type: "concept" },
  { id: "future-state-outcomes", number: "02", title: "Outcomes and design principles", duration: "20 min", type: "simulation" },
  { id: "future-state-process", number: "03", title: "Connected process and ownership", duration: "26 min", type: "wizard" },
  { id: "future-state-grain", number: "04", title: "Decision grain and calendar", duration: "24 min", type: "simulation" },
  { id: "future-state-governance", number: "05", title: "Governance, exceptions, and controls", duration: "24 min", type: "simulation" },
  { id: "future-state-homework", number: "06", title: "Applied future-state homework", duration: "30 min", type: "simulation" },
  { id: "future-state-handoff", number: "07", title: "Design package and exit gate", duration: "20 min", type: "exit-gate" },
] as const satisfies readonly LessonDefinition[];

export type FutureStateLessonId = (typeof futureStateLessons)[number]["id"];

export const outcomeScenarios = [
  { id: "forecast", finding: "Regional forecast files conflict and approvals occur by email.", desiredOutcome: "One governed consensus forecast with owned overrides, workflow, comments, and audit history" },
  { id: "inventory", finding: "A fixed safety-stock rule creates both excess inventory and shortages.", desiredOutcome: "Inventory policy responds to demand variability, lead time, service targets, and approved exceptions" },
  { id: "capacity", finding: "Production feasibility is checked after the sales plan is agreed.", desiredOutcome: "Capacity, material, and supply constraints are evaluated before commitments are approved" },
  { id: "cost", finding: "Stale prices and disconnected operational assumptions distort margin.", desiredOutcome: "Approved operational drivers consistently calculate manufacturing cost, COGS, and margin" },
  { id: "finance", finding: "Operational plans are manually reconciled to financial statements.", desiredOutcome: "Plan changes produce integrated, controlled, and reconcilable P&L, balance-sheet, and cash impacts" },
] as const;

export const planningFlow = [
  "Load and reconcile actuals, master data, and approved assumptions",
  "Create baseline demand and commercial scenarios",
  "Review sales overrides and agree consensus demand",
  "Calculate inventory, production, and material requirements",
  "Validate plant, material, procurement, and workforce feasibility",
  "Resolve exceptions and compare approved scenarios",
  "Calculate revenue, manufacturing cost, margin, and financial impact",
  "Reconcile the integrated plan and review management outcomes",
  "Approve, lock, publish, and communicate the plan",
] as const;

export const systemOwnershipCases = [
  { id: "erp", information: "Posted sales, purchase, cost, and general-ledger actuals", correct: "ERP remains the system of record; Planning receives controlled and reconciled actuals" },
  { id: "crm", information: "Opportunity pipeline, customer forecast signals, and commercial activity", correct: "CRM owns operational pipeline data; Planning owns the governed planning interpretation" },
  { id: "wms", information: "On-hand, receipts, issues, transfers, and inventory adjustments", correct: "WMS owns inventory execution; Planning owns inventory policy and projected positions" },
  { id: "mes", information: "Production output, downtime, line rates, yield, and operational capacity", correct: "MES owns execution facts; Planning owns forward-looking production and capacity scenarios" },
  { id: "planning", information: "Forecasts, assumptions, scenarios, approvals, and integrated plan outputs", correct: "Oracle Planning is the governed planning workspace, not the source of transactional actuals" },
] as const;

export const decisionGrainCases = [
  { id: "demand", decision: "Review demand, promotions, and sales overrides", correct: "Product × Customer × Channel × Month, with Scenario and Version" },
  { id: "inventory", decision: "Set inventory targets and evaluate projected shortage or excess", correct: "Product × Plant × Week/Month, with Scenario and Version" },
  { id: "production", decision: "Plan feasible output and evaluate capacity", correct: "Product × Plant × Line/Resource × Week, with Scenario and Version" },
  { id: "finance", decision: "Review revenue, cost, margin, balance sheet, and cash", correct: "Account × Entity × Product/Business Unit × Month, with Scenario, Version, and Currency" },
] as const;

export const exceptionCases = [
  { id: "EX-01", condition: "Required plant hours exceed available capacity by 14%.", correct: "Block approval, assign an owner, evaluate overtime/shift/alternate plant/outsource/reschedule scenarios, and retain the decision" },
  { id: "EX-02", condition: "The actuals load contains unmapped products and source-to-target totals do not reconcile.", correct: "Quarantine rejected records, stop dependent calculations, resolve mappings, reload, and reconcile before release" },
  { id: "EX-03", condition: "A sales override breaches the approved tolerance and materially reduces margin.", correct: "Require justification, route to the designated reviewer, recalculate downstream impact, and approve or reject with audit evidence" },
] as const;

export const designArtifacts = [
  "Future-state design principles and outcome map",
  "End-to-end process map with roles and handoffs",
  "Business/system ownership and conceptual data-flow map",
  "Decision-grain and planning-calendar matrix",
  "Exception, scenario, workflow, and approval design",
  "Control and reconciliation-point catalogue",
  "Target KPI and benefit-measurement catalogue",
  "Decision, assumption, risk, open-item, and stakeholder agreement log",
] as const;

export const futureStateHomeworkMissions = [
  { id: "principles", title: "Write evidence-led design principles", output: "Five target-design rules linked to confirmed findings and measurable outcomes", purpose: "Keeps the design focused on validated business needs rather than a list of preferred product features." },
  { id: "sequence", title: "Sequence the connected plan", output: "Ordered demand-to-financial planning checkpoints", purpose: "Reinforces which downstream decisions depend on an agreed demand, feasible supply, and reconciled financial impact." },
  { id: "ownership", title: "Assign information ownership", output: "System-of-record and planning ownership decisions", purpose: "Prevents the target design from duplicating transactional ownership inside Oracle Planning." },
  { id: "exception", title: "Design an exception path", output: "Trigger, tolerance, action, owner, workflow, recalculation, evidence, and closure rule", purpose: "Teaches that a future-state process must define what happens when the normal path fails." },
  { id: "readout", title: "Prepare the design validation readout", output: "Target operating model, decisions, unresolved items, validation plan, and recommendation", purpose: "Practises obtaining cross-functional agreement before requirements and architecture are baselined." },
] as const;

export type FutureStateHomeworkId = (typeof futureStateHomeworkMissions)[number]["id"];

export const homeworkSequenceCases = [
  { id: "S-01", checkpoint: "Reconciled actuals and approved assumptions are available", correct: "1 · Establish the trusted starting point" },
  { id: "S-02", checkpoint: "Sales overrides are reviewed and consensus demand is agreed", correct: "2 · Agree the demand signal" },
  { id: "S-03", checkpoint: "Inventory, production, materials, and capacity are tested", correct: "3 · Establish operational feasibility" },
  { id: "S-04", checkpoint: "Revenue, cost, margin, statements, and cash are recalculated", correct: "4 · Evaluate integrated financial impact" },
  { id: "S-05", checkpoint: "Exceptions are resolved and the plan is approved, locked, and published", correct: "5 · Govern and release one plan" },
] as const;

export const homeworkOwnershipCases = [
  { id: "O-01", information: "Approved currency rates and posted financial actuals", correct: "Financial source system owns the facts; Planning consumes controlled values and reconciles the load" },
  { id: "O-02", information: "Working, submitted, approved, and published forecast versions", correct: "Oracle Planning owns plan versions, workflow status, commentary, and planning audit evidence" },
  { id: "O-03", information: "Actual production output, downtime, and yield", correct: "MES owns execution actuals; Planning consumes them for variance analysis and future scenarios" },
] as const;

export const futureStateKnowledgeQuestions = [
  { id: "K-01", question: "What should drive a future-state design decision?", answers: ["A validated finding, business outcome, decision need, control requirement, or measurable target", "The screen layout preferred by the implementation team", "Every workaround copied exactly from the AS-IS process"], correct: 0 },
  { id: "K-02", question: "What does technology-neutral first mean?", answers: ["Agree the target process, ownership, decisions, controls, and outcomes before mapping them to Oracle components", "Avoid making any technology decision during the project", "Design only diagrams and never validate feasibility"], correct: 0 },
  { id: "K-03", question: "How should system ownership work in the future state?", answers: ["Transactional systems remain authoritative for execution facts while Planning governs forecasts, assumptions, scenarios, and plan decisions", "Planning becomes the source of every transactional actual", "Every system stores independent copies with no reconciliation"], correct: 0 },
  { id: "K-04", question: "What makes an exception path complete?", answers: ["Trigger and tolerance, owner, permitted action, workflow, recalculation, evidence, escalation, and closure", "A dashboard color indicating something went wrong", "An email sent to every user without an assigned owner"], correct: 0 },
  { id: "K-05", question: "When can Phase 3 close?", answers: ["When the target operating model, outcomes, grain, ownership, calendar, controls, exceptions, KPIs, open items, and stakeholder agreement are controlled", "As soon as one future-state flow is drawn", "After Oracle forms are configured even if design decisions are unresolved"], correct: 0 },
] as const;
