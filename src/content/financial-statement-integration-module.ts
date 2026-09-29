export const financialStatementLessons = [
  { id: "financial-foundations", number: "01", title: "Financial integration foundations and boundaries", duration: "16 min", type: "concept" },
  { id: "financial-handoff", number: "02", title: "Map operational results to financial accounts", duration: "26 min", type: "assessment" },
  { id: "profit-loss", number: "03", title: "Build the management P&L", duration: "30 min", type: "simulation" },
  { id: "working-capital", number: "04", title: "Translate operations into working capital", duration: "28 min", type: "assessment" },
  { id: "cash-flow", number: "05", title: "Build the indirect cash-flow bridge", duration: "30 min", type: "simulation" },
  { id: "balance-sheet", number: "06", title: "Integrate and balance the balance sheet", duration: "30 min", type: "simulation" },
  { id: "financial-exceptions", number: "07", title: "Resolve financial integration exceptions", duration: "28 min", type: "wizard" },
  { id: "financial-walkthrough", number: "08", title: "Configure and test financial forms", duration: "30 min", type: "guided-screenshot" },
  { id: "financial-homework", number: "09", title: "Applied integrated statements lab", duration: "42 min", type: "assessment" },
  { id: "financial-handoff-gate", number: "10", title: "Evidence package and exit gate", duration: "22 min", type: "exit-gate" },
] as const;

export type FinancialStatementLessonId = (typeof financialStatementLessons)[number]["id"];

export const financialReadinessControls = [
  "Phase 09 net revenue, Phase 12 COGS and ending inventory value, and Phase 13 workforce, CapEx, cash, and depreciation impacts are approved and version-aligned",
  "Account mappings, signs, flow types, Entity ownership, Scenario, Version, period, INR local currency, USD reporting currency, No Currency treatment, source grain, and aggregation behavior are documented",
  "Finance has approved the monthly average and ending INR-per-USD rates; the workshop rate is clearly separated from live market rates",
  "Opening balance sheet values, working-capital assumptions, financing, dividends, tax assumptions, and movement accounts have named owners",
  "Plan1 contains the controlled statement calculations and ApexPlan ASO receives reconciled management-reporting results through the approved data map",
  "The phase is explicitly management planning: statutory consolidation, eliminations, journals, close, tax provision, and external reporting remain outside ApexPlan scope",
] as const;

export const financialMappingCases = [
  { id: "FM-01", issue: "Sales detail exists by Product, Market, and Channel while COGS exists by Product and Entity.", correct: "Aggregate through approved mappings to a common management-reporting grain without inventing unsupported detail", options: ["Aggregate through approved mappings to a common management-reporting grain without inventing unsupported detail", "Duplicate COGS across Channels", "Assign all revenue to one Entity"] },
  { id: "FM-02", issue: "Revenue is stored positive but the reporting hierarchy expects credit-sign presentation.", correct: "Define one controlled storage and presentation sign convention and test it through every statement", options: ["Define one controlled storage and presentation sign convention and test it through every statement", "Reverse signs manually on each form", "Change the source revenue"] },
  { id: "FM-03", issue: "Ending inventory value is mapped to both inventory and COGS movement accounts.", correct: "Map the balance and movement once each, then prove COGS plus ending inventory equals goods available", options: ["Map the balance and movement once each, then prove COGS plus ending inventory equals goods available", "Load both mappings", "Post the difference to cash"] },
  { id: "FM-04", issue: "CapEx approval, payment cash, asset addition, and depreciation are treated as one account.", correct: "Map investment approval, cash payment, PPE addition, and depreciation to distinct controlled flows", options: ["Map investment approval, cash payment, PPE addition, and depreciation to distinct controlled flows", "Use the CapEx account for all flows", "Record depreciation as financing cash flow"] },
  { id: "FM-05", issue: "The same currency treatment is proposed for unit quantities, P&L flows, and closing balance-sheet values.", correct: "Keep nonmonetary measures currency-neutral, translate periodic monetary flows at the approved average rate, and closing monetary balances at the approved ending rate", options: ["Keep nonmonetary measures currency-neutral, translate periodic monetary flows at the approved average rate, and closing monetary balances at the approved ending rate", "Translate every measure including units", "Use an unapproved spot rate for every account"] },
] as const;

