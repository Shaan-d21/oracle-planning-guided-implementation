"use client";

import { ArrowRight, BookOpenCheck, Camera, Check, CheckCircle2, ClipboardCheck, Database, Download, ExternalLink, FileCheck2, GitCompareArrows, Info, RefreshCw, ShieldCheck, Wrench } from "lucide-react";
import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from "react";
import { applicationDimensionDesignLessons } from "@/content/application-dimension-design-module";
import {
  buildSequence,
  fileQualityCases,
  importDecisionCases,
  manualBuildCases,
  metadataArtifacts,
  metadataBuildLessons,
  metadataHomeworkMissions,
  metadataKnowledgeQuestions,
  metadataScreenshots,
  readinessControls,
  reconciliationControls,
  refreshCases,
  rejectCases,
  type MetadataBuildLessonId,
} from "@/content/metadata-build-module";
import { readTrackProgress, writeTrackProgress } from "@/lib/learning-progress";
import base from "./discovery-module.module.css";
import design from "./application-dimension-design-module.module.css";
import styles from "./metadata-build-module.module.css";
import { LearningModuleFrame, type ModuleFeedback } from "./learning-module-frame";
import { OracleScreenshot } from "./oracle-screenshot";

type HomeworkId = (typeof metadataHomeworkMissions)[number]["id"];
type WalkthroughStep =
  | (typeof metadataScreenshots.manual)[number]
  | (typeof metadataScreenshots.import)[number]
  | (typeof metadataScreenshots.recovery)[number]
  | (typeof metadataScreenshots.refresh)[number];

const packPath = "/training/oracle-planning/phase-07/";

