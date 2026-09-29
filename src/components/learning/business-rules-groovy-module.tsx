"use client";

import {
  ArrowRight,
  BookOpenCheck,
  Braces,
  Camera,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Code2,
  Download,
  Gauge,
  GitBranch,
  ListChecks,
  PlayCircle,
  Rocket,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from "react";
import {
  businessRulesGroovyLessons,
  deploymentCases,
  groovyCases,
  groovyRulePattern,
  observabilityCases,
  ruleArtifacts,
  ruleContractCases,
  ruleExecutionSequence,
  ruleHomeworkMissions,
  ruleKnowledgeQuestions,
  ruleReadinessControls,
  ruleReconciliationControls,
  ruleScreenshots,
  ruleSelectionCases,
  rulesetCases,
  ruleWalkthroughControls,
  runtimePromptCases,
  standardRulePattern,
  type BusinessRulesGroovyLessonId,
} from "@/content/business-rules-groovy-module";
import { financialStatementLessons } from "@/content/financial-statement-integration-module";
import { readTrackProgress, writeTrackProgress } from "@/lib/learning-progress";
import design from "./application-dimension-design-module.module.css";
import base from "./discovery-module.module.css";
import sales from "./sales-planning-build-module.module.css";
import styles from "./business-rules-groovy-module.module.css";
import { LearningModuleFrame, type ModuleFeedback } from "./learning-module-frame";
import { OracleScreenshot } from "./oracle-screenshot";

type Answers = Record<string, string>;
type HomeworkId = (typeof ruleHomeworkMissions)[number]["id"];
type ScopeInputs = {
  entities: number;
  products: number;
  periods: number;
  accounts: number;
  scenarios: number;
  versions: number;
  editedCells: number;
  dependentAccounts: number;
};

const packPath = "/training/oracle-planning/phase-15/";
const defaultScope: ScopeInputs = {
  entities: 2,
  products: 4,
  periods: 12,
  accounts: 10,
  scenarios: 1,
  versions: 1,
  editedCells: 8,
  dependentAccounts: 3,
};

export function BusinessRulesGroovyModule() {
  const [activeLesson, setActiveLesson] = useState<BusinessRulesGroovyLessonId>("rule-foundations");
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<ModuleFeedback>(null);
  const [readiness, setReadiness] = useState<string[]>([]);
  const [selectionAnswers, setSelectionAnswers] = useState<Answers>({});
  const [contractAnswers, setContractAnswers] = useState<Answers>({});
  const [runtimeAnswers, setRuntimeAnswers] = useState<Answers>({});
  const [groovyAnswers, setGroovyAnswers] = useState<Answers>({});
  const [rulesetAnswers, setRulesetAnswers] = useState<Answers>({});
  const [deploymentAnswers, setDeploymentAnswers] = useState<Answers>({});
  const [observabilityAnswers, setObservabilityAnswers] = useState<Answers>({});
  const [walkthroughChecks, setWalkthroughChecks] = useState<string[]>([]);
  const [scopeInputs, setScopeInputs] = useState<ScopeInputs>(defaultScope);
  const [scopeRun, setScopeRun] = useState(false);
  const [sequence, setSequence] = useState<string[]>([]);
  const [reconciled, setReconciled] = useState<string[]>([]);
  const [activeHomework, setActiveHomework] = useState<HomeworkId>("pattern");
  const [readout, setReadout] = useState("");
  const [artifacts, setArtifacts] = useState<string[]>([]);
  const [summary, setSummary] = useState("");
  const [knowledgeAnswers, setKnowledgeAnswers] = useState<Answers>({});

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = readTrackProgress("implementation");
      setCompletedLessons(stored.completedLessons);
      const saved = businessRulesGroovyLessons.find((lesson) => lesson.id === stored.activeLesson);
      if (saved) setActiveLesson(saved.id);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const scopeResult = useMemo(() => calculateScope(scopeInputs), [scopeInputs]);
  const prerequisiteComplete = financialStatementLessons.every((lesson) => completedLessons.includes(lesson.id));
  const allCorrect = (items: readonly { id: string; correct: string }[], answers: Answers) =>
    items.every((item) => answers[item.id] === item.correct);
  const knowledgeReady = ruleKnowledgeQuestions.every((item) => knowledgeAnswers[item.id] === item.correct);
  const homeworkStatus: Record<HomeworkId, boolean> = {
    pattern: allCorrect(ruleSelectionCases, selectionAnswers) && allCorrect(ruleContractCases, contractAnswers),
    scope: scopeRun && scopeResult.valid && scopeResult.fullIntersections === 960 && scopeResult.targetedIntersections === 24,
    groovy: allCorrect(groovyCases, groovyAnswers),
    orchestration:
      allCorrect(rulesetCases, rulesetAnswers) &&
      sequence.length === ruleExecutionSequence.length &&
      reconciled.length === ruleReconciliationControls.length,
    evidence: readout.trim().length >= 240,
  };
  const preview = useMemo(
    () =>
      artifacts.length === ruleArtifacts.length && summary.trim().length >= 240
        ? `${summary.trim()} The release is limited to the approved ApexPlan calculation, validation, orchestration, and reporting scope; any metadata administration or external integration requires separate design and approval.`
        : "Complete all eight rule-engineering artifacts and provide a release-readiness summary of at least 240 characters.",
    [artifacts, summary],
  );

  function persist(nextCompleted: string[], lesson: BusinessRulesGroovyLessonId) {
    writeTrackProgress("implementation", {
      completedLessons: nextCompleted,
      activeLesson: lesson,
      activeModuleId: "implementation-business-rules-groovy",
      lastVisited: new Date().toISOString(),
    });
  }

  function goToLesson(id: BusinessRulesGroovyLessonId) {
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
    if (activeLesson === "rule-foundations") {
      if (readiness.length !== ruleReadinessControls.length) {
        return setFeedback({ tone: "error", message: "Confirm all five rule-engineering prerequisites and boundaries." });
      }
      return markComplete("Rule purpose, ownership, prerequisites, tool choice, environment, and implementation boundaries are controlled.");
    }
    if (activeLesson === "rule-design-contract") {
      if (!allCorrect(ruleSelectionCases, selectionAnswers) || !allCorrect(ruleContractCases, contractAnswers)) {
        return setFeedback({ tone: "error", message: "Resolve every implementation-pattern and rule-contract decision." });
      }
      return markComplete("The rule catalogue distinguishes calculation, Groovy, ruleset, dynamic formula, and governed data-movement needs.");
    }
    if (activeLesson === "scoped-business-rules") {
      if (!allCorrect(runtimePromptCases, runtimeAnswers) || !scopeRun || !scopeResult.valid || scopeResult.fullIntersections !== 960 || scopeResult.targetedIntersections !== 24) {
        return setFeedback({ tone: "error", message: "Run the baseline scope exercise and correct all runtime-prompt and form-context controls." });
      }
      return markComplete("Runtime prompts resolve to a validated, writable 960-intersection baseline and a 24-intersection edited-cell target.");
    }
    if (activeLesson === "groovy-patterns") {
      if (!allCorrect(groovyCases, groovyAnswers)) {
        return setFeedback({ tone: "error", message: "Correct the grid guard, edited-cell iterator, member-validation, and final-String cases." });
      }
      return markComplete("The Groovy design uses real EPM grid context, typed inputs, bounded scope, safe messages, and reviewed calculation behavior.");
    }
    if (activeLesson === "rulesets-dependencies") {
      if (!allCorrect(rulesetCases, rulesetAnswers) || sequence.length !== ruleExecutionSequence.length) {
        return setFeedback({ tone: "error", message: "Resolve all dependency cases and confirm the complete controlled execution order." });
      }
      return markComplete("The rule chain has dependency order, stop gates, restart points, idempotent writes, and downstream reconciliation.");
    }
    if (activeLesson === "validate-deploy") {
      if (!allCorrect(deploymentCases, deploymentAnswers)) {
        return setFeedback({ tone: "error", message: "Resolve validation, launch privilege, variable deployment, and release-control decisions." });
      }
      return markComplete("Reviewed artifacts are validated with representative prompts, deployed, access-tested, versioned, and recoverable.");
    }
    if (activeLesson === "test-observe") {
      if (!allCorrect(observabilityCases, observabilityAnswers) || reconciled.length !== ruleReconciliationControls.length) {
        return setFeedback({ tone: "error", message: "Correct all job and performance decisions and confirm the six reconciliation controls." });
      }
      return markComplete("Job status, business results, scope isolation, repeatability, performance, logging, and reporting movement are independently proven.");
    }
    if (activeLesson === "rule-walkthrough") {
      if (walkthroughChecks.length !== ruleWalkthroughControls.length) {
        return setFeedback({ tone: "error", message: "Confirm all five screenshot and tenant-evidence controls." });
      }
      return markComplete("The functional screenshot runbook is ready for one controlled ApexPlan tenant cycle.");
    }
    if (activeLesson === "rule-homework") {
      if (!Object.values(homeworkStatus).every(Boolean)) {
        return setFeedback({ tone: "error", message: "Complete all five applied rule-engineering missions and their required controls." });
      }
      return markComplete("Applied rule-engineering lab complete. Scope, Groovy, orchestration, reconciliation, and release evidence are ready for review.");
    }
    if (artifacts.length !== ruleArtifacts.length || summary.trim().length < 240 || !knowledgeReady) {
      return setFeedback({ tone: "error", message: "Select all eight deliverables, provide a 240-character summary, and answer all five knowledge checks correctly." });
    }
    markComplete("Phase 15 exit gate passed. Governed rules and Groovy artifacts are ready for Phase 16 forms, dashboards, and Smart View integration.");
  }

  return (
    <LearningModuleFrame
      activeLessonId={activeLesson}
      completedLessons={completedLessons}
      description="Engineer governed Calculation Manager and Groovy rules that calculate only approved ApexPlan scopes, stop on failed controls, remain repeatable, and produce traceable job evidence."
      exitGate="Approve the rule catalogue, scoped calculations, Groovy guardrails, rulesets, deployment, access, repeatability, performance, reconciliation, and operating runbook"
      exitGateIcon={<Braces size={18} />}
      feedback={feedback}
      lessons={businessRulesGroovyLessons}
      onSelectLesson={(id) => goToLesson(id as BusinessRulesGroovyLessonId)}
      onValidate={validateLesson}
      phase={15}
      prerequisite={{
        complete: prerequisiteComplete,
        message: "Complete Phase 14 so rules automate approved financial mappings, calculations, controls, and reporting movement rather than redesigning them in code.",
        href: "/learn/financial-statement-integration",
        linkLabel: "Open Phase 14",
      }}
      stage="Build · Business rules and Groovy"
      title="Business Rules & Groovy"
      validateLabel={activeLesson === "rule-exit-gate" ? "Approve rule package" : undefined}
    >
      {activeLesson === "rule-foundations" && (
        <RuleFoundations selected={readiness} onToggle={(item) => toggle(setReadiness, item)} />
      )}
      {activeLesson === "rule-design-contract" && (
        <RuleDesignContract
          contractAnswers={contractAnswers}
          onContract={(id, value) => setContractAnswers((current) => ({ ...current, [id]: value }))}
          onSelection={(id, value) => setSelectionAnswers((current) => ({ ...current, [id]: value }))}
          selectionAnswers={selectionAnswers}
        />
      )}
      {activeLesson === "scoped-business-rules" && (
        <ScopedRules
          answers={runtimeAnswers}
          inputs={scopeInputs}
          onAnswer={(id, value) => setRuntimeAnswers((current) => ({ ...current, [id]: value }))}
          onInput={setScopeInputs}
          onRun={() => setScopeRun(true)}
          ran={scopeRun}
          result={scopeResult}
        />
      )}
      {activeLesson === "groovy-patterns" && (
        <GroovyPatterns
          answers={groovyAnswers}
          onAnswer={(id, value) => setGroovyAnswers((current) => ({ ...current, [id]: value }))}
        />
      )}
      {activeLesson === "rulesets-dependencies" && (
        <RulesetDependencies
          answers={rulesetAnswers}
          onAnswer={(id, value) => setRulesetAnswers((current) => ({ ...current, [id]: value }))}
          onSequence={(item) => toggle(setSequence, item)}
          sequence={sequence}
        />
      )}
      {activeLesson === "validate-deploy" && (
        <ValidateDeploy
          answers={deploymentAnswers}
          onAnswer={(id, value) => setDeploymentAnswers((current) => ({ ...current, [id]: value }))}
        />
      )}
      {activeLesson === "test-observe" && (
        <TestObserve
          answers={observabilityAnswers}
          onAnswer={(id, value) => setObservabilityAnswers((current) => ({ ...current, [id]: value }))}
          onReconcile={(item) => toggle(setReconciled, item)}
          reconciled={reconciled}
        />
      )}
      {activeLesson === "rule-walkthrough" && (
        <RuleWalkthrough
          selected={walkthroughChecks}
          onToggle={(item) => toggle(setWalkthroughChecks, item)}
        />
      )}
      {activeLesson === "rule-homework" && (
        <RuleHomework
          active={activeHomework}
          contractAnswers={contractAnswers}
          groovyAnswers={groovyAnswers}
          inputs={scopeInputs}
          onActive={setActiveHomework}
          onContract={(id, value) => setContractAnswers((current) => ({ ...current, [id]: value }))}
          onGroovy={(id, value) => setGroovyAnswers((current) => ({ ...current, [id]: value }))}
          onInput={setScopeInputs}
          onReadout={setReadout}
          onReconcile={(item) => toggle(setReconciled, item)}
          onRun={() => setScopeRun(true)}
          onSelection={(id, value) => setSelectionAnswers((current) => ({ ...current, [id]: value }))}
          onSequence={(item) => toggle(setSequence, item)}
          onRuleset={(id, value) => setRulesetAnswers((current) => ({ ...current, [id]: value }))}
          ran={scopeRun}
          readout={readout}
          reconciled={reconciled}
          result={scopeResult}
          rulesetAnswers={rulesetAnswers}
          selectionAnswers={selectionAnswers}
          sequence={sequence}
          status={homeworkStatus}
        />
      )}
      {activeLesson === "rule-exit-gate" && (
        <RuleExitGate
          answers={knowledgeAnswers}
          onAnswer={(id, value) => setKnowledgeAnswers((current) => ({ ...current, [id]: value }))}
          onSummary={setSummary}
          onToggle={(item) => toggle(setArtifacts, item)}
          preview={preview}
          selected={artifacts}
          summary={summary}
        />
      )}
    </LearningModuleFrame>
  );
}

function RuleFoundations({ selected, onToggle }: { selected: string[]; onToggle: (item: string) => void }) {
  const choices = [
    ["Standard business rule", "Known multidimensional calculation with controlled member scope and prompts."],
    ["Groovy rule", "Grid-aware validation, edited-cell targeting, dynamic scope, EPM APIs, or controlled orchestration."],
    ["Ruleset", "Ordered related rules with governed variables, dependencies, and stop behavior."],
    ["Data map / Smart Push", "Approved movement to ApexPlan ASO; not a replacement for Plan1 calculation logic."],
  ] as const;
  return (
    <>
      <Lead
        icon={<ShieldCheck size={23} />}
        eyebrow="Automation with evidence"
        title="Translate approved planning logic into the simplest governed rule type that meets the requirement—then prove scope, correctness, access, repeatability, and recovery."
      />
      <p className={base.bodyCopy}>
        Phase 15 does not redesign the business process. It productionizes calculations and controls approved in earlier phases. Groovy is powerful, but it is not the default answer: use it only when grid context, dynamic validation, edited-cell targeting, or the EPM object model materially improves the implementation.
      </p>
      <div className={styles.patternGrid}>
        {choices.map(([title, detail]) => (
          <article key={title}><Code2 size={20} /><strong>{title}</strong><span>{detail}</span></article>
        ))}
      </div>
      <div className={design.designSequence}>
        {["Requirement", "Rule contract", "Scope", "Build", "Validate", "Deploy", "Test", "Operate"].map((item, index) => (
          <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong>{index < 7 && <ArrowRight size={13} />}</div>
        ))}
      </div>
      <h3 className={sales.sectionTitle}>Confirm readiness before rule design</h3>
      <SelectionGrid items={ruleReadinessControls} selected={selected} onToggle={onToggle} />
      <div className={sales.boundary}>
        <div><strong>Phase 15 owns</strong><span>Rule catalogue, specifications, prompts, Calculation Manager logic, Groovy, rulesets, validation, deployment, jobs, performance, evidence, and runbook.</span></div>
        <div><strong>Requires separate design</strong><span>Unapproved metadata changes, external REST integrations, broad administrative automation, production credentials, and any change to approved financial logic.</span></div>
      </div>
    </>
  );
}

function RuleDesignContract({ selectionAnswers, onSelection, contractAnswers, onContract }: {
  selectionAnswers: Answers;
  onSelection: (id: string, value: string) => void;
  contractAnswers: Answers;
  onContract: (id: string, value: string) => void;
}) {
  const downloads = [
    ["phase-15-business-rules-groovy-practice-pack.zip", "Complete practice pack"],
    ["README.md", "Instructions and evidence guide"],
    ["rule-catalogue.csv", "Rule catalogue"],
    ["rule-design-specification.csv", "Design specification"],
    ["runtime-prompt-contract.csv", "Runtime prompts"],
    ["expected-rule-results.csv", "Expected results"],
    ["rule-test-cases.csv", "Test cases"],
    ["rule-performance-baseline.csv", "Performance baseline"],
    ["rule-deployment-runbook.csv", "Deployment runbook"],
    ["rule-exception-log.csv", "Exception log"],
  ] as const;
  return (
    <>
      <Lead icon={<ListChecks size={23} />} eyebrow="Design before code" title="Create a rule catalogue and one testable contract per automation before choosing syntax or opening Calculation Manager." />
      <p className={base.bodyCopy}>A strong design explains what runs, why, where, for whom, over which members, after which prerequisites, with what result, and how a failure is contained and recovered.</p>
      <div className={sales.downloadGrid}>
        {downloads.map(([file, label]) => (
          <a download href={`${packPath}${file}`} key={file}><Download size={17} /><div><strong>{label}</strong><small>{file}</small></div></a>
        ))}
      </div>
      <h3 className={sales.sectionTitle}>Choose the smallest suitable implementation pattern</h3>
      <DecisionTable items={ruleSelectionCases} answers={selectionAnswers} onAnswer={onSelection} label="rule-pattern response" />
      <h3 className={sales.sectionTitle}>Complete the design contract</h3>
      <DecisionTable items={ruleContractCases} answers={contractAnswers} onAnswer={onContract} label="rule-contract response" />
    </>
  );
}

function ScopedRules(props: ScopeLabProps & AnswerProps) {
  return (
    <>
      <Lead icon={<Gauge size={23} />} eyebrow="Bounded calculation design" title="Resolve runtime prompts and form context into one explicit writable slice before a rule reads, clears, calculates, allocates, or moves data." />
      <div className={styles.referenceNote}>
        <ListChecks size={20} />
        <div><strong>Validation is necessary, not sufficient</strong><span>Calculation Manager validation checks rule structure and referenced objects. Test the deployed rule in Planning with the intended launch role because form context, valid intersections, security, and writable scope are runtime concerns.</span></div>
      </div>
      <CodePanel title="Illustrative standard rule design pattern" code={standardRulePattern} />
      <ScopeLab {...props} />
      <DecisionTable items={runtimePromptCases} answers={props.answers} onAnswer={props.onAnswer} label="runtime-prompt response" />
    </>
  );
}

function GroovyPatterns({ answers, onAnswer }: AnswerProps) {
  return (
    <>
      <Lead icon={<Braces size={23} />} eyebrow="Grid-aware EPM automation" title="Use the Oracle EPM Groovy object model to inspect the current operation, validate user context, target edited cells, and invoke only bounded calculations or data movement." />
      <p className={base.bodyCopy}>The pattern below is deliberately incomplete: trainees must connect it to reviewed member names, typed runtime prompts, an allow-list, expected results, error handling, and a controlled Plan1 calculation. It demonstrates real EPM entry points without pretending that copied code is production-ready.</p>
      <CodePanel title="Illustrative grid-aware Groovy pattern" code={groovyRulePattern} />
      <div className={styles.groovyFlow}>
        {["Verify operation context", "Read typed prompts", "Filter edited cells", "Validate unique members", "Execute bounded work", "Reconcile and log"].map((item, index) => (
          <div key={item}><span>{index + 1}</span><strong>{item}</strong></div>
        ))}
      </div>
      <div className={styles.warningBox}><TriangleAlert size={20} /><div><strong>Do not paste user text into generated scripts</strong><span>Resolve typed prompts or metadata members, validate them against the approved scope, quote safely, and keep an allow-list. A successful script is still wrong if it calculated an unauthorized slice.</span></div></div>
      <DecisionTable items={groovyCases} answers={answers} onAnswer={onAnswer} label="Groovy-control response" />
    </>
  );
}

function RulesetDependencies({ answers, onAnswer, sequence, onSequence }: AnswerProps & { sequence: string[]; onSequence: (item: string) => void }) {
  return (
    <>
      <Lead icon={<GitBranch size={23} />} eyebrow="Controlled dependency chain" title="Orchestrate small, restartable calculation and validation steps so a failed upstream control cannot publish downstream results." />
      <DecisionTable items={rulesetCases} answers={answers} onAnswer={onAnswer} label="ruleset response" />
      <h3 className={sales.sectionTitle}>Confirm the execution order</h3>
      <SequenceList items={ruleExecutionSequence} selected={sequence} onToggle={onSequence} />
    </>
  );
}

function ValidateDeploy({ answers, onAnswer }: AnswerProps) {
  return (
    <>
      <Lead icon={<Rocket size={23} />} eyebrow="Controlled release" title="Validate the reviewed source artifact, deploy the intended version, grant minimum launch access, and prove the planner launch path before release." />
      <div className={styles.releaseFlow}>
        {["Save reviewed source", "Validate with RTPs", "Resolve all errors", "Deploy approved version", "Grant launch access", "Smoke test as planner", "Retain rollback"].map((item, index) => (
          <article key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></article>
        ))}
      </div>
      <div className={styles.referenceNote}>
        <ShieldCheck size={20} />
        <div><strong>Separate designer validation from user authorization</strong><span>A rule can validate and deploy but still fail or overreach at launch. Prove launch privilege, data access, valid intersections, prompt resolution, form association, and protected targets with the intended role.</span></div>
      </div>
      <DecisionTable items={deploymentCases} answers={answers} onAnswer={onAnswer} label="deployment-control response" />
    </>
  );
}

function TestObserve({ answers, onAnswer, reconciled, onReconcile }: AnswerProps & { reconciled: string[]; onReconcile: (item: string) => void }) {
  return (
    <>
      <Lead icon={<Gauge size={23} />} eyebrow="Execution is not proof" title="Pair job status with expected-result, scope-isolation, negative, security, repeatability, reporting, and performance evidence." />
      <div className={styles.testMatrix}>
        {[
          ["Functional", "Expected result and calculation trace"],
          ["Negative", "Invalid prompt or missing prerequisite stops"],
          ["Security", "Unauthorized launch or write is blocked"],
          ["Repeatability", "Unchanged rerun produces no duplicate"],
          ["Performance", "Representative scope stays within threshold"],
          ["Recovery", "Restart and rollback preserve controls"],
        ].map(([title, detail]) => <article key={title}><strong>{title}</strong><span>{detail}</span></article>)}
      </div>
      <DecisionTable items={observabilityCases} answers={answers} onAnswer={onAnswer} label="test-observability response" />
      <h3 className={sales.sectionTitle}>Reconcile the complete execution</h3>
      <SelectionGrid items={ruleReconciliationControls} selected={reconciled} onToggle={onReconcile} />
    </>
  );
}

function RuleWalkthrough({ selected, onToggle }: { selected: string[]; onToggle: (item: string) => void }) {
  return (
    <>
      <Lead icon={<Camera size={23} />} eyebrow="Tenant execution runbook" title="Capture the same reviewed rule from design through prompts, launch, job, performance, rerun, and Plan1-to-ApexPlan reconciliation." />
      <p className={base.bodyCopy}>These slots are intentionally empty until the matching ApexPlan rules exist. Screenshots are required for this phase because learners must connect abstract design controls to the actual Calculation Manager and Planning launch experience.</p>
      <SelectionGrid items={ruleWalkthroughControls} selected={selected} onToggle={onToggle} />
      <ScreenshotWalkthrough />
      <div className={sales.scopeTag}>Add the reviewed screenshots only after the Phase 15 rule names, prompts, forms, ruleset, jobs, and expected results are stable.</div>
    </>
  );
}

function RuleHomework({
  active,
  onActive,
  status,
  selectionAnswers,
  onSelection,
  contractAnswers,
  onContract,
  inputs,
  onInput,
  result,
  ran,
  onRun,
  groovyAnswers,
  onGroovy,
  rulesetAnswers,
  onRuleset,
  sequence,
  onSequence,
  reconciled,
  onReconcile,
  readout,
  onReadout,
}: {
  active: HomeworkId;
  onActive: (id: HomeworkId) => void;
  status: Record<HomeworkId, boolean>;
  selectionAnswers: Answers;
  onSelection: (id: string, value: string) => void;
  contractAnswers: Answers;
  onContract: (id: string, value: string) => void;
  inputs: ScopeInputs;
  onInput: (value: ScopeInputs) => void;
  result: ReturnType<typeof calculateScope>;
  ran: boolean;
  onRun: () => void;
  groovyAnswers: Answers;
  onGroovy: (id: string, value: string) => void;
  rulesetAnswers: Answers;
  onRuleset: (id: string, value: string) => void;
  sequence: string[];
  onSequence: (item: string) => void;
  reconciled: string[];
  onReconcile: (item: string) => void;
  readout: string;
  onReadout: (value: string) => void;
}) {
  const mission = ruleHomeworkMissions.find((item) => item.id === active)!;
  const completed = Object.values(status).filter(Boolean).length;
  return (
    <>
      <Lead icon={<BookOpenCheck size={23} />} eyebrow="Applied engineering lab" title="Turn one ApexPlan calculation requirement into a reviewed, bounded, deployable, testable, and supportable rule release." />
      <div className={base.homeworkMissionGrid}>
        {ruleHomeworkMissions.map((item, index) => (
          <button className={`${active === item.id ? base.homeworkMissionActive : ""} ${status[item.id] ? base.homeworkMissionDone : ""}`} key={item.id} onClick={() => onActive(item.id)} type="button">
            <span>{status[item.id] ? <CheckCircle2 size={17} /> : String(index + 1).padStart(2, "0")}</span>
            <div><strong>{item.title}</strong><small>{item.output}</small></div>
          </button>
        ))}
      </div>
      <div className={base.homeworkProgress}><div><span style={{ width: `${completed / ruleHomeworkMissions.length * 100}%` }} /></div><strong>{completed} of {ruleHomeworkMissions.length} missions complete</strong></div>
      <section className={base.homeworkWorkspace}>
        <header><div><small>Active mission</small><strong>{mission.title}</strong></div><span>{mission.output}</span></header>
        {active === "pattern" && <><DecisionTable items={ruleSelectionCases} answers={selectionAnswers} onAnswer={onSelection} label="rule-pattern response" /><DecisionTable items={ruleContractCases} answers={contractAnswers} onAnswer={onContract} label="rule-contract response" /></>}
        {active === "scope" && <ScopeLab inputs={inputs} onInput={onInput} result={result} ran={ran} onRun={onRun} />}
        {active === "groovy" && <><CodePanel title="Grid-aware review pattern" code={groovyRulePattern} /><DecisionTable items={groovyCases} answers={groovyAnswers} onAnswer={onGroovy} label="Groovy-control response" /></>}
        {active === "orchestration" && <><DecisionTable items={rulesetCases} answers={rulesetAnswers} onAnswer={onRuleset} label="ruleset response" /><SequenceList items={ruleExecutionSequence} selected={sequence} onToggle={onSequence} /><SelectionGrid items={ruleReconciliationControls} selected={reconciled} onToggle={onReconcile} /></>}
        {active === "evidence" && <label className={sales.summaryField}>Rule release recommendation<textarea rows={12} value={readout} onChange={(event) => onReadout(event.target.value)} placeholder="Summarize the business requirement, selected rule type, cube, scope, prompts, grid context, source and target behavior, dependencies, validations, deployment, access, expected results, negative tests, repeatability, performance, jobs, reporting reconciliation, recovery, limitations, owner, reviewer, and recommendation." /><small>{readout.trim().length}/240 minimum characters</small></label>}
      </section>
    </>
  );
}

function RuleExitGate({ selected, onToggle, summary, onSummary, answers, onAnswer, preview }: {
  selected: string[];
  onToggle: (item: string) => void;
  summary: string;
  onSummary: (value: string) => void;
  answers: Answers;
  onAnswer: (id: string, value: string) => void;
  preview: string;
}) {
  return (
    <>
      <Lead icon={<ClipboardCheck size={23} />} eyebrow="Phase deliverable" title="Hand off reviewed rule artifacts that another developer can understand, deploy, test, support, and safely attach to the Phase 16 user experience." />
      <h3 className={sales.sectionTitle}>Deliverable checklist</h3>
      <SelectionGrid items={ruleArtifacts} selected={selected} onToggle={onToggle} />
      <label className={sales.summaryField}>Rule release-readiness summary<textarea rows={12} value={summary} onChange={(event) => onSummary(event.target.value)} placeholder="Summarize catalogue coverage, rule types, cubes, prompts, calculation scope, Groovy guardrails, dependencies, stop conditions, validation, deployment, launch access, form context, jobs, expected results, negative and security tests, repeatability, performance, reporting reconciliation, recovery, limitations, exceptions, owners, reviewers, and approval." /><small>{summary.trim().length}/240 minimum characters</small></label>
      <h3 className={sales.sectionTitle}>Knowledge check</h3>
      <div className={base.quizList}>
        {ruleKnowledgeQuestions.map((question, index) => (
          <fieldset key={question.id}>
            <legend><span>{index + 1}</span>{question.prompt}</legend>
            {question.options.map((option) => <label key={option}><input checked={answers[question.id] === option} name={question.id} onChange={() => onAnswer(question.id, option)} type="radio" />{option}</label>)}
          </fieldset>
        ))}
      </div>
      <div className={sales.preview}><small>Generated Phase 15 handoff</small><p>{preview}</p><div>Approved calculations and controls <ArrowRight size={13} /> Governed rule release <ArrowRight size={13} /> Forms, dashboards, and Smart View</div></div>
    </>
  );
}

function ScopeLab({ inputs, onInput, result, ran, onRun }: ScopeLabProps) {
  return (
    <section className={sales.calculator}>
      <header><div><Gauge size={18} /><strong>Calculation-scope estimator</strong></div><span>{result.valid ? "Scope inputs valid" : "Correct scope inputs"}</span></header>
      <div className={styles.scopeInputs}>
        <fieldset><legend>Baseline multidimensional slice</legend><NumberField label="Entities" value={inputs.entities} onChange={(value) => onInput({ ...inputs, entities: value })} /><NumberField label="Products" value={inputs.products} onChange={(value) => onInput({ ...inputs, products: value })} /><NumberField label="Periods" value={inputs.periods} onChange={(value) => onInput({ ...inputs, periods: value })} /><NumberField label="Accounts" value={inputs.accounts} onChange={(value) => onInput({ ...inputs, accounts: value })} /><NumberField label="Scenarios" value={inputs.scenarios} onChange={(value) => onInput({ ...inputs, scenarios: value })} /><NumberField label="Versions" value={inputs.versions} onChange={(value) => onInput({ ...inputs, versions: value })} /></fieldset>
        <fieldset><legend>Edited-cell target</legend><NumberField label="Edited cells" value={inputs.editedCells} onChange={(value) => onInput({ ...inputs, editedCells: value })} /><NumberField label="Dependent accounts per edit" value={inputs.dependentAccounts} onChange={(value) => onInput({ ...inputs, dependentAccounts: value })} /><p>Use this estimate to discuss scope, not as a substitute for real hierarchy, block, density, or job-duration testing.</p></fieldset>
      </div>
      {ran && <div className={sales.resultStrip}><Result label="Baseline intersections" value={format(result.fullIntersections)} /><Result label="Edited-cell target" value={format(result.targetedIntersections)} /><Result label="Estimated scope reduction" value={`${format(result.reductionPercent, 1)}%`} primary /></div>}
      <div className={sales.calculatorFooter}><p>Default lab target: 960 baseline intersections versus 24 edited-cell dependent intersections.</p><button onClick={onRun} type="button"><PlayCircle size={15} />Run scope estimate</button></div>
    </section>
  );
}

function ScreenshotWalkthrough() {
  return (
    <section className={sales.walkthrough}>
      <div className={sales.walkthroughHeader}><div><Camera size={20} /><div><small>Screenshot-guided procedure</small><strong>Business rules and Groovy walkthrough</strong></div></div><span>{ruleScreenshots.length} guided steps</span></div>
      <div className={sales.walkthroughGrid}>
        {ruleScreenshots.map((step, index) => (
          <article key={step.id}>
            <div className={sales.stepTitle}><span>{String(index + 1).padStart(2, "0")}</span><div><small>{step.id}</small><strong>{step.title}</strong></div></div>
            <OracleScreenshot asset={step.asset} capture={step.capture} className={sales.screenshot} phase="phase-15" title={step.title} />
            <dl><div><dt>Navigation</dt><dd>{step.path}</dd></div><div><dt>Trainee action</dt><dd>{step.action}</dd></div><div><dt>Validation evidence</dt><dd>{step.evidence}</dd></div></dl>
          </article>
        ))}
      </div>
       
    </section>
  );
}

function CodePanel({ title, code }: { title: string; code: string }) {
  return <section className={styles.codePanel}><header><Code2 size={17} /><strong>{title}</strong><span>Review pattern—not copy/paste production code</span></header><pre><code>{code}</code></pre></section>;
}

function SequenceList({ items, selected, onToggle }: { items: readonly string[]; selected: string[]; onToggle: (item: string) => void }) {
  return <div className={sales.sequence}>{items.map((item) => <button className={selected.includes(item) ? sales.confirmed : ""} key={item} onClick={() => onToggle(item)} type="button"><strong>{item}</strong><span>{selected.includes(item) ? <Check size={15} /> : "Confirm"}</span></button>)}</div>;
}

function Lead({ icon, eyebrow, title }: { icon: React.ReactNode; eyebrow: string; title: string }) {
  return <div className={base.lessonLead}>{icon}<div><small>{eyebrow}</small><strong>{title}</strong></div></div>;
}

function SelectionGrid({ items, selected, onToggle }: { items: readonly string[]; selected: string[]; onToggle: (item: string) => void }) {
  return <div className={design.selectionGrid}>{items.map((item) => <button className={selected.includes(item) ? design.selectedCard : ""} key={item} onClick={() => onToggle(item)} type="button">{selected.includes(item) ? <CheckCircle2 size={17} /> : <span />}<strong>{item}</strong></button>)}</div>;
}

function DecisionTable({ items, answers, onAnswer, label }: { items: readonly { id: string; issue: string; correct: string; options: readonly string[] }[]; answers: Answers; onAnswer: (id: string, value: string) => void; label: string }) {
  return <div className={design.mappingTable}>{items.map((item) => <div className={design.tableRow} key={item.id}><div><strong>{item.id}</strong><small>{item.issue}</small></div><select aria-label={`${item.id} ${label}`} value={answers[item.id] ?? ""} onChange={(event) => onAnswer(item.id, event.target.value)}><option value="">Select controlled response</option>{item.options.map((option) => <option key={option}>{option}</option>)}</select></div>)}</div>;
}

function NumberField({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return <label>{label}<input min="0" step="1" type="number" value={value} onChange={(event) => onChange(Number(event.target.value))} /></label>;
}

function Result({ label, value, primary = false }: { label: string; value: string; primary?: boolean }) {
  return <article className={primary ? sales.primaryResult : ""}><small>{label}</small><strong>{value}</strong></article>;
}

function calculateScope(input: ScopeInputs) {
  const valid = Object.values(input).every((value) => Number.isFinite(value) && value >= 0);
  const fullIntersections = valid ? input.entities * input.products * input.periods * input.accounts * input.scenarios * input.versions : 0;
  const targetedIntersections = valid ? input.editedCells * input.dependentAccounts : 0;
  const reductionPercent = fullIntersections > 0 ? Math.max(0, (1 - targetedIntersections / fullIntersections) * 100) : 0;
  return { valid, fullIntersections, targetedIntersections, reductionPercent };
}

function format(value: number, digits = 0) {
  return value.toLocaleString(undefined, { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

type AnswerProps = { answers: Answers; onAnswer: (id: string, value: string) => void };
type ScopeLabProps = { inputs: ScopeInputs; onInput: (value: ScopeInputs) => void; result: ReturnType<typeof calculateScope>; ran: boolean; onRun: () => void };
