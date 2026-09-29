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
  Info,
  PackageCheck,
  PlayCircle,
  Scale,
  ShieldCheck,
  Truck,
  TriangleAlert,
  Warehouse,
} from "lucide-react";
import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from "react";
import {
  balanceCases,
  deploymentCases,
  inventoryArtifacts,
  inventoryBuildSequence,
  inventoryExceptionCases,
  inventoryFormCases,
  inventoryHomeworkMissions,
  inventoryKnowledgeQuestions,
  inventoryPlanningLessons,
  inventoryReadinessControls,
  inventoryReconciliationControls,
  inventoryScreenshots,
  openingInventoryCases,
  policyCases,
  targetCases,
  type InventoryPlanningLessonId,
} from "@/content/inventory-planning-module";
import { productionPlanningLessons } from "@/content/production-planning-build-module";
import { readTrackProgress, writeTrackProgress } from "@/lib/learning-progress";
import design from "./application-dimension-design-module.module.css";
import base from "./discovery-module.module.css";
import sales from "./sales-planning-build-module.module.css";
import styles from "./inventory-planning-module.module.css";
import { LearningModuleFrame, type ModuleFeedback } from "./learning-module-frame";
import { OracleScreenshot } from "./oracle-screenshot";

type Answers = Record<string, string>;
type HomeworkId = (typeof inventoryHomeworkMissions)[number]["id"];
type TargetInputs = { futureDemand: number; days: number; targetDays: number; dailyStdDev: number; leadTime: number; serviceFactor: number; packMultiple: number };
type BalanceInputs = { beginning: number; expectedOutput: number; demand: number; target: number; days: number };
type DeploymentInputs = { puneBeginning: number; puneOutput: number; puneDemand: number; puneTarget: number; noidaBeginning: number; noidaOutput: number; noidaDemand: number; noidaTarget: number };

const packPath = "/training/oracle-planning/phase-11/";
const defaultTarget: TargetInputs = { futureDemand: 1301.348, days: 30, targetDays: 6.5, dailyStdDev: 20, leadTime: 4, serviceFactor: 1.65, packMultiple: 20 };
const defaultBalance: BalanceInputs = { beginning: 250, expectedOutput: 1352.4, demand: 1301.348, target: 300, days: 30 };
const defaultDeployment: DeploymentInputs = { puneBeginning: 150, puneOutput: 803.6, puneDemand: 780.8088, puneTarget: 180, noidaBeginning: 100, noidaOutput: 548.8, noidaDemand: 520.5392, noidaTarget: 120 };

