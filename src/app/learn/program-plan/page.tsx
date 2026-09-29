import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileCheck2,
  Flag,
  Milestone,
  Presentation,
  RefreshCw,
  Route,
} from "lucide-react";
import {
  milestoneChecks,
  monthlyCycleCoverage,
  programAssignments,
  programStages,
} from "@/content/implementation-program-plan";
import styles from "./program-plan.module.css";

export const metadata: Metadata = {
  title: "90-Day Program Plan",
  description: "Calendar, monthly-cycle coverage, assignments, milestones, and completion standards for the complete Oracle Planning workshop.",
};

const stageTone: Record<string, string> = {
  discover: styles.discover,
  design: styles.design,
  build: styles.build,
  validate: styles.validate,
  deploy: styles.deploy,
  operate: styles.operate,
};

export default function ProgramPlanPage() {
  return (
    <main className={styles.page}>
      <div className={styles.breadcrumb}>
        <Link href="/learn?track=implementation">Learning Lab</Link>
        <span>/</span>
        90-Day Program Plan
      </div>

      <section className={styles.hero}>
        <div>
          <p><CalendarDays size={16} /> Implementation and monthly planning workshop</p>
          <h1>Build the solution and run its monthly planning cycle in 90 structured days.</h1>
          <span>
            Follow the Apex case from discovery through BAU while progressively rehearsing the operational cycle.
            Day 90 brings implementation and operating capability together in one evidence-backed planning capstone.
          </span>
          <div className={styles.heroActions}>
            <a href="#calendar">View calendar <ArrowRight size={16} /></a>
            <a href="#monthly-cycle">See monthly-cycle coverage</a>
            <a href="#assignments">Review assignments</a>
          </div>
        </div>
        <aside>
          <div><strong>90</strong><span>program days</span></div>
          <div><strong>27</strong><span>implementation phases</span></div>
          <div><strong>7</strong><span>capstone lessons</span></div>
          <div><strong>9</strong><span>assessed submissions</span></div>
        </aside>
      </section>

      <section className={styles.rhythm} aria-labelledby="rhythm-title">
        <div className={styles.sectionHeading}>
          <div><small>How to work</small><h2 id="rhythm-title">Use the same evidence-led rhythm throughout the program.</h2></div>
          <p>The calendar defines learning order, not fixed daily classroom hours. A facilitator may adjust contact time while preserving dependencies and gate criteria.</p>
        </div>
        <div className={styles.rhythmGrid}>
          {[
            ["01", "Learn", "Understand the business decision, control, and Oracle capability."],
            ["02", "Apply", "Complete the guided task using the Apex case and agreed design."],
            ["03", "Validate", "Check calculations, access, workflow, reconciliations, and exceptions."],
            ["04", "Evidence", "Save the artifact, result, reviewer, decision, and open actions."],
            ["05", "Reflect", "Explain what changed, why it is correct, and what the next phase needs."],
          ].map(([number, title, copy]) => <article key={number}><span>{number}</span><strong>{title}</strong><p>{copy}</p></article>)}
        </div>
      </section>

      <section className={styles.cycleSection} id="monthly-cycle" aria-labelledby="monthly-cycle-title">
        <div className={styles.sectionHeading}>
          <div><small>Operational learning path</small><h2 id="monthly-cycle-title">The monthly planning cycle is built and practised inside the same 90 days.</h2></div>
          <p>These are not seven extra modules after implementation. Each capstone outcome is rehearsed inside the relevant implementation phase, then executed as one connected Day 90 operating cycle.</p>
        </div>
        <div className={styles.cycleGrid}>
          {monthlyCycleCoverage.map((step, index) => (
            <article key={step.id}>
              <header><span>{String(index + 1).padStart(2, "0")}</span><div><small>{step.id} · {step.days}</small><h3>{step.title}</h3></div></header>
              <p>{step.practice}</p>
              <div><strong>{step.phases}</strong><span><FileCheck2 size={13} /> {step.evidence}</span></div>
            </article>
          ))}
        </div>
        <div className={styles.cycleCapstone}><RefreshCw size={20} /><div><small>Day 90 operational capstone</small><strong>Actuals and readiness → demand baseline → sales consensus → inventory, production, and capacity → cost and finance → scenario approval → publish, reconcile, and close.</strong></div></div>
      </section>

      <section className={styles.calendar} id="calendar" aria-labelledby="calendar-title">
        <div className={styles.sectionHeading}>
          <div><small>Program calendar</small><h2 id="calendar-title">Days 1–90: learning, practice, and evidence.</h2></div>
          <p>Open the corresponding phase from the dashboard for detailed lessons, walkthroughs, exercises, knowledge checks, deliverables, and exit validation.</p>
        </div>

        <nav className={styles.stageNav} aria-label="Program stages">
          {programStages.map((stage) => <a className={stageTone[stage.id]} href={`#stage-${stage.id}`} key={stage.id}><span>{stage.days}</span><strong>{stage.title}</strong></a>)}
        </nav>

        <div className={styles.stageList}>
          {programStages.map((stage, stageIndex) => (
            <article className={`${styles.stage} ${stageTone[stage.id]}`} id={`stage-${stage.id}`} key={stage.id}>
              <header>
                <div className={styles.stageNumber}>{String(stageIndex + 1).padStart(2, "0")}</div>
                <div><small>{stage.days}</small><h3>{stage.title}</h3><p>{stage.objective}</p></div>
              </header>
              <div className={styles.periodTable}>
                <div className={styles.tableHead}><span>Days and focus</span><span>Learning activity</span><span>Assignment and evidence</span></div>
                {stage.periods.map((period) => (
                  <div className={styles.periodRow} key={`${stage.id}-${period.days}`}>
                    <div><span>{period.days}</span><strong>{period.title}</strong><small>{period.phases}</small></div>
                    <p>{period.focus}</p>
                    <div><strong>{period.assignment}</strong><small><FileCheck2 size={13} /> {period.evidence}</small></div>
                  </div>
                ))}
              </div>
              <footer><Milestone size={20} /><div><small>Stage milestone</small><strong>{stage.milestone}</strong></div></footer>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.assignments} id="assignments" aria-labelledby="assignments-title">
        <div className={styles.sectionHeading}>
          <div><small>Assessed work</small><h2 id="assignments-title">Nine submissions prove practical capability.</h2></div>
          <p>Assignments combine the lesson artifacts into reviewable implementation packages. A checked box alone is not completion; the submitted evidence must meet the stated acceptance test.</p>
        </div>
        <div className={styles.assignmentGrid}>
          {programAssignments.map((assignment) => (
            <article key={assignment.id}>
              <header><span>{assignment.id}</span><div><small>{assignment.due} · {assignment.scope}</small><h3>{assignment.title}</h3></div></header>
              <div><ClipboardCheck size={17} /><p><strong>Submit</strong>{assignment.submission}</p></div>
              <div><CheckCircle2 size={17} /><p><strong>Accepted when</strong>{assignment.acceptance}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.gates} aria-labelledby="gates-title">
        <div>
          <small>Milestone standard</small>
          <h2 id="gates-title">A stage closes only when its evidence can support the next stage.</h2>
          <p>Use these checks at the end of Discover, Design, Build, Validate, Deploy, and Operate. If a check fails, record and own the gap before proceeding.</p>
          <ul>{milestoneChecks.map((check) => <li key={check}><CheckCircle2 size={16} />{check}</li>)}</ul>
        </div>
        <aside>
          <Flag size={24} />
          <small>Day 90 completion decision</small>
          <strong>Monthly-cycle capstone + implementation defense + BAU handover</strong>
          <p>The final review evaluates the complete operational cycle, implementation evidence, controls, reconciliations, ownership, measurable value, and improvement roadmap.</p>
          <span><Presentation size={15} /> Executive presentation</span>
          <span><Route size={15} /> Evidence repository</span>
          <span><Clock3 size={15} /> 90-day learning record</span>
        </aside>
      </section>

      <section className={styles.nextStep}>
        <div><small>Ready to begin?</small><strong>Start with Discovery and build the first item in your evidence portfolio.</strong></div>
        <Link href="/learn/discovery">Open Phase 01 <ArrowRight size={16} /></Link>
      </section>
    </main>
  );
}
