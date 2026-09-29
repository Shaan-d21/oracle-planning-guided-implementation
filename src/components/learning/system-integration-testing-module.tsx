"use client";

import {
  ArrowRight,
  BookOpenCheck,
  Bug,
  Camera,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Download,
  FileCheck2,
  GitBranch,
  ListChecks,
  Network,
  PlayCircle,
  RefreshCw,
  ShieldCheck,
  TestTube2,
  TriangleAlert,
} from "lucide-react";
import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from "react";
import { scenarioWhatIfLessons } from "@/content/scenario-what-if-planning-module";
import {
  sitArtifacts,
  sitChannelCases,
  sitCoverageCases,
  sitDataCases,
  sitExecutionSequence,
  sitHomeworkMissions,
  sitInterfaceCases,
  sitKnowledgeQuestions,
  sitReadinessControls,
  sitReconciliationCases,
  sitReconciliationControls,
  sitScreenshots,
  sitTestCases,
  sitWalkthroughControls,
  systemIntegrationTestingLessons,
  type SystemIntegrationTestingLessonId,
} from "@/content/system-integration-testing-module";
import { readTrackProgress, writeTrackProgress } from "@/lib/learning-progress";
import design from "./application-dimension-design-module.module.css";
import base from "./discovery-module.module.css";
import sales from "./sales-planning-build-module.module.css";
import styles from "./system-integration-testing-module.module.css";
import { LearningModuleFrame, type ModuleFeedback } from "./learning-module-frame";
import { OracleScreenshot } from "./oracle-screenshot";

type Answers = Record<string, string>;
type HomeworkId = (typeof sitHomeworkMissions)[number]["id"];
type SitInputs = { sourceRows: number; mappedRows: number; rejectedRows: number; controlledUnits: number; failedJobs: number; balanceVariance: number; reportingVariance: number; evidenceNote: string };

const packPath = "/training/oracle-planning/phase-19/";
const defaultInputs: SitInputs = {
  sourceRows: 240,
  mappedRows: 240,
  rejectedRows: 0,
  controlledUnits: 1380,
  failedJobs: 0,
  balanceVariance: 0,
  reportingVariance: 0,
  evidenceNote: "SIT-CYCLE-01 uses the approved clean fixture, common Forecast / Working POV, representative roles, and retained job evidence.",
};

