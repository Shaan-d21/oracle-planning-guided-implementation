"use client";

import { ArrowRight, BarChart3, BookOpenCheck, Calculator, Camera, Check, CheckCircle2, ClipboardCheck, Download, ExternalLink, FileSearch, PlayCircle, ShieldCheck, ShoppingCart, SlidersHorizontal, Workflow } from "lucide-react";
import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from "react";
import {
  baselineControls,
  consensusCases,
  formDesignCases,
  historyQualityCases,
  overrideCases,
  planningGrainCases,
  pricingCases,
  reconciliationControls,
  salesArtifacts,
  salesBuildSequence,
  salesHomeworkMissions,
  salesKnowledgeQuestions,
  salesPlanningLessons,
  salesReadinessControls,
  salesScreenshots,
  type SalesPlanningLessonId,
} from "@/content/sales-planning-build-module";
import { dataIntegrationLessons } from "@/content/data-integration-module";
import { readTrackProgress, writeTrackProgress } from "@/lib/learning-progress";
import design from "./application-dimension-design-module.module.css";
import base from "./discovery-module.module.css";
import styles from "./sales-planning-build-module.module.css";
import { LearningModuleFrame, type ModuleFeedback } from "./learning-module-frame";
import { OracleScreenshot } from "./oracle-screenshot";

type HomeworkId = (typeof salesHomeworkMissions)[number]["id"];
type Answers = Record<string, string>;
type BaselineInputs = { avg3: number; avg6: number; avg12: number; w3: number; w6: number; w12: number; growth: number; seasonality: number };
type PromotionInputs = { baseline: number; uplift: number; priceChange: number; elasticity: number; cannibalization: number; halo: number };
type ConsensusInputs = { statistical: number; sales: number; channel: number; marketing: number; wStat: number; wSales: number; wChannel: number; wMarketing: number; management: number };
type PricingInputs = { units: number; listPrice: number; contract: number; promotion: number; volume: number; channel: number; returns: number; credits: number };

const packPath = "/training/oracle-planning/phase-09/";
const baselineDefaults: BaselineInputs = { avg3: 1100, avg6: 1070, avg12: 1010, w3: 20, w6: 30, w12: 50, growth: 5, seasonality: 1.1 };
const promotionDefaults: PromotionInputs = { baseline: 1208.13, uplift: 10, priceChange: 3, elasticity: -1.2, cannibalization: 15, halo: 5 };
const consensusDefaults: ConsensusInputs = { statistical: 1273.37, sales: 1320, channel: 1280, marketing: 1300, wStat: 40, wSales: 30, wChannel: 20, wMarketing: 10, management: 10 };
const pricingDefaults: PricingInputs = { units: 1300, listPrice: 500, contract: 5, promotion: 3, volume: 2, channel: 1, returns: 10, credits: 5 };

