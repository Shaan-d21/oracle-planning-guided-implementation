import type { LessonDefinition } from "@/types/course";

export const applicationDimensionDesignLessons = [
  { id: "dimension-orientation", number: "01", title: "Design foundations", duration: "10 min", type: "concept" },
  { id: "application-blueprint", number: "02", title: "Application setup walkthrough", duration: "28 min", type: "guided-screenshot" },
  { id: "dimension-grain", number: "03", title: "Dimensions and planning grain", duration: "26 min", type: "simulation" },
  { id: "hierarchy-properties", number: "04", title: "Hierarchies and member properties", duration: "28 min", type: "guided-screenshot" },
  { id: "plan-types-intersections", number: "05", title: "Cubes, intersections, and performance", duration: "28 min", type: "guided-screenshot" },
  { id: "dimension-homework", number: "06", title: "Applied design homework", duration: "30 min", type: "simulation" },
  { id: "dimension-handoff", number: "07", title: "Design package and exit gate", duration: "20 min", type: "exit-gate" },
] as const satisfies readonly LessonDefinition[];

export type ApplicationDimensionDesignLessonId = (typeof applicationDimensionDesignLessons)[number]["id"];

export const applicationDecisions = [
  {
    id: "application-type",
    label: "Application pattern",
    correct: "Create one Custom Planning application for the approved Apex design",
    options: ["Create one Custom Planning application for the approved Apex design", "Use Planning Modules even though the approved design is Custom", "Create a separate application for every planning department"],
  },
  {
    id: "calendar",
    label: "Calendar design",
    correct: "Use monthly periods from 2023 through 2029 with January as the fiscal-year start",
    options: ["Use monthly periods from 2023 through 2029 with January as the fiscal-year start", "Add weekly production periods that are outside the approved design", "Let each planner maintain independent spreadsheet dates"],
  },
  {
    id: "currency",
    label: "Currency design",
    correct: "Use INR for Pune and Noida local inputs, USD as the main reporting currency, and No Currency for nonmonetary measures; govern average and ending rates",
    options: ["Use INR for Pune and Noida local inputs, USD as the main reporting currency, and No Currency for nonmonetary measures; govern average and ending rates", "Treat the checked multicurrency option as irrelevant", "Let each planner enter an ungoverned currency code"],
  },
  {
    id: "task-flow",
    label: "Planning process control",
    correct: "Use EPM Task Manager and define task ownership, due dates, dependencies, and evidence",
    options: ["Use EPM Task Manager and define task ownership, due dates, dependencies, and evidence", "Ignore task flow until after go-live", "Use email as the only planning process control"],
  },
  {
    id: "naming",
    label: "Cube and naming decisions",
    correct: "Use ApexPlan for the application and ASO reporting cube, and Plan1 for the BSO input and calculation cube",
    options: ["Use ApexPlan for the application and ASO reporting cube, and Plan1 for the BSO input and calculation cube", "Let users enter data independently in both cubes", "Create additional cubes for each department without a design decision"],
  },
] as const;

