export const manufacturingCostLessons = [
  { id: "cost-foundations", number: "01", title: "Manufacturing costing foundations and readiness", duration: "16 min", type: "concept" },
  { id: "material-cost", number: "02", title: "Build the direct-material standard", duration: "26 min", type: "assessment" },
  { id: "conversion-overhead", number: "03", title: "Model labor and overhead drivers", duration: "28 min", type: "assessment" },
  { id: "unit-cost", number: "04", title: "Calculate the manufacturing unit cost", duration: "30 min", type: "simulation" },
  { id: "inventory-valuation", number: "05", title: "Value production and inventory", duration: "28 min", type: "simulation" },
  { id: "cogs-margin", number: "06", title: "Calculate COGS and gross margin", duration: "30 min", type: "simulation" },
  { id: "cost-exceptions", number: "07", title: "Analyze cost variances and exceptions", duration: "28 min", type: "wizard" },
  { id: "cost-walkthrough", number: "08", title: "Configure and test costing forms", duration: "30 min", type: "guided-screenshot" },
  { id: "cost-homework", number: "09", title: "Applied manufacturing cost lab", duration: "40 min", type: "assessment" },
  { id: "cost-handoff", number: "10", title: "Evidence package and exit gate", duration: "22 min", type: "exit-gate" },
] as const;

export type ManufacturingCostLessonId = (typeof manufacturingCostLessons)[number]["id"];

export const costReadinessControls = [
  "Phase 10 planned starts and expected good output, plus Phase 11 demand and ending inventory, are approved at Product × Entity × Month",
  "Bills of material, purchase prices, usage quantities, labor standards, machine standards, overhead pools, and allocation bases have named owners",
  "Normal yield loss is represented once in the approved material or production standard and will not be double counted",
  "Cost version, INR local monetary currency, No Currency operational drivers, USD reporting handoff, unit of measure, effective dates, Scenario, Version, period, and standard-versus-actual purpose are explicit",
  "Plan1 contains detailed cost calculations and ApexPlan ASO receives only reconciled reporting results through the approved mapping",
] as const;

export const materialCostCases = [
  { id: "MC-01", issue: "A supplier price changes, but the new rate is not effective until April.", correct: "Keep the January standard and effective-date the approved April price", options: ["Keep the January standard and effective-date the approved April price", "Rewrite January cost", "Average both prices without approval"] },
  { id: "MC-02", issue: "The material standard already includes normal 2% yield loss and Phase 10 also models 98% production yield.", correct: "Confirm the documented costing convention and remove any duplicate loss uplift", options: ["Confirm the documented costing convention and remove any duplicate loss uplift", "Apply both losses automatically", "Remove production yield"] },
  { id: "MC-03", issue: "Packaging usage is maintained in boxes while its price is per individual pack.", correct: "Convert through the approved unit-of-measure factor before multiplying quantity by rate", options: ["Convert through the approved unit-of-measure factor before multiplying quantity by rate", "Multiply the unmatched units", "Store the conversion in a comment"] },
  { id: "MC-04", issue: "A substitute component is cheaper but is not approved in the BOM.", correct: "Model it only in an approved scenario or engineering-change version", options: ["Model it only in an approved scenario or engineering-change version", "Replace the baseline component", "Reduce overhead instead"] },
] as const;

export const conversionCases = [
  { id: "CV-01", issue: "Labor cost is entered as one amount with no hours or rate.", correct: "Calculate standard labor as approved hours per good unit multiplied by the effective labor rate", options: ["Calculate standard labor as approved hours per good unit multiplied by the effective labor rate", "Copy last month's total", "Use machine hours as labor cost"] },
  { id: "CV-02", issue: "Variable overhead rises with machine activity.", correct: "Use the approved machine hours per unit and variable overhead rate", options: ["Use the approved machine hours per unit and variable overhead rate", "Allocate it as fixed overhead", "Spread it by sales value"] },
  { id: "CV-03", issue: "Fixed overhead is divided by an unusually low production volume, creating a large unit cost.", correct: "Use the approved normal or practical capacity basis and expose under-absorption separately", options: ["Use the approved normal or practical capacity basis and expose under-absorption separately", "Use any volume that produces the desired cost", "Move the excess into material cost"] },
  { id: "CV-04", issue: "Overtime from Phase 10 changes the labor rate for one month.", correct: "Record an approved scenario or cost variance with period, owner, production scope, and financial impact", options: ["Record an approved scenario or cost variance with period, owner, production scope, and financial impact", "Overwrite the permanent standard", "Ignore the added cost"] },
] as const;

