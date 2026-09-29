export const workforceCapexLessons = [
  { id: "dependency-foundations", number: "01", title: "Workforce and CapEx dependency foundations", duration: "16 min", type: "concept" },
  { id: "operational-handoff", number: "02", title: "Qualify the production dependency handoff", duration: "24 min", type: "assessment" },
  { id: "workforce-requirement", number: "03", title: "Calculate workforce requirements", duration: "30 min", type: "simulation" },
  { id: "workforce-actions", number: "04", title: "Choose workforce actions and cost impacts", duration: "28 min", type: "wizard" },
  { id: "asset-capacity", number: "05", title: "Assess asset capacity and CapEx triggers", duration: "30 min", type: "simulation" },
  { id: "capex-financials", number: "06", title: "Plan CapEx timing and financial impact", duration: "28 min", type: "assessment" },
  { id: "dependency-exceptions", number: "07", title: "Resolve dependency exceptions and scenarios", duration: "28 min", type: "wizard" },
  { id: "dependency-walkthrough", number: "08", title: "Configure and test dependency forms", duration: "30 min", type: "guided-screenshot" },
  { id: "dependency-homework", number: "09", title: "Applied workforce and CapEx lab", duration: "40 min", type: "assessment" },
  { id: "dependency-handoff", number: "10", title: "Evidence package and exit gate", duration: "22 min", type: "exit-gate" },
] as const;

export type WorkforceCapexLessonId = (typeof workforceCapexLessons)[number]["id"];

export const dependencyReadinessControls = [
  "Phase 10 production starts, required plant hours, available hours, utilization, and exceptions are approved by Product × Entity × Month",
  "Phase 12 labor rates, overtime rates, operating-cost impacts, and reporting mappings have approved owners and versions",
  "Paid hours, productive availability, skills, shift rules, current FTE, vacancy, overtime limits, and workforce-action lead times are governed",
  "Asset capacity, uptime, maintenance, productivity actions, project cost, lead time, useful life, residual value, and in-service criteria are governed",
  "Hours, FTE, utilization, lead time, and asset counts use No Currency; overtime, compensation, project cost, cash, and depreciation use INR locally and USD only in governed reporting",
  "ApexPlan remains a custom Planning application: dependency planning uses existing Entity, Account, Scenario, Version, and Period structures without inventing Employee, Job, or Asset detail",
] as const;

export const operationalHandoffCases = [
  { id: "OH-01", issue: "Company labor capacity is sufficient in total, but Pune has a two-hour shortfall.", correct: "Assess the dependency by Entity, skill, period, and timing before using company totals", options: ["Assess the dependency by Entity, skill, period, and timing before using company totals", "Net Pune and Noida automatically", "Ignore the local shortfall"] },
  { id: "OH-02", issue: "Required production hours change after demand and inventory are rerun.", correct: "Version the changed handoff and rerun only the affected workforce, asset, cost, and financial scopes", options: ["Version the changed handoff and rerun only the affected workforce, asset, cost, and financial scopes", "Keep the old dependency plan", "Edit required FTE manually"] },
  { id: "OH-03", issue: "Line hours are supplied without identifying productive versus calendar hours.", correct: "Clarify the definition and reconcile calendar, paid, absence, training, downtime, and productive hours", options: ["Clarify the definition and reconcile calendar, paid, absence, training, downtime, and productive hours", "Treat all hours as productive", "Use FTE count alone"] },
  { id: "OH-04", issue: "A Product cannot be produced on a plant line despite apparent spare hours.", correct: "Respect approved Product-to-plant and skill or asset capability before claiming available capacity", options: ["Respect approved Product-to-plant and skill or asset capability before claiming available capacity", "Use the spare hours anyway", "Move the cost to another Entity"] },
] as const;

export const workforceCases = [
  { id: "WF-01", issue: "A planner divides required hours by paid hours and ignores productive availability.", correct: "Use paid hours × productive availability as the effective hours supplied by one FTE", options: ["Use paid hours × productive availability as the effective hours supplied by one FTE", "Use all paid hours", "Use machine capacity"] },
  { id: "WF-02", issue: "Pune requires 410 hours and three current FTE provide 408 productive hours.", correct: "Expose the two-hour gap and compare a controlled short-term action before requesting a permanent hire", options: ["Expose the two-hour gap and compare a controlled short-term action before requesting a permanent hire", "Automatically hire one FTE", "Hide the gap as immaterial"] },
  { id: "WF-03", issue: "The calculated requirement is 3.015 FTE for a role that must be rostered in whole people.", correct: "Retain exact FTE for analysis, show four roster FTE, and keep the rounding impact visible", options: ["Retain exact FTE for analysis, show four roster FTE, and keep the rounding impact visible", "Round down to three", "Replace exact FTE with four everywhere"] },
  { id: "WF-04", issue: "Noida has spare labor but the workers lack the required certification for Pune work.", correct: "Do not count the capacity until transfer, travel, labor rules, and skill validity are approved", options: ["Do not count the capacity until transfer, travel, labor rules, and skill validity are approved", "Treat every FTE as interchangeable", "Change the skill requirement"] },
] as const;

