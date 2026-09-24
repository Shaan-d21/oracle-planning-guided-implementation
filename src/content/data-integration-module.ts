import type { LessonDefinition } from "@/types/course";

export const dataIntegrationLessons = [
  { id: "integration-foundations", number: "01", title: "Integration foundations and controls", duration: "14 min", type: "concept" },
  { id: "source-contract", number: "02", title: "Source contract and file readiness", duration: "28 min", type: "simulation" },
  { id: "configure-integration", number: "03", title: "Configure a file-based integration", duration: "30 min", type: "guided-screenshot" },
  { id: "dimension-time-mapping", number: "04", title: "Map dimensions, periods, and category", duration: "30 min", type: "guided-screenshot" },
  { id: "member-mapping", number: "05", title: "Map and transform source members", duration: "30 min", type: "guided-screenshot" },
  { id: "run-monitor", number: "06", title: "Run, inspect, and load safely", duration: "28 min", type: "guided-screenshot" },
  { id: "reject-reconcile", number: "07", title: "Resolve rejects and reconcile totals", duration: "26 min", type: "evidence" },
  { id: "integration-homework", number: "08", title: "Applied data integration lab", duration: "35 min", type: "simulation" },
  { id: "integration-handoff", number: "09", title: "Integration evidence and exit gate", duration: "20 min", type: "exit-gate" },
] as const satisfies readonly LessonDefinition[];

export type DataIntegrationLessonId = (typeof dataIntegrationLessons)[number]["id"];

export const integrationReadinessControls = [
  "Approved source owner, target cube, business grain, and load frequency",
  "Phase 07 target members and representative writable intersections verified",
  "Source-to-target contract with data types, required fields, and control totals",
  "Authorized training location, category, period range, and isolated target POV",
  "Import, mapping, export, reconciliation, failure, rerun, and evidence controls",
] as const;

export const sourceContractCases = [
  { id: "SC-01", issue: "The source file contains SALES_QTY, but the contract does not identify its target Account member.", correct: "Stop preparation and obtain an approved measure-to-Account mapping before loading", options: ["Stop preparation and obtain an approved measure-to-Account mapping before loading", "Load it to the first available account", "Create an account during the data load"] },
  { id: "SC-02", issue: "The file has eight records and a signed source amount total of 800.", correct: "Record both controls and reconcile them through staging, validation, export, and Planning", options: ["Record both controls and reconcile them through staging, validation, export, and Planning", "Check only the final total", "Ignore record counts if the job succeeds"] },
  { id: "SC-03", issue: "A row contains a nonnumeric Amount and another uses source Product P999 with no approved mapping.", correct: "Quarantine both defects before export and assign them to the source or mapping owner", options: ["Quarantine both defects before export and assign them to the source or mapping owner", "Convert the amount to zero and map P999 randomly", "Delete both rows without recording them"] },
  { id: "SC-04", issue: "Two rows have the same business key and amount.", correct: "Confirm whether they are legitimate transactions or a duplicate before aggregation", options: ["Confirm whether they are legitimate transactions or a duplicate before aggregation", "Assume duplicate rows are always correct", "Let Planning decide which row to keep"] },
] as const;

export const configurationCases = [
  { id: "CFG-01", situation: "A repeatable historical-sales file will load to the PSP_MONTHLY cube.", correct: "Create a governed file-based integration with a stable name, location, source file profile, Planning target, category, and owner", options: ["Create a governed file-based integration with a stable name, location, source file profile, Planning target, category, and owner", "Create a new anonymous integration for every run", "Load directly to whichever cube is open"] },
  { id: "CFG-02", situation: "The same location is proposed for unrelated source feeds with different mappings and access owners.", correct: "Use separate controlled locations when mapping ownership or access must be isolated", options: ["Use separate controlled locations when mapping ownership or access must be isolated", "Force every feed into one location", "Give every user access to all locations"] },
  { id: "CFG-03", situation: "The clean training file is comma-delimited with a header row.", correct: "Configure and preview the delimiter and header, then verify column names and representative values before saving", options: ["Configure and preview the delimiter and header, then verify column names and representative values before saving", "Skip preview because the file opens in Excel", "Guess the column positions"] },
  { id: "CFG-04", situation: "A production ERP direct connector may be required later.", correct: "Prove the file-based pattern and controls first; design the connector separately with credentials, filters, ownership, and support", options: ["Prove the file-based pattern and controls first; design the connector separately with credentials, filters, ownership, and support", "Store credentials in the training file", "Replace the source contract with connector defaults"] },
] as const;

