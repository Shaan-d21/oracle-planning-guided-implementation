import type { LessonDefinition } from "@/types/course";

export const solutionArchitectureLessons = [
  { id: "architecture-foundations", number: "01", title: "Architecture foundations", duration: "10 min", type: "concept" },
  { id: "system-context", number: "02", title: "System context and boundaries", duration: "22 min", type: "simulation" },
  { id: "component-architecture", number: "03", title: "Application and experience architecture", duration: "26 min", type: "wizard" },
  { id: "integration-architecture", number: "04", title: "Integration and reconciliation architecture", duration: "26 min", type: "simulation" },
  { id: "architecture-controls", number: "05", title: "Environments, security, and operability", duration: "26 min", type: "simulation" },
  { id: "architecture-homework", number: "06", title: "Applied architecture homework", duration: "30 min", type: "simulation" },
  { id: "architecture-handoff", number: "07", title: "Architecture package and exit gate", duration: "20 min", type: "exit-gate" },
] as const satisfies readonly LessonDefinition[];

export type SolutionArchitectureLessonId = (typeof solutionArchitectureLessons)[number]["id"];

export const sourceSystemCases = [
  { id: "ERP", source: "ERP", evidence: "Posted sales, inventory, production, and manufacturing-cost actuals by approved member keys and month", correct: "Transactional actuals", options: ["Transactional actuals", "Commercial plan input", "Plant capacity assumptions", "Cost-driver assumptions"] },
  { id: "SALES", source: "Sales planning workbooks", evidence: "Monthly units and ASP by Product, Market, and Channel plus manager overrides", correct: "Commercial plan input", options: ["Commercial plan input", "Transactional actuals", "Plant capacity assumptions", "Cost-driver assumptions"] },
  { id: "PLANT", source: "Plant operations workbooks", evidence: "Pune and Noida available hours, output, inventory, and operating constraints", correct: "Plant capacity assumptions", options: ["Plant capacity assumptions", "Transactional actuals", "Commercial plan input", "Cost-driver assumptions"] },
  { id: "COST", source: "Cost accounting workbooks", evidence: "Material, labor, variable overhead, and fixed overhead rates by Product and Plant", correct: "Cost-driver assumptions", options: ["Cost-driver assumptions", "Transactional actuals", "Commercial plan input", "Plant capacity assumptions"] },
] as const;

export const requiredPlanningComponents = [
  "Sales demand planning",
  "Production and capacity planning",
  "Inventory and plant allocation",
  "Manufacturing cost, COGS, and profitability",
  "Scenario, version, and approval workflow",
  "Management reporting and variance analysis",
  "Governed integration and reconciliation",
  "BSO-to-ASO reporting data movement",
] as const;

export const experienceCases = [
  { id: "planner", need: "A planner enters assumptions, reviews exceptions, and submits a plan through a controlled process.", correct: "Planning forms, dashboards, and task flow", options: ["Planning forms, dashboards, and task flow", "Uncontrolled spreadsheet files", "Static management report only"] },
  { id: "analyst", need: "A finance analyst needs governed Excel-based ad hoc analysis and write-back against Planning data.", correct: "Smart View with governed connections", options: ["Smart View with governed connections", "Direct database updates", "Email attachments"] },
  { id: "executive", need: "An executive needs concise KPI, variance, risk, and scenario views without entering planning detail.", correct: "Curated dashboards and management reports", options: ["Curated dashboards and management reports", "Administrator console", "Raw integration files"] },
  { id: "audit", need: "A controller needs traceable balances, load results, approvals, and reconciliation evidence.", correct: "Audit, reconciliation, and controlled reporting outputs", options: ["Audit, reconciliation, and controlled reporting outputs", "Personal offline workbook", "Screenshots without run identifiers"] },
] as const;

