export const productionPlanningLessons = [
  { id: "production-foundations", number: "01", title: "Production planning foundations and controls", duration: "16 min", type: "concept" },
  { id: "demand-handoff", number: "02", title: "Qualify the demand and inventory handoff", duration: "24 min", type: "assessment" },
  { id: "production-requirement", number: "03", title: "Calculate the production requirement", duration: "30 min", type: "simulation" },
  { id: "capacity-model", number: "04", title: "Model plant capacity and production rates", duration: "28 min", type: "simulation" },
  { id: "plant-allocation", number: "05", title: "Allocate production across plants", duration: "30 min", type: "simulation" },
  { id: "overload-exceptions", number: "06", title: "Resolve overloads and exceptions", duration: "26 min", type: "wizard" },
  { id: "functional-walkthrough", number: "07", title: "Configure and test production forms", duration: "30 min", type: "guided-screenshot" },
  { id: "production-reconciliation", number: "08", title: "Reconcile the production handoff", duration: "24 min", type: "evidence" },
  { id: "production-homework", number: "09", title: "Applied production planning lab", duration: "38 min", type: "assessment" },
  { id: "production-handoff", number: "10", title: "Evidence package and exit gate", duration: "22 min", type: "exit-gate" },
] as const;

export type ProductionPlanningLessonId = (typeof productionPlanningLessons)[number]["id"];

export const productionReadinessControls = [
  "Phase 09 consensus demand is approved at Product × Market × Channel × Month and aggregated to the production-planning Product × Month requirement",
  "Entity members Pune and Noida are active production locations and Product-to-plant valid intersections are approved",
  "Beginning finished-goods inventory, provisional target ending inventory, yield, lot size, production rate, and available hours have named owners",
  "Plan1 Forecast/Working is the controlled writable slice; Actual/Final, calculated accounts, and approved periods are protected",
  "Units, calendar, cutoff, rule scope, capacity tolerance, exception ownership, and reconciliation controls are agreed before calculation",
] as const;

export const demandHandoffCases = [
  { id: "DH-01", issue: "Phase 09 demand is detailed by Market and Channel, while production is scheduled by Product and plant.", correct: "Aggregate approved demand by Product and Month, retain drill-back controls, and do not duplicate Market or Channel in the production result", options: ["Aggregate approved demand by Product and Month, retain drill-back controls, and do not duplicate Market or Channel in the production result", "Select one Market as the production demand", "Copy the full demand to every plant"] },
  { id: "DH-02", issue: "The January demand handoff is 1,301.348 units and production must be planned in whole manufacturing lots.", correct: "Preserve demand precision, calculate first, then apply the approved production lot-size rule", options: ["Preserve demand precision, calculate first, then apply the approved production lot-size rule", "Round demand before the inventory calculation", "Manually replace demand with 1,300"] },
  { id: "DH-03", issue: "The target ending inventory is provisional until Phase 11 completes the detailed inventory-policy design.", correct: "Use the approved provisional target with a visible source and rerun trigger after Phase 11", options: ["Use the approved provisional target with a visible source and rerun trigger after Phase 11", "Hide the provisional assumption in the rule", "Skip target inventory entirely"] },
  { id: "DH-04", issue: "Demand changes after production has been reviewed.", correct: "Version the new demand handoff, rerun the scoped calculation, and reapprove affected production exceptions", options: ["Version the new demand handoff, rerun the scoped calculation, and reapprove affected production exceptions", "Overwrite the approved result silently", "Adjust plant production without changing demand"] },
] as const;

export const requirementCases = [
  { id: "RQ-01", issue: "Yield is 98%, so planned starts must be greater than the required good output.", correct: "Divide the net good-unit requirement by 0.98 before lot-size rounding", options: ["Divide the net good-unit requirement by 0.98 before lot-size rounding", "Multiply demand by 0.98", "Ignore yield until costing"] },
  { id: "RQ-02", issue: "Demand plus target ending inventory is lower than beginning inventory.", correct: "Set the net production requirement to zero and flag excess inventory for Phase 11 review", options: ["Set the net production requirement to zero and flag excess inventory for Phase 11 review", "Create negative production", "Delete beginning inventory"] },
  { id: "RQ-03", issue: "The calculated requirement is 1,378.93 starts and the manufacturing lot size is 20.", correct: "Round up to 1,380 starts and preserve the rounding quantity as explainable inventory impact", options: ["Round up to 1,380 starts and preserve the rounding quantity as explainable inventory impact", "Round down to 1,360", "Change the lot size to fit the result"] },
] as const;

