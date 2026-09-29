"use client";

import {
  ArrowRight,
  BookOpenCheck,
  Calculator,
  Camera,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Download,
  Factory,
  Gauge,
  Info,
  PackageCheck,
  PlayCircle,
  Scale,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from "react";
import {
  allocationCases,
  capacityCases,
  demandHandoffCases,
  exceptionCases,
  formDesignCases,
  productionArtifacts,
  productionBuildSequence,
  productionHomeworkMissions,
  productionKnowledgeQuestions,
  productionPlanningLessons,
  productionReadinessControls,
  productionReconciliationControls,
  productionScreenshots,
  requirementCases,
  type ProductionPlanningLessonId,
} from "@/content/production-planning-build-module";
import { salesPlanningLessons } from "@/content/sales-planning-build-module";
import { readTrackProgress, writeTrackProgress } from "@/lib/learning-progress";
import design from "./application-dimension-design-module.module.css";
import base from "./discovery-module.module.css";
import sales from "./sales-planning-build-module.module.css";
import styles from "./production-planning-build-module.module.css";
import { LearningModuleFrame, type ModuleFeedback } from "./learning-module-frame";
import { OracleScreenshot } from "./oracle-screenshot";

type Answers = Record<string, string>;
type HomeworkId = (typeof productionHomeworkMissions)[number]["id"];
type ProductionInputs = { demand: number; beginning: number; target: number; yieldPct: number; lotSize: number };
type AllocationInputs = { planned: number; puneShare: number; lotSize: number; puneCapacity: number; noidaCapacity: number };

const packPath = "/training/oracle-planning/phase-10/";
const defaultProduction: ProductionInputs = { demand: 1301.348, beginning: 250, target: 300, yieldPct: 98, lotSize: 20 };
const defaultAllocation: AllocationInputs = { planned: 1380, puneShare: 60, lotSize: 20, puneCapacity: 900, noidaCapacity: 700 };

export function ProductionPlanningBuildModule() {
  const [activeLesson, setActiveLesson] = useState<ProductionPlanningLessonId>("production-foundations");
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<ModuleFeedback>(null);
  const [readiness, setReadiness] = useState<string[]>([]);
  const [demandAnswers, setDemandAnswers] = useState<Answers>({});
  const [requirementAnswers, setRequirementAnswers] = useState<Answers>({});
  const [capacityAnswers, setCapacityAnswers] = useState<Answers>({});
  const [allocationAnswers, setAllocationAnswers] = useState<Answers>({});
  const [exceptionAnswers, setExceptionAnswers] = useState<Answers>({});
  const [formAnswers, setFormAnswers] = useState<Answers>({});
  const [productionInputs, setProductionInputs] = useState<ProductionInputs>(defaultProduction);
  const [allocationInputs, setAllocationInputs] = useState<AllocationInputs>(defaultAllocation);
  const [ranProduction, setRanProduction] = useState(false);
  const [ranAllocation, setRanAllocation] = useState(false);
  const [reconciled, setReconciled] = useState<string[]>([]);
  const [sequence, setSequence] = useState<string[]>([]);
  const [activeHomework, setActiveHomework] = useState<HomeworkId>("requirement");
  const [readout, setReadout] = useState("");
  const [artifacts, setArtifacts] = useState<string[]>([]);
  const [summary, setSummary] = useState("");
  const [knowledgeAnswers, setKnowledgeAnswers] = useState<Answers>({});

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = readTrackProgress("implementation");
      setCompletedLessons(stored.completedLessons);
      const saved = productionPlanningLessons.find((lesson) => lesson.id === stored.activeLesson);
      if (saved) setActiveLesson(saved.id);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const productionResult = useMemo(() => calculateProduction(productionInputs), [productionInputs]);
  const allocationResult = useMemo(() => calculateAllocation(allocationInputs), [allocationInputs]);
  const prerequisiteComplete = salesPlanningLessons.every((lesson) => completedLessons.includes(lesson.id));
  const allCorrect = (items: readonly { id: string; correct: string }[], answers: Answers) => items.every((item) => answers[item.id] === item.correct);
  const knowledgeReady = productionKnowledgeQuestions.every((item) => knowledgeAnswers[item.id] === item.correct);
  const homeworkStatus: Record<HomeworkId, boolean> = {
    requirement: ranProduction && productionResult.valid && near(productionResult.planned, 1380) && near(productionResult.projectedEnding, 301.052),
    allocation: ranAllocation && allocationResult.valid && near(allocationResult.pune, 820) && near(allocationResult.noida, 560) && !allocationResult.overloaded,
    exceptions: allCorrect(exceptionCases, exceptionAnswers),
    reconcile: reconciled.length === productionReconciliationControls.length,
    readout: readout.trim().length >= 240,
  };
  const preview = useMemo(() => {
    if (artifacts.length !== productionArtifacts.length || summary.trim().length < 220) return "Complete all eight production artifacts and provide a readiness summary of at least 220 characters.";
    return `${summary.trim()} The Phase 10 baseline remains subject to a controlled rerun when Phase 11 approves detailed inventory policy and target-stock assumptions.`;
  }, [artifacts, summary]);

  function persist(nextCompleted: string[], lesson: ProductionPlanningLessonId) {
    writeTrackProgress("implementation", { completedLessons: nextCompleted, activeLesson: lesson, activeModuleId: "implementation-production-planning-build", lastVisited: new Date().toISOString() });
  }
  function goToLesson(id: ProductionPlanningLessonId) { setActiveLesson(id); setFeedback(null); persist(completedLessons, id); }
  function markComplete(message: string) {
    const next = completedLessons.includes(activeLesson) ? completedLessons : [...completedLessons, activeLesson];
    setCompletedLessons(next); persist(next, activeLesson); setFeedback({ tone: "success", message });
  }
  function toggle(setter: Dispatch<SetStateAction<string[]>>, item: string) { setter((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item]); }

  function validateLesson() {
    if (activeLesson === "production-foundations") {
      if (readiness.length !== productionReadinessControls.length) return setFeedback({ tone: "error", message: "Confirm all five production-planning readiness controls before calculating supply." });
      return markComplete("Demand, metadata, assumptions, writable scope, and controls are ready for production planning.");
    }
    if (activeLesson === "demand-handoff") {
      if (!allCorrect(demandHandoffCases, demandAnswers)) return setFeedback({ tone: "error", message: "Resolve every demand aggregation, precision, provisional-policy, and change-control decision." });
      return markComplete("The Phase 09 demand handoff and provisional inventory inputs are controlled and traceable.");
    }
    if (activeLesson === "production-requirement") {
      if (!allCorrect(requirementCases, requirementAnswers) || !ranProduction || !productionResult.valid || !near(productionResult.planned, 1380)) return setFeedback({ tone: "error", message: "Run the valid practice calculation and resolve the yield, zero-requirement, and lot-rounding cases." });
      return markComplete("The good-unit bridge, yield adjustment, lot rounding, and projected inventory result reconcile.");
    }
    if (activeLesson === "capacity-model") {
      if (!allCorrect(capacityCases, capacityAnswers)) return setFeedback({ tone: "error", message: "Correct all available-hours, downtime, rate, and scenario-capacity decisions." });
      return markComplete("Plant hours, Product rates, gross capacity, downtime, and scenario changes are governed.");
    }
    if (activeLesson === "plant-allocation") {
      if (!allCorrect(allocationCases, allocationAnswers) || !ranAllocation || !allocationResult.valid || allocationResult.overloaded || !near(allocationResult.balance, 0)) return setFeedback({ tone: "error", message: "Run the 820/560 practice allocation and resolve lot-size, validity, capacity, and total controls." });
      return markComplete("The 1,380-unit plan is allocated to valid plants and reconciles without overload.");
    }
    if (activeLesson === "overload-exceptions") {
      if (!allCorrect(exceptionCases, exceptionAnswers)) return setFeedback({ tone: "error", message: "Resolve all overload, overtime, invalid-intersection, and prebuild decisions." });
      return markComplete("Capacity exceptions have quantified causes, controlled responses, owners, impacts, and approvals.");
    }
    if (activeLesson === "functional-walkthrough") {
      if (!allCorrect(formDesignCases, formAnswers)) return setFeedback({ tone: "error", message: "Correct all form protection, performance, rule-scope, and exception-workflow decisions." });
      return markComplete("The functional production forms and screenshot-guided execution runbook are ready for tenant evidence.");
    }
    if (activeLesson === "production-reconciliation") {
      if (reconciled.length !== productionReconciliationControls.length || sequence.length !== productionBuildSequence.length) return setFeedback({ tone: "error", message: "Confirm all six reconciliation controls and the complete eight-step execution order." });
      return markComplete("Demand, inventory bridge, plant allocation, capacity, exceptions, rerun, and evidence reconcile.");
    }
    if (activeLesson === "production-homework") {
      if (!Object.values(homeworkStatus).every(Boolean)) return setFeedback({ tone: "error", message: "Complete all five connected production-planning missions." });
      return markComplete("Applied production lab complete. The recommendation and evidence are ready for independent review.");
    }
    if (artifacts.length !== productionArtifacts.length || summary.trim().length < 220 || !knowledgeReady) return setFeedback({ tone: "error", message: "Select all eight deliverables, provide a 220-character summary, and answer all five knowledge checks correctly." });
    markComplete("Phase 10 exit gate passed. The production baseline is ready for detailed inventory-policy integration in Phase 11.");
  }

  return <LearningModuleFrame activeLessonId={activeLesson} completedLessons={completedLessons} description="Translate approved consensus demand into yield-adjusted production, plant allocation, capacity utilization, controlled exceptions, and a reconciled manufacturing handoff." exitGate="Approve the reconciled production plan and controlled Phase 11 inventory-policy rerun trigger" exitGateIcon={<Factory size={18} />} feedback={feedback} lessons={productionPlanningLessons} onSelectLesson={(id) => goToLesson(id as ProductionPlanningLessonId)} onValidate={validateLesson} phase={10} prerequisite={{ complete: prerequisiteComplete, message: "Complete Phase 09 so production begins from approved consensus demand and governed Product metadata.", href: "/learn/sales-planning-build", linkLabel: "Open Phase 09" }} stage="Build · Production planning model" title="Production Planning Build" validateLabel={activeLesson === "production-handoff" ? "Approve production package" : undefined}>
    {activeLesson === "production-foundations" && <Foundations selected={readiness} onToggle={(item) => toggle(setReadiness, item)} />}
    {activeLesson === "demand-handoff" && <DemandHandoff answers={demandAnswers} onAnswer={(id, value) => setDemandAnswers((current) => ({ ...current, [id]: value }))} />}
    {activeLesson === "production-requirement" && <ProductionRequirement answers={requirementAnswers} onAnswer={(id, value) => setRequirementAnswers((current) => ({ ...current, [id]: value }))} inputs={productionInputs} onInput={setProductionInputs} result={productionResult} ran={ranProduction} onRun={() => setRanProduction(true)} />}
    {activeLesson === "capacity-model" && <CapacityModel answers={capacityAnswers} onAnswer={(id, value) => setCapacityAnswers((current) => ({ ...current, [id]: value }))} />}
    {activeLesson === "plant-allocation" && <PlantAllocation answers={allocationAnswers} onAnswer={(id, value) => setAllocationAnswers((current) => ({ ...current, [id]: value }))} inputs={allocationInputs} onInput={setAllocationInputs} result={allocationResult} ran={ranAllocation} onRun={() => setRanAllocation(true)} />}
    {activeLesson === "overload-exceptions" && <OverloadExceptions answers={exceptionAnswers} onAnswer={(id, value) => setExceptionAnswers((current) => ({ ...current, [id]: value }))} />}
    {activeLesson === "functional-walkthrough" && <FunctionalWalkthrough answers={formAnswers} onAnswer={(id, value) => setFormAnswers((current) => ({ ...current, [id]: value }))} />}
    {activeLesson === "production-reconciliation" && <Reconciliation selected={reconciled} onToggle={(item) => toggle(setReconciled, item)} sequence={sequence} onSequence={(item) => toggle(setSequence, item)} />}
    {activeLesson === "production-homework" && <ProductionHomework active={activeHomework} onActive={setActiveHomework} status={homeworkStatus} production={<ProductionCalculator inputs={productionInputs} onInput={setProductionInputs} result={productionResult} ran={ranProduction} onRun={() => setRanProduction(true)} />} allocation={<AllocationCalculator inputs={allocationInputs} onInput={setAllocationInputs} result={allocationResult} ran={ranAllocation} onRun={() => setRanAllocation(true)} />} exceptionAnswers={exceptionAnswers} onException={(id, value) => setExceptionAnswers((current) => ({ ...current, [id]: value }))} reconciled={reconciled} onReconcile={(item) => toggle(setReconciled, item)} readout={readout} onReadout={setReadout} />}
    {activeLesson === "production-handoff" && <ProductionExitGate selected={artifacts} onToggle={(item) => toggle(setArtifacts, item)} summary={summary} onSummary={setSummary} answers={knowledgeAnswers} onAnswer={(id, value) => setKnowledgeAnswers((current) => ({ ...current, [id]: value }))} preview={preview} />}
  </LearningModuleFrame>;
}

function Foundations({ selected, onToggle }: { selected: string[]; onToggle: (item: string) => void }) {
  return <><Lead icon={<ShieldCheck size={23} />} eyebrow="Business outcome" title="Create a feasible, explainable production recommendation from approved demand without hiding inventory, yield, lot, plant, or capacity assumptions." /><p className={base.bodyCopy}>Production planning is a connected supply decision, not a demand copy. The model converts required good units into manufacturing starts, respects lot sizes and Product-to-plant capability, allocates work to Pune and Noida, exposes overloads, and preserves every assumption for review.</p><div className={design.designSequence}>{["Demand", "Inventory bridge", "Yield / lots", "Plant allocation", "Capacity", "Exception", "Approve"].map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong>{index < 6 && <ArrowRight size={13} />}</div>)}</div><h3 className={sales.sectionTitle}>Confirm the production boundary</h3><SelectionGrid items={productionReadinessControls} selected={selected} onToggle={onToggle} /><div className={sales.boundary}><div><strong>Phase 10 owns</strong><span>Production requirement, yield, lot rounding, plant rates and hours, allocation, utilization, overload resolution, functional evidence, and reconciliation.</span></div><div><strong>Phase 11 refines</strong><span>Inventory policy, safety stock, days cover, service targets, shelf-life, deployment, and the controlled target-inventory input that triggers a Phase 10 rerun.</span></div></div></>;
}

