"use client";

import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  Camera,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Download,
  FileSpreadsheet,
  Gauge,
  LayoutDashboard,
  PlayCircle,
  ShieldCheck,
  Table2,
  TriangleAlert,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from "react";
import { businessRulesGroovyLessons } from "@/content/business-rules-groovy-module";
import {
  dashboardCases,
  formBehaviorCases,
  formDesignCases,
  formsDashboardsSmartViewLessons,
  personaJourneyCases,
  smartViewCases,
  uxArtifacts,
  uxExecutionSequence,
  uxHomeworkMissions,
  uxKnowledgeQuestions,
  uxReadinessControls,
  uxReconciliationControls,
  uxScreenshots,
  uxTestCases,
  uxWalkthroughControls,
  type FormsDashboardsSmartViewLessonId,
} from "@/content/forms-dashboards-smart-view-module";
import { readTrackProgress, writeTrackProgress } from "@/lib/learning-progress";
import design from "./application-dimension-design-module.module.css";
import base from "./discovery-module.module.css";
import sales from "./sales-planning-build-module.module.css";
import styles from "./forms-dashboards-smart-view-module.module.css";
import { LearningModuleFrame, type ModuleFeedback } from "./learning-module-frame";
import { OracleScreenshot } from "./oracle-screenshot";

type Answers = Record<string, string>;
type HomeworkId = (typeof uxHomeworkMissions)[number]["id"];
type FormInputs = { puneUnits: number; noidaUnits: number; lotSize: number; comment: string };

const packPath = "/training/oracle-planning/phase-16/";
const defaultForm: FormInputs = {
  puneUnits: 820,
  noidaUnits: 560,
  lotSize: 20,
  comment: "Aligned with approved demand, inventory, plant capability, and capacity review.",
};