export const capacityCases = [
  { id: "CP-01", issue: "Pune has 450 approved line hours and a demonstrated rate of 2 Mixer Grinder starts per hour.", correct: "Calculate 900 units of gross capacity and retain hours and rate as separate drivers", options: ["Calculate 900 units of gross capacity and retain hours and rate as separate drivers", "Store only 900 with no driver evidence", "Treat calendar hours as productive hours"] },
  { id: "CP-02", issue: "Planned downtime removes 20 hours from an originally available 450-hour calendar.", correct: "Reduce available productive hours before deriving capacity and keep downtime as an auditable assumption", options: ["Reduce available productive hours before deriving capacity and keep downtime as an auditable assumption", "Reduce production after allocation without changing capacity", "Ignore approved downtime"] },
  { id: "CP-03", issue: "A single plant rate is proposed for all products.", correct: "Maintain Product × plant rates because routing and demonstrated throughput differ", options: ["Maintain Product × plant rates because routing and demonstrated throughput differ", "Use the fastest rate for every product", "Use total-company capacity for every plant"] },
  { id: "CP-04", issue: "A rate improvement is expected but not yet proven.", correct: "Model it as an approved scenario assumption and keep the operational baseline unchanged", options: ["Model it as an approved scenario assumption and keep the operational baseline unchanged", "Overwrite the baseline rate", "Add capacity without changing a driver"] },
] as const;

export const allocationCases = [
  { id: "AL-01", issue: "The initial 60/40 split produces 828 and 552 starts, which violate a 20-unit plant lot size.", correct: "Allocate 820 to Pune and 560 to Noida, then verify the total remains 1,380", options: ["Allocate 820 to Pune and 560 to Noida, then verify the total remains 1,380", "Use fractional manufacturing lots", "Drop the remaining 8 units"] },
  { id: "AL-02", issue: "A preferred plant is above capacity while the alternate plant has valid Product capability and available capacity.", correct: "Rebalance within approved valid intersections and retain the preference variance", options: ["Rebalance within approved valid intersections and retain the preference variance", "Keep the overload hidden", "Allocate to a plant that cannot make the Product"] },
  { id: "AL-03", issue: "The two plant allocations total 1,360 while the approved planned production is 1,380.", correct: "Block completion until allocations reconcile exactly to planned production", options: ["Block completion until allocations reconcile exactly to planned production", "Accept the difference as immaterial", "Increase demand to match"] },
] as const;

export const exceptionCases = [
  { id: "EX-01", issue: "Total planned starts exceed demonstrated capacity by 300 units.", correct: "Quantify the shortfall and evaluate approved overtime, alternate plant, subcontract, inventory, or demand-timing responses", options: ["Quantify the shortfall and evaluate approved overtime, alternate plant, subcontract, inventory, or demand-timing responses", "Force utilization below 100% without changing drivers", "Delete 300 units of demand"] },
  { id: "EX-02", issue: "Overtime adds capacity but also changes cost and workforce assumptions.", correct: "Record the decision, owner, approval, duration, added hours/capacity, and downstream cost/workforce impacts", options: ["Record the decision, owner, approval, duration, added hours/capacity, and downstream cost/workforce impacts", "Change capacity with no explanation", "Treat overtime as free capacity"] },
  { id: "EX-03", issue: "A Product is not valid at Noida, but an allocation was entered there.", correct: "Block the intersection and require an approved sourcing or metadata change", options: ["Block the intersection and require an approved sourcing or metadata change", "Allow it because Noida has spare hours", "Move the Product under another parent"] },
  { id: "EX-04", issue: "Capacity is sufficient in total, but one month is overloaded and the next month is underloaded.", correct: "Use an approved prebuild or demand-shift scenario and quantify inventory and service consequences", options: ["Use an approved prebuild or demand-shift scenario and quantify inventory and service consequences", "Net the two months and hide the overload", "Move production without checking inventory"] },
] as const;