export const workforceActionCases = [
  { id: "WA-01", issue: "A recurring gap is covered with overtime every month.", correct: "Compare cumulative overtime, fatigue, legal limits, service risk, hiring lead time, and permanent capacity", options: ["Compare cumulative overtime, fatigue, legal limits, service risk, hiring lead time, and permanent capacity", "Always use overtime", "Always hire immediately"] },
  { id: "WA-02", issue: "A contractor is proposed for a safety-critical line role.", correct: "Validate role eligibility, skill, access, supervision, rate, duration, and approval before using contractor capacity", options: ["Validate role eligibility, skill, access, supervision, rate, duration, and approval before using contractor capacity", "Use the contractor rate only", "Treat contractor hours as existing FTE"] },
  { id: "WA-03", issue: "A hire is approved but starts after the capacity need date.", correct: "Keep the near-term gap open and plan an interim approved response", options: ["Keep the near-term gap open and plan an interim approved response", "Count the hire from approval date", "Move the start date in the model"] },
  { id: "WA-04", issue: "Training improves future capability but consumes productive hours now.", correct: "Model training hours, effective skill date, temporary capacity loss, cost, and owner", options: ["Model training hours, effective skill date, temporary capacity loss, cost, and owner", "Add the skill immediately", "Ignore training cost"] },
] as const;

export const assetCapacityCases = [
  { id: "AC-01", issue: "A future scenario needs 560 machine hours against 450 existing hours.", correct: "Test approved overtime, maintenance recovery, productivity, rebalance, and timing before proposing CapEx", options: ["Test approved overtime, maintenance recovery, productivity, rebalance, and timing before proposing CapEx", "Buy an asset immediately", "Reduce required hours manually"] },
  { id: "AC-02", issue: "Thirty overtime hours and twenty productivity hours reduce the 110-hour gap to sixty.", correct: "Calculate one 160-hour asset only after preserving both mitigation assumptions and the residual gap", options: ["Calculate one 160-hour asset only after preserving both mitigation assumptions and the residual gap", "Ignore mitigations", "Buy capacity equal to the original gap"] },
  { id: "AC-03", issue: "The asset will arrive after the required production month.", correct: "Do not claim its capacity for that month; keep an interim operational exception", options: ["Do not claim its capacity for that month; keep an interim operational exception", "Backdate in-service", "Shift depreciation only"] },
  { id: "AC-04", issue: "A new machine adds capacity but the trained operator, floor space, utilities, and maintenance plan are missing.", correct: "Treat the project as infeasible until all enabling dependencies have owners and dates", options: ["Treat the project as infeasible until all enabling dependencies have owners and dates", "Approve based on machine capacity", "Add the missing items after go-live"] },
] as const;

export const capexFinancialCases = [
  { id: "CF-01", issue: "A 1,200,000 asset with 60-month life and zero residual is available for use.", correct: "Calculate 20,000 monthly straight-line depreciation from the approved in-service month", options: ["Calculate 20,000 monthly straight-line depreciation from the approved in-service month", "Depreciate from request date", "Expense the full amount as depreciation"] },
  { id: "CF-02", issue: "The purchase order is issued now, but payment milestones occur over three months.", correct: "Plan cash outflow by approved payment schedule separately from capitalization and depreciation", options: ["Plan cash outflow by approved payment schedule separately from capitalization and depreciation", "Use one depreciation schedule for cash", "Recognize all cash at in-service"] },
  { id: "CF-03", issue: "Installation and commissioning are required to make the asset usable.", correct: "Apply the approved capitalization policy and keep capitalizable and operating costs separately traceable", options: ["Apply the approved capitalization policy and keep capitalizable and operating costs separately traceable", "Capitalize every project cost", "Expense every project cost"] },
  { id: "CF-04", issue: "The capital request has positive capacity impact but no business-case measure.", correct: "Record cost, timing, capacity, service, labor, margin, cash, depreciation, risks, and approval criteria", options: ["Record cost, timing, capacity, service, labor, margin, cash, depreciation, risks, and approval criteria", "Approve from capacity alone", "Use gross margin as the asset cost"] },
] as const;

