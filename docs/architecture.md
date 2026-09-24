# Initial architecture

This project starts as a frontend-first Next.js application. Next.js is intentionally
used as a single application boundary so server APIs can be added later without
introducing a separate backend prematurely.

## Current phase

- React and Next.js user interface
- TypeScript domain definitions
- Course content stored as typed source data
- Ordinary image files for future screenshots and diagrams
- No authentication, database, external API, or AI dependency

## Planned growth

When multi-user requirements are approved, introduce capabilities in this order:

1. FastAPI as the application API boundary.
2. PostgreSQL for users, track progress, attempts, and evidence metadata.
3. Authentication through the organization's OIDC provider or another approved identity service.
4. Object storage for Oracle screenshots and learner evidence files.
5. Background jobs only if reporting, exports, or media processing require them.

Next.js route handlers remain appropriate for lightweight frontend-facing concerns
such as health checks. Business persistence and instructor workflows will move to
FastAPI when a shared backend is actually required.

## Product boundaries

The learning experience separates two related journeys:

- The recurring monthly planning cycle for planners and business users.
- The implementation lifecycle for consultants, developers, and architects.

Course content, simulations, and presentation components must remain separate so
content can be updated without rewriting the interface.
