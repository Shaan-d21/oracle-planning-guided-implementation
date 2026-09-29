export const securityWorkflowLessons = [
  { id: "security-foundations", number: "01", title: "Security and workflow foundations", duration: "18 min", type: "concept" },
  { id: "role-access-matrix", number: "02", title: "Build the role, group, and access matrix", duration: "28 min", type: "assessment" },
  { id: "member-data-security", number: "03", title: "Configure member and data access", duration: "30 min", type: "simulation" },
  { id: "artifact-rule-security", number: "04", title: "Secure artifacts, rules, and Smart View", duration: "28 min", type: "wizard" },
  { id: "planning-approvals", number: "05", title: "Design the Planning approval-unit workflow", duration: "32 min", type: "simulation" },
  { id: "task-manager", number: "06", title: "Configure Task Manager responsibilities", duration: "28 min", type: "assessment" },
  { id: "security-testing", number: "07", title: "Test access, segregation, and audit evidence", duration: "30 min", type: "assessment" },
  { id: "security-walkthrough", number: "08", title: "Execute the security and workflow walkthrough", duration: "30 min", type: "guided-screenshot" },
  { id: "security-homework", number: "09", title: "Applied security and workflow lab", duration: "46 min", type: "assessment" },
  { id: "security-exit-gate", number: "10", title: "Security package, evidence, and exit gate", duration: "24 min", type: "exit-gate" },
] as const;

export type SecurityWorkflowLessonId = (typeof securityWorkflowLessons)[number]["id"];

export const securityReadinessControls = [
  "Phase 16 role journeys, form folders, dashboards, rules, Smart View templates, and cube ownership are stable enough to secure",
  "Named business owners approve who can prepare, review, approve, administer, and view each planning scope",
  "Access will be assigned to controlled groups wherever practical; direct user grants require a documented exception and expiry",
  "Plan1 remains the detailed input and calculation cube, while ApexPlan ASO remains the reconciled reporting cube",
  "Planning Approvals, Task Manager, and data security have separate purposes and will be tested together without treating one as a substitute for another",
] as const;

export const roleAccessCases = [
  {
    id: "RA-01",
    issue: "A Sales Planner needs normal plan entry, assigned forms, and a limited set of rules, but no design or administration privileges.",
    correct: "Assign the User predefined role, add the planner to a Sales Planner group, and grant only required data, artifacts, and rule launch access",
    options: [
      "Assign the User predefined role, add the planner to a Sales Planner group, and grant only required data, artifacts, and rule launch access",
      "Assign Service Administrator to avoid access failures",
      "Grant every permission directly to the user",
    ],
  },
  {
    id: "RA-02",
    issue: "An executive needs dashboards and approved results but must not change plan data.",
    correct: "Use the Viewer predefined role plus an Executive Viewer group with read access to approved reporting artifacts and data",
    options: [
      "Use the Viewer predefined role plus an Executive Viewer group with read access to approved reporting artifacts and data",
      "Use Power User and rely on training",
      "Give write access and hide the Save button",
    ],
  },
  {
    id: "RA-03",
    issue: "A process owner must manage Task Manager tasks and schedules but should not administer the environment.",
    correct: "Grant the lowest predefined role plus the specific Task Manager application roles required for task design and operation",
    options: [
      "Grant the lowest predefined role plus the specific Task Manager application roles required for task design and operation",
      "Make the process owner a Service Administrator",
      "Use form write access as Task Manager authority",
    ],
  },
  {
    id: "RA-04",
    issue: "One user is temporarily covering Pune planning during an absence.",
    correct: "Use a time-bound approved group membership or delegation, record the owner and expiry, and remove it after the cover period",
    options: [
      "Use a time-bound approved group membership or delegation, record the owner and expiry, and remove it after the cover period",
      "Share the absent planner's credentials",
      "Grant permanent access to all entities",
    ],
  },
] as const;

