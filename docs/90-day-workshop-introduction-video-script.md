# 90-Day Oracle Planning Workshop — Introduction Video Script

**Target duration:** 30 minutes  
**Format:** PowerPoint presentation, followed by a brief dashboard reveal  
**Purpose:** Orient learners before the separate UI walkthrough video  
**Delivery style:** Professional, conversational, and practical  

## Recording guidance

- Speak at a comfortable pace of roughly 120–130 words per minute.
- Do not read every word shown on the slide. Keep slide text short and use the narration to explain it.
- Pause briefly after important ideas such as evidence, exit gates, and the Day 90 capstone.
- Use the dashboard only during Slide 17. Do not open lessons or explain controls in detail; that belongs in the next video.
- The timings below include normal pauses and slide transitions.

---

## Slide 1 — Welcome to the workshop

**Time:** 0:00–1:15  
**On-screen content:**

- 90-Day Oracle Planning Workshop
- Production and Sales Planning
- Apex Home Appliances Pvt. Ltd.
- From discovery to business-as-usual operation

**Narration:**

Hello, and welcome to the 90-Day Oracle EPM Production and Sales Planning Workshop.

Over the course of this program, we are going to work through a complete Oracle Planning implementation journey using one connected business case. We will begin with the business problem, not with application screens. From there, we will move through discovery, solution design, application configuration, data integration, planning models, testing, deployment, and finally the transition into business-as-usual support.

The objective is not simply to show you where different buttons are located. By the end of the workshop, you should understand why the solution is designed in a particular way, how the major planning processes connect, what evidence is expected at each stage, and how an implementation team decides that a phase is genuinely complete.

This first video is an orientation. We will discuss how the program works, what you will build, how you should approach the assignments, and how to begin. At the end, I will briefly show you the learning dashboard. The detailed interface walkthrough will be covered in the next video.

---

## Slide 2 — Why this workshop exists

**Time:** 1:15–3:00  
**On-screen content:**

- Learn the implementation process
- Connect business needs to Oracle design
- Practise with realistic evidence
- Build confidence beyond navigation

**Narration:**

Before we look at the calendar, let us be clear about the problem this workshop is trying to solve.

Many learners understand individual Oracle Planning terms. They may know what a dimension is, what a form is, or what a business rule does. But when they join a real project, they often find it difficult to connect those individual concepts into an implementation process.

A project does not begin by creating dimensions. It begins by understanding what the business is trying to decide, how planning works today, what data is available, where the current process fails, and who has the authority to approve a future process. In the same way, a project does not end when a form saves successfully. The solution still has to be tested, accepted, deployed, supported, reconciled, and improved.

That complete lifecycle is what this workshop is designed to teach.

You will be asked to think like a member of an implementation team. Sometimes you will take the role of a business analyst. In another activity, you may think like a solution architect, application developer, data integration consultant, tester, planner, or support owner.

The intention is to help you understand how these roles work together. You are not memorising a perfect set of answers. You are learning how to make a decision, document it, validate it, and explain why it is appropriate for the business case.

---

## Slide 3 — The Apex business scenario

**Time:** 3:00–4:30  
**On-screen content:**

- Apex Home Appliances Pvt. Ltd.
- Small home and kitchen appliances
- India operations with Pune and Noida plants
- INR local planning and USD reporting
- Sales, inventory, production, cost, and finance

**Narration:**

The entire program uses a simulated company called Apex Home Appliances Private Limited.

Apex manufactures and sells small home and kitchen appliances. Its product portfolio includes items such as mixer grinders, electric kettles, air fryers, and induction cooktops. The company operates manufacturing facilities in Pune and Noida and sells through distributor, retail, and online channels across multiple markets.

The planning problem is intentionally connected. Sales demand influences inventory requirements. Inventory targets influence production. Production decisions consume plant capacity and materials. Those decisions affect manufacturing cost, inventory valuation, cost of goods sold, margin, cash, and the wider financial outlook.

The application is designed as a custom Oracle Planning solution rather than a prebuilt module application. It uses a BSO cube for input and calculation and an ASO cube for reporting. Because the business operates with multicurrency enabled, local operational planning includes INR, while management reporting also considers USD.