export const pnlCases = [
  { id: "PL-01", issue: "Direct labor already included in manufacturing COGS is added again as operating expense.", correct: "Remove the duplicate and retain a trace from cost components to COGS and operating expenses", options: ["Remove the duplicate and retain a trace from cost components to COGS and operating expenses", "Keep both for visibility", "Reduce revenue instead"] },
  { id: "PL-02", issue: "Depreciation begins when the CapEx request is approved rather than when the asset is in service.", correct: "Recognize depreciation only from the approved in-service period", options: ["Recognize depreciation only from the approved in-service period", "Depreciate from request date", "Recognize all depreciation as cash"] },
  { id: "PL-03", issue: "Tax expense is calculated on revenue rather than positive profit before tax.", correct: "Apply the approved planning tax rate to the governed taxable-profit basis and preserve loss treatment", options: ["Apply the approved planning tax rate to the governed taxable-profit basis and preserve loss treatment", "Apply tax to revenue", "Always force tax to a positive amount"] },
  { id: "PL-04", issue: "Gross margin changes but the explanation contains only the final percentage.", correct: "Separate volume, net-price, mix, material, conversion, inventory, workforce, and depreciation impacts", options: ["Separate volume, net-price, mix, material, conversion, inventory, workforce, and depreciation impacts", "Attribute everything to price", "Show only net income"] },
] as const;

export const workingCapitalCases = [
  { id: "WC-01", issue: "Receivables are calculated from list-price revenue while the P&L uses net revenue.", correct: "Use the approved receivables basis consistently and reconcile it to the revenue bridge", options: ["Use the approved receivables basis consistently and reconcile it to the revenue bridge", "Use whichever revenue is larger", "Force receivables to the opening balance"] },
  { id: "WC-02", issue: "Inventory working capital is based on unit quantity rather than reconciled ending inventory value.", correct: "Use the Phase 12 ending inventory valuation and retain quantity-to-value traceability", options: ["Use the Phase 12 ending inventory valuation and retain quantity-to-value traceability", "Use ending units as currency", "Value all stock at list price"] },
  { id: "WC-03", issue: "Payables are derived from total COGS even though some COGS components are not supplier purchases.", correct: "Use the approved payable-eligible purchase basis and document timing assumptions", options: ["Use the approved payable-eligible purchase basis and document timing assumptions", "Apply DPO to all expenses", "Use revenue as purchases"] },
  { id: "WC-04", issue: "A working-capital change is entered directly into cash with no balance-sheet movement.", correct: "Calculate the cash effect from opening and closing balances and keep both sides of the bridge", options: ["Calculate the cash effect from opening and closing balances and keep both sides of the bridge", "Enter cash only", "Post the difference to equity"] },
] as const;

export const cashFlowCases = [
  { id: "CF-01", issue: "An increase in receivables is added to operating cash flow.", correct: "Subtract the receivables increase because revenue has not yet converted to cash", options: ["Subtract the receivables increase because revenue has not yet converted to cash", "Add the increase", "Treat it as financing"] },
  { id: "CF-02", issue: "Depreciation is deducted again in the indirect cash-flow bridge.", correct: "Add back noncash depreciation to net income, while keeping it in the P&L and accumulated depreciation", options: ["Add back noncash depreciation to net income, while keeping it in the P&L and accumulated depreciation", "Deduct it twice", "Classify it as CapEx cash"] },
  { id: "CF-03", issue: "The full approved CapEx request is treated as cash paid even though payment milestones differ.", correct: "Use the approved cash-payment schedule for investing cash flow and reconcile it to project and payable movements", options: ["Use the approved cash-payment schedule for investing cash flow and reconcile it to project and payable movements", "Use approval amount automatically", "Use monthly depreciation as cash"] },
  { id: "CF-04", issue: "New debt is included in operating cash flow.", correct: "Classify borrowing as financing cash flow and reconcile closing debt", options: ["Classify borrowing as financing cash flow and reconcile closing debt", "Classify it as revenue", "Net it against CapEx"] },
] as const;

