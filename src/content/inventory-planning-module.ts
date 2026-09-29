export const inventoryPlanningLessons = [
  { id: "inventory-foundations", number: "01", title: "Inventory planning foundations and readiness", duration: "16 min", type: "concept" },
  { id: "opening-inventory", number: "02", title: "Establish the usable opening inventory", duration: "24 min", type: "assessment" },
  { id: "inventory-policy", number: "03", title: "Design the inventory policy", duration: "26 min", type: "simulation" },
  { id: "target-inventory", number: "04", title: "Calculate target ending inventory", duration: "30 min", type: "simulation" },
  { id: "inventory-balance", number: "05", title: "Project inventory and days of cover", duration: "26 min", type: "simulation" },
  { id: "plant-deployment", number: "06", title: "Deploy inventory across plants", duration: "30 min", type: "simulation" },
  { id: "inventory-exceptions", number: "07", title: "Resolve inventory exceptions", duration: "28 min", type: "wizard" },
  { id: "inventory-walkthrough", number: "08", title: "Configure and test inventory forms", duration: "30 min", type: "guided-screenshot" },
  { id: "inventory-homework", number: "09", title: "Applied inventory planning lab", duration: "38 min", type: "assessment" },
  { id: "inventory-handoff", number: "10", title: "Evidence package and exit gate", duration: "22 min", type: "exit-gate" },
] as const;

export type InventoryPlanningLessonId = (typeof inventoryPlanningLessons)[number]["id"];

export const inventoryReadinessControls = [
  "Phase 09 consensus demand and Phase 10 expected good output are approved at a compatible Product × Month grain",
  "Book inventory, quality hold, obsolete or blocked stock, in-transit ownership, snapshot date, and source system have named owners",
  "Target days cover, demand variability, replenishment lead time, service factor, and pack multiple are approved by Product or policy class",
  "Pune and Noida opening balances, production receipts, demand deployment, and transfer rules reconcile to the company total",
  "Plan1 Forecast/Working is writable only for owned policy and deployment inputs; Actual/Final, source balances, and calculations are protected",
] as const;

export const openingInventoryCases = [
  { id: "OI-01", issue: "The ledger shows 270 Mixer Grinder units, but 10 are on quality hold and 10 are obsolete or blocked.", correct: "Use 250 available units and preserve the 20-unit exclusion bridge", options: ["Use 250 available units and preserve the 20-unit exclusion bridge", "Use the full 270 units", "Delete the blocked stock from the source"] },
  { id: "OI-02", issue: "A physical count is lower than the source balance at the planning cutoff.", correct: "Create a reconciliation exception with owner and cutoff evidence; do not silently overwrite either value", options: ["Create a reconciliation exception with owner and cutoff evidence; do not silently overwrite either value", "Use whichever value is lower without evidence", "Add the difference to forecast demand"] },
  { id: "OI-03", issue: "Goods are in transit between Pune and Noida at month end.", correct: "Apply the approved ownership and cutoff rule once, then reconcile company and plant totals", options: ["Apply the approved ownership and cutoff rule once, then reconcile company and plant totals", "Count the goods at both plants", "Exclude all in-transit inventory permanently"] },
  { id: "OI-04", issue: "The opening snapshot is three days older than the demand and production cutoff.", correct: "Roll forward or reload to the common cutoff and record the intervening movements", options: ["Roll forward or reload to the common cutoff and record the intervening movements", "Accept the stale balance", "Change the demand cutoff to match"] },
] as const;