export const integrationCases = [
  { id: "actuals", flow: "ERP actuals → Planning input cube", need: "Posted sales, inventory, production, and cost actuals must be available at the monthly planning grain.", correct: "Scheduled governed load with mapping validation, reject handling, source reconciliation, run log, and alert", options: ["Scheduled governed load with mapping validation, reject handling, source reconciliation, run log, and alert", "Planner copies totals from an email", "Load whatever arrives and investigate only after reporting"] },
  { id: "sales", flow: "Controlled sales file → Sales planning", need: "Product, Market, Channel, Scenario, Version, and Month must use approved member keys.", correct: "Template-controlled inbound flow with header validation, member mapping, duplicate checks, rejection, and source-to-target reconciliation", options: ["Template-controlled inbound flow with header validation, member mapping, duplicate checks, rejection, and source-to-target reconciliation", "Let each market upload a different file layout", "Store Market and Channel in comments"] },
  { id: "capacity", flow: "Plant capacity assumptions → Production planning", need: "Monthly available hours for Pune and Noida must align with Product and Period meaning.", correct: "Governed load with grain, unit, calendar, completeness, rejection, and recovery controls", options: ["Governed load with grain, unit, calendar, completeness, rejection, and recovery controls", "Free-text capacity notes", "One annual capacity total for both plants"] },
  { id: "reporting", flow: "BSO input/calculation cube → ASO reporting cube", need: "Only calculated and approved monthly results should feed management reporting.", correct: "Governed Data Map or Smart Push with explicit mappings, approved scope, control totals, reconciliation, run evidence, and rerun protection", options: ["Governed Data Map or Smart Push with explicit mappings, approved scope, control totals, reconciliation, run evidence, and rerun protection", "Manually re-enter totals in the reporting cube", "Allow dashboards to read unapproved Working data without distinction"] },
  { id: "approved-plan", flow: "Approved plan → ERP / reporting consumers", need: "Only the approved scenario may leave Planning, with evidence of what was sent.", correct: "Approval-gated outbound flow with version lock, control total, acknowledgement, audit trail, and re-run protection", options: ["Approval-gated outbound flow with version lock, control total, acknowledgement, audit trail, and re-run protection", "Export the most recently edited scenario", "Allow every planner to send extracts independently"] },
] as const;

export const nfrCases = [
  { id: "performance", scenario: "Sales, plant, cost, and finance users work during the monthly planning peak.", correct: "Define representative volumes, p95 response and rule targets, concurrency tests, and an owner for tuning decisions", options: ["Define representative volumes, p95 response and rule targets, concurrency tests, and an owner for tuning decisions", "State that the application must be fast", "Wait for production complaints before measuring"] },
  { id: "recovery", scenario: "A nightly load fails after some records have been processed.", correct: "Design restart-safe processing, quarantined rejects, reconciliation, notification, recovery ownership, and a tested runbook", options: ["Design restart-safe processing, quarantined rejects, reconciliation, notification, recovery ownership, and a tested runbook", "Reload repeatedly until it looks right", "Ask planners to correct target totals manually"] },
  { id: "continuity", scenario: "The business requires a recoverable planning position and a continuity procedure.", correct: "Align RTO and RPO with Oracle service capabilities, define supported backup or export evidence, recovery steps, and test cadence", options: ["Align RTO and RPO with Oracle service capabilities, define supported backup or export evidence, recovery steps, and test cadence", "Promise zero data loss without validating service capabilities", "Treat recovery as an infrastructure-only concern"] },
  { id: "identity", scenario: "Integrations and automations require non-interactive access.", correct: "Use named service identities with least privilege, managed secrets, rotation, monitoring, and accountable ownership", options: ["Use named service identities with least privilege, managed secrets, rotation, monitoring, and accountable ownership", "Share an administrator password across the team", "Embed a personal user password in scripts"] },
] as const;

export const requiredArchitectureControls = [
  "Role-based access and segregation of duties",
  "Named service identities and managed secrets",
  "Measured performance, volume, and concurrency targets",
  "Load validation, rejection, reconciliation, and recovery",
  "Run history, audit evidence, monitoring, and alerting",
  "Controlled promotion with approval, rollback, and smoke tests",
  "Backup or export evidence and continuity runbook",
  "Support ownership, escalation path, and operational handover",
] as const;

export const architectureHomeworkMissions = [
  { id: "boundary", title: "Mission 1 · Defend the boundary", prompt: "Explain what remains authoritative in ERP and controlled business workbooks, what Planning owns, and what approved outputs leave Planning.", output: "A concise boundary and ownership note" },
  { id: "application", title: "Mission 2 · Confirm the application pattern", prompt: "Apply the approved Custom Planning, one-BSO, one-ASO architecture without inventing names or year values.", output: "Three justified architecture decisions" },
  { id: "integration", title: "Mission 3 · Make a flow operable", prompt: "Design one critical inbound or outbound flow from trigger through reconciliation, failure recovery, and support ownership.", output: "An end-to-end integration control narrative" },
  { id: "nfr", title: "Mission 4 · Turn quality into controls", prompt: "Select the architecture response that makes each non-functional need measurable and testable.", output: "Three measurable control decisions" },
  { id: "adr", title: "Mission 5 · Record a decision", prompt: "Write a short architecture decision record: context, options considered, decision, rationale, consequences, owner, and review trigger.", output: "A review-ready ADR" },
] as const;

