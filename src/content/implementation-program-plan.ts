export type ProgramPeriod = {
  days: string;
  title: string;
  phases: string;
  focus: string;
  assignment: string;
  evidence: string;
};

export type ProgramStage = {
  id: string;
  title: string;
  days: string;
  objective: string;
  milestone: string;
  periods: readonly ProgramPeriod[];
};

export type ProgramAssignment = {
  id: string;
  due: string;
  title: string;
  scope: string;
  submission: string;
  acceptance: string;
};

export type MonthlyCycleCoverage = {
  id: string;
  title: string;
  days: string;
  phases: string;
  practice: string;
  evidence: string;
};

export const monthlyCycleCoverage: readonly MonthlyCycleCoverage[] = [
  {
    id: "CP-01",
    title: "Actuals and data readiness",
    days: "Days 31–36",
    phases: "Phases 07–08",
    practice: "Prepare governed metadata, actuals, opening balances, rates, mappings, load controls, and source-to-Planning reconciliation before opening the cycle.",
    evidence: "Approved readiness pack and release decision",
  },
  {
    id: "CP-02",
    title: "Demand baseline",
    days: "Days 37–39",
    phases: "Phase 09",
    practice: "Create the historical foundation and baseline forecast at the approved Product, Market, Channel, Entity, and Month grain.",
    evidence: "Reconciled demand baseline and assumptions",
  },
  {
    id: "CP-03",
    title: "Sales forecast and consensus",
    days: "Days 37–42",
    phases: "Phase 09",
    practice: "Plan volume, price, promotion, revenue, and governed overrides; resolve assumptions and approve one consensus demand handoff.",
    evidence: "Approved consensus forecast and audit trail",
  },
  {
    id: "CP-04",
    title: "Inventory, production and capacity",
    days: "Days 43–54",
    phases: "Phases 10–12",
    practice: "Balance inventory policy with consensus demand, calculate yield- and lot-adjusted production, allocate Pune and Noida quantities, and govern capacity and material responses.",
    evidence: "Balanced inventory and feasible supply plan",
  },
  {
    id: "CP-05",
    title: "Cost, margin and financial impact",
    days: "Days 55–63",
    phases: "Phases 12–14",
    practice: "Value production and inventory, calculate COGS and margin, and reconcile operational drivers into the financial outlook.",
    evidence: "Cost, margin, and financial reconciliation",
  },
  {
    id: "CP-06",
    title: "Scenario review and approval",
    days: "Days 70–84",
    phases: "Phases 17–18 and 21–22",
    practice: "Compare controlled alternatives, complete workflow and business acceptance, resolve defects, and record the authorized planning decision.",
    evidence: "Approved scenario, workflow history, and decision record",
  },
  {
    id: "CP-07",
    title: "Publish, reconcile and close",
    days: "Days 76–90",
    phases: "Phases 19 and 23–27",
    practice: "Prove the end-to-end cycle, publish only the approved version to reporting, reconcile outputs, close the cycle, and transfer next-cycle actions to BAU ownership.",
    evidence: "Published and reconciled capstone evidence pack",
  },
] as const;