export const dimensionMappingCases = [
  { id: "DM-01", situation: "MEASURE_CODE identifies the Planning measure.", correct: "Map MEASURE_CODE to Account and validate every distinct source code" },
  { id: "DM-02", situation: "ENTITY_CODE, PRODUCT_CODE, CUSTOMER_CODE, and CHANNEL_CODE identify business grain.", correct: "Map each source column to its corresponding target dimension; do not collapse the approved grain" },
  { id: "DM-03", situation: "VERSION is absent because all records are final actuals.", correct: "Use an approved constant/default target value only when the contract proves the source is single-valued" },
  { id: "DM-04", situation: "Source period 2026-01 must load to Jan in FY26.", correct: "Include the required time fields and use an explicit period mapping when source and target labels differ" },
  { id: "DM-05", situation: "Source scenario code ACT must load to Planning Scenario Actual.", correct: "Use a governed category mapping whose target member exists in Planning" },
] as const;

export const memberMappingCases = [
  { id: "MM-01", situation: "Product P100 must load to REF100.", correct: "Explicit mapping" },
  { id: "MM-02", situation: "Source entities beginning IN_WEST_ share one approved target only for this feed.", correct: "Like mapping with a reviewed pattern and processing order" },
  { id: "MM-03", situation: "Numeric account codes 4100 through 4199 map to one governed sales group.", correct: "Between mapping only when the complete range has one approved meaning" },
  { id: "MM-04", situation: "A controlled list of noncontiguous channel codes maps to Retail.", correct: "In mapping with the approved source list" },
  { id: "MM-05", situation: "Source Year and Period together determine two target time dimensions.", correct: "Use multi-dimensional mapping only when the signed design requires the combined relationship" },
  { id: "MM-06", situation: "Source and target values already match for a conformed dimension.", correct: "Use a deliberate passthrough/copy pattern and still validate source values against target metadata" },
] as const;

export const runDecisionCases = [
  { id: "RUN-01", situation: "This is the first execution or the source file changed.", correct: "Select Import Source so the current file is imported, mapped, and validated" },
  { id: "RUN-02", situation: "The source has not changed, but member mappings were corrected.", correct: "Use Recalculate to reprocess staged data without importing the unchanged source again" },
  { id: "RUN-03", situation: "Mappings are not yet proven and no Planning data should change.", correct: "Use No Export while inspecting staged and validated results" },
  { id: "RUN-04", situation: "Validated training data should update an isolated target POV without clearing unrelated data.", correct: "Use the approved Merge mode and verify the exact runtime period, category, cube, and file" },
  { id: "RUN-05", situation: "A proposed Replace run would clear the target POV before loading.", correct: "Treat Replace as high-impact: require explicit scope approval, backup/rollback, control totals, and an isolated change window" },
] as const;

export const rejectCases = [
  { id: "IR-01", symptom: "Product P999 is unmapped.", correct: "Confirm whether P999 should map to an existing approved Product or be rejected for source/master-data correction" },
  { id: "IR-02", symptom: "The source period is 2026-13.", correct: "Reject the invalid period and correct it at source; do not force it into a valid target month" },
  { id: "IR-03", symptom: "Amount contains text instead of a number.", correct: "Reject the row, correct the source data type, reload the controlled file, and preserve defect evidence" },
  { id: "IR-04", symptom: "Process Details shows rejected target cells after export.", correct: "Download the validation output, identify invalid members or protected intersections, correct the governed cause, and rerun the required stage" },
  { id: "IR-05", symptom: "The job is successful but Planning total is 780 versus source total 800.", correct: "Do not sign off; reconcile filtered, skipped, mapped, rejected, and target records until the 20 difference is explained" },
] as const;

export const reconciliationControls = [
  "Source file name/version, record count, amount total, and owner approval",
  "Imported, skipped, mapped, unmapped, validated, exported, and rejected record counts",
  "Control totals by Entity, Product, Account, Period, and Scenario/category",
  "Process ID, stage statuses, logs, validation report, and defect disposition",
  "Planning retrieval proving the expected target POV, values, and aggregation",
  "Rerun/idempotency result showing no unexplained duplication or stale records",
] as const;

