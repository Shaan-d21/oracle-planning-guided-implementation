export const userAcceptanceTestingLessons = [
  { id: "uat-foundations", number: "01", title: "UAT purpose, scope, and readiness", duration: "20 min", type: "concept" },
  { id: "uat-scenarios", number: "02", title: "Design business scenarios and acceptance criteria", duration: "30 min", type: "assessment" },
  { id: "uat-users-data", number: "03", title: "Prepare business users, roles, and data", duration: "28 min", type: "wizard" },
  { id: "uat-planner-journey", number: "04", title: "Execute the planner journey", duration: "36 min", type: "simulation" },
  { id: "uat-review-approval", number: "05", title: "Validate review, rejection, and approval", duration: "32 min", type: "assessment" },
  { id: "uat-issues-retest", number: "06", title: "Triage issues, retest, and protect scope", duration: "30 min", type: "assessment" },
  { id: "uat-evidence-acceptance", number: "07", title: "Evaluate evidence and acceptance", duration: "28 min", type: "assessment" },
  { id: "uat-walkthrough", number: "08", title: "Execute the essential Oracle walkthrough", duration: "26 min", type: "guided-screenshot" },
  { id: "uat-homework", number: "09", title: "Applied business acceptance lab", duration: "48 min", type: "assessment" },
  { id: "uat-exit-gate", number: "10", title: "Business sign-off and exit gate", duration: "24 min", type: "exit-gate" },
] as const;

export type UserAcceptanceTestingLessonId = (typeof userAcceptanceTestingLessons)[number]["id"];

export const uatReadinessControls = [
  "Phases 19 and 20 have approved the functionally integrated and performance-tested release candidate, with all UAT conditions and known limitations visible",
  "Business process owners approve the UAT scope, critical journeys, acceptance criteria, entry and exit rules, issue severity, decision rights, schedule, and communication route",
  "Named planners, reviewers, approvers, finance users, reporting users, and support observers have representative access and understand that business users execute and decide",
  "The UAT environment, release, master data, actuals, opening balances, assumptions, user variables, workflow state, expected controls, reset, and evidence pack are frozen",
  "Training, scripts, support model, issue triage, fix deployment, retest, regression, daily status, sign-off format, deployment conditions, and contingency are ready",
] as const;

export const uatAcceptanceCases = [
  { id: "AC-01", issue: "The acceptance criterion says the sales plan should look correct.", correct: "State the business action, role, controlled inputs, expected calculation and output, tolerance, workflow result, evidence, and approver", options: ["State the business action, role, controlled inputs, expected calculation and output, tolerance, workflow result, evidence, and approver", "Let the tester decide during execution", "Reuse a technical unit-test assertion"] },
  { id: "AC-02", issue: "The UAT catalogue lists individual screens but no complete monthly-planning journey.", correct: "Organize scripts around business outcomes that cross forms, rules, handoffs, approvals, Smart View, and management reporting", options: ["Organize scripts around business outcomes that cross forms, rules, handoffs, approvals, Smart View, and management reporting", "Add more screenshots of each screen", "Test navigation only"] },
  { id: "AC-03", issue: "A business owner requests a new capability during UAT.", correct: "Record it as a change request, assess release impact separately, and do not fail an approved requirement unless the existing solution violates acceptance criteria", options: ["Record it as a change request, assess release impact separately, and do not fail an approved requirement unless the existing solution violates acceptance criteria", "Build it immediately inside UAT", "Mark the current function defective"] },
  { id: "AC-04", issue: "A non-critical formatting preference is treated the same as an incorrect financial statement.", correct: "Use approved severity and business-impact criteria so acceptance decisions reflect material risk", options: ["Use approved severity and business-impact criteria so acceptance decisions reflect material risk", "Classify every preference as critical", "Ignore all usability feedback"] },
] as const;