export function InventoryPlanningModule() {
  const [activeLesson, setActiveLesson] = useState<InventoryPlanningLessonId>("inventory-foundations");
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<ModuleFeedback>(null);
  const [readiness, setReadiness] = useState<string[]>([]);
  const [openingAnswers, setOpeningAnswers] = useState<Answers>({});
  const [policyAnswers, setPolicyAnswers] = useState<Answers>({});
  const [targetAnswers, setTargetAnswers] = useState<Answers>({});
  const [balanceAnswers, setBalanceAnswers] = useState<Answers>({});
  const [deploymentAnswers, setDeploymentAnswers] = useState<Answers>({});
  const [exceptionAnswers, setExceptionAnswers] = useState<Answers>({});
  const [formAnswers, setFormAnswers] = useState<Answers>({});
  const [targetInputs, setTargetInputs] = useState<TargetInputs>(defaultTarget);
  const [balanceInputs, setBalanceInputs] = useState<BalanceInputs>(defaultBalance);
  const [deploymentInputs, setDeploymentInputs] = useState<DeploymentInputs>(defaultDeployment);
  const [ranTarget, setRanTarget] = useState(false);
  const [ranBalance, setRanBalance] = useState(false);
  const [ranDeployment, setRanDeployment] = useState(false);
  const [reconciled, setReconciled] = useState<string[]>([]);
  const [sequence, setSequence] = useState<string[]>([]);
  const [activeHomework, setActiveHomework] = useState<HomeworkId>("target");
  const [readout, setReadout] = useState("");
  const [artifacts, setArtifacts] = useState<string[]>([]);
  const [summary, setSummary] = useState("");
  const [knowledgeAnswers, setKnowledgeAnswers] = useState<Answers>({});

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = readTrackProgress("implementation");
      setCompletedLessons(stored.completedLessons);
      const saved = inventoryPlanningLessons.find((lesson) => lesson.id === stored.activeLesson);
      if (saved) setActiveLesson(saved.id);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const targetResult = useMemo(() => calculateTarget(targetInputs), [targetInputs]);
  const balanceResult = useMemo(() => calculateBalance(balanceInputs), [balanceInputs]);
  const deploymentResult = useMemo(() => calculateDeployment(deploymentInputs), [deploymentInputs]);
  const prerequisiteComplete = productionPlanningLessons.every((lesson) => completedLessons.includes(lesson.id));
  const allCorrect = (items: readonly { id: string; correct: string }[], answers: Answers) => items.every((item) => answers[item.id] === item.correct);
  const knowledgeReady = inventoryKnowledgeQuestions.every((item) => knowledgeAnswers[item.id] === item.correct);
  const homeworkStatus: Record<HomeworkId, boolean> = {
    target: ranTarget && targetResult.valid && near(targetResult.approvedTarget, 300),
    balance: ranBalance && balanceResult.valid && near(balanceResult.ending, 301.052) && near(balanceResult.variance, 1.052),
    deployment: ranDeployment && deploymentResult.valid && deploymentResult.transfer === 8 && near(deploymentResult.postTotal, 301.052),
    exceptions: allCorrect(inventoryExceptionCases, exceptionAnswers),
    readout: readout.trim().length >= 240,
  };
  const preview = useMemo(() => {
    if (artifacts.length !== inventoryArtifacts.length || summary.trim().length < 220) return "Complete all eight inventory artifacts and provide a readiness summary of at least 220 characters.";
    return `${summary.trim()} The approved target inventory is now the controlled Phase 10 input; every changed Product and period must be rerun and reconciled before downstream costing.`;
  }, [artifacts, summary]);

  function persist(nextCompleted: string[], lesson: InventoryPlanningLessonId) {
    writeTrackProgress("implementation", { completedLessons: nextCompleted, activeLesson: lesson, activeModuleId: "implementation-inventory-planning", lastVisited: new Date().toISOString() });
  }
  function goToLesson(id: InventoryPlanningLessonId) { setActiveLesson(id); setFeedback(null); persist(completedLessons, id); }
  function markComplete(message: string) {
    const next = completedLessons.includes(activeLesson) ? completedLessons : [...completedLessons, activeLesson];
    setCompletedLessons(next); persist(next, activeLesson); setFeedback({ tone: "success", message });
  }
  function toggle(setter: Dispatch<SetStateAction<string[]>>, item: string) { setter((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item]); }

  function validateLesson() {
    if (activeLesson === "inventory-foundations") {
      if (readiness.length !== inventoryReadinessControls.length) return setFeedback({ tone: "error", message: "Confirm all five inventory-planning readiness controls before setting policy." });
      return markComplete("Demand, production, stock, policy ownership, deployment, and writable scope are ready.");
    }
    if (activeLesson === "opening-inventory") {
      if (!allCorrect(openingInventoryCases, openingAnswers)) return setFeedback({ tone: "error", message: "Resolve every availability, cutoff, ownership, and reconciliation decision." });
      return markComplete("The 270-unit book balance is reconciled to 250 usable units with controlled exclusions.");
    }
    if (activeLesson === "inventory-policy") {
      if (!allCorrect(policyCases, policyAnswers)) return setFeedback({ tone: "error", message: "Correct all differentiation, safety-stock, effective-date, and lifecycle-policy decisions." });
      return markComplete("Inventory policy is differentiated, versioned, explainable, effective-dated, and approved.");
    }
    if (activeLesson === "target-inventory") {
      if (!allCorrect(targetCases, targetAnswers) || !ranTarget || !targetResult.valid || !near(targetResult.approvedTarget, 300)) return setFeedback({ tone: "error", message: "Run the valid practice target and resolve the governing-target, change-control, and rerun cases." });
      return markComplete("Cycle stock, safety stock, pack rounding, and the 300-unit target independently recalculate.");
    }
    if (activeLesson === "inventory-balance") {
      if (!allCorrect(balanceCases, balanceAnswers) || !ranBalance || !balanceResult.valid || !near(balanceResult.ending, 301.052)) return setFeedback({ tone: "error", message: "Run the inventory bridge and resolve stockout, movement, and production-rounding cases." });
      return markComplete("Opening stock, expected output, demand, ending inventory, target variance, and days cover reconcile.");
    }
    if (activeLesson === "plant-deployment") {
      if (!allCorrect(deploymentCases, deploymentAnswers) || !ranDeployment || !deploymentResult.valid || deploymentResult.transfer !== 8 || !near(deploymentResult.postTotal, 301.052)) return setFeedback({ tone: "error", message: "Run the 8-unit transfer and resolve timing and company-total controls." });
      return markComplete("The Pune shortfall is resolved from Noida while preserving the company inventory total.");
    }
    if (activeLesson === "inventory-exceptions") {
      if (!allCorrect(inventoryExceptionCases, exceptionAnswers)) return setFeedback({ tone: "error", message: "Resolve all service, excess, quality-release, and Phase 10 rerun decisions." });
      return markComplete("Inventory exceptions have quantified impacts, controlled responses, owners, timing, and approvals.");
    }
    if (activeLesson === "inventory-walkthrough") {
      if (!allCorrect(inventoryFormCases, formAnswers)) return setFeedback({ tone: "error", message: "Correct all form protection, existing-dimension, rule-scope, and workflow decisions." });
      return markComplete("The functional inventory forms and screenshot-guided execution runbook are ready for tenant evidence.");
    }
    if (activeLesson === "inventory-homework") {
      if (!Object.values(homeworkStatus).every(Boolean) || reconciled.length !== inventoryReconciliationControls.length || sequence.length !== inventoryBuildSequence.length) return setFeedback({ tone: "error", message: "Complete all five lab missions, six reconciliations, and the eight-step controlled execution order." });
      return markComplete("Applied inventory lab complete. The policy, projection, deployment, rerun, and evidence are ready for review.");
    }
    if (artifacts.length !== inventoryArtifacts.length || summary.trim().length < 220 || !knowledgeReady) return setFeedback({ tone: "error", message: "Select all eight deliverables, provide a 220-character summary, and answer all five knowledge checks correctly." });
    markComplete("Phase 11 exit gate passed. Approved inventory targets and reconciled balances are ready for manufacturing cost and COGS integration.");
  }

  return <LearningModuleFrame activeLessonId={activeLesson} completedLessons={completedLessons} description="Turn governed stock and service policy into target inventory, projected balances, plant deployment, controlled production reruns, and a reconciled downstream handoff." exitGate="Approve the inventory baseline, plant deployment, Phase 10 rerun evidence, and downstream handoff" exitGateIcon={<Warehouse size={18} />} feedback={feedback} lessons={inventoryPlanningLessons} onSelectLesson={(id) => goToLesson(id as InventoryPlanningLessonId)} onValidate={validateLesson} phase={11} prerequisite={{ complete: prerequisiteComplete, message: "Complete Phase 10 so inventory planning begins from approved demand, production output, and governed Product and plant metadata.", href: "/learn/production-planning-build", linkLabel: "Open Phase 10" }} stage="Build · Inventory planning model" title="Inventory Planning" validateLabel={activeLesson === "inventory-handoff" ? "Approve inventory package" : undefined}>
    {activeLesson === "inventory-foundations" && <Foundations selected={readiness} onToggle={(item) => toggle(setReadiness, item)} />}
    {activeLesson === "opening-inventory" && <OpeningInventory answers={openingAnswers} onAnswer={(id, value) => setOpeningAnswers((current) => ({ ...current, [id]: value }))} />}
    {activeLesson === "inventory-policy" && <InventoryPolicy answers={policyAnswers} onAnswer={(id, value) => setPolicyAnswers((current) => ({ ...current, [id]: value }))} />}
    {activeLesson === "target-inventory" && <TargetInventory answers={targetAnswers} onAnswer={(id, value) => setTargetAnswers((current) => ({ ...current, [id]: value }))} inputs={targetInputs} onInput={setTargetInputs} result={targetResult} ran={ranTarget} onRun={() => setRanTarget(true)} />}
    {activeLesson === "inventory-balance" && <InventoryBalance answers={balanceAnswers} onAnswer={(id, value) => setBalanceAnswers((current) => ({ ...current, [id]: value }))} inputs={balanceInputs} onInput={setBalanceInputs} result={balanceResult} ran={ranBalance} onRun={() => setRanBalance(true)} />}
    {activeLesson === "plant-deployment" && <PlantDeployment answers={deploymentAnswers} onAnswer={(id, value) => setDeploymentAnswers((current) => ({ ...current, [id]: value }))} inputs={deploymentInputs} onInput={setDeploymentInputs} result={deploymentResult} ran={ranDeployment} onRun={() => setRanDeployment(true)} />}
    {activeLesson === "inventory-exceptions" && <InventoryExceptions answers={exceptionAnswers} onAnswer={(id, value) => setExceptionAnswers((current) => ({ ...current, [id]: value }))} />}
    {activeLesson === "inventory-walkthrough" && <FunctionalWalkthrough answers={formAnswers} onAnswer={(id, value) => setFormAnswers((current) => ({ ...current, [id]: value }))} />}
    {activeLesson === "inventory-homework" && <InventoryHomework active={activeHomework} onActive={setActiveHomework} status={homeworkStatus} target={<TargetCalculator inputs={targetInputs} onInput={setTargetInputs} result={targetResult} ran={ranTarget} onRun={() => setRanTarget(true)} />} balance={<BalanceCalculator inputs={balanceInputs} onInput={setBalanceInputs} result={balanceResult} ran={ranBalance} onRun={() => setRanBalance(true)} />} deployment={<DeploymentCalculator inputs={deploymentInputs} onInput={setDeploymentInputs} result={deploymentResult} ran={ranDeployment} onRun={() => setRanDeployment(true)} />} exceptionAnswers={exceptionAnswers} onException={(id, value) => setExceptionAnswers((current) => ({ ...current, [id]: value }))} reconciled={reconciled} onReconcile={(item) => toggle(setReconciled, item)} sequence={sequence} onSequence={(item) => toggle(setSequence, item)} readout={readout} onReadout={setReadout} />}
    {activeLesson === "inventory-handoff" && <InventoryExitGate selected={artifacts} onToggle={(item) => toggle(setArtifacts, item)} summary={summary} onSummary={setSummary} answers={knowledgeAnswers} onAnswer={(id, value) => setKnowledgeAnswers((current) => ({ ...current, [id]: value }))} preview={preview} />}
  </LearningModuleFrame>;
}

