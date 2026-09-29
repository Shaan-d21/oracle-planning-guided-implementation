"use client";

import {
  AlertTriangle,
  ArrowRight,
  BookOpenCheck,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Download,
  FileCheck2,
  Gavel,
  PlayCircle,
  RefreshCw,
  Scale,
  ShieldAlert,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { cutoverLessons } from "@/content/cutover-module";
import {
  authorizationCases,
  blockerRiskCases,
  conditionalApprovalCases,
  decisionEntryControls,
  decisionMeetingControls,
  decisionMeetingSequence,
  evidenceDecisionCases,
  goNoGoArtifacts,
  goNoGoHomeworkMissions,
  goNoGoKnowledgeQuestions,
  goNoGoLessons,
  releaseGates,
  simulatorGates,
  type GoNoGoLessonId,
} from "@/content/go-no-go-module";
import { readTrackProgress, writeTrackProgress } from "@/lib/learning-progress";
import base from "./discovery-module.module.css";
import design from "./application-dimension-design-module.module.css";
import cutover from "./cutover-module.module.css";
import styles from "./go-no-go-module.module.css";
import { LearningModuleFrame, type ModuleFeedback } from "./learning-module-frame";

type Answers = Record<string, string>;
type HomeworkId = (typeof goNoGoHomeworkMissions)[number]["id"];
type DecisionStatus = "Pass" | "Fail" | "Conditional" | "Not evidenced";

const packPath = "/training/oracle-planning/phase-24/";
const conditionControls = [
  "The limitation is noncritical and no hard-stop acceptance rule is weakened",
  "The workaround is tested with the affected role and support can execute it",
  "The condition has a measurable result, accountable owner, and explicit due time",
  "Monitoring, checkpoint, escalation, containment, and breach action are active",
  "Named business authority accepts the individual and cumulative residual risk",
] as const;

export function GoNoGoModule() {
  const [activeLesson, setActiveLesson] = useState<GoNoGoLessonId>("go-no-go-foundations");
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<ModuleFeedback>(null);
  const [entryControls, setEntryControls] = useState<string[]>([]);
  const [evidenceAnswers, setEvidenceAnswers] = useState<Answers>({});
  const [riskAnswers, setRiskAnswers] = useState<Answers>({});
  const [conditionalAnswers, setConditionalAnswers] = useState<Answers>({});
  const [meetingControls, setMeetingControls] = useState<string[]>([]);
  const [meetingSequence, setMeetingSequence] = useState<string[]>([]);
  const [simulatorStatuses, setSimulatorStatuses] = useState<Answers>(() => Object.fromEntries(simulatorGates.map((gate) => [gate.id, gate.initial])));
  const [conditionChecks, setConditionChecks] = useState<string[]>([]);
  const [authorizationAnswers, setAuthorizationAnswers] = useState<Answers>({});
  const [activeHomework, setActiveHomework] = useState<HomeworkId>("evidence");
  const [decisionRecord, setDecisionRecord] = useState("");
  const [artifacts, setArtifacts] = useState<string[]>([]);
  const [summary, setSummary] = useState("");
  const [knowledgeAnswers, setKnowledgeAnswers] = useState<Answers>({});

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = readTrackProgress("implementation");
      setCompletedLessons(stored.completedLessons);
      const saved = goNoGoLessons.find((lesson) => lesson.id === stored.activeLesson);
      if (saved) setActiveLesson(saved.id);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const prerequisiteComplete = cutoverLessons.every((lesson) => completedLessons.includes(lesson.id));
  const allCorrect = (items: readonly { id: string; correct: string }[], answers: Answers) => items.every((item) => answers[item.id] === item.correct);
  const correctMeetingSequence = meetingSequence.length === decisionMeetingSequence.length && meetingSequence.every((item, index) => item === decisionMeetingSequence[index]);
  const hardStopFailed = simulatorGates.some((gate) => gate.hardStop && simulatorStatuses[gate.id] !== "Pass");
  const hasConditional = simulatorGates.some((gate) => simulatorStatuses[gate.id] === "Conditional");
  const conditionsReady = conditionChecks.length === conditionControls.length;
  const decisionOutcome = hardStopFailed ? "NO-GO" : hasConditional ? (conditionsReady ? "GO WITH CONDITIONS" : "NOT READY") : simulatorGates.every((gate) => simulatorStatuses[gate.id] === "Pass") ? "GO" : "NOT READY";
  const knowledgeReady = goNoGoKnowledgeQuestions.every((question) => knowledgeAnswers[question.id] === question.correct);
  const homeworkStatus: Record<HomeworkId, boolean> = {
    evidence: allCorrect(evidenceDecisionCases, evidenceAnswers),
    risk: allCorrect(blockerRiskCases, riskAnswers),
    conditions: allCorrect(conditionalApprovalCases, conditionalAnswers),
    meeting: meetingControls.length === decisionMeetingControls.length && correctMeetingSequence,
    decision: decisionOutcome === "GO WITH CONDITIONS" && decisionRecord.trim().length >= 240,
  };
  const exitPreview = useMemo(() => artifacts.length === goNoGoArtifacts.length && summary.trim().length >= 240
    ? `${summary.trim()} The record binds the decision to the exact release, production evidence snapshot, accepted residual risks and conditions, recovery state, activation scope, communication, owners, and decision authority.`
    : "Complete all eight decision artifacts and provide an authorized decision summary of at least 240 characters.", [artifacts, summary]);

  function persist(nextCompleted: string[], lesson: GoNoGoLessonId) {
    writeTrackProgress("implementation", { completedLessons: nextCompleted, activeLesson: lesson, activeModuleId: "implementation-go-no-go", lastVisited: new Date().toISOString() });
  }

  function goToLesson(id: GoNoGoLessonId) {
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
    if (activeLesson === "go-no-go-foundations") {
      if (entryControls.length !== decisionEntryControls.length) return setFeedback({ tone: "error", message: "Confirm all five evidence, authority, timing, risk, and decision-method entry controls." });
      return markComplete("The gate now evaluates a defined production state using predefined acceptance rules, current evidence, named authority, and a controlled decision deadline.");
    }
    if (activeLesson === "go-no-go-evidence") {
      if (!allCorrect(evidenceDecisionCases, evidenceAnswers)) return setFeedback({ tone: "error", message: "Correct every incomplete, stale, partial, security, reconciliation, and residual-risk evidence decision." });
      return markComplete("Gate evidence now identifies the exact release, production state, acceptance rule, result, reviewer, timestamp, and retained proof.");
    }
    if (activeLesson === "go-no-go-risk") {
      if (!allCorrect(blockerRiskCases, riskAnswers)) return setFeedback({ tone: "error", message: "Correct every hard-stop, security, integration, performance, and low-impact risk classification." });
      return markComplete("Hard stops are protected, while proportionate residual risks remain visible, owned, monitored, time-bounded, and explicitly accepted.");
    }
    if (activeLesson === "go-no-go-conditions") {
      if (!allCorrect(conditionalApprovalCases, conditionalAnswers)) return setFeedback({ tone: "error", message: "Make every conditional approval measurable, tested, owned, time-bounded, monitored, and governed by a breach action." });
      return markComplete("Conditional approval can no longer become an ambiguous soft Go; every condition has a bounded acceptance and failure path.");
    }
    if (activeLesson === "go-no-go-meeting") {
      if (meetingControls.length !== decisionMeetingControls.length || !correctMeetingSequence) return setFeedback({ tone: "error", message: "Confirm all five meeting controls and arrange the six decision activities in the correct order." });
      return markComplete("The decision meeting now protects authority, evidence currency, hard stops, cumulative risk, dissent, and an auditable handoff.");
    }
    if (activeLesson === "go-no-go-simulator") {
      if (decisionOutcome !== "GO WITH CONDITIONS") return setFeedback({ tone: "error", message: "Resolve all hard-stop gates and confirm all five controls for the remaining noncritical performance condition." });
      return markComplete("The board simulation produces a valid Go with conditions: no hard stop fails and the remaining limitation is explicitly bounded and accepted.");
    }
    if (activeLesson === "go-no-go-authorization") {
      if (!allCorrect(authorizationCases, authorizationAnswers)) return setFeedback({ tone: "error", message: "Correct the authority, communication, changed-state, and No-Go handoff decisions." });
      return markComplete("Authorization and communication now match the actual decision, affected users, limitations, checkpoints, recovery path, and activation scope.");
    }
    if (activeLesson === "go-no-go-homework") {
      if (!Object.values(homeworkStatus).every(Boolean)) return setFeedback({ tone: "error", message: "Complete all five decision-board missions, including the 240-character authorized decision record." });
      return markComplete("Applied decision-board lab complete. Evidence, blockers, conditions, authority, rationale, and immediate actions form one auditable decision.");
    }
    if (artifacts.length !== goNoGoArtifacts.length || summary.trim().length < 240 || !knowledgeReady) return setFeedback({ tone: "error", message: "Select all eight deliverables, provide a 240-character decision summary, and answer all five knowledge checks correctly." });
    markComplete("Phase 24 exit gate passed. The signed, scoped, time-stamped activation decision and its conditions, recovery state, communications, and owners are ready for Phase 25 Go-Live.");
  }

  return (
    <LearningModuleFrame
      activeLessonId={activeLesson}
      completedLessons={completedLessons}
      description="Convert the completed ApexPlan cutover evidence into an authorized Go, Go with conditions, or No-Go decision without allowing percentages, schedule pressure, or incomplete evidence to override critical gates."
      exitGate="Approve the exact release decision, gate results, residual risks, conditions, authority, rationale, recovery state, communications, and Go-Live or remediation handoff"
      exitGateIcon={<Gavel size={18} />}
      feedback={feedback}
      lessons={goNoGoLessons}
      onSelectLesson={(id) => goToLesson(id as GoNoGoLessonId)}
      onValidate={validateLesson}
      phase={24}
      prerequisite={{ complete: prerequisiteComplete, message: "Complete Phase 23 so the board evaluates the exact production release, actual cutover results, reconciliations, deviations, risks, and recovery state.", href: "/learn/cutover", linkLabel: "Open Phase 23" }}
      stage="Deploy · Decision gate"
      title="Go / No-Go"
      validateLabel={activeLesson === "go-no-go-exit-gate" ? "Approve decision exit" : undefined}
    >
      {activeLesson === "go-no-go-foundations" && <DecisionFoundations selected={entryControls} onToggle={(item) => toggle(setEntryControls, item)} />}
      {activeLesson === "go-no-go-evidence" && <GateEvidence answers={evidenceAnswers} onAnswer={(id, value) => setEvidenceAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "go-no-go-risk" && <BlockersAndRisk answers={riskAnswers} onAnswer={(id, value) => setRiskAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "go-no-go-conditions" && <ConditionalApproval answers={conditionalAnswers} onAnswer={(id, value) => setConditionalAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "go-no-go-meeting" && <DecisionMeeting selected={meetingControls} onToggle={(item) => toggle(setMeetingControls, item)} sequence={meetingSequence} onSequence={setMeetingSequence} />}
      {activeLesson === "go-no-go-simulator" && <DecisionSimulator statuses={simulatorStatuses} onStatus={(id, value) => setSimulatorStatuses((current) => ({ ...current, [id]: value }))} conditions={conditionChecks} onCondition={(item) => toggle(setConditionChecks, item)} outcome={decisionOutcome} onApply={() => setSimulatorStatuses(Object.fromEntries(simulatorGates.map((gate) => [gate.id, gate.ready])))} />}
      {activeLesson === "go-no-go-authorization" && <Authorization answers={authorizationAnswers} onAnswer={(id, value) => setAuthorizationAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "go-no-go-homework" && <DecisionHomework active={activeHomework} onActive={setActiveHomework} status={homeworkStatus} evidenceAnswers={evidenceAnswers} onEvidence={(id, value) => setEvidenceAnswers((current) => ({ ...current, [id]: value }))} riskAnswers={riskAnswers} onRisk={(id, value) => setRiskAnswers((current) => ({ ...current, [id]: value }))} conditionalAnswers={conditionalAnswers} onConditional={(id, value) => setConditionalAnswers((current) => ({ ...current, [id]: value }))} meetingControls={meetingControls} onMeetingControl={(item) => toggle(setMeetingControls, item)} meetingSequence={meetingSequence} onMeetingSequence={setMeetingSequence} decisionRecord={decisionRecord} onDecisionRecord={setDecisionRecord} outcome={decisionOutcome} />}
      {activeLesson === "go-no-go-exit-gate" && <DecisionExit artifacts={artifacts} onToggle={(item) => toggle(setArtifacts, item)} summary={summary} onSummary={setSummary} preview={exitPreview} answers={knowledgeAnswers} onAnswer={(id, value) => setKnowledgeAnswers((current) => ({ ...current, [id]: value }))} />}
    </LearningModuleFrame>
  );
}

function Lead({ eyebrow, title, icon = <Gavel size={23} /> }: { eyebrow: string; title: string; icon?: ReactNode }) {
  return <div className={base.lessonLead}>{icon}<div><small>{eyebrow}</small><strong>{title}</strong></div></div>;
}

function DecisionTable({ items, answers, onAnswer, placeholder = "Select governed response" }: { items: readonly { id: string; issue: string; correct: string; options: readonly string[] }[]; answers: Answers; onAnswer: (id: string, value: string) => void; placeholder?: string }) {
  return <div className={design.mappingTable}>{items.map((item) => <div className={design.tableRow} key={item.id}><div><strong>{item.id}</strong><small>{item.issue}</small></div><select aria-label={`${item.id} decision`} value={answers[item.id] ?? ""} onChange={(event) => onAnswer(item.id, event.target.value)}><option value="">{placeholder}</option>{item.options.map((option, index) => <option key={`${item.id}-${index}`} value={option}>{option}</option>)}</select></div>)}</div>;
}

function MeetingSequence({ sequence, onSequence }: { sequence: string[]; onSequence: (value: string[]) => void }) {
  return <><div className={cutover.sequence}>{decisionMeetingSequence.map((item) => <button className={sequence.includes(item) ? cutover.sequenceDone : ""} disabled={sequence.includes(item)} key={item} onClick={() => onSequence([...sequence, item])} type="button"><span>{sequence.includes(item) ? <Check size={14} /> : <PlayCircle size={14} />}</span><strong>{item}</strong></button>)}</div><button className={cutover.resetButton} onClick={() => onSequence([])} type="button"><RefreshCw size={14} /> Reset sequence</button></>;
}

function DecisionFoundations({ selected, onToggle }: { selected: string[]; onToggle: (item: string) => void }) {
  return <><Lead eyebrow="Evidence before authority" title="Go / No-Go is a binding business decision about one identified production state—not a confidence poll or project-status presentation." /><p className={base.bodyCopy}>The board does not repeat testing or cutover. It verifies that predefined gates are satisfied, exposes failed or conditional outcomes, assesses individual and cumulative residual risk, confirms recovery remains viable, and records the authorized next state.</p><div className={cutover.boundaryGrid}>{[["Input", "Frozen decision pack", "Exact release, production state, gate evidence, deviations, risks, and rollback position"], ["Control", "Predefined decision method", "Hard stops, acceptance rules, authority, quorum, deadline, conditions, and record"], ["Output", "Authorized next state", "Go, Go with conditions, or No-Go plus communication and owned handoff"]].map(([small, strong, body]) => <article key={small}><small>{small}</small><strong>{strong}</strong><span>{body}</span></article>)}</div><h3 className={base.sectionTitle}>Confirm decision entry criteria</h3><div className={design.selectionGrid}>{decisionEntryControls.map((item) => <button className={selected.includes(item) ? design.selectedCard : ""} key={item} onClick={() => onToggle(item)} type="button">{selected.includes(item) ? <CheckCircle2 size={17} /> : <span />}<strong>{item}</strong></button>)}</div><div className={cutover.downloadGrid}><a download href={`${packPath}phase-24-go-no-go-practice-pack.zip`}><Download size={18} /><span><strong>Complete practice pack</strong><small>All Phase 24 templates</small></span></a><a download href={`${packPath}go-no-go-gate-register.csv`}><Download size={18} /><span><strong>Gate register</strong><small>Evidence and acceptance</small></span></a><a download href={`${packPath}residual-risk-register.csv`}><Download size={18} /><span><strong>Residual-risk register</strong><small>Conditions and exposure</small></span></a><a download href={`${packPath}decision-record.csv`}><Download size={18} /><span><strong>Decision record</strong><small>Authority and rationale</small></span></a><a download href={`${packPath}communication-checklist.csv`}><Download size={18} /><span><strong>Communication checklist</strong><small>Go or recovery handoff</small></span></a></div></>;
}

function GateEvidence({ answers, onAnswer }: { answers: Answers; onAnswer: (id: string, value: string) => void }) {
  return <><Lead eyebrow="Predefined gates" title="Every gate has one accountable owner, a hard-stop classification, an observable acceptance rule, current evidence, and an authorized result." icon={<ClipboardCheck size={23} />} /><div className={styles.gateTable}><div className={styles.gateHeader}><span>Gate</span><span>Owner</span><span>Required evidence</span></div>{releaseGates.map((gate) => <article key={gate.id}><div><small>{gate.id} · {gate.hardStop ? "Hard stop" : "Risk assessed"}</small><strong>{gate.gate}</strong></div><strong>{gate.owner}</strong><p>{gate.evidence}</p></article>)}</div><h3 className={base.sectionTitle}>Judge evidence sufficiency</h3><DecisionTable items={evidenceDecisionCases} answers={answers} onAnswer={onAnswer} /><div className={cutover.referenceNote}><AlertTriangle size={20} /><div><strong>Status is not evidence</strong><span>“Green,” “completed,” or “passed in UAT” is insufficient. The board needs the exact production release, acceptance result, retained proof, reviewer, timestamp, exceptions, and any changes since capture.</span></div></div></>;
}

function BlockersAndRisk({ answers, onAnswer }: { answers: Answers; onAnswer: (id: string, value: string) => void }) {
  return <><Lead eyebrow="Protect the hard stops" title="A blocker violates a non-negotiable acceptance rule; a residual risk is a bounded exposure that authorized business leadership may consciously accept." icon={<ShieldAlert size={23} />} /><div className={styles.comparison}><article><small>Hard blocker</small><strong>Decision: No-Go</strong><span>Material data integrity, security, critical-path availability, recoverability, financial control, or unproven essential operation.</span></article><article><small>Residual risk</small><strong>Decision: assess and authorize</strong><span>Known impact, tested workaround, bounded exposure, monitoring, owner, due date, fallback, and explicit acceptance.</span></article><article><small>Unknown</small><strong>Decision: not ready</strong><span>Missing facts, stale evidence, unclear ownership, untested workaround, uncontrolled dependency, or unbounded consequence.</span></article></div><DecisionTable items={blockerRiskCases} answers={answers} onAnswer={onAnswer} /></>;
}

function ConditionalApproval({ answers, onAnswer }: { answers: Answers; onAnswer: (id: string, value: string) => void }) {
  return <><Lead eyebrow="No ambiguous soft Go" title="A condition is an enforceable control with a measurable result and breach action—not a promise to fix something later." icon={<Scale size={23} />} /><div className={styles.conditionFlow}>{["Noncritical exposure", "Tested workaround", "Named owner", "Due time", "Active monitoring", "Checkpoint", "Breach action", "Risk authority"].map((item, index) => <article key={item}><span>{index + 1}</span><strong>{item}</strong></article>)}</div><DecisionTable items={conditionalApprovalCases} answers={answers} onAnswer={onAnswer} /><div className={cutover.referenceNote}><ShieldCheck size={20} /><div><strong>Conditions survive the meeting</strong><span>Transfer every condition into the Go-Live command center and support queue. A condition closes only when its measurable result is evidenced and the named closure authority accepts it.</span></div></div></>;
}

function DecisionMeeting({ selected, onToggle, sequence, onSequence }: { selected: string[]; onToggle: (item: string) => void; sequence: string[]; onSequence: (value: string[]) => void }) {
  return <><Lead eyebrow="Decision forum" title="The board is short because the evidence has already been prepared; meeting time is reserved for failed gates, conditions, cumulative risk, and authority." icon={<Users size={23} />} /><h3 className={base.sectionTitle}>Meeting controls</h3><div className={design.selectionGrid}>{decisionMeetingControls.map((item) => <button className={selected.includes(item) ? design.selectedCard : ""} key={item} onClick={() => onToggle(item)} type="button">{selected.includes(item) ? <CheckCircle2 size={17} /> : <span />}<strong>{item}</strong></button>)}</div><h3 className={base.sectionTitle}>Build the decision sequence</h3><MeetingSequence sequence={sequence} onSequence={onSequence} /><div className={styles.roleStrip}>{[["Facilitator", "Protect method and deadline"], ["Gate owner", "State result and evidence"], ["Risk adviser", "Explain impact and recovery"], ["Business authority", "Accept risk and decide"], ["Recorder", "Freeze the exact record"]].map(([role, action]) => <article key={role}><strong>{role}</strong><span>{action}</span></article>)}</div></>;
}

function DecisionSimulator({ statuses, onStatus, conditions, onCondition, outcome, onApply }: { statuses: Answers; onStatus: (id: string, value: DecisionStatus) => void; conditions: string[]; onCondition: (item: string) => void; outcome: string; onApply: () => void }) {
  const tone = outcome === "NO-GO" ? styles.noGo : outcome === "GO" || outcome === "GO WITH CONDITIONS" ? styles.go : styles.notReady;
  return <><Lead eyebrow="Decision-board simulation" title="ApexPlan has one failed reconciliation gate and one noncritical performance condition. Resolve facts without changing the rules." icon={<Gavel size={23} />} /><div className={styles.decisionLab}><header><div><Gavel size={20} /><span><small>ApexPlan production activation</small><strong>Gate status board</strong></span></div><b className={tone}>{outcome}</b></header><div className={styles.simulatorGates}>{simulatorGates.map((gate) => <label key={gate.id}><span><small>{gate.id} · {gate.hardStop ? "Hard stop" : "Risk assessed"}</small><strong>{gate.label}</strong></span><select aria-label={`${gate.id} gate status`} value={statuses[gate.id]} onChange={(event) => onStatus(gate.id, event.target.value as DecisionStatus)}>{["Pass", "Fail", "Conditional", "Not evidenced"].map((status) => <option key={`${gate.id}-${status}`} value={status}>{status}</option>)}</select></label>)}</div><div className={styles.conditionPanel}><h3>Performance condition acceptance</h3>{conditionControls.map((item) => <button className={conditions.includes(item) ? styles.conditionSelected : ""} key={item} onClick={() => onCondition(item)} type="button">{conditions.includes(item) ? <CheckCircle2 size={17} /> : <span />}<strong>{item}</strong></button>)}</div><footer><p>The initial failed data gate forces No-Go. Apply the evidenced correction only after the source, Plan1, ApexPlan ASO, dashboards, and Smart View totals reconcile and the rerun is accepted.</p><button onClick={onApply} type="button"><Check size={15} /> Apply reconciled gate results</button></footer></div></>;
}

function Authorization({ answers, onAnswer }: { answers: Answers; onAnswer: (id: string, value: string) => void }) {
  return <><Lead eyebrow="Bind decision to action" title="Authorization applies to the exact evidenced release and remains valid only while that material state is unchanged." icon={<FileCheck2 size={23} />} /><div className={styles.authorizationFlow}>{["Freeze decision record", "Confirm authority and time", "State release and scope", "List conditions and limitations", "Confirm recovery state", "Issue approved communication", "Enable activation or recovery", "Monitor first checkpoint"].map((item, index) => <span key={item}>{item}{index < 7 && <ArrowRight size={13} />}</span>)}</div><DecisionTable items={authorizationCases} answers={answers} onAnswer={onAnswer} /><div className={cutover.referenceNote}><ClipboardCheck size={20} /><div><strong>Three distinct messages</strong><span>Leadership receives decision, risk, and accountability; users receive availability, limitations, workaround, and support path; operations receive activation or recovery tasks, monitoring, checkpoints, escalation, and evidence ownership.</span></div></div></>;
}

type HomeworkProps = { active: HomeworkId; onActive: (id: HomeworkId) => void; status: Record<HomeworkId, boolean>; evidenceAnswers: Answers; onEvidence: (id: string, value: string) => void; riskAnswers: Answers; onRisk: (id: string, value: string) => void; conditionalAnswers: Answers; onConditional: (id: string, value: string) => void; meetingControls: string[]; onMeetingControl: (item: string) => void; meetingSequence: string[]; onMeetingSequence: (value: string[]) => void; decisionRecord: string; onDecisionRecord: (value: string) => void; outcome: string };

function DecisionHomework(props: HomeworkProps) {
  const mission = goNoGoHomeworkMissions.find((item) => item.id === props.active) ?? goNoGoHomeworkMissions[0];
  const completed = goNoGoHomeworkMissions.filter((item) => props.status[item.id]).length;
  return <><Lead eyebrow="Applied decision-board challenge" title="Authorize the ApexPlan production state without weakening a gate, hiding a limitation, or separating the decision from its immediate actions." icon={<BookOpenCheck size={23} />} /><div className={base.homeworkMissionGrid}>{goNoGoHomeworkMissions.map((item, index) => <button className={`${item.id === props.active ? base.homeworkMissionActive : ""} ${props.status[item.id] ? base.homeworkMissionDone : ""}`} key={item.id} onClick={() => props.onActive(item.id)} type="button"><span>{props.status[item.id] ? <Check size={14} /> : index + 1}</span><div><strong>{item.title}</strong><small>{item.description}</small></div></button>)}</div><div className={base.homeworkProgress}><div><span style={{ width: `${(completed / goNoGoHomeworkMissions.length) * 100}%` }} /></div><strong>{completed} / {goNoGoHomeworkMissions.length} missions ready</strong></div><section className={base.homeworkWorkspace}><header><div><small>Mission {goNoGoHomeworkMissions.findIndex((item) => item.id === props.active) + 1}</small><h3>{mission.title}</h3></div><span>{props.status[props.active] ? "Ready" : "In progress"}</span></header><p className={base.homeworkPurpose}>{mission.description}</p>{props.active === "evidence" && <div className={cutover.homeworkBody}><DecisionTable items={evidenceDecisionCases} answers={props.evidenceAnswers} onAnswer={props.onEvidence} /></div>}{props.active === "risk" && <div className={cutover.homeworkBody}><DecisionTable items={blockerRiskCases} answers={props.riskAnswers} onAnswer={props.onRisk} /></div>}{props.active === "conditions" && <div className={cutover.homeworkBody}><DecisionTable items={conditionalApprovalCases} answers={props.conditionalAnswers} onAnswer={props.onConditional} /></div>}{props.active === "meeting" && <div className={cutover.homeworkBody}><div className={design.selectionGrid}>{decisionMeetingControls.map((item) => <button className={props.meetingControls.includes(item) ? design.selectedCard : ""} key={item} onClick={() => props.onMeetingControl(item)} type="button">{props.meetingControls.includes(item) ? <CheckCircle2 size={17} /> : <span />}<strong>{item}</strong></button>)}</div><MeetingSequence sequence={props.meetingSequence} onSequence={props.onMeetingSequence} /></div>}{props.active === "decision" && <div className={cutover.homeworkBody}><div className={`${styles.outcomeSummary} ${props.outcome === "GO WITH CONDITIONS" ? styles.go : styles.notReady}`}><Gavel size={20} /><div><small>Current simulation outcome</small><strong>{props.outcome}</strong></div></div><label className={base.summaryField}>Authorized decision record<textarea rows={7} value={props.decisionRecord} onChange={(event) => props.onDecisionRecord(event.target.value)} placeholder="State the release and evidence snapshot, gate outcomes, accepted performance condition, impact, workaround, monitoring, owner, due time, breach action, rollback state, authority, decision time, activation scope, communication, and first checkpoint." /><small>{props.decisionRecord.trim().length} / 240 minimum</small></label></div>}</section></>;
}

function DecisionExit({ artifacts, onToggle, summary, onSummary, preview, answers, onAnswer }: { artifacts: string[]; onToggle: (item: string) => void; summary: string; onSummary: (value: string) => void; preview: string; answers: Answers; onAnswer: (id: string, value: string) => void }) {
  return <><Lead eyebrow="Phase 24 exit gate" title="Go-Live may start only from a signed decision tied to the exact evidenced production state, accepted risk, recovery position, scope, and authority." icon={<Gavel size={23} />} /><div className={cutover.exitStatement}><ShieldCheck size={22} /><div><strong>A decision record is an operational control.</strong><span>It tells Phase 25 exactly what may be activated, which conditions remain open, who owns them, what users must know, when the first checkpoint occurs, and which breach reopens the decision.</span></div></div><h3 className={base.sectionTitle}>Decision package</h3><div className={design.selectionGrid}>{goNoGoArtifacts.map((item) => <button className={artifacts.includes(item) ? design.selectedCard : ""} key={item} onClick={() => onToggle(item)} type="button">{artifacts.includes(item) ? <CheckCircle2 size={17} /> : <span />}<strong>{item}</strong></button>)}</div><label className={base.summaryField}>Authorized decision summary<textarea rows={6} value={summary} onChange={(event) => onSummary(event.target.value)} placeholder="Summarize the exact release, evidence snapshot, hard-stop results, conditions, cumulative residual risk, recovery state, authority, rationale, dissent, decision time, activation scope, communication, owners, and first checkpoint." /><small>{summary.trim().length} / 240 minimum</small></label><div className={base.discoveryPreview}><small>Decision statement preview</small><p>{preview}</p><div><FileCheck2 size={15} /> Exact evidenced state · explicit risk authority · controlled Phase 25 handoff</div></div><h3 className={base.questionTitle}>Knowledge check</h3><div className={base.quizList}>{goNoGoKnowledgeQuestions.map((question) => <fieldset key={question.id}><legend><span>{question.id.replace("K-", "")}</span>{question.question}</legend>{question.options.map((option, index) => <label key={`${question.id}-${index}`}><input checked={answers[question.id] === option} name={question.id} onChange={() => onAnswer(question.id, option)} type="radio" />{option}</label>)}</fieldset>)}</div><div className={cutover.packNote}><BookOpenCheck size={20} /><div><strong>Practice pack</strong><span>Complete the gate register, residual-risk register, decision record, and communication checklist. Retain the signed versions as the learner&apos;s Phase 24 evidence and Phase 25 activation authority.</span></div></div></>;
}
