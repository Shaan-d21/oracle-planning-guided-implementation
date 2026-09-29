"use client";

import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  Camera,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Copy,
  Download,
  Gauge,
  GitCompareArrows,
  Lightbulb,
  PlayCircle,
  RefreshCw,
  ShieldCheck,
  SlidersHorizontal,
  TriangleAlert,
} from "lucide-react";
import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from "react";
import { securityWorkflowLessons } from "@/content/security-workflow-module";
import {
  baselineCopyCases,
  comparisonCases,
  driverGovernanceCases,
  promotionCases,
  scenarioArtifacts,
  scenarioExecutionSequence,
  scenarioHomeworkMissions,
  scenarioKnowledgeQuestions,
  scenarioReadinessControls,
  scenarioReconciliationControls,
  scenarioScreenshots,
  scenarioTestCases,
  scenarioVersionCases,
  scenarioWalkthroughControls,
  scenarioWhatIfLessons,
  type ScenarioWhatIfLessonId,
} from "@/content/scenario-what-if-planning-module";
import { readTrackProgress, writeTrackProgress } from "@/lib/learning-progress";
import design from "./application-dimension-design-module.module.css";
import base from "./discovery-module.module.css";
import sales from "./sales-planning-build-module.module.css";
import styles from "./scenario-what-if-planning-module.module.css";
import { LearningModuleFrame, type ModuleFeedback } from "./learning-module-frame";
import { OracleScreenshot } from "./oracle-screenshot";

type Answers = Record<string, string>;
type ScenarioName = "Upside" | "Downside";
type HomeworkId = (typeof scenarioHomeworkMissions)[number]["id"];
type Drivers = { volumePct: number; pricePct: number; materialCostPct: number; capacityHours: number; note: string };
type ScenarioResult = ReturnType<typeof calculateScenario>;

const packPath = "/training/oracle-planning/phase-18/";
const driverProfiles: Record<ScenarioName, Drivers> = {
  Upside: { volumePct: 8, pricePct: 2, materialCostPct: 3, capacityHours: 800, note: "Upside reflects approved channel demand, limited price realization, and supplier cost pressure." },
  Downside: { volumePct: -12, pricePct: -1, materialCostPct: 7, capacityHours: 800, note: "Downside reflects demand contraction, discount pressure, and a material-cost shock for contingency review." },
};

