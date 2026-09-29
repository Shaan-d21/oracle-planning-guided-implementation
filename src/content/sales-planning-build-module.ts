import type { LessonDefinition } from "@/types/course";

export const salesPlanningLessons = [
  { id: "sales-foundations", number: "01", title: "Sales planning foundations and controls", duration: "14 min", type: "concept" },
  { id: "historical-foundation", number: "02", title: "Historical foundation and data readiness", duration: "28 min", type: "simulation" },
  { id: "baseline-engine", number: "03", title: "Build the demand baseline", duration: "30 min", type: "simulation" },
  { id: "promotion-overrides", number: "04", title: "Model promotions and controlled overrides", duration: "28 min", type: "simulation" },
  { id: "consensus-demand", number: "05", title: "Calculate and govern consensus demand", duration: "28 min", type: "simulation" },
  { id: "price-revenue", number: "06", title: "Build the price and revenue waterfall", duration: "30 min", type: "simulation" },
  { id: "functional-walkthrough", number: "07", title: "Configure and test functional forms", duration: "30 min", type: "guided-screenshot" },
  { id: "reconcile-handoff", number: "08", title: "Reconcile exceptions and downstream handoff", duration: "26 min", type: "evidence" },
  { id: "sales-homework", number: "09", title: "Applied sales planning lab", duration: "35 min", type: "simulation" },
  { id: "sales-exit-gate", number: "10", title: "Evidence package and exit gate", duration: "20 min", type: "exit-gate" },
] as const satisfies readonly LessonDefinition[];

export type SalesPlanningLessonId = (typeof salesPlanningLessons)[number]["id"];

export const salesReadinessControls = [
  "Approved planning grain: Product × Market × Channel × Month × Scenario × Version, with Entity fixed to India_Operations; units and percentages use No Currency, while price and revenue use INR",
  "Phase 08 actuals are reconciled, complete for the agreed history window, and held in a read-only Actual/Final slice",
  "Forecast horizon, working Scenario/Version, writable intersections, INR local-input treatment, USD reporting handoff, unit of measure, and ownership are approved",
  "Baseline, promotion, override, consensus, price, and revenue definitions are traceable to signed requirements",
  "Thresholds, approvals, reconciliation controls, test cases, evidence storage, and downstream consumers are named",
] as const;

export const planningGrainCases = [
  { id: "GR-01", issue: "Sales volume must preserve Product, Market, Channel, and Month for commercial and downstream operational decisions.", correct: "Use Product × Market × Channel × Month × Scenario × Version and aggregate for review", options: ["Use Product × Market × Channel × Month × Scenario × Version and aggregate for review", "Plan only at total-company level", "Store Market and Channel in comments"] },
  { id: "GR-02", issue: "A campaign identifier is useful for audit, but no planning, security, workflow, or reporting decision occurs by campaign.", correct: "Keep campaign as governed supporting detail unless evidence justifies a dimension", options: ["Keep campaign as governed supporting detail unless evidence justifies a dimension", "Always create a Campaign dimension", "Remove promotion traceability"] },
  { id: "GR-03", issue: "Actual history and working forecast must never share the same editable slice.", correct: "Separate Scenario and Version, protect Actual/Final, and write only to Forecast/Working", options: ["Separate Scenario and Version, protect Actual/Final, and write only to Forecast/Working", "Let planners overwrite Actual", "Use cell color as the only control"] },
] as const;

