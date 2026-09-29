"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Circle, Info } from "lucide-react";
import type { ReactNode } from "react";
import { TESTING_UNLOCK_ALL_PHASES } from "@/config/learning-mode";
import type { LessonDefinition } from "@/types/course";
import styles from "./discovery-module.module.css";

export type ModuleFeedback = {
  tone: "success" | "error" | "info";
  message: string;
} | null;

type LearningModuleFrameProps = {
  phase: number;
  unitLabel?: string;
  dashboardHref?: string;
  stage: string;
  title: string;
  description: string;
  lessons: readonly Pick<LessonDefinition, "id" | "number" | "title" | "duration">[];
  activeLessonId: string;
  completedLessons: string[];
  exitGate: string;
  exitGateIcon: ReactNode;
  feedback: ModuleFeedback;
  prerequisite?: { complete: boolean; message: string; href: string; linkLabel: string };
  validateLabel?: string;
  onSelectLesson: (id: string) => void;
  onValidate: () => void;
  children: ReactNode;
};

export function LearningModuleFrame({
  phase,
  unitLabel = "Phase",
  dashboardHref = "/learn?track=implementation",
  stage,
  title,
  description,
  lessons,
  activeLessonId,
  completedLessons,
  exitGate,
  exitGateIcon,
  feedback,
  prerequisite,
  validateLabel = "Validate and complete",
  onSelectLesson,
  onValidate,
  children,
}: LearningModuleFrameProps) {
  const activeIndex = lessons.findIndex((lesson) => lesson.id === activeLessonId);
  const active = lessons[activeIndex] ?? lessons[0];
  const completedCount = lessons.filter((lesson) => completedLessons.includes(lesson.id)).length;
  const percent = lessons.length ? Math.round((completedCount / lessons.length) * 100) : 0;
  const phaseLabel = String(phase).padStart(2, "0");

  function move(direction: -1 | 1) {
    const next = lessons[activeIndex + direction];
    if (next) onSelectLesson(next.id);
  }

  return (
    <main className={styles.modulePage}>
      <div className={styles.breadcrumb}>
        <Link href={dashboardHref}>Dashboard</Link><span>/</span>{unitLabel} {phaseLabel}<span>/</span>{active.title}
      </div>

      <section className={styles.moduleHeader}>
        <div className={styles.phaseNumber}>{phaseLabel}</div>
        <div><p>{stage}</p><h1>{title}</h1><span>{description}</span></div>
        <div className={styles.moduleProgress}>
          <div><span style={{ width: `${percent}%` }} /></div>
          <strong>{percent}% complete</strong>
          <small>{completedCount} of {lessons.length} lessons</small>
        </div>
      </section>

      {prerequisite && !prerequisite.complete && TESTING_UNLOCK_ALL_PHASES && (
        <div className={`${styles.prerequisiteNotice} ${styles.testingNotice}`}>
          <Info size={18} />
          <div><strong>Earlier phase recommended</strong><span>{prerequisite.message} You may review this phase now, but complete the earlier work before submitting this phase&apos;s exit gate.</span></div>
          <Link href={prerequisite.href}>{prerequisite.linkLabel}</Link>
        </div>
      )}

      {prerequisite && !prerequisite.complete && !TESTING_UNLOCK_ALL_PHASES && (
        <div className={styles.prerequisiteNotice}>
          <Info size={18} />
          <div><strong>Prerequisite not complete</strong><span>{prerequisite.message}</span></div>
          <Link href={prerequisite.href}>{prerequisite.linkLabel}</Link>
        </div>
      )}

      <div className={styles.learningLayout}>
        <aside className={styles.lessonNavigation}>
          <div><small>Module contents</small><strong>{lessons.length} guided lessons</strong></div>
          <nav aria-label={`${title} lessons`}>
            {lessons.map((lesson) => {
              const done = completedLessons.includes(lesson.id);
              return (
                <button
                  className={lesson.id === activeLessonId ? styles.activeLesson : ""}
                  key={lesson.id}
                  onClick={() => onSelectLesson(lesson.id)}
                  type="button"
                >
                  {done ? <CheckCircle2 size={17} /> : <Circle size={17} />}
                  <span>{lesson.number}</span>
                  <div><strong>{lesson.title}</strong><small>{lesson.duration}</small></div>
                </button>
              );
            })}
          </nav>
          <div className={styles.exitGate}>{exitGateIcon}<div><strong>Exit gate</strong><small>{exitGate}</small></div></div>
        </aside>

        <section className={styles.lessonWorkspace}>
          <header className={styles.lessonHeader}>
            <div><small>Lesson {active.number} · {active.duration}</small><h2>{active.title}</h2></div>
            <span className={completedLessons.includes(activeLessonId) ? styles.completedPill : styles.progressPill}>
              {completedLessons.includes(activeLessonId) ? <><Check size={13} /> Completed</> : "In progress"}
            </span>
          </header>

          <div className={styles.lessonContent}>{children}</div>

          {feedback && (
            <div className={`${styles.feedback} ${styles[feedback.tone]}`}>
              {feedback.tone === "success" ? <CheckCircle2 size={18} /> : <Info size={18} />}
              <span>{feedback.message}</span>
            </div>
          )}

          <footer className={styles.lessonFooter}>
            <button disabled={activeIndex === 0} onClick={() => move(-1)} type="button"><ArrowLeft size={16} /> Previous</button>
            <div>
              <button className={styles.validateButton} onClick={onValidate} type="button">{validateLabel}<Check size={16} /></button>
              <button disabled={activeIndex === lessons.length - 1} onClick={() => move(1)} type="button">Next <ArrowRight size={16} /></button>
            </div>
          </footer>
        </section>
      </div>
    </main>
  );
}