export const balanceSheetCases = [
  { id: "BS-01", issue: "Closing PPE is calculated as opening PPE plus CapEx but ignores depreciation.", correct: "Calculate closing net PPE from opening net PPE plus capitalized additions minus depreciation and approved disposals", options: ["Calculate closing net PPE from opening net PPE plus capitalized additions minus depreciation and approved disposals", "Ignore depreciation", "Reduce cash twice"] },
  { id: "BS-02", issue: "Retained earnings does not include current net income.", correct: "Roll opening equity through net income, dividends, and other approved equity movements", options: ["Roll opening equity through net income, dividends, and other approved equity movements", "Use opening equity", "Post net income to debt"] },
  { id: "BS-03", issue: "Assets differ from liabilities plus equity by a small rounding amount.", correct: "Retain calculation precision, apply one approved presentation-rounding rule, and prove the unrounded control is zero", options: ["Retain calculation precision, apply one approved presentation-rounding rule, and prove the unrounded control is zero", "Post a plug to cash", "Ignore the difference"] },
  { id: "BS-04", issue: "Cash on the balance sheet differs from opening cash plus the cash-flow statement movement.", correct: "Block approval and reconcile operating, investing, financing, FX, and other approved cash movements", options: ["Block approval and reconcile operating, investing, financing, FX, and other approved cash movements", "Use the larger cash value", "Change opening cash"] },
] as const;

export const financialExceptionCases = [
  { id: "FE-01", issue: "P&L is correct but the cash-flow statement is wrong after a working-capital change.", correct: "Trace the opening and closing balance movement, sign, flow classification, and cash bridge before rerunning", options: ["Trace the opening and closing balance movement, sign, flow classification, and cash bridge before rerunning", "Adjust net income", "Plug operating cash"] },
  { id: "FE-02", issue: "An operational rerun changes COGS but statements remain approved.", correct: "Invalidate and rerun affected P&L, inventory, cash, balance-sheet, margin, and reporting scopes", options: ["Invalidate and rerun affected P&L, inventory, cash, balance-sheet, margin, and reporting scopes", "Keep the old statements", "Change retained earnings only"] },
  { id: "FE-03", issue: "Plan1 statements balance but ApexPlan ASO does not.", correct: "Reconcile account mappings, signs, Entity, currency, period, data movement, aggregation, and duplicate loads", options: ["Reconcile account mappings, signs, Entity, currency, period, data movement, aggregation, and duplicate loads", "Use the BSO result only", "Post an ASO plug"] },
  { id: "FE-04", issue: "Management asks whether the output is a statutory set of accounts.", correct: "State that it is a management-planning view and identify statutory consolidation, elimination, close, and accounting adjustments outside scope", options: ["State that it is a management-planning view and identify statutory consolidation, elimination, close, and accounting adjustments outside scope", "Call it statutory because it balances", "Add eliminations without design"] },
] as const;