export function MetadataBuildModule() {
  const [activeLesson, setActiveLesson] = useState<MetadataBuildLessonId>("build-readiness");
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<ModuleFeedback>(null);
  const [readiness, setReadiness] = useState<string[]>([]);
  const [fileAnswers, setFileAnswers] = useState<Record<string, string>>({});
  const [manualAnswers, setManualAnswers] = useState<Record<string, string>>({});
  const [importAnswers, setImportAnswers] = useState<Record<string, string>>({});
  const [rejectAnswers, setRejectAnswers] = useState<Record<string, string>>({});
  const [refreshAnswers, setRefreshAnswers] = useState<Record<string, string>>({});
  const [reconciled, setReconciled] = useState<string[]>([]);
  const [sequenceChecks, setSequenceChecks] = useState<string[]>([]);
  const [activeHomework, setActiveHomework] = useState<HomeworkId>("file");
  const [readout, setReadout] = useState("");
  const [artifacts, setArtifacts] = useState<string[]>([]);
  const [summary, setSummary] = useState("");
  const [knowledgeAnswers, setKnowledgeAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = readTrackProgress("implementation");
      setCompletedLessons(stored.completedLessons);
      const saved = metadataBuildLessons.find((lesson) => lesson.id === stored.activeLesson);
      if (saved) setActiveLesson(saved.id);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const designComplete = applicationDimensionDesignLessons.every((lesson) => completedLessons.includes(lesson.id));
  const allCorrect = (items: readonly { id: string; correct: string }[], answers: Record<string, string>) => items.every((item) => answers[item.id] === item.correct);
  const homeworkStatus: Record<HomeworkId, boolean> = {
    file: allCorrect(fileQualityCases, fileAnswers),
    sequence: buildSequence.every((item) => sequenceChecks.includes(item)),
    rejects: allCorrect(rejectCases, rejectAnswers),
    refresh: allCorrect(refreshCases, refreshAnswers),
    readout: readout.trim().length >= 220,
  };
  const homeworkReady = Object.values(homeworkStatus).every(Boolean);
  const knowledgeReady = metadataKnowledgeQuestions.every((item) => knowledgeAnswers[item.id] === item.correct);
  const handoffPreview = useMemo(() => {
    if (artifacts.length !== metadataArtifacts.length || summary.trim().length < 200) return "Complete all eight evidence items and write a build-readiness summary of at least 200 characters.";
    return `${summary.trim()} The metadata baseline may proceed only with reconciled counts, reviewed jobs, refresh evidence, representative smoke tests, a versioned post-build export, and controlled open items.`;
  }, [artifacts, summary]);

  function persist(nextCompleted: string[], lesson: MetadataBuildLessonId) {
    writeTrackProgress("implementation", { completedLessons: nextCompleted, activeLesson: lesson, activeModuleId: "implementation-metadata-build", lastVisited: new Date().toISOString() });
  }
  function goToLesson(id: MetadataBuildLessonId) { setActiveLesson(id); setFeedback(null); persist(completedLessons, id); }
  function markComplete(message: string) {
    const next = completedLessons.includes(activeLesson) ? completedLessons : [...completedLessons, activeLesson];
    setCompletedLessons(next); persist(next, activeLesson); setFeedback({ tone: "success", message });
  }
  function toggle(setter: Dispatch<SetStateAction<string[]>>, item: string) { setter((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item]); }
  function validateLesson() {
    if (activeLesson === "build-readiness") {
      if (readiness.length !== readinessControls.length) return setFeedback({ tone: "error", message: "Confirm every readiness control before opening the build window." });
      return markComplete("Build scope, ownership, baseline, rollback, window, and evidence controls are confirmed.");
    }
    if (activeLesson === "prepare-files") {
      if (!allCorrect(fileQualityCases, fileAnswers)) return setFeedback({ tone: "error", message: "Resolve every file-quality case using the approved design and tenant-derived template." });
      return markComplete("The staged files are qualified for controlled mapping into tenant-specific metadata templates.");
    }
    if (activeLesson === "manual-build") {
      if (!allCorrect(manualBuildCases, manualAnswers)) return setFeedback({ tone: "error", message: "Recheck member identity, parentage, properties, and maker-checker evidence." });
      return markComplete("The controlled manual-member procedure is ready for the training tenant.");
    }
    if (activeLesson === "bulk-import") {
      if (!allCorrect(importDecisionCases, importAnswers)) return setFeedback({ tone: "error", message: "Choose the correct method, scope, sequence, and governance for each import situation." });
      return markComplete("Import approach, files, options, dependency order, and job evidence are controlled.");
    }
    if (activeLesson === "reject-recovery") {
      if (!allCorrect(rejectCases, rejectAnswers)) return setFeedback({ tone: "error", message: "Classify each reject and choose a governed correction and rerun response." });
      return markComplete("Rejects are traced to source, corrected under control, and reconciled before rerun.");
    }
    if (activeLesson === "refresh-validate") {
      if (!allCorrect(refreshCases, refreshAnswers)) return setFeedback({ tone: "error", message: "Recheck refresh timing, operational controls, failure response, and post-refresh testing." });
      return markComplete("Refresh and smoke-test controls protect active users and prove the structural change.");
    }
    if (activeLesson === "reconcile-baseline") {
      if (reconciled.length !== reconciliationControls.length) return setFeedback({ tone: "error", message: "Complete all six reconciliation controls and retain their evidence." });
      return markComplete("Counts, paths, properties, jobs, behavior, and the post-build export reconcile to the baseline.");
    }
    if (activeLesson === "metadata-homework") {
      if (!homeworkReady) return setFeedback({ tone: "error", message: "Complete all five connected metadata-build missions." });
      return markComplete("Applied build lab complete. The work is ready for the evidence review.");
    }
    if (artifacts.length !== metadataArtifacts.length || summary.trim().length < 200 || !knowledgeReady) return setFeedback({ tone: "error", message: "Select all eight deliverables, provide a 200-character build summary, and answer all five knowledge checks correctly." });
    markComplete("Phase 07 exit gate passed. The reconciled metadata baseline is ready for forms, business rules, and calculation configuration.");
  }

  return <LearningModuleFrame activeLessonId={activeLesson} completedLessons={completedLessons} description="Create, import, refresh, validate, and reconcile approved Oracle Planning metadata through a controlled, evidence-based build cycle." exitGate="Approve the reconciled metadata build baseline" exitGateIcon={<Database size={18} />} feedback={feedback} lessons={metadataBuildLessons} onSelectLesson={(id) => goToLesson(id as MetadataBuildLessonId)} onValidate={validateLesson} phase={7} prerequisite={{ complete: designComplete, message: "Complete Application & Dimension Design before building metadata.", href: "/learn/application-dimension-design", linkLabel: "Return to Phase 06" }} stage="Build · Metadata configuration" title="Metadata Build" validateLabel={activeLesson === "metadata-handoff" ? "Approve metadata build" : undefined}>
    {activeLesson === "build-readiness" && <BuildReadiness selected={readiness} onToggle={(item) => toggle(setReadiness, item)} />}
    {activeLesson === "prepare-files" && <PrepareFiles answers={fileAnswers} onAnswer={(id, value) => setFileAnswers((current) => ({ ...current, [id]: value }))} />}
    {activeLesson === "manual-build" && <ManualBuild answers={manualAnswers} onAnswer={(id, value) => setManualAnswers((current) => ({ ...current, [id]: value }))} />}
    {activeLesson === "bulk-import" && <BulkImport answers={importAnswers} onAnswer={(id, value) => setImportAnswers((current) => ({ ...current, [id]: value }))} />}
    {activeLesson === "reject-recovery" && <RejectRecovery answers={rejectAnswers} onAnswer={(id, value) => setRejectAnswers((current) => ({ ...current, [id]: value }))} />}
    {activeLesson === "refresh-validate" && <RefreshValidate answers={refreshAnswers} onAnswer={(id, value) => setRefreshAnswers((current) => ({ ...current, [id]: value }))} />}
    {activeLesson === "reconcile-baseline" && <ReconcileBaseline selected={reconciled} onToggle={(item) => toggle(setReconciled, item)} />}
    {activeLesson === "metadata-homework" && <MetadataHomework active={activeHomework} onActive={setActiveHomework} status={homeworkStatus} fileAnswers={fileAnswers} onFile={(id, value) => setFileAnswers((current) => ({ ...current, [id]: value }))} selectedSequence={sequenceChecks} onSequence={(item) => toggle(setSequenceChecks, item)} rejectAnswers={rejectAnswers} onReject={(id, value) => setRejectAnswers((current) => ({ ...current, [id]: value }))} refreshAnswers={refreshAnswers} onRefresh={(id, value) => setRefreshAnswers((current) => ({ ...current, [id]: value }))} readout={readout} onReadout={setReadout} />}
    {activeLesson === "metadata-handoff" && <MetadataHandoff selected={artifacts} onToggle={(item) => toggle(setArtifacts, item)} summary={summary} onSummary={setSummary} answers={knowledgeAnswers} onAnswer={(id, value) => setKnowledgeAnswers((current) => ({ ...current, [id]: value }))} preview={handoffPreview} />}
  </LearningModuleFrame>;
}

function BuildReadiness({ selected, onToggle }: { selected: string[]; onToggle: (item: string) => void }) {
  return <><div className={base.lessonLead}><ShieldCheck size={23} /><div><small>Controlled build objective</small><strong>Build only approved metadata, in an authorized environment, with a recoverable baseline and reviewable evidence.</strong></div></div><p className={base.bodyCopy}>Metadata build turns the Phase 06 specification into application structures. It is not data cleansing by trial-and-error: every member, relationship, alias, property, cube assignment, and correction remains traceable to an approved design or controlled change.</p><div className={design.designSequence}>{["Approve scope", "Export baseline", "Prepare", "Build / import", "Correct", "Refresh", "Reconcile"].map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong>{index < 6 && <ArrowRight size={13} />}</div>)}</div><h3 className={design.sectionTitle}>Open the build window only when all controls are true</h3><SelectionGrid items={readinessControls} selected={selected} onToggle={onToggle} /><div className={base.boundaryGrid}><div><strong>Builder</strong><span>Executes the approved run sheet and captures evidence.</span></div><div><strong>Reviewer</strong><span>Checks files, options, counts, rejects, refresh, and smoke tests independently.</span></div></div></>;
}