export const programStages: readonly ProgramStage[] = [
  {
    id: "discover",
    title: "Discover",
    days: "Days 1–12",
    objective: "Understand the Apex business, planning pain points, participants, evidence, and current process before proposing a solution.",
    milestone: "Discovery review accepted: scope, stakeholders, current-state evidence, pain points, assumptions, and open decisions have named owners.",
    periods: [
      {
        days: "1–3",
        title: "Orientation and business case",
        phases: "Phase 01",
        focus: "Understand Apex, the implementation lifecycle, planning terminology, expected outcomes, and evidence standards.",
        assignment: "Create a one-page case brief with business outcomes, initial scope, constraints, and five discovery hypotheses.",
        evidence: "Approved case brief and personal learning plan",
      },
      {
        days: "4–6",
        title: "Stakeholders and discovery plan",
        phases: "Phase 01",
        focus: "Identify decision owners, planners, approvers, data owners, technology teams, and workshop participants.",
        assignment: "Build the stakeholder map, RACI, interview schedule, and evidence-request list.",
        evidence: "Stakeholder register and workshop plan",
      },
      {
        days: "7–9",
        title: "Interviews and requirements",
        phases: "Phase 01",
        focus: "Ask outcome-led questions, separate facts from assumptions, and record requirements with source and acceptance criteria.",
        assignment: "Run a simulated interview and produce prioritized requirement, question, decision, and assumption logs.",
        evidence: "Traceable discovery notes and requirement catalogue",
      },
      {
        days: "10–12",
        title: "Current-state assessment",
        phases: "Phase 02",
        focus: "Map the AS-IS planning cycle, data handoffs, controls, bottlenecks, root causes, and measurable baseline.",
        assignment: "Prepare the current-state process, pain-point register, source inventory, and validated finding summary.",
        evidence: "Discovery pack and current-state review",
      },
    ],
  },
  {
    id: "design",
    title: "Design",
    days: "Days 13–30",
    objective: "Convert validated business needs into an agreed future process, traceable solution scope, architecture, application, and dimensional blueprint.",
    milestone: "Design authority approves the traceability baseline, architecture, application settings, dimensions, cubes, security principles, and build handoff.",
    periods: [
      {
        days: "13–15",
        title: "Future-state process",
        phases: "Phase 03",
        focus: "Define planning roles, decision grain, calendar, workflow, controls, exception handling, and success measures.",
        assignment: "Design the TO-BE planning process and facilitate a decision-based design review.",
        evidence: "Future-state process and decision log",
      },
      {
        days: "16–18",
        title: "Requirement traceability",
        phases: "Phase 04",
        focus: "Connect each approved requirement to design, configuration, data, security, test, owner, and acceptance evidence.",
        assignment: "Create and quality-check the requirement traceability matrix for the Apex scope.",
        evidence: "Baselined RTM with no orphan requirements",
      },
      {
        days: "19–21",
        title: "Solution architecture",
        phases: "Phase 05",
        focus: "Define environments, data movement, integration boundaries, calculation placement, reporting, security, and operational controls.",
        assignment: "Produce the logical architecture and defend five key architecture decisions.",
        evidence: "Architecture diagram and decision records",
      },
      {
        days: "22–24",
        title: "Application configuration",
        phases: "Phase 06",
        focus: "Confirm the custom Planning application, calendar, currencies, Plan1 BSO input cube, ApexPlan ASO reporting cube, and enabled options.",
        assignment: "Complete the application-configuration workbook and create the application when an Oracle environment is available.",
        evidence: "Configuration baseline and creation evidence",
      },
      {
        days: "25–27",
        title: "Dimensions and data grain",
        phases: "Phase 06",
        focus: "Design Account, Entity, Product, Market, Channel, Scenario, Version, Period, Year, Currency, and supporting structures at the correct grain.",
        assignment: "Build the dimension blueprint, member samples, cube-validity map, and reporting-grain decisions.",
        evidence: "Reviewed dimensional design workbook",
      },
      {
        days: "28–30",
        title: "Design sign-off and build mobilization",
        phases: "Phases 03–06",
        focus: "Resolve design gaps, confirm non-functional requirements, baseline scope, and prepare controlled build inputs.",
        assignment: "Present the solution blueprint and close or assign every design-review action.",
        evidence: "Signed design pack and build-readiness decision",
      },
    ],
  },
  {
    id: "build",
    title: "Build",
    days: "Days 31–75",
    objective: "Configure one connected planning solution, prove its calculations and controls, and create usable forms, analytics, workflow, and scenario capability.",
    milestone: "The configured solution passes the build demonstration with reconciled data, controlled calculations, usable workflows, and complete technical evidence.",
    periods: [
      {
        days: "31–33",
        title: "Metadata build",
        phases: "Phase 07",
        focus: "Prepare, validate, load, and reconcile governed dimension members, properties, aliases, hierarchies, and currency assignments.",
        assignment: "Correct the supplied metadata files, load the approved set, and reconcile control totals.",
        evidence: "Metadata load package and reconciliation",
      },
      {
        days: "34–36",
        title: "Data and actuals integration",
        phases: "Phase 08",
        focus: "Configure source files, mappings, periods, load rules, validations, rejects, reruns, and source-to-target reconciliation.",
        assignment: "Load historical actuals, resolve a controlled defect, rerun safely, and document the operating procedure.",
        evidence: "Reconciled integration run and runbook",
      },
      {
        days: "37–39",
        title: "Sales baseline",
        phases: "Phase 09",
        focus: "Create the historical baseline and establish volume, price, revenue, assumptions, and editable forecast boundaries.",
        assignment: "Calculate and validate the sales baseline for the assigned product, market, channel, and entity scope.",
        evidence: "Baseline forecast and validation record",
      },
      {
        days: "40–42",
        title: "Sales consensus and approval",
        phases: "Phase 09",
        focus: "Apply planner adjustments, comments, variance controls, review thresholds, submission, approval, and locking.",
        assignment: "Complete one forecast adjustment and take it through the controlled consensus workflow.",
        evidence: "Approved sales plan with audit trail",
      },
      {
        days: "43–45",
        title: "Inventory planning",
        phases: "Phase 11",
        focus: "Model opening inventory, safety stock, target inventory, receipts, issues, closing inventory, shortage, and excess.",
        assignment: "Complete the inventory movement schedule and reconcile every balance at the agreed grain.",
        evidence: "Balanced inventory plan and exception list",
      },
      {
        days: "46–48",
        title: "Production requirements",
        phases: "Phase 10",
        focus: "Translate approved demand and inventory policy into net production requirements with yield, lot size, and timing controls.",
        assignment: "Calculate the unconstrained production requirement and explain each driver.",
        evidence: "Production requirement schedule",
      },
      {
        days: "49–51",
        title: "Plant allocation and capacity",
        phases: "Phase 10",
        focus: "Allocate production to Pune and Noida, compare required and available capacity, and identify overload or underutilization.",
        assignment: "Resolve a capacity exception using a documented allocation decision and approved assumption.",
        evidence: "Feasible plant plan and capacity exception record",
      },
      {
        days: "52–54",
        title: "Materials and procurement implications",
        phases: "Phases 10–12",
        focus: "Translate production into component requirements and evaluate on-hand material, open supply, lead time, and planned purchase needs.",
        assignment: "Prepare a focused material-requirement schedule for one product and identify required procurement actions.",
        evidence: "Material and procurement requirement worksheet",
      },
      {
        days: "55–57",
        title: "Manufacturing cost and COGS",
        phases: "Phase 12",
        focus: "Calculate material, labor, overhead, unit manufacturing cost, inventory valuation, COGS, and gross margin with reconciled drivers.",
        assignment: "Complete the cost bridge from production volume to COGS and explain the margin movement.",
        evidence: "Cost, COGS, and margin reconciliation",
      },
      {
        days: "58–60",
        title: "Workforce and CapEx dependencies",
        phases: "Phase 13",
        focus: "Connect capacity decisions to workforce, hiring, capital projects, cash timing, depreciation, and operational constraints.",
        assignment: "Evaluate one capacity gap and recommend workforce, CapEx, or mixed action with financial impact.",
        evidence: "Dependency decision paper",
      },
      {
        days: "61–63",
        title: "Financial statement integration",
        phases: "Phase 14",
        focus: "Connect sales, inventory, production, cost, workforce, and CapEx outputs to P&L, balance sheet, and cash flow results.",
        assignment: "Reconcile operational drivers to the integrated financial statements and investigate one failed control.",
        evidence: "Integrated financial reconciliation",
      },
      {
        days: "64–66",
        title: "Business rules and Groovy",
        phases: "Phase 15",
        focus: "Design bounded rules, calculation sequencing, prompts, validations, error handling, tests, deployment, and support controls.",
        assignment: "Implement or specify one governed rule and prove its expected result, scope, performance, and failure behavior.",
        evidence: "Rule catalogue, test results, and release evidence",
      },
      {
        days: "67–69",
        title: "Forms, dashboards, and Smart View",
        phases: "Phase 16",
        focus: "Create task-focused forms, decision dashboards, ad hoc analysis, Smart View templates, and usability controls.",
        assignment: "Build and review one planner form, one management dashboard, and one controlled Smart View template.",
        evidence: "Role-based UX demonstration pack",
      },
      {
        days: "70–72",
        title: "Security and workflow",
        phases: "Phase 17",
        focus: "Apply least privilege, segregation of duties, data access, task ownership, submission, approval, rejection, and audit evidence.",
        assignment: "Execute positive and negative access tests and complete one workflow cycle with separate roles.",
        evidence: "Security matrix and workflow test record",
      },
      {
        days: "73–75",
        title: "Scenario and what-if planning",
        phases: "Phase 18",
        focus: "Create controlled scenarios, vary approved drivers, compare operational and financial outcomes, and preserve the baseline.",
        assignment: "Run a demand-and-cost scenario and recommend an action using quantified trade-offs.",
        evidence: "Scenario comparison and recommendation",
      },
    ],
  },
  {
    id: "validate",
    title: "Validate",
    days: "Days 76–84",
    objective: "Prove the connected solution meets functional, security, data, performance, usability, and business-acceptance expectations.",
    milestone: "Business and technology owners accept the release candidate or record explicit residual risks, waivers, owners, and target dates.",
    periods: [
      {
        days: "76–78",
        title: "System integration testing",
        phases: "Phase 19",
        focus: "Execute end-to-end scenarios across metadata, data, calculations, forms, workflow, security, and reporting.",
        assignment: "Run the priority SIT journey and trace every expected result to evidence and any resulting defect.",
        evidence: "SIT execution and reconciliation report",
      },
      {
        days: "79–81",
        title: "Performance testing",
        phases: "Phase 20",
        focus: "Define workloads, measure user and batch performance, isolate bottlenecks, tune safely, and compare repeatable results.",
        assignment: "Test one interactive and one batch workload, then document the evidence-based tuning decision.",
        evidence: "Performance baseline and tuning report",
      },
      {
        days: "82–84",
        title: "UAT and defect closure",
        phases: "Phases 21–22",
        focus: "Validate business journeys, triage reproducible issues, control fixes and retests, and prepare the release recommendation.",
        assignment: "Facilitate a UAT scenario, manage its defects to disposition, and prepare the acceptance summary.",
        evidence: "Signed UAT pack and defect disposition",
      },
    ],
  },
  {
    id: "deploy",
    title: "Deploy",
    days: "Days 85–88",
    objective: "Move the approved release into production through a controlled, recoverable, evidence-based decision and execution sequence.",
    milestone: "Production is activated from a reconciled state with decision authority, rollback readiness, communications, and support ownership confirmed.",
    periods: [
      {
        days: "85–86",
        title: "Cutover rehearsal and execution",
        phases: "Phase 23",
        focus: "Sequence configuration, metadata, data, security, validation, communications, rollback, owners, dependencies, and timing.",
        assignment: "Complete a timed cutover rehearsal, record deviations, and issue the corrected production runbook.",
        evidence: "Approved cutover runbook and rehearsal report",
      },
      {
        days: "87",
        title: "Go / No-Go decision",
        phases: "Phase 24",
        focus: "Evaluate readiness evidence, blockers, residual risks, business continuity, rollback status, and decision authority.",
        assignment: "Present the evidence pack and record a defensible Go, Conditional Go, or No-Go decision.",
        evidence: "Signed decision record and conditions",
      },
      {
        days: "88",
        title: "Go-live control",
        phases: "Phase 25",
        focus: "Activate production, perform smoke tests and reconciliations, monitor critical journeys, and communicate service status.",
        assignment: "Execute the simulated command-center checklist and resolve or escalate the injected production event.",
        evidence: "Go-live log and production validation",
      },
    ],
  },
  {
    id: "operate",
    title: "Operate",
    days: "Days 89–90",
    objective: "Stabilize the service, execute the connected monthly planning capstone, transfer accountable ownership, and demonstrate implementation and operating capability.",
    milestone: "The learner completes the monthly-cycle and implementation defense, then hands over an owned service model, improvement backlog, value measures, and evidence repository.",
    periods: [
      {
        days: "89",
        title: "Hypercare and support transition",
        phases: "Phase 26",
        focus: "Operate triage, service monitoring, knowledge transfer, exit criteria, ownership, and controlled transition to steady-state support.",
        assignment: "Run a hypercare review and decide whether the service meets evidence-based exit criteria.",
        evidence: "Hypercare dashboard and support handover",
      },
      {
        days: "90",
        title: "Monthly-cycle simulation, BAU handover, and executive capstone",
        phases: "Phase 27 · Monthly Planning Capstone CP-01–CP-07",
        focus: "Execute and explain the controlled flow from data readiness through demand, supply, cost, scenario approval, publication, reconciliation, support, and improvement ownership.",
        assignment: "Present the Apex implementation, run the connected monthly-cycle capstone, and defend its business decisions, controls, reconciliations, readiness, ownership, and roadmap.",
        evidence: "Monthly-cycle evidence pack, BAU charter, roadmap, and capstone presentation",
      },
    ],
  },
] as const;