function DemandHandoff({ answers, onAnswer }: AnswerProps) {
  const downloads = [["phase-10-production-planning-practice-pack.zip", "Complete practice pack"], ["README.md", "Instructions"], ["demand-production-handoff.csv", "Demand handoff"], ["plant-capacity-baseline.csv", "Capacity baseline"], ["expected-production-results.csv", "Expected results"], ["production-test-cases.csv", "Test cases"], ["production-runbook.csv", "Runbook"], ["production-exception-log.csv", "Exception log"], ["production-reconciliation-template.csv", "Reconciliation"]] as const;
  return <><Lead icon={<PackageCheck size={23} />} eyebrow="Controlled model input" title="Aggregate approved commercial demand without losing its source version, precision, drill-back, ownership, or cutoff." /><p className={base.bodyCopy}>Production operates at Product × plant × Month while sales demand is approved at Product × Market × Channel × Month. Aggregate only the approved demand, reconcile it back to Phase 09, and keep provisional target inventory visibly separate so Phase 11 can replace it through change control.</p><div className={sales.downloadGrid}>{downloads.map(([file, label]) => <a download href={`${packPath}${file}`} key={file}><Download size={17} /><div><strong>{label}</strong><small>{file}</small></div></a>)}</div><div className={sales.metricGrid}><Metric label="Product" value="Mixer Grinder" detail="Practice calculation" /><Metric label="Demand" value="1,301.348" detail="Phase 09 consensus units" /><Metric label="Beginning FG" value="250" detail="Controlled opening balance" /><Metric label="Target ending FG" value="300" detail="Provisional until Phase 11" /></div><DecisionTable items={demandHandoffCases} answers={answers} onAnswer={onAnswer} label="demand-handoff response" /><div className={sales.controlNote}>Minimum handoff controls: source model version, Product/month grain, aggregation rule, demand total, cutoff, unit, Scenario/Version, owner, approval, drill-back reference, provisional inventory source, and rerun trigger.</div></>;
}

