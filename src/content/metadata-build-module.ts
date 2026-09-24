import type { LessonDefinition } from "@/types/course";

export const metadataBuildLessons = [
  { id: "build-readiness", number: "01", title: "Build readiness and controls", duration: "14 min", type: "concept" },
  { id: "prepare-files", number: "02", title: "Prepare and validate metadata files", duration: "28 min", type: "simulation" },
  { id: "manual-build", number: "03", title: "Build a controlled member manually", duration: "24 min", type: "guided-screenshot" },
  { id: "bulk-import", number: "04", title: "Run a controlled metadata import", duration: "30 min", type: "guided-screenshot" },
  { id: "reject-recovery", number: "05", title: "Diagnose rejects and rerun safely", duration: "26 min", type: "simulation" },
  { id: "refresh-validate", number: "06", title: "Refresh and smoke-test the application", duration: "24 min", type: "guided-screenshot" },
  { id: "reconcile-baseline", number: "07", title: "Reconcile, export, and baseline", duration: "24 min", type: "evidence" },
  { id: "metadata-homework", number: "08", title: "Applied metadata build lab", duration: "35 min", type: "simulation" },
  { id: "metadata-handoff", number: "09", title: "Build evidence and exit gate", duration: "20 min", type: "exit-gate" },
] as const satisfies readonly LessonDefinition[];

export type MetadataBuildLessonId = (typeof metadataBuildLessons)[number]["id"];

export const readinessControls = [
  "Approved Phase 06 hierarchy and member-property baseline",
  "Authorized training environment and named builder / reviewer",
  "Pre-build dimension export and member control totals",
  "Load sequence, rollback approach, and change-window approval",
  "Representative post-build smoke tests and evidence location",
] as const;

export const fileQualityCases = [
  { id: "FQ-01", issue: "A Product row points to parent Missing_Line, which is absent from the baseline and file.", correct: "Reject from the load set; confirm the approved parent or correct the source mapping before import", options: ["Reject from the load set; confirm the approved parent or correct the source mapping before import", "Create Missing_Line automatically without approval", "Load the child at the root and fix it after go-live"] },
  { id: "FQ-02", issue: "REF100 appears twice with different aliases.", correct: "Quarantine the duplicate and resolve the authoritative member record with the data owner", options: ["Quarantine the duplicate and resolve the authoritative member record with the data owner", "Keep both rows because aliases differ", "Rename one technical member during import"] },
  { id: "FQ-03", issue: "A source extract is UTF-8 and comma-delimited, but its columns do not match the tenant export.", correct: "Map it into a copy of the tenant-exported template and validate headers before import", options: ["Map it into a copy of the tenant-exported template and validate headers before import", "Import it directly because all Oracle tenants use identical columns", "Delete unfamiliar tenant columns"] },
  { id: "FQ-04", issue: "A child row is listed before its approved parent in the prepared file.", correct: "Sequence parent records before children and retain a repeatable sort rule", options: ["Sequence parent records before children and retain a repeatable sort rule", "Change every child into a root", "Ignore hierarchy order and rely on manual repair"] },
] as const;

export const manualBuildCases = [
  { id: "MB-01", label: "Member identity", correct: "Use the approved stable technical name REF100 and business alias 100 L Refrigerator", options: ["Use the approved stable technical name REF100 and business alias 100 L Refrigerator", "Use the changing description as the technical key", "Create a second member whenever the alias changes"] },
  { id: "MB-02", label: "Hierarchy placement", correct: "Place REF100 below Refrigeration exactly as approved", options: ["Place REF100 below Refrigeration exactly as approved", "Place it at the root for convenience", "Choose any parent with a similar label"] },
  { id: "MB-03", label: "Properties", correct: "Apply only approved storage, aggregation, cube-validity, and description values", options: ["Apply only approved storage, aggregation, cube-validity, and description values", "Accept every default without review", "Enable the member in every cube"] },
  { id: "MB-04", label: "Evidence", correct: "Record before/after values, builder, reviewer, timestamp, and design reference", options: ["Record before/after values, builder, reviewer, timestamp, and design reference", "Use only a screenshot with no context", "Rely on the builder's memory"] },
] as const;

export const importDecisionCases = [
  { id: "IM-01", situation: "One approved member is being demonstrated in a sandbox.", correct: "Use the dimension editor, capture the property review, and do not scale the manual method to a production-sized hierarchy" },
  { id: "IM-02", situation: "Four governed dimensions contain hundreds of approved rows.", correct: "Use separate dimension files derived from tenant exports, import in dependency order, and retain job evidence" },
  { id: "IM-03", situation: "The source feed will recur every month.", correct: "Stabilize and test the manual job first, then automate with controlled Inbox/Outbox or integration tooling and monitoring" },
  { id: "IM-04", situation: "A file includes an unapproved parent and an extra property column.", correct: "Stop before import; resolve the parent and map only supported, approved tenant columns" },
] as const;