export const policyCases = [
  { id: "IP-01", issue: "One days-cover target is proposed for every Product.", correct: "Use an approved Product or policy-class target based on service, variability, lead time, shelf life, and working-capital trade-offs", options: ["Use an approved Product or policy-class target based on service, variability, lead time, shelf life, and working-capital trade-offs", "Use the highest target for all Products", "Let each planner choose a value monthly"] },
  { id: "IP-02", issue: "Safety stock is entered as an unexplained percentage of monthly demand.", correct: "Use governed demand variability, replenishment lead time, and service factor inputs with a documented formula", options: ["Use governed demand variability, replenishment lead time, and service factor inputs with a documented formula", "Keep the percentage hidden", "Use production yield as the safety factor"] },
  { id: "IP-03", issue: "A policy changes from April, but January to March are already approved.", correct: "Effective-date the new policy and protect prior approved periods", options: ["Effective-date the new policy and protect prior approved periods", "Rewrite all historical targets", "Create a new Product member"] },
  { id: "IP-04", issue: "A discontinued Product still receives a normal replenishment target.", correct: "Apply an approved run-down policy and flag residual or obsolete stock", options: ["Apply an approved run-down policy and flag residual or obsolete stock", "Maintain normal safety stock", "Move its inventory to another Product"] },
] as const;

export const targetCases = [
  { id: "TI-01", issue: "Cycle-stock target is 281.959 units, safety stock is 66 units, and the pack multiple is 20.", correct: "Use the higher policy target and round up to an approved ending target of 300 units", options: ["Use the higher policy target and round up to an approved ending target of 300 units", "Add both targets and round to 360", "Round cycle stock down to 280"] },
  { id: "TI-02", issue: "A planner changes the target after the production plan was approved.", correct: "Version and approve the policy change, then rerun the affected Phase 10 Product and period", options: ["Version and approve the policy change, then rerun the affected Phase 10 Product and period", "Change projected ending inventory manually", "Leave production unchanged without assessment"] },
  { id: "TI-03", issue: "Electric Kettle policy calculates 225 units, replacing the provisional Phase 10 target of 220.", correct: "Publish 225 as the approved target and trigger the controlled production rerun", options: ["Publish 225 as the approved target and trigger the controlled production rerun", "Keep 220 to avoid a rerun", "Change demand by five units"] },
] as const;

export const balanceCases = [
  { id: "IB-01", issue: "A projected ending balance is negative.", correct: "Expose a stockout quantity and service risk, then evaluate supply, transfer, demand timing, or policy actions", options: ["Expose a stockout quantity and service risk, then evaluate supply, transfer, demand timing, or policy actions", "Floor the displayed balance at zero", "Reduce actual demand"] },
  { id: "IB-02", issue: "Returns and scrap are included in expected good production output.", correct: "Model approved inventory movements separately so the balance bridge remains explainable", options: ["Model approved inventory movements separately so the balance bridge remains explainable", "Net them invisibly into output", "Record them as demand"] },
  { id: "IB-03", issue: "Projected ending inventory is above target because production is rounded to lots.", correct: "Retain the explainable surplus and evaluate it against excess and working-capital thresholds", options: ["Retain the explainable surplus and evaluate it against excess and working-capital thresholds", "Overwrite ending inventory to equal target", "Increase forecast demand"] },
] as const;

export const deploymentCases = [
  { id: "DP-01", issue: "Company inventory is sufficient, but Pune ends 7.209 units below its target while Noida has an 8.261-unit surplus.", correct: "Recommend an 8-unit Noida-to-Pune transfer and retain the pre- and post-transfer bridge", options: ["Recommend an 8-unit Noida-to-Pune transfer and retain the pre- and post-transfer bridge", "Increase total production by eight units", "Ignore the plant imbalance"] },
  { id: "DP-02", issue: "A transfer solves the quantity gap but arrives after the service date.", correct: "Reject or reschedule it using approved transit lead time and evaluate another response", options: ["Reject or reschedule it using approved transit lead time and evaluate another response", "Approve it because the total balances", "Change the receipt date after approval"] },
  { id: "DP-03", issue: "Post-transfer plant balances do not sum to the unchanged company total.", correct: "Block approval because transfers must conserve company inventory", options: ["Block approval because transfers must conserve company inventory", "Accept a small transfer variance", "Post the difference to demand"] },
] as const;

