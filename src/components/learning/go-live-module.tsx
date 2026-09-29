"use client";

import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BookOpenCheck,
  Camera,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Download,
  FileCheck2,
  Gauge,
  LifeBuoy,
  PlayCircle,
  RefreshCw,
  Rocket,
  ShieldCheck,
  Users,
  Workflow,
} from "lucide-react";
import { useEffect, useMemo, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { goNoGoLessons } from "@/content/go-no-go-module";
import {
  automationCases,
  firstCycleCases,
  goLiveActivationSequence,
  goLiveArtifacts,
  goLiveEntryControls,
  goLiveHomeworkMissions,
  goLiveIncidentCases,
  goLiveKnowledgeQuestions,
  goLiveLessons,
  goLiveScreenshots,
  hypercareHandoffControls,
  productionAccessCases,
  productionReconciliationCases,
  type GoLiveLessonId,
} from "@/content/go-live-module";
import { readTrackProgress, writeTrackProgress } from "@/lib/learning-progress";
import base from "./discovery-module.module.css";
import design from "./application-dimension-design-module.module.css";
import cutover from "./cutover-module.module.css";
import sales from "./sales-planning-build-module.module.css";
import styles from "./go-live-module.module.css";
import { LearningModuleFrame, type ModuleFeedback } from "./learning-module-frame";
import { OracleScreenshot } from "./oracle-screenshot";

type Answers = Record<string, string>;
type HomeworkId = (typeof goLiveHomeworkMissions)[number]["id"];

const packPath = "/training/oracle-planning/phase-25/";

export function GoLiveModule() {
  const [activeLesson, setActiveLesson] = useState<GoLiveLessonId>("go-live-foundations");
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<ModuleFeedback>(null);
  const [entryControls, setEntryControls] = useState<string[]>([]);
  const [accessAnswers, setAccessAnswers] = useState<Answers>({});
  const [automationAnswers, setAutomationAnswers] = useState<Answers>({});
  const [cycleAnswers, setCycleAnswers] = useState<Answers>({});
  const [activationSequence, setActivationSequence] = useState<string[]>([]);
  const [reconciliationAnswers, setReconciliationAnswers] = useState<Answers>({});
  const [incidentAnswers, setIncidentAnswers] = useState<Answers>({});
  const [handoffControls, setHandoffControls] = useState<string[]>([]);
  const [activeHomework, setActiveHomework] = useState<HomeworkId>("access");
  const [handoffReadout, setHandoffReadout] = useState("");
  const [artifacts, setArtifacts] = useState<string[]>([]);
  const [summary, setSummary] = useState("");
  const [knowledgeAnswers, setKnowledgeAnswers] = useState<Answers>({});

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = readTrackProgress("implementation");
      setCompletedLessons(stored.completedLessons);
      const saved = goLiveLessons.find((lesson) => lesson.id === stored.activeLesson);
      if (saved) setActiveLesson(saved.id);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const prerequisiteComplete = goNoGoLessons.every((lesson) => completedLessons.includes(lesson.id));
  const allCorrect = (items: readonly { id: string; correct: string }[], answers: Answers) => items.every((item) => answers[item.id] === item.correct);
  const correctActivationSequence = activationSequence.length === goLiveActivationSequence.length && activationSequence.every((item, index) => item === goLiveActivationSequence[index]);
  const knowledgeReady = goLiveKnowledgeQuestions.every((question) => knowledgeAnswers[question.id] === question.correct);
  const homeworkStatus: Record<HomeworkId, boolean> = {
    access: allCorrect(productionAccessCases, accessAnswers),
    automation: allCorrect(automationCases, automationAnswers),
    cycle: allCorrect(firstCycleCases, cycleAnswers) && allCorrect(productionReconciliationCases, reconciliationAnswers),
    incident: allCorrect(goLiveIncidentCases, incidentAnswers),
    handoff: correctActivationSequence && handoffReadout.trim().length >= 240,
  };
  const exitPreview = useMemo(() => artifacts.length === goLiveArtifacts.length && summary.trim().length >= 240
    ? `${summary.trim()} The production validation pack identifies the authorized release, enabled scope, first-cycle results, full-precision reconciliations, incidents, conditions, monitoring, support ownership, and accepted Hypercare operating state.`
    : "Complete all eight production-validation artifacts and provide an authorized Go-Live summary of at least 240 characters.", [artifacts, summary]);

  function persist(nextCompleted: string[], lesson: GoLiveLessonId) {
    writeTrackProgress("implementation", { completedLessons: nextCompleted, activeLesson: lesson, activeModuleId: "implementation-go-live", lastVisited: new Date().toISOString() });
  }

  function goToLesson(id: GoLiveLessonId) {
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
    if (activeLesson === "go-live-foundations") {
      if (entryControls.length !== goLiveEntryControls.length) return setFeedback({ tone: "error", message: "Confirm all five authorization, scope, people, monitoring, and first-cycle entry controls." });
      return markComplete("Go-Live now begins from a signed activation decision, controlled waves, active recovery, named operators, and an approved first-cycle success model.");
    }
    if (activeLesson === "go-live-access") {
      if (!allCorrect(productionAccessCases, accessAnswers)) return setFeedback({ tone: "error", message: "Correct every production-identity, representative-access, activation-wave, and Smart View connection decision." });
      return markComplete("Production access is now opened through approved waves with verified identity, representative positive access, negative security, and controlled user tools.");
    }
    if (activeLesson === "go-live-automation") {
      if (!allCorrect(automationCases, automationAnswers)) return setFeedback({ tone: "error", message: "Correct every schedule dependency, integration evidence, ASO publish, and alert-ownership decision." });
      return markComplete("Integrations and schedules now activate in controlled waves with source identity, dependencies, result evidence, reconciliation, monitoring, and support ownership.");
    }
    if (activeLesson === "go-live-first-cycle") {
      if (!allCorrect(firstCycleCases, cycleAnswers) || !correctActivationSequence) return setFeedback({ tone: "error", message: "Correct all five first-cycle decisions and arrange the eight Go-Live activities in dependency order." });
      return markComplete("The first production cycle now controls POV, input, calculation, repeatability, workflow, open conditions, reconciliation, waves, and evidence handoff.");
    }
    if (activeLesson === "go-live-reconciliation") {
      if (!allCorrect(productionReconciliationCases, reconciliationAnswers)) return setFeedback({ tone: "error", message: "Correct every ASO publish, filter-context, Smart View security, and full-precision reconciliation decision." });
      return markComplete("Production outcomes now reconcile from source through Plan1, ApexPlan ASO, dashboards, and Smart View without hiding context, precision, or access failures.");
    }
    if (activeLesson === "go-live-incidents") {
      if (!allCorrect(goLiveIncidentCases, incidentAnswers)) return setFeedback({ tone: "error", message: "Correct every critical incident, supported workaround, cumulative trend, and emergency-change decision." });
      return markComplete("Go-Live incidents are now contained and governed without bypassing decision authority, recovery thresholds, controlled change, retest, reconciliation, or communication.");
    }
    if (activeLesson === "go-live-hypercare") {
      if (handoffControls.length !== hypercareHandoffControls.length) return setFeedback({ tone: "error", message: "Confirm all five release-inventory, issue-transfer, monitoring, governance, and acceptance controls." });
      return markComplete("Hypercare receives a complete production state, ownership history, monitoring model, daily cadence, escalation route, and explicit operational acceptance.");
    }
    if (activeLesson === "go-live-homework") {
      if (!Object.values(homeworkStatus).every(Boolean)) return setFeedback({ tone: "error", message: "Complete all five applied missions, including the ordered activation sequence and 240-character Hypercare handoff readout." });
      return markComplete("Applied first-cycle lab complete. Production identity, automation, business flow, reconciliation, incidents, conditions, and Hypercare ownership are controlled.");
    }
    if (artifacts.length !== goLiveArtifacts.length || summary.trim().length < 240 || !knowledgeReady) return setFeedback({ tone: "error", message: "Select all eight deliverables, provide a 240-character Go-Live summary, and answer all five knowledge checks correctly." });
    markComplete("Phase 25 exit gate passed. The known production state, first-cycle evidence, open conditions and incidents, monitoring, owners, and support model are ready for Phase 26 Hypercare.");
  }

  return (
    <LearningModuleFrame
      activeLessonId={activeLesson}
      completedLessons={completedLessons}
      description="Activate the authorized ApexPlan production scope in controlled waves, prove the first live planning cycle, reconcile every reporting path, contain incidents, and transfer a known operating state to Hypercare."
      exitGate="Approve the production identity, enabled scope, first-cycle execution, reconciliations, incidents, conditions, monitoring, communication, support ownership, and accepted Hypercare handoff"
      exitGateIcon={<Rocket size={18} />}
      feedback={feedback}
      lessons={goLiveLessons}
      onSelectLesson={(id) => goToLesson(id as GoLiveLessonId)}
      onValidate={validateLesson}
      phase={25}
      prerequisite={{ complete: prerequisiteComplete, message: "Complete Phase 24 so Go-Live acts only on a signed decision for the exact release, conditions, activation scope, recovery state, and first checkpoint.", href: "/learn/go-no-go", linkLabel: "Open Phase 24" }}
      stage="Deploy · Production activation"
      title="Go-Live"
      validateLabel={activeLesson === "go-live-exit-gate" ? "Approve Go-Live exit" : undefined}
    >
      {activeLesson === "go-live-foundations" && <GoLiveFoundations selected={entryControls} onToggle={(item) => toggle(setEntryControls, item)} />}
      {activeLesson === "go-live-access" && <ProductionAccess answers={accessAnswers} onAnswer={(id, value) => setAccessAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "go-live-automation" && <AutomationActivation answers={automationAnswers} onAnswer={(id, value) => setAutomationAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "go-live-first-cycle" && <FirstCycle answers={cycleAnswers} onAnswer={(id, value) => setCycleAnswers((current) => ({ ...current, [id]: value }))} sequence={activationSequence} onSequence={setActivationSequence} />}
      {activeLesson === "go-live-reconciliation" && <ProductionReconciliation answers={reconciliationAnswers} onAnswer={(id, value) => setReconciliationAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "go-live-incidents" && <IncidentControl answers={incidentAnswers} onAnswer={(id, value) => setIncidentAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "go-live-hypercare" && <HypercareHandoff selected={handoffControls} onToggle={(item) => toggle(setHandoffControls, item)} />}
      {activeLesson === "go-live-homework" && <GoLiveHomework active={activeHomework} onActive={setActiveHomework} status={homeworkStatus} accessAnswers={accessAnswers} onAccess={(id, value) => setAccessAnswers((current) => ({ ...current, [id]: value }))} automationAnswers={automationAnswers} onAutomation={(id, value) => setAutomationAnswers((current) => ({ ...current, [id]: value }))} cycleAnswers={cycleAnswers} onCycle={(id, value) => setCycleAnswers((current) => ({ ...current, [id]: value }))} reconciliationAnswers={reconciliationAnswers} onReconciliation={(id, value) => setReconciliationAnswers((current) => ({ ...current, [id]: value }))} incidentAnswers={incidentAnswers} onIncident={(id, value) => setIncidentAnswers((current) => ({ ...current, [id]: value }))} sequence={activationSequence} onSequence={setActivationSequence} readout={handoffReadout} onReadout={setHandoffReadout} />}
      {activeLesson === "go-live-exit-gate" && <GoLiveExit artifacts={artifacts} onToggle={(item) => toggle(setArtifacts, item)} summary={summary} onSummary={setSummary} preview={exitPreview} answers={knowledgeAnswers} onAnswer={(id, value) => setKnowledgeAnswers((current) => ({ ...current, [id]: value }))} />}
    </LearningModuleFrame>
  );
}

function Lead({ eyebrow, title, icon = <Rocket size={23} /> }: { eyebrow: string; title: string; icon?: ReactNode }) {
  return <div className={base.lessonLead}>{icon}<div><small>{eyebrow}</small><strong>{title}</strong></div></div>;
}

function DecisionTable({ items, answers, onAnswer, placeholder = "Select controlled response" }: { items: readonly { id: string; issue: string; correct: string; options: readonly string[] }[]; answers: Answers; onAnswer: (id: string, value: string) => void; placeholder?: string }) {
  return <div className={design.mappingTable}>{items.map((item) => <div className={design.tableRow} key={item.id}><div><strong>{item.id}</strong><small>{item.issue}</small></div><select aria-label={`${item.id} decision`} value={answers[item.id] ?? ""} onChange={(event) => onAnswer(item.id, event.target.value)}><option value="">{placeholder}</option>{item.options.map((option, index) => <option key={`${item.id}-${index}`} value={option}>{option}</option>)}</select></div>)}</div>;
}

function ActivationSequence({ sequence, onSequence }: { sequence: string[]; onSequence: (value: string[]) => void }) {
  return <><div className={cutover.sequence}>{goLiveActivationSequence.map((item) => <button className={sequence.includes(item) ? cutover.sequenceDone : ""} disabled={sequence.includes(item)} key={item} onClick={() => onSequence([...sequence, item])} type="button"><span>{sequence.includes(item) ? <Check size={14} /> : <PlayCircle size={14} />}</span><strong>{item}</strong></button>)}</div><button className={cutover.resetButton} onClick={() => onSequence([])} type="button"><RefreshCw size={14} /> Reset sequence</button></>;
}

function GoLiveFoundations({ selected, onToggle }: { selected: string[]; onToggle: (item: string) => void }) {
  return <><Lead eyebrow="Controlled production opening" title="Go-Live activates only the authorized scope in observable waves and proves that real users can complete the first live cycle safely." /><p className={base.bodyCopy}>Phase 25 is not another migration and it is not the end of support. The focus shifts to controlled enablement, production behavior, real ownership, evidence-backed checkpoints, incident containment, and a known operating state that Hypercare can manage.</p><div className={cutover.boundaryGrid}>{[["Input", "Signed activation authority", "Exact release, conditions, scope, recovery state, owners, and first checkpoint"], ["Control", "Wave-based production operation", "Users, automation, business cycle, reconciliation, monitoring, incidents, and communications"], ["Output", "Known live operating state", "Validated first cycle, open ownership, support acceptance, and Hypercare handoff"]].map(([small, strong, body]) => <article key={small}><small>{small}</small><strong>{strong}</strong><span>{body}</span></article>)}</div><h3 className={base.sectionTitle}>Confirm Go-Live entry controls</h3><div className={design.selectionGrid}>{goLiveEntryControls.map((item) => <button className={selected.includes(item) ? design.selectedCard : ""} key={item} onClick={() => onToggle(item)} type="button">{selected.includes(item) ? <CheckCircle2 size={17} /> : <span />}<strong>{item}</strong></button>)}</div><div className={cutover.downloadGrid}><a download href={`${packPath}phase-25-go-live-practice-pack.zip`}><Download size={18} /><span><strong>Complete practice pack</strong><small>All Phase 25 templates</small></span></a><a download href={`${packPath}go-live-activation-runbook.csv`}><Download size={18} /><span><strong>Activation runbook</strong><small>Users and automation waves</small></span></a><a download href={`${packPath}first-cycle-control.csv`}><Download size={18} /><span><strong>First-cycle control</strong><small>Execution and reconciliation</small></span></a><a download href={`${packPath}incident-log.csv`}><Download size={18} /><span><strong>Incident log</strong><small>Containment and decisions</small></span></a><a download href={`${packPath}hypercare-handoff.csv`}><Download size={18} /><span><strong>Hypercare handoff</strong><small>Ownership and monitoring</small></span></a></div></>;
}

function ProductionAccess({ answers, onAnswer }: { answers: Answers; onAnswer: (id: string, value: string) => void }) {
  return <><Lead eyebrow="Identity before transaction" title="A user wave opens only after the team proves the production environment, intended role, authorized functions, denied functions, and supported connection path." icon={<Users size={23} />} /><div className={styles.waveGrid}>{[["Wave 0", "Support and operators", "Environment, monitoring, recovery, jobs, and evidence repository"], ["Wave 1", "Pilot planners and approvers", "Representative positive and negative business journeys"], ["Wave 2", "Approved user population", "Open only after pilot checkpoint and decision authority"], ["Wave 3", "Extended reporting consumers", "Enable after reporting reconciliation and support stability"]].map(([id, title, body]) => <article key={id}><small>{id}</small><strong>{title}</strong><span>{body}</span></article>)}</div><DecisionTable items={productionAccessCases} answers={answers} onAnswer={onAnswer} /><ScreenshotWalkthrough ids={["GL-UI-01", "GL-UI-02"]} /></>;
}

function AutomationActivation({ answers, onAnswer }: { answers: Answers; onAnswer: (id: string, value: string) => void }) {
  return <><Lead eyebrow="Dependencies before schedules" title="Automation is operational only when the approved dependency, source, execution, outcome, exception handling, alert, and support owner are proven together." icon={<Workflow size={23} />} /><div className={styles.activationFlow}>{["Confirm source cutoff", "Verify service account", "Enable one schedule", "Observe process", "Inspect rejects", "Reconcile totals", "Prove alert", "Authorize next wave"].map((item, index) => <article key={item}><span>{index + 1}</span><strong>{item}</strong></article>)}</div><DecisionTable items={automationCases} answers={answers} onAnswer={onAnswer} /><ScreenshotWalkthrough ids={["GL-UI-03"]} /></>;
}

function FirstCycle({ answers, onAnswer, sequence, onSequence }: { answers: Answers; onAnswer: (id: string, value: string) => void; sequence: string[]; onSequence: (value: string[]) => void }) {
  return <><Lead eyebrow="First live business proof" title="The first cycle must show that a real role can input, calculate, review, approve, report, recover, and receive support within the governed production calendar." icon={<Activity size={23} />} /><div className={styles.cycleStrip}>{["Production identity", "Pilot role", "Governed POV", "Input + validation", "Calculation", "Workflow", "Publish", "Reconcile", "Checkpoint"].map((item, index) => <span key={item}>{item}{index < 8 && <ArrowRight size={13} />}</span>)}</div><DecisionTable items={firstCycleCases} answers={answers} onAnswer={onAnswer} /><h3 className={base.sectionTitle}>Build the complete activation sequence</h3><ActivationSequence sequence={sequence} onSequence={onSequence} /><ScreenshotWalkthrough ids={["GL-UI-04", "GL-UI-05", "GL-UI-06"]} /></>;
}

function ProductionReconciliation({ answers, onAnswer }: { answers: Answers; onAnswer: (id: string, value: string) => void }) {
  return <><Lead eyebrow="One result across every channel" title="The first live cycle is accepted only when the same governed POV and full-precision business result agree from source through every production consumption path." icon={<Gauge size={23} />} /><div className={styles.reconciliationChain}>{["Approved source", "Plan1 load", "Plan1 calculation", "Approval state", "ApexPlan ASO publish", "Dashboard filters", "Smart View connection"].map((item, index) => <span key={item}>{item}{index < 6 && <ArrowRight size={13} />}</span>)}</div><DecisionTable items={productionReconciliationCases} answers={answers} onAnswer={onAnswer} /><ScreenshotWalkthrough ids={["GL-UI-07", "GL-UI-08", "GL-UI-09"]} /></>;
}

function IncidentControl({ answers, onAnswer }: { answers: Answers; onAnswer: (id: string, value: string) => void }) {
  return <><Lead eyebrow="Stability without improvisation" title="Go-Live incidents use production severity, containment, recovery, change, retest, reconciliation, communication, and decision controls." icon={<AlertTriangle size={23} />} /><div className={styles.incidentFlow}>{[["Detect", "Monitoring or user evidence"], ["Contain", "Protect data and downstream work"], ["Assess", "Impact, trend, threshold, recovery"], ["Decide", "Workaround, fix, wave hold, rollback"], ["Change", "Controlled emergency path if required"], ["Prove", "Retest, regression, reconcile"], ["Communicate", "Facts, action, owner, checkpoint"]].map(([title, body], index) => <article key={title}><span>{index + 1}</span><div><strong>{title}</strong><small>{body}</small></div></article>)}</div><DecisionTable items={goLiveIncidentCases} answers={answers} onAnswer={onAnswer} /><div className={cutover.referenceNote}><ShieldCheck size={20} /><div><strong>Rollback remains available until formally retired</strong><span>A signed Go decision does not remove recovery controls. Material data, security, availability, financial-control, or support-capacity failures can reopen the decision and trigger containment or rollback according to the approved threshold.</span></div></div></>;
}

function HypercareHandoff({ selected, onToggle }: { selected: string[]; onToggle: (item: string) => void }) {
  return <><Lead eyebrow="Move ownership without losing context" title="Hypercare receives a complete operating state and decision history—not a collection of unresolved tickets with the project team disappearing." icon={<LifeBuoy size={23} />} /><div className={styles.handoffModel}>{[["State", "Release, enabled scope, data, cycle, schedules, conditions"], ["Demand", "Incidents, user volume, job volume, support trend"], ["Control", "Monitoring, SLA, escalation, change, reconciliation"], ["Ownership", "Business, functional, technical, service, vendor"], ["Exit", "Stability period, thresholds, knowledge, backlog, BAU acceptance"]].map(([title, body]) => <article key={title}><strong>{title}</strong><span>{body}</span></article>)}</div><h3 className={base.sectionTitle}>Confirm the operational handoff</h3><div className={design.selectionGrid}>{hypercareHandoffControls.map((item) => <button className={selected.includes(item) ? design.selectedCard : ""} key={item} onClick={() => onToggle(item)} type="button">{selected.includes(item) ? <CheckCircle2 size={17} /> : <span />}<strong>{item}</strong></button>)}</div><div className={cutover.referenceNote}><ClipboardCheck size={20} /><div><strong>Handoff acceptance is two-sided</strong><span>The project team demonstrates the state and evidence; Hypercare owners confirm they can monitor, support, escalate, operate workarounds, execute runbooks, and identify when the decision must be reopened.</span></div></div></>;
}

function ScreenshotWalkthrough({ ids }: { ids: string[] }) {
  const steps = goLiveScreenshots.filter((step) => ids.includes(step.id));
  return <section className={sales.walkthrough}><div className={sales.walkthroughHeader}><div><Camera size={20} /><div><small>Screenshot-guided production procedure</small><strong>Go-Live tenant walkthrough</strong></div></div><span>{steps.length} guided steps</span></div><div className={sales.walkthroughGrid}>{steps.map((step, index) => <article key={step.id}><div className={sales.stepTitle}><span>{String(index + 1).padStart(2, "0")}</span><div><small>{step.id}</small><strong>{step.title}</strong></div></div><OracleScreenshot asset={step.asset} capture={step.capture} className={sales.screenshot} phase="phase-25" title={step.title} /><dl><div><dt>Navigation</dt><dd>{step.path}</dd></div><div><dt>Trainee action</dt><dd>{step.action}</dd></div><div><dt>Validation evidence</dt><dd>{step.evidence}</dd></div></dl></article>)}</div></section>; 
}

type HomeworkProps = { active: HomeworkId; onActive: (id: HomeworkId) => void; status: Record<HomeworkId, boolean>; accessAnswers: Answers; onAccess: (id: string, value: string) => void; automationAnswers: Answers; onAutomation: (id: string, value: string) => void; cycleAnswers: Answers; onCycle: (id: string, value: string) => void; reconciliationAnswers: Answers; onReconciliation: (id: string, value: string) => void; incidentAnswers: Answers; onIncident: (id: string, value: string) => void; sequence: string[]; onSequence: (value: string[]) => void; readout: string; onReadout: (value: string) => void };

function GoLiveHomework(props: HomeworkProps) {
  const mission = goLiveHomeworkMissions.find((item) => item.id === props.active) ?? goLiveHomeworkMissions[0];
  const completed = goLiveHomeworkMissions.filter((item) => props.status[item.id]).length;
  return <><Lead eyebrow="Applied production challenge" title="Open ApexPlan to its first controlled users, prove the live cycle, protect recovery, and hand a known state to Hypercare." icon={<BookOpenCheck size={23} />} /><div className={base.homeworkMissionGrid}>{goLiveHomeworkMissions.map((item, index) => <button className={`${item.id === props.active ? base.homeworkMissionActive : ""} ${props.status[item.id] ? base.homeworkMissionDone : ""}`} key={item.id} onClick={() => props.onActive(item.id)} type="button"><span>{props.status[item.id] ? <Check size={14} /> : index + 1}</span><div><strong>{item.title}</strong><small>{item.description}</small></div></button>)}</div><div className={base.homeworkProgress}><div><span style={{ width: `${(completed / goLiveHomeworkMissions.length) * 100}%` }} /></div><strong>{completed} / {goLiveHomeworkMissions.length} missions ready</strong></div><section className={base.homeworkWorkspace}><header><div><small>Mission {goLiveHomeworkMissions.findIndex((item) => item.id === props.active) + 1}</small><h3>{mission.title}</h3></div><span>{props.status[props.active] ? "Ready" : "In progress"}</span></header><p className={base.homeworkPurpose}>{mission.description}</p>{props.active === "access" && <div className={cutover.homeworkBody}><DecisionTable items={productionAccessCases} answers={props.accessAnswers} onAnswer={props.onAccess} /></div>}{props.active === "automation" && <div className={cutover.homeworkBody}><DecisionTable items={automationCases} answers={props.automationAnswers} onAnswer={props.onAutomation} /></div>}{props.active === "cycle" && <div className={cutover.homeworkBody}><DecisionTable items={firstCycleCases} answers={props.cycleAnswers} onAnswer={props.onCycle} /><div className={styles.homeworkSpacer} /><DecisionTable items={productionReconciliationCases} answers={props.reconciliationAnswers} onAnswer={props.onReconciliation} /></div>}{props.active === "incident" && <div className={cutover.homeworkBody}><DecisionTable items={goLiveIncidentCases} answers={props.incidentAnswers} onAnswer={props.onIncident} /></div>}{props.active === "handoff" && <div className={cutover.homeworkBody}><ActivationSequence sequence={props.sequence} onSequence={props.onSequence} /><label className={base.summaryField}>Production validation and Hypercare handoff readout<textarea rows={7} value={props.readout} onChange={(event) => props.onReadout(event.target.value)} placeholder="State the authorized release and scope, users and automation enabled, first-cycle result, full-precision reconciliations, incidents, open conditions, monitoring, performance, support ownership, daily cadence, escalation, and Hypercare recommendation." /><small>{props.readout.trim().length} / 240 minimum</small></label></div>}</section></>;
}

function GoLiveExit({ artifacts, onToggle, summary, onSummary, preview, answers, onAnswer }: { artifacts: string[]; onToggle: (item: string) => void; summary: string; onSummary: (value: string) => void; preview: string; answers: Answers; onAnswer: (id: string, value: string) => void }) {
  return <><Lead eyebrow="Phase 25 exit gate" title="Go-Live exits only when Hypercare accepts a known production state with complete first-cycle evidence, open ownership, monitoring, and recovery context." icon={<Rocket size={23} />} /><div className={cutover.exitStatement}><LifeBuoy size={22} /><div><strong>Go-Live completion is not “users can log in.”</strong><span>It is evidence that authorized users, automation, calculations, workflow, reporting, reconciliation, incident response, communications, support, and recovery operate together under real production ownership.</span></div></div><h3 className={base.sectionTitle}>Production validation package</h3><div className={design.selectionGrid}>{goLiveArtifacts.map((item) => <button className={artifacts.includes(item) ? design.selectedCard : ""} key={item} onClick={() => onToggle(item)} type="button">{artifacts.includes(item) ? <CheckCircle2 size={17} /> : <span />}<strong>{item}</strong></button>)}</div><label className={base.summaryField}>Authorized Go-Live summary<textarea rows={6} value={summary} onChange={(event) => onSummary(event.target.value)} placeholder="Summarize the release, enabled scope, first-cycle journey, reconciliations, security, performance, incidents, conditions, monitoring, support volume, owners, recovery state, communications, and accepted Hypercare handoff." /><small>{summary.trim().length} / 240 minimum</small></label><div className={base.discoveryPreview}><small>Production statement preview</small><p>{preview}</p><div><FileCheck2 size={15} /> Known live state · controlled first cycle · accepted Hypercare handoff</div></div><h3 className={base.questionTitle}>Knowledge check</h3><div className={base.quizList}>{goLiveKnowledgeQuestions.map((question) => <fieldset key={question.id}><legend><span>{question.id.replace("K-", "")}</span>{question.question}</legend>{question.options.map((option, index) => <label key={`${question.id}-${index}`}><input checked={answers[question.id] === option} name={question.id} onChange={() => onAnswer(question.id, option)} type="radio" />{option}</label>)}</fieldset>)}</div><div className={cutover.packNote}><BookOpenCheck size={20} /><div><strong>Practice pack</strong><span>Complete the activation runbook, first-cycle control, incident log, and Hypercare handoff. Retain the approved versions as the learner&apos;s Phase 25 evidence and Phase 26 operating baseline.</span></div></div></>;
}
