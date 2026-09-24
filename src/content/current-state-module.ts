import type { LessonDefinition } from "@/types/course";

export const currentStateLessons = [
  { id: "current-state-orientation", number: "01", title: "AS-IS assessment foundations", duration: "10 min", type: "concept" },
  { id: "current-state-stakeholders", number: "02", title: "Evidence workshops", duration: "18 min", type: "simulation" },
  { id: "current-state-process", number: "03", title: "Process and handoff tracing", duration: "24 min", type: "simulation" },
  { id: "current-state-systems", number: "04", title: "Systems, data, and interfaces", duration: "22 min", type: "simulation" },
  { id: "current-state-pain", number: "05", title: "Root causes and baselines", duration: "24 min", type: "assessment" },
  { id: "current-state-homework", number: "06", title: "Applied AS-IS homework", duration: "30 min", type: "simulation" },
  { id: "current-state-evidence", number: "07", title: "Assessment pack and exit gate", duration: "20 min", type: "exit-gate" },
] as const satisfies readonly LessonDefinition[];

export type CurrentStateLessonId = (typeof currentStateLessons)[number]["id"];

export const currentStateStakeholders = [
  { id: "sales", role: "Sales", focus: "Regional forecast files, overrides, approvals, and version conflicts", evidence: "Forecast files, approval trail, forecast calendar" },
  { id: "demand", role: "Demand Planning", focus: "History, baseline forecast, consensus process, and accuracy", evidence: "Forecast history, accuracy report, exception log" },
  { id: "inventory", role: "Inventory", focus: "On-hand, safety stock policy, transfers, shortages, and excess", evidence: "Inventory report, policy, shortage and excess history" },
  { id: "production", role: "Production / Plant", focus: "Schedule, yield, batch, capacity, downtime, and feasibility", evidence: "Production schedule, capacity sheet, downtime log" },
  { id: "procurement", role: "Procurement", focus: "BOM demand, open orders, lead time, MOQ, and supplier constraints", evidence: "BOM extract, open PO report, supplier lead-time data" },
  { id: "cost", role: "Cost Accounting", focus: "Material, labor, overhead, inventory valuation, COGS, and margin", evidence: "Cost standards, variance report, allocation workbook" },
  { id: "fpa", role: "FP&A / Controllership", focus: "Planning calendar, consolidation, statements, controls, and reconciliation", evidence: "Calendar, reconciliation workbook, management pack" },
  { id: "technology", role: "IT / Integration", focus: "System ownership, extracts, mappings, failures, recovery, and support", evidence: "Interface inventory, run logs, mappings, incident history" },
  { id: "sop", role: "Management / S&OP", focus: "Decision cadence, exceptions, trade-offs, approvals, and published plan", evidence: "S&OP pack, minutes, decision and action log" },
] as const;

export const processTraces = [
  { id: "sales", name: "Sales forecast", trace: ["ERP sales history", "Excel extract", "Regional files", "Manager overrides", "Email", "FP&A"], controlGap: "No governed forecast version, approval, or audit trail" },
  { id: "inventory", name: "Inventory planning", trace: ["WMS on-hand", "Excel safety stock", "Planner judgment", "Inventory plan"], controlGap: "Inventory policy is inconsistent and disconnected from demand variability" },
  { id: "production", name: "Production planning", trace: ["Sales forecast", "Manual schedule", "Capacity spreadsheet", "Plant manager"], controlGap: "Production feasibility is checked late and outside the planning process" },
  { id: "financial", name: "Financial reconciliation", trace: ["Sales", "Production", "Inventory", "Cost workbooks", "Manual consolidation", "P&L / BS / CF"], controlGap: "Operational assumptions lack automated financial integration and reconciliation" },
] as const;

export const interfaceAssessmentDimensions = [
  "Business and technical owners",
  "Source, target, and data grain",
  "Direction, method, and file or API format",
  "Schedule, cutoff, volume, and latency",
  "Mappings, transformations, and defaults",
  "Validation and rejected-record handling",
  "Failure notification, restart, and recovery",
  "Reconciliation, audit evidence, and retention",
] as const;

export const interfaceCases = [
  { id: "erp", name: "ERP actuals → planning files", cadence: "Daily and month-end", concern: "Manual extracts arrive after the planning cutoff and require finance reconciliation." },
  { id: "crm", name: "CRM pipeline → sales forecast", cadence: "Weekly", concern: "Customer and product mappings differ across regional forecast files." },
  { id: "wms", name: "WMS inventory → inventory plan", cadence: "Daily", concern: "Rejected rows and inventory adjustments are not visibly reconciled." },
  { id: "mes", name: "MES capacity → production plan", cadence: "Weekly", concern: "The capacity workbook becomes stale before the approved demand plan reaches the plant." },
] as const;