export const uatParticipantCases = [
  { id: "USR-01", issue: "Consultants execute every UAT script while business users watch.", correct: "Business representatives execute their assigned journeys and make acceptance decisions; the project team supports without steering results", options: ["Business representatives execute their assigned journeys and make acceptance decisions; the project team supports without steering results", "Continue because consultants are faster", "Let administrators sign for the business"] },
  { id: "USR-02", issue: "All testers share one Service Administrator account.", correct: "Use named representative roles and user variables so access, ownership, approvals, Smart View, and audit evidence reflect actual operations", options: ["Use named representative roles and user variables so access, ownership, approvals, Smart View, and audit evidence reflect actual operations", "Share the administrator account", "Disable security until production"] },
  { id: "USR-03", issue: "The UAT dataset contains clean totals but no boundary, exception, or rejection conditions.", correct: "Include representative normal, boundary, exception, rejection, and prior-period comparison data without exposing unauthorized information", options: ["Include representative normal, boundary, exception, rejection, and prior-period comparison data without exposing unauthorized information", "Use only the happy path", "Use production data without approval"] },
  { id: "USR-04", issue: "Expected results were copied from the same UAT application output.", correct: "Use approved business controls, source records, transparent calculations, and policy expectations independent of the result being accepted", options: ["Use approved business controls, source records, transparent calculations, and policy expectations independent of the result being accepted", "Copy the dashboard result", "Ask the implementer what should pass"] },
] as const;

export const uatWorkflowCases = [
  { id: "WF-01", issue: "The planner promotes an approval unit without resolving a validation error.", correct: "The journey fails until validation passes; retain the message, correction, rerun, annotation, new owner, and status history", options: ["The journey fails until validation passes; retain the message, correction, rerun, annotation, new owner, and status history", "Approve manually as administrator", "Ignore validation during UAT"] },
  { id: "WF-02", issue: "The reviewer rejects the plan, but the reason and expected correction are not recorded.", correct: "Require a clear annotation, returned ownership, correct status, retained history, correction, resubmission, and reviewer confirmation", options: ["Require a clear annotation, returned ownership, correct status, retained history, correction, resubmission, and reviewer confirmation", "Explain the reason verbally", "Create a new approval unit"] },
  { id: "WF-03", issue: "Task Manager shows complete while the Planning approval unit remains with the planner.", correct: "Do not accept the journey until both governed workflows show the expected owner, state, timestamps, and linked evidence", options: ["Do not accept the journey until both governed workflows show the expected owner, state, timestamps, and linked evidence", "Treat either workflow as sufficient", "Update the status report manually"] },
  { id: "WF-04", issue: "The approved plan is published to ApexPlan ASO, but the management dashboard differs from the approved values.", correct: "Block acceptance, reconcile the identical POV and measures, correct and rerun the publish, then repeat affected review and reporting steps", options: ["Block acceptance, reconcile the identical POV and measures, correct and rerun the publish, then repeat affected review and reporting steps", "Accept the Planning form only", "Edit the dashboard totals"] },
] as const;

export const uatIssueCases = [
  { id: "IS-01", issue: "A tester reports The form is wrong without a script step, POV, user, expected result, or evidence.", correct: "Return the issue for reproducible details: journey, step, role, inputs, POV, expected and actual result, timestamp, evidence, impact, and frequency", options: ["Return the issue for reproducible details: journey, step, role, inputs, POV, expected and actual result, timestamp, evidence, impact, and frequency", "Assign it directly to development", "Close it as user error"] },
  { id: "IS-02", issue: "A confirmed defect is fixed in a shared rule used by several planning journeys.", correct: "Retest the failed step and execute risk-based business regression across every affected journey, role, output, workflow, and report", options: ["Retest the failed step and execute risk-based business regression across every affected journey, role, output, workflow, and report", "Retest only the original cell", "Wait for production"] },
  { id: "IS-03", issue: "The fix build changes during execution without informing testers.", correct: "Pause affected scripts, version and communicate the build, assess executed evidence, reset where required, and resume only with controlled scope", options: ["Pause affected scripts, version and communicate the build, assess executed evidence, reset where required, and resume only with controlled scope", "Let users continue on mixed builds", "Rewrite the execution date"] },
  { id: "IS-04", issue: "A high-severity defect remains open, but the owner proposes conditional acceptance.", correct: "Document impact, workaround, affected journeys, residual risk, owner, target fix, retest condition, deployment restriction, and explicit authorized acceptance", options: ["Document impact, workaround, affected journeys, residual risk, owner, target fix, retest condition, deployment restriction, and explicit authorized acceptance", "Hide it from sign-off", "Automatically downgrade severity"] },
] as const;