export const unitCostCases = [
  { id: "UC-01", issue: "The cost rule adds the fixed-overhead pool directly to per-unit component costs.", correct: "Divide the pool by the approved absorption basis before adding its per-unit rate", options: ["Divide the pool by the approved absorption basis before adding its per-unit rate", "Add the whole pool per unit", "Exclude fixed overhead"] },
  { id: "UC-02", issue: "One blended rate is proposed for all Products and plants.", correct: "Maintain approved Product and Entity-specific drivers where resource consumption or rates differ", options: ["Maintain approved Product and Entity-specific drivers where resource consumption or rates differ", "Use the cheapest plant rate", "Use a company total for every intersection"] },
  { id: "UC-03", issue: "A cost component is missing for one Product.", correct: "Block baseline approval or use a documented temporary assumption with owner and expiry", options: ["Block baseline approval or use a documented temporary assumption with owner and expiry", "Treat the missing cost as zero", "Copy another Product's total silently"] },
] as const;

export const valuationCases = [
  { id: "VL-01", issue: "Production cost is multiplied by planned starts even though the approved standard is per good unit.", correct: "Multiply the per-good-unit standard by expected good output and retain the costing-basis evidence", options: ["Multiply the per-good-unit standard by expected good output and retain the costing-basis evidence", "Always use starts", "Use demand units"] },
  { id: "VL-02", issue: "Beginning inventory carries the prior standard of 270 while current production is costed at 275.", correct: "Value each layer correctly and use the approved weighted-average method for the practice COGS bridge", options: ["Value each layer correctly and use the approved weighted-average method for the practice COGS bridge", "Revalue beginning stock silently to 275", "Use only the lower rate"] },
  { id: "VL-03", issue: "Ending inventory quantity differs from Phase 11 by 1.052 units.", correct: "Block the valuation handoff until the quantity bridge reconciles exactly", options: ["Block the valuation handoff until the quantity bridge reconciles exactly", "Accept the quantity difference", "Adjust unit cost to offset it"] },
] as const;

export const cogsCases = [
  { id: "CG-01", issue: "COGS plus ending inventory value does not equal the value of goods available.", correct: "Block approval and reconcile quantity layers, valuation method, precision, and rounding", options: ["Block approval and reconcile quantity layers, valuation method, precision, and rounding", "Post the difference to revenue", "Force ending value to balance"] },
  { id: "CG-02", issue: "Net revenue is at Product × Market × Channel but cost is calculated at Product × Entity.", correct: "Aggregate both through approved mappings to a common reporting grain; do not invent unsupported detail", options: ["Aggregate both through approved mappings to a common reporting grain; do not invent unsupported detail", "Assign all margin to one Channel", "Duplicate cost across Markets"] },
  { id: "CG-03", issue: "Gross margin changes because both net price and unit cost changed.", correct: "Separate price, volume, mix, material, conversion, overhead, and inventory effects in the variance explanation", options: ["Separate price, volume, mix, material, conversion, overhead, and inventory effects in the variance explanation", "Attribute everything to price", "Show only the final margin percentage"] },
] as const;