export const rejectCases = [
  { id: "RJ-01", symptom: "Unknown parent", correct: "Compare the rejected child and parent with the signed hierarchy; correct the source or load the approved parent first" },
  { id: "RJ-02", symptom: "Duplicate member record", correct: "Identify the authoritative row, remove the duplicate from the controlled source, and rerun only the corrected scope" },
  { id: "RJ-03", symptom: "Invalid or unsupported property value", correct: "Compare the value with the tenant export and Oracle-supported options; correct the mapping rather than inventing a value" },
  { id: "RJ-04", symptom: "Job completed with warnings or an error file", correct: "Treat the load as unproved; download the log/error file, reconcile accepted and rejected rows, correct, and rerun" },
] as const;

export const refreshCases = [
  { id: "RF-01", situation: "Structural metadata changed and no active planning window is in progress.", correct: "Run a controlled Refresh Database with approved user/request handling, Validate Metadata, and retained job evidence" },
  { id: "RF-02", situation: "Planners are entering forecast adjustments during the proposed refresh window.", correct: "Do not refresh; coordinate a change window and communicate expected impact before proceeding" },
  { id: "RF-03", situation: "Refresh completed successfully.", correct: "Verify the job result, hierarchy, properties, form visibility, representative entry, aggregation, and retrieval before sign-off" },
  { id: "RF-04", situation: "Refresh failed after an import.", correct: "Preserve logs, stop downstream work, compare the change set with the pre-build export, correct or restore under the rollback plan, then retest" },
] as const;

export const reconciliationControls = [
  "Root, parent, leaf, and total member counts by dimension",
  "Parent-child paths and orphan / duplicate checks",
  "Aliases, descriptions, storage, aggregation, data type, and cube validity",
  "Representative form visibility, writable intersections, and aggregation behavior",
  "Successful import and refresh jobs with logs or error-file disposition",
  "Post-build export compared with the approved baseline and archived with version details",
] as const;

export const metadataHomeworkMissions = [
  { id: "file", title: "Mission 1 · Qualify the source files", output: "Four quality decisions" },
  { id: "sequence", title: "Mission 2 · Build the run sequence", output: "Controlled execution order" },
  { id: "rejects", title: "Mission 3 · Resolve load rejects", output: "Four recovery decisions" },
  { id: "refresh", title: "Mission 4 · Make refresh go / no-go decisions", output: "Four operational decisions" },
  { id: "readout", title: "Mission 5 · Present the build result", output: "Build-review readout" },
] as const;

export const buildSequence = [
  "Confirm approved scope and change window",
  "Export target dimensions and capture pre-build counts",
  "Map and validate staged rows against tenant headers",
  "Import in dependency order and inspect job details",
  "Correct rejects and rerun only the controlled scope",
  "Refresh the database when structural changes require it",
  "Smoke-test, reconcile, export, and baseline the result",
] as const;

export const metadataArtifacts = [
  "Approved metadata build scope and change record",
  "Tenant-derived import files and source-to-target mapping",
  "Pre-build exports, counts, and rollback reference",
  "Import job logs and accepted / rejected row reconciliation",
  "Corrective-action and controlled-rerun evidence",
  "Refresh job result and post-refresh smoke-test evidence",
  "Post-build exports, property samples, and control totals",
  "Build summary, open items, owners, reviewer, and sign-off",
] as const;

export const metadataKnowledgeQuestions = [
  { id: "template", prompt: "What is the safest starting point for a tenant-ready metadata file?", correct: "A fresh export from the target dimension, mapped to the approved staged source", options: ["A fresh export from the target dimension, mapped to the approved staged source", "A generic internet CSV with guessed headers", "Any spreadsheet that contains member names"] },
  { id: "success", prompt: "Does a successful import job alone prove the metadata build is correct?", correct: "No; reconcile counts, hierarchy, properties, refresh results, and representative application behavior", options: ["No; reconcile counts, hierarchy, properties, refresh results, and representative application behavior", "Yes; job success replaces testing", "Yes, if the file is small"] },
  { id: "reject", prompt: "What is the correct response to a partially rejected load?", correct: "Preserve evidence, reconcile accepted and rejected rows, correct the governed source, and rerun the controlled scope", options: ["Preserve evidence, reconcile accepted and rejected rows, correct the governed source, and rerun the controlled scope", "Ignore rejected rows", "Manually add unknown values without approval"] },
  { id: "refresh", prompt: "When should structural changes be refreshed?", correct: "In an approved window with user/request controls, metadata validation, job evidence, and post-refresh tests", options: ["In an approved window with user/request controls, metadata validation, job evidence, and post-refresh tests", "At any time while planners are active", "Only after go-live"] },
  { id: "baseline", prompt: "What makes the metadata build ready for the next phase?", correct: "The approved scope is loaded, refreshed where required, reconciled, exported, evidenced, reviewed, and unresolved items are controlled", options: ["The approved scope is loaded, refreshed where required, reconciled, exported, evidenced, reviewed, and unresolved items are controlled", "The hierarchy looks reasonable", "One administrator can open the application"] },
] as const;