export const uatEvidenceCases = [
  { id: "EV-01", issue: "A script is marked Passed although two steps have no recorded actual result or evidence.", correct: "Keep it incomplete until every required step has actual result, status, evidence, tester, timestamp, and issue link where applicable", options: ["Keep it incomplete until every required step has actual result, status, evidence, tester, timestamp, and issue link where applicable", "Pass from the final dashboard", "Let the test lead fill it later"] },
  { id: "EV-02", issue: "All critical journeys pass, but only half of assigned business roles participated.", correct: "Do not claim complete acceptance; evaluate role coverage, delegate or reschedule authorized testers, and record any approved limitation", options: ["Do not claim complete acceptance; evaluate role coverage, delegate or reschedule authorized testers, and record any approved limitation", "Count consultant executions", "Remove absent roles from scope"] },
  { id: "EV-03", issue: "A business owner signs off by email with no reference to scope, build, results, open issues, or conditions.", correct: "Obtain a controlled sign-off identifying scope, release, execution summary, exceptions, residual risks, conditions, owners, and decision date", options: ["Obtain a controlled sign-off identifying scope, release, execution summary, exceptions, residual risks, conditions, owners, and decision date", "Store the email subject only", "Treat silence as approval"] },
  { id: "EV-04", issue: "UAT passes, so the team declares the solution ready to go live immediately.", correct: "Hand accepted scope and conditions to defect governance, cutover, go/no-go, training, support, and deployment readiness processes", options: ["Hand accepted scope and conditions to defect governance, cutover, go/no-go, training, support, and deployment readiness processes", "Skip cutover planning", "Start production loads"] },
] as const;

export const uatExecutionSequence = [
  "Approve UAT charter, scope, business journeys, requirement coverage, roles, acceptance criteria, severity, entry and exit rules, schedule, support, and decision authority",
  "Freeze the release, UAT environment, representative users and variables, data pack, expected business controls, workflow state, scripts, reset procedure, and evidence convention",
  "Brief business testers on process, roles, data, scripts, evidence, issue reporting, privacy, support boundaries, daily status, and independent acceptance responsibility",
  "Execute planner journeys from actuals review through assumptions, forms, calculations, exceptions, Smart View, annotations, submission, and retained actual results",
  "Execute reviewer and approver journeys including validation, rejection, returned ownership, correction, resubmission, approval, Task Manager coordination, publish, and dashboard review",
  "Triage observations as defect, data, access, training, environment, change request, or question; assess severity and impact without changing approved scope informally",
  "Deploy controlled fixes, retest original failures, run risk-based regression, reconcile outputs, update issue disposition, and reassess acceptance conditions",
  "Reconcile scope, role and journey coverage, passes, failures, blocked tests, open issues, workarounds, risks, training, support, cutover conditions, and obtain formal business acceptance",
] as const;

export const uatControlChecks = [
  "Every result traces to requirement, business journey, script and step, release, environment, role, user variable, POV, data version, expected result, actual result, evidence, issue, and decision",
  "Business users—not administrators or implementers—execute representative planner, reviewer, approver, finance, reporting, and Smart View journeys with least-privilege access",
  "Normal, boundary, exception, rejection, correction, resubmission, approval, protected-cell, and reporting paths are included where material to the operating process",
  "Revenue, units, production, inventory, cost, margin, P&L, cash, balance sheet, and Plan1-to-ApexPlan ASO controls remain reconciled for the accepted release",
  "Defects, change requests, data issues, access issues, training gaps, environment problems, questions, fixes, retests, regression, workarounds, and risks are separately classified and traceable",
  "Sign-off states accepted scope, release, evidence, exceptions, conditions, deployment restrictions, residual risks, owners, support and cutover dependencies, authority, and date",
] as const;