export const costExceptionCases = [
  { id: "CE-01", issue: "Material cost is 8 above standard per unit because of an unapproved supplier increase.", correct: "Quantify total impact, retain the approved standard, and route the rate exception for sourcing and finance review", options: ["Quantify total impact, retain the approved standard, and route the rate exception for sourcing and finance review", "Overwrite the standard", "Hide the increase in fixed overhead"] },
  { id: "CE-02", issue: "Actual output is below the fixed-overhead absorption basis.", correct: "Expose volume under-absorption rather than inflating the operational unit standard", options: ["Expose volume under-absorption rather than inflating the operational unit standard", "Divide by the lowest output", "Move the variance to material usage"] },
  { id: "CE-03", issue: "Phase 11 reruns Electric Kettle production after the target changes to 225.", correct: "Rerun affected production cost, inventory valuation, COGS, capacity-related cost, and reporting reconciliations", options: ["Rerun affected production cost, inventory valuation, COGS, capacity-related cost, and reporting reconciliations", "Change ending value manually", "Keep the old production cost"] },
  { id: "CE-04", issue: "The aggregate cube margin differs from Plan1 after data movement.", correct: "Reconcile mapped accounts, Products, Entity totals, currency, period, and aggregation before sign-off", options: ["Reconcile mapped accounts, Products, Entity totals, currency, period, and aggregation before sign-off", "Use the ASO value because it is faster", "Post an unexplained adjustment"] },
] as const;

export const costFormCases = [
  { id: "CF-01", issue: "BOM quantities, rates, calculated unit cost, inventory value, and COGS are all editable.", correct: "Protect source and calculated cells; expose only owned assumptions and approved adjustments", options: ["Protect source and calculated cells; expose only owned assumptions and approved adjustments", "Make the whole grid writable", "Copy results into comments"] },
  { id: "CF-02", issue: "A costing form shows every sparse Product, Entity, Scenario, Version, and year.", correct: "Use task-specific POVs, valid intersections, suppression, and focused cost-component rows", options: ["Use task-specific POVs, valid intersections, suppression, and focused cost-component rows", "Load every intersection", "Remove Product from the form"] },
  { id: "CF-03", issue: "The rule runs without showing cost version or production scope.", correct: "Prompt and validate Product, Entity, period, Scenario, Version, and cost version before execution", options: ["Prompt and validate Product, Entity, period, Scenario, Version, and cost version before execution", "Run the full cube silently", "Use whichever version was last open"] },
  { id: "CF-04", issue: "A margin exception has no trace to the cost bridge.", correct: "Provide drill-through or linked evidence from margin to COGS, inventory value, unit cost, and cost drivers", options: ["Provide drill-through or linked evidence from margin to COGS, inventory value, unit cost, and cost drivers", "Use a red color only", "Let Finance calculate it offline"] },
] as const;

export const costReconciliationControls = [
  "Material quantity × effective rate agrees by component, and the sum agrees with direct material cost per good unit",
  "Labor hours × labor rate, machine hours × variable-overhead rate, and fixed-overhead pool ÷ approved basis independently recalculate",
  "Direct material plus direct labor plus variable overhead plus fixed overhead equals the approved manufacturing unit cost",
  "Expected good output × current unit cost equals current production value; beginning and current layers equal goods available for sale",
  "COGS plus ending inventory value equals goods available value, and ending quantity agrees exactly with Phase 11",
  "Net revenue minus COGS equals gross margin; Plan1 detail agrees with the mapped ApexPlan reporting aggregate and repeatable rerun",
] as const;

export const costBuildSequence = [
  "Freeze production, inventory, revenue, cost version, INR/No Currency treatment, USD reporting handoff, Scenario, Version, and cutoff",
  "Validate BOM quantities, units of measure, effective component rates, and normal-loss convention",
  "Validate labor standards, labor rates, machine standards, variable-overhead rates, and fixed-overhead basis",
  "Calculate and independently reproduce Product × Entity manufacturing unit cost",
  "Value beginning inventory, current expected good output, and total goods available",
  "Calculate weighted-average cost, COGS, ending inventory value, and gross margin",
  "Resolve cost exceptions, rerun affected Products, and move approved results to reporting",
  "Reconcile detail, aggregate, repeatability, security, evidence, and downstream handoff",
] as const;

