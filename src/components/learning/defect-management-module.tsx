"use client";

import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BookOpenCheck,
  Bug,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Download,
  FileCheck2,
  GitPullRequestArrow,
  PlayCircle,
  RefreshCw,
  Siren,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from "react";
import { userAcceptanceTestingLessons } from "@/content/user-acceptance-testing-module";
import {
  defectArtifacts,
  defectClassificationCases,
  defectHomeworkMissions,
  defectKnowledgeQuestions,
  defectLifecycle,
  defectManagementLessons,
  defectMetrics,
  defectReadinessControls,
  defectReadoutSequence,
  defectRecordCases,
  defectRecordFields,
  defectRetestCases,
  defectTriageCases,
  defectWarRoomControls,
  invalidLifecycleActions,
  type DefectManagementLessonId,
} from "@/content/defect-management-module";
import { readTrackProgress, writeTrackProgress } from "@/lib/learning-progress";
import base from "./discovery-module.module.css";
import design from "./application-dimension-design-module.module.css";
import styles from "./defect-management-module.module.css";
import { LearningModuleFrame, type ModuleFeedback } from "./learning-module-frame";

type Answers = Record<string, string>;
type HomeworkId = (typeof defectHomeworkMissions)[number]["id"];
type ReleaseInputs = { openSev1: number; blockingSev2: number; overdue: number; pendingRetests: number; unapprovedDeferrals: number; unreconciled: number };

const packPath = "/training/oracle-planning/phase-22/";
const initialReleaseInputs: ReleaseInputs = { openSev1: 1, blockingSev2: 2, overdue: 3, pendingRetests: 2, unapprovedDeferrals: 1, unreconciled: 1 };

