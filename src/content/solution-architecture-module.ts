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
  { id: "CRM", source: "CRM", evidence: "Account, opportunity, pipeline stage, expected close date, and sales territory", correct: "Commercial demand driver", options: ["Commercial demand driver", "Financial actual", "Production capacity", "Inventory actual"] },
  { id: "ERP", source: "ERP / General ledger", evidence: "Posted revenue, cost, entity, account, product, and period balances", correct: "Financial actual", options: ["Commercial demand driver", "Financial actual", "Production capacity", "Inventory actual"] },
  { id: "MES", source: "Manufacturing execution system", evidence: "Line capacity, yield, downtime, throughput, and production output", correct: "Production capacity", options: ["Commercial demand driver", "Financial actual", "Production capacity", "Inventory actual"] },
  { id: "WMS", source: "Warehouse management system", evidence: "On-hand, allocated, in-transit, receipt, issue, location, and lot quantities", correct: "Inventory actual", options: ["Commercial demand driver", "Financial actual", "Production capacity", "Inventory actual"] },
  { id: "PROC", source: "Procurement / supplier system", evidence: "Open purchase orders, supplier lead time, minimum order quantity, and material availability", correct: "Supply constraint", options: ["Supply constraint", "Financial actual", "Production capacity", "Inventory actual"] },
] as const;

export const requiredPlanningComponents = [
  "Sales demand planning",
  "Production and capacity planning",
  "Inventory and supply balancing",
  "Cost and profitability planning",
  "Financial statement impact",
  "Scenario, version, and approval workflow",
  "Management reporting and variance analysis",
  "Governed integration and reconciliation",
] as const;

export const experienceCases = [
  { id: "planner", need: "A planner enters assumptions, reviews exceptions, and submits a plan through a controlled process.", correct: "Planning forms, dashboards, and task flow", options: ["Planning forms, dashboards, and task flow", "Uncontrolled spreadsheet files", "Static management report only"] },
  { id: "analyst", need: "A finance analyst needs governed Excel-based ad hoc analysis and write-back against Planning data.", correct: "Smart View with governed connections", options: ["Smart View with governed connections", "Direct database updates", "Email attachments"] },
  { id: "executive", need: "An executive needs concise KPI, variance, risk, and scenario views without entering planning detail.", correct: "Curated dashboards and management reports", options: ["Curated dashboards and management reports", "Administrator console", "Raw integration files"] },
  { id: "audit", need: "A controller needs traceable balances, load results, approvals, and reconciliation evidence.", correct: "Audit, reconciliation, and controlled reporting outputs", options: ["Audit, reconciliation, and controlled reporting outputs", "Personal offline workbook", "Screenshots without run identifiers"] },
] as const;

export const integrationCases = [
  { id: "actuals", flow: "ERP actuals → Planning", need: "Posted financial actuals must be available by 06:00 on business day two.", correct: "Scheduled governed load with mapping validation, reject handling, balance reconciliation, run log, and alert", options: ["Scheduled governed load with mapping validation, reject handling, balance reconciliation, run log, and alert", "Planner copies totals from an email", "Load whatever arrives and investigate only after reporting"] },
  { id: "pipeline", flow: "CRM pipeline → Sales planning", need: "Opportunity drivers are refreshed daily while CRM remains the source of record.", correct: "Incremental or scheduled inbound flow with keys, stage mapping, duplicate checks, and source-to-target reconciliation", options: ["Incremental or scheduled inbound flow with keys, stage mapping, duplicate checks, and source-to-target reconciliation", "Maintain a second opportunity master in Planning", "Let each region upload a different file layout"] },
  { id: "capacity", flow: "MES capacity → Production planning", need: "Weekly plant and line capacity must preserve unit and calendar meaning.", correct: "Governed load with grain, calendar, unit-conversion, completeness, rejection, and recovery controls", options: ["Governed load with grain, calendar, unit-conversion, completeness, rejection, and recovery controls", "Free-text capacity notes", "One annual capacity total for every plant"] },
  { id: "inventory", flow: "WMS inventory → Supply balancing", need: "On-hand and in-transit positions are refreshed with a known as-of timestamp.", correct: "Timestamped snapshot flow with product-location mapping, duplicate checks, quantity reconciliation, and stale-data alert", options: ["Timestamped snapshot flow with product-location mapping, duplicate checks, quantity reconciliation, and stale-data alert", "Overwrite inventory whenever a file appears", "Use planner-entered estimates as the official inventory balance"] },
  { id: "approved-plan", flow: "Approved plan → ERP / reporting consumers", need: "Only the approved scenario may leave Planning, with evidence of what was sent.", correct: "Approval-gated outbound flow with version lock, control total, acknowledgement, audit trail, and re-run protection", options: ["Approval-gated outbound flow with version lock, control total, acknowledgement, audit trail, and re-run protection", "Export the most recently edited scenario", "Allow every planner to send extracts independently"] },
] as const;

