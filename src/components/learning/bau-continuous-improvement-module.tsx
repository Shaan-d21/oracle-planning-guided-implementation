"use client";

import { Activity, BookOpenCheck, CalendarDays, Check, CheckCircle2, ClipboardCheck, Download, FileCheck2, Gauge, GitBranch, Lightbulb, RefreshCw, Settings2, ShieldCheck, TrendingUp } from "lucide-react";
import { useEffect, useMemo, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import {
  bauArtifacts,
  bauEntryControls,
  bauHomeworkMissions,
  bauKnowledgeQuestions,
  bauLessons,
  bauRhythm,
  continuousImprovementSequence,
  improvementCandidates,
  improvementCases,
  operatingRhythmCases,
  regressionKnowledgeCases,
  releaseCases,
  serviceHealthCases,
  valueAdoptionCases,
  type BauLessonId,
} from "@/content/bau-continuous-improvement-module";
import { hypercareLessons } from "@/content/hypercare-module";
import { readTrackProgress, writeTrackProgress } from "@/lib/learning-progress";
import base from "./discovery-module.module.css";
import design from "./application-dimension-design-module.module.css";
import cutover from "./cutover-module.module.css";
import hypercare from "./hypercare-module.module.css";
import styles from "./bau-continuous-improvement-module.module.css";
import { LearningModuleFrame, type ModuleFeedback } from "./learning-module-frame";

type Answers = Record<string, string>;
type HomeworkId = (typeof bauHomeworkMissions)[number]["id"];
const packPath = "/training/oracle-planning/phase-27/";

export function BauContinuousImprovementModule() {
  const [activeLesson, setActiveLesson] = useState<BauLessonId>("bau-foundations");
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<ModuleFeedback>(null);
  const [entryControls, setEntryControls] = useState<string[]>([]);
  const [rhythmAnswers, setRhythmAnswers] = useState<Answers>({});
  const [healthAnswers, setHealthAnswers] = useState<Answers>({});
  const [improvementAnswers, setImprovementAnswers] = useState<Answers>({});
  const [portfolio, setPortfolio] = useState<string[]>([]);
  const [releaseAnswers, setReleaseAnswers] = useState<Answers>({});
  const [regressionAnswers, setRegressionAnswers] = useState<Answers>({});
  const [valueAnswers, setValueAnswers] = useState<Answers>({});
  const [sequence, setSequence] = useState<string[]>([]);
  const [activeHomework, setActiveHomework] = useState<HomeworkId>("operate");
  const [roadmapReadout, setRoadmapReadout] = useState("");
  const [artifacts, setArtifacts] = useState<string[]>([]);
  const [summary, setSummary] = useState("");
  const [knowledgeAnswers, setKnowledgeAnswers] = useState<Answers>({});

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = readTrackProgress("implementation");
      setCompletedLessons(stored.completedLessons);
      const saved = bauLessons.find((lesson) => lesson.id === stored.activeLesson);
      if (saved) setActiveLesson(saved.id);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const prerequisiteComplete = hypercareLessons.every((lesson) => completedLessons.includes(lesson.id));
  const allCorrect = (items: readonly { id: string; correct: string }[], answers: Answers) => items.every((item) => answers[item.id] === item.correct);
  const correctPortfolio = improvementCandidates.every((item) => portfolio.includes(item.id) === item.correct);
  const sequenceReady = sequence.length === continuousImprovementSequence.length && sequence.every((item, index) => item === continuousImprovementSequence[index]);
  const knowledgeReady = bauKnowledgeQuestions.every((question) => knowledgeAnswers[question.id] === question.correct);
  const homeworkStatus: Record<HomeworkId, boolean> = {
    operate: allCorrect(operatingRhythmCases, rhythmAnswers),
    health: allCorrect(serviceHealthCases, healthAnswers),
    portfolio: allCorrect(improvementCases, improvementAnswers) && correctPortfolio,
    release: allCorrect(releaseCases, releaseAnswers) && allCorrect(regressionKnowledgeCases, regressionAnswers),
    value: allCorrect(valueAdoptionCases, valueAnswers) && sequenceReady && roadmapReadout.trim().length >= 240,
  };
  const preview = useMemo(() => artifacts.length === bauArtifacts.length && summary.trim().length >= 240
    ? `${summary.trim()} The BAU charter establishes durable service ownership, a controlled release and improvement model, measurable adoption and value, and an approved roadmap beyond implementation.`
    : "Complete all eight BAU artifacts and provide a program-completion summary of at least 240 characters.", [artifacts, summary]);

  function persist(nextCompleted: string[], lesson: BauLessonId) {
    writeTrackProgress("implementation", { completedLessons: nextCompleted, activeLesson: lesson, activeModuleId: "implementation-bau-continuous-improvement", lastVisited: new Date().toISOString() });
  }
  function goToLesson(id: BauLessonId) { setActiveLesson(id); setFeedback(null); persist(completedLessons, id); }
  function markComplete(message: string) {
    const next = completedLessons.includes(activeLesson) ? completedLessons : [...completedLessons, activeLesson];
    setCompletedLessons(next); persist(next, activeLesson); setFeedback({ tone: "success", message });
  }
  function toggle(setter: Dispatch<SetStateAction<string[]>>, item: string) { setter((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item]); }

  function validateLesson() {
    if (activeLesson === "bau-foundations") {
      if (entryControls.length !== bauEntryControls.length) return setFeedback({ tone: "error", message: "Confirm the Hypercare baseline, decision rights, service calendar, controlled knowledge, and measurable operating baseline." });
      return markComplete("BAU begins with explicit ownership, service and release calendars, controlled operational knowledge, accepted risk, and measurable service and value baselines.");
    }
    if (activeLesson === "bau-operating-rhythm") {
      if (!allCorrect(operatingRhythmCases, rhythmAnswers)) return setFeedback({ tone: "error", message: "Correct all four planning-calendar, reconciliation, knowledge dependency, and platform-maintenance decisions." });
      return markComplete("The planning service now operates through integrated daily, monthly, quarterly, and annual controls with named owners and dependency-aware calendars.");
    }
    if (activeLesson === "bau-service-health") {
      if (!allCorrect(serviceHealthCases, healthAnswers)) return setFeedback({ tone: "error", message: "Correct every service-health, trend, retry, and access-governance decision." });
      return markComplete("Service health now combines technical, planning-cycle, business-control, security, adoption, workaround, and trend evidence.");
    }
    if (activeLesson === "bau-improvement-intake") {
      if (!allCorrect(improvementCases, improvementAnswers) || !correctPortfolio) return setFeedback({ tone: "error", message: "Correct all four improvement-governance decisions and select only the three evidence-backed priority candidates." });
      return markComplete("The backlog now starts from defined problems and outcomes, exposes cross-model impact, and prioritizes defensibly using value, risk, urgency, effort, and dependency.");
    }
    if (activeLesson === "bau-release-governance") {
      if (!allCorrect(releaseCases, releaseAnswers)) return setFeedback({ tone: "error", message: "Correct all four dependency, non-functional, platform-update, and production-validation decisions." });
      return markComplete("BAU releases now use dependency-aware scope, versioned packages, risk-based testing, recovery, reconciliation, monitoring, and business authorization.");
    }
    if (activeLesson === "bau-regression-knowledge") {
      if (!allCorrect(regressionKnowledgeCases, regressionAnswers)) return setFeedback({ tone: "error", message: "Correct every traceability, test-pack maintenance, runbook quality, and knowledge-ownership decision." });
      return markComplete("Regression and operational knowledge remain executable, current, traceable, owned, demonstrated, and aligned to each production baseline.");
    }
    if (activeLesson === "bau-value-adoption") {
      if (!allCorrect(valueAdoptionCases, valueAnswers)) return setFeedback({ tone: "error", message: "Correct all four journey adoption, benefit attribution, override learning, and targeted enablement decisions." });
      return markComplete("Adoption and benefit claims now use governed behavior, baselines, comparators, attribution assumptions, owners, and measurable corrective action.");
    }
    if (activeLesson === "bau-homework") {
      if (!Object.values(homeworkStatus).every(Boolean)) return setFeedback({ tone: "error", message: "Complete all five BAU missions, the prioritized portfolio, ordered improvement lifecycle, and 240-character roadmap recommendation." });
      return markComplete("Applied BAU lab complete. The learner can operate, protect, improve, release, measure, and govern the ApexPlan service beyond the project.");
    }
    if (artifacts.length !== bauArtifacts.length || summary.trim().length < 240 || !knowledgeReady) return setFeedback({ tone: "error", message: "Select all eight operating artifacts, write a 240-character completion summary, and answer all five knowledge checks correctly." });
    markComplete("Phase 27 complete. ApexPlan has an accepted BAU operating model, controlled improvement lifecycle, measurable value framework, and funded ownership beyond implementation.");
  }

  return <LearningModuleFrame
    activeLessonId={activeLesson}
    completedLessons={completedLessons}
    description="Operate ApexPlan as a governed business service, protect every planning cycle and production release, prioritize improvements transparently, maintain regression and knowledge, and measure adoption and realized value."
    exitGate="Approve the BAU charter, service calendar, scorecard, backlog, release model, operational knowledge, adoption and benefits evidence, roadmap, and program-completion decision"
    exitGateIcon={<Settings2 size={18} />}
    feedback={feedback}
    lessons={bauLessons}
    onSelectLesson={(id) => goToLesson(id as BauLessonId)}
    onValidate={validateLesson}
    phase={27}
    prerequisite={{ complete: prerequisiteComplete, message: "Complete Phase 26 so BAU receives a stable production service, accepted residual ownership, proven support capability, and signed Hypercare closure.", href: "/learn/hypercare", linkLabel: "Open Phase 26" }}
    stage="Operate · Service and product improvement"
    title="BAU & Continuous Improvement"
    validateLabel={activeLesson === "bau-exit-gate" ? "Complete implementation journey" : undefined}
  >
    {activeLesson === "bau-foundations" && <Foundations selected={entryControls} onToggle={(item) => toggle(setEntryControls, item)} />}
    {activeLesson === "bau-operating-rhythm" && <OperatingRhythm answers={rhythmAnswers} onAnswer={(id, value) => setRhythmAnswers((current) => ({ ...current, [id]: value }))} />}
    {activeLesson === "bau-service-health" && <ServiceHealth answers={healthAnswers} onAnswer={(id, value) => setHealthAnswers((current) => ({ ...current, [id]: value }))} />}
    {activeLesson === "bau-improvement-intake" && <ImprovementIntake answers={improvementAnswers} onAnswer={(id, value) => setImprovementAnswers((current) => ({ ...current, [id]: value }))} selected={portfolio} onToggle={(item) => toggle(setPortfolio, item)} />}
    {activeLesson === "bau-release-governance" && <ReleaseGovernance answers={releaseAnswers} onAnswer={(id, value) => setReleaseAnswers((current) => ({ ...current, [id]: value }))} />}
    {activeLesson === "bau-regression-knowledge" && <RegressionKnowledge answers={regressionAnswers} onAnswer={(id, value) => setRegressionAnswers((current) => ({ ...current, [id]: value }))} />}
    {activeLesson === "bau-value-adoption" && <ValueAdoption answers={valueAnswers} onAnswer={(id, value) => setValueAnswers((current) => ({ ...current, [id]: value }))} />}
    {activeLesson === "bau-homework" && <Homework active={activeHomework} onActive={setActiveHomework} status={homeworkStatus} rhythmAnswers={rhythmAnswers} onRhythm={(id, value) => setRhythmAnswers((current) => ({ ...current, [id]: value }))} healthAnswers={healthAnswers} onHealth={(id, value) => setHealthAnswers((current) => ({ ...current, [id]: value }))} improvementAnswers={improvementAnswers} onImprovement={(id, value) => setImprovementAnswers((current) => ({ ...current, [id]: value }))} portfolio={portfolio} onPortfolio={(item) => toggle(setPortfolio, item)} releaseAnswers={releaseAnswers} onRelease={(id, value) => setReleaseAnswers((current) => ({ ...current, [id]: value }))} regressionAnswers={regressionAnswers} onRegression={(id, value) => setRegressionAnswers((current) => ({ ...current, [id]: value }))} valueAnswers={valueAnswers} onValue={(id, value) => setValueAnswers((current) => ({ ...current, [id]: value }))} sequence={sequence} onSequence={setSequence} readout={roadmapReadout} onReadout={setRoadmapReadout} />}
    {activeLesson === "bau-exit-gate" && <ExitGate artifacts={artifacts} onToggle={(item) => toggle(setArtifacts, item)} summary={summary} onSummary={setSummary} preview={preview} answers={knowledgeAnswers} onAnswer={(id, value) => setKnowledgeAnswers((current) => ({ ...current, [id]: value }))} />}
  </LearningModuleFrame>;
}

function Lead({ eyebrow, title, icon = <Settings2 size={23} /> }: { eyebrow: string; title: string; icon?: ReactNode }) { return <div className={base.lessonLead}>{icon}<div><small>{eyebrow}</small><strong>{title}</strong></div></div>; }

function DecisionTable({ items, answers, onAnswer }: { items: readonly { id: string; issue: string; correct: string; options: readonly string[] }[]; answers: Answers; onAnswer: (id: string, value: string) => void }) {
  return <div className={design.mappingTable}>{items.map((item) => <div className={design.tableRow} key={item.id}><div><strong>{item.id}</strong><small>{item.issue}</small></div><select aria-label={`${item.id} controlled response`} value={answers[item.id] ?? ""} onChange={(event) => onAnswer(item.id, event.target.value)}><option value="">Select controlled response</option>{item.options.map((option, index) => <option key={`${item.id}-option-${index}`} value={option}>{option}</option>)}</select></div>)}</div>;
}

function Foundations({ selected, onToggle }: { selected: string[]; onToggle: (item: string) => void }) {
  return <><Lead eyebrow="A product and service—not a finished project" title="BAU protects the live planning service while continuous improvement changes it through transparent value, risk, architecture, release, adoption, and benefit governance." /><p className={base.bodyCopy}>Project closure transfers accountability; it does not freeze the application. Business and technology owners must operate each planning cycle, maintain controls and knowledge, respond to platform and business change, prioritize investments, and prove that improvements deliver sustainable outcomes.</p><div className={cutover.boundaryGrid}>{[["Operate", "Reliable planning service", "Calendar, support, jobs, controls, security, performance, recovery, and ownership"], ["Improve", "Governed product roadmap", "Evidence-led intake, prioritization, design, release, adoption, and benefit measurement"], ["Sustain", "Durable organizational capability", "Current knowledge, regression, funding, decision rights, backups, and learning loop"]].map(([small, strong, body]) => <article key={small}><small>{small}</small><strong>{strong}</strong><span>{body}</span></article>)}</div><h3 className={base.sectionTitle}>Confirm BAU entry controls</h3><div className={design.selectionGrid}>{bauEntryControls.map((item) => <button className={selected.includes(item) ? design.selectedCard : ""} key={item} onClick={() => onToggle(item)} type="button">{selected.includes(item) ? <CheckCircle2 size={17} /> : <span />}<strong>{item}</strong></button>)}</div><div className={cutover.downloadGrid}><a download href={`${packPath}phase-27-bau-continuous-improvement-practice-pack.zip`}><Download size={18} /><span><strong>Complete practice pack</strong><small>All Phase 27 templates</small></span></a><a download href={`${packPath}bau-service-charter.csv`}><Download size={18} /><span><strong>BAU service charter</strong><small>Scope and decision rights</small></span></a><a download href={`${packPath}service-health-scorecard.csv`}><Download size={18} /><span><strong>Service-health scorecard</strong><small>Controls and outcomes</small></span></a><a download href={`${packPath}improvement-backlog.csv`}><Download size={18} /><span><strong>Improvement backlog</strong><small>Value and prioritization</small></span></a><a download href={`${packPath}benefits-roadmap.csv`}><Download size={18} /><span><strong>Benefits roadmap</strong><small>Adoption and value</small></span></a></div><div className={hypercare.guidanceNote}><Activity size={20} /><div><strong>No mandatory Oracle screenshots in this phase</strong><span>BAU decisions rely on owned calendars, scorecards, controls, backlogs, release evidence, regression, knowledge, and benefits records. Attach Oracle screens only when they prove a specific production control, incident, release, adoption, or value claim.</span></div></div></>;
}

function OperatingRhythm({ answers, onAnswer }: { answers: Answers; onAnswer: (id: string, value: string) => void }) {
  return <><Lead eyebrow="One integrated operating calendar" title="Connect technical operation to the business planning rhythm so every cutoff, dependency, control, approval, maintenance window, and exception has an owner." icon={<CalendarDays size={23} />} /><div className={styles.rhythmGrid}>{bauRhythm.map((item) => <article key={item.id}><small>{item.id}</small><strong>{item.title}</strong><p>{item.focus}</p></article>)}</div><div className={styles.cycleFlow}>{["Source cutoff", "Load and validate", "Calculate", "Plan and approve", "Reconcile", "Publish and report", "Close", "Retrospective"].map((item, index) => <span key={item}><b>{index + 1}</b>{item}</span>)}</div><DecisionTable items={operatingRhythmCases} answers={answers} onAnswer={onAnswer} /></>;
}

function ServiceHealth({ answers, onAnswer }: { answers: Answers; onAnswer: (id: string, value: string) => void }) {
  const dimensions = [["Reliability", "Availability, successful jobs, incidents, recurrence, recovery, backup"], ["Business control", "Data quality, reconciliation, security, workflow, approvals, audit"], ["Cycle outcome", "On-time milestones, exceptions, decision readiness, publish and reporting"], ["Experience", "Performance, adoption, workarounds, support demand, user journey success"], ["Sustainability", "Knowledge, owner capacity, technical debt, cost, vendor and platform readiness"]];
  return <><Lead eyebrow="Measure the complete service" title="A healthy service produces correct, timely, controlled, usable, supportable, and decision-ready planning outcomes—not merely successful jobs." icon={<Gauge size={23} />} /><div className={styles.healthGrid}>{dimensions.map(([title, body], index) => <article key={title}><span>{index + 1}</span><div><strong>{title}</strong><p>{body}</p></div></article>)}</div><DecisionTable items={serviceHealthCases} answers={answers} onAnswer={onAnswer} /></>;
}

function PortfolioLab({ selected, onToggle }: { selected: string[]; onToggle: (item: string) => void }) {
  return <section className={styles.portfolioLab}><header><div><small>Interactive prioritization lab</small><strong>Select the three candidates that deserve immediate governed discovery or delivery.</strong></div><span>{selected.length} selected</span></header><div className={styles.portfolioGrid}>{improvementCandidates.map((item) => <button className={selected.includes(item.id) ? styles.portfolioSelected : ""} key={item.id} onClick={() => onToggle(item.id)} type="button"><div><span>{item.id}</span>{selected.includes(item.id) ? <CheckCircle2 size={17} /> : null}</div><strong>{item.title}</strong><dl><div><dt>Value</dt><dd>{item.value}/5</dd></div><div><dt>Risk</dt><dd>{item.risk}/5</dd></div><div><dt>Urgency</dt><dd>{item.urgency}/5</dd></div><div><dt>Effort</dt><dd>{item.effort}/5</dd></div></dl></button>)}</div><p>Scores structure discussion; they do not replace architecture impact, mandatory obligations, funding, dependency, capacity, or accountable governance decisions.</p></section>;
}

function ImprovementIntake({ answers, onAnswer, selected, onToggle }: { answers: Answers; onAnswer: (id: string, value: string) => void; selected: string[]; onToggle: (item: string) => void }) {
  return <><Lead eyebrow="Problem and outcome before solution" title="A governed backlog distinguishes defects, mandatory obligations, technical debt, adoption needs, optimization, and new capability—then compares them transparently." icon={<Lightbulb size={23} />} /><div className={hypercare.processStrip}>{["Capture", "Clarify problem", "Define measure", "Assess impact", "Score", "Govern", "Fund or defer", "Trace"].map((item, index) => <span key={item}><b>{index + 1}</b>{item}</span>)}</div><DecisionTable items={improvementCases} answers={answers} onAnswer={onAnswer} /><PortfolioLab selected={selected} onToggle={onToggle} /></>;
}

function ReleaseGovernance({ answers, onAnswer }: { answers: Answers; onAnswer: (id: string, value: string) => void }) {
  return <><Lead eyebrow="Change the service without losing control" title="Each release connects approved value to an exact versioned scope, complete dependency path, test evidence, recovery, production validation, communication, and benefit owner." icon={<GitBranch size={23} />} /><div className={styles.releaseFlow}>{["Approve scope", "Design and trace", "Build and review", "Test and regress", "Authorize", "Deploy", "Validate and reconcile", "Monitor and measure"].map((item, index) => <article key={item}><span>{index + 1}</span><strong>{item}</strong></article>)}</div><DecisionTable items={releaseCases} answers={answers} onAnswer={onAnswer} /></>;
}

function RegressionKnowledge({ answers, onAnswer }: { answers: Answers; onAnswer: (id: string, value: string) => void }) {
  return <><Lead eyebrow="Keep the service executable after every change" title="Regression protects connected behavior; operational knowledge makes that protection repeatable by people other than the original implementers." icon={<ClipboardCheck size={23} />} /><div className={styles.knowledgeGrid}>{[["Trace", "Requirement → design → build → test → control → owner"], ["Curate", "Keep risk-based positive, negative, repeatability, performance, security, and reconciliation coverage current"], ["Operate", "Runbooks state prerequisites, action, success, failure, evidence, recovery, and escalation"], ["Demonstrate", "Primary and backup operators prove procedures rather than acknowledge receipt"]].map(([title, body]) => <article key={title}><strong>{title}</strong><span>{body}</span></article>)}</div><DecisionTable items={regressionKnowledgeCases} answers={answers} onAnswer={onAnswer} /></>;
}

function ValueAdoption({ answers, onAnswer }: { answers: Answers; onAnswer: (id: string, value: string) => void }) {
  return <><Lead eyebrow="Measure behavior and business outcome" title="Adoption is governed use of the intended decision journey; realized value is an evidenced movement from an agreed baseline with honest attribution." icon={<TrendingUp size={23} />} /><div className={styles.valueChain}>{[["Behavior", "Who completes which governed journey, with what workarounds and exceptions?"], ["Outcome", "Did cycle time, accuracy, inventory, capacity, margin, control, or decision quality change?"], ["Attribution", "What else influenced the movement and how confident is the claim?"], ["Action", "Sustain, redesign, retrain, correct data, change policy, or reprioritize the roadmap."]].map(([title, body], index) => <article key={title}><span>{index + 1}</span><strong>{title}</strong><p>{body}</p></article>)}</div><DecisionTable items={valueAdoptionCases} answers={answers} onAnswer={onAnswer} /></>;
}

function ImprovementSequence({ sequence, onSequence }: { sequence: string[]; onSequence: (value: string[]) => void }) {
  return <><div className={cutover.sequence}>{continuousImprovementSequence.map((item) => <button className={sequence.includes(item) ? cutover.sequenceDone : ""} disabled={sequence.includes(item)} key={item} onClick={() => onSequence([...sequence, item])} type="button"><span>{sequence.includes(item) ? <Check size={14} /> : sequence.length + 1}</span><strong>{item}</strong></button>)}</div><button className={cutover.resetButton} onClick={() => onSequence([])} type="button"><RefreshCw size={14} /> Reset sequence</button></>;
}

type HomeworkProps = { active: HomeworkId; onActive: (id: HomeworkId) => void; status: Record<HomeworkId, boolean>; rhythmAnswers: Answers; onRhythm: (id: string, value: string) => void; healthAnswers: Answers; onHealth: (id: string, value: string) => void; improvementAnswers: Answers; onImprovement: (id: string, value: string) => void; portfolio: string[]; onPortfolio: (item: string) => void; releaseAnswers: Answers; onRelease: (id: string, value: string) => void; regressionAnswers: Answers; onRegression: (id: string, value: string) => void; valueAnswers: Answers; onValue: (id: string, value: string) => void; sequence: string[]; onSequence: (value: string[]) => void; readout: string; onReadout: (value: string) => void };

function Homework(props: HomeworkProps) {
  const mission = bauHomeworkMissions.find((item) => item.id === props.active) ?? bauHomeworkMissions[0];
  const completed = bauHomeworkMissions.filter((item) => props.status[item.id]).length;
  return <><Lead eyebrow="Applied BAU challenge" title="Operate one planning period, govern its service evidence, choose the next improvements, protect a release, and close the value-learning loop." icon={<BookOpenCheck size={23} />} /><div className={base.homeworkMissionGrid}>{bauHomeworkMissions.map((item, index) => <button className={`${item.id === props.active ? base.homeworkMissionActive : ""} ${props.status[item.id] ? base.homeworkMissionDone : ""}`} key={item.id} onClick={() => props.onActive(item.id)} type="button"><span>{props.status[item.id] ? <Check size={14} /> : index + 1}</span><div><strong>{item.title}</strong><small>{item.description}</small></div></button>)}</div><div className={base.homeworkProgress}><div><span style={{ width: `${(completed / bauHomeworkMissions.length) * 100}%` }} /></div><strong>{completed} / {bauHomeworkMissions.length} missions ready</strong></div><section className={base.homeworkWorkspace}><header><div><small>Mission {bauHomeworkMissions.findIndex((item) => item.id === props.active) + 1}</small><h3>{mission.title}</h3></div><span>{props.status[props.active] ? "Ready" : "In progress"}</span></header><p className={base.homeworkPurpose}>{mission.description}</p>{props.active === "operate" && <div className={cutover.homeworkBody}><DecisionTable items={operatingRhythmCases} answers={props.rhythmAnswers} onAnswer={props.onRhythm} /></div>}{props.active === "health" && <div className={cutover.homeworkBody}><DecisionTable items={serviceHealthCases} answers={props.healthAnswers} onAnswer={props.onHealth} /></div>}{props.active === "portfolio" && <div className={cutover.homeworkBody}><DecisionTable items={improvementCases} answers={props.improvementAnswers} onAnswer={props.onImprovement} /><PortfolioLab selected={props.portfolio} onToggle={props.onPortfolio} /></div>}{props.active === "release" && <div className={cutover.homeworkBody}><DecisionTable items={releaseCases} answers={props.releaseAnswers} onAnswer={props.onRelease} /><div className={styles.homeworkSpacer} /><DecisionTable items={regressionKnowledgeCases} answers={props.regressionAnswers} onAnswer={props.onRegression} /></div>}{props.active === "value" && <div className={cutover.homeworkBody}><DecisionTable items={valueAdoptionCases} answers={props.valueAnswers} onAnswer={props.onValue} /><div className={styles.homeworkSpacer} /><ImprovementSequence sequence={props.sequence} onSequence={props.onSequence} /><label className={base.summaryField}>Quarterly BAU and improvement roadmap recommendation<textarea rows={7} value={props.readout} onChange={(event) => props.onReadout(event.target.value)} placeholder="State the operating period, planning-cycle and service health, controls, incidents and workarounds, adoption behavior, realized benefits, residual risks, prioritized changes, release and regression plan, owners, funding, next measures, and governance recommendation." /><small>{props.readout.trim().length} / 240 minimum</small></label></div>}</section></>;
}

function ExitGate({ artifacts, onToggle, summary, onSummary, preview, answers, onAnswer }: { artifacts: string[]; onToggle: (item: string) => void; summary: string; onSummary: (value: string) => void; preview: string; answers: Answers; onAnswer: (id: string, value: string) => void }) {
  return <><Lead eyebrow="Phase 27 and program completion gate" title="Complete the implementation journey only when the organization can operate, control, change, test, release, support, adopt, measure, fund, and improve ApexPlan through accountable BAU ownership." icon={<Settings2 size={23} />} /><div className={cutover.exitStatement}><ShieldCheck size={22} /><div><strong>Project closure is not product abandonment.</strong><span>The final gate confirms a durable service and product operating model, accepted residual obligations, capable owners and backups, controlled change, measurable value, and a funded next roadmap.</span></div></div><h3 className={base.sectionTitle}>BAU and continuous-improvement package</h3><div className={design.selectionGrid}>{bauArtifacts.map((item) => <button className={artifacts.includes(item) ? design.selectedCard : ""} key={item} onClick={() => onToggle(item)} type="button">{artifacts.includes(item) ? <CheckCircle2 size={17} /> : <span />}<strong>{item}</strong></button>)}</div><label className={base.summaryField}>Authorized program-completion summary<textarea rows={6} value={summary} onChange={(event) => onSummary(event.target.value)} placeholder="Summarize the owned service scope and calendar, scorecard, controls, support and recovery, backlog governance, release and regression model, knowledge capability, adoption and value evidence, residual risks, funding, roadmap, business and technology acceptance, and completion decision." /><small>{summary.trim().length} / 240 minimum</small></label><div className={base.discoveryPreview}><small>Operating charter preview</small><p>{preview}</p><div><FileCheck2 size={15} /> Owned service · governed roadmap · measurable value · durable capability</div></div><h3 className={base.questionTitle}>Knowledge check</h3><div className={base.quizList}>{bauKnowledgeQuestions.map((question) => <fieldset key={question.id}><legend><span>{question.id.replace("K-", "")}</span>{question.question}</legend>{question.options.map((option, index) => <label key={`${question.id}-answer-${index}`}><input checked={answers[question.id] === option} name={question.id} onChange={() => onAnswer(question.id, option)} type="radio" />{option}</label>)}</fieldset>)}</div><div className={cutover.packNote}><BookOpenCheck size={20} /><div><strong>Capstone evidence</strong><span>Retain the completed service charter, scorecard, improvement backlog, and benefits roadmap as proof that the learner can sustain the implementation after project closure—not only configure the application.</span></div></div></>;
}