export function SalesPlanningBuildModule() {
  const [activeLesson, setActiveLesson] = useState<SalesPlanningLessonId>("sales-foundations");
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<ModuleFeedback>(null);
  const [readiness, setReadiness] = useState<string[]>([]);
  const [grainAnswers, setGrainAnswers] = useState<Answers>({});
  const [historyAnswers, setHistoryAnswers] = useState<Answers>({});
  const [baselineChecks, setBaselineChecks] = useState<string[]>([]);
  const [baselineInputs, setBaselineInputs] = useState(baselineDefaults);
  const [baselineRun, setBaselineRun] = useState(false);
  const [promotionInputs, setPromotionInputs] = useState(promotionDefaults);
  const [promotionRun, setPromotionRun] = useState(false);
  const [overrideAnswers, setOverrideAnswers] = useState<Answers>({});
  const [consensusInputs, setConsensusInputs] = useState(consensusDefaults);
  const [consensusRun, setConsensusRun] = useState(false);
  const [consensusAnswers, setConsensusAnswers] = useState<Answers>({});
  const [pricingInputs, setPricingInputs] = useState(pricingDefaults);
  const [pricingRun, setPricingRun] = useState(false);
  const [pricingAnswers, setPricingAnswers] = useState<Answers>({});
  const [formAnswers, setFormAnswers] = useState<Answers>({});
  const [reconciled, setReconciled] = useState<string[]>([]);
  const [sequence, setSequence] = useState<string[]>([]);
  const [activeHomework, setActiveHomework] = useState<HomeworkId>("baseline");
  const [readout, setReadout] = useState("");
  const [artifacts, setArtifacts] = useState<string[]>([]);
  const [summary, setSummary] = useState("");
  const [knowledgeAnswers, setKnowledgeAnswers] = useState<Answers>({});

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = readTrackProgress("implementation");
      setCompletedLessons(stored.completedLessons);
      const saved = salesPlanningLessons.find((lesson) => lesson.id === stored.activeLesson);
      if (saved) setActiveLesson(saved.id);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const integrationComplete = dataIntegrationLessons.every((lesson) => completedLessons.includes(lesson.id));
  const allCorrect = (items: readonly { id: string; correct: string }[], answers: Answers) => items.every((item) => answers[item.id] === item.correct);
  const baseline = calculateBaseline(baselineInputs);
  const promotion = calculatePromotion(promotionInputs);
  const consensus = calculateConsensus(consensusInputs);
  const pricing = calculatePricing(pricingInputs);
  const baselineReady = baselineRun && near(baseline.baseline, 1208.13) && near(baseline.weightTotal, 100);
  const promotionReady = promotionRun && near(promotion.promotionalDemand, 1273.36902);
  const consensusReady = consensusRun && near(consensus.finalConsensus, 1301.348) && near(consensus.weightTotal, 100);
  const pricingReady = pricingRun && near(pricing.netPrice, 430) && near(pricing.netRevenue, 559000);
  const homeworkStatus: Record<HomeworkId, boolean> = {
    baseline: baselineReady && baselineChecks.length === baselineControls.length,
    promotion: promotionReady && allCorrect(overrideCases, overrideAnswers),
    consensus: consensusReady && allCorrect(consensusCases, consensusAnswers),
    revenue: pricingReady && allCorrect(pricingCases, pricingAnswers),
    readout: readout.trim().length >= 240,
  };
  const knowledgeReady = salesKnowledgeQuestions.every((item) => knowledgeAnswers[item.id] === item.correct);
  const preview = useMemo(() => artifacts.length === salesArtifacts.length && summary.trim().length >= 220
    ? `${summary.trim()} The approved consensus units can now feed inventory and production planning, while reconciled net revenue can feed financial planning; unresolved exceptions remain owned and visible.`
    : "Complete all eight deliverables and write a readiness summary of at least 220 characters.", [artifacts, summary]);

  function persist(nextCompleted: string[], lesson: SalesPlanningLessonId) {
    writeTrackProgress("implementation", { completedLessons: nextCompleted, activeLesson: lesson, activeModuleId: "implementation-sales-planning-build", lastVisited: new Date().toISOString() });
  }
  function updateBaseline(value: BaselineInputs) { setBaselineInputs(value); setBaselineRun(false); }
  function updatePromotion(value: PromotionInputs) { setPromotionInputs(value); setPromotionRun(false); }
  function updateConsensus(value: ConsensusInputs) { setConsensusInputs(value); setConsensusRun(false); }
  function updatePricing(value: PricingInputs) { setPricingInputs(value); setPricingRun(false); }
  function goToLesson(id: SalesPlanningLessonId) { setActiveLesson(id); setFeedback(null); persist(completedLessons, id); }
  function markComplete(message: string) {
    const next = completedLessons.includes(activeLesson) ? completedLessons : [...completedLessons, activeLesson];
    setCompletedLessons(next); persist(next, activeLesson); setFeedback({ tone: "success", message });
  }
  function toggle(setter: Dispatch<SetStateAction<string[]>>, item: string) { setter((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item]); }
  function validateLesson() {
    if (activeLesson === "sales-foundations") {
      if (readiness.length !== salesReadinessControls.length || !allCorrect(planningGrainCases, grainAnswers)) return setFeedback({ tone: "error", message: "Confirm all five readiness controls and resolve the three grain decisions." });
      return markComplete("Planning grain, controlled POV, ownership, requirements, and evidence boundary are ready.");
    }
    if (activeLesson === "historical-foundation") {
      if (!allCorrect(historyQualityCases, historyAnswers)) return setFeedback({ tone: "error", message: "Resolve every missing-data, stockout, exception, and cutoff case before calculating a baseline." });
      return markComplete("Historical demand is reconciled and normalization decisions preserve source truth and evidence.");
    }
    if (activeLesson === "baseline-engine") {
      if (!baselineReady || baselineChecks.length !== baselineControls.length) return setFeedback({ tone: "error", message: "Run the expected 1,208.13-unit baseline with weights totaling 100%, then confirm all five build controls." });
      return markComplete("The weighted baseline is correct, controlled, reproducible, and independently explainable.");
    }
    if (activeLesson === "promotion-overrides") {
      if (!promotionReady || !allCorrect(overrideCases, overrideAnswers)) return setFeedback({ tone: "error", message: "Produce the 1,273.37-unit promotional demand and resolve all four override-governance cases." });
      return markComplete("Promotion effects and overrides are separated, evidenced, protected, and auditable.");
    }
    if (activeLesson === "consensus-demand") {
      if (!consensusReady || !allCorrect(consensusCases, consensusAnswers)) return setFeedback({ tone: "error", message: "Produce the 1,301.35-unit final consensus with weights at 100% and resolve all governance cases." });
      return markComplete("Consensus preserves each contributor, a valid weighting model, a separate management adjustment, and an exception bridge.");
    }
    if (activeLesson === "price-revenue") {
      if (!pricingReady || !allCorrect(pricingCases, pricingAnswers)) return setFeedback({ tone: "error", message: "Produce net price 430.00 and net revenue 559,000.00, then resolve all pricing-control cases." });
      return markComplete("The list-to-net price and revenue model is dimensionally correct, precise, and reconciled.");
    }
    if (activeLesson === "functional-walkthrough") {
      if (!allCorrect(formDesignCases, formAnswers)) return setFeedback({ tone: "error", message: "Resolve all four form, performance, calculation, and validation design decisions." });
      return markComplete("The minimal functional forms and screenshot runbook are ready for controlled tenant execution.");
    }
    if (activeLesson === "reconcile-handoff") {
      if (reconciled.length !== reconciliationControls.length || sequence.length !== salesBuildSequence.length) return setFeedback({ tone: "error", message: "Confirm all seven reconciliations and all eight lifecycle steps before downstream handoff." });
      return markComplete("Demand and revenue bridges reconcile, exceptions are controlled, and downstream handoffs are explicit.");
    }
    if (activeLesson === "sales-homework") {
      if (!Object.values(homeworkStatus).every(Boolean)) return setFeedback({ tone: "error", message: "Complete all five connected sales-planning missions, including the 240-character review readout." });
      return markComplete("Applied sales-planning lab complete. One continuous evidence trail connects history to demand, consensus, price, and revenue.");
    }
    if (artifacts.length !== salesArtifacts.length || summary.trim().length < 220 || !knowledgeReady) return setFeedback({ tone: "error", message: "Complete all eight deliverables, the 220-character readiness summary, and all five knowledge checks." });
    markComplete("Phase 09 exit gate passed. The reconciled sales model is ready to supply inventory, production, and financial planning.");
  }

  return <LearningModuleFrame phase={9} stage="Build · Sales planning model" title="Sales Planning Build" description="Build and prove the controlled path from actual history to baseline, promotion, consensus demand, net price, and revenue." lessons={salesPlanningLessons} activeLessonId={activeLesson} completedLessons={completedLessons} exitGate="Reconciled consensus units and net revenue with controlled assumptions, exceptions, functional evidence, and downstream handoff" exitGateIcon={<ClipboardCheck size={19} />} feedback={feedback} prerequisite={{ complete: integrationComplete, message: "Complete Phase 08 so the sales model begins from reconciled actuals and governed metadata.", href: "/learn/data-integration", linkLabel: "Open Phase 08" }} onSelectLesson={(id) => goToLesson(id as SalesPlanningLessonId)} onValidate={validateLesson}>
    {activeLesson === "sales-foundations" && <Foundations readiness={readiness} onToggle={(item) => toggle(setReadiness, item)} answers={grainAnswers} onAnswer={(id, value) => setGrainAnswers((current) => ({ ...current, [id]: value }))} />}
    {activeLesson === "historical-foundation" && <HistoricalFoundation answers={historyAnswers} onAnswer={(id, value) => setHistoryAnswers((current) => ({ ...current, [id]: value }))} />}
    {activeLesson === "baseline-engine" && <BaselineEngine inputs={baselineInputs} onInput={updateBaseline} result={baseline} ran={baselineRun} onRun={() => setBaselineRun(true)} selected={baselineChecks} onToggle={(item) => toggle(setBaselineChecks, item)} />}
    {activeLesson === "promotion-overrides" && <PromotionOverrides inputs={promotionInputs} onInput={updatePromotion} result={promotion} ran={promotionRun} onRun={() => setPromotionRun(true)} answers={overrideAnswers} onAnswer={(id, value) => setOverrideAnswers((current) => ({ ...current, [id]: value }))} />}
    {activeLesson === "consensus-demand" && <ConsensusDemand inputs={consensusInputs} onInput={updateConsensus} result={consensus} ran={consensusRun} onRun={() => setConsensusRun(true)} answers={consensusAnswers} onAnswer={(id, value) => setConsensusAnswers((current) => ({ ...current, [id]: value }))} />}
    {activeLesson === "price-revenue" && <PriceRevenue inputs={pricingInputs} onInput={updatePricing} result={pricing} ran={pricingRun} onRun={() => setPricingRun(true)} answers={pricingAnswers} onAnswer={(id, value) => setPricingAnswers((current) => ({ ...current, [id]: value }))} />}
    {activeLesson === "functional-walkthrough" && <FunctionalWalkthrough answers={formAnswers} onAnswer={(id, value) => setFormAnswers((current) => ({ ...current, [id]: value }))} />}
    {activeLesson === "reconcile-handoff" && <ReconcileHandoff selected={reconciled} onToggle={(item) => toggle(setReconciled, item)} sequence={sequence} onSequence={(item) => toggle(setSequence, item)} />}
    {activeLesson === "sales-homework" && <SalesHomework active={activeHomework} onActive={setActiveHomework} status={homeworkStatus} baseline={<BaselineEngine inputs={baselineInputs} onInput={updateBaseline} result={baseline} ran={baselineRun} onRun={() => setBaselineRun(true)} selected={baselineChecks} onToggle={(item) => toggle(setBaselineChecks, item)} compact />} promotion={<PromotionMission inputs={promotionInputs} onInput={updatePromotion} result={promotion} ran={promotionRun} onRun={() => setPromotionRun(true)} answers={overrideAnswers} onAnswer={(id, value) => setOverrideAnswers((current) => ({ ...current, [id]: value }))} />} consensus={<ConsensusMission inputs={consensusInputs} onInput={updateConsensus} result={consensus} ran={consensusRun} onRun={() => setConsensusRun(true)} answers={consensusAnswers} onAnswer={(id, value) => setConsensusAnswers((current) => ({ ...current, [id]: value }))} />} revenue={<RevenueMission inputs={pricingInputs} onInput={updatePricing} result={pricing} ran={pricingRun} onRun={() => setPricingRun(true)} answers={pricingAnswers} onAnswer={(id, value) => setPricingAnswers((current) => ({ ...current, [id]: value }))} />} readout={readout} onReadout={setReadout} />}
    {activeLesson === "sales-exit-gate" && <SalesExitGate selected={artifacts} onToggle={(item) => toggle(setArtifacts, item)} summary={summary} onSummary={setSummary} answers={knowledgeAnswers} onAnswer={(id, value) => setKnowledgeAnswers((current) => ({ ...current, [id]: value }))} preview={preview} />}
  </LearningModuleFrame>;
}

