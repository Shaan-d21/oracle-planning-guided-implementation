"use client";

import {
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  CircleAlert,
  ClipboardCheck,
  DatabaseZap,
  FileCheck2,
  Info,
  ListChecks,
  Scale,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  monthlyDataReadinessLessons,
  monthlyReadinessQuestions,
  readinessEvidenceItems,
  readinessExceptionCases,
  readinessSourceControls,
  type MonthlyDataReadinessLessonId,
} from "@/content/monthly-data-readiness-module";
import { readTrackProgress, writeTrackProgress } from "@/lib/learning-progress";
import { LearningModuleFrame, type ModuleFeedback } from "./learning-module-frame";
import base from "./discovery-module.module.css";
import styles from "./monthly-data-readiness-module.module.css";

type ReconciliationValues = {
  sourceRows: string;
  loadedRows: string;
  rejectedRows: string;
  sourceUnits: string;
  planUnits: string;
  bookInventory: string;
  excludedInventory: string;
  usableInventory: string;
};

const expectedReconciliation: ReconciliationValues = {
  sourceRows: "576",
  loadedRows: "576",
  rejectedRows: "0",
  sourceUnits: "66240",
  planUnits: "66240",
  bookInventory: "730",
  excludedInventory: "80",
  usableInventory: "650",
};

const releaseConditions = [
  "Cut-off and cycle dates are published",
  "Required sources have named owners",
  "Actuals and opening balances reconcile",
  "Blocking exceptions are resolved or formally governed",
] as const;

const exceptionOptions = [
  "Block release and resolve the 20-unit reconciliation difference",
  "Record the evidence and continue",
  "Correct the opening balance and rerun the reconciliation",
  "Use change control, deploy the approved metadata, refresh, and smoke-test",
] as const;

