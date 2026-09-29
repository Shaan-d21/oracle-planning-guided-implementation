"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  Factory,
  Landmark,
  ListChecks,
  RefreshCw,
  Scale,
  ShieldCheck,
  TrendingUp,
  UsersRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  approvalCases,
  capstoneEvidenceItems,
  capstoneKnowledgeQuestions,
  consensusCases,
  demandSteps,
  financialControls,
  implementationEvidenceMap,
  monthlyPlanningCapstoneLessons,
  readinessControls,
  supplyControls,
  type MonthlyPlanningCapstoneLessonId,
} from "@/content/monthly-planning-capstone";
import { readTrackProgress, writeTrackProgress } from "@/lib/learning-progress";
import { LearningModuleFrame, type ModuleFeedback } from "./learning-module-frame";
import base from "./discovery-module.module.css";
import styles from "./monthly-data-readiness-module.module.css";

const consensusOptions = ["Include with evidence", "Include as a governed override", "Reject or return for governance"] as const;
const approvalOptions = ["Submit for approval", "Return for rework", "Approve with condition", "Publish the approved version"] as const;

type ReadinessTotals = { rows: string; rejects: string; sourceUnits: string; planUnits: string; bookInventory: string; blockedInventory: string };
type DemandValues = { recent3: string; recent6: string; recent12: string; growth: string; seasonality: string; result: string };