function Foundations({ selected, onToggle }: { selected: string[]; onToggle: (item: string) => void }) {
  return <><Lead icon={<ShieldCheck size={23} />} eyebrow="Business outcome" title="Hold enough usable inventory to protect service without hiding quality restrictions, excess stock, plant imbalance, or working-capital impact." /><p className={base.bodyCopy}>Inventory planning connects commercial demand and operational supply. The learner establishes usable stock, applies an approved service policy, calculates target inventory, projects cover, balances Pune and Noida, and sends any changed target back through the controlled Phase 10 production calculation.</p><div className={design.designSequence}>{["Opening stock", "Policy", "Target", "Projection", "Deployment", "Exception", "Approve"].map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong>{index < 6 && <ArrowRight size={13} />}</div>)}</div><h3 className={sales.sectionTitle}>Confirm the inventory boundary</h3><SelectionGrid items={inventoryReadinessControls} selected={selected} onToggle={onToggle} /><div className={sales.boundary}><div><strong>Phase 11 owns</strong><span>Usable stock, policy, target inventory, projected balance and cover, plant deployment, transfers, inventory exceptions, rerun control, and evidence.</span></div><div><strong>Phase 11 does not invent</strong><span>A Warehouse dimension, a second demand plan, hidden production, or manual edits to calculated ending inventory. Pune and Noida remain Entity members.</span></div></div></>;
}