You do not need to remember every design detail immediately. The important point is that we will continue using the same company, the same planning problem, and the same agreed structures throughout the workshop. This continuity is what allows each phase to build logically on the evidence produced by the previous phase.

---

## Slide 4 — What you should be able to do by Day 90

**Time:** 4:30–6:00  
**On-screen content:**

- Explain the end-to-end lifecycle
- Design and configure a connected solution
- Validate calculations and controls
- Produce implementation evidence
- Defend business and technical decisions

**Narration:**

By Day 90, we expect more than familiarity with the application.

You should be able to explain the complete implementation lifecycle in your own words. You should understand how a business requirement becomes a process decision, how that decision affects dimensions and data grain, how it is implemented through configuration or calculation, and how it is eventually tested and accepted.

You should also be able to work through the connected planning flow. That means understanding how actuals and assumptions are prepared, how the sales baseline is developed, how demand moves into inventory and production planning, how capacity and materials are considered, and how operational plans affect cost, margin, and financial statements.

Just as importantly, you should be able to produce evidence. In a real implementation, saying that something works is not enough. The team needs a controlled artifact: a requirement, design decision, reconciliation, test result, approval record, runbook, or support handover.

At the end of the program, you will present the solution and defend the decisions behind it. The goal is not to deliver a polished sales presentation. The goal is to demonstrate that you understand what was built, why it was built, how it was validated, what limitations remain, and how the organization will operate it after go-live.

---

## Slide 5 — The structure of the 90-day journey

**Time:** 6:00–7:45  
**On-screen content:**

- Discover — Days 1–12
- Design — Days 13–30
- Build — Days 31–75
- Validate — Days 76–84
- Deploy — Days 85–88
- Operate — Days 89–90

**Narration:**

The 90 days are organized into six stages: Discover, Design, Build, Validate, Deploy, and Operate.

Inside those six stages are 27 implementation phases. You will see each phase represented as a module in the learning dashboard.

The number of days assigned to each stage is not equal, and that is deliberate. Discovery and design receive enough time to establish the business and solution foundation. The Build stage is the longest because it includes metadata, data integration, sales planning, production, inventory, cost, financial integration, rules, forms, dashboards, security, workflow, and scenario planning.

Validation then brings those individual components together. Deployment focuses on cutover, the Go or No-Go decision, and controlled go-live. The final stage covers hypercare, business-as-usual ownership, continuous improvement, and the capstone.

The calendar provides an order and a dependency structure. It is not intended to suggest that every learner must spend exactly the same number of hours on every day. Some topics may take you longer, particularly when you begin working in the Oracle environment. What should remain fixed is the sequence: understand before designing, design before building, reconcile before approving, and test before deploying.

If you follow that sequence, your work will form one connected implementation story rather than a collection of unrelated exercises.

---

## Slide 6 — How each learning block works

**Time:** 7:45–9:30  
**On-screen content:**

1. Learn
2. Apply
3. Validate
4. Capture evidence
5. Reflect and hand off

**Narration:**

Throughout the workshop, we will use the same five-part learning rhythm.

First, you learn the purpose of the activity. This includes the business decision, the control being protected, and the Oracle capability involved.

Second, you apply the concept to the Apex case. Depending on the phase, this may involve answering discovery questions, completing a design workbook, preparing a data file, configuring an application object, executing a calculation, or working through a simulated project decision.

Third, you validate the result. Validation may include checking totals, reviewing calculation logic, testing positive and negative security access, confirming workflow behavior, investigating an exception, or comparing an output with the expected result.

Fourth, you capture evidence. Evidence should show what was done, who prepared it, what version was used, what result was obtained, who reviewed it, and whether any issue remains open.

Finally, you reflect and hand off. Ask yourself: What decision did this activity support? Why is the result reliable? What assumption did I make? What would the next phase need from me?

This final step is important. In real projects, good work can still create problems if it cannot be understood or reused by the next person. The workshop therefore treats explanation and handover as part of completion—not as optional documentation added at the end.

---

## Slide 7 — Stage 1: Discover

**Time:** 9:30–11:30  
**On-screen content:**

- Days 1–12
- Business case and outcomes
- Stakeholders and workshops
- Requirements and evidence
- Current-state assessment
- Assignment A1: Discovery pack

**Narration:**

