"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock3,
  Compass,
  FileCheck2,
  LockKeyhole,
  PlayCircle,
  Route,
  Trophy,
  Workflow,
} from "lucide-react";
import { useEffect, useState } from "react";
import { TESTING_UNLOCK_ALL_PHASES } from "@/config/learning-mode";
import { getModulesForTrack } from "@/content/course-catalog";
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
      const queryTrack = new URLSearchParams(window.location.search).get("track");
      const requestedTrack = queryTrack === "planning-cycle" || queryTrack === "implementation" ? queryTrack : undefined;
      const track = initialTrack ?? requestedTrack ?? stored.selectedTrack;
      setProgress(stored);
      setSelectedTrack(track);
      if (track !== stored.selectedTrack) writeSelectedTrack(track);
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
    const current = progress.tracks[selectedTrack];
    writeTrackProgress(selectedTrack, {
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
        <div><small>Choose your learning workspace</small><strong>Complete the implementation journey, then prove it through the monthly capstone.</strong></div>
        <div>
          {productionSalesPlanningCourse.tracks.map((item) => {
            const Icon = item.id === "implementation" ? Workflow : Compass;
            const availableCount = getModulesForTrack(item.id).filter((module) => module.status === "available").length;
            return <button className={selectedTrack === item.id ? styles.trackActive : ""} key={item.id} onClick={() => selectTrack(item.id)} type="button"><Icon size={17} /><span><strong>{item.title}</strong><small>{item.id === "implementation" ? `${availableCount} interactive phases` : "1 capstone · 7 lessons"}</small></span></button>;
          })}
        </div>
      </section>

      <section className={styles.welcome}>
        <div>
          <p>{track.title}</p>
          <h1>{selectedTrack === "implementation" ? "Deliver an Oracle Planning implementation through one connected business case." : "Operate the completed solution through one end-to-end monthly cycle."}</h1>
          <span>{track.description} {selectedTrack === "implementation" ? "Your lesson progress and completed exit gates are tracked throughout the journey." : "Reuse your implementation evidence to make, approve, publish, and reconcile one complete Apex planning decision."}</span>
          {activeModule ? <Link href={`/learn/${activeModule.slug}`}>{activeCompleted > 0 ? selectedTrack === "implementation" ? "Continue module" : "Continue capstone" : selectedTrack === "implementation" ? `Start Phase ${String(activeModule.phase).padStart(2, "0")}` : "Start monthly capstone"}<ArrowRight size={17} /></Link> : <span className={styles.plannedAction}>Curriculum outline</span>}
        </div>
        <div className={styles.welcomeProgress}>
          <span className={styles.progressRing} style={{ "--progress": `${percent * 3.6}deg` } as React.CSSProperties}><strong>{percent}%</strong><small>{activeModule ? selectedTrack === "implementation" ? "Phase progress" : "Module progress" : "Path status"}</small></span>
          <div><small>{activeModule ? selectedTrack === "implementation" ? "Current phase" : "Operational capstone" : "Defined scope"}</small><strong>{activeModule ? `${String(activeModule.phase ?? activeModule.sequence).padStart(2, "0")} · ${activeModule.title}` : `${modules.length} operational module`}</strong><p>{activeModule ? `${activeCompleted} of ${activeTotal} lessons complete` : "End-to-end monthly planning practice"}</p></div>
        </div>
      </section>

      <section className={styles.stats} aria-label="Learning summary">
        <article><span><BookOpenCheck size={19} /></span><div><strong>{availableModules.length}</strong><small>Available modules</small></div></article>
        <article><span><CheckCircle2 size={19} /></span><div><strong>{completedLessons.length}</strong><small>Lessons completed</small></div></article>
        <article><span><Clock3 size={19} /></span><div><strong>{activeModule?.duration ?? "10 steps"}</strong><small>{activeModule ? selectedTrack === "implementation" ? "Current phase time" : "Current module time" : "Monthly cycle scope"}</small></div></article>
        <article><span><Trophy size={19} /></span><div><strong>{completedModules}</strong><small>Exit gates earned</small></div></article>
      </section>

      <Link className={styles.programPlanCard} href="/learn/program-plan"><span><CalendarDays size={22} /></span><div><small>Combined 90-day workshop calendar</small><strong>See how implementation practice builds toward the final monthly capstone.</strong><p>Connect all 27 implementation phases, seven capstone outcomes, nine assessed submissions, milestones, and the Day 90 defense.</p></div><ArrowRight size={18} /></Link>

      <div className={styles.mainGrid}>
        <section className={styles.modulePanel}>
          <div className={styles.panelHeading}><div><small>{activeModule ? "Continue learning" : "Path blueprint"}</small><h2>{activeModule ? selectedTrack === "implementation" ? "Active module" : "Active capstone" : "Monthly planning lifecycle"}</h2></div><span>{selectedTrack === "implementation" ? "27 phases · 6 stages" : "1 capstone · 7 lessons"}</span></div>
          {activeModule ? (
            <>
              <article className={styles.activeModule}>
                <div className={styles.moduleNumber}>{String(activeModule.phase ?? activeModule.sequence).padStart(2, "0")}</div>
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
          <div className={styles.panelHeading}><div><small>Learning plan</small><h2>{selectedTrack === "implementation" ? activeModule ? "Coming next" : "Planning sequence" : "Capstone outcomes"}</h2></div></div>
          <div className={styles.upcomingList}>{selectedTrack === "planning-cycle" ? [
            ["01", "Prepare", "Reconciled actuals and an explainable demand baseline"],
            ["02", "Plan", "Approved demand, feasible supply, and financial impact"],
            ["03", "Approve", "Authorized scenario, publication, reconciliation, and close"],
          ].map(([number, title, copy]) => <article key={number}><span>{number}</span><div><strong>{title}</strong><small>{copy}</small></div><CheckCircle2 size={15} /></article>) : upcoming.map((module) => TESTING_UNLOCK_ALL_PHASES ? <Link href={`/learn/${module.slug}`} key={module.id}><span>{String(module.phase ?? module.sequence).padStart(2, "0")}</span><div><strong>{module.title}</strong><small>{module.deliverable}</small></div><ArrowRight size={15} /></Link> : <article key={module.id}><span>{String(module.phase ?? module.sequence).padStart(2, "0")}</span><div><strong>{module.title}</strong><small>{module.deliverable}</small></div><LockKeyhole size={15} /></article>)}</div>
          <div className={styles.learningRule}><Route size={21} /><div><strong>{activeModule ? "Why the sequence matters" : "How to use this outline"}</strong><p>{activeModule ? selectedTrack === "implementation" ? "Each phase produces evidence and decisions needed by the next phase." : "Each capstone lesson consumes a controlled output from implementation and produces evidence for the next monthly decision." : "Follow the lessons in order to understand how actuals, demand, supply, cost, approval, publication, and reconciliation form one controlled cycle."}</p></div></div>
        </aside>
      </div>

      <section className={styles.roadmap} id={selectedTrack === "implementation" ? "roadmap" : "planning-cycle"}>
        <div className={styles.panelHeading}><div><small>Program overview</small><h2>{selectedTrack === "implementation" ? "Implementation lifecycle" : "Operational capstone flow"}</h2></div><span>{selectedTrack === "implementation" ? "27 phases · 6 stages" : "7 lessons · 3 stages"}</span></div>
        <div className={styles.stageGrid}>
          {(selectedTrack === "implementation" ? [
            ["Discover", "2 phases", "Requirements and current state"],
            ["Design", "4 phases", "Future state and architecture"],
            ["Build", "12 phases", "Models, integrations, and UX"],
            ["Validate", "4 phases", "Testing and defect closure"],
            ["Deploy", "3 phases", "Cutover and go-live"],
            ["Operate", "2 phases", "Hypercare and improvement"],
          ] : [
            ["Prepare", "Lessons 1–2", "Actuals, data, and baseline readiness"],
            ["Plan", "Lessons 3–5", "Consensus demand, feasible supply, cost, and finance"],
            ["Approve", "Lessons 6–7", "Scenario decision, publish, reconcile, and close"],
          ]).map(([stage, count, description], index) => <article className={index === 0 ? styles.stageActive : ""} key={stage}><span>{String(index + 1).padStart(2, "0")}</span><strong>{stage}</strong><small>{count}</small><p>{description}</p></article>)}
        </div>
        {TESTING_UNLOCK_ALL_PHASES && selectedTrack === "implementation" && <div className={styles.phaseDirectory}><div><small>Program directory</small><h3>All implementation phases</h3><span>Open any phase to review its lessons, applied work, evidence, and exit gate.</span></div><div>{modules.map((module) => <Link className={module.status === "available" ? styles.phaseInteractive : styles.phasePreview} href={`/learn/${module.slug}`} key={module.id}><span>{String(module.phase).padStart(2, "0")}</span><strong>{module.title}</strong><em>{module.status === "available" ? "Available" : "Outline"}</em></Link>)}</div></div>}
        {TESTING_UNLOCK_ALL_PHASES && selectedTrack === "implementation" && <div className={styles.lessonDirectory}><div><small>Lesson directory</small><h3>Open any guided lesson</h3><span>Use the 90-day plan for the recommended order, or open a lesson directly when you need to revisit a topic.</span></div><div>{availableModules.map((module) => <article key={module.id}><Link className={styles.lessonDirectoryHeading} href={`/learn/${module.slug}`}><span>{String(module.phase).padStart(2, "0")}</span><div><small>{module.stage}</small><strong>{module.title}</strong></div><ArrowRight size={15} /></Link><nav aria-label={`${module.title} lessons`}>{module.lessons.map((lesson) => <Link href={`/learn/${module.slug}`} key={lesson.id} onClick={() => prepareLesson(module.id, lesson.id)}><span>{lesson.number}</span><strong>{lesson.title}</strong><small>{lesson.duration}</small><PlayCircle size={14} /></Link>)}</nav></article>)}</div></div>}
      </section>
    </main>
  );
}
