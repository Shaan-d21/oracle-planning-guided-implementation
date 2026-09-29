"use client";

import { ArrowRight, BookOpenCheck, Camera, Check, CheckCircle2, ClipboardCheck, DatabaseZap, Download, ExternalLink, FileSearch, GitCompareArrows, Info, Network, PlayCircle, RefreshCw, ShieldCheck, Workflow } from "lucide-react";
import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from "react";
import {
  configurationCases,
  dataIntegrationLessons,
  dimensionMappingCases,
  integrationArtifacts,
  integrationHomeworkMissions,
  integrationKnowledgeQuestions,
  integrationReadinessControls,
  integrationScreenshots,
  integrationSequence,
  memberMappingCases,
  reconciliationControls,
  rejectCases,
  runDecisionCases,
  sourceContractCases,
  type DataIntegrationLessonId,
} from "@/content/data-integration-module";
import { metadataBuildLessons } from "@/content/metadata-build-module";
import { readTrackProgress, writeTrackProgress } from "@/lib/learning-progress";
import design from "./application-dimension-design-module.module.css";
import base from "./discovery-module.module.css";
import meta from "./metadata-build-module.module.css";
import { LearningModuleFrame, type ModuleFeedback } from "./learning-module-frame";
import { OracleScreenshot } from "./oracle-screenshot";

type HomeworkId = (typeof integrationHomeworkMissions)[number]["id"];
type WalkthroughStep =
  | (typeof integrationScreenshots.configure)[number]
  | (typeof integrationScreenshots.mapping)[number]
  | (typeof integrationScreenshots.members)[number]
  | (typeof integrationScreenshots.run)[number];

const packPath = "/training/oracle-planning/phase-08/";