export function MonthlyPlanningCapstone() {
  const [activeLesson, setActiveLesson] = useState<MonthlyPlanningCapstoneLessonId>("capstone-readiness");
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<ModuleFeedback>(null);
  const [readiness, setReadiness] = useState<string[]>([]);
  const [readinessTotals, setReadinessTotals] = useState<ReadinessTotals>({ rows: "", rejects: "", sourceUnits: "", planUnits: "", bookInventory: "", blockedInventory: "" });
  const [demandSequence, setDemandSequence] = useState<string[]>([]);
  const [demand, setDemand] = useState<DemandValues>({ recent3: "", recent6: "", recent12: "", growth: "", seasonality: "", result: "" });
  const [consensus, setConsensus] = useState<Record<string, string>>({});
  const [consensusTotal, setConsensusTotal] = useState("");
  const [supply, setSupply] = useState<string[]>([]);
  const [financials, setFinancials] = useState<Record<string, string>>({});
  const [approval, setApproval] = useState<Record<string, string>>({});
  const [evidence, setEvidence] = useState<string[]>([]);
  const [summary, setSummary] = useState("");
  const [knowledge, setKnowledge] = useState<Record<string, number>>({});

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = readTrackProgress("planning-cycle");
      setCompletedLessons(stored.completedLessons);
      const saved = monthlyPlanningCapstoneLessons.find((lesson) => lesson.id === stored.activeLesson);
      if (saved) setActiveLesson(saved.id);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function persist(completed: string[], lesson: MonthlyPlanningCapstoneLessonId) {
    writeTrackProgress("planning-cycle", {
      completedLessons: completed,
      activeLesson: lesson,
      activeModuleId: "planning-cycle-capstone",
      lastVisited: new Date().toISOString(),
    });
  }

  function goToLesson(id: MonthlyPlanningCapstoneLessonId) {
    setActiveLesson(id);
    setFeedback(null);
    persist(completedLessons, id);
  }

  function toggle(list: string[], item: string, setter: (next: string[]) => void) {
    setter(list.includes(item) ? list.filter((value) => value !== item) : [...list, item]);
  }

  function complete(message: string) {
    const next = completedLessons.includes(activeLesson) ? completedLessons : [...completedLessons, activeLesson];
    setCompletedLessons(next);
    persist(next, activeLesson);
    setFeedback({ tone: "success", message });
  }

  function validateCurrentLesson() {
    if (activeLesson === "capstone-readiness") {
      const totalsPass = readinessTotals.rows === "576" && readinessTotals.rejects === "0" && readinessTotals.sourceUnits === "66240" && readinessTotals.planUnits === "66240" && readinessTotals.bookInventory === "730" && readinessTotals.blockedInventory === "80";
      if (!readinessControls.every((item) => readiness.includes(item)) || !totalsPass) {
        setFeedback({ tone: "error", message: "Confirm all readiness controls and enter the approved totals: 576 rows, 0 rejects, 66,240 source and Plan1 units, 730 book inventory, and 80 blocked units." });
        return;
      }
      complete("The monthly cycle opens from a controlled and reconciled starting point. Usable opening inventory is 650 units.");
      return;
    }

    if (activeLesson === "capstone-demand") {
      const inputsPass = demand.recent3 === "1100" && demand.recent6 === "1070" && demand.recent12 === "1010" && demand.growth === "5" && demand.seasonality === "1.10";
      const resultPass = Math.abs(Number(demand.result) - 1208.13) < 0.01;
      if (!demandSteps.every((item) => demandSequence.includes(item)) || !inputsPass || !resultPass) {
        setFeedback({ tone: "error", message: "Use the controlled sequence and case inputs. Weighted baseline = 1,046; after 5% growth and 1.10 seasonality, the demand baseline is 1,208.13 units." });
        return;
      }
      complete("The statistical demand baseline is calculated from reconciled history with business assumptions kept visible.");
      return;
    }

    if (activeLesson === "capstone-consensus") {
      const casesPass = consensusCases.every((item) => consensus[item.id] === item.correct);
      if (!casesPass || Math.abs(Number(consensusTotal) - 1301.35) > 0.01) {
        setFeedback({ tone: "error", message: "Govern each business adjustment, reject the unowned late increase, and enter the approved rounded consensus demand of 1,301.35 units." });
        return;
      }
      complete("The sales plan now has one approved consensus demand with traceable promotions, overrides, ownership, and review.");
      return;
    }

    if (activeLesson === "capstone-supply") {
      if (!supplyControls.every((item) => supply.includes(item))) {
        setFeedback({ tone: "error", message: "Complete the inventory-to-production bridge, both plant allocations, capacity check, and material-response ownership." });
        return;
      }
      complete("The approved demand is translated into a feasible 1,380-unit production plan with controlled capacity and material actions.");
      return;
    }

    if (activeLesson === "capstone-financial") {
      const valuesPass = financialControls.every((item) => Math.abs(Number(financials[item.id]) - Number(item.expected)) < 0.01);
      if (!valuesPass) {
        setFeedback({ tone: "error", message: "Reconcile all six financial controls at full precision, including the balance-sheet and Plan1-to-ApexPlan zero checks." });
        return;
      }
      complete("Operational drivers reconcile to margin, net income, cash, the balanced statements, and the reporting cube.");
      return;
    }

    if (activeLesson === "capstone-approval") {
      if (!approvalCases.every((item) => approval[item.id] === item.correct)) {
        setFeedback({ tone: "error", message: "Apply the correct decision path: submit a reconciled plan, rework unmitigated capacity risk, govern minor conditions, then publish only the approved version." });
        return;
      }
      complete("The preferred scenario follows an auditable review, approval, condition, and publication workflow.");
      return;
    }

    const earlierComplete = monthlyPlanningCapstoneLessons.slice(0, -1).every((lesson) => completedLessons.includes(lesson.id));
    const score = capstoneKnowledgeQuestions.filter((question) => knowledge[question.id] === question.correct).length;
    if (!earlierComplete || !capstoneEvidenceItems.every((item) => evidence.includes(item)) || summary.trim().length < 220 || score !== capstoneKnowledgeQuestions.length) {
      setFeedback({ tone: "error", message: "Complete lessons 1–6, select all eight evidence items, write a 220-character executive cycle summary, and answer all five knowledge checks correctly." });
      return;
    }
    complete("Capstone passed. The monthly plan is approved, published, reconciled, owned, and ready for the next governed cycle.");
  }

  return (
    <LearningModuleFrame
      activeLessonId={activeLesson}
      completedLessons={completedLessons}
      dashboardHref="/learn?track=planning-cycle"
      description="Operate the solution built during the implementation journey through one evidence-backed monthly planning cycle—from actuals readiness to approved, published, and reconciled results."
      exitGate="Submit the complete monthly-cycle evidence pack and defend the approved operational and financial plan"
      exitGateIcon={<ClipboardCheck size={18} />}
      feedback={feedback}
      lessons={monthlyPlanningCapstoneLessons}
      onSelectLesson={(id) => goToLesson(id as MonthlyPlanningCapstoneLessonId)}
      onValidate={validateCurrentLesson}
      phase={1}
      stage="Operate · End-to-end workshop capstone"
      title="Monthly Planning Capstone"
      unitLabel="Capstone"
      validateLabel={activeLesson === "capstone-close" ? "Submit capstone" : undefined}
    >
      {activeLesson === "capstone-readiness" && <ReadinessLesson selected={readiness} totals={readinessTotals} onToggle={(item) => toggle(readiness, item, setReadiness)} onTotal={(id, value) => setReadinessTotals((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "capstone-demand" && <DemandLesson selected={demandSequence} values={demand} onToggle={(item) => toggle(demandSequence, item, setDemandSequence)} onValue={(id, value) => setDemand((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "capstone-consensus" && <ConsensusLesson answers={consensus} total={consensusTotal} onAnswer={(id, value) => setConsensus((current) => ({ ...current, [id]: value }))} onTotal={setConsensusTotal} />}
      {activeLesson === "capstone-supply" && <SupplyLesson selected={supply} onToggle={(item) => toggle(supply, item, setSupply)} />}
      {activeLesson === "capstone-financial" && <FinancialLesson values={financials} onValue={(id, value) => setFinancials((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "capstone-approval" && <ApprovalLesson answers={approval} onAnswer={(id, value) => setApproval((current) => ({ ...current, [id]: value }))} />}
      {activeLesson === "capstone-close" && <CloseLesson answers={knowledge} evidence={evidence} summary={summary} onAnswer={(id, value) => setKnowledge((current) => ({ ...current, [id]: value }))} onSummary={setSummary} onToggle={(item) => toggle(evidence, item, setEvidence)} />}
    </LearningModuleFrame>
  );
}

function ContextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link className={styles.contextLink} href={href}>Review implementation evidence <ArrowRight size={14} /> <span>{children}</span></Link>;
}

function Checklist({ items, selected, onToggle }: { items: readonly string[]; selected: string[]; onToggle: (item: string) => void }) {
  return <div className={styles.evidenceGrid}>{items.map((item) => <button className={selected.includes(item) ? styles.selected : ""} key={item} onClick={() => onToggle(item)} type="button">{selected.includes(item) ? <CheckCircle2 size={17} /> : <span />}<strong>{item}</strong></button>)}</div>;
}

function ReadinessLesson({ selected, totals, onToggle, onTotal }: { selected: string[]; totals: ReadinessTotals; onToggle: (item: string) => void; onTotal: (id: keyof ReadinessTotals, value: string) => void }) {
  const fields: { id: keyof ReadinessTotals; label: string; hint: string }[] = [
    { id: "rows", label: "Loaded rows", hint: "Expected 576" }, { id: "rejects", label: "Rejected rows", hint: "Expected 0" },
    { id: "sourceUnits", label: "Source units", hint: "Expected 66,240" }, { id: "planUnits", label: "Plan1 units", hint: "Expected 66,240" },
    { id: "bookInventory", label: "Book inventory", hint: "Expected 730" }, { id: "blockedInventory", label: "Blocked inventory", hint: "Expected 80" },
  ];
  const variance = totals.sourceUnits && totals.planUnits ? Number(totals.planUnits) - Number(totals.sourceUnits) : null;
  const usable = totals.bookInventory && totals.blockedInventory ? Number(totals.bookInventory) - Number(totals.blockedInventory) : null;
  return <>
    <div className={base.lessonLead}><RefreshCw size={23} /><div><small>Open the monthly cycle</small><strong>Prove that planners are starting from complete, owned, and reconciled inputs.</strong></div></div>
    <p className={base.bodyCopy}>Use the same approved Apex case and evidence created during metadata and data-integration build. A job marked successful is not enough: reconcile the source, accepted rows, rejects, Plan1 totals, opening inventory, metadata, and currency rates.</p>
    <Checklist items={readinessControls} selected={selected} onToggle={onToggle} />
    <div className={styles.reconciliationGrid}>{fields.map((field) => <label key={field.id}><span>{field.label}</span><input inputMode="decimal" onChange={(event) => onTotal(field.id, event.target.value)} type="number" value={totals[field.id]} /><small>{field.hint}</small></label>)}</div>
    <div className={styles.calculationStrip}><article><small>Unit variance</small><strong className={variance === 0 ? styles.good : ""}>{variance ?? "—"}</strong><span>Plan1 − source</span></article><article><small>Usable inventory</small><strong className={usable === 650 ? styles.good : ""}>{usable ?? "—"}</strong><span>Book − blocked</span></article><article><small>Release state</small><strong className={selected.length === readinessControls.length ? styles.good : ""}>{selected.length === readinessControls.length ? "Ready" : "Open"}</strong><span>{selected.length}/6 controls</span></article></div>
    <ContextLink href="/learn/data-integration">Phase 08 load and reconciliation</ContextLink>
  </>;
}

function DemandLesson({ selected, values, onToggle, onValue }: { selected: string[]; values: DemandValues; onToggle: (item: string) => void; onValue: (id: keyof DemandValues, value: string) => void }) {
  const fields: { id: keyof DemandValues; label: string; hint: string }[] = [
    { id: "recent3", label: "Recent 3-month average", hint: "1,100" }, { id: "recent6", label: "Recent 6-month average", hint: "1,070" },
    { id: "recent12", label: "Recent 12-month average", hint: "1,010" }, { id: "growth", label: "Growth %", hint: "5" },
    { id: "seasonality", label: "Seasonal factor", hint: "1.10" }, { id: "result", label: "Final baseline units", hint: "Calculate to 2 decimals" },
  ];
  const calculated = values.recent3 && values.recent6 && values.recent12 && values.growth && values.seasonality ? ((Number(values.recent3) * .2 + Number(values.recent6) * .3 + Number(values.recent12) * .5) * (1 + Number(values.growth) / 100) * Number(values.seasonality)).toFixed(2) : "—";
  return <>
    <div className={base.lessonLead}><TrendingUp size={23} /><div><small>Establish an explainable starting forecast</small><strong>Calculate the statistical baseline before adding commercial judgment.</strong></div></div>
    <p className={base.bodyCopy}>For the assigned product-market-channel slice, weight the 3-, 6-, and 12-month averages at 20%, 30%, and 50%. Then apply the approved 5% growth assumption and 1.10 seasonal factor.</p>
    <Checklist items={demandSteps} selected={selected} onToggle={onToggle} />
    <div className={styles.reconciliationGrid}>{fields.map((field) => <label key={field.id}><span>{field.label}</span><input inputMode="decimal" onChange={(event) => onValue(field.id, event.target.value)} type="number" value={values[field.id]} /><small>{field.hint}</small></label>)}</div>
    <div className={styles.formulaBanner}><Scale size={18} /><div><small>Calculated from current inputs</small><strong>{calculated} units</strong><span>(3M × 20% + 6M × 30% + 12M × 50%) × growth × seasonality</span></div></div>
    <ContextLink href="/learn/sales-planning-build">Phase 09 baseline calculation</ContextLink>
  </>;
}

function ConsensusLesson({ answers, total, onAnswer, onTotal }: { answers: Record<string, string>; total: string; onAnswer: (id: string, value: string) => void; onTotal: (value: string) => void }) {
  return <>
    <div className={base.lessonLead}><UsersRound size={23} /><div><small>Convert baseline to approved demand</small><strong>Keep promotions, overrides, reasons, owners, and reviewers traceable through consensus.</strong></div></div>
    <div className={styles.exceptionList}>{consensusCases.map((item) => <article key={item.id}><div><span>{item.id}</span><p>{item.statement}</p></div><select aria-label={`${item.id} decision`} onChange={(event) => onAnswer(item.id, event.target.value)} value={answers[item.id] ?? ""}><option value="">Choose a control response</option>{consensusOptions.map((option) => <option key={option}>{option}</option>)}</select></article>)}</div>
    <label className={styles.singleValue}>Approved consensus demand<input inputMode="decimal" onChange={(event) => onTotal(event.target.value)} placeholder="Enter the rounded approved units" type="number" value={total} /><small>Expected result from the governed case: 1,301.35 units</small></label>
    <div className={styles.ruleCallout}><ShieldCheck size={21} /><div><strong>Do not overwrite the baseline</strong><p>Business judgment belongs in separate drivers or overrides so the team can explain the movement from statistical baseline to approved consensus.</p></div></div>
    <ContextLink href="/learn/sales-planning-build">Phase 09 promotion, override and consensus flow</ContextLink>
  </>;
}

function SupplyLesson({ selected, onToggle }: { selected: string[]; onToggle: (item: string) => void }) {
  return <>
    <div className={base.lessonLead}><Factory size={23} /><div><small>Balance demand with supply</small><strong>Translate consensus demand and inventory policy into feasible plant, capacity, and material decisions.</strong></div></div>
    <p className={base.bodyCopy}>The controlled operational bridge produces 1,380 units after target-inventory, yield, and lot-size rules. Allocate 820 units to Pune and 560 to Noida, then validate 690 required hours against 800 available hours.</p>
    <Checklist items={supplyControls} selected={selected} onToggle={onToggle} />
    <div className={styles.flowStrip}>{["Consensus demand", "Inventory bridge", "Production requirement", "Plant allocation", "Capacity and materials"].map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong>{index < 4 && <ArrowRight size={14} />}</div>)}</div>
    <ContextLink href="/learn/production-planning-build">Phases 10–11 production and inventory evidence</ContextLink>
  </>;
}

function FinancialLesson({ values, onValue }: { values: Record<string, string>; onValue: (id: string, value: string) => void }) {
  return <>
    <div className={base.lessonLead}><Landmark size={23} /><div><small>Connect operations to finance</small><strong>Validate the approved plan’s revenue, margin, profit, cash, balance, and reporting-cube movement.</strong></div></div>
    <p className={base.bodyCopy}>Enter the full-precision values from the integrated Apex case. Rounded dashboards support decisions, but the control pack must retain calculation precision and zero reconciliation variances.</p>
    <div className={styles.financialGrid}>{financialControls.map((item) => <label key={item.id}><span>{item.label}</span><input inputMode="decimal" onChange={(event) => onValue(item.id, event.target.value)} placeholder={item.display} type="number" value={values[item.id] ?? ""} /><small>Expected control: {item.display}</small></label>)}</div>
    <ContextLink href="/learn/financial-statement-integration">Phases 12–14 cost and integrated statements</ContextLink>
  </>;
}

function ApprovalLesson({ answers, onAnswer }: { answers: Record<string, string>; onAnswer: (id: string, value: string) => void }) {
  return <>
    <div className={base.lessonLead}><BarChart3 size={23} /><div><small>Make and govern the planning decision</small><strong>Use reconciled evidence to submit, challenge, condition, approve, and publish the selected scenario.</strong></div></div>
    <div className={styles.exceptionList}>{approvalCases.map((item) => <article key={item.id}><div><span>{item.id}</span><p>{item.situation}</p></div><select aria-label={`${item.id} action`} onChange={(event) => onAnswer(item.id, event.target.value)} value={answers[item.id] ?? ""}><option value="">Choose the next action</option>{approvalOptions.map((option) => <option key={option}>{option}</option>)}</select></article>)}</div>
    <div className={styles.formulaBanner}><UsersRound size={18} /><div><small>Required workflow order</small><strong>Resolve exceptions → submit → review → approve → publish</strong><span>Never publish an unapproved working or alternative scenario.</span></div></div>
    <ContextLink href="/learn/scenario-what-if-planning">Phases 17–18 workflow and scenario evidence</ContextLink>
  </>;
}

function CloseLesson({ answers, evidence, summary, onAnswer, onSummary, onToggle }: { answers: Record<string, number>; evidence: string[]; summary: string; onAnswer: (id: string, value: number) => void; onSummary: (value: string) => void; onToggle: (item: string) => void }) {
  return <>
    <div className={base.lessonLead}><ListChecks size={23} /><div><small>Final operational assignment</small><strong>Assemble one defensible monthly-cycle pack and explain what was approved, why, and what happens next.</strong></div></div>
    <h3 className={base.sectionTitle}>Capstone evidence pack</h3>
    <Checklist items={capstoneEvidenceItems} selected={evidence} onToggle={onToggle} />
    <label className={base.summaryField}>Executive cycle summary<textarea onChange={(event) => onSummary(event.target.value)} placeholder="Summarize the cycle, readiness totals, approved demand and supply decisions, financial outcome, scenario decision, reconciliations, exceptions, owners, and next-cycle actions." rows={7} value={summary} /></label>
    <small className={base.characterCount}>{summary.trim().length}/220 minimum characters</small>
    <h3 className={base.sectionTitle}>Knowledge check</h3>
    <div className={base.quizList}>{capstoneKnowledgeQuestions.map((question, index) => <fieldset key={question.id}><legend><span>{String(index + 1).padStart(2, "0")}</span>{question.question}</legend>{question.answers.map((answer, answerIndex) => <label key={`${question.id}-${answerIndex}`}><input checked={answers[question.id] === answerIndex} name={question.id} onChange={() => onAnswer(question.id, answerIndex)} type="radio" />{answer}</label>)}</fieldset>)}</div>
    <div className={styles.evidenceMap}>{implementationEvidenceMap.map((item) => <Link href={item.href} key={item.phase}><span>{item.phase}</span><strong>{item.title}</strong><small>{item.use}</small><ArrowRight size={14} /></Link>)}</div>
  </>;
}
