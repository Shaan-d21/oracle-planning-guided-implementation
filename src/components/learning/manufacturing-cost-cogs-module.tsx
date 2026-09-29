"use client";

import { ArrowRight, BookOpenCheck, Calculator, Camera, Check, CheckCircle2, ClipboardCheck, Coins, Download, Gauge, Info, PackageCheck, PlayCircle, ShieldCheck, TriangleAlert, WalletCards } from "lucide-react";
import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from "react";
import {
  cogsCases,
  conversionCases,
  costArtifacts,
  costBuildSequence,
  costExceptionCases,
  costFormCases,
  costHomeworkMissions,
  costKnowledgeQuestions,
  costReadinessControls,
  costReconciliationControls,
  costScreenshots,
  manufacturingCostLessons,
  materialCostCases,
  unitCostCases,
  valuationCases,
  type ManufacturingCostLessonId,
} from "@/content/manufacturing-cost-cogs-module";
import { inventoryPlanningLessons } from "@/content/inventory-planning-module";
import { readTrackProgress, writeTrackProgress } from "@/lib/learning-progress";
import design from "./application-dimension-design-module.module.css";
import base from "./discovery-module.module.css";
import sales from "./sales-planning-build-module.module.css";
import styles from "./manufacturing-cost-cogs-module.module.css";
import { LearningModuleFrame, type ModuleFeedback } from "./learning-module-frame";
import { OracleScreenshot } from "./oracle-screenshot";

type Answers = Record<string, string>;
type HomeworkId = (typeof costHomeworkMissions)[number]["id"];
type UnitCostInputs = { material: number; laborHours: number; laborRate: number; machineHours: number; variableOverheadRate: number; fixedOverheadPool: number; absorptionUnits: number };
type ValuationInputs = { beginningQty: number; beginningUnitCost: number; outputQty: number; currentUnitCost: number; demandQty: number; netPrice: number };

const packPath = "/training/oracle-planning/phase-12/";
const defaultUnitCost: UnitCostInputs = { material: 210, laborHours: 0.05, laborRate: 600, machineHours: 0.03, variableOverheadRate: 500, fixedOverheadPool: 27048, absorptionUnits: 1352.4 };
const defaultValuation: ValuationInputs = { beginningQty: 250, beginningUnitCost: 270, outputQty: 1352.4, currentUnitCost: 275, demandQty: 1301.348, netPrice: 430 };