export const memberAccessCases = [
  {
    id: "MA-01",
    issue: "The Pune Operations Planner prepares Forecast / Working production for Pune but can only review Noida.",
    correct: "Grant Write to Pune, Read to Noida, and access only to Forecast / Working within the intended planning scope",
    options: [
      "Grant Write to Pune, Read to Noida, and access only to Forecast / Working within the intended planning scope",
      "Grant Write at Apex Home Appliances",
      "Secure only the form and leave Entity unrestricted",
    ],
  },
  {
    id: "MA-02",
    issue: "Actual data is loaded and reconciled through integration and must remain unchanged by planners.",
    correct: "Grant planners Read to Actual and Write only to the working plan combinations they own",
    options: [
      "Grant planners Read to Actual and Write only to the working plan combinations they own",
      "Grant Write to Actual so corrections are quick",
      "Hide Actual from the navigation flow but leave it writable",
    ],
  },
  {
    id: "MA-03",
    issue: "The Executive Viewer group should see approved management results in ApexPlan ASO without detailed input authority.",
    correct: "Grant read access to approved reporting intersections and dashboards, with no Plan1 input or rule launch access",
    options: [
      "Grant read access to approved reporting intersections and dashboards, with no Plan1 input or rule launch access",
      "Give write access to ApexPlan ASO for annotation",
      "Grant access to every Plan1 member because the dashboard is read-only",
    ],
  },
  {
    id: "MA-04",
    issue: "An invalid Product × Entity combination must not become writable even when both members are individually accessible.",
    correct: "Combine member security with valid intersections or cell-level controls and prove the denied combination with a negative test",
    options: [
      "Combine member security with valid intersections or cell-level controls and prove the denied combination with a negative test",
      "Rely on the planner to avoid the combination",
      "Remove the product from all reports",
    ],
  },
] as const;

export const artifactAccessCases = [
  {
    id: "AA-01",
    issue: "A planner has member Write access but cannot open the Production Allocation form.",
    correct: "Grant the planner group access to the form or its folder; member access alone does not expose the artifact",
    options: [
      "Grant the planner group access to the form or its folder; member access alone does not expose the artifact",
      "Change Entity access to Write again",
      "Assign Service Administrator",
    ],
  },
  {
    id: "AA-02",
    issue: "A Sales Planner can see the Calculate Production rule but must never launch it.",
    correct: "Remove Launch access or assign No Launch through the controlled rule-security design and verify the action is unavailable",
    options: [
      "Remove Launch access or assign No Launch through the controlled rule-security design and verify the action is unavailable",
      "Leave Launch access and document that it is prohibited",
      "Rename the rule so the planner will not recognize it",
    ],
  },
  {
    id: "AA-03",
    issue: "A planner opens the same form in Smart View that is read-only on the web.",
    correct: "Expect the same effective data and artifact security in Smart View and test refresh, edit, submit, and denied behavior with that role",
    options: [
      "Expect the same effective data and artifact security in Smart View and test refresh, edit, submit, and denied behavior with that role",
      "Treat Smart View as an unrestricted administration tool",
      "Protect only the workbook file",
    ],
  },
  {
    id: "AA-04",
    issue: "Many forms and rules share the same audience and lifecycle.",
    correct: "Organize them in governed folders and apply group access at the folder level, using specific exceptions only when justified",
    options: [
      "Organize them in governed folders and apply group access at the folder level, using specific exceptions only when justified",
      "Configure each artifact for every user",
      "Make the root folder public",
    ],
  },
] as const;

export const approvalWorkflowCases = [
  {
    id: "PW-01",
    issue: "Apex needs approval by Entity for Forecast / Working, while Actual and Approved are outside the active input cycle.",
    correct: "Define an Entity-based approval-unit hierarchy and assign it only to the governed Forecast / Working combination",
    options: [
      "Define an Entity-based approval-unit hierarchy and assign it only to the governed Forecast / Working combination",
      "Create an approval unit for every data cell",
      "Include all scenarios and versions automatically",
    ],
  },
  {
    id: "PW-02",
    issue: "A preparer finishes Pune but a critical capacity exception remains unresolved.",
    correct: "Block promotion with validation evidence, resolve or formally approve the exception, rerun validation, then submit",
    options: [
      "Block promotion with validation evidence, resolve or formally approve the exception, rerun validation, then submit",
      "Submit and fix it after approval",
      "Disable the validation rule",
    ],
  },
  {
    id: "PW-03",
    issue: "The reviewer rejects the planning unit with a clear reason.",
    correct: "Return ownership through the configured approval path, preserve the rejection annotation, correct the plan, and resubmit",
    options: [
      "Return ownership through the configured approval path, preserve the rejection annotation, correct the plan, and resubmit",
      "Email the preparer and leave the unit approved",
      "Copy the plan into another version without history",
    ],
  },
  {
    id: "PW-04",
    issue: "A unit is approved but an administrator can technically reopen or change data.",
    correct: "Treat reopen as a controlled exception requiring authorization, reason, impact assessment, audit evidence, and reapproval",
    options: [
      "Treat reopen as a controlled exception requiring authorization, reason, impact assessment, audit evidence, and reapproval",
      "Let administrators change approved data silently",
      "Delete the approval history before changing it",
    ],
  },
] as const;