export const screenshotWalkthroughs = {
  application: [
    { id: "APP-01", title: "Select the Planning business process", path: "Cloud EPM business-process selection → Planning → Select", asset: "01-select-planning.png", imageSrc: "/training/oracle-planning/phase-06/01-select-planning.png", imageWidth: 1894, imageHeight: 691, capture: "Cloud EPM page with Planning selected from the available business processes.", action: "Choose Planning because the solution requires budgets, forecasts, driver-based plans, workflow, and multidimensional analysis. The other cards represent different EPM business processes and are not substitutes for Planning.", evidence: "Planning is visibly selected, the authorized training tenant is confirmed, and no existing business process will be replaced.", docUrl: "https://docs.oracle.com/en/cloud/saas/planning-budgeting-cloud/planning-tutorial-creating-the-planning-business-process/index.html" },
    { id: "APP-02", title: "Choose how the application will be created", path: "Planning → Create a new application → Start", asset: "02-create-new-application.png", imageSrc: "/training/oracle-planning/phase-06/02-create-new-application.png", imageWidth: 1722, imageHeight: 495, capture: "Planning start page showing Create a new application and Migrate.", action: "Select Create a new application because this is an empty authorized training business process. Use Migrate only when restoring an approved snapshot.", evidence: "The creation method, application owner, and training-environment approval are recorded before Start is selected." },
    { id: "APP-03", title: "Enter the application identity", path: "Create Application → General", asset: "03-general-properties.png", imageSrc: "/training/oracle-planning/phase-06/03-general-properties.png", imageWidth: 1872, imageHeight: 690, capture: "General page showing Name ApexPlan, Description Production and Sales Planning, and Application Type Custom.", action: "Verify the stable application name and business description, and confirm that Custom is the approved application type. The disabled Dimensions Mapping step is not required for this new Custom application path.", evidence: "ApexPlan, its description, and Custom application type match the approved setup decision sheet." },
    { id: "APP-04", title: "Configure the application details", path: "Create Application → Details", asset: "04-application-details.png", imageSrc: "/training/oracle-planning/phase-06/04-application-details.png", imageWidth: 1877, imageHeight: 880, capture: "Details page showing Monthly periods, years 2023–2029, January fiscal start, rolling forecast disabled, EPM Task Manager, USD as the main currency, Simplified Multicurrency, Plan1 input cube, ApexPlan reporting cube, Sandboxes disabled, and Strategic Modeling disabled.", action: "Compare every selected value with the approved configuration sheet. Confirm USD as the application main/reporting currency and Simplified Multicurrency as the mechanism that will support INR local input at Pune and Noida. Confirm that Plan1 is the writable BSO input/calculation cube and ApexPlan is the read-oriented ASO reporting cube. Do not select Next while any value differs from the approved design.", evidence: "The reviewer signs off calendar, workflow, USD/INR/No Currency treatment, cube names and purposes, optional features, and the reason for enabling Simplified Multicurrency." },
    { id: "APP-05", title: "Add the approved custom dimensions", path: "Create Application → Customize", asset: "0_dimensions.png", imageSrc: "/training/oracle-planning/phase-06/0_dimensions.png", imageWidth: 1887, imageHeight: 878, capture: "Customize page showing the standard Period, Account, Years, Scenario, Version, and Entity dimensions plus custom Product, Market, and Channel dimensions.", action: "Keep the standard dimensions and add only Product, Market, and Channel. Plant responsibility is modeled through Entity members for Pune and Noida; do not add Customer, Plant, Production Line, or Cost Element dimensions to this release.", evidence: "The dimension inventory matches the approved grain and contains exactly the required custom dimensions before Next is selected." },
    { id: "APP-06", title: "Perform the final configuration review", path: "Create Application → Review", asset: "05-review-create.png", imageSrc: "/training/oracle-planning/phase-06/05-review-create.png", imageWidth: 1887, imageHeight: 772, capture: "Review page confirming ApexPlan Standard, Monthly frequency, 2023–2029, January fiscal start, EPM Task Manager, USD main currency with Simplified Multicurrency, Sandboxes disabled, and the Plan1/ApexPlan cube split.", action: "Compare the full review—not only the visible upper section—with the signed decision sheet. Confirm the accompanying design record assigns INR local input to Pune and Noida, USD reporting to the company rollup, and No Currency to nonmonetary measures. Go Back to correct any mismatch. Select Create only after maker-checker approval because several choices are high-impact or difficult to reverse.", evidence: "The reviewer, approval reference, configuration summary, Entity-currency assignment, cube split, and Create authorization are retained with the build record." },
    { id: "APP-07", title: "Monitor application creation", path: "Create → Application Creation Status", asset: "06-application-creation-status.png", imageSrc: "/training/oracle-planning/phase-06/06-application-creation-status.png", imageWidth: 537, imageHeight: 106, capture: "Application Creation Status showing that creation has been initiated.", action: "Wait for completion; initiation is not proof of success. Do not submit Create again. Capture any warning or error and follow the approved recovery route.", evidence: "Final status, start/end time, operator, and any warning or error are recorded." },
    { id: "APP-08", title: "Verify the created application", path: "Application Creation Status → ApexPlan Home", asset: "0_final_application.png", imageSrc: "/training/oracle-planning/phase-06/0_final_application.png", imageWidth: 1917, imageHeight: 923, capture: "ApexPlan home page with Tasks, Dashboards, Infolets, Data, Reports, Rules, Approvals, Application, Tools, IPM, and Academy cards.", action: "Confirm the application name in the header, open Application to verify cubes and dimensions, and perform a smoke check of navigation. A home page alone proves access—not that metadata, security, forms, rules, or integrations are complete.", evidence: "The home page, application name, expected cards, successful access, and follow-up cube/dimension smoke checks are captured. Sanitize the displayed user identity before publishing the screenshot externally." },
  ],
  hierarchy: [
    { id: "DIM-UI-01", title: "Open the dimension inventory", path: "Home → Application → Overview → Dimensions", asset: "07-dimensions-overview.png", capture: "Dimensions page with cube filter, dimension order, evaluation order, Create, Import, and Export actions.", action: "Filter by cube and reconcile dimension participation, order, and evaluation order to the design workbook.", evidence: "Dimension counts and cube assignments agree with the approved inventory.", docUrl: "https://docs.oracle.com/en/cloud/saas/planning-budgeting-cloud/pfusa/managing_dimensions.html" },
    { id: "DIM-UI-02", title: "Inspect member properties", path: "Dimensions → select a dimension → Edit Member Properties", asset: "08-member-properties.png", capture: "Simplified Dimension Editor showing hierarchy rows and relevant member-property columns.", action: "Inspect parent, alias, data storage, aggregation, data type, account behavior, plan-type validity, security, and formula columns relevant to the selected dimension.", evidence: "A property validation sample covers representative parents, leaves, calculated members, and balance accounts." },
    { id: "CUR-UI-01", title: "Verify the Simplified Multicurrency structure", path: "Home → Application → Overview → Dimensions → Currency", asset: "11-currency-configuration.png", capture: "Currency dimension or exchange-rate configuration showing USD, INR, and the supported currency-neutral treatment required by the approved ApexPlan design.", action: "Confirm USD as the main/reporting currency, INR as the local input currency for Pune and Noida, and No Currency for units, hours, headcount, percentages, and days. Record Finance ownership of monthly average and ending rates. Do not load rates until the currency list, Entity assignments, account behavior, and ownership are approved.", evidence: "USD, INR, No Currency treatment, Entity assignment, rate type, period coverage, owner, and local-to-reporting reconciliation control are documented.", docUrl: "https://docs.oracle.com/en/cloud/saas/planning-budgeting-cloud/pfusa/about_simplified_multicurrency_100xf978173a.html" },
  ],
  intersections: [
    { id: "CUBE-UI-01", title: "Review cubes", path: "Home → Application → Overview → Cubes", asset: "09-cubes-overview.png", capture: "Cubes page showing input and reporting cubes plus the Create action.", action: "Confirm each cube has a distinct business purpose, approved grain, participating dimensions, and controlled data movement. Do not create a cube only to separate teams.", evidence: "Cube inventory reconciles to architecture and the dimension participation matrix.", docUrl: "https://docs.oracle.com/en/cloud/saas/planning-budgeting-cloud/pfusa/viewing_plan_types.html" },
    { id: "IX-UI-01", title: "Create a valid-intersection group", path: "Home → Application → Valid Intersections → Setup → Create", asset: "10-valid-intersections.png", capture: "Valid Intersections Setup showing group name, definition type, anchor dimension, nonanchor dimensions, and rules.", action: "Choose an anchor deliberately, define required nonanchor dimensions, select approved members, and verify how unselected anchor members are treated.", evidence: "Positive and negative test cases prove valid combinations are editable and invalid combinations are read-only.", docUrl: "https://docs.oracle.com/en/cloud/saas/planning-budgeting-cloud/pfusa/creating_valid_intersections.html" },
  ],
} as const;

