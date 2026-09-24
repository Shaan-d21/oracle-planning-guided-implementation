import type { CourseDefinition } from "@/types/course";

export const productionSalesPlanningCourse: CourseDefinition = {
  id: "production-sales-planning",
  title: "Production & Sales Planning",
  subtitle: "A hands-on Oracle Planning implementation experience",
  company: "NovaDrive Appliances Ltd.",
  durationDays: 90,
  tracks: [
    {
      id: "planning-cycle",
      title: "Monthly Planning Cycle",
      description:
        "Learn how demand becomes an approved operational and financial plan.",
      audience: "New planners and business users",
    },
    {
      id: "implementation",
      title: "Implementation Journey",
      description:
        "Design, build, test, deploy, and support the Oracle Planning solution.",
      audience: "Consultants, developers, and solution architects",
    },
  ],
  phases: [
    { id: 1, title: "Discovery & Requirement Gathering", stage: "discover" },
    { id: 2, title: "Current-State Assessment", stage: "discover" },
    { id: 3, title: "Future-State Design", stage: "design" },
    { id: 4, title: "Requirement Traceability", stage: "design" },
    { id: 5, title: "Solution Architecture", stage: "design" },
    { id: 6, title: "Application & Dimension Design", stage: "design" },
    { id: 7, title: "Metadata Build", stage: "build" },
    { id: 8, title: "Data Integration", stage: "build" },
    { id: 9, title: "Sales Planning Build", stage: "build" },
    { id: 10, title: "Production Planning Build", stage: "build" },
    { id: 11, title: "Inventory Planning", stage: "build" },
    { id: 12, title: "Manufacturing Cost & COGS", stage: "build" },
    { id: 13, title: "Workforce & CapEx Dependencies", stage: "build" },
    { id: 14, title: "Financial Statement Integration", stage: "build" },
    { id: 15, title: "Business Rules & Groovy", stage: "build" },
    { id: 16, title: "Forms, Dashboards & Smart View", stage: "build" },
    { id: 17, title: "Security & Workflow", stage: "build" },
    { id: 18, title: "Scenario & What-If Planning", stage: "build" },
    { id: 19, title: "System Integration Testing", stage: "validate" },
    { id: 20, title: "Performance Testing", stage: "validate" },
    { id: 21, title: "User Acceptance Testing", stage: "validate" },
    { id: 22, title: "Defect Management", stage: "validate" },
    { id: 23, title: "Cutover", stage: "deploy" },
    { id: 24, title: "Go / No-Go", stage: "deploy" },
    { id: 25, title: "Go-Live", stage: "deploy" },
    { id: 26, title: "Hypercare", stage: "operate" },
    { id: 27, title: "BAU & Continuous Improvement", stage: "operate" },
  ],
};
