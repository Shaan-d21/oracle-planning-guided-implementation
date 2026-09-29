"use client";

import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BookOpenCheck,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Download,
  FileCheck2,
  PlayCircle,
  RefreshCw,
  RotateCcw,
  ShieldCheck,
  TimerReset,
  Users,
  Workflow,
} from "lucide-react";
import { useEffect, useMemo, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { defectManagementLessons } from "@/content/defect-management-module";
import {
  commandCenterControls,
  configurationCases,
  cutoverArtifacts,
  cutoverEntryControls,
  cutoverHomeworkMissions,
  cutoverKnowledgeQuestions,
  cutoverLessons,
  cutoverRecommendationSequence,
  cutoverRunbookSteps,
  dataCutoverCases,
  operationalReadinessCases,
  rehearsalSteps,
  rollbackCases,
  runbookDecisionCases,
  type CutoverLessonId,
} from "@/content/cutover-module";
import { readTrackProgress, writeTrackProgress } from "@/lib/learning-progress";
import base from "./discovery-module.module.css";
import design from "./application-dimension-design-module.module.css";
import styles from "./cutover-module.module.css";
import { LearningModuleFrame, type ModuleFeedback } from "./learning-module-frame";

type Answers = Record<string, string>;
type HomeworkId = (typeof cutoverHomeworkMissions)[number]["id"];
type RehearsalKey = (typeof rehearsalSteps)[number][0];
type RehearsalInputs = Record<RehearsalKey, number> & { windowMinutes: number; reserveMinutes: number; incidentMinutes: number };

const packPath = "/training/oracle-planning/phase-23/";
const initialRehearsal: RehearsalInputs = {
  snapshotMinutes: 35,
  migrationMinutes: 75,
  validationMinutes: 45,
  dataMinutes: 110,
  calculationMinutes: 85,
  reconciliationMinutes: 65,
  windowMinutes: 480,
  reserveMinutes: 90,
  incidentMinutes: 20,
};

export function CutoverModule() {
  const [activeLesson, setActiveLesson] = useState<CutoverLessonId>("cutover-foundations");
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<ModuleFeedback>(null);
  const [entryControls, setEntryControls] = useState<string[]>([]);
  const [runbookAnswers, setRunbookAnswers] = useState<Answers>({});
  const [runbookSequence, setRunbookSequence] = useState<string[]>([]);
  const [configurationAnswers, setConfigurationAnswers] = useState<Answers>({});
  const [dataAnswers, setDataAnswers] = useState<Answers>({});
  const [readinessAnswers, setReadinessAnswers] = useState<Answers>({});
  const [rehearsal, setRehearsal] = useState<RehearsalInputs>(initialRehearsal);
  const [rollbackAnswers, setRollbackAnswers] = useState<Answers>({});
  const [commandChecks, setCommandChecks] = useState<string[]>([]);
  const [activeHomework, setActiveHomework] = useState<HomeworkId>("runbook");
  const [recommendationSequence, setRecommendationSequence] = useState<string[]>([]);
  const [recommendation, setRecommendation] = useState("");
  const [artifacts, setArtifacts] = useState<string[]>([]);
  const [summary, setSummary] = useState("");
  const [knowledgeAnswers, setKnowledgeAnswers] = useState<Answers>({});

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = readTrackProgress("implementation");
      setCompletedLessons(stored.completedLessons);
      const saved = cutoverLessons.find((lesson) => lesson.id === stored.activeLesson);
      if (saved) setActiveLesson(saved.id);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const prerequisiteComplete = defectManagementLessons.every((lesson) => completedLessons.includes(lesson.id));
  const allCorrect = (items: readonly { id: string; correct: string }[], answers: Answers) => items.every((item) => answers[item.id] === item.correct);
  const expectedRunbookSequence = cutoverRunbookSteps.map((step) => step.id);
  const correctRunbookSequence = runbookSequence.length === expectedRunbookSequence.length && runbookSequence.every((item, index) => item === expectedRunbookSequence[index]);
  const executionMinutes = rehearsalSteps.reduce((total, [key]) => total + rehearsal[key], 0) + rehearsal.incidentMinutes;
  const usableMinutes = rehearsal.windowMinutes - rehearsal.reserveMinutes;
  const rehearsalReady = rehearsal.windowMinutes > rehearsal.reserveMinutes && rehearsalSteps.every(([key]) => rehearsal[key] > 0) && rehearsal.incidentMinutes >= 0 && executionMinutes <= usableMinutes;
  const knowledgeReady = cutoverKnowledgeQuestions.every((question) => knowledgeAnswers[question.id] === question.correct);
  const homeworkStatus: Record<HomeworkId, boolean> = {
    runbook: allCorrect(runbookDecisionCases, runbookAnswers) && correctRunbookSequence,
    configuration: allCorrect(configurationCases, configurationAnswers),
    data: allCorrect(dataCutoverCases, dataAnswers),
    rollback: allCorrect(rollbackCases, rollbackAnswers),
    recommendation: recommendationSequence.length === cutoverRecommendationSequence.length && recommendationSequence.every((item, index) => item === cutoverRecommendationSequence[index]) && recommendation.trim().length >= 240,
  };
  const exitPreview = useMemo(() => artifacts.length === cutoverArtifacts.length && summary.trim().length >= 240
    ? `${summary.trim()} The evidence pack identifies the exact release, production state, completed runbook, deviations, reconciliations, recovery position, residual risks, support ownership, and authorized Go/No-Go recommendation.`
    : "Complete all eight cutover artifacts and provide an authorized cutover summary of at least 240 characters.", [artifacts, summary]);

  function persist(nextCompleted: string[], lesson: CutoverLessonId) {
    writeTrackProgress("implementation", { completedLessons: nextCompleted, activeLesson: lesson, activeModuleId: "implementation-cutover", lastVisited: new Date().toISOString() });
  }

  function goToLesson(id: CutoverLessonId) {
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

  function validateLesson() {
    if (activeLesson === "cutover-foundations") {
      if (entryControls.length !== cutoverEntryControls.length) return setFeedback({ tone: "error", message: "Confirm all five cutover entry controls before planning production execution." });
      return markComplete("The cutover starts from an approved release, ready production services, controlled package, reconciled source data, and named decision authority.");
    }
    if (activeLesson === "cutover-runbook") {
      if (!allCorrect(runbookDecisionCases, runbookAnswers) || !correctRunbookSequence) return setFeedback({ tone: "error", message: "Resolve all four runbook decisions and build the nine activities in their dependency order." });
      return markComplete("The integrated runbook now controls sequence, dependencies, ownership, timing, evidence, acceptance, and the Go/No-Go handoff.");
    }
    if (activeLesson === "cutover-configuration") {
      if (!allCorrect(configurationCases, configurationAnswers)) return setFeedback({ tone: "error", message: "Correct all package, warning, dependency, and environment-configuration decisions." });
      return markComplete("Configuration cutover protects the approved package, freeze, dependencies, environment values, migration results, and validation evidence.");
    }
    if (activeLesson === "cutover-data") {
      if (!allCorrect(dataCutoverCases, dataAnswers)) return setFeedback({ tone: "error", message: "Resolve all source-total, rejection, cube-publish, and late-file decisions." });
      return markComplete("Final data now follows a controlled extract-to-load-to-calculate-to-publish-to-reconcile path with retained evidence.");
    }
    if (activeLesson === "cutover-readiness") {
      if (!allCorrect(operationalReadinessCases, readinessAnswers)) return setFeedback({ tone: "error", message: "Correct all representative-user, schedule, support, and Smart View readiness decisions." });
      return markComplete("Production operations now cover representative access, controlled schedules, monitoring, incident ownership, escalation, and supported user connections.");
    }
    if (activeLesson === "cutover-rehearsal") {
      if (!rehearsalReady) return setFeedback({ tone: "error", message: "Keep every required activity positive and fit execution plus incident allowance inside the window after contingency reserve." });
      return markComplete("The rehearsal proves a feasible, evidence-backed critical path with protected contingency reserve and measurable recovery time.");
    }
    if (activeLesson === "cutover-rollback") {
      if (!allCorrect(rollbackCases, rollbackAnswers)) return setFeedback({ tone: "error", message: "Correct all rollback-threshold, decision-authority, complete-recovery, and controlled-continuation decisions." });
      return markComplete("Rollback now covers the complete application, data, integration, schedule, communication, and business-continuity state—not only snapshot restoration.");
    }
    if (activeLesson === "cutover-command-center") {
      if (commandChecks.length !== commandCenterControls.length) return setFeedback({ tone: "error", message: "Confirm all five command-center execution and communication controls." });
      return markComplete("The command center now reports evidence, timing, critical-path effect, ownership, decisions, deviations, recovery, and approved communications.");
    }
    if (activeLesson === "cutover-homework") {
      if (!Object.values(homeworkStatus).every(Boolean)) return setFeedback({ tone: "error", message: "Complete all five applied missions, including the ordered evidence review and 240-character recommendation." });
      return markComplete("Applied cutover lab complete. The release, data, recovery, evidence, and Go/No-Go recommendation are governed as one production transition.");
    }
    if (artifacts.length !== cutoverArtifacts.length || summary.trim().length < 240 || !knowledgeReady) return setFeedback({ tone: "error", message: "Select all eight deliverables, provide a 240-character cutover summary, and answer all five knowledge checks correctly." });
    markComplete("Phase 23 exit gate passed. The reconciled production state, deviations, risks, recovery position, support readiness, and Go/No-Go recommendation are ready for Phase 24 Go-Live and Hypercare.");
  }

  return (
    <LearningModuleFrame
      activeLessonId={activeLesson}
      completedLessons={completedLessons}
      description="Move the approved ApexPlan release into production through one dependency-driven runbook covering configuration, data, validation, recovery, evidence, communications, and decision authority."
      exitGate="Approve the completed runbook, production configuration and data state, reconciliations, deviations, recovery position, support handoff, residual risks, and Go/No-Go recommendation"
      exitGateIcon={<TimerReset size={18} />}
      feedback={feedback}
      lessons={cutoverLessons}
      onSelectLesson={(id) => goToLesson(id as CutoverLessonId)}
      onValidate={validateLesson}
      phase={23}
      prerequisite={{ complete: prerequisiteComplete, message: "Complete Phase 22 so cutover begins from an identifiable release with no uncontrolled blocker and an approved residual-risk position.", href: "/learn/defect-management", linkLabel: "Open Phase 22" }}
      stage="Deploy · Cutover"
      title="Cutover"
      validateLabel={activeLesson === "cutover-exit-gate" ? "Approve cutover exit" : undefined}
    >
      {activeLesson === "cutover-foundations" && <CutoverFoundations selected={entryControls} onToggle={(item) => toggle(setEntryControls, item)} />}
      {activeLesson === "cutover-runbook" && <CutoverRunbook answers={runbookAnswers} onAnswer={(id, value) => setRunbookAnswers((current) => ({ ...current, [id]: value }))} sequence={runbookSequence} onSequence={setRunbookSequence} />}
      {activeLesson === "cutover-configuration" && <CutoverConfiguration answers={configurationAnswers} onAnswer={(id, value) => setConfigurationAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "cutover-data" && <CutoverData answers={dataAnswers} onAnswer={(id, value) => setDataAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "cutover-readiness" && <CutoverReadiness answers={readinessAnswers} onAnswer={(id, value) => setReadinessAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "cutover-rehearsal" && <CutoverRehearsal inputs={rehearsal} onInput={setRehearsal} />}
      {activeLesson === "cutover-rollback" && <CutoverRollback answers={rollbackAnswers} onAnswer={(id, value) => setRollbackAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "cutover-command-center" && <CutoverCommandCenter selected={commandChecks} onToggle={(item) => toggle(setCommandChecks, item)} />}
      {activeLesson === "cutover-homework" && <CutoverHomework active={activeHomework} onActive={setActiveHomework} status={homeworkStatus} runbookAnswers={runbookAnswers} onRunbook={(id, value) => setRunbookAnswers((current) => ({ ...current, [id]: value }))} runbookSequence={runbookSequence} onRunbookSequence={setRunbookSequence} configurationAnswers={configurationAnswers} onConfiguration={(id, value) => setConfigurationAnswers((current) => ({ ...current, [id]: value }))} dataAnswers={dataAnswers} onData={(id, value) => setDataAnswers((current) => ({ ...current, [id]: value }))} rollbackAnswers={rollbackAnswers} onRollback={(id, value) => setRollbackAnswers((current) => ({ ...current, [id]: value }))} recommendationSequence={recommendationSequence} onRecommendationSequence={setRecommendationSequence} recommendation={recommendation} onRecommendation={setRecommendation} />}
      {activeLesson === "cutover-exit-gate" && <CutoverExit artifacts={artifacts} onToggle={(item) => toggle(setArtifacts, item)} summary={summary} onSummary={setSummary} preview={exitPreview} answers={knowledgeAnswers} onAnswer={(id, value) => setKnowledgeAnswers((current) => ({ ...current, [id]: value }))} />}
    </LearningModuleFrame>
  );
}

function Lead({ eyebrow, title, icon = <TimerReset size={23} /> }: { eyebrow: string; title: string; icon?: ReactNode }) {
  return <div className={base.lessonLead}>{icon}<div><small>{eyebrow}</small><strong>{title}</strong></div></div>;
}

function DecisionTable({ items, answers, onAnswer, placeholder = "Select controlled response" }: { items: readonly { id: string; issue: string; correct: string; options: readonly string[] }[]; answers: Answers; onAnswer: (id: string, value: string) => void; placeholder?: string }) {
  return <div className={design.mappingTable}>{items.map((item) => <div className={design.tableRow} key={item.id}><div><strong>{item.id}</strong><small>{item.issue}</small></div><select aria-label={`${item.id} decision`} value={answers[item.id] ?? ""} onChange={(event) => onAnswer(item.id, event.target.value)}><option value="">{placeholder}</option>{item.options.map((option, index) => <option key={`${item.id}-${index}`} value={option}>{option}</option>)}</select></div>)}</div>;
}

function SequenceBuilder({ sequence, onSequence }: { sequence: string[]; onSequence: (value: string[]) => void }) {
  return <><div className={styles.sequence}>{cutoverRunbookSteps.map((step) => <button className={sequence.includes(step.id) ? styles.sequenceDone : ""} disabled={sequence.includes(step.id)} key={step.id} onClick={() => onSequence([...sequence, step.id])} type="button"><span>{sequence.includes(step.id) ? <Check size={14} /> : <PlayCircle size={14} />}</span><div><strong>{step.id} · {step.title}</strong><small>{step.owner} · after {step.predecessor}</small></div></button>)}</div><button className={styles.resetButton} onClick={() => onSequence([])} type="button"><RefreshCw size={14} /> Reset sequence</button></>;
}

function CutoverFoundations({ selected, onToggle }: { selected: string[]; onToggle: (item: string) => void }) {
  return <><Lead eyebrow="Controlled production transition" title="Cutover is the time-bound, evidence-led transition from an approved release candidate to a validated production operating state." /><p className={base.bodyCopy}>Phase 23 does not redesign the solution or reopen UAT. It executes a preapproved sequence, protects recovery, measures the critical path, reconciles every material result, records every deviation, and gives named business authority enough evidence to decide whether production may open.</p><div className={styles.boundaryGrid}>{[["Input", "Approved release", "Defect position, package versions, source files, tenant readiness, and residual risks"], ["Control", "Integrated runbook", "Dependencies, owners, timing, evidence, acceptance, escalation, and rollback thresholds"], ["Output", "Known production state", "Reconciled solution, smoke evidence, support handoff, and Go/No-Go recommendation"]].map(([small, strong, body]) => <article key={small}><small>{small}</small><strong>{strong}</strong><span>{body}</span></article>)}</div><h3 className={base.sectionTitle}>Confirm cutover entry criteria</h3><div className={design.selectionGrid}>{cutoverEntryControls.map((item) => <button className={selected.includes(item) ? design.selectedCard : ""} key={item} onClick={() => onToggle(item)} type="button">{selected.includes(item) ? <CheckCircle2 size={17} /> : <span />}<strong>{item}</strong></button>)}</div><div className={styles.downloadGrid}><a download href={`${packPath}phase-23-cutover-practice-pack.zip`}><Download size={18} /><span><strong>Complete practice pack</strong><small>All Phase 23 templates</small></span></a><a download href={`${packPath}cutover-runbook.csv`}><Download size={18} /><span><strong>Integrated runbook</strong><small>Dependency and evidence control</small></span></a><a download href={`${packPath}reconciliation-control.csv`}><Download size={18} /><span><strong>Reconciliation control</strong><small>Source-to-reporting proof</small></span></a><a download href={`${packPath}rollback-plan.csv`}><Download size={18} /><span><strong>Rollback plan</strong><small>Recovery and continuity</small></span></a><a download href={`${packPath}communications-plan.csv`}><Download size={18} /><span><strong>Communications plan</strong><small>Audience and checkpoint control</small></span></a></div><div className={styles.referenceNote}><ShieldCheck size={20} /><div><strong>No screenshot is required for the core cutover method</strong><span>Migration job details, Process Details, Data Integration results, rule jobs, forms, dashboards, Smart View, and security tests become execution evidence. A click-by-click Oracle walkthrough should be added only when tenant-specific screenshots are available and reviewed.</span></div></div></>;
}

function CutoverRunbook({ answers, onAnswer, sequence, onSequence }: { answers: Answers; onAnswer: (id: string, value: string) => void; sequence: string[]; onSequence: (value: string[]) => void }) {
  return <><Lead eyebrow="One authoritative execution plan" title="Every task needs a predecessor, one accountable owner, planned and latest finish, evidence, acceptance, and an escalation rule." icon={<Workflow size={23} />} /><div className={styles.runbookTable}><div className={styles.runbookHeader}><span>Step</span><span>Owner / dependency</span><span>Completion evidence</span></div>{cutoverRunbookSteps.map((step) => <article key={step.id}><div><small>{step.id}</small><strong>{step.title}</strong></div><div><strong>{step.owner}</strong><small>After: {step.predecessor}</small></div><p>{step.evidence}</p></article>)}</div><h3 className={base.sectionTitle}>Resolve runbook controls</h3><DecisionTable items={runbookDecisionCases} answers={answers} onAnswer={onAnswer} /><h3 className={base.sectionTitle}>Build the dependency sequence</h3><SequenceBuilder sequence={sequence} onSequence={onSequence} /></>;
}

function CutoverConfiguration({ answers, onAnswer }: { answers: Answers; onAnswer: (id: string, value: string) => void }) {
  return <><Lead eyebrow="Release and environment control" title="Production receives the approved package through repeatable migration—not improvised changes made during the window." icon={<FileCheck2 size={23} />} /><div className={styles.controlFlow}>{["Freeze approved build", "Name recovery snapshot", "Verify artifact inventory", "Import package", "Resolve warnings", "Apply environment values", "Validate dependencies", "Retain job evidence"].map((item, index) => <article key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></article>)}</div><DecisionTable items={configurationCases} answers={answers} onAnswer={onAnswer} /><div className={styles.referenceNote}><AlertTriangle size={20} /><div><strong>Oracle execution evidence</strong><span>Retain the snapshot name, migration package version, import job ID, artifact counts, warnings and errors, substitution variables, connections, rules, forms, security, reports, templates, and reviewer acceptance. A successful import status alone is not configuration acceptance.</span></div></div></>;
}

function CutoverData({ answers, onAnswer }: { answers: Answers; onAnswer: (id: string, value: string) => void }) {
  return <><Lead eyebrow="Controlled final data state" title="A loaded file is not complete until accepted and rejected records, calculated results, cube publishing, and business totals reconcile." icon={<Activity size={23} />} /><div className={styles.dataChain}>{["Freeze and extract", "Control total + checksum", "Stage and validate", "Load Plan1", "Resolve rejects", "Calculate and aggregate", "Publish to ApexPlan ASO", "Reconcile outputs"].map((item, index) => <span key={item}>{item}{index < 7 && <ArrowRight size={13} />}</span>)}</div><DecisionTable items={dataCutoverCases} answers={answers} onAnswer={onAnswer} /><div className={styles.referenceNote}><ClipboardCheck size={20} /><div><strong>Minimum reconciliation</strong><span>Prove source extract to staged file, accepted plus rejected values, Plan1 loaded balances, opening and movement logic, calculated results, Plan1-to-ASO publishing, dashboards, and Smart View outputs at full precision before rounding for presentation.</span></div></div></>;
}

function CutoverReadiness({ answers, onAnswer }: { answers: Answers; onAnswer: (id: string, value: string) => void }) {
  return <><Lead eyebrow="Operate after the project team leaves" title="Production readiness includes the people, monitoring, schedules, access, connections, incident path, and runbooks needed for the first live cycle." icon={<Users size={23} />} /><div className={styles.readinessGrid}>{[["Access", "Representative positive and negative role tests"], ["Automation", "Owned schedules, dependencies, alerts, and rerun rules"], ["Support", "Severity, SLA, contacts, escalation, and handoff"], ["User tools", "Production navigation, forms, dashboards, and Smart View"], ["Operations", "Monitoring, maintenance, backup, recovery, and audit"], ["Communications", "Approved status, impacts, actions, and checkpoints"]].map(([title, body]) => <article key={title}><strong>{title}</strong><span>{body}</span></article>)}</div><DecisionTable items={operationalReadinessCases} answers={answers} onAnswer={onAnswer} /></>;
}

function CutoverRehearsal({ inputs, onInput }: { inputs: RehearsalInputs; onInput: (value: RehearsalInputs) => void }) {
  const execution = rehearsalSteps.reduce((total, [key]) => total + inputs[key], 0) + inputs.incidentMinutes;
  const usable = inputs.windowMinutes - inputs.reserveMinutes;
  const slack = usable - execution;
  const ready = inputs.windowMinutes > inputs.reserveMinutes && rehearsalSteps.every(([key]) => inputs[key] > 0) && inputs.incidentMinutes >= 0 && execution <= usable;
  const update = (key: keyof RehearsalInputs, value: number) => onInput({ ...inputs, [key]: Math.max(0, value) });
  return <><Lead eyebrow="Measure before production" title="Rehearse the full critical path with representative volume, named operators, retained evidence, injected recovery, and measured—not estimated—duration." icon={<Clock3 size={23} />} /><div className={styles.rehearsalLab}><header><div><TimerReset size={20} /><span><small>Eight-hour production window</small><strong>Critical-path feasibility</strong></span></div><b className={ready ? styles.ready : styles.notReady}>{ready ? "Window feasible" : "Window at risk"}</b></header><div className={styles.rehearsalInputs}>{rehearsalSteps.map(([key, label]) => <label key={key}>{label}<input min={1} type="number" value={inputs[key]} onChange={(event) => update(key, Number(event.target.value))} /><small>minutes</small></label>)}<label>Incident / rerun allowance<input min={0} type="number" value={inputs.incidentMinutes} onChange={(event) => update("incidentMinutes", Number(event.target.value))} /><small>minutes</small></label><label>Approved window<input min={1} type="number" value={inputs.windowMinutes} onChange={(event) => update("windowMinutes", Number(event.target.value))} /><small>minutes</small></label><label>Protected contingency reserve<input min={0} type="number" value={inputs.reserveMinutes} onChange={(event) => update("reserveMinutes", Number(event.target.value))} /><small>minutes</small></label></div><div className={styles.metricGrid}><article><small>Execution</small><strong>{execution} min</strong></article><article><small>Usable window</small><strong>{usable} min</strong></article><article><small>Slack</small><strong>{slack} min</strong></article></div><footer><p>Do not compress duration by deleting validation or reconciliation. Improve packaging, automation, parallelism with safe dependencies, data preparation, and operator readiness.</p><button onClick={() => onInput({ snapshotMinutes: 30, migrationMinutes: 55, validationMinutes: 30, dataMinutes: 80, calculationMinutes: 65, reconciliationMinutes: 45, incidentMinutes: 10, windowMinutes: 480, reserveMinutes: 90 })} type="button"><Check size={15} /> Apply evidence-backed rehearsal</button></footer></div></>;
}

function CutoverRollback({ answers, onAnswer }: { answers: Answers; onAnswer: (id: string, value: string) => void }) {
  return <><Lead eyebrow="Recovery is a business decision" title="Rollback must restore a known, supportable end-to-end state before the decision deadline—not merely reverse one technical step." icon={<RotateCcw size={23} />} /><div className={styles.rollbackGrid}>{[["Trigger", "Material integrity, security, continuity, or time-window threshold"], ["Authority", "Named business and technical decision forum"], ["Checkpoint", "Latest safe decision time and recoverable data state"], ["Execution", "Application, data, integrations, schedules, files, and communications"], ["Validation", "Restored service, totals, access, jobs, downstream consumers, and owner acceptance"], ["Continuity", "Approved fallback, user instructions, open risk, and revised deployment plan"]].map(([title, body]) => <article key={title}><strong>{title}</strong><span>{body}</span></article>)}</div><DecisionTable items={rollbackCases} answers={answers} onAnswer={onAnswer} /></>;
}

function CutoverCommandCenter({ selected, onToggle }: { selected: string[]; onToggle: (item: string) => void }) {
  return <><Lead eyebrow="Time-bound production walkthrough" title="The command center turns live evidence into owned actions and authorized decisions while protecting one source of execution truth." icon={<Users size={23} />} /><div className={styles.commandFlow}>{["Entry gate", "Freeze", "Snapshot", "Migration", "Validation", "Data", "Calculate", "Reconcile", "Decision"].map((item, index) => <article key={item}><span>{index + 1}</span><strong>{item}</strong></article>)}</div><h3 className={base.sectionTitle}>Command-center controls</h3><div className={design.selectionGrid}>{commandCenterControls.map((item) => <button className={selected.includes(item) ? design.selectedCard : ""} key={item} onClick={() => onToggle(item)} type="button">{selected.includes(item) ? <CheckCircle2 size={17} /> : <span />}<strong>{item}</strong></button>)}</div><div className={styles.referenceNote}><ClipboardCheck size={20} /><div><strong>Recommended checkpoints</strong><span>Open at entry; report at every critical-path completion, deviation, threshold breach, and rollback checkpoint; conduct the formal Go/No-Go review only after reconciliations, smoke tests, support readiness, deviations, residual risks, and recovery state are visible.</span></div></div></>;
}

type HomeworkProps = { active: HomeworkId; onActive: (id: HomeworkId) => void; status: Record<HomeworkId, boolean>; runbookAnswers: Answers; onRunbook: (id: string, value: string) => void; runbookSequence: string[]; onRunbookSequence: (value: string[]) => void; configurationAnswers: Answers; onConfiguration: (id: string, value: string) => void; dataAnswers: Answers; onData: (id: string, value: string) => void; rollbackAnswers: Answers; onRollback: (id: string, value: string) => void; recommendationSequence: string[]; onRecommendationSequence: (value: string[]) => void; recommendation: string; onRecommendation: (value: string) => void };

function CutoverHomework(props: HomeworkProps) {
  const mission = cutoverHomeworkMissions.find((item) => item.id === props.active) ?? cutoverHomeworkMissions[0];
  const completed = cutoverHomeworkMissions.filter((item) => props.status[item.id]).length;
  return <><Lead eyebrow="Applied production challenge" title="Prepare ApexPlan Release Candidate 1 for an evidence-backed Go/No-Go review without improvising production changes." icon={<BookOpenCheck size={23} />} /><div className={base.homeworkMissionGrid}>{cutoverHomeworkMissions.map((item, index) => <button className={`${item.id === props.active ? base.homeworkMissionActive : ""} ${props.status[item.id] ? base.homeworkMissionDone : ""}`} key={item.id} onClick={() => props.onActive(item.id)} type="button"><span>{props.status[item.id] ? <Check size={14} /> : index + 1}</span><div><strong>{item.title}</strong><small>{item.description}</small></div></button>)}</div><div className={base.homeworkProgress}><div><span style={{ width: `${(completed / cutoverHomeworkMissions.length) * 100}%` }} /></div><strong>{completed} / {cutoverHomeworkMissions.length} missions ready</strong></div><section className={base.homeworkWorkspace}><header><div><small>Mission {cutoverHomeworkMissions.findIndex((item) => item.id === props.active) + 1}</small><h3>{mission.title}</h3></div><span>{props.status[props.active] ? "Ready" : "In progress"}</span></header><p className={base.homeworkPurpose}>{mission.description}</p>{props.active === "runbook" && <div className={styles.homeworkBody}><DecisionTable items={runbookDecisionCases} answers={props.runbookAnswers} onAnswer={props.onRunbook} /><h4>Execution sequence</h4><SequenceBuilder sequence={props.runbookSequence} onSequence={props.onRunbookSequence} /></div>}{props.active === "configuration" && <div className={styles.homeworkBody}><DecisionTable items={configurationCases} answers={props.configurationAnswers} onAnswer={props.onConfiguration} /></div>}{props.active === "data" && <div className={styles.homeworkBody}><DecisionTable items={dataCutoverCases} answers={props.dataAnswers} onAnswer={props.onData} /></div>}{props.active === "rollback" && <div className={styles.homeworkBody}><DecisionTable items={rollbackCases} answers={props.rollbackAnswers} onAnswer={props.onRollback} /></div>}{props.active === "recommendation" && <div className={styles.homeworkBody}><div className={styles.sequence}>{cutoverRecommendationSequence.map((item) => <button className={props.recommendationSequence.includes(item) ? styles.sequenceDone : ""} disabled={props.recommendationSequence.includes(item)} key={item} onClick={() => props.onRecommendationSequence([...props.recommendationSequence, item])} type="button"><span>{props.recommendationSequence.includes(item) ? <Check size={14} /> : <PlayCircle size={14} />}</span><strong>{item}</strong></button>)}</div><button className={styles.resetButton} onClick={() => props.onRecommendationSequence([])} type="button"><RefreshCw size={14} /> Reset sequence</button><label className={base.summaryField}>Go/No-Go recommendation<textarea rows={6} value={props.recommendation} onChange={(event) => props.onRecommendation(event.target.value)} placeholder="State the release, completed runbook, configuration and data state, reconciliations, smoke tests, deviations, residual risks, rollback state and deadline, support readiness, authority, and recommendation." /><small>{props.recommendation.trim().length} / 240 minimum</small></label></div>}</section></>;
}

function CutoverExit({ artifacts, onToggle, summary, onSummary, preview, answers, onAnswer }: { artifacts: string[]; onToggle: (item: string) => void; summary: string; onSummary: (value: string) => void; preview: string; answers: Answers; onAnswer: (id: string, value: string) => void }) {
  return <><Lead eyebrow="Phase 23 exit gate" title="Go-live may proceed only from a known, reconciled production state with recoverability, support, deviations, and residual risk explicitly authorized." icon={<FileCheck2 size={23} />} /><div className={styles.exitStatement}><ShieldCheck size={22} /><div><strong>Cutover completion is not “all jobs are green.”</strong><span>It is evidence that the correct release and data are in production, business outcomes reconcile, representative users can operate, recovery remains viable, support is ready, and named authority accepts the exact remaining risk.</span></div></div><h3 className={base.sectionTitle}>Cutover evidence package</h3><div className={design.selectionGrid}>{cutoverArtifacts.map((item) => <button className={artifacts.includes(item) ? design.selectedCard : ""} key={item} onClick={() => onToggle(item)} type="button">{artifacts.includes(item) ? <CheckCircle2 size={17} /> : <span />}<strong>{item}</strong></button>)}</div><label className={base.summaryField}>Authorized cutover summary<textarea rows={6} value={summary} onChange={(event) => onSummary(event.target.value)} placeholder="Summarize the release, completed runbook, production configuration and data, reconciliations, smoke tests, timing, deviations, rollback state, support handoff, residual risks, approvers, and Go/No-Go recommendation." /><small>{summary.trim().length} / 240 minimum</small></label><div className={base.discoveryPreview}><small>Cutover statement preview</small><p>{preview}</p><div><FileCheck2 size={15} /> Known production state · recoverable transition · authorized recommendation</div></div><h3 className={base.questionTitle}>Knowledge check</h3><div className={base.quizList}>{cutoverKnowledgeQuestions.map((question) => <fieldset key={question.id}><legend><span>{question.id.replace("K-", "")}</span>{question.question}</legend>{question.options.map((option, index) => <label key={`${question.id}-${index}`}><input checked={answers[question.id] === option} name={question.id} onChange={() => onAnswer(question.id, option)} type="radio" />{option}</label>)}</fieldset>)}</div><div className={styles.packNote}><BookOpenCheck size={20} /><div><strong>Practice pack</strong><span>Complete the integrated runbook, reconciliation control, rollback plan, and communications plan during the lab. Retain versioned copies as the learner&apos;s Phase 23 evidence and the starting point for Phase 24.</span></div></div></>;
}