export const financialFormCases = [
  { id: "FF-01", issue: "Source revenue, COGS, calculated totals, cash, and balance controls are editable.", correct: "Protect sourced and calculated cells; expose only owned assumptions and controlled adjustments", options: ["Protect sourced and calculated cells; expose only owned assumptions and controlled adjustments", "Make every statement editable", "Store formulas in comments"] },
  { id: "FF-02", issue: "A statement form mixes stored movements and calculated closing balances with no labels.", correct: "Separate opening, movement, closing, flow type, source, and calculation behavior visibly", options: ["Separate opening, movement, closing, flow type, source, and calculation behavior visibly", "Show one unlabeled total", "Let users infer behavior"] },
  { id: "FF-03", issue: "The integration rule runs every Entity and year without reviewed prompts.", correct: "Validate Entity, period, Scenario, Version, currency, statement scenario, and source versions before scoped execution", options: ["Validate Entity, period, Scenario, Version, currency, statement scenario, and source versions before scoped execution", "Run the full cube silently", "Use the last-open POV"] },
  { id: "FF-04", issue: "A balance-sheet variance has no drill path.", correct: "Link the control to account, movement, source, mapping, job, owner, action, and approval evidence", options: ["Link the control to account, movement, source, mapping, job, owner, action, and approval evidence", "Show only a red cell", "Reconcile offline"] },
] as const;

export const financialReconciliationControls = [
  "Net revenue, COGS, depreciation, workforce cost, interest, tax, and P&L subtotals agree with approved source versions and independent calculations",
  "Opening plus movement equals closing for receivables, inventory, payables, net PPE, debt, equity, and cash with approved signs and flow types",
  "Net income plus noncash and working-capital adjustments equals operating cash flow; investing and financing flows reconcile to approved schedules",
  "Opening cash plus net cash movement equals closing cash shown on both cash flow and balance sheet",
  "Total assets minus total liabilities and equity equals zero at full precision; COGS plus ending inventory value agrees with goods available value",
  "Approved INR operating results divide by the governed INR-per-USD rate to reproduce USD reporting values; account-specific average/ending treatment and No Currency exclusions are proven",
  "Plan1 detailed statements agree with ApexPlan reporting totals and unchanged scoped reruns are repeatable without duplicate movement",
] as const;

export const financialBuildSequence = [
  "Freeze revenue, cost, inventory, dependency, financing, tax, statement scenario, INR local currency, USD reporting currency, Scenario, Version, period, rates, and cutoff",
  "Validate account mappings, signs, flow types, source grains, opening balances, Entity-currency assignments, average/ending rate behavior, ownership, and aggregation",
  "Calculate gross margin, operating profit, profit before tax, tax, and net income",
  "Calculate receivables, inventory, payables, other working capital, and their opening-to-closing movements",
  "Build operating, investing, and financing cash flows and reconcile the closing cash balance",
  "Roll net PPE, debt, equity, and other balances; calculate total assets and liabilities plus equity",
  "Translate approved INR monetary results to USD, preserve No Currency measures, and reconcile local and reporting controls",
  "Resolve statement exceptions, rerun affected scopes, and move approved results to ApexPlan ASO",
  "Reconcile detail, aggregate, balance, repeatability, security, evidence, ownership, and exit approval",
] as const;

export const financialHomeworkMissions = [
  { id: "pnl", title: "Build the management P&L", output: "P&L bridge" },
  { id: "cash", title: "Build the indirect cash flow", output: "Cash bridge" },
  { id: "balance", title: "Balance the closing statement", output: "Balance-sheet control" },
  { id: "exceptions", title: "Resolve integration exceptions", output: "Exception decisions" },
  { id: "readout", title: "Present the integrated outlook", output: "Finance readout" },
] as const;

export const financialArtifacts = [
  "Approved financial-integration contract with management-reporting scope, account mappings, signs, flows, Entity, currency, Scenario, Version, period, cutoff, source versions, owners, and exclusions",
  "Opening balance sheet and working-capital baseline with receivables, inventory, payables, cash, PPE, debt, other liabilities, equity, assumptions, sources, and approvals",
  "Management P&L showing revenue, COGS, gross margin, operating expenses, depreciation, operating profit, interest, tax, net income, and variance explanation",
  "Indirect cash-flow statement showing net income, noncash adjustments, working-capital changes, investing, financing, net movement, and closing cash",
  "Integrated balance sheet showing opening, movements, closing values, cash tie-out, retained-earnings roll-forward, and zero balance control",
  "Approved fictional workshop exchange-rate baseline and INR-to-USD reconciliation proving average-rate flows, ending-rate balances, and No Currency exclusions",
  "Functional forms, scoped integration rules, Process or Job details, data map, access test, protected-cell test, invalid-scope test, and negative-control evidence",
  "P&L, working-capital, cash, PPE, debt, equity, balance, upstream rerun, repeatability, and Plan1-to-ApexPlan reconciliation evidence",
  "Runbook, test cases, exception log, statement scenario comparison, downstream handoff, limitations, open items, reviewer, and exit approval",
] as const;