export const formDesignCases = [
  { id: "PF-01", issue: "Demand, inventory assumptions, calculated requirement, allocation, and capacity are all editable in one form.", correct: "Protect source and calculated cells; expose only owned assumptions and controlled plant-allocation inputs", options: ["Protect source and calculated cells; expose only owned assumptions and controlled plant-allocation inputs", "Make the full grid writable", "Copy the calculation into comments"] },
  { id: "PF-02", issue: "The production form shows every Product, plant, Scenario, Version, and month at once.", correct: "Use focused POV/page selections, suppression, valid intersections, and task-specific grids", options: ["Use focused POV/page selections, suppression, valid intersections, and task-specific grids", "Load every sparse intersection", "Remove Product and plant"] },
  { id: "PF-03", issue: "A planner runs the calculation without seeing its scope.", correct: "Use a clearly labelled action with reviewed prompts for Product, period, Scenario, and Version", options: ["Use a clearly labelled action with reviewed prompts for Product, period, Scenario, and Version", "Run the full cube silently", "Let the rule infer an unlimited scope"] },
  { id: "PF-04", issue: "An overloaded plant is saved with no owner or resolution status.", correct: "Surface the exception during entry and require owner, action, due date, and disposition", options: ["Surface the exception during entry and require owner, action, due date, and disposition", "Show only a red color", "Hide overloads from planners"] },
] as const;

export const productionReconciliationControls = [
  "Phase 09 consensus demand total agrees with the production-demand handoff after documented aggregation",
  "Beginning inventory plus expected good output minus demand equals projected ending inventory",
  "Planned production equals the sum of Pune and Noida allocations for every Product and Month",
  "Required hours, available hours, utilization, overload quantity, and exception status reconcile by plant",
  "Rounding, yield loss, provisional inventory target, and every manual adjustment remain separately explainable",
  "Rule prompts, job details, rerun result, protected-cell test, invalid-intersection test, and reviewer evidence are retained",
] as const;

export const productionBuildSequence = [
  "Freeze the approved Phase 09 demand handoff and record its version",
  "Load or enter controlled beginning inventory and provisional target inventory",
  "Validate yield, lot size, available hours, rates, and Product-to-plant capability",
  "Calculate net good-unit requirement, pre-yield starts, and rounded planned production",
  "Allocate production to valid plants and calculate hours and utilization",
  "Resolve overloads and rerun only the approved Product/period scope",
  "Reconcile demand, inventory bridge, allocation, capacity, and repeatability",
  "Approve the Phase 10 baseline and issue the Phase 11 rerun trigger",
] as const;

export const productionHomeworkMissions = [
  { id: "requirement", title: "Calculate production starts", output: "Requirement bridge" },
  { id: "allocation", title: "Allocate the plant plan", output: "Plant allocation" },
  { id: "exceptions", title: "Resolve capacity exceptions", output: "Exception decision" },
  { id: "reconcile", title: "Prove the connected totals", output: "Reconciliation" },
  { id: "readout", title: "Present the production recommendation", output: "Planner readout" },
] as const;

export const productionArtifacts = [
  "Approved demand-to-production contract with source version, aggregation rule, cutoff, grain, owner, and reconciliation control",
  "Beginning inventory, provisional target inventory, yield, lot size, rate, hours, downtime, capacity, and ownership baseline",
  "Production requirement calculation with net requirement, pre-yield starts, rounding, expected good output, and projected ending inventory",
  "Product-to-plant capability and valid-intersection evidence with Pune and Noida allocation assumptions",
  "Plant allocation, required hours, utilization, overload, preference variance, exception owner, action, due date, and approval",
  "Functional forms, scoped rule execution, Process/Job details, access test, protected-cell test, and invalid-intersection test",
  "Demand, inventory bridge, production allocation, capacity, aggregate, rerun, and downstream reconciliation evidence",
  "Runbook, test cases, defect log, Phase 11 rerun trigger, open items, reviewer, and exit approval",
] as const;

export const productionKnowledgeQuestions = [
  { id: "PK-01", prompt: "Why is yield applied before lot-size rounding?", correct: "The model must calculate enough starts to deliver the required good units, then schedule manufacturable lots", options: ["The model must calculate enough starts to deliver the required good units, then schedule manufacturable lots", "Yield changes demand", "Lot size replaces the inventory target"] },
  { id: "PK-02", prompt: "What must plant allocations reconcile to?", correct: "The approved rounded production plan for the same Product, Month, Scenario, and Version", options: ["The approved rounded production plan for the same Product, Month, Scenario, and Version", "Total plant capacity", "Last month's actual production"] },
  { id: "PK-03", prompt: "Does total capacity above demand prove feasibility?", correct: "No; Product capability, monthly timing, plant rates, lot sizes, and plant-level constraints can still cause overloads", options: ["No; Product capability, monthly timing, plant rates, lot sizes, and plant-level constraints can still cause overloads", "Yes, total capacity is sufficient evidence", "Yes, when one plant has spare hours"] },
  { id: "PK-04", prompt: "How should the provisional inventory target be treated?", correct: "As a visible controlled input with an owner and rerun trigger after Phase 11 policy is approved", options: ["As a visible controlled input with an owner and rerun trigger after Phase 11 policy is approved", "As a hidden constant", "As permanent inventory policy"] },
  { id: "PK-05", prompt: "What does a successful calculation job prove?", correct: "Only that the submitted rule ran; business results still require reconciliation, negative tests, and review", options: ["Only that the submitted rule ran; business results still require reconciliation, negative tests, and review", "That production is feasible and approved", "That all plant allocations are correct"] },
] as const;