function PrepareFiles({ answers, onAnswer }: { answers: Record<string, string>; onAnswer: (id: string, value: string) => void }) {
  const downloads = [["phase-07-metadata-build-practice-pack.zip", "Complete practice pack"], ["README.md", "Instructions"], ["source-product-clean.csv", "Clean Product"], ["source-product-defective.csv", "Defect lab"], ["source-entity-clean.csv", "Clean Entity"], ["entity-currency-assignment.csv", "Entity currency contract"], ["source-market-clean.csv", "Clean Market"], ["source-channel-clean.csv", "Clean Channel"], ["source-account-clean.csv", "Clean Account"], ["account-design-policy.csv", "Account behavior policy"], ["expected-control-totals.csv", "Expected counts"], ["metadata-build-checklist.csv", "Run checklist"]] as const;
  return <><div className={base.lessonLead}><FileCheck2 size={23} /><div><small>File preparation lab</small><strong>Profile staged data, then map it into a fresh export from the target training tenant.</strong></div></div><div className={base.infoCallout}><Info size={19} /><div><strong>The downloads are staging files—not direct Oracle imports</strong><p>Oracle metadata columns and cube-specific properties vary with the application. Export the target dimension first, preserve its supported headers, and map these rows into a controlled copy.</p></div></div><div className={styles.downloadGrid}>{downloads.map(([file, label]) => <a download href={`${packPath}${file}`} key={file}><Download size={17} /><div><strong>{label}</strong><small>{file}</small></div></a>)}</div><DecisionTable items={fileQualityCases} answers={answers} onAnswer={onAnswer} label="file-quality response" /><div className={styles.controlStrip}>Minimum pre-import checks: UTF-8 encoding, delimiter, header match, stable member keys, one authoritative row per member, valid parents, parent-before-child ordering, supported property values, cube validity, expected row counts, and peer review.</div></>;
}

