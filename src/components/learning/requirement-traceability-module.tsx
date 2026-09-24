"use client";

import {
  AlertTriangle,
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  GitBranch,
  History,
  Info,
  Link2,
  ListChecks,
  ShieldCheck,
  Target,
  UserRoundCheck,
} from "lucide-react";
import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from "react";
import { futureStateLessons } from "@/content/future-state-module";
import {
  coverageCases,
  homeworkCoverageCases,
  homeworkTraceCases,
  priorityCases,
  requirementClassificationCases,
  requirementQualityCases,
  requirementTraceabilityLessons,
  rtmArtifacts,
  rtmHomeworkMissions,
  rtmKnowledgeQuestions,
  traceabilityCases,
  type RequirementTraceabilityLessonId,
  type RtmHomeworkId,
} from "@/content/requirement-traceability-module";
import { readTrackProgress, writeTrackProgress } from "@/lib/learning-progress";
import base from "./discovery-module.module.css";
import { LearningModuleFrame, type ModuleFeedback } from "./learning-module-frame";
import styles from "./requirement-traceability-module.module.css";

type PriorityAnswer = { priority?: string; owner?: string; release?: string };
type HomeworkTextValue = { quality: string; change: string; readout: string };

export function RequirementTraceabilityModule() {
  const [activeLesson, setActiveLesson] = useState<RequirementTraceabilityLessonId>("rtm-orientation");
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<ModuleFeedback>(null);
  const [qualityAnswers, setQualityAnswers] = useState<Record<string, string>>({});
  const [classificationAnswers, setClassificationAnswers] = useState<Record<string, string>>({});
  const [traceAnswers, setTraceAnswers] = useState<Record<string, string>>({});
  const [priorityAnswers, setPriorityAnswers] = useState<Record<string, PriorityAnswer>>({});
  const [selectedGaps, setSelectedGaps] = useState<string[]>([]);
  const [changeControl, setChangeControl] = useState("");
  const [activeHomework, setActiveHomework] = useState<RtmHomeworkId>("quality");
  const [homeworkText, setHomeworkText] = useState<HomeworkTextValue>({ quality: "", change: "", readout: "" });
  const [homeworkTraceAnswers, setHomeworkTraceAnswers] = useState<Record<string, string>>({});
  const [homeworkCoverageAnswers, setHomeworkCoverageAnswers] = useState<Record<string, string>>({});
  const [artifacts, setArtifacts] = useState<string[]>([]);
  const [baselineSummary, setBaselineSummary] = useState("");
  const [knowledgeAnswers, setKnowledgeAnswers] = useState<Record<string, number>>({});

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = readTrackProgress("implementation");
      setCompletedLessons(stored.completedLessons);
      const saved = requirementTraceabilityLessons.find((lesson) => lesson.id === stored.activeLesson);
      if (saved) setActiveLesson(saved.id);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const futureStateComplete = futureStateLessons.every((lesson) => completedLessons.includes(lesson.id));
  const homeworkStatus: Record<RtmHomeworkId, boolean> = {
    quality: homeworkText.quality.trim().length >= 180,
    trace: homeworkTraceCases.every((item) => homeworkTraceAnswers[item.id] === item.correct),
    coverage: homeworkCoverageCases.every((item) => homeworkCoverageAnswers[item.id] === item.correct),
    change: homeworkText.change.trim().length >= 180,
    readout: homeworkText.readout.trim().length >= 200,
  };
  const homeworkReady = Object.values(homeworkStatus).every(Boolean);

  const baselinePreview = useMemo(() => {
    if (artifacts.length !== rtmArtifacts.length || baselineSummary.trim().length < 150) {
      return "Confirm all eight RTM outputs and summarize the approved baseline in at least 150 characters.";
    }
    return `${baselineSummary.trim()} The versioned RTM now controls approved scope, ownership, release assignment, design/build mappings, verification evidence, gaps, and change history for downstream delivery.`;
  }, [artifacts, baselineSummary]);

  function persist(nextCompleted: string[], lesson: RequirementTraceabilityLessonId) {
    writeTrackProgress("implementation", {
      completedLessons: nextCompleted,
      activeLesson: lesson,
      activeModuleId: "implementation-requirement-traceability",
      lastVisited: new Date().toISOString(),
    });
  }

  function goToLesson(id: RequirementTraceabilityLessonId) {
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
    if (activeLesson === "rtm-orientation") {
      markComplete("Traceability foundations confirmed. The RTM will operate as a living scope, coverage, and evidence control.");
      return;
    }
    if (activeLesson === "rtm-quality") {
      const qualityCorrect = requirementQualityCases.every((item) => qualityAnswers[item.id] === item.correct);
      const classificationCorrect = requirementClassificationCases.every((item) => classificationAnswers[item.id] === item.correct);
      if (!qualityCorrect || !classificationCorrect) {
        setFeedback({ tone: "error", message: "Select the testable requirement and correct requirement type for every case. Acceptance must be measurable and appropriate to the requirement." });
        return;
      }
      markComplete("Functional, integration, security, reporting, and non-functional needs are classified and expressed with measurable acceptance.");
      return;
    }
    if (activeLesson === "rtm-chain") {
      const correct = traceabilityCases.every((item) => traceAnswers[item.id] === item.correct);
      if (!correct) {
        setFeedback({ tone: "error", message: "Map each requirement to the correct origin, design, build object, verification evidence, acceptance, and release. Evidence must fit the requirement type." });
        return;
      }
      markComplete("Forward and backward trace chains are valid across functional, integration, and non-functional requirements.");
      return;
    }
    if (activeLesson === "rtm-priority") {
      const correct = priorityCases.every((item) => priorityAnswers[item.id]?.priority === item.correct && priorityAnswers[item.id]?.owner === item.owner && priorityAnswers[item.id]?.release === item.release);
      if (!correct) {
        setFeedback({ tone: "error", message: "Correct the MoSCoW priority, accountable business owner, and release assignment. These are separate governance decisions." });
        return;
      }
      markComplete("Priority, ownership, and release scope are controlled for every requirement.");
      return;
    }
    if (activeLesson === "rtm-coverage") {
      const blockingIds = coverageCases.filter((item) => item.blocking).map((item) => item.id);
      const correctGaps = selectedGaps.length === blockingIds.length && blockingIds.every((id) => selectedGaps.includes(id));
      if (!correctGaps || changeControl !== "impact") {
        setFeedback({ tone: "error", message: "Select only the lifecycle gaps that block readiness and require impact analysis, approval, versioning, trace updates, and regression planning before a baseline changes." });
        return;
      }
      markComplete("Blocking coverage gaps, orphan items, and the controlled change process are correctly identified.");
      return;
    }
    if (activeLesson === "rtm-homework") {
      if (!homeworkReady) {
        setFeedback({ tone: "error", message: "Complete all five applied RTM outputs. Each mission contributes to the baseline review." });
        return;
      }
      markComplete("Applied RTM homework complete. The outputs are ready for coverage review and baseline approval.");
      return;
    }

    const knowledgeCorrect = rtmKnowledgeQuestions.every((question) => knowledgeAnswers[question.id] === question.correct);
    if (artifacts.length !== rtmArtifacts.length || baselineSummary.trim().length < 150 || !knowledgeCorrect) {
      setFeedback({ tone: "error", message: "Confirm all eight RTM outputs, provide a 150-character baseline summary, and answer all five knowledge questions correctly." });
      return;
    }
    markComplete("Phase 04 exit gate passed. The baselined RTM is ready to govern Solution Architecture and delivery coverage.");
  }

  function updatePriority(id: string, field: keyof PriorityAnswer, value: string) {
    setPriorityAnswers((current) => ({ ...current, [id]: { ...current[id], [field]: value } }));
  }

  return (
    <LearningModuleFrame
      activeLessonId={activeLesson}
      completedLessons={completedLessons}
      description="Control approved scope and prove that every requirement is owned, designed, built, verified, accepted, released, and changed through governance."
      exitGate="Approved, versioned, and coverage-reviewed RTM baseline"
      exitGateIcon={<ClipboardCheck size={18} />}
      feedback={feedback}
      lessons={requirementTraceabilityLessons}
      onSelectLesson={(id) => goToLesson(id as RequirementTraceabilityLessonId)}
      onValidate={validateLesson}
      phase={4}
      prerequisite={{ complete: futureStateComplete, message: "Complete Future-State Design before baselining detailed requirements and coverage.", href: "/learn/future-state", linkLabel: "Return to Phase 03" }}
      stage="Design · Governance module"
      title="Requirement Traceability"
      validateLabel={activeLesson === "rtm-handoff" ? "Baseline RTM" : undefined}
    >
      {activeLesson === "rtm-orientation" && <Orientation />}
      {activeLesson === "rtm-quality" && <QualityLab values={qualityAnswers} onChange={(id, value) => setQualityAnswers((current) => ({ ...current, [id]: value }))} classifications={classificationAnswers} onClassification={(id, value) => setClassificationAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "rtm-chain" && <TraceBuilder values={traceAnswers} onChange={(id, value) => setTraceAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "rtm-priority" && <PriorityOwnership values={priorityAnswers} onChange={updatePriority} />}
      {activeLesson === "rtm-coverage" && <CoverageControl selected={selectedGaps} onToggle={(id) => toggle(setSelectedGaps, id)} changeControl={changeControl} onChangeControl={setChangeControl} />}
      {activeLesson === "rtm-homework" && <RtmHomework active={activeHomework} onActive={setActiveHomework} status={homeworkStatus} text={homeworkText} onText={(field, value) => setHomeworkText((current) => ({ ...current, [field]: value }))} traceAnswers={homeworkTraceAnswers} onTraceAnswer={(id, value) => setHomeworkTraceAnswers((current) => ({ ...current, [id]: value }))} coverageAnswers={homeworkCoverageAnswers} onCoverageAnswer={(id, value) => setHomeworkCoverageAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "rtm-handoff" && <RtmHandoff selected={artifacts} onToggle={(item) => toggle(setArtifacts, item)} summary={baselineSummary} onSummary={setBaselineSummary} answers={knowledgeAnswers} onAnswer={(id, value) => setKnowledgeAnswers((current) => ({ ...current, [id]: value }))} preview={baselinePreview} />}
    </LearningModuleFrame>
  );
}

function Orientation() {
  const chain = ["Objective / finding", "Requirement", "Design", "Build", "Verification", "Acceptance", "Release", "Change history"];
  const fields = ["Unique ID", "Type and source", "Requirement statement", "Owner", "Priority / release", "Acceptance criteria", "Design mapping", "Build mapping", "Test / evidence", "Status", "Version", "Decision / comment"];
  return <>
    <div className={base.lessonLead}><Link2 size={23} /><div><small>Governance objective</small><strong>Use the RTM as a living scope and evidence control—not a spreadsheet created after testing.</strong></div></div>
    <p className={base.bodyCopy}>Traceability connects why the project is changing to what is approved, how it is designed and built, how it is verified, who accepts it, and which release contains it. It exposes missing links and unauthorized work before they become defects or scope disputes.</p>
    <div className={styles.traceChain}>{chain.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong>{index < chain.length - 1 && <ArrowRight size={14} />}</div>)}</div>
    <h3 className={base.sectionTitle}>Minimum RTM row</h3>
    <div className={styles.fieldGrid}>{fields.map((item, index) => <span key={item}><b>{String(index + 1).padStart(2, "0")}</b>{item}</span>)}</div>
    <div className={styles.principleGrid}>
      <article><Target size={20} /><strong>Forward trace</strong><p>Every approved requirement has implementation and verification coverage.</p></article>
      <article><GitBranch size={20} /><strong>Backward trace</strong><p>Every design, build, and test item is justified by approved scope.</p></article>
      <article><FileCheck2 size={20} /><strong>Evidence fit</strong><p>Acceptance evidence matches the requirement type and measurable criteria.</p></article>
      <article><History size={20} /><strong>Controlled history</strong><p>Baselined changes preserve impact, decision, version, and regression coverage.</p></article>
    </div>
    <div className={base.infoCallout}><Info size={19} /><div><strong>No Oracle screenshot is required in Phase 4</strong><p>The learner is governing requirements and evidence references. Actual Oracle screens become relevant only when a later lesson teaches application configuration or operation.</p></div></div>
  </>;
}

function QualityLab({ values, onChange, classifications, onClassification }: { values: Record<string, string>; onChange: (id: string, value: string) => void; classifications: Record<string, string>; onClassification: (id: string, value: string) => void }) {
  const strongOptions = requirementQualityCases.map((item) => item.correct);
  const typeOptions = requirementClassificationCases.map((item) => item.correct);
  return <>
    <div className={base.lessonLead}><ListChecks size={23} /><div><small>Requirement and acceptance quality</small><strong>Make every need specific enough to design and objective enough to verify.</strong></div></div>
    <div className={styles.qualityList}>{requirementQualityCases.map((item) => <article key={item.id}><div><span>{item.id}</span><small>Source need</small><p>{item.source}</p></div><label>Choose the implementation-ready statement<select value={values[item.id] ?? ""} onChange={(event) => onChange(item.id, event.target.value)}><option value="">Select requirement and acceptance criteria</option>{strongOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select></label></article>)}</div>
    <h3 className={base.sectionTitle}>Classify requirements for appropriate design and evidence</h3>
    <div className={styles.classificationList}>{requirementClassificationCases.map((item) => <article key={item.id}><div><span>{item.id}</span><p>{item.statement}</p></div><select aria-label={`${item.id} type`} onChange={(event) => onClassification(item.id, event.target.value)} value={classifications[item.id] ?? ""}><option value="">Select requirement type</option>{typeOptions.map((option) => <option key={option}>{option}</option>)}</select></article>)}</div>
    <div className={base.infoCallout}><Info size={19} /><div><strong>Acceptance criteria are not test steps</strong><p>Criteria define the measurable condition for acceptance. SIT, security, reconciliation, performance, and UAT cases later describe how that condition will be verified.</p></div></div>
  </>;
}

function TraceBuilder({ values, onChange }: { values: Record<string, string>; onChange: (id: string, value: string) => void }) {
  const options = traceabilityCases.map((item) => item.correct);
  return <>
    <div className={base.lessonLead}><GitBranch size={23} /><div><small>RTM lifecycle builder</small><strong>Map each requirement to evidence appropriate to its origin, design, build, verification, acceptance, and release.</strong></div></div>
    <div className={styles.traceTable}><div className={styles.tableHead}><span>ID / requirement</span><span>Origin → design → build → evidence → acceptance → release</span></div>{traceabilityCases.map((item) => <div className={styles.tableRow} key={item.id}><div><strong>{item.id}</strong><small>{item.requirement}</small></div><select aria-label={`${item.id} trace chain`} value={values[item.id] ?? ""} onChange={(event) => onChange(item.id, event.target.value)}><option value="">Select lifecycle mapping</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></div>)}</div>
    <div className={styles.traceDirections}><article><strong>Forward question</strong><p>For this approved requirement, where is it designed, built, verified, accepted, and released?</p></article><article><strong>Backward question</strong><p>Which approved requirement or change justifies this architecture decision, build object, or test?</p></article></div>
    <div className={styles.coverageSummary}><span><CheckCircle2 size={18} /> Approved requirement</span><ArrowRight size={14} /><span>Design</span><ArrowRight size={14} /><span>Build</span><ArrowRight size={14} /><span>Verification evidence</span><ArrowRight size={14} /><span>Business acceptance</span><ArrowRight size={14} /><span>Release</span></div>
  </>;
}

function PriorityOwnership({ values, onChange }: { values: Record<string, PriorityAnswer>; onChange: (id: string, field: keyof PriorityAnswer, value: string) => void }) {
  const ownerOptions = priorityCases.map((item) => item.owner);
  return <>
    <div className={base.lessonLead}><UserRoundCheck size={23} /><div><small>Scope decision</small><strong>Assign one accountable business owner, a defensible priority, and a controlled release to every requirement.</strong></div></div>
    <div className={styles.priorityGrid}>{priorityCases.map((item) => <article key={item.id}><span>{item.id}</span><strong>{item.requirement}</strong><label>MoSCoW priority<select value={values[item.id]?.priority ?? ""} onChange={(event) => onChange(item.id, "priority", event.target.value)}><option value="">Select priority</option>{["Must", "Should", "Could", "Won't this release"].map((option) => <option key={option}>{option}</option>)}</select></label><label>Business owner<select value={values[item.id]?.owner ?? ""} onChange={(event) => onChange(item.id, "owner", event.target.value)}><option value="">Select owner</option>{ownerOptions.map((owner) => <option key={owner}>{owner}</option>)}</select></label><label>Release<select value={values[item.id]?.release ?? ""} onChange={(event) => onChange(item.id, "release", event.target.value)}><option value="">Select release</option>{["R1", "Backlog", "Future release"].map((option) => <option key={option}>{option}</option>)}</select></label></article>)}</div>
    <div className={styles.moscowGrid}><article><strong>Must</strong><p>Release cannot meet an approved outcome, compliance need, or control without it.</p></article><article><strong>Should</strong><p>High value but a documented, acceptable workaround exists for this release.</p></article><article><strong>Could</strong><p>Useful if capacity remains after Must and Should scope is protected.</p></article><article><strong>Won&apos;t this release</strong><p>Explicitly excluded now; retained with rationale and potential future release.</p></article></div>
  </>;
}

function CoverageControl({ selected, onToggle, changeControl, onChangeControl }: { selected: string[]; onToggle: (id: string) => void; changeControl: string; onChangeControl: (value: string) => void }) {
  return <>
    <div className={base.lessonLead}><ShieldCheck size={23} /><div><small>Coverage and baseline control</small><strong>Find missing forward links, orphan work, unsuitable evidence, and uncontrolled changes.</strong></div></div>
    <p className={base.bodyCopy}>Select only the issues that block the current release from being considered fully traced and ready. A cosmetic preference with complete acceptance coverage is not automatically a lifecycle blocker.</p>
    <div className={styles.gapGrid}>{coverageCases.map((item) => <button className={selected.includes(item.id) ? styles.gapSelected : ""} key={item.id} onClick={() => onToggle(item.id)} type="button"><span>{selected.includes(item.id) ? <CheckCircle2 size={17} /> : <AlertTriangle size={17} />}</span><div><small>{item.id} · {item.requirement}</small><strong>{item.gap}</strong></div></button>)}</div>
    <h3 className={base.sectionTitle}>Controlled change after baseline</h3>
    <div className={styles.changeFlow}>{["Change request", "Impact analysis", "Approve / reject", "Version baseline", "Update every trace", "Build and regression plan", "Reverify and accept"].map((item, index) => <span key={item}>{item}{index < 6 && <ArrowRight size={12} />}</span>)}</div>
    <fieldset className={styles.choiceGroup}><legend>An approved requirement changes after the RTM baseline. What happens first?</legend><label><input checked={changeControl === "impact"} name="change-control" onChange={() => onChangeControl("impact")} type="radio" />Assess impact on outcomes, architecture, build, data, security, testing, schedule, cost, risk, and release scope before approval.</label><label><input checked={changeControl === "direct"} name="change-control" onChange={() => onChangeControl("direct")} type="radio" />Update the build immediately and revise requirements and test coverage after deployment.</label></fieldset>
  </>;
}

function RtmHomework({ active, onActive, status, text, onText, traceAnswers, onTraceAnswer, coverageAnswers, onCoverageAnswer }: { active: RtmHomeworkId; onActive: (id: RtmHomeworkId) => void; status: Record<RtmHomeworkId, boolean>; text: HomeworkTextValue; onText: (field: keyof HomeworkTextValue, value: string) => void; traceAnswers: Record<string, string>; onTraceAnswer: (id: string, value: string) => void; coverageAnswers: Record<string, string>; onCoverageAnswer: (id: string, value: string) => void }) {
  const mission = rtmHomeworkMissions.find((item) => item.id === active) ?? rtmHomeworkMissions[0];
  const completedCount = rtmHomeworkMissions.filter((item) => status[item.id]).length;
  const traceOptions = homeworkTraceCases.map((item) => item.correct);
  const coverageOptions = homeworkCoverageCases.map((item) => item.correct);
  return <>
    <div className={base.lessonLead}><BookOpenCheck size={23} /><div><small>Applied homework</small><strong>Produce five connected RTM governance outputs using the NovaDrive case.</strong></div></div>
    <p className={base.bodyCopy}>These tasks simulate work a functional consultant, business analyst, test lead, and product owner perform together. They do not duplicate later architecture or test-execution lessons.</p>
    <div className={base.homeworkMissionGrid}>{rtmHomeworkMissions.map((item, index) => <button className={`${active === item.id ? base.homeworkMissionActive : ""} ${status[item.id] ? base.homeworkMissionDone : ""}`} key={item.id} onClick={() => onActive(item.id)} type="button"><span>{status[item.id] ? <CheckCircle2 size={17} /> : String(index + 1).padStart(2, "0")}</span><div><strong>{item.title}</strong><small>{item.output}</small></div></button>)}</div>
    <div className={base.homeworkProgress}><div><span style={{ width: `${completedCount / rtmHomeworkMissions.length * 100}%` }} /></div><strong>{completedCount} of {rtmHomeworkMissions.length} missions complete</strong></div>
    <section className={base.homeworkWorkspace}>
      <header><div><small>Homework output</small><h3>{mission.title}</h3></div><span>{status[active] ? "Ready" : "In progress"}</span></header>
      <p className={base.homeworkPurpose}>{mission.purpose}</p>
      {active === "quality" && <><div className={base.homeworkPrompt}><strong>Broad request</strong><p>“Management needs a dashboard showing whether the plan is good.”</p></div><label className={base.summaryField}>Implementation-ready requirement<textarea onChange={(event) => onText("quality", event.target.value)} placeholder={"Include: unique ID/type, source objective, business owner/audience, decision, measures, grain/filters, data or logic, refresh cadence, drill/export/control needs, and measurable acceptance criteria. Do not choose the final page layout."} rows={11} value={text.quality} /><small>{text.quality.trim().length}/180 minimum characters</small></label></>}
      {active === "trace" && <><div className={base.homeworkPrompt}><strong>Evidence-fit challenge</strong><p>Choose the lifecycle chain whose design, build, verification, and acceptance evidence fit each requirement type.</p></div><div className={base.homeworkMap}>{homeworkTraceCases.map((item) => <article key={item.id}><div><span>{item.id}</span><p>{item.requirement}</p></div><select aria-label={`${item.id} lifecycle chain`} onChange={(event) => onTraceAnswer(item.id, event.target.value)} value={traceAnswers[item.id] ?? ""}><option value="">Select trace chain</option>{traceOptions.map((option) => <option key={option}>{option}</option>)}</select></article>)}</div></>}
      {active === "coverage" && <><div className={base.homeworkPrompt}><strong>Coverage-review challenge</strong><p>Choose the governance action that correctly protects scope and acceptance.</p></div><div className={base.homeworkMap}>{homeworkCoverageCases.map((item) => <article key={item.id}><div><span>{item.id}</span><p>{item.observation}</p></div><select aria-label={`${item.id} coverage action`} onChange={(event) => onCoverageAnswer(item.id, event.target.value)} value={coverageAnswers[item.id] ?? ""}><option value="">Select action</option>{coverageOptions.map((option) => <option key={option}>{option}</option>)}</select></article>)}</div></>}
      {active === "change" && <><div className={base.homeworkPrompt}><strong>Approved change request</strong><p>Sales requests Customer Segment as a new planning level after the R1 design and SIT cases are approved. The change may affect volume, form size, rules, security, mappings, performance, and schedule.</p></div><label className={base.summaryField}>Change-impact assessment<textarea onChange={(event) => onText("change", event.target.value)} placeholder={"Cover: reason and owner, impacted requirements and acceptance, future-state decision, architecture/dimensions/data/build/security/reporting, SIT/UAT/performance/regression, migration, effort/schedule/risk, decision options, approvers, baseline version, and RTM updates."} rows={11} value={text.change} /><small>{text.change.trim().length}/180 minimum characters</small></label></>}
      {active === "readout" && <><div className={base.homeworkPrompt}><strong>Baseline review</strong><p>R1 has 24 approved requirements. Twenty-two are fully traced, one Must requirement lacks UAT ownership, one build item is orphaned, and two future-release requirements are correctly excluded.</p></div><label className={base.summaryField}>RTM baseline recommendation<textarea onChange={(event) => onText("readout", event.target.value)} placeholder={"Summarize baseline version and scope, coverage by type/release, blockers versus accepted exclusions, orphan items, failed/missing evidence, owners and due dates, change-control rule, risks, recommendation, approvers, and next handoff."} rows={12} value={text.readout} /><small>{text.readout.trim().length}/200 minimum characters</small></label></>}
    </section>
    <div className={base.infoCallout}><Info size={19} /><div><strong>Coverage is more than a percentage</strong><p>A 98% figure can hide a missing Must requirement, failed UAT, or unauthorized build item. Review the risk and release impact of each gap.</p></div></div>
  </>;
}

function RtmHandoff({ selected, onToggle, summary, onSummary, answers, onAnswer, preview }: { selected: string[]; onToggle: (item: string) => void; summary: string; onSummary: (value: string) => void; answers: Record<string, number>; onAnswer: (id: string, value: number) => void; preview: string }) {
  return <>
    <div className={base.lessonLead}><ClipboardCheck size={23} /><div><small>Phase 04 exit gate</small><strong>Baseline the RTM only when approved scope and lifecycle coverage are visible, owned, and controlled.</strong></div></div>
    <h3 className={base.sectionTitle}>Required RTM deliverables</h3>
    <div className={styles.artifactGrid}>{rtmArtifacts.map((item) => <button className={selected.includes(item) ? styles.artifactSelected : ""} key={item} onClick={() => onToggle(item)} type="button">{selected.includes(item) ? <CheckCircle2 size={17} /> : <span />}<strong>{item}</strong></button>)}</div>
    <label className={styles.summaryField}>RTM baseline summary<textarea rows={8} value={summary} onChange={(event) => onSummary(event.target.value)} placeholder="Summarize baseline version, approved scope and releases, ownership, priorities, requirement quality, mapping coverage, evidence by type, blockers, orphan items, accepted exclusions, change control, risks, actions, and sign-off..." /><small>{summary.trim().length}/150 minimum characters</small></label>
    <h3 className={base.sectionTitle}>Knowledge check</h3>
    <div className={base.quizList}>{rtmKnowledgeQuestions.map((question, questionIndex) => <fieldset key={question.id}><legend><span>{questionIndex + 1}</span>{question.question}</legend>{question.answers.map((answer, answerIndex) => <label key={answer}><input checked={answers[question.id] === answerIndex} name={question.id} onChange={() => onAnswer(question.id, answerIndex)} type="radio" />{answer}</label>)}</fieldset>)}</div>
    <div className={styles.preview}><small>Generated Phase 04 handoff</small><p>{preview}</p><div>Approved scope <ArrowRight size={13} /> Solution Architecture <ArrowRight size={13} /> Detailed design <ArrowRight size={13} /> Build <ArrowRight size={13} /> Verification <ArrowRight size={13} /> Release evidence</div></div>
  </>;
}
