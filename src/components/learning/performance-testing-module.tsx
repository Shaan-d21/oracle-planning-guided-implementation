"use client";

import {
  Activity,
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  Camera,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Download,
  Gauge,
  PlayCircle,
  RefreshCw,
  SearchCheck,
  ShieldCheck,
  TimerReset,
  TriangleAlert,
  Users,
  Wrench,
} from "lucide-react";
import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from "react";
import {
  performanceArtifacts,
  performanceBaselineCases,
  performanceConcurrencyCases,
  performanceControlChecks,
  performanceDiagnosticCases,
  performanceExecutionSequence,
  performanceHomeworkMissions,
  performanceKnowledgeQuestions,
  performanceNfrCases,
  performanceOptimizationCases,
  performanceReadinessControls,
  performanceScreenshots,
  performanceTestingLessons,
  performanceWalkthroughControls,
  performanceWorkloadCases,
  type PerformanceTestingLessonId,
} from "@/content/performance-testing-module";
import { systemIntegrationTestingLessons } from "@/content/system-integration-testing-module";
import { readTrackProgress, writeTrackProgress } from "@/lib/learning-progress";
import design from "./application-dimension-design-module.module.css";
import base from "./discovery-module.module.css";
import styles from "./performance-testing-module.module.css";
import sales from "./sales-planning-build-module.module.css";
import { LearningModuleFrame, type ModuleFeedback } from "./learning-module-frame";
import { OracleScreenshot } from "./oracle-screenshot";

type Answers = Record<string, string>;
type HomeworkId = (typeof performanceHomeworkMissions)[number]["id"];
type PerformanceInputs = {
  formOpenP95: number;
  formSaveP95: number;
  ruleP95: number;
  integrationSeconds: number;
  publishSeconds: number;
  dashboardP95: number;
  concurrentUsers: number;
  errorRate: number;
  reconciliationVariance: number;
  evidenceNote: string;
};

const packPath = "/training/oracle-planning/phase-20/";
const defaultInputs: PerformanceInputs = {
  formOpenP95: 2.7,
  formSaveP95: 4.4,
  ruleP95: 26,
  integrationSeconds: 105,
  publishSeconds: 38,
  dashboardP95: 3.6,
  concurrentUsers: 50,
  errorRate: 0.4,
  reconciliationVariance: 0,
  evidenceNote: "PERF-CYCLE-01 uses the frozen Phase 19 release, representative FY25 data, approved roles and POVs, five timed iterations, and retained Oracle evidence.",
};

