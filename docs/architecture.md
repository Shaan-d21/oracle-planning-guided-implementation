# Application architecture

This project starts as a frontend-first Next.js application. Next.js is intentionally
used as a single application boundary so server APIs can be added later without
introducing a separate backend prematurely.

## Current phase

- React and Next.js user interface
- TypeScript domain definitions
- Course content stored as typed source data
- Ordinary image files for future screenshots and diagrams
- Next.js Route Handler backend foundation with versioned API conventions
- Storage-independent contracts for identity, progress, submissions, and chat
- Deterministic workshop knowledge retrieval for a future chatbot
- No authentication, database connection, external API, or live AI dependency

## Planned growth

When multi-user requirements are approved, introduce capabilities in this order:

1. Confirm a Node-capable deployment target and the available relational database.
2. Integrate WordPress or another approved provider as the identity authority.
3. Add a database adapter for learner records, progress, attempts, and evidence metadata.
4. Add object storage only when learner evidence uploads are approved.
5. Expose the AI chatbot only after authentication, rate limiting, and content review.
6. Add background jobs only if reporting, exports, or media processing require them.

Next.js Route Handlers are the default API boundary for this application. FastAPI
should be introduced only if substantial Python-specific processing or a separately
owned shared service creates a concrete need for it.

## Product boundaries

The learning experience separates two related journeys:

- The recurring monthly planning cycle for planners and business users.
- The implementation lifecycle for consultants, developers, and architects.

Course content, simulations, and presentation components must remain separate so
content can be updated without rewriting the interface.