export const inventoryExceptionCases = [
  { id: "IE-01", issue: "Projected cover is below policy and the next production lot creates excess stock.", correct: "Compare service risk, lot economics, timing, alternate supply, and approved policy tolerance", options: ["Compare service risk, lot economics, timing, alternate supply, and approved policy tolerance", "Always produce the lot", "Always accept the stockout"] },
  { id: "IE-02", issue: "Inventory exceeds the target and has no near-term demand.", correct: "Flag excess or slow-moving stock with value, age, cause, owner, and disposition", options: ["Flag excess or slow-moving stock with value, age, cause, owner, and disposition", "Raise the target to match", "Hide it in an alternate scenario"] },
  { id: "IE-03", issue: "Quality-held stock is released after the plan calculation.", correct: "Record the release as a controlled opening or movement change and rerun the affected scope", options: ["Record the release as a controlled opening or movement change and rerun the affected scope", "Add it directly to ending inventory", "Ignore it until year end"] },
  { id: "IE-04", issue: "An approved inventory target differs from the target used by Phase 10.", correct: "Raise the Phase 10 rerun trigger and reconcile changed production, capacity, and ending inventory", options: ["Raise the Phase 10 rerun trigger and reconcile changed production, capacity, and ending inventory", "Keep two official targets", "Modify the Phase 10 output manually"] },
] as const;

export const inventoryFormCases = [
  { id: "IF-01", issue: "Book stock, exclusions, policy inputs, target, production output, and projected balance are all writable.", correct: "Protect source and calculated cells; expose only owned policy, approved adjustments, and deployment inputs", options: ["Protect source and calculated cells; expose only owned policy, approved adjustments, and deployment inputs", "Make every cell writable", "Store the logic in comments"] },
  { id: "IF-02", issue: "The form uses Warehouse even though ApexPlan has no Warehouse dimension.", correct: "Use existing Product × Entity × Month intersections, with Pune and Noida as Entity members", options: ["Use existing Product × Entity × Month intersections, with Pune and Noida as Entity members", "Add Warehouse without design approval", "Store plant names in Account"] },
  { id: "IF-03", issue: "The inventory rule can run across every Product and year without reviewed prompts.", correct: "Prompt and validate Product, period, Scenario, Version, and policy version before scoped execution", options: ["Prompt and validate Product, period, Scenario, Version, and policy version before scoped execution", "Run the full cube silently", "Let planners edit calculated results"] },
  { id: "IF-04", issue: "A red stockout cell has no owner, due date, or decision path.", correct: "Link the exception to quantity, cause, response, owner, due date, status, and approval", options: ["Link the exception to quantity, cause, response, owner, due date, status, and approval", "Use color as the only control", "Remove the warning"] },
] as const;

export const inventoryReconciliationControls = [
  "Book inventory minus quality hold and obsolete or blocked stock equals available beginning inventory at the approved cutoff",
  "Average daily demand, cycle stock, safety stock, pack rounding, and approved target independently recalculate from governed inputs",
  "Available beginning inventory plus approved movements and expected good output minus demand equals projected ending inventory",
  "Projected days cover uses the approved future-demand basis and is not divided by zero or based on an unrelated period",
  "Pune plus Noida opening, production, demand, transfers, and ending inventory reconcile to company totals before and after deployment",
  "Approved target changes trigger scoped Phase 10 reruns; changed production, capacity, inventory, and aggregate reporting are reconciled",
] as const;

export const inventoryBuildSequence = [
  "Freeze demand, production output, cutoff, Scenario, Version, and policy version",
  "Load book stock and classify quality, blocked, obsolete, in-transit, and other controlled movements",
  "Approve differentiated days-cover, variability, lead-time, service-factor, and pack-multiple inputs",
  "Calculate cycle stock, safety stock, rounded target ending inventory, and policy exceptions",
  "Project inventory, days cover, shortage or surplus, and working-capital exposure",
  "Deploy the company balance across Pune and Noida using valid, timely transfers",
  "Resolve exceptions, rerun affected production, and reconcile every connected total",
  "Approve the inventory baseline and publish the downstream handoff with evidence",
] as const;