export function DefectManagementModule() {
  const [activeLesson, setActiveLesson] = useState<DefectManagementLessonId>("defect-foundations");
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<ModuleFeedback>(null);
  const [readiness, setReadiness] = useState<string[]>([]);
  const [classificationAnswers, setClassificationAnswers] = useState<Answers>({});
  const [recordAnswers, setRecordAnswers] = useState<Answers>({});
  const [triageAnswers, setTriageAnswers] = useState<Answers>({});
  const [lifecycleAnswers, setLifecycleAnswers] = useState<Answers>({});
  const [retestAnswers, setRetestAnswers] = useState<Answers>({});
  const [lifecycleStage, setLifecycleStage] = useState(0);
  const [releaseInputs, setReleaseInputs] = useState<ReleaseInputs>(initialReleaseInputs);
  const [warRoomChecks, setWarRoomChecks] = useState<string[]>([]);
  const [activeHomework, setActiveHomework] = useState<HomeworkId>("classify");
  const [sequence, setSequence] = useState<string[]>([]);
  const [readout, setReadout] = useState("");
  const [artifacts, setArtifacts] = useState<string[]>([]);
  const [summary, setSummary] = useState("");
  const [knowledgeAnswers, setKnowledgeAnswers] = useState<Answers>({});

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = readTrackProgress("implementation");
      setCompletedLessons(stored.completedLessons);
      const saved = defectManagementLessons.find((lesson) => lesson.id === stored.activeLesson);
      if (saved) setActiveLesson(saved.id);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const prerequisiteComplete = userAcceptanceTestingLessons.every((lesson) => completedLessons.includes(lesson.id));
  const allCorrect = (items: readonly { id: string; correct: string }[], answers: Answers) => items.every((item) => answers[item.id] === item.correct);
  const releaseReady = Object.values(releaseInputs).every((value) => value === 0);
  const knowledgeReady = defectKnowledgeQuestions.every((question) => knowledgeAnswers[question.id] === question.correct);
  const homeworkStatus: Record<HomeworkId, boolean> = {
    classify: allCorrect(defectClassificationCases, classificationAnswers),
    record: allCorrect(defectRecordCases, recordAnswers),
    triage: allCorrect(defectTriageCases, triageAnswers),
    retest: allCorrect(defectRetestCases, retestAnswers) && allCorrect(invalidLifecycleActions, lifecycleAnswers),
    readout: sequence.length === defectReadoutSequence.length && sequence.every((item, index) => item === defectReadoutSequence[index]) && readout.trim().length >= 240,
  };
  const closurePreview = useMemo(() => artifacts.length === defectArtifacts.length && summary.trim().length >= 240
    ? `${summary.trim()} The closure record identifies the release, register snapshot, blocker position, fixes, retests, regression, reconciliations, deferred risks, owners, target releases, approvals, and cutover recommendation.`
    : "Complete all eight closure artifacts and provide a defect-readiness summary of at least 240 characters.", [artifacts, summary]);

  function persist(nextCompleted: string[], lesson: DefectManagementLessonId) {
    writeTrackProgress("implementation", { completedLessons: nextCompleted, activeLesson: lesson, activeModuleId: "implementation-defect-management", lastVisited: new Date().toISOString() });
  }

  function goToLesson(id: DefectManagementLessonId) {
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
    if (activeLesson === "defect-foundations") {
      if (readiness.length !== defectReadinessControls.length) return setFeedback({ tone: "error", message: "Confirm all five release, register, governance, ownership, and cutover-readiness controls." });
      return markComplete("Defect governance now begins from an identifiable release, one authoritative register, explicit decision rules, accountable owners, and approved cutover entry criteria.");
    }
    if (activeLesson === "defect-classification") {
      if (!allCorrect(defectClassificationCases, classificationAnswers)) return setFeedback({ tone: "error", message: "Correct every defect, change-request, severity, priority, and release-impact classification." });
      return markComplete("The queue separates true defects from changes and assigns impact-based severity without confusing it with scheduling priority.");
    }
    if (activeLesson === "defect-record") {
      if (!allCorrect(defectRecordCases, recordAnswers)) return setFeedback({ tone: "error", message: "Repair every incomplete defect record so another tester can reproduce and reconcile it independently." });
      return markComplete("Defect records now identify the release, configuration, user, POV, steps, actual and expected results, evidence, ownership, and closure path.");
    }
    if (activeLesson === "defect-triage") {
      if (!allCorrect(defectTriageCases, triageAnswers)) return setFeedback({ tone: "error", message: "Resolve the blocker, duplicate, change-baseline, and controlled-deferral triage decisions." });
      return markComplete("Triage now produces an owned next action, target, dependency, release impact, escalation, and governed decision for every item.");
    }
    if (activeLesson === "defect-lifecycle") {
      if (lifecycleStage !== defectLifecycle.length - 1 || !allCorrect(invalidLifecycleActions, lifecycleAnswers)) return setFeedback({ tone: "error", message: "Advance DEF-022 through the full controlled lifecycle and correct all invalid status-transition decisions." });
      return markComplete("The defect moved from validation to independent closure without skipping controlled deployment, retest, regression, evidence, or history.");
    }
    if (activeLesson === "defect-retest") {
      if (!allCorrect(defectRetestCases, retestAnswers)) return setFeedback({ tone: "error", message: "Complete the calculation, security, and publish/reconciliation retest designs." });
      return markComplete("Each fix now has a targeted retest, risk-based regression boundary, repeatability check, and downstream reconciliation evidence.");
    }
    if (activeLesson === "defect-metrics") {
      if (!releaseReady) return setFeedback({ tone: "error", message: "Resolve every release blocker, overdue action, pending retest, unapproved deferral, and unreconciled result before recommending cutover." });
      return markComplete("The register snapshot meets the approved zero-tolerance release conditions and supports a traceable cutover recommendation.");
    }
    if (activeLesson === "defect-war-room") {
      if (warRoomChecks.length !== defectWarRoomControls.length) return setFeedback({ tone: "error", message: "Confirm all five war-room context, evidence, ownership, classification, and decision-record controls." });
      return markComplete("The governance walkthrough converts live register evidence into owned actions and an auditable release decision without requiring product screenshots.");
    }
    if (activeLesson === "defect-homework") {
      if (!Object.values(homeworkStatus).every(Boolean)) return setFeedback({ tone: "error", message: "Complete all five applied missions, including the 240-character release recommendation." });
      return markComplete("Applied defect-management lab complete. The queue, records, triage, fixes, retests, residual risks, and release recommendation are controlled.");
    }
    if (artifacts.length !== defectArtifacts.length || summary.trim().length < 240 || !knowledgeReady) return setFeedback({ tone: "error", message: "Select all eight deliverables, provide a 240-character closure summary, and answer all five knowledge checks correctly." });
    markComplete("Phase 22 exit gate passed. No uncontrolled release blocker remains, and the approved residual-risk position is ready for Phase 23 Cutover planning.");
  }

  return (
    <LearningModuleFrame
      activeLessonId={activeLesson}
      completedLessons={completedLessons}
      description="Govern every ApexPlan issue from discovery through evidence-backed classification, triage, fix, retest, regression, reconciliation, deferral, closure, and release authorization."
      exitGate="Approve the authoritative register, blocker position, ownership, ageing, fix builds, retest and regression evidence, reconciliations, controlled deferrals, residual risks, closure decisions, and cutover recommendation"
      exitGateIcon={<Bug size={18} />}
      feedback={feedback}
      lessons={defectManagementLessons}
      onSelectLesson={(id) => goToLesson(id as DefectManagementLessonId)}
      onValidate={validateLesson}
      phase={22}
      prerequisite={{ complete: prerequisiteComplete, message: "Complete Phase 21 so defects are based on a controlled release candidate, representative business journeys, signed expected results, and retained UAT evidence.", href: "/learn/user-acceptance-testing", linkLabel: "Open Phase 21" }}
      stage="Validate · Defect management"
      title="Defect Management"
      validateLabel={activeLesson === "defect-exit-gate" ? "Approve defect exit" : undefined}
    >
      {activeLesson === "defect-foundations" && <DefectFoundations selected={readiness} onToggle={(item) => toggle(setReadiness, item)} />}
      {activeLesson === "defect-classification" && <DefectClassification answers={classificationAnswers} onAnswer={(id, value) => setClassificationAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "defect-record" && <DefectRecord answers={recordAnswers} onAnswer={(id, value) => setRecordAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "defect-triage" && <DefectTriage answers={triageAnswers} onAnswer={(id, value) => setTriageAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "defect-lifecycle" && <DefectLifecycle stage={lifecycleStage} onAdvance={() => setLifecycleStage((current) => Math.min(current + 1, defectLifecycle.length - 1))} answers={lifecycleAnswers} onAnswer={(id, value) => setLifecycleAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "defect-retest" && <DefectRetest answers={retestAnswers} onAnswer={(id, value) => setRetestAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "defect-metrics" && <DefectMetrics inputs={releaseInputs} onInput={setReleaseInputs} />}
      {activeLesson === "defect-war-room" && <DefectWarRoom selected={warRoomChecks} onToggle={(item) => toggle(setWarRoomChecks, item)} />}
      {activeLesson === "defect-homework" && <DefectHomework active={activeHomework} onActive={setActiveHomework} status={homeworkStatus} classificationAnswers={classificationAnswers} onClassification={(id, value) => setClassificationAnswers((current) => ({ ...current, [id]: value }))} recordAnswers={recordAnswers} onRecord={(id, value) => setRecordAnswers((current) => ({ ...current, [id]: value }))} triageAnswers={triageAnswers} onTriage={(id, value) => setTriageAnswers((current) => ({ ...current, [id]: value }))} lifecycleAnswers={lifecycleAnswers} onLifecycle={(id, value) => setLifecycleAnswers((current) => ({ ...current, [id]: value }))} retestAnswers={retestAnswers} onRetest={(id, value) => setRetestAnswers((current) => ({ ...current, [id]: value }))} sequence={sequence} onSequence={setSequence} readout={readout} onReadout={setReadout} />}
      {activeLesson === "defect-exit-gate" && <DefectExit artifacts={artifacts} onToggle={(item) => toggle(setArtifacts, item)} summary={summary} onSummary={setSummary} preview={closurePreview} answers={knowledgeAnswers} onAnswer={(id, value) => setKnowledgeAnswers((current) => ({ ...current, [id]: value }))} />}
    </LearningModuleFrame>
  );
}

function Lead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return <div className={base.lessonLead}><Bug size={23} /><div><small>{eyebrow}</small><strong>{title}</strong></div></div>;
}

function DecisionTable({ items, answers, onAnswer, placeholder = "Select controlled response" }: { items: readonly { id: string; issue: string; correct: string; options: readonly string[] }[]; answers: Answers; onAnswer: (id: string, value: string) => void; placeholder?: string }) {
  return <div className={design.mappingTable}>{items.map((item) => <div className={design.tableRow} key={item.id}><div><strong>{item.id}</strong><small>{item.issue}</small></div><select aria-label={`${item.id} decision`} value={answers[item.id] ?? ""} onChange={(event) => onAnswer(item.id, event.target.value)}><option value="">{placeholder}</option>{item.options.map((option) => <option key={option}>{option}</option>)}</select></div>)}</div>;
}

function DefectFoundations({ selected, onToggle }: { selected: string[]; onToggle: (item: string) => void }) {
  return <><Lead eyebrow="Release-quality governance" title="A defect is an evidenced gap between approved expected behavior and observed behavior in an identifiable release—not every question, request, or preference." /><p className={base.bodyCopy}>Phase 22 consolidates issues from SIT, performance testing, and UAT into one controlled release view. The team must protect requirement and test traceability, distinguish impact severity from scheduling priority, manage fixes across environments, and prevent cutover from inheriting unknown or unauthorized risk.</p><div className={styles.boundaryGrid}>{[["Input", "Accepted UAT release", "Signed expected results, test evidence, known limitations, and open issues"], ["Control", "Authoritative defect process", "Classification, triage, ownership, SLA, fixes, retest, regression, and reconciliation"], ["Output", "Cutover-ready position", "No blocker plus explicit ownership and authorization for every accepted residual risk"]].map(([small, strong, span]) => <article key={small}><small>{small}</small><strong>{strong}</strong><span>{span}</span></article>)}</div><h3 className={base.sectionTitle}>Confirm the operating baseline</h3><div className={design.selectionGrid}>{defectReadinessControls.map((item) => <button className={selected.includes(item) ? design.selectedCard : ""} key={item} onClick={() => onToggle(item)} type="button">{selected.includes(item) ? <CheckCircle2 size={17} /> : <span />}<strong>{item}</strong></button>)}</div><div className={styles.downloadGrid}><a download href={`${packPath}phase-22-defect-management-practice-pack.zip`}><Download size={18} /><span><strong>Complete practice pack</strong><small>All Phase 22 templates</small></span></a><a download href={`${packPath}defect-register.csv`}><Download size={18} /><span><strong>Defect register</strong><small>Controlled working template</small></span></a><a download href={`${packPath}triage-agenda.csv`}><Download size={18} /><span><strong>Triage agenda</strong><small>Decision-focused meeting view</small></span></a><a download href={`${packPath}release-readiness.csv`}><Download size={18} /><span><strong>Readiness control</strong><small>Cutover entry evidence</small></span></a></div></>;
}

function DefectClassification({ answers, onAnswer }: { answers: Answers; onAnswer: (id: string, value: string) => void }) {
  return <><Lead eyebrow="Classify before scheduling" title="Severity reflects business and control impact; priority reflects the governed order in which the team will act." /><div className={styles.definitionGrid}>{[["Severity 1", "Critical", "Security breach, corrupted approved data, financial integrity failure, or no viable planning path"], ["Severity 2", "High", "Material process or calculation failure with major release impact"], ["Severity 3", "Medium", "Localized failure with a controlled workaround and limited exposure"], ["Severity 4", "Low", "Cosmetic or minor usability issue without data, control, or process impact"]].map(([small, strong, span]) => <article key={small}><small>{small}</small><strong>{strong}</strong><span>{span}</span></article>)}</div><DecisionTable items={defectClassificationCases} answers={answers} onAnswer={onAnswer} placeholder="Select classification" /><div className={styles.referenceNote}><AlertTriangle size={20} /><div><strong>Do not lower severity to make a dashboard green</strong><span>Severity changes only when new evidence changes the impact assessment. Release disposition, workaround quality, target timing, and risk acceptance are separate governed decisions.</span></div></div></>;
}

function DefectRecord({ answers, onAnswer }: { answers: Answers; onAnswer: (id: string, value: string) => void }) {
  return <><Lead eyebrow="Reproducible evidence" title="A qualified person who did not observe the original failure must be able to recreate it and compare the same actual and expected results." /><div className={styles.recordFields}>{defectRecordFields.map((field, index) => <article key={field}><span>{String(index + 1).padStart(2, "0")}</span><strong>{field}</strong></article>)}</div><h3 className={base.sectionTitle}>Repair incomplete records</h3><DecisionTable items={defectRecordCases} answers={answers} onAnswer={onAnswer} /><div className={styles.evidenceChain}>{["Requirement", "Test case", "Release/build", "User and POV", "Steps", "Actual", "Expected", "Evidence", "Owner", "Retest"].map((item, index) => <span key={item}>{item}{index < 9 && <ArrowRight size={13} />}</span>)}</div></>;
}

function DefectTriage({ answers, onAnswer }: { answers: Answers; onAnswer: (id: string, value: string) => void }) {
  return <><Lead eyebrow="Decision forum" title="Triage validates the issue, protects the approved baseline, assigns accountable ownership, and decides the next controlled action." /><div className={styles.triageFlow}>{["Validate", "Classify", "Assess impact", "Assign owner", "Set target", "Escalate", "Record decision"].map((item, index) => <article key={item}><span>{index + 1}</span><strong>{item}</strong></article>)}</div><DecisionTable items={defectTriageCases} answers={answers} onAnswer={onAnswer} /><div className={styles.referenceNote}><Users size={20} /><div><strong>Minimum triage roles</strong><span>Release manager, test lead, business owner, relevant functional/technical owner, integration or security owner when affected, and an authorized risk decision-maker. Attendance follows the issue; it is not a standing invitation to everyone.</span></div></div></>;
}

function DefectLifecycle({ stage, onAdvance, answers, onAnswer }: { stage: number; onAdvance: () => void; answers: Answers; onAnswer: (id: string, value: string) => void }) {
  return <><Lead eyebrow="Controlled state transition" title="Status must describe verified state, not optimism. Development completion is not defect closure." /><div className={styles.lifecycleLab}><header><div><GitPullRequestArrow size={20} /><span><small>DEF-022 · double-applied yield</small><strong>{defectLifecycle[stage]}</strong></span></div><b>{stage + 1} / {defectLifecycle.length}</b></header><div className={styles.lifecyclePath}>{defectLifecycle.map((item, index) => <article className={index <= stage ? styles.lifecycleActive : ""} key={item}><span>{index + 1}</span><strong>{item}</strong></article>)}</div><footer><p>{stage === defectLifecycle.length - 1 ? "Independent retest, regression, reconciliation, evidence, and closure authority are complete." : "Advance only after the current state has evidence, an owner, and an authorized next transition."}</p><button disabled={stage === defectLifecycle.length - 1} onClick={onAdvance} type="button">Advance controlled state <ArrowRight size={15} /></button></footer></div><h3 className={base.sectionTitle}>Reject invalid lifecycle behavior</h3><DecisionTable items={invalidLifecycleActions} answers={answers} onAnswer={onAnswer} /></>;
}

function DefectRetest({ answers, onAnswer }: { answers: Answers; onAnswer: (id: string, value: string) => void }) {
  return <><Lead eyebrow="Prove correction without regression" title="Retest confirms the original failure is corrected; regression proves the fix did not damage adjacent business paths or reconciled outputs." /><div className={styles.testLayers}>{[["1", "Exact reproduction", "Same release context, user, POV, steps, data, actual, and expected result"], ["2", "Boundary and negative", "Invalid, zero, missing, maximum, unauthorized, and exception paths"], ["3", "Impacted regression", "Upstream inputs, adjacent rules, downstream modules, workflow, forms, Smart View, and reports"], ["4", "Reconciliation", "Source-to-target totals, cube-to-cube balances, financial integrity, repeatability, and retained evidence"]].map(([id, title, body]) => <article key={id}><span>{id}</span><div><strong>{title}</strong><p>{body}</p></div></article>)}</div><DecisionTable items={defectRetestCases} answers={answers} onAnswer={onAnswer} /></>;
}

function DefectMetrics({ inputs, onInput }: { inputs: ReleaseInputs; onInput: (value: ReleaseInputs) => void }) {
  const ready = Object.values(inputs).every((value) => value === 0);
  const fields: readonly [keyof ReleaseInputs, string][] = [["openSev1", "Open Severity 1"], ["blockingSev2", "Blocking Severity 2"], ["overdue", "Overdue actions"], ["pendingRetests", "Pending release retests"], ["unapprovedDeferrals", "Unapproved deferrals"], ["unreconciled", "Unreconciled results"]];
  return <><Lead eyebrow="Decision-quality metrics" title="Counts create attention only when they are tied to impact, ageing, ownership, evidence, and explicit release criteria." /><div className={styles.metricCards}>{defectMetrics.map(([label, value, meaning]) => <article key={label}><small>{label}</small><strong>{value}</strong><span>{meaning}</span></article>)}</div><div className={styles.releaseLab}><header><div><Activity size={20} /><span><small>Final register snapshot</small><strong>Release-readiness control</strong></span></div><b className={ready ? styles.ready : styles.notReady}>{ready ? "Ready for recommendation" : "Not ready"}</b></header><div className={styles.releaseInputs}>{fields.map(([key, label]) => <label key={key}>{label}<input min={0} type="number" value={inputs[key]} onChange={(event) => onInput({ ...inputs, [key]: Math.max(0, Number(event.target.value)) })} /></label>)}</div><footer><p>Use the register and evidence to resolve values. Do not simply type zero without closure, retest, reconciliation, deferral, or risk-acceptance evidence.</p><button onClick={() => onInput({ openSev1: 0, blockingSev2: 0, overdue: 0, pendingRetests: 0, unapprovedDeferrals: 0, unreconciled: 0 })} type="button"><Check size={15} /> Apply evidence-backed resolved state</button></footer></div></>;
}

function DefectWarRoom({ selected, onToggle }: { selected: string[]; onToggle: (item: string) => void }) {
  return <><Lead eyebrow="Governance walkthrough" title="Run a short, evidence-led defect forum that produces decisions and owned actions—not a line-by-line status recital." /><div className={styles.warRoomAgenda}>{["Context", "Blockers", "Ageing", "Fixes", "Retest", "Deferrals", "Decision"].map((item, index) => <article key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></article>)}</div><h3 className={base.sectionTitle}>Facilitator controls</h3><div className={design.selectionGrid}>{defectWarRoomControls.map((item) => <button className={selected.includes(item) ? design.selectedCard : ""} key={item} onClick={() => onToggle(item)} type="button">{selected.includes(item) ? <CheckCircle2 size={17} /> : <span />}<strong>{item}</strong></button>)}</div><div className={styles.referenceNote}><ClipboardCheck size={20} /><div><strong>Evidence shown in context</strong><span>Open Oracle screens, logs, job details, extracts, or screenshots only when they answer a challenged fact. The register remains the authoritative index linking evidence, ownership, history, and decisions.</span></div></div></>;
}

type HomeworkProps = { active: HomeworkId; onActive: (id: HomeworkId) => void; status: Record<HomeworkId, boolean>; classificationAnswers: Answers; onClassification: (id: string, value: string) => void; recordAnswers: Answers; onRecord: (id: string, value: string) => void; triageAnswers: Answers; onTriage: (id: string, value: string) => void; lifecycleAnswers: Answers; onLifecycle: (id: string, value: string) => void; retestAnswers: Answers; onRetest: (id: string, value: string) => void; sequence: string[]; onSequence: (value: string[]) => void; readout: string; onReadout: (value: string) => void };

function DefectHomework(props: HomeworkProps) {
  const mission = defectHomeworkMissions.find((item) => item.id === props.active) ?? defectHomeworkMissions[0];
  const completed = defectHomeworkMissions.filter((item) => props.status[item.id]).length;
  return <><Lead eyebrow="Applied release challenge" title="Prepare ApexPlan Release Candidate 1 for a defensible defect exit decision using the same register, evidence, and governance rules." /><div className={base.homeworkMissionGrid}>{defectHomeworkMissions.map((item, index) => <button className={`${item.id === props.active ? base.homeworkMissionActive : ""} ${props.status[item.id] ? base.homeworkMissionDone : ""}`} key={item.id} onClick={() => props.onActive(item.id)} type="button"><span>{props.status[item.id] ? <Check size={14} /> : index + 1}</span><div><strong>{item.title}</strong><small>{item.description}</small></div></button>)}</div><div className={base.homeworkProgress}><div><span style={{ width: `${(completed / defectHomeworkMissions.length) * 100}%` }} /></div><strong>{completed} / {defectHomeworkMissions.length} missions ready</strong></div><section className={base.homeworkWorkspace}><header><div><small>Mission {defectHomeworkMissions.findIndex((item) => item.id === props.active) + 1}</small><h3>{mission.title}</h3></div><span>{props.status[props.active] ? "Ready" : "In progress"}</span></header><p className={base.homeworkPurpose}>{mission.description}</p>{props.active === "classify" && <div className={styles.homeworkBody}><DecisionTable items={defectClassificationCases} answers={props.classificationAnswers} onAnswer={props.onClassification} placeholder="Select classification" /></div>}{props.active === "record" && <div className={styles.homeworkBody}><DecisionTable items={defectRecordCases} answers={props.recordAnswers} onAnswer={props.onRecord} /></div>}{props.active === "triage" && <div className={styles.homeworkBody}><DecisionTable items={defectTriageCases} answers={props.triageAnswers} onAnswer={props.onTriage} /></div>}{props.active === "retest" && <div className={styles.homeworkBody}><DecisionTable items={invalidLifecycleActions} answers={props.lifecycleAnswers} onAnswer={props.onLifecycle} /><div className={styles.homeworkSpacer} /><DecisionTable items={defectRetestCases} answers={props.retestAnswers} onAnswer={props.onRetest} /></div>}{props.active === "readout" && <div className={styles.homeworkBody}><div className={styles.sequence}>{defectReadoutSequence.map((item) => <button className={props.sequence.includes(item) ? styles.sequenceDone : ""} disabled={props.sequence.includes(item)} key={item} onClick={() => props.onSequence([...props.sequence, item])} type="button"><span>{props.sequence.includes(item) ? <Check size={14} /> : <PlayCircle size={14} />}</span><strong>{item}</strong></button>)}</div><button className={styles.resetButton} onClick={() => props.onSequence([])} type="button"><RefreshCw size={14} /> Reset sequence</button><label className={base.summaryField}>Release recommendation<textarea rows={6} value={props.readout} onChange={(event) => props.onReadout(event.target.value)} placeholder="State the release/build, register timestamp, blocker position, fixes and retests, regression and reconciliations, deferred risks, owners, approvals, and cutover recommendation." /><small>{props.readout.trim().length} / 240 minimum</small></label></div>}</section></>;
}

function DefectExit({ artifacts, onToggle, summary, onSummary, preview, answers, onAnswer }: { artifacts: string[]; onToggle: (item: string) => void; summary: string; onSummary: (value: string) => void; preview: string; answers: Answers; onAnswer: (id: string, value: string) => void }) {
  return <><Lead eyebrow="Phase 22 exit gate" title="Cutover may begin only from a known defect position with no uncontrolled blocker and explicit authority for every residual risk." /><div className={styles.exitStatement}><Siren size={22} /><div><strong>Defect exit is not “the count looks low.”</strong><span>It is an evidence-backed statement about the exact release, authoritative register, business impact, fixes, retests, regression, reconciliations, deferrals, ownership, approval, and cutover conditions.</span></div></div><h3 className={base.sectionTitle}>Closure package</h3><div className={design.selectionGrid}>{defectArtifacts.map((item) => <button className={artifacts.includes(item) ? design.selectedCard : ""} key={item} onClick={() => onToggle(item)} type="button">{artifacts.includes(item) ? <CheckCircle2 size={17} /> : <span />}<strong>{item}</strong></button>)}</div><label className={base.summaryField}>Authorized closure summary<textarea rows={6} value={summary} onChange={(event) => onSummary(event.target.value)} placeholder="Summarize the release/build, register snapshot, blocker position, closed fixes, retest and regression evidence, reconciliations, deferred risks, owners, target releases, approvals, and recommendation." /><small>{summary.trim().length} / 240 minimum</small></label><div className={base.discoveryPreview}><small>Closure statement preview</small><p>{preview}</p><div><FileCheck2 size={15} /> Traceable defect exit · controlled residual risk · cutover-ready recommendation</div></div><h3 className={base.questionTitle}>Knowledge check</h3><div className={base.quizList}>{defectKnowledgeQuestions.map((question) => <fieldset key={question.id}><legend><span>{question.id.replace("K-", "")}</span>{question.question}</legend>{question.options.map((option) => <label key={option}><input checked={answers[question.id] === option} name={question.id} onChange={() => onAnswer(question.id, option)} type="radio" />{option}</label>)}</fieldset>)}</div><div className={styles.packNote}><BookOpenCheck size={20} /><div><strong>Practice pack</strong><span>Use the downloadable register, triage agenda, and release-readiness control during the lab. Retain completed copies as the learner&apos;s Phase 22 evidence.</span></div></div></>;
}