function ProductionRequirement(props: ProductionCalculatorProps & AnswerProps) {
  return <><Lead icon={<Calculator size={23} />} eyebrow="Good units to manufacturing starts" title="Bridge demand and inventory first, adjust for yield second, and round to a manufacturable lot only at the end." /><div className={sales.formula}>Net good-unit requirement = max(0, demand + target ending inventory − beginning inventory)<br />Pre-yield starts = net good-unit requirement ÷ yield rate<br /><strong>Planned production starts = round up(pre-yield starts ÷ lot size) × lot size</strong></div><ProductionCalculator {...props} /><DecisionTable items={requirementCases} answers={props.answers} onAnswer={props.onAnswer} label="production-requirement response" /><div className={base.infoCallout}><Info size={19} /><div><strong>Why projected ending can exceed the target</strong><p>Yield and lot-size rules create discrete output. Preserve the resulting difference as explainable ending inventory; do not force the result back to the target by hiding rounding.</p></div></div></>;
}

function CapacityModel({ answers, onAnswer }: AnswerProps) {
  return <><Lead icon={<Gauge size={23} />} eyebrow="Driver-based capacity" title="Derive Product-specific plant capacity from available productive hours and demonstrated production rates." /><div className={styles.plantGrid}><article><span>PUNE</span><strong>450 hours × 2.00</strong><b>900 starts</b><small>Primary Mixer Grinder plant</small></article><article><span>NOIDA</span><strong>350 hours × 2.00</strong><b>700 starts</b><small>Approved alternate plant</small></article><article><span>TOTAL</span><strong>800 productive hours</strong><b>1,600 starts</b><small>Before approved scenario changes</small></article></div><p className={base.bodyCopy}>Available hours must already reflect calendar, shifts, planned downtime, maintenance, changeovers and other approved losses. Production rate is Product × plant—not one universal plant rate. Keep both drivers visible so a reviewer can explain every capacity movement.</p><DecisionTable items={capacityCases} answers={answers} onAnswer={onAnswer} label="capacity-model response" /></>;
}