export function ManufacturingCostCogsModule() {
  const [activeLesson, setActiveLesson] = useState<ManufacturingCostLessonId>("cost-foundations");
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<ModuleFeedback>(null);
  const [readiness, setReadiness] = useState<string[]>([]);
  const [materialAnswers, setMaterialAnswers] = useState<Answers>({});
  const [conversionAnswers, setConversionAnswers] = useState<Answers>({});
  const [unitAnswers, setUnitAnswers] = useState<Answers>({});
  const [valuationAnswers, setValuationAnswers] = useState<Answers>({});
  const [cogsAnswers, setCogsAnswers] = useState<Answers>({});
  const [exceptionAnswers, setExceptionAnswers] = useState<Answers>({});
  const [formAnswers, setFormAnswers] = useState<Answers>({});
  const [unitInputs, setUnitInputs] = useState<UnitCostInputs>(defaultUnitCost);
  const [valuationInputs, setValuationInputs] = useState<ValuationInputs>(defaultValuation);
  const [ranUnit, setRanUnit] = useState(false);
  const [ranValuation, setRanValuation] = useState(false);
  const [reconciled, setReconciled] = useState<string[]>([]);
  const [sequence, setSequence] = useState<string[]>([]);
  const [activeHomework, setActiveHomework] = useState<HomeworkId>("unit");
  const [readout, setReadout] = useState("");
  const [artifacts, setArtifacts] = useState<string[]>([]);
  const [summary, setSummary] = useState("");
  const [knowledgeAnswers, setKnowledgeAnswers] = useState<Answers>({});

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = readTrackProgress("implementation");
      setCompletedLessons(stored.completedLessons);
      const saved = manufacturingCostLessons.find((lesson) => lesson.id === stored.activeLesson);
      if (saved) setActiveLesson(saved.id);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const unitResult = useMemo(() => calculateUnitCost(unitInputs), [unitInputs]);
  const valuationResult = useMemo(() => calculateValuation(valuationInputs), [valuationInputs]);
  const prerequisiteComplete = inventoryPlanningLessons.every((lesson) => completedLessons.includes(lesson.id));
  const allCorrect = (items: readonly { id: string; correct: string }[], answers: Answers) => items.every((item) => answers[item.id] === item.correct);
  const knowledgeReady = costKnowledgeQuestions.every((item) => knowledgeAnswers[item.id] === item.correct);
  const homeworkStatus: Record<HomeworkId, boolean> = {
    unit: ranUnit && unitResult.valid && near(unitResult.totalUnitCost, 275),
    valuation: ranValuation && valuationResult.valid && near(valuationResult.availableQty, 1602.4) && near(valuationResult.availableValue, 439410),
    cogs: ranValuation && valuationResult.valid && near(valuationResult.endingQty, 301.052) && near(valuationResult.valueCheck, 0),
    exceptions: allCorrect(costExceptionCases, exceptionAnswers),
    readout: readout.trim().length >= 240,
  };
  const preview = useMemo(() => artifacts.length === costArtifacts.length && summary.trim().length >= 220
    ? `${summary.trim()} Approved manufacturing cost, inventory value, COGS, and gross margin can now feed connected financial statements; any changed operational baseline requires a scoped costing rerun.`
    : "Complete all eight cost artifacts and provide a readiness summary of at least 220 characters.", [artifacts, summary]);

  function persist(nextCompleted: string[], lesson: ManufacturingCostLessonId) { writeTrackProgress("implementation", { completedLessons: nextCompleted, activeLesson: lesson, activeModuleId: "implementation-manufacturing-cost-cogs", lastVisited: new Date().toISOString() }); }
  function goToLesson(id: ManufacturingCostLessonId) { setActiveLesson(id); setFeedback(null); persist(completedLessons, id); }
  function markComplete(message: string) { const next = completedLessons.includes(activeLesson) ? completedLessons : [...completedLessons, activeLesson]; setCompletedLessons(next); persist(next, activeLesson); setFeedback({ tone: "success", message }); }
  function toggle(setter: Dispatch<SetStateAction<string[]>>, item: string) { setter((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item]); }

  function validateLesson() {
    if (activeLesson === "cost-foundations") {
      if (readiness.length !== costReadinessControls.length) return setFeedback({ tone: "error", message: "Confirm all five costing readiness controls before calculating a unit standard." });
      return markComplete("Operational handoffs, driver ownership, cost scope, versions, and cube roles are controlled.");
    }
    if (activeLesson === "material-cost") {
      if (!allCorrect(materialCostCases, materialAnswers)) return setFeedback({ tone: "error", message: "Resolve all effective-date, yield-loss, unit-conversion, and substitute-component decisions." });
      return markComplete("The direct-material standard is effective-dated, unit-consistent, approved, and protected from duplicate loss.");
    }
    if (activeLesson === "conversion-overhead") {
      if (!allCorrect(conversionCases, conversionAnswers)) return setFeedback({ tone: "error", message: "Correct all labor, variable-overhead, fixed-overhead, and overtime decisions." });
      return markComplete("Labor and overhead use approved drivers, rates, absorption bases, and variance treatment.");
    }
    if (activeLesson === "unit-cost") {
      if (!allCorrect(unitCostCases, unitAnswers) || !ranUnit || !unitResult.valid || !near(unitResult.totalUnitCost, 275)) return setFeedback({ tone: "error", message: "Run the valid cost rollup and resolve fixed-overhead, Product/Entity, and missing-driver cases." });
      return markComplete("Material 210, labor 30, variable overhead 15, and fixed overhead 20 reconcile to a 275 unit cost.");
    }
    if (activeLesson === "inventory-valuation") {
      if (!allCorrect(valuationCases, valuationAnswers) || !ranValuation || !valuationResult.valid || !near(valuationResult.availableValue, 439410)) return setFeedback({ tone: "error", message: "Run the valuation bridge and resolve costing basis, beginning layer, and Phase 11 quantity controls." });
      return markComplete("Beginning stock and current output reconcile to 1,602.4 available units valued at 439,410.");
    }
    if (activeLesson === "cogs-margin") {
      if (!allCorrect(cogsCases, cogsAnswers) || !ranValuation || !valuationResult.valid || !near(valuationResult.endingQty, 301.052) || !near(valuationResult.valueCheck, 0)) return setFeedback({ tone: "error", message: "Run the COGS bridge and resolve valuation balance, reporting grain, and margin explanation cases." });
      return markComplete("COGS, ending inventory value, net revenue, gross margin, and the value control reconcile.");
    }
    if (activeLesson === "cost-exceptions") {
      if (!allCorrect(costExceptionCases, exceptionAnswers)) return setFeedback({ tone: "error", message: "Resolve all material-rate, absorption, operational-rerun, and aggregate-cube exceptions." });
      return markComplete("Cost exceptions have quantified impact, controlled responses, owners, reruns, and reconciliation.");
    }
    if (activeLesson === "cost-walkthrough") {
      if (!allCorrect(costFormCases, formAnswers)) return setFeedback({ tone: "error", message: "Correct all form protection, performance, scoped-execution, and drill-trace decisions." });
      return markComplete("The functional costing forms and screenshot-guided execution runbook are ready for tenant evidence.");
    }
    if (activeLesson === "cost-homework") {
      if (!Object.values(homeworkStatus).every(Boolean) || reconciled.length !== costReconciliationControls.length || sequence.length !== costBuildSequence.length) return setFeedback({ tone: "error", message: "Complete all five lab missions, six reconciliations, and the eight-step execution order." });
      return markComplete("Applied manufacturing-cost lab complete. Cost, valuation, margin, rerun, and evidence are ready for review.");
    }
    if (artifacts.length !== costArtifacts.length || summary.trim().length < 220 || !knowledgeReady) return setFeedback({ tone: "error", message: "Select all eight deliverables, provide a 220-character summary, and answer all five knowledge checks correctly." });
    markComplete("Phase 12 exit gate passed. Reconciled COGS and gross margin are ready for connected dependency and financial integration phases.");
  }

  return <LearningModuleFrame activeLessonId={activeLesson} completedLessons={completedLessons} description="Build a governed manufacturing unit cost, value production and inventory, calculate COGS and gross margin, resolve variances, and reconcile detailed Plan1 results to reporting." exitGate="Approve the unit-cost baseline, valuation and margin bridges, rerun evidence, and downstream financial handoff" exitGateIcon={<Coins size={18} />} feedback={feedback} lessons={manufacturingCostLessons} onSelectLesson={(id) => goToLesson(id as ManufacturingCostLessonId)} onValidate={validateLesson} phase={12} prerequisite={{ complete: prerequisiteComplete, message: "Complete Phase 11 so costing begins from approved production, demand, target inventory, ending quantity, and plant deployment.", href: "/learn/inventory-planning", linkLabel: "Open Phase 11" }} stage="Build · Manufacturing cost and COGS" title="Manufacturing Cost & COGS" validateLabel={activeLesson === "cost-handoff" ? "Approve cost package" : undefined}>
    {activeLesson === "cost-foundations" && <Foundations selected={readiness} onToggle={(item) => toggle(setReadiness, item)} />}
    {activeLesson === "material-cost" && <MaterialCost answers={materialAnswers} onAnswer={(id, value) => setMaterialAnswers((current) => ({ ...current, [id]: value }))} />}
    {activeLesson === "conversion-overhead" && <ConversionOverhead answers={conversionAnswers} onAnswer={(id, value) => setConversionAnswers((current) => ({ ...current, [id]: value }))} />}
    {activeLesson === "unit-cost" && <UnitCost answers={unitAnswers} onAnswer={(id, value) => setUnitAnswers((current) => ({ ...current, [id]: value }))} inputs={unitInputs} onInput={setUnitInputs} result={unitResult} ran={ranUnit} onRun={() => setRanUnit(true)} />}
    {activeLesson === "inventory-valuation" && <InventoryValuation answers={valuationAnswers} onAnswer={(id, value) => setValuationAnswers((current) => ({ ...current, [id]: value }))} inputs={valuationInputs} onInput={setValuationInputs} result={valuationResult} ran={ranValuation} onRun={() => setRanValuation(true)} />}
    {activeLesson === "cogs-margin" && <CogsMargin answers={cogsAnswers} onAnswer={(id, value) => setCogsAnswers((current) => ({ ...current, [id]: value }))} inputs={valuationInputs} onInput={setValuationInputs} result={valuationResult} ran={ranValuation} onRun={() => setRanValuation(true)} />}
    {activeLesson === "cost-exceptions" && <CostExceptions answers={exceptionAnswers} onAnswer={(id, value) => setExceptionAnswers((current) => ({ ...current, [id]: value }))} />}
    {activeLesson === "cost-walkthrough" && <FunctionalWalkthrough answers={formAnswers} onAnswer={(id, value) => setFormAnswers((current) => ({ ...current, [id]: value }))} />}
    {activeLesson === "cost-homework" && <CostHomework active={activeHomework} onActive={setActiveHomework} status={homeworkStatus} unit={<UnitCostCalculator inputs={unitInputs} onInput={setUnitInputs} result={unitResult} ran={ranUnit} onRun={() => setRanUnit(true)} />} valuation={<ValuationCalculator inputs={valuationInputs} onInput={setValuationInputs} result={valuationResult} ran={ranValuation} onRun={() => setRanValuation(true)} mode="valuation" />} cogs={<ValuationCalculator inputs={valuationInputs} onInput={setValuationInputs} result={valuationResult} ran={ranValuation} onRun={() => setRanValuation(true)} mode="cogs" />} exceptionAnswers={exceptionAnswers} onException={(id, value) => setExceptionAnswers((current) => ({ ...current, [id]: value }))} reconciled={reconciled} onReconcile={(item) => toggle(setReconciled, item)} sequence={sequence} onSequence={(item) => toggle(setSequence, item)} readout={readout} onReadout={setReadout} />}
    {activeLesson === "cost-handoff" && <CostExitGate selected={artifacts} onToggle={(item) => toggle(setArtifacts, item)} summary={summary} onSummary={setSummary} answers={knowledgeAnswers} onAnswer={(id, value) => setKnowledgeAnswers((current) => ({ ...current, [id]: value }))} preview={preview} />}
  </LearningModuleFrame>;
}