export const taskManagerCases = [
  {
    id: "TM-01",
    issue: "The monthly cycle needs dated tasks for actuals load, sales input, production review, finance review, approval, and publish.",
    correct: "Create a reusable Task Manager template with dependencies, assignees, approvers, due dates, instructions, and required evidence",
    options: [
      "Create a reusable Task Manager template with dependencies, assignees, approvers, due dates, instructions, and required evidence",
      "Use an email chain as the official schedule",
      "Create one task named Complete Planning",
    ],
  },
  {
    id: "TM-02",
    issue: "A task is assigned to the Operations Planning team.",
    correct: "An authorized team member claims it, performs the work, attaches evidence, answers required questions, and submits it",
    options: [
      "An authorized team member claims it, performs the work, attaches evidence, answers required questions, and submits it",
      "Every team member performs the task independently",
      "The administrator completes it for the team",
    ],
  },
  {
    id: "TM-03",
    issue: "Task Manager says Production Review is complete, but the Planning approval unit is still owned by the preparer.",
    correct: "Treat the mismatch as a control failure and reconcile Task Manager evidence with the actual approval-unit state",
    options: [
      "Treat the mismatch as a control failure and reconcile Task Manager evidence with the actual approval-unit state",
      "Assume Task Manager overrides Planning Approvals",
      "Close the schedule because the task is complete",
    ],
  },
  {
    id: "TM-04",
    issue: "The primary approver is unavailable near the deadline.",
    correct: "Use an approved backup or reassignment process with visible accountability; do not share credentials",
    options: [
      "Use an approved backup or reassignment process with visible accountability; do not share credentials",
      "Ask the assignee to approve their own task",
      "Use the primary approver's account",
    ],
  },
] as const;

export const securityTestCases = [
  { id: "ST-01", issue: "Pune Operations Planner writes Forecast / Working production for Pune.", correct: "Allow: owned entity, scenario, version, form, and writable account scope", options: ["Allow: owned entity, scenario, version, form, and writable account scope", "Deny: planners never write", "Allow: role name alone is enough"] },
  { id: "ST-02", issue: "The same planner attempts to change Actual data.", correct: "Deny and retain evidence that Actual is read-only for the planner", options: ["Deny and retain evidence that Actual is read-only for the planner", "Allow because the form is accessible", "Allow only through Smart View"] },
  { id: "ST-03", issue: "An Executive Viewer attempts to edit Forecast / Working through Smart View.", correct: "Deny submission and prove that the effective Viewer and data permissions are enforced", options: ["Deny submission and prove that the effective Viewer and data permissions are enforced", "Allow because Excel is outside Planning", "Allow if the workbook is password protected"] },
  { id: "ST-04", issue: "A Sales Planner attempts to launch Calculate Production.", correct: "Deny because the role lacks the governed rule launch privilege", options: ["Deny because the role lacks the governed rule launch privilege", "Allow and depend on runtime prompts", "Allow because the rule is attached to a form"] },
  { id: "ST-05", issue: "A Service Administrator is proposed as the routine business approver.", correct: "Reject the design: separate technical administration from business preparation, review, and approval", options: ["Reject the design: separate technical administration from business preparation, review, and approval", "Accept because administrators can access everything", "Accept if the administrator promises not to edit"] },
] as const;

export const securityExecutionSequence = [
  "Approve personas, data ownership, workflow ownership, and segregation-of-duties rules",
  "Create groups and assign the lowest required predefined and application roles",
  "Apply member and data access for Entity, Scenario, Version, accounts, products, and protected intersections",
  "Secure form, dashboard, rule, folder, navigation, report, and Smart View access",
  "Configure the Entity approval-unit hierarchy, owners, reviewers, validation, and Forecast / Working assignment",
  "Configure Task Manager templates, dependencies, assignees, approvers, dates, questions, and evidence",
  "Execute positive and negative tests with representative non-admin users across web and Smart View",
  "Reconcile effective access, workflow state, task evidence, exceptions, audit reports, and business approval",
] as const;