export const dependencyExceptionCases = [
  { id: "DE-01", issue: "The workforce plan resolves hours but exceeds the approved overtime limit.", correct: "Keep the constraint visible and choose a compliant alternative or escalate an owned exception", options: ["Keep the constraint visible and choose a compliant alternative or escalate an owned exception", "Raise the limit silently", "Ignore excess hours"] },
  { id: "DE-02", issue: "The CapEx scenario removes an asset gap but worsens cash and near-term margin.", correct: "Present the capacity, cash, depreciation, operating-cost, margin, timing, and risk trade-offs together", options: ["Present the capacity, cash, depreciation, operating-cost, margin, timing, and risk trade-offs together", "Show capacity only", "Hide the financial impact"] },
  { id: "DE-03", issue: "A production rebalance removes the CapEx need but changes labor and logistics cost.", correct: "Rerun all affected workforce, production, cost, inventory, transport, and financial dependencies", options: ["Rerun all affected workforce, production, cost, inventory, transport, and financial dependencies", "Cancel CapEx without other analysis", "Keep both scenarios approved"] },
  { id: "DE-04", issue: "The approved dependency result differs between Plan1 and ApexPlan ASO.", correct: "Reconcile account mapping, Entity, period, currency, data movement, and aggregation before approval", options: ["Reconcile account mapping, Entity, period, currency, data movement, and aggregation before approval", "Use the ASO value", "Post an unexplained adjustment"] },
] as const;

export const dependencyFormCases = [
  { id: "DF-01", issue: "The form attempts employee-level and asset-level planning without corresponding dimensions.", correct: "Keep summarized driver accounts by Entity and Month, or obtain an approved design change before adding detail", options: ["Keep summarized driver accounts by Entity and Month, or obtain an approved design change before adding detail", "Store employee names in Account", "Create dimensions directly in production"] },
  { id: "DF-02", issue: "Required hours, calculated FTE, capacity gap, depreciation, and cash flow are editable.", correct: "Protect sourced and calculated cells; expose only owned assumptions, actions, and approved overrides", options: ["Protect sourced and calculated cells; expose only owned assumptions, actions, and approved overrides", "Make every value writable", "Copy calculations to comments"] },
  { id: "DF-03", issue: "A rule can calculate every Entity and year without reviewed prompts.", correct: "Validate Entity, period, Scenario, Version, dependency scenario, and cost version before scoped execution", options: ["Validate Entity, period, Scenario, Version, dependency scenario, and cost version before scoped execution", "Run the entire cube", "Use the last-open POV"] },
  { id: "DF-04", issue: "A dependency exception has no link to the originating production requirement.", correct: "Provide traceability from demand and production to hours, gap, action, financial impact, owner, and approval", options: ["Provide traceability from demand and production to hours, gap, action, financial impact, owner, and approval", "Use a warning color only", "Ask users to reconcile offline"] },
] as const;

export const dependencyReconciliationControls = [
  "Production starts ÷ approved rate equals required operating hours, and plant totals agree with the approved Phase 10 handoff",
  "Paid hours × productive availability × current FTE equals workforce capacity; exact FTE, roster FTE, gap hours, and action reconcile by Entity",
  "Overtime, contractor, transfer, training, and hiring hours and costs reconcile to approved action assumptions and effective dates",
  "Existing asset capacity plus approved operational mitigations plus timely new capacity minus required hours equals post-action headroom",
  "Project cost, payment cash flow, capitalized value, in-service date, useful life, residual value, and depreciation independently recalculate",
  "Plan1 dependency results agree with ApexPlan reporting totals and affected production, cost, inventory, and financial reruns are repeatable",
] as const;

export const dependencyBuildSequence = [
  "Freeze production, cost, dependency scenario, Entity, period, Scenario, Version, INR/No Currency treatment, and cutoff",
  "Validate required hours, rate definitions, skills, paid hours, availability, current FTE, and action constraints",
  "Calculate exact FTE, roster requirement, workforce capacity, gap hours, and workforce action alternatives",
  "Validate asset capacity, uptime, maintenance, operational mitigations, timing, and enabling dependencies",
  "Calculate residual capacity gap, required assets, post-action headroom, investment, cash, and depreciation",
  "Compare base, overtime or rebalance, workforce, and CapEx scenarios with operational and financial impacts",
  "Resolve exceptions, rerun affected upstream and downstream scopes, and move approved results to reporting",
  "Reconcile detail, aggregate, repeatability, security, evidence, ownership, and exit approval",
] as const;