export const dimensionRoleCases = [
  { id: "DIM-01", need: "Financial measures, drivers, KPIs, and statement rollups", correct: "Account" },
  { id: "DIM-02", need: "Apex company, India Operations, and Pune/Noida plant responsibility", correct: "Entity" },
  { id: "DIM-03", need: "Mixer Grinder, Electric Kettle, Air Fryer, and Induction Cooktop analysis", correct: "Product" },
  { id: "DIM-04", need: "North, Central, West, and South commercial planning", correct: "Market" },
  { id: "DIM-05", need: "Distributor, Retail, and Online sales routes", correct: "Channel" },
  { id: "DIM-06", need: "Actual, Budget, and Forecast datasets", correct: "Scenario" },
  { id: "DIM-07", need: "Working, Final, Upside, and Downside planning iterations", correct: "Version" },
  { id: "DIM-08", need: "INR local input, USD reporting, and currency-neutral measures created or supported by Simplified Multicurrency", correct: "Currency" },
] as const;

export const requiredDimensions = ["Account", "Entity", "Scenario", "Version", "Year", "Period", "Currency", "Product", "Market", "Channel"] as const;

export const grainCases = [
  { id: "GR-01", measure: "Sales Units", correct: "Product × Market × Channel × Month × Scenario × Version" },
  { id: "GR-02", measure: "Planned Production", correct: "Product × Entity (Plant) × Month × Scenario × Version" },
  { id: "GR-03", measure: "Ending Finished Goods Inventory", correct: "Product × Entity (Plant) × Month × Scenario × Version" },
  { id: "GR-04", measure: "Revenue, COGS, and Margin", correct: "Account × Product × Market × Channel × Entity × Month × Scenario × Version × Currency" },
] as const;