export const historyQualityCases = [
  { id: "HQ-01", issue: "Two months are missing for an active Product/Market/Channel combination.", correct: "Investigate source completeness and distinguish missing data from genuine zero demand", options: ["Investigate source completeness and distinguish missing data from genuine zero demand", "Convert every blank to zero", "Ignore the months"] },
  { id: "HQ-02", issue: "Demand was constrained by a documented stockout and lost-sales estimate.", correct: "Retain actual sales and store an approved normalized-demand adjustment with evidence", options: ["Retain actual sales and store an approved normalized-demand adjustment with evidence", "Rewrite the source actual", "Apply an undocumented uplift"] },
  { id: "HQ-03", issue: "A one-time bulk order would distort the recurring baseline.", correct: "Flag it as an exception and exclude or normalize it only under an approved rule", options: ["Flag it as an exception and exclude or normalize it only under an approved rule", "Delete the transaction", "Leave it unexplained"] },
  { id: "HQ-04", issue: "Late actuals arrive after the monthly cutoff.", correct: "Apply the approved cutoff policy, reload the controlled period if authorized, and preserve version/run evidence", options: ["Apply the approved cutoff policy, reload the controlled period if authorized, and preserve version/run evidence", "Silently mix late data into the approved forecast", "Change the cutoff date after every run"] },
] as const;

export const baselineControls = [
  "Use approved 3-, 6-, and 12-month normalized-demand averages at the planning grain",
  "Require recency weights to total 100%; do not calculate when the control fails",
  "Apply growth and seasonality as explicit, reviewable drivers—not hidden spreadsheet factors",
  "Preserve history, component averages, assumptions, calculated baseline, rule version, and run evidence",
  "Handle new products, discontinued products, sparse history, and missing seasonality through governed exceptions",
] as const;

export const overrideCases = [
  { id: "OV-01", issue: "A sales manager proposes a 22% uplift above baseline.", correct: "Capture the override separately with reason, source, owner, expiry, and approval required by threshold", options: ["Capture the override separately with reason, source, owner, expiry, and approval required by threshold", "Overwrite the calculated baseline", "Enter the uplift in Actual"] },
  { id: "OV-02", issue: "The promotion is cancelled after an uplift was entered.", correct: "Reverse or expire the promotion adjustment and retain the audit trail", options: ["Reverse or expire the promotion adjustment and retain the audit trail", "Leave the uplift in demand", "Delete all forecast history"] },
  { id: "OV-03", issue: "A user tries to type into calculated promotional demand.", correct: "Keep calculated output read-only and permit input only in approved driver or override accounts", options: ["Keep calculated output read-only and permit input only in approved driver or override accounts", "Unlock every calculated cell", "Store the value in a comment only"] },
  { id: "OV-04", issue: "One promotion affects two products and may shift demand between them.", correct: "Model uplift, cannibalization, and any supported halo separately so portfolio demand is explainable", options: ["Model uplift, cannibalization, and any supported halo separately so portfolio demand is explainable", "Apply the full uplift to both products", "Ignore cannibalization"] },
] as const;

export const consensusCases = [
  { id: "CS-01", issue: "Statistical, sales, channel, and marketing weights total 110%.", correct: "Block calculation and require the governed weights to total exactly 100%", options: ["Block calculation and require the governed weights to total exactly 100%", "Divide the result by 110 without approval", "Ignore the difference"] },
  { id: "CS-02", issue: "Management approves an additional 10 units after weighted consensus.", correct: "Store the management adjustment separately and add it after the weighted consensus", options: ["Store the management adjustment separately and add it after the weighted consensus", "Overwrite the statistical forecast", "Change the source actual"] },
  { id: "CS-03", issue: "A distributor commitment is provided for one Market, Channel, Product, and Month only.", correct: "Apply it only at its supported grain and keep unsupported intersections null", options: ["Apply it only at its supported grain and keep unsupported intersections null", "Copy it to every Market and Channel", "Treat null as a company-wide zero"] },
  { id: "CS-04", issue: "Consensus differs materially from promotional demand.", correct: "Expose the bridge and require rationale or approval according to the variance threshold", options: ["Expose the bridge and require rationale or approval according to the variance threshold", "Hide the variance", "Force consensus to equal baseline"] },
] as const;