The Discover stage covers Days 1 through 12 and includes the first two phases: Discovery and Requirement Gathering, followed by Current-State Assessment.

We begin with the Apex business case. You will identify the outcomes the company is trying to improve, the scope of the planning process, the main constraints, and the initial hypotheses that need to be tested.

You will then identify the people who need to participate. This includes business owners, planners, approvers, data owners, technology teams, finance, operations, and anyone responsible for a critical handoff. You will prepare a stakeholder map, a responsibility model, a workshop plan, and an evidence request.

Next, you will practise asking discovery questions. The purpose is not to collect a large list of statements. The purpose is to understand decisions, measures, timing, ownership, data, controls, exceptions, and pain points. You will learn to separate a verified fact from an assumption and to record unanswered questions instead of quietly treating them as requirements.

The current-state phase then maps how planning works today. You will examine process steps, spreadsheets, source systems, manual handoffs, approval points, delays, duplicated work, control weaknesses, and root causes.

The first assessed submission is due at the end of Day 12. It combines your case brief, stakeholder plan, requirement catalogue, current-state process, evidence inventory, findings, and open-decision log.

The key lesson from this stage is simple: do not design the Oracle solution before you understand the business problem. A technically valid screen can still be the wrong solution if it addresses an assumption rather than a verified requirement.

---

## Slide 8 — Stage 2: Design

**Time:** 11:30–13:30  
**On-screen content:**

- Days 13–30
- Future-state process
- Requirement traceability
- Solution architecture
- Application and dimension design
- Assignment A2: Approved solution blueprint

**Narration:**

The Design stage runs from Day 13 to Day 30. Here, validated business needs are converted into an agreed future process and a buildable solution blueprint.

We first design the future-state planning process. You will define roles, the planning calendar, decision grain, workflow, approval points, exception handling, controls, and measures of success. This is still a business design activity. We are deciding how planning should operate before finalizing how Oracle will support it.

Requirement Traceability connects that business design to the implementation. Every approved requirement should have a source, an owner, a priority, a design response, configuration or data impact, test coverage, and acceptance evidence. This prevents requirements from disappearing between workshops and testing.

Solution Architecture then defines environments, integration boundaries, data movement, calculation placement, reporting, security, and operating controls.

In Application and Dimension Design, those decisions become more concrete. You will confirm the custom Planning application, calendar, multicurrency approach, BSO input and calculation cube, ASO reporting cube, and the role of dimensions such as Account, Entity, Product, Market, Channel, Scenario, Version, Period, Year, and Currency.

You will also decide the lowest meaningful planning grain. More detail is not automatically better. Every additional intersection increases data volume, maintenance, user effort, and testing scope. The grain must support a real business decision.

At the end of Day 30, you submit the approved solution blueprint. The Design stage is complete only when the future process, traceability, architecture, application settings, dimensions, cube use, and open decisions are understood well enough for the build team to proceed without guessing.

---

## Slide 9 — Stage 3: Build, Part 1

**Time:** 13:30–16:00  
**On-screen content:**

- Days 31–54
- Metadata and actuals integration
- Sales planning
- Inventory planning
- Production and capacity
- Materials and procurement implications

**Narration:**

The Build stage runs from Day 31 to Day 75, so we will look at it in two parts.

The first part begins with Metadata Build. You will prepare dimension files, validate member names and properties, check aliases and hierarchies, load the approved metadata, and reconcile the result. This is where the earlier design decisions become actual application structures.

Data Integration follows. You will work with source files, mappings, period and category controls, validations, rejected records, reruns, and source-to-target reconciliation. A green load status alone is not proof that the data is correct. The loaded totals, members, periods, scenarios, and dimensional intersections must match the approved source.

From there, we begin the connected planning models.

In Sales Planning, you will establish a historical baseline and work with volume, price, revenue, promotions, planner adjustments, comments, variance thresholds, submission, and approval. The objective is not simply to enter a forecast. It is to produce an explainable and controlled consensus demand plan.

Inventory Planning connects opening inventory, receipts, issues, safety stock, target inventory, closing balances, shortages, and excess. You will learn to reconcile the inventory movement rather than treating each measure independently.