export const homeworkApplicationCases = [
  { id: "transaction-master", scenario: "The ERP already owns posted actuals and transactional detail.", correct: "Keep ERP authoritative; load the governed planning grain and reconciliation evidence into Planning", options: ["Keep ERP authoritative; load the governed planning grain and reconciliation evidence into Planning", "Rebuild the ERP subledger inside Planning", "Let planners overwrite posted actuals"] },
  { id: "input", scenario: "Apex needs monthly sales, inventory, production, capacity, cost, and profitability calculations without unnecessary cube fragmentation.", correct: "Use one Custom Planning BSO input/calculation cube with controlled No members and valid intersections", options: ["Use one Custom Planning BSO input/calculation cube with controlled No members and valid intersections", "Create a separate input cube for every department", "Store all calculations only in Excel"] },
  { id: "reporting", scenario: "Management needs fast read-only aggregation and variance reporting without entering data in the reporting layer.", correct: "Use the existing ASO reporting cube fed from the BSO cube through a reconciled Data Map or Smart Push", options: ["Use the existing ASO reporting cube fed from the BSO cube through a reconciled Data Map or Smart Push", "Enter reporting totals manually in ASO", "Let users edit both cubes independently"] },
] as const;

export const homeworkNfrCases = [
  { id: "peak", scenario: "Peak-cycle user experience", correct: "Define volumes, concurrency, p95 response targets, representative tests, and acceptance evidence", options: ["Define volumes, concurrency, p95 response targets, representative tests, and acceptance evidence", "Write ‘good performance’ in the design", "Test with one administrator only"] },
  { id: "failed-run", scenario: "Partial integration failure", correct: "Use restart-safe processing, controlled rejects, reconciliation, alerting, and a recovery owner", options: ["Use restart-safe processing, controlled rejects, reconciliation, alerting, and a recovery owner", "Delete the run evidence and start again", "Balance the target manually without source comparison"] },
  { id: "promotion", scenario: "Production deployment", correct: "Promote an approved package through environments with rollback, smoke tests, reconciliation, and release evidence", options: ["Promote an approved package through environments with rollback, smoke tests, reconciliation, and release evidence", "Reconfigure production directly from memory", "Skip validation when the change is urgent"] },
] as const;

export const architectureArtifacts = [
  "System context, boundary, and source-of-record map",
  "Custom Planning application and two-cube responsibility and data-movement decision",
  "Integration inventory, data-flow, control, and reconciliation design",
  "User experience, reporting, and consumption architecture",
  "Environment, release, migration, and rollback topology",
  "Identity, access, and segregation-of-duties model",
  "Non-functional, monitoring, recovery, and support architecture",
  "Architecture decision, dependency, risk, assumption, and approval log",
] as const;

export const architectureKnowledgeQuestions = [
  { id: "boundary-purpose", prompt: "What is the main purpose of the system-context boundary?", correct: "Make ownership, sources of record, interfaces, and responsibilities explicit", options: ["Make ownership, sources of record, interfaces, and responsibilities explicit", "Define every dimension member", "Replace the approved requirements baseline"] },
  { id: "planning-copy", prompt: "When should Planning copy an operational source-of-record function?", correct: "Only when an approved requirement and trade-off justify that ownership change", options: ["Only when an approved requirement and trade-off justify that ownership change", "Whenever a planner prefers one screen", "For every source system used by the solution"] },
  { id: "integration-complete", prompt: "Which statement describes a complete integration architecture?", correct: "It covers ownership, grain, frequency, method, validation, rejects, recovery, reconciliation, monitoring, and support", options: ["It covers ownership, grain, frequency, method, validation, rejects, recovery, reconciliation, monitoring, and support", "It names the source and target only", "It assumes successful loads need no evidence"] },
  { id: "measurable-nfr", prompt: "Which is a testable non-functional requirement?", correct: "At representative peak volume, agreed forms meet the approved p95 response target", options: ["At representative peak volume, agreed forms meet the approved p95 response target", "The system should be user friendly and fast", "Performance will be checked after go-live"] },
  { id: "exit-ready", prompt: "What makes an architecture package ready for detailed design?", correct: "Decisions, trade-offs, dependencies, risks, controls, owners, and approvals are recorded and traceable", options: ["Decisions, trade-offs, dependencies, risks, controls, owners, and approvals are recorded and traceable", "Every Oracle screen has been configured", "The diagram looks polished even if ownership is unclear"] },
] as const;