export function ScenarioWhatIfPlanningModule() {
  const [activeLesson, setActiveLesson] = useState<ScenarioWhatIfLessonId>("scenario-foundations");
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<ModuleFeedback>(null);
  const [readiness, setReadiness] = useState<string[]>([]);
  const [versionAnswers, setVersionAnswers] = useState<Answers>({});
  const [copyAnswers, setCopyAnswers] = useState<Answers>({});
  const [driverAnswers, setDriverAnswers] = useState<Answers>({});
  const [comparisonAnswers, setComparisonAnswers] = useState<Answers>({});
  const [promotionAnswers, setPromotionAnswers] = useState<Answers>({});
  const [testAnswers, setTestAnswers] = useState<Answers>({});
  const [activeScenario, setActiveScenario] = useState<ScenarioName>("Upside");
  const [drivers, setDrivers] = useState<Drivers>(driverProfiles.Upside);
  const [savedRuns, setSavedRuns] = useState<Partial<Record<ScenarioName, ScenarioResult>>>({});
  const [walkthroughChecks, setWalkthroughChecks] = useState<string[]>([]);
  const [sequence, setSequence] = useState<string[]>([]);
  const [reconciled, setReconciled] = useState<string[]>([]);
  const [activeHomework, setActiveHomework] = useState<HomeworkId>("design");
  const [readout, setReadout] = useState("");
  const [artifacts, setArtifacts] = useState<string[]>([]);
  const [summary, setSummary] = useState("");
  const [knowledgeAnswers, setKnowledgeAnswers] = useState<Answers>({});

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = readTrackProgress("implementation");
      setCompletedLessons(stored.completedLessons);
      const saved = scenarioWhatIfLessons.find((lesson) => lesson.id === stored.activeLesson);
      if (saved) setActiveLesson(saved.id);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const result = useMemo(() => calculateScenario(drivers), [drivers]);
  const prerequisiteComplete = securityWorkflowLessons.every((lesson) => completedLessons.includes(lesson.id));
  const allCorrect = (items: readonly { id: string; correct: string }[], answers: Answers) => items.every((item) => answers[item.id] === item.correct);
  const runsReady = Boolean(savedRuns.Upside && savedRuns.Downside);
  const knowledgeReady = scenarioKnowledgeQuestions.every((question) => knowledgeAnswers[question.id] === question.correct);
  const homeworkStatus: Record<HomeworkId, boolean> = {
    design: allCorrect(scenarioVersionCases, versionAnswers),
    copy: allCorrect(baselineCopyCases, copyAnswers),
    drivers: allCorrect(driverGovernanceCases, driverAnswers),
    model: runsReady && allCorrect(comparisonCases, comparisonAnswers),
    readout: allCorrect(promotionCases, promotionAnswers) && allCorrect(scenarioTestCases, testAnswers) && sequence.length === scenarioExecutionSequence.length && reconciled.length === scenarioReconciliationControls.length && readout.trim().length >= 240,
  };
  const preview = useMemo(
    () => artifacts.length === scenarioArtifacts.length && summary.trim().length >= 240
      ? `${summary.trim()} The selected case remains traceable from the protected Forecast / Final baseline through drivers, dependencies, comparison, promotion, approval, publish, and reconciliation.`
      : "Complete all eight scenario artifacts and provide a decision-readiness summary of at least 240 characters.",
    [artifacts, summary],
  );

  function persist(nextCompleted: string[], lesson: ScenarioWhatIfLessonId) {
    writeTrackProgress("implementation", { completedLessons: nextCompleted, activeLesson: lesson, activeModuleId: "implementation-scenario-what-if-planning", lastVisited: new Date().toISOString() });
  }

  function goToLesson(id: ScenarioWhatIfLessonId) {
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

  function selectScenario(name: ScenarioName) {
    setActiveScenario(name);
    setDrivers(driverProfiles[name]);
  }

  function saveRun() {
    if (!result.valid) return;
    setSavedRuns((current) => ({ ...current, [activeScenario]: result }));
  }

  function validateLesson() {
    if (activeLesson === "scenario-foundations") {
      if (readiness.length !== scenarioReadinessControls.length) return setFeedback({ tone: "error", message: "Confirm all five baseline, cube, version, driver, and protection controls." });
      return markComplete("The decision question, protected baseline, cube boundary, Version-based approach, driver governance, and overwrite controls are understood.");
    }
    if (activeLesson === "scenario-version-design") {
      if (!allCorrect(scenarioVersionCases, versionAnswers)) return setFeedback({ tone: "error", message: "Resolve every Scenario, Version, baseline-protection, Sandbox, and currency-treatment decision." });
      return markComplete("Forecast remains the Scenario; Final, Upside, and Downside provide controlled, secured, and comparable planning versions.");
    }
    if (activeLesson === "baseline-copy-control") {
      if (!allCorrect(baselineCopyCases, copyAnswers)) return setFeedback({ tone: "error", message: "Correct all baseline approval, administrator copy, optional data-type, and approval-unit state decisions." });
      return markComplete("The approved Forecast / Final source, copy scope, optional detail, target state, control totals, and job evidence are governed.");
    }
    if (activeLesson === "driver-assumptions") {
      if (!allCorrect(driverGovernanceCases, driverAnswers)) return setFeedback({ tone: "error", message: "Resolve every driver definition, dependency, attribution, and range-exception decision." });
      return markComplete("What-if assumptions are measurable, bounded, owned, traceable, and connected to the full planning dependency chain.");
    }
    if (activeLesson === "scenario-model") {
      if (!runsReady) return setFeedback({ tone: "error", message: "Run and save both valid Upside and Downside versions with a meaningful assumption note." });
      return markComplete("Upside and Downside have been calculated from a common baseline with operational, margin, net-income, cash, and feasibility results.");
    }
    if (activeLesson === "compare-decide") {
      if (!runsReady || !allCorrect(comparisonCases, comparisonAnswers)) return setFeedback({ tone: "error", message: "Save both scenario runs and resolve all feasibility, trade-off, reconciliation, and driver-attribution decisions." });
      return markComplete("The comparison uses a common POV, reconciled KPIs, driver bridges, thresholds, feasibility, cash, actions, and residual risks.");
    }
    if (activeLesson === "promote-publish") {
      if (!allCorrect(promotionCases, promotionAnswers)) return setFeedback({ tone: "error", message: "Correct all coherent-promotion, approved-unit, dependency, publish, and reconciliation decisions." });
      return markComplete("The selected case enters Forecast / Working through controlled promotion, rerun, workflow, approval, publish, and reconciliation.");
    }
    if (activeLesson === "scenario-walkthrough") {
      if (walkthroughChecks.length !== scenarioWalkthroughControls.length) return setFeedback({ tone: "error", message: "Confirm all five screenshot context, baseline, driver, decision, privacy, and promotion controls." });
      return markComplete("The screenshot runbook is ready for one consistent Final-to-Upside-and-Downside planning cycle.");
    }
    if (activeLesson === "scenario-homework") {
      if (!Object.values(homeworkStatus).every(Boolean)) return setFeedback({ tone: "error", message: "Complete all five applied missions, including both saved scenarios, testing, execution order, reconciliation, and decision readout." });
      return markComplete("Applied what-if planning lab complete. The selected-case decision package is ready for independent review.");
    }
    if (artifacts.length !== scenarioArtifacts.length || summary.trim().length < 240 || !knowledgeReady) return setFeedback({ tone: "error", message: "Select all eight deliverables, provide a 240-character summary, and answer all five knowledge checks correctly." });
    markComplete("Phase 18 exit gate passed. The configured solution and scenario process are ready for Phase 19 system integration testing.");
  }

  const modelProps: ScenarioLabProps = { activeScenario, drivers, result, savedRuns, onSelect: selectScenario, onDrivers: setDrivers, onRun: saveRun };

  return (
    <LearningModuleFrame
      activeLessonId={activeLesson}
      completedLessons={completedLessons}
      description="Model controlled Upside and Downside versions from the protected Forecast / Final baseline, trace driver effects across operations and finance, and promote only an approved, reconciled case."
      exitGate="Approve the version design, protected baseline, copy evidence, driver register, calculated alternatives, comparison, selected-case promotion, workflow, publish, reconciliation, decision record, and operating guide"
      exitGateIcon={<GitCompareArrows size={18} />}
      feedback={feedback}
      lessons={scenarioWhatIfLessons}
      onSelectLesson={(id) => goToLesson(id as ScenarioWhatIfLessonId)}
      onValidate={validateLesson}
      phase={18}
      prerequisite={{ complete: prerequisiteComplete, message: "Complete Phase 17 so alternatives use approved groups, member access, artifact security, rule launch rights, approval ownership, and Task Manager evidence.", href: "/learn/security-workflow", linkLabel: "Open Phase 17" }}
      stage="Build · Scenario and what-if planning"
      title="Scenario & What-If Planning"
      validateLabel={activeLesson === "scenario-exit-gate" ? "Approve decision package" : undefined}
    >
      {activeLesson === "scenario-foundations" && <ScenarioFoundations selected={readiness} onToggle={(item) => toggle(setReadiness, item)} />}
      {activeLesson === "scenario-version-design" && <ScenarioVersionDesign answers={versionAnswers} onAnswer={(id, value) => setVersionAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "baseline-copy-control" && <BaselineCopyControl answers={copyAnswers} onAnswer={(id, value) => setCopyAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "driver-assumptions" && <DriverAssumptions answers={driverAnswers} onAnswer={(id, value) => setDriverAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "scenario-model" && <ScenarioModel {...modelProps} />}
      {activeLesson === "compare-decide" && <CompareDecide {...modelProps} answers={comparisonAnswers} onAnswer={(id, value) => setComparisonAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "promote-publish" && <PromotePublish answers={promotionAnswers} onAnswer={(id, value) => setPromotionAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "scenario-walkthrough" && <ScenarioWalkthrough selected={walkthroughChecks} onToggle={(item) => toggle(setWalkthroughChecks, item)} />}
      {activeLesson === "scenario-homework" && <ScenarioHomework active={activeHomework} onActive={setActiveHomework} status={homeworkStatus} versionAnswers={versionAnswers} onVersion={(id, value) => setVersionAnswers((current) => ({ ...current, [id]: value }))} copyAnswers={copyAnswers} onCopy={(id, value) => setCopyAnswers((current) => ({ ...current, [id]: value }))} driverAnswers={driverAnswers} onDriver={(id, value) => setDriverAnswers((current) => ({ ...current, [id]: value }))} modelProps={modelProps} comparisonAnswers={comparisonAnswers} onComparison={(id, value) => setComparisonAnswers((current) => ({ ...current, [id]: value }))} promotionAnswers={promotionAnswers} onPromotion={(id, value) => setPromotionAnswers((current) => ({ ...current, [id]: value }))} testAnswers={testAnswers} onTest={(id, value) => setTestAnswers((current) => ({ ...current, [id]: value }))} sequence={sequence} onSequence={(item) => toggle(setSequence, item)} reconciled={reconciled} onReconcile={(item) => toggle(setReconciled, item)} readout={readout} onReadout={setReadout} />}
      {activeLesson === "scenario-exit-gate" && <ScenarioExitGate selected={artifacts} onToggle={(item) => toggle(setArtifacts, item)} summary={summary} onSummary={setSummary} answers={knowledgeAnswers} onAnswer={(id, value) => setKnowledgeAnswers((current) => ({ ...current, [id]: value }))} preview={preview} />}
    </LearningModuleFrame>
  );
}

function ScenarioFoundations({ selected, onToggle }: { selected: string[]; onToggle: (item: string) => void }) {
  return <><Lead icon={<GitCompareArrows size={23} />} eyebrow="Answer a decision, not a curiosity" title="Start every what-if analysis from one protected baseline, change explicit drivers, run all affected dependencies, and compare alternatives on the same grain and definitions." /><p className={base.bodyCopy}>A scenario is useful only when decision-makers can explain what changed, why it changed, how it affected operations and finance, whether the outcome is feasible, and what action follows. Apex uses Version members because Sandboxes and Strategic Modeling were intentionally disabled in the application design.</p><div className={styles.modelFlow}>{["Approved Final", "Copy versions", "Change drivers", "Run dependencies", "Reconcile", "Compare", "Select", "Reapprove"].map((item, index) => <article key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong>{index < 7 && <ArrowRight size={13} />}</article>)}</div><h3 className={sales.sectionTitle}>Confirm scenario readiness</h3><SelectionGrid items={scenarioReadinessControls} selected={selected} onToggle={onToggle} /><div className={sales.boundary}><div><strong>Plan1 owns the model</strong><span>Baseline copies, driver input, dependency calculations, detailed exceptions, validation, and controlled promotion.</span></div><div><strong>ApexPlan ASO owns comparison</strong><span>Reconciled aggregate KPIs, common filters, variance bridges, management dashboards, and read-oriented Smart View analysis.</span></div></div></>;
}

function ScenarioVersionDesign({ answers, onAnswer }: AnswerProps) {
  const downloads = [["phase-18-scenario-what-if-practice-pack.zip", "Complete practice pack"], ["README.md", "Instructions and capture guide"], ["scenario-version-register.csv", "Scenario and Version register"], ["baseline-control.csv", "Baseline control"], ["what-if-driver-inputs.csv", "Driver inputs"], ["scenario-formulas.csv", "Formula specification"], ["expected-scenario-results.csv", "Expected results"], ["scenario-test-cases.csv", "Scenario test cases"], ["scenario-decision-log.csv", "Decision log"], ["scenario-exception-log.csv", "Exception log"]] as const;
  return <><Lead icon={<SlidersHorizontal size={23} />} eyebrow="Dimension purpose remains stable" title="Use Scenario for the planning dataset and Version for controlled iterations or outcomes; do not overload Entity, Period, comments, or separate applications with scenario meaning." /><div className={sales.downloadGrid}>{downloads.map(([file, label]) => <a download href={`${packPath}${file}`} key={file}><Download size={17} /><div><strong>{label}</strong><small>{file}</small></div></a>)}</div><div className={styles.versionMap}><div><small>Scenario</small><strong>Forecast</strong><span>The governed forecast dataset, time range, currency treatment, security, and reporting context.</span></div><div><small>Version · protected</small><strong>Final</strong><span>Approved comparison baseline and retained official outcome.</span></div><div><small>Version · writable</small><strong>Upside</strong><span>Evidence-backed favorable drivers with feasibility and risk controls.</span></div><div><small>Version · writable</small><strong>Downside</strong><span>Stress assumptions, contingency impacts, triggers, and actions.</span></div></div><DecisionTable items={scenarioVersionCases} answers={answers} onAnswer={onAnswer} label="scenario-version response" /></>;
}

function BaselineCopyControl({ answers, onAnswer }: AnswerProps) {
  return <><Lead icon={<Copy size={23} />} eyebrow="Copying is a controlled setup action" title="Freeze Final, authorize the exact source and target scope, copy only required data types, verify the job, and reconcile the target before any what-if driver changes." /><div className={styles.copyFlow}>{["Approval reference", "Final cutoff", "Plan1 controls", "Copy request", "Admin execution", "Target validation", "Zero opening variance"].map((item, index) => <article key={item}><span>{index + 1}</span><strong>{item}</strong></article>)}</div><DecisionTable items={baselineCopyCases} answers={answers} onAnswer={onAnswer} label="baseline-copy response" /><div className={styles.referenceNote}><ShieldCheck size={20} /><div><strong>Copy Versions has boundaries</strong><span>For this implementation it is administrator-operated, works between versions of the selected Forecast Scenario, and does not transfer approval status into an approved approval unit. The target workflow is controlled separately.</span></div></div></>;
}

function DriverAssumptions({ answers, onAnswer }: AnswerProps) {
  const drivers = [["Demand volume %", "Sales", "-20% to +15%", "Sales forecast, production, inventory, capacity, revenue"], ["Net price %", "Sales / Finance", "-5% to +5%", "Revenue, receivables, margin, tax, cash"], ["Material cost %", "Procurement / Costing", "-5% to +10%", "Unit cost, inventory value, COGS, margin, payables, cash"], ["Available capacity hours", "Operations", "700 to 1,000", "Utilization, overload, workforce or CapEx action"]] as const;
  return <><Lead icon={<Lightbulb size={23} />} eyebrow="Change causes, not outputs" title="Enter assumptions at their owned business grain, retain ranges and evidence, and let governed rules calculate downstream operational and financial effects." /><div className={styles.driverTable}><div className={styles.tableHead}><strong>Driver</strong><strong>Owner</strong><strong>Training range</strong><strong>Primary dependencies</strong></div>{drivers.map((row) => <div key={row[0]}>{row.map((cell) => <span key={cell}>{cell}</span>)}</div>)}</div><DecisionTable items={driverGovernanceCases} answers={answers} onAnswer={onAnswer} label="driver-governance response" /><div className={styles.referenceNote}><TriangleAlert size={20} /><div><strong>Do not type the desired answer</strong><span>Revenue, COGS, gross margin, net income, closing cash, and utilization are calculated outputs. A scenario that overrides them without changing their governed drivers breaks traceability and reconciliation.</span></div></div></>;
}

function ScenarioModel(props: ScenarioLabProps) {
  return <><Lead icon={<PlayCircle size={23} />} eyebrow="Run both sides of uncertainty" title="Calculate Upside and Downside from the same Final baseline, using transparent training formulas and one complete operational-to-financial dependency chain." /><ScenarioLab {...props} /><FormulaNote /></>;
}

function CompareDecide(props: ScenarioLabProps & AnswerProps) {
  return <><Lead icon={<BarChart3 size={23} />} eyebrow="A decision is more than a variance" title="Compare common KPIs, feasibility thresholds, driver attribution, cash, exceptions, actions, timing, and residual risk before selecting a case." /><ScenarioComparison savedRuns={props.savedRuns} /><DecisionTable items={comparisonCases} answers={props.answers} onAnswer={props.onAnswer} label="comparison response" /></>;
}

function PromotePublish({ answers, onAnswer }: AnswerProps) {
  return <><Lead icon={<RefreshCw size={23} />} eyebrow="A what-if version is not the official plan" title="Move the coherent selected driver set into Forecast / Working, rerun every dependency, reapprove affected units, publish the approved result, and preserve the decision trail." /><div className={styles.promotionFlow}>{["Select case", "Approve rationale", "Copy drivers to Working", "Rerun dependencies", "Validate", "Submit / approve", "Publish ASO", "Reconcile and retain"].map((item, index) => <article key={item}><span>{index + 1}</span><strong>{item}</strong></article>)}</div><DecisionTable items={promotionCases} answers={answers} onAnswer={onAnswer} label="promotion response" /><div className={styles.referenceNote}><ClipboardCheck size={20} /><div><strong>Retain rejected alternatives</strong><span>Record why an alternative was not selected, its trigger conditions, residual risks, and expiry. This preserves the decision basis and makes contingency activation faster and auditable.</span></div></div></>;
}

function ScenarioWalkthrough({ selected, onToggle }: { selected: string[]; onToggle: (item: string) => void }) {
  return <><Lead icon={<Camera size={23} />} eyebrow="One traceable decision cycle" title="Capture the Version design, protected baseline, copy, drivers, calculations, comparison, Smart View sensitivity, selected-case promotion, workflow, publish, and reconciliation." /><SelectionGrid items={scenarioWalkthroughControls} selected={selected} onToggle={onToggle} /><ScreenshotWalkthrough /><div className={sales.scopeTag}>The ten slots are intentionally empty. Add one consistent Oracle training cycle only after the Version members, forms, rules, comparison dashboard, and promotion process are stable.</div></>;
}

function ScenarioHomework(props: HomeworkProps) {
  return <><Lead icon={<BookOpenCheck size={23} />} eyebrow="Applied decision lab" title="Build a controlled alternative set, calculate both cases, reconcile the comparison, select a coherent response, and defend how it enters the official plan." /><div className={sales.missionTabs}>{scenarioHomeworkMissions.map((mission) => <button className={props.active === mission.id ? sales.activeMission : ""} key={mission.id} onClick={() => props.onActive(mission.id)} type="button"><span>{props.status[mission.id] ? <CheckCircle2 size={16} /> : <PlayCircle size={16} />}</span><div><strong>{mission.label}</strong><small>{mission.purpose}</small></div></button>)}</div><section className={sales.missionWorkspace}>{props.active === "design" && <DecisionTable items={scenarioVersionCases} answers={props.versionAnswers} onAnswer={props.onVersion} label="scenario-version response" />}{props.active === "copy" && <DecisionTable items={baselineCopyCases} answers={props.copyAnswers} onAnswer={props.onCopy} label="baseline-copy response" />}{props.active === "drivers" && <DecisionTable items={driverGovernanceCases} answers={props.driverAnswers} onAnswer={props.onDriver} label="driver-governance response" />}{props.active === "model" && <><ScenarioLab {...props.modelProps} /><ScenarioComparison savedRuns={props.modelProps.savedRuns} /><DecisionTable items={comparisonCases} answers={props.comparisonAnswers} onAnswer={props.onComparison} label="comparison response" /></>}{props.active === "readout" && <><DecisionTable items={promotionCases} answers={props.promotionAnswers} onAnswer={props.onPromotion} label="promotion response" /><DecisionTable items={scenarioTestCases} answers={props.testAnswers} onAnswer={props.onTest} label="scenario-test response" /><h3 className={sales.sectionTitle}>Confirm the execution order</h3><SequenceList items={scenarioExecutionSequence} selected={props.sequence} onToggle={props.onSequence} /><h3 className={sales.sectionTitle}>Confirm final reconciliations</h3><SelectionGrid items={scenarioReconciliationControls} selected={props.reconciled} onToggle={props.onReconcile} /><label className={sales.summaryField}>Scenario decision and release recommendation<textarea rows={12} value={props.readout} onChange={(event) => props.onReadout(event.target.value)} placeholder="Summarize the decision question, baseline, versions, copy scope, drivers, dependency jobs, results, feasibility, KPI comparison, sensitivity, exceptions, selected case, rejected alternatives, actions, risks, promotion, workflow, publish, reconciliation, owners, reviewers, and recommendation." /><small>{props.readout.trim().length}/240 minimum characters</small></label></>}</section></>;
}

function ScenarioExitGate({ selected, onToggle, summary, onSummary, answers, onAnswer, preview }: { selected: string[]; onToggle: (item: string) => void; summary: string; onSummary: (value: string) => void; answers: Answers; onAnswer: (id: string, value: string) => void; preview: string }) {
  return <><Lead icon={<ClipboardCheck size={23} />} eyebrow="Phase deliverable" title="Hand off a repeatable scenario process that protects the approved plan, makes uncertainty explainable, connects operations to financial outcomes, and promotes only governed decisions." /><h3 className={sales.sectionTitle}>Deliverable checklist</h3><SelectionGrid items={scenarioArtifacts} selected={selected} onToggle={onToggle} /><label className={sales.summaryField}>Scenario and what-if release-readiness summary<textarea rows={12} value={summary} onChange={(event) => onSummary(event.target.value)} placeholder="Summarize the Scenario and Version design, Final baseline, copy evidence, driver governance, Upside and Downside calculations, dependencies, operational and financial outcomes, comparison, sensitivity, exceptions, selected case, promotion, workflow, publish, reconciliation, security, support, owners, reviewers, residual risks, and approval." /><small>{summary.trim().length}/240 minimum characters</small></label><h3 className={sales.sectionTitle}>Knowledge check</h3><div className={base.quizList}>{scenarioKnowledgeQuestions.map((question, index) => <fieldset key={question.id}><legend><span>{index + 1}</span>{question.prompt}</legend>{question.options.map((option) => <label key={option}><input checked={answers[question.id] === option} name={question.id} onChange={() => onAnswer(question.id, option)} type="radio" />{option}</label>)}</fieldset>)}</div><div className={sales.preview}><small>Generated Phase 18 handoff</small><p>{preview}</p><div>Security and workflow <ArrowRight size={13} /> Scenario decision package <ArrowRight size={13} /> System integration testing</div></div></>;
}

function ScenarioLab({ activeScenario, drivers, result, savedRuns, onSelect, onDrivers, onRun }: ScenarioLabProps) {
  return <section className={styles.scenarioLab}><header><div><SlidersHorizontal size={19} /><div><small>PLAN1 · FORECAST · FY25 · INDIA OPERATIONS · INR</small><strong>What-if driver model</strong></div></div><span>{activeScenario} / Working analysis</span></header><div className={styles.scenarioTabs}>{(["Upside", "Downside"] as ScenarioName[]).map((name) => <button className={activeScenario === name ? styles.activeScenario : ""} key={name} onClick={() => onSelect(name)} type="button">{savedRuns[name] ? <CheckCircle2 size={16} /> : <Gauge size={16} />}{name}</button>)}</div><div className={styles.driverGrid}><NumberField label="Demand volume change" suffix="%" value={drivers.volumePct} onChange={(value) => onDrivers({ ...drivers, volumePct: value })} /><NumberField label="Net price change" suffix="%" value={drivers.pricePct} onChange={(value) => onDrivers({ ...drivers, pricePct: value })} /><NumberField label="Material cost change" suffix="%" value={drivers.materialCostPct} onChange={(value) => onDrivers({ ...drivers, materialCostPct: value })} /><NumberField label="Available capacity" suffix="h" value={drivers.capacityHours} onChange={(value) => onDrivers({ ...drivers, capacityHours: value })} /></div><label className={styles.assumptionNote}>Assumption rationale<textarea rows={3} value={drivers.note} onChange={(event) => onDrivers({ ...drivers, note: event.target.value })} /><small>{drivers.note.trim().length}/40 minimum characters</small></label><div className={styles.resultGrid}><Metric label="Production starts" value={format(result.units, 0)} detail={`${format(result.requiredHours, 1)} required hours`} /><Metric label="Capacity utilization" value={`${format(result.utilization, 1)}%`} detail={result.utilization <= 95 ? "Within 95% threshold" : "Capacity action required"} alert={result.utilization > 95} /><Metric label="Net revenue · INR" value={format(result.revenue, 2)} detail={`${format(result.revenue - BASE.revenue, 2)} vs Final`} /><Metric label="Gross margin · INR" value={format(result.grossMargin, 2)} detail={`${format(result.grossMargin - BASE.grossMargin, 2)} vs Final`} /><Metric label="Net income · INR" value={format(result.netIncome, 2)} detail={`${format(result.netIncome - BASE.netIncome, 2)} vs Final`} /><Metric label="Closing cash · INR" value={format(result.closingCash, 2)} detail={`${format(result.closingCash - BASE.closingCash, 2)} vs Final`} /></div>{!result.valid && <div className={styles.runError}><TriangleAlert size={17} /><span>Run blocked. Keep drivers within their training ranges and provide a rationale of at least 40 characters.</span></div>}{savedRuns[activeScenario] && <div className={styles.runSuccess}><CheckCircle2 size={17} /><span>{activeScenario} saved with its current driver set and calculated result.</span></div>}<footer><p>Feasible means utilization ≤ 95%, INR closing cash ≥ 300,000, and gross margin remains positive. Decision approval still requires all business controls.</p><button disabled={!result.valid} onClick={onRun} type="button"><PlayCircle size={15} />Run and save {activeScenario}</button></footer></section>;
}

function ScenarioComparison({ savedRuns }: { savedRuns: Partial<Record<ScenarioName, ScenarioResult>> }) {
  const metrics: Array<[string, keyof ScenarioResult, number]> = [["Production starts", "units", 0], ["Utilization %", "utilization", 1], ["Net revenue · INR", "revenue", 2], ["Gross margin · INR", "grossMargin", 2], ["Net income · INR", "netIncome", 2], ["Closing cash · INR", "closingCash", 2]];
  return <section className={styles.comparison}><header><GitCompareArrows size={18} /><div><small>APEXPLAN ASO · COMMON POV</small><strong>Final versus saved alternatives</strong></div></header><div className={styles.comparisonTable}><div className={styles.comparisonHead}><strong>Measure</strong><strong>Final</strong><strong>Upside</strong><strong>Downside</strong></div>{metrics.map(([label, key, digits]) => <div key={label}><strong>{label}</strong><span>{format(baseValue(key), digits)}</span><span>{savedRuns.Upside ? format(savedRuns.Upside[key] as number, digits) : "Run required"}</span><span>{savedRuns.Downside ? format(savedRuns.Downside[key] as number, digits) : "Run required"}</span></div>)}</div><footer><span>{savedRuns.Upside?.feasible ? "Upside feasible in training model" : "Upside pending or exception"}</span><span>{savedRuns.Downside?.feasible ? "Downside feasible in training model" : "Downside pending or exception"}</span></footer></section>;
}

function FormulaNote() {
  return <div className={styles.formulaNote}><strong>Transparent training formulas</strong><span>Units = 1,380 × volume factor. Hours = units ÷ 2. Revenue = 559,579.64 × volume factor × price factor. COGS = 356,855.54 × volume factor × material-cost factor. Net-income change = 65% of gross-margin change. Closing cash also deducts 15 per incremental unit above baseline. Production rules in Oracle remain the system of record.</span></div>;
}

function ScreenshotWalkthrough() {
  return <section className={sales.walkthrough}><div className={sales.walkthroughHeader}><div><Camera size={20} /><div><small>Screenshot-guided procedure</small><strong>Scenario and what-if walkthrough</strong></div></div><span>{scenarioScreenshots.length} guided steps</span></div><div className={sales.walkthroughGrid}>{scenarioScreenshots.map((step, index) => <article key={step.id}><div className={sales.stepTitle}><span>{String(index + 1).padStart(2, "0")}</span><div><small>{step.id}</small><strong>{step.title}</strong></div></div><OracleScreenshot asset={step.asset} capture={step.capture} className={sales.screenshot} phase="phase-18" title={step.title} /><dl><div><dt>Navigation</dt><dd>{step.path}</dd></div><div><dt>Trainee action</dt><dd>{step.action}</dd></div><div><dt>Validation evidence</dt><dd>{step.evidence}</dd></div></dl></article>)}</div></section>; 
}

function NumberField({ label, suffix, value, onChange }: { label: string; suffix: string; value: number; onChange: (value: number) => void }) { return <label>{label}<span><input aria-label={label} step="0.1" type="number" value={value} onChange={(event) => onChange(Number(event.target.value))} />{suffix}</span></label>; }
function Metric({ label, value, detail, alert = false }: { label: string; value: string; detail: string; alert?: boolean }) { return <article className={alert ? styles.metricAlert : ""}><small>{label}</small><strong>{value}</strong><span>{detail}</span></article>; }
function Lead({ icon, eyebrow, title }: { icon: React.ReactNode; eyebrow: string; title: string }) { return <div className={base.lessonLead}>{icon}<div><small>{eyebrow}</small><strong>{title}</strong></div></div>; }
function SelectionGrid({ items, selected, onToggle }: { items: readonly string[]; selected: string[]; onToggle: (item: string) => void }) { return <div className={design.selectionGrid}>{items.map((item) => <button className={selected.includes(item) ? design.selectedCard : ""} key={item} onClick={() => onToggle(item)} type="button">{selected.includes(item) ? <CheckCircle2 size={17} /> : <span />}<strong>{item}</strong></button>)}</div>; }
function DecisionTable({ items, answers, onAnswer, label }: { items: readonly { id: string; issue: string; correct: string; options: readonly string[] }[]; answers: Answers; onAnswer: (id: string, value: string) => void; label: string }) { return <div className={design.mappingTable}>{items.map((item) => <div className={design.tableRow} key={item.id}><div><strong>{item.id}</strong><small>{item.issue}</small></div><select aria-label={`${item.id} ${label}`} value={answers[item.id] ?? ""} onChange={(event) => onAnswer(item.id, event.target.value)}><option value="">Select controlled response</option>{item.options.map((option) => <option key={option}>{option}</option>)}</select></div>)}</div>; }
function SequenceList({ items, selected, onToggle }: { items: readonly string[]; selected: string[]; onToggle: (item: string) => void }) { return <div className={sales.sequence}>{items.map((item) => <button className={selected.includes(item) ? sales.confirmed : ""} key={item} onClick={() => onToggle(item)} type="button"><strong>{item}</strong><span>{selected.includes(item) ? <Check size={15} /> : "Confirm"}</span></button>)}</div>; }

const BASE = { units: 1380, capacityHours: 800, revenue: 559579.64, grossMargin: 202724.1, netIncome: 88293.07, closingCash: 383448.8 };
const BASE_COGS = BASE.revenue - BASE.grossMargin;

function calculateScenario(input: Drivers) {
  const volumeFactor = 1 + input.volumePct / 100;
  const priceFactor = 1 + input.pricePct / 100;
  const materialFactor = 1 + input.materialCostPct / 100;
  const units = BASE.units * volumeFactor;
  const requiredHours = units / 2;
  const utilization = input.capacityHours > 0 ? requiredHours / input.capacityHours * 100 : Number.POSITIVE_INFINITY;
  const revenue = BASE.revenue * volumeFactor * priceFactor;
  const cogs = BASE_COGS * volumeFactor * materialFactor;
  const grossMargin = revenue - cogs;
  const netIncome = BASE.netIncome + (grossMargin - BASE.grossMargin) * 0.65;
  const incrementalInventory = Math.max(0, units - BASE.units) * 15;
  const closingCash = BASE.closingCash + (netIncome - BASE.netIncome) - incrementalInventory;
  const valid = input.volumePct >= -20 && input.volumePct <= 15 && input.pricePct >= -5 && input.pricePct <= 5 && input.materialCostPct >= -5 && input.materialCostPct <= 10 && input.capacityHours >= 700 && input.capacityHours <= 1000 && input.note.trim().length >= 40;
  const feasible = valid && utilization <= 95 && closingCash >= 300000 && grossMargin > 0;
  return { units, requiredHours, utilization, revenue, cogs, grossMargin, netIncome, closingCash, feasible, valid };
}

function baseValue(key: keyof ScenarioResult) {
  if (key === "units") return BASE.units;
  if (key === "requiredHours") return BASE.units / 2;
  if (key === "utilization") return BASE.units / 2 / BASE.capacityHours * 100;
  if (key === "revenue") return BASE.revenue;
  if (key === "cogs") return BASE_COGS;
  if (key === "grossMargin") return BASE.grossMargin;
  if (key === "netIncome") return BASE.netIncome;
  if (key === "closingCash") return BASE.closingCash;
  return 0;
}

function format(value: number, digits = 0) { return value.toLocaleString(undefined, { minimumFractionDigits: digits, maximumFractionDigits: digits }); }

type AnswerProps = { answers: Answers; onAnswer: (id: string, value: string) => void };
type ScenarioLabProps = { activeScenario: ScenarioName; drivers: Drivers; result: ScenarioResult; savedRuns: Partial<Record<ScenarioName, ScenarioResult>>; onSelect: (name: ScenarioName) => void; onDrivers: (value: Drivers) => void; onRun: () => void };
type HomeworkProps = {
  active: HomeworkId; onActive: (id: HomeworkId) => void; status: Record<HomeworkId, boolean>;
  versionAnswers: Answers; onVersion: (id: string, value: string) => void;
  copyAnswers: Answers; onCopy: (id: string, value: string) => void;
  driverAnswers: Answers; onDriver: (id: string, value: string) => void;
  modelProps: ScenarioLabProps;
  comparisonAnswers: Answers; onComparison: (id: string, value: string) => void;
  promotionAnswers: Answers; onPromotion: (id: string, value: string) => void;
  testAnswers: Answers; onTest: (id: string, value: string) => void;
  sequence: string[]; onSequence: (item: string) => void; reconciled: string[]; onReconcile: (item: string) => void;
  readout: string; onReadout: (value: string) => void;
};