Production Planning then translates approved demand and inventory policy into net production requirements. Yield, lot sizes, timing, plant eligibility, and capacity must be considered. Production is allocated between Pune and Noida, and capacity exceptions must be explained and resolved through a documented business decision.

We also introduce focused material and procurement implications. The workshop is not intended to reproduce a complete ERP purchasing solution. However, you should understand how planned production creates component demand, how on-hand material and open supply affect net requirements, and when a planning result requires a procurement response.

By Day 54, your demand, inventory, production, capacity, and material implications should form one balanced operational plan. If the numbers use different grains or assumptions, the handoff is not complete.

---

## Slide 10 — Stage 3: Build, Part 2

**Time:** 16:00–18:30  
**On-screen content:**

- Days 55–75
- Manufacturing cost, COGS, and margin
- Workforce and CapEx dependencies
- Financial statement integration
- Business rules and Groovy
- Forms, dashboards, Smart View, security, workflow, and scenarios

**Narration:**

The second half of the Build stage turns the operational plan into financial outcomes and a usable planner experience.

Manufacturing Cost and COGS connects material, labor, and overhead rates with planned production. You will calculate unit manufacturing cost, inventory valuation, cost of goods sold, and gross margin. The important skill is reconciliation: being able to explain how an operational change moves through cost and margin.

Workforce and CapEx Dependencies then considers what happens when existing capacity is not sufficient. Should the business add a shift, hire people, use overtime, purchase equipment, delay demand, or combine several actions? You will compare operational feasibility with cash timing, depreciation, and financial impact.

Financial Statement Integration brings sales, inventory, production, cost, workforce, and capital decisions into the profit and loss statement, balance sheet, and cash flow. The purpose is to show that the planning model is connected—not a group of independent departmental forecasts.

Business Rules and Groovy focuses on controlled automation. You will define calculation scope, prompts, sequencing, validation, error behavior, testing, release evidence, and support ownership before treating code as complete.

The final build phases focus on how people use the solution. You will work with task-focused forms, decision dashboards, Smart View analysis, security, workflow, and scenario planning.

Security is not only about whether a user can log in. You must confirm what the user can view, edit, submit, approve, and administer. Both positive and negative tests matter.

Scenario planning allows the team to compare controlled alternatives without damaging the approved baseline. A useful scenario should change agreed drivers, quantify operational and financial consequences, and support a decision.

By Day 75, a planner should be able to use the solution to perform a meaningful planning task safely, efficiently, and with an auditable result. That is the Build milestone.

---

## Slide 11 — Stage 4: Validate

**Time:** 18:30–20:15  
**On-screen content:**

- Days 76–84
- System Integration Testing
- Performance Testing
- User Acceptance Testing
- Defect Management
- Assignment A7: Release validation pack

**Narration:**

The Validate stage covers Days 76 through 84.

System Integration Testing proves the end-to-end journey across metadata, data loads, calculations, forms, workflow, security, reporting, and reconciliation. Individual components may work correctly and still fail when connected, so SIT follows business scenarios rather than isolated features.

Performance Testing checks both interactive and batch workloads. You will define a repeatable workload, capture a baseline, identify the bottleneck, apply a controlled change, and compare the result. Tuning without a baseline is guesswork, and a faster result is not acceptable if it changes the business outcome.

User Acceptance Testing is owned from the business perspective. Testers confirm that the solution supports real planning activities and agreed acceptance criteria. Issues must be reproducible, with a clear user, point of view, input, expected result, actual result, timestamp, and evidence.

Defect Management provides the discipline for triage, priority, ownership, correction, retesting, closure, deferral, or formal acceptance of residual risk.

At the end of Day 84, the release validation pack should show what was tested, what passed, what failed, what was corrected, what remains open, and who has accepted the recommendation. Validation is not complete because the calendar says testing has ended. It is complete when the evidence supports a release decision.

---

## Slide 12 — Stages 5 and 6: Deploy and Operate

**Time:** 20:15–22:00  
**On-screen content:**

- Days 85–88: Cutover, Go/No-Go, Go-Live
- Day 89: Hypercare and support transition
- Day 90: BAU handover and capstone

**Narration:**

The Deploy stage begins on Day 85 with cutover planning and rehearsal.