export const dependencyHomeworkMissions = [
  { id: "workforce", title: "Calculate the workforce dependency", output: "FTE and hours bridge" },
  { id: "actions", title: "Choose the workforce response", output: "Action recommendation" },
  { id: "capex", title: "Evaluate the capacity investment", output: "CapEx business case" },
  { id: "exceptions", title: "Resolve connected dependency exceptions", output: "Exception decisions" },
  { id: "readout", title: "Present the dependency recommendation", output: "Management readout" },
] as const;

export const dependencyArtifacts = [
  "Approved production-to-dependency contract with Product and Entity scope, required hours, rates, source versions, cutoff, Scenario, Version, owner, and reconciliation",
  "Workforce driver baseline with paid hours, productive availability, skills, current FTE, vacancies, rates, overtime limits, lead times, owners, and approvals",
  "Workforce calculation showing exact FTE, roster FTE, productive capacity, gap hours, overtime, transfer, contractor, training, hiring, cost, and timing alternatives",
  "Asset-capacity baseline and CapEx case showing existing capacity, uptime, mitigations, residual gap, asset capacity, quantity, project cost, lead time, enablers, and approval",
  "CapEx financial schedule showing payment cash flow, capitalization, in-service date, useful life, residual value, depreciation, operating cost, and margin impact",
  "Functional forms, scoped rule execution, Process or Job details, access test, protected-cell test, invalid-scope test, and missing-dependency evidence",
  "Hours, workforce, action-cost, asset-capacity, investment, cash, depreciation, rerun, repeatability, and Plan1-to-ApexPlan reconciliation evidence",
  "Runbook, test cases, exception log, scenario comparison, upstream and downstream reruns, open items, reviewer, and exit approval",
] as const;

export const dependencyKnowledgeQuestions = [
  { id: "DK-01", prompt: "Why can company-level spare labor fail to solve a plant gap?", correct: "Entity, timing, skill, labor rules, transfer feasibility, and Product capability can prevent its use", options: ["Entity, timing, skill, labor rules, transfer feasibility, and Product capability can prevent its use", "Company labor always solves it", "Only salary matters"] },
  { id: "DK-02", prompt: "What is productive capacity per FTE in the practice case?", correct: "Paid hours multiplied by productive availability: 160 × 85% = 136 hours", options: ["Paid hours multiplied by productive availability: 160 × 85% = 136 hours", "160 hours", "410 hours"] },
  { id: "DK-03", prompt: "When should CapEx capacity enter the operational plan?", correct: "Only after approved in-service readiness and no earlier than the asset and enabling dependencies are usable", options: ["Only after approved in-service readiness and no earlier than the asset and enabling dependencies are usable", "At request date", "At purchase-order date"] },
  { id: "DK-04", prompt: "Why are cash flow and depreciation planned separately?", correct: "Payments follow contractual timing while depreciation begins from the approved in-service date and accounting life", options: ["Payments follow contractual timing while depreciation begins from the approved in-service date and accounting life", "They must always be equal", "Depreciation is a cash payment"] },
  { id: "DK-05", prompt: "Does Phase 13 add employee and asset dimensions to ApexPlan?", correct: "No; this custom-app phase uses summarized Entity and Account drivers unless a formal design change is approved", options: ["No; this custom-app phase uses summarized Entity and Account drivers unless a formal design change is approved", "Yes, automatically", "Yes, by storing names in Account"] },
] as const;

