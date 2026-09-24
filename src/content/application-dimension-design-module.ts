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
    correct: "Custom Planning application for the integrated production and sales use case",
    options: ["Custom Planning application for the integrated production and sales use case", "FreeForm application with no standard Planning dimensions", "Separate unrelated applications for every department"],
  },
  {
    id: "calendar",
    label: "Calendar design",
    correct: "Monthly corporate calendar with weekly production detail handled through an approved connected design",
    options: ["Monthly corporate calendar with weekly production detail handled through an approved connected design", "One undefined time member for every planning process", "Planner-created spreadsheet dates with no shared calendar"],
  },
  {
    id: "currency",
    label: "Currency design",
    correct: "Local entity input with an approved main reporting currency, rate ownership, and multicurrency requirement",
    options: ["Local entity input with an approved main reporting currency, rate ownership, and multicurrency requirement", "Store converted values only and discard local currency", "Let each planner enter an ungoverned currency code"],
  },
  {
    id: "task-flow",
    label: "Planning process control",
    correct: "Select the approved task-flow approach during creation and document ownership because it affects the operating process",
    options: ["Select the approved task-flow approach during creation and document ownership because it affects the operating process", "Ignore task flow until after go-live", "Use email as the only planning process control"],
  },
  {
    id: "naming",
    label: "Cube and naming decisions",
    correct: "Approve stable technical names, business aliases, cube purpose, owners, and naming conventions before creation",
    options: ["Approve stable technical names, business aliases, cube purpose, owners, and naming conventions before creation", "Use descriptions as keys and rename cubes whenever terminology changes", "Allow every workstream to create members without conventions"],
  },
] as const;

export const screenshotWalkthroughs = {
  application: [
    { id: "APP-01", title: "Open the Planning creation flow", path: "EPM landing page → Planning → Select → Create a new application → Start", asset: "01-planning-start.png", capture: "Planning landing page showing the Create a new application card and Start action.", action: "Confirm that the exercise uses a disposable training business process. Do not remove or replace an existing application.", evidence: "Tenant and exercise owner confirmed before entering the wizard.", docUrl: "https://docs.oracle.com/en/cloud/saas/planning-budgeting-cloud/planning-tutorial-creating-the-planning-business-process/index.html" },
    { id: "APP-02", title: "Set general properties", path: "Application Wizard → General Properties", asset: "02-general-properties.png", capture: "Name, description, and Application Type set to Custom.", action: "Enter the approved technical name and description; choose Custom only because the signed architecture requires a highly tailored connected-planning design.", evidence: "Values match the application setup decision sheet." },
    { id: "APP-03", title: "Review application details", path: "Application Wizard → Details", asset: "03-application-details.png", capture: "Period frequency, fiscal calendar, years, rolling forecast, task-flow type, currency, cube names, sandboxes, and Strategic Modeling options.", action: "Compare every setting to the approved decision sheet. Treat cube names, calendar, and currency choices as high-impact configuration, not defaults to accept blindly.", evidence: "Peer review records the selected value and rationale for every field." },
    { id: "APP-04", title: "Define initial dimensions", path: "Application Wizard → Metadata and Custom Dimensions", asset: "04-metadata-dimensions.png", capture: "Required Planning dimensions, initial members/import choices, and custom-dimension rows.", action: "Add only approved custom dimensions and initial metadata. Do not invent dimensions merely because rows are available.", evidence: "Custom dimensions reconcile to the approved inventory and cube participation matrix." },
    { id: "APP-05", title: "Review before creation", path: "Application Wizard → Review", asset: "05-review-create.png", capture: "Review page showing the complete application configuration before Create.", action: "Perform a maker-checker review. In a real tenant, only the authorized service administrator selects Create after approval.", evidence: "Reviewer, decision log reference, and approval status recorded." },
  ],
  hierarchy: [
    { id: "DIM-UI-01", title: "Open the dimension inventory", path: "Home → Application → Overview → Dimensions", asset: "06-dimensions-overview.png", capture: "Dimensions page with cube filter, dimension order, evaluation order, Create, Import, and Export actions.", action: "Filter by cube and reconcile dimension participation, order, and evaluation order to the design workbook.", evidence: "Dimension counts and cube assignments agree with the approved inventory.", docUrl: "https://docs.oracle.com/en/cloud/saas/planning-budgeting-cloud/pfusa/managing_dimensions.html" },
    { id: "DIM-UI-02", title: "Inspect member properties", path: "Dimensions → select a dimension → Edit Member Properties", asset: "07-member-properties.png", capture: "Simplified Dimension Editor showing hierarchy rows and relevant member-property columns.", action: "Inspect parent, alias, data storage, aggregation, data type, account behavior, plan-type validity, security, and formula columns relevant to the selected dimension.", evidence: "A property validation sample covers representative parents, leaves, calculated members, and balance accounts." },
  ],
  intersections: [
    { id: "CUBE-UI-01", title: "Review cubes", path: "Home → Application → Overview → Cubes", asset: "08-cubes-overview.png", capture: "Cubes page showing input and reporting cubes plus the Create action.", action: "Confirm each cube has a distinct business purpose, approved grain, participating dimensions, and controlled data movement. Do not create a cube only to separate teams.", evidence: "Cube inventory reconciles to architecture and the dimension participation matrix.", docUrl: "https://docs.oracle.com/en/cloud/saas/planning-budgeting-cloud/pfusa/viewing_plan_types.html" },
    { id: "IX-UI-01", title: "Create a valid-intersection group", path: "Home → Application → Valid Intersections → Setup → Create", asset: "09-valid-intersections.png", capture: "Valid Intersections Setup showing group name, definition type, anchor dimension, nonanchor dimensions, and rules.", action: "Choose an anchor deliberately, define required nonanchor dimensions, select approved members, and verify how unselected anchor members are treated.", evidence: "Positive and negative test cases prove valid combinations are editable and invalid combinations are read-only.", docUrl: "https://docs.oracle.com/en/cloud/saas/planning-budgeting-cloud/pfusa/creating_valid_intersections.html" },
  ],
} as const;