The cutover runbook defines the exact sequence for configuration, metadata, data, security, validation, communication, and rollback. Each step needs an owner, a dependency, expected timing, completion evidence, and an escalation rule.

Day 87 is the Go or No-Go decision. The decision is based on readiness evidence, blockers, residual risks, business continuity, rollback capability, and decision authority. A Conditional Go is not a vague compromise; its conditions need owners, deadlines, monitoring, and clear consequences.

Day 88 covers controlled go-live, production smoke testing, reconciliation, monitoring, communication, and command-center operation.

On Day 89, the focus moves to hypercare. The team monitors incidents, service health, data and calculation controls, user adoption, support readiness, and knowledge transfer. Hypercare should end because defined exit criteria have been met—not simply because a week has passed.

Day 90 brings the program together. You will complete the business-as-usual handover, improvement roadmap, and final capstone. You should be able to explain the implementation, demonstrate the connected planning process, defend the important decisions, acknowledge limitations, and show how the service will be owned and improved after project closure.

---

## Slide 13 — The planning process running through the program

**Time:** 22:00–23:30  
**On-screen content:**

Actuals and readiness → Demand → Inventory → Production → Capacity and materials → Cost and finance → Scenario approval → Publish and reconcile

**Narration:**

Although the program is organized as an implementation lifecycle, one operational planning process runs through it.

We begin with governed metadata, actuals, opening balances, mappings, and source-to-Planning reconciliation. We then establish the demand baseline and sales forecast. Approved demand drives inventory and production requirements. Production is allocated to plants and checked against capacity, materials, and procurement implications.

The operational plan is then valued through manufacturing cost, inventory valuation, COGS, and margin. Workforce and capital decisions are considered where capacity needs change. These outputs flow into the financial outlook.

The team compares controlled scenarios, completes workflow and business acceptance, publishes approved results, and reconciles reporting.

You will learn these activities progressively inside the relevant implementation phases. The dedicated monthly-cycle experience can then use the same solution and evidence to rehearse the recurring planner process without repeating the entire implementation course.

This distinction is useful: the implementation journey teaches you how and why the solution is built; the monthly cycle teaches you how the business repeatedly operates that solution after go-live.

---

## Slide 14 — Assignments, evidence, and milestones

**Time:** 23:30–25:15  
**On-screen content:**

- 9 assessed submissions
- 6 stage milestones
- Evidence over checkbox completion
- Review, correct, and resubmit when required

**Narration:**

There are nine assessed submissions across the program.

They include the discovery pack, solution blueprint, metadata and integration control pack, connected demand and supply plan, cost and financial integration pack, planner experience demonstration, release validation pack, production transition pack, and the final capstone with the BAU charter.

These assignments combine work from several lessons. They are designed this way because real project deliverables rarely belong to one screen or one person. A production plan, for example, is only useful when its demand, inventory, yield, lot size, capacity, timing, and ownership are consistent.

At the end of each stage, there is a milestone review. Before moving forward, confirm that the required lessons and checks are complete, figures reconcile, assumptions and limitations are explicit, evidence is versioned and reviewable, and open items have owners and dates.

Please do not treat completion buttons as the final objective. They help you track progress, but they do not replace the artifact or your ability to explain it.

If a validation fails, that is not a problem with the learning process. Investigating the failure is part of the learning process. Record the issue, identify the cause, correct it, rerun the validation, and retain both the original evidence and the corrected result where appropriate.

The strongest portfolio at the end of the program will not be the one with the most screenshots. It will be the one that tells a clear, traceable story from requirement through design, configuration, test, approval, deployment, and operation.

---

## Slide 15 — How to begin and how to move forward

**Time:** 25:15–27:00  
**On-screen content:**

1. Review the program plan
2. Start with Phase 01
3. Complete lessons in sequence
4. Save artifacts in an evidence folder
5. Pass the exit gate before moving on

**Narration:**

So, how should you begin?

First, review the 90-day program plan. Do not try to memorize it. Use it to understand where you are going, which assignment is due next, and what evidence the next stage will require.

Second, begin with Phase 01: Discovery and Requirement Gathering. Even if you already know how to create an Oracle Planning application, do not skip directly to configuration. The early phases establish the decisions and assumptions used throughout the build.