function PlantAllocation(props: AllocationCalculatorProps & AnswerProps) {
  return <><Lead icon={<Factory size={23} />} eyebrow="Feasible plant plan" title="Translate the rounded production total into valid plant lots, then prove capacity, hours, utilization, and allocation balance." /><AllocationCalculator {...props} /><DecisionTable items={allocationCases} answers={props.answers} onAnswer={props.onAnswer} label="plant-allocation response" /><div className={sales.controlNote}>An allocation is complete only when plant lots sum exactly to planned production, every intersection is valid, required hours use the approved Product × plant rate, utilization is within tolerance, and every manual preference variance is explained.</div></>;
}

function OverloadExceptions({ answers, onAnswer }: AnswerProps) {
  return <><Lead icon={<TriangleAlert size={23} />} eyebrow="Exception-led planning" title="Never solve an overload by overwriting the calculated requirement or capacity result." /><div className={styles.exceptionSummary}><TriangleAlert size={22} /><div><small>Practice overload</small><strong>1,900 planned starts − 1,600 demonstrated capacity = 300-unit shortfall</strong><span>Evaluate timing, alternate capability, overtime, subcontracting, inventory and demand responses with downstream impacts.</span></div></div><DecisionTable items={exceptionCases} answers={answers} onAnswer={onAnswer} label="exception response" /><div className={sales.boundary}><div><strong>Planner may propose</strong><span>Rebalance, overtime, prebuild, subcontract, demand shift, alternate material/routing, or an explicit unresolved exception.</span></div><div><strong>Planner may not hide</strong><span>Demand loss, invalid Product-to-plant assignment, unapproved capacity, unexplained cost/workforce impact, or an unresolved service risk.</span></div></div></>;
}

