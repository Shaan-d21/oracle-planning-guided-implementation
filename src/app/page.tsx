import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  Boxes,
  Check,
  ChevronRight,
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
  { label: "Demand", icon: BarChart3 },
  { label: "Sales", icon: ClipboardCheck },
  { label: "Inventory", icon: Boxes },
  { label: "Production", icon: Factory },
];

const lessonSteps = [
  "Understand the business scenario",
  "Follow the guided Oracle steps",
  "Practice with realistic data",
  "Submit evidence and validate",
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
          Frontend foundation
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
            Learn the complete production and sales planning cycle through a
            realistic business case, guided application steps, practice tasks,
            and implementation evidence.
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
            <span><Check size={14} /> Oracle screen walkthroughs</span>
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
              <small>Integrated planning cycle</small>
              <strong>Build one connected S&amp;OP plan</strong>
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
        <article><strong>{course.durationDays}</strong><span>Internship days</span></article>
        <article><strong>{course.phases.length}</strong><span>Lifecycle phases</span></article>
        <article><strong>2</strong><span>Role-based learning paths</span></article>
        <article><strong>1</strong><span>Connected business case</span></article>
      </section>

      <section className={styles.sectionShell} id="learning-tracks">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.sectionEyebrow}>Start with the right journey</p>
            <h2>Two paths. One complete planning experience.</h2>
          </div>
          <p>
            New learners first understand how the monthly planning process works.
            Technical learners can then move into solution design, build, testing,
            deployment, and support.
          </p>
        </div>

        <div className={styles.trackGrid}>
          {course.tracks.map((track, index) => {
            const Icon = index === 0 ? Compass : Workflow;
            return (
              <article className={styles.trackCard} key={track.id}>
                <div className={styles.trackTopline}>
                  <span className={styles.trackIcon}><Icon size={23} /></span>
                  <span>Path 0{index + 1}</span>
                </div>
                <p>{track.audience}</p>
                <h3>{track.title}</h3>
                <span className={styles.trackDescription}>{track.description}</span>
                <ul>
                  {index === 0 ? (
                    <>
                      <li><Check size={15} /> End-to-end monthly cycle</li>
                      <li><Check size={15} /> Guided forms and approvals</li>
                      <li><Check size={15} /> Scenario-based decisions</li>
                    </>
                  ) : (
                    <>
                      <li><Check size={15} /> Design through deployment</li>
                      <li><Check size={15} /> Integration and calculations</li>
                      <li><Check size={15} /> Testing and support evidence</li>
                    </>
                  )}
                </ul>
                <a href={index === 0 ? "/learn?track=planning-cycle" : "/learn?track=implementation"}>
                  {index === 0 ? "View path outline" : "Start implementation journey"} <ArrowRight size={17} aria-hidden="true" />
                </a>
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
                  <p>Choose FY27, Working, and your assigned product group.</p>
                </div>
              </div>
              <div className={styles.oracleMock}>
                <div className={styles.mockToolbar}>
                  <span>Sales Planning</span>
                  <span>Save&nbsp;&nbsp; | &nbsp;&nbsp;Refresh</span>
                </div>
                <div className={styles.mockFilters}>
                  {["FY27", "Working", "North America"].map((item) => <span key={item}>{item}⌄</span>)}
                </div>
                <div className={styles.mockGrid}>
                  <strong>Product</strong><strong>Jan</strong><strong>Feb</strong><strong>Mar</strong>
                  <span>Air Purifier</span><span>1,240</span><span className={styles.mockFocus}>1,310<i>2</i></span><span>1,380</span>
                  <span>Smart Fan</span><span>980</span><span>1,025</span><span>1,110</span>
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
            <h2>The full 27-phase lifecycle is preserved.</h2>
          </div>
          <p>
            The supplied concept is retained as the content source, while each
            phase will be converted into concise lessons, guided tasks,
            deliverables, and checks.
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
        <span>Oracle Planning training experience · Frontend first</span>
      </footer>
    </main>
  );
}
