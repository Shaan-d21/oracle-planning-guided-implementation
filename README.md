# BISP Production & Sales Planning

A modern, frontend-first learning application for Oracle Planning implementation
and operational planning training.

## Current scope

- One 90-day workshop connecting the 27-phase Implementation Journey with ten
  monthly-cycle activities and a final operational capstone.
- Track-specific local progress with migration from the original MVP storage format.
- A reusable module frame for lessons, prerequisites, validation, and exit gates.
- Interactive lesson modules across all 27 implementation phases.
- A corrected 27-phase implementation catalog and a defined 10-module monthly cycle.
- A basic Next.js backend foundation with versioned health and catalog endpoints,
  validation contracts, storage ports, and future chatbot knowledge retrieval.

## Temporary testing mode

All 27 implementation phases are currently open for navigation and content review.
Set `TESTING_UNLOCK_ALL_PHASES` to `false` in `src/config/learning-mode.ts` before
production launch to restore prerequisite sequencing.

## Technology

- Next.js
- React
- TypeScript
- Modern CSS
- Typed, data-driven course content

The project currently has no database or authentication service. Next.js Route
Handlers are the default backend boundary; a separate FastAPI service is not planned
unless a future Python-specific requirement justifies it.

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
- `docs/backend-foundation.md`
- `docs/content-model.md`

The original HTML concept file is treated as a requirements reference and remains
unchanged outside this project directory.