function FunctionalWalkthrough({ answers, onAnswer }: AnswerProps) {
  return <><Lead icon={<Camera size={23} />} eyebrow="Tenant execution runbook" title="Use focused functional forms to prove the production model, controls, scoped execution, negative behavior, and reconciliation." /><p className={base.bodyCopy}>These forms validate the model rather than represent the final user experience. Protect demand, actuals, calculations and capacity outputs; expose only owned assumptions and allocations; apply valid intersections and suppression; and make every overload actionable. Phase 16 will design the polished Forms 2.0, Dashboard 2.0 and Smart View experience.</p><DecisionTable items={formDesignCases} answers={answers} onAnswer={onAnswer} label="production-form response" /><ScreenshotWalkthrough /><div className={sales.scopeTag}>Screenshot slots are ready but intentionally empty. Capture one consistent ApexPlan training cycle after the Phase 10 forms and scoped calculation exist.</div></>;
}

function Reconciliation({ selected, onToggle, sequence, onSequence }: { selected: string[]; onToggle: (item: string) => void; sequence: string[]; onSequence: (item: string) => void }) {
  return <><Lead icon={<Scale size={23} />} eyebrow="Control before handoff" title="Reconcile every bridge from approved demand to projected inventory, plant lots, hours, utilization, exceptions, and rerun evidence." /><h3 className={sales.sectionTitle}>Reconciliation checklist</h3><SelectionGrid items={productionReconciliationControls} selected={selected} onToggle={onToggle} /><h3 className={sales.sectionTitle}>Controlled execution order</h3><div className={sales.sequence}>{productionBuildSequence.map((item) => <button className={sequence.includes(item) ? sales.confirmed : ""} key={item} onClick={() => onSequence(item)} type="button"><strong>{item}</strong><span>{sequence.includes(item) ? <Check size={15} /> : "Confirm"}</span></button>)}</div><div className={sales.handoff}><strong>Approved demand</strong><ArrowRight size={15} /><span>Yield-adjusted plant production</span><strong>Projected FG inventory</strong><ArrowRight size={15} /><span>Phase 11 policy refinement</span></div></>;
}