export const financialKnowledgeQuestions = [
  { id: "FK-01", prompt: "Why must revenue and COGS meet at a common reporting grain?", correct: "Their source grains differ, so approved aggregation is required without manufacturing unsupported detail", options: ["Their source grains differ, so approved aggregation is required without manufacturing unsupported detail", "COGS should be duplicated by Channel", "Revenue should be removed"] },
  { id: "FK-02", prompt: "What is the indirect cash effect of an increase in receivables?", correct: "It reduces operating cash flow because recognized revenue has not yet been collected", options: ["It reduces operating cash flow because recognized revenue has not yet been collected", "It increases operating cash flow", "It is investing cash flow"] },
  { id: "FK-03", prompt: "How does depreciation affect the three statements?", correct: "It reduces P&L profit and net PPE, is added back in indirect operating cash flow, and is not itself a cash payment", options: ["It reduces P&L profit and net PPE, is added back in indirect operating cash flow, and is not itself a cash payment", "It is a financing cash inflow", "It reduces cash twice"] },
  { id: "FK-04", prompt: "What is the core integrated balance-sheet control?", correct: "Total assets minus total liabilities and equity must equal zero at full calculation precision", options: ["Total assets minus total liabilities and equity must equal zero at full calculation precision", "Closing cash must equal revenue", "Net income must equal COGS"] },
  { id: "FK-05", prompt: "Is this a statutory consolidation solution?", correct: "No; it is a management-planning integration and excludes legal consolidation, eliminations, close, and statutory adjustments", options: ["No; it is a management-planning integration and excludes legal consolidation, eliminations, close, and statutory adjustments", "Yes, because the balance sheet balances", "Yes, because ApexPlan has an ASO cube"] },
  { id: "FK-06", prompt: "How should the workshop translate Indian operating results for company reporting?", correct: "Use INR for local monetary values, USD for reporting, approved average rates for periodic flows, ending rates for closing balances, and No Currency for nonmonetary measures", options: ["Use INR for local monetary values, USD for reporting, approved average rates for periodic flows, ending rates for closing balances, and No Currency for nonmonetary measures", "Translate units and headcount into USD", "Use whichever exchange rate a planner finds online"] },
] as const;

