"use client";

import Image from "next/image";
import Link from "next/link";
import { BookOpenCheck, ChevronRight, LayoutDashboard, LogOut, Route } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getModulesForTrack } from "@/content/course-catalog";
import { productionSalesPlanningCourse } from "@/content/production-sales-planning";
import { emptyProgress, readLearningProgress, type LearningProgress } from "@/lib/learning-progress";
import styles from "./learner-shell.module.css";

export function LearnerShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [progress, setProgress] = useState<LearningProgress>(emptyProgress);

  useEffect(() => {
    const update = () => setProgress(readLearningProgress());
    const timer = window.setTimeout(update, 0);
    window.addEventListener("bisp-learning-progress", update);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("bisp-learning-progress", update);
    };
  }, []);

  const isImplementationModule = pathname !== "/learn" && pathname.startsWith("/learn/");
  const selectedTrack = isImplementationModule ? "implementation" : progress.selectedTrack;
  const track = productionSalesPlanningCourse.tracks.find((item) => item.id === selectedTrack)!;
  const completedLessons = progress.tracks[selectedTrack].completedLessons;
  const modules = getModulesForTrack(selectedTrack);
  const availableModules = modules.filter((module) => module.status === "available");
  const activeModule = availableModules.find((module) => !module.lessons.every((lesson) => completedLessons.includes(lesson.id))) ?? availableModules.at(-1);
  const activeCompleted = activeModule?.lessons.filter((lesson) => completedLessons.includes(lesson.id)).length ?? 0;
  const activeTotal = activeModule?.lessons.length ?? 0;
  const phasePercent = activeTotal ? Math.round((activeCompleted / activeTotal) * 100) : 0;
  const activeHref = activeModule ? `/learn/${activeModule.slug}` : `/learn?track=${selectedTrack}`;

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="Return to BISP overview">
          <span className={styles.logoCrop}>
            <Image src="/brand/bisp-logo.png" alt="BISP" width={212} height={106} priority />
          </span>
          <span className={styles.brandText}>
            <strong>Learning Lab</strong>
            <small>Production &amp; Sales Planning</small>
          </span>
        </Link>
        <div className={styles.courseContext}>
          <span>Current program</span>
          <strong>Oracle Planning Internship</strong>
        </div>
        <div className={styles.profile} aria-label="Learner profile">
          <span>SD</span>
          <div><strong>Learner</strong><small>Frontend preview</small></div>
        </div>
      </header>

      <aside className={styles.sidebar}>
        <nav aria-label="Learning workspace">
          <Link className={pathname === "/learn" ? styles.active : ""} href="/learn">
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link className={pathname !== "/learn" && pathname.startsWith("/learn/") ? styles.active : ""} href={activeHref}>
            <BookOpenCheck size={18} /> {activeModule ? "Current module" : "Path overview"}
          </Link>
          <a href={selectedTrack === "implementation" ? "/learn?track=implementation#roadmap" : "/learn?track=planning-cycle#planning-cycle"}><Route size={18} /> Program roadmap</a>
        </nav>
        <div className={styles.sidebarJourney}>
          <small>Active journey</small>
          <strong>{track.title}</strong>
          <div><span style={{ width: `${phasePercent}%` }} /></div>
          <p>{activeModule ? `${activeCompleted} of ${activeTotal} lessons · Phase ${String(activeModule.phase).padStart(2, "0")} of 27` : `${modules.length} modules defined · interactive build planned`}</p>
          <Link href={activeHref}>{activeModule ? "Continue" : "View path"} <ChevronRight size={15} /></Link>
        </div>
        <Link className={styles.exitLink} href="/"><LogOut size={17} /> Exit learning lab</Link>
      </aside>

      <div className={styles.content}>{children}</div>
    </div>
  );
}