export const pricingCases = [
  { id: "PR-01", issue: "Contract, promotion, volume, and channel discounts are approved as additive percentage points against list price.", correct: "Store each component separately, validate the total, and calculate invoice price from the approved convention", options: ["Store each component separately, validate the total, and calculate invoice price from the approved convention", "Store only one unexplained discount", "Compound them without confirming policy"] },
  { id: "PR-02", issue: "Returns and credits are supplied as INR per unit.", correct: "Subtract them after invoice price and label the measure as INR per unit", options: ["Subtract them after invoice price and label the measure as INR per unit", "Treat them as percentages", "Subtract them from units"] },
  { id: "PR-03", issue: "Price and discount policy differ by Channel while demand is planned by Market and Channel.", correct: "Use the approved Channel pricing assumptions and test every Market × Channel combination before revenue calculation", options: ["Use the approved Channel pricing assumptions and test every Market × Channel combination before revenue calculation", "Use the highest price for every Channel", "Drop Channel from demand"] },
  { id: "PR-04", issue: "Monthly revenue is rounded differently across detail and aggregate calculations.", correct: "Calculate at the approved detailed grain, retain precision, and round only for presentation or approved accounting policy", options: ["Calculate at the approved detailed grain, retain precision, and round only for presentation or approved accounting policy", "Round every intermediate step", "Adjust totals manually"] },
] as const;

export const formDesignCases = [
  { id: "FM-01", issue: "Historical actuals and calculated outputs appear beside planner inputs.", correct: "Protect Actual/Final and calculated accounts; visually distinguish the limited Forecast/Working input cells", options: ["Protect Actual/Final and calculated accounts; visually distinguish the limited Forecast/Working input cells", "Make the entire grid writable", "Create one form per cell"] },
  { id: "FM-02", issue: "The detailed form is slow because every Product, Market, and Channel is placed on rows.", correct: "Use a focused POV/page selection, user variables, valid intersections, suppression, and a small task-specific grid", options: ["Use a focused POV/page selection, user variables, valid intersections, suppression, and a small task-specific grid", "Load every sparse member on rows", "Remove security"] },
  { id: "FM-03", issue: "Learners need to run a prototype calculation from a form.", correct: "Attach the approved prototype rule with clear scope and prompts; production rule engineering remains Phase 15", options: ["Attach the approved prototype rule with clear scope and prompts; production rule engineering remains Phase 15", "Build undocumented Groovy now", "Run rules against the full application"] },
  { id: "FM-04", issue: "A variance outside tolerance must be visible during entry.", correct: "Use validation or exception signaling and prevent promotion when the approved control is blocking", options: ["Use validation or exception signaling and prevent promotion when the approved control is blocking", "Rely on memory", "Hide the variance"] },
] as const;

export const reconciliationControls = [
  "Historical values and normalized adjustments reconcile to the Phase 08 approved source and cutoff",
  "3/6/12-month averages, weights, growth, seasonality, and baseline reproduce independently",
  "Baseline-to-promotion and promotion-to-consensus bridges explain every adjustment and approval",
  "Consensus weights total 100%, management adjustment is separate, and protected cells remain read-only",
  "List price, discount components, returns, credits, net price, units, and revenue recalculate at detail grain",
  "Aggregated sales units and net revenue agree across the functional form, retrieval, and evidence workbook",
  "Approved consensus units are ready for inventory/production; net revenue is ready for financial planning",
] as const;

export const salesBuildSequence = [
  "Confirm grain, horizon, Scenario/Version, No Currency for nonmonetary measures, INR for local monetary input, USD reporting handoff, ownership, and writable intersections",
  "Load and reconcile actual history; identify missing, constrained, and exceptional demand",
  "Calculate governed 3/6/12-month averages and validate weights",
  "Apply growth and seasonality to produce the protected baseline",
  "Apply promotion drivers and controlled commercial overrides with evidence",
  "Calculate weighted consensus and any separately approved management adjustment",
  "Calculate list-to-net price and net revenue at the approved detailed grain",
  "Run exception checks, reconcile the model, archive evidence, and hand off approved outputs",
] as const;