export const uatWalkthroughControls = [
  "Use named representative roles and show the approved Scenario, Version, Entity, Year, Period, currency, user variable, release, data pack, and UAT script reference",
  "Capture only Oracle interactions that help another learner perform the journey: form input and validation, calculation result, approval history, Task Manager, Smart View, and reporting reconciliation",
  "Keep non-Oracle evidence such as scripts, daily status, issue triage, meeting notes, and sign-off in the downloadable controlled templates rather than manufacturing screenshots",
  "Include one controlled rejection and correction path, an authorized denial or protected cell, and the final reconciled approved result—not only happy-path screens",
  "Hide tenant URLs, names, email addresses, notifications, attachments, connections, and unauthorized business data in every retained capture",
] as const;

export const uatHomeworkMissions = [
  { id: "design", label: "Scenarios and users", purpose: "Create business-owned journeys, criteria, roles, and data." },
  { id: "planner", label: "Planner journey", purpose: "Execute input, calculation, exception, and submission steps." },
  { id: "approval", label: "Review and approval", purpose: "Prove rejection, correction, approval, publish, and reporting." },
  { id: "issues", label: "Issues and evidence", purpose: "Classify findings, govern fixes, retest, and reconcile coverage." },
  { id: "readout", label: "Acceptance decision", purpose: "Defend results, open risks, conditions, and sign-off." },
] as const;

export const uatArtifacts = [
  "Approved UAT charter and plan covering purpose, scope, exclusions, release, environment, business ownership, roles, schedule, support, severity, entry, suspension, resumption, evidence, and exit criteria",
  "Requirement-to-business-journey coverage matrix with role, script, data, expected business result, acceptance criteria, workflow, report, evidence, owner, and disposition",
  "Versioned UAT data and user pack with representative roles, user variables, approved source and assumption data, expected controls, privacy classification, reset, and reviewer approval",
  "Completed business test scripts with step-level actual results, pass/fail/blocked status, timestamps, evidence, tester confirmation, issue links, retest, and regression results",
  "UAT issue register separating defects, data, access, environment, training, question, and change-request items with impact, severity, owner, fix build, retest, workaround, and disposition",
  "Business reconciliation and workflow evidence covering operational outputs, statements, Plan1-to-ApexPlan ASO, web and Smart View, Approvals, Task Manager, rejected and corrected journeys",
  "UAT status and completion report with scope, role and journey coverage, executions, passes, failures, blocked tests, issues, aging, retest, regression, training, support, and cutover conditions",
  "Formal business acceptance record identifying release, accepted scope, exceptions, open items, workarounds, residual risks, deployment restrictions, owners, target dates, authority, and decision date",
] as const;

export const uatKnowledgeQuestions = [
  { id: "K-01", prompt: "Who should execute and decide UAT?", correct: "Representative business users and authorized process owners, supported but not replaced by the project team", options: ["Representative business users and authorized process owners, supported but not replaced by the project team", "Developers using administrator access", "The test manager alone"] },
  { id: "K-02", prompt: "What should a UAT script represent?", correct: "A realistic end-to-end business outcome with roles, inputs, expected results, controls, workflow, and evidence", options: ["A realistic end-to-end business outcome with roles, inputs, expected results, controls, workflow, and evidence", "A list of application pages", "A technical unit test"] },
  { id: "K-03", prompt: "How should a new request discovered during UAT be handled?", correct: "Classify it as a change request and assess it separately from defects against approved acceptance criteria", options: ["Classify it as a change request and assess it separately from defects against approved acceptance criteria", "Build it immediately", "Fail every existing script"] },
  { id: "K-04", prompt: "What is required after a defect fix?", correct: "Retest the original business failure, run risk-based regression, and reconcile all affected outputs and workflows", options: ["Retest the original business failure, run risk-based regression, and reconcile all affected outputs and workflows", "Accept the developer's confirmation", "Check only the changed screen"] },
  { id: "K-05", prompt: "What makes UAT sign-off valid?", correct: "Authorized acceptance of a defined release and scope with results, exceptions, risks, conditions, owners, and date", options: ["Authorized acceptance of a defined release and scope with results, exceptions, risks, conditions, owners, and date", "All testers stop reporting issues", "A message saying looks good"] },
] as const;