function Foundations({ readiness, onToggle, answers, onAnswer }: { readiness: string[]; onToggle: (item: string) => void; answers: Answers; onAnswer: (id: string, value: string) => void }) {
  return <><Lead icon={<ShieldCheck size={23} />} eyebrow="Business outcome" title="Create one explainable demand and revenue plan without losing the history, assumptions, ownership, or approval trail." /><p className={base.bodyCopy}>Sales planning translates market evidence into time-phased volume and revenue. The model begins with reconciled actuals, calculates a neutral baseline, layers evidence-backed commercial effects, reaches governed consensus, and values the resulting units. A plausible number is not enough: every movement must be attributable to a source, driver, owner, calculation, or approval.</p><div className={design.designSequence}>{["History", "Baseline", "Promotion", "Consensus", "Net price", "Revenue"].map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong>{index < 5 && <ArrowRight size={13} />}</div>)}</div><h3 className={styles.sectionTitle}>Confirm the build boundary</h3><SelectionGrid items={salesReadinessControls} selected={readiness} onToggle={onToggle} /><DecisionTable items={planningGrainCases} answers={answers} onAnswer={onAnswer} label="planning-grain decision" /><div className={styles.boundary}><div><strong>Phase 09 implements</strong><span>The functional sales model, transparent calculations, minimum test forms, controls, reconciliation, lab, and evidence needed to prove the design.</span></div><div><strong>Later phases deepen it</strong><span>Phase 15 productionizes rules and Groovy. Phase 16 builds the polished form, dashboard, and Smart View experience. Phase 18 governs formal testing.</span></div></div></>;
}