export const salesHomeworkMissions = [
  { id: "baseline", title: "Mission 1 · Build the baseline", output: "Weighted baseline result" },
  { id: "promotion", title: "Mission 2 · Model the promotion", output: "Promotional demand and controls" },
  { id: "consensus", title: "Mission 3 · Govern consensus", output: "Approved consensus result" },
  { id: "revenue", title: "Mission 4 · Calculate revenue", output: "Price waterfall and net revenue" },
  { id: "readout", title: "Mission 5 · Present the plan", output: "Sales-planning review readout" },
] as const;

export const salesArtifacts = [
  "Approved sales-planning grain, horizon, scenarios/versions, units, currency, ownership, and security boundary",
  "Reconciled historical foundation, normalization register, cutoff, source/run reference, and data-quality disposition",
  "Versioned baseline assumptions, component averages, weights, growth, seasonality, exceptions, and expected results",
  "Promotion, elasticity, cannibalization, halo, override, reason, threshold, approval, and expiry evidence",
  "Consensus inputs, weights, variance bridge, management adjustment, comments, status, and approval",
  "List-to-net price waterfall, revenue calculation, Channel pricing assumptions, currency treatment, precision policy, and reconciled totals",
  "Functional form, prototype execution, validation, job/retrieval, negative test, and access evidence",
  "Runbook, test cases, defect log, downstream handoff, open items, owners, reviewer, and exit approval",
] as const;

export const salesKnowledgeQuestions = [
  { id: "baseline", prompt: "Why must baseline remain separate from overrides?", correct: "So the model preserves an objective starting point and an explainable adjustment bridge", options: ["So the model preserves an objective starting point and an explainable adjustment bridge", "So users can overwrite Actual", "So weights can exceed 100%"] },
  { id: "history", prompt: "How should a stockout be handled?", correct: "Keep actual sales intact and use an approved evidenced normalization or lost-sales adjustment", options: ["Keep actual sales intact and use an approved evidenced normalization or lost-sales adjustment", "Rewrite source actuals", "Always treat the month as zero"] },
  { id: "consensus", prompt: "What happens when consensus weights do not total 100%?", correct: "The calculation is blocked until governed weights total exactly 100%", options: ["The calculation is blocked until governed weights total exactly 100%", "Planning guesses the missing percentage", "The largest input wins"] },
  { id: "price", prompt: "What is net price in this model?", correct: "List price less approved discount components, returns per unit, and credits per unit", options: ["List price less approved discount components, returns per unit, and credits per unit", "Units multiplied by list price", "List price plus all discounts"] },
  { id: "complete", prompt: "What proves the sales-planning build is ready?", correct: "Inputs, calculations, controls, access, exceptions, reconciliations, evidence, and downstream handoffs all pass", options: ["Inputs, calculations, controls, access, exceptions, reconciliations, evidence, and downstream handoffs all pass", "A form opens", "One total looks reasonable"] },
] as const;

const oracleFormsDoc = "https://docs.oracle.com/en/cloud/saas/planning-budgeting-cloud/planning_tutorial_designing_forms/index.html";