function ManualBuild({ answers, onAnswer }: { answers: Record<string, string>; onAnswer: (id: string, value: string) => void }) {
  return <><div className={base.lessonLead}><Wrench size={23} /><div><small>Guided training-tenant action</small><strong>Create one approved sample member manually to understand the editor and property impact.</strong></div></div><p className={base.bodyCopy}>Manual entry is appropriate for learning and small, controlled corrections. It is not the normal method for hundreds of members. The same design, review, and reconciliation controls apply regardless of entry method.</p><DecisionTable items={manualBuildCases.map((item) => ({ ...item, issue: item.label }))} answers={answers} onAnswer={onAnswer} label="manual-build decision" /><ScreenshotWalkthrough heading="Manual metadata build walkthrough" steps={metadataScreenshots.manual} /></>;
}

function BulkImport({ answers, onAnswer }: { answers: Record<string, string>; onAnswer: (id: string, value: string) => void }) {
  return <><div className={base.lessonLead}><Database size={23} /><div><small>Controlled bulk build</small><strong>Choose the method, load one artifact per file, respect dependencies, and inspect every job result.</strong></div></div><DecisionTable items={importDecisionCases.map((item) => ({ ...item, issue: item.situation, options: importDecisionCases.map((entry) => entry.correct) }))} answers={answers} onAnswer={onAnswer} label="import response" /><ScreenshotWalkthrough heading="Metadata export, import, and job walkthrough" steps={metadataScreenshots.import} /><div className={base.infoCallout}><Info size={19} /><div><strong>Automation comes after a proven manual run</strong><p>Once files, options, sequence, error handling, reconciliation, and ownership are stable, recurring loads can move to a scheduled job or integration pipeline with the same controls.</p></div></div></>;
}

function RejectRecovery({ answers, onAnswer }: { answers: Record<string, string>; onAnswer: (id: string, value: string) => void }) {
  return <><div className={base.lessonLead}><Wrench size={23} /><div><small>Troubleshooting lab</small><strong>Treat every rejected row as controlled work—not permission to invent metadata.</strong></div></div><DecisionTable items={rejectCases.map((item) => ({ ...item, issue: item.symptom, options: rejectCases.map((entry) => entry.correct) }))} answers={answers} onAnswer={onAnswer} label="reject response" /><ScreenshotWalkthrough heading="Reject review and correction evidence" steps={metadataScreenshots.recovery} /><div className={styles.controlStrip}>Reconciliation equation: submitted rows = accepted rows + rejected rows. After correction, original rejects = corrected and loaded + approved deferrals + approved exclusions.</div></>;
}

function RefreshValidate({ answers, onAnswer }: { answers: Record<string, string>; onAnswer: (id: string, value: string) => void }) {
  return <><div className={base.lessonLead}><RefreshCw size={23} /><div><small>Structural activation</small><strong>Refresh only in a controlled window, then prove the application—not merely the job—still behaves correctly.</strong></div></div><DecisionTable items={refreshCases.map((item) => ({ ...item, issue: item.situation, options: refreshCases.map((entry) => entry.correct) }))} answers={answers} onAnswer={onAnswer} label="refresh decision" /><ScreenshotWalkthrough heading="Refresh and post-refresh verification" steps={metadataScreenshots.refresh} /></>;
}

