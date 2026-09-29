import type { LessonDefinition } from "@/types/course";

export const monthlyDataReadinessLessons = [
  { id: "monthly-readiness-purpose", number: "01", title: "Readiness and cycle cut-off", duration: "12 min", type: "concept" },
  { id: "monthly-readiness-sources", number: "02", title: "Source and ownership check", duration: "18 min", type: "wizard" },
  { id: "monthly-readiness-reconcile", number: "03", title: "Actuals and opening balances", duration: "24 min", type: "simulation" },
  { id: "monthly-readiness-exceptions", number: "04", title: "Exception triage", duration: "20 min", type: "simulation" },
  { id: "monthly-readiness-rehearsal", number: "05", title: "Readiness rehearsal", duration: "28 min", type: "evidence" },
  { id: "monthly-readiness-gate", number: "06", title: "Release gate and knowledge check", duration: "18 min", type: "exit-gate" },
] as const satisfies readonly LessonDefinition[];

export type MonthlyDataReadinessLessonId = (typeof monthlyDataReadinessLessons)[number]["id"];

export const readinessSourceControls = [
  { id: "sales", label: "Sales actuals", owner: "Commercial Data Owner", evidence: "Approved period extract and source control total" },
  { id: "inventory", label: "Opening inventory", owner: "Supply Chain", evidence: "Book stock, blocked stock, and usable stock reconciliation" },
  { id: "production", label: "Production actuals", owner: "Plant Operations", evidence: "Completed production and yield by product and plant" },
  { id: "cost", label: "Cost actuals and rates", owner: "Finance / Cost Accounting", evidence: "Approved material, labor, overhead, and currency-rate inputs" },
  { id: "metadata", label: "Master-data changes", owner: "Planning Administrator", evidence: "Approved Product, Entity, Market, Channel, and Account changes" },
  { id: "calendar", label: "Cycle calendar and cut-off", owner: "FP&A Process Owner", evidence: "Published cut-off, submission, review, and approval dates" },
] as const;

export const readinessExceptionCases = [
  {
    id: "EX-01",
    situation: "The FY26 source extract contains 66,240 sales units, but Plan1 contains 66,220 after the load.",
    correct: "Block release and resolve the 20-unit reconciliation difference",
  },
  {
    id: "EX-02",
    situation: "Eight historical rows loaded successfully, with zero rejects and a zero-unit source-to-Plan1 variance.",
    correct: "Record the evidence and continue",
  },
  {
    id: "EX-03",
    situation: "Blocked stock was included in opening available inventory, overstating usable stock by 80 units.",
    correct: "Correct the opening balance and rerun the reconciliation",
  },
  {
    id: "EX-04",
    situation: "A newly approved product member is missing from the production environment one day before planning opens.",
    correct: "Use change control, deploy the approved metadata, refresh, and smoke-test",
  },
] as const;

export const readinessEvidenceItems = [
  "Cycle calendar and cut-off confirmation",
  "Source-file inventory with owner and timestamp",
  "Load status and reject evidence",
  "Source-to-Plan1 actuals reconciliation",
  "Opening inventory reconciliation",
  "Currency-rate and metadata readiness confirmation",
  "Exception log with owner and due date",
  "FP&A release decision",
] as const;

export const monthlyReadinessQuestions = [
  {
    id: "MR-K01",
    question: "What is the purpose of the monthly data-readiness gate?",
    answers: [
      "To prove that controlled inputs are complete, reconciled, owned, and safe to use before planners begin",
      "To produce the final approved forecast before sales planners enter assumptions",
      "To replace source-system close controls with Planning calculations",
    ],
    correct: 0,
  },
  {
    id: "MR-K02",
    question: "Which control is most important when actuals are loaded?",
    answers: [
      "A documented source-to-target reconciliation at the agreed grain and precision",
      "A successful job status without checking totals",
      "A screenshot of the home page after the load",
    ],
    correct: 0,
  },
  {
    id: "MR-K03",
    question: "How should blocked inventory be treated when establishing usable opening stock?",
    answers: [
      "Exclude it from usable stock and reconcile the adjustment to book inventory",
      "Include it because it exists physically",
      "Ignore the opening balance and let the demand plan correct it later",
    ],
    correct: 0,
  },
  {
    id: "MR-K04",
    question: "Who authorizes the release of the planning cycle after readiness checks?",
    answers: [
      "The named FP&A planning-process owner using evidence from data owners and administrators",
      "Any planner who can open an input form",
      "The integration job automatically, regardless of exceptions",
    ],
    correct: 0,
  },
  {
    id: "MR-K05",
    question: "What happens to an unresolved material reconciliation difference?",
    answers: [
      "It remains a blocking exception until corrected or explicitly governed through an approved exception decision",
      "It is carried silently into the demand baseline",
      "It is deleted from the evidence pack after the cycle opens",
    ],
    correct: 0,
  },
] as const;