export const hierarchyCases = [
  { id: "H-01", label: "Product hierarchy", correct: "All Products → Home Appliances → Mixer Grinder / Electric Kettle / Air Fryer / Induction Cooktop" },
  { id: "H-02", label: "Entity hierarchy", correct: "Apex Home Appliances → India Operations → Manufacturing Plants → Pune / Noida" },
  { id: "H-03", label: "Market hierarchy", correct: "All Markets → North / Central / West / South" },
  { id: "H-04", label: "Channel hierarchy", correct: "All Channels → Distributor / Retail / Online" },
] as const;

export const propertyCases = [
  { id: "P-01", member: "Gross Margin %", correct: "Non-additive percentage account with an approved formula and tested aggregation behavior" },
  { id: "P-02", member: "Ending Finished Goods Inventory", correct: "Balance account using ending time-balance behavior rather than summing months" },
  { id: "P-03", member: "Product Category", correct: "Attribute when it is stable analysis metadata; a base dimension only when it drives input, security, workflow, or changing relationships" },
  { id: "P-04", member: "Product and Entity leaf members", correct: "Stored at approved input intersections; parents use deliberate aggregation or dynamic behavior based on tested design" },
  { id: "P-05", member: "Alternate product rollup", correct: "Use governed shared members or an approved alternate hierarchy while preserving one authoritative base member" },
] as const;

export const planTypeCases = [
  { id: "PT-01", process: "Monthly sales, inventory, plant allocation, production, capacity, cost, COGS, and margin input/calculation", correct: "Plan1 · block-storage input and calculation cube" },
  { id: "PT-02", process: "Fast read-only management aggregation, variance analysis, and reporting", correct: "ApexPlan · aggregate-storage reporting cube fed from Plan1" },
] as const;

export const intersectionCases = [
  { id: "IX-01", rule: "Sales input is planned by Product, Market, and Channel.", correct: "Allow approved Product × Market × Channel combinations for sales accounts in Plan1" },
  { id: "IX-02", rule: "Production and capacity are planned by Product and plant Entity, not by Market or Channel.", correct: "Use approved No Market and No Channel members at operational intersections and restrict invalid Product × Plant combinations" },
  { id: "IX-03", rule: "Currency conversion applies to monetary accounts, not unit quantities.", correct: "Use the Simplified Multicurrency design for monetary accounts and keep unit measures currency-neutral as supported by the approved model" },
  { id: "IX-04", rule: "Only governed results feed management reporting.", correct: "Map approved aggregated results from Plan1 to ApexPlan and reconcile source and target control totals" },
] as const;

export const dimensionHomeworkMissions = [
  { id: "blueprint", title: "Mission 1 · Defend setup choices", prompt: "Explain the approved application type, calendar, currency, task-flow, cube-name, sandbox, and naming decisions—including consequences of a wrong choice.", output: "Application decision rationale" },
  { id: "grain", title: "Mission 2 · Resolve planning grain", prompt: "Select the lowest meaningful business grain for three planning measures without adding irrelevant dimensionality.", output: "Three grain decisions" },
  { id: "properties", title: "Mission 3 · Protect calculation behavior", prompt: "Choose the member-property treatment that preserves aggregation, time balance, and hierarchy integrity.", output: "Three property decisions" },
  { id: "intersections", title: "Mission 4 · Prevent meaningless combinations", prompt: "Choose the cube or valid-intersection response that protects each business rule without confusing it with security.", output: "Three intersection controls" },
  { id: "readout", title: "Mission 5 · Run the design review", prompt: "Present the design baseline, evidence, unresolved decisions, risks, owners, and recommendation for metadata build.", output: "Design-review readout" },
] as const;

export const homeworkGrainCases = [
  { id: "HW-GR-01", scenario: "Market managers adjust monthly unit forecasts by product and channel.", correct: "Product × Market × Channel × Month × Scenario × Version", options: ["Product × Market × Channel × Month × Scenario × Version", "Product × Entity × Week", "Account × Entity × Year only"] },
  { id: "HW-GR-02", scenario: "Plant planners compare monthly required production with Pune and Noida capacity.", correct: "Product × Entity (Plant) × Month × Scenario × Version", options: ["Product × Entity (Plant) × Month × Scenario × Version", "Product × Market × Channel × Week", "Entity × Account × Quarter only"] },
  { id: "HW-GR-03", scenario: "Finance reviews revenue, COGS, and margin in reporting currency.", correct: "Account × Product × Market × Channel × Entity × Month × Scenario × Version × Currency", options: ["Account × Product × Market × Channel × Entity × Month × Scenario × Version × Currency", "Product × Production Line × Week", "Product category only"] },
] as const;