export function DataIntegrationModule() {
  const [activeLesson, setActiveLesson] = useState<DataIntegrationLessonId>("integration-foundations");
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<ModuleFeedback>(null);
  const [readiness, setReadiness] = useState<string[]>([]);
  const [contractAnswers, setContractAnswers] = useState<Record<string, string>>({});
  const [configurationAnswers, setConfigurationAnswers] = useState<Record<string, string>>({});
  const [dimensionAnswers, setDimensionAnswers] = useState<Record<string, string>>({});
  const [memberAnswers, setMemberAnswers] = useState<Record<string, string>>({});
  const [runAnswers, setRunAnswers] = useState<Record<string, string>>({});
  const [rejectAnswers, setRejectAnswers] = useState<Record<string, string>>({});
  const [reconciled, setReconciled] = useState<string[]>([]);
  const [sequence, setSequence] = useState<string[]>([]);
  const [activeHomework, setActiveHomework] = useState<HomeworkId>("contract");
  const [readout, setReadout] = useState("");
  const [artifacts, setArtifacts] = useState<string[]>([]);
  const [summary, setSummary] = useState("");
  const [knowledgeAnswers, setKnowledgeAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = readTrackProgress("implementation");
      setCompletedLessons(stored.completedLessons);
      const saved = dataIntegrationLessons.find((lesson) => lesson.id === stored.activeLesson);
      if (saved) setActiveLesson(saved.id);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const metadataComplete = metadataBuildLessons.every((lesson) => completedLessons.includes(lesson.id));
  const allCorrect = (items: readonly { id: string; correct: string }[], answers: Record<string, string>) => items.every((item) => answers[item.id] === item.correct);
  const homeworkStatus: Record<HomeworkId, boolean> = {
    contract: allCorrect(sourceContractCases, contractAnswers),
    mapping: allCorrect(memberMappingCases, memberAnswers),
    run: integrationSequence.every((item) => sequence.includes(item)),
    rejects: allCorrect(rejectCases, rejectAnswers),
    readout: readout.trim().length >= 220,
  };
  const knowledgeReady = integrationKnowledgeQuestions.every((item) => knowledgeAnswers[item.id] === item.correct);
  const preview = useMemo(() => {
    if (artifacts.length !== integrationArtifacts.length || summary.trim().length < 200) return "Complete all eight integration artifacts and provide a readiness summary of at least 200 characters.";
    return `${summary.trim()} The integration is ready for controlled reuse only when mappings, runtime parameters, Process Details, reconciliation, repeatability, ownership, and failure handling remain governed.`;
  }, [artifacts, summary]);

  function persist(nextCompleted: string[], lesson: DataIntegrationLessonId) {
    writeTrackProgress("implementation", { completedLessons: nextCompleted, activeLesson: lesson, activeModuleId: "implementation-data-integration", lastVisited: new Date().toISOString() });
  }
  function goToLesson(id: DataIntegrationLessonId) { setActiveLesson(id); setFeedback(null); persist(completedLessons, id); }
  function markComplete(message: string) {
    const next = completedLessons.includes(activeLesson) ? completedLessons : [...completedLessons, activeLesson];
    setCompletedLessons(next); persist(next, activeLesson); setFeedback({ tone: "success", message });
  }
  function toggle(setter: Dispatch<SetStateAction<string[]>>, item: string) { setter((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item]); }
  function validateLesson() {
    if (activeLesson === "integration-foundations") {
      if (readiness.length !== integrationReadinessControls.length) return setFeedback({ tone: "error", message: "Confirm all five integration readiness controls before configuration begins." });
      return markComplete("Source ownership, target grain, metadata, isolated POV, and run controls are ready.");
    }
    if (activeLesson === "source-contract") {
      if (!allCorrect(sourceContractCases, contractAnswers)) return setFeedback({ tone: "error", message: "Resolve every source-contract and data-quality case before accepting the file." });
      return markComplete("The source contract, file profile, defect boundary, and control totals are build-ready.");
    }
    if (activeLesson === "configure-integration") {
      if (!allCorrect(configurationCases, configurationAnswers)) return setFeedback({ tone: "error", message: "Recheck the integration, location, file-preview, and future-connector decisions." });
      return markComplete("The file-based integration definition and preview procedure are controlled.");
    }
    if (activeLesson === "dimension-time-mapping") {
      if (!allCorrect(dimensionMappingCases, dimensionAnswers)) return setFeedback({ tone: "error", message: "Correct the dimension, constant, period, and category mapping decisions." });
      return markComplete("Source columns, target dimensions, time, category, and constants are mapped deliberately.");
    }
    if (activeLesson === "member-mapping") {
      if (!allCorrect(memberMappingCases, memberAnswers)) return setFeedback({ tone: "error", message: "Choose the appropriate mapping type and control for every source pattern." });
      return markComplete("Member mappings and precedence are defined with positive, negative, and overlap tests.");
    }
    if (activeLesson === "run-monitor") {
      if (!allCorrect(runDecisionCases, runAnswers)) return setFeedback({ tone: "error", message: "Recheck Import Source, Recalculate, No Export, Merge, and Replace decisions." });
      return markComplete("The staged validation, controlled export, and Process Details workflow are ready.");
    }
    if (activeLesson === "reject-reconcile") {
      if (!allCorrect(rejectCases, rejectAnswers) || reconciled.length !== reconciliationControls.length) return setFeedback({ tone: "error", message: "Resolve all five failure cases and confirm all six reconciliation controls." });
      return markComplete("Rejects, logs, counts, target values, and rerun behavior are fully reconciled.");
    }
    if (activeLesson === "integration-homework") {
      if (!Object.values(homeworkStatus).every(Boolean)) return setFeedback({ tone: "error", message: "Complete all five connected data-integration missions." });
      return markComplete("Applied integration lab complete. The evidence is ready for independent review.");
    }
    if (artifacts.length !== integrationArtifacts.length || summary.trim().length < 200 || !knowledgeReady) return setFeedback({ tone: "error", message: "Select all eight deliverables, provide a 200-character summary, and answer all five knowledge checks correctly." });
    markComplete("Phase 08 exit gate passed. The reconciled data-integration baseline is ready to supply the planning builds.");
  }

  return <LearningModuleFrame activeLessonId={activeLesson} completedLessons={completedLessons} description="Design, configure, run, troubleshoot, and reconcile a controlled file-based Oracle Planning data integration before advancing to automated or source-specific connectors." exitGate="Approve the reconciled integration baseline and runbook" exitGateIcon={<DatabaseZap size={18} />} feedback={feedback} lessons={dataIntegrationLessons} onSelectLesson={(id) => goToLesson(id as DataIntegrationLessonId)} onValidate={validateLesson} phase={8} prerequisite={{ complete: metadataComplete, message: "Complete Metadata Build before loading transactional data into Planning.", href: "/learn/metadata-build", linkLabel: "Return to Phase 07" }} stage="Build · Data integration" title="Data Integration" validateLabel={activeLesson === "integration-handoff" ? "Approve integration package" : undefined}>
    {activeLesson === "integration-foundations" && <Foundations selected={readiness} onToggle={(item) => toggle(setReadiness, item)} />}
    {activeLesson === "source-contract" && <SourceContract answers={contractAnswers} onAnswer={(id, value) => setContractAnswers((current) => ({ ...current, [id]: value }))} />}
    {activeLesson === "configure-integration" && <ConfigureIntegration answers={configurationAnswers} onAnswer={(id, value) => setConfigurationAnswers((current) => ({ ...current, [id]: value }))} />}
    {activeLesson === "dimension-time-mapping" && <DimensionTimeMapping answers={dimensionAnswers} onAnswer={(id, value) => setDimensionAnswers((current) => ({ ...current, [id]: value }))} />}
    {activeLesson === "member-mapping" && <MemberMapping answers={memberAnswers} onAnswer={(id, value) => setMemberAnswers((current) => ({ ...current, [id]: value }))} />}
    {activeLesson === "run-monitor" && <RunMonitor answers={runAnswers} onAnswer={(id, value) => setRunAnswers((current) => ({ ...current, [id]: value }))} />}
    {activeLesson === "reject-reconcile" && <RejectReconcile answers={rejectAnswers} onAnswer={(id, value) => setRejectAnswers((current) => ({ ...current, [id]: value }))} selected={reconciled} onToggle={(item) => toggle(setReconciled, item)} />}
    {activeLesson === "integration-homework" && <IntegrationHomework active={activeHomework} onActive={setActiveHomework} status={homeworkStatus} contractAnswers={contractAnswers} onContract={(id, value) => setContractAnswers((current) => ({ ...current, [id]: value }))} memberAnswers={memberAnswers} onMember={(id, value) => setMemberAnswers((current) => ({ ...current, [id]: value }))} selectedSequence={sequence} onSequence={(item) => toggle(setSequence, item)} rejectAnswers={rejectAnswers} onReject={(id, value) => setRejectAnswers((current) => ({ ...current, [id]: value }))} readout={readout} onReadout={setReadout} />}
    {activeLesson === "integration-handoff" && <IntegrationHandoff selected={artifacts} onToggle={(item) => toggle(setArtifacts, item)} summary={summary} onSummary={setSummary} answers={knowledgeAnswers} onAnswer={(id, value) => setKnowledgeAnswers((current) => ({ ...current, [id]: value }))} preview={preview} />}
  </LearningModuleFrame>;
}

function Foundations({ selected, onToggle }: { selected: string[]; onToggle: (item: string) => void }) {
  return <><div className={base.lessonLead}><ShieldCheck size={23} /><div><small>Integration objective</small><strong>Move approved source data to the correct Planning intersections with explainable mappings, controlled execution, and complete reconciliation.</strong></div></div><p className={base.bodyCopy}>A successful file upload is not a successful integration. The build must preserve business grain, transform only approved differences, expose rejects, prevent unintended target changes, and prove that source, staging, and Planning agree.</p><div className={design.designSequence}>{["Contract", "Profile", "Configure", "Map", "Stage", "Export", "Reconcile"].map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong>{index < 6 && <ArrowRight size={13} />}</div>)}</div><h3 className={design.sectionTitle}>Confirm the integration boundary</h3><SelectionGrid items={integrationReadinessControls} selected={selected} onToggle={onToggle} /><div className={base.boundaryGrid}><div><strong>This phase implements</strong><span>A controlled file-based historical-sales load, including mappings, validation, export, errors, reconciliation, and a repeatable runbook.</span></div><div><strong>This phase does not pretend to implement</strong><span>Production ERP credentials, Integration Agent infrastructure, network/security setup, or a connector that has not been architected and approved.</span></div></div></>;
}