export const nfrCases = [
  { id: "performance", scenario: "Up to 100 concurrent planners use peak-cycle forms and calculations.", correct: "Define representative volumes, p95 response and rule targets, concurrency tests, and an owner for tuning decisions", options: ["Define representative volumes, p95 response and rule targets, concurrency tests, and an owner for tuning decisions", "State that the application must be fast", "Wait for production complaints before measuring"] },
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
  { id: "boundary", title: "Mission 1 · Defend the boundary", prompt: "Explain what remains authoritative in CRM, ERP, MES, WMS, and procurement; what Planning owns; and what approved outputs leave Planning.", output: "A concise boundary and ownership note" },
  { id: "application", title: "Mission 2 · Choose an application pattern", prompt: "Resolve three architecture scenarios without jumping into detailed cube or dimension design.", output: "Three justified architecture decisions" },
  { id: "integration", title: "Mission 3 · Make a flow operable", prompt: "Design one critical inbound or outbound flow from trigger through reconciliation, failure recovery, and support ownership.", output: "An end-to-end integration control narrative" },
  { id: "nfr", title: "Mission 4 · Turn quality into controls", prompt: "Select the architecture response that makes each non-functional need measurable and testable.", output: "Three measurable control decisions" },
  { id: "adr", title: "Mission 5 · Record a decision", prompt: "Write a short architecture decision record: context, options considered, decision, rationale, consequences, owner, and review trigger.", output: "A review-ready ADR" },
] as const;

export const homeworkApplicationCases = [
  { id: "transaction-master", scenario: "The ERP already owns posted actuals and transactional detail.", correct: "Keep ERP authoritative; load the governed planning grain and reconciliation evidence into Planning", options: ["Keep ERP authoritative; load the governed planning grain and reconciliation evidence into Planning", "Rebuild the ERP subledger inside Planning", "Let planners overwrite posted actuals"] },
  { id: "mixed-grain", scenario: "Sales plans monthly by product-customer while production plans weekly by product-plant-line.", correct: "Use connected capability areas with conformed dimensions and controlled data movement where grains differ", options: ["Use connected capability areas with conformed dimensions and controlled data movement where grains differ", "Force every process into one identical grain", "Build unrelated applications with manual rekeying"] },
  { id: "what-if", scenario: "Executives want governed what-if calculations plus concise reporting.", correct: "Keep scenario calculations and approvals in Planning; publish curated results to dashboards or reporting consumers", options: ["Keep scenario calculations and approvals in Planning; publish curated results to dashboards or reporting consumers", "Perform all write-back calculations in a static BI report", "Email uncontrolled scenario workbooks"] },
] as const;

export const homeworkNfrCases = [
  { id: "peak", scenario: "Peak-cycle user experience", correct: "Define volumes, concurrency, p95 response targets, representative tests, and acceptance evidence", options: ["Define volumes, concurrency, p95 response targets, representative tests, and acceptance evidence", "Write ‘good performance’ in the design", "Test with one administrator only"] },
  { id: "failed-run", scenario: "Partial integration failure", correct: "Use restart-safe processing, controlled rejects, reconciliation, alerting, and a recovery owner", options: ["Use restart-safe processing, controlled rejects, reconciliation, alerting, and a recovery owner", "Delete the run evidence and start again", "Balance the target manually without source comparison"] },
  { id: "promotion", scenario: "Production deployment", correct: "Promote an approved package through environments with rollback, smoke tests, reconciliation, and release evidence", options: ["Promote an approved package through environments with rollback, smoke tests, reconciliation, and release evidence", "Reconfigure production directly from memory", "Skip validation when the change is urgent"] },
] as const;

export const architectureArtifacts = [
  "System context, boundary, and source-of-record map",
  "Application capability and component architecture",
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