function OpeningInventory({ answers, onAnswer }: AnswerProps) {
  const downloads = [["phase-11-inventory-planning-practice-pack.zip", "Complete practice pack"], ["README.md", "Instructions"], ["inventory-opening-position.csv", "Opening position"], ["inventory-policy-inputs.csv", "Policy inputs"], ["expected-inventory-results.csv", "Expected results"], ["inventory-plant-deployment.csv", "Plant deployment"], ["inventory-test-cases.csv", "Test cases"], ["inventory-runbook.csv", "Runbook"], ["inventory-exception-log.csv", "Exception log"], ["inventory-reconciliation-template.csv", "Reconciliation"]] as const;
  return <><Lead icon={<PackageCheck size={23} />} eyebrow="Controlled opening position" title="Separate book stock from inventory that is actually available to satisfy the plan." /><p className={base.bodyCopy}>Use one approved cutoff and ownership rule. Keep book balance, quality hold, obsolete or blocked stock, in-transit quantities, adjustments, and available inventory separately visible so a reviewer can reproduce the opening position.</p><div className={sales.downloadGrid}>{downloads.map(([file, label]) => <a download href={`${packPath}${file}`} key={file}><Download size={17} /><div><strong>{label}</strong><small>{file}</small></div></a>)}</div><div className={styles.bridge}><Metric label="Book FG" value="270" detail="Source-system balance" /><span>−</span><Metric label="Quality hold" value="10" detail="Not available" /><span>−</span><Metric label="Blocked / obsolete" value="10" detail="Not available" /><span>=</span><Metric label="Available opening" value="250" detail="Planning balance" /></div><DecisionTable items={openingInventoryCases} answers={answers} onAnswer={onAnswer} label="opening-inventory response" /></>;
}

function InventoryPolicy({ answers, onAnswer }: AnswerProps) {
  return <><Lead icon={<Scale size={23} />} eyebrow="Service versus investment" title="Translate service intent into differentiated, versioned, and measurable inventory policy inputs." /><div className={styles.policyGrid}><Metric label="Target days cover" value="6.5 days" detail="Cycle-stock driver" /><Metric label="Daily demand σ" value="20 units" detail="Variability driver" /><Metric label="Lead time" value="4 days" detail="Replenishment exposure" /><Metric label="Service factor" value="1.65" detail="Approved service level" /><Metric label="Pack multiple" value="20 units" detail="Executable target" /></div><p className={base.bodyCopy}>Policy is not one arbitrary percentage. Segment Products where the business case is different, retain sources and effective dates, and measure the resulting service and working-capital trade-off.</p><DecisionTable items={policyCases} answers={answers} onAnswer={onAnswer} label="inventory-policy response" /><div className={base.infoCallout}><Info size={19} /><div><strong>Practice formula, not a universal promise</strong><p>The workshop uses a transparent variability-and-lead-time safety-stock formula. A real client must approve the statistical basis, service interpretation, review frequency, overrides, and exceptions before production use.</p></div></div></>;
}

function TargetInventory(props: TargetCalculatorProps & AnswerProps) {
  return <><Lead icon={<Calculator size={23} />} eyebrow="Policy to executable target" title="Calculate both cycle stock and safety stock, use the governing quantity, then round only to the approved pack multiple." /><div className={sales.formula}>Cycle-stock target = average daily demand × target days cover<br />Safety stock = service factor × daily-demand standard deviation × √ lead-time days<br /><strong>Approved target = round up(max(cycle stock, safety stock) ÷ pack multiple) × pack multiple</strong></div><TargetCalculator {...props} /><DecisionTable items={targetCases} answers={props.answers} onAnswer={props.onAnswer} label="target-inventory response" /></>;
}