function SourceContract({ answers, onAnswer }: AnswerProps) {
  const downloads = [["phase-08-data-integration-practice-pack.zip", "Complete practice pack"], ["README.md", "Instructions"], ["historical-sales-clean.csv", "Clean source file"], ["historical-sales-defective.csv", "Defect lab"], ["source-to-target-contract.csv", "Source contract"], ["member-mapping-baseline.csv", "Mapping baseline"], ["expected-control-totals.csv", "Expected controls"], ["integration-run-checklist.csv", "Run checklist"]] as const;
  return <><div className={base.lessonLead}><FileSearch size={23} /><div><small>Source readiness</small><strong>Define what every field means, who owns it, how it maps, and how completeness will be proven.</strong></div></div><div className={meta.downloadGrid}>{downloads.map(([file, label]) => <a download href={`${packPath}${file}`} key={file}><Download size={17} /><div><strong>{label}</strong><small>{file}</small></div></a>)}</div><div className={meta.countGrid}><article><small>Clean file</small><strong>576 records</strong><span>12 months × 4 products × 4 markets × 3 channels</span></article><article><small>Sales units</small><strong>66,240</strong><span>Expected FY26 source total</span></article><article><small>Commercial coverage</small><strong>4 × 4 × 3</strong><span>Products × markets × channels</span></article><article><small>Controlled POV</small><strong>Actual / Final</strong><span>India Operations · FY26 · No Currency</span></article></div><DecisionTable items={sourceContractCases} answers={answers} onAnswer={onAnswer} label="source-contract response" /><div className={meta.controlStrip}>Profile before Oracle: required fields, numeric formats, business-key duplicates, distinct Entity/Product/Market/Channel/Currency values, valid periods, record count, sales-unit totals, encoding, delimiter, source version, and owner approval.</div></>;
}