export const integrationSequence = [
  "Approve the source contract, target grain, and run controls",
  "Profile the file and record source counts and totals",
  "Configure and preview the file-based integration",
  "Map dimensions, time, category, constants, and members",
  "Import to staging with No Export and inspect validation results",
  "Correct mappings or source defects and reprocess the controlled scope",
  "Export to the approved target POV and inspect Process Details",
  "Reconcile Planning, archive evidence, and approve automation readiness",
] as const;

export const integrationHomeworkMissions = [
  { id: "contract", title: "Mission 1 · Qualify the source contract", output: "Four source-control decisions" },
  { id: "mapping", title: "Mission 2 · Select mapping strategies", output: "Six mapping decisions" },
  { id: "run", title: "Mission 3 · Build the safe run sequence", output: "Eight confirmed run steps" },
  { id: "rejects", title: "Mission 4 · Recover and reconcile", output: "Five corrective decisions" },
  { id: "readout", title: "Mission 5 · Present the integration result", output: "Integration-review readout" },
] as const;

export const integrationArtifacts = [
  "Approved source-to-target contract and data ownership",
  "Versioned source file, profile results, and source control totals",
  "Integration definition, location, file profile, target cube, and option evidence",
  "Dimension, period, category, constant, expression, and member mapping baseline",
  "Import, validation, recalculate, and export Process Details with logs",
  "Reject register, root cause, correction, rerun, and residual disposition",
  "Source-to-staging-to-Planning reconciliation and representative retrieval",
  "Runbook, automation handoff, open items, owners, reviewer, and sign-off",
] as const;

export const integrationKnowledgeQuestions = [
  { id: "stage", prompt: "Why run with No Export before the first target load?", correct: "It allows imported and mapped data to be inspected without changing Planning", options: ["It allows imported and mapped data to be inspected without changing Planning", "It permanently deletes the source", "It replaces member mappings"] },
  { id: "recalculate", prompt: "When is Recalculate appropriate?", correct: "When staged source data is unchanged but mappings need to be reprocessed", options: ["When staged source data is unchanged but mappings need to be reprocessed", "Whenever the source file changed", "To refresh metadata"] },
  { id: "replace", prompt: "Why is Replace mode high-impact?", correct: "It clears data for the target POV before loading the new data", options: ["It clears data for the target POV before loading the new data", "It changes the application logo", "It only renames the integration"] },
  { id: "mapping", prompt: "What controls member-mapping precedence?", correct: "Specificity and governed processing order, proven with representative positive and negative values", options: ["Specificity and governed processing order, proven with representative positive and negative values", "Alphabetical order of aliases", "The learner's browser settings"] },
  { id: "complete", prompt: "What proves the integration build is complete?", correct: "Source, staging, mapping, validation, export, rejects, Planning totals, rerun behavior, logs, ownership, and evidence reconcile", options: ["Source, staging, mapping, validation, export, rejects, Planning totals, rerun behavior, logs, ownership, and evidence reconcile", "The job icon is green", "The file uploaded successfully"] },
] as const;

