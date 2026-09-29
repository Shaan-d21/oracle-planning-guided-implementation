# Backend foundation

The application uses Next.js Route Handlers as its backend-for-frontend boundary.
There is no FastAPI service, database connection, authentication flow, file upload,
or live AI endpoint in the current foundation.

## Implemented now

- Versioned API responses under `/api/v1`.
- Static-compatible health and course-catalog endpoints.
- Validated, server-only environment configuration.
- Safe JSON parsing, payload-size limits, validation errors, and generic server errors.
- Zod contracts for future progress, submission, identity, and chat requests.
- Repository ports that keep storage and WordPress identity choices replaceable.
- A deterministic course knowledge index and search function for future chatbot retrieval.

## Current endpoints

- `GET /api/v1/health` reports the backend boundary and disabled/configured capabilities.
- `GET /api/v1/catalog` exposes the versioned course, track, module, and lesson catalogue.
- `GET /api/health` remains as a deprecated compatibility endpoint.

Both v1 endpoints are build-time GET responses so `npm run build:static` remains
valid. They do not prove database, WordPress, or AI connectivity.

## Deliberately not implemented

- Authentication, cookies, sessions, or WordPress token exchange.
- Database or ORM selection.
- Server-side progress persistence.
- Evidence-file uploads or object storage.
- Public chat endpoints or paid model calls.
- Instructor and administration APIs.

Client-supplied user IDs must never become the source of authority. When identity
is added, the backend will derive the learner ID from the verified session and pass
that value to the repository layer.

## Deployment boundary

`npm run build:static` creates files that can be served by ordinary cPanel hosting,
but it cannot execute request-time Route Handlers. Dynamic persistence, WordPress
identity, and chatbot endpoints require the application to run on a Node-capable
host with `npm run build` and `npm run start`, or require a separately deployed API.

## Next decision gate

Before adding persistence, confirm:

1. Whether the target cPanel account can run a supported Node.js process.
2. Whether the training app will run on the WordPress domain or a dedicated subdomain.
3. Whether WordPress is the identity and enrollment authority.
4. Whether the available relational database is MySQL or PostgreSQL.

After those decisions, implement the identity adapter and database repository
without changing the domain contracts or frontend lesson content.