export const programAssignments: readonly ProgramAssignment[] = [
  {
    id: "A1",
    due: "Day 12",
    title: "Discovery and current-state pack",
    scope: "Phases 01–02",
    submission: "Case brief, stakeholder plan, requirement catalogue, AS-IS process, evidence inventory, findings, and open-decision log.",
    acceptance: "Traceable evidence, clear ownership, measurable pain points, and no premature solution assumptions.",
  },
  {
    id: "A2",
    due: "Day 30",
    title: "Approved solution blueprint",
    scope: "Phases 03–06",
    submission: "Future-state process, RTM, architecture, configuration baseline, dimension design, cube map, decisions, and sign-off record.",
    acceptance: "Every in-scope requirement connects to a feasible, controlled, testable design decision.",
  },
  {
    id: "A3",
    due: "Day 36",
    title: "Metadata and integration control pack",
    scope: "Phases 07–08",
    submission: "Validated metadata, mapping, load configuration, rejects, reconciliations, rerun evidence, and runbook.",
    acceptance: "Repeatable loads, explained variances, controlled errors, and source-to-target totals that reconcile.",
  },
  {
    id: "A4",
    due: "Day 54",
    title: "Connected demand, inventory, and supply plan",
    scope: "Phases 09–11",
    submission: "Approved sales plan, inventory schedule, production and capacity plan, plus focused material and procurement implications.",
    acceptance: "Balanced calculations at a consistent grain with documented assumptions, exceptions, and ownership.",
  },
  {
    id: "A5",
    due: "Day 66",
    title: "Cost and financial integration pack",
    scope: "Phases 12–15",
    submission: "Manufacturing cost, COGS, workforce/CapEx decision, integrated statements, governed calculation, tests, and reconciliation.",
    acceptance: "Operational drivers reconcile to financial outcomes and calculations are bounded, testable, and supportable.",
  },
  {
    id: "A6",
    due: "Day 75",
    title: "Planner experience demonstration",
    scope: "Phases 16–18",
    submission: "Role-based forms, dashboard, Smart View template, security tests, workflow evidence, and scenario recommendation.",
    acceptance: "A planner can complete the assigned decision safely, efficiently, and with an auditable result.",
  },
  {
    id: "A7",
    due: "Day 84",
    title: "Release validation and acceptance pack",
    scope: "Phases 19–22",
    submission: "SIT, performance and UAT results, defect register, retest evidence, residual risks, waivers, and release recommendation.",
    acceptance: "Critical journeys pass and every remaining issue has an authorized disposition, owner, and date.",
  },
  {
    id: "A8",
    due: "Day 89",
    title: "Production transition pack",
    scope: "Phases 23–26",
    submission: "Cutover runbook, Go/No-Go record, go-live log, reconciliations, hypercare measures, and support handover.",
    acceptance: "The production state is known, recoverable, supported, monitored, and explicitly accepted.",
  },
  {
    id: "A9",
    due: "Day 90",
    title: "Monthly-cycle capstone, executive defense, and BAU charter",
    scope: "Phase 27, Capstone CP-01–CP-07, and full program",
    submission: "The implementation story plus data readiness, baseline, consensus demand, inventory, production, capacity, material response, cost and margin, scenario approval, publication, reconciliation, service ownership, benefits, and roadmap evidence.",
    acceptance: "The learner can execute and defend both the implemented solution and its recurring monthly planning process—not only demonstrate screens.",
  },
] as const;

export const milestoneChecks = [
  "Required phase lessons and knowledge checks are complete.",
  "The assignment uses the agreed Apex scenario, dimensions, currencies, cubes, and planning grain.",
  "Figures reconcile and exceptions, assumptions, and limitations are explicit.",
  "Evidence identifies the preparer, reviewer, version, date, source, and approval state.",
  "Open items have an owner, due date, impact, and approved disposition.",
  "The learner can explain why the result is fit for the next lifecycle stage.",
  "Monthly-cycle outputs trace from data readiness through approval, publication, reconciliation, and accountable BAU ownership.",
] as const;