export const productionScreenshots = [
  { id: "PP-UI-01", title: "Open the production planning workspace", path: "Home → Production Planning cluster → functional forms", asset: "01-production-workspace.png", capture: "Navigation cluster showing the Phase 10 production forms, calculation action, exception review, and reconciliation view.", action: "Confirm ApexPlan, Plan1, authorized planner role, Forecast/Working, model version, and the Phase 10 runbook.", evidence: "Environment, role, workspace, model version, and test cycle recorded." },
  { id: "PP-UI-02", title: "Review the demand and inventory handoff", path: "Production Planning → Demand and inventory handoff", asset: "02-demand-inventory-handoff-form.png", capture: "Read-only demand plus controlled beginning and provisional target inventory by Product and Month.", action: "Verify Mixer Grinder demand 1,301.348, beginning inventory 250, target ending inventory 300, sources, and protected demand cells.", evidence: "POV, source versions, values, ownership, cutoff, and protected-cell test captured." },
  { id: "PP-UI-03", title: "Calculate the production requirement", path: "Demand handoff → Actions → Calculate production requirement", asset: "03-production-requirement-form.png", capture: "Requirement bridge showing demand, inventory movement, 98% yield, 20-unit lot size, 1,380 starts, expected good output, and projected ending inventory.", action: "Run only the approved Mixer Grinder month and independently reproduce every bridge value.", evidence: "Rule version, prompts, job ID, results, independent calculation, and rerun result retained." },
  { id: "PP-UI-04", title: "Review plant capacity drivers", path: "Production Planning → Plant capacity", asset: "04-plant-capacity-form.png", capture: "Pune and Noida capacity form showing available hours, production rates, gross capacity, and approved adjustments.", action: "Verify 450 × 2 = 900 Pune units and 350 × 2 = 700 Noida units; test that calculated capacity is protected.", evidence: "Hours, rates, capacity, source, owner, timestamp, and access test captured." },
  { id: "PP-UI-05", title: "Allocate production across plants", path: "Production Planning → Plant allocation", asset: "05-production-allocation-form.png", capture: "Plant allocation form showing 820 Pune starts and 560 Noida starts, required hours, utilization, and total reconciliation.", action: "Save only valid lot-size allocations and verify they total 1,380 without exceeding capacity.", evidence: "Allocation inputs, total, hours, utilization, valid-intersection result, and reviewer captured." },
  { id: "PP-UI-06", title: "Resolve an overload exception", path: "Production Planning → Capacity exceptions", asset: "06-capacity-overload-exception.png", capture: "Exception view showing overloaded quantity, driver cause, owner, response option, due date, status, and approval.", action: "Test a 1,900-unit overload case, quantify the 300-unit shortfall, and document an approved resolution rather than editing the result.", evidence: "Before/after drivers, shortfall, options, selected action, downstream impacts, owner, and approval retained." },
  { id: "PP-UI-07", title: "Inspect the production calculation job", path: "Home → Application → Jobs → recent activity", asset: "07-production-calculation-job.png", capture: "Job details showing rule, prompts, Product/month scope, status, timestamps, duration, and messages.", action: "Open job details and confirm the processed POV; do not rely only on the green status icon.", evidence: "Job ID, rule/version, prompts, operator, duration, messages, and log retained." },
  { id: "PP-UI-08", title: "Reconcile the connected production plan", path: "Production Planning → Production reconciliation", asset: "08-production-reconciliation-form.png", capture: "Validation form showing demand bridge, inventory equation, plant allocation total, capacity utilization, and exception status.", action: "Recalculate the bridges independently and resolve every unexplained difference before approval.", evidence: "Detailed and aggregate totals, differences, disposition, reviewer, and approval captured." },
  { id: "PP-UI-09", title: "Review the production summary", path: "Production Planning → Production summary", asset: "09-production-summary-dashboard.png", capture: "Focused prototype summary showing planned starts, good output, utilization, overloads, and unresolved actions by Product and plant.", action: "Filter to material exceptions and drill to the supporting form; polished dashboard design remains Phase 16.", evidence: "Filters, totals, exception count, drill result, owner, and disposition captured." },
] as const;