function ConfigureIntegration({ answers, onAnswer }: AnswerProps) {
  return <><div className={base.lessonLead}><Workflow size={23} /><div><small>File-based integration setup</small><strong>Create one governed integration and location, then prove the file structure through preview.</strong></div></div><DecisionTable items={configurationCases.map((item) => ({ ...item, issue: item.situation }))} answers={answers} onAnswer={onAnswer} label="configuration response" /><ScreenshotWalkthrough heading="Integration definition and source-preview walkthrough" steps={integrationScreenshots.configure} /></>;
}

function DimensionTimeMapping({ answers, onAnswer }: AnswerProps) {
  const options = [...new Set(dimensionMappingCases.map((item) => item.correct))];
  return <><div className={base.lessonLead}><Network size={23} /><div><small>Structural mapping</small><strong>Map the approved source grain to every required Planning dimension, including time, Scenario/category, and controlled constants.</strong></div></div><DecisionTable items={dimensionMappingCases.map((item) => ({ ...item, issue: item.situation, options }))} answers={answers} onAnswer={onAnswer} label="dimension mapping" /><ScreenshotWalkthrough heading="Dimensions, periods, and category walkthrough" steps={integrationScreenshots.mapping} /><div className={base.infoCallout}><Info size={19} /><div><strong>Constants are not a shortcut for missing data</strong><p>Use a constant only when the source contract proves the entire controlled file has one valid target value. A mixed source requires an actual source field or governed transformation.</p></div></div></>;
}

function MemberMapping({ answers, onAnswer }: AnswerProps) {
  const options = ["Explicit mapping", "Like mapping with a reviewed pattern and processing order", "Between mapping only when the complete range has one approved meaning", "In mapping with the approved source list", "Use multi-dimensional mapping only when the signed design requires the combined relationship", "Use a deliberate passthrough/copy pattern and still validate source values against target metadata"];
  return <><div className={base.lessonLead}><RefreshCw size={23} /><div><small>Member transformation</small><strong>Translate real source codes to valid target members with the narrowest understandable mapping.</strong></div></div><DecisionTable items={memberMappingCases.map((item) => ({ ...item, issue: item.situation, options }))} answers={answers} onAnswer={onAnswer} label="member mapping type" /><ScreenshotWalkthrough heading="Member-mapping walkthrough" steps={integrationScreenshots.members} /><div className={meta.controlStrip}>Mapping test set: exact match, valid nonmatch, overlapping pattern, boundary value, case/spacing variant, new source member, deleted target member, and processing-order result.</div></>;
}

function RunMonitor({ answers, onAnswer }: AnswerProps) {
  const options = [...new Set(runDecisionCases.map((item) => item.correct))];
  return <><div className={base.lessonLead}><PlayCircle size={23} /><div><small>Controlled execution</small><strong>Import and validate first, export second, then inspect every stage and target result.</strong></div></div><div className={design.planTypeFlow}><div><small>Pass 1</small><strong>Import Source · map · validate · No Export</strong></div><ArrowRight size={16} /><div><small>Resolve</small><strong>Correct source or mapping · Recalculate</strong></div><ArrowRight size={16} /><div><small>Pass 2</small><strong>Approved export · Process Details · reconcile</strong></div></div><DecisionTable items={runDecisionCases.map((item) => ({ ...item, issue: item.situation, options }))} answers={answers} onAnswer={onAnswer} label="runtime decision" /><ScreenshotWalkthrough heading="Run, staging, Process Details, and target verification" steps={integrationScreenshots.run} /></>;
}