function HistoricalFoundation({ answers, onAnswer }: AnswerProps) {
  const months = [["Jan",900],["Feb",920],["Mar",940],["Apr",960],["May",980],["Jun",1000],["Jul",1020],["Aug",1040],["Sep",1060],["Oct",1080],["Nov",1100],["Dec",1120]] as const;
  const downloads = [["phase-09-sales-planning-practice-pack.zip","Complete practice pack"],["README.md","Instructions"],["historical-sales-12-month.csv","Historical demand"],["expected-sales-results.csv","Expected results"],["sales-planning-test-cases.csv","Test cases"],["sales-planning-runbook.csv","Runbook"]] as const;
  return <><Lead icon={<FileSearch size={23} />} eyebrow="History before forecast" title="Preserve source truth, then normalize only documented demand distortions at the approved planning grain." /><p className={base.bodyCopy}>Sales actuals are not always demand: stockouts can suppress them, one-time orders can inflate them, returns may be represented separately, and missing records are not automatically zero. Keep loaded actuals immutable. Record every normalization in a separate controlled measure with reason, evidence, owner, and approval.</p><div className={styles.downloadGrid}>{downloads.map(([file,label]) => <a download href={`${packPath}${file}`} key={file}><Download size={17}/><div><strong>{label}</strong><small>{file}</small></div></a>)}</div><p className={styles.downloadHint}>The practice members are examples; replace them with valid training-tenant members before any Oracle activity.</p><div className={styles.historyTable}>{months.map(([month,value]) => <div key={month}><small>{month}</small><strong>{value.toLocaleString()} units</strong></div>)}</div><div className={styles.metricGrid}><Metric label="12-month total" value="12,120" detail="Reconcile to Phase 08"/><Metric label="12-month average" value="1,010" detail="Long-term level"/><Metric label="6-month average" value="1,070" detail="Recent direction"/><Metric label="3-month average" value="1,100" detail="Latest run rate"/></div><DecisionTable items={historyQualityCases} answers={answers} onAnswer={onAnswer} label="history-quality response" /><div className={styles.controlNote}>Required history controls: source/run ID, cutoff, month completeness, duplicate check, unit of measure, planning grain, normalization register, discontinued/new-product status, reconciliation total, reviewer, and approval.</div></>;
}

function BaselineEngine({ inputs, onInput, result, ran, onRun, selected, onToggle, compact = false }: { inputs: BaselineInputs; onInput: (value: BaselineInputs) => void; result: ReturnType<typeof calculateBaseline>; ran: boolean; onRun: () => void; selected: string[]; onToggle: (item: string) => void; compact?: boolean }) {
  return <><Lead icon={<Calculator size={23} />} eyebrow="Transparent baseline" title="Blend recent and long-term normalized demand, then apply explicit growth and seasonality drivers." />{!compact && <><p className={base.bodyCopy}>The baseline is a neutral starting point, not the approved forecast. For this lab, the 3-, 6-, and 12-month averages are weighted 20%/30%/50%. Growth and seasonality are then applied. Production solutions may use other methods, but the selected method, exception handling, back-testing, and ownership must be approved.</p><div className={styles.formula}>Weighted average = (3M × W3) + (6M × W6) + (12M × W12)<br/><strong>Baseline = weighted average × (1 + growth) × seasonality</strong></div></>}<BaselineCalculator inputs={inputs} onInput={onInput} result={result} ran={ran} onRun={onRun}/>{!compact && <><h3 className={styles.sectionTitle}>Build controls</h3><SelectionGrid items={baselineControls} selected={selected} onToggle={onToggle}/><div className={styles.controlNote}>Do not silently forecast sparse-history or new-product intersections with the standard method. Route them to an approved analogue, launch, lifecycle, or manual-assumption process and keep the exception visible.</div></>}</>;
}

function PromotionOverrides(props: PromotionMissionProps) {
  return <><Lead icon={<SlidersHorizontal size={23} />} eyebrow="Commercial demand bridge" title="Translate supported promotion, price, cannibalization, and halo effects into demand—without overwriting the baseline." /><p className={base.bodyCopy}>A promotion forecast should show why demand moved. This training formula separates direct uplift, price elasticity, cannibalization, and halo. In a real implementation, each assumption needs a supported grain, time window, source, owner, approval, and expiry. The model should not invent uplift where evidence is absent.</p><div className={styles.formula}>Promotional demand = baseline + promotion uplift + price elasticity effect − cannibalization + halo</div><PromotionMission {...props}/></>;
}