export const integrationScreenshots = {
  configure: [
    { id: "DI-UI-01", title: "Open Data Integration", path: "Home → Application → Data Exchange → Data Integration", asset: "01-data-integration-home.png", capture: "Data Integration home page showing existing integrations and the Create Integration action.", action: "Confirm the training environment, target application, naming convention, and authorized builder before creating anything.", evidence: "Environment, builder, design reference, and integration name recorded.", docUrl: "https://docs.oracle.com/en/cloud/saas/enterprise-performance-management-common/diepm/integrations_workflow_106x6b4fa803.html" },
    { id: "DI-UI-02", title: "Define the integration", path: "Data Integration → Add → Create Integration → General", asset: "02-integration-general.png", capture: "General page showing name, description, location, file source, Planning target, and category.", action: "Create the governed historical-sales integration and select the approved source, target, location, and category.", evidence: "General definition agrees with the source contract and build runbook." },
    { id: "DI-UI-03", title: "Preview the source file", path: "Create/Edit Integration → General → File options / Preview", asset: "03-file-preview.png", capture: "File preview showing delimiter, header, column names, and representative records.", action: "Verify encoding, delimiter, header, column order, required fields, and representative values before Save.", evidence: "Preview reconciles to the versioned source file and profile results.", docUrl: "https://docs.oracle.com/en/cloud/saas/enterprise-performance-management-common/diepm/integrations_file_based_options_122x988e2c1e.html" },
  ],
  mapping: [
    { id: "DI-UI-04", title: "Map source columns to target dimensions", path: "Integration → Map Dimensions", asset: "04-map-dimensions.png", capture: "Map Dimensions page showing file columns mapped to Planning dimensions and approved expressions/constants.", action: "Map each source field to the approved target dimension; use constants only for contractually single-valued dimensions.", evidence: "Every required target dimension is sourced, defaulted, or explicitly excluded with rationale.", docUrl: "https://docs.oracle.com/en/cloud/saas/enterprise-performance-management-common/diepm/integrations_dimensions_100x92489fca.html" },
    { id: "DI-UI-05", title: "Define period mappings", path: "Data Integration → Actions → Setup → Period Mapping", asset: "05-period-mapping.png", capture: "Period Mapping page showing source period 2026-01 aligned to the approved Planning year and month.", action: "Use default processing only when calendars and labels conform; otherwise create and review explicit mappings.", evidence: "Boundary periods and invalid periods have positive and negative tests.", docUrl: "https://docs.oracle.com/en/cloud/saas/enterprise-performance-management-common/diepm/integrations_source_mappings.html" },
    { id: "DI-UI-06", title: "Define category mapping", path: "Data Integration → Actions → Setup → Category Mapping", asset: "06-category-mapping.png", capture: "Category Mapping page showing the integration category aligned with target Scenario Actual.", action: "Confirm the target Scenario member exists and that the category is correct for this feed.", evidence: "Category, target Scenario, frequency, owner, and review result recorded.", docUrl: "https://docs.oracle.com/en/cloud/saas/enterprise-performance-management-common/diepm/integrations_category_map.html" },
  ],
  members: [
    { id: "DI-UI-07", title: "Create and validate member mappings", path: "Integration → Map Members → select dimension → Edit", asset: "07-map-members.png", capture: "Map Members page showing explicit and pattern mappings, target members, and processing order.", action: "Create only mappings supported by the approved workbook; test representative matched, unmatched, and overlapping values.", evidence: "Exported mapping baseline, reviewer, test values, and unmapped-member result retained.", docUrl: "https://docs.oracle.com/en/cloud/saas/enterprise-performance-management-common/diepm/integrations_member_mappings_108x9bb34714.html" },
  ],
  run: [
    { id: "DI-UI-08", title: "Review runtime options", path: "Data Integration → select integration → Run → Options", asset: "08-run-integration-options.png", capture: "Run Integration options showing period, category, import/recalculate choice, import mode, Export to Target, export mode, and file.", action: "For the first pass, import the controlled file with No Export. Confirm the exact runtime POV before Run.", evidence: "Runtime values, file version, operator, reviewer, and expected controls recorded.", docUrl: "https://docs.oracle.com/en/cloud/saas/enterprise-performance-management-common/diepm/integrations_run_104x80e42d74_106x80e435c7.html" },
    { id: "DI-UI-09", title: "Inspect staged data", path: "Data Integration → Workbench / integration results", asset: "09-workbench-staged-data.png", capture: "Staged rows showing source values, mapped target values, validation status, and amounts.", action: "Reconcile counts and totals, review mappings, and resolve every unmapped or invalid row before target export.", evidence: "Submitted, imported, mapped, validated, skipped, and rejected controls balance." },
    { id: "DI-UI-10", title: "Inspect Process Details", path: "Data Integration → Process Details → select process", asset: "10-process-details.png", capture: "Process Details showing process ID, step statuses, start/end times, logs, and validation output.", action: "Open every stage and preserve the log or validation output before it is purged. A green parent status alone is insufficient.", evidence: "Process ID, stage results, duration, log file, rejection count, and disposition captured.", docUrl: "https://docs.oracle.com/en/cloud/saas/enterprise-performance-management-common/erpia/erpi_process_details.html" },
    { id: "DI-UI-11", title: "Verify the Planning target", path: "Planning → representative validation form or Smart View retrieval", asset: "11-planning-reconciliation.png", capture: "Target retrieval showing the approved Actual POV and reconciled values after export.", action: "Retrieve the exact target POV and compare record/value controls by major dimensions; rerun once to test repeatability.", evidence: "Source-to-Planning reconciliation, aggregation test, and reviewer outcome attached." },
  ],
} as const;