function ProductionHomework({ active, onActive, status, production, allocation, exceptionAnswers, onException, reconciled, onReconcile, readout, onReadout }: { active: HomeworkId; onActive: (id: HomeworkId) => void; status: Record<HomeworkId, boolean>; production: React.ReactNode; allocation: React.ReactNode; exceptionAnswers: Answers; onException: (id: string, value: string) => void; reconciled: string[]; onReconcile: (item: string) => void; readout: string; onReadout: (value: string) => void }) {
  const mission = productionHomeworkMissions.find((item) => item.id === active)!;
  const completed = Object.values(status).filter(Boolean).length;
  return <><Lead icon={<BookOpenCheck size={23} />} eyebrow="Applied hands-on lab" title="Complete one connected Mixer Grinder production cycle from the Phase 09 demand handoff to a reviewed plant recommendation." /><div className={base.homeworkMissionGrid}>{productionHomeworkMissions.map((item, index) => <button className={`${active === item.id ? base.homeworkMissionActive : ""} ${status[item.id] ? base.homeworkMissionDone : ""}`} key={item.id} onClick={() => onActive(item.id)} type="button"><span>{status[item.id] ? <CheckCircle2 size={17} /> : String(index + 1).padStart(2, "0")}</span><div><strong>{item.title}</strong><small>{item.output}</small></div></button>)}</div><div className={base.homeworkProgress}><div><span style={{ width: `${completed / productionHomeworkMissions.length * 100}%` }} /></div><strong>{completed} of {productionHomeworkMissions.length} missions complete</strong></div><section className={base.homeworkWorkspace}><header><div><small>Active mission</small><strong>{mission.title}</strong></div><span>{mission.output}</span></header>{active === "requirement" && production}{active === "allocation" && allocation}{active === "exceptions" && <DecisionTable items={exceptionCases} answers={exceptionAnswers} onAnswer={onException} label="exception response" />}{active === "reconcile" && <SelectionGrid items={productionReconciliationControls} selected={reconciled} onToggle={onReconcile} />}{active === "readout" && <label className={sales.summaryField}>Production planning review and recommendation<textarea rows={13} value={readout} onChange={(event) => onReadout(event.target.value)} placeholder="Summarize demand version and grain, beginning and target inventory, yield and lot rule, required starts and projected ending inventory, plant capacity and allocation, utilization, exceptions and response, reconciliations, evidence, Phase 11 rerun trigger, open items, owners, reviewer, and recommendation." /><small>{readout.trim().length}/240 minimum characters</small></label>}</section></>;
}

function ProductionExitGate({ selected, onToggle, summary, onSummary, answers, onAnswer, preview }: { selected: string[]; onToggle: (item: string) => void; summary: string; onSummary: (value: string) => void; answers: Answers; onAnswer: (id: string, value: string) => void; preview: string }) {
  return <><Lead icon={<ClipboardCheck size={23} />} eyebrow="Phase deliverable" title="Hand off a reconciled production baseline that can be rerun when detailed inventory policy is approved." /><h3 className={sales.sectionTitle}>Deliverable checklist</h3><SelectionGrid items={productionArtifacts} selected={selected} onToggle={onToggle} /><label className={sales.summaryField}>Production-planning build readiness summary<textarea rows={12} value={summary} onChange={(event) => onSummary(event.target.value)} placeholder="Summarize demand handoff, grain and POV, inventory assumptions, yield and lot logic, plant capacity and allocation, exceptions, forms and access, scoped rule/job evidence, reconciliations, rerun result, Phase 11 trigger, downstream impacts, open items, owners, reviewer, and approval." /><small>{summary.trim().length}/220 minimum characters</small></label><h3 className={sales.sectionTitle}>Knowledge check</h3><div className={base.quizList}>{productionKnowledgeQuestions.map((question, index) => <fieldset key={question.id}><legend><span>{index + 1}</span>{question.prompt}</legend>{question.options.map((option) => <label key={option}><input checked={answers[question.id] === option} name={question.id} onChange={() => onAnswer(question.id, option)} type="radio" />{option}</label>)}</fieldset>)}</div><div className={sales.preview}><small>Generated Phase 10 handoff</small><p>{preview}</p><div>Approved consensus demand <ArrowRight size={13} /> Reconciled plant production <ArrowRight size={13} /> Inventory policy and deployment</div></div></>;
}