function Foundations({ selected, onToggle }: { selected: string[]; onToggle: (item: string) => void }) {
  return <><Lead icon={<ShieldCheck size={23} />} eyebrow="Business outcome" title="Explain what it costs to manufacture, hold, and sell the approved plan without mixing operational quantities, rates, valuation methods, or reporting grains." /><p className={base.bodyCopy}>Phase 12 converts governed BOM, labor, machine, and overhead drivers into a Product and Entity manufacturing standard. It values the approved production and inventory quantities, calculates COGS and gross margin, exposes variances, and reconciles Plan1 detail to the ApexPlan reporting cube.</p><div className={design.designSequence}>{["BOM", "Labor", "Overhead", "Unit cost", "Valuation", "COGS", "Margin"].map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong>{index < 6 && <ArrowRight size={13} />}</div>)}</div><h3 className={sales.sectionTitle}>Confirm the costing boundary</h3><SelectionGrid items={costReadinessControls} selected={selected} onToggle={onToggle} /><div className={sales.boundary}><div><strong>Phase 12 owns</strong><span>Cost drivers, component rollup, production and inventory valuation, COGS, manufacturing margin, cost exceptions, reporting movement, and reconciliation.</span></div><div><strong>Phase 12 consumes</strong><span>Consensus demand and net revenue from Phase 09, production quantities from Phase 10, and opening and ending inventory quantities from Phase 11.</span></div></div></>;
}