function RejectReconcile({ answers, onAnswer, selected, onToggle }: AnswerProps & { selected: string[]; onToggle: (item: string) => void }) {
  const options = [...new Set(rejectCases.map((item) => item.correct))];
  return <><div className={base.lessonLead}><GitCompareArrows size={23} /><div><small>Failure recovery</small><strong>Explain every source defect, mapping reject, skipped row, target rejection, and value difference before sign-off.</strong></div></div><DecisionTable items={rejectCases.map((item) => ({ ...item, issue: item.symptom, options }))} answers={answers} onAnswer={onAnswer} label="recovery response" /><h3 className={design.sectionTitle}>Reconciliation evidence</h3><SelectionGrid items={reconciliationControls} selected={selected} onToggle={onToggle} /><div className={meta.controlStrip}>Core equations: source records = imported + intentionally skipped + rejected at import. Validated records = exported + rejected at target. Source amount = staged mapped amount + explained exclusions = Planning loaded amount + explained target rejects.</div></>;
}

function IntegrationHomework({ active, onActive, status, contractAnswers, onContract, memberAnswers, onMember, selectedSequence, onSequence, rejectAnswers, onReject, readout, onReadout }: { active: HomeworkId; onActive: (id: HomeworkId) => void; status: Record<HomeworkId, boolean>; contractAnswers: Record<string, string>; onContract: (id: string, value: string) => void; memberAnswers: Record<string, string>; onMember: (id: string, value: string) => void; selectedSequence: string[]; onSequence: (item: string) => void; rejectAnswers: Record<string, string>; onReject: (id: string, value: string) => void; readout: string; onReadout: (value: string) => void }) {
  const mission = integrationHomeworkMissions.find((item) => item.id === active)!;
  const completed = Object.values(status).filter(Boolean).length;
  const mapOptions = ["Explicit mapping", "Like mapping with a reviewed pattern and processing order", "Between mapping only when the complete range has one approved meaning", "In mapping with the approved source list", "Use multi-dimensional mapping only when the signed design requires the combined relationship", "Use a deliberate passthrough/copy pattern and still validate source values against target metadata"];
  return <><div className={base.lessonLead}><BookOpenCheck size={23} /><div><small>Applied integration homework</small><strong>Build one connected evidence trail from source qualification through Planning reconciliation.</strong></div></div><div className={base.homeworkMissionGrid}>{integrationHomeworkMissions.map((item, index) => <button className={`${active === item.id ? base.homeworkMissionActive : ""} ${status[item.id] ? base.homeworkMissionDone : ""}`} key={item.id} onClick={() => onActive(item.id)} type="button"><span>{status[item.id] ? <CheckCircle2 size={17} /> : String(index + 1).padStart(2, "0")}</span><div><strong>{item.title}</strong><small>{item.output}</small></div></button>)}</div><div className={base.homeworkProgress}><div><span style={{ width: `${completed / integrationHomeworkMissions.length * 100}%` }} /></div><strong>{completed} of {integrationHomeworkMissions.length} missions complete</strong></div><section className={base.homeworkWorkspace}><header><div><small>Active mission</small><strong>{mission.title}</strong></div><span>{mission.output}</span></header>
    {active === "contract" && <DecisionTable items={sourceContractCases} answers={contractAnswers} onAnswer={onContract} label="source-contract response" />}
    {active === "mapping" && <DecisionTable items={memberMappingCases.map((item) => ({ ...item, issue: item.situation, options: mapOptions }))} answers={memberAnswers} onAnswer={onMember} label="member mapping type" />}
    {active === "run" && <><p className={base.homeworkPurpose}>Confirm every step in the controlled dependency order.</p><div className={meta.runSheet}>{integrationSequence.map((item) => <button className={selectedSequence.includes(item) ? meta.confirmed : ""} key={item} onClick={() => onSequence(item)} type="button"><strong>{item}</strong><span>{selectedSequence.includes(item) ? <Check size={16} /> : "Confirm"}</span></button>)}</div></>}
    {active === "rejects" && <DecisionTable items={rejectCases.map((item) => ({ ...item, issue: item.symptom, options: rejectCases.map((entry) => entry.correct) }))} answers={rejectAnswers} onAnswer={onReject} label="recovery response" />}
    {active === "readout" && <label className={design.summaryField}>Integration review and recommendation<textarea rows={13} value={readout} onChange={(event) => onReadout(event.target.value)} placeholder="Summarize source contract and controls, integration/location, target cube and POV, dimension/time/category/member mappings, staged validation, runtime options, Process Details, defects and reruns, source-to-Planning reconciliation, repeatability, evidence, open items with owners/dates, and automation recommendation." /><small>{readout.trim().length}/220 minimum characters</small></label>}
  </section></>;
}