function ProductionCalculator({ inputs, onInput, result, ran, onRun }: ProductionCalculatorProps) {
  return <CalculatorShell title="Production requirement engine" badge={result.valid ? "Inputs valid" : "Correct yield / lot"} onRun={onRun}><div className={sales.inputGrid}><NumberField label="Consensus demand · good units" value={inputs.demand} step="0.001" onChange={(value) => onInput({ ...inputs, demand: value })} /><NumberField label="Beginning FG inventory" value={inputs.beginning} onChange={(value) => onInput({ ...inputs, beginning: value })} /><NumberField label="Target ending FG inventory" value={inputs.target} onChange={(value) => onInput({ ...inputs, target: value })} /><NumberField label="Expected yield · %" value={inputs.yieldPct} step="0.1" onChange={(value) => onInput({ ...inputs, yieldPct: value })} /><NumberField label="Production lot size" value={inputs.lotSize} onChange={(value) => onInput({ ...inputs, lotSize: value })} /></div>{ran && <div className={sales.resultStrip}><Result label="Net good-unit requirement" value={format(result.netGood, 3)} /><Result label="Pre-yield starts" value={format(result.preYield, 3)} /><Result label="Planned starts" value={format(result.planned, 0)} primary /><Result label="Expected good output" value={format(result.expectedGood, 3)} /><Result label="Lot rounding" value={format(result.rounding, 3)} /><Result label="Projected ending FG" value={format(result.projectedEnding, 3)} /></div>}</CalculatorShell>;
}

function AllocationCalculator({ inputs, onInput, result, ran, onRun }: AllocationCalculatorProps) {
  return <CalculatorShell title="Plant allocation engine" badge={!result.valid ? "Correct inputs" : result.overloaded ? `Shortfall ${format(result.shortfall, 0)}` : "Within capacity"} onRun={onRun}><div className={sales.inputGrid}><NumberField label="Planned production starts" value={inputs.planned} onChange={(value) => onInput({ ...inputs, planned: value })} /><NumberField label="Pune preferred share · %" value={inputs.puneShare} onChange={(value) => onInput({ ...inputs, puneShare: value })} /><NumberField label="Plant lot size" value={inputs.lotSize} onChange={(value) => onInput({ ...inputs, lotSize: value })} /><NumberField label="Pune capacity · starts" value={inputs.puneCapacity} onChange={(value) => onInput({ ...inputs, puneCapacity: value })} /><NumberField label="Noida capacity · starts" value={inputs.noidaCapacity} onChange={(value) => onInput({ ...inputs, noidaCapacity: value })} /></div>{ran && <><div className={styles.allocationGrid}><article><span>Pune</span><strong>{format(result.pune, 0)} starts</strong><small>{format(result.pune / 2, 1)} hours · {format(result.puneUtilization, 1)}% utilization</small></article><article><span>Noida</span><strong>{format(result.noida, 0)} starts</strong><small>{format(result.noida / 2, 1)} hours · {format(result.noidaUtilization, 1)}% utilization</small></article></div><div className={sales.resultStrip}><Result label="Allocation total" value={format(result.pune + result.noida, 0)} /><Result label="Allocation balance" value={format(result.balance, 0)} /><Result label="Total capacity" value={format(result.totalCapacity, 0)} /><Result label="Overall utilization" value={`${format(result.overallUtilization, 1)}%`} primary /></div></>}</CalculatorShell>;
}

function CalculatorShell({ title, badge, onRun, children }: { title: string; badge: string; onRun: () => void; children: React.ReactNode }) { return <section className={sales.calculator}><header><div><Calculator size={18} /><strong>{title}</strong></div><span>{badge}</span></header>{children}<div className={sales.calculatorFooter}><p>Change inputs to test the control, then run the scoped calculation again.</p><button onClick={onRun} type="button"><PlayCircle size={15} />Run calculation</button></div></section>; }
function NumberField({ label, value, onChange, step = "1" }: { label: string; value: number; onChange: (value: number) => void; step?: string }) { return <label>{label}<input type="number" step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} /></label>; }
function Result({ label, value, primary = false }: { label: string; value: string; primary?: boolean }) { return <article className={primary ? sales.primaryResult : ""}><small>{label}</small><strong>{value}</strong></article>; }
function Metric({ label, value, detail }: { label: string; value: string; detail: string }) { return <article><small>{label}</small><strong>{value}</strong><span>{detail}</span></article>; }
function Lead({ icon, eyebrow, title }: { icon: React.ReactNode; eyebrow: string; title: string }) { return <div className={base.lessonLead}>{icon}<div><small>{eyebrow}</small><strong>{title}</strong></div></div>; }

