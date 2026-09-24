import { currentStateLessons } from "@/content/current-state-module";
import { dataIntegrationLessons } from "@/content/data-integration-module";
import { discoveryLessons } from "@/content/discovery-module";
import { applicationDimensionDesignLessons } from "@/content/application-dimension-design-module";
import { futureStateLessons } from "@/content/future-state-module";
import { metadataBuildLessons } from "@/content/metadata-build-module";
import { requirementTraceabilityLessons } from "@/content/requirement-traceability-module";
import { solutionArchitectureLessons } from "@/content/solution-architecture-module";
import { salesPlanningLessons } from "@/content/sales-planning-build-module";
import { productionSalesPlanningCourse } from "@/content/production-sales-planning";
import type { CourseModuleDefinition, LearningTrackId } from "@/types/course";

const implementedModules: CourseModuleDefinition[] = [
  {
    id: "implementation-discovery",
    slug: "discovery",
    trackId: "implementation",
    sequence: 1,
    phase: 1,
    title: "Discovery & Requirement Gathering",
    stage: "Discover · Foundation",
    description: "Understand the business, interview stakeholders, examine evidence, write testable requirements, and complete an applied Discovery pack.",
    duration: "144 min",
    deliverable: "Approved discovery pack and requirement catalogue",
    exitGate: "Guided work, applied homework, objectives, scope, stakeholders, evidence, requirements, open items, and sign-off are complete",
    status: "available",
    lessons: discoveryLessons,
  },
  {
    id: "implementation-current-state",
    slug: "current-state",
    trackId: "implementation",
    sequence: 2,
    phase: 2,
    title: "Current-State Assessment",
    stage: "Discover · Assessment",
    description: "Validate real planning processes, handoffs, systems, data, controls, root causes, and measurable AS-IS performance through evidence.",
    duration: "148 min",
    deliverable: "Agreed current-state assessment pack and measurable AS-IS baseline",
    exitGate: "Guided work, applied homework, process and interface evidence, root causes, baselines, open items, knowledge check, and business agreement are complete",
    status: "available",
    prerequisiteModuleId: "implementation-discovery",
    lessons: currentStateLessons,
  },
  {
    id: "implementation-future-state",
    slug: "future-state",
    trackId: "implementation",
    sequence: 3,
    phase: 3,
    title: "Future-State Design",
    stage: "Design · Blueprint",
    description: "Convert validated findings into a connected target operating model covering outcomes, ownership, decision grains, calendar, governance, exceptions, controls, and measures.",
    duration: "154 min",
    deliverable: "Approved future-state design package and stakeholder agreement",
    exitGate: "Guided work, applied homework, process, ownership, grain, calendar, exceptions, controls, KPIs, open items, knowledge check, and stakeholder agreement are complete",
    status: "available",
    prerequisiteModuleId: "implementation-current-state",
    lessons: futureStateLessons,
  },
  {
    id: "implementation-requirement-traceability",
    slug: "requirement-traceability",
    trackId: "implementation",
    sequence: 4,
    phase: 4,
    title: "Requirement Traceability",
    stage: "Design · Governance",
    description: "Build and govern the RTM from approved outcomes through requirement quality, ownership, release scope, design/build mappings, verification evidence, coverage, and controlled change.",
    duration: "154 min",
    deliverable: "Approved, versioned, and coverage-reviewed RTM baseline",
    exitGate: "Guided work, applied homework, requirement quality, ownership, release assignment, lifecycle mapping, evidence coverage, gap control, change history, knowledge check, and sign-off are complete",
    status: "available",
    prerequisiteModuleId: "implementation-future-state",
    lessons: requirementTraceabilityLessons,
  },
  {
    id: "implementation-solution-architecture",
    slug: "solution-architecture",
    trackId: "implementation",
    sequence: 5,
    phase: 5,
    title: "Solution Architecture",
    stage: "Design · Architecture",
    description: "Define system boundaries, connected planning capabilities, user experiences, integrations, environments, security, measurable non-functional requirements, recovery, and support controls.",
    duration: "160 min",
    deliverable: "Approved solution architecture baseline and decision package",
    exitGate: "Boundaries, decisions, trade-offs, flows, controls, dependencies, risks, owners, and approvals are recorded and ready for detailed application design",
    status: "available",
    prerequisiteModuleId: "implementation-requirement-traceability",
    lessons: solutionArchitectureLessons,
  },
  {
    id: "implementation-application-dimension-design",
    slug: "application-dimension-design",
    trackId: "implementation",
    sequence: 6,
    phase: 6,
    title: "Application & Dimension Design",
    stage: "Design · Detailed design",
    description: "Define and review the Oracle application setup, dimensions, planning grains, hierarchies, member properties, cubes, valid intersections, data movement, and performance assumptions.",
    duration: "170 min",
    deliverable: "Approved application and dimension design baseline with screenshot-guided runbook",
    exitGate: "Setup decisions, grains, dimensions, properties, cube participation, intersections, controls, evidence, risks, owners, and approvals are ready for metadata build",
    status: "available",
    prerequisiteModuleId: "implementation-solution-architecture",
    lessons: applicationDimensionDesignLessons,
  },
  {
    id: "implementation-metadata-build",
    slug: "metadata-build",
    trackId: "implementation",
    sequence: 7,
    phase: 7,
    title: "Metadata Build",
    stage: "Build · Metadata configuration",
    description: "Prepare tenant-derived files, create and import governed metadata, diagnose rejects, refresh safely, reconcile results, and baseline the built structures.",
    duration: "225 min",
    deliverable: "Reconciled metadata baseline with import, refresh, smoke-test, and post-build export evidence",
    exitGate: "Approved metadata is loaded, refreshed where required, reconciled to control totals, independently reviewed, and ready for forms and calculation configuration",
    status: "available",
    prerequisiteModuleId: "implementation-application-dimension-design",
    lessons: metadataBuildLessons,
  },
  {
    id: "implementation-data-integration",
    slug: "data-integration",
    trackId: "implementation",
    sequence: 8,
    phase: 8,
    title: "Data Integration",
    stage: "Build · Data integration",
    description: "Define source contracts, configure a file-based integration, map dimensions and members, stage and validate data, export safely, resolve rejects, and reconcile Planning totals.",
    duration: "241 min",
    deliverable: "Reconciled file-based integration baseline, runbook, mappings, Process Details, and source-to-Planning evidence",
    exitGate: "The controlled load is repeatable, mappings and runtime options are reviewed, rejects are resolved, source and Planning totals reconcile, and automation prerequisites are owned",
    status: "available",
    prerequisiteModuleId: "implementation-metadata-build",
    lessons: dataIntegrationLessons,
  },
  {
    id: "implementation-sales-planning-build",
    slug: "sales-planning-build",
    trackId: "implementation",
    sequence: 9,
    phase: 9,
    title: "Sales Planning Build",
    stage: "Build · Sales planning model",
    description: "Build and prove the controlled path from reconciled history through baseline, promotion, overrides, consensus demand, net price, revenue, exceptions, and downstream handoff.",
    duration: "269 min",
    deliverable: "Reconciled sales-planning model, functional walkthrough, hands-on lab, and evidence package",
    exitGate: "Consensus units and net revenue reconcile from approved inputs through calculations, controls, forms, exceptions, evidence, and downstream handoff",
    status: "available",
    prerequisiteModuleId: "implementation-data-integration",
    lessons: salesPlanningLessons,
  },
];

