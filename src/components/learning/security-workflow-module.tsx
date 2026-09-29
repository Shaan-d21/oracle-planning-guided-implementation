"use client";

import {
  ArrowRight,
  BookOpenCheck,
  Camera,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Download,
  FileKey2,
  GitPullRequestArrow,
  KeyRound,
  ListChecks,
  PlayCircle,
  ShieldCheck,
  ShieldX,
  TriangleAlert,
  UserCheck,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from "react";
import { formsDashboardsSmartViewLessons } from "@/content/forms-dashboards-smart-view-module";
import {
  approvalWorkflowCases,
  artifactAccessCases,
  memberAccessCases,
  roleAccessCases,
  securityArtifacts,
  securityExecutionSequence,
  securityHomeworkMissions,
  securityKnowledgeQuestions,
  securityReadinessControls,
  securityReconciliationControls,
  securityScreenshots,
  securityTestCases,
  securityWalkthroughControls,
  securityWorkflowLessons,
  taskManagerCases,
  type SecurityWorkflowLessonId,
} from "@/content/security-workflow-module";
import { readTrackProgress, writeTrackProgress } from "@/lib/learning-progress";
import design from "./application-dimension-design-module.module.css";
import base from "./discovery-module.module.css";
import sales from "./sales-planning-build-module.module.css";
import styles from "./security-workflow-module.module.css";
import { LearningModuleFrame, type ModuleFeedback } from "./learning-module-frame";
import { OracleScreenshot } from "./oracle-screenshot";

type Answers = Record<string, string>;
type HomeworkId = (typeof securityHomeworkMissions)[number]["id"];
type WorkflowInputs = { criticalExceptions: number; balanceVariance: number; reportingVariance: number; annotation: string };

const packPath = "/training/oracle-planning/phase-17/";
const defaultWorkflowInputs: WorkflowInputs = {
  criticalExceptions: 0,
  balanceVariance: 0,
  reportingVariance: 0,
  annotation: "Pune Forecast / Working was validated, reconciled, reviewed, and is ready for the next owner.",
};

export function SecurityWorkflowModule() {
  const [activeLesson, setActiveLesson] = useState<SecurityWorkflowLessonId>("security-foundations");
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<ModuleFeedback>(null);
  const [readiness, setReadiness] = useState<string[]>([]);
  const [roleAnswers, setRoleAnswers] = useState<Answers>({});
  const [memberAnswers, setMemberAnswers] = useState<Answers>({});
  const [artifactAnswers, setArtifactAnswers] = useState<Answers>({});
  const [approvalAnswers, setApprovalAnswers] = useState<Answers>({});
  const [taskAnswers, setTaskAnswers] = useState<Answers>({});
  const [testAnswers, setTestAnswers] = useState<Answers>({});
  const [workflowInputs, setWorkflowInputs] = useState<WorkflowInputs>(defaultWorkflowInputs);
  const [workflowStage, setWorkflowStage] = useState(0);
  const [workflowAttempted, setWorkflowAttempted] = useState(false);
  const [walkthroughChecks, setWalkthroughChecks] = useState<string[]>([]);
  const [sequence, setSequence] = useState<string[]>([]);
  const [reconciled, setReconciled] = useState<string[]>([]);
  const [activeHomework, setActiveHomework] = useState<HomeworkId>("matrix");
  const [readout, setReadout] = useState("");
  const [artifacts, setArtifacts] = useState<string[]>([]);
  const [summary, setSummary] = useState("");
  const [knowledgeAnswers, setKnowledgeAnswers] = useState<Answers>({});

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = readTrackProgress("implementation");
      setCompletedLessons(stored.completedLessons);
      const saved = securityWorkflowLessons.find((lesson) => lesson.id === stored.activeLesson);
      if (saved) setActiveLesson(saved.id);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const prerequisiteComplete = formsDashboardsSmartViewLessons.every((lesson) => completedLessons.includes(lesson.id));
  const allCorrect = (items: readonly { id: string; correct: string }[], answers: Answers) => items.every((item) => answers[item.id] === item.correct);
  const workflowValid = workflowInputs.criticalExceptions === 0 && workflowInputs.balanceVariance === 0 && workflowInputs.reportingVariance === 0 && workflowInputs.annotation.trim().length >= 40;
  const knowledgeReady = securityKnowledgeQuestions.every((question) => knowledgeAnswers[question.id] === question.correct);
  const homeworkStatus: Record<HomeworkId, boolean> = {
    matrix: allCorrect(roleAccessCases, roleAnswers),
    data: allCorrect(memberAccessCases, memberAnswers) && allCorrect(artifactAccessCases, artifactAnswers),
    workflow: allCorrect(approvalWorkflowCases, approvalAnswers) && workflowStage === 4,
    tasks: allCorrect(taskManagerCases, taskAnswers),
    readout: allCorrect(securityTestCases, testAnswers) && sequence.length === securityExecutionSequence.length && reconciled.length === securityReconciliationControls.length && readout.trim().length >= 240,
  };
  const preview = useMemo(
    () => artifacts.length === securityArtifacts.length && summary.trim().length >= 240
      ? `${summary.trim()} The released design separates technical administration, data preparation, independent review, business approval, and evidence orchestration across Plan1 and ApexPlan ASO.`
      : "Complete all eight security and workflow artifacts and provide a release-readiness summary of at least 240 characters.",
    [artifacts, summary],
  );

  function persist(nextCompleted: string[], lesson: SecurityWorkflowLessonId) {
    writeTrackProgress("implementation", {
      completedLessons: nextCompleted,
      activeLesson: lesson,
      activeModuleId: "implementation-security-workflow",
      lastVisited: new Date().toISOString(),
    });
  }

  function goToLesson(id: SecurityWorkflowLessonId) {
    setActiveLesson(id);
    setFeedback(null);
    persist(completedLessons, id);
  }

  function markComplete(message: string) {
    const next = completedLessons.includes(activeLesson) ? completedLessons : [...completedLessons, activeLesson];
    setCompletedLessons(next);
    persist(next, activeLesson);
    setFeedback({ tone: "success", message });
  }

  function toggle(setter: Dispatch<SetStateAction<string[]>>, item: string) {
    setter((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item]);
  }

  function advanceWorkflow() {
    setWorkflowAttempted(true);
    if (workflowValid && workflowStage < 4) setWorkflowStage((current) => current + 1);
  }

  function validateLesson() {
    if (activeLesson === "security-foundations") {
      if (readiness.length !== securityReadinessControls.length) return setFeedback({ tone: "error", message: "Confirm all five security, ownership, cube, and workflow boundaries." });
      return markComplete("Security layers, least privilege, cube boundaries, and the distinct purposes of Planning Approvals and Task Manager are understood.");
    }
    if (activeLesson === "role-access-matrix") {
      if (!allCorrect(roleAccessCases, roleAnswers)) return setFeedback({ tone: "error", message: "Resolve every predefined-role, application-role, group, and temporary-access decision." });
      return markComplete("The role and group model uses least privilege, business ownership, controlled exceptions, and clear segregation of duties.");
    }
    if (activeLesson === "member-data-security") {
      if (!allCorrect(memberAccessCases, memberAnswers)) return setFeedback({ tone: "error", message: "Correct every Entity, Scenario, Version, cube, and invalid-intersection access decision." });
      return markComplete("Plan1 input and ApexPlan ASO reporting access are bounded by owned data scope and protected combinations.");
    }
    if (activeLesson === "artifact-rule-security") {
      if (!allCorrect(artifactAccessCases, artifactAnswers)) return setFeedback({ tone: "error", message: "Correct the form, folder, rule launch, and Smart View security decisions." });
      return markComplete("Artifact visibility, rule launch rights, and Smart View behavior align with effective data permissions.");
    }
    if (activeLesson === "planning-approvals") {
      if (!allCorrect(approvalWorkflowCases, approvalAnswers) || workflowStage !== 4) return setFeedback({ tone: "error", message: "Resolve the approval design cases and advance the clean Pune unit through Start, Submit, Promote, and Approve." });
      return markComplete("The Pune Forecast / Working approval unit passed validation, transferred ownership through the configured path, and reached Approved.");
    }
    if (activeLesson === "task-manager") {
      if (!allCorrect(taskManagerCases, taskAnswers)) return setFeedback({ tone: "error", message: "Resolve every schedule, team assignment, workflow reconciliation, and backup-approver decision." });
      return markComplete("Task Manager coordinates dates, dependencies, roles, evidence, submission, approval, and escalation without replacing Planning security or approvals.");
    }
    if (activeLesson === "security-testing") {
      if (!allCorrect(securityTestCases, testAnswers) || reconciled.length !== securityReconciliationControls.length) return setFeedback({ tone: "error", message: "Complete all allow/deny tests and confirm all six effective-access and workflow reconciliations." });
      return markComplete("Representative non-admin roles prove allowed and denied behavior, segregation, workflow ownership, auditability, and exception control.");
    }
    if (activeLesson === "security-walkthrough") {
      if (walkthroughChecks.length !== securityWalkthroughControls.length) return setFeedback({ tone: "error", message: "Confirm all five screenshot privacy, role, context, negative-test, and reconciliation controls." });
      return markComplete("The security and workflow capture runbook is ready for one consistent ApexPlan training cycle.");
    }
    if (activeLesson === "security-homework") {
      if (!Object.values(homeworkStatus).every(Boolean)) return setFeedback({ tone: "error", message: "Complete all five applied missions, including the approved workflow, negative tests, execution order, reconciliation, and control readout." });
      return markComplete("Applied security and workflow lab complete. The design and evidence are ready for independent review.");
    }
    if (artifacts.length !== securityArtifacts.length || summary.trim().length < 240 || !knowledgeReady) return setFeedback({ tone: "error", message: "Select all eight deliverables, provide a 240-character summary, and answer all five knowledge checks correctly." });
    markComplete("Phase 17 exit gate passed. Security and workflow are ready for Phase 18 scenario and what-if planning.");
  }

  return (
    <LearningModuleFrame
      activeLessonId={activeLesson}
      completedLessons={completedLessons}
      description="Implement least-privilege access and auditable planning workflow across Plan1, ApexPlan ASO, forms, rules, Smart View, Planning Approvals, and Task Manager."
      exitGate="Approve the role model, effective data and artifact access, approval-unit workflow, task schedule, positive and negative tests, reconciliations, operating controls, and audit evidence"
      exitGateIcon={<ShieldCheck size={18} />}
      feedback={feedback}
      lessons={securityWorkflowLessons}
      onSelectLesson={(id) => goToLesson(id as SecurityWorkflowLessonId)}
      onValidate={validateLesson}
      phase={17}
      prerequisite={{
        complete: prerequisiteComplete,
        message: "Complete Phase 16 so security is applied to stable role journeys, forms, dashboards, rules, Smart View templates, and cube responsibilities.",
        href: "/learn/forms-dashboards-smart-view",
        linkLabel: "Open Phase 16",
      }}
      stage="Build · Security and workflow"
      title="Security & Workflow"
      validateLabel={activeLesson === "security-exit-gate" ? "Approve security package" : undefined}
    >
      {activeLesson === "security-foundations" && <SecurityFoundations selected={readiness} onToggle={(item) => toggle(setReadiness, item)} />}
      {activeLesson === "role-access-matrix" && <RoleAccessMatrix answers={roleAnswers} onAnswer={(id, value) => setRoleAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "member-data-security" && <MemberDataSecurity answers={memberAnswers} onAnswer={(id, value) => setMemberAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "artifact-rule-security" && <ArtifactRuleSecurity answers={artifactAnswers} onAnswer={(id, value) => setArtifactAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "planning-approvals" && <PlanningApprovals answers={approvalAnswers} onAnswer={(id, value) => setApprovalAnswers((current) => ({ ...current, [id]: value }))} inputs={workflowInputs} onInput={setWorkflowInputs} stage={workflowStage} attempted={workflowAttempted} onAdvance={advanceWorkflow} />}
      {activeLesson === "task-manager" && <TaskManagerLesson answers={taskAnswers} onAnswer={(id, value) => setTaskAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "security-testing" && <SecurityTesting answers={testAnswers} onAnswer={(id, value) => setTestAnswers((current) => ({ ...current, [id]: value }))} reconciled={reconciled} onReconcile={(item) => toggle(setReconciled, item)} />}
      {activeLesson === "security-walkthrough" && <SecurityWalkthrough selected={walkthroughChecks} onToggle={(item) => toggle(setWalkthroughChecks, item)} />}
      {activeLesson === "security-homework" && <SecurityHomework active={activeHomework} onActive={setActiveHomework} status={homeworkStatus} roleAnswers={roleAnswers} onRole={(id, value) => setRoleAnswers((current) => ({ ...current, [id]: value }))} memberAnswers={memberAnswers} onMember={(id, value) => setMemberAnswers((current) => ({ ...current, [id]: value }))} artifactAnswers={artifactAnswers} onArtifact={(id, value) => setArtifactAnswers((current) => ({ ...current, [id]: value }))} approvalAnswers={approvalAnswers} onApproval={(id, value) => setApprovalAnswers((current) => ({ ...current, [id]: value }))} workflowInputs={workflowInputs} onWorkflowInput={setWorkflowInputs} workflowStage={workflowStage} workflowAttempted={workflowAttempted} onAdvance={advanceWorkflow} taskAnswers={taskAnswers} onTask={(id, value) => setTaskAnswers((current) => ({ ...current, [id]: value }))} testAnswers={testAnswers} onTest={(id, value) => setTestAnswers((current) => ({ ...current, [id]: value }))} sequence={sequence} onSequence={(item) => toggle(setSequence, item)} reconciled={reconciled} onReconcile={(item) => toggle(setReconciled, item)} readout={readout} onReadout={setReadout} />}
      {activeLesson === "security-exit-gate" && <SecurityExitGate selected={artifacts} onToggle={(item) => toggle(setArtifacts, item)} summary={summary} onSummary={setSummary} answers={knowledgeAnswers} onAnswer={(id, value) => setKnowledgeAnswers((current) => ({ ...current, [id]: value }))} preview={preview} />}
    </LearningModuleFrame>
  );
}

function SecurityFoundations({ selected, onToggle }: { selected: string[]; onToggle: (item: string) => void }) {
  const layers = [
    ["Environment role", "Controls broad service capability: Viewer, User, Power User, or Service Administrator."],
    ["Application role", "Adds a specific capability such as Task Manager Assignee or Approver."],
    ["Data access", "Controls permitted members and intersections across Entity, Scenario, Version, Product, and Account."],
    ["Artifact access", "Controls forms, folders, dashboards, reports, navigation, and task artifacts."],
    ["Rule launch", "Controls which calculations a group can execute; it does not replace data access."],
  ] as const;
  return <><Lead icon={<ShieldCheck size={23} />} eyebrow="Layered, least-privilege control" title="Give every person enough access to complete owned planning work—and no more—while preserving independent review, approval, and evidence." /><p className={base.bodyCopy}>Oracle Planning security is the combined result of roles, groups, member permissions, artifact permissions, launch rights, intersections, and workflow ownership. A visible form does not make every cell writable, and an approval task does not grant data access.</p><div className={styles.layerGrid}>{layers.map(([title, detail]) => <article key={title}><strong>{title}</strong><span>{detail}</span></article>)}</div><div className={design.designSequence}>{["Identity", "Role", "Group", "Data", "Artifact", "Rule", "Workflow", "Evidence"].map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong>{index < 7 && <ArrowRight size={13} />}</div>)}</div><h3 className={sales.sectionTitle}>Confirm implementation readiness</h3><SelectionGrid items={securityReadinessControls} selected={selected} onToggle={onToggle} /><div className={sales.boundary}><div><strong>Planning Approvals</strong><span>Controls ownership, validation, promotion, rejection, and approval of a Scenario × Version × Entity planning unit.</span></div><div><strong>Task Manager</strong><span>Coordinates dated activities, dependencies, assignees, approvers, instructions, questions, attachments, alerts, and audit evidence.</span></div></div></>;
}

function RoleAccessMatrix({ answers, onAnswer }: AnswerProps) {
  const downloads = [["phase-17-security-workflow-practice-pack.zip", "Complete practice pack"], ["README.md", "Instructions and capture guide"], ["security-role-matrix.csv", "Role and group matrix"], ["member-access-matrix.csv", "Member access matrix"], ["artifact-access-matrix.csv", "Artifact and rule access"], ["workflow-design.csv", "Approval workflow design"], ["security-test-cases.csv", "Security test cases"], ["workflow-test-cases.csv", "Workflow test cases"], ["expected-security-results.csv", "Expected results"], ["security-exception-log.csv", "Exception log"]] as const;
  return <><Lead icon={<Users size={23} />} eyebrow="Design before provisioning" title="Translate job responsibilities into groups, then map each group to the lowest required environment role, application roles, data scope, artifacts, rules, and workflow duties." /><div className={sales.downloadGrid}>{downloads.map(([file, label]) => <a download href={`${packPath}${file}`} key={file}><Download size={17} /><div><strong>{label}</strong><small>{file}</small></div></a>)}</div><div className={styles.sodStrip}><ShieldX size={20} /><div><strong>Segregation-of-duties rule</strong><span>The same person should not routinely prepare, independently review, approve, and technically administer the same planning scope. Emergency access is time-bound, approved, logged, and reviewed.</span></div></div><DecisionTable items={roleAccessCases} answers={answers} onAnswer={onAnswer} label="role-access response" /></>;
}

function MemberDataSecurity({ answers, onAnswer }: AnswerProps) {
  return <><Lead icon={<FileKey2 size={23} />} eyebrow="Secure the data intersection" title="Apply member access to the dimensions that define ownership, protect sourced and approved data, and combine it with valid-intersection or cell-level controls where cross-dimensional behavior is required." /><div className={styles.accessMatrix}><div className={styles.matrixHead}><strong>Persona</strong><strong>Plan1</strong><strong>ApexPlan ASO</strong><strong>Primary scope</strong></div>{[["Sales Planner", "Write owned sales inputs", "Read reconciled results", "Forecast / Working · assigned products/entities"], ["Operations Planner", "Write owned production inputs", "Read operational summaries", "Forecast / Working · assigned plants"], ["Finance Reviewer", "Read/review; controlled adjustments", "Read management results", "Company and assigned review scope"], ["Executive Viewer", "No input authority", "Read approved results", "Approved management reporting"], ["Service Administrator", "Technical administration", "Technical administration", "Not the routine business approver"]].map((row) => <div key={row[0]}>{row.map((cell, cellIndex) => <span key={`${row[0]}-${cellIndex}`}>{cell}</span>)}</div>)}</div><DecisionTable items={memberAccessCases} answers={answers} onAnswer={onAnswer} label="member-access response" /><div className={styles.referenceNote}><KeyRound size={20} /><div><strong>Inheritance needs evidence</strong><span>Multiple group memberships can change effective access. Review inherited permissions and test the final user experience; do not infer access from a single matrix row.</span></div></div></>;
}

function ArtifactRuleSecurity({ answers, onAnswer }: AnswerProps) {
  return <><Lead icon={<KeyRound size={23} />} eyebrow="Access is cumulative across layers" title="Expose the right workspace, then prove that every visible cell and action still respects member permissions, rule launch rights, and the representative user's effective role." /><div className={styles.controlFlow}>{["Open assigned navigation", "Open allowed form", "Resolve POV", "Edit allowed cells", "Block protected cells", "Launch allowed rule", "Refresh and reconcile"].map((item, index) => <article key={item}><span>{index + 1}</span><strong>{item}</strong></article>)}</div><DecisionTable items={artifactAccessCases} answers={answers} onAnswer={onAnswer} label="artifact-access response" /><div className={styles.referenceNote}><ShieldCheck size={20} /><div><strong>Web and Smart View are two channels to the same governed model</strong><span>A protected web cell must not become editable in Excel. Test refresh, edit, submit, rule launch, and denied behavior using the actual representative role.</span></div></div></>;
}

function PlanningApprovals(props: AnswerProps & WorkflowLabProps) {
  return <><Lead icon={<GitPullRequestArrow size={23} />} eyebrow="Ownership moves with the plan" title="Use an Entity-based approval-unit hierarchy for Forecast / Working so preparation, validation, review, rejection, promotion, and approval are visible and auditable." /><div className={styles.workflowContract}><div><small>Approval dimension</small><strong>Entity</strong><span>Pune and Noida planning units</span></div><div><small>Governed combination</small><strong>Forecast / Working</strong><span>Actual and Approved remain outside this input cycle</span></div><div><small>Template</small><strong>Bottom Up</strong><span>Preparer → Operations Reviewer → Finance Approver</span></div><div><small>Promotion controls</small><strong>Validated and reconciled</strong><span>Critical exceptions and balance differences must be zero</span></div></div><DecisionTable items={approvalWorkflowCases} answers={props.answers} onAnswer={props.onAnswer} label="approval-workflow response" /><WorkflowLab {...props} /></>;
}

function TaskManagerLesson({ answers, onAnswer }: AnswerProps) {
  const tasks = [["01", "Load and reconcile actuals", "Data Integration", "Finance Reviewer", "Cycle opened"], ["02", "Prepare sales forecast", "Sales Planner", "Sales Reviewer", "01 complete"], ["03", "Review production and capacity", "Operations Planner", "Operations Reviewer", "02 complete"], ["04", "Review integrated financials", "Finance Planner", "Finance Approver", "03 complete"], ["05", "Approve and publish", "Process Owner", "Finance Director", "04 and approval units complete"]] as const;
  return <><Lead icon={<ListChecks size={23} />} eyebrow="A repeatable system of record" title="Use Task Manager to coordinate who does what by when, in what order, with which instructions and evidence—then reconcile tasks with the actual Planning state." /><div className={styles.taskTable}><div className={styles.taskHead}><strong>#</strong><strong>Task</strong><strong>Assignee</strong><strong>Approver</strong><strong>Dependency</strong></div>{tasks.map((task) => <div key={task[0]}>{task.map((cell) => <span key={cell}>{cell}</span>)}</div>)}</div><DecisionTable items={taskManagerCases} answers={answers} onAnswer={onAnswer} /><div className={styles.sodStrip}><UserCheck size={20} /><div><strong>Task status is evidence, not data authority</strong><span>An approved task does not automatically approve a Planning unit or unlock a data intersection. The process must reconcile Task Manager status, Approval status, job results, and the resulting plan.</span></div></div></>;
}

function SecurityTesting({ answers, onAnswer, reconciled, onReconcile }: AnswerProps & { reconciled: string[]; onReconcile: (item: string) => void }) {
  return <><Lead icon={<ShieldX size={23} />} eyebrow="Prove both allow and deny" title="Execute representative-role tests across web, Smart View, rules, approvals, and tasks. A successful administrator test proves configuration access—not end-user control." /><div className={styles.testLegend}><span><CheckCircle2 size={15} />Positive test: required work succeeds</span><span><ShieldX size={15} />Negative test: forbidden work is blocked</span><span><ClipboardCheck size={15} />Evidence: identity, context, action, result, timestamp, reviewer</span></div><DecisionTable items={securityTestCases} answers={answers} onAnswer={onAnswer} label="security-test result" /><h3 className={sales.sectionTitle}>Reconcile effective security and workflow</h3><SelectionGrid items={securityReconciliationControls} selected={reconciled} onToggle={onReconcile} /></>;
}

function SecurityWalkthrough({ selected, onToggle }: { selected: string[]; onToggle: (item: string) => void }) {
  return <><Lead icon={<Camera size={23} />} eyebrow="Configuration plus resulting behavior" title="Capture one controlled ApexPlan cycle that shows what was configured, what each representative role experiences, how ownership moves, and how evidence reconciles." /><SelectionGrid items={securityWalkthroughControls} selected={selected} onToggle={onToggle} /><ScreenshotWalkthrough /><div className={sales.scopeTag}>The ten slots are intentionally ready for your Oracle screenshots. Capture them only after the Phase 17 group names, access matrix, approval hierarchy, and Task Manager schedule are stable.</div></>;
}

function SecurityHomework(props: HomeworkProps) {
  return <><Lead icon={<BookOpenCheck size={23} />} eyebrow="Applied implementation lab" title="Complete a realistic least-privilege design, secure the planning experience, move one clean approval unit, coordinate the schedule, and defend the release decision with evidence." /><div className={sales.missionTabs}>{securityHomeworkMissions.map((mission) => <button className={props.active === mission.id ? sales.activeMission : ""} key={mission.id} onClick={() => props.onActive(mission.id)} type="button"><span>{props.status[mission.id] ? <CheckCircle2 size={16} /> : <PlayCircle size={16} />}</span><div><strong>{mission.label}</strong><small>{mission.purpose}</small></div></button>)}</div><section className={sales.missionWorkspace}>{props.active === "matrix" && <DecisionTable items={roleAccessCases} answers={props.roleAnswers} onAnswer={props.onRole} label="role-access response" />}{props.active === "data" && <><DecisionTable items={memberAccessCases} answers={props.memberAnswers} onAnswer={props.onMember} label="member-access response" /><DecisionTable items={artifactAccessCases} answers={props.artifactAnswers} onAnswer={props.onArtifact} label="artifact-access response" /></>}{props.active === "workflow" && <><DecisionTable items={approvalWorkflowCases} answers={props.approvalAnswers} onAnswer={props.onApproval} label="approval-workflow response" /><WorkflowLab inputs={props.workflowInputs} onInput={props.onWorkflowInput} stage={props.workflowStage} attempted={props.workflowAttempted} onAdvance={props.onAdvance} answers={props.approvalAnswers} onAnswer={props.onApproval} /></>}{props.active === "tasks" && <DecisionTable items={taskManagerCases} answers={props.taskAnswers} onAnswer={props.onTask} label="Task Manager response" />}{props.active === "readout" && <><DecisionTable items={securityTestCases} answers={props.testAnswers} onAnswer={props.onTest} label="security-test result" /><h3 className={sales.sectionTitle}>Confirm the implementation order</h3><SequenceList items={securityExecutionSequence} selected={props.sequence} onToggle={props.onSequence} /><h3 className={sales.sectionTitle}>Confirm the final reconciliations</h3><SelectionGrid items={securityReconciliationControls} selected={props.reconciled} onToggle={props.onReconcile} /><label className={sales.summaryField}>Security and workflow release recommendation<textarea rows={12} value={props.readout} onChange={(event) => props.onReadout(event.target.value)} placeholder="Summarize roles, groups, data and artifact scope, rules, web and Smart View tests, approval units, Task Manager, segregation, positive and negative evidence, reconciliations, exceptions, residual risks, owners, reviewers, and release recommendation." /><small>{props.readout.trim().length}/240 minimum characters</small></label></>}</section></>;
}

function SecurityExitGate({ selected, onToggle, summary, onSummary, answers, onAnswer, preview }: { selected: string[]; onToggle: (item: string) => void; summary: string; onSummary: (value: string) => void; answers: Answers; onAnswer: (id: string, value: string) => void; preview: string }) {
  return <><Lead icon={<ClipboardCheck size={23} />} eyebrow="Phase deliverable" title="Hand off an independently reviewed security and workflow baseline that protects data, enables each role's real work, proves denied behavior, and preserves an auditable planning cycle." /><h3 className={sales.sectionTitle}>Deliverable checklist</h3><SelectionGrid items={securityArtifacts} selected={selected} onToggle={onToggle} /><label className={sales.summaryField}>Security and workflow release-readiness summary<textarea rows={12} value={summary} onChange={(event) => onSummary(event.target.value)} placeholder="Summarize the role and group model, application roles, member and artifact permissions, rules, Smart View, approval hierarchy, Task Manager, segregation, positive and negative tests, effective-access reconciliation, exceptions, periodic review, support, owners, reviewers, residual risks, and approval." /><small>{summary.trim().length}/240 minimum characters</small></label><h3 className={sales.sectionTitle}>Knowledge check</h3><div className={base.quizList}>{securityKnowledgeQuestions.map((question, index) => <fieldset key={question.id}><legend><span>{index + 1}</span>{question.prompt}</legend>{question.options.map((option) => <label key={option}><input checked={answers[question.id] === option} name={question.id} onChange={() => onAnswer(question.id, option)} type="radio" />{option}</label>)}</fieldset>)}</div><div className={sales.preview}><small>Generated Phase 17 handoff</small><p>{preview}</p><div>Planner experience <ArrowRight size={13} /> Security and workflow <ArrowRight size={13} /> Scenario and what-if planning</div></div></>;
}

function WorkflowLab({ inputs, onInput, stage, attempted, onAdvance }: WorkflowLabProps) {
  const stages = [["Not Started", "Administrator", "Start"], ["Under Review", "Pune Preparer", "Submit"], ["Under Review", "Operations Reviewer", "Promote"], ["Under Review", "Finance Approver", "Approve"], ["Approved", "Finance Approver", "Complete"]] as const;
  const valid = inputs.criticalExceptions === 0 && inputs.balanceVariance === 0 && inputs.reportingVariance === 0 && inputs.annotation.trim().length >= 40;
  const current = stages[stage];
  return <section className={styles.workflowLab}><header><div><GitPullRequestArrow size={19} /><div><small>PUNE · FORECAST / WORKING · FY25</small><strong>Approval unit simulation</strong></div></div><span>{current[0]} · {current[1]}</span></header><div className={styles.stagePath}>{stages.map((item, index) => <article className={index <= stage ? styles.stageActive : ""} key={`${item[0]}-${item[1]}`}><span>{index < stage ? <Check size={14} /> : index + 1}</span><div><strong>{item[0]}</strong><small>{item[1]}</small></div></article>)}</div><div className={styles.workflowControls}><label>Critical exceptions<input aria-label="Critical exceptions" min="0" type="number" value={inputs.criticalExceptions} onChange={(event) => onInput({ ...inputs, criticalExceptions: Number(event.target.value) })} /></label><label>Balance variance<input aria-label="Balance variance" step="0.01" type="number" value={inputs.balanceVariance} onChange={(event) => onInput({ ...inputs, balanceVariance: Number(event.target.value) })} /></label><label>Reporting variance<input aria-label="Reporting variance" step="0.01" type="number" value={inputs.reportingVariance} onChange={(event) => onInput({ ...inputs, reportingVariance: Number(event.target.value) })} /></label></div><label className={styles.annotationField}>Approval annotation<textarea rows={3} value={inputs.annotation} onChange={(event) => onInput({ ...inputs, annotation: event.target.value })} /><small>{inputs.annotation.trim().length}/40 minimum characters</small></label>{attempted && !valid && <div className={styles.workflowError}><TriangleAlert size={17} /><span>Action blocked. Clear critical exceptions, reconcile both variances to zero, and provide a meaningful annotation.</span></div>}{stage === 4 && <div className={styles.workflowSuccess}><CheckCircle2 size={17} /><span>Approval complete. Ownership, state changes, validation, and annotation are ready for evidence capture.</span></div>}<footer><p>Validation is evaluated before ownership moves. A rejected unit returns through the configured path with its annotation and history intact.</p><button disabled={stage === 4} onClick={onAdvance} type="button"><PlayCircle size={15} />{stage === 4 ? "Approved" : current[2]}</button></footer></section>;
}

function ScreenshotWalkthrough() {
  return <section className={sales.walkthrough}><div className={sales.walkthroughHeader}><div><Camera size={20} /><div><small>Screenshot-guided procedure</small><strong>Security and workflow walkthrough</strong></div></div><span>{securityScreenshots.length} guided steps</span></div><div className={sales.walkthroughGrid}>{securityScreenshots.map((step, index) => <article key={step.id}><div className={sales.stepTitle}><span>{String(index + 1).padStart(2, "0")}</span><div><small>{step.id}</small><strong>{step.title}</strong></div></div><OracleScreenshot asset={step.asset} capture={step.capture} className={sales.screenshot} phase="phase-17" title={step.title} /><dl><div><dt>Navigation</dt><dd>{step.path}</dd></div><div><dt>Trainee action</dt><dd>{step.action}</dd></div><div><dt>Validation evidence</dt><dd>{step.evidence}</dd></div></dl></article>)}</div></section>; 
}

function Lead({ icon, eyebrow, title }: { icon: React.ReactNode; eyebrow: string; title: string }) { return <div className={base.lessonLead}>{icon}<div><small>{eyebrow}</small><strong>{title}</strong></div></div>; }
function SelectionGrid({ items, selected, onToggle }: { items: readonly string[]; selected: string[]; onToggle: (item: string) => void }) { return <div className={design.selectionGrid}>{items.map((item) => <button className={selected.includes(item) ? design.selectedCard : ""} key={item} onClick={() => onToggle(item)} type="button">{selected.includes(item) ? <CheckCircle2 size={17} /> : <span />}<strong>{item}</strong></button>)}</div>; }
function DecisionTable({ items, answers, onAnswer, label = "controlled response" }: { items: readonly { id: string; issue: string; correct: string; options: readonly string[] }[]; answers: Answers; onAnswer: (id: string, value: string) => void; label?: string }) { return <div className={design.mappingTable}>{items.map((item) => <div className={design.tableRow} key={item.id}><div><strong>{item.id}</strong><small>{item.issue}</small></div><select aria-label={`${item.id} ${label}`} value={answers[item.id] ?? ""} onChange={(event) => onAnswer(item.id, event.target.value)}><option value="">Select controlled response</option>{item.options.map((option) => <option key={option}>{option}</option>)}</select></div>)}</div>; }
function SequenceList({ items, selected, onToggle }: { items: readonly string[]; selected: string[]; onToggle: (item: string) => void }) { return <div className={sales.sequence}>{items.map((item) => <button className={selected.includes(item) ? sales.confirmed : ""} key={item} onClick={() => onToggle(item)} type="button"><strong>{item}</strong><span>{selected.includes(item) ? <Check size={15} /> : "Confirm"}</span></button>)}</div>; }

type AnswerProps = { answers: Answers; onAnswer: (id: string, value: string) => void };
type WorkflowLabProps = AnswerProps & { inputs: WorkflowInputs; onInput: (value: WorkflowInputs) => void; stage: number; attempted: boolean; onAdvance: () => void };
type HomeworkProps = {
  active: HomeworkId; onActive: (id: HomeworkId) => void; status: Record<HomeworkId, boolean>;
  roleAnswers: Answers; onRole: (id: string, value: string) => void;
  memberAnswers: Answers; onMember: (id: string, value: string) => void;
  artifactAnswers: Answers; onArtifact: (id: string, value: string) => void;
  approvalAnswers: Answers; onApproval: (id: string, value: string) => void;
  workflowInputs: WorkflowInputs; onWorkflowInput: (value: WorkflowInputs) => void; workflowStage: number; workflowAttempted: boolean; onAdvance: () => void;
  taskAnswers: Answers; onTask: (id: string, value: string) => void;
  testAnswers: Answers; onTest: (id: string, value: string) => void;
  sequence: string[]; onSequence: (item: string) => void; reconciled: string[]; onReconcile: (item: string) => void;
  readout: string; onReadout: (value: string) => void;
};
