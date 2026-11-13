# Security Policy

## Scope
This repository is the source for a personal knowledge and project-management platform. Security controls are required before private data or production workloads are introduced.

## Mandatory controls
1. Authentication: use a maintained identity provider; validate sessions server-side.
2. Authorization: deny by default. Check every server/API operation and database policy. Frontend visibility is not access control.
3. Database: enable and test Row Level Security (RLS) for every user-scoped table, including denied access paths.
4. Secrets: use deployment-provider secret storage. Never commit API keys, tokens, passwords, service-role keys, private URLs, or .env files.
5. Files: private buckets by default; validate file type and size; use short-lived signed URLs; enforce ownership and classification.
6. AI retrieval: authorize before retrieval and before model-context construction. RESTRICTED data must not be sent to external model providers.
7. Audit: record actor, action, target, timestamp, and outcome for privileged changes. Do not log credentials.
8. Dependencies: review and pin dependencies; run static checks and security scanning in CI.
9. Backups: document encryption, access controls, retention, and restore testing before production.
10. Deployment: no paid resources or production deployment without explicit approval.

## Data handling
See docs/DATA_CLASSIFICATION.md. Until repository visibility is confirmed as Private, commit public-safe source and documentation only.

## Reporting
Do not publish exploit details, credentials, or sensitive evidence in public issues. Use private vulnerability reporting if enabled, or contact the repository owner privately.