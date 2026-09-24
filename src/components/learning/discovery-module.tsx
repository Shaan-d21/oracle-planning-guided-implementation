"use client";

import {
  ArrowRight,
  BookOpenCheck,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  Info,
  Lightbulb,
  MessageSquareText,
  Network,
  Route,
  Target,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from "react";
import {
  designInfluenceCases,
  discoveryArtifacts,
  discoveryEvidence,
  discoveryHomeworkMissions,
  discoveryKnowledgeQuestions,
  discoveryLessons,
  discoveryQuestionCases,
  homeworkEvidenceCases,
  homeworkStakeholderCases,
  scopeItems,
  stakeholders,
  type DiscoveryHomeworkId,
  type DiscoveryLessonId,
} from "@/content/discovery-module";
import { readTrackProgress, writeTrackProgress } from "@/lib/learning-progress";
import { LearningModuleFrame, type ModuleFeedback } from "./learning-module-frame";
import styles from "./discovery-module.module.css";

type RequirementValue = {
  owner: string;
  decision: string;
  grain: string;
  sourceLogic: string;
  control: string;
  acceptance: string;
};

type HomeworkTextValue = {
  charter: string;
  requirement: string;
  readout: string;
};

const emptyRequirement: RequirementValue = {
  owner: "",
  decision: "",
  grain: "",
  sourceLogic: "",
  control: "",
  acceptance: "",
};

export function DiscoveryModule() {
  const [activeLesson, setActiveLesson] = useState<DiscoveryLessonId>("orientation");
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<ModuleFeedback>(null);
  const [businessObjective, setBusinessObjective] = useState("");
  const [selectedScope, setSelectedScope] = useState<string[]>([]);
  const [successMeasure, setSuccessMeasure] = useState("");
  const [constraintNote, setConstraintNote] = useState("");
  const [selectedStakeholders, setSelectedStakeholders] = useState<string[]>([]);
  const [workshopApproach, setWorkshopApproach] = useState("");
  const [questionAnswers, setQuestionAnswers] = useState<Record<string, string>>({});
  const [selectedEvidence, setSelectedEvidence] = useState<string[]>([]);
  const [discoveryNote, setDiscoveryNote] = useState("");
  const [designAnswers, setDesignAnswers] = useState<Record<string, string>>({});
  const [requirement, setRequirement] = useState<RequirementValue>(emptyRequirement);
  const [activeHomework, setActiveHomework] = useState<DiscoveryHomeworkId>("charter");
  const [homeworkText, setHomeworkText] = useState<HomeworkTextValue>({ charter: "", requirement: "", readout: "" });
  const [homeworkStakeholderAnswers, setHomeworkStakeholderAnswers] = useState<Record<string, string>>({});
  const [homeworkEvidenceAnswers, setHomeworkEvidenceAnswers] = useState<Record<string, string>>({});
  const [selectedArtifacts, setSelectedArtifacts] = useState<string[]>([]);
  const [discoverySummary, setDiscoverySummary] = useState("");
  const [knowledgeAnswers, setKnowledgeAnswers] = useState<Record<string, number>>({});

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = readTrackProgress("implementation");
      setCompletedLessons(stored.completedLessons);
      const savedLesson = discoveryLessons.find((lesson) => lesson.id === stored.activeLesson);
      if (savedLesson) setActiveLesson(savedLesson.id);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const requirementReady = Object.values(requirement).every((value) => value.trim().length >= 3);
  const generatedRequirement = useMemo(() => {
    if (!requirementReady) return "Complete all six fields to generate an owned and testable requirement.";
    return `Enable ${requirement.owner} to ${requirement.decision} at ${requirement.grain}, using ${requirement.sourceLogic}, under ${requirement.control}. Acceptance: ${requirement.acceptance}.`;
  }, [requirement, requirementReady]);

  const handoffPreview = useMemo(() => {
    if (selectedArtifacts.length !== discoveryArtifacts.length || discoverySummary.trim().length < 60) {
      return "Complete the seven discovery outputs and summarize the agreed discovery baseline in at least 60 characters.";
    }
    return `${discoverySummary.trim()} The signed discovery pack now provides scope, stakeholders, evidence requests, requirements, decisions, assumptions, and open items for Current-State Assessment.`;
  }, [discoverySummary, selectedArtifacts]);

  const homeworkStatus: Record<DiscoveryHomeworkId, boolean> = {
    charter: homeworkText.charter.trim().length >= 120,
    stakeholders: homeworkStakeholderCases.every((item) => homeworkStakeholderAnswers[item.id] === item.correct),
    evidence: homeworkEvidenceCases.every((item) => homeworkEvidenceAnswers[item.id] === item.correct),
    requirement: homeworkText.requirement.trim().length >= 140,
    readout: homeworkText.readout.trim().length >= 180,
  };
  const homeworkReady = Object.values(homeworkStatus).every(Boolean);

  function persist(completed: string[], lesson: DiscoveryLessonId) {
    writeTrackProgress("implementation", {
      completedLessons: completed,
      activeLesson: lesson,
      activeModuleId: "implementation-discovery",
      lastVisited: new Date().toISOString(),
    });
  }

  function goToLesson(id: DiscoveryLessonId) {
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

  function validateCurrentLesson() {
    if (activeLesson === "orientation") {
      markComplete("Discovery purpose confirmed. Begin with business decisions and evidence—not application configuration.");
      return;
    }

    if (activeLesson === "company-briefing") {
      const completeScope = scopeItems.every((item) => selectedScope.includes(item));
      if (businessObjective !== "connected" || !completeScope || successMeasure !== "measurable" || constraintNote.trim().length < 30) {
        setFeedback({ tone: "error", message: "Confirm the integrated objective, complete scope, measurable success approach, and one meaningful constraint or assumption." });
        return;
      }
      markComplete("Business context, scope, success measures, and initial constraints are ready for stakeholder validation.");
      return;
    }

    if (activeLesson === "stakeholder-interview") {
      const completeMap = stakeholders.every((person) => selectedStakeholders.includes(person.id));
      if (!completeMap || workshopApproach !== "mixed") {
        setFeedback({ tone: "error", message: "Include every required business and technology group, then use focused interviews plus cross-functional validation workshops." });
        return;
      }
      markComplete("The stakeholder register covers sponsorship, process ownership, operational expertise, finance, data, and technology.");
      return;
    }

    if (activeLesson === "current-state") {
      const correctQuestions = discoveryQuestionCases.every((item) => questionAnswers[item.id] === item.correct);
      const completeEvidence = discoveryEvidence.every((item) => selectedEvidence.includes(item));
      if (!correctQuestions || !completeEvidence || discoveryNote.trim().length < 40) {
        setFeedback({ tone: "error", message: "Classify every question, request all six evidence groups, and capture a note that separates known facts from hypotheses and open questions." });
        return;
      }
      markComplete("The discovery question set and evidence request are complete without prematurely confirming root causes.");
      return;
    }

    if (activeLesson === "requirement-studio") {
      const correctDesignLinks = designInfluenceCases.every((item) => designAnswers[item.id] === item.correct);
      if (!correctDesignLinks || !requirementReady) {
        setFeedback({ tone: "error", message: "Map every requirement to the correct design area and complete all fields in the requirement builder." });
        return;
      }
      markComplete("Requirements are testable and clearly linked to the Planning design decisions they will influence.");
      return;
    }

    if (activeLesson === "discovery-homework") {
      if (!homeworkReady) {
        setFeedback({ tone: "error", message: "Complete all five applied missions. Each one contributes a usable section of the Discovery pack." });
        return;
      }
      markComplete("Applied homework complete. The charter, ownership map, evidence plan, testable requirement, and client readout are ready for the final exit review.");
      return;
    }

    const score = discoveryKnowledgeQuestions.filter((question) => knowledgeAnswers[question.id] === question.correct).length;
    if (selectedArtifacts.length !== discoveryArtifacts.length || discoverySummary.trim().length < 60 || score !== discoveryKnowledgeQuestions.length) {
      setFeedback({ tone: "error", message: "Complete all discovery outputs, provide a meaningful summary, and answer all five knowledge checks correctly." });
      return;
    }
    markComplete("Phase 01 exit gate passed. The signed discovery pack is ready for evidence-based Current-State Assessment.");
  }

  return (
    <LearningModuleFrame
      activeLessonId={activeLesson}
      completedLessons={completedLessons}
      description="Understand and scope an Oracle Planning implementation, then produce an evidence-backed Discovery pack before design begins."
      exitGate="Complete applied homework and approve the Discovery pack"
      exitGateIcon={<ClipboardCheck size={18} />}
      feedback={feedback}
      lessons={discoveryLessons}
      onSelectLesson={(id) => goToLesson(id as DiscoveryLessonId)}
      onValidate={validateCurrentLesson}
      phase={1}
      stage="Discover · Foundation module"
      title="Discovery & Requirement Gathering"
      validateLabel={activeLesson === "knowledge-check" ? "Approve discovery pack" : undefined}
    >
      {activeLesson === "orientation" && <OrientationLesson />}
      {activeLesson === "company-briefing" && <BusinessContext objective={businessObjective} onObjective={setBusinessObjective} scope={selectedScope} onScope={(item) => toggle(setSelectedScope, item)} success={successMeasure} onSuccess={setSuccessMeasure} constraint={constraintNote} onConstraint={setConstraintNote} />}
      {activeLesson === "stakeholder-interview" && <StakeholderPlan selected={selectedStakeholders} onToggle={(item) => toggle(setSelectedStakeholders, item)} approach={workshopApproach} onApproach={setWorkshopApproach} />}
      {activeLesson === "current-state" && <QuestionsAndEvidence answers={questionAnswers} onAnswer={(id, value) => setQuestionAnswers((current) => ({ ...current, [id]: value }))} evidence={selectedEvidence} onEvidence={(item) => toggle(setSelectedEvidence, item)} note={discoveryNote} onNote={setDiscoveryNote} />}
      {activeLesson === "requirement-studio" && <RequirementsToDesign answers={designAnswers} onAnswer={(id, value) => setDesignAnswers((current) => ({ ...current, [id]: value }))} requirement={requirement} onRequirement={setRequirement} preview={generatedRequirement} />}
      {activeLesson === "discovery-homework" && <DiscoveryHomeworkLab active={activeHomework} onActive={setActiveHomework} status={homeworkStatus} text={homeworkText} onText={(field, value) => setHomeworkText((current) => ({ ...current, [field]: value }))} stakeholderAnswers={homeworkStakeholderAnswers} onStakeholderAnswer={(id, value) => setHomeworkStakeholderAnswers((current) => ({ ...current, [id]: value }))} evidenceAnswers={homeworkEvidenceAnswers} onEvidenceAnswer={(id, value) => setHomeworkEvidenceAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "knowledge-check" && <DiscoveryExitGate artifacts={selectedArtifacts} onArtifact={(item) => toggle(setSelectedArtifacts, item)} summary={discoverySummary} onSummary={setDiscoverySummary} answers={knowledgeAnswers} onAnswer={(id, value) => setKnowledgeAnswers((current) => ({ ...current, [id]: value }))} preview={handoffPreview} />}
    </LearningModuleFrame>
  );
}

function OrientationLesson() {
  const flow = ["Business context", "Scope", "Stakeholders", "Questions & evidence", "Requirements", "Applied homework", "Discovery sign-off"];
  return <>
    <div className={styles.lessonLead}><Target size={23} /><div><small>Why Discovery exists</small><strong>Create a shared, evidence-seeking understanding of the business before proposing an Oracle Planning design.</strong></div></div>
    <p className={styles.bodyCopy}>Discovery is the first controlled project phase. The team learns which decisions the client needs to improve, how planning works, who owns it, what data and controls exist, and what success means. It reduces the risk of building technically correct screens that solve the wrong business problem.</p>
    <div className={styles.discoveryFlow}>{flow.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong>{index < flow.length - 1 && <ArrowRight size={14} />}</div>)}</div>
    <div className={styles.discoveryPrinciples}>
      <article><Target size={20} /><strong>Outcome-led</strong><p>Start with decisions, measurable outcomes, and pain—not a list of screens.</p></article>
      <article><Users size={20} /><strong>Cross-functional</strong><p>Include business owners, planners, operations, finance, and technology.</p></article>
      <article><FileSearch size={20} /><strong>Evidence-seeking</strong><p>Treat stakeholder statements as inputs to validate, not automatic facts.</p></article>
      <article><BookOpenCheck size={20} /><strong>Controlled output</strong><p>Record owners, assumptions, decisions, open questions, and approvals.</p></article>
    </div>
    <div className={styles.boundaryGrid}><div><strong>Discovery does</strong><span>Understand, scope, question, collect, document, prioritize, and obtain agreement.</span></div><div><strong>Discovery does not</strong><span>Configure dimensions, promise a solution, or confirm root causes without evidence.</span></div></div>
    <div className={styles.infoCallout}><Info size={19} /><div><strong>Why there is no Oracle screenshot in this phase</strong><p>The application does not exist yet. Discovery uses interviews, workshops, evidence requests, requirement catalogues, and decision logs. Product walkthroughs begin when an approved design is configured.</p></div></div>
  </>;
}

function BusinessContext({ objective, onObjective, scope, onScope, success, onSuccess, constraint, onConstraint }: { objective: string; onObjective: (value: string) => void; scope: string[]; onScope: (item: string) => void; success: string; onSuccess: (value: string) => void; constraint: string; onConstraint: (value: string) => void }) {
  return <>
    <div className={styles.companyCard}><Building2 size={25} /><div><small>Workshop case</small><h3>NovaDrive Appliances Ltd.</h3><p>A multi-plant manufacturer planning demand, sales, inventory, production, capacity, material, cost, margin, and financial impact across CRM, ERP, WMS, MES, spreadsheets, and finance.</p></div></div>
    <h3 className={styles.sectionTitle}>1. Confirm the business objective</h3>
    <div className={styles.optionList}><label className={objective === "connected" ? styles.selectedOption : ""}><input checked={objective === "connected"} name="objective" onChange={() => onObjective("connected")} type="radio" />Create one governed process connecting commercial, operational, and financial planning decisions.</label><label className={objective === "screens" ? styles.selectedOption : ""}><input checked={objective === "screens"} name="objective" onChange={() => onObjective("screens")} type="radio" />Recreate every existing spreadsheet as an Oracle form without reviewing the process.</label></div>
    <h3 className={styles.sectionTitle}>2. Define the initial scope</h3>
    <div className={styles.scopeGrid}>{scopeItems.map((item) => <button className={scope.includes(item) ? styles.scopeSelected : ""} key={item} onClick={() => onScope(item)} type="button">{scope.includes(item) ? <CheckCircle2 size={17} /> : <span />}<strong>{item}</strong></button>)}</div>
    <h3 className={styles.sectionTitle}>3. Agree how success will be measured</h3>
    <div className={styles.optionList}><label className={success === "measurable" ? styles.selectedOption : ""}><input checked={success === "measurable"} name="success" onChange={() => onSuccess("measurable")} type="radio" />Baseline measures such as forecast accuracy, cycle time, inventory, service, reconciliation effort, and decision latency—with owners and target dates.</label><label className={success === "subjective" ? styles.selectedOption : ""}><input checked={success === "subjective"} name="success" onChange={() => onSuccess("subjective")} type="radio" />Declare success when users say the new screens look better.</label></div>
    <label className={styles.noteField}>Initial constraint or assumption<textarea onChange={(event) => onConstraint(event.target.value)} placeholder="Example: ERP remains the system of record for actuals; plant capacity is available weekly; final data owners are still to be confirmed." rows={3} value={constraint} /></label>
    <small className={styles.characterCount}>{constraint.trim().length}/30 minimum characters</small>
  </>;
}

function StakeholderPlan({ selected, onToggle, approach, onApproach }: { selected: string[]; onToggle: (id: string) => void; approach: string; onApproach: (value: string) => void }) {
  return <>
    <div className={styles.lessonLead}><Users size={23} /><div><small>Who participates</small><strong>Build a stakeholder map that combines decision authority, process knowledge, data ownership, and technical constraints.</strong></div></div>
    <div className={styles.stakeholderPlanGrid}>{stakeholders.map((person) => <button className={selected.includes(person.id) ? styles.stakeholderSelected : ""} key={person.id} onClick={() => onToggle(person.id)} type="button"><span>{selected.includes(person.id) ? <CheckCircle2 size={17} /> : person.role.slice(0, 2).toUpperCase()}</span><div><strong>{person.role}</strong><small>{person.focus}</small><p><b>Ask:</b> {person.question}</p><p><b>Capture:</b> {person.output}</p></div></button>)}</div>
    <fieldset className={styles.choiceGroup}><legend>How should the workshops be organized?</legend><label><input checked={approach === "mixed"} name="workshop-approach" onChange={() => onApproach("mixed")} type="radio" />Use focused interviews for detailed facts, followed by cross-functional workshops to resolve differences and validate shared decisions.</label><label><input checked={approach === "single"} name="workshop-approach" onChange={() => onApproach("single")} type="radio" />Ask one senior stakeholder to describe every department and approve all requirements alone.</label></fieldset>
    <div className={styles.infoCallout}><Info size={19} /><div><strong>Beginner rule</strong><p>The loudest stakeholder is not automatically the process owner or data owner. Record who decides, who performs the work, who supplies data, and who approves the output.</p></div></div>
  </>;
}

function QuestionsAndEvidence({ answers, onAnswer, evidence, onEvidence, note, onNote }: { answers: Record<string, string>; onAnswer: (id: string, value: string) => void; evidence: string[]; onEvidence: (item: string) => void; note: string; onNote: (value: string) => void }) {
  const options = discoveryQuestionCases.map((item) => item.correct);
  return <>
    <div className={styles.lessonLead}><MessageSquareText size={23} /><div><small>How Discovery is conducted</small><strong>Ask open, decision-focused questions and request evidence that can validate the answers later.</strong></div></div>
    <div className={styles.questionMatrix}><div className={styles.tableHead}><span>Client question</span><span>Information being collected</span></div>{discoveryQuestionCases.map((item) => <div className={styles.tableRow} key={item.id}><div><strong>{item.id}</strong><small>{item.question}</small></div><select aria-label={`${item.id} information area`} value={answers[item.id] ?? ""} onChange={(event) => onAnswer(item.id, event.target.value)}><option value="">Select information area</option>{options.map((option) => <option key={option}>{option}</option>)}</select></div>)}</div>
    <h3 className={styles.sectionTitle}>Request representative evidence</h3>
    <div className={styles.evidenceRequestGrid}>{discoveryEvidence.map((item) => <button className={evidence.includes(item) ? styles.evidenceSelected : ""} key={item} onClick={() => onEvidence(item)} type="button">{evidence.includes(item) ? <CheckCircle2 size={17} /> : <span />}<strong>{item}</strong></button>)}</div>
    <label className={styles.noteField}>Discovery note<textarea onChange={(event) => onNote(event.target.value)} placeholder="Record one known fact, the supporting evidence or evidence request, the owner, and one open question or hypothesis that Phase 2 must validate." rows={4} value={note} /></label>
    <small className={styles.characterCount}>{note.trim().length}/40 minimum characters</small>
    <div className={styles.hypothesisCallout}><Lightbulb size={19} /><div><strong>Fact, hypothesis, and requirement are different</strong><p><b>Fact:</b> supported by evidence. <b>Hypothesis:</b> suspected explanation requiring validation. <b>Requirement:</b> an owned, testable need derived from an approved outcome.</p></div></div>
  </>;
}

function RequirementsToDesign({ answers, onAnswer, requirement, onRequirement, preview }: { answers: Record<string, string>; onAnswer: (id: string, value: string) => void; requirement: RequirementValue; onRequirement: (value: RequirementValue) => void; preview: string }) {
  const options = designInfluenceCases.map((item) => item.correct);
  function update(field: keyof RequirementValue, value: string) { onRequirement({ ...requirement, [field]: value }); }
  return <>
    <div className={styles.lessonLead}><Route size={23} /><div><small>Discovery-to-design bridge</small><strong>Understand how business requirements later shape Oracle Planning objects and controls.</strong></div></div>
    <div className={styles.designMap}>{designInfluenceCases.map((item) => <article key={item.id}><div><span>{item.id}</span><p>{item.requirement}</p></div><ArrowRight size={16} /><select aria-label={`${item.id} design influence`} value={answers[item.id] ?? ""} onChange={(event) => onAnswer(item.id, event.target.value)}><option value="">Select design area</option>{options.map((option) => <option key={option}>{option}</option>)}</select></article>)}</div>
    <h3 className={styles.sectionTitle}>Write one testable requirement</h3>
    <div className={styles.requirementForm}>
      <label>Business owner<input onChange={(event) => update("owner", event.target.value)} placeholder="Regional Sales Manager" value={requirement.owner} /></label>
      <label>Decision or action<input onChange={(event) => update("decision", event.target.value)} placeholder="adjust the unit forecast" value={requirement.decision} /></label>
      <label>Planning grain<input onChange={(event) => update("grain", event.target.value)} placeholder="Product × Customer × Month" value={requirement.grain} /></label>
      <label>Source data or logic<input onChange={(event) => update("sourceLogic", event.target.value)} placeholder="approved history and growth assumptions" value={requirement.sourceLogic} /></label>
      <label>Workflow or control<input onChange={(event) => update("control", event.target.value)} placeholder="manager approval with comments and audit history" value={requirement.control} /></label>
      <label>Acceptance criteria<input onChange={(event) => update("acceptance", event.target.value)} placeholder="approved overrides recalculate and publish correctly" value={requirement.acceptance} /></label>
    </div>
    <div className={styles.requirementPreview}><small>Generated requirement</small><p>{preview}</p><div>{["Owner", "Action", "Grain", "Source / logic", "Control", "Acceptance"].map((item, index) => <span key={item}>{item}{index < 5 && <ArrowRight size={13} />}</span>)}</div></div>
    <div className={styles.infoCallout}><Network size={19} /><div><strong>Requirements influence design; they do not preselect it</strong><p>Discovery explains what the business needs. Later phases decide the appropriate dimensions, plan types, integrations, rules, forms, security, workflow, and reporting architecture.</p></div></div>
  </>;
}

function DiscoveryHomeworkLab({ active, onActive, status, text, onText, stakeholderAnswers, onStakeholderAnswer, evidenceAnswers, onEvidenceAnswer }: { active: DiscoveryHomeworkId; onActive: (id: DiscoveryHomeworkId) => void; status: Record<DiscoveryHomeworkId, boolean>; text: HomeworkTextValue; onText: (field: keyof HomeworkTextValue, value: string) => void; stakeholderAnswers: Record<string, string>; onStakeholderAnswer: (id: string, value: string) => void; evidenceAnswers: Record<string, string>; onEvidenceAnswer: (id: string, value: string) => void }) {
  const mission = discoveryHomeworkMissions.find((item) => item.id === active) ?? discoveryHomeworkMissions[0];
  const completedCount = discoveryHomeworkMissions.filter((item) => status[item.id]).length;
  const stakeholderOptions = stakeholders.map((item) => item.role);
  const evidenceOptions = homeworkEvidenceCases.map((item) => item.correct);

  return <>
    <div className={styles.lessonLead}><BookOpenCheck size={23} /><div><small>Applied homework</small><strong>Produce five connected consulting outputs using the NovaDrive case—not twenty unrelated practice questions.</strong></div></div>
    <p className={styles.bodyCopy}>These missions are intentionally completed after the guided lessons. Each task applies Discovery judgement independently and produces material that belongs in the final Discovery pack.</p>
    <div className={styles.homeworkMissionGrid}>{discoveryHomeworkMissions.map((item, index) => <button className={`${active === item.id ? styles.homeworkMissionActive : ""} ${status[item.id] ? styles.homeworkMissionDone : ""}`} key={item.id} onClick={() => onActive(item.id)} type="button"><span>{status[item.id] ? <CheckCircle2 size={17} /> : String(index + 1).padStart(2, "0")}</span><div><strong>{item.title}</strong><small>{item.output}</small></div></button>)}</div>
    <div className={styles.homeworkProgress}><div><span style={{ width: `${completedCount / discoveryHomeworkMissions.length * 100}%` }} /></div><strong>{completedCount} of {discoveryHomeworkMissions.length} missions complete</strong></div>
    <section className={styles.homeworkWorkspace}>
      <header><div><small>Homework output</small><h3>{mission.title}</h3></div><span>{status[active] ? "Ready" : "In progress"}</span></header>
      <p className={styles.homeworkPurpose}>{mission.purpose}</p>

      {active === "charter" && <><div className={styles.homeworkPrompt}><strong>Client request</strong><p>NovaDrive wants to replace disconnected planning spreadsheets with Oracle Planning. Establish what the project is trying to improve before discussing application configuration.</p></div><label className={styles.summaryField}>Discovery charter draft<textarea onChange={(event) => onText("charter", event.target.value)} placeholder={"Objective:\nIn scope:\nOut of scope:\nMeasurable success:\nKnown constraint or assumption:\nDecision owner:"} rows={9} value={text.charter} /><small>{text.charter.trim().length}/120 minimum characters</small></label></>}

      {active === "stakeholders" && <><div className={styles.homeworkPrompt}><strong>Ownership challenge</strong><p>Select the stakeholder who must lead each topic. Other participants may contribute, but one accountable owner is required.</p></div><div className={styles.homeworkMap}>{homeworkStakeholderCases.map((item) => <article key={item.id}><div><span>{item.id}</span><p>{item.topic}</p></div><select aria-label={`${item.id} accountable stakeholder`} onChange={(event) => onStakeholderAnswer(item.id, event.target.value)} value={stakeholderAnswers[item.id] ?? ""}><option value="">Select accountable stakeholder</option>{stakeholderOptions.map((option) => <option key={option}>{option}</option>)}</select></article>)}</div></>}

      {active === "evidence" && <><div className={styles.homeworkPrompt}><strong>Stakeholder claims are not automatic facts</strong><p>Choose the evidence package that can validate each claim during the Current-State Assessment.</p></div><div className={styles.homeworkMap}>{homeworkEvidenceCases.map((item) => <article key={item.id}><div><span>{item.id}</span><p>{item.claim}</p></div><select aria-label={`${item.id} evidence package`} onChange={(event) => onEvidenceAnswer(item.id, event.target.value)} value={evidenceAnswers[item.id] ?? ""}><option value="">Select validation evidence</option>{evidenceOptions.map((option) => <option key={option}>{option}</option>)}</select></article>)}</div></>}

      {active === "requirement" && <><div className={styles.homeworkPrompt}><strong>Vague client request</strong><p>“Give regional sales managers a screen where they can change the forecast whenever needed.” Rewrite this without selecting the final Oracle screen design.</p></div><label className={styles.summaryField}>Testable requirement<textarea onChange={(event) => onText("requirement", event.target.value)} placeholder={"Include: business owner, decision/action, Product × Customer × Channel × Month grain, source or logic, approval/audit control, and measurable acceptance criteria."} rows={8} value={text.requirement} /><small>{text.requirement.trim().length}/140 minimum characters</small></label></>}

      {active === "readout" && <><div className={styles.homeworkPrompt}><strong>Client readout scenario</strong><p>The sponsor wants design to begin, but data ownership and two interface assumptions remain unresolved. Provide a clear recommendation without inventing answers.</p></div><label className={styles.summaryField}>Discovery readout and handoff<textarea onChange={(event) => onText("readout", event.target.value)} placeholder={"Summarize objective and scope, stakeholders consulted, evidence received/requested, requirement themes, decisions, assumptions, risks, unresolved questions, owners, and what Phase 2 must validate."} rows={10} value={text.readout} /><small>{text.readout.trim().length}/180 minimum characters</small></label></>}
    </section>
    <div className={styles.infoCallout}><Info size={19} /><div><strong>Why only five homework missions?</strong><p>Phase 1 should practise Discovery outputs. Performance tests, calculation simulations, defect triage, reconciliation, configuration, and deployment exercises from the reference template belong in later lifecycle phases.</p></div></div>
  </>;
}

function DiscoveryExitGate({ artifacts, onArtifact, summary, onSummary, answers, onAnswer, preview }: { artifacts: string[]; onArtifact: (item: string) => void; summary: string; onSummary: (value: string) => void; answers: Record<string, number>; onAnswer: (id: string, value: number) => void; preview: string }) {
  return <>
    <div className={styles.lessonLead}><ClipboardCheck size={23} /><div><small>Discovery exit gate</small><strong>Confirm that the team can begin Current-State Assessment without guessing the project purpose or evidence needed.</strong></div></div>
    <div className={styles.artifactGrid}>{discoveryArtifacts.map((item) => <button className={artifacts.includes(item) ? styles.artifactSelected : ""} key={item} onClick={() => onArtifact(item)} type="button">{artifacts.includes(item) ? <CheckCircle2 size={17} /> : <span />}<strong>{item}</strong></button>)}</div>
    <label className={styles.summaryField}>Discovery readout summary<textarea onChange={(event) => onSummary(event.target.value)} placeholder="Summarize the business objective, scope, stakeholders, success measures, evidence requested, requirement themes, assumptions, risks, and unresolved questions..." rows={5} value={summary} /><small>{summary.trim().length}/60 minimum characters</small></label>
    <div className={styles.quizList}>{discoveryKnowledgeQuestions.map((question, questionIndex) => <fieldset key={question.id}><legend><span>{questionIndex + 1}</span>{question.question}</legend>{question.answers.map((answer, answerIndex) => <label key={answer}><input checked={answers[question.id] === answerIndex} name={question.id} onChange={() => onAnswer(question.id, answerIndex)} type="radio" />{answer}</label>)}</fieldset>)}</div>
    <div className={styles.discoveryPreview}><small>Generated Phase 01 handoff</small><p>{preview}</p><div>Discovery <ArrowRight size={13} /> Evidence validation <ArrowRight size={13} /> Confirmed current state <ArrowRight size={13} /> Future-state design</div></div>
  </>;
}
