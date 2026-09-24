# BISP Production & Sales Planning

A modern, frontend-first learning application for Oracle Planning implementation
and operational planning training.

## Current scope

- Two explicitly separated paths: Implementation Journey and Monthly Planning Cycle.
- Track-specific local progress with migration from the original MVP storage format.
- A reusable module frame for lessons, prerequisites, validation, and exit gates.
- Complete interactive modules for Discovery, Current-State Assessment,
  Future-State Design, Requirement Traceability, Solution Architecture, and
  Application & Dimension Design.
- A corrected 27-phase implementation catalog and a defined 10-module monthly cycle.

## Temporary testing mode

All 27 implementation phases are currently open for navigation testing. Phases
01–06 contain interactive learning content; Phases 07–27 display clearly marked
preview pages and do not record completion. Set `TESTING_UNLOCK_ALL_PHASES` to
`false` in `src/config/learning-mode.ts` to restore prerequisite notices and hide
planned-phase preview access.

## Technology

- Next.js
- React
- TypeScript
- Modern CSS
- Typed, data-driven course content

The project intentionally starts without a database, authentication service, or
separate backend. FastAPI and PostgreSQL will be introduced when shared learner
progress, evidence submission, and instructor workflows are required.

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npm run check
```

This runs linting, TypeScript validation, and a production build.

## Project documentation

- `docs/architecture.md`
- `docs/content-model.md`

The original HTML concept file is treated as a requirements reference and remains
unchanged outside this project directory.
