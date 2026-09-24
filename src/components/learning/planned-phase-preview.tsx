import Link from "next/link";
import { ArrowLeft, ArrowRight, Beaker, CheckCircle2, Clock3, Construction, FileCheck2 } from "lucide-react";
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
        <div className={styles.previewBadge}><Beaker size={16} /> Testing preview</div>
      </section>

      <div className={styles.notice}><Construction size={22} /><div><strong>This phase is unlocked for navigation testing only.</strong><p>Its interactive lessons, Oracle walkthroughs, validation activities, and evidence package have not been implemented. Phases 01–09 are the completed learning modules.</p></div></div>

      <section className={styles.contentGrid}>
        <article className={styles.definition}>
          <small>Planned phase definition</small>
          <h2>{module.title}</h2>
          <div><span><Clock3 size={16} /> Duration</span><strong>{module.duration}</strong></div>
          <div><span><FileCheck2 size={16} /> Deliverable</span><strong>{module.deliverable}</strong></div>
          <div><span><CheckCircle2 size={16} /> Exit gate</span><strong>{module.exitGate}</strong></div>
        </article>

        <article className={styles.testingScope}>
          <small>What can be tested now</small>
          <h2>Navigation and lifecycle position</h2>
          <ul>
            <li>The phase opens from the complete phase directory.</li>
            <li>Previous and next phase navigation resolves correctly.</li>
            <li>The page clearly distinguishes preview content from completed training.</li>
            <li>No progress or exit-gate completion is recorded from this placeholder.</li>
          </ul>
        </article>
      </section>

      <nav className={styles.phaseNavigation} aria-label="Phase preview navigation">
        {previous ? <Link href={`/learn/${previous.slug}`}><ArrowLeft size={16} /> Phase {String(previous.phase).padStart(2, "0")} · {previous.title}</Link> : <span />}
        {next ? <Link href={`/learn/${next.slug}`}>Phase {String(next.phase).padStart(2, "0")} · {next.title}<ArrowRight size={16} /></Link> : <Link href="/learn?track=implementation">Return to dashboard<ArrowRight size={16} /></Link>}
      </nav>
    </main>
  );
}
