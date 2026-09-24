"use client";

import {
  ArrowRight,
  BookOpenCheck,
  Boxes,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  Database,
  ExternalLink,
  GitBranch,
  Grid3X3,
  Info,
  Layers3,
  Network,
  Settings2,
  TableProperties,
  Workflow,
} from "lucide-react";
import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from "react";
import {
  applicationDecisions,
  applicationDimensionDesignLessons,
  dimensionDesignArtifacts,
  dimensionHomeworkMissions,
  dimensionKnowledgeQuestions,
  dimensionRoleCases,
  grainCases,
  hierarchyCases,
  homeworkGrainCases,
  homeworkIntersectionCases,
  homeworkPropertyCases,
  intersectionCases,
  planTypeCases,
  propertyCases,
  requiredDimensions,
  screenshotWalkthroughs,
  type ApplicationDimensionDesignLessonId,
} from "@/content/application-dimension-design-module";
import { solutionArchitectureLessons } from "@/content/solution-architecture-module";
import { readTrackProgress, writeTrackProgress } from "@/lib/learning-progress";
import base from "./discovery-module.module.css";
import { LearningModuleFrame, type ModuleFeedback } from "./learning-module-frame";
import styles from "./application-dimension-design-module.module.css";

type HomeworkId = (typeof dimensionHomeworkMissions)[number]["id"];
type HomeworkText = { blueprint: string; readout: string };
type WalkthroughStep =
  | (typeof screenshotWalkthroughs.application)[number]
  | (typeof screenshotWalkthroughs.hierarchy)[number]
  | (typeof screenshotWalkthroughs.intersections)[number];