function MaterialCost({ answers, onAnswer }: AnswerProps) {
  const downloads = [["phase-12-manufacturing-cost-cogs-practice-pack.zip", "Complete practice pack"], ["README.md", "Instructions"], ["material-cost-baseline.csv", "Material baseline"], ["conversion-overhead-baseline.csv", "Conversion baseline"], ["expected-cost-results.csv", "Expected results"], ["cost-test-cases.csv", "Test cases"], ["cost-runbook.csv", "Runbook"], ["cost-exception-log.csv", "Exception log"], ["cost-reconciliation-template.csv", "Reconciliation"]] as const;
  return <><Lead icon={<PackageCheck size={23} />} eyebrow="Quantity × effective rate" title="Build the direct-material standard from approved components, units, conversions, rates, effective dates, and one explicit normal-loss convention." /><p className={base.bodyCopy}>The practice material standard totals 210 per good unit: motor assembly 105, jar set 45, housing and electrical parts 40, packaging 10, and approved normal material loss 10. Preserve the component bridge rather than entering only the total.</p><div className={sales.downloadGrid}>{downloads.map(([file, label]) => <a download href={`${packPath}${file}`} key={file}><Download size={17} /><div><strong>{label}</strong><small>{file}</small></div></a>)}</div><div className={styles.componentGrid}>{[["Motor assembly", "105"], ["Jar set", "45"], ["Housing / electrical", "40"], ["Packaging", "10"], ["Normal material loss", "10"]].map(([label, value]) => <article key={label}><small>{label}</small><strong>{value}</strong><span>currency / good unit</span></article>)}</div><DecisionTable items={materialCostCases} answers={answers} onAnswer={onAnswer} label="material-cost response" /></>;
}

function ConversionOverhead({ answers, onAnswer }: AnswerProps) {
  return <><Lead icon={<Gauge size={23} />} eyebrow="Resource consumption × rate" title="Keep labor, machine-driven overhead, and capacity-based fixed overhead visible as separate cost drivers." /><div className={styles.driverGrid}><article><span>DIRECT LABOR</span><strong>0.05 hours × 600</strong><b>30 / unit</b><small>Approved routing and rate</small></article><article><span>VARIABLE OVERHEAD</span><strong>0.03 machine hours × 500</strong><b>15 / unit</b><small>Activity-sensitive driver</small></article><article><span>FIXED OVERHEAD</span><strong>27,048 ÷ 1,352.4 good units</strong><b>20 / unit</b><small>Approved absorption basis</small></article></div><DecisionTable items={conversionCases} answers={answers} onAnswer={onAnswer} label="conversion-overhead response" /><div className={base.infoCallout}><Info size={19} /><div><strong>Separate standards from variances</strong><p>Do not make the unit standard appear favorable by changing its absorption basis each month. Preserve the approved normal or practical capacity basis and show volume under- or over-absorption separately.</p></div></div></>;
}