function PromotionMission({ inputs, onInput, result, ran, onRun, answers, onAnswer }: PromotionMissionProps) {
  return <><PromotionCalculator inputs={inputs} onInput={onInput} result={result} ran={ran} onRun={onRun}/><DecisionTable items={overrideCases} answers={answers} onAnswer={onAnswer} label="override-governance response" /></>;
}

function ConsensusDemand(props: ConsensusMissionProps) {
  return <><Lead icon={<Workflow size={23} />} eyebrow="One governed demand signal" title="Combine distinct evidence sources without hiding disagreement, and keep management judgment separate." /><p className={base.bodyCopy}>Consensus is not a meeting that produces an unexplained number. The model retains statistical/promotional demand, Market sales judgment, Channel commitments, and marketing evidence; validates weights at exactly 100%; calculates a weighted result; then applies any specifically approved management adjustment. Material variances remain visible for review.</p><div className={styles.formula}>Final consensus = Σ(input × approved weight) + approved management adjustment</div><ConsensusMission {...props}/></>;
}

function ConsensusMission({ inputs, onInput, result, ran, onRun, answers, onAnswer }: ConsensusMissionProps) {
  return <><ConsensusCalculator inputs={inputs} onInput={onInput} result={result} ran={ran} onRun={onRun}/><DecisionTable items={consensusCases} answers={answers} onAnswer={onAnswer} label="consensus-control response" /></>;
}

function PriceRevenue(props: RevenueMissionProps) {
  return <><Lead icon={<ShoppingCart size={23} />} eyebrow="Volume × realized price" title="Calculate a controlled list-to-net waterfall at the same supported grain as demand." /><p className={base.bodyCopy}>Revenue is not simply units multiplied by list price. The model needs an approved discount convention by Channel, explicit returns and credits, currency treatment under Simplified Multicurrency, and precision rules. Cost, COGS, and margin remain in Phase 12 so this phase does not duplicate financial/manufacturing logic.</p><div className={styles.formula}>Invoice price = list price × (1 − total approved discount %)<br/>Net price = invoice price − returns/unit − credits/unit<br/><strong>Net revenue = consensus units × net price</strong></div><RevenueMission {...props}/></>;
}

function RevenueMission({ inputs, onInput, result, ran, onRun, answers, onAnswer }: RevenueMissionProps) {
  return <><PricingCalculator inputs={inputs} onInput={onInput} result={result} ran={ran} onRun={onRun}/><DecisionTable items={pricingCases} answers={answers} onAnswer={onAnswer} label="pricing-control response" /></>;
}

function FunctionalWalkthrough({ answers, onAnswer }: AnswerProps) {
  return <><Lead icon={<Camera size={23} />} eyebrow="Tenant execution runbook" title="Use small functional forms to prove inputs, calculations, security, validation, execution scope, and reconciliation." /><p className={base.bodyCopy}>These are build-validation forms, not the final user experience. Separate data entry from reporting, keep the grid task-specific, place sparse selections in POV/page where practical, protect actuals and calculations, use valid intersections and suppression, and test both allowed and denied behavior. Phase 16 will turn proven workflows into polished Forms 2.0, Dashboard 2.0, and Smart View experiences.</p><DecisionTable items={formDesignCases} answers={answers} onAnswer={onAnswer} label="functional-form response" /><ScreenshotWalkthrough/></>;
}

function ReconcileHandoff({ selected, onToggle, sequence, onSequence }: { selected: string[]; onToggle: (item: string) => void; sequence: string[]; onSequence: (item: string) => void }) {
  return <><Lead icon={<BarChart3 size={23} />} eyebrow="Control before handoff" title="Prove every bridge, exception, aggregate, access boundary, and downstream interface—not just the final total." /><h3 className={styles.sectionTitle}>Reconciliation checklist</h3><SelectionGrid items={reconciliationControls} selected={selected} onToggle={onToggle}/><h3 className={styles.sectionTitle}>Confirm the controlled execution order</h3><div className={styles.sequence}>{salesBuildSequence.map((item) => <button className={sequence.includes(item) ? styles.confirmed : ""} key={item} onClick={() => onSequence(item)} type="button"><strong>{item}</strong><span>{sequence.includes(item) ? <Check size={15}/> : "Confirm"}</span></button>)}</div><div className={styles.handoff}><strong>Approved consensus units</strong><ArrowRight size={15}/><span>Inventory and production planning</span><strong>Reconciled net revenue</strong><ArrowRight size={15}/><span>Financial planning and S&amp;OP</span></div><div className={styles.controlNote}>A green job status is execution evidence, not business reconciliation. Retain inputs, rule/version, prompts, detailed and aggregate results, independent calculations, negative tests, exceptions, approvals, and downstream acknowledgements.</div></>;
}