export const homeworkPropertyCases = [
  { id: "HW-P-01", scenario: "Quarter-end inventory must equal the final month, not the sum of all months.", correct: "Use balance / ending time behavior and validate quarter rollup", options: ["Use balance / ending time behavior and validate quarter rollup", "Use flow and sum every month", "Store the quarter total manually"] },
  { id: "HW-P-02", scenario: "Gross Margin % must remain mathematically correct at parent levels.", correct: "Use an approved non-additive formula and test aggregation", options: ["Use an approved non-additive formula and test aggregation", "Add child percentages together", "Enter every parent percentage manually"] },
  { id: "HW-P-03", scenario: "One SKU appears in an alternate management rollup without becoming a second product.", correct: "Use a governed shared member or alternate hierarchy linked to the same base member", options: ["Use a governed shared member or alternate hierarchy linked to the same base member", "Create an unrelated duplicate SKU", "Change the base SKU name for each report"] },
] as const;

export const homeworkIntersectionCases = [
  { id: "HW-IX-01", scenario: "Only approved products may be produced at each Apex plant.", correct: "Define and test Product × Entity valid-intersection rules for Pune and Noida", options: ["Define and test Product × Entity valid-intersection rules for Pune and Noida", "Grant administrator access to everyone", "Allow every combination and clean errors later"] },
  { id: "HW-IX-02", scenario: "Market and Channel do not describe plant-level production values.", correct: "Use approved No Market and No Channel members for production accounts and test the resulting form behavior", options: ["Use approved No Market and No Channel members for production accounts and test the resulting form behavior", "Enable every combination for data entry", "Use security to change the meaning of production data"] },
  { id: "HW-IX-03", scenario: "The reporting cube needs approved monthly summaries, not writable operational detail.", correct: "Use a controlled data map with aggregation, reconciliation, and read-oriented reporting design", options: ["Use a controlled data map with aggregation, reconciliation, and read-oriented reporting design", "Let users enter reporting totals independently", "Copy arbitrary cells with no control totals"] },
] as const;

export const dimensionDesignArtifacts = [
  "Application setup decision sheet and maker-checker approval",
  "Oracle walkthrough runbook and sanitized screenshot evidence",
  "Dimension inventory, ownership, order, and cube participation matrix",
  "Measure-to-planning-grain and valid-intersection matrix",
  "Hierarchy, alias, attribute, and member-property specification",
  "Cube purpose, storage, dimension participation, and data-map design",
  "Performance assumptions, volume estimates, and test approach",
  "Decision, dependency, risk, open-item, and approval log",
] as const;

export const dimensionKnowledgeQuestions = [
  { id: "grain-first", prompt: "Why is planning grain defined before adding custom dimensions?", correct: "It proves each dimension is required by a business decision or calculation and prevents meaningless volume", options: ["It proves each dimension is required by a business decision or calculation and prevents meaningless volume", "It guarantees every dimension belongs in every cube", "It removes the need for requirements"] },
  { id: "creation-review", prompt: "Why must the creation wizard be independently reviewed before Create?", correct: "Calendar, currency, application type, and cube choices are high-impact and some names cannot be changed later", options: ["Calendar, currency, application type, and cube choices are high-impact and some names cannot be changed later", "The wizard automatically corrects every business decision", "Review is needed only for visual formatting"] },
  { id: "time-balance", prompt: "How should ending inventory aggregate over time?", correct: "Use approved ending balance behavior rather than summing monthly balances", options: ["Use approved ending balance behavior rather than summing monthly balances", "Always sum every month", "Store only a yearly manual value"] },
  { id: "valid-intersection", prompt: "What does a valid-intersection rule do?", correct: "It restricts meaningful member combinations but does not grant security access", options: ["It restricts meaningful member combinations but does not grant security access", "It grants administrator access", "It replaces the dimension hierarchy"] },
  { id: "build-ready", prompt: "What makes the design ready for metadata build?", correct: "Approved setup, dimensions, grains, hierarchies, properties, cube assignments, intersections, controls, owners, and testable acceptance are baselined", options: ["Approved setup, dimensions, grains, hierarchies, properties, cube assignments, intersections, controls, owners, and testable acceptance are baselined", "Developers can invent missing members during loading", "Only the application name is agreed"] },
] as const;
