"use client";

import {
  ArrowRight,
  BookOpenCheck,
  BriefcaseBusiness,
  Camera,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Download,
  FileCheck2,
  GitPullRequestArrow,
  MessageSquareWarning,
  PlayCircle,
  RefreshCw,
  ShieldCheck,
  TriangleAlert,
  UserCheck,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from "react";
import { performanceTestingLessons } from "@/content/performance-testing-module";
import {
  uatAcceptanceCases,
  uatArtifacts,
  uatControlChecks,
  uatEvidenceCases,
  uatExecutionSequence,
  uatHomeworkMissions,
  uatIssueCases,
  uatKnowledgeQuestions,
  uatParticipantCases,
  uatReadinessControls,
  uatScreenshots,
  uatWalkthroughControls,
  uatWorkflowCases,
  userAcceptanceTestingLessons,
  type UserAcceptanceTestingLessonId,
} from "@/content/user-acceptance-testing-module";
import { readTrackProgress, writeTrackProgress } from "@/lib/learning-progress";
import design from "./application-dimension-design-module.module.css";
import base from "./discovery-module.module.css";
import sales from "./sales-planning-build-module.module.css";
import styles from "./user-acceptance-testing-module.module.css";
import { LearningModuleFrame, type ModuleFeedback } from "./learning-module-frame";
import { OracleScreenshot } from "./oracle-screenshot";

type Answers = Record<string, string>;
type HomeworkId = (typeof uatHomeworkMissions)[number]["id"];
type UatInputs = { plannedSteps: number; passedSteps: number; evidenceItems: number; openCritical: number; openHigh: number; balanceVariance: number; reportingVariance: number; evidenceNote: string };

const packPath = "/training/oracle-planning/phase-21/";
const defaultInputs: UatInputs = {
  plannedSteps: 8,
  passedSteps: 8,
  evidenceItems: 8,
  openCritical: 0,
  openHigh: 0,
  balanceVariance: 0,
  reportingVariance: 0,
  evidenceNote: "UAT-JOURNEY-01 is executed by representative Apex business roles on Release Candidate 1 using the frozen FY25 data pack, expected controls, and retained step evidence.",
};

export function UserAcceptanceTestingModule() {
  const [activeLesson, setActiveLesson] = useState<UserAcceptanceTestingLessonId>("uat-foundations");
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<ModuleFeedback>(null);
  const [readiness, setReadiness] = useState<string[]>([]);
  const [acceptanceAnswers, setAcceptanceAnswers] = useState<Answers>({});
  const [participantAnswers, setParticipantAnswers] = useState<Answers>({});
  const [workflowAnswers, setWorkflowAnswers] = useState<Answers>({});
  const [issueAnswers, setIssueAnswers] = useState<Answers>({});
  const [evidenceAnswers, setEvidenceAnswers] = useState<Answers>({});
  const [inputs, setInputs] = useState<UatInputs>(defaultInputs);
  const [stage, setStage] = useState(0);
  const [attempted, setAttempted] = useState(false);
  const [controls, setControls] = useState<string[]>([]);
  const [walkthroughChecks, setWalkthroughChecks] = useState<string[]>([]);
  const [activeHomework, setActiveHomework] = useState<HomeworkId>("design");
  const [sequence, setSequence] = useState<string[]>([]);
  const [readout, setReadout] = useState("");
  const [artifacts, setArtifacts] = useState<string[]>([]);
  const [summary, setSummary] = useState("");
  const [knowledgeAnswers, setKnowledgeAnswers] = useState<Answers>({});

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = readTrackProgress("implementation");
      setCompletedLessons(stored.completedLessons);
      const saved = userAcceptanceTestingLessons.find((lesson) => lesson.id === stored.activeLesson);
      if (saved) setActiveLesson(saved.id);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const prerequisiteComplete = performanceTestingLessons.every((lesson) => completedLessons.includes(lesson.id));
  const allCorrect = (items: readonly { id: string; correct: string }[], answers: Answers) => items.every((item) => answers[item.id] === item.correct);
  const journeyValid = validateUatInputs(inputs);
  const knowledgeReady = uatKnowledgeQuestions.every((question) => knowledgeAnswers[question.id] === question.correct);
  const homeworkStatus: Record<HomeworkId, boolean> = {
    design: allCorrect(uatAcceptanceCases, acceptanceAnswers) && allCorrect(uatParticipantCases, participantAnswers),
    planner: stage >= 5,
    approval: stage === 8 && allCorrect(uatWorkflowCases, workflowAnswers),
    issues: allCorrect(uatIssueCases, issueAnswers) && allCorrect(uatEvidenceCases, evidenceAnswers) && controls.length === uatControlChecks.length,
    readout: sequence.length === uatExecutionSequence.length && readout.trim().length >= 240,
  };
  const preview = useMemo(
    () => artifacts.length === uatArtifacts.length && summary.trim().length >= 240
      ? `${summary.trim()} The acceptance record identifies the tested release and scope, business participation, execution evidence, exceptions, residual risks, deployment conditions, owners, and authorized decision.`
      : "Complete all eight UAT artifacts and provide an acceptance summary of at least 240 characters.",
    [artifacts, summary],
  );

  function persist(nextCompleted: string[], lesson: UserAcceptanceTestingLessonId) {
    writeTrackProgress("implementation", { completedLessons: nextCompleted, activeLesson: lesson, activeModuleId: "implementation-user-acceptance-testing", lastVisited: new Date().toISOString() });
  }

  function goToLesson(id: UserAcceptanceTestingLessonId) {
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

  function advanceJourney() {
    setAttempted(true);
    if (journeyValid && stage < 8) setStage((current) => current + 1);
  }

  function validateLesson() {
    if (activeLesson === "uat-foundations") {
      if (readiness.length !== uatReadinessControls.length) return setFeedback({ tone: "error", message: "Confirm all five release, ownership, users, environment, and operating-readiness controls." });
      return markComplete("UAT scope, release, business ownership, users, data, scripts, support, issue handling, evidence, and decision rules are controlled.");
    }
    if (activeLesson === "uat-scenarios") {
      if (!allCorrect(uatAcceptanceCases, acceptanceAnswers)) return setFeedback({ tone: "error", message: "Resolve every acceptance-criteria, journey, change-request, and severity decision." });
      return markComplete("Requirements now map to realistic business journeys with measurable outcomes, controls, workflow, evidence, ownership, and materiality.");
    }
    if (activeLesson === "uat-users-data") {
      if (!allCorrect(uatParticipantCases, participantAnswers)) return setFeedback({ tone: "error", message: "Correct all business-execution, named-role, representative-data, and independent-expectation decisions." });
      return markComplete("Named business representatives, least-privilege roles, user variables, representative data, expected results, training, and support are ready.");
    }
    if (activeLesson === "uat-planner-journey") {
      if (stage < 5) return setFeedback({ tone: "error", message: "Advance the journey through actuals review, controlled input, calculation, exception resolution, and submission with all eight steps and evidence items passed." });
      return markComplete("The planner completed the assigned business journey from trusted opening state through validated calculation, exception resolution, annotation, and submission.");
    }
    if (activeLesson === "uat-review-approval") {
      if (stage !== 8 || !allCorrect(uatWorkflowCases, workflowAnswers)) return setFeedback({ tone: "error", message: "Complete rejection, correction, resubmission, approval, Task Manager alignment, publish, dashboard reconciliation, and all workflow decisions." });
      return markComplete("Reviewers and approvers proved validation, rejection, ownership return, correction, resubmission, final approval, coordinated tasks, publish, and reconciled management reporting.");
    }
    if (activeLesson === "uat-issues-retest") {
      if (!allCorrect(uatIssueCases, issueAnswers)) return setFeedback({ tone: "error", message: "Resolve every issue-quality, regression, build-control, and conditional-acceptance decision." });
      return markComplete("Observations are reproducible and correctly classified; controlled fixes, retests, regression, workarounds, residual risks, and scope changes remain traceable.");
    }
    if (activeLesson === "uat-evidence-acceptance") {
      if (!allCorrect(uatEvidenceCases, evidenceAnswers) || controls.length !== uatControlChecks.length) return setFeedback({ tone: "error", message: "Resolve all evidence and sign-off decisions and confirm every traceability, role, path, reconciliation, classification, and acceptance control." });
      return markComplete("UAT coverage, execution, issues, reconciliations, business participation, conditions, and sign-off evidence support an explicit acceptance decision.");
    }
    if (activeLesson === "uat-walkthrough") {
      if (walkthroughChecks.length !== uatWalkthroughControls.length) return setFeedback({ tone: "error", message: "Confirm all five context, essential-screen, document-evidence, exception-path, and privacy capture controls." });
      return markComplete("The walkthrough is limited to six Oracle interactions that materially teach the business journey; scripts and governance evidence remain in controlled templates.");
    }
    if (activeLesson === "uat-homework") {
      if (!Object.values(homeworkStatus).every(Boolean)) return setFeedback({ tone: "error", message: "Complete all five applied missions, including design, planner execution, approval, issue governance, controls, sequence, and acceptance readout." });
      return markComplete("Applied UAT lab complete. Business journeys, participation, results, issues, fixes, regression, risks, conditions, and acceptance are ready for sign-off.");
    }
    if (artifacts.length !== uatArtifacts.length || summary.trim().length < 240 || !knowledgeReady) return setFeedback({ tone: "error", message: "Select all eight deliverables, provide a 240-character summary, and answer all five knowledge checks correctly." });
    markComplete("Phase 21 exit gate passed. The accepted release and open conditions are ready for Phase 22 defect governance and closure planning.");
  }

  const labProps: UatLabProps = { inputs, onInput: setInputs, stage, attempted, onAdvance: advanceJourney };

  return (
    <LearningModuleFrame
      activeLessonId={activeLesson}
      completedLessons={completedLessons}
      description="Enable representative Apex business users to execute realistic planning, review, approval, Smart View, and management-reporting journeys; control issues and retests; and formally accept a defined release, scope, risk, and deployment condition."
      exitGate="Approve business-journey and role coverage, completed scripts, actual results, workflow and reporting evidence, issue classification, fixes, retest and regression, reconciliations, training and support conditions, open risks, and the formal business acceptance decision"
      exitGateIcon={<UserCheck size={18} />}
      feedback={feedback}
      lessons={userAcceptanceTestingLessons}
      onSelectLesson={(id) => goToLesson(id as UserAcceptanceTestingLessonId)}
      onValidate={validateLesson}
      phase={21}
      prerequisite={{ complete: prerequisiteComplete, message: "Complete Phase 20 so business users evaluate a functionally correct, performance-tested, controlled release candidate with known operating conditions.", href: "/learn/performance-testing", linkLabel: "Open Phase 20" }}
      stage="Validate · User acceptance testing"
      title="User Acceptance Testing"
      validateLabel={activeLesson === "uat-exit-gate" ? "Approve UAT exit" : undefined}
    >
      {activeLesson === "uat-foundations" && <UatFoundations selected={readiness} onToggle={(item) => toggle(setReadiness, item)} />}
      {activeLesson === "uat-scenarios" && <UatScenarios answers={acceptanceAnswers} onAnswer={(id, value) => setAcceptanceAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "uat-users-data" && <UatUsersData answers={participantAnswers} onAnswer={(id, value) => setParticipantAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "uat-planner-journey" && <UatPlannerJourney {...labProps} />}
      {activeLesson === "uat-review-approval" && <UatReviewApproval labProps={labProps} answers={workflowAnswers} onAnswer={(id, value) => setWorkflowAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "uat-issues-retest" && <UatIssues answers={issueAnswers} onAnswer={(id, value) => setIssueAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "uat-evidence-acceptance" && <UatEvidence answers={evidenceAnswers} onAnswer={(id, value) => setEvidenceAnswers((current) => ({ ...current, [id]: value }))} selected={controls} onToggle={(item) => toggle(setControls, item)} />}
      {activeLesson === "uat-walkthrough" && <UatWalkthrough selected={walkthroughChecks} onToggle={(item) => toggle(setWalkthroughChecks, item)} />}
      {activeLesson === "uat-homework" && <UatHomework active={activeHomework} onActive={setActiveHomework} status={homeworkStatus} acceptanceAnswers={acceptanceAnswers} onAcceptance={(id, value) => setAcceptanceAnswers((current) => ({ ...current, [id]: value }))} participantAnswers={participantAnswers} onParticipant={(id, value) => setParticipantAnswers((current) => ({ ...current, [id]: value }))} labProps={labProps} workflowAnswers={workflowAnswers} onWorkflow={(id, value) => setWorkflowAnswers((current) => ({ ...current, [id]: value }))} issueAnswers={issueAnswers} onIssue={(id, value) => setIssueAnswers((current) => ({ ...current, [id]: value }))} evidenceAnswers={evidenceAnswers} onEvidence={(id, value) => setEvidenceAnswers((current) => ({ ...current, [id]: value }))} controls={controls} onControl={(item) => toggle(setControls, item)} sequence={sequence} onSequence={(item) => toggle(setSequence, item)} readout={readout} onReadout={setReadout} />}
      {activeLesson === "uat-exit-gate" && <UatExitGate selected={artifacts} onToggle={(item) => toggle(setArtifacts, item)} summary={summary} onSummary={setSummary} answers={knowledgeAnswers} onAnswer={(id, value) => setKnowledgeAnswers((current) => ({ ...current, [id]: value }))} preview={preview} />}
    </LearningModuleFrame>
  );
}

function UatFoundations({ selected, onToggle }: ToggleProps) {
  return <><Lead icon={<UserCheck size={23} />} eyebrow="Business acceptance—not another technical test" title="UAT lets representative business users prove that the controlled release supports real planning decisions, roles, controls, workflow, reporting, policy, and operating responsibilities well enough to accept deployment risk." /><p className={base.bodyCopy}>SIT proved components work together and performance testing proved the workload envelope. UAT asks whether planners, reviewers, approvers, finance and reporting users can perform the actual Apex process with understandable results and acceptable controls. The implementation team supports the session; it does not execute or sign for the business.</p><div className={styles.phaseBoundary}><div><small>Phase 19 · SIT</small><strong>Technical integration</strong><span>End-to-end correctness, interfaces, controls, recovery, and regression.</span></div><div><small>Phase 20 · Performance</small><strong>Workload fitness</strong><span>Response, concurrency, stability, capacity, and operating conditions.</span></div><div><small>Phase 21 · UAT</small><strong>Business acceptance</strong><span>Journeys, roles, outputs, usability, control ownership, risk, and sign-off.</span></div></div><div className={design.designSequence}>{["Charter", "Design", "Prepare", "Execute", "Review", "Retest", "Accept", "Handoff"].map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong>{index < 7 && <ArrowRight size={13} />}</div>)}</div><h3 className={sales.sectionTitle}>Confirm UAT entry readiness</h3><SelectionGrid items={uatReadinessControls} selected={selected} onToggle={onToggle} /></>;
}

function UatScenarios({ answers, onAnswer }: AnswerProps) {
  const downloads = [["phase-21-user-acceptance-testing-practice-pack.zip", "Complete practice pack"], ["README.md", "Instructions and essential capture guide"], ["uat-scenario-catalog.csv", "Business journey and coverage catalogue"], ["uat-script.csv", "Step-level UAT script"], ["uat-data-user-register.csv", "Data, user, role, and variable register"], ["uat-execution-log.csv", "Execution and evidence log"], ["uat-issue-log.csv", "Issue, retest, and disposition log"], ["uat-daily-status.csv", "Coverage and daily status"], ["uat-signoff.csv", "Business acceptance record"]] as const;
  return <><Lead icon={<BriefcaseBusiness size={23} />} eyebrow="Design around decisions and outcomes" title="Translate approved requirements into complete business journeys with the right role, starting state, inputs, expected calculations, controls, workflow, reports, evidence, materiality, and accountable business owner." /><div className={sales.downloadGrid}>{downloads.map(([file, label]) => <a download href={`${packPath}${file}`} key={file}><Download size={17} /><div><strong>{label}</strong><small>{file}</small></div></a>)}</div><div className={styles.flow}>{["Requirement", "Business outcome", "Role and data", "Steps", "Expected result", "Control and workflow", "Evidence", "Acceptance owner"].map((item, index) => <article key={item}><span>{index + 1}</span><strong>{item}</strong></article>)}</div><DecisionTable items={uatAcceptanceCases} answers={answers} onAnswer={onAnswer} label="UAT acceptance response" /></>;
}

function UatUsersData({ answers, onAnswer }: AnswerProps) {
  const baseline = [["Release", "Performance-approved candidate", "Known conditions visible"], ["Users", "Named business representatives", "Planner, reviewer, approver, finance, reporting"], ["Access", "Representative least privilege", "Groups, user variables, forms, rules, workflow"], ["Data", "UAT-DATA-01", "Normal, boundary, exception and rejection cases"], ["Expected results", "Independent business controls", "Source records, transparent calculations, policies"], ["Support", "Observe and unblock", "Never execute or decide for the business"]] as const;
  return <><Lead icon={<Users size={23} />} eyebrow="The right people must use the right context" title="Prepare named business testers, representative access, user variables, governed data, independently derived expectations, training, support, reset, and privacy controls before the first script starts." /><div className={styles.baselineGrid}>{baseline.map(([label, value, detail]) => <article key={label}><small>{label}</small><strong>{value}</strong><span>{detail}</span></article>)}</div><DecisionTable items={uatParticipantCases} answers={answers} onAnswer={onAnswer} label="UAT participant response" /><Note icon={<ShieldCheck size={20} />} title="Business ownership is part of the evidence" body="A consultant can explain navigation or collect diagnostics, but the assigned business user must perform the journey, assess the actual result, record the decision, and own acceptance or rejection." /></>;
}

function UatPlannerJourney(props: UatLabProps) {
  return <><Lead icon={<PlayCircle size={23} />} eyebrow="Execute the real planning job" title="Start from controlled actuals, enter business assumptions, run permitted calculations, investigate exceptions, compare expected outcomes, annotate decisions, and submit the plan as the assigned planner." /><UatJourneyLab {...props} /><Note icon={<FileCheck2 size={20} />} title="Step-level evidence matters" body="The final dashboard cannot prove who entered the input, which POV was used, whether validation ran, what exception was resolved, or how ownership moved. Record the actual result at every material step." /></>;
}

function UatReviewApproval({ labProps, answers, onAnswer }: { labProps: UatLabProps; answers: Answers; onAnswer: AnswerHandler }) {
  return <><Lead icon={<GitPullRequestArrow size={23} />} eyebrow="Prove the complete decision loop" title="Review the submitted plan, reject it with a clear business reason, verify returned ownership, correct and resubmit, approve after validation, coordinate Task Manager, publish the accepted result, and reconcile reporting." /><UatJourneyLab {...labProps} /><DecisionTable items={uatWorkflowCases} answers={answers} onAnswer={onAnswer} label="UAT workflow response" /></>;
}

function UatIssues({ answers, onAnswer }: AnswerProps) {
  return <><Lead icon={<MessageSquareWarning size={23} />} eyebrow="Protect evidence and approved scope" title="Make every observation reproducible, classify it correctly, control fix builds, retest the original business failure, run risk-based regression, and keep workarounds, changes, limitations, and residual risks visible." /><div className={styles.evidenceChain}>{["Observe", "Reproduce", "Classify", "Assess impact", "Assign", "Fix build", "Retest", "Regress", "Dispose"].map((item, index) => <span key={item}>{item}{index < 8 && <ArrowRight size={12} />}</span>)}</div><DecisionTable items={uatIssueCases} answers={answers} onAnswer={onAnswer} label="UAT issue response" /><Note icon={<RefreshCw size={20} />} title="Phase 21 records acceptance impact; Phase 22 governs the full defect portfolio" body="UAT must capture, classify and retest issues well enough to decide acceptance. The next phase consolidates cross-test defects, aging, release disposition, closure evidence, and deployment control." /></>;
}

function UatEvidence({ answers, onAnswer, selected, onToggle }: AnswerProps & ToggleProps) {
  return <><Lead icon={<ClipboardCheck size={23} />} eyebrow="Acceptance is explicit and bounded" title="Reconcile scope, business participation, script evidence, issue disposition, outputs, workflows, training, support, cutover conditions, exceptions, and residual risk before an authorized owner accepts the defined release." /><DecisionTable items={uatEvidenceCases} answers={answers} onAnswer={onAnswer} label="UAT evidence response" /><h3 className={sales.sectionTitle}>Confirm acceptance controls</h3><SelectionGrid items={uatControlChecks} selected={selected} onToggle={onToggle} /></>;
}

function UatWalkthrough({ selected, onToggle }: ToggleProps) {
  return <><Lead icon={<Camera size={23} />} eyebrow="Only essential Oracle evidence" title="Use six focused captures to teach the actual business journey. Do not turn UAT scripts, issue logs, meetings, daily status, or sign-off into screenshots when structured templates are clearer and more auditable." /><SelectionGrid items={uatWalkthroughControls} selected={selected} onToggle={onToggle} /><ScreenshotWalkthrough /></>;
}

function UatHomework(props: HomeworkProps) {
  return <><Lead icon={<BookOpenCheck size={23} />} eyebrow="Applied business acceptance lab" title="Design the Apex business journeys, prepare representative users and data, execute planner and approver paths, govern issues and fixes, reconcile outputs, and defend the acceptance decision." /><div className={sales.missionTabs}>{uatHomeworkMissions.map((mission) => <button className={props.active === mission.id ? sales.activeMission : ""} key={mission.id} onClick={() => props.onActive(mission.id)} type="button"><span>{props.status[mission.id] ? <CheckCircle2 size={16} /> : <PlayCircle size={16} />}</span><div><strong>{mission.label}</strong><small>{mission.purpose}</small></div></button>)}</div><section className={sales.missionWorkspace}>{props.active === "design" && <><DecisionTable items={uatAcceptanceCases} answers={props.acceptanceAnswers} onAnswer={props.onAcceptance} label="UAT acceptance response" /><DecisionTable items={uatParticipantCases} answers={props.participantAnswers} onAnswer={props.onParticipant} label="UAT participant response" /></>}{props.active === "planner" && <UatJourneyLab {...props.labProps} />}{props.active === "approval" && <><UatJourneyLab {...props.labProps} /><DecisionTable items={uatWorkflowCases} answers={props.workflowAnswers} onAnswer={props.onWorkflow} label="UAT workflow response" /></>}{props.active === "issues" && <><DecisionTable items={uatIssueCases} answers={props.issueAnswers} onAnswer={props.onIssue} label="UAT issue response" /><DecisionTable items={uatEvidenceCases} answers={props.evidenceAnswers} onAnswer={props.onEvidence} label="UAT evidence response" /><SelectionGrid items={uatControlChecks} selected={props.controls} onToggle={props.onControl} /></>}{props.active === "readout" && <><h3 className={sales.sectionTitle}>Confirm UAT execution order</h3><SequenceList items={uatExecutionSequence} selected={props.sequence} onToggle={props.onSequence} /><label className={sales.summaryField}>Business acceptance recommendation<textarea rows={12} value={props.readout} onChange={(event) => props.onReadout(event.target.value)} placeholder="Summarize charter, release, environment, requirements and journeys, business roles, data, scripts, executions, pass/fail/blocked results, workflows, Smart View, reconciliations, issues, fixes, retest, regression, training, support, workarounds, residual risks, cutover conditions, owners, waivers, and acceptance recommendation." /><small>{props.readout.trim().length}/240 minimum characters</small></label></>}</section></>;
}

function UatExitGate({ selected, onToggle, summary, onSummary, answers, onAnswer, preview }: { selected: string[]; onToggle: (item: string) => void; summary: string; onSummary: (value: string) => void; answers: Answers; onAnswer: AnswerHandler; preview: string }) {
  return <><Lead icon={<UserCheck size={23} />} eyebrow="Phase deliverable" title="Hand off an authorized, evidence-backed business decision that identifies exactly what release and scope were accepted, what remains open, who owns each condition, and what defect, cutover, training, support, or deployment work still blocks go-live." /><h3 className={sales.sectionTitle}>Deliverable checklist</h3><SelectionGrid items={uatArtifacts} selected={selected} onToggle={onToggle} /><label className={sales.summaryField}>UAT acceptance summary<textarea rows={12} value={summary} onChange={(event) => onSummary(event.target.value)} placeholder="Summarize scope, release, environment, business owners and participants, requirement and journey coverage, data, executions, results, approvals, Task Manager, Smart View, reporting, reconciliations, issues, fixes, retest, regression, change requests, training, support, exceptions, workarounds, residual risks, deployment conditions, owners, waivers, authority, and decision date." /><small>{summary.trim().length}/240 minimum characters</small></label><h3 className={sales.sectionTitle}>Knowledge check</h3><div className={base.quizList}>{uatKnowledgeQuestions.map((question, index) => <fieldset key={question.id}><legend><span>{index + 1}</span>{question.prompt}</legend>{question.options.map((option) => <label key={option}><input checked={answers[question.id] === option} name={question.id} onChange={() => onAnswer(question.id, option)} type="radio" />{option}</label>)}</fieldset>)}</div><div className={sales.preview}><small>Generated Phase 21 handoff</small><p>{preview}</p><div>Performance-approved release <ArrowRight size={13} /> Business acceptance and conditions <ArrowRight size={13} /> Defect governance</div></div></>;
}

function UatJourneyLab({ inputs, onInput, stage, attempted, onAdvance }: UatLabProps) {
  const stages = [["UAT baseline ready", "Review actuals"], ["Actuals reviewed", "Enter assumptions"], ["Assumptions entered", "Run calculations"], ["Calculations passed", "Resolve exceptions"], ["Exceptions resolved", "Submit plan"], ["Plan submitted", "Reject and return"], ["Rejected with reason", "Correct and resubmit"], ["Resubmitted", "Approve and publish"], ["Dashboard accepted", "Complete"]] as const;
  const current = stages[stage];
  const valid = validateUatInputs(inputs);
  return <section className={styles.uatLab}><header><div><UserCheck size={19} /><div><small>UAT-JOURNEY-01 · FORECAST / WORKING · FY25</small><strong>Apex monthly planning acceptance journey</strong></div></div><span>{current[0]}</span></header><div className={styles.stagePath}>{stages.map((item, index) => <article className={index <= stage ? styles.stageActive : ""} key={item[0]}><span>{index < stage ? <Check size={14} /> : index + 1}</span><strong>{item[0]}</strong></article>)}</div><div className={styles.controlGrid}><NumberField label="Planned script steps" value={inputs.plannedSteps} onChange={(value) => onInput({ ...inputs, plannedSteps: value })} /><NumberField label="Passed script steps" value={inputs.passedSteps} onChange={(value) => onInput({ ...inputs, passedSteps: value })} /><NumberField label="Evidence items" value={inputs.evidenceItems} onChange={(value) => onInput({ ...inputs, evidenceItems: value })} /><NumberField label="Open critical issues" value={inputs.openCritical} onChange={(value) => onInput({ ...inputs, openCritical: value })} /><NumberField label="Open high issues" value={inputs.openHigh} onChange={(value) => onInput({ ...inputs, openHigh: value })} /><NumberField label="Balance variance" value={inputs.balanceVariance} onChange={(value) => onInput({ ...inputs, balanceVariance: value })} /><NumberField label="Reporting variance" value={inputs.reportingVariance} onChange={(value) => onInput({ ...inputs, reportingVariance: value })} /></div><label className={styles.evidenceNote}>Business execution note<textarea rows={3} value={inputs.evidenceNote} onChange={(event) => onInput({ ...inputs, evidenceNote: event.target.value })} /><small>{inputs.evidenceNote.trim().length}/60 minimum characters</small></label>{attempted && !valid && <div className={styles.runError}><TriangleAlert size={17} /><span>Journey blocked. Require eight planned, passed, and evidenced steps; zero critical or high issues; zero balance and reporting variance; and a 60-character business evidence note.</span></div>}{stage === 8 && <div className={styles.runSuccess}><CheckCircle2 size={17} /><span>Business journey accepted. Planner, rejection, correction, approval, publish, and reporting controls are ready for sign-off review.</span></div>}<div className={styles.metricGrid}><Metric label="Step coverage" value={`${inputs.passedSteps}/${inputs.plannedSteps}`} good={inputs.plannedSteps === 8 && inputs.passedSteps === 8} /><Metric label="Evidence coverage" value={`${inputs.evidenceItems}/8`} good={inputs.evidenceItems === 8} /><Metric label="Critical issues" value={String(inputs.openCritical)} good={inputs.openCritical === 0} /><Metric label="High issues" value={String(inputs.openHigh)} good={inputs.openHigh === 0} /><Metric label="Balance control" value={format(inputs.balanceVariance, 2)} good={inputs.balanceVariance === 0} /><Metric label="ASO variance" value={format(inputs.reportingVariance, 2)} good={inputs.reportingVariance === 0} /></div><footer><p>Each action represents a business script section. In UAT, the assigned user records actual results and evidence; the authorized owner decides acceptance against the approved criterion.</p><button disabled={stage === 8} onClick={onAdvance} type="button"><PlayCircle size={15} />{stage === 8 ? "Journey complete" : current[1]}</button></footer></section>;
}

function ScreenshotWalkthrough() {
  return <section className={sales.walkthrough}><div className={sales.walkthroughHeader}><div><Camera size={20} /><div><small>Essential screenshot-guided procedure</small><strong>Business acceptance walkthrough</strong></div></div><span>{uatScreenshots.length} guided steps</span></div><div className={sales.walkthroughGrid}>{uatScreenshots.map((step, index) => <article key={step.id}><div className={sales.stepTitle}><span>{String(index + 1).padStart(2, "0")}</span><div><small>{step.id}</small><strong>{step.title}</strong></div></div><OracleScreenshot asset={step.asset} capture={step.capture} className={sales.screenshot} phase="phase-21" title={step.title} /><dl><div><dt>Navigation</dt><dd>{step.path}</dd></div><div><dt>Trainee action</dt><dd>{step.action}</dd></div><div><dt>Validation evidence</dt><dd>{step.evidence}</dd></div></dl></article>)}</div></section>; 
}

function NumberField({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) { return <label>{label}<input aria-label={label} step="1" type="number" value={value} onChange={(event) => onChange(Number(event.target.value))} /></label>; }
function Metric({ label, value, good }: { label: string; value: string; good: boolean }) { return <article className={good ? styles.goodMetric : styles.badMetric}><small>{label}</small><strong>{value}</strong><span>{good ? <CheckCircle2 size={14} /> : <TriangleAlert size={14} />}{good ? "Passed" : "Investigate"}</span></article>; }
function Lead({ icon, eyebrow, title }: { icon: React.ReactNode; eyebrow: string; title: string }) { return <div className={base.lessonLead}>{icon}<div><small>{eyebrow}</small><strong>{title}</strong></div></div>; }
function Note({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) { return <div className={styles.referenceNote}>{icon}<div><strong>{title}</strong><span>{body}</span></div></div>; }
function SelectionGrid({ items, selected, onToggle }: SelectionProps) { return <div className={design.selectionGrid}>{items.map((item) => <button className={selected.includes(item) ? design.selectedCard : ""} key={item} onClick={() => onToggle(item)} type="button">{selected.includes(item) ? <CheckCircle2 size={17} /> : <span />}<strong>{item}</strong></button>)}</div>; }
function DecisionTable({ items, answers, onAnswer, label }: { items: readonly { id: string; issue: string; correct: string; options: readonly string[] }[]; answers: Answers; onAnswer: AnswerHandler; label: string }) { return <div className={design.mappingTable}>{items.map((item) => <div className={design.tableRow} key={item.id}><div><strong>{item.id}</strong><small>{item.issue}</small></div><select aria-label={`${item.id} ${label}`} value={answers[item.id] ?? ""} onChange={(event) => onAnswer(item.id, event.target.value)}><option value="">Select controlled response</option>{item.options.map((option) => <option key={option}>{option}</option>)}</select></div>)}</div>; }
function SequenceList({ items, selected, onToggle }: SelectionProps) { return <div className={sales.sequence}>{items.map((item) => <button className={selected.includes(item) ? sales.confirmed : ""} key={item} onClick={() => onToggle(item)} type="button"><strong>{item}</strong><span>{selected.includes(item) ? <Check size={15} /> : "Confirm"}</span></button>)}</div>; }

function validateUatInputs(input: UatInputs) { return input.plannedSteps === 8 && input.passedSteps === 8 && input.evidenceItems === 8 && input.openCritical === 0 && input.openHigh === 0 && input.balanceVariance === 0 && input.reportingVariance === 0 && input.evidenceNote.trim().length >= 60; }
function format(value: number, digits = 0) { return value.toLocaleString(undefined, { minimumFractionDigits: digits, maximumFractionDigits: digits }); }

type AnswerHandler = (id: string, value: string) => void;
type AnswerProps = { answers: Answers; onAnswer: AnswerHandler };
type ToggleProps = { selected: string[]; onToggle: (item: string) => void };
type SelectionProps = ToggleProps & { items: readonly string[] };
type UatLabProps = { inputs: UatInputs; onInput: (value: UatInputs) => void; stage: number; attempted: boolean; onAdvance: () => void };
type HomeworkProps = {
  active: HomeworkId; onActive: (id: HomeworkId) => void; status: Record<HomeworkId, boolean>;
  acceptanceAnswers: Answers; onAcceptance: AnswerHandler; participantAnswers: Answers; onParticipant: AnswerHandler;
  labProps: UatLabProps; workflowAnswers: Answers; onWorkflow: AnswerHandler;
  issueAnswers: Answers; onIssue: AnswerHandler; evidenceAnswers: Answers; onEvidence: AnswerHandler;
  controls: string[]; onControl: (item: string) => void; sequence: string[]; onSequence: (item: string) => void;
  readout: string; onReadout: (value: string) => void;
};