function SalesHomework({ active, onActive, status, baseline, promotion, consensus, revenue, readout, onReadout }: { active: HomeworkId; onActive: (id: HomeworkId) => void; status: Record<HomeworkId, boolean>; baseline: React.ReactNode; promotion: React.ReactNode; consensus: React.ReactNode; revenue: React.ReactNode; readout: string; onReadout: (value: string) => void }) {
  const mission = salesHomeworkMissions.find((item) => item.id === active)!;
  const completed = Object.values(status).filter(Boolean).length;
  return <><Lead icon={<BookOpenCheck size={23}/>} eyebrow="Applied hands-on lab" title="Complete one planning cycle from the supplied actuals to an evidence-backed demand and revenue recommendation."/><div className={base.homeworkMissionGrid}>{salesHomeworkMissions.map((item,index) => <button className={`${active === item.id ? base.homeworkMissionActive : ""} ${status[item.id] ? base.homeworkMissionDone : ""}`} key={item.id} onClick={() => onActive(item.id)} type="button"><span>{status[item.id] ? <CheckCircle2 size={17}/> : String(index + 1).padStart(2,"0")}</span><div><strong>{item.title}</strong><small>{item.output}</small></div></button>)}</div><div className={base.homeworkProgress}><div><span style={{width:`${completed / salesHomeworkMissions.length * 100}%`}}/></div><strong>{completed} of {salesHomeworkMissions.length} missions complete</strong></div><section className={base.homeworkWorkspace}><header><div><small>Active mission</small><strong>{mission.title}</strong></div><span>{mission.output}</span></header>{active === "baseline" && baseline}{active === "promotion" && promotion}{active === "consensus" && consensus}{active === "revenue" && revenue}{active === "readout" && <label className={styles.summaryField}>Sales planning review and recommendation<textarea rows={13} value={readout} onChange={(event) => onReadout(event.target.value)} placeholder="Summarize the approved POV and source cutoff, history quality, baseline method and result, promotion/override bridge, contributor inputs and consensus, price waterfall, net revenue, exceptions, reconciliations, evidence, downstream handoff, open items, owners, and recommendation."/><small>{readout.trim().length}/240 minimum characters</small></label>}</section></>;
}

function SalesExitGate({ selected, onToggle, summary, onSummary, answers, onAnswer, preview }: { selected: string[]; onToggle: (item: string) => void; summary: string; onSummary: (value: string) => void; answers: Answers; onAnswer: (id: string, value: string) => void; preview: string }) {
  return <><Lead icon={<ClipboardCheck size={23}/>} eyebrow="Phase deliverable" title="Hand off a reconciled, reproducible sales model with business controls—not a collection of screens."/><h3 className={styles.sectionTitle}>Deliverable checklist</h3><SelectionGrid items={salesArtifacts} selected={selected} onToggle={onToggle}/><label className={styles.summaryField}>Sales-planning build readiness summary<textarea rows={12} value={summary} onChange={(event) => onSummary(event.target.value)} placeholder="Summarize grain and POV, history and normalization, baseline method, promotion and overrides, consensus inputs and approvals, pricing and revenue, forms and access, rule/job evidence, test and reconciliation results, downstream handoffs, exceptions, open items, owners, reviewer, and approval."/><small>{summary.trim().length}/220 minimum characters</small></label><h3 className={styles.sectionTitle}>Knowledge check</h3><div className={base.quizList}>{salesKnowledgeQuestions.map((question,index) => <fieldset key={question.id}><legend><span>{index + 1}</span>{question.prompt}</legend>{question.options.map((option) => <label key={option}><input checked={answers[question.id] === option} name={question.id} onChange={() => onAnswer(question.id,option)} type="radio"/>{option}</label>)}</fieldset>)}</div><div className={styles.preview}><small>Generated Phase 09 handoff</small><p>{preview}</p><div>Reconciled actuals <ArrowRight size={13}/> Governed sales plan <ArrowRight size={13}/> Supply and financial planning</div></div></>;
}

function BaselineCalculator({ inputs, onInput, result, ran, onRun }: { inputs: BaselineInputs; onInput: (value: BaselineInputs) => void; result: ReturnType<typeof calculateBaseline>; ran: boolean; onRun: () => void }) {
  return <CalculatorShell title="Baseline engine" badge={near(result.weightTotal,100) ? "Weights valid" : `Weights ${format(result.weightTotal,0)}%`} onRun={onRun}><div className={styles.inputGrid}><NumberField label="3M average · units" value={inputs.avg3} onChange={(value) => onInput({...inputs,avg3:value})}/><NumberField label="6M average · units" value={inputs.avg6} onChange={(value) => onInput({...inputs,avg6:value})}/><NumberField label="12M average · units" value={inputs.avg12} onChange={(value) => onInput({...inputs,avg12:value})}/><NumberField label="3M weight · %" value={inputs.w3} onChange={(value) => onInput({...inputs,w3:value})}/><NumberField label="6M weight · %" value={inputs.w6} onChange={(value) => onInput({...inputs,w6:value})}/><NumberField label="12M weight · %" value={inputs.w12} onChange={(value) => onInput({...inputs,w12:value})}/><NumberField label="Growth · %" value={inputs.growth} onChange={(value) => onInput({...inputs,growth:value})}/><NumberField label="Seasonality · multiplier" value={inputs.seasonality} step="0.01" onChange={(value) => onInput({...inputs,seasonality:value})}/></div>{ran && <div className={styles.resultStrip}><Result label="Weight total" value={`${format(result.weightTotal,0)}%`}/><Result label="Weighted average" value={format(result.weightedAverage,2)}/><Result label="Growth-adjusted" value={format(result.growthAdjusted,2)}/><Result label="Baseline demand" value={format(result.baseline,2)} primary/></div>}</CalculatorShell>;
}