export const financialScreenshots = [
  { id: "FS-UI-01", title: "Open the financial integration workspace", path: "Home → Financial Statement Integration → functional forms", asset: "01-financial-workspace.png", capture: "Navigation cluster showing source handoffs, mappings, P&L, working capital, cash flow, balance sheet, currency translation, exceptions, and reconciliation.", action: "Confirm ApexPlan, Plan1, authorized finance-planner role, Forecast/Working, statement scenario, INR local view, USD reporting view, approved rate version, and source versions.", evidence: "Environment, role, workspace, versions, currency views, rate version, scope, and test cycle recorded." },
  { id: "FS-UI-02", title: "Review account and flow mappings", path: "Financial Integration → Mapping control", asset: "02-account-flow-mapping.png", capture: "Mapping form showing source measure, target Account, sign, flow type, source grain, target grain, aggregation, owner, and status.", action: "Trace revenue, COGS, ending inventory, CapEx, cash, PPE addition, and depreciation through approved mappings.", evidence: "Mapping version, signs, flows, grains, duplicate check, owner, reviewer, and approval captured." },
  { id: "FS-UI-03", title: "Calculate the management P&L", path: "Financial Integration → Management P&L", asset: "03-management-pnl.png", capture: "INR P&L showing net revenue, COGS, gross margin, operating expense, depreciation, operating profit, interest, tax, and net income.", action: "Run the practice scenario and independently reproduce INR net income of 88,293.071544.", evidence: "POV, INR currency member, source versions, inputs, subtotals, independent calculation, variance explanation, and reviewer captured." },
  { id: "FS-UI-04", title: "Review working-capital movements", path: "Financial Integration → Working capital", asset: "04-working-capital-form.png", capture: "Opening and closing receivables, inventory and payables with movements, signs, sources, assumptions, and cash effects.", action: "Prove receivables increase 29,789.82, inventory increase 15,054.455392, and payables increase 20,000.", evidence: "Opening, movement, closing, source, cash sign, owner, and reconciliation captured." },
  { id: "FS-UI-05", title: "Build the indirect cash flow", path: "Financial Integration → Cash flow", asset: "05-indirect-cash-flow.png", capture: "Cash-flow bridge from net income through depreciation, working capital, CapEx, debt, net movement, and closing cash.", action: "Prove CFO 83,448.796152, net cash change −116,551.203848, and closing cash 383,448.796152.", evidence: "Operating, investing, financing, opening and closing cash, signs, schedules, and reviewer captured." },
  { id: "FS-UI-06", title: "Integrate the balance sheet", path: "Financial Integration → Balance sheet", asset: "06-integrated-balance-sheet.png", capture: "Closing assets, liabilities and equity with opening, movements, closing, cash tie-out, and full-precision balance control.", action: "Prove total assets and total liabilities plus equity both equal 3,925,793.071544 and the control is zero.", evidence: "Account movements, closing balances, retained earnings, cash tie-out, precision, and approval retained." },
  { id: "FS-UI-07", title: "Resolve a financial exception", path: "Financial Integration → Statement exceptions", asset: "07-financial-exception-review.png", capture: "Exception showing statement, Account, Entity, period, variance, source, mapping, cause, response, owner, due date, status, and approval.", action: "Resolve a cash tie-out or reporting-cube variance without posting an unexplained plug.", evidence: "Before and after controls, root cause, correction, rerun scope, owner, status, and approval retained." },
  { id: "FS-UI-08", title: "Inspect the integration job", path: "Home → Application → Jobs → recent activity", asset: "08-financial-integration-job.png", capture: "Job details showing rule or data map, Entity, period, Scenario, Version, currency, status, timestamps, duration, and messages.", action: "Confirm the processed scope and connect the job to independent statement validation.", evidence: "Job ID, rule or map version, prompts, operator, duration, messages, rerun, and validation reference retained." },
  { id: "FS-UI-09", title: "Reconcile the three statements and currencies", path: "Financial Integration → Reconciliation", asset: "09-three-statement-reconciliation.png", capture: "Control view comparing INR P&L, working capital, cash flow, balance sheet, approved rates, USD reporting results, upstream sources, and data movement.", action: "Reconcile all statement controls, prove INR-to-USD results against the practice file, and prove an unchanged rerun is repeatable without duplicate movement.", evidence: "INR and USD control totals, rate version/types, No Currency exclusions, variances, source versions, repeatability, reviewer, and approval captured." },
  { id: "FS-UI-10", title: "Review the integrated financial outlook", path: "Financial Integration → Management outlook", asset: "10-financial-outlook-dashboard.png", capture: "Functional summary of revenue, gross margin, operating profit, net income, working capital, cash, debt, CapEx, and balance exceptions.", action: "Trace each KPI to a reconciled statement and confirm the dashboard adds no independent calculation or statutory claim.", evidence: "KPI definitions, filters, drill paths, source forms, exception counts, limitations, and decision retained." },
] as const;