Within a phase, work through the lessons in order. Read the purpose, complete the interaction or guided task, review the expected outcome, answer the knowledge check, prepare the deliverable, and then complete the exit validation.

Create a dedicated evidence folder for the program. Organize it by phase or assignment and use clear version names. Keep the source file, working file, final submission, validation result, and reviewer feedback together. This habit will save time later when you prepare the testing, cutover, and final capstone packs.

When a screenshot walkthrough is available, use it to confirm navigation and field-level actions. Do not copy values without understanding why they are used. Where a screenshot is still being added, the written action, expected result, and evidence requirement remain your guide.

Finally, ask for clarification when a business decision is genuinely unclear. In an implementation, guessing silently is usually more dangerous than recording an open question with an owner and due date.

---

## Slide 16 — What good participation looks like

**Time:** 27:00–28:15  
**On-screen content:**

- Be curious and evidence-led
- Explain assumptions
- Reconcile before approval
- Test expected and unexpected behavior
- Think about the next role in the process

**Narration:**

Good participation in this workshop is active, evidence-led, and honest.

Do not be concerned if your first answer is not perfect. Be prepared to explain your reasoning, test the result, and revise the work when the evidence shows a problem.

State your assumptions. Reconcile figures before presenting them. Test what should be allowed and what should be prevented. Consider both the normal process and the exception process.

When you finish an activity, think about the next person in the chain. Can the developer understand the requirement? Can the tester reproduce the result? Can the planner use the form safely? Can support diagnose a failure? Can an approver see enough evidence to make a decision?

That way of thinking is one of the most valuable outcomes of the program. Oracle knowledge matters, but successful implementations also depend on clear decisions, controlled handoffs, reliable evidence, and accountable ownership.

---

## Slide 17 — Brief dashboard reveal

**Time:** 28:15–29:30  
**Visual:** Leave PowerPoint and show only the dashboard home screen. Do not open a lesson.

**Presenter actions:**

1. Open the Learning Lab dashboard.
2. Point to the Implementation Journey.
3. Point to the current phase and progress summary.
4. Point to the 90-Day Program Plan.
5. Scroll only far enough to show the lifecycle and phase directory.
6. Return to the top without opening a module.

**Narration:**

Let me finish by showing you where the program begins.

This is the Learning Lab dashboard. The Implementation Journey contains the 27 phases we have just discussed. At the top, you can see your current phase, lesson progress, and the action to continue your work.

The 90-Day Program Plan gives you the complete calendar, assignments, monthly-cycle coverage, stage milestones, and completion criteria. Use that page whenever you need to understand how the current lesson contributes to the wider program.

Further down, the lifecycle groups the phases into Discover, Design, Build, Validate, Deploy, and Operate. The phase directory allows you to review the curriculum, while your normal learning sequence should still follow the program dependencies.

I am intentionally not opening a module in this video. In the next video, we will walk through the interface properly. We will look at lesson navigation, guided activities, screenshot walkthroughs, validation, completion controls, progress tracking, and how to return to the dashboard.

For now, the only action you need to remember is this: review the program plan, then begin with Phase 01.

---

## Slide 18 — Closing

**Time:** 29:30–30:00  
**On-screen content:**

- Next video: Learning Lab UI walkthrough
- Then begin Phase 01: Discovery and Requirement Gathering

**Narration:**

That completes the introduction to the 90-day workshop.

In the next video, we will take a detailed tour of the Learning Lab and show you exactly how to move through a module. After that, you will be ready to begin Phase 01 and create the first item in your implementation evidence portfolio.

Thank you, and I will see you in the UI walkthrough.

---

## Suggested PowerPoint design notes

- Keep most slides to one headline and four or five short points.
- Use the six stage colors consistently across the timeline slides.
- Show the Apex scenario as a simple flow: Sales → Inventory → Production → Cost and Finance.
- Use one 90-day horizontal timeline rather than placing all 27 phases on a single crowded slide.
- Split the Build stage into two slides, as scripted, because it carries the largest content load.
- On the assignments slide, show nine compact cards or a numbered timeline; keep acceptance details in the narration.
- Avoid screenshots until Slide 17. The dashboard reveal should feel like a transition into the next video.
- Do not animate every bullet. Use only simple fades or stage-by-stage highlighting.
