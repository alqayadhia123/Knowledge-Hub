# Proposed Architecture

**Status:** design proposal; not implemented or deployed.

## Logical components
1. Web application: Next.js + TypeScript; responsive shell, Arabic RTL / English LTR, authenticated Admin routes.
2. Identity: selected OIDC-compatible provider (candidate: Supabase Auth). Provider choice remains open pending configuration and pricing review.
3. Application API: Next.js server handlers for core operations; FastAPI only where separate Python processing is justified.
4. Database: PostgreSQL with migrations, constraints, indexes, and RLS.
5. Object storage: private buckets; metadata in PostgreSQL; short-lived signed URLs.
6. Search: PostgreSQL full-text search initially. pgvector is optional pending embedding-model selection.
7. Audit: append-oriented audit events for privileged changes.
8. Operations: CI checks, structured logs, backup/restore procedures, and rollback documentation.

## Core domains
- Projects and milestones
- Courses, workshops, lessons, and learning resources
- Research sources and citations
- Documents and document metadata
- Tags and taxonomies
- Assessments and achievements
- Users, roles, and permissions
- Audit events and ingestion jobs

## Candidate data model
- profiles
- roles, permissions, role_permissions, user_roles
- projects, project_milestones
- courses, workshops, lessons
- sources, documents, document_chunks
- tags, document_tags
- assessments, achievements
- ingestion_jobs, audit_events

This is a conceptual inventory, not a migration. Define ownership, retention, constraints, and RLS policies before creating tables.

## Authorization flow
1. Validate identity and session server-side.
2. Resolve effective permissions.
3. Apply authorization filters before querying or retrieving content.
4. Enforce the same policy in PostgreSQL RLS.
5. Re-check classification and permissions before sending context to an AI provider.
6. Audit privileged mutations.

## Non-goals for the initial scaffold
- No automatic ingestion from Gmail, Telegram, or ChatGPT conversations.
- No production AI integration.
- No paid infrastructure.
- No public exposure of private documents.