"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  Circle,
  Clock3,
  Compass,
  FileCheck2,
  FlaskConical,
  LockKeyhole,
  PlayCircle,
  Route,
  Trophy,
  Workflow,
} from "lucide-react";
import { useEffect, useState } from "react";
import { TESTING_UNLOCK_ALL_PHASES } from "@/config/learning-mode";
import { getModulesForTrack, implementationModules } from "@/content/course-catalog";
import { productionSalesPlanningCourse } from "@/content/production-sales-planning";
import { emptyProgress, readLearningProgress, writeSelectedTrack, writeTrackProgress } from "@/lib/learning-progress";
import type { LearningProgress } from "@/lib/learning-progress";
import type { LearningTrackId } from "@/types/course";
import styles from "./learner-dashboard.module.css";

type LearnerDashboardProps = { initialTrack?: LearningTrackId };

export function LearnerDashboard({ initialTrack }: LearnerDashboardProps) {
  const [progress, setProgress] = useState<LearningProgress>(emptyProgress);
  const [selectedTrack, setSelectedTrack] = useState<LearningTrackId>(initialTrack ?? "implementation");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = readLearningProgress();
      const track = initialTrack ?? stored.selectedTrack;
      setProgress(stored);
      setSelectedTrack(track);
      if (initialTrack && initialTrack !== stored.selectedTrack) writeSelectedTrack(initialTrack);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [initialTrack]);

  function selectTrack(trackId: LearningTrackId) {
    setSelectedTrack(trackId);
    setProgress((current) => ({ ...current, selectedTrack: trackId }));
    writeSelectedTrack(trackId);
    window.history.replaceState(null, "", `/learn?track=${trackId}`);
  }

  function prepareLesson(moduleId: string, lessonId: string) {
    const current = progress.tracks.implementation;
    writeTrackProgress("implementation", {
      ...current,
      activeLesson: lessonId,
      activeModuleId: moduleId,
      lastVisited: new Date().toISOString(),
    });
  }

  const modules = getModulesForTrack(selectedTrack);
  const completedLessons = progress.tracks[selectedTrack].completedLessons;
  const availableModules = modules.filter((module) => module.status === "available");
  const activeModule = availableModules.find((module) => !module.lessons.every((lesson) => completedLessons.includes(lesson.id))) ?? availableModules.at(-1);

  const activeCompleted = activeModule?.lessons.filter((lesson) => completedLessons.includes(lesson.id)).length ?? 0;
  const activeTotal = activeModule?.lessons.length ?? 0;
  const percent = activeTotal ? Math.round((activeCompleted / activeTotal) * 100) : 0;
  const nextLesson = activeModule?.lessons.find((lesson) => !completedLessons.includes(lesson.id));
  const completedModules = availableModules.filter((module) => module.lessons.length > 0 && module.lessons.every((lesson) => completedLessons.includes(lesson.id))).length;
  const activeIndex = activeModule ? modules.findIndex((module) => module.id === activeModule.id) : -1;
  const upcoming = activeIndex >= 0 ? modules.slice(activeIndex + 1, activeIndex + 4) : modules.slice(0, 4);
  const track = productionSalesPlanningCourse.tracks.find((item) => item.id === selectedTrack)!;

  return (
    <main className={styles.dashboard}>
      <div className={styles.breadcrumb}>Learning Lab <span>/</span> Dashboard</div>

      <section className={styles.trackChooser} aria-label="Learning path">
        <div><small>Choose your learning path</small><strong>Implementation and operational training are tracked separately.</strong></div>
        <div>
          {productionSalesPlanningCourse.tracks.map((item) => {
            const Icon = item.id === "implementation" ? Workflow : Compass;
            const availableCount = implementationModules.filter((module) => module.status === "available").length;
            return <button className={selectedTrack === item.id ? styles.trackActive : ""} key={item.id} onClick={() => selectTrack(item.id)} type="button"><Icon size={17} /><span><strong>{item.title}</strong><small>{item.id === "implementation" ? `${availableCount} interactive · ${TESTING_UNLOCK_ALL_PHASES ? "27 testable" : "sequenced"}` : "Structured next"}</small></span></button>;
          })}
        </div>
      </section>

      {TESTING_UNLOCK_ALL_PHASES && selectedTrack === "implementation" && <div className={styles.testingBanner}><FlaskConical size={18} /><div><strong>Testing mode is active</strong><span>All implemented lessons in Phases 01–09 can be opened directly, and all 27 phases are available for navigation. Phases 10–27 remain previews until their lesson content is built.</span></div></div>}

      <section className={styles.welcome}>
        <div>
          <p>{track.title}</p>
          <h1>{selectedTrack === "implementation" ? "Deliver an Oracle Planning implementation through one connected business case." : "Run the complete monthly planning cycle from actuals to an approved plan."}</h1>
          <span>{track.description} {selectedTrack === "implementation" ? "Progress is saved independently for this path in the current frontend MVP." : "This path is defined and sequenced; interactive modules will be built after the implementation learning foundation."}</span>
          {activeModule ? <Link href={`/learn/${activeModule.slug}`}>{activeCompleted > 0 ? "Continue module" : `Start Phase ${String(activeModule.phase).padStart(2, "0")}`}<ArrowRight size={17} /></Link> : <span className={styles.plannedAction}>Interactive build scheduled next</span>}
        </div>
        <div className={styles.welcomeProgress}>
          <span className={styles.progressRing} style={{ "--progress": `${percent * 3.6}deg` } as React.CSSProperties}><strong>{percent}%</strong><small>{activeModule ? "Phase progress" : "Path status"}</small></span>
          <div><small>{activeModule ? "Current phase" : "Defined scope"}</small><strong>{activeModule ? `${String(activeModule.phase).padStart(2, "0")} · ${activeModule.title}` : `${modules.length} operational modules`}</strong><p>{activeModule ? `${activeCompleted} of ${activeTotal} lessons complete` : "Content model ready for implementation"}</p></div>
        </div>
      </section>

      <section className={styles.stats} aria-label="Learning summary">
        <article><span><BookOpenCheck size={19} /></span><div><strong>{availableModules.length}</strong><small>Available modules</small></div></article>
        <article><span><CheckCircle2 size={19} /></span><div><strong>{completedLessons.length}</strong><small>Lessons completed</small></div></article>
        <article><span><Clock3 size={19} /></span><div><strong>{activeModule?.duration ?? "10 steps"}</strong><small>{activeModule ? "Current phase time" : "Monthly cycle scope"}</small></div></article>
        <article><span><Trophy size={19} /></span><div><strong>{completedModules}</strong><small>Exit gates earned</small></div></article>
      </section>

      <div className={styles.mainGrid}>
        <section className={styles.modulePanel}>
          <div className={styles.panelHeading}><div><small>{activeModule ? "Continue learning" : "Path blueprint"}</small><h2>{activeModule ? "Active module" : "Monthly planning lifecycle"}</h2></div><span>{selectedTrack === "implementation" ? "27 phases · 6 stages" : "10 connected modules"}</span></div>
          {activeModule ? (
            <>
              <article className={styles.activeModule}>
                <div className={styles.moduleNumber}>{String(activeModule.phase).padStart(2, "0")}</div>
                <div className={styles.moduleCopy}><span>{activeModule.stage}</span><h3>{activeModule.title}</h3><p>{activeModule.description}</p><div className={styles.moduleMeta}><span><Clock3 size={14} /> {activeModule.duration}</span><span><FileCheck2 size={14} /> {activeModule.lessons.length} guided lessons</span></div></div>
                <Link href={`/learn/${activeModule.slug}`}><PlayCircle size={18} /> {activeCompleted ? "Continue" : "Start"}</Link>
              </article>
              <div className={styles.lessonList}>{activeModule.lessons.map((lesson) => { const done = completedLessons.includes(lesson.id); const isNext = nextLesson?.id === lesson.id; return <Link className={isNext ? styles.nextLesson : ""} href={`/learn/${activeModule.slug}`} key={lesson.id} onClick={() => prepareLesson(activeModule.id, lesson.id)}>{done ? <CheckCircle2 size={17} /> : <Circle size={17} />}<span>{lesson.number}</span><strong>{lesson.title}</strong><small>{lesson.duration}</small>{isNext && <em>Next</em>}</Link>; })}</div>
            </>
          ) : (
            <div className={styles.cycleList}>{modules.map((module) => <article key={module.id}><span>{String(module.sequence).padStart(2, "0")}</span><div><small>{module.stage}</small><strong>{module.title}</strong><p>{module.description}</p></div><LockKeyhole size={15} /></article>)}</div>
          )}
        </section>

        <aside className={styles.sidePanel}>
          <div className={styles.panelHeading}><div><small>Learning plan</small><h2>{activeModule ? "Coming next" : "Delivery status"}</h2></div></div>
          <div className={styles.upcomingList}>{upcoming.map((module) => TESTING_UNLOCK_ALL_PHASES && selectedTrack === "implementation" ? <Link href={`/learn/${module.slug}`} key={module.id}><span>{String(module.phase ?? module.sequence).padStart(2, "0")}</span><div><strong>{module.title}</strong><small>{module.status === "available" ? module.deliverable : "Testing preview"}</small></div><ArrowRight size={15} /></Link> : <article key={module.id}><span>{String(module.phase ?? module.sequence).padStart(2, "0")}</span><div><strong>{module.title}</strong><small>{module.deliverable}</small></div><LockKeyhole size={15} /></article>)}</div>
          <div className={styles.learningRule}><Route size={21} /><div><strong>{activeModule ? "Why modules unlock in order" : "Why this path is not rushed"}</strong><p>{activeModule ? "Each phase produces evidence and decisions needed by the next phase." : "The first operational module will establish the Oracle screenshot, wizard, validation, and evidence standard before the pattern is scaled."}</p></div></div>
        </aside>
      </div>

      <section className={styles.roadmap} id={selectedTrack === "implementation" ? "roadmap" : "planning-cycle"}>
        <div className={styles.panelHeading}><div><small>Program overview</small><h2>{selectedTrack === "implementation" ? "Implementation lifecycle" : "Operational planning lifecycle"}</h2></div><span>{selectedTrack === "implementation" ? "27 phases · 6 stages" : "10 modules · 3 stages"}</span></div>
        <div className={styles.stageGrid}>
          {(selectedTrack === "implementation" ? [
            ["Discover", "2 phases", "Requirements and current state"],
            ["Design", "4 phases", "Future state and architecture"],
            ["Build", "12 phases", "Models, integrations, and UX"],
            ["Validate", "4 phases", "Testing and defect closure"],
            ["Deploy", "3 phases", "Cutover and go-live"],
            ["Operate", "2 phases", "Hypercare and improvement"],
          ] : [
            ["Prepare", "2 modules", "Actuals, data, and baseline readiness"],
            ["Plan", "6 modules", "Demand, supply, capacity, cost, and margin"],
            ["Approve", "2 modules", "Scenarios, governance, publish, and reconcile"],
          ]).map(([stage, count, description], index) => <article className={index === 0 ? styles.stageActive : ""} key={stage}><span>{String(index + 1).padStart(2, "0")}</span><strong>{stage}</strong><small>{count}</small><p>{description}</p></article>)}
        </div>
        {TESTING_UNLOCK_ALL_PHASES && selectedTrack === "implementation" && <div className={styles.phaseDirectory}><div><small>Testing directory</small><h3>All implementation phases</h3><span>Interactive training is complete through Phase 09. Later phases open as clearly labelled previews.</span></div><div>{modules.map((module) => <Link className={module.status === "available" ? styles.phaseInteractive : styles.phasePreview} href={`/learn/${module.slug}`} key={module.id}><span>{String(module.phase).padStart(2, "0")}</span><strong>{module.title}</strong><em>{module.status === "available" ? "Interactive" : "Preview"}</em></Link>)}</div></div>}
        {TESTING_UNLOCK_ALL_PHASES && selectedTrack === "implementation" && <div className={styles.lessonDirectory}><div><small>Unlocked lesson directory</small><h3>Open any implemented lesson</h3><span>Completion is not required for navigation while testing mode is active.</span></div><div>{availableModules.map((module) => <article key={module.id}><Link className={styles.lessonDirectoryHeading} href={`/learn/${module.slug}`}><span>{String(module.phase).padStart(2, "0")}</span><div><small>{module.stage}</small><strong>{module.title}</strong></div><ArrowRight size={15} /></Link><nav aria-label={`${module.title} unlocked lessons`}>{module.lessons.map((lesson) => <Link href={`/learn/${module.slug}`} key={lesson.id} onClick={() => prepareLesson(module.id, lesson.id)}><span>{lesson.number}</span><strong>{lesson.title}</strong><small>{lesson.duration}</small><PlayCircle size={14} /></Link>)}</nav></article>)}</div></div>}
      </section>
    </main>
  );
}