export const uatScreenshots = [
  { id: "UAT-UI-01", title: "Execute planner input and validation", path: "Home → Plans / Forms → Sales Planning → Sales Input", asset: "01-planner-form-validation.png", capture: "Representative planner form with approved Forecast / Working POV, editable assumptions, calculated values, validation or exception indicators, and protected cells.", action: "Enter the controlled change, save, verify validation and calculated impact, and confirm unauthorized or protected intersections remain read-only.", evidence: "Role, user variable, POV, inputs, calculated output, validation, protected behavior, script step, timestamp, and tester retained." },
  { id: "UAT-UI-02", title: "Run the planning calculation", path: "Form Actions / Rules → governed calculation → Application → Jobs", asset: "02-business-rule-result.png", capture: "Runtime prompts and successful job for the approved sales-to-financial dependency calculation with the same UAT POV.", action: "Launch the permitted rule, inspect prompts and messages, refresh the form, and compare results with the independent business expectation.", evidence: "Rule, prompts, job ID, operator role, timestamps, result, affected values, expected control, and tester decision captured." },
  { id: "UAT-UI-03", title: "Reject, correct, and approve the plan", path: "Home → Approvals → Manage Approvals → approval-unit details and annotations", asset: "03-approval-rejection-history.png", capture: "Approval unit showing returned ownership, rejection annotation and history, corrected resubmission, final owner, status, and approval action.", action: "Submit as planner, reject with a precise reason as reviewer, correct and resubmit, then approve only after validation and review pass.", evidence: "Scenario, Version, Entity, owner, previous owner, action, status, annotation, timestamps, validation result, and final approver retained." },
  { id: "UAT-UI-04", title: "Coordinate the UAT task workflow", path: "Home → Tasks / Task Manager → UAT schedule → task details", asset: "04-task-manager-uat-workflow.png", capture: "Assigned UAT task with instructions, questions or attachments where approved, assignee submission, approver decision, comments, status, and dates.", action: "Complete the assigned business task, submit it, review and approve or reject it, and reconcile its state with the related Planning approval unit.", evidence: "Task, assignee, approver, status, responses, comments, submit or reject action, timestamps, linked script, and issue reference captured." },
  { id: "UAT-UI-05", title: "Validate the Smart View business journey", path: "Excel → Smart View → shared connection → ApexPlan form or ad hoc grid", asset: "05-smart-view-business-journey.png", capture: "Connected workbook at the approved POV showing refresh, permitted input or submission, protected behavior, calculated result, and retained connection context without secrets.", action: "Refresh, enter the controlled value where authorized, submit, rerun the required calculation, refresh again, and compare with the web result.", evidence: "Role, connection label, POV, initial and submitted value, refresh result, denial or protected cell, web comparison, and tester captured." },
  { id: "UAT-UI-06", title: "Accept the published management result", path: "ApexPlan dashboard / management reporting after approved Plan1 publish", asset: "06-approved-dashboard-reconciliation.png", capture: "Final dashboard or report for the approved Forecast / Final result with units, revenue, COGS, margin, income, cash, balance control, exceptions, and comparison context.", action: "Compare the accepted Plan1 values with ApexPlan ASO at the identical POV, review exceptions and narrative, and record the business acceptance decision.", evidence: "Publish job reference, common POV, business KPIs, zero unexplained differences, balance control, exception disposition, owner, and acceptance captured." },
] as const;