export const costHomeworkMissions = [
  { id: "unit", title: "Build the manufacturing unit cost", output: "Cost rollup" },
  { id: "valuation", title: "Value production and inventory", output: "Valuation bridge" },
  { id: "cogs", title: "Calculate COGS and margin", output: "Margin bridge" },
  { id: "exceptions", title: "Resolve connected cost exceptions", output: "Exception decisions" },
  { id: "readout", title: "Present the cost recommendation", output: "Finance readout" },
] as const;

export const costArtifacts = [
  "Approved costing scope with Product and Entity grain, cost version, standard-versus-actual purpose, currency, unit, effective dates, Scenario, Version, period, cutoff, and owners",
  "Controlled BOM and material-rate baseline with component quantities, unit conversions, normal-loss convention, sourcing assumptions, validation, and approval",
  "Labor, machine, variable-overhead, and fixed-overhead driver baseline with sources, absorption basis, practical capacity, ownership, and approval",
  "Manufacturing unit-cost rollup showing direct material, direct labor, variable overhead, fixed overhead, assumptions, calculation, and independent reproduction",
  "Production and inventory valuation showing beginning layer, current output, goods available, weighted-average cost, COGS, ending inventory, and margin bridge",
  "Functional forms, scoped rule execution, Process or Job details, access test, protected-cell test, missing-driver test, and invalid-scope evidence",
  "Quantity, component, unit-cost, valuation, COGS, margin, rerun, repeatability, and Plan1-to-ApexPlan reconciliation evidence",
  "Runbook, test cases, exception log, changed-production rerun, downstream financial handoff, open items, reviewer, and exit approval",
] as const;

export const costKnowledgeQuestions = [
  { id: "CK-01", prompt: "Why must normal yield loss have one documented costing treatment?", correct: "Applying the same loss in material standards and production yield can double count cost", options: ["Applying the same loss in material standards and production yield can double count cost", "Yield never affects cost", "It changes only revenue"] },
  { id: "CK-02", prompt: "How is fixed overhead converted to a per-unit standard?", correct: "Divide the approved fixed-overhead pool by the approved normal or practical capacity basis", options: ["Divide the approved fixed-overhead pool by the approved normal or practical capacity basis", "Divide by the lowest monthly output", "Add the entire pool to every unit"] },
  { id: "CK-03", prompt: "What proves the inventory valuation bridge?", correct: "COGS plus ending inventory value equals goods available value and quantities agree with Phase 11", options: ["COGS plus ending inventory value equals goods available value and quantities agree with Phase 11", "A positive ending value", "A successful calculation job"] },
  { id: "CK-04", prompt: "How should detailed cost and commercial revenue meet for margin reporting?", correct: "Aggregate through approved mappings to a common reporting grain without inventing unsupported detail", options: ["Aggregate through approved mappings to a common reporting grain without inventing unsupported detail", "Duplicate cost by Channel", "Assign all cost to one Market"] },
  { id: "CK-05", prompt: "What follows a Phase 11 production rerun?", correct: "Rerun affected cost, valuation, COGS, margin, and reporting reconciliations", options: ["Rerun affected cost, valuation, COGS, margin, and reporting reconciliations", "Edit ending inventory value", "No costing action is required"] },
] as const;