function UnitCost(props: UnitCostCalculatorProps & AnswerProps) {
  return <><Lead icon={<Calculator size={23} />} eyebrow="Manufacturing cost rollup" title="Calculate each cost component from its own governed driver before adding the Product and Entity unit standard." /><div className={sales.formula}>Direct labor = labor hours per good unit × labor rate<br />Variable overhead = machine hours per good unit × variable-overhead rate<br />Fixed overhead per unit = approved pool ÷ approved absorption units<br /><strong>Manufacturing unit cost = material + labor + variable overhead + fixed overhead</strong></div><UnitCostCalculator {...props} /><DecisionTable items={unitCostCases} answers={props.answers} onAnswer={props.onAnswer} label="unit-cost response" /></>;
}

function InventoryValuation(props: ValuationCalculatorProps & AnswerProps) {
  return <><Lead icon={<WalletCards size={23} />} eyebrow="Quantity and value layers" title="Value beginning inventory and current expected good output separately, then calculate the approved weighted-average cost." /><div className={sales.formula}>Goods available quantity = beginning FG + expected good output<br />Goods available value = beginning FG value + current production value<br /><strong>Weighted-average unit cost = goods available value ÷ goods available quantity</strong></div><ValuationCalculator {...props} mode="valuation" /><DecisionTable items={valuationCases} answers={props.answers} onAnswer={props.onAnswer} label="inventory-valuation response" /></>;
}

function CogsMargin(props: ValuationCalculatorProps & AnswerProps) {
  return <><Lead icon={<Coins size={23} />} eyebrow="Value the commercial plan" title="Apply the approved valuation method to demand, prove the remaining inventory value, and connect COGS to reconciled net revenue." /><div className={sales.formula}>COGS = demand units × weighted-average unit cost<br />Ending inventory value = ending inventory quantity × weighted-average unit cost<br /><strong>Gross margin = net revenue − COGS</strong></div><ValuationCalculator {...props} mode="cogs" /><DecisionTable items={cogsCases} answers={props.answers} onAnswer={props.onAnswer} label="cogs-margin response" /></>;
}

function CostExceptions({ answers, onAnswer }: AnswerProps) {
  return <><Lead icon={<TriangleAlert size={23} />} eyebrow="Explain cost movement" title="Resolve rate, usage, absorption, operational-rerun, and reporting exceptions without rewriting the approved baseline." /><div className={styles.exceptionSummary}><TriangleAlert size={22} /><div><small>Connected rerun control</small><strong>Any approved Phase 10 or Phase 11 quantity change invalidates the affected cost and valuation result</strong><span>Rerun the Product, Entity, and period scope; reassess capacity-related cost; and reconcile COGS, ending inventory, margin, and reporting movement.</span></div></div><DecisionTable items={costExceptionCases} answers={answers} onAnswer={onAnswer} label="cost-exception response" /><div className={sales.boundary}><div><strong>Operational explanation</strong><span>Price, usage, yield, labor efficiency, labor rate, machine activity, overhead spending, volume absorption, and mix.</span></div><div><strong>Governance evidence</strong><span>Baseline and current values, quantity and amount impact, cause, response, owner, due date, approval, rerun, and residual risk.</span></div></div></>;
}

function FunctionalWalkthrough({ answers, onAnswer }: AnswerProps) {
  return <><Lead icon={<Camera size={23} />} eyebrow="Tenant execution runbook" title="Use focused forms to prove cost drivers, rollup, valuation, COGS, margin, exceptions, scoped execution, and reconciliation." /><p className={base.bodyCopy}>These forms prove the functional calculation and controls. Protect sourced rates and calculated results, expose only owned assumptions, use the approved Product × Entity × Month grain, and make cost exceptions traceable. Phase 16 will design the polished Forms 2.0, Dashboard 2.0, and Smart View experience.</p><DecisionTable items={costFormCases} answers={answers} onAnswer={onAnswer} label="cost-form response" /><ScreenshotWalkthrough /><div className={sales.scopeTag}>Screenshot slots are intentionally empty. Add one consistent ApexPlan training cycle after the Phase 12 forms, rules, data movement, and reconciliations exist.</div></>;
}

