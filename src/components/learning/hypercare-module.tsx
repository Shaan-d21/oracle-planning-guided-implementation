"use client";

import { Activity, AlertTriangle, BookOpenCheck, Check, CheckCircle2, ClipboardCheck, Download, FileCheck2, Gauge, LifeBuoy, RefreshCw, ShieldCheck, Users, Wrench } from "lucide-react";
import { useEffect, useMemo, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { goLiveLessons } from "@/content/go-live-module";
import {
  commandCenterCases,
  exitReadinessCases,
  fixGovernanceCases,
  hypercareArtifacts,
  hypercareCadence,
  hypercareEntryControls,
  hypercareHomeworkMissions,
  hypercareKnowledgeQuestions,
  hypercareLessons,
  hypercareOperatingSequence,
  monitoringCases,
  problemCases,
  triageCases,
  type HypercareLessonId,
} from "@/content/hypercare-module";
import { readTrackProgress, writeTrackProgress } from "@/lib/learning-progress";
import base from "./discovery-module.module.css";
import design from "./application-dimension-design-module.module.css";
import cutover from "./cutover-module.module.css";
import styles from "./hypercare-module.module.css";
import { LearningModuleFrame, type ModuleFeedback } from "./learning-module-frame";

type Answers = Record<string, string>;
type HomeworkId = (typeof hypercareHomeworkMissions)[number]["id"];
type StabilityMetrics = { critical: number; high: number; overdue: number; unreconciled: number; recurring: number; failedJobs: number; conditions: number; knowledgeGaps: number };

const initialMetrics: StabilityMetrics = { critical: 1, high: 2, overdue: 2, unreconciled: 1, recurring: 2, failedJobs: 1, conditions: 1, knowledgeGaps: 2 };
const stableMetrics: StabilityMetrics = { critical: 0, high: 0, overdue: 0, unreconciled: 0, recurring: 0, failedJobs: 0, conditions: 0, knowledgeGaps: 0 };
const packPath = "/training/oracle-planning/phase-26/";

export function HypercareModule() {
  const [activeLesson, setActiveLesson] = useState<HypercareLessonId>("hypercare-foundations");
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<ModuleFeedback>(null);
  const [entryControls, setEntryControls] = useState<string[]>([]);
  const [commandAnswers, setCommandAnswers] = useState<Answers>({});
  const [triageAnswers, setTriageAnswers] = useState<Answers>({});
  const [monitoringAnswers, setMonitoringAnswers] = useState<Answers>({});
  const [fixAnswers, setFixAnswers] = useState<Answers>({});
  const [problemAnswers, setProblemAnswers] = useState<Answers>({});
  const [exitAnswers, setExitAnswers] = useState<Answers>({});
  const [metrics, setMetrics] = useState<StabilityMetrics>(initialMetrics);
  const [sequence, setSequence] = useState<string[]>([]);
  const [activeHomework, setActiveHomework] = useState<HomeworkId>("cadence");
  const [closureReadout, setClosureReadout] = useState("");
  const [artifacts, setArtifacts] = useState<string[]>([]);
  const [summary, setSummary] = useState("");
  const [knowledgeAnswers, setKnowledgeAnswers] = useState<Answers>({});

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = readTrackProgress("implementation");
      setCompletedLessons(stored.completedLessons);
      const saved = hypercareLessons.find((lesson) => lesson.id === stored.activeLesson);
      if (saved) setActiveLesson(saved.id);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const prerequisiteComplete = goLiveLessons.every((lesson) => completedLessons.includes(lesson.id));
  const allCorrect = (items: readonly { id: string; correct: string }[], answers: Answers) => items.every((item) => answers[item.id] === item.correct);
  const sequenceReady = sequence.length === hypercareOperatingSequence.length && sequence.every((item, index) => item === hypercareOperatingSequence[index]);
  const stabilityReady = Object.values(metrics).every((value) => value === 0);
  const knowledgeReady = hypercareKnowledgeQuestions.every((question) => knowledgeAnswers[question.id] === question.correct);
  const homeworkStatus: Record<HomeworkId, boolean> = {
    cadence: allCorrect(commandCenterCases, commandAnswers),
    triage: allCorrect(triageCases, triageAnswers),
    monitor: allCorrect(monitoringCases, monitoringAnswers),
    fix: allCorrect(fixGovernanceCases, fixAnswers) && allCorrect(problemCases, problemAnswers),
    closure: sequenceReady && stabilityReady && closureReadout.trim().length >= 240,
  };
  const preview = useMemo(() => artifacts.length === hypercareArtifacts.length && summary.trim().length >= 240
    ? `${summary.trim()} The closure pack proves the stability window, support capability, accepted residual ownership, and authorized transition to business-as-usual operation.`
    : "Complete all eight closure artifacts and provide a Hypercare exit summary of at least 240 characters.", [artifacts, summary]);

  function persist(nextCompleted: string[], lesson: HypercareLessonId) {
    writeTrackProgress("implementation", { completedLessons: nextCompleted, activeLesson: lesson, activeModuleId: "implementation-hypercare", lastVisited: new Date().toISOString() });
  }
  function goToLesson(id: HypercareLessonId) { setActiveLesson(id); setFeedback(null); persist(completedLessons, id); }
  function markComplete(message: string) {
    const next = completedLessons.includes(activeLesson) ? completedLessons : [...completedLessons, activeLesson];
    setCompletedLessons(next); persist(next, activeLesson); setFeedback({ tone: "success", message });
  }
  function toggle(setter: Dispatch<SetStateAction<string[]>>, item: string) { setter((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item]); }

  function validateLesson() {
    if (activeLesson === "hypercare-foundations") {
      if (entryControls.length !== hypercareEntryControls.length) return setFeedback({ tone: "error", message: "Confirm the known production state, coverage, operating controls, monitoring, and measurable exit baseline." });
      return markComplete("Hypercare begins from an accepted production baseline with named coverage, one operating register, active monitoring, and agreed exit thresholds.");
    }
    if (activeLesson === "hypercare-command-center") {
      if (!allCorrect(commandCenterCases, commandAnswers)) return setFeedback({ tone: "error", message: "Correct all four command-center decisions about business impact, workarounds, control thresholds, and one authoritative status." });
      return markComplete("The command center now turns evidence into timely decisions, named actions, controlled communications, and an auditable service-health record.");
    }
    if (activeLesson === "hypercare-triage") {
      if (!allCorrect(triageCases, triageAnswers)) return setFeedback({ tone: "error", message: "Correct all five classifications, severity, duplicate, workaround, and enhancement-routing decisions." });
      return markComplete("Support intake now distinguishes incidents, service requests, problems, and changes while protecting business impact, evidence, SLA, and ownership.");
    }
    if (activeLesson === "hypercare-monitoring") {
      if (!allCorrect(monitoringCases, monitoringAnswers)) return setFeedback({ tone: "error", message: "Correct every technical, reconciliation, performance, adoption, and condition-monitoring decision." });
      return markComplete("Monitoring now measures business service health—not merely green jobs—across data, calculations, reporting, performance, adoption, and conditions.");
    }
    if (activeLesson === "hypercare-fix") {
      if (!allCorrect(fixGovernanceCases, fixAnswers)) return setFeedback({ tone: "error", message: "Correct all four workaround, emergency change, regression, and business-validation decisions." });
      return markComplete("Fixes and workarounds now preserve approval, version control, testing, regression, rollback, reconciliation, monitoring, and business acceptance.");
    }
    if (activeLesson === "hypercare-problem-management") {
      if (!allCorrect(problemCases, problemAnswers)) return setFeedback({ tone: "error", message: "Correct every recurrence, hypothesis, known-error, and knowledge-demand decision." });
      return markComplete("Recurring issues now move beyond repeated restoration into evidence-based root cause, preventive action, known-error control, and measurable learning.");
    }
    if (activeLesson === "hypercare-exit-readiness") {
      if (!allCorrect(exitReadinessCases, exitAnswers) || !stabilityReady) return setFeedback({ tone: "error", message: "Correct all four exit decisions and reduce every simulated threshold breach to zero using evidence-backed controls." });
      return markComplete("Exit readiness now depends on the agreed stability window, controlled residual risk, demonstrated BAU capability, and explicit operational acceptance.");
    }
    if (activeLesson === "hypercare-homework") {
      if (!Object.values(homeworkStatus).every(Boolean)) return setFeedback({ tone: "error", message: "Complete all five missions, the ordered operating sequence, stable metric state, and 240-character closure recommendation." });
      return markComplete("Applied stabilization lab complete. The learner can run Hypercare from production signal through controlled restoration, recurrence removal, and BAU handoff.");
    }
    if (artifacts.length !== hypercareArtifacts.length || summary.trim().length < 240 || !knowledgeReady) return setFeedback({ tone: "error", message: "Select all eight closure artifacts, write a 240-character exit summary, and answer all five knowledge checks correctly." });
    markComplete("Phase 26 exit gate passed. ApexPlan is stable, residual ownership is accepted, BAU support is capable, and continuous improvement can begin.");
  }

  return <LearningModuleFrame
    activeLessonId={activeLesson}
    completedLessons={completedLessons}
    description="Stabilize ApexPlan after production activation through disciplined support intake, command-center decisions, layered monitoring, controlled fixes, recurring-cause removal, knowledge transfer, and evidence-based transition to BAU."
    exitGate="Approve the stability window, control results, support capability, residual ownership, closure evidence, and BAU acceptance"
    exitGateIcon={<LifeBuoy size={18} />}
    feedback={feedback}
    lessons={hypercareLessons}
    onSelectLesson={(id) => goToLesson(id as HypercareLessonId)}
    onValidate={validateLesson}
    phase={26}
    prerequisite={{ complete: prerequisiteComplete, message: "Complete Phase 25 so Hypercare receives an accepted release, first-cycle evidence, open items, monitoring, ownership, and recovery state.", href: "/learn/go-live", linkLabel: "Open Phase 25" }}
    stage="Operate · Production stabilization"
    title="Hypercare"
    validateLabel={activeLesson === "hypercare-exit-gate" ? "Approve Hypercare exit" : undefined}
  >
    {activeLesson === "hypercare-foundations" && <Foundations selected={entryControls} onToggle={(item) => toggle(setEntryControls, item)} />}
    {activeLesson === "hypercare-command-center" && <CommandCenter answers={commandAnswers} onAnswer={(id, value) => setCommandAnswers((current) => ({ ...current, [id]: value }))} />}
    {activeLesson === "hypercare-triage" && <Triage answers={triageAnswers} onAnswer={(id, value) => setTriageAnswers((current) => ({ ...current, [id]: value }))} />}
    {activeLesson === "hypercare-monitoring" && <Monitoring answers={monitoringAnswers} onAnswer={(id, value) => setMonitoringAnswers((current) => ({ ...current, [id]: value }))} />}
    {activeLesson === "hypercare-fix" && <FixControl answers={fixAnswers} onAnswer={(id, value) => setFixAnswers((current) => ({ ...current, [id]: value }))} />}
    {activeLesson === "hypercare-problem-management" && <ProblemManagement answers={problemAnswers} onAnswer={(id, value) => setProblemAnswers((current) => ({ ...current, [id]: value }))} />}
    {activeLesson === "hypercare-exit-readiness" && <ExitReadiness answers={exitAnswers} onAnswer={(id, value) => setExitAnswers((current) => ({ ...current, [id]: value }))} metrics={metrics} onMetrics={setMetrics} />}
    {activeLesson === "hypercare-homework" && <Homework active={activeHomework} onActive={setActiveHomework} status={homeworkStatus} commandAnswers={commandAnswers} onCommand={(id, value) => setCommandAnswers((current) => ({ ...current, [id]: value }))} triageAnswers={triageAnswers} onTriage={(id, value) => setTriageAnswers((current) => ({ ...current, [id]: value }))} monitorAnswers={monitoringAnswers} onMonitor={(id, value) => setMonitoringAnswers((current) => ({ ...current, [id]: value }))} fixAnswers={fixAnswers} onFix={(id, value) => setFixAnswers((current) => ({ ...current, [id]: value }))} problemAnswers={problemAnswers} onProblem={(id, value) => setProblemAnswers((current) => ({ ...current, [id]: value }))} sequence={sequence} onSequence={setSequence} metrics={metrics} onMetrics={setMetrics} readout={closureReadout} onReadout={setClosureReadout} />}
    {activeLesson === "hypercare-exit-gate" && <ExitGate artifacts={artifacts} onToggle={(item) => toggle(setArtifacts, item)} summary={summary} onSummary={setSummary} preview={preview} answers={knowledgeAnswers} onAnswer={(id, value) => setKnowledgeAnswers((current) => ({ ...current, [id]: value }))} />}
  </LearningModuleFrame>;
}

function Lead({ eyebrow, title, icon = <LifeBuoy size={23} /> }: { eyebrow: string; title: string; icon?: ReactNode }) { return <div className={base.lessonLead}>{icon}<div><small>{eyebrow}</small><strong>{title}</strong></div></div>; }

function DecisionTable({ items, answers, onAnswer }: { items: readonly { id: string; issue: string; correct: string; options: readonly string[] }[]; answers: Answers; onAnswer: (id: string, value: string) => void }) {
  return <div className={design.mappingTable}>{items.map((item) => <div className={design.tableRow} key={item.id}><div><strong>{item.id}</strong><small>{item.issue}</small></div><select aria-label={`${item.id} controlled response`} value={answers[item.id] ?? ""} onChange={(event) => onAnswer(item.id, event.target.value)}><option value="">Select controlled response</option>{item.options.map((option, index) => <option key={`${item.id}-option-${index}`} value={option}>{option}</option>)}</select></div>)}</div>;
}

function Foundations({ selected, onToggle }: { selected: string[]; onToggle: (item: string) => void }) {
  return <><Lead eyebrow="Stabilization with a defined exit" title="Hypercare is temporary enhanced support that protects business operation while the live solution, support model, and ownership become demonstrably stable." /><p className={base.bodyCopy}>It begins from the known production state accepted at Go-Live. The team does not simply watch tickets: it protects the planning calendar, restores service, verifies data and controls, removes recurrence, transfers knowledge, and measures whether BAU can own the service safely.</p><div className={cutover.boundaryGrid}>{[["Input", "Accepted live baseline", "Release, scope, incidents, conditions, workarounds, monitoring, recovery, and owners"], ["Control", "Evidence-led stabilization", "Triage, decisions, restoration, controlled change, reconciliation, trends, and knowledge"], ["Output", "BAU-owned service", "Stable thresholds, accepted residual risk, capable support, signed exit, and improvement backlog"]].map(([small, strong, body]) => <article key={small}><small>{small}</small><strong>{strong}</strong><span>{body}</span></article>)}</div><h3 className={base.sectionTitle}>Confirm Hypercare entry controls</h3><div className={design.selectionGrid}>{hypercareEntryControls.map((item) => <button className={selected.includes(item) ? design.selectedCard : ""} key={item} onClick={() => onToggle(item)} type="button">{selected.includes(item) ? <CheckCircle2 size={17} /> : <span />}<strong>{item}</strong></button>)}</div><div className={cutover.downloadGrid}><a download href={`${packPath}phase-26-hypercare-practice-pack.zip`}><Download size={18} /><span><strong>Complete practice pack</strong><small>All Phase 26 templates</small></span></a><a download href={`${packPath}hypercare-command-center.csv`}><Download size={18} /><span><strong>Command center</strong><small>Daily service-health decisions</small></span></a><a download href={`${packPath}incident-problem-register.csv`}><Download size={18} /><span><strong>Incident and problem register</strong><small>Trace restoration to recurrence</small></span></a><a download href={`${packPath}monitoring-control.csv`}><Download size={18} /><span><strong>Monitoring control</strong><small>Technical and business signals</small></span></a><a download href={`${packPath}bau-handoff.csv`}><Download size={18} /><span><strong>BAU handoff</strong><small>Capability and exit evidence</small></span></a></div><div className={styles.guidanceNote}><Activity size={20} /><div><strong>No mandatory Oracle screenshots in this phase</strong><span>Hypercare is taught through operational evidence. Real job details, logs, forms, and dashboards should be attached to incident or control records when they prove a case; decorative screenshots would not improve the learning outcome.</span></div></div></>;
}

function CommandCenter({ answers, onAnswer }: { answers: Answers; onAnswer: (id: string, value: string) => void }) {
  return <><Lead eyebrow="One service-health truth" title="Run a short, decision-oriented cadence that follows business risk and becomes lighter only as evidence demonstrates stability." icon={<Users size={23} />} /><div className={styles.cadenceGrid}>{hypercareCadence.map((item) => <article key={item.id}><small>{item.id}</small><strong>{item.title}</strong><span>{item.cadence}</span><p>{item.focus}</p></article>)}</div><div className={styles.guidanceNote}><AlertTriangle size={20} /><div><strong>The calendar is illustrative</strong><span>Day 1/7/14/30 is a useful teaching model, not a fixed Oracle requirement. An implementation must use the contracted duration, planning calendar, risk profile, and approved exit criteria.</span></div></div><DecisionTable items={commandCenterCases} answers={answers} onAnswer={onAnswer} /></>;
}

function Triage({ answers, onAnswer }: { answers: Answers; onAnswer: (id: string, value: string) => void }) {
  return <><Lead eyebrow="Restore the right thing through the right route" title="Triage validates the symptom and business impact before assigning work type, severity, SLA, containment, communication, and ownership." icon={<ClipboardCheck size={23} />} /><div className={styles.typeGrid}>{[["Incident", "An unplanned interruption or reduction in service", "Restore and contain"], ["Service request", "Guidance, access, information, or a standard supported request", "Fulfil consistently"], ["Problem", "The cause or potential cause of one or more incidents", "Remove recurrence"], ["Change", "A controlled modification to a production service or baseline", "Assess, approve, test, deploy"]].map(([title, body, goal]) => <article key={title}><strong>{title}</strong><span>{body}</span><small>{goal}</small></article>)}</div><div className={styles.processStrip}>{["Validate", "Classify", "Assess impact", "Prioritize", "Assign", "Contain", "Communicate", "Track"].map((item, index) => <span key={item}><b>{index + 1}</b>{item}</span>)}</div><DecisionTable items={triageCases} answers={answers} onAnswer={onAnswer} /></>;
}

function Monitoring({ answers, onAnswer }: { answers: Answers; onAnswer: (id: string, value: string) => void }) {
  const layers = [["Technical", "Availability, authentication, schedules, integration and calculation jobs, errors, runtime, capacity"], ["Process", "Task ownership, due times, approvals, dependencies, late steps, exception routing"], ["Business control", "Source-to-Plan1-to-ASO totals, precision, balances, POV, stale data, protected access"], ["Experience", "Response percentiles, concurrency, failed journeys, support demand, adoption, workaround use"], ["Governance", "Conditions, SLA, ageing, recurrence, change success, knowledge gaps, residual risk"]];
  return <><Lead eyebrow="Green jobs are not enough" title="Monitor whether the complete planning service produces timely, authorized, reconciled, usable, and supportable business outcomes." icon={<Gauge size={23} />} /><div className={styles.monitorGrid}>{layers.map(([title, body], index) => <article key={title}><span>{index + 1}</span><div><strong>{title}</strong><p>{body}</p></div></article>)}</div><DecisionTable items={monitoringCases} answers={answers} onAnswer={onAnswer} /></>;
}

function FixControl({ answers, onAnswer }: { answers: Answers; onAnswer: (id: string, value: string) => void }) {
  return <><Lead eyebrow="Restore without creating the next incident" title="Urgency can shorten an approved emergency-change path; it does not remove impact analysis, authority, version control, testing, rollback, reconciliation, or evidence." icon={<Wrench size={23} />} /><div className={styles.processStrip}>{["Contain", "Assess impact", "Select change path", "Build and review", "Focused test", "Regression", "Deploy", "Reconcile", "Business validate", "Monitor"].map((item, index) => <span key={item}><b>{index + 1}</b>{item}</span>)}</div><div className={styles.guidanceNote}><ShieldCheck size={20} /><div><strong>Workaround is not permanent closure</strong><span>A workaround restores an acceptable service temporarily. Keep its scope, risk, control, owner, expiry, communication, and permanent-fix or accepted-known-error route visible.</span></div></div><DecisionTable items={fixGovernanceCases} answers={answers} onAnswer={onAnswer} /></>;
}

function ProblemManagement({ answers, onAnswer }: { answers: Answers; onAnswer: (id: string, value: string) => void }) {
  return <><Lead eyebrow="From repeated restoration to prevention" title="Problem management uses linked incident evidence to distinguish symptom, contributing factor, hypothesis, root cause, known error, and preventive action." icon={<Activity size={23} />} /><div className={styles.problemChain}>{[["1", "Trend", "Detect repeat pattern or common dependency"], ["2", "Investigate", "Build timeline and test evidence-backed hypotheses"], ["3", "Control", "Document known error and safe workaround"], ["4", "Prevent", "Implement permanent action and regression"], ["5", "Verify", "Measure that recurrence and impact stop"]].map(([id, title, body]) => <article key={id}><span>{id}</span><strong>{title}</strong><small>{body}</small></article>)}</div><DecisionTable items={problemCases} answers={answers} onAnswer={onAnswer} /></>;
}

function StabilityLab({ metrics, onMetrics }: { metrics: StabilityMetrics; onMetrics: (value: StabilityMetrics) => void }) {
  const labels: Record<keyof StabilityMetrics, string> = { critical: "Open critical incidents", high: "Open high incidents", overdue: "Overdue SLA items", unreconciled: "Unreconciled controls", recurring: "Recurring failures in window", failedJobs: "Unresolved failed jobs", conditions: "Unowned conditions", knowledgeGaps: "Undemonstrated BAU procedures" };
  const ready = Object.values(metrics).every((value) => value === 0);
  return <section className={`${styles.stabilityLab} ${ready ? styles.ready : styles.notReady}`}><header><div><small>Interactive exit-threshold lab</small><strong>{ready ? "Threshold state supports formal exit review" : "Hypercare exit is not yet supportable"}</strong></div><span>{ready ? "Ready for decision" : "Thresholds breached"}</span></header><div className={styles.metricGrid}>{(Object.keys(labels) as (keyof StabilityMetrics)[]).map((key) => <label key={key}>{labels[key]}<input aria-label={labels[key]} min="0" type="number" value={metrics[key]} onChange={(event) => onMetrics({ ...metrics, [key]: Math.max(0, Number(event.target.value) || 0) })} /></label>)}</div><div className={styles.labActions}><button onClick={() => onMetrics(stableMetrics)} type="button"><Check size={15} /> Apply evidence-backed stable state</button><button onClick={() => onMetrics(initialMetrics)} type="button"><RefreshCw size={15} /> Reset simulation</button></div><p>This lab uses zero unresolved threshold breaches for clarity. A real project may permit approved low-severity residual items, but only through explicit criteria, owners, controls, targets, monitoring, and BAU acceptance.</p></section>;
}

function ExitReadiness({ answers, onAnswer, metrics, onMetrics }: { answers: Answers; onAnswer: (id: string, value: string) => void; metrics: StabilityMetrics; onMetrics: (value: StabilityMetrics) => void }) {
  return <><Lead eyebrow="Evidence, capability, and ownership" title="Hypercare exits when agreed stability criteria are met and BAU demonstrates it can operate, recover, communicate, improve, and govern the service." icon={<FileCheck2 size={23} />} /><StabilityLab metrics={metrics} onMetrics={onMetrics} /><DecisionTable items={exitReadinessCases} answers={answers} onAnswer={onAnswer} /></>;
}

function OperatingSequence({ sequence, onSequence }: { sequence: string[]; onSequence: (value: string[]) => void }) {
  return <><div className={cutover.sequence}>{hypercareOperatingSequence.map((item) => <button className={sequence.includes(item) ? cutover.sequenceDone : ""} disabled={sequence.includes(item)} key={item} onClick={() => onSequence([...sequence, item])} type="button"><span>{sequence.includes(item) ? <Check size={14} /> : sequence.length + 1}</span><strong>{item}</strong></button>)}</div><button className={cutover.resetButton} onClick={() => onSequence([])} type="button"><RefreshCw size={14} /> Reset sequence</button></>;
}

type HomeworkProps = { active: HomeworkId; onActive: (id: HomeworkId) => void; status: Record<HomeworkId, boolean>; commandAnswers: Answers; onCommand: (id: string, value: string) => void; triageAnswers: Answers; onTriage: (id: string, value: string) => void; monitorAnswers: Answers; onMonitor: (id: string, value: string) => void; fixAnswers: Answers; onFix: (id: string, value: string) => void; problemAnswers: Answers; onProblem: (id: string, value: string) => void; sequence: string[]; onSequence: (value: string[]) => void; metrics: StabilityMetrics; onMetrics: (value: StabilityMetrics) => void; readout: string; onReadout: (value: string) => void };

function Homework(props: HomeworkProps) {
  const mission = hypercareHomeworkMissions.find((item) => item.id === props.active) ?? hypercareHomeworkMissions[0];
  const completed = hypercareHomeworkMissions.filter((item) => props.status[item.id]).length;
  return <><Lead eyebrow="Applied stabilization challenge" title="Operate the ApexPlan support model from live signal through restoration, recurrence removal, stable thresholds, and an accepted BAU handoff." icon={<BookOpenCheck size={23} />} /><div className={base.homeworkMissionGrid}>{hypercareHomeworkMissions.map((item, index) => <button className={`${item.id === props.active ? base.homeworkMissionActive : ""} ${props.status[item.id] ? base.homeworkMissionDone : ""}`} key={item.id} onClick={() => props.onActive(item.id)} type="button"><span>{props.status[item.id] ? <Check size={14} /> : index + 1}</span><div><strong>{item.title}</strong><small>{item.description}</small></div></button>)}</div><div className={base.homeworkProgress}><div><span style={{ width: `${(completed / hypercareHomeworkMissions.length) * 100}%` }} /></div><strong>{completed} / {hypercareHomeworkMissions.length} missions ready</strong></div><section className={base.homeworkWorkspace}><header><div><small>Mission {hypercareHomeworkMissions.findIndex((item) => item.id === props.active) + 1}</small><h3>{mission.title}</h3></div><span>{props.status[props.active] ? "Ready" : "In progress"}</span></header><p className={base.homeworkPurpose}>{mission.description}</p>{props.active === "cadence" && <div className={cutover.homeworkBody}><DecisionTable items={commandCenterCases} answers={props.commandAnswers} onAnswer={props.onCommand} /></div>}{props.active === "triage" && <div className={cutover.homeworkBody}><DecisionTable items={triageCases} answers={props.triageAnswers} onAnswer={props.onTriage} /></div>}{props.active === "monitor" && <div className={cutover.homeworkBody}><DecisionTable items={monitoringCases} answers={props.monitorAnswers} onAnswer={props.onMonitor} /></div>}{props.active === "fix" && <div className={cutover.homeworkBody}><DecisionTable items={fixGovernanceCases} answers={props.fixAnswers} onAnswer={props.onFix} /><div className={styles.homeworkSpacer} /><DecisionTable items={problemCases} answers={props.problemAnswers} onAnswer={props.onProblem} /></div>}{props.active === "closure" && <div className={cutover.homeworkBody}><OperatingSequence sequence={props.sequence} onSequence={props.onSequence} /><StabilityLab metrics={props.metrics} onMetrics={props.onMetrics} /><label className={base.summaryField}>Hypercare exit and BAU handoff recommendation<textarea rows={7} value={props.readout} onChange={(event) => props.onReadout(event.target.value)} placeholder="State the release and period, stability window, incident and recurring-problem trend, jobs and reconciliations, performance and adoption, conditions, changes, known errors, knowledge demonstrations, residual risks, BAU owners, and exit or extension recommendation." /><small>{props.readout.trim().length} / 240 minimum</small></label></div>}</section></>;
}

function ExitGate({ artifacts, onToggle, summary, onSummary, preview, answers, onAnswer }: { artifacts: string[]; onToggle: (item: string) => void; summary: string; onSummary: (value: string) => void; preview: string; answers: Answers; onAnswer: (id: string, value: string) => void }) {
  return <><Lead eyebrow="Phase 26 exit gate" title="Close enhanced support only when stable service, controlled residual risk, demonstrated BAU capability, and accepted ownership are evidenced together." icon={<LifeBuoy size={23} />} /><div className={cutover.exitStatement}><ShieldCheck size={22} /><div><strong>Hypercare completion is not a calendar date or a low ticket count.</strong><span>It is an authorized decision that the planning service is stable enough for normal operations and that every remaining obligation has a capable, informed, and accountable BAU owner.</span></div></div><h3 className={base.sectionTitle}>Hypercare closure package</h3><div className={design.selectionGrid}>{hypercareArtifacts.map((item) => <button className={artifacts.includes(item) ? design.selectedCard : ""} key={item} onClick={() => onToggle(item)} type="button">{artifacts.includes(item) ? <CheckCircle2 size={17} /> : <span />}<strong>{item}</strong></button>)}</div><label className={base.summaryField}>Authorized Hypercare exit summary<textarea rows={6} value={summary} onChange={(event) => onSummary(event.target.value)} placeholder="Summarize the release and stability period, business service health, incidents and recurrence, controls and reconciliation, performance, conditions, changes, known errors, support capability, knowledge transfer, residual risks, owners, BAU acceptance, and final decision." /><small>{summary.trim().length} / 240 minimum</small></label><div className={base.discoveryPreview}><small>Closure statement preview</small><p>{preview}</p><div><FileCheck2 size={15} /> Stable service · capable BAU support · accepted residual ownership</div></div><h3 className={base.questionTitle}>Knowledge check</h3><div className={base.quizList}>{hypercareKnowledgeQuestions.map((question) => <fieldset key={question.id}><legend><span>{question.id.replace("K-", "")}</span>{question.question}</legend>{question.options.map((option, index) => <label key={`${question.id}-answer-${index}`}><input checked={answers[question.id] === option} name={question.id} onChange={() => onAnswer(question.id, option)} type="radio" />{option}</label>)}</fieldset>)}</div><div className={cutover.packNote}><BookOpenCheck size={20} /><div><strong>Practice pack</strong><span>Retain the completed command-center view, incident/problem register, monitoring controls, and BAU handoff as the learner&apos;s Phase 26 evidence and the Phase 27 continuous-improvement baseline.</span></div></div></>;
}