export const costScreenshots = [
  { id: "CO-UI-01", title: "Open the manufacturing cost workspace", path: "Home → Manufacturing Cost & COGS cluster → functional forms", asset: "01-costing-workspace.png", capture: "Navigation cluster showing material, conversion, overhead, rollup, valuation, COGS, exception, and reconciliation tasks.", action: "Confirm ApexPlan, Plan1, authorized cost-planner role, Forecast/Working, Jan FY27, the approved cost version, INR for monetary costs, and No Currency for quantities and hours.", evidence: "Environment, role, workspace, model version, cost version, INR/No Currency context, and test cycle recorded." },
  { id: "CO-UI-02", title: "Review the material-cost build", path: "Manufacturing Cost → Material standard", asset: "02-material-cost-form.png", capture: "Component grid showing BOM quantity, unit of measure, conversion, effective rate, normal-loss treatment, and extended cost.", action: "Reproduce the 210 per-good-unit Mixer Grinder material standard and test source and calculated-cell protection.", evidence: "BOM version, rates, conversions, effective dates, extended costs, access test, and approval captured." },
  { id: "CO-UI-03", title: "Review conversion and overhead drivers", path: "Manufacturing Cost → Conversion and overhead", asset: "03-conversion-overhead-form.png", capture: "Labor hours and rate, machine hours and variable-overhead rate, fixed-overhead pool, absorption basis, and calculated rates.", action: "Prove labor 30, variable overhead 15, and fixed overhead 20 per good unit using approved drivers.", evidence: "Driver versions, sources, owner, calculations, practical-capacity basis, and reviewer retained." },
  { id: "CO-UI-04", title: "Calculate manufacturing unit cost", path: "Manufacturing Cost → Actions → Calculate standard cost", asset: "04-unit-cost-rollup.png", capture: "INR unit-cost rollup showing material 210, labor 30, variable overhead 15, fixed overhead 20, and total 275.", action: "Run Mixer Grinder for Jan FY27 in INR and independently reproduce every component and the INR 275 total.", evidence: "Rule version, prompts, job ID, currency, inputs, component results, independent calculation, and rerun result retained." },
  { id: "CO-UI-05", title: "Value production and inventory", path: "Manufacturing Cost → Inventory valuation", asset: "05-inventory-valuation-form.png", capture: "Beginning inventory layer, current expected output, unit costs, goods available quantity and value, and weighted-average unit cost.", action: "Prove 250 beginning units plus 1,352.4 good output equals 1,602.4 available units valued at 439,410.", evidence: "Source handoffs, quantity bridge, layer values, weighted average, precision, and reviewer captured." },
  { id: "CO-UI-06", title: "Calculate COGS and gross margin", path: "Manufacturing Cost → COGS and margin", asset: "06-cogs-margin-form.png", capture: "Demand, weighted-average cost, COGS, ending inventory quantity and value, net revenue, gross margin, and margin percentage.", action: "Reconcile demand 1,301.348, ending inventory 301.052, COGS, value balance, and net revenue at 430 per unit.", evidence: "Quantity and value bridges, net revenue source, COGS, margin, rounding, and approval captured." },
  { id: "CO-UI-07", title: "Resolve a cost exception", path: "Manufacturing Cost → Cost exceptions", asset: "07-cost-exception-review.png", capture: "Exception showing standard, current or scenario value, variance quantity and amount, cause, owner, response, due date, status, and approval.", action: "Resolve a material-rate or overhead-absorption exception without overwriting the approved standard.", evidence: "Before and after drivers, variance impact, selected response, owner, due date, status, and approval retained." },
  { id: "CO-UI-08", title: "Inspect the costing calculation job", path: "Home → Application → Jobs → recent activity", asset: "08-cost-calculation-job.png", capture: "Job details showing rule, prompts, Product and Entity scope, period, cost version, status, timestamps, duration, and messages.", action: "Confirm the processed POV and connect the job to independent business validation.", evidence: "Job ID, rule/version, prompts, operator, duration, messages, rerun, and validation reference retained." },
  { id: "CO-UI-09", title: "Reconcile cost and valuation", path: "Manufacturing Cost → Reconciliation", asset: "09-cost-reconciliation-form.png", capture: "Control view comparing cost components, unit cost, production value, inventory layers, COGS, ending value, margin, and aggregate results.", action: "Reconcile all six control bridges and prove an unchanged rerun produces the same result.", evidence: "Control totals, variances, repeatability, Plan1 and ApexPlan totals, reviewer, and approval captured." },
  { id: "CO-UI-10", title: "Review the manufacturing margin summary", path: "Manufacturing Cost → Summary dashboard", asset: "10-manufacturing-margin-dashboard.png", capture: "Functional summary of unit cost, component mix, production value, inventory value, COGS, gross margin, and open exceptions.", action: "Trace each KPI to a reconciled form and confirm no dashboard-only calculation changes the baseline.", evidence: "KPI definitions, filters, drill paths, source forms, exception counts, and review decision retained." },
] as const;
