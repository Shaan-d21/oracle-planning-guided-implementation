import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  Boxes,
  Check,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  Compass,
  Factory,
  GraduationCap,
  Play,
  Route,
  Sparkles,
  Workflow,
} from "lucide-react";
import { productionSalesPlanningCourse as course } from "@/content/production-sales-planning";
import styles from "./page.module.css";

const stageLabels = {
  discover: "Discover",
  design: "Design",
  build: "Build",
  validate: "Validate",
  deploy: "Deploy",
  operate: "Operate",
} as const;

const journeySteps = [
  { label: "Sales", icon: ClipboardCheck },
  { label: "Production", icon: Factory },
  { label: "Inventory", icon: Boxes },
  { label: "Finance", icon: CircleDollarSign },
];

const lessonSteps = [
  "Understand the business scenario",
  "Follow the guided Oracle steps",
  "Practice with realistic data",
  "Record evidence and validate",
];

export default function Home() {
  return (
    <main>
      <header className={styles.siteHeader}>
        <a className={styles.brand} href="#top" aria-label="BISP learning lab home">
          <span className={styles.logoCrop}>
            <Image
              src="/brand/bisp-logo.png"
              alt="BISP"
              width={212}
              height={106}
              priority
            />
          </span>
          <span className={styles.brandDivider} aria-hidden="true" />
          <span className={styles.brandName}>
            <strong>Learning Lab</strong>
            <small>Production &amp; Sales Planning</small>
          </span>
        </a>

        <nav className={styles.nav} aria-label="Primary navigation">
          <a href="#learning-tracks">Learning paths</a>
          <a href="#experience">Experience</a>
          <a href="#roadmap">Roadmap</a>
        </nav>

        <div className={styles.headerStatus}>
          <span aria-hidden="true" />
          90-day guided program
        </div>
      </header>

      <section className={styles.hero} id="top">
        <div className={styles.heroMotif} aria-hidden="true">
          <span />
          <span />
        </div>

        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>
            <Sparkles size={15} aria-hidden="true" />
            Oracle Planning · Hands-on learning
          </p>
          <h1>
            From planning concepts to
            <span>confident execution.</span>
          </h1>
          <p className={styles.heroDescription}>
            Deliver an Oracle Planning implementation through a realistic
            production and sales planning case, guided application steps,
            practice tasks, implementation evidence, and a connected monthly-cycle capstone.
          </p>
          <div className={styles.heroActions}>
            <Link className={styles.primaryAction} href="/learn?track=implementation">
              Enter learning lab
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a className={styles.secondaryAction} href="#experience">
              <Play size={17} aria-hidden="true" />
              Preview the experience
            </a>
          </div>
          <div className={styles.heroProof}>
            <span><Check size={14} /> Guided workflows</span>
            <span><Check size={14} /> Guided Oracle task walkthroughs</span>
            <span><Check size={14} /> Practice and assessment</span>
          </div>
        </div>

        <aside className={styles.journeyCard} aria-label="Integrated planning journey">
          <div className={styles.journeyTopbar}>
            <div>
              <small>Case study</small>
              <strong>{course.company}</strong>
            </div>
            <span>90-day journey</span>
          </div>

          <div className={styles.journeyHeading}>
            <Route size={22} aria-hidden="true" />
            <div>
              <small>Connected planning solution</small>
              <strong>Build one operational and financial plan</strong>
            </div>
          </div>

          <div className={styles.journeyFlow}>
            {journeySteps.map(({ label, icon: Icon }, index) => (
              <div className={styles.journeyStep} key={label}>
                <span className={styles.journeyIcon}><Icon size={18} /></span>
                <div>
                  <small>Step {index + 1}</small>
                  <strong>{label}</strong>
                </div>
                {index < journeySteps.length - 1 && (
                  <ChevronRight className={styles.stepArrow} size={16} aria-hidden="true" />
                )}
              </div>
            ))}
          </div>

          <div className={styles.journeyOutcome}>
            <span className={styles.outcomeIcon}><Check size={16} /></span>
            <div>
              <small>Business outcome</small>
              <strong>Approved, capacity-feasible, financially aligned plan</strong>
            </div>
          </div>
        </aside>
      </section>

      <section className={styles.metrics} aria-label="Course summary">
        <article><strong>{course.durationDays}</strong><span>Workshop days</span></article>
        <article><strong>{course.phases.length}</strong><span>Interactive phases</span></article>
        <article><strong>1</strong><span>Operational capstone</span></article>
        <article><strong>1</strong><span>Connected business case</span></article>
      </section>

      <section className={styles.sectionShell} id="learning-tracks">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.sectionEyebrow}>One connected learning journey</p>
            <h2>Implement first. Then operate what you built.</h2>
          </div>
          <p>
            The 90-day workshop has one core implementation journey. Learners build
            the solution through 27 phases, practise monthly-cycle activities at the
            relevant points, and finish with one end-to-end operational capstone.
          </p>
        </div>

        <div className={styles.trackGrid}>
          {course.tracks.map((track) => {
            const isImplementation = track.id === "implementation";
            const Icon = isImplementation ? Workflow : Compass;
            return (
              <article className={styles.trackCard} data-status={isImplementation ? "available" : "included"} key={track.id}>
                <div className={styles.trackTopline}>
                  <span className={styles.trackIcon}><Icon size={23} /></span>
                  <span>{isImplementation ? "Core journey" : "Final capstone"} · {isImplementation ? "27 phases" : "7 lessons"}</span>
                </div>
                <p>{track.audience}</p>
                <h3>{track.title}</h3>
                <span className={styles.trackDescription}>{track.description}</span>
                <ul>
                  {isImplementation ? (
                    <>
                      <li><Check size={15} /> Discovery through BAU support</li>
                      <li><Check size={15} /> Guided configuration and hands-on practice</li>
                      <li><Check size={15} /> Deliverables, evidence, and exit gates</li>
                    </>
                  ) : (
                    <>
                      <li><Check size={15} /> Actuals through approved plan</li>
                      <li><Check size={15} /> Demand, supply, finance, and workflow</li>
                      <li><Check size={15} /> Publish, reconcile, and close</li>
                    </>
                  )}
                </ul>
                <Link href={isImplementation ? "/learn?track=implementation" : "/learn/monthly-planning-capstone"}>
                  {isImplementation ? "Start implementation journey" : "Open monthly capstone"} <ArrowRight size={17} aria-hidden="true" />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.experienceSection} id="experience">
        <div className={styles.experienceIntro}>
          <p className={styles.sectionEyebrow}>Designed for learning by doing</p>
          <h2>Every lesson follows a repeatable guided workflow.</h2>
          <p>
            Concepts, Oracle application actions, decisions, and evidence stay in
            one focused workspace so the learner always knows what to do next.
          </p>
          <ol className={styles.lessonSteps}>
            {lessonSteps.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{step}</strong>
                  <small>{index === 1 ? "Screenshots, hotspots, and exact field guidance" : "Clear purpose, action, and expected outcome"}</small>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.workspacePreview} aria-label="Example guided lesson workspace">
          <div className={styles.previewTopbar}>
            <span><i /><i /><i /></span>
            <small>Oracle Planning · Guided practice</small>
            <span className={styles.previewProgress}>Step 2 of 4</span>
          </div>
          <div className={styles.previewBody}>
            <aside className={styles.previewRail}>
              <span className={styles.railBrand}><GraduationCap size={18} /></span>
              {[BookOpenCheck, BarChart3, Factory, ClipboardCheck].map((Icon, index) => (
                <span className={index === 1 ? styles.railActive : ""} key={Icon.displayName}>
                  <Icon size={17} />
                </span>
              ))}
            </aside>
            <div className={styles.previewContent}>
              <div className={styles.previewBreadcrumb}>Sales Planning / Baseline Forecast</div>
              <div className={styles.previewTitleRow}>
                <div>
                  <small>Guided task 04</small>
                  <strong>Review and adjust the sales forecast</strong>
                </div>
                <span>In progress</span>
              </div>
              <div className={styles.instructionCard}>
                <span>2</span>
                <div>
                  <small>Next action</small>
                  <strong>Open the Working Forecast form</strong>
                  <p>Choose Forecast, Working, FY27, and your assigned planning scope.</p>
                </div>
              </div>
              <div className={styles.oracleMock}>
                <div className={styles.mockToolbar}>
                  <span>Sales Planning</span>
                  <span>Save&nbsp;&nbsp; | &nbsp;&nbsp;Refresh</span>
                </div>
                <div className={styles.mockFilters}>
                  {["FY27", "Forecast", "Working"].map((item) => <span key={item}>{item}⌄</span>)}
                </div>
                <div className={styles.mockGrid}>
                  <strong>Product</strong><strong>Jan</strong><strong>Feb</strong><strong>Mar</strong>
                  <span>Mixer Grinder</span><span>1,240</span><span className={styles.mockFocus}>1,310<i>2</i></span><span>1,380</span>
                  <span>Electric Kettle</span><span>980</span><span>1,025</span><span>1,110</span>
                </div>
              </div>
              <div className={styles.previewFooter}>
                <span>Expected result: forecast updated and saved</span>
                <button type="button">Mark step complete <ArrowRight size={15} /></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.sectionShell} ${styles.lifecycleSection}`} id="roadmap">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.sectionEyebrow}>Implementation roadmap</p>
            <h2>The complete 27-phase implementation lifecycle is available.</h2>
          </div>
          <p>
            Each phase combines concise lessons, guided tasks, practical
            deliverables, evidence, and an exit check before the next stage.
          </p>
        </div>

        <ol className={styles.phaseGrid}>
          {course.phases.map((phase) => (
            <li key={phase.id} data-stage={phase.stage}>
              <span>{String(phase.id).padStart(2, "0")}</span>
              <div>
                <small>{stageLabels[phase.stage]}</small>
                <strong>{phase.title}</strong>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.nextStep}>
        <div>
          <span><GraduationCap size={24} /></span>
          <div>
            <small>Learning experience available</small>
            <h2>Enter the dashboard and complete the first guided module.</h2>
          </div>
        </div>
        <Link href="/learn?track=implementation">Open learning lab <ArrowRight size={17} /></Link>
      </section>

      <footer className={styles.siteFooter}>
        <span>BISP Learning Lab · {course.company} simulated case</span>
        <span>Oracle Planning training experience · 90-day guided workshop</span>
      </footer>
    </main>
  );
}