function PromotionCalculator({ inputs, onInput, result, ran, onRun }: { inputs: PromotionInputs; onInput: (value: PromotionInputs) => void; result: ReturnType<typeof calculatePromotion>; ran: boolean; onRun: () => void }) {
  return <CalculatorShell title="Promotion bridge" badge="Units model" onRun={onRun}><div className={styles.inputGrid}><NumberField label="Baseline · units" value={inputs.baseline} step="0.01" onChange={(value) => onInput({...inputs,baseline:value})}/><NumberField label="Promotion uplift · %" value={inputs.uplift} onChange={(value) => onInput({...inputs,uplift:value})}/><NumberField label="Price change · %" value={inputs.priceChange} onChange={(value) => onInput({...inputs,priceChange:value})}/><NumberField label="Price elasticity · ratio" value={inputs.elasticity} step="0.1" onChange={(value) => onInput({...inputs,elasticity:value})}/><NumberField label="Cannibalization · % uplift" value={inputs.cannibalization} onChange={(value) => onInput({...inputs,cannibalization:value})}/><NumberField label="Halo · % uplift" value={inputs.halo} onChange={(value) => onInput({...inputs,halo:value})}/></div>{ran && <><div className={styles.bridge}><Bridge label="Baseline" value={result.baseline}/><Bridge label="Uplift" value={result.promotionUplift} positive/><Bridge label="Price effect" value={result.priceEffect} negative/><Bridge label="Cannibal." value={-result.cannibalization} negative/><Bridge label="Halo" value={result.halo} positive/></div><div className={styles.resultStrip}><Result label="Promotional demand" value={`${format(result.promotionalDemand,2)} units`} primary/></div></>}</CalculatorShell>;
}

function ConsensusCalculator({ inputs, onInput, result, ran, onRun }: { inputs: ConsensusInputs; onInput: (value: ConsensusInputs) => void; result: ReturnType<typeof calculateConsensus>; ran: boolean; onRun: () => void }) {
  return <CalculatorShell title="Consensus engine" badge={near(result.weightTotal,100) ? "Weights valid" : `Weights ${format(result.weightTotal,0)}%`} onRun={onRun}><div className={styles.inputGrid}><NumberField label="Statistical · units" value={inputs.statistical} step="0.01" onChange={(value) => onInput({...inputs,statistical:value})}/><NumberField label="Market sales · units" value={inputs.sales} onChange={(value) => onInput({...inputs,sales:value})}/><NumberField label="Channel commitment · units" value={inputs.channel} onChange={(value) => onInput({...inputs,channel:value})}/><NumberField label="Marketing · units" value={inputs.marketing} onChange={(value) => onInput({...inputs,marketing:value})}/><NumberField label="Statistical weight · %" value={inputs.wStat} onChange={(value) => onInput({...inputs,wStat:value})}/><NumberField label="Market sales weight · %" value={inputs.wSales} onChange={(value) => onInput({...inputs,wSales:value})}/><NumberField label="Channel weight · %" value={inputs.wChannel} onChange={(value) => onInput({...inputs,wChannel:value})}/><NumberField label="Marketing weight · %" value={inputs.wMarketing} onChange={(value) => onInput({...inputs,wMarketing:value})}/><NumberField label="Management adjustment · units" value={inputs.management} onChange={(value) => onInput({...inputs,management:value})}/></div>{ran && <div className={styles.resultStrip}><Result label="Weight total" value={`${format(result.weightTotal,0)}%`}/><Result label="Weighted consensus" value={format(result.weightedConsensus,2)}/><Result label="Management adjustment" value={format(inputs.management,2)}/><Result label="Final consensus" value={`${format(result.finalConsensus,2)} units`} primary/></div>}</CalculatorShell>;
}

function PricingCalculator({ inputs, onInput, result, ran, onRun }: { inputs: PricingInputs; onInput: (value: PricingInputs) => void; result: ReturnType<typeof calculatePricing>; ran: boolean; onRun: () => void }) {
  return <CalculatorShell title="List-to-net revenue" badge="Currency model" onRun={onRun}><div className={styles.inputGrid}><NumberField label="Consensus units" value={inputs.units} onChange={(value) => onInput({...inputs,units:value})}/><NumberField label="List price · currency/unit" value={inputs.listPrice} onChange={(value) => onInput({...inputs,listPrice:value})}/><NumberField label="Contract discount · %" value={inputs.contract} onChange={(value) => onInput({...inputs,contract:value})}/><NumberField label="Promotion discount · %" value={inputs.promotion} onChange={(value) => onInput({...inputs,promotion:value})}/><NumberField label="Volume discount · %" value={inputs.volume} onChange={(value) => onInput({...inputs,volume:value})}/><NumberField label="Channel discount · %" value={inputs.channel} onChange={(value) => onInput({...inputs,channel:value})}/><NumberField label="Returns · currency/unit" value={inputs.returns} onChange={(value) => onInput({...inputs,returns:value})}/><NumberField label="Credits · currency/unit" value={inputs.credits} onChange={(value) => onInput({...inputs,credits:value})}/></div>{ran && <div className={styles.resultStrip}><Result label="Total discount" value={`${format(result.totalDiscount,0)}%`}/><Result label="Invoice price" value={formatCurrency(result.invoicePrice)}/><Result label="Net price" value={formatCurrency(result.netPrice)}/><Result label="Net revenue" value={formatCurrency(result.netRevenue)} primary/></div>}</CalculatorShell>;
}

function CalculatorShell({ title, badge, onRun, children }: { title: string; badge: string; onRun: () => void; children: React.ReactNode }) { return <section className={styles.calculator}><header><div><Calculator size={18}/><strong>{title}</strong></div><span>{badge}</span></header>{children}<div className={styles.calculatorFooter}><p>Change inputs to test the control, then run the calculation again.</p><button onClick={onRun} type="button"><PlayCircle size={15}/>Run calculation</button></div></section>; }
function NumberField({ label, value, onChange, step = "1" }: { label: string; value: number; onChange: (value: number) => void; step?: string }) { return <label>{label}<input type="number" step={step} value={value} onChange={(event) => onChange(Number(event.target.value))}/></label>; }
function Result({ label, value, primary = false }: { label: string; value: string; primary?: boolean }) { return <article className={primary ? styles.primaryResult : ""}><small>{label}</small><strong>{value}</strong></article>; }
function Metric({ label, value, detail }: { label: string; value: string; detail: string }) { return <article><small>{label}</small><strong>{value}</strong><span>{detail}</span></article>; }
function Bridge({ label, value, positive = false, negative = false }: { label: string; value: number; positive?: boolean; negative?: boolean }) { return <div className={positive ? styles.positive : negative ? styles.negative : ""}><small>{label}</small><strong>{value > 0 && positive ? "+" : ""}{format(value,2)}</strong></div>; }
function Lead({ icon, eyebrow, title }: { icon: React.ReactNode; eyebrow: string; title: string }) { return <div className={base.lessonLead}>{icon}<div><small>{eyebrow}</small><strong>{title}</strong></div></div>; }