function InventoryBalance(props: BalanceCalculatorProps & AnswerProps) {
  return <><Lead icon={<Warehouse size={23} />} eyebrow="Explainable inventory bridge" title="Project ending inventory from governed movements and measure both target variance and future demand cover." /><div className={sales.formula}>Projected ending FG = available beginning FG + expected good output + approved other receipts − demand − approved other issues<br /><strong>Projected days cover = projected ending FG ÷ average daily future demand</strong></div><BalanceCalculator {...props} /><DecisionTable items={balanceCases} answers={props.answers} onAnswer={props.onAnswer} label="inventory-balance response" /></>;
}

function PlantDeployment(props: DeploymentCalculatorProps & AnswerProps) {
  return <><Lead icon={<Truck size={23} />} eyebrow="Right stock, right plant, right time" title="Resolve plant-level shortages with feasible transfers while preserving the company inventory total." /><DeploymentCalculator {...props} /><DecisionTable items={deploymentCases} answers={props.answers} onAnswer={props.onAnswer} label="plant-deployment response" /><div className={sales.controlNote}>A transfer is valid only when the sending stock is available, the route and receipt date are feasible, both Entity intersections are valid, pre- and post-transfer balances are retained, and the company total is unchanged.</div></>;
}

function InventoryExceptions({ answers, onAnswer }: AnswerProps) {
  return <><Lead icon={<TriangleAlert size={23} />} eyebrow="Exception-led inventory decisions" title="Turn shortages, excess, quality changes, and target changes into owned decisions rather than silent balance edits." /><div className={styles.exceptionSummary}><TriangleAlert size={22} /><div><small>Connected rerun example</small><strong>Electric Kettle approved target 225 replaces the Phase 10 provisional target 220</strong><span>Raise a scoped Phase 10 rerun, assess the discrete production-lot result, recheck capacity, and reconcile the new ending inventory.</span></div></div><DecisionTable items={inventoryExceptionCases} answers={answers} onAnswer={onAnswer} label="inventory-exception response" /><div className={sales.boundary}><div><strong>Quantify before deciding</strong><span>Units, days cover, value, service exposure, timing, cause, policy variance, affected production, and downstream impact.</span></div><div><strong>Control the response</strong><span>Action, owner, due date, approval, rerun scope, job evidence, reconciliation, residual risk, and closure status.</span></div></div></>;
}

function FunctionalWalkthrough({ answers, onAnswer }: AnswerProps) {
  return <><Lead icon={<Camera size={23} />} eyebrow="Tenant execution runbook" title="Use focused forms to prove opening stock, policy, targets, projection, deployment, exceptions, scoped execution, and reconciliation." /><p className={base.bodyCopy}>These are functional build-and-test forms. Protect source and calculated values, expose only owned inputs, use Product × Entity × Month with the approved POV, suppress irrelevant intersections, and make every exception actionable. The polished user experience remains a Phase 16 deliverable.</p><DecisionTable items={inventoryFormCases} answers={answers} onAnswer={onAnswer} label="inventory-form response" /><ScreenshotWalkthrough /><div className={sales.scopeTag}>Screenshot slots are ready but intentionally empty. Add one consistent ApexPlan training cycle after the Phase 11 forms, rules, and reconciliations exist.</div></>;
}

function InventoryHomework({ active, onActive, status, target, balance, deployment, exceptionAnswers, onException, reconciled, onReconcile, sequence, onSequence, readout, onReadout }: { active: HomeworkId; onActive: (id: HomeworkId) => void; status: Record<HomeworkId, boolean>; target: React.ReactNode; balance: React.ReactNode; deployment: React.ReactNode; exceptionAnswers: Answers; onException: (id: string, value: string) => void; reconciled: string[]; onReconcile: (item: string) => void; sequence: string[]; onSequence: (item: string) => void; readout: string; onReadout: (value: string) => void }) {
  const mission = inventoryHomeworkMissions.find((item) => item.id === active)!;
  const completed = Object.values(status).filter(Boolean).length;
  return <><Lead icon={<BookOpenCheck size={23} />} eyebrow="Applied hands-on lab" title="Complete one connected Mixer Grinder inventory cycle, then prove the Electric Kettle target-change rerun control." /><div className={base.homeworkMissionGrid}>{inventoryHomeworkMissions.map((item, index) => <button className={`${active === item.id ? base.homeworkMissionActive : ""} ${status[item.id] ? base.homeworkMissionDone : ""}`} key={item.id} onClick={() => onActive(item.id)} type="button"><span>{status[item.id] ? <CheckCircle2 size={17} /> : String(index + 1).padStart(2, "0")}</span><div><strong>{item.title}</strong><small>{item.output}</small></div></button>)}</div><div className={base.homeworkProgress}><div><span style={{ width: `${completed / inventoryHomeworkMissions.length * 100}%` }} /></div><strong>{completed} of {inventoryHomeworkMissions.length} missions complete</strong></div><section className={base.homeworkWorkspace}><header><div><small>Active mission</small><strong>{mission.title}</strong></div><span>{mission.output}</span></header>{active === "target" && target}{active === "balance" && balance}{active === "deployment" && deployment}{active === "exceptions" && <DecisionTable items={inventoryExceptionCases} answers={exceptionAnswers} onAnswer={onException} label="inventory-exception response" />}{active === "readout" && <><h3 className={sales.sectionTitle}>Reconcile the connected model</h3><SelectionGrid items={inventoryReconciliationControls} selected={reconciled} onToggle={onReconcile} /><h3 className={sales.sectionTitle}>Confirm execution order</h3><div className={sales.sequence}>{inventoryBuildSequence.map((item) => <button className={sequence.includes(item) ? sales.confirmed : ""} key={item} onClick={() => onSequence(item)} type="button"><strong>{item}</strong><span>{sequence.includes(item) ? <Check size={15} /> : "Confirm"}</span></button>)}</div><label className={sales.summaryField}>Inventory planning review and recommendation<textarea rows={12} value={readout} onChange={(event) => onReadout(event.target.value)} placeholder="Summarize cutoff and usable opening stock, policy version and drivers, target result, inventory bridge and cover, Pune/Noida deployment, exceptions and transfers, Phase 10 rerun impact, reconciliations, evidence, open items, owners, reviewer, and recommendation." /><small>{readout.trim().length}/240 minimum characters</small></label></>}</section></>;
}