export function FormsDashboardsSmartViewModule() {
  const [activeLesson, setActiveLesson] = useState<FormsDashboardsSmartViewLessonId>("ux-foundations");
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<ModuleFeedback>(null);
  const [readiness, setReadiness] = useState<string[]>([]);
  const [journeyAnswers, setJourneyAnswers] = useState<Answers>({});
  const [formDesignAnswers, setFormDesignAnswers] = useState<Answers>({});
  const [formBehaviorAnswers, setFormBehaviorAnswers] = useState<Answers>({});
  const [dashboardAnswers, setDashboardAnswers] = useState<Answers>({});
  const [smartViewAnswers, setSmartViewAnswers] = useState<Answers>({});
  const [testAnswers, setTestAnswers] = useState<Answers>({});
  const [walkthroughChecks, setWalkthroughChecks] = useState<string[]>([]);
  const [formInputs, setFormInputs] = useState<FormInputs>(defaultForm);
  const [submitted, setSubmitted] = useState(false);
  const [sequence, setSequence] = useState<string[]>([]);
  const [reconciled, setReconciled] = useState<string[]>([]);
  const [activeHomework, setActiveHomework] = useState<HomeworkId>("journey");
  const [readout, setReadout] = useState("");
  const [artifacts, setArtifacts] = useState<string[]>([]);
  const [summary, setSummary] = useState("");
  const [knowledgeAnswers, setKnowledgeAnswers] = useState<Answers>({});

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = readTrackProgress("implementation");
      setCompletedLessons(stored.completedLessons);
      const saved = formsDashboardsSmartViewLessons.find((lesson) => lesson.id === stored.activeLesson);
      if (saved) setActiveLesson(saved.id);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const formResult = useMemo(() => calculateForm(formInputs), [formInputs]);
  const prerequisiteComplete = businessRulesGroovyLessons.every((lesson) => completedLessons.includes(lesson.id));
  const allCorrect = (items: readonly { id: string; correct: string }[], answers: Answers) =>
    items.every((item) => answers[item.id] === item.correct);
  const knowledgeReady = uxKnowledgeQuestions.every((item) => knowledgeAnswers[item.id] === item.correct);
  const formReady =
    submitted &&
    formResult.valid &&
    formResult.totalUnits === 1380 &&
    formResult.puneHours === 410 &&
    formResult.noidaHours === 280 &&
    formInputs.comment.trim().length >= 40;
  const homeworkStatus: Record<HomeworkId, boolean> = {
    journey: allCorrect(personaJourneyCases, journeyAnswers) && allCorrect(formDesignCases, formDesignAnswers),
    form: formReady,
    dashboard: allCorrect(dashboardCases, dashboardAnswers),
    smartview: allCorrect(smartViewCases, smartViewAnswers),
    readout:
      readout.trim().length >= 240 &&
      sequence.length === uxExecutionSequence.length &&
      reconciled.length === uxReconciliationControls.length,
  };
  const preview = useMemo(
    () =>
      artifacts.length === uxArtifacts.length && summary.trim().length >= 240
        ? `${summary.trim()} The released experience keeps Plan1 input and calculations separate from ApexPlan ASO reporting, and Smart View remains a governed connected interface rather than a shadow model.`
        : "Complete all eight UX artifacts and provide a release-readiness summary of at least 240 characters.",
    [artifacts, summary],
  );

  function persist(nextCompleted: string[], lesson: FormsDashboardsSmartViewLessonId) {
    writeTrackProgress("implementation", {
      completedLessons: nextCompleted,
      activeLesson: lesson,
      activeModuleId: "implementation-forms-dashboards-smart-view",
      lastVisited: new Date().toISOString(),
    });
  }

  function goToLesson(id: FormsDashboardsSmartViewLessonId) {
    setActiveLesson(id);
    setFeedback(null);
    persist(completedLessons, id);
  }

  function markComplete(message: string) {
    const next = completedLessons.includes(activeLesson)
      ? completedLessons
      : [...completedLessons, activeLesson];
    setCompletedLessons(next);
    persist(next, activeLesson);
    setFeedback({ tone: "success", message });
  }

  function toggle(setter: Dispatch<SetStateAction<string[]>>, item: string) {
    setter((current) =>
      current.includes(item) ? current.filter((value) => value !== item) : [...current, item],
    );
  }

  function validateLesson() {
    if (activeLesson === "ux-foundations") {
      if (readiness.length !== uxReadinessControls.length) {
        return setFeedback({ tone: "error", message: "Confirm all five user-experience prerequisites and cube boundaries." });
      }
      return markComplete("Role journeys, stable rules, cube responsibilities, cell behavior, and UX boundaries are controlled.");
    }
    if (activeLesson === "form-design-contract") {
      if (!allCorrect(personaJourneyCases, journeyAnswers) || !allCorrect(formDesignCases, formDesignAnswers)) {
        return setFeedback({ tone: "error", message: "Resolve every role-journey, form-scope, POV, cell-behavior, and suppression decision." });
      }
      return markComplete("The form catalogue is task-focused, role-based, visibly scoped, behaviorally consistent, and ready for configuration.");
    }
    if (activeLesson === "planning-input-forms") {
      if (!formReady) {
        return setFeedback({ tone: "error", message: "Submit 820 Pune and 560 Noida starts in 20-unit lots with a meaningful planning comment." });
      }
      return markComplete("The focused production form accepts owned inputs and protects calculated totals while reconciling 1,380 starts and 690 hours.");
    }
    if (activeLesson === "form-rules-validation") {
      if (!allCorrect(formBehaviorCases, formBehaviorAnswers)) {
        return setFeedback({ tone: "error", message: "Correct all validation, save-and-launch, form-context, and cell-protection decisions." });
      }
      return markComplete("Form validation, rule actions, runtime-prompt resolution, protected outputs, messages, and job evidence are controlled.");
    }
    if (activeLesson === "decision-dashboards") {
      if (!allCorrect(dashboardCases, dashboardAnswers)) {
        return setFeedback({ tone: "error", message: "Resolve the KPI purpose, filter consistency, calculation ownership, and drill-path cases." });
      }
      return markComplete("The management dashboard uses reconciled ApexPlan ASO KPIs, one visible context, actionable exceptions, and governed drill paths.");
    }
    if (activeLesson === "smart-view") {
      if (!allCorrect(smartViewCases, smartViewAnswers)) {
        return setFeedback({ tone: "error", message: "Correct all POV refresh, connected-model, level-zero submission, and workbook-governance decisions." });
      }
      return markComplete("Smart View has a controlled connection, visible POV, refresh-submit-refresh workflow, authorized write scope, and reconciliation.");
    }
    if (activeLesson === "ux-performance-testing") {
      if (!allCorrect(uxTestCases, testAnswers) || reconciled.length !== uxReconciliationControls.length) {
        return setFeedback({ tone: "error", message: "Resolve every usability, suppression, security, and accessibility case and confirm all six reconciliations." });
      }
      return markComplete("Representative roles prove correct behavior, access, usability, accessibility, performance, repeatability, and web-to-Smart View consistency.");
    }
    if (activeLesson === "ux-walkthrough") {
      if (walkthroughChecks.length !== uxWalkthroughControls.length) {
        return setFeedback({ tone: "error", message: "Confirm all five screenshot, tenant, context, Smart View, and evidence controls." });
      }
      return markComplete("The functional screenshot runbook is ready for one consistent ApexPlan planning cycle.");
    }
    if (activeLesson === "ux-homework") {
      if (!Object.values(homeworkStatus).every(Boolean)) {
        return setFeedback({ tone: "error", message: "Complete all five planner-workspace missions, including execution order and reconciliation." });
      }
      return markComplete("Applied planner-workspace lab complete. Forms, dashboards, Smart View, controls, and the release decision are ready for review.");
    }
    if (artifacts.length !== uxArtifacts.length || summary.trim().length < 240 || !knowledgeReady) {
      return setFeedback({ tone: "error", message: "Select all eight deliverables, provide a 240-character summary, and answer all five knowledge checks correctly." });
    }
    markComplete("Phase 16 exit gate passed. The planner experience is ready for Phase 17 security and workflow hardening.");
  }

  return (
    <LearningModuleFrame
      activeLessonId={activeLesson}
      completedLessons={completedLessons}
      description="Create role-based Plan1 forms, reconciled ApexPlan ASO decision dashboards, and controlled Smart View workflows that make approved planning tasks clear, efficient, secure, and traceable."
      exitGate="Approve the role journeys, form catalogue, input and review forms, rule actions, dashboards, Smart View package, access behavior, usability, performance, reconciliation, and operating guide"
      exitGateIcon={<LayoutDashboard size={18} />}
      feedback={feedback}
      lessons={formsDashboardsSmartViewLessons}
      onSelectLesson={(id) => goToLesson(id as FormsDashboardsSmartViewLessonId)}
      onValidate={validateLesson}
      phase={16}
      prerequisite={{
        complete: prerequisiteComplete,
        message: "Complete Phase 15 so forms and Smart View launch stable, governed rules with approved prompts, messages, expected results, and job evidence.",
        href: "/learn/business-rules-groovy",
        linkLabel: "Open Phase 15",
      }}
      stage="Build · Forms, dashboards, and Smart View"
      title="Forms, Dashboards & Smart View"
      validateLabel={activeLesson === "ux-exit-gate" ? "Approve UX package" : undefined}
    >
      {activeLesson === "ux-foundations" && <UxFoundations selected={readiness} onToggle={(item) => toggle(setReadiness, item)} />}
      {activeLesson === "form-design-contract" && <FormDesignContract journeyAnswers={journeyAnswers} onJourney={(id, value) => setJourneyAnswers((current) => ({ ...current, [id]: value }))} formAnswers={formDesignAnswers} onForm={(id, value) => setFormDesignAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "planning-input-forms" && <PlanningInputForms inputs={formInputs} onInput={setFormInputs} result={formResult} submitted={submitted} onSubmit={() => setSubmitted(true)} />}
      {activeLesson === "form-rules-validation" && <FormRulesValidation answers={formBehaviorAnswers} onAnswer={(id, value) => setFormBehaviorAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "decision-dashboards" && <DecisionDashboards answers={dashboardAnswers} onAnswer={(id, value) => setDashboardAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "smart-view" && <SmartViewLesson answers={smartViewAnswers} onAnswer={(id, value) => setSmartViewAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "ux-performance-testing" && <UxPerformanceTesting answers={testAnswers} onAnswer={(id, value) => setTestAnswers((current) => ({ ...current, [id]: value }))} reconciled={reconciled} onReconcile={(item) => toggle(setReconciled, item)} />}
      {activeLesson === "ux-walkthrough" && <UxWalkthrough selected={walkthroughChecks} onToggle={(item) => toggle(setWalkthroughChecks, item)} />}
      {activeLesson === "ux-homework" && <UxHomework active={activeHomework} onActive={setActiveHomework} status={homeworkStatus} journeyAnswers={journeyAnswers} onJourney={(id, value) => setJourneyAnswers((current) => ({ ...current, [id]: value }))} formAnswers={formDesignAnswers} onForm={(id, value) => setFormDesignAnswers((current) => ({ ...current, [id]: value }))} inputs={formInputs} onInput={setFormInputs} result={formResult} submitted={submitted} onSubmit={() => setSubmitted(true)} dashboardAnswers={dashboardAnswers} onDashboard={(id, value) => setDashboardAnswers((current) => ({ ...current, [id]: value }))} smartViewAnswers={smartViewAnswers} onSmartView={(id, value) => setSmartViewAnswers((current) => ({ ...current, [id]: value }))} sequence={sequence} onSequence={(item) => toggle(setSequence, item)} reconciled={reconciled} onReconcile={(item) => toggle(setReconciled, item)} readout={readout} onReadout={setReadout} />}
      {activeLesson === "ux-exit-gate" && <UxExitGate selected={artifacts} onToggle={(item) => toggle(setArtifacts, item)} summary={summary} onSummary={setSummary} answers={knowledgeAnswers} onAnswer={(id, value) => setKnowledgeAnswers((current) => ({ ...current, [id]: value }))} preview={preview} />}
    </LearningModuleFrame>
  );
}

function UxFoundations({ selected, onToggle }: { selected: string[]; onToggle: (item: string) => void }) {
  const layers = [
    ["Navigation", "Show the role's next task and relevant artifacts."],
    ["Plan1 forms", "Collect owned inputs and review detailed calculations."],
    ["Phase 15 actions", "Validate, calculate, move, and record job evidence."],
    ["ApexPlan dashboards", "Present reconciled decisions and exceptions."],
    ["Smart View", "Support governed connected analysis and limited input."],
  ] as const;
  return <><Lead icon={<Users size={23} />} eyebrow="Design around work, not artifacts" title="Give each role the shortest clear path from owned input to validated decision, while keeping context, security, calculations, and evidence visible." /><p className={base.bodyCopy}>A good Oracle Planning experience does not reproduce an uncontrolled spreadsheet. It guides users through approved tasks, protects calculated results, explains exceptions, and uses Smart View as another governed interface to the same Planning data.</p><div className={styles.layerGrid}>{layers.map(([title, detail]) => <article key={title}><strong>{title}</strong><span>{detail}</span></article>)}</div><div className={design.designSequence}>{["Role", "Task", "Context", "Input", "Validate", "Calculate", "Review", "Decide"].map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong>{index < 7 && <ArrowRight size={13} />}</div>)}</div><h3 className={sales.sectionTitle}>Confirm UX readiness</h3><SelectionGrid items={uxReadinessControls} selected={selected} onToggle={onToggle} /><div className={sales.boundary}><div><strong>Plan1 experience</strong><span>Owned input, detailed calculations, forms, validations, comments, rule actions, operational exceptions, and controlled adjustments.</span></div><div><strong>ApexPlan ASO experience</strong><span>Reconciled aggregate dashboards, management comparisons, drill paths, and Smart View reporting—not duplicated input logic.</span></div></div></>;
}

function FormDesignContract({ journeyAnswers, onJourney, formAnswers, onForm }: { journeyAnswers: Answers; onJourney: (id: string, value: string) => void; formAnswers: Answers; onForm: (id: string, value: string) => void }) {
  const downloads = [["phase-16-forms-dashboards-smart-view-practice-pack.zip", "Complete practice pack"], ["README.md", "Instructions and capture guide"], ["role-task-map.csv", "Role and task map"], ["form-catalogue.csv", "Form catalogue"], ["dashboard-kpi-catalogue.csv", "Dashboard KPI catalogue"], ["smart-view-test-script.csv", "Smart View procedure"], ["expected-ux-results.csv", "Expected results"], ["ux-test-cases.csv", "UX test cases"], ["ux-performance-baseline.csv", "Performance baseline"], ["ux-exception-log.csv", "Exception log"]] as const;
  return <><Lead icon={<Table2 size={23} />} eyebrow="Catalogue before configuration" title="Define each role journey and each form's purpose, cube, context, layout, cell behavior, actions, expected size, and acceptance evidence before building it." /><div className={sales.downloadGrid}>{downloads.map(([file, label]) => <a download href={`${packPath}${file}`} key={file}><Download size={17} /><div><strong>{label}</strong><small>{file}</small></div></a>)}</div><h3 className={sales.sectionTitle}>Map roles to the correct experience</h3><DecisionTable items={personaJourneyCases} answers={journeyAnswers} onAnswer={onJourney} label="role-journey response" /><h3 className={sales.sectionTitle}>Control form layout and behavior</h3><DecisionTable items={formDesignCases} answers={formAnswers} onAnswer={onForm} label="form-design response" /></>;
}

function PlanningInputForms(props: FormLabProps) {
  return <><Lead icon={<Table2 size={23} />} eyebrow="Focused input with protected outputs" title="Configure the production allocation task so planners edit only owned plant starts, while hours, totals, lot controls, and downstream calculations remain governed." /><div className={styles.formPrinciples}>{["Visible Forecast / Working / FY25 context", "Writable plant allocations only", "Protected hours and company totals", "20-unit lot validation", "Required business comment", "Deliberate save and calculate action"].map((item) => <span key={item}><Check size={14} />{item}</span>)}</div><FormLab {...props} /><div className={styles.referenceNote}><ShieldCheck size={20} /><div><strong>One form belongs to one cube</strong><span>Use Plan1 for this detailed write-and-calculate task. Move only approved results to ApexPlan ASO for aggregate reporting; do not reproduce detailed calculations in dashboard formulas.</span></div></div></>;
}

function FormRulesValidation({ answers, onAnswer }: AnswerProps) {
  return <><Lead icon={<PlayCircle size={23} />} eyebrow="Explain every action" title="Integrate inline validation, save behavior, menus, runtime prompts, Phase 15 rules, progress, completion messages, jobs, and refreshed results into one understandable flow." /><div className={styles.actionFlow}>{["Edit owned cells", "Validate immediately", "Save inputs", "Confirm rule scope", "Run governed action", "Inspect result and job", "Refresh and reconcile"].map((item, index) => <article key={item}><span>{index + 1}</span><strong>{item}</strong></article>)}</div><div className={styles.warningBox}><TriangleAlert size={20} /><div><strong>A hidden prompt is still calculation scope</strong><span>When form members populate runtime prompts, the resolved value must be unambiguous, allowed, visible through context, and tested with the intended user. Do not let a saved last value silently override the form.</span></div></div><DecisionTable items={formBehaviorCases} answers={answers} onAnswer={onAnswer} label="form-behavior response" /></>;
}

function DecisionDashboards({ answers, onAnswer }: AnswerProps) {
  return <><Lead icon={<LayoutDashboard size={23} />} eyebrow="From totals to decisions" title="Build a small management dashboard that shows current context, target or prior comparison, material exceptions, ownership, and a traceable path to governed detail." /><DashboardPreview /><DecisionTable items={dashboardCases} answers={answers} onAnswer={onAnswer} label="dashboard-design response" /></>;
}

function SmartViewLesson({ answers, onAnswer }: AnswerProps) {
  return <><Lead icon={<FileSpreadsheet size={23} />} eyebrow="Connected spreadsheet discipline" title="Use Smart View for governed forms and ad hoc analysis while keeping Planning context, security, calculations, submission, refresh, and reconciliation authoritative." /><div className={styles.smartViewFlow}>{["Connect", "Open approved form or ad hoc", "Verify visible POV", "Refresh", "Edit authorized level-zero cells", "Submit", "Refresh again", "Reconcile"].map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></div>)}</div><div className={styles.referenceNote}><FileSpreadsheet size={20} /><div><strong>Refresh after changing POV</strong><span>Smart View writes to the latest selected POV. Refresh after changing context, verify the visible grid, submit only authorized cells, then refresh and compare the result with the web form or reporting control.</span></div></div><DecisionTable items={smartViewCases} answers={answers} onAnswer={onAnswer} label="Smart-View response" /></>;
}

function UxPerformanceTesting({ answers, onAnswer, reconciled, onReconcile }: AnswerProps & { reconciled: string[]; onReconcile: (item: string) => void }) {
  return <><Lead icon={<Gauge size={23} />} eyebrow="Representative user proof" title="Test what the planner experiences: first open, repeated open, refresh, save, rule launch, dashboard filtering, Smart View, accessibility, security, and recovery." /><div className={styles.testGrid}>{[["Form", "open · refresh · save · calculate"], ["Dashboard", "load · filter · drill · return"], ["Smart View", "connect · refresh · submit · reconcile"], ["Security", "open · read · write · launch"], ["Accessibility", "keyboard · focus · labels · status"], ["Recovery", "message · retry · restart · evidence"]].map(([title, detail]) => <article key={title}><strong>{title}</strong><span>{detail}</span></article>)}</div><DecisionTable items={uxTestCases} answers={answers} onAnswer={onAnswer} label="UX-test response" /><h3 className={sales.sectionTitle}>Confirm cross-channel reconciliation</h3><SelectionGrid items={uxReconciliationControls} selected={reconciled} onToggle={onReconcile} /></>;
}

function UxWalkthrough({ selected, onToggle }: { selected: string[]; onToggle: (item: string) => void }) {
  return <><Lead icon={<Camera size={23} />} eyebrow="End-to-end planner evidence" title="Capture one consistent planning cycle from role navigation through input, rule execution, review, dashboard decision, Smart View submission, ad hoc analysis, and reconciliation." /><p className={base.bodyCopy}>Screenshots are required in this phase because layout, writable-versus-protected behavior, visible POV, rule context, dashboard filters, and Smart View actions cannot be understood from text alone.</p><SelectionGrid items={uxWalkthroughControls} selected={selected} onToggle={onToggle} /><ScreenshotWalkthrough /><div className={sales.scopeTag}>Add screenshots only after the Phase 16 form names, folders, POVs, actions, dashboard KPIs, Smart View templates, and security assumptions are stable.</div></>;
}

function UxHomework(props: {
  active: HomeworkId; onActive: (id: HomeworkId) => void; status: Record<HomeworkId, boolean>;
  journeyAnswers: Answers; onJourney: (id: string, value: string) => void; formAnswers: Answers; onForm: (id: string, value: string) => void;
  inputs: FormInputs; onInput: (value: FormInputs) => void; result: ReturnType<typeof calculateForm>; submitted: boolean; onSubmit: () => void;
  dashboardAnswers: Answers; onDashboard: (id: string, value: string) => void; smartViewAnswers: Answers; onSmartView: (id: string, value: string) => void;
  sequence: string[]; onSequence: (item: string) => void; reconciled: string[]; onReconcile: (item: string) => void; readout: string; onReadout: (value: string) => void;
}) {
  const mission = uxHomeworkMissions.find((item) => item.id === props.active)!;
  const completed = Object.values(props.status).filter(Boolean).length;
  return <><Lead icon={<BookOpenCheck size={23} />} eyebrow="Applied planner workspace" title="Prove that a real role can complete one production-planning task across web forms, rules, dashboards, and Smart View without losing context or control." /><div className={base.homeworkMissionGrid}>{uxHomeworkMissions.map((item, index) => <button className={`${props.active === item.id ? base.homeworkMissionActive : ""} ${props.status[item.id] ? base.homeworkMissionDone : ""}`} key={item.id} onClick={() => props.onActive(item.id)} type="button"><span>{props.status[item.id] ? <CheckCircle2 size={17} /> : String(index + 1).padStart(2, "0")}</span><div><strong>{item.title}</strong><small>{item.output}</small></div></button>)}</div><div className={base.homeworkProgress}><div><span style={{ width: `${completed / uxHomeworkMissions.length * 100}%` }} /></div><strong>{completed} of {uxHomeworkMissions.length} missions complete</strong></div><section className={base.homeworkWorkspace}><header><div><small>Active mission</small><strong>{mission.title}</strong></div><span>{mission.output}</span></header>{props.active === "journey" && <><DecisionTable items={personaJourneyCases} answers={props.journeyAnswers} onAnswer={props.onJourney} label="role-journey response" /><DecisionTable items={formDesignCases} answers={props.formAnswers} onAnswer={props.onForm} label="form-design response" /></>}{props.active === "form" && <FormLab inputs={props.inputs} onInput={props.onInput} result={props.result} submitted={props.submitted} onSubmit={props.onSubmit} />}{props.active === "dashboard" && <><DashboardPreview /><DecisionTable items={dashboardCases} answers={props.dashboardAnswers} onAnswer={props.onDashboard} label="dashboard-design response" /></>}{props.active === "smartview" && <DecisionTable items={smartViewCases} answers={props.smartViewAnswers} onAnswer={props.onSmartView} label="Smart-View response" />}{props.active === "readout" && <><h3 className={sales.sectionTitle}>Confirm the user execution order</h3><SequenceList items={uxExecutionSequence} selected={props.sequence} onToggle={props.onSequence} /><h3 className={sales.sectionTitle}>Confirm cross-channel controls</h3><SelectionGrid items={uxReconciliationControls} selected={props.reconciled} onToggle={props.onReconcile} /><label className={sales.summaryField}>UX release recommendation<textarea rows={12} value={props.readout} onChange={(event) => props.onReadout(event.target.value)} placeholder="Summarize roles and tasks, navigation, forms and cubes, visible POV, writable and protected behavior, validation, rule actions and jobs, dashboard KPIs and filters, Smart View refresh-submit-refresh, access, usability, accessibility, performance, reconciliation, exceptions, limitations, owners, reviewers, and recommendation." /><small>{props.readout.trim().length}/240 minimum characters</small></label></>}</section></>;
}

function UxExitGate({ selected, onToggle, summary, onSummary, answers, onAnswer, preview }: { selected: string[]; onToggle: (item: string) => void; summary: string; onSummary: (value: string) => void; answers: Answers; onAnswer: (id: string, value: string) => void; preview: string }) {
  return <><Lead icon={<ClipboardCheck size={23} />} eyebrow="Phase deliverable" title="Hand off a coherent planner experience that Phase 17 can secure and place into workflow without redesigning forms, rules, dashboards, or Smart View behavior." /><h3 className={sales.sectionTitle}>Deliverable checklist</h3><SelectionGrid items={uxArtifacts} selected={selected} onToggle={onToggle} /><label className={sales.summaryField}>UX release-readiness summary<textarea rows={12} value={summary} onChange={(event) => onSummary(event.target.value)} placeholder="Summarize role journeys, navigation, form catalogue, cube ownership, POVs, cell behavior, validations, rule actions, messages, dashboards, KPI definitions, filters, drill paths, Smart View templates and submission, access behavior, usability, accessibility, performance, reconciliation, exceptions, support, limitations, owners, reviewers, and approval." /><small>{summary.trim().length}/240 minimum characters</small></label><h3 className={sales.sectionTitle}>Knowledge check</h3><div className={base.quizList}>{uxKnowledgeQuestions.map((question, index) => <fieldset key={question.id}><legend><span>{index + 1}</span>{question.prompt}</legend>{question.options.map((option) => <label key={option}><input checked={answers[question.id] === option} name={question.id} onChange={() => onAnswer(question.id, option)} type="radio" />{option}</label>)}</fieldset>)}</div><div className={sales.preview}><small>Generated Phase 16 handoff</small><p>{preview}</p><div>Governed rules <ArrowRight size={13} /> Planner experience <ArrowRight size={13} /> Security and workflow</div></div></>;
}

function FormLab({ inputs, onInput, result, submitted, onSubmit }: FormLabProps) {
  return <section className={styles.formLab}><header><div><Table2 size={18} /><div><small>PLAN1 · PRODUCTION ALLOCATION</small><strong>Forecast / Working / FY25</strong></div></div><span>{result.valid ? "Inputs valid" : "Resolve validation"}</span></header><div className={styles.formInstructions}>Enter owned production starts in {inputs.lotSize}-unit lots. Required hours and company totals are protected calculations.</div><div className={styles.formTable}><div className={styles.formHead}><strong>Entity</strong><strong>Planned starts</strong><strong>Required hours</strong><strong>Status</strong></div><div><strong>Pune</strong><input aria-label="Pune planned starts" min="0" type="number" value={inputs.puneUnits} onChange={(event) => onInput({ ...inputs, puneUnits: Number(event.target.value) })} /><span>{format(result.puneHours, 1)}</span><em className={result.puneLotValid ? styles.valid : styles.invalid}>{result.puneLotValid ? "Valid lot" : "Use lot multiple"}</em></div><div><strong>Noida</strong><input aria-label="Noida planned starts" min="0" type="number" value={inputs.noidaUnits} onChange={(event) => onInput({ ...inputs, noidaUnits: Number(event.target.value) })} /><span>{format(result.noidaHours, 1)}</span><em className={result.noidaLotValid ? styles.valid : styles.invalid}>{result.noidaLotValid ? "Valid lot" : "Use lot multiple"}</em></div><div className={styles.totalRow}><strong>Company</strong><span>{format(result.totalUnits)}</span><span>{format(result.totalHours, 1)}</span><em className={result.totalUnits === 1380 ? styles.valid : styles.invalid}>{result.totalUnits === 1380 ? "Reconciled" : "Expected 1,380"}</em></div></div><label className={styles.commentField}>Planning comment<textarea rows={3} value={inputs.comment} onChange={(event) => onInput({ ...inputs, comment: event.target.value })} placeholder="Explain how the allocation aligns with approved demand, inventory, capacity, and open exceptions." /><small>{inputs.comment.trim().length}/40 minimum characters</small></label>{submitted && <div className={`${styles.submitResult} ${result.valid && result.totalUnits === 1380 && inputs.comment.trim().length >= 40 ? styles.submitSuccess : styles.submitError}`}>{result.valid && result.totalUnits === 1380 && inputs.comment.trim().length >= 40 ? <><CheckCircle2 size={18} /><span>Submission accepted: 1,380 starts and 690 required hours are ready for the governed calculation.</span></> : <><TriangleAlert size={18} /><span>Submission blocked: correct lot multiples, company total, or planning comment.</span></>}</div>}<footer><p>Protected calculations: required hours = planned starts ÷ 2.</p><button onClick={onSubmit} type="button"><PlayCircle size={15} />Validate and submit form</button></footer></section>;
}

function DashboardPreview() {
  const metrics = [["Production starts", "1,380", "820 Pune · 560 Noida"], ["Net revenue", "559,579.64", "Approved commercial result"], ["Gross margin", "202,724.10", "Revenue less governed COGS"], ["Net income", "88,293.07", "Management-planning result"], ["Closing cash", "383,448.80", "Three-statement reconciliation"], ["Balance control", "0.00", "Full-precision control passed"]] as const;
  return <section className={styles.dashboardPreview}><header><div><BarChart3 size={19} /><div><small>APEXPLAN ASO · MANAGEMENT OUTLOOK</small><strong>Forecast / Working / FY25 · Company</strong></div></div><span>Reconciled</span></header><div>{metrics.map(([label, value, detail]) => <article key={label}><small>{label}</small><strong>{value}</strong><span>{detail}</span></article>)}</div><footer><strong>Decision focus</strong><span>Capacity exception, gross-margin movement, cash effect, and balance status—with drill paths to governed detail.</span></footer></section>;
}

function ScreenshotWalkthrough() {
  return <section className={sales.walkthrough}><div className={sales.walkthroughHeader}><div><Camera size={20} /><div><small>Screenshot-guided procedure</small><strong>Forms, dashboards, and Smart View walkthrough</strong></div></div><span>{uxScreenshots.length} guided steps</span></div><div className={sales.walkthroughGrid}>{uxScreenshots.map((step, index) => <article key={step.id}><div className={sales.stepTitle}><span>{String(index + 1).padStart(2, "0")}</span><div><small>{step.id}</small><strong>{step.title}</strong></div></div><OracleScreenshot asset={step.asset} capture={step.capture} className={sales.screenshot} phase="phase-16" title={step.title} /><dl><div><dt>Navigation</dt><dd>{step.path}</dd></div><div><dt>Trainee action</dt><dd>{step.action}</dd></div><div><dt>Validation evidence</dt><dd>{step.evidence}</dd></div></dl></article>)}</div></section>; 
}

function Lead({ icon, eyebrow, title }: { icon: React.ReactNode; eyebrow: string; title: string }) { return <div className={base.lessonLead}>{icon}<div><small>{eyebrow}</small><strong>{title}</strong></div></div>; }
function SelectionGrid({ items, selected, onToggle }: { items: readonly string[]; selected: string[]; onToggle: (item: string) => void }) { return <div className={design.selectionGrid}>{items.map((item) => <button className={selected.includes(item) ? design.selectedCard : ""} key={item} onClick={() => onToggle(item)} type="button">{selected.includes(item) ? <CheckCircle2 size={17} /> : <span />}<strong>{item}</strong></button>)}</div>; }
function DecisionTable({ items, answers, onAnswer, label }: { items: readonly { id: string; issue: string; correct: string; options: readonly string[] }[]; answers: Answers; onAnswer: (id: string, value: string) => void; label: string }) { return <div className={design.mappingTable}>{items.map((item) => <div className={design.tableRow} key={item.id}><div><strong>{item.id}</strong><small>{item.issue}</small></div><select aria-label={`${item.id} ${label}`} value={answers[item.id] ?? ""} onChange={(event) => onAnswer(item.id, event.target.value)}><option value="">Select controlled response</option>{item.options.map((option) => <option key={option}>{option}</option>)}</select></div>)}</div>; }
function SequenceList({ items, selected, onToggle }: { items: readonly string[]; selected: string[]; onToggle: (item: string) => void }) { return <div className={sales.sequence}>{items.map((item) => <button className={selected.includes(item) ? sales.confirmed : ""} key={item} onClick={() => onToggle(item)} type="button"><strong>{item}</strong><span>{selected.includes(item) ? <Check size={15} /> : "Confirm"}</span></button>)}</div>; }

function calculateForm(input: FormInputs) {
  const numericValid = input.puneUnits >= 0 && input.noidaUnits >= 0 && input.lotSize > 0;
  const puneLotValid = numericValid && input.puneUnits % input.lotSize === 0;
  const noidaLotValid = numericValid && input.noidaUnits % input.lotSize === 0;
  const totalUnits = input.puneUnits + input.noidaUnits;
  const puneHours = input.puneUnits / 2;
  const noidaHours = input.noidaUnits / 2;
  return { valid: numericValid && puneLotValid && noidaLotValid, puneLotValid, noidaLotValid, totalUnits, puneHours, noidaHours, totalHours: puneHours + noidaHours };
}
function format(value: number, digits = 0) { return value.toLocaleString(undefined, { minimumFractionDigits: digits, maximumFractionDigits: digits }); }

type AnswerProps = { answers: Answers; onAnswer: (id: string, value: string) => void };
type FormLabProps = { inputs: FormInputs; onInput: (value: FormInputs) => void; result: ReturnType<typeof calculateForm>; submitted: boolean; onSubmit: () => void };