export const inventoryHomeworkMissions = [
  { id: "target", title: "Calculate the inventory target", output: "Policy result" },
  { id: "balance", title: "Project inventory and cover", output: "Inventory bridge" },
  { id: "deployment", title: "Balance the plant deployment", output: "Transfer recommendation" },
  { id: "exceptions", title: "Resolve connected exceptions", output: "Exception decisions" },
  { id: "readout", title: "Present the inventory recommendation", output: "Planner readout" },
] as const;

export const inventoryArtifacts = [
  "Approved opening-inventory bridge with source, snapshot, cutoff, ownership, quality hold, blocked or obsolete stock, in-transit treatment, and reconciliation",
  "Versioned inventory-policy matrix with Product or class, days cover, variability, lead time, service factor, pack multiple, effective dates, owner, and approval",
  "Target-inventory calculation showing average daily demand, cycle stock, safety stock, governing target, rounding, and approved result",
  "Inventory projection showing opening, movements, expected good output, demand, ending inventory, target variance, days cover, and exception status",
  "Pune and Noida deployment with plant targets, pre-transfer balances, transfer timing, post-transfer balances, and company-total conservation",
  "Functional forms, scoped rule execution, Process or Job details, access test, protected-cell test, and invalid-input evidence",
  "Opening, policy, balance, deployment, rerun, repeatability, and Plan1-to-ApexPlan aggregate reconciliation evidence",
  "Runbook, test cases, exception log, Phase 10 rerun evidence, downstream handoff, open items, reviewer, and exit approval",
] as const;

export const inventoryKnowledgeQuestions = [
  { id: "IK-01", prompt: "Why is book stock not automatically available inventory?", correct: "Quality, obsolete, blocked, cutoff, ownership, and in-transit conditions can make part of the balance unavailable", options: ["Quality, obsolete, blocked, cutoff, ownership, and in-transit conditions can make part of the balance unavailable", "Book stock is always available", "Demand determines opening stock"] },
  { id: "IK-02", prompt: "How is the practice target selected?", correct: "Use the higher of cycle stock and safety stock, then round up to the approved pack multiple", options: ["Use the higher of cycle stock and safety stock, then round up to the approved pack multiple", "Add cycle and safety stock", "Use only last month's ending balance"] },
  { id: "IK-03", prompt: "What must an interplant transfer preserve?", correct: "The company inventory total, with feasible timing, valid locations, and a traceable pre- and post-transfer bridge", options: ["The company inventory total, with feasible timing, valid locations, and a traceable pre- and post-transfer bridge", "Only the receiving plant target", "The production allocation"] },
  { id: "IK-04", prompt: "What happens when Phase 11 approves a target different from Phase 10?", correct: "Rerun the affected production scope and reconcile production, capacity, ending inventory, and reporting", options: ["Rerun the affected production scope and reconcile production, capacity, ending inventory, and reporting", "Overwrite projected inventory", "Keep both targets active"] },
  { id: "IK-05", prompt: "Does a successful inventory rule job prove the plan is correct?", correct: "No; formulas, inputs, exceptions, plant totals, reruns, negative tests, and reviewer evidence still require validation", options: ["No; formulas, inputs, exceptions, plant totals, reruns, negative tests, and reviewer evidence still require validation", "Yes, a green job is sufficient", "Yes, if ending inventory is positive"] },
] as const;