function InventoryExitGate({ selected, onToggle, summary, onSummary, answers, onAnswer, preview }: { selected: string[]; onToggle: (item: string) => void; summary: string; onSummary: (value: string) => void; answers: Answers; onAnswer: (id: string, value: string) => void; preview: string }) {
  return <><Lead icon={<ClipboardCheck size={23} />} eyebrow="Phase deliverable" title="Hand off an approved inventory baseline that remains connected to production and is ready for costing." /><h3 className={sales.sectionTitle}>Deliverable checklist</h3><SelectionGrid items={inventoryArtifacts} selected={selected} onToggle={onToggle} /><label className={sales.summaryField}>Inventory-planning build readiness summary<textarea rows={12} value={summary} onChange={(event) => onSummary(event.target.value)} placeholder="Summarize opening stock and cutoff, policy version and ownership, target logic, projected balances and cover, deployment and transfers, exceptions, forms and access, scoped job and rerun evidence, reconciliations, reporting handoff, open items, owners, reviewer, and approval." /><small>{summary.trim().length}/220 minimum characters</small></label><h3 className={sales.sectionTitle}>Knowledge check</h3><div className={base.quizList}>{inventoryKnowledgeQuestions.map((question, index) => <fieldset key={question.id}><legend><span>{index + 1}</span>{question.prompt}</legend>{question.options.map((option) => <label key={option}><input checked={answers[question.id] === option} name={question.id} onChange={() => onAnswer(question.id, option)} type="radio" />{option}</label>)}</fieldset>)}</div><div className={sales.preview}><small>Generated Phase 11 handoff</small><p>{preview}</p><div>Reconciled production <ArrowRight size={13} /> Approved inventory baseline <ArrowRight size={13} /> Manufacturing cost and COGS</div></div></>;
}

function TargetCalculator({ inputs, onInput, result, ran, onRun }: TargetCalculatorProps) {
  return <CalculatorShell title="Inventory target engine" badge={result.valid ? "Policy inputs valid" : "Correct policy inputs"} onRun={onRun}><div className={sales.inputGrid}><NumberField label="Future demand · units" value={inputs.futureDemand} step="0.001" onChange={(value) => onInput({ ...inputs, futureDemand: value })} /><NumberField label="Demand horizon · days" value={inputs.days} onChange={(value) => onInput({ ...inputs, days: value })} /><NumberField label="Target days cover" value={inputs.targetDays} step="0.1" onChange={(value) => onInput({ ...inputs, targetDays: value })} /><NumberField label="Daily demand standard deviation" value={inputs.dailyStdDev} step="0.1" onChange={(value) => onInput({ ...inputs, dailyStdDev: value })} /><NumberField label="Lead time · days" value={inputs.leadTime} step="0.1" onChange={(value) => onInput({ ...inputs, leadTime: value })} /><NumberField label="Service factor" value={inputs.serviceFactor} step="0.01" onChange={(value) => onInput({ ...inputs, serviceFactor: value })} /><NumberField label="Pack multiple" value={inputs.packMultiple} onChange={(value) => onInput({ ...inputs, packMultiple: value })} /></div>{ran && <div className={sales.resultStrip}><Result label="Average daily demand" value={format(result.averageDaily, 3)} /><Result label="Cycle-stock target" value={format(result.cycleStock, 3)} /><Result label="Safety stock" value={format(result.safetyStock, 3)} /><Result label="Governing pre-pack target" value={format(result.governingTarget, 3)} /><Result label="Approved target" value={format(result.approvedTarget, 0)} primary /></div>}</CalculatorShell>;
}