function SelectionGrid({ items, selected, onToggle }: { items: readonly string[]; selected: string[]; onToggle: (item: string) => void }) { return <div className={design.selectionGrid}>{items.map((item) => <button className={selected.includes(item) ? design.selectedCard : ""} key={item} onClick={() => onToggle(item)} type="button">{selected.includes(item) ? <CheckCircle2 size={17} /> : <span />}<strong>{item}</strong></button>)}</div>; }
function DecisionTable({ items, answers, onAnswer, label }: { items: readonly { id: string; issue: string; correct: string; options: readonly string[] }[]; answers: Answers; onAnswer: (id: string, value: string) => void; label: string }) { return <div className={design.mappingTable}>{items.map((item) => <div className={design.tableRow} key={item.id}><div><strong>{item.id}</strong><small>{item.issue}</small></div><select aria-label={`${item.id} ${label}`} value={answers[item.id] ?? ""} onChange={(event) => onAnswer(item.id, event.target.value)}><option value="">Select controlled response</option>{item.options.map((option) => <option key={option}>{option}</option>)}</select></div>)}</div>; }

function ScreenshotWalkthrough() {
  return <section className={sales.walkthrough}><div className={sales.walkthroughHeader}><div><Camera size={20} /><div><small>Screenshot-guided procedure</small><strong>Functional production model walkthrough</strong></div></div><span>{productionScreenshots.length} guided steps</span></div><div className={sales.walkthroughGrid}>{productionScreenshots.map((step, index) => <article key={step.id}><div className={sales.stepTitle}><span>{String(index + 1).padStart(2, "0")}</span><div><small>{step.id}</small><strong>{step.title}</strong></div></div><OracleScreenshot asset={step.asset} capture={step.capture} className={sales.screenshot} phase="phase-10" title={step.title} /><dl><div><dt>Navigation</dt><dd>{step.path}</dd></div><div><dt>Trainee action</dt><dd>{step.action}</dd></div><div><dt>Validation evidence</dt><dd>{step.evidence}</dd></div></dl></article>)}</div></section>; 
}

function calculateProduction(input: ProductionInputs) {
  const valid = input.demand >= 0 && input.beginning >= 0 && input.target >= 0 && input.yieldPct > 0 && input.yieldPct <= 100 && input.lotSize > 0;
  const netGood = Math.max(0, input.demand + input.target - input.beginning);
  const preYield = valid ? netGood / (input.yieldPct / 100) : 0;
  const planned = valid ? Math.ceil((preYield - 1e-9) / input.lotSize) * input.lotSize : 0;
  const expectedGood = planned * input.yieldPct / 100;
  return { valid, netGood, preYield, planned, expectedGood, rounding: planned - preYield, projectedEnding: input.beginning + expectedGood - input.demand };
}

function calculateAllocation(input: AllocationInputs) {
  const valid = input.planned >= 0 && input.puneShare >= 0 && input.puneShare <= 100 && input.lotSize > 0 && input.puneCapacity >= 0 && input.noidaCapacity >= 0;
  const pune = valid ? Math.round((input.planned * input.puneShare / 100) / input.lotSize) * input.lotSize : 0;
  const noida = valid ? input.planned - pune : 0;
  const totalCapacity = input.puneCapacity + input.noidaCapacity;
  const balance = input.planned - pune - noida;
  const shortfall = Math.max(0, input.planned - totalCapacity);
  return { valid, pune, noida, totalCapacity, balance, shortfall, overloaded: pune > input.puneCapacity || noida > input.noidaCapacity || shortfall > 0, puneUtilization: input.puneCapacity ? pune / input.puneCapacity * 100 : 0, noidaUtilization: input.noidaCapacity ? noida / input.noidaCapacity * 100 : 0, overallUtilization: totalCapacity ? input.planned / totalCapacity * 100 : 0 };
}

function near(actual: number, expected: number) { return Math.abs(actual - expected) < 0.01; }
function format(value: number, digits = 2) { return value.toLocaleString(undefined, { minimumFractionDigits: digits, maximumFractionDigits: digits }); }

type AnswerProps = { answers: Answers; onAnswer: (id: string, value: string) => void };
type ProductionCalculatorProps = { inputs: ProductionInputs; onInput: (value: ProductionInputs) => void; result: ReturnType<typeof calculateProduction>; ran: boolean; onRun: () => void };
type AllocationCalculatorProps = { inputs: AllocationInputs; onInput: (value: AllocationInputs) => void; result: ReturnType<typeof calculateAllocation>; ran: boolean; onRun: () => void };
