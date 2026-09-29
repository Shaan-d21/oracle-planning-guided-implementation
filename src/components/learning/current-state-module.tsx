"use client";

import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  Check,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  FileSearch,
  GitBranch,
  Info,
  Network,
  SearchCheck,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from "react";
import {
  baselineKpis,
  currentStateDeliverables,
  currentStateHomeworkMissions,
  currentStateKnowledgeQuestions,
  currentStateLessons,
  currentStatePainPoints,
  currentStateStakeholders,
  homeworkEvidenceCases,
  homeworkHandoffCases,
  interfaceAssessmentDimensions,
  interfaceCases,
  processTraces,
  type CurrentStateHomeworkId,
  type CurrentStateLessonId,
} from "@/content/current-state-module";
import { discoveryLessons } from "@/content/discovery-module";
import { readTrackProgress, writeTrackProgress } from "@/lib/learning-progress";
import base from "./discovery-module.module.css";
import styles from "./current-state-module.module.css";
import { LearningModuleFrame, type ModuleFeedback } from "./learning-module-frame";

type HomeworkTextValue = {
  trace: string;
  rootCause: string;
  readout: string;
};

export function CurrentStateModule() {
  const [activeLesson, setActiveLesson] = useState<CurrentStateLessonId>("current-state-orientation");
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<ModuleFeedback>(null);
  const [selectedStakeholders, setSelectedStakeholders] = useState<string[]>([]);
  const [workshopNotes, setWorkshopNotes] = useState("");
  const [processAnswers, setProcessAnswers] = useState<Record<string, string>>({});
  const [selectedInterface, setSelectedInterface] = useState("erp");
  const [checkedInterfaceItems, setCheckedInterfaceItems] = useState<string[]>([]);
  const [interfaceFinding, setInterfaceFinding] = useState("");
  const [painAnswers, setPainAnswers] = useState<Record<string, string>>({});
  const [priorityAnswers, setPriorityAnswers] = useState<Record<string, string>>({});
  const [baselineAnswer, setBaselineAnswer] = useState("");
  const [activeHomework, setActiveHomework] = useState<CurrentStateHomeworkId>("trace");
  const [homeworkText, setHomeworkText] = useState<HomeworkTextValue>({ trace: "", rootCause: "", readout: "" });
  const [handoffAnswers, setHandoffAnswers] = useState<Record<string, string>>({});
  const [evidenceAnswers, setEvidenceAnswers] = useState<Record<string, string>>({});
  const [selectedDeliverables, setSelectedDeliverables] = useState<string[]>([]);
  const [assessmentSummary, setAssessmentSummary] = useState("");
  const [knowledgeAnswers, setKnowledgeAnswers] = useState<Record<string, number>>({});

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = readTrackProgress("implementation");
      setCompletedLessons(stored.completedLessons);
      const saved = currentStateLessons.find((lesson) => lesson.id === stored.activeLesson);
      if (saved) setActiveLesson(saved.id);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const discoveryCompleted = discoveryLessons.filter((lesson) => completedLessons.includes(lesson.id)).length;
  const prerequisiteDone = discoveryCompleted === discoveryLessons.length;

  const homeworkStatus: Record<CurrentStateHomeworkId, boolean> = {
    trace: homeworkText.trace.trim().length >= 160,
    handoffs: homeworkHandoffCases.every((item) => handoffAnswers[item.id] === item.correct),
    evidence: homeworkEvidenceCases.every((item) => evidenceAnswers[item.id] === item.correct),
    "root-cause": homeworkText.rootCause.trim().length >= 140,
    readout: homeworkText.readout.trim().length >= 180,
  };
  const homeworkReady = Object.values(homeworkStatus).every(Boolean);

  const handoffPreview = useMemo(() => {
    if (selectedDeliverables.length !== currentStateDeliverables.length || assessmentSummary.trim().length < 120) {
      return "Confirm all seven assessment outputs and summarize the evidence-backed AS-IS baseline in at least 120 characters.";
    }
    return `${assessmentSummary.trim()} The agreed findings, root causes, constraints, baselines, risks, and open decisions now form the controlled input to Future-State Design.`;
  }, [assessmentSummary, selectedDeliverables]);

  function persist(nextCompleted: string[], lesson: CurrentStateLessonId) {
    writeTrackProgress("implementation", {
      completedLessons: nextCompleted,
      activeLesson: lesson,
      activeModuleId: "implementation-current-state",
      lastVisited: new Date().toISOString(),
    });
  }

  function goToLesson(id: CurrentStateLessonId) {
    setActiveLesson(id);
    setFeedback(null);
    persist(completedLessons, id);
  }

  function markComplete(message: string) {
    const nextCompleted = completedLessons.includes(activeLesson) ? completedLessons : [...completedLessons, activeLesson];
    setCompletedLessons(nextCompleted);
    persist(nextCompleted, activeLesson);
    setFeedback({ tone: "success", message });
  }

  function toggle(setter: Dispatch<SetStateAction<string[]>>, item: string) {
    setter((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item]);
  }

  function validateLesson() {
    if (activeLesson === "current-state-orientation") {
      markComplete("Foundation complete. You are ready to validate the AS-IS process without designing the solution prematurely.");
      return;
    }
    if (activeLesson === "current-state-stakeholders") {
      if (selectedStakeholders.length < 5 || workshopNotes.trim().length < 120) {
        setFeedback({ tone: "error", message: "Select at least five cross-functional participants and document at least 120 characters covering the process, owner, timing, files or systems, calculations, controls, failures, effort, and requested evidence." });
        return;
      }
      markComplete("Cross-functional workshop coverage and evidence-focused interview notes are ready.");
      return;
    }
    if (activeLesson === "current-state-process") {
      const correct = processTraces.every((item) => processAnswers[item.id] === item.controlGap);
      if (!correct) {
        setFeedback({ tone: "error", message: "Map every process trace to the control gap supported by its observed handoffs. Do not choose a preferred future solution." });
        return;
      }
      markComplete("All four process traces connect observed handoffs to defensible control gaps.");
      return;
    }
    if (activeLesson === "current-state-systems") {
      if (checkedInterfaceItems.length < 6 || interfaceFinding.trim().length < 100) {
        setFeedback({ tone: "error", message: "Inspect at least six interface dimensions and write an evidence-based finding of at least 100 characters covering the observed risk, impact, evidence, and owner." });
        return;
      }
      markComplete("The selected interface has been assessed across ownership, data, processing, failure, recovery, and reconciliation controls.");
      return;
    }
    if (activeLesson === "current-state-pain") {
      const correct = currentStatePainPoints.every((item) => painAnswers[item.id] === item.rootCause && priorityAnswers[item.id] === item.priority);
      if (!correct || baselineAnswer !== "baseline") {
        setFeedback({ tone: "error", message: "Correct every symptom-to-root-cause classification and identify the KPIs as measured AS-IS baselines—not guaranteed benefits." });
        return;
      }
      markComplete("The pain-point register now separates symptoms, impacts, root causes, and measurable baselines.");
      return;
    }
    if (activeLesson === "current-state-homework") {
      if (!homeworkReady) {
        setFeedback({ tone: "error", message: "Complete all five applied homework outputs. Each mission contributes to the final current-state assessment pack." });
        return;
      }
      markComplete("Applied AS-IS homework complete. Your outputs are ready for the assessment readout.");
      return;
    }

    const knowledgeCorrect = currentStateKnowledgeQuestions.every((question) => knowledgeAnswers[question.id] === question.correct);
    if (selectedDeliverables.length !== currentStateDeliverables.length || assessmentSummary.trim().length < 120 || !knowledgeCorrect) {
      setFeedback({ tone: "error", message: "Confirm all seven deliverables, provide a 120-character assessment summary, and answer all five knowledge questions correctly." });
      return;
    }
    markComplete("Phase 02 exit gate passed. The evidence-backed AS-IS baseline is ready for Future-State Design.");
  }

  return (
    <LearningModuleFrame
      activeLessonId={activeLesson}
      completedLessons={completedLessons}
      description="Validate how planning works today, why it breaks, and what the evidence requires the future design to address."
      exitGate="Agreed AS-IS assessment and measurable baseline"
      exitGateIcon={<ClipboardList size={18} />}
      feedback={feedback}
      lessons={currentStateLessons}
      onSelectLesson={(id) => goToLesson(id as CurrentStateLessonId)}
      onValidate={validateLesson}
      phase={2}
      prerequisite={{
        complete: prerequisiteDone,
        message: "Complete Discovery & Requirement Gathering before treating Phase 02 as unlocked.",
        href: "/learn/discovery",
        linkLabel: "Return to Phase 01",
      }}
      stage="Discover · Assessment module"
      title="Current-State Assessment"
    >
      {activeLesson === "current-state-orientation" && <Orientation />}
      {activeLesson === "current-state-stakeholders" && <StakeholderWorkshop selected={selectedStakeholders} onToggle={(item) => toggle(setSelectedStakeholders, item)} notes={workshopNotes} onNotes={setWorkshopNotes} />}
      {activeLesson === "current-state-process" && <ProcessTrace answers={processAnswers} onAnswer={(id, value) => setProcessAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "current-state-systems" && <SystemsAssessment selectedInterface={selectedInterface} onInterface={(value) => { setSelectedInterface(value); setCheckedInterfaceItems([]); setInterfaceFinding(""); }} checks={checkedInterfaceItems} onToggle={(item) => toggle(setCheckedInterfaceItems, item)} finding={interfaceFinding} onFinding={setInterfaceFinding} />}
      {activeLesson === "current-state-pain" && <PainAndBaseline answers={painAnswers} onAnswer={(id, value) => setPainAnswers((current) => ({ ...current, [id]: value }))} priorities={priorityAnswers} onPriority={(id, value) => setPriorityAnswers((current) => ({ ...current, [id]: value }))} baselineAnswer={baselineAnswer} onBaseline={setBaselineAnswer} />}
      {activeLesson === "current-state-homework" && <CurrentStateHomework active={activeHomework} onActive={setActiveHomework} status={homeworkStatus} text={homeworkText} onText={(field, value) => setHomeworkText((current) => ({ ...current, [field]: value }))} handoffAnswers={handoffAnswers} onHandoffAnswer={(id, value) => setHandoffAnswers((current) => ({ ...current, [id]: value }))} evidenceAnswers={evidenceAnswers} onEvidenceAnswer={(id, value) => setEvidenceAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "current-state-evidence" && <AssessmentExitGate deliverables={selectedDeliverables} onDeliverable={(item) => toggle(setSelectedDeliverables, item)} summary={assessmentSummary} onSummary={setAssessmentSummary} answers={knowledgeAnswers} onAnswer={(id, value) => setKnowledgeAnswers((current) => ({ ...current, [id]: value }))} preview={handoffPreview} />}
    </LearningModuleFrame>
  );
}

function Orientation() {
  return <>
    <div className={base.lessonLead}><SearchCheck size={23} /><div><small>Assessment objective</small><strong>Create an agreed, evidence-backed understanding of how planning decisions are made today.</strong></div></div>
    <p className={base.bodyCopy}>Discovery established the business objective, scope, stakeholders, and initial requirements. Phase 2 now tests the hypotheses: follow real transactions and planning cycles, inspect representative files and logs, measure effort and quality, and identify the control gaps the future state must address.</p>
    <div className={styles.phaseComparison}>
      <article><small>Phase 01 · Discovery asks</small><strong>What does the business need and why?</strong><p>Defines objectives, scope, requirement themes, owners, and evidence requests.</p></article>
      <ArrowRight size={20} />
      <article><small>Phase 02 · Assessment proves</small><strong>How does the work actually happen today?</strong><p>Validates process, handoffs, systems, data, rules, controls, pain, and measurable performance.</p></article>
      <ArrowRight size={20} />
      <article><small>Phase 03 · Design decides</small><strong>How should the connected future process work?</strong><p>Uses agreed findings and constraints to design the target operating model.</p></article>
    </div>
    <div className={styles.assessmentChain}>{["People", "Process", "Systems", "Data", "Controls", "Performance"].map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong>{index < 5 && <ArrowRight size={15} />}</div>)}</div>
    <div className={styles.principleGrid}>
      <article><FileSearch size={20} /><strong>Observe</strong><p>Review representative files, reports, logs, approvals, and workarounds.</p></article>
      <article><GitBranch size={20} /><strong>Trace</strong><p>Follow triggers, inputs, transformations, decisions, handoffs, and outputs.</p></article>
      <article><SearchCheck size={20} /><strong>Diagnose</strong><p>Separate a visible symptom from its validated root cause and control gap.</p></article>
      <article><BarChart3 size={20} /><strong>Baseline</strong><p>Measure today&apos;s cycle time, accuracy, manual effort, failures, and quality.</p></article>
    </div>
    <div className={base.infoCallout}><Info size={19} /><div><strong>Consulting boundary</strong><p>Document facts, hypotheses, evidence, and open questions. Do not redesign the process or promise Oracle features during an AS-IS interview.</p></div></div>
  </>;
}

function StakeholderWorkshop({ selected, onToggle, notes, onNotes }: { selected: string[]; onToggle: (value: string) => void; notes: string; onNotes: (value: string) => void }) {
  return <>
    <div className={base.lessonLead}><Users size={23} /><div><small>Evidence workshop plan</small><strong>Cover the people who perform, own, supply, control, and consume the planning process.</strong></div></div>
    <p className={base.bodyCopy}>Select at least five cross-functional participants. An assessment based only on managers or only on system users will miss either governance or operational reality.</p>
    <div className={styles.stakeholderCards}>{currentStateStakeholders.map((item) => <button className={selected.includes(item.id) ? styles.selected : ""} key={item.id} onClick={() => onToggle(item.id)} type="button"><span>{selected.includes(item.id) ? <Check size={15} /> : item.role.split(" ").map((word) => word[0]).join("").slice(0, 2)}</span><div><strong>{item.role}</strong><small>{item.focus}</small><em>Evidence: {item.evidence}</em></div></button>)}</div>
    <div className={styles.workshopSheet}><div><Users size={18} /><strong>Representative AS-IS workshop note</strong></div><p>Capture the trigger and decision, process owner and performer, inputs and grain, system or file, calculation and overrides, timing, reviewer and control, output, failure or workaround, effort consumed, and evidence requested.</p><label>Workshop notes<textarea onChange={(event) => onNotes(event.target.value)} placeholder={"Process observed:\nOwner / performer:\nInputs, systems, files, and calculation:\nHandoffs, control, failure, and effort:\nEvidence requested and open question:"} rows={8} value={notes} /></label><small>{selected.length}/5 participants · {notes.trim().length}/120 minimum characters</small></div>
  </>;
}

function ProcessTrace({ answers, onAnswer }: { answers: Record<string, string>; onAnswer: (id: string, value: string) => void }) {
  const options = [...new Set(processTraces.map((process) => process.controlGap))];
  return <>
    <div className={base.lessonLead}><GitBranch size={23} /><div><small>End-to-end process investigation</small><strong>Trace four connected planning flows and map each observation to the supported control gap.</strong></div></div>
    <p className={base.bodyCopy}>For a real client, each map records the trigger, actor, step, input and output, system or file, timing, decision, handoff, exception, control, and evidence. The exercise below focuses on recognizing the control gap.</p>
    <div className={styles.processTraceList}>{processTraces.map((process) => <article key={process.id}><header><span>{process.name}</span><small>Observed AS-IS trace</small></header><div className={styles.traceFlow}>{process.trace.map((step, index) => <div key={step}><span>{step}</span>{index < process.trace.length - 1 && <ArrowRight size={14} />}</div>)}</div><label>Supported control gap<select aria-label={`${process.name} control gap`} onChange={(event) => onAnswer(process.id, event.target.value)} value={answers[process.id] ?? ""}><option value="">Select the evidence-supported gap</option>{options.map((option) => <option key={option}>{option}</option>)}</select></label></article>)}</div>
    <div className={base.infoCallout}><Info size={19} /><div><strong>Map the real path, including workarounds</strong><p>A documented procedure may show the intended path. An AS-IS map must also show email, offline spreadsheets, duplicate entry, waiting time, rework, and exception handling.</p></div></div>
  </>;
}

function SystemsAssessment({ selectedInterface, onInterface, checks, onToggle, finding, onFinding }: { selectedInterface: string; onInterface: (value: string) => void; checks: string[]; onToggle: (value: string) => void; finding: string; onFinding: (value: string) => void }) {
  const selected = interfaceCases.find((item) => item.id === selectedInterface) ?? interfaceCases[0];
  return <>
    <div className={base.lessonLead}><Network size={23} /><div><small>System and data assessment</small><strong>Understand the current information flow and controls before choosing a future integration pattern.</strong></div></div>
    <div className={styles.systemLandscape}><div>{["ERP actuals", "Sales files", "Plant files", "Cost files"].map((item) => <span key={item}>{item}</span>)}</div><ArrowRight size={21} /><strong>Disconnected Excel planning</strong><ArrowRight size={21} /><strong>FP&amp;A / S&amp;OP</strong></div>
    <div className={styles.interfacePicker}>{interfaceCases.map((item) => <button className={selectedInterface === item.id ? styles.selected : ""} key={item.id} onClick={() => { onInterface(item.id); }} type="button"><strong>{item.name}</strong><small>{item.cadence}</small></button>)}</div>
    <div className={styles.interfaceCard}><div className={styles.interfaceObservation}><small>Observed concern</small><strong>{selected.name}</strong><p>{selected.concern}</p></div><div><small>Mark the dimensions investigated</small><div className={styles.checkGrid}>{interfaceAssessmentDimensions.map((item) => <label className={checks.includes(item) ? styles.checked : ""} key={item}><input checked={checks.includes(item)} onChange={() => onToggle(item)} type="checkbox" /><Check size={14} />{item}</label>)}</div></div><label className={styles.findingField}>Evidence-based interface finding<textarea onChange={(event) => onFinding(event.target.value)} placeholder="State the observed condition, business impact, records or logs that support it, accountable owner, and any open validation question. Do not propose the target tool yet." rows={6} value={finding} /><small>{finding.trim().length}/100 minimum characters · {checks.length}/6 dimensions</small></label></div>
  </>;
}

function PainAndBaseline({ answers, onAnswer, priorities, onPriority, baselineAnswer, onBaseline }: { answers: Record<string, string>; onAnswer: (id: string, value: string) => void; priorities: Record<string, string>; onPriority: (id: string, value: string) => void; baselineAnswer: string; onBaseline: (value: string) => void }) {
  const causes = currentStatePainPoints.map((item) => item.rootCause);
  return <>
    <div className={base.lessonLead}><BarChart3 size={23} /><div><small>Diagnostic register</small><strong>Separate each visible problem from the root cause that evidence must validate.</strong></div></div>
    <div className={styles.diagnosticChain}>{["Observation", "Business impact", "Frequency / scale", "Root-cause hypothesis", "Validation evidence", "Priority"].map((item, index) => <span key={item}>{item}{index < 5 && <ArrowRight size={13} />}</span>)}</div>
    <div className={styles.priorityRule}><strong>Priority rule</strong><span><b>Critical:</b> threatens demand coverage, plant feasibility, inventory position, or profitability integrity.</span><span><b>High:</b> creates material delay, effort, or control exposure but the cycle can continue.</span><span><b>Medium:</b> localized impact with a controlled workaround.</span></div>
    <div className={styles.painTable}><div className={styles.tableHead}><span>ID / Process</span><span>Symptom and impact</span><span>Root cause</span><span>Priority</span></div>{currentStatePainPoints.map((item) => <div className={styles.tableRow} key={item.id}><span><b>{item.id}</b><small>{item.process} · {item.frequency}</small></span><span><b>{item.problem}</b><small>{item.impact}</small></span><label className={styles.tableSelect}><span>Evidence-supported root cause</span><select aria-label={`${item.id} root cause`} onChange={(event) => onAnswer(item.id, event.target.value)} value={answers[item.id] ?? ""}><option value="">Select evidence-supported cause</option>{causes.map((cause) => <option key={cause} value={cause}>{cause}</option>)}</select></label><label className={styles.tableSelect}><span>Priority</span><select aria-label={`${item.id} priority`} onChange={(event) => onPriority(item.id, event.target.value)} value={priorities[item.id] ?? ""}><option value="">Select</option><option>Critical</option><option>High</option><option>Medium</option></select></label></div>)}</div>
    <div className={styles.baselineBlock}><div><small>AS-IS performance baseline</small><strong>What does today look like?</strong></div><div className={styles.kpiGrid}>{baselineKpis.map(([label, value]) => <article key={label}><small>{label}</small><strong>{value}</strong></article>)}</div><fieldset><legend>How should these numbers be used?</legend><label><input checked={baselineAnswer === "baseline"} name="baseline-use" onChange={() => onBaseline("baseline")} type="radio" />As measured AS-IS baselines for target setting and later benefit measurement; each needs a definition, source, period, and owner.</label><label><input checked={baselineAnswer === "promise"} name="baseline-use" onChange={() => onBaseline("promise")} type="radio" />As guaranteed future-state improvement claims before the target design is agreed.</label></fieldset></div>
  </>;
}

function CurrentStateHomework({ active, onActive, status, text, onText, handoffAnswers, onHandoffAnswer, evidenceAnswers, onEvidenceAnswer }: { active: CurrentStateHomeworkId; onActive: (id: CurrentStateHomeworkId) => void; status: Record<CurrentStateHomeworkId, boolean>; text: HomeworkTextValue; onText: (field: keyof HomeworkTextValue, value: string) => void; handoffAnswers: Record<string, string>; onHandoffAnswer: (id: string, value: string) => void; evidenceAnswers: Record<string, string>; onEvidenceAnswer: (id: string, value: string) => void }) {
  const mission = currentStateHomeworkMissions.find((item) => item.id === active) ?? currentStateHomeworkMissions[0];
  const completedCount = currentStateHomeworkMissions.filter((item) => status[item.id]).length;
  const handoffOptions = [...new Set(homeworkHandoffCases.map((item) => item.correct))];
  const evidenceOptions = [...new Set(homeworkEvidenceCases.map((item) => item.correct))];

  return <>
    <div className={base.lessonLead}><BookOpenCheck size={23} /><div><small>Applied homework</small><strong>Produce five connected AS-IS consulting outputs using the Apex case.</strong></div></div>
    <p className={base.bodyCopy}>The reference template contains many interactive exercises across the full implementation lifecycle. Only the five activities that materially build a Phase 2 assessment are included here.</p>
    <div className={base.homeworkMissionGrid}>{currentStateHomeworkMissions.map((item, index) => <button className={`${active === item.id ? base.homeworkMissionActive : ""} ${status[item.id] ? base.homeworkMissionDone : ""}`} key={item.id} onClick={() => onActive(item.id)} type="button"><span>{status[item.id] ? <CheckCircle2 size={17} /> : String(index + 1).padStart(2, "0")}</span><div><strong>{item.title}</strong><small>{item.output}</small></div></button>)}</div>
    <div className={base.homeworkProgress}><div><span style={{ width: `${completedCount / currentStateHomeworkMissions.length * 100}%` }} /></div><strong>{completedCount} of {currentStateHomeworkMissions.length} missions complete</strong></div>
    <section className={base.homeworkWorkspace}>
      <header><div><small>Homework output</small><h3>{mission.title}</h3></div><span>{status[active] ? "Ready" : "In progress"}</span></header>
      <p className={base.homeworkPurpose}>{mission.purpose}</p>
      {active === "trace" && <><div className={base.homeworkPrompt}><strong>Scenario</strong><p>A monthly sales forecast begins with ERP history, moves through separate Market and Channel workbooks, receives manager overrides by email, and is consolidated manually by FP&amp;A.</p></div><label className={base.summaryField}>AS-IS process trace<textarea onChange={(event) => onText("trace", event.target.value)} placeholder={"Include: trigger, input and grain, actors, ordered steps, systems/files, calculation or override, handoffs and wait time, review/control, output, failure/workaround, owner, timing, and evidence."} rows={10} value={text.trace} /><small>{text.trace.trim().length}/160 minimum characters</small></label></>}
      {active === "handoffs" && <><div className={base.homeworkPrompt}><strong>Control breakdown challenge</strong><p>Classify the risk demonstrated by each observation. The classification must follow from the evidence, not from a preferred solution.</p></div><div className={base.homeworkMap}>{homeworkHandoffCases.map((item) => <article key={item.id}><div><span>{item.id}</span><p>{item.observation}</p></div><select aria-label={`${item.id} control breakdown`} onChange={(event) => onHandoffAnswer(item.id, event.target.value)} value={handoffAnswers[item.id] ?? ""}><option value="">Select the supported breakdown</option>{handoffOptions.map((option) => <option key={option}>{option}</option>)}</select></article>)}</div></>}
      {active === "evidence" && <><div className={base.homeworkPrompt}><strong>Finding-to-evidence challenge</strong><p>Choose a proportionate evidence package that tests each suspected finding across representative cycles.</p></div><div className={base.homeworkMap}>{homeworkEvidenceCases.map((item) => <article key={item.id}><div><span>{item.id}</span><p>{item.finding}</p></div><select aria-label={`${item.id} evidence package`} onChange={(event) => onEvidenceAnswer(item.id, event.target.value)} value={evidenceAnswers[item.id] ?? ""}><option value="">Select validation evidence</option>{evidenceOptions.map((option) => <option key={option}>{option}</option>)}</select></article>)}</div></>}
      {active === "root-cause" && <><div className={base.homeworkPrompt}><strong>Hypothesis</strong><p>“Forecast delay is caused by poor user discipline.” Do not accept or reject the statement without evidence.</p></div><label className={base.summaryField}>Root-cause validation plan<textarea onChange={(event) => onText("rootCause", event.target.value)} placeholder={"Document: observed problem and impact, hypothesis, alternative causes, evidence and sample period, stakeholders/owners, validation method, and the rule for confirming or rejecting the hypothesis."} rows={9} value={text.rootCause} /><small>{text.rootCause.trim().length}/140 minimum characters</small></label></>}
      {active === "readout" && <><div className={base.homeworkPrompt}><strong>Readout scenario</strong><p>The sponsor wants Phase 3 to start. Six root causes are supported, two interface owners are still unresolved, and baseline definitions have been agreed but one month of data is missing.</p></div><label className={base.summaryField}>AS-IS assessment readout<textarea onChange={(event) => onText("readout", event.target.value)} placeholder={"Summarize scope and method, evidence reviewed, major process/system/control findings, impact and baseline, validated root causes, priorities, risks, open items with owners, readiness recommendation, and the Phase 3 handoff."} rows={11} value={text.readout} /><small>{text.readout.trim().length}/180 minimum characters</small></label></>}
    </section>
    <div className={base.infoCallout}><Info size={19} /><div><strong>Excluded on purpose</strong><p>Oracle configuration, calculation builds, performance testing, defect triage, UAT, and deployment homework belong in their later lifecycle phases.</p></div></div>
  </>;
}

function AssessmentExitGate({ deliverables, onDeliverable, summary, onSummary, answers, onAnswer, preview }: { deliverables: string[]; onDeliverable: (item: string) => void; summary: string; onSummary: (value: string) => void; answers: Record<string, number>; onAnswer: (id: string, value: number) => void; preview: string }) {
  return <>
    <div className={base.lessonLead}><ClipboardCheck size={23} /><div><small>Phase 02 exit gate</small><strong>Confirm the current process is understood well enough to design the future state without guessing.</strong></div></div>
    <h3 className={base.sectionTitle}>Required assessment deliverables</h3>
    <div className={base.artifactGrid}>{currentStateDeliverables.map((item) => <button className={deliverables.includes(item) ? base.artifactSelected : ""} key={item} onClick={() => onDeliverable(item)} type="button">{deliverables.includes(item) ? <CheckCircle2 size={17} /> : <span />}<strong>{item}</strong></button>)}</div>
    <label className={base.summaryField}>Current-state assessment summary<textarea onChange={(event) => onSummary(event.target.value)} placeholder="Summarize the scope assessed, evidence reviewed, critical process and interface findings, validated root causes, measurable baseline, constraints, risks, unresolved items with owners, and readiness for Future-State Design." rows={7} value={summary} /><small>{summary.trim().length}/120 minimum characters</small></label>
    <h3 className={base.sectionTitle}>Knowledge check</h3>
    <div className={base.quizList}>{currentStateKnowledgeQuestions.map((question, questionIndex) => <fieldset key={question.id}><legend><span>{questionIndex + 1}</span>{question.question}</legend>{question.answers.map((answer, answerIndex) => <label key={answer}><input checked={answers[question.id] === answerIndex} name={question.id} onChange={() => onAnswer(question.id, answerIndex)} type="radio" />{answer}</label>)}</fieldset>)}</div>
    <div className={base.discoveryPreview}><small>Generated Phase 02 handoff</small><p>{preview}</p><div>Discovery hypothesis <ArrowRight size={13} /> AS-IS evidence <ArrowRight size={13} /> Validated finding <ArrowRight size={13} /> Root cause / constraint <ArrowRight size={13} /> Future-State Design</div></div>
  </>;
}