function BalanceCalculator({ inputs, onInput, result, ran, onRun }: BalanceCalculatorProps) {
  return <CalculatorShell title="Inventory balance engine" badge={result.valid ? result.variance < 0 ? "Below target" : "At / above target" : "Correct inputs"} onRun={onRun}><div className={sales.inputGrid}><NumberField label="Available beginning FG" value={inputs.beginning} onChange={(value) => onInput({ ...inputs, beginning: value })} /><NumberField label="Expected good output" value={inputs.expectedOutput} step="0.001" onChange={(value) => onInput({ ...inputs, expectedOutput: value })} /><NumberField label="Consensus demand" value={inputs.demand} step="0.001" onChange={(value) => onInput({ ...inputs, demand: value })} /><NumberField label="Approved target ending FG" value={inputs.target} onChange={(value) => onInput({ ...inputs, target: value })} /><NumberField label="Demand horizon · days" value={inputs.days} onChange={(value) => onInput({ ...inputs, days: value })} /></div>{ran && <div className={sales.resultStrip}><Result label="Projected ending FG" value={format(result.ending, 3)} primary /><Result label="Variance to target" value={format(result.variance, 3)} /><Result label="Projected days cover" value={`${format(result.daysCover, 2)} days`} /><Result label="Stockout" value={format(result.stockout, 3)} /><Result label="Excess above target" value={format(result.excess, 3)} /></div>}</CalculatorShell>;
}

function DeploymentCalculator({ inputs, onInput, result, ran, onRun }: DeploymentCalculatorProps) {
  return <CalculatorShell title="Plant deployment engine" badge={result.valid ? result.transfer ? `Transfer ${result.transfer} units` : "No transfer required" : "Correct plant inputs"} onRun={onRun}><div className={styles.deploymentInputs}><fieldset><legend>Pune</legend><NumberField label="Beginning" value={inputs.puneBeginning} onChange={(value) => onInput({ ...inputs, puneBeginning: value })} /><NumberField label="Expected output" value={inputs.puneOutput} step="0.0001" onChange={(value) => onInput({ ...inputs, puneOutput: value })} /><NumberField label="Demand" value={inputs.puneDemand} step="0.0001" onChange={(value) => onInput({ ...inputs, puneDemand: value })} /><NumberField label="Target" value={inputs.puneTarget} onChange={(value) => onInput({ ...inputs, puneTarget: value })} /></fieldset><fieldset><legend>Noida</legend><NumberField label="Beginning" value={inputs.noidaBeginning} onChange={(value) => onInput({ ...inputs, noidaBeginning: value })} /><NumberField label="Expected output" value={inputs.noidaOutput} step="0.0001" onChange={(value) => onInput({ ...inputs, noidaOutput: value })} /><NumberField label="Demand" value={inputs.noidaDemand} step="0.0001" onChange={(value) => onInput({ ...inputs, noidaDemand: value })} /><NumberField label="Target" value={inputs.noidaTarget} onChange={(value) => onInput({ ...inputs, noidaTarget: value })} /></fieldset></div>{ran && <><div className={styles.deploymentGrid}><article><span>Pune</span><strong>{format(result.punePre, 4)} pre-transfer</strong><b>{format(result.punePost, 4)} post-transfer</b></article><div className={styles.transfer}><Truck size={21} /><strong>{result.transfer} units</strong><small>Noida → Pune</small></div><article><span>Noida</span><strong>{format(result.noidaPre, 4)} pre-transfer</strong><b>{format(result.noidaPost, 4)} post-transfer</b></article></div><div className={sales.resultStrip}><Result label="Pre-transfer total" value={format(result.preTotal, 3)} /><Result label="Post-transfer total" value={format(result.postTotal, 3)} primary /><Result label="Transfer conservation" value={format(result.postTotal - result.preTotal, 3)} /></div></>}</CalculatorShell>;
}

function CalculatorShell({ title, badge, onRun, children }: { title: string; badge: string; onRun: () => void; children: React.ReactNode }) { return <section className={sales.calculator}><header><div><Calculator size={18} /><strong>{title}</strong></div><span>{badge}</span></header>{children}<div className={sales.calculatorFooter}><p>Change inputs to test the control, then run the scoped calculation again.</p><button onClick={onRun} type="button"><PlayCircle size={15} />Run calculation</button></div></section>; }
function NumberField({ label, value, onChange, step = "1" }: { label: string; value: number; onChange: (value: number) => void; step?: string }) { return <label>{label}<input type="number" step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} /></label>; }
function Result({ label, value, primary = false }: { label: string; value: string; primary?: boolean }) { return <article className={primary ? sales.primaryResult : ""}><small>{label}</small><strong>{value}</strong></article>; }
function Metric({ label, value, detail }: { label: string; value: string; detail: string }) { return <article><small>{label}</small><strong>{value}</strong><span>{detail}</span></article>; }
function Lead({ icon, eyebrow, title }: { icon: React.ReactNode; eyebrow: string; title: string }) { return <div className={base.lessonLead}>{icon}<div><small>{eyebrow}</small><strong>{title}</strong></div></div>; }
function SelectionGrid({ items, selected, onToggle }: { items: readonly string[]; selected: string[]; onToggle: (item: string) => void }) { return <div className={design.selectionGrid}>{items.map((item) => <button className={selected.includes(item) ? design.selectedCard : ""} key={item} onClick={() => onToggle(item)} type="button">{selected.includes(item) ? <CheckCircle2 size={17} /> : <span />}<strong>{item}</strong></button>)}</div>; }
function DecisionTable({ items, answers, onAnswer, label }: { items: readonly { id: string; issue: string; correct: string; options: readonly string[] }[]; answers: Answers; onAnswer: (id: string, value: string) => void; label: string }) { return <div className={design.mappingTable}>{items.map((item) => <div className={design.tableRow} key={item.id}><div><strong>{item.id}</strong><small>{item.issue}</small></div><select aria-label={`${item.id} ${label}`} value={answers[item.id] ?? ""} onChange={(event) => onAnswer(item.id, event.target.value)}><option value="">Select controlled response</option>{item.options.map((option) => <option key={option}>{option}</option>)}</select></div>)}</div>; }

