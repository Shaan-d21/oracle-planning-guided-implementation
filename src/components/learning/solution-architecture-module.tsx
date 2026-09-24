"use client";

import {
  ArrowDown,
  ArrowRight,
  BookOpenCheck,
  Boxes,
  CheckCircle2,
  CloudCog,
  DatabaseZap,
  FileCheck2,
  GitBranch,
  Info,
  KeyRound,
  Network,
  ServerCog,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from "react";
import { requirementTraceabilityLessons } from "@/content/requirement-traceability-module";
import {
  architectureArtifacts,
  architectureHomeworkMissions,
  architectureKnowledgeQuestions,
  experienceCases,
  homeworkApplicationCases,
  homeworkNfrCases,
  integrationCases,
  nfrCases,
  requiredArchitectureControls,
  requiredPlanningComponents,
  solutionArchitectureLessons,
  sourceSystemCases,
  type SolutionArchitectureLessonId,
} from "@/content/solution-architecture-module";
import { readTrackProgress, writeTrackProgress } from "@/lib/learning-progress";
import base from "./discovery-module.module.css";
import { LearningModuleFrame, type ModuleFeedback } from "./learning-module-frame";
import styles from "./solution-architecture-module.module.css";

type HomeworkId = (typeof architectureHomeworkMissions)[number]["id"];
type HomeworkText = { boundary: string; integration: string; adr: string };

export function SolutionArchitectureModule() {
  const [activeLesson, setActiveLesson] = useState<SolutionArchitectureLessonId>("architecture-foundations");
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<ModuleFeedback>(null);
  const [sourceAnswers, setSourceAnswers] = useState<Record<string, string>>({});
  const [boundaryNote, setBoundaryNote] = useState("");
  const [architecturePattern, setArchitecturePattern] = useState("");
  const [components, setComponents] = useState<string[]>([]);
  const [experienceAnswers, setExperienceAnswers] = useState<Record<string, string>>({});
  const [integrationAnswers, setIntegrationAnswers] = useState<Record<string, string>>({});
  const [environmentPattern, setEnvironmentPattern] = useState("");
  const [securityPattern, setSecurityPattern] = useState("");
  const [nfrAnswers, setNfrAnswers] = useState<Record<string, string>>({});
  const [controls, setControls] = useState<string[]>([]);
  const [activeHomework, setActiveHomework] = useState<HomeworkId>("boundary");
  const [homeworkText, setHomeworkText] = useState<HomeworkText>({ boundary: "", integration: "", adr: "" });
  const [applicationAnswers, setApplicationAnswers] = useState<Record<string, string>>({});
  const [homeworkNfrAnswers, setHomeworkNfrAnswers] = useState<Record<string, string>>({});
  const [artifacts, setArtifacts] = useState<string[]>([]);
  const [architectureSummary, setArchitectureSummary] = useState("");
  const [knowledgeAnswers, setKnowledgeAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = readTrackProgress("implementation");
      setCompletedLessons(stored.completedLessons);
      const saved = solutionArchitectureLessons.find((lesson) => lesson.id === stored.activeLesson);
      if (saved) setActiveLesson(saved.id);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const prerequisiteComplete = requirementTraceabilityLessons.every((lesson) => completedLessons.includes(lesson.id));
  const homeworkStatus: Record<HomeworkId, boolean> = {
    boundary: homeworkText.boundary.trim().length >= 160,
    application: homeworkApplicationCases.every((item) => applicationAnswers[item.id] === item.correct),
    integration: homeworkText.integration.trim().length >= 180,
    nfr: homeworkNfrCases.every((item) => homeworkNfrAnswers[item.id] === item.correct),
    adr: homeworkText.adr.trim().length >= 180,
  };
  const homeworkReady = Object.values(homeworkStatus).every(Boolean);
  const knowledgeReady = architectureKnowledgeQuestions.every((item) => knowledgeAnswers[item.id] === item.correct);
  const packagePreview = useMemo(() => {
    if (artifacts.length !== architectureArtifacts.length || architectureSummary.trim().length < 180) {
      return "Complete the eight architecture deliverables and write a decision summary of at least 180 characters.";
    }
    return `${architectureSummary.trim()} The package establishes the baseline for detailed application and dimension design; unresolved decisions remain owned and dated rather than silently assumed.`;
  }, [artifacts, architectureSummary]);

  function persist(nextCompleted: string[], lesson: SolutionArchitectureLessonId) {
    writeTrackProgress("implementation", {
      completedLessons: nextCompleted,
      activeLesson: lesson,
      activeModuleId: "implementation-solution-architecture",
      lastVisited: new Date().toISOString(),
    });
  }

  function goToLesson(id: SolutionArchitectureLessonId) {
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

  function validateLesson() {
    if (activeLesson === "architecture-foundations") {
      markComplete("Architecture purpose confirmed. Major solution responsibilities will be decided before detailed configuration.");
      return;
    }
    if (activeLesson === "system-context") {
      const mapped = sourceSystemCases.every((item) => sourceAnswers[item.id] === item.correct);
      if (!mapped || boundaryNote.trim().length < 100) {
        setFeedback({ tone: "error", message: "Correct every source-of-record mapping and write a boundary statement of at least 100 characters." });
        return;
      }
      markComplete("Source ownership, Planning responsibility, and downstream consumption are explicitly separated.");
      return;
    }
    if (activeLesson === "component-architecture") {
      const allComponents = requiredPlanningComponents.every((item) => components.includes(item));
      const experiencesCorrect = experienceCases.every((item) => experienceAnswers[item.id] === item.correct);
      if (architecturePattern !== "connected" || !allComponents || !experiencesCorrect) {
        setFeedback({ tone: "error", message: "Select the connected pattern, include all required capabilities, and match every user need to its governed experience." });
        return;
      }
      markComplete("The connected application and experience architecture is ready for detailed design.");
      return;
    }
    if (activeLesson === "integration-architecture") {
      const correct = integrationCases.every((item) => integrationAnswers[item.id] === item.correct);
      if (!correct) {
        setFeedback({ tone: "error", message: "Recheck each flow. A production interface needs ownership, validation, rejection, recovery, reconciliation, monitoring, and evidence—not transport alone." });
        return;
      }
      markComplete("Inbound and outbound flows now include the controls needed for production operation.");
      return;
    }
    if (activeLesson === "architecture-controls") {
      const allControls = requiredArchitectureControls.every((item) => controls.includes(item));
      const nfrCorrect = nfrCases.every((item) => nfrAnswers[item.id] === item.correct);
      if (environmentPattern !== "dev-test-prod" || securityPattern !== "least-privilege" || !nfrCorrect || !allControls) {
        setFeedback({ tone: "error", message: "Confirm controlled environments, least-privilege access, every measurable NFR response, and all eight operational controls." });
        return;
      }
      markComplete("Environment, security, performance, recovery, audit, release, and support controls are defined.");
      return;
    }
    if (activeLesson === "architecture-homework") {
      if (!homeworkReady) {
        setFeedback({ tone: "error", message: "Complete all five connected architecture missions. Each output is used in the final review package." });
        return;
      }
      markComplete("Applied architecture homework complete. The decisions are ready for review and packaging.");
      return;
    }
    if (artifacts.length !== architectureArtifacts.length || architectureSummary.trim().length < 180 || !knowledgeReady) {
      setFeedback({ tone: "error", message: "Select all eight deliverables, provide a 180-character decision summary, and answer all five knowledge checks correctly." });
      return;
    }
    markComplete("Phase 05 exit gate passed. The controlled architecture baseline is ready for Application & Dimension Design.");
  }

  function toggle(setter: Dispatch<SetStateAction<string[]>>, item: string) {
    setter((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item]);
  }

  return (
    <LearningModuleFrame
      activeLessonId={activeLesson}
      completedLessons={completedLessons}
      description="Turn the approved requirements baseline into a secure, integrated, measurable, and supportable Oracle Planning solution blueprint."
      exitGate="Approve the architecture baseline for detailed design"
      exitGateIcon={<Network size={18} />}
      feedback={feedback}
      lessons={solutionArchitectureLessons}
      onSelectLesson={(id) => goToLesson(id as SolutionArchitectureLessonId)}
      onValidate={validateLesson}
      phase={5}
      prerequisite={{ complete: prerequisiteComplete, message: "Complete Requirement Traceability before making architecture decisions against the approved baseline.", href: "/learn/requirement-traceability", linkLabel: "Return to Phase 04" }}
      stage="Design · Architecture module"
      title="Solution Architecture"
      validateLabel={activeLesson === "architecture-handoff" ? "Approve architecture" : undefined}
    >
      {activeLesson === "architecture-foundations" && <Orientation />}
      {activeLesson === "system-context" && <SystemContext values={sourceAnswers} onChange={(id, value) => setSourceAnswers((current) => ({ ...current, [id]: value }))} note={boundaryNote} onNote={setBoundaryNote} />}
      {activeLesson === "component-architecture" && <ComponentArchitecture pattern={architecturePattern} onPattern={setArchitecturePattern} selected={components} onToggle={(item) => toggle(setComponents, item)} experienceAnswers={experienceAnswers} onExperience={(id, value) => setExperienceAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "integration-architecture" && <IntegrationArchitecture values={integrationAnswers} onChange={(id, value) => setIntegrationAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "architecture-controls" && <ArchitectureControls environment={environmentPattern} onEnvironment={setEnvironmentPattern} security={securityPattern} onSecurity={setSecurityPattern} nfrAnswers={nfrAnswers} onNfr={(id, value) => setNfrAnswers((current) => ({ ...current, [id]: value }))} selected={controls} onToggle={(item) => toggle(setControls, item)} />}
      {activeLesson === "architecture-homework" && <ArchitectureHomework active={activeHomework} onActive={setActiveHomework} status={homeworkStatus} text={homeworkText} onText={(field, value) => setHomeworkText((current) => ({ ...current, [field]: value }))} applicationAnswers={applicationAnswers} onApplication={(id, value) => setApplicationAnswers((current) => ({ ...current, [id]: value }))} nfrAnswers={homeworkNfrAnswers} onNfr={(id, value) => setHomeworkNfrAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "architecture-handoff" && <ArchitectureHandoff selected={artifacts} onToggle={(item) => toggle(setArtifacts, item)} summary={architectureSummary} onSummary={setArchitectureSummary} answers={knowledgeAnswers} onAnswer={(id, value) => setKnowledgeAnswers((current) => ({ ...current, [id]: value }))} preview={packagePreview} />}
    </LearningModuleFrame>
  );
}

function Orientation() {
  return <>
    <div className={base.lessonLead}><Network size={23} /><div><small>Architecture objective</small><strong>Make major solution decisions explicit before detailed application design and configuration.</strong></div></div>
    <p className={base.bodyCopy}>Solution architecture translates approved requirements into boundaries, capabilities, flows, controls, and measurable quality targets. It explains why the solution is shaped a certain way and who owns each dependency. It is not a product-feature list or a polished diagram with unresolved decisions hidden behind it.</p>
    <div className={styles.principleGrid}>
      <article><Boxes size={20} /><strong>Business-led</strong><p>Every component and interface traces to an approved process, requirement, control, or quality need.</p></article>
      <article><DatabaseZap size={20} /><strong>Governed data</strong><p>Sources of record, grain, mappings, validation, reconciliation, recovery, and ownership are explicit.</p></article>
      <article><ShieldCheck size={20} /><strong>Secure by design</strong><p>Identity, least privilege, segregation of duties, service access, and evidence are part of the blueprint.</p></article>
      <article><ServerCog size={20} /><strong>Operable by design</strong><p>Performance, availability, release, rollback, monitoring, support, and continuity are testable.</p></article>
    </div>
    <div className={base.boundaryGrid}><div><strong>Decide in Phase 05</strong><span>System boundaries, capability pattern, integrations, experiences, environments, security, NFR responses, dependencies, and architecture decisions.</span></div><div><strong>Leave for Phase 06 and build</strong><span>Exact dimensions, hierarchies, plan types, valid intersections, forms, rules, jobs, mappings, and Oracle configuration steps.</span></div></div>
    <div className={base.infoCallout}><Info size={19} /><div><strong>Why there are no Oracle screenshots here</strong><p>This phase produces technology and control decisions before the application is configured. Architecture diagrams and decision records are the correct evidence. Product walkthroughs begin when the approved design is translated into Oracle screens.</p></div></div>
  </>;
}

function SystemContext({ values, onChange, note, onNote }: { values: Record<string, string>; onChange: (id: string, value: string) => void; note: string; onNote: (value: string) => void }) {
  const options = [...new Set(sourceSystemCases.map((item) => item.correct))];
  return <>
    <div className={base.lessonLead}><CloudCog size={23} /><div><small>System context</small><strong>Make authoritative ownership and the Oracle Planning boundary unambiguous.</strong></div></div>
    <p className={base.bodyCopy}>Start outside-in. Identify who creates and owns information, what Planning needs at an approved grain, what Planning calculates or governs, and which consumers receive approved outputs. Copying data into Planning does not transfer business ownership automatically.</p>
    <div className={styles.contextFlow}><div><small>Authoritative sources</small><strong>CRM · ERP · MES · WMS · Procurement</strong></div><ArrowRight size={18} /><div className={styles.integrationLayer}><small>Governed integration</small><strong>Validate · map · load · reconcile · recover</strong></div><ArrowRight size={18} /><div><small>Planning boundary</small><strong>Plan · simulate · calculate · approve</strong></div><ArrowRight size={18} /><div><small>Consumers</small><strong>ERP · BI · operations · management</strong></div></div>
    <h3 className={base.sectionTitle}>Source-of-record mapping</h3>
    <div className={styles.mappingList}>{sourceSystemCases.map((item) => <article key={item.id}><div><span>{item.id}</span><strong>{item.source}</strong><small>{item.evidence}</small></div><label>Authoritative domain<select value={values[item.id] ?? ""} onChange={(event) => onChange(item.id, event.target.value)}><option value="">Select owned data</option>{options.map((option) => <option key={option}>{option}</option>)}</select></label></article>)}</div>
    <label className={styles.summaryField}>Boundary and ownership statement<textarea rows={6} value={note} onChange={(event) => onNote(event.target.value)} placeholder="State what remains authoritative outside Planning, what Planning owns, the approved inbound grain, which outputs leave Planning, and who owns unresolved boundaries." /><small>{note.trim().length}/100 minimum characters</small></label>
  </>;
}

function ComponentArchitecture({ pattern, onPattern, selected, onToggle, experienceAnswers, onExperience }: { pattern: string; onPattern: (value: string) => void; selected: string[]; onToggle: (item: string) => void; experienceAnswers: Record<string, string>; onExperience: (id: string, value: string) => void }) {
  return <>
    <div className={base.lessonLead}><Boxes size={23} /><div><small>Application architecture</small><strong>Choose a connected capability pattern, then fit experiences to business activities.</strong></div></div>
    <p className={base.bodyCopy}>A connected solution does not mean forcing every process into one physical grain. It means shared business meaning, controlled movements between capability areas, consistent scenario governance, and traceable financial impact. Phase 06 decides the exact plan-type and dimension structures.</p>
    <fieldset className={styles.choiceGroup}><legend>Which conceptual pattern fits the approved future state?</legend><label><input checked={pattern === "connected"} name="architecture-pattern" onChange={() => onPattern("connected")} type="radio" />Connected capability areas using conformed dimensions, governed data movement, shared scenarios, and integrated financial impact.</label><label><input checked={pattern === "silos"} name="architecture-pattern" onChange={() => onPattern("silos")} type="radio" />Independent departmental applications with conflicting masters and manual spreadsheet reconciliation.</label></fieldset>
    <div className={styles.componentStack}><div><small>User experiences</small><strong>Forms · Dashboards · Smart View · Reports · Task flow</strong></div><ArrowDown size={16} /><div><small>Planning capabilities</small><strong>Sales · Inventory · Production · Cost / COGS · Financial impact</strong></div><ArrowDown size={16} /><div><small>Shared governance</small><strong>Calendar · Scenarios · Versions · Workflow · Security · Integration</strong></div></div>
    <h3 className={base.sectionTitle}>Required capabilities</h3>
    <div className={styles.selectionGrid}>{requiredPlanningComponents.map((item) => <button className={selected.includes(item) ? styles.selectedCard : ""} key={item} onClick={() => onToggle(item)} type="button">{selected.includes(item) ? <CheckCircle2 size={17} /> : <span />}<strong>{item}</strong></button>)}</div>
    <h3 className={base.sectionTitle}>Experience-fit decisions</h3>
    <div className={styles.caseList}>{experienceCases.map((item) => <article key={item.id}><p>{item.need}</p><select aria-label={`${item.id} experience`} value={experienceAnswers[item.id] ?? ""} onChange={(event) => onExperience(item.id, event.target.value)}><option value="">Select governed experience</option>{item.options.map((option) => <option key={option}>{option}</option>)}</select></article>)}</div>
  </>;
}

function IntegrationArchitecture({ values, onChange }: { values: Record<string, string>; onChange: (id: string, value: string) => void }) {
  return <>
    <div className={base.lessonLead}><GitBranch size={23} /><div><small>Integration design</small><strong>Design every business flow through successful processing, rejection, recovery, and reconciliation.</strong></div></div>
    <div className={styles.controlChain}>{["Trigger", "Extract", "Validate", "Map", "Load", "Reconcile", "Notify / recover"].map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong>{index < 6 && <ArrowRight size={13} />}</div>)}</div>
    <div className={styles.caseList}>{integrationCases.map((item) => <article key={item.id}><div><strong>{item.flow}</strong><p>{item.need}</p></div><select aria-label={`${item.id} integration pattern`} value={values[item.id] ?? ""} onChange={(event) => onChange(item.id, event.target.value)}><option value="">Select governed pattern</option>{item.options.map((option) => <option key={option}>{option}</option>)}</select></article>)}</div>
    <div className={base.infoCallout}><Info size={19} /><div><strong>Method comes after control intent</strong><p>File, REST, EPM Integration Agent, Data Integration, or another pipeline may implement transport and orchestration. The architecture must first establish owner, grain, frequency, SLA, credentials, validation, rejects, restart behavior, reconciliation, monitoring, retention, and support.</p></div></div>
  </>;
}

function ArchitectureControls({ environment, onEnvironment, security, onSecurity, nfrAnswers, onNfr, selected, onToggle }: { environment: string; onEnvironment: (value: string) => void; security: string; onSecurity: (value: string) => void; nfrAnswers: Record<string, string>; onNfr: (id: string, value: string) => void; selected: string[]; onToggle: (item: string) => void }) {
  return <>
    <div className={base.lessonLead}><KeyRound size={23} /><div><small>Operational architecture</small><strong>Make promotion, access, quality, recovery, and support measurable before build begins.</strong></div></div>
    <h3 className={base.sectionTitle}>Environment and release topology</h3>
    <div className={styles.environmentFlow}><button className={environment === "dev-test-prod" ? styles.activeFlow : ""} onClick={() => onEnvironment("dev-test-prod")} type="button"><span>Development</span><ArrowRight size={15} /><span>Test</span><ArrowRight size={15} /><span>Production</span><small>Build and unit test → SIT / UAT / performance → approved release, rollback, smoke test, reconcile</small></button><button className={environment === "direct-prod" ? styles.activeFlow : ""} onClick={() => onEnvironment("direct-prod")} type="button"><span>Developer</span><ArrowRight size={15} /><span>Production</span><small>Direct configuration without independent validation or rollback evidence</small></button></div>
    <fieldset className={styles.choiceGroup}><legend>Which identity and access model is supportable?</legend><label><input checked={security === "least-privilege"} name="security-pattern" onChange={() => onSecurity("least-privilege")} type="radio" />SSO and approved groups mapped to role-based least privilege, sensitive duties separated, service identities controlled, and access reviewed.</label><label><input checked={security === "shared-admin"} name="security-pattern" onChange={() => onSecurity("shared-admin")} type="radio" />A shared administrator account used by planners and integrations to simplify support.</label></fieldset>
    <h3 className={base.sectionTitle}>Turn non-functional needs into architecture responses</h3>
    <div className={styles.caseList}>{nfrCases.map((item) => <article key={item.id}><p>{item.scenario}</p><select aria-label={`${item.id} NFR response`} value={nfrAnswers[item.id] ?? ""} onChange={(event) => onNfr(item.id, event.target.value)}><option value="">Select measurable response</option>{item.options.map((option) => <option key={option}>{option}</option>)}</select></article>)}</div>
    <h3 className={base.sectionTitle}>Required operational controls</h3>
    <div className={styles.selectionGrid}>{requiredArchitectureControls.map((item) => <button className={selected.includes(item) ? styles.selectedCard : ""} key={item} onClick={() => onToggle(item)} type="button">{selected.includes(item) ? <CheckCircle2 size={17} /> : <span />}<strong>{item}</strong></button>)}</div>
  </>;
}

function ArchitectureHomework({ active, onActive, status, text, onText, applicationAnswers, onApplication, nfrAnswers, onNfr }: { active: HomeworkId; onActive: (id: HomeworkId) => void; status: Record<HomeworkId, boolean>; text: HomeworkText; onText: (field: keyof HomeworkText, value: string) => void; applicationAnswers: Record<string, string>; onApplication: (id: string, value: string) => void; nfrAnswers: Record<string, string>; onNfr: (id: string, value: string) => void }) {
  const mission = architectureHomeworkMissions.find((item) => item.id === active)!;
  const completed = Object.values(status).filter(Boolean).length;
  return <>
    <div className={base.lessonLead}><BookOpenCheck size={23} /><div><small>Applied homework</small><strong>Produce five connected architecture outputs using the NovaDrive case.</strong></div></div>
    <p className={base.bodyCopy}>These are implementation artifacts, not random questions. Together they prove that you can define ownership, choose a solution pattern, make a flow operable, translate quality needs, and document a consequential decision.</p>
    <div className={base.homeworkMissionGrid}>{architectureHomeworkMissions.map((item, index) => <button className={`${active === item.id ? base.homeworkMissionActive : ""} ${status[item.id] ? base.homeworkMissionDone : ""}`} key={item.id} onClick={() => onActive(item.id)} type="button"><span>{status[item.id] ? <CheckCircle2 size={17} /> : String(index + 1).padStart(2, "0")}</span><div><strong>{item.title}</strong><small>{item.output}</small></div></button>)}</div>
    <div className={base.homeworkProgress}><div><span style={{ width: `${completed / architectureHomeworkMissions.length * 100}%` }} /></div><strong>{completed} of {architectureHomeworkMissions.length} missions complete</strong></div>
    <section className={base.homeworkWorkspace}>
      <header><div><small>Active mission</small><strong>{mission.title}</strong></div><span>{mission.output}</span></header><p className={base.homeworkPurpose}>{mission.prompt}</p>
      {active === "boundary" && <><div className={base.homeworkPrompt}><strong>NovaDrive context</strong><p>Operational systems remain authoritative, while Planning owns governed forecasts, scenarios, connected calculations, workflow, approvals, and approved plan outputs.</p></div><label className={base.summaryField}>Boundary decision<textarea rows={10} value={text.boundary} onChange={(event) => onText("boundary", event.target.value)} placeholder="Cover CRM, ERP, MES, WMS, procurement, Planning ownership, inbound and outbound responsibilities, authoritative corrections, consumers, and unresolved ownership with an accountable owner." /><small>{text.boundary.trim().length}/160 minimum characters</small></label></>}
      {active === "application" && <><div className={base.homeworkPrompt}><strong>Architecture-option challenge</strong><p>Choose the response that preserves authoritative ownership, connected business meaning, and an appropriate planning/reporting boundary.</p></div><div className={base.homeworkMap}>{homeworkApplicationCases.map((item) => <article key={item.id}><div><span>{item.id}</span><p>{item.scenario}</p></div><select aria-label={`${item.id} architecture decision`} value={applicationAnswers[item.id] ?? ""} onChange={(event) => onApplication(item.id, event.target.value)}><option value="">Select justified decision</option>{item.options.map((option) => <option key={option}>{option}</option>)}</select></article>)}</div></>}
      {active === "integration" && <><div className={base.homeworkPrompt}><strong>Critical flow</strong><p>Choose ERP actuals inbound or approved plan outbound. Describe both the happy path and controlled failure path.</p></div><label className={base.summaryField}>Operable integration narrative<textarea rows={11} value={text.integration} onChange={(event) => onText("integration", event.target.value)} placeholder="Include business owner, technical owner, source/target, grain, trigger/frequency/SLA, method, credentials, validation, mappings, rejects, restart/idempotency, control totals, reconciliation, alerts, evidence retention, support and recovery." /><small>{text.integration.trim().length}/180 minimum characters</small></label></>}
      {active === "nfr" && <><div className={base.homeworkPrompt}><strong>Quality-to-control challenge</strong><p>Select a measurable, testable response for performance, failed processing, and controlled production promotion.</p></div><div className={base.homeworkMap}>{homeworkNfrCases.map((item) => <article key={item.id}><div><span>{item.id}</span><p>{item.scenario}</p></div><select aria-label={`${item.id} control response`} value={nfrAnswers[item.id] ?? ""} onChange={(event) => onNfr(item.id, event.target.value)}><option value="">Select control decision</option>{item.options.map((option) => <option key={option}>{option}</option>)}</select></article>)}</div></>}
      {active === "adr" && <><div className={base.homeworkPrompt}><strong>Decision scenario</strong><p>Sales plans monthly by product-customer, production plans weekly by product-plant-line, and both must reconcile to shared scenarios and financial outcomes.</p></div><label className={base.summaryField}>Architecture decision record<textarea rows={11} value={text.adr} onChange={(event) => onText("adr", event.target.value)} placeholder="Record title/status/date, context and requirement IDs, constraints, options considered, chosen conceptual pattern, rationale, consequences/trade-offs, conformed business meaning, dependencies, risks, owner/approvers, and review trigger. Do not invent the Phase 06 physical design." /><small>{text.adr.trim().length}/180 minimum characters</small></label></>}
    </section>
    <div className={base.infoCallout}><Info size={19} /><div><strong>Excluded on purpose</strong><p>Exact dimensions, hierarchies, plan types, valid intersections, forms, business rules, jobs, and Oracle screen steps belong to detailed design and build phases.</p></div></div>
  </>;
}

function ArchitectureHandoff({ selected, onToggle, summary, onSummary, answers, onAnswer, preview }: { selected: string[]; onToggle: (item: string) => void; summary: string; onSummary: (value: string) => void; answers: Record<string, string>; onAnswer: (id: string, value: string) => void; preview: string }) {
  return <>
    <div className={base.lessonLead}><FileCheck2 size={23} /><div><small>Phase deliverable</small><strong>Assemble the minimum architecture package required for review, approval, and detailed design.</strong></div></div>
    <h3 className={base.sectionTitle}>Deliverable checklist</h3>
    <div className={styles.selectionGrid}>{architectureArtifacts.map((item) => <button className={selected.includes(item) ? styles.selectedCard : ""} key={item} onClick={() => onToggle(item)} type="button">{selected.includes(item) ? <CheckCircle2 size={17} /> : <span />}<strong>{item}</strong></button>)}</div>
    <label className={styles.summaryField}>Architecture review and readiness summary<textarea rows={10} value={summary} onChange={(event) => onSummary(event.target.value)} placeholder="Summarize the approved boundary and pattern, important flows and experiences, environments/security/NFR controls, major ADRs and trade-offs, dependencies, assumptions, risks, open decisions with owners/dates, approval participants, and readiness recommendation for Phase 06." /><small>{summary.trim().length}/180 minimum characters</small></label>
    <h3 className={base.sectionTitle}>Knowledge check</h3>
    <div className={base.quizList}>{architectureKnowledgeQuestions.map((question, index) => <fieldset key={question.id}><legend><span>{index + 1}</span>{question.prompt}</legend>{question.options.map((option) => <label key={option}><input checked={answers[question.id] === option} name={question.id} onChange={() => onAnswer(question.id, option)} type="radio" />{option}</label>)}</fieldset>)}</div>
    <div className={styles.preview}><small>Generated architecture handoff</small><p>{preview}</p><div>Approved RTM <ArrowRight size={13} /> Architecture baseline <ArrowRight size={13} /> Application &amp; dimension design</div></div>
  </>;
}