export const salesScreenshots = [
  { id: "SP-UI-01", title: "Open the controlled sales workspace", path: "Home → Sales Planning cluster → functional forms", asset: "01-sales-workspace.png", capture: "Navigation cluster or folder showing only the Phase 09 functional forms and prototype actions.", action: "Confirm environment, application, cube, authorized role, Scenario/Version, and the Phase 09 runbook before opening data.", evidence: "Environment, user role, workspace, model version, and test cycle recorded.", docUrl: oracleFormsDoc },
  { id: "SP-UI-02", title: "Review historical demand", path: "Sales Planning → Historical foundation", asset: "02-historical-foundation-form.png", capture: "Read-only Plan1 historical form with Product, Market, Channel, twelve months, sales units, normalization adjustments, and normalized demand.", action: "Set Entity India_Operations, Product Mixer Grinder, Market North, Channel Retail, Actual/Final, and No Currency because the form contains unit demand; verify the twelve-month values against the practice file and prove Actual/Final is read-only.", evidence: "POV, No Currency member, source/run reference, monthly values, total, missing-data result, and access test captured.", docUrl: oracleFormsDoc },
  { id: "SP-UI-03", title: "Enter baseline drivers", path: "Sales Planning → Baseline assumptions", asset: "03-baseline-assumptions-form.png", capture: "Input form showing 3/6/12-month weights, growth, seasonality, and protected component averages.", action: "Enter 20%, 30%, 50%, 5%, and 1.10; test that invalid weights are rejected or flagged.", evidence: "Input cells, weight validation, user, timestamp, and saved POV captured." },
  { id: "SP-UI-04", title: "Run and verify baseline", path: "Baseline assumptions → Actions → prototype baseline calculation", asset: "04-baseline-result-job.png", capture: "Calculated weighted average and baseline with successful scoped execution evidence.", action: "Run only the approved training POV, verify 1,208.13 units, then rerun to prove repeatability.", evidence: "Rule/version, prompts, job status, duration, result, rerun result, and independent workbook check retained.", docUrl: "https://docs.oracle.com/en/cloud/saas/planning-budgeting-cloud/pfusu/checking_job_status.html" },
  { id: "SP-UI-05", title: "Capture promotion and override evidence", path: "Sales Planning → Promotion and overrides", asset: "05-promotion-override-form.png", capture: "Form showing promotion drivers, calculated demand, override, reason, source, owner, approval status, and expiry.", action: "Enter the practice drivers, verify 1,273.37 units, add a controlled override case, and confirm calculated cells cannot be edited.", evidence: "Driver inputs, result, read-only test, comment/source, threshold, and approval evidence retained." },
  { id: "SP-UI-06", title: "Review consensus demand", path: "Sales Planning → Consensus review", asset: "06-consensus-review-form.png", capture: "Consensus form showing four inputs, weights, weighted result, management adjustment, final consensus, and variance flags.", action: "Calculate 1,301.35 units; then enter weights totaling 110% to prove the blocking control.", evidence: "Input sources, weights, calculation, negative test, variance, adjustment, comments, status, and approval retained." },
  { id: "SP-UI-07", title: "Verify the price waterfall", path: "Sales Planning → Price and revenue", asset: "07-price-revenue-form.png", capture: "List-to-net price waterfall and units-to-net-revenue calculation at the selected POV.", action: "Enter list price and approved deductions; verify net price 430.00 and net revenue 559,000.00 without rounding intermediate values.", evidence: "Price source, deductions, units, precision, net price, revenue, and independent calculation retained." },
  { id: "SP-UI-08", title: "Inspect the scoped execution", path: "Home → Application → Jobs → recent activity", asset: "08-sales-calculation-job.png", capture: "Job detail for the prototype calculation showing status, prompts/POV, timestamps, messages, and duration.", action: "Open job details rather than relying on the status icon; retain errors or warnings and confirm the processed scope.", evidence: "Job ID, rule/version, operator, POV, status, duration, messages, and log captured.", docUrl: "https://docs.oracle.com/en/cloud/saas/planning-budgeting-cloud/pfusu/checking_job_status.html" },
  { id: "SP-UI-09", title: "Reconcile the functional result", path: "Sales Planning → Sales reconciliation", asset: "09-sales-reconciliation-form.png", capture: "Validation view showing baseline bridge, consensus bridge, pricing bridge, totals, and downstream handoff status.", action: "Recalculate each bridge independently and resolve every unexplained difference before approval.", evidence: "Detail and aggregate totals, differences, disposition, reviewer, and approval captured." },
  { id: "SP-UI-10", title: "Review exceptions, not decoration", path: "Sales Planning → functional exception review", asset: "10-sales-exception-review.png", capture: "Focused review page or Dashboard 2.0 prototype showing only material demand, price, and revenue exceptions.", action: "Filter to exceptions, assign owner and due date, and drill to the supporting form. Final dashboard UX is designed in Phase 16.", evidence: "Exception threshold, count, owner, due date, drill result, and disposition captured.", docUrl: "https://docs.oracle.com/en/cloud/saas/planning-budgeting-cloud/pfusu/understanding_dashboards.html" },
] as const;