function ScreenshotWalkthrough() {
  return <section className={sales.walkthrough}><div className={sales.walkthroughHeader}><div><Camera size={20} /><div><small>Screenshot-guided procedure</small><strong>Functional inventory model walkthrough</strong></div></div><span>{inventoryScreenshots.length} guided steps</span></div><div className={sales.walkthroughGrid}>{inventoryScreenshots.map((step, index) => <article key={step.id}><div className={sales.stepTitle}><span>{String(index + 1).padStart(2, "0")}</span><div><small>{step.id}</small><strong>{step.title}</strong></div></div><OracleScreenshot asset={step.asset} capture={step.capture} className={sales.screenshot} phase="phase-11" title={step.title} /><dl><div><dt>Navigation</dt><dd>{step.path}</dd></div><div><dt>Trainee action</dt><dd>{step.action}</dd></div><div><dt>Validation evidence</dt><dd>{step.evidence}</dd></div></dl></article>)}</div></section>; 
}

function calculateTarget(input: TargetInputs) {
  const valid = input.futureDemand >= 0 && input.days > 0 && input.targetDays >= 0 && input.dailyStdDev >= 0 && input.leadTime >= 0 && input.serviceFactor >= 0 && input.packMultiple > 0;
  const averageDaily = valid ? input.futureDemand / input.days : 0;
  const cycleStock = averageDaily * input.targetDays;
  const safetyStock = input.serviceFactor * input.dailyStdDev * Math.sqrt(input.leadTime);
  const governingTarget = Math.max(cycleStock, safetyStock);
  const approvedTarget = valid ? Math.ceil((governingTarget - 1e-9) / input.packMultiple) * input.packMultiple : 0;
  return { valid, averageDaily, cycleStock, safetyStock, governingTarget, approvedTarget };
}

function calculateBalance(input: BalanceInputs) {
  const valid = input.beginning >= 0 && input.expectedOutput >= 0 && input.demand >= 0 && input.target >= 0 && input.days > 0;
  const ending = valid ? input.beginning + input.expectedOutput - input.demand : 0;
  const averageDaily = valid ? input.demand / input.days : 0;
  return { valid, ending, variance: ending - input.target, daysCover: averageDaily > 0 ? ending / averageDaily : 0, stockout: Math.max(0, -ending), excess: Math.max(0, ending - input.target) };
}

function calculateDeployment(input: DeploymentInputs) {
  const values = Object.values(input);
  const valid = values.every((value) => value >= 0);
  const punePre = valid ? input.puneBeginning + input.puneOutput - input.puneDemand : 0;
  const noidaPre = valid ? input.noidaBeginning + input.noidaOutput - input.noidaDemand : 0;
  const puneShortfall = Math.max(0, input.puneTarget - punePre);
  const noidaSurplus = Math.max(0, noidaPre - input.noidaTarget);
  const transfer = valid ? Math.ceil(Math.min(puneShortfall, noidaSurplus) - 1e-9) : 0;
  return { valid, punePre, noidaPre, transfer, punePost: punePre + transfer, noidaPost: noidaPre - transfer, preTotal: punePre + noidaPre, postTotal: punePre + noidaPre };
}

function near(actual: number, expected: number) { return Math.abs(actual - expected) < 0.01; }
function format(value: number, digits = 2) { return value.toLocaleString(undefined, { minimumFractionDigits: digits, maximumFractionDigits: digits }); }

type AnswerProps = { answers: Answers; onAnswer: (id: string, value: string) => void };
type TargetCalculatorProps = { inputs: TargetInputs; onInput: (value: TargetInputs) => void; result: ReturnType<typeof calculateTarget>; ran: boolean; onRun: () => void };
type BalanceCalculatorProps = { inputs: BalanceInputs; onInput: (value: BalanceInputs) => void; result: ReturnType<typeof calculateBalance>; ran: boolean; onRun: () => void };
type DeploymentCalculatorProps = { inputs: DeploymentInputs; onInput: (value: DeploymentInputs) => void; result: ReturnType<typeof calculateDeployment>; ran: boolean; onRun: () => void };