function IntegrationHandoff({ selected, onToggle, summary, onSummary, answers, onAnswer, preview }: { selected: string[]; onToggle: (item: string) => void; summary: string; onSummary: (value: string) => void; answers: Record<string, string>; onAnswer: (id: string, value: string) => void; preview: string }) {
  return <><div className={base.lessonLead}><ClipboardCheck size={23} /><div><small>Phase deliverable</small><strong>Hand off a reproducible integration with reconciled data and operational controls—not merely a successful test job.</strong></div></div><h3 className={design.sectionTitle}>Deliverable checklist</h3><SelectionGrid items={integrationArtifacts} selected={selected} onToggle={onToggle} /><label className={design.summaryField}>Data integration readiness summary<textarea rows={11} value={summary} onChange={(event) => onSummary(event.target.value)} placeholder="Summarize approved source/target scope, file controls, configuration, mappings, periods/category, run modes, Process Details, rejects, reconciliation, rerun result, runbook, automation prerequisites, evidence location, open items, owners, reviewer, and sign-off." /><small>{summary.trim().length}/200 minimum characters</small></label><h3 className={design.sectionTitle}>Knowledge check</h3><div className={base.quizList}>{integrationKnowledgeQuestions.map((question, index) => <fieldset key={question.id}><legend><span>{index + 1}</span>{question.prompt}</legend>{question.options.map((option) => <label key={option}><input checked={answers[question.id] === option} name={question.id} onChange={() => onAnswer(question.id, option)} type="radio" />{option}</label>)}</fieldset>)}</div><div className={design.preview}><small>Generated integration handoff</small><p>{preview}</p><div>Reconciled metadata <ArrowRight size={13} /> Controlled data integration <ArrowRight size={13} /> Sales and production planning builds</div></div></>;
}

type AnswerProps = { answers: Record<string, string>; onAnswer: (id: string, value: string) => void };

function SelectionGrid({ items, selected, onToggle }: { items: readonly string[]; selected: string[]; onToggle: (item: string) => void }) {
  return <div className={design.selectionGrid}>{items.map((item) => <button className={selected.includes(item) ? design.selectedCard : ""} key={item} onClick={() => onToggle(item)} type="button">{selected.includes(item) ? <CheckCircle2 size={17} /> : <span />}<strong>{item}</strong></button>)}</div>;
}

function DecisionTable({ items, answers, onAnswer, label }: { items: readonly { id: string; issue: string; correct: string; options: readonly string[] }[]; answers: Record<string, string>; onAnswer: (id: string, value: string) => void; label: string }) {
  return <div className={design.mappingTable}>{items.map((item) => <div className={design.tableRow} key={item.id}><div><strong>{item.id}</strong><small>{item.issue}</small></div><select aria-label={`${item.id} ${label}`} value={answers[item.id] ?? ""} onChange={(event) => onAnswer(item.id, event.target.value)}><option value="">Select controlled response</option>{item.options.map((option) => <option key={option}>{option}</option>)}</select></div>)}</div>;
}

function ScreenshotWalkthrough({ heading, steps }: { heading: string; steps: readonly WalkthroughStep[] }) {
  return <section className={design.walkthrough}><div className={design.walkthroughHeading}><div><Camera size={20} /><div><small>Screenshot-guided procedure</small><h3>{heading}</h3></div></div><span>{steps.length} guided steps</span></div><div className={design.walkthroughSteps}>{steps.map((step, index) => <article key={step.id}><div className={design.stepHeader}><span>{String(index + 1).padStart(2, "0")}</span><div><small>{step.id}</small><strong>{step.title}</strong></div></div><OracleScreenshot asset={step.asset} capture={step.capture} className={design.screenshotSlot} phase="phase-08" title={step.title} /><dl><div><dt>Navigation</dt><dd>{step.path}</dd></div><div><dt>Trainee action</dt><dd>{step.action}</dd></div><div><dt>Validation evidence</dt><dd>{step.evidence}</dd></div></dl>{"docUrl" in step && step.docUrl && <a href={step.docUrl} rel="noreferrer" target="_blank">Oracle reference <ExternalLink size={13} /></a>}</article>)}</div></section>; 
}