export const metadataScreenshots = {
  manual: [
    { id: "MB-UI-01", title: "Open the target dimension", path: "Home → Application → Overview → Dimensions → Product", asset: "01-dimensions-overview.png", capture: "Dimensions inventory and Product dimension selected in the training tenant.", action: "Confirm the target dimension and cube context against the approved build scope.", evidence: "Dimension, cube, builder, date, and design reference recorded.", docUrl: "https://docs.oracle.com/en/cloud/saas/planning-budgeting-cloud/pfusa/managing_dimensions.html" },
    { id: "MB-UI-02", title: "Add and review a member", path: "Dimensions → Product → Edit Member Properties → Add Child", asset: "02-dimension-editor-add-member.png", capture: "New member row showing parent, name, alias, description, and relevant properties.", action: "Create only the approved REF100 training member and review its high-impact properties before Save.", evidence: "Maker-checker comparison agrees with the Phase 06 specification." },
  ],
  import: [
    { id: "IM-UI-01", title: "Export the tenant template", path: "Application → Overview → Dimensions → Export → Create", asset: "03-export-metadata.png", capture: "Export setup showing selected dimension, location, and delimiter.", action: "Export the target dimension and use it as the tenant-specific header/property reference.", evidence: "Pre-build export is versioned and its member counts recorded.", docUrl: "https://docs.oracle.com/en/cloud/saas/planning-budgeting-cloud/pfusa/exporting_metadata.html" },
    { id: "IM-UI-02", title: "Select governed import files", path: "Application → Overview → Dimensions → Import → Create", asset: "04-import-metadata-files.png", capture: "Metadata Import page with Local or Inbox/Outbox location and selected dimension files.", action: "Choose only approved, validated dimension files; one file represents one artifact and uses tenant-derived headers.", evidence: "File names, hashes/version, row counts, and load order match the run sheet.", docUrl: "https://docs.oracle.com/en/cloud/saas/planning-budgeting-cloud/pfusa/imp_meta.html" },
    { id: "IM-UI-03", title: "Review import options", path: "Metadata Import → Options", asset: "05-import-options.png", capture: "Import options and the Refresh Database after successful import choice.", action: "Select options deliberately. For training, separate import and refresh when that makes evidence and troubleshooting clearer.", evidence: "Chosen options and rationale are recorded before running the job." },
    { id: "IM-UI-04", title: "Inspect the metadata job", path: "Application → Jobs → Metadata Import job", asset: "06-metadata-job-status.png", capture: "Job details showing status, start/end time, messages, and downloadable evidence.", action: "Open the job result even when status is successful; inspect messages and preserve the output.", evidence: "Job ID, status, duration, warnings, accepted rows, and evidence path captured." },
  ],
  recovery: [
    { id: "RJ-UI-01", title: "Review the error file", path: "Application → Jobs → Metadata Import → Error file / messages", asset: "07-error-file-review.png", capture: "Sanitized job detail or error file showing rejected metadata rows and reasons.", action: "Classify each rejection, trace it to the governed source, and document the correction. Do not patch unapproved members directly in the tenant.", evidence: "Rejected count plus corrected, deferred, and approved-exception counts reconcile." },
  ],
  refresh: [
    { id: "RF-UI-01", title: "Run Refresh Database", path: "Application → Overview → Actions → Refresh Database", asset: "08-refresh-database.png", capture: "Refresh Database page with before/after options including Validate Metadata.", action: "Use the approved change window and user/request controls; review validation options before Refresh.", evidence: "Refresh job ID, operator, window, options, result, and log location recorded.", docUrl: "https://docs.oracle.com/en/cloud/saas/planning-budgeting-cloud/pfusa/refreshing_application_databases.html" },
    { id: "RF-UI-02", title: "Verify the built structure", path: "Application → Overview → Dimensions and representative training form", asset: "09-post-refresh-verification.png", capture: "Post-refresh hierarchy plus one representative form or retrieval proving visibility and behavior.", action: "Verify members, parentage, aliases, properties, writable intersections, and one aggregation/retrieval result.", evidence: "Expected-versus-actual smoke-test results and reviewer outcome attached." },
  ],
} as const;