export const currentStatePainPoints = [
  { id: "AS01", process: "Sales", problem: "Multiple forecast versions", impact: "Delayed consensus", frequency: "Monthly", rootCause: "No governed version and workflow", priority: "High" },
  { id: "AS02", process: "Inventory", problem: "Fixed 30-day safety stock", impact: "Excess or short inventory", frequency: "Continuous", rootCause: "Policy ignores variability, lead time, and service", priority: "Critical" },
  { id: "AS03", process: "Production", problem: "Capacity maintained offline", impact: "Unfeasible production plans", frequency: "Weekly", rootCause: "Demand and capacity are disconnected", priority: "Critical" },
  { id: "AS04", process: "MRP", problem: "Manual BOM netting", impact: "Material shortages", frequency: "Weekly", rootCause: "Spreadsheet dependency and stale BOM", priority: "Critical" },
  { id: "AS05", process: "Cost", problem: "Stale material prices", impact: "Gross-margin distortion", frequency: "Monthly", rootCause: "Cost drivers are not synchronized", priority: "High" },
  { id: "AS06", process: "Finance", problem: "Manual reconciliation", impact: "Close and forecast delay", frequency: "Monthly", rootCause: "Operational plans are not integrated to financial statements", priority: "High" },
] as const;

export const baselineKpis = [
  ["Forecast cycle", "8 days"], ["Forecast accuracy", "78%"], ["Manual adjustments", "340 / month"], ["Inventory", "₹260m"],
  ["Service level", "93%"], ["Reconciliation", "6 hours"], ["S&OP preparation", "3 days"], ["Critical defects", "18 / month"],
] as const;

export const currentStateHomeworkMissions = [
  { id: "trace", title: "Write an end-to-end process trace", output: "AS-IS trigger, inputs, transformations, decisions, handoffs, output, owner, timing, and evidence", purpose: "Practises documenting how work actually happens without proposing the future solution." },
  { id: "handoffs", title: "Classify control breakdowns", output: "Three observed handoffs classified by the risk they create", purpose: "Builds the judgement needed to distinguish a handoff symptom from the underlying control breakdown." },
  { id: "evidence", title: "Build a finding-evidence plan", output: "Evidence package for three suspected current-state findings", purpose: "Ensures every material finding can be defended with records, system evidence, and representative samples." },
  { id: "root-cause", title: "Validate a root-cause hypothesis", output: "Problem, impact, hypothesis, validation evidence, owner, and conclusion rule", purpose: "Prevents the team from turning the first stakeholder explanation into an untested design assumption." },
  { id: "readout", title: "Prepare the AS-IS readout", output: "Executive assessment summary, priorities, risks, open items, and Phase 3 handoff", purpose: "Practises communicating the minimum evidence the client must agree before future-state design." },
] as const;

export type CurrentStateHomeworkId = (typeof currentStateHomeworkMissions)[number]["id"];

export const homeworkHandoffCases = [
  { id: "H-01", observation: "Seventeen regional forecast files are emailed to FP&A and repeatedly renamed during consolidation.", correct: "Duplicate versions and an uncontrolled manual handoff" },
  { id: "H-02", observation: "The weekly material plan uses a BOM extract refreshed only once each month.", correct: "Stale master data used in a time-sensitive decision" },
  { id: "H-03", observation: "A planner can overwrite a capacity formula and no reviewer or exception report detects the change.", correct: "Missing preventive and detective controls" },
] as const;

export const homeworkEvidenceCases = [
  { id: "E-01", finding: "ERP actuals regularly arrive after the agreed planning cutoff.", correct: "Interface schedule, dated run logs, load timestamps, and reconciliation reports" },
  { id: "E-02", finding: "Forecast overrides occur without consistent approval.", correct: "Version history, approval emails, workflow records, and representative forecast files" },
  { id: "E-03", finding: "Capacity conflicts are discovered only after production scheduling.", correct: "Dated demand, schedule, and capacity files plus exception and meeting records" },
] as const;

export const currentStateDeliverables = [
  "Approved AS-IS process maps and handoff matrix",
  "Stakeholder workshop notes and evidence register",
  "System, data, file, and interface inventory",
  "Calculation, control, and reconciliation inventory",
  "Pain-point and root-cause register with impact and priority",
  "Measurable AS-IS KPI baseline with source and owner",
  "Current-state assessment readout with risks, open items, and agreement",
] as const;

export const currentStateKnowledgeQuestions = [
  { id: "K-01", question: "What distinguishes Current-State Assessment from Discovery?", answers: ["Discovery frames scope and requirements; Current-State Assessment validates how work happens using process, data, system, control, and performance evidence", "They are identical phases with different names", "Current-State Assessment is where the Oracle Planning application is configured"], correct: 0 },
  { id: "K-02", question: "When is a current-state finding evidence-backed?", answers: ["When observations are supported by representative records, system or file evidence, owners, and measurable impact", "When one senior stakeholder states it confidently", "When it sounds consistent with a preferred future solution"], correct: 0 },
  { id: "K-03", question: "How should the team handle a suspected root cause?", answers: ["Record it as a hypothesis, define validation evidence, test representative cases, and document the conclusion", "Convert it directly into a solution requirement", "Ignore it and document only the visible symptom"], correct: 0 },
  { id: "K-04", question: "Why preserve AS-IS KPI baselines?", answers: ["They quantify current performance and later support realistic targets and benefit measurement", "They guarantee the future solution will improve every measure", "They replace the need for process and control evidence"], correct: 0 },
  { id: "K-05", question: "What is the correct Phase 2 handoff?", answers: ["Agreed findings, root causes, constraints, baselines, risks, and open decisions that Phase 3 must address", "A completed Oracle Planning configuration ready for UAT", "A list of screens copied from the existing spreadsheets"], correct: 0 },
] as const;