export const dimensionRoleCases = [
  { id: "DIM-01", need: "Financial measures, drivers, KPIs, and statement rollups", correct: "Account" },
  { id: "DIM-02", need: "Legal entities, responsibility centres, and organizational rollups", correct: "Entity" },
  { id: "DIM-03", need: "SKU, product family, brand, and product category analysis", correct: "Product" },
  { id: "DIM-04", need: "Demand and revenue by sold-to customer", correct: "Customer" },
  { id: "DIM-05", need: "Manufacturing site and operating plant responsibility", correct: "Plant" },
  { id: "DIM-06", need: "Actual, Budget, Forecast, Target, and What-If datasets", correct: "Scenario" },
  { id: "DIM-07", need: "Working, Submitted, Approved, and alternative iterations", correct: "Version" },
] as const;

export const requiredDimensions = ["Account", "Entity", "Scenario", "Version", "Year", "Period", "Currency", "Product", "Customer", "Channel", "Plant", "Production Line", "Cost Element"] as const;

export const grainCases = [
  { id: "GR-01", measure: "Sales Units", correct: "Product × Customer × Channel × Entity × Month × Scenario × Version" },
  { id: "GR-02", measure: "Planned Production", correct: "Product × Plant × Production Line × Week × Scenario × Version" },
  { id: "GR-03", measure: "Ending Finished Goods Inventory", correct: "Product × Plant × Month × Scenario × Version" },
  { id: "GR-04", measure: "Standard Unit Cost", correct: "Product × Plant × Cost Element × Month × Scenario × Version" },
] as const;

export const hierarchyCases = [
  { id: "H-01", label: "Product hierarchy", correct: "All Products → Product Family → Product Line → SKU" },
  { id: "H-02", label: "Entity hierarchy", correct: "Global Company → Region → Legal Entity → Responsibility Centre" },
  { id: "H-03", label: "Plant hierarchy", correct: "All Plants → Country / Region → Plant → Production Line" },
] as const;

export const propertyCases = [
  { id: "P-01", member: "Gross Margin %", correct: "Non-additive percentage account with an approved formula and tested aggregation behavior" },
  { id: "P-02", member: "Ending Finished Goods Inventory", correct: "Balance account using ending time-balance behavior rather than summing months" },
  { id: "P-03", member: "Product Category", correct: "Attribute when it is stable analysis metadata; a base dimension only when it drives input, security, workflow, or changing relationships" },
  { id: "P-04", member: "Product and Entity leaf members", correct: "Stored at approved input intersections; parents use deliberate aggregation or dynamic behavior based on tested design" },
  { id: "P-05", member: "Alternate product rollup", correct: "Use governed shared members or an approved alternate hierarchy while preserving one authoritative base member" },
] as const;

export const planTypeCases = [
  { id: "PT-01", process: "Sales, demand, inventory, cost, and financial planning by month", correct: "PSP_MONTHLY · block-storage calculation cube" },
  { id: "PT-02", process: "Production, capacity, and material requirements by plant and week", correct: "PSP_WEEKLY · block-storage operational calculation cube" },
  { id: "PT-03", process: "Cross-process management analysis with approved aggregated results", correct: "PSP_RPT · aggregate-storage reporting cube fed by controlled data maps" },
] as const;

