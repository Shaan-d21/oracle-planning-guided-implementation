"use client";

import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  ClipboardCheck,
  GitBranch,
  Info,
  Layers3,
  Network,
  Scale,
  Target,
  Workflow,
} from "lucide-react";
import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from "react";
import {
  decisionGrainCases,
  designArtifacts,
  exceptionCases,
  futureStateHomeworkMissions,
  futureStateKnowledgeQuestions,
  futureStateLessons,
  homeworkOwnershipCases,
  homeworkSequenceCases,
  outcomeScenarios,
  planningFlow,
  systemOwnershipCases,
  type FutureStateHomeworkId,
  type FutureStateLessonId,
} from "@/content/future-state-module";
import { currentStateLessons } from "@/content/current-state-module";
import { readTrackProgress, writeTrackProgress } from "@/lib/learning-progress";
import base from "./discovery-module.module.css";
import styles from "./future-state-module.module.css";
import { LearningModuleFrame, type ModuleFeedback } from "./learning-module-frame";

type GovernanceValue = { prepare: string; review: string; approve: string; publish: string };
type HomeworkTextValue = { principles: string; exception: string; readout: string };

const sharedContextOptions = ["Scenario", "Version", "Year", "Period"] as const;

export function FutureStateModule() {
  const [activeLesson, setActiveLesson] = useState<FutureStateLessonId>("future-state-orientation");
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<ModuleFeedback>(null);
  const [outcomes, setOutcomes] = useState<Record<string, string>>({});
  const [targetStatement, setTargetStatement] = useState("");
  const [flowChoice, setFlowChoice] = useState("");
  const [ownershipAnswers, setOwnershipAnswers] = useState<Record<string, string>>({});
  const [grainAnswers, setGrainAnswers] = useState<Record<string, string>>({});
  const [sharedContext, setSharedContext] = useState<string[]>([]);
  const [cadence, setCadence] = useState("");
  const [governance, setGovernance] = useState<GovernanceValue>({ prepare: "", review: "", approve: "", publish: "" });
  const [exceptionAnswers, setExceptionAnswers] = useState<Record<string, string>>({});
  const [activeHomework, setActiveHomework] = useState<FutureStateHomeworkId>("principles");
  const [homeworkText, setHomeworkText] = useState<HomeworkTextValue>({ principles: "", exception: "", readout: "" });
  const [sequenceAnswers, setSequenceAnswers] = useState<Record<string, string>>({});
  const [homeworkOwnershipAnswers, setHomeworkOwnershipAnswers] = useState<Record<string, string>>({});
  const [artifacts, setArtifacts] = useState<string[]>([]);
  const [designSummary, setDesignSummary] = useState("");
  const [knowledgeAnswers, setKnowledgeAnswers] = useState<Record<string, number>>({});

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = readTrackProgress("implementation");
      setCompletedLessons(stored.completedLessons);
      const saved = futureStateLessons.find((lesson) => lesson.id === stored.activeLesson);
      if (saved) setActiveLesson(saved.id);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const currentStateComplete = currentStateLessons.every((lesson) => completedLessons.includes(lesson.id));
  const homeworkStatus: Record<FutureStateHomeworkId, boolean> = {
    principles: homeworkText.principles.trim().length >= 180,
    sequence: homeworkSequenceCases.every((item) => sequenceAnswers[item.id] === item.correct),
    ownership: homeworkOwnershipCases.every((item) => homeworkOwnershipAnswers[item.id] === item.correct),
    exception: homeworkText.exception.trim().length >= 180,
    readout: homeworkText.readout.trim().length >= 200,
  };
  const homeworkReady = Object.values(homeworkStatus).every(Boolean);

  const designPreview = useMemo(() => {
    if (artifacts.length !== designArtifacts.length || designSummary.trim().length < 150) {
      return "Confirm all eight future-state outputs and summarize the validated target operating model in at least 150 characters.";
    }
    return `${designSummary.trim()} The agreed process, ownership, decision grains, controls, exceptions, targets, risks, and open decisions now form the controlled input to Requirement Traceability and Solution Architecture.`;
  }, [artifacts, designSummary]);

  function persist(nextCompleted: string[], lesson: FutureStateLessonId) {
    writeTrackProgress("implementation", {
      completedLessons: nextCompleted,
      activeLesson: lesson,
      activeModuleId: "implementation-future-state",
      lastVisited: new Date().toISOString(),
    });
  }

  function goToLesson(id: FutureStateLessonId) {
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
    if (activeLesson === "future-state-orientation") {
      markComplete("Future-state design boundaries confirmed. Start with outcomes, decisions, ownership, controls, and measures—not application screens.");
      return;
    }
    if (activeLesson === "future-state-outcomes") {
      const correct = outcomeScenarios.every((scenario) => outcomes[scenario.id] === scenario.desiredOutcome);
      if (!correct || targetStatement.trim().length < 120) {
        setFeedback({ tone: "error", message: "Map all five findings to their supported outcomes and write a measurable target containing the metric, AS-IS baseline, target, timeframe, owner, and assumption." });
        return;
      }
      markComplete("Validated findings now connect to future-state outcomes and a measurable target structure.");
      return;
    }
    if (activeLesson === "future-state-process") {
      const ownershipCorrect = systemOwnershipCases.every((item) => ownershipAnswers[item.id] === item.correct);
      if (flowChoice !== "connected" || !ownershipCorrect) {
        setFeedback({ tone: "error", message: "Choose the connected planning rule and correctly assign transactional versus planning ownership for every information domain." });
        return;
      }
      markComplete("The target flow connects demand, feasibility, financial impact, approval, and clearly separated information ownership.");
      return;
    }
    if (activeLesson === "future-state-grain") {
      const grainsCorrect = decisionGrainCases.every((item) => grainAnswers[item.id] === item.correct);
      const contextComplete = sharedContextOptions.every((item) => sharedContext.includes(item));
      if (!grainsCorrect || !contextComplete || cadence !== "monthly-weekly") {
        setFeedback({ tone: "error", message: "Map every business decision to its proper grain, include Scenario, Version, Year, and Period as shared context, and select the governed monthly cycle with weekly operational detail." });
        return;
      }
      markComplete("Decision grains and the planning calendar now align commercial, operational, and financial work without prematurely designing dimensions.");
      return;
    }
    if (activeLesson === "future-state-governance") {
      const governanceCorrect = governance.prepare === "planner" && governance.review === "functional" && governance.approve === "sop" && governance.publish === "fpa";
      const exceptionsCorrect = exceptionCases.every((item) => exceptionAnswers[item.id] === item.correct);
      if (!governanceCorrect || !exceptionsCorrect) {
        setFeedback({ tone: "error", message: "Apply segregation of duties and map every exception to a controlled response with an owner, recalculation, evidence, and release condition." });
        return;
      }
      markComplete("The future state defines decision rights, workflow states, exception handling, and approval controls.");
      return;
    }
    if (activeLesson === "future-state-homework") {
      if (!homeworkReady) {
        setFeedback({ tone: "error", message: "Complete all five applied future-state outputs. Each mission contributes to the final design package." });
        return;
      }
      markComplete("Applied future-state homework complete. The outputs are ready for stakeholder validation and packaging.");
      return;
    }

    const knowledgeCorrect = futureStateKnowledgeQuestions.every((question) => knowledgeAnswers[question.id] === question.correct);
    if (artifacts.length !== designArtifacts.length || designSummary.trim().length < 150 || !knowledgeCorrect) {
      setFeedback({ tone: "error", message: "Confirm all eight deliverables, provide a 150-character target operating model summary, and answer all five knowledge questions correctly." });
      return;
    }
    markComplete("Phase 03 exit gate passed. The approved future-state package is ready for Requirement Traceability and Solution Architecture.");
  }

  return (
    <LearningModuleFrame
      activeLessonId={activeLesson}
      completedLessons={completedLessons}
      description="Convert verified AS-IS findings into an integrated, governed, measurable, and stakeholder-approved target operating model."
      exitGate="Approved future-state design package and stakeholder agreement"
      exitGateIcon={<ClipboardCheck size={18} />}
      feedback={feedback}
      lessons={futureStateLessons}
      onSelectLesson={(id) => goToLesson(id as FutureStateLessonId)}
      onValidate={validateLesson}
      phase={3}
      prerequisite={{ complete: currentStateComplete, message: "Complete Current-State Assessment before treating the future-state design as approved work.", href: "/learn/current-state", linkLabel: "Return to Phase 02" }}
      stage="Design · Blueprint module"
      title="Future-State Design"
      validateLabel={activeLesson === "future-state-handoff" ? "Submit design package" : undefined}
    >
      {activeLesson === "future-state-orientation" && <Orientation />}
      {activeLesson === "future-state-outcomes" && <OutcomeTranslation values={outcomes} onChange={(id, value) => setOutcomes((current) => ({ ...current, [id]: value }))} target={targetStatement} onTarget={setTargetStatement} />}
      {activeLesson === "future-state-process" && <ProcessAndOwnership flowChoice={flowChoice} onFlow={setFlowChoice} ownership={ownershipAnswers} onOwnership={(id, value) => setOwnershipAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "future-state-grain" && <GrainAndCalendar answers={grainAnswers} onAnswer={(id, value) => setGrainAnswers((current) => ({ ...current, [id]: value }))} context={sharedContext} onContext={(item) => toggle(setSharedContext, item)} cadence={cadence} onCadence={setCadence} />}
      {activeLesson === "future-state-governance" && <GovernanceAndExceptions value={governance} onChange={setGovernance} answers={exceptionAnswers} onAnswer={(id, answer) => setExceptionAnswers((current) => ({ ...current, [id]: answer }))} />}
      {activeLesson === "future-state-homework" && <FutureStateHomework active={activeHomework} onActive={setActiveHomework} status={homeworkStatus} text={homeworkText} onText={(field, value) => setHomeworkText((current) => ({ ...current, [field]: value }))} sequenceAnswers={sequenceAnswers} onSequenceAnswer={(id, value) => setSequenceAnswers((current) => ({ ...current, [id]: value }))} ownershipAnswers={homeworkOwnershipAnswers} onOwnershipAnswer={(id, value) => setHomeworkOwnershipAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "future-state-handoff" && <DesignHandoff selected={artifacts} onToggle={(item) => toggle(setArtifacts, item)} summary={designSummary} onSummary={setDesignSummary} answers={knowledgeAnswers} onAnswer={(id, value) => setKnowledgeAnswers((current) => ({ ...current, [id]: value }))} preview={designPreview} />}
    </LearningModuleFrame>
  );
}

function Orientation() {
  return <>
    <div className={base.lessonLead}><Target size={23} /><div><small>Design objective</small><strong>Define how planning decisions should work before selecting application objects.</strong></div></div>
    <p className={base.bodyCopy}>Future-state design converts validated findings into a target operating model. It defines outcomes, decision sequence, responsibility, business grain, calendar, exceptions, controls, and measures. Later phases translate these approved decisions into requirements, architecture, dimensions, integrations, rules, forms, security, and reports.</p>
    <div className={styles.boundaryGrid}>
      <article><small>Inputs from Phase 2</small><strong>Evidence-backed findings</strong><p>Root causes, control gaps, baselines, constraints, risks, and open decisions.</p></article>
      <ArrowRight size={18} />
      <article><small>Phase 3 designs</small><strong>Target operating model</strong><p>Process, decisions, ownership, grain, cadence, exceptions, controls, KPIs, and governance.</p></article>
      <ArrowRight size={18} />
      <article><small>Later phases decide</small><strong>Oracle implementation</strong><p>Applications, cubes, dimensions, integrations, calculations, forms, workflow, security, and reports.</p></article>
    </div>
    <div className={styles.principleGrid}>
      <article><Target size={20} /><strong>Outcome-led</strong><p>Every design decision resolves an evidenced problem or enables a measurable business outcome.</p></article>
      <article><Workflow size={20} /><strong>End to end</strong><p>Demand, supply, cost, finance, exceptions, and approval remain connected.</p></article>
      <article><Scale size={20} /><strong>Governed</strong><p>Decision rights, workflow, auditability, reconciliation, and exception ownership are explicit.</p></article>
      <article><Layers3 size={20} /><strong>Technology-neutral first</strong><p>Agree how the business should operate before mapping the design to Oracle components.</p></article>
    </div>
    <div className={base.infoCallout}><Info size={19} /><div><strong>No Oracle screenshot is required in Phase 3</strong><p>This phase produces a business design, not configured Oracle screens. Screenshots become useful when learners must recognize and operate actual application pages; we will review those with you before adding them.</p></div></div>
  </>;
}

function OutcomeTranslation({ values, onChange, target, onTarget }: { values: Record<string, string>; onChange: (id: string, value: string) => void; target: string; onTarget: (value: string) => void }) {
  const options = outcomeScenarios.map((scenario) => scenario.desiredOutcome);
  return <>
    <div className={base.lessonLead}><GitBranch size={23} /><div><small>AS-IS to TO-BE bridge</small><strong>Translate validated findings into outcomes and measurable targets without inventing unsupported benefits.</strong></div></div>
    <div className={styles.outcomeList}>{outcomeScenarios.map((scenario) => <article key={scenario.id}><div><small>Confirmed finding</small><p>{scenario.finding}</p></div><ArrowRight size={18} /><label>Required outcome<select value={values[scenario.id] ?? ""} onChange={(event) => onChange(scenario.id, event.target.value)}><option value="">Select the supported outcome</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label></article>)}</div>
    <label className={styles.targetField}>Write one measurable target<textarea onChange={(event) => onTarget(event.target.value)} placeholder={"Example structure: Improve [metric] from the agreed AS-IS baseline of [value] to [target] by [timeframe], owned by [role], subject to [assumption/dependency]. State how the result will be measured."} rows={6} value={target} /><small>{target.trim().length}/120 minimum characters</small></label>
    <div className={base.infoCallout}><Info size={19} /><div><strong>Outcome is not a feature</strong><p>“Add a dashboard” is a solution idea. “Detect capacity risk before commitment and reduce late replanning” is a business outcome that can guide several design decisions.</p></div></div>
  </>;
}

function ProcessAndOwnership({ flowChoice, onFlow, ownership, onOwnership }: { flowChoice: string; onFlow: (value: string) => void; ownership: Record<string, string>; onOwnership: (id: string, value: string) => void }) {
  const ownershipOptions = systemOwnershipCases.map((item) => item.correct);
  return <>
    <div className={base.lessonLead}><Workflow size={23} /><div><small>Process and information ownership</small><strong>Create one connected planning sequence while preserving authoritative transactional sources.</strong></div></div>
    <div className={styles.flow}>{planningFlow.map((step, index) => <div key={step}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong>{index < planningFlow.length - 1 && <ArrowRight size={14} />}</div>)}</div>
    <fieldset className={styles.choiceGroup}><legend>Which design rule does this process demonstrate?</legend><label><input checked={flowChoice === "connected"} name="flow" onChange={() => onFlow("connected")} type="radio" />Demand, feasibility, operational decisions, financial impact, exceptions, reconciliation, and approval form one governed chain.</label><label><input checked={flowChoice === "parallel"} name="flow" onChange={() => onFlow("parallel")} type="radio" />Every function approves an independent plan and Finance manually reconciles differences afterward.</label></fieldset>
    <h3 className={base.sectionTitle}>Assign conceptual information ownership</h3>
    <div className={styles.ownershipList}>{systemOwnershipCases.map((item) => <article key={item.id}><div><span>{item.id.toUpperCase()}</span><p>{item.information}</p></div><select aria-label={`${item.id} ownership`} onChange={(event) => onOwnership(item.id, event.target.value)} value={ownership[item.id] ?? ""}><option value="">Select ownership decision</option>{ownershipOptions.map((option) => <option key={option}>{option}</option>)}</select></article>)}</div>
    <div className={base.infoCallout}><Network size={19} /><div><strong>Phase boundary</strong><p>This is business ownership and conceptual flow. Detailed application boundaries, integration patterns, environments, and component choices belong in Solution Architecture.</p></div></div>
  </>;
}

function GrainAndCalendar({ answers, onAnswer, context, onContext, cadence, onCadence }: { answers: Record<string, string>; onAnswer: (id: string, value: string) => void; context: string[]; onContext: (item: string) => void; cadence: string; onCadence: (value: string) => void }) {
  const options = decisionGrainCases.map((item) => item.correct);
  return <>
    <div className={base.lessonLead}><Layers3 size={23} /><div><small>Business decision design</small><strong>Define the grain at which each role must decide—not the final Oracle dimension structure.</strong></div></div>
    <div className={styles.grainList}>{decisionGrainCases.map((item) => <article key={item.id}><div><span>{item.id.toUpperCase()}</span><p>{item.decision}</p></div><select aria-label={`${item.id} decision grain`} onChange={(event) => onAnswer(item.id, event.target.value)} value={answers[item.id] ?? ""}><option value="">Select business decision grain</option>{options.map((option) => <option key={option}>{option}</option>)}</select></article>)}</div>
    <h3 className={base.sectionTitle}>Shared planning context</h3>
    <div className={styles.checkGrid}>{sharedContextOptions.map((item) => <label className={context.includes(item) ? styles.selected : ""} key={item}><input checked={context.includes(item)} onChange={() => onContext(item)} type="checkbox" />{context.includes(item) ? <CheckCircle2 size={16} /> : <span />}{item}</label>)}</div>
    <fieldset className={styles.choiceGroup}><legend>Decision calendar</legend><label><input checked={cadence === "monthly-weekly"} name="cadence" onChange={() => onCadence("monthly-weekly")} type="radio" />Monthly governed S&amp;OP cycle with weekly operational detail, exception review, clear cutoffs, and defined publish dates.</label><label><input checked={cadence === "annual"} name="cadence" onChange={() => onCadence("annual")} type="radio" />Annual planning only, with no operational replanning or exception cadence.</label></fieldset>
    <div className={base.infoCallout}><Info size={19} /><div><strong>Decision grain comes before dimension design</strong><p>Here the business agrees who decides at which level and cadence. Phase 6 later evaluates hierarchies, dimensionality, sparsity, aggregation, valid intersections, and application performance.</p></div></div>
  </>;
}

function GovernanceAndExceptions({ value, onChange, answers, onAnswer }: { value: GovernanceValue; onChange: (value: GovernanceValue) => void; answers: Record<string, string>; onAnswer: (id: string, value: string) => void }) {
  const fields = [
    ["prepare", "Prepare working plan", [["", "Select owner"], ["planner", "Assigned planner"], ["executive", "Executive committee"]]],
    ["review", "Review exceptions", [["", "Select owner"], ["functional", "Functional process owners"], ["system", "System administrator"]]],
    ["approve", "Approve integrated plan", [["", "Select owner"], ["sop", "S&OP governance forum"], ["planner", "Individual planner"]]],
    ["publish", "Reconcile and publish", [["", "Select owner"], ["fpa", "FP&A / Planning process owner"], ["developer", "Implementation developer"]]],
  ] as const;
  const exceptionOptions = exceptionCases.map((item) => item.correct);
  return <>
    <div className={base.lessonLead}><Scale size={23} /><div><small>Decision rights and control design</small><strong>Define the normal workflow and the controlled response when tolerances, data, or feasibility fail.</strong></div></div>
    <div className={styles.governanceGrid}>{fields.map(([key, label, options], index) => <article key={key}><span>{index + 1}</span><label>{label}<select value={value[key]} onChange={(event) => onChange({ ...value, [key]: event.target.value })}>{options.map(([optionValue, optionLabel]) => <option key={optionValue} value={optionValue}>{optionLabel}</option>)}</select></label></article>)}</div>
    <div className={styles.workflowStates}>{["Working", "Submitted", "Under review", "Rework requested", "Approved", "Locked", "Published"].map((item, index) => <span key={item}>{item}{index < 6 && <ArrowRight size={12} />}</span>)}</div>
    <h3 className={base.sectionTitle}>Design the exception response</h3>
    <div className={styles.exceptionList}>{exceptionCases.map((item) => <article key={item.id}><div><span>{item.id}</span><p>{item.condition}</p></div><select aria-label={`${item.id} exception response`} onChange={(event) => onAnswer(item.id, event.target.value)} value={answers[item.id] ?? ""}><option value="">Select controlled response</option>{exceptionOptions.map((option) => <option key={option}>{option}</option>)}</select></article>)}</div>
    <div className={base.infoCallout}><Info size={19} /><div><strong>Segregation of duties</strong><p>A material planning change should not be silently prepared, approved, and published by the same person. The design must retain owner, comments, status, timestamps, reconciliation, and approval evidence.</p></div></div>
  </>;
}

function FutureStateHomework({ active, onActive, status, text, onText, sequenceAnswers, onSequenceAnswer, ownershipAnswers, onOwnershipAnswer }: { active: FutureStateHomeworkId; onActive: (id: FutureStateHomeworkId) => void; status: Record<FutureStateHomeworkId, boolean>; text: HomeworkTextValue; onText: (field: keyof HomeworkTextValue, value: string) => void; sequenceAnswers: Record<string, string>; onSequenceAnswer: (id: string, value: string) => void; ownershipAnswers: Record<string, string>; onOwnershipAnswer: (id: string, value: string) => void }) {
  const mission = futureStateHomeworkMissions.find((item) => item.id === active) ?? futureStateHomeworkMissions[0];
  const completedCount = futureStateHomeworkMissions.filter((item) => status[item.id]).length;
  const sequenceOptions = homeworkSequenceCases.map((item) => item.correct);
  const ownershipOptions = homeworkOwnershipCases.map((item) => item.correct);
  return <>
    <div className={base.lessonLead}><BookOpenCheck size={23} /><div><small>Applied homework</small><strong>Produce five connected future-state design outputs using the NovaDrive case.</strong></div></div>
    <p className={base.bodyCopy}>These missions practise operating-model design. Configuration, cube architecture, metadata, forms, rules, and screenshots remain outside this phase.</p>
    <div className={base.homeworkMissionGrid}>{futureStateHomeworkMissions.map((item, index) => <button className={`${active === item.id ? base.homeworkMissionActive : ""} ${status[item.id] ? base.homeworkMissionDone : ""}`} key={item.id} onClick={() => onActive(item.id)} type="button"><span>{status[item.id] ? <CheckCircle2 size={17} /> : String(index + 1).padStart(2, "0")}</span><div><strong>{item.title}</strong><small>{item.output}</small></div></button>)}</div>
    <div className={base.homeworkProgress}><div><span style={{ width: `${completedCount / futureStateHomeworkMissions.length * 100}%` }} /></div><strong>{completedCount} of {futureStateHomeworkMissions.length} missions complete</strong></div>
    <section className={base.homeworkWorkspace}>
      <header><div><small>Homework output</small><h3>{mission.title}</h3></div><span>{status[active] ? "Ready" : "In progress"}</span></header>
      <p className={base.homeworkPurpose}>{mission.purpose}</p>
      {active === "principles" && <><div className={base.homeworkPrompt}><strong>Confirmed assessment themes</strong><p>Conflicting forecasts, fixed inventory policy, late capacity checks, stale cost drivers, and manual financial reconciliation.</p></div><label className={base.summaryField}>Future-state design principles<textarea onChange={(event) => onText("principles", event.target.value)} placeholder={"Write five concise rules. For each: reference the finding, state the future-state principle, name the business outcome or control, and explain how later design decisions will be evaluated against it."} rows={11} value={text.principles} /><small>{text.principles.trim().length}/180 minimum characters</small></label></>}
      {active === "sequence" && <><div className={base.homeworkPrompt}><strong>Connected-planning checkpoints</strong><p>Place each checkpoint in the business sequence. The numbers represent dependency order, not an application workflow configuration.</p></div><div className={base.homeworkMap}>{homeworkSequenceCases.map((item) => <article key={item.id}><div><span>{item.id}</span><p>{item.checkpoint}</p></div><select aria-label={`${item.id} sequence`} onChange={(event) => onSequenceAnswer(item.id, event.target.value)} value={sequenceAnswers[item.id] ?? ""}><option value="">Select sequence position</option>{sequenceOptions.map((option) => <option key={option}>{option}</option>)}</select></article>)}</div></>}
      {active === "ownership" && <><div className={base.homeworkPrompt}><strong>Ownership decisions</strong><p>Distinguish the authoritative execution source from the governed planning workspace and its responsibilities.</p></div><div className={base.homeworkMap}>{homeworkOwnershipCases.map((item) => <article key={item.id}><div><span>{item.id}</span><p>{item.information}</p></div><select aria-label={`${item.id} ownership`} onChange={(event) => onOwnershipAnswer(item.id, event.target.value)} value={ownershipAnswers[item.id] ?? ""}><option value="">Select ownership decision</option>{ownershipOptions.map((option) => <option key={option}>{option}</option>)}</select></article>)}</div></>}
      {active === "exception" && <><div className={base.homeworkPrompt}><strong>Scenario</strong><p>Pune Line 03 is forecast at 114% capacity after consensus demand is submitted, and the increase improves revenue but reduces margin because overtime is required.</p></div><label className={base.summaryField}>Future-state exception path<textarea onChange={(event) => onText("exception", event.target.value)} placeholder={"Define trigger and tolerance, detection point, owner, permitted responses, scenario comparison, downstream recalculation, workflow/approval, evidence, escalation, and the condition for closing and publishing."} rows={11} value={text.exception} /><small>{text.exception.trim().length}/180 minimum characters</small></label></>}
      {active === "readout" && <><div className={base.homeworkPrompt}><strong>Validation workshop</strong><p>Sales supports the flow, Operations questions weekly capacity ownership, Finance has not accepted the cash target, and IT needs the conceptual ownership decisions before architecture begins.</p></div><label className={base.summaryField}>Design validation readout<textarea onChange={(event) => onText("readout", event.target.value)} placeholder={"Summarize outcomes, target process, decision grains, calendar, ownership, governance, exceptions, controls, KPIs, decisions accepted, unresolved items with owners/dates, risks, validation participants, and readiness recommendation."} rows={12} value={text.readout} /><small>{text.readout.trim().length}/200 minimum characters</small></label></>}
    </section>
    <div className={base.infoCallout}><Info size={19} /><div><strong>Five tasks are sufficient here</strong><p>They cover the judgement needed for Phase 3. Detailed requirement tracing, architecture, dimension design, configuration, and testing are intentionally left to their own lifecycle phases.</p></div></div>
  </>;
}

function DesignHandoff({ selected, onToggle, summary, onSummary, answers, onAnswer, preview }: { selected: string[]; onToggle: (item: string) => void; summary: string; onSummary: (value: string) => void; answers: Record<string, number>; onAnswer: (id: string, value: number) => void; preview: string }) {
  return <>
    <div className={base.lessonLead}><ClipboardCheck size={23} /><div><small>Phase 03 exit gate</small><strong>Confirm the target operating model is complete, internally consistent, validated, and controlled.</strong></div></div>
    <h3 className={base.sectionTitle}>Required design deliverables</h3>
    <div className={styles.artifactGrid}>{designArtifacts.map((item) => <button className={selected.includes(item) ? styles.selectedArtifact : ""} key={item} onClick={() => onToggle(item)} type="button">{selected.includes(item) ? <CheckCircle2 size={17} /> : <span />}<strong>{item}</strong></button>)}</div>
    <label className={styles.summaryField}>Target operating model summary<textarea rows={8} value={summary} onChange={(event) => onSummary(event.target.value)} placeholder="Summarize outcomes and targets, connected process, ownership, decision grains, calendar, governance, exceptions, controls, reconciliation, KPIs, assumptions, risks, open items, validation participants, and stakeholder agreement..." /><small>{summary.trim().length}/150 minimum characters</small></label>
    <h3 className={base.sectionTitle}>Knowledge check</h3>
    <div className={base.quizList}>{futureStateKnowledgeQuestions.map((question, questionIndex) => <fieldset key={question.id}><legend><span>{questionIndex + 1}</span>{question.question}</legend>{question.answers.map((answer, answerIndex) => <label key={answer}><input checked={answers[question.id] === answerIndex} name={question.id} onChange={() => onAnswer(question.id, answerIndex)} type="radio" />{answer}</label>)}</fieldset>)}</div>
    <div className={styles.preview}><small>Generated Phase 03 handoff</small><p>{preview}</p><div>AS-IS evidence <ArrowRight size={13} /> Future-state decisions <ArrowRight size={13} /> Requirement Traceability <ArrowRight size={13} /> Solution Architecture <ArrowRight size={13} /> Detailed design</div></div>
  </>;
}