function CostHomework({ active, onActive, status, unit, valuation, cogs, exceptionAnswers, onException, reconciled, onReconcile, sequence, onSequence, readout, onReadout }: { active: HomeworkId; onActive: (id: HomeworkId) => void; status: Record<HomeworkId, boolean>; unit: React.ReactNode; valuation: React.ReactNode; cogs: React.ReactNode; exceptionAnswers: Answers; onException: (id: string, value: string) => void; reconciled: string[]; onReconcile: (item: string) => void; sequence: string[]; onSequence: (item: string) => void; readout: string; onReadout: (value: string) => void }) {
  const mission = costHomeworkMissions.find((item) => item.id === active)!; const completed = Object.values(status).filter(Boolean).length;
  return <><Lead icon={<BookOpenCheck size={23} />} eyebrow="Applied hands-on lab" title="Complete one connected Mixer Grinder cost cycle from approved drivers through manufacturing margin and reporting reconciliation." /><div className={base.homeworkMissionGrid}>{costHomeworkMissions.map((item, index) => <button className={`${active === item.id ? base.homeworkMissionActive : ""} ${status[item.id] ? base.homeworkMissionDone : ""}`} key={item.id} onClick={() => onActive(item.id)} type="button"><span>{status[item.id] ? <CheckCircle2 size={17} /> : String(index + 1).padStart(2, "0")}</span><div><strong>{item.title}</strong><small>{item.output}</small></div></button>)}</div><div className={base.homeworkProgress}><div><span style={{ width: `${completed / costHomeworkMissions.length * 100}%` }} /></div><strong>{completed} of {costHomeworkMissions.length} missions complete</strong></div><section className={base.homeworkWorkspace}><header><div><small>Active mission</small><strong>{mission.title}</strong></div><span>{mission.output}</span></header>{active === "unit" && unit}{active === "valuation" && valuation}{active === "cogs" && cogs}{active === "exceptions" && <DecisionTable items={costExceptionCases} answers={exceptionAnswers} onAnswer={onException} label="cost-exception response" />}{active === "readout" && <><h3 className={sales.sectionTitle}>Reconcile the connected cost model</h3><SelectionGrid items={costReconciliationControls} selected={reconciled} onToggle={onReconcile} /><h3 className={sales.sectionTitle}>Confirm execution order</h3><div className={sales.sequence}>{costBuildSequence.map((item) => <button className={sequence.includes(item) ? sales.confirmed : ""} key={item} onClick={() => onSequence(item)} type="button"><strong>{item}</strong><span>{sequence.includes(item) ? <Check size={15} /> : "Confirm"}</span></button>)}</div><label className={sales.summaryField}>Manufacturing cost review and recommendation<textarea rows={12} value={readout} onChange={(event) => onReadout(event.target.value)} placeholder="Summarize scope and versions, BOM and material standard, labor and overhead drivers, unit cost, production and inventory valuation, weighted average, COGS and margin, exceptions, operational reruns, reconciliations, reporting movement, evidence, open items, owners, reviewer, and recommendation." /><small>{readout.trim().length}/240 minimum characters</small></label></>}</section></>;
}

function CostExitGate({ selected, onToggle, summary, onSummary, answers, onAnswer, preview }: { selected: string[]; onToggle: (item: string) => void; summary: string; onSummary: (value: string) => void; answers: Answers; onAnswer: (id: string, value: string) => void; preview: string }) {
  return <><Lead icon={<ClipboardCheck size={23} />} eyebrow="Phase deliverable" title="Hand off a reproducible manufacturing-cost and COGS baseline that remains tied to approved operating quantities." /><h3 className={sales.sectionTitle}>Deliverable checklist</h3><SelectionGrid items={costArtifacts} selected={selected} onToggle={onToggle} /><label className={sales.summaryField}>Manufacturing-cost build readiness summary<textarea rows={12} value={summary} onChange={(event) => onSummary(event.target.value)} placeholder="Summarize costing scope, versions and grain, BOM and material rates, labor and overhead drivers, unit-cost rollup, production and inventory valuation, COGS and margin, exceptions, forms and access, rule and job evidence, reruns, reconciliations, reporting and financial handoff, open items, owners, reviewer, and approval." /><small>{summary.trim().length}/220 minimum characters</small></label><h3 className={sales.sectionTitle}>Knowledge check</h3><div className={base.quizList}>{costKnowledgeQuestions.map((question, index) => <fieldset key={question.id}><legend><span>{index + 1}</span>{question.prompt}</legend>{question.options.map((option) => <label key={option}><input checked={answers[question.id] === option} name={question.id} onChange={() => onAnswer(question.id, option)} type="radio" />{option}</label>)}</fieldset>)}</div><div className={sales.preview}><small>Generated Phase 12 handoff</small><p>{preview}</p><div>Approved operating plan <ArrowRight size={13} /> Reconciled cost and margin <ArrowRight size={13} /> Connected financial planning</div></div></>;
}