const implementationPlaceholders: CourseModuleDefinition[] = productionSalesPlanningCourse.phases
  .filter((phase) => phase.id > 9)
  .map((phase) => ({
    id: `implementation-${phase.id}`,
    slug: `phase-${phase.id}`,
    trackId: "implementation",
    sequence: phase.id,
    phase: phase.id,
    title: phase.title,
    stage: phase.stage.charAt(0).toUpperCase() + phase.stage.slice(1),
    description: "Content will be added after the preceding lifecycle deliverable is validated.",
    duration: "Planned",
    deliverable: "Defined during detailed module design",
    exitGate: "Defined during detailed module design",
    status: "planned",
    prerequisiteModuleId: phase.id === 10 ? "implementation-sales-planning-build" : `implementation-${phase.id - 1}`,
    lessons: [],
  }));

const planningTitles = [
  ["Data readiness", "Review actuals, source completeness, and opening balances."],
  ["Demand baseline", "Prepare the statistical and historical demand baseline."],
  ["Sales planning", "Plan volume, price, promotions, and overrides."],
  ["Consensus demand", "Resolve assumptions and agree one demand plan."],
  ["Inventory planning", "Apply inventory policies and calculate requirements."],
  ["Production allocation", "Allocate feasible production across plants."],
  ["Capacity, MRP & procurement", "Validate resources, materials, and purchase requirements."],
  ["Cost, COGS & margin", "Calculate manufacturing and financial impact."],
  ["Scenario & S&OP approval", "Compare scenarios, resolve exceptions, and approve."],
  ["Publish & reconcile", "Publish the plan and reconcile management outputs."],
] as const;

export const planningCycleModules: CourseModuleDefinition[] = planningTitles.map(([title, description], index) => ({
  id: `planning-cycle-${index + 1}`,
  slug: `step-${index + 1}`,
  trackId: "planning-cycle",
  sequence: index + 1,
  title,
  stage: index < 2 ? "Prepare" : index < 8 ? "Plan" : "Approve",
  description,
  duration: "Planned",
  deliverable: "Monthly planning evidence",
  exitGate: "Expected result reconciled and approved",
  status: "planned",
  prerequisiteModuleId: index === 0 ? undefined : `planning-cycle-${index}`,
  lessons: [],
}));

export const implementationModules = [...implementedModules, ...implementationPlaceholders];

export function getModulesForTrack(trackId: LearningTrackId) {
  return trackId === "implementation" ? implementationModules : planningCycleModules;
}

export function getModuleById(moduleId: string) {
  return [...implementationModules, ...planningCycleModules].find((module) => module.id === moduleId);
}

export function getModuleBySlug(moduleSlug: string) {
  return [...implementationModules, ...planningCycleModules].find((module) => module.slug === moduleSlug);
}