export const inventoryScreenshots = [
  { id: "IP-UI-01", title: "Open the inventory planning workspace", path: "Home → Inventory Planning cluster → functional forms", asset: "01-inventory-workspace.png", capture: "Navigation cluster showing opening inventory, policy, target, projection, deployment, exception, calculation, and reconciliation tasks.", action: "Confirm ApexPlan, Plan1, authorized inventory-planner role, Forecast/Working, policy version, and the Phase 11 runbook.", evidence: "Environment, role, workspace, model version, policy version, and test cycle recorded." },
  { id: "IP-UI-02", title: "Reconcile usable opening inventory", path: "Inventory Planning → Opening inventory", asset: "02-opening-inventory-form.png", capture: "Protected book balance with controlled quality hold, blocked or obsolete stock, other movements, and calculated available inventory.", action: "Reproduce 270 − 10 − 10 = 250 available Mixer Grinder units and test protection of source and calculated cells.", evidence: "POV, source, cutoff, exclusions, available balance, access test, and reconciliation captured." },
  { id: "IP-UI-03", title: "Maintain the inventory policy", path: "Inventory Planning → Policy assumptions", asset: "03-inventory-policy-form.png", capture: "Product policy form showing target days cover, demand variability, replenishment lead time, service factor, pack multiple, effective dates, owner, and status.", action: "Enter only approved policy inputs and verify effective dating, validation, security, and Product-level ownership.", evidence: "Policy values, version, effective dates, source, owner, validation result, and approval captured." },
  { id: "IP-UI-04", title: "Calculate target ending inventory", path: "Policy assumptions → Actions → Calculate inventory target", asset: "04-target-inventory-result.png", capture: "Target calculation showing average daily demand, cycle stock, safety stock, governing quantity, pack rounding, and approved target.", action: "Run Mixer Grinder for Jan FY27 and independently prove the approved 300-unit target.", evidence: "Rule version, prompts, job ID, inputs, results, independent calculation, and rerun result retained." },
  { id: "IP-UI-05", title: "Review the inventory balance", path: "Inventory Planning → Inventory projection", asset: "05-inventory-balance-form.png", capture: "Inventory bridge showing available beginning stock, expected good output, demand, ending inventory, target variance, and projected days cover.", action: "Prove 250 + 1,352.4 − 1,301.348 = 301.052 and review the 1.052-unit surplus.", evidence: "Source versions, bridge, target variance, days cover, exception status, and reviewer captured." },
  { id: "IP-UI-06", title: "Deploy inventory across plants", path: "Inventory Planning → Plant deployment", asset: "06-plant-deployment-form.png", capture: "Pune and Noida pre-transfer balances, targets, surplus or shortfall, proposed transfer, transit timing, and post-transfer result.", action: "Recommend an 8-unit Noida-to-Pune transfer and prove both plant results still total 301.052.", evidence: "Plant inputs, transfer direction and date, pre/post balances, total conservation, owner, and approval retained." },
  { id: "IP-UI-07", title: "Resolve an inventory exception", path: "Inventory Planning → Exception review", asset: "07-inventory-exception-review.png", capture: "Exception view showing shortage or excess, policy variance, cause, quantity and value impact, response, owner, due date, status, and approval.", action: "Resolve the Electric Kettle 225-target change and raise the controlled Phase 10 rerun trigger.", evidence: "Before/after target, cause, production impact, selected action, owner, due date, status, and approval captured." },
  { id: "IP-UI-08", title: "Inspect the inventory calculation job", path: "Home → Application → Jobs → recent activity", asset: "08-inventory-calculation-job.png", capture: "Job details showing rule, prompts, Product and period scope, policy version, status, timestamps, duration, and messages.", action: "Open job details and confirm the processed POV; do not treat a green status as business validation.", evidence: "Job ID, rule/version, prompts, operator, duration, messages, and business-validation reference retained." },
  { id: "IP-UI-09", title: "Reconcile inventory and production", path: "Inventory Planning → Reconciliation", asset: "09-inventory-reconciliation-form.png", capture: "Control view comparing opening bridge, policy target, inventory balance, plant deployment, Phase 10 rerun, and aggregate totals.", action: "Reconcile Mixer Grinder and prove the Electric Kettle target change flows through the scoped production rerun.", evidence: "Control totals, variances, rerun IDs, repeatability result, reviewer, and approval captured." },
  { id: "IP-UI-10", title: "Review the inventory summary", path: "Inventory Planning → Summary dashboard", asset: "10-inventory-summary-dashboard.png", capture: "Functional summary of target attainment, days cover, shortage, excess, transfer, working-capital exposure, and open exceptions.", action: "Trace every KPI to a reconciled form and confirm no dashboard-only calculation changes the baseline.", evidence: "KPI definitions, drill paths, source forms, filters, exception counts, and review decision retained." },
] as const;
