import type { LessonDefinition } from "@/types/course";

export const discoveryLessons = [
  { id: "orientation", number: "01", title: "Discovery foundations", duration: "10 min", type: "concept" },
  { id: "company-briefing", number: "02", title: "Business context and scope", duration: "18 min", type: "wizard" },
  { id: "stakeholder-interview", number: "03", title: "Stakeholders and workshop plan", duration: "20 min", type: "simulation" },
  { id: "current-state", number: "04", title: "Questions and evidence", duration: "22 min", type: "simulation" },
  { id: "requirement-studio", number: "05", title: "Requirements to design", duration: "24 min", type: "wizard" },
  { id: "discovery-homework", number: "06", title: "Applied discovery homework", duration: "30 min", type: "simulation" },
  { id: "knowledge-check", number: "07", title: "Discovery pack and exit gate", duration: "20 min", type: "exit-gate" },
] as const satisfies readonly LessonDefinition[];

export type DiscoveryLessonId = (typeof discoveryLessons)[number]["id"];

export const scopeItems = [
  "Sales and demand planning",
  "Inventory and production planning",
  "Manufacturing cost, margin, and financial impact",
  "Planning data, integrations, workflow, and reporting",
] as const;

export const stakeholders = [
  {
    id: "sponsor",
    role: "Executive Sponsor / CFO",
    focus: "Business outcomes, funding, priorities, and final decisions",
    question: "Which business outcomes define success, and which decisions require executive ownership?",
    output: "Objectives, success measures, scope decisions, and escalation path",
  },
  {
    id: "fpa",
    role: "FP&A / Planning Process Owner",
    focus: "Planning calendar, assumptions, consolidation, and financial alignment",
    question: "How does the planning cycle run from actuals through approval and publication?",
    output: "End-to-end process, calendar, governance, and financial requirements",
  },
  {
    id: "sales",
    role: "Sales & Demand Planning",
    focus: "Forecast grain, price, promotions, overrides, and consensus demand",
    question: "At what grain do planners adjust demand, and who approves an override?",
    output: "Demand, sales, pricing, and forecast workflow requirements",
  },
  {
    id: "operations",
    role: "Supply Chain & Plant Operations",
    focus: "Inventory policy, production, capacity, materials, and constraints",
    question: "Which constraints make a demand plan infeasible, and when are they detected?",
    output: "Inventory, production, capacity, and material-planning requirements",
  },
  {
    id: "finance",
    role: "Finance & Cost Accounting",
    focus: "Manufacturing cost, COGS, margin, statements, and reconciliation",
    question: "How should operational changes affect cost, profit, balance sheet, and cash?",
    output: "Cost, profitability, financial integration, and control requirements",
  },
  {
    id: "technology",
    role: "IT, Data & Integration",
    focus: "Source systems, interfaces, data quality, identity, and support constraints",
    question: "Which systems own each dataset, how is it exchanged, and how are failures reconciled?",
    output: "Source inventory, integration, security, environment, and non-functional requirements",
  },
] as const;

export const discoveryQuestionCases = [
  { id: "Q-01", question: "Which decisions should improve, and how will the business measure success?", correct: "Objectives and success measures" },
  { id: "Q-02", question: "Who plans what, at which product, customer, plant, and time level?", correct: "Planning grain and ownership" },
  { id: "Q-03", question: "Where do actuals, forecasts, inventory, capacity, and cost data originate?", correct: "Data sources and integrations" },
  { id: "Q-04", question: "Which calculations, assumptions, allocations, and exceptions are used today?", correct: "Business rules and assumptions" },
  { id: "Q-05", question: "Who prepares, reviews, rejects, approves, and publishes the plan?", correct: "Workflow, roles, and controls" },
  { id: "Q-06", question: "Which forms, reports, dashboards, and Excel analyses are needed by each role?", correct: "User experience and reporting" },
] as const;

export const discoveryEvidence = [
  "Planning calendar and process timetable",
  "Representative planning workbooks and templates",
  "Sample source extracts and data definitions",
  "Calculation, allocation, and assumption logic",
  "Approval matrix and security-role list",
  "Management reports, dashboards, and reconciliation files",
] as const;

export const designInfluenceCases = [
  { id: "D-01", requirement: "Sales forecasts are entered by Product × Customer × Channel × Month.", correct: "Dimensions, hierarchies, and planning grain" },
  { id: "D-02", requirement: "Approved ERP actuals and WMS inventory load automatically with reconciliation.", correct: "Data integration, mappings, schedules, and controls" },
  { id: "D-03", requirement: "Production equals demand plus target inventory less beginning inventory, subject to capacity.", correct: "Accounts, assumptions, business rules, and validations" },
  { id: "D-04", requirement: "Regional planners submit forecasts and managers approve or reject with comments.", correct: "Security, workflow, versions, and auditability" },
  { id: "D-05", requirement: "Executives compare volume, revenue, margin, capacity, and cash scenarios.", correct: "Forms, dashboards, Smart View, and reporting" },
] as const;