export const securityReconciliationControls = [
  "Role Assignment Report agrees with the approved user-group-role matrix",
  "Member access report and representative POV tests agree with the approved Entity, Scenario, Version, Product, and Account scope",
  "Form, dashboard, rule, and Smart View behavior agrees with the artifact access matrix",
  "Planning approval-unit owner, state, annotation, and validation agree with the approved promotion path",
  "Task Manager assignee, approver, due date, status, answers, and attachments agree with actual process evidence",
  "All denied tests, temporary grants, conflicts, reopened units, overrides, and residual risks have an owner and approved disposition",
] as const;

export const securityWalkthroughControls = [
  "Use only approved training users and groups; hide email addresses, tenant URLs, identity details, and unrelated environments",
  "Capture both the configured access and the resulting experience for representative planner, reviewer, approver, viewer, and administrator roles",
  "Keep Forecast / Working, FY25, Entity, and cube context visible wherever it explains an access or workflow result",
  "Include at least one allowed action and one denied action; a successful administrator test is not evidence of end-user security",
  "Reconcile Planning Approvals, Task Manager, reports, exceptions, and sign-off before treating the workflow as production-ready",
] as const;

export const securityHomeworkMissions = [
  { id: "matrix", label: "Role and access matrix", purpose: "Choose least-privilege roles, groups, and controlled exceptions." },
  { id: "data", label: "Data and artifact security", purpose: "Prove member, form, rule, and Smart View behavior." },
  { id: "workflow", label: "Approval workflow", purpose: "Move a clean Pune planning unit through governed ownership." },
  { id: "tasks", label: "Task orchestration", purpose: "Coordinate dated work without confusing tasks with data approval." },
  { id: "readout", label: "Control readout", purpose: "Reconcile evidence and recommend release or remediation." },
] as const;

export const securityArtifacts = [
  "Approved user-role-group matrix with business owner, purpose, effective date, expiry, and segregation review",
  "Member and data access matrix for Plan1 and ApexPlan ASO, including inheritance, valid intersections, and exceptions",
  "Artifact and rule access catalogue covering folders, forms, dashboards, reports, navigation, Smart View, and launch privileges",
  "Planning approval-unit design covering hierarchy, Scenario / Version assignment, owners, reviewers, validation, states, and exception handling",
  "Task Manager template and schedule design covering dependencies, assignees, approvers, dates, questions, evidence, backups, and escalation",
  "Positive and negative security test evidence for representative roles across web, rules, approvals, and Smart View",
  "Effective-access, workflow-state, task-status, audit, and exception reconciliation with defects and residual risks",
  "Approved security and workflow operating guide with provisioning, periodic review, temporary access, reopen, support, and ownership procedures",
] as const;

export const securityKnowledgeQuestions = [
  { id: "K-01", prompt: "What is the best default for assigning detailed Planning access?", correct: "Controlled groups with the lowest required roles and permissions", options: ["Controlled groups with the lowest required roles and permissions", "Service Administrator for all planners", "Direct grants to every user"] },
  { id: "K-02", prompt: "Does access to a form automatically grant access to every member shown on it?", correct: "No; artifact access and member/data access are both evaluated", options: ["No; artifact access and member/data access are both evaluated", "Yes, the form overrides member security", "Only in Smart View"] },
  { id: "K-03", prompt: "What does a Planning approval unit normally identify for this implementation?", correct: "A governed Scenario × Version × Entity planning scope", options: ["A governed Scenario × Version × Entity planning scope", "A Task Manager email", "A complete database backup"] },
  { id: "K-04", prompt: "What is Task Manager's role in this design?", correct: "Coordinate dated activities, responsibilities, dependencies, approvals, and evidence", options: ["Coordinate dated activities, responsibilities, dependencies, approvals, and evidence", "Replace data security", "Replace approval-unit ownership"] },
  { id: "K-05", prompt: "What proves that security works?", correct: "Positive and negative tests performed with representative non-admin users", options: ["Positive and negative tests performed with representative non-admin users", "A successful administrator login", "A completed security spreadsheet without execution"] },
] as const;