function SelectionGrid({ items, selected, onToggle }: { items: readonly string[]; selected: string[]; onToggle: (item: string) => void }) { return <div className={design.selectionGrid}>{items.map((item) => <button className={selected.includes(item) ? design.selectedCard : ""} key={item} onClick={() => onToggle(item)} type="button">{selected.includes(item) ? <CheckCircle2 size={17}/> : <span/>}<strong>{item}</strong></button>)}</div>; }
function DecisionTable({ items, answers, onAnswer, label }: { items: readonly { id: string; issue: string; correct: string; options: readonly string[] }[]; answers: Answers; onAnswer: (id: string, value: string) => void; label: string }) { return <div className={design.mappingTable}>{items.map((item) => <div className={design.tableRow} key={item.id}><div><strong>{item.id}</strong><small>{item.issue}</small></div><select aria-label={`${item.id} ${label}`} value={answers[item.id] ?? ""} onChange={(event) => onAnswer(item.id,event.target.value)}><option value="">Select controlled response</option>{item.options.map((option) => <option key={option}>{option}</option>)}</select></div>)}</div>; }

function ScreenshotWalkthrough() {
  return <section className={styles.walkthrough}><div className={styles.walkthroughHeader}><div><Camera size={20}/><div><small>Screenshot-guided procedure</small><strong>Functional sales model walkthrough</strong></div></div><span>{salesScreenshots.length} guided steps</span></div><div className={styles.walkthroughGrid}>{salesScreenshots.map((step,index) => <article key={step.id}><div className={styles.stepTitle}><span>{String(index+1).padStart(2,"0")}</span><div><small>{step.id}</small><strong>{step.title}</strong></div></div><OracleScreenshot asset={step.asset} capture={step.capture} className={styles.screenshot} phase="phase-09" title={step.title} /><dl><div><dt>Navigation</dt><dd>{step.path}</dd></div><div><dt>Trainee action</dt><dd>{step.action}</dd></div><div><dt>Validation evidence</dt><dd>{step.evidence}</dd></div></dl>{"docUrl" in step && step.docUrl && <a href={step.docUrl} rel="noreferrer" target="_blank">Oracle reference <ExternalLink size={13}/></a>}</article>)}</div></section>; 
}

function calculateBaseline(input: BaselineInputs) { const weightTotal = input.w3 + input.w6 + input.w12; const weightedAverage = input.avg3 * input.w3 / 100 + input.avg6 * input.w6 / 100 + input.avg12 * input.w12 / 100; const growthAdjusted = weightedAverage * (1 + input.growth / 100); return { weightTotal, weightedAverage, growthAdjusted, baseline: growthAdjusted * input.seasonality }; }
function calculatePromotion(input: PromotionInputs) { const promotionUplift = input.baseline * input.uplift / 100; const priceEffect = input.baseline * input.priceChange / 100 * input.elasticity; const cannibalization = promotionUplift * input.cannibalization / 100; const halo = promotionUplift * input.halo / 100; return { baseline: input.baseline, promotionUplift, priceEffect, cannibalization, halo, promotionalDemand: input.baseline + promotionUplift + priceEffect - cannibalization + halo }; }
function calculateConsensus(input: ConsensusInputs) { const weightTotal = input.wStat + input.wSales + input.wChannel + input.wMarketing; const weightedConsensus = input.statistical * input.wStat / 100 + input.sales * input.wSales / 100 + input.channel * input.wChannel / 100 + input.marketing * input.wMarketing / 100; return { weightTotal, weightedConsensus, finalConsensus: weightedConsensus + input.management }; }
function calculatePricing(input: PricingInputs) { const totalDiscount = input.contract + input.promotion + input.volume + input.channel; const invoicePrice = input.listPrice * (1 - totalDiscount / 100); const netPrice = invoicePrice - input.returns - input.credits; return { totalDiscount, invoicePrice, netPrice, grossRevenue: input.units * input.listPrice, netRevenue: input.units * netPrice }; }
function near(actual: number, expected: number) { return Math.abs(actual - expected) < 0.01; }
function format(value: number, digits = 2) { return value.toLocaleString(undefined,{minimumFractionDigits:digits,maximumFractionDigits:digits}); }
function formatCurrency(value: number) { return value.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2}); }

type AnswerProps = { answers: Answers; onAnswer: (id: string, value: string) => void };
type PromotionMissionProps = AnswerProps & { inputs: PromotionInputs; onInput: (value: PromotionInputs) => void; result: ReturnType<typeof calculatePromotion>; ran: boolean; onRun: () => void };
type ConsensusMissionProps = AnswerProps & { inputs: ConsensusInputs; onInput: (value: ConsensusInputs) => void; result: ReturnType<typeof calculateConsensus>; ran: boolean; onRun: () => void };
type RevenueMissionProps = AnswerProps & { inputs: PricingInputs; onInput: (value: PricingInputs) => void; result: ReturnType<typeof calculatePricing>; ran: boolean; onRun: () => void };
