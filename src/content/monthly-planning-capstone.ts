import type { LessonDefinition } from "@/types/course";

export const monthlyPlanningCapstoneLessons = [
  { id: "capstone-readiness", number: "01", title: "Actuals and data readiness", duration: "24 min", type: "simulation" },
  { id: "capstone-demand", number: "02", title: "Demand baseline", duration: "22 min", type: "simulation" },
  { id: "capstone-consensus", number: "03", title: "Sales forecast and consensus", duration: "24 min", type: "simulation" },
  { id: "capstone-supply", number: "04", title: "Inventory, production and capacity", duration: "28 min", type: "simulation" },
  { id: "capstone-financial", number: "05", title: "Cost, margin and financial impact", duration: "24 min", type: "simulation" },
  { id: "capstone-approval", number: "06", title: "Scenario review and approval", duration: "22 min", type: "simulation" },
  { id: "capstone-close", number: "07", title: "Publish, reconcile and close", duration: "30 min", type: "exit-gate" },
] as const satisfies readonly LessonDefinition[];

export type MonthlyPlanningCapstoneLessonId = (typeof monthlyPlanningCapstoneLessons)[number]["id"];

export const readinessControls = [
  "Cycle calendar, cut-off and ownership are confirmed",
  "576 source rows loaded with zero rejects",
  "66,240 source units reconcile to Plan1",
  "Opening inventory excludes blocked stock",
  "Metadata and USD/INR rates are approved",
  "Material exceptions are closed or formally governed",
] as const;

export const demandSteps = [
  "Use the reconciled historical series",
  "Calculate the weighted statistical baseline",
  "Apply the approved growth assumption",
  "Apply the seasonal factor",
] as const;

export const consensusCases = [
  { id: "CS-01", statement: "Promotion uplift is supported by an approved campaign and retained as a separate driver.", correct: "Include with evidence" },
  { id: "CS-02", statement: "A planner enters a 10-unit override with a reason and reviewer.", correct: "Include as a governed override" },
  { id: "CS-03", statement: "An unowned 90-unit increase is supplied in a chat message after cut-off.", correct: "Reject or return for governance" },
] as const;

export const supplyControls = [
  "Opening inventory and target inventory are reconciled",
  "Production requirement includes yield and lot-size rules",
  "820 units are allocated to Pune and 560 to Noida",
  "Required hours are 690 against 800 available",
  "Capacity utilization is 86.25% and within threshold",
  "Material or procurement exceptions have owners and due dates",
] as const;

export const financialControls = [
  { id: "revenue", label: "Net revenue", expected: "559579.64", display: "INR 559,579.64" },
  { id: "margin", label: "Gross margin", expected: "202724.10", display: "INR 202,724.10" },
  { id: "income", label: "Net income", expected: "88293.07", display: "INR 88,293.07" },
  { id: "cash", label: "Closing cash", expected: "383448.80", display: "INR 383,448.80" },
  { id: "balance", label: "Balance-sheet check", expected: "0", display: "0" },
  { id: "aso", label: "Plan1-to-ApexPlan variance", expected: "0", display: "0" },
] as const;

export const approvalCases = [
  { id: "AP-01", situation: "All control totals reconcile and no blocking exception remains.", correct: "Submit for approval" },
  { id: "AP-02", situation: "The preferred scenario exceeds plant capacity and has no approved mitigation.", correct: "Return for rework" },
  { id: "AP-03", situation: "A minor exception has an approved owner, impact, due date and condition.", correct: "Approve with condition" },
  { id: "AP-04", situation: "The final scenario is approved and reporting totals reconcile.", correct: "Publish the approved version" },
] as const;

export const capstoneEvidenceItems = [
  "Readiness and source-to-Plan1 reconciliation",
  "Demand baseline calculation and assumptions",
  "Sales override and consensus approval trail",
  "Inventory, production and capacity bridge",
  "Cost, margin and integrated-finance reconciliation",
  "Scenario comparison and authorized decision",
  "Plan1-to-ApexPlan publish reconciliation",
  "Final cycle status, owners and next-cycle actions",
] as const;

export const capstoneKnowledgeQuestions = [
  { id: "CP-K01", question: "When may the monthly planning window open?", answers: ["After controlled inputs reconcile and blocking exceptions are resolved or governed", "As soon as any source file arrives", "Only after the final forecast is approved"], correct: 0 },
  { id: "CP-K02", question: "What should remain separate from the statistical demand baseline?", answers: ["Business adjustments such as promotions and overrides", "Approved history", "The agreed seasonal index"], correct: 0 },
  { id: "CP-K03", question: "What makes a production plan feasible?", answers: ["It balances demand and inventory while respecting yield, lot, plant and capacity constraints", "Its total is larger than demand", "It is entered by the plant manager"], correct: 0 },
  { id: "CP-K04", question: "What must happen before publishing the approved plan to reporting?", answers: ["Calculations, workflow, exceptions and reconciliations must pass for the approved version", "Only the dashboard must refresh", "Every alternative scenario must be deleted"], correct: 0 },
  { id: "CP-K05", question: "What closes a monthly cycle?", answers: ["Published results reconcile, the decision is recorded, and owners accept next-cycle actions", "The last planner saves a form", "The integration job shows success"], correct: 0 },
] as const;

export const implementationEvidenceMap = [
  { phase: "Phase 08", title: "Data Integration", href: "/learn/data-integration", use: "Load status, rejects and source-to-Plan1 reconciliation" },
  { phase: "Phase 09", title: "Sales Planning", href: "/learn/sales-planning-build", use: "Baseline, promotion, override and consensus evidence" },
  { phase: "Phases 10–11", title: "Supply Planning", href: "/learn/production-planning-build", use: "Inventory bridge, production allocation and capacity evidence" },
  { phase: "Phases 12–14", title: "Cost and Finance", href: "/learn/financial-statement-integration", use: "Margin, statements and full-precision reconciliations" },
  { phase: "Phases 17–18", title: "Workflow and Scenario", href: "/learn/scenario-what-if-planning", use: "Scenario comparison, approval history and decision record" },
  { phase: "Phase 27", title: "BAU Operations", href: "/learn/bau-continuous-improvement", use: "Cycle ownership, status, actions and improvement backlog" },
] as const;