function UnitCostCalculator({ inputs, onInput, result, ran, onRun }: UnitCostCalculatorProps) {
  return <CalculatorShell title="Manufacturing unit-cost engine" badge={result.valid ? "Cost drivers valid" : "Correct cost inputs"} onRun={onRun}><div className={sales.inputGrid}><NumberField label="Direct material · currency/good unit" value={inputs.material} step="0.01" onChange={(value) => onInput({ ...inputs, material: value })} /><NumberField label="Labor hours / good unit" value={inputs.laborHours} step="0.01" onChange={(value) => onInput({ ...inputs, laborHours: value })} /><NumberField label="Labor rate · currency/hour" value={inputs.laborRate} step="0.01" onChange={(value) => onInput({ ...inputs, laborRate: value })} /><NumberField label="Machine hours / good unit" value={inputs.machineHours} step="0.01" onChange={(value) => onInput({ ...inputs, machineHours: value })} /><NumberField label="Variable OH rate · currency/hour" value={inputs.variableOverheadRate} step="0.01" onChange={(value) => onInput({ ...inputs, variableOverheadRate: value })} /><NumberField label="Fixed-overhead pool" value={inputs.fixedOverheadPool} step="0.01" onChange={(value) => onInput({ ...inputs, fixedOverheadPool: value })} /><NumberField label="Absorption basis · good units" value={inputs.absorptionUnits} step="0.001" onChange={(value) => onInput({ ...inputs, absorptionUnits: value })} /></div>{ran && <div className={sales.resultStrip}><Result label="Direct material" value={money(result.material)} /><Result label="Direct labor" value={money(result.labor)} /><Result label="Variable overhead" value={money(result.variableOverhead)} /><Result label="Fixed overhead" value={money(result.fixedOverhead)} /><Result label="Manufacturing unit cost" value={money(result.totalUnitCost)} primary /></div>}</CalculatorShell>;
}

function ValuationCalculator({ inputs, onInput, result, ran, onRun, mode }: ValuationCalculatorProps) {
  return <CalculatorShell title={mode === "valuation" ? "Production and inventory valuation" : "COGS and gross-margin engine"} badge={result.valid ? near(result.valueCheck, 0) ? "Value bridge balanced" : "Review precision" : "Correct valuation inputs"} onRun={onRun}><div className={sales.inputGrid}><NumberField label="Beginning FG · units" value={inputs.beginningQty} step="0.001" onChange={(value) => onInput({ ...inputs, beginningQty: value })} /><NumberField label="Beginning unit cost" value={inputs.beginningUnitCost} step="0.01" onChange={(value) => onInput({ ...inputs, beginningUnitCost: value })} /><NumberField label="Expected good output · units" value={inputs.outputQty} step="0.001" onChange={(value) => onInput({ ...inputs, outputQty: value })} /><NumberField label="Current manufacturing unit cost" value={inputs.currentUnitCost} step="0.01" onChange={(value) => onInput({ ...inputs, currentUnitCost: value })} /><NumberField label="Demand / units sold" value={inputs.demandQty} step="0.001" onChange={(value) => onInput({ ...inputs, demandQty: value })} /><NumberField label="Net price · currency/unit" value={inputs.netPrice} step="0.01" onChange={(value) => onInput({ ...inputs, netPrice: value })} /></div>{ran && mode === "valuation" && <div className={sales.resultStrip}><Result label="Beginning FG value" value={money(result.beginningValue)} /><Result label="Current production value" value={money(result.productionValue)} /><Result label="Goods available quantity" value={format(result.availableQty, 3)} /><Result label="Goods available value" value={money(result.availableValue)} primary /><Result label="Weighted-average unit cost" value={money(result.weightedAverage)} /></div>}{ran && mode === "cogs" && <><div className={styles.marginGrid}><Metric label="COGS" value={money(result.cogs)} detail={`${format(inputs.demandQty, 3)} units sold`} /><Metric label="Ending inventory" value={money(result.endingValue)} detail={`${format(result.endingQty, 3)} units`} /><Metric label="Net revenue" value={money(result.netRevenue)} detail={`${money(inputs.netPrice)} net price`} /><Metric label="Gross margin" value={money(result.grossMargin)} detail={`${format(result.marginPct, 2)}% of net revenue`} /></div><div className={sales.resultStrip}><Result label="COGS + ending value" value={money(result.cogs + result.endingValue)} /><Result label="Goods available value" value={money(result.availableValue)} /><Result label="Value control" value={money(result.valueCheck)} primary /></div></>}</CalculatorShell>;
}

function CalculatorShell({ title, badge, onRun, children }: { title: string; badge: string; onRun: () => void; children: React.ReactNode }) { return <section className={sales.calculator}><header><div><Calculator size={18} /><strong>{title}</strong></div><span>{badge}</span></header>{children}<div className={sales.calculatorFooter}><p>Change inputs to test the control, then run the scoped calculation again.</p><button onClick={onRun} type="button"><PlayCircle size={15} />Run calculation</button></div></section>; }
function NumberField({ label, value, onChange, step = "1" }: { label: string; value: number; onChange: (value: number) => void; step?: string }) { return <label>{label}<input type="number" step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} /></label>; }
function Result({ label, value, primary = false }: { label: string; value: string; primary?: boolean }) { return <article className={primary ? sales.primaryResult : ""}><small>{label}</small><strong>{value}</strong></article>; }
function Metric({ label, value, detail }: { label: string; value: string; detail: string }) { return <article><small>{label}</small><strong>{value}</strong><span>{detail}</span></article>; }
function Lead({ icon, eyebrow, title }: { icon: React.ReactNode; eyebrow: string; title: string }) { return <div className={base.lessonLead}>{icon}<div><small>{eyebrow}</small><strong>{title}</strong></div></div>; }
function SelectionGrid({ items, selected, onToggle }: { items: readonly string[]; selected: string[]; onToggle: (item: string) => void }) { return <div className={design.selectionGrid}>{items.map((item) => <button className={selected.includes(item) ? design.selectedCard : ""} key={item} onClick={() => onToggle(item)} type="button">{selected.includes(item) ? <CheckCircle2 size={17} /> : <span />}<strong>{item}</strong></button>)}</div>; }
function DecisionTable({ items, answers, onAnswer, label }: { items: readonly { id: string; issue: string; correct: string; options: readonly string[] }[]; answers: Answers; onAnswer: (id: string, value: string) => void; label: string }) { return <div className={design.mappingTable}>{items.map((item) => <div className={design.tableRow} key={item.id}><div><strong>{item.id}</strong><small>{item.issue}</small></div><select aria-label={`${item.id} ${label}`} value={answers[item.id] ?? ""} onChange={(event) => onAnswer(item.id, event.target.value)}><option value="">Select controlled response</option>{item.options.map((option) => <option key={option}>{option}</option>)}</select></div>)}</div>; }