function ReconcileBaseline({ selected, onToggle }: { selected: string[]; onToggle: (item: string) => void }) {
  return <><div className={base.lessonLead}><GitCompareArrows size={23} /><div><small>Expected versus actual</small><strong>Reconcile what was approved, submitted, accepted, activated, and proven in the application.</strong></div></div><div className={styles.countGrid}><article><small>Product</small><strong>6 expected</strong><span>1 root · 1 parent · 4 leaves</span></article><article><small>Entity</small><strong>5 expected</strong><span>Apex · India · plant group · 2 plants</span></article><article><small>Market</small><strong>5 expected</strong><span>1 root · 4 markets</span></article><article><small>Channel</small><strong>4 expected</strong><span>1 root · 3 channels</span></article><article><small>Account</small><strong>161 expected</strong><span>1 root · 11 parents · 149 leaves</span></article></div><SelectionGrid items={reconciliationControls} selected={selected} onToggle={onToggle} /><div className={base.infoCallout}><Info size={19} /><div><strong>Why export again?</strong><p>The post-build export is the reproducible application baseline. Compare it with the approved target and pre-build export, then archive it with the job IDs, counts, reviewer, date, and change reference.</p></div></div></>;
}

function MetadataHomework({ active, onActive, status, fileAnswers, onFile, selectedSequence, onSequence, rejectAnswers, onReject, refreshAnswers, onRefresh, readout, onReadout }: { active: HomeworkId; onActive: (id: HomeworkId) => void; status: Record<HomeworkId, boolean>; fileAnswers: Record<string, string>; onFile: (id: string, value: string) => void; selectedSequence: string[]; onSequence: (item: string) => void; rejectAnswers: Record<string, string>; onReject: (id: string, value: string) => void; refreshAnswers: Record<string, string>; onRefresh: (id: string, value: string) => void; readout: string; onReadout: (value: string) => void }) {
  const mission = metadataHomeworkMissions.find((item) => item.id === active)!;
  const completed = Object.values(status).filter(Boolean).length;
  return <><div className={base.lessonLead}><BookOpenCheck size={23} /><div><small>Applied build homework</small><strong>Execute five connected decisions that produce a reviewable metadata-build result.</strong></div></div><div className={base.homeworkMissionGrid}>{metadataHomeworkMissions.map((item, index) => <button className={`${active === item.id ? base.homeworkMissionActive : ""} ${status[item.id] ? base.homeworkMissionDone : ""}`} key={item.id} onClick={() => onActive(item.id)} type="button"><span>{status[item.id] ? <CheckCircle2 size={17} /> : String(index + 1).padStart(2, "0")}</span><div><strong>{item.title}</strong><small>{item.output}</small></div></button>)}</div><div className={base.homeworkProgress}><div><span style={{ width: `${completed / metadataHomeworkMissions.length * 100}%` }} /></div><strong>{completed} of {metadataHomeworkMissions.length} missions complete</strong></div><section className={base.homeworkWorkspace}><header><div><small>Active mission</small><strong>{mission.title}</strong></div><span>{mission.output}</span></header>
    {active === "file" && <DecisionTable items={fileQualityCases} answers={fileAnswers} onAnswer={onFile} label="file-quality response" />}
    {active === "sequence" && <><p className={base.homeworkPurpose}>Confirm each run-sheet step in the only safe dependency order shown.</p><div className={styles.runSheet}>{buildSequence.map((item) => <button className={selectedSequence.includes(item) ? styles.confirmed : ""} key={item} onClick={() => onSequence(item)} type="button"><strong>{item}</strong><span>{selectedSequence.includes(item) ? <Check size={16} /> : "Confirm"}</span></button>)}</div></>}
    {active === "rejects" && <DecisionTable items={rejectCases.map((item) => ({ ...item, issue: item.symptom, options: rejectCases.map((entry) => entry.correct) }))} answers={rejectAnswers} onAnswer={onReject} label="reject response" />}
    {active === "refresh" && <DecisionTable items={refreshCases.map((item) => ({ ...item, issue: item.situation, options: refreshCases.map((entry) => entry.correct) }))} answers={refreshAnswers} onAnswer={onRefresh} label="refresh response" />}
    {active === "readout" && <label className={design.summaryField}>Metadata build review<textarea rows={13} value={readout} onChange={(event) => onReadout(event.target.value)} placeholder="Summarize approved scope, environment/window, pre-build export and counts, files and mapping, import jobs, accepted/rejected reconciliation, corrections and reruns, refresh result, smoke tests, post-build export, open items with owners/dates, reviewer, and recommendation." /><small>{readout.trim().length}/220 minimum characters</small></label>}
  </section></>;
}