export function PerformanceTestingModule() {
  const [activeLesson, setActiveLesson] = useState<PerformanceTestingLessonId>("perf-foundations");
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<ModuleFeedback>(null);
  const [readiness, setReadiness] = useState<string[]>([]);
  const [nfrAnswers, setNfrAnswers] = useState<Answers>({});
  const [baselineAnswers, setBaselineAnswers] = useState<Answers>({});
  const [concurrencyAnswers, setConcurrencyAnswers] = useState<Answers>({});
  const [diagnosticAnswers, setDiagnosticAnswers] = useState<Answers>({});
  const [optimizationAnswers, setOptimizationAnswers] = useState<Answers>({});
  const [workloadAnswers, setWorkloadAnswers] = useState<Answers>({});
  const [inputs, setInputs] = useState<PerformanceInputs>(defaultInputs);
  const [stage, setStage] = useState(0);
  const [attempted, setAttempted] = useState(false);
  const [controls, setControls] = useState<string[]>([]);
  const [walkthroughChecks, setWalkthroughChecks] = useState<string[]>([]);
  const [activeHomework, setActiveHomework] = useState<HomeworkId>("targets");
  const [sequence, setSequence] = useState<string[]>([]);
  const [readout, setReadout] = useState("");
  const [artifacts, setArtifacts] = useState<string[]>([]);
  const [summary, setSummary] = useState("");
  const [knowledgeAnswers, setKnowledgeAnswers] = useState<Answers>({});

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = readTrackProgress("implementation");
      setCompletedLessons(stored.completedLessons);
      const saved = performanceTestingLessons.find((lesson) => lesson.id === stored.activeLesson);
      if (saved) setActiveLesson(saved.id);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const prerequisiteComplete = systemIntegrationTestingLessons.every((lesson) => completedLessons.includes(lesson.id));
  const allCorrect = (items: readonly { id: string; correct: string }[], answers: Answers) => items.every((item) => answers[item.id] === item.correct);
  const labValid = validatePerformanceInputs(inputs);
  const knowledgeReady = performanceKnowledgeQuestions.every((question) => knowledgeAnswers[question.id] === question.correct);
  const homeworkStatus: Record<HomeworkId, boolean> = {
    targets: allCorrect(performanceNfrCases, nfrAnswers) && allCorrect(performanceWorkloadCases, workloadAnswers),
    baseline: stage === 8 && allCorrect(performanceBaselineCases, baselineAnswers),
    load: allCorrect(performanceConcurrencyCases, concurrencyAnswers),
    diagnose: allCorrect(performanceDiagnosticCases, diagnosticAnswers) && allCorrect(performanceOptimizationCases, optimizationAnswers) && controls.length === performanceControlChecks.length,
    readout: sequence.length === performanceExecutionSequence.length && readout.trim().length >= 240,
  };
  const preview = useMemo(
    () => artifacts.length === performanceArtifacts.length && summary.trim().length >= 240
      ? `${summary.trim()} The evidence preserves target status, equivalent before-and-after conditions, functional reconciliation, capacity limits, residual risks, and the authorized Phase 20 decision.`
      : "Complete all eight performance artifacts and provide an exit-readiness summary of at least 240 characters.",
    [artifacts, summary],
  );

  function persist(nextCompleted: string[], lesson: PerformanceTestingLessonId) {
    writeTrackProgress("implementation", { completedLessons: nextCompleted, activeLesson: lesson, activeModuleId: "implementation-performance-testing", lastVisited: new Date().toISOString() });
  }

  function goToLesson(id: PerformanceTestingLessonId) {
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

  function advanceLab() {
    setAttempted(true);
    if (labValid && stage < 8) setStage((current) => current + 1);
  }

  function validateLesson() {
    if (activeLesson === "perf-foundations") {
      if (readiness.length !== performanceReadinessControls.length) return setFeedback({ tone: "error", message: "Confirm all five release, environment, workload, target, and governance readiness controls." });
      return markComplete("Performance scope, test environment, release, data, workloads, targets, evidence, safety, and decision authority are controlled.");
    }
    if (activeLesson === "perf-workload-nfr") {
      if (!allCorrect(performanceNfrCases, nfrAnswers) || !allCorrect(performanceWorkloadCases, workloadAnswers)) return setFeedback({ tone: "error", message: "Resolve every target-quality and representative-workload decision." });
      return markComplete("Business peaks now map to measurable operations, roles, POVs, volumes, concurrency, statistics, thresholds, errors, and owners.");
    }
    if (activeLesson === "perf-baseline") {
      if (!allCorrect(performanceBaselineCases, baselineAnswers)) return setFeedback({ tone: "error", message: "Correct all cache, background-work, data-volume, and functional-reconciliation baseline decisions." });
      return markComplete("The release, environment, data state, workload, warm-up, repetitions, evidence, and functional controls form a repeatable baseline.");
    }
    if (activeLesson === "perf-single-user") {
      if (stage !== 8) return setFeedback({ tone: "error", message: "Complete all eight measurement stages with the approved targets, 50 users, error rate at or below 1%, zero reconciliation variance, and a 60-character evidence note." });
      return markComplete("Critical forms, saves, rules, integrations, ASO publish, dashboards, load, and reconciliation targets passed in the controlled simulation.");
    }
    if (activeLesson === "perf-concurrency") {
      if (!allCorrect(performanceConcurrencyCases, concurrencyAnswers)) return setFeedback({ tone: "error", message: "Correct all environment safety, arrival pattern, representative-user, and test-type conclusions." });
      return markComplete("Concurrent usage is designed for the approved test environment with controlled operations, users, inputs, lag, iterations, reset, reporting, and cleanup.");
    }
    if (activeLesson === "perf-diagnostics") {
      if (!allCorrect(performanceDiagnosticCases, diagnosticAnswers)) return setFeedback({ tone: "error", message: "Resolve every Activity Report, form, timestamp-correlation, and diagnostics decision." });
      return markComplete("Observed latency is correlated to timestamps, Jobs, Activity Report, logs, data scope, design, and verified diagnostic evidence before root cause is claimed.");
    }
    if (activeLesson === "perf-optimization") {
      if (!allCorrect(performanceOptimizationCases, optimizationAnswers) || controls.length !== performanceControlChecks.length) return setFeedback({ tone: "error", message: "Resolve all optimization cases and confirm every evidence, statistics, scope, reconciliation, cleanup, and risk control." });
      return markComplete("Optimizations are versioned, bounded, measured under equivalent conditions, reconciled for correctness, and accepted only when improvement is stable.");
    }
    if (activeLesson === "perf-walkthrough") {
      if (walkthroughChecks.length !== performanceWalkthroughControls.length) return setFeedback({ tone: "error", message: "Confirm all five baseline, correlation, comparison, test-claim, and privacy capture controls." });
      return markComplete("The Oracle performance walkthrough is ready for traceable, redacted baseline, workload, diagnostic, optimization, retest, capacity, and exit evidence.");
    }
    if (activeLesson === "perf-homework") {
      if (!Object.values(homeworkStatus).every(Boolean)) return setFeedback({ tone: "error", message: "Complete all five applied missions, including targets, the full measurement cycle, concurrency, diagnostics, controls, execution order, and decision readout." });
      return markComplete("Applied performance lab complete. Target compliance, bottlenecks, improvements, correctness, headroom, limitations, and risks are ready for review.");
    }
    if (artifacts.length !== performanceArtifacts.length || summary.trim().length < 240 || !knowledgeReady) return setFeedback({ tone: "error", message: "Select all eight deliverables, provide a 240-character summary, and answer all five knowledge checks correctly." });
    markComplete("Phase 20 exit gate passed. The controlled release is ready for Phase 21 business-led user acceptance testing.");
  }

  const labProps: PerformanceLabProps = { inputs, onInput: setInputs, stage, attempted, onAdvance: advanceLab };

  return (
    <LearningModuleFrame
      activeLessonId={activeLesson}
      completedLessons={completedLessons}
      description="Measure the ApexPlan release under representative single-user and concurrent workloads, diagnose evidence-backed bottlenecks, optimize safely, reconcile correctness, and make a defensible capacity and release decision."
      exitGate="Approve workload and target coverage, controlled baseline, single-user and concurrent evidence, diagnostics, before-and-after optimization, functional reconciliation, capacity limits, defects, residual risks, operational monitoring, and the formal performance decision"
      exitGateIcon={<Gauge size={18} />}
      feedback={feedback}
      lessons={performanceTestingLessons}
      onSelectLesson={(id) => goToLesson(id as PerformanceTestingLessonId)}
      onValidate={validateLesson}
      phase={20}
      prerequisite={{ complete: prerequisiteComplete, message: "Complete Phase 19 so performance tests measure a functionally correct, integrated, reconciled, and frozen release candidate.", href: "/learn/system-integration-testing", linkLabel: "Open Phase 19" }}
      stage="Validate · Performance testing"
      title="Performance Testing"
      validateLabel={activeLesson === "perf-exit-gate" ? "Approve performance exit" : undefined}
    >
      {activeLesson === "perf-foundations" && <PerformanceFoundations selected={readiness} onToggle={(item) => toggle(setReadiness, item)} />}
      {activeLesson === "perf-workload-nfr" && <WorkloadsAndTargets nfrAnswers={nfrAnswers} onNfr={(id, value) => setNfrAnswers((current) => ({ ...current, [id]: value }))} workloadAnswers={workloadAnswers} onWorkload={(id, value) => setWorkloadAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "perf-baseline" && <PerformanceBaseline answers={baselineAnswers} onAnswer={(id, value) => setBaselineAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "perf-single-user" && <MeasureOperations {...labProps} />}
      {activeLesson === "perf-concurrency" && <ConcurrentUsage answers={concurrencyAnswers} onAnswer={(id, value) => setConcurrencyAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "perf-diagnostics" && <Diagnostics answers={diagnosticAnswers} onAnswer={(id, value) => setDiagnosticAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "perf-optimization" && <Optimization answers={optimizationAnswers} onAnswer={(id, value) => setOptimizationAnswers((current) => ({ ...current, [id]: value }))} selected={controls} onToggle={(item) => toggle(setControls, item)} />}
      {activeLesson === "perf-walkthrough" && <PerformanceWalkthrough selected={walkthroughChecks} onToggle={(item) => toggle(setWalkthroughChecks, item)} />}
      {activeLesson === "perf-homework" && <PerformanceHomework active={activeHomework} onActive={setActiveHomework} status={homeworkStatus} nfrAnswers={nfrAnswers} onNfr={(id, value) => setNfrAnswers((current) => ({ ...current, [id]: value }))} workloadAnswers={workloadAnswers} onWorkload={(id, value) => setWorkloadAnswers((current) => ({ ...current, [id]: value }))} baselineAnswers={baselineAnswers} onBaseline={(id, value) => setBaselineAnswers((current) => ({ ...current, [id]: value }))} labProps={labProps} concurrencyAnswers={concurrencyAnswers} onConcurrency={(id, value) => setConcurrencyAnswers((current) => ({ ...current, [id]: value }))} diagnosticAnswers={diagnosticAnswers} onDiagnostic={(id, value) => setDiagnosticAnswers((current) => ({ ...current, [id]: value }))} optimizationAnswers={optimizationAnswers} onOptimization={(id, value) => setOptimizationAnswers((current) => ({ ...current, [id]: value }))} controls={controls} onControl={(item) => toggle(setControls, item)} sequence={sequence} onSequence={(item) => toggle(setSequence, item)} readout={readout} onReadout={setReadout} />}
      {activeLesson === "perf-exit-gate" && <PerformanceExitGate selected={artifacts} onToggle={(item) => toggle(setArtifacts, item)} summary={summary} onSummary={setSummary} answers={knowledgeAnswers} onAnswer={(id, value) => setKnowledgeAnswers((current) => ({ ...current, [id]: value }))} preview={preview} />}
    </LearningModuleFrame>
  );
}

function PerformanceFoundations({ selected, onToggle }: ToggleProps) {
  return <><Lead icon={<Gauge size={23} />} eyebrow="Measure behavior under workload" title="Performance testing proves that the correct integrated solution responds, processes, scales, recovers, and remains stable within measurable business targets under representative conditions." /><p className={base.bodyCopy}>Phase 19 proved correctness and integration. Phase 20 keeps that release frozen, measures critical user and batch operations, applies controlled load, correlates slow behavior with Oracle evidence, changes only justified design areas, and retests both speed and correctness. Phase 21 then asks business users to accept the solution—not to discover its capacity.</p><div className={styles.phaseBoundary}><div><small>Phase 19 · SIT</small><strong>Does it work together?</strong><span>Functional chains, controls, recovery, roles, and reconciliation.</span></div><div><small>Phase 20 · Performance</small><strong>Does it meet workload targets?</strong><span>Response, throughput, concurrency, stability, recovery, and capacity.</span></div><div><small>Phase 21 · UAT</small><strong>Can the business accept it?</strong><span>Business journeys, usability, policy, outputs, and deployment acceptance.</span></div></div><div className={design.designSequence}>{["Model", "Baseline", "Measure", "Load", "Diagnose", "Optimize", "Retest", "Decide"].map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong>{index < 7 && <ArrowRight size={13} />}</div>)}</div><h3 className={sales.sectionTitle}>Confirm entry readiness</h3><SelectionGrid items={performanceReadinessControls} selected={selected} onToggle={onToggle} /></>;
}

function WorkloadsAndTargets({ nfrAnswers, onNfr, workloadAnswers, onWorkload }: { nfrAnswers: Answers; onNfr: AnswerHandler; workloadAnswers: Answers; onWorkload: AnswerHandler }) {
  const downloads = [["phase-20-performance-testing-practice-pack.zip", "Complete practice pack"], ["README.md", "Instructions and capture guide"], ["performance-nfr-catalog.csv", "Measurable target catalogue"], ["performance-workload-model.csv", "User and workload model"], ["performance-execution-log.csv", "Raw execution log"], ["concurrent-usage-requirement.csv", "Redacted simulation requirements"], ["performance-results.csv", "Result and target comparison"], ["performance-bottleneck-register.csv", "Bottleneck and root-cause register"], ["performance-optimization-log.csv", "Before-and-after change log"], ["performance-exit-summary.csv", "Capacity and exit summary"]] as const;
  return <><Lead icon={<Users size={23} />} eyebrow="A target without conditions is not a target" title="Translate real planning peaks into named user and batch journeys with representative roles, artifacts, POVs, volume, concurrency, arrival pattern, statistic, threshold, error tolerance, and business ownership." /><div className={sales.downloadGrid}>{downloads.map(([file, label]) => <a download href={`${packPath}${file}`} key={file}><Download size={17} /><div><strong>{label}</strong><small>{file}</small></div></a>)}</div><DecisionTable items={performanceNfrCases} answers={nfrAnswers} onAnswer={onNfr} label="performance-target response" /><h3 className={sales.sectionTitle}>Build representative workloads</h3><DecisionTable items={performanceWorkloadCases} answers={workloadAnswers} onAnswer={onWorkload} label="performance-workload response" /></>;
}

function PerformanceBaseline({ answers, onAnswer }: AnswerProps) {
  const baseline = [["Release", "Frozen SIT build", "Same rules, forms, maps, security and workflows"], ["Environment", "Authorized test", "Configuration and differences documented"], ["Data", "Representative FY25 volume", "Density, hierarchy and history controlled"], ["Workload", "PERF-CYCLE-01", "Roles, POVs, operations and arrival pattern versioned"], ["Runs", "Cold + warm samples", "Warm-up, order, resets and repetitions retained"], ["Correctness", "SIT controls repeated", "No faster-but-wrong result can pass"]] as const;
  return <><Lead icon={<TimerReset size={23} />} eyebrow="Control everything that changes the result" title="Freeze the release and workload, prepare representative volume, classify cold and warm behavior, control background activity, repeat enough equivalent samples, and reconcile every output." /><div className={styles.baselineGrid}>{baseline.map(([label, value, detail]) => <article key={label}><small>{label}</small><strong>{value}</strong><span>{detail}</span></article>)}</div><DecisionTable items={performanceBaselineCases} answers={answers} onAnswer={onAnswer} label="performance-baseline response" /><Note icon={<ShieldCheck size={20} />} title="Performance evidence never replaces correctness" body="After every baseline or optimized run, reconcile the same functional, security, workflow, financial-statement, and Plan1-to-ApexPlan ASO controls proven in SIT." /></>;
}

function MeasureOperations(props: PerformanceLabProps) {
  return <><Lead icon={<Activity size={23} />} eyebrow="Measure the complete decision journey" title="Capture form open and save, attached rules, integrations, end-to-end calculation, Plan1-to-ASO publish, dashboard response, errors, and reconciliation under one controlled workload." /><PerformanceLab {...props} /><Note icon={<RefreshCw size={20} />} title="Equivalent runs or no comparison" body="Keep the release, environment, role, POV, data volume, starting state, workload, samples, and arrival pattern equivalent. Record every run—including failures and outliers." /></>;
}

function ConcurrentUsage({ answers, onAnswer }: AnswerProps) {
  return <><Lead icon={<Users size={23} />} eyebrow="Safe self-service load testing" title="Use Oracle's concurrent-usage simulation only in the approved test environment, with peer-reviewed operations, controlled inputs, realistic arrival lag, repeatable resets, retained reports, and complete cleanup." /><div className={styles.flow}>{["Model business peak", "Prepare requirement.csv", "Package support files", "Review and upload", "Run simulation", "Collect report and errors", "Reconcile data", "Clean up users and files"].map((item, index) => <article key={item}><span>{index + 1}</span><strong>{item}</strong></article>)}</div><DecisionTable items={performanceConcurrencyCases} answers={answers} onAnswer={onAnswer} label="concurrent-usage response" /><Note icon={<TriangleAlert size={20} />} title="Do not load-test production" body="Open form, save form, run rule, data rule, report, and other supported operations can affect data or environment state. Use controlled test data, explicit stop conditions, reset and cleanup procedures, and authorized test users." /></>;
}

function Diagnostics({ answers, onAnswer }: AnswerProps) {
  return <><Lead icon={<SearchCheck size={23} />} eyebrow="Correlate before changing" title="Connect the exact slow operation and timestamp to Activity Report, Jobs, Process Details, Calculation Manager logs, Application Diagnostics, artifact design, data shape, and competing activity before asserting root cause." /><div className={styles.evidenceChain}>{["Observed delay", "Exact timestamp", "Job or process ID", "Activity Report", "Rule or request detail", "Design and data scope", "Repeatable cause", "Optimization hypothesis"].map((item, index) => <span key={item}>{item}{index < 7 && <ArrowRight size={12} />}</span>)}</div><DecisionTable items={performanceDiagnosticCases} answers={answers} onAnswer={onAnswer} label="performance-diagnostic response" /><Note icon={<BarChart3 size={20} />} title="Activity Report identifies candidates—not automatic root causes" body="Match report time, operation, user, rule, form or request to the controlled run. A diagnostic finding needs measured impact and a repeatable hypothesis before it becomes the reason for change." /></>;
}

function Optimization({ answers, onAnswer, selected, onToggle }: AnswerProps & ToggleProps) {
  return <><Lead icon={<Wrench size={23} />} eyebrow="Improve the smallest justified scope" title="Prioritize the measured bottleneck, change one controlled design area, retain the build, rerun the identical workload, calculate improvement, and prove correctness, stability, and capacity—not only one faster duration." /><DecisionTable items={performanceOptimizationCases} answers={answers} onAnswer={onAnswer} label="performance-optimization response" /><h3 className={sales.sectionTitle}>Confirm evidence and safety controls</h3><SelectionGrid items={performanceControlChecks} selected={selected} onToggle={onToggle} /></>;
}

function PerformanceWalkthrough({ selected, onToggle }: ToggleProps) {
  return <><Lead icon={<Camera size={23} />} eyebrow="Evidence another reviewer can reproduce" title="Capture the frozen baseline, measured Oracle operations, concurrent-usage input and results, diagnostic correlation, controlled optimization, equivalent retest, functional reconciliation, capacity conclusion, and exit decision." /><SelectionGrid items={performanceWalkthroughControls} selected={selected} onToggle={onToggle} /><ScreenshotWalkthrough /><div className={sales.scopeTag}>The ten slots are intentionally empty. Add screenshots only after the performance environment, release, workload, target catalogue, evidence naming, privacy controls, and test authorization are approved.</div></>;
}

function PerformanceHomework(props: HomeworkProps) {
  return <><Lead icon={<BookOpenCheck size={23} />} eyebrow="Applied performance engineering lab" title="Define defensible targets, create a controlled baseline, execute single-user and concurrent workloads, diagnose one bottleneck, prove an optimization, and defend the capacity and exit recommendation." /><div className={sales.missionTabs}>{performanceHomeworkMissions.map((mission) => <button className={props.active === mission.id ? sales.activeMission : ""} key={mission.id} onClick={() => props.onActive(mission.id)} type="button"><span>{props.status[mission.id] ? <CheckCircle2 size={16} /> : <PlayCircle size={16} />}</span><div><strong>{mission.label}</strong><small>{mission.purpose}</small></div></button>)}</div><section className={sales.missionWorkspace}>{props.active === "targets" && <><DecisionTable items={performanceNfrCases} answers={props.nfrAnswers} onAnswer={props.onNfr} label="performance-target response" /><DecisionTable items={performanceWorkloadCases} answers={props.workloadAnswers} onAnswer={props.onWorkload} label="performance-workload response" /></>}{props.active === "baseline" && <><DecisionTable items={performanceBaselineCases} answers={props.baselineAnswers} onAnswer={props.onBaseline} label="performance-baseline response" /><PerformanceLab {...props.labProps} /></>}{props.active === "load" && <DecisionTable items={performanceConcurrencyCases} answers={props.concurrencyAnswers} onAnswer={props.onConcurrency} label="concurrent-usage response" />}{props.active === "diagnose" && <><DecisionTable items={performanceDiagnosticCases} answers={props.diagnosticAnswers} onAnswer={props.onDiagnostic} label="performance-diagnostic response" /><DecisionTable items={performanceOptimizationCases} answers={props.optimizationAnswers} onAnswer={props.onOptimization} label="performance-optimization response" /><SelectionGrid items={performanceControlChecks} selected={props.controls} onToggle={props.onControl} /></>}{props.active === "readout" && <><h3 className={sales.sectionTitle}>Confirm performance execution order</h3><SequenceList items={performanceExecutionSequence} selected={props.sequence} onToggle={props.onSequence} /><label className={sales.summaryField}>Performance exit recommendation<textarea rows={12} value={props.readout} onChange={(event) => props.onReadout(event.target.value)} placeholder="Summarize release, environment, workload and data, targets, samples, cold and warm baselines, concurrent results, percentiles, throughput, errors, bottlenecks, diagnostics, optimizations, before-and-after results, functional controls, capacity headroom, defects, limitations, risks, monitoring, rollback, owners, waivers, and recommendation." /><small>{props.readout.trim().length}/240 minimum characters</small></label></>}</section></>;
}

function PerformanceExitGate({ selected, onToggle, summary, onSummary, answers, onAnswer, preview }: { selected: string[]; onToggle: (item: string) => void; summary: string; onSummary: (value: string) => void; answers: Answers; onAnswer: AnswerHandler; preview: string }) {
  return <><Lead icon={<ClipboardCheck size={23} />} eyebrow="Phase deliverable" title="Hand off independently reviewable proof of target compliance, stability and capacity—plus every defect, limitation, operating condition, monitoring threshold, and residual risk that UAT and deployment must understand." /><h3 className={sales.sectionTitle}>Deliverable checklist</h3><SelectionGrid items={performanceArtifacts} selected={selected} onToggle={onToggle} /><label className={sales.summaryField}>Performance release-readiness summary<textarea rows={12} value={summary} onChange={(event) => onSummary(event.target.value)} placeholder="Summarize scope, release, environment, comparability, workload and volume, targets, test types, operations, users, samples, response distribution, throughput, errors, stability, diagnostics, bottlenecks, changes, improvement, functional reconciliation, capacity, defects, limitations, monitoring, recovery, risks, waivers, owners, decision, and UAT conditions." /><small>{summary.trim().length}/240 minimum characters</small></label><h3 className={sales.sectionTitle}>Knowledge check</h3><div className={base.quizList}>{performanceKnowledgeQuestions.map((question, index) => <fieldset key={question.id}><legend><span>{index + 1}</span>{question.prompt}</legend>{question.options.map((option) => <label key={option}><input checked={answers[question.id] === option} name={question.id} onChange={() => onAnswer(question.id, option)} type="radio" />{option}</label>)}</fieldset>)}</div><div className={sales.preview}><small>Generated Phase 20 handoff</small><p>{preview}</p><div>Frozen SIT release <ArrowRight size={13} /> Performance evidence and capacity decision <ArrowRight size={13} /> Business-led UAT</div></div></>;
}

function PerformanceLab({ inputs, onInput, stage, attempted, onAdvance }: PerformanceLabProps) {
  const stages = [["Baseline ready", "Measure form open"], ["Form open measured", "Measure form save"], ["Form save measured", "Measure rule"], ["Rule measured", "Measure integration"], ["Integration measured", "Measure ASO publish"], ["Publish measured", "Measure dashboard"], ["Dashboard measured", "Run 50-user workload"], ["Peak workload passed", "Reconcile outputs"], ["Performance cycle passed", "Complete"]] as const;
  const current = stages[stage];
  const valid = validatePerformanceInputs(inputs);
  return <section className={styles.performanceLab}><header><div><Gauge size={19} /><div><small>PERF-CYCLE-01 · FORECAST / WORKING · FY25</small><strong>Controlled response and capacity measurement</strong></div></div><span>{current[0]}</span></header><div className={styles.stagePath}>{stages.map((item, index) => <article className={index <= stage ? styles.stageActive : ""} key={item[0]}><span>{index < stage ? <Check size={14} /> : index + 1}</span><strong>{item[0]}</strong></article>)}</div><div className={styles.controlGrid}><NumberField label="Form open P95 (sec)" value={inputs.formOpenP95} step="0.1" onChange={(value) => onInput({ ...inputs, formOpenP95: value })} /><NumberField label="Form save P95 (sec)" value={inputs.formSaveP95} step="0.1" onChange={(value) => onInput({ ...inputs, formSaveP95: value })} /><NumberField label="Rule P95 (sec)" value={inputs.ruleP95} step="0.1" onChange={(value) => onInput({ ...inputs, ruleP95: value })} /><NumberField label="Integration duration (sec)" value={inputs.integrationSeconds} step="1" onChange={(value) => onInput({ ...inputs, integrationSeconds: value })} /><NumberField label="ASO publish duration (sec)" value={inputs.publishSeconds} step="1" onChange={(value) => onInput({ ...inputs, publishSeconds: value })} /><NumberField label="Dashboard P95 (sec)" value={inputs.dashboardP95} step="0.1" onChange={(value) => onInput({ ...inputs, dashboardP95: value })} /><NumberField label="Concurrent users" value={inputs.concurrentUsers} step="1" onChange={(value) => onInput({ ...inputs, concurrentUsers: value })} /><NumberField label="Error rate (%)" value={inputs.errorRate} step="0.1" onChange={(value) => onInput({ ...inputs, errorRate: value })} /><NumberField label="Reconciliation variance" value={inputs.reconciliationVariance} step="0.01" onChange={(value) => onInput({ ...inputs, reconciliationVariance: value })} /></div><label className={styles.evidenceNote}>Measurement evidence note<textarea rows={3} value={inputs.evidenceNote} onChange={(event) => onInput({ ...inputs, evidenceNote: event.target.value })} /><small>{inputs.evidenceNote.trim().length}/60 minimum characters</small></label>{attempted && !valid && <div className={styles.runError}><TriangleAlert size={17} /><span>Stage blocked. Require form open ≤3s, save ≤5s, rule ≤30s, integration ≤120s, publish ≤45s, dashboard ≤4s, 50 users, error rate ≤1%, zero reconciliation variance, and a 60-character note.</span></div>}{stage === 8 && <div className={styles.runSuccess}><CheckCircle2 size={17} /><span>Performance cycle passed. Targets, workload and functional controls are ready for evidence review.</span></div>}<div className={styles.metricGrid}><Metric label="Form open P95" value={`${format(inputs.formOpenP95, 1)}s`} good={inputs.formOpenP95 <= 3} /><Metric label="Form save P95" value={`${format(inputs.formSaveP95, 1)}s`} good={inputs.formSaveP95 <= 5} /><Metric label="Rule P95" value={`${format(inputs.ruleP95, 1)}s`} good={inputs.ruleP95 <= 30} /><Metric label="Integration" value={`${format(inputs.integrationSeconds)}s`} good={inputs.integrationSeconds <= 120} /><Metric label="ASO publish" value={`${format(inputs.publishSeconds)}s`} good={inputs.publishSeconds <= 45} /><Metric label="Dashboard P95" value={`${format(inputs.dashboardP95, 1)}s`} good={inputs.dashboardP95 <= 4} /><Metric label="Peak users" value={String(inputs.concurrentUsers)} good={inputs.concurrentUsers === 50} /><Metric label="Error rate" value={`${format(inputs.errorRate, 1)}%`} good={inputs.errorRate <= 1} /><Metric label="Control variance" value={format(inputs.reconciliationVariance, 2)} good={inputs.reconciliationVariance === 0} /></div><footer><p>Training targets are the approved Apex workshop values—not universal Oracle promises. Real projects must replace them with agreed business NFRs and comparable-environment evidence.</p><button disabled={stage === 8} onClick={onAdvance} type="button"><PlayCircle size={15} />{stage === 8 ? "Cycle complete" : current[1]}</button></footer></section>;
}

function ScreenshotWalkthrough() {
  return <section className={sales.walkthrough}><div className={sales.walkthroughHeader}><div><Camera size={20} /><div><small>Screenshot-guided procedure</small><strong>Performance testing and optimization walkthrough</strong></div></div><span>{performanceScreenshots.length} guided steps</span></div><div className={sales.walkthroughGrid}>{performanceScreenshots.map((step, index) => <article key={step.id}><div className={sales.stepTitle}><span>{String(index + 1).padStart(2, "0")}</span><div><small>{step.id}</small><strong>{step.title}</strong></div></div><OracleScreenshot asset={step.asset} capture={step.capture} className={sales.screenshot} phase="phase-20" title={step.title} /><dl><div><dt>Navigation</dt><dd>{step.path}</dd></div><div><dt>Trainee action</dt><dd>{step.action}</dd></div><div><dt>Validation evidence</dt><dd>{step.evidence}</dd></div></dl></article>)}</div></section>; 
}

function NumberField({ label, value, step, onChange }: { label: string; value: number; step: string; onChange: (value: number) => void }) { return <label>{label}<input aria-label={label} step={step} type="number" value={value} onChange={(event) => onChange(Number(event.target.value))} /></label>; }
function Metric({ label, value, good }: { label: string; value: string; good: boolean }) { return <article className={good ? styles.goodMetric : styles.badMetric}><small>{label}</small><strong>{value}</strong><span>{good ? <CheckCircle2 size={14} /> : <TriangleAlert size={14} />}{good ? "Passed" : "Investigate"}</span></article>; }
function Lead({ icon, eyebrow, title }: { icon: React.ReactNode; eyebrow: string; title: string }) { return <div className={base.lessonLead}>{icon}<div><small>{eyebrow}</small><strong>{title}</strong></div></div>; }
function Note({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) { return <div className={styles.referenceNote}>{icon}<div><strong>{title}</strong><span>{body}</span></div></div>; }
function SelectionGrid({ items, selected, onToggle }: SelectionProps) { return <div className={design.selectionGrid}>{items.map((item) => <button className={selected.includes(item) ? design.selectedCard : ""} key={item} onClick={() => onToggle(item)} type="button">{selected.includes(item) ? <CheckCircle2 size={17} /> : <span />}<strong>{item}</strong></button>)}</div>; }
function DecisionTable({ items, answers, onAnswer, label }: { items: readonly { id: string; issue: string; correct: string; options: readonly string[] }[]; answers: Answers; onAnswer: AnswerHandler; label: string }) { return <div className={design.mappingTable}>{items.map((item) => <div className={design.tableRow} key={item.id}><div><strong>{item.id}</strong><small>{item.issue}</small></div><select aria-label={`${item.id} ${label}`} value={answers[item.id] ?? ""} onChange={(event) => onAnswer(item.id, event.target.value)}><option value="">Select controlled response</option>{item.options.map((option) => <option key={option}>{option}</option>)}</select></div>)}</div>; }
function SequenceList({ items, selected, onToggle }: SelectionProps) { return <div className={sales.sequence}>{items.map((item) => <button className={selected.includes(item) ? sales.confirmed : ""} key={item} onClick={() => onToggle(item)} type="button"><strong>{item}</strong><span>{selected.includes(item) ? <Check size={15} /> : "Confirm"}</span></button>)}</div>; }

function validatePerformanceInputs(input: PerformanceInputs) { return input.formOpenP95 <= 3 && input.formSaveP95 <= 5 && input.ruleP95 <= 30 && input.integrationSeconds <= 120 && input.publishSeconds <= 45 && input.dashboardP95 <= 4 && input.concurrentUsers === 50 && input.errorRate <= 1 && input.errorRate >= 0 && input.reconciliationVariance === 0 && input.evidenceNote.trim().length >= 60; }
function format(value: number, digits = 0) { return value.toLocaleString(undefined, { minimumFractionDigits: digits, maximumFractionDigits: digits }); }

type AnswerHandler = (id: string, value: string) => void;
type AnswerProps = { answers: Answers; onAnswer: AnswerHandler };
type ToggleProps = { selected: string[]; onToggle: (item: string) => void };
type SelectionProps = ToggleProps & { items: readonly string[] };
type PerformanceLabProps = { inputs: PerformanceInputs; onInput: (value: PerformanceInputs) => void; stage: number; attempted: boolean; onAdvance: () => void };
type HomeworkProps = {
  active: HomeworkId; onActive: (id: HomeworkId) => void; status: Record<HomeworkId, boolean>;
  nfrAnswers: Answers; onNfr: AnswerHandler; workloadAnswers: Answers; onWorkload: AnswerHandler;
  baselineAnswers: Answers; onBaseline: AnswerHandler; labProps: PerformanceLabProps;
  concurrencyAnswers: Answers; onConcurrency: AnswerHandler;
  diagnosticAnswers: Answers; onDiagnostic: AnswerHandler; optimizationAnswers: Answers; onOptimization: AnswerHandler;
  controls: string[]; onControl: (item: string) => void; sequence: string[]; onSequence: (item: string) => void;
  readout: string; onReadout: (value: string) => void;
};