function ScreenshotWalkthrough() { return <section className={sales.walkthrough}><div className={sales.walkthroughHeader}><div><Camera size={20} /><div><small>Screenshot-guided procedure</small><strong>Functional manufacturing-cost walkthrough</strong></div></div><span>{costScreenshots.length} guided steps</span></div><div className={sales.walkthroughGrid}>{costScreenshots.map((step, index) => <article key={step.id}><div className={sales.stepTitle}><span>{String(index + 1).padStart(2, "0")}</span><div><small>{step.id}</small><strong>{step.title}</strong></div></div><OracleScreenshot asset={step.asset} capture={step.capture} className={sales.screenshot} phase="phase-12" title={step.title} /><dl><div><dt>Navigation</dt><dd>{step.path}</dd></div><div><dt>Trainee action</dt><dd>{step.action}</dd></div><div><dt>Validation evidence</dt><dd>{step.evidence}</dd></div></dl></article>)}</div></section>; } 

function calculateUnitCost(input: UnitCostInputs) {
  const valid = input.material >= 0 && input.laborHours >= 0 && input.laborRate >= 0 && input.machineHours >= 0 && input.variableOverheadRate >= 0 && input.fixedOverheadPool >= 0 && input.absorptionUnits > 0;
  const labor = valid ? input.laborHours * input.laborRate : 0; const variableOverhead = valid ? input.machineHours * input.variableOverheadRate : 0; const fixedOverhead = valid ? input.fixedOverheadPool / input.absorptionUnits : 0;
  return { valid, material: input.material, labor, variableOverhead, fixedOverhead, totalUnitCost: input.material + labor + variableOverhead + fixedOverhead };
}
function calculateValuation(input: ValuationInputs) {
  const valid = input.beginningQty >= 0 && input.beginningUnitCost >= 0 && input.outputQty >= 0 && input.currentUnitCost >= 0 && input.demandQty >= 0 && input.demandQty <= input.beginningQty + input.outputQty && input.netPrice >= 0;
  const beginningValue = valid ? input.beginningQty * input.beginningUnitCost : 0; const productionValue = valid ? input.outputQty * input.currentUnitCost : 0; const availableQty = valid ? input.beginningQty + input.outputQty : 0; const availableValue = beginningValue + productionValue; const weightedAverage = availableQty > 0 ? availableValue / availableQty : 0; const cogs = input.demandQty * weightedAverage; const endingQty = availableQty - input.demandQty; const endingValue = endingQty * weightedAverage; const netRevenue = input.demandQty * input.netPrice; const grossMargin = netRevenue - cogs;
  return { valid, beginningValue, productionValue, availableQty, availableValue, weightedAverage, cogs, endingQty, endingValue, netRevenue, grossMargin, marginPct: netRevenue ? grossMargin / netRevenue * 100 : 0, valueCheck: availableValue - cogs - endingValue };
}
function near(actual: number, expected: number) { return Math.abs(actual - expected) < 0.01; }
function format(value: number, digits = 2) { return value.toLocaleString(undefined, { minimumFractionDigits: digits, maximumFractionDigits: digits }); }
function money(value: number) { return format(value, 2); }

type AnswerProps = { answers: Answers; onAnswer: (id: string, value: string) => void };
type UnitCostCalculatorProps = { inputs: UnitCostInputs; onInput: (value: UnitCostInputs) => void; result: ReturnType<typeof calculateUnitCost>; ran: boolean; onRun: () => void };
type ValuationCalculatorProps = { inputs: ValuationInputs; onInput: (value: ValuationInputs) => void; result: ReturnType<typeof calculateValuation>; ran: boolean; onRun: () => void; mode?: "valuation" | "cogs" };