export const securityScreenshots = [
  { id: "SW-UI-01", title: "Review Access Control groups", path: "Home → Tools → Access Control → Manage Groups", asset: "01-access-control-groups.png", capture: "ApexPlan training groups with descriptions and representative nested membership, with personal identifiers hidden.", action: "Open each controlled group and verify its purpose, owner, membership source, and separation from predefined role groups.", evidence: "Group name, purpose, representative membership pattern, owner, and review date agree with the matrix." },
  { id: "SW-UI-02", title: "Review application role assignments", path: "Access Control → Manage Application Roles / Role Assignment Report", asset: "02-application-role-assignment.png", capture: "Representative planner, reviewer, approver, viewer, and process-owner application roles.", action: "Export or inspect effective roles and compare them with the approved group-role design.", evidence: "Required roles are present, elevated roles are absent, inheritance is understood, and exceptions are recorded." },
  { id: "SW-UI-03", title: "Configure member access", path: "Application → Dimensions → select secured dimension → Assign Access", asset: "03-dimension-member-access.png", capture: "Entity, Scenario, Version, or other secured-member access for the ApexPlan training groups.", action: "Verify Pune Write, Noida Read, Actual Read, and Forecast / Working ownership for the representative planner.", evidence: "Explicit and inherited access produces the approved effective scope without unintended parent or sibling access." },
  { id: "SW-UI-04", title: "Secure forms and dashboards", path: "Application → Forms / Dashboards → Assign Access", asset: "04-artifact-permissions.png", capture: "Role-based folder or artifact permissions for input, review, approval, and executive reporting.", action: "Confirm that each persona sees only the artifacts required for its role journey.", evidence: "Artifact visibility agrees with the catalogue and does not grant unauthorized data access." },
  { id: "SW-UI-05", title: "Secure business-rule launch", path: "Calculation Manager / Rules → Assign Access", asset: "05-business-rule-launch-access.png", capture: "Launch and No Launch assignments for representative calculation rules or governed rule folders.", action: "Confirm Operations can launch approved production rules while Sales and Executive groups cannot.", evidence: "Allowed role can launch; denied roles cannot see or launch the controlled action." },
  { id: "SW-UI-06", title: "Test Smart View effective access", path: "Excel → Smart View → shared connection → ApexPlan form or ad hoc grid", asset: "06-smart-view-role-test.png", capture: "Representative allowed and protected cells in a connected workbook with identity and connection details hidden.", action: "Refresh as the representative role, edit an allowed Forecast / Working cell, attempt a denied cell, submit, and refresh again.", evidence: "Allowed value persists, denied submission is blocked, protected cells remain read-only, and web totals reconcile." },
  { id: "SW-UI-07", title: "Build the approval-unit hierarchy", path: "Navigator → Workflow → Approval Unit", asset: "07-planning-unit-hierarchy.png", capture: "Entity-based hierarchy, scope, owners, reviewers, and Forecast / Working usage for the training cycle.", action: "Inspect Pune and Noida ownership, promotional path, validation dependencies, and Scenario / Version assignment.", evidence: "Hierarchy, owners, reviewers, scope, usage, and validation agree with the approved workflow design." },
  { id: "SW-UI-08", title: "Execute Planning Approvals", path: "Home → Approvals / Navigator → Workflow → Manage Approvals", asset: "08-approvals-workflow-status.png", capture: "Pune approval unit showing current owner, state, sub-status, annotation, and promotional path.", action: "Start, validate, submit or promote, review, reject or approve as designed, using distinct training roles.", evidence: "Each state change transfers ownership correctly, preserves comments, blocks failed validation, and ends in Approved only after review." },
  { id: "SW-UI-09", title: "Run the Task Manager schedule", path: "Home → Tasks / Task Manager → Schedules", asset: "09-task-manager-schedule.png", capture: "Monthly Apex planning tasks with dependencies, assignees, approvers, dates, status, questions, and evidence links.", action: "Claim or open the assigned task, complete its instructions and evidence, submit it, then approve or reject with the correct role.", evidence: "Actual assignee and approver, timestamps, answers, attachments, dependency status, and outcome are traceable." },
  { id: "SW-UI-10", title: "Reconcile security and workflow evidence", path: "Access Control reports + Manage Approvals + Task Manager views / reports", asset: "10-security-workflow-reconciliation.png", capture: "A controlled evidence view or assembled review showing effective roles, approval status, task status, exceptions, and sign-off.", action: "Reconcile configuration and actual behavior, resolve or accept exceptions, and record the release decision.", evidence: "No unexplained privilege, state mismatch, overdue critical task, failed denial, or unowned exception remains." },
] as const;
