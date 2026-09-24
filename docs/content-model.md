# Course content model

Every module uses a shared learning frame for navigation, progress, prerequisites,
validation feedback, and exit gates. Typed course data remains separate from the
presentation layer. Activity workspaces can be specialized where a realistic
exercise needs domain-specific interactions.

Supported step types are:

- Concept
- Guided screenshot
- Wizard
- Simulation
- Assessment
- Evidence submission
- Exit gate

The target learner flow is:

`Understand -> Observe -> Follow -> Practice -> Validate -> Submit evidence -> Assess`

Screenshot steps will eventually include the Oracle product/release, user role,
navigation path, callouts, expected result, common mistakes, and accessibility text.

## Track boundaries

- `implementation` contains the 27-phase consulting and delivery lifecycle.
- `planning-cycle` contains the 10-step recurring operational planning cycle.
- Progress, active lessons, and exit gates are stored independently per track.
- Discovery, current-state, and future-state lessons do not use artificial Oracle
  screenshots because they occur before application configuration.