export function ApplicationDimensionDesignModule() {
  const [activeLesson, setActiveLesson] = useState<ApplicationDimensionDesignLessonId>("dimension-orientation");
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<ModuleFeedback>(null);
  const [applicationAnswers, setApplicationAnswers] = useState<Record<string, string>>({});
  const [dimensionAnswers, setDimensionAnswers] = useState<Record<string, string>>({});
  const [grainAnswers, setGrainAnswers] = useState<Record<string, string>>({});
  const [dimensions, setDimensions] = useState<string[]>([]);
  const [hierarchyAnswers, setHierarchyAnswers] = useState<Record<string, string>>({});
  const [propertyAnswers, setPropertyAnswers] = useState<Record<string, string>>({});
  const [planTypeAnswers, setPlanTypeAnswers] = useState<Record<string, string>>({});
  const [intersectionAnswers, setIntersectionAnswers] = useState<Record<string, string>>({});
  const [performancePattern, setPerformancePattern] = useState("");
  const [activeHomework, setActiveHomework] = useState<HomeworkId>("blueprint");
  const [homeworkText, setHomeworkText] = useState<HomeworkText>({ blueprint: "", readout: "" });
  const [homeworkGrainAnswers, setHomeworkGrainAnswers] = useState<Record<string, string>>({});
  const [homeworkPropertyAnswers, setHomeworkPropertyAnswers] = useState<Record<string, string>>({});
  const [homeworkIntersectionAnswers, setHomeworkIntersectionAnswers] = useState<Record<string, string>>({});
  const [artifacts, setArtifacts] = useState<string[]>([]);
  const [designSummary, setDesignSummary] = useState("");
  const [knowledgeAnswers, setKnowledgeAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = readTrackProgress("implementation");
      setCompletedLessons(stored.completedLessons);
      const saved = applicationDimensionDesignLessons.find((lesson) => lesson.id === stored.activeLesson);
      if (saved) setActiveLesson(saved.id);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const architectureComplete = solutionArchitectureLessons.every((lesson) => completedLessons.includes(lesson.id));
  const homeworkStatus: Record<HomeworkId, boolean> = {
    blueprint: homeworkText.blueprint.trim().length >= 180,
    grain: homeworkGrainCases.every((item) => homeworkGrainAnswers[item.id] === item.correct),
    properties: homeworkPropertyCases.every((item) => homeworkPropertyAnswers[item.id] === item.correct),
    intersections: homeworkIntersectionCases.every((item) => homeworkIntersectionAnswers[item.id] === item.correct),
    readout: homeworkText.readout.trim().length >= 220,
  };
  const homeworkReady = Object.values(homeworkStatus).every(Boolean);
  const knowledgeReady = dimensionKnowledgeQuestions.every((item) => knowledgeAnswers[item.id] === item.correct);
  const designPreview = useMemo(() => {
    if (artifacts.length !== dimensionDesignArtifacts.length || designSummary.trim().length < 200) {
      return "Complete the eight design deliverables and summarize the approved design in at least 200 characters.";
    }
    return `${designSummary.trim()} Phase 07 may build metadata only from this controlled baseline and must reconcile member counts, properties, hierarchies, cube assignments, valid intersections, and refresh results.`;
  }, [artifacts, designSummary]);

  function persist(nextCompleted: string[], lesson: ApplicationDimensionDesignLessonId) {
    writeTrackProgress("implementation", {
      completedLessons: nextCompleted,
      activeLesson: lesson,
      activeModuleId: "implementation-application-dimension-design",
      lastVisited: new Date().toISOString(),
    });
  }

  function goToLesson(id: ApplicationDimensionDesignLessonId) {
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
    if (activeLesson === "dimension-orientation") {
      markComplete("Design sequence confirmed. Approved business grain and controls will drive the Oracle application structure.");
      return;
    }
    if (activeLesson === "application-blueprint") {
      const correct = applicationDecisions.every((item) => applicationAnswers[item.id] === item.correct);
      if (!correct) {
        setFeedback({ tone: "error", message: "Recheck the application type, calendar, currency, task-flow, cube, and naming decisions. Each must follow the approved architecture." });
        return;
      }
      markComplete("The application setup decision sheet and screenshot-guided runbook are ready for a controlled training-tenant walkthrough.");
      return;
    }
    if (activeLesson === "dimension-grain") {
      const correctRoles = dimensionRoleCases.every((item) => dimensionAnswers[item.id] === item.correct);
      const correctGrains = grainCases.every((item) => grainAnswers[item.id] === item.correct);
      const completeInventory = requiredDimensions.every((item) => dimensions.includes(item));
      if (!correctRoles || !correctGrains || !completeInventory) {
        setFeedback({ tone: "error", message: "Map every role and measure grain correctly, then include the complete approved dimension inventory." });
        return;
      }
      markComplete("Dimension roles, measure grains, and the minimum complete inventory are defined.");
      return;
    }
    if (activeLesson === "hierarchy-properties") {
      const correctHierarchy = hierarchyCases.every((item) => hierarchyAnswers[item.id] === item.correct);
      const correctProperties = propertyCases.every((item) => propertyAnswers[item.id] === item.correct);
      if (!correctHierarchy || !correctProperties) {
        setFeedback({ tone: "error", message: "Recheck hierarchy paths and property treatments that affect aggregation, time balance, storage, and alternate rollups." });
        return;
      }
      markComplete("Hierarchy levels and high-impact member properties are specified and tied to the Oracle editor walkthrough.");
      return;
    }
    if (activeLesson === "plan-types-intersections") {
      const correctPlanTypes = planTypeCases.every((item) => planTypeAnswers[item.id] === item.correct);
      const correctIntersections = intersectionCases.every((item) => intersectionAnswers[item.id] === item.correct);
      if (!correctPlanTypes || !correctIntersections || performancePattern !== "validate") {
        setFeedback({ tone: "error", message: "Correct the cube purposes, intersection controls, governed data movement, and representative performance-validation approach." });
        return;
      }
      markComplete("Cube participation, valid intersections, data movement, and performance assumptions are ready for build specifications.");
      return;
    }
    if (activeLesson === "dimension-homework") {
      if (!homeworkReady) {
        setFeedback({ tone: "error", message: "Complete all five applied design missions. Together they form the evidence for the final design review." });
        return;
      }
      markComplete("Applied design homework complete. The case decisions are ready for the exit review.");
      return;
    }
    if (artifacts.length !== dimensionDesignArtifacts.length || designSummary.trim().length < 200 || !knowledgeReady) {
      setFeedback({ tone: "error", message: "Select all eight deliverables, provide a 200-character readiness summary, and answer all five knowledge checks correctly." });
      return;
    }
    markComplete("Phase 06 exit gate passed. The approved application and dimension design is ready for Metadata Build.");
  }

  function toggle(setter: Dispatch<SetStateAction<string[]>>, item: string) {
    setter((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item]);
  }

  return (
    <LearningModuleFrame
      activeLessonId={activeLesson}
      completedLessons={completedLessons}
      description="Convert the approved architecture into a governed Oracle Planning application, cube, dimension, hierarchy, property, grain, and valid-intersection blueprint."
      exitGate="Approve the application and dimension design baseline"
      exitGateIcon={<Grid3X3 size={18} />}
      feedback={feedback}
      lessons={applicationDimensionDesignLessons}
      onSelectLesson={(id) => goToLesson(id as ApplicationDimensionDesignLessonId)}
      onValidate={validateLesson}
      phase={6}
      prerequisite={{ complete: architectureComplete, message: "Complete Solution Architecture before defining detailed application structures and intersections.", href: "/learn/solution-architecture", linkLabel: "Return to Phase 05" }}
      stage="Design · Detailed design module"
      title="Application & Dimension Design"
      validateLabel={activeLesson === "dimension-handoff" ? "Approve design package" : undefined}
    >
      {activeLesson === "dimension-orientation" && <Orientation />}
      {activeLesson === "application-blueprint" && <ApplicationBlueprint values={applicationAnswers} onChange={(id, value) => setApplicationAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "dimension-grain" && <DimensionGrain values={dimensionAnswers} onChange={(id, value) => setDimensionAnswers((current) => ({ ...current, [id]: value }))} grains={grainAnswers} onGrain={(id, value) => setGrainAnswers((current) => ({ ...current, [id]: value }))} selected={dimensions} onToggle={(item) => toggle(setDimensions, item)} />}
      {activeLesson === "hierarchy-properties" && <HierarchyProperties hierarchies={hierarchyAnswers} onHierarchy={(id, value) => setHierarchyAnswers((current) => ({ ...current, [id]: value }))} properties={propertyAnswers} onProperty={(id, value) => setPropertyAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "plan-types-intersections" && <PlanTypesIntersections planTypes={planTypeAnswers} onPlanType={(id, value) => setPlanTypeAnswers((current) => ({ ...current, [id]: value }))} intersections={intersectionAnswers} onIntersection={(id, value) => setIntersectionAnswers((current) => ({ ...current, [id]: value }))} performance={performancePattern} onPerformance={setPerformancePattern} />}
      {activeLesson === "dimension-homework" && <DesignHomework active={activeHomework} onActive={setActiveHomework} status={homeworkStatus} text={homeworkText} onText={(field, value) => setHomeworkText((current) => ({ ...current, [field]: value }))} grainAnswers={homeworkGrainAnswers} onGrain={(id, value) => setHomeworkGrainAnswers((current) => ({ ...current, [id]: value }))} propertyAnswers={homeworkPropertyAnswers} onProperty={(id, value) => setHomeworkPropertyAnswers((current) => ({ ...current, [id]: value }))} intersectionAnswers={homeworkIntersectionAnswers} onIntersection={(id, value) => setHomeworkIntersectionAnswers((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "dimension-handoff" && <DesignHandoff selected={artifacts} onToggle={(item) => toggle(setArtifacts, item)} summary={designSummary} onSummary={setDesignSummary} answers={knowledgeAnswers} onAnswer={(id, value) => setKnowledgeAnswers((current) => ({ ...current, [id]: value }))} preview={designPreview} />}
    </LearningModuleFrame>
  );
}

function Orientation() {
  const sequence = ["Approved architecture", "Setup decisions", "Planning grain", "Dimensions", "Hierarchies / properties", "Cubes / intersections", "Controlled specification"];
  return <>
    <div className={base.lessonLead}><Grid3X3 size={23} /><div><small>Detailed design objective</small><strong>Design only the Oracle structures required by approved decisions, calculations, controls, and reporting.</strong></div></div>
    <p className={base.bodyCopy}>Dimensions categorize data and members form their hierarchies. A reliable design begins with the lowest meaningful business grain, keeps shared structures conformed, prevents invalid combinations, and specifies behavior before metadata is created. The Oracle screens implement approved decisions; they do not replace the design process.</p>
    <div className={styles.designSequence}>{sequence.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong>{index < sequence.length - 1 && <ArrowRight size={13} />}</div>)}</div>
    <div className={styles.principleGrid}><article><TableProperties size={20} /><strong>Grain first</strong><p>Define what one editable or calculated value means before introducing dimensionality.</p></article><article><Network size={20} /><strong>Conformed structures</strong><p>Reuse controlled members and rollups where processes share business meaning.</p></article><article><Settings2 size={20} /><strong>Properties matter</strong><p>Account type, time balance, storage, aggregation, and cube validity change results.</p></article><article><Database size={20} /><strong>Performance is designed</strong><p>Cube scope, dimension density/order, block behavior, rules, and retrieval require representative testing.</p></article></div>
    <div className={base.boundaryGrid}><div><strong>Phase 06 produces</strong><span>An approved configuration specification, screenshot-guided runbook, dimensional model, hierarchy/property design, cube participation, valid intersections, and acceptance evidence.</span></div><div><strong>Phase 07 performs</strong><span>Controlled metadata creation/import, validation, refresh, reconciliation, error correction, migration evidence, and build-level regression checks.</span></div></div>
  </>;
}

function ApplicationBlueprint({ values, onChange }: { values: Record<string, string>; onChange: (id: string, value: string) => void }) {
  return <>
    <div className={base.lessonLead}><Workflow size={23} /><div><small>Application setup walkthrough</small><strong>Approve high-impact setup values, then follow the Oracle creation sequence in a disposable training business process.</strong></div></div>
    <div className={styles.wizardBar}>{["Purpose", "Calendar", "Currency / process", "Cubes / names", "Review"].map((item, index) => <div key={item}><span>{index + 1}</span><strong>{item}</strong></div>)}</div>
    <div className={styles.decisionList}>{applicationDecisions.map((item) => <article key={item.id}><div><span>{item.id}</span><strong>{item.label}</strong></div><select aria-label={item.label} value={values[item.id] ?? ""} onChange={(event) => onChange(item.id, event.target.value)}><option value="">Select approved decision</option>{item.options.map((option) => <option key={option}>{option}</option>)}</select></article>)}</div>
    <div className={styles.blueprintPreview}><small>NovaDrive case blueprint</small><strong>Production &amp; Sales Planning</strong><div><span>Custom Planning</span><span>Approved monthly corporate calendar</span><span>Connected weekly production detail</span><span>Governed multicurrency</span><span>Stable cube and member names</span></div></div>
    <ScreenshotWalkthrough heading="Guided Oracle application-creation walkthrough" steps={screenshotWalkthroughs.application} />
    <div className={base.infoCallout}><Info size={19} /><div><strong>Destructive-step boundary</strong><p>Application creation is performed once in an empty, authorized training business process. If an application already exists, learners review the captured walkthrough and decision evidence; they must not delete or replace it.</p></div></div>
  </>;
}

function DimensionGrain({ values, onChange, grains, onGrain, selected, onToggle }: { values: Record<string, string>; onChange: (id: string, value: string) => void; grains: Record<string, string>; onGrain: (id: string, value: string) => void; selected: string[]; onToggle: (item: string) => void }) {
  const roleOptions = ["Account", "Entity", "Product", "Customer", "Plant", "Scenario", "Version"];
  const grainOptions = grainCases.map((item) => item.correct);
  return <>
    <div className={base.lessonLead}><Layers3 size={23} /><div><small>Dimensional model</small><strong>Translate business decisions into dimension roles and the lowest meaningful grain of each measure.</strong></div></div>
    <p className={base.bodyCopy}>A dimension belongs in a grain only when it changes the meaning, ownership, calculation, workflow, security, or required analysis of a value. Unnecessary dimensions multiply possible intersections and increase form, rule, data-load, and performance complexity.</p>
    <div className={styles.mappingTable}><div className={styles.tableHead}><span>Business requirement</span><span>Dimension role</span></div>{dimensionRoleCases.map((item) => <div className={styles.tableRow} key={item.id}><div><strong>{item.id}</strong><small>{item.need}</small></div><select aria-label={`${item.id} dimension role`} value={values[item.id] ?? ""} onChange={(event) => onChange(item.id, event.target.value)}><option value="">Select dimension</option>{roleOptions.map((option) => <option key={option}>{option}</option>)}</select></div>)}</div>
    <h3 className={styles.sectionTitle}>Measure-to-grain decisions</h3>
    <div className={styles.mappingTable}>{grainCases.map((item) => <div className={styles.tableRow} key={item.id}><div><strong>{item.id}</strong><small>{item.measure}</small></div><select aria-label={`${item.measure} grain`} value={grains[item.id] ?? ""} onChange={(event) => onGrain(item.id, event.target.value)}><option value="">Select lowest meaningful grain</option>{grainOptions.map((option) => <option key={option}>{option}</option>)}</select></div>)}</div>
    <h3 className={styles.sectionTitle}>Approve the case dimension inventory</h3>
    <div className={styles.selectionGrid}>{requiredDimensions.map((item) => <button className={selected.includes(item) ? styles.selectedCard : ""} key={item} onClick={() => onToggle(item)} type="button">{selected.includes(item) ? <CheckCircle2 size={17} /> : <span />}<strong>{item}</strong></button>)}</div>
  </>;
}

function HierarchyProperties({ hierarchies, onHierarchy, properties, onProperty }: { hierarchies: Record<string, string>; onHierarchy: (id: string, value: string) => void; properties: Record<string, string>; onProperty: (id: string, value: string) => void }) {
  const hierarchyOptions = hierarchyCases.map((item) => item.correct);
  const propertyOptions = propertyCases.map((item) => item.correct);
  return <>
    <div className={base.lessonLead}><GitBranch size={23} /><div><small>Hierarchy specification</small><strong>Design rollups and member behavior before creating or importing parent-child records.</strong></div></div>
    <div className={styles.hierarchyGrid}>{hierarchyCases.map((item) => <article key={item.id}><span>{item.id}</span><strong>{item.label}</strong><select value={hierarchies[item.id] ?? ""} onChange={(event) => onHierarchy(item.id, event.target.value)}><option value="">Select hierarchy path</option>{hierarchyOptions.map((option) => <option key={option}>{option}</option>)}</select></article>)}</div>
    <div className={styles.treePreview}><div><small>Product example</small><strong>All Products</strong><span>└ Product Family</span><span>&nbsp;&nbsp;└ Product Line</span><span>&nbsp;&nbsp;&nbsp;&nbsp;└ SKU</span></div><div><small>Entity example</small><strong>Global Company</strong><span>└ Region</span><span>&nbsp;&nbsp;└ Legal Entity</span><span>&nbsp;&nbsp;&nbsp;&nbsp;└ Responsibility Centre</span></div><div><small>Plant example</small><strong>All Plants</strong><span>└ Country / Region</span><span>&nbsp;&nbsp;└ Plant</span><span>&nbsp;&nbsp;&nbsp;&nbsp;└ Production Line</span></div></div>
    <h3 className={styles.sectionTitle}>Member-property impact lab</h3>
    <div className={styles.propertyList}>{propertyCases.map((item) => <article key={item.id}><div><span>{item.id}</span><strong>{item.member}</strong></div><label>Correct design treatment<select value={properties[item.id] ?? ""} onChange={(event) => onProperty(item.id, event.target.value)}><option value="">Select property treatment</option>{propertyOptions.map((option) => <option key={option}>{option}</option>)}</select></label></article>)}</div>
    <ScreenshotWalkthrough heading="Guided Oracle dimension-editor walkthrough" steps={screenshotWalkthroughs.hierarchy} />
  </>;
}

function PlanTypesIntersections({ planTypes, onPlanType, intersections, onIntersection, performance, onPerformance }: { planTypes: Record<string, string>; onPlanType: (id: string, value: string) => void; intersections: Record<string, string>; onIntersection: (id: string, value: string) => void; performance: string; onPerformance: (value: string) => void }) {
  const planTypeOptions = planTypeCases.map((item) => item.correct);
  const intersectionOptions = intersectionCases.map((item) => item.correct);
  return <>
    <div className={base.lessonLead}><Boxes size={23} /><div><small>Cube and intersection design</small><strong>Keep calculation grains focused, prevent meaningless entry, and move only governed results between cubes.</strong></div></div>
    <div className={styles.planTypeFlow}><div><small>PSP_MONTHLY · BSO</small><strong>Sales · Inventory · Cost · Financial impact</strong></div><ArrowRight size={16} /><div><small>Controlled data maps</small><strong>Aggregate · map · validate · reconcile</strong></div><ArrowRight size={16} /><div><small>PSP_RPT · ASO</small><strong>Cross-process management analysis</strong></div></div>
    <div className={styles.mappingTable}><div className={styles.tableHead}><span>Planning process</span><span>Case cube</span></div>{planTypeCases.map((item) => <div className={styles.tableRow} key={item.id}><div><strong>{item.id}</strong><small>{item.process}</small></div><select aria-label={`${item.id} cube`} value={planTypes[item.id] ?? ""} onChange={(event) => onPlanType(item.id, event.target.value)}><option value="">Select cube treatment</option>{planTypeOptions.map((option) => <option key={option}>{option}</option>)}</select></div>)}</div>
    <h3 className={styles.sectionTitle}>Valid-intersection and data-movement decisions</h3>
    <div className={styles.intersectionList}>{intersectionCases.map((item) => <article key={item.id}><div><span>{item.id}</span><strong>{item.rule}</strong></div><select aria-label={`${item.id} intersection response`} value={intersections[item.id] ?? ""} onChange={(event) => onIntersection(item.id, event.target.value)}><option value="">Select controlled response</option>{intersectionOptions.map((option) => <option key={option}>{option}</option>)}</select></article>)}</div>
    <fieldset className={styles.choiceGroup}><legend>How should density, order, and performance be designed?</legend><label><input checked={performance === "validate"} name="performance-design" onChange={() => onPerformance("validate")} type="radio" />Start with a documented Planning baseline, estimate volumes, then validate density, block size, dimension order, aggregation, rules, and retrieval against representative data and concurrency.</label><label><input checked={performance === "everything-dense"} name="performance-design" onChange={() => onPerformance("everything-dense")} type="radio" />Make every dimension dense and enable it in every cube so all combinations are immediately available.</label></fieldset>
    <ScreenshotWalkthrough heading="Guided Oracle cube and valid-intersection walkthrough" steps={screenshotWalkthroughs.intersections} />
    <div className={base.infoCallout}><Info size={19} /><div><strong>Valid intersections are not security</strong><p>They further restrict meaningful combinations available to a user who already has access. Security permissions must still be designed and tested separately.</p></div></div>
  </>;
}

function ScreenshotWalkthrough({ heading, steps }: { heading: string; steps: readonly WalkthroughStep[] }) {
  return <section className={styles.walkthrough}><div className={styles.walkthroughHeading}><div><Camera size={20} /><div><small>Screenshot-guided procedure</small><h3>{heading}</h3></div></div><span>{steps.length} capture slots</span></div><div className={styles.walkthroughSteps}>{steps.map((step, index) => <article key={step.id}><div className={styles.stepHeader}><span>{String(index + 1).padStart(2, "0")}</span><div><small>{step.id}</small><strong>{step.title}</strong></div></div><div className={styles.screenshotSlot}><Camera size={30} /><strong>Oracle screenshot reserved</strong><span>{step.asset}</span><p>{step.capture}</p></div><dl><div><dt>Navigation</dt><dd>{step.path}</dd></div><div><dt>Trainee action</dt><dd>{step.action}</dd></div><div><dt>Validation evidence</dt><dd>{step.evidence}</dd></div></dl>{"docUrl" in step && step.docUrl && <a href={step.docUrl} rel="noreferrer" target="_blank">Oracle reference <ExternalLink size={13} /></a>}</article>)}</div><p className={styles.captureNote}>Capture policy: use the training tenant only; hide environment URLs, user names, client data, notifications, and identifiers. Keep browser zoom and crop consistent. Store approved PNG files under <code>public/training/oracle-planning/phase-06/</code> using the filenames shown above.</p></section>;
}

function DesignHomework({ active, onActive, status, text, onText, grainAnswers, onGrain, propertyAnswers, onProperty, intersectionAnswers, onIntersection }: { active: HomeworkId; onActive: (id: HomeworkId) => void; status: Record<HomeworkId, boolean>; text: HomeworkText; onText: (field: keyof HomeworkText, value: string) => void; grainAnswers: Record<string, string>; onGrain: (id: string, value: string) => void; propertyAnswers: Record<string, string>; onProperty: (id: string, value: string) => void; intersectionAnswers: Record<string, string>; onIntersection: (id: string, value: string) => void }) {
  const mission = dimensionHomeworkMissions.find((item) => item.id === active)!;
  const completed = Object.values(status).filter(Boolean).length;
  const homeworkMap = (items: readonly { id: string; scenario: string; options: readonly string[] }[], values: Record<string, string>, onChange: (id: string, value: string) => void, label: string) => <div className={base.homeworkMap}>{items.map((item) => <article key={item.id}><div><span>{item.id}</span><p>{item.scenario}</p></div><select aria-label={`${item.id} ${label}`} value={values[item.id] ?? ""} onChange={(event) => onChange(item.id, event.target.value)}><option value="">Select design response</option>{item.options.map((option) => <option key={option}>{option}</option>)}</select></article>)}</div>;
  return <>
    <div className={base.lessonLead}><BookOpenCheck size={23} /><div><small>Applied design homework</small><strong>Produce five connected design outputs using the NovaDrive case.</strong></div></div>
    <p className={base.bodyCopy}>The homework tests decisions a Planning designer makes before build. It avoids unrelated trivia and creates evidence that can be reviewed by business, architecture, data, security, and build owners.</p>
    <div className={base.homeworkMissionGrid}>{dimensionHomeworkMissions.map((item, index) => <button className={`${active === item.id ? base.homeworkMissionActive : ""} ${status[item.id] ? base.homeworkMissionDone : ""}`} key={item.id} onClick={() => onActive(item.id)} type="button"><span>{status[item.id] ? <CheckCircle2 size={17} /> : String(index + 1).padStart(2, "0")}</span><div><strong>{item.title}</strong><small>{item.output}</small></div></button>)}</div>
    <div className={base.homeworkProgress}><div><span style={{ width: `${completed / dimensionHomeworkMissions.length * 100}%` }} /></div><strong>{completed} of {dimensionHomeworkMissions.length} missions complete</strong></div>
    <section className={base.homeworkWorkspace}><header><div><small>Active mission</small><strong>{mission.title}</strong></div><span>{mission.output}</span></header><p className={base.homeworkPurpose}>{mission.prompt}</p>
      {active === "blueprint" && <><div className={base.homeworkPrompt}><strong>Constraint</strong><p>The exercise must support connected monthly planning and weekly production detail without recreating an existing business process or accepting wizard defaults blindly.</p></div><label className={base.summaryField}>Application setup rationale<textarea rows={11} value={text.blueprint} onChange={(event) => onText("blueprint", event.target.value)} placeholder="Document application type, calendar, years, rolling forecast, task-flow type, main and local currencies, cube names/types/purposes, sandboxes, Strategic Modeling decision, initial dimensions, immutable/high-impact choices, owner, reviewer, and approval evidence." /><small>{text.blueprint.trim().length}/180 minimum characters</small></label></>}
      {active === "grain" && <><div className={base.homeworkPrompt}><strong>Grain challenge</strong><p>Select the lowest meaningful grain. Extra dimensions are not automatically more detailed or more correct.</p></div>{homeworkMap(homeworkGrainCases, grainAnswers, onGrain, "grain")}</>}
      {active === "properties" && <><div className={base.homeworkPrompt}><strong>Calculation-behavior challenge</strong><p>Choose the design response that produces correct time and hierarchy aggregation.</p></div>{homeworkMap(homeworkPropertyCases, propertyAnswers, onProperty, "property treatment")}</>}
      {active === "intersections" && <><div className={base.homeworkPrompt}><strong>Combination-control challenge</strong><p>Use cube participation, neutral members, data maps, or valid intersections deliberately; do not misuse security to define data grain.</p></div>{homeworkMap(homeworkIntersectionCases, intersectionAnswers, onIntersection, "intersection control")}</>}
      {active === "readout" && <><div className={base.homeworkPrompt}><strong>Review scenario</strong><p>The structure is largely agreed, but production-line ownership is unresolved, Finance requests a new analysis attribute, and representative volume testing has not yet run.</p></div><label className={base.summaryField}>Design review and build-readiness recommendation<textarea rows={13} value={text.readout} onChange={(event) => onText("readout", event.target.value)} placeholder="Summarize setup, grains, dimensions, hierarchies, properties, cubes, data maps, intersections, volumes/performance approach, security dependencies, screenshot/runbook status, decisions accepted, unresolved items with owners/dates, risks, approvals, and whether metadata build may begin conditionally or must wait." /><small>{text.readout.trim().length}/220 minimum characters</small></label></>}
    </section>
  </>;
}

function DesignHandoff({ selected, onToggle, summary, onSummary, answers, onAnswer, preview }: { selected: string[]; onToggle: (item: string) => void; summary: string; onSummary: (value: string) => void; answers: Record<string, string>; onAnswer: (id: string, value: string) => void; preview: string }) {
  return <>
    <div className={base.lessonLead}><ClipboardCheck size={23} /><div><small>Phase deliverable</small><strong>Baseline the design package that Phase 07 will use to create, load, validate, and reconcile metadata.</strong></div></div>
    <h3 className={styles.sectionTitle}>Deliverable checklist</h3>
    <div className={styles.selectionGrid}>{dimensionDesignArtifacts.map((item) => <button className={selected.includes(item) ? styles.selectedCard : ""} key={item} onClick={() => onToggle(item)} type="button">{selected.includes(item) ? <CheckCircle2 size={17} /> : <span />}<strong>{item}</strong></button>)}</div>
    <label className={styles.summaryField}>Application and dimension design readiness summary<textarea rows={11} value={summary} onChange={(event) => onSummary(event.target.value)} placeholder="Summarize approved setup and walkthrough evidence, grains, dimensions and owners, hierarchy/property conventions, cube purposes and participation, valid intersections, data maps, volumes/performance approach, dependencies, risks, open decisions with owners/dates, reviewers, approvals, and Phase 07 build conditions." /><small>{summary.trim().length}/200 minimum characters</small></label>
    <h3 className={styles.sectionTitle}>Knowledge check</h3>
    <div className={base.quizList}>{dimensionKnowledgeQuestions.map((question, index) => <fieldset key={question.id}><legend><span>{index + 1}</span>{question.prompt}</legend>{question.options.map((option) => <label key={option}><input checked={answers[question.id] === option} name={question.id} onChange={() => onAnswer(question.id, option)} type="radio" />{option}</label>)}</fieldset>)}</div>
    <div className={styles.preview}><small>Generated design handoff</small><p>{preview}</p><div>Architecture baseline <ArrowRight size={13} /> Application &amp; dimension design <ArrowRight size={13} /> Metadata build</div></div>
  </>;
}
