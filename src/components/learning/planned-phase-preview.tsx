import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpenCheck, CheckCircle2, Clock3, Construction, FileCheck2 } from "lucide-react";
import type { CourseModuleDefinition } from "@/types/course";
import styles from "./planned-phase-preview.module.css";

type PlannedPhasePreviewProps = {
  module: CourseModuleDefinition;
  previous?: CourseModuleDefinition;
  next?: CourseModuleDefinition;
};

export function PlannedPhasePreview({ module, previous, next }: PlannedPhasePreviewProps) {
  const phaseLabel = String(module.phase ?? module.sequence).padStart(2, "0");

  return (
    <main className={styles.page}>
      <div className={styles.breadcrumb}><Link href="/learn?track=implementation">Dashboard</Link><span>/</span>Phase {phaseLabel}</div>

      <section className={styles.hero}>
        <div className={styles.phase}>{phaseLabel}</div>
        <div><p>{module.stage}</p><h1>{module.title}</h1><span>{module.description}</span></div>
        <div className={styles.previewBadge}><BookOpenCheck size={16} /> Curriculum outline</div>
      </section>

      <div className={styles.notice}><Construction size={22} /><div><strong>This page provides the agreed learning scope for the phase.</strong><p>Use the deliverable and exit gate below to understand what the phase must produce before the implementation can progress.</p></div></div>

      <section className={styles.contentGrid}>
        <article className={styles.definition}>
          <small>Phase definition</small>
          <h2>{module.title}</h2>
          <div><span><Clock3 size={16} /> Duration</span><strong>{module.duration}</strong></div>
          <div><span><FileCheck2 size={16} /> Deliverable</span><strong>{module.deliverable}</strong></div>
          <div><span><CheckCircle2 size={16} /> Exit gate</span><strong>{module.exitGate}</strong></div>
        </article>

        <article className={styles.testingScope}>
          <small>Learning purpose</small>
          <h2>How this phase supports the lifecycle</h2>
          <ul>
            <li>Understand the business and implementation purpose of the phase.</li>
            <li>Identify the decisions and evidence inherited from earlier phases.</li>
            <li>Prepare the stated deliverable for an accountable review.</li>
            <li>Use the exit gate to decide whether the next phase can begin.</li>
          </ul>
        </article>
      </section>

      <nav className={styles.phaseNavigation} aria-label="Phase navigation">
        {previous ? <Link href={`/learn/${previous.slug}`}><ArrowLeft size={16} /> Phase {String(previous.phase).padStart(2, "0")} · {previous.title}</Link> : <span />}
        {next ? <Link href={`/learn/${next.slug}`}>Phase {String(next.phase).padStart(2, "0")} · {next.title}<ArrowRight size={16} /></Link> : <Link href="/learn?track=implementation">Return to dashboard<ArrowRight size={16} /></Link>}
      </nav>
    </main>
  );
}