export const discoveryArtifacts = [
  "Discovery charter with objectives and scope",
  "Stakeholder register and workshop plan",
  "Business process and evidence request list",
  "Source system, data, and interface inventory",
  "Requirement catalogue with acceptance criteria",
  "Decision, assumption, risk, and open-question log",
  "Discovery readout and business sign-off",
] as const;

export const discoveryHomeworkMissions = [
  {
    id: "charter",
    title: "Draft the discovery charter",
    output: "Business objective, boundaries, success measures, constraints, and decision owner",
    purpose: "Creates the controlled starting point for scope and stakeholder alignment.",
  },
  {
    id: "stakeholders",
    title: "Assign workshop ownership",
    output: "Stakeholder-to-topic ownership map and workshop coverage",
    purpose: "Prevents requirements from being accepted without the correct decision maker or subject-matter owner.",
  },
  {
    id: "evidence",
    title: "Build an evidence-validation plan",
    output: "Evidence request for three realistic stakeholder claims",
    purpose: "Teaches the learner to validate statements instead of treating every interview response as fact.",
  },
  {
    id: "requirement",
    title: "Rewrite a vague request",
    output: "One owned and testable Planning requirement with acceptance criteria",
    purpose: "Converts business language into an implementation-ready requirement without prematurely designing the solution.",
  },
  {
    id: "readout",
    title: "Prepare the client readout",
    output: "Concise Discovery summary, open decisions, risks, and Phase 2 handoff",
    purpose: "Practises the consultant communication used to obtain agreement and protect downstream design work.",
  },
] as const;

export type DiscoveryHomeworkId = (typeof discoveryHomeworkMissions)[number]["id"];

export const homeworkStakeholderCases = [
  { id: "HWS-01", topic: "Approve business outcomes, measurable success, and scope trade-offs", correct: "Executive Sponsor / CFO" },
  { id: "HWS-02", topic: "Explain the planning calendar, submissions, consolidation, and approval process", correct: "FP&A / Planning Process Owner" },
  { id: "HWS-03", topic: "Confirm source ownership, interface schedules, data quality, and failure handling", correct: "IT, Data & Integration" },
] as const;

export const homeworkEvidenceCases = [
  { id: "HWE-01", claim: "Forecast overrides occur without consistent approval.", correct: "Planning workbook plus approval and audit evidence" },
  { id: "HWE-02", claim: "ERP actuals regularly arrive too late for the planning cycle.", correct: "Interface schedule, load logs, and reconciliation report" },
  { id: "HWE-03", claim: "A fixed 30-day safety-stock rule causes both excess and shortage.", correct: "Policy, calculation logic, and representative inventory history" },
] as const;

export const discoveryKnowledgeQuestions = [
  {
    id: "K-01",
    question: "How should a suspected root cause be handled during Discovery?",
    answers: [
      "Record it as a hypothesis and request evidence for validation during Current-State Assessment",
      "Treat it as confirmed because a senior stakeholder mentioned it",
      "Configure a solution immediately and see whether the problem disappears",
    ],
    correct: 0,
  },
  {
    id: "K-02",
    question: "Who should participate in Discovery?",
    answers: [
      "Decision owners, process owners, operational experts, finance, data owners, and technology representatives",
      "Only the implementation team because business users join during UAT",
      "Only the executive sponsor because one person can represent every process and dataset",
    ],
    correct: 0,
  },
  {
    id: "K-03",
    question: "Which requirement is ready to influence Planning design?",
    answers: [
      "An owned need containing the decision, grain, source or logic, control, and measurable acceptance criteria",
      "Build a modern sales screen similar to the existing spreadsheet",
      "The system should be fast and easy to use",
    ],
    correct: 0,
  },
  {
    id: "K-04",
    question: "How can a requirement affect the later Oracle Planning design?",
    answers: [
      "It can influence dimensions, integrations, rules, workflow, security, forms, and reporting",
      "It always maps directly to one form and nothing else",
      "It determines the final technical design during the first interview",
    ],
    correct: 0,
  },
  {
    id: "K-05",
    question: "When is Discovery ready to close?",
    answers: [
      "When objectives, scope, stakeholders, evidence, requirements, owners, open items, and sign-off are controlled",
      "As soon as the first requirement is documented",
      "Only after every Oracle Planning screen has been configured",
    ],
    correct: 0,
  },
] as const;