export function SystemIntegrationTestingModule() {
  const [activeLesson, setActiveLesson] = useState<SystemIntegrationTestingLessonId>("sit-foundations");
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<ModuleFeedback>(null);
  const [readiness, setReadiness] = useState<string[]>([]);
  const [coverageAnswers, setCoverageAnswers] = useState<Answers>({});
  const [dataAnswers, setDataAnswers] = useState<Answers>({});
  const [interfaceAnswers, setInterfaceAnswers] = useState<Answers>({});
  const [reconciliationAnswers, setReconciliationAnswers] = useState<Answers>({});
  const [channelAnswers, setChannelAnswers] = useState<Answers>({});
  const [testAnswers, setTestAnswers] = useState<Answers>({});
  const [sitInputs, setSitInputs] = useState<SitInputs>(defaultInputs);
  const [sitStage, setSitStage] = useState(0);
  const [sitAttempted, setSitAttempted] = useState(false);
  const [reconciled, setReconciled] = useState<string[]>([]);
  const [walkthroughChecks, setWalkthroughChecks] = useState<string[]>([]);
  const [activeHomework, setActiveHomework] = useState<HomeworkId>("coverage");
  const [sequence, setSequence] = useState<string[]>([]);
  const [readout, setReadout] = useState("");
  const [artifacts, setArtifacts] = useState<string[]>([]);
  const [summary, setSummary] = useState("");
  const [knowledgeAnswers, setKnowledgeAnswers] = useState<Answers>({});

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = readTrackProgress("implementation");
      setCompletedLessons(stored.completedLessons);
      const saved = systemIntegrationTestingLessons.find((lesson) => lesson.id === stored.activeLesson);
      if (saved) setActiveLesson(saved.id);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const prerequisiteComplete = scenarioWhatIfLessons.every((lesson) => completedLessons.includes(lesson.id));
  const allCorrect = (items: readonly { id: string; correct: string }[], answers: Answers) => items.every((item) => answers[item.id] === item.correct);
  const sitValid = validateSitInputs(sitInputs);
  const knowledgeReady = sitKnowledgeQuestions.every((question) => knowledgeAnswers[question.id] === question.correct);
  const homeworkStatus: Record<HomeworkId, boolean> = {
    coverage: allCorrect(sitCoverageCases, coverageAnswers) && allCorrect(sitDataCases, dataAnswers),
    cycle: sitStage === 8,
    recovery: allCorrect(sitInterfaceCases, interfaceAnswers),
    controls: allCorrect(sitReconciliationCases, reconciliationAnswers) && allCorrect(sitChannelCases, channelAnswers) && reconciled.length === sitReconciliationControls.length,
    readout: allCorrect(sitTestCases, testAnswers) && sequence.length === sitExecutionSequence.length && readout.trim().length >= 240,
  };
  const preview = useMemo(
    () => artifacts.length === sitArtifacts.length && summary.trim().length >= 240
      ? `${summary.trim()} The released evidence traces requirements through integrated execution, controls, defects, retest, regression, residual risk, and the authorized SIT exit decision.`
      : "Complete all eight SIT artifacts and provide an exit-readiness summary of at least 240 characters.",
    [artifacts, summary],
  );

  function persist(nextCompleted: string[], lesson: SystemIntegrationTestingLessonId) {
    writeTrackProgress("implementation", { completedLessons: nextCompleted, activeLesson: lesson, activeModuleId: "implementation-system-integration-testing", lastVisited: new Date().toISOString() });
  }

  function goToLesson(id: SystemIntegrationTestingLessonId) {
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

  function advanceSit() {
    setSitAttempted(true);
    if (sitValid && sitStage < 8) setSitStage((current) => current + 1);
  }

  function validateLesson() {
    if (activeLesson === "sit-foundations") {
      if (readiness.length !== sitReadinessControls.length) return setFeedback({ tone: "error", message: "Confirm all five build, coverage, data, user, and test-governance entry controls." });
      return markComplete("SIT scope, exclusions, environment, data, roles, evidence, defect workflow, and entry and exit criteria are controlled.");
    }
    if (activeLesson === "sit-coverage") {
      if (!allCorrect(sitCoverageCases, coverageAnswers)) return setFeedback({ tone: "error", message: "Resolve every coverage, interface, test-case quality, and phase-boundary decision." });
      return markComplete("Requirements and interfaces trace to precise positive, negative, recovery, repeatability, security, workflow, and regression evidence.");
    }
    if (activeLesson === "sit-data-environment") {
      if (!allCorrect(sitDataCases, dataAnswers)) return setFeedback({ tone: "error", message: "Correct all fixture-version, environment-reset, representative-role, and independent-expected-result decisions." });
      return markComplete("The SIT environment, build, users, fixture, opening state, expected results, and reset procedure are repeatable and independently controlled.");
    }
    if (activeLesson === "sit-end-to-end") {
      if (sitStage !== 8) return setFeedback({ tone: "error", message: "Advance the controlled SIT cycle through all eight stages with 240 mapped rows, 1,380 units, zero rejects, failures, balance variance, and reporting variance." });
      return markComplete("The clean SIT cycle passed from baseline and source integration through calculations, statements, ASO reporting, channels, and workflow evidence.");
    }
    if (activeLesson === "sit-negative-recovery") {
      if (!allCorrect(sitInterfaceCases, interfaceAnswers)) return setFeedback({ tone: "error", message: "Resolve every mapping reject, failed-step restart, idempotency, protected-POV, and ASO publish recovery case." });
      return markComplete("Interfaces fail safely, reveal diagnostic evidence, preserve a known target state, restart at the documented point, and reconcile after recovery.");
    }
    if (activeLesson === "sit-reconciliation") {
      if (!allCorrect(sitReconciliationCases, reconciliationAnswers) || reconciled.length !== sitReconciliationControls.length) return setFeedback({ tone: "error", message: "Correct all detailed, full-precision, cube, and exception reconciliations and confirm all six end-to-end controls." });
      return markComplete("Source, modules, statements, Plan1, ApexPlan ASO, channels, workflows, and traceability reconcile at approved grain and precision.");
    }
    if (activeLesson === "sit-channels-defects") {
      if (!allCorrect(sitChannelCases, channelAnswers) || !allCorrect(sitTestCases, testAnswers)) return setFeedback({ tone: "error", message: "Resolve every cross-channel security, workflow, defect, regression, and executed-test decision." });
      return markComplete("Representative roles, web, Smart View, workflows, defects, retests, regression, workarounds, and residual risks are governed.");
    }
    if (activeLesson === "sit-walkthrough") {
      if (walkthroughChecks.length !== sitWalkthroughControls.length) return setFeedback({ tone: "error", message: "Confirm all five environment, evidence, grain, negative-test, recovery, and privacy capture controls." });
      return markComplete("The SIT walkthrough is ready for one versioned clean cycle plus controlled failure, recovery, security, workflow, defect, and retest evidence.");
    }
    if (activeLesson === "sit-homework") {
      if (!Object.values(homeworkStatus).every(Boolean)) return setFeedback({ tone: "error", message: "Complete all five applied missions, including the full SIT cycle, recoveries, controls, sequence, test results, and exit readout." });
      return markComplete("Applied SIT lab complete. Coverage, results, defects, reconciliations, regression, and residual risks are ready for exit review.");
    }
    if (artifacts.length !== sitArtifacts.length || summary.trim().length < 240 || !knowledgeReady) return setFeedback({ tone: "error", message: "Select all eight deliverables, provide a 240-character summary, and answer all five knowledge checks correctly." });
    markComplete("Phase 19 exit gate passed. The integrated solution is ready for Phase 20 performance testing.");
  }

  const labProps: SitLabProps = { inputs: sitInputs, onInput: setSitInputs, stage: sitStage, attempted: sitAttempted, onAdvance: advanceSit };

  return (
    <LearningModuleFrame
      activeLessonId={activeLesson}
      completedLessons={completedLessons}
      description="Prove that the full ApexPlan solution works together from controlled source data through integrations, Plan1 calculations, cross-module dependencies, security, workflow, Smart View, ApexPlan ASO reporting, recovery, and reconciliation."
      exitGate="Approve requirement and interface coverage, controlled data, end-to-end executions, negative and recovery evidence, detailed reconciliations, security and workflow results, defects, retests, regression, residual risks, and the formal SIT decision"
      exitGateIcon={<TestTube2 size={18} />}
      feedback={feedback}
      lessons={systemIntegrationTestingLessons}
      onSelectLesson={(id) => goToLesson(id as SystemIntegrationTestingLessonId)}
      onValidate={validateLesson}
      phase={19}
      prerequisite={{ complete: prerequisiteComplete, message: "Complete Phase 18 so SIT covers the approved baseline, alternative versions, selected-case promotion, workflow, publish, and reconciliation design.", href: "/learn/scenario-what-if-planning", linkLabel: "Open Phase 18" }}
      stage="Validate · System integration testing"
      title="System Integration Testing"
      validateLabel={activeLesson === "sit-exit-gate" ? "Approve SIT exit" : undefined}
    >
      {activeLesson === "sit-foundations" && <SitFoundations selected={readiness} onToggle={(item) => toggle(setReadiness, item)} />}
      {activeLesson === "sit-coverage" && <SitCoverage answers={coverageAnswers} onAnswer={(id, value) => setCoverageAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "sit-data-environment" && <SitDataEnvironment answers={dataAnswers} onAnswer={(id, value) => setDataAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "sit-end-to-end" && <SitEndToEnd {...labProps} />}
      {activeLesson === "sit-negative-recovery" && <SitNegativeRecovery answers={interfaceAnswers} onAnswer={(id, value) => setInterfaceAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "sit-reconciliation" && <SitReconciliation answers={reconciliationAnswers} onAnswer={(id, value) => setReconciliationAnswers((current) => ({ ...current, [id]: value }))} selected={reconciled} onToggle={(item) => toggle(setReconciled, item)} />}
      {activeLesson === "sit-channels-defects" && <SitChannelsDefects channelAnswers={channelAnswers} onChannel={(id, value) => setChannelAnswers((current) => ({ ...current, [id]: value }))} testAnswers={testAnswers} onTest={(id, value) => setTestAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "sit-walkthrough" && <SitWalkthrough selected={walkthroughChecks} onToggle={(item) => toggle(setWalkthroughChecks, item)} />}
      {activeLesson === "sit-homework" && <SitHomework active={activeHomework} onActive={setActiveHomework} status={homeworkStatus} coverageAnswers={coverageAnswers} onCoverage={(id, value) => setCoverageAnswers((current) => ({ ...current, [id]: value }))} dataAnswers={dataAnswers} onData={(id, value) => setDataAnswers((current) => ({ ...current, [id]: value }))} labProps={labProps} interfaceAnswers={interfaceAnswers} onInterface={(id, value) => setInterfaceAnswers((current) => ({ ...current, [id]: value }))} reconciliationAnswers={reconciliationAnswers} onReconciliation={(id, value) => setReconciliationAnswers((current) => ({ ...current, [id]: value }))} channelAnswers={channelAnswers} onChannel={(id, value) => setChannelAnswers((current) => ({ ...current, [id]: value }))} testAnswers={testAnswers} onTest={(id, value) => setTestAnswers((current) => ({ ...current, [id]: value }))} reconciled={reconciled} onReconcile={(item) => toggle(setReconciled, item)} sequence={sequence} onSequence={(item) => toggle(setSequence, item)} readout={readout} onReadout={setReadout} />}
      {activeLesson === "sit-exit-gate" && <SitExitGate selected={artifacts} onToggle={(item) => toggle(setArtifacts, item)} summary={summary} onSummary={setSummary} answers={knowledgeAnswers} onAnswer={(id, value) => setKnowledgeAnswers((current) => ({ ...current, [id]: value }))} preview={preview} />}
    </LearningModuleFrame>
  );
}

function SitFoundations({ selected, onToggle }: { selected: string[]; onToggle: (item: string) => void }) {
  return <><Lead icon={<TestTube2 size={23} />} eyebrow="Prove connected behavior" title="SIT verifies that configured components and interfaces work together from controlled input to authorized, reconciled output—with failures and recovery tested, not assumed." /><p className={base.bodyCopy}>Unit testing proves an individual rule or form. SIT proves the chain: data arrives, mappings work, rules run in order, modules reconcile, security is enforced, ownership moves, reporting receives the right values, and failures can be diagnosed and recovered without corrupting the baseline.</p><div className={styles.phaseBoundary}><div><small>Phase 19 · SIT</small><strong>Functional integration</strong><span>Components, interfaces, roles, workflow, failures, recovery, and end-to-end controls.</span></div><div><small>Phase 20 · Performance</small><strong>Workload behavior</strong><span>Concurrency, volume, response time, batch duration, stress, endurance, and capacity.</span></div><div><small>Phase 21 · UAT</small><strong>Business acceptance</strong><span>Business users confirm the solution supports real work and is acceptable for deployment.</span></div></div><div className={design.designSequence}>{["Trace", "Baseline", "Load", "Calculate", "Reconcile", "Authorize", "Recover", "Decide"].map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong>{index < 7 && <ArrowRight size={13} />}</div>)}</div><h3 className={sales.sectionTitle}>Confirm SIT entry readiness</h3><SelectionGrid items={sitReadinessControls} selected={selected} onToggle={onToggle} /></>;
}

function SitCoverage({ answers, onAnswer }: AnswerProps) {
  const downloads = [["phase-19-system-integration-testing-practice-pack.zip", "Complete practice pack"], ["README.md", "Instructions and capture guide"], ["sit-requirement-coverage.csv", "Requirement and test coverage"], ["sit-interface-inventory.csv", "Interface inventory"], ["sit-test-data-register.csv", "Test data register"], ["sit-end-to-end-script.csv", "End-to-end script"], ["sit-expected-results.csv", "Expected results"], ["sit-reconciliation-controls.csv", "Reconciliation controls"], ["sit-defect-log.csv", "Defect log"], ["sit-daily-status.csv", "Daily status and exit metrics"]] as const;
  return <><Lead icon={<ListChecks size={23} />} eyebrow="Coverage is traced, not estimated" title="Map every requirement and interface to the exact cases, data, roles, expected results, controls, evidence, defects, retests, regression, and final disposition that prove it." /><div className={sales.downloadGrid}>{downloads.map(([file, label]) => <a download href={`${packPath}${file}`} key={file}><Download size={17} /><div><strong>{label}</strong><small>{file}</small></div></a>)}</div><div className={styles.coverageFlow}>{["Requirement", "Component", "Interface", "Test case", "Expected result", "Execution", "Evidence", "Defect / pass"].map((item, index) => <article key={item}><span>{index + 1}</span><strong>{item}</strong></article>)}</div><DecisionTable items={sitCoverageCases} answers={answers} onAnswer={onAnswer} label="SIT coverage response" /></>;
}

function SitDataEnvironment({ answers, onAnswer }: AnswerProps) {
  const baseline = [["Environment", "SIT only", "URL hidden in retained evidence"], ["Build", "Approved release candidate", "Metadata, rules, forms, security, workflow, maps"], ["Fixture", "SIT-CYCLE-01", "240 rows · 1,380 controlled units"], ["POV", "Forecast / Working / FY25", "Company with controlled detail"], ["Users", "Representative roles", "Planner, reviewer, approver, viewer, admin"], ["Opening state", "Reset and reconciled", "No unexplained prior-cycle values"]] as const;
  return <><Lead icon={<FileCheck2 size={23} />} eyebrow="Repeatability begins before execution" title="Freeze the build, users, test fixtures, expected results, opening state, configuration references, and reset procedure so every rerun measures the same system." /><div className={styles.baselineGrid}>{baseline.map(([label, value, detail]) => <article key={label}><small>{label}</small><strong>{value}</strong><span>{detail}</span></article>)}</div><DecisionTable items={sitDataCases} answers={answers} onAnswer={onAnswer} label="test-data response" /><div className={styles.referenceNote}><ShieldCheck size={20} /><div><strong>Expected results need an independent basis</strong><span>Use approved source controls and transparent formulas. Copying values from Plan1 or a dashboard into the expected-results file only proves that the same output was copied twice.</span></div></div></>;
}

function SitEndToEnd(props: SitLabProps) {
  return <><Lead icon={<Network size={23} />} eyebrow="One controlled planning cycle" title="Execute the clean fixture through every dependency in order, stopping on failure and retaining the input, context, job, result, control, and reviewer evidence for each stage." /><SitExecutionLab {...props} /><div className={styles.runbookNote}><GitBranch size={19} /><span>Do not bypass a failed stage. Downstream success cannot compensate for an unresolved upstream mapping, calculation, security, workflow, or reconciliation failure.</span></div></>;
}

function SitNegativeRecovery({ answers, onAnswer }: AnswerProps) {
  return <><Lead icon={<RefreshCw size={23} />} eyebrow="Failure behavior is part of the solution" title="Inject controlled errors, prove safe failure and diagnostic evidence, correct the cause, restart from a known point, rerun, and confirm repeatability without duplicates or silent partial results." /><div className={styles.recoveryFlow}>{["Inject known fault", "Observe expected stop", "Protect target state", "Collect logs", "Diagnose root cause", "Apply fix", "Restart", "Reconcile and regress"].map((item, index) => <article key={item}><span>{index + 1}</span><strong>{item}</strong></article>)}</div><DecisionTable items={sitInterfaceCases} answers={answers} onAnswer={onAnswer} label="interface-recovery response" /><div className={styles.referenceNote}><Bug size={20} /><div><strong>A green rerun is not enough</strong><span>Retain the original failure, the exact fix build, restart point, corrected execution, reconciled target state, defect retest, and risk-based regression. Otherwise the recovery is not reproducible.</span></div></div></>;
}

function SitReconciliation({ answers, onAnswer, selected, onToggle }: AnswerProps & { selected: string[]; onToggle: (item: string) => void }) {
  return <><Lead icon={<GitBranch size={23} />} eyebrow="Control every handoff" title="Reconcile at the lowest governed grain, then at aggregate level, across source, modules, statements, cubes, channels, workflow, and traceability." /><DecisionTable items={sitReconciliationCases} answers={answers} onAnswer={onAnswer} label="reconciliation response" /><h3 className={sales.sectionTitle}>Confirm end-to-end controls</h3><SelectionGrid items={sitReconciliationControls} selected={selected} onToggle={onToggle} /></>;
}

function SitChannelsDefects({ channelAnswers, onChannel, testAnswers, onTest }: { channelAnswers: Answers; onChannel: (id: string, value: string) => void; testAnswers: Answers; onTest: (id: string, value: string) => void }) {
  return <><Lead icon={<Bug size={23} />} eyebrow="Behavior must agree across roles and channels" title="Test web, Smart View, dashboards, rules, security, Planning Approvals, and Task Manager with representative users, then control every defect through impact, fix, retest, regression, and disposition." /><div className={styles.defectFlow}>{["Detect", "Reproduce", "Classify", "Assess impact", "Assign", "Fix build", "Retest", "Regress", "Close / accept"].map((item, index) => <span key={item}>{item}{index < 8 && <ArrowRight size={12} />}</span>)}</div><DecisionTable items={sitChannelCases} answers={channelAnswers} onAnswer={onChannel} label="channel-defect response" /><h3 className={sales.sectionTitle}>Classify the executed SIT evidence</h3><DecisionTable items={sitTestCases} answers={testAnswers} onAnswer={onTest} label="executed-test response" /></>;
}

function SitWalkthrough({ selected, onToggle }: { selected: string[]; onToggle: (item: string) => void }) {
  return <><Lead icon={<Camera size={23} />} eyebrow="Evidence that can be independently reviewed" title="Capture one clean end-to-end cycle plus a deliberate failure, controlled recovery, repeatability run, security denial, workflow rejection, defect retest, and exit reconciliation." /><SelectionGrid items={sitWalkthroughControls} selected={selected} onToggle={onToggle} /><ScreenshotWalkthrough /><div className={sales.scopeTag}>The ten slots are intentionally empty. Capture the approved SIT cycle only after the environment baseline, fixtures, traceability, expected results, and evidence naming convention are frozen.</div></>;
}

function SitHomework(props: HomeworkProps) {
  return <><Lead icon={<BookOpenCheck size={23} />} eyebrow="Applied validation lab" title="Design coverage, baseline the environment, execute the integrated cycle, recover from known faults, reconcile every layer, and defend the SIT exit recommendation." /><div className={sales.missionTabs}>{sitHomeworkMissions.map((mission) => <button className={props.active === mission.id ? sales.activeMission : ""} key={mission.id} onClick={() => props.onActive(mission.id)} type="button"><span>{props.status[mission.id] ? <CheckCircle2 size={16} /> : <PlayCircle size={16} />}</span><div><strong>{mission.label}</strong><small>{mission.purpose}</small></div></button>)}</div><section className={sales.missionWorkspace}>{props.active === "coverage" && <><DecisionTable items={sitCoverageCases} answers={props.coverageAnswers} onAnswer={props.onCoverage} label="SIT coverage response" /><DecisionTable items={sitDataCases} answers={props.dataAnswers} onAnswer={props.onData} label="test-data response" /></>}{props.active === "cycle" && <SitExecutionLab {...props.labProps} />}{props.active === "recovery" && <DecisionTable items={sitInterfaceCases} answers={props.interfaceAnswers} onAnswer={props.onInterface} label="interface-recovery response" />}{props.active === "controls" && <><DecisionTable items={sitReconciliationCases} answers={props.reconciliationAnswers} onAnswer={props.onReconciliation} label="reconciliation response" /><DecisionTable items={sitChannelCases} answers={props.channelAnswers} onAnswer={props.onChannel} label="channel-defect response" /><SelectionGrid items={sitReconciliationControls} selected={props.reconciled} onToggle={props.onReconcile} /></>}{props.active === "readout" && <><DecisionTable items={sitTestCases} answers={props.testAnswers} onAnswer={props.onTest} label="executed-test response" /><h3 className={sales.sectionTitle}>Confirm SIT execution order</h3><SequenceList items={sitExecutionSequence} selected={props.sequence} onToggle={props.onSequence} /><label className={sales.summaryField}>SIT exit recommendation<textarea rows={12} value={props.readout} onChange={(event) => props.onReadout(event.target.value)} placeholder="Summarize scope, exclusions, requirements and interfaces, environment and build, data fixture, executions, passes, failures, blocked tests, integrations, dependencies, reconciliations, security, workflow, Smart View, defects, severity, fixes, retests, regression, workarounds, residual risks, waivers, owners, reviewers, and exit recommendation." /><small>{props.readout.trim().length}/240 minimum characters</small></label></>}</section></>;
}

function SitExitGate({ selected, onToggle, summary, onSummary, answers, onAnswer, preview }: { selected: string[]; onToggle: (item: string) => void; summary: string; onSummary: (value: string) => void; answers: Answers; onAnswer: (id: string, value: string) => void; preview: string }) {
  return <><Lead icon={<ClipboardCheck size={23} />} eyebrow="Phase deliverable" title="Hand off independently reviewable proof that the integrated ApexPlan solution produces correct, authorized, recoverable, repeatable, and reconciled results—with every residual risk consciously owned." /><h3 className={sales.sectionTitle}>Deliverable checklist</h3><SelectionGrid items={sitArtifacts} selected={selected} onToggle={onToggle} /><label className={sales.summaryField}>SIT release-readiness summary<textarea rows={12} value={summary} onChange={(event) => onSummary(event.target.value)} placeholder="Summarize scope, coverage, environment, build, data, integrations, calculations, modules, statements, cubes, web, Smart View, security, workflow, positive and negative tests, recovery, repeatability, defects, retest, regression, reconciliation, timing baseline, residual risks, waivers, support, owners, reviewers, decision, and UAT handoff." /><small>{summary.trim().length}/240 minimum characters</small></label><h3 className={sales.sectionTitle}>Knowledge check</h3><div className={base.quizList}>{sitKnowledgeQuestions.map((question, index) => <fieldset key={question.id}><legend><span>{index + 1}</span>{question.prompt}</legend>{question.options.map((option) => <label key={option}><input checked={answers[question.id] === option} name={question.id} onChange={() => onAnswer(question.id, option)} type="radio" />{option}</label>)}</fieldset>)}</div><div className={sales.preview}><small>Generated Phase 19 handoff</small><p>{preview}</p><div>Integrated solution <ArrowRight size={13} /> SIT evidence and decision <ArrowRight size={13} /> Performance testing</div></div></>;
}

function SitExecutionLab({ inputs, onInput, stage, attempted, onAdvance }: SitLabProps) {
  const stages = [["Baseline ready", "Start actuals load"], ["Actuals loaded", "Run sales plan"], ["Sales complete", "Run operations"], ["Operations complete", "Run cost and dependencies"], ["Dependencies complete", "Run statements"], ["Statements balanced", "Publish ApexPlan ASO"], ["Reporting reconciled", "Test channels"], ["Channels authorized", "Complete workflow"], ["SIT cycle passed", "Complete"]] as const;
  const current = stages[stage];
  const valid = validateSitInputs(inputs);
  return <section className={styles.sitLab}><header><div><TestTube2 size={19} /><div><small>SIT-CYCLE-01 · FORECAST / WORKING · FY25</small><strong>Integrated planning execution</strong></div></div><span>{current[0]}</span></header><div className={styles.stagePath}>{stages.map((item, index) => <article className={index <= stage ? styles.stageActive : ""} key={item[0]}><span>{index < stage ? <Check size={14} /> : index + 1}</span><strong>{item[0]}</strong></article>)}</div><div className={styles.controlGrid}><NumberField label="Source rows" value={inputs.sourceRows} onChange={(value) => onInput({ ...inputs, sourceRows: value })} /><NumberField label="Mapped rows" value={inputs.mappedRows} onChange={(value) => onInput({ ...inputs, mappedRows: value })} /><NumberField label="Rejected rows" value={inputs.rejectedRows} onChange={(value) => onInput({ ...inputs, rejectedRows: value })} /><NumberField label="Controlled units" value={inputs.controlledUnits} onChange={(value) => onInput({ ...inputs, controlledUnits: value })} /><NumberField label="Failed jobs" value={inputs.failedJobs} onChange={(value) => onInput({ ...inputs, failedJobs: value })} /><NumberField label="Balance variance" value={inputs.balanceVariance} onChange={(value) => onInput({ ...inputs, balanceVariance: value })} /><NumberField label="Reporting variance" value={inputs.reportingVariance} onChange={(value) => onInput({ ...inputs, reportingVariance: value })} /></div><label className={styles.evidenceNote}>Execution evidence note<textarea rows={3} value={inputs.evidenceNote} onChange={(event) => onInput({ ...inputs, evidenceNote: event.target.value })} /><small>{inputs.evidenceNote.trim().length}/60 minimum characters</small></label>{attempted && !valid && <div className={styles.runError}><TriangleAlert size={17} /><span>Stage blocked. Require 240 source and mapped rows, zero rejects and failures, 1,380 units, zero balance and reporting variance, and a 60-character evidence note.</span></div>}{stage === 8 && <div className={styles.runSuccess}><CheckCircle2 size={17} /><span>Clean SIT cycle passed. The stage history and controls are ready for evidence reconciliation.</span></div>}<div className={styles.controlSummary}><Metric label="Row control" value={`${inputs.mappedRows}/${inputs.sourceRows}`} good={inputs.mappedRows === inputs.sourceRows && inputs.rejectedRows === 0} /><Metric label="Unit control" value={inputs.controlledUnits.toLocaleString()} good={inputs.controlledUnits === 1380} /><Metric label="Job failures" value={String(inputs.failedJobs)} good={inputs.failedJobs === 0} /><Metric label="Balance control" value={format(inputs.balanceVariance, 2)} good={inputs.balanceVariance === 0} /><Metric label="ASO variance" value={format(inputs.reportingVariance, 2)} good={inputs.reportingVariance === 0} /></div><footer><p>Each action represents a governed job group. In the tenant, retain individual Process IDs, Job IDs, prompts, messages, durations, results, and reviewer evidence.</p><button disabled={stage === 8} onClick={onAdvance} type="button"><PlayCircle size={15} />{stage === 8 ? "Cycle complete" : current[1]}</button></footer></section>;
}

function ScreenshotWalkthrough() {
  return <section className={sales.walkthrough}><div className={sales.walkthroughHeader}><div><Camera size={20} /><div><small>Screenshot-guided procedure</small><strong>System integration testing walkthrough</strong></div></div><span>{sitScreenshots.length} guided steps</span></div><div className={sales.walkthroughGrid}>{sitScreenshots.map((step, index) => <article key={step.id}><div className={sales.stepTitle}><span>{String(index + 1).padStart(2, "0")}</span><div><small>{step.id}</small><strong>{step.title}</strong></div></div><OracleScreenshot asset={step.asset} capture={step.capture} className={sales.screenshot} phase="phase-19" title={step.title} /><dl><div><dt>Navigation</dt><dd>{step.path}</dd></div><div><dt>Trainee action</dt><dd>{step.action}</dd></div><div><dt>Validation evidence</dt><dd>{step.evidence}</dd></div></dl></article>)}</div></section>; 
}

function NumberField({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) { return <label>{label}<input aria-label={label} step="1" type="number" value={value} onChange={(event) => onChange(Number(event.target.value))} /></label>; }
function Metric({ label, value, good }: { label: string; value: string; good: boolean }) { return <article className={good ? styles.goodMetric : styles.badMetric}><small>{label}</small><strong>{value}</strong><span>{good ? <CheckCircle2 size={14} /> : <TriangleAlert size={14} />}{good ? "Passed" : "Investigate"}</span></article>; }
function Lead({ icon, eyebrow, title }: { icon: React.ReactNode; eyebrow: string; title: string }) { return <div className={base.lessonLead}>{icon}<div><small>{eyebrow}</small><strong>{title}</strong></div></div>; }
function SelectionGrid({ items, selected, onToggle }: { items: readonly string[]; selected: string[]; onToggle: (item: string) => void }) { return <div className={design.selectionGrid}>{items.map((item) => <button className={selected.includes(item) ? design.selectedCard : ""} key={item} onClick={() => onToggle(item)} type="button">{selected.includes(item) ? <CheckCircle2 size={17} /> : <span />}<strong>{item}</strong></button>)}</div>; }
function DecisionTable({ items, answers, onAnswer, label }: { items: readonly { id: string; issue: string; correct: string; options: readonly string[] }[]; answers: Answers; onAnswer: (id: string, value: string) => void; label: string }) { return <div className={design.mappingTable}>{items.map((item) => <div className={design.tableRow} key={item.id}><div><strong>{item.id}</strong><small>{item.issue}</small></div><select aria-label={`${item.id} ${label}`} value={answers[item.id] ?? ""} onChange={(event) => onAnswer(item.id, event.target.value)}><option value="">Select controlled response</option>{item.options.map((option) => <option key={option}>{option}</option>)}</select></div>)}</div>; }
function SequenceList({ items, selected, onToggle }: { items: readonly string[]; selected: string[]; onToggle: (item: string) => void }) { return <div className={sales.sequence}>{items.map((item) => <button className={selected.includes(item) ? sales.confirmed : ""} key={item} onClick={() => onToggle(item)} type="button"><strong>{item}</strong><span>{selected.includes(item) ? <Check size={15} /> : "Confirm"}</span></button>)}</div>; }

function validateSitInputs(input: SitInputs) { return input.sourceRows === 240 && input.mappedRows === 240 && input.rejectedRows === 0 && input.controlledUnits === 1380 && input.failedJobs === 0 && input.balanceVariance === 0 && input.reportingVariance === 0 && input.evidenceNote.trim().length >= 60; }
function format(value: number, digits = 0) { return value.toLocaleString(undefined, { minimumFractionDigits: digits, maximumFractionDigits: digits }); }

type AnswerProps = { answers: Answers; onAnswer: (id: string, value: string) => void };
type SitLabProps = { inputs: SitInputs; onInput: (value: SitInputs) => void; stage: number; attempted: boolean; onAdvance: () => void };
type HomeworkProps = {
  active: HomeworkId; onActive: (id: HomeworkId) => void; status: Record<HomeworkId, boolean>;
  coverageAnswers: Answers; onCoverage: (id: string, value: string) => void;
  dataAnswers: Answers; onData: (id: string, value: string) => void;
  labProps: SitLabProps;
  interfaceAnswers: Answers; onInterface: (id: string, value: string) => void;
  reconciliationAnswers: Answers; onReconciliation: (id: string, value: string) => void;
  channelAnswers: Answers; onChannel: (id: string, value: string) => void;
  testAnswers: Answers; onTest: (id: string, value: string) => void;
  reconciled: string[]; onReconcile: (item: string) => void;
  sequence: string[]; onSequence: (item: string) => void;
  readout: string; onReadout: (value: string) => void;
};
