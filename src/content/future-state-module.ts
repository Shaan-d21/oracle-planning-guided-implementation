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
  { id: "forecast", finding: "Market and channel forecast files conflict and approvals occur by email.", desiredOutcome: "One governed monthly forecast with owned overrides, workflow, comments, and audit history" },
  { id: "inventory", finding: "A fixed safety-stock rule creates both excess inventory and shortages.", desiredOutcome: "Inventory policy responds to demand variability, lead time, service targets, and approved exceptions" },
  { id: "capacity", finding: "Production feasibility is checked after the sales plan is agreed.", desiredOutcome: "Demand is allocated to Pune and Noida and plant capacity is evaluated before the plan is approved" },
  { id: "cost", finding: "Stale prices and disconnected operational assumptions distort margin.", desiredOutcome: "Approved operational drivers consistently calculate manufacturing cost, COGS, and margin" },
  { id: "finance", finding: "Sales, production, and cost workbooks are manually reconciled for management review.", desiredOutcome: "Plan changes produce integrated, controlled, and reconcilable revenue, COGS, gross profit, and gross-margin results" },
] as const;

export const planningFlow = [
  "Load and reconcile actuals, master data, and approved assumptions",
  "Plan monthly sales units and average selling price by Product × Market × Channel",
  "Review sales overrides and calculate revenue",
  "Set target inventory and allocate product demand to Pune and Noida",
  "Calculate required production and validate monthly plant capacity",
  "Calculate unit manufacturing cost, COGS, gross profit, and gross margin",
  "Resolve exceptions and compare Actual, Budget, and Forecast",
  "Reconcile the integrated plan and review management outcomes in the governed reporting layer",
  "Approve, lock, publish, and communicate the plan",
] as const;

export const systemOwnershipCases = [
  { id: "erp", information: "Posted sales, inventory, production, and manufacturing-cost actuals", correct: "ERP remains the system of record; Planning receives controlled and reconciled actuals" },
  { id: "sales", information: "Monthly sales units, ASP assumptions, and manager overrides", correct: "Sales owns commercial assumptions; Planning owns the governed Working and Final plan versions" },
  { id: "inventory", information: "On-hand inventory and inventory adjustments", correct: "ERP inventory records remain authoritative; Planning owns target and projected inventory" },
  { id: "plant", information: "Actual output, available hours, and plant operating constraints", correct: "Plant operations own execution facts; Planning owns forward-looking production and capacity plans" },
  { id: "planning", information: "Forecasts, assumptions, scenarios, approvals, and integrated plan outputs", correct: "Oracle Planning is the governed planning workspace, not the source of transactional actuals" },
] as const;

export const decisionGrainCases = [
  { id: "demand", decision: "Review sales units, ASP, and approved overrides", correct: "Product × Market × Channel × Month, with Scenario and Version" },
  { id: "inventory", decision: "Set inventory targets and evaluate projected shortage or excess", correct: "Product × Plant × Month, with Scenario and Version; Market and Channel use their No members" },
  { id: "production", decision: "Allocate demand, plan output, and evaluate capacity", correct: "Product × Plant × Month, with Scenario and Version; Market and Channel use their No members" },
  { id: "finance", decision: "Review revenue, manufacturing cost, COGS, gross profit, and margin", correct: "Account × Entity × Product × Market × Channel × Month, with Scenario and Version" },
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
  { id: "sequence", title: "Sequence the connected plan", output: "Ordered sales-to-profitability planning checkpoints", purpose: "Reinforces which downstream decisions depend on an agreed sales forecast, feasible plant plan, and reconciled profitability result." },
  { id: "ownership", title: "Assign information ownership", output: "System-of-record and planning ownership decisions", purpose: "Prevents the target design from duplicating transactional ownership inside Oracle Planning." },
  { id: "exception", title: "Design an exception path", output: "Trigger, tolerance, action, owner, workflow, recalculation, evidence, and closure rule", purpose: "Teaches that a future-state process must define what happens when the normal path fails." },
  { id: "readout", title: "Prepare the design validation readout", output: "Target operating model, decisions, unresolved items, validation plan, and recommendation", purpose: "Practises obtaining cross-functional agreement before requirements and architecture are baselined." },
] as const;

export type FutureStateHomeworkId = (typeof futureStateHomeworkMissions)[number]["id"];

export const homeworkSequenceCases = [
  { id: "S-01", checkpoint: "Reconciled actuals and approved assumptions are available", correct: "1 · Establish the trusted starting point" },
  { id: "S-02", checkpoint: "Sales overrides are reviewed and the monthly sales forecast is agreed", correct: "2 · Agree the sales plan" },
  { id: "S-03", checkpoint: "Inventory, plant allocation, production, and capacity are tested", correct: "3 · Establish operational feasibility" },
  { id: "S-04", checkpoint: "Revenue, unit cost, COGS, gross profit, and gross margin are recalculated", correct: "4 · Evaluate integrated profitability" },
  { id: "S-05", checkpoint: "Exceptions are resolved and the plan is approved, locked, and published", correct: "5 · Govern and release one plan" },
] as const;

export const homeworkOwnershipCases = [
  { id: "O-01", information: "Posted sales, inventory, production, and manufacturing-cost actuals", correct: "ERP owns the facts; Planning consumes controlled values and reconciles the load" },
  { id: "O-02", information: "Working and Final Budget or Forecast versions", correct: "Oracle Planning owns plan versions, workflow status, commentary, and planning audit evidence" },
  { id: "O-03", information: "Actual plant output and available capacity hours", correct: "Plant operations own execution actuals; Planning consumes them for variance analysis and future plans" },
] as const;

export const futureStateKnowledgeQuestions = [
  { id: "K-01", question: "What should drive a future-state design decision?", answers: ["A validated finding, business outcome, decision need, control requirement, or measurable target", "The screen layout preferred by the implementation team", "Every workaround copied exactly from the AS-IS process"], correct: 0 },
  { id: "K-02", question: "What does technology-neutral first mean?", answers: ["Agree the target process, ownership, decisions, controls, and outcomes before mapping them to Oracle components", "Avoid making any technology decision during the project", "Design only diagrams and never validate feasibility"], correct: 0 },
  { id: "K-03", question: "How should system ownership work in the future state?", answers: ["Transactional systems remain authoritative for execution facts while Planning governs forecasts, assumptions, scenarios, and plan decisions", "Planning becomes the source of every transactional actual", "Every system stores independent copies with no reconciliation"], correct: 0 },
  { id: "K-04", question: "What makes an exception path complete?", answers: ["Trigger and tolerance, owner, permitted action, workflow, recalculation, evidence, escalation, and closure", "A dashboard color indicating something went wrong", "An email sent to every user without an assigned owner"], correct: 0 },
  { id: "K-05", question: "When can Phase 3 close?", answers: ["When the target operating model, outcomes, grain, ownership, calendar, controls, exceptions, KPIs, open items, and stakeholder agreement are controlled", "As soon as one future-state flow is drawn", "After Oracle forms are configured even if design decisions are unresolved"], correct: 0 },
] as const;