export const dependencyScreenshots = [
  { id: "WD-UI-01", title: "Open the dependency-planning workspace", path: "Home → Workforce & CapEx Dependencies → functional forms", asset: "01-dependency-workspace.png", capture: "Navigation cluster showing production handoff, workforce drivers, actions, asset capacity, CapEx, scenarios, exceptions, and reconciliation.", action: "Confirm ApexPlan, Plan1, authorized dependency-planner role, Forecast/Working, Jan FY27, the dependency scenario, No Currency for hours/FTE/capacity, and INR for workforce and CapEx amounts.", evidence: "Environment, role, workspace, versions, scenario, INR/No Currency context, and test cycle recorded." },
  { id: "WD-UI-02", title: "Review the production-hours handoff", path: "Dependencies → Production requirement", asset: "02-production-hours-handoff.png", capture: "Protected plant requirement showing starts, rate, required hours, available hours, utilization, and source version.", action: "Prove Pune 820 ÷ 2 = 410 hours and Noida 560 ÷ 2 = 280 hours.", evidence: "POV, source version, rates, hours, protection, cutoff, and reconciliation captured." },
  { id: "WD-UI-03", title: "Maintain workforce drivers", path: "Dependencies → Workforce assumptions", asset: "03-workforce-drivers-form.png", capture: "Entity form showing paid hours, productive availability, current FTE, overtime limit and rate, contractor rate, hiring lead time, skill status, owner, and version.", action: "Enter approved Pune drivers and test validation, security, effective dates, and source ownership.", evidence: "Driver values, version, effective dates, owner, access test, and approval captured." },
  { id: "WD-UI-04", title: "Calculate the workforce requirement", path: "Workforce assumptions → Actions → Calculate workforce dependency", asset: "04-workforce-requirement-result.png", capture: "Result showing 136 productive hours per FTE, 3.015 exact FTE, four roster FTE, 408 current hours, and two-hour gap.", action: "Run Pune for Jan FY27 and independently reproduce every workforce result.", evidence: "Rule version, prompts, job ID, results, independent calculation, rounding, and rerun result retained." },
  { id: "WD-UI-05", title: "Compare workforce actions", path: "Dependencies → Workforce actions", asset: "05-workforce-action-comparison.png", capture: "Scenario comparison of overtime, transfer, contractor, training, and hiring with hours, cost, timing, constraints, and residual gap.", action: "Recommend controlled overtime for the two-hour short-term gap while keeping recurrent-gap criteria visible.", evidence: "Options, costs, dates, constraints, selected action, owner, residual risk, and approval captured." },
  { id: "WD-UI-06", title: "Evaluate the asset-capacity gap", path: "Dependencies → Asset capacity and CapEx", asset: "06-asset-capacity-capex-form.png", capture: "Capacity bridge showing 560 required hours, 450 existing, 30 overtime, 20 productivity, 60 residual gap, one 160-hour asset, and 100-hour headroom.", action: "Run the future capacity scenario and verify asset quantity, timing, enablers, and no double-counted mitigation.", evidence: "Capacity inputs, residual gap, asset quantity, post-action capacity, headroom, timing, and reviewer retained." },
  { id: "WD-UI-07", title: "Review the CapEx financial schedule", path: "Dependencies → CapEx financial impact", asset: "07-capex-financial-schedule.png", capture: "INR project cost, payment milestones, capitalized value, in-service month, useful life, residual value, monthly depreciation, operating cost, and margin impact.", action: "Prove INR 1,200,000 ÷ 60 = INR 20,000 monthly depreciation and keep cash timing separate.", evidence: "INR cost version, payment schedule, capitalization policy, in-service evidence, depreciation, and approval captured." },
  { id: "WD-UI-08", title: "Resolve a dependency exception", path: "Dependencies → Exception and scenario review", asset: "08-dependency-exception-review.png", capture: "Exception showing source gap, affected Entity and period, alternatives, operational and financial impacts, response, owner, due date, status, and approval.", action: "Resolve an overtime-limit or late-asset scenario without changing required hours or in-service timing.", evidence: "Before and after drivers, alternatives, selected response, rerun scope, owner, status, and approval retained." },
  { id: "WD-UI-09", title: "Inspect the dependency calculation job", path: "Home → Application → Jobs → recent activity", asset: "09-dependency-calculation-job.png", capture: "Job details showing rule, Entity, period, Scenario, Version, dependency scenario, status, timestamps, duration, and messages.", action: "Confirm the processed scope and connect the job to independent business validation.", evidence: "Job ID, rule/version, prompts, operator, duration, messages, rerun, and validation reference retained." },
  { id: "WD-UI-10", title: "Reconcile and summarize dependencies", path: "Dependencies → Reconciliation and summary", asset: "10-dependency-summary-dashboard.png", capture: "Control summary of workforce gap, action cost, capacity gap, CapEx, cash, depreciation, downstream impact, and open exceptions.", action: "Reconcile all six controls and trace every KPI to a reviewed source form.", evidence: "Control totals, KPI definitions, data movement, repeatability, reviewer, and approval captured." },
] as const;