export function MonthlyDataReadinessModule() {
  const [activeLesson, setActiveLesson] = useState<MonthlyDataReadinessLessonId>("monthly-readiness-purpose");
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<ModuleFeedback>(null);
  const [readinessApproach, setReadinessApproach] = useState("");
  const [conditions, setConditions] = useState<string[]>([]);
  const [sources, setSources] = useState<string[]>([]);
  const [ownershipModel, setOwnershipModel] = useState("");
  const [reconciliation, setReconciliation] = useState<ReconciliationValues>({
    sourceRows: "",
    loadedRows: "",
    rejectedRows: "",
    sourceUnits: "",
    planUnits: "",
    bookInventory: "",
    excludedInventory: "",
    usableInventory: "",
  });
  const [exceptionAnswers, setExceptionAnswers] = useState<Record<string, string>>({});
  const [evidence, setEvidence] = useState<string[]>([]);
  const [readinessMemo, setReadinessMemo] = useState("");
  const [releaseDecision, setReleaseDecision] = useState("");
  const [knowledgeAnswers, setKnowledgeAnswers] = useState<Record<string, number>>({});

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = readTrackProgress("planning-cycle");
      setCompletedLessons(stored.completedLessons);
      const savedLesson = monthlyDataReadinessLessons.find((lesson) => lesson.id === stored.activeLesson);
      if (savedLesson) setActiveLesson(savedLesson.id);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function persist(completed: string[], lesson: MonthlyDataReadinessLessonId) {
    writeTrackProgress("planning-cycle", {
      completedLessons: completed,
      activeLesson: lesson,
      activeModuleId: "planning-cycle-1",
      lastVisited: new Date().toISOString(),
    });
  }

  function goToLesson(id: MonthlyDataReadinessLessonId) {
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

  function toggle(list: string[], item: string, setter: (next: string[]) => void) {
    setter(list.includes(item) ? list.filter((value) => value !== item) : [...list, item]);
  }

  function validateCurrentLesson() {
    if (activeLesson === "monthly-readiness-purpose") {
      if (readinessApproach !== "controlled" || !releaseConditions.every((item) => conditions.includes(item))) {
        setFeedback({ tone: "error", message: "Choose the controlled readiness approach and confirm all four release conditions." });
        return;
      }
      markComplete("The readiness gate is correctly positioned before baseline and planning activity begins.");
      return;
    }

    if (activeLesson === "monthly-readiness-sources") {
      if (!readinessSourceControls.every((item) => sources.includes(item.id)) || ownershipModel !== "named") {
        setFeedback({ tone: "error", message: "Include every required source package and use a named business owner for each input and control total." });
        return;
      }
      markComplete("The monthly source inventory is complete, owned, time-stamped, and ready for reconciliation.");
      return;
    }

    if (activeLesson === "monthly-readiness-reconcile") {
      const reconciles = Object.entries(expectedReconciliation).every(([key, value]) => reconciliation[key as keyof ReconciliationValues].trim() === value);
      if (!reconciles) {
        setFeedback({ tone: "error", message: "Recheck the control totals. 576 rows and 66,240 units must load with zero rejects; usable opening inventory is 730 less 80 blocked units = 650." });
        return;
      }
      markComplete("Actuals and opening inventory reconcile to the approved Apex training-case control totals.");
      return;
    }

    if (activeLesson === "monthly-readiness-exceptions") {
      const correct = readinessExceptionCases.every((item) => exceptionAnswers[item.id] === item.correct);
      if (!correct) {
        setFeedback({ tone: "error", message: "Review each exception. Material data or metadata differences must be corrected and retested before release." });
        return;
      }
      markComplete("Exceptions are classified using business impact, correction, rerun, and evidence requirements.");
      return;
    }

    if (activeLesson === "monthly-readiness-rehearsal") {
      if (!readinessEvidenceItems.every((item) => evidence.includes(item)) || readinessMemo.trim().length < 160) {
        setFeedback({ tone: "error", message: "Complete the eight-item evidence pack and write a readiness memo of at least 160 characters covering status, exceptions, ownership, and recommendation." });
        return;
      }
      markComplete("The readiness pack contains the evidence and concise operational recommendation needed by the cycle owner.");
      return;
    }

    const precedingLessons = monthlyDataReadinessLessons.slice(0, -1).every((lesson) => completedLessons.includes(lesson.id));
    const score = monthlyReadinessQuestions.filter((question) => knowledgeAnswers[question.id] === question.correct).length;
    if (!precedingLessons || releaseDecision !== "release" || score !== monthlyReadinessQuestions.length) {
      setFeedback({ tone: "error", message: "Complete the first five lessons, choose the evidence-based release decision, and answer all five knowledge checks correctly." });
      return;
    }
    markComplete("Monthly module 01 passed. Controlled data is released to Demand Baseline with a complete readiness evidence pack.");
  }

  return (
    <LearningModuleFrame
      activeLessonId={activeLesson}
      completedLessons={completedLessons}
      dashboardHref="/learn?track=planning-cycle"
      description="Prove that the monthly cycle has complete, owned, reconciled, and governed inputs before demand and planning work begins."
      exitGate="Approve the data-readiness pack and release the cycle to Demand Baseline"
      exitGateIcon={<ClipboardCheck size={18} />}
      feedback={feedback}
      lessons={monthlyDataReadinessLessons}
      onSelectLesson={(id) => goToLesson(id as MonthlyDataReadinessLessonId)}
      onValidate={validateCurrentLesson}
      phase={1}
      stage="Prepare · Monthly operating cycle"
      title="Data Readiness"
      unitLabel="Cycle module"
      validateLabel={activeLesson === "monthly-readiness-gate" ? "Approve readiness gate" : undefined}
    >
      {activeLesson === "monthly-readiness-purpose" && <ReadinessPurpose approach={readinessApproach} conditions={conditions} onApproach={setReadinessApproach} onCondition={(item) => toggle(conditions, item, setConditions)} />}
      {activeLesson === "monthly-readiness-sources" && <SourceOwnership ownership={ownershipModel} selected={sources} onOwnership={setOwnershipModel} onToggle={(item) => toggle(sources, item, setSources)} />}
      {activeLesson === "monthly-readiness-reconcile" && <ActualsReconciliation values={reconciliation} onChange={(field, value) => setReconciliation((current) => ({ ...current, [field]: value }))} />}
      {activeLesson === "monthly-readiness-exceptions" && <ExceptionTriage answers={exceptionAnswers} onAnswer={(id, value) => setExceptionAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "monthly-readiness-rehearsal" && <ReadinessRehearsal evidence={evidence} memo={readinessMemo} onMemo={setReadinessMemo} onToggle={(item) => toggle(evidence, item, setEvidence)} />}
      {activeLesson === "monthly-readiness-gate" && <ReleaseGate answers={knowledgeAnswers} decision={releaseDecision} onAnswer={(id, value) => setKnowledgeAnswers((current) => ({ ...current, [id]: value }))} onDecision={setReleaseDecision} />}
    </LearningModuleFrame>
  );
}

function ReadinessPurpose({ approach, conditions, onApproach, onCondition }: { approach: string; conditions: string[]; onApproach: (value: string) => void; onCondition: (item: string) => void }) {
  const flow = ["Close source period", "Collect controlled inputs", "Load and reconcile", "Resolve exceptions", "Release to planners"];
  return <>
    <div className={base.lessonLead}><CalendarCheck2 size={23} /><div><small>Why this control exists</small><strong>Planning should begin from a known, reconciled starting point—not from whichever file arrived most recently.</strong></div></div>
    <p className={base.bodyCopy}>Data readiness is the first operational gate in every monthly cycle. It confirms the cut-off, approved source versions, data ownership, load completion, control totals, opening positions, and unresolved exceptions before a baseline is calculated or planners enter changes.</p>
    <div className={styles.cycleFlow}>{flow.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong>{index < flow.length - 1 && <ArrowRight size={15} />}</div>)}</div>
    <h3 className={base.sectionTitle}>Choose the operating approach</h3>
    <div className={base.optionList}>
      <label className={approach === "controlled" ? base.selectedOption : ""}><input checked={approach === "controlled"} name="readiness-approach" onChange={() => onApproach("controlled")} type="radio" />Run a named readiness gate using approved sources, control totals, exception ownership, and a recorded release decision.</label>
      <label className={approach === "informal" ? base.selectedOption : ""}><input checked={approach === "informal"} name="readiness-approach" onChange={() => onApproach("informal")} type="radio" />Let each planner decide whether the available data looks complete enough to begin.</label>
    </div>
    <h3 className={base.sectionTitle}>Confirm the minimum release conditions</h3>
    <div className={styles.conditionGrid}>{releaseConditions.map((item) => <button className={conditions.includes(item) ? styles.selected : ""} key={item} onClick={() => onCondition(item)} type="button">{conditions.includes(item) ? <CheckCircle2 size={17} /> : <span />}<strong>{item}</strong></button>)}</div>
  </>;
}

function SourceOwnership({ selected, ownership, onToggle, onOwnership }: { selected: string[]; ownership: string; onToggle: (item: string) => void; onOwnership: (value: string) => void }) {
  return <>
    <div className={base.lessonLead}><DatabaseZap size={23} /><div><small>Controlled input register</small><strong>Confirm what must arrive, who owns it, and what evidence proves that the correct version was supplied.</strong></div></div>
    <div className={styles.sourceGrid}>{readinessSourceControls.map((item) => <button className={selected.includes(item.id) ? styles.selected : ""} key={item.id} onClick={() => onToggle(item.id)} type="button"><span>{selected.includes(item.id) ? <CheckCircle2 size={18} /> : <FileCheck2 size={18} />}</span><div><strong>{item.label}</strong><small>Owner · {item.owner}</small><p>{item.evidence}</p></div></button>)}</div>
    <fieldset className={base.choiceGroup}><legend>How is source ownership governed?</legend><label><input checked={ownership === "named"} name="source-owner" onChange={() => onOwnership("named")} type="radio" />Each source has a named business owner, expected arrival time, version identifier, control total, and escalation route.</label><label><input checked={ownership === "shared"} name="source-owner" onChange={() => onOwnership("shared")} type="radio" />All sources are owned collectively, so any team member may confirm completeness without recording a name.</label></fieldset>
  </>;
}

function ActualsReconciliation({ values, onChange }: { values: ReconciliationValues; onChange: (field: keyof ReconciliationValues, value: string) => void }) {
  const fields: { id: keyof ReconciliationValues; label: string; help: string }[] = [
    { id: "sourceRows", label: "Source rows", help: "Approved sales-history rows" },
    { id: "loadedRows", label: "Loaded rows", help: "Accepted by the integration" },
    { id: "rejectedRows", label: "Rejected rows", help: "Must be explained and resolved" },
    { id: "sourceUnits", label: "Source sales units", help: "Source control total" },
    { id: "planUnits", label: "Plan1 sales units", help: "Target control total" },
    { id: "bookInventory", label: "Book inventory", help: "Physical/accounting opening balance" },
    { id: "excludedInventory", label: "Blocked stock", help: "Unavailable inventory to exclude" },
    { id: "usableInventory", label: "Usable opening inventory", help: "Book stock less blocked stock" },
  ];
  const unitVariance = values.sourceUnits && values.planUnits ? Number(values.planUnits) - Number(values.sourceUnits) : null;
  const expectedUsable = values.bookInventory && values.excludedInventory ? Number(values.bookInventory) - Number(values.excludedInventory) : null;
  return <>
    <div className={base.lessonLead}><Scale size={23} /><div><small>Hands-on control</small><strong>Reconcile the approved Apex case inputs before allowing downstream baseline calculations.</strong></div></div>
    <div className={styles.reconciliationGrid}>{fields.map((field) => <label key={field.id}><span>{field.label}</span><input inputMode="numeric" min="0" onChange={(event) => onChange(field.id, event.target.value)} type="number" value={values[field.id]} /><small>{field.help}</small></label>)}</div>
    <div className={styles.calculationStrip}>
      <article><small>Sales-unit variance</small><strong className={unitVariance === 0 ? styles.good : ""}>{unitVariance === null ? "—" : unitVariance}</strong><span>Plan1 − source; expected 0</span></article>
      <article><small>Calculated usable inventory</small><strong className={expectedUsable === 650 ? styles.good : ""}>{expectedUsable === null ? "—" : expectedUsable}</strong><span>Book − blocked; expected 650</span></article>
      <article><small>Load completion</small><strong className={values.loadedRows === "576" && values.rejectedRows === "0" ? styles.good : ""}>{values.loadedRows || "0"}/{values.sourceRows || "0"}</strong><span>Expected 576 accepted, 0 rejected</span></article>
    </div>
    <div className={base.infoCallout}><Info size={19} /><div><strong>Control principle</strong><p>A successful job status is not a reconciliation. Retain the source total, accepted and rejected counts, target total, variance, reviewer, and timestamp.</p></div></div>
  </>;
}

function ExceptionTriage({ answers, onAnswer }: { answers: Record<string, string>; onAnswer: (id: string, value: string) => void }) {
  return <>
    <div className={base.lessonLead}><CircleAlert size={23} /><div><small>Operational decision practice</small><strong>Decide whether each condition permits release, requires correction, or needs controlled metadata deployment.</strong></div></div>
    <div className={styles.exceptionList}>{readinessExceptionCases.map((item) => <article key={item.id}><div><span>{item.id}</span><p>{item.situation}</p></div><select aria-label={`${item.id} resolution`} onChange={(event) => onAnswer(item.id, event.target.value)} value={answers[item.id] ?? ""}><option value="">Choose the correct control response</option>{exceptionOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select></article>)}</div>
    <div className={styles.ruleCallout}><ShieldCheck size={21} /><div><strong>Materiality does not remove traceability</strong><p>A minor, non-blocking issue may proceed only when the owner, impact, due date, and approval are recorded. Data differences that change planning decisions remain blocking.</p></div></div>
  </>;
}

function ReadinessRehearsal({ evidence, memo, onToggle, onMemo }: { evidence: string[]; memo: string; onToggle: (item: string) => void; onMemo: (value: string) => void }) {
  return <>
    <div className={base.lessonLead}><ListChecks size={23} /><div><small>Applied monthly-cycle assignment</small><strong>Assemble the evidence a process owner would review before opening the planning window.</strong></div></div>
    <div className={styles.evidenceGrid}>{readinessEvidenceItems.map((item) => <button className={evidence.includes(item) ? styles.selected : ""} key={item} onClick={() => onToggle(item)} type="button">{evidence.includes(item) ? <CheckCircle2 size={17} /> : <span />}<strong>{item}</strong></button>)}</div>
    <label className={base.summaryField}>Readiness memo to the FP&amp;A process owner<textarea onChange={(event) => onMemo(event.target.value)} placeholder="Summarize the cycle period and cut-off, source and load status, reconciled totals, exceptions and owners, and your release or hold recommendation." rows={6} value={memo} /></label>
    <small className={base.characterCount}>{memo.trim().length}/160 minimum characters</small>
  </>;
}

function ReleaseGate({ decision, answers, onDecision, onAnswer }: { decision: string; answers: Record<string, number>; onDecision: (value: string) => void; onAnswer: (id: string, value: number) => void }) {
  return <>
    <div className={base.lessonLead}><UserRoundCheck size={23} /><div><small>Monthly release authority</small><strong>Confirm the correct release decision, then demonstrate that you can apply the control principles independently.</strong></div></div>
    <h3 className={base.sectionTitle}>Release decision for the completed Apex readiness case</h3>
    <div className={base.optionList}>
      <label className={decision === "release" ? base.selectedOption : ""}><input checked={decision === "release"} name="release-decision" onChange={() => onDecision("release")} type="radio" />Release to Demand Baseline: all required inputs reconcile, zero rejects remain, usable opening inventory is controlled, and the evidence pack is complete.</label>
      <label className={decision === "hold" ? base.selectedOption : ""}><input checked={decision === "hold"} name="release-decision" onChange={() => onDecision("hold")} type="radio" />Hold the cycle even though all controls pass, because a monthly process should never advance automatically from an approved gate.</label>
    </div>
    <div className={base.quizList}>{monthlyReadinessQuestions.map((question, index) => <fieldset key={question.id}><legend><span>{String(index + 1).padStart(2, "0")}</span>{question.question}</legend>{question.answers.map((answer, answerIndex) => <label key={`${question.id}-${answerIndex}`}><input checked={answers[question.id] === answerIndex} name={question.id} onChange={() => onAnswer(question.id, answerIndex)} type="radio" />{answer}</label>)}</fieldset>)}</div>
  </>;
}