function MetadataHandoff({ selected, onToggle, summary, onSummary, answers, onAnswer, preview }: { selected: string[]; onToggle: (item: string) => void; summary: string; onSummary: (value: string) => void; answers: Record<string, string>; onAnswer: (id: string, value: string) => void; preview: string }) {
  return <><div className={base.lessonLead}><ClipboardCheck size={23} /><div><small>Phase deliverable</small><strong>Hand off a reproducible metadata baseline—not an undocumented hierarchy that merely appears in the tenant.</strong></div></div><h3 className={design.sectionTitle}>Deliverable checklist</h3><SelectionGrid items={metadataArtifacts} selected={selected} onToggle={onToggle} /><label className={design.summaryField}>Metadata build readiness summary<textarea rows={11} value={summary} onChange={(event) => onSummary(event.target.value)} placeholder="Summarize approved scope, files and mappings, imports, rejects and reruns, refresh, reconciliation, smoke tests, post-build export, evidence location, open items, owners, reviewer, sign-off, and conditions for the next configuration phase." /><small>{summary.trim().length}/200 minimum characters</small></label><h3 className={design.sectionTitle}>Knowledge check</h3><div className={base.quizList}>{metadataKnowledgeQuestions.map((question, index) => <fieldset key={question.id}><legend><span>{index + 1}</span>{question.prompt}</legend>{question.options.map((option) => <label key={option}><input checked={answers[question.id] === option} name={question.id} onChange={() => onAnswer(question.id, option)} type="radio" />{option}</label>)}</fieldset>)}</div><div className={design.preview}><small>Generated build handoff</small><p>{preview}</p><div>Approved design <ArrowRight size={13} /> Reconciled metadata baseline <ArrowRight size={13} /> Forms and calculation configuration</div></div></>;
}

function SelectionGrid({ items, selected, onToggle }: { items: readonly string[]; selected: string[]; onToggle: (item: string) => void }) {
  return <div className={design.selectionGrid}>{items.map((item) => <button className={selected.includes(item) ? design.selectedCard : ""} key={item} onClick={() => onToggle(item)} type="button">{selected.includes(item) ? <CheckCircle2 size={17} /> : <span />}<strong>{item}</strong></button>)}</div>;
}

function DecisionTable({ items, answers, onAnswer, label }: { items: readonly { id: string; issue: string; correct: string; options: readonly string[] }[]; answers: Record<string, string>; onAnswer: (id: string, value: string) => void; label: string }) {
  return <div className={design.mappingTable}>{items.map((item) => <div className={design.tableRow} key={item.id}><div><strong>{item.id}</strong><small>{item.issue}</small></div><select aria-label={`${item.id} ${label}`} value={answers[item.id] ?? ""} onChange={(event) => onAnswer(item.id, event.target.value)}><option value="">Select controlled response</option>{item.options.map((option) => <option key={option}>{option}</option>)}</select></div>)}</div>;
}

function ScreenshotWalkthrough({ heading, steps }: { heading: string; steps: readonly WalkthroughStep[] }) {
  return <section className={design.walkthrough}><div className={design.walkthroughHeading}><div><Camera size={20} /><div><small>Screenshot-guided procedure</small><h3>{heading}</h3></div></div><span>{steps.length} guided steps</span></div><div className={design.walkthroughSteps}>{steps.map((step, index) => <article key={step.id}><div className={design.stepHeader}><span>{String(index + 1).padStart(2, "0")}</span><div><small>{step.id}</small><strong>{step.title}</strong></div></div><OracleScreenshot asset={step.asset} capture={step.capture} className={design.screenshotSlot} phase="phase-07" title={step.title} /><dl><div><dt>Navigation</dt><dd>{step.path}</dd></div><div><dt>Trainee action</dt><dd>{step.action}</dd></div><div><dt>Validation evidence</dt><dd>{step.evidence}</dd></div></dl>{"docUrl" in step && step.docUrl && <a href={step.docUrl} rel="noreferrer" target="_blank">Oracle reference <ExternalLink size={13} /></a>}</article>)}</div></section>; 
}