export const intersectionCases = [
  { id: "IX-01", rule: "Customer input is relevant to sales but not plant-line production.", correct: "Allow approved Customer combinations in PSP_MONTHLY and prevent meaningless Customer entry in PSP_WEEKLY" },
  { id: "IX-02", rule: "Only specific production lines can manufacture each product family.", correct: "Use a Product-family anchor with required Plant / Production Line rules and test both valid and invalid combinations" },
  { id: "IX-03", rule: "Actual operating expense does not use Customer or Channel.", correct: "Keep Opex Actual at Account × Entity × Month × Actual × Final with irrelevant custom dimensions excluded or fixed appropriately" },
  { id: "IX-04", rule: "Approved operational results feed management reporting.", correct: "Map only governed, aggregated results to PSP_RPT and reconcile source and target control totals" },
] as const;

export const dimensionHomeworkMissions = [
  { id: "blueprint", title: "Mission 1 · Defend setup choices", prompt: "Explain the approved application type, calendar, currency, task-flow, cube-name, sandbox, and naming decisions—including consequences of a wrong choice.", output: "Application decision rationale" },
  { id: "grain", title: "Mission 2 · Resolve planning grain", prompt: "Select the lowest meaningful business grain for three planning measures without adding irrelevant dimensionality.", output: "Three grain decisions" },
  { id: "properties", title: "Mission 3 · Protect calculation behavior", prompt: "Choose the member-property treatment that preserves aggregation, time balance, and hierarchy integrity.", output: "Three property decisions" },
  { id: "intersections", title: "Mission 4 · Prevent meaningless combinations", prompt: "Choose the cube or valid-intersection response that protects each business rule without confusing it with security.", output: "Three intersection controls" },
  { id: "readout", title: "Mission 5 · Run the design review", prompt: "Present the design baseline, evidence, unresolved decisions, risks, owners, and recommendation for metadata build.", output: "Design-review readout" },
] as const;

export const homeworkGrainCases = [
  { id: "HW-GR-01", scenario: "Regional sales managers adjust unit demand by customer and channel each month.", correct: "Product × Customer × Channel × Entity × Month × Scenario × Version", options: ["Product × Customer × Channel × Entity × Month × Scenario × Version", "Product × Plant × Production Line × Week", "Account × Entity × Year only"] },
  { id: "HW-GR-02", scenario: "Plant schedulers compare weekly line capacity with required production.", correct: "Product × Plant × Production Line × Week × Scenario × Version", options: ["Product × Plant × Production Line × Week × Scenario × Version", "Product × Customer × Channel × Month", "Entity × Account × Quarter only"] },
  { id: "HW-GR-03", scenario: "Finance reconciles standard cost by product, plant, and cost element.", correct: "Product × Plant × Cost Element × Month × Scenario × Version", options: ["Product × Plant × Cost Element × Month × Scenario × Version", "Customer × Channel × Week", "Product Category attribute only"] },
] as const;

export const homeworkPropertyCases = [
  { id: "HW-P-01", scenario: "Quarter-end inventory must equal the final month, not the sum of all months.", correct: "Use balance / ending time behavior and validate quarter rollup", options: ["Use balance / ending time behavior and validate quarter rollup", "Use flow and sum every month", "Store the quarter total manually"] },
  { id: "HW-P-02", scenario: "Gross Margin % must remain mathematically correct at parent levels.", correct: "Use an approved non-additive formula and test aggregation", options: ["Use an approved non-additive formula and test aggregation", "Add child percentages together", "Enter every parent percentage manually"] },
  { id: "HW-P-03", scenario: "One SKU appears in an alternate management rollup without becoming a second product.", correct: "Use a governed shared member or alternate hierarchy linked to the same base member", options: ["Use a governed shared member or alternate hierarchy linked to the same base member", "Create an unrelated duplicate SKU", "Change the base SKU name for each report"] },
] as const;

export const homeworkIntersectionCases = [
  { id: "HW-IX-01", scenario: "Only selected product families are produced on Line 03.", correct: "Define and test Product-family × Plant × Production Line valid-intersection rules", options: ["Define and test Product-family × Plant × Production Line valid-intersection rules", "Grant administrator access to everyone", "Allow every combination and clean errors later"] },
  { id: "HW-IX-02", scenario: "Customer is not relevant to the weekly production cube.", correct: "Exclude Customer from that cube or fix it to an approved neutral member where the design requires", options: ["Exclude Customer from that cube or fix it to an approved neutral member where the design requires", "Enable every dimension in every cube", "Use customer security to change production grain"] },
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
