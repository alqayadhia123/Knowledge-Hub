# Knowledge Hub

**Personal Knowledge & Projects Workspace** — a bilingual (Arabic/English), responsive knowledge platform for organizing projects, learning materials, research references, tools, and verified records.

> Initial repository scaffold. This repository currently contains public-safe documentation only. Do not commit credentials, private records, personal documents, restricted research data, or production configuration.

## Product scope

- Project portfolio and delivery tracking
- Courses, workshops, lessons, and learning notes
- Research library with source verification and APA-style references
- Tools and resources catalogue
- Cybersecurity and AI learning lab
- Document and knowledge management
- Assessments, milestones, and achievement records
- Separate, protected administration area
- Arabic RTL and English LTR; responsive mobile and desktop layouts
- **Agent Reality ChatGPT** — planned bilingual research and knowledge assistant with authorization-aware retrieval, source references, and a protected Admin configuration area

## Agent identity

- Display identity: **ChatGPT – Abdulbari Ahmed Alqayadh**
- Agent name: **Agent Reality ChatGPT**
- Host platform: Knowledge Hub
- Product and security contract: [docs/AGENT_REALITY_CHATGPT.md](docs/AGENT_REALITY_CHATGPT.md)

The agent is currently specified, not connected to a live model provider. No API credentials, paid model services, or production endpoints are included.

## Initial project catalogue

| Project | Purpose |
|---|---|
| VoiceGuard Enterprise Agent | Evaluation framework and prototype for enterprise voice agents |
| SANAD Research Project | Evaluation of phishing-resistant digital identity lifecycle controls for smart transportation |
| Personal Knowledge Platform | This Knowledge Hub |

## Proposed architecture (subject to implementation review)

- Web: Next.js + TypeScript
- API: Next.js server handlers initially; FastAPI only where separate Python processing is justified
- Data: PostgreSQL
- Identity: Supabase Auth or another explicitly selected OIDC provider
- Authorization: server-side checks and database row-level security (RLS)
- File storage: private object storage with short-lived access links
- Search: PostgreSQL full-text search; add vector search only after selecting and validating an embedding model
- Agent: server-side orchestrator, authorization-aware retriever, provider adapter, and mock provider for tests
- Observability: structured logs and auditable administrative events

No service has been provisioned and no deployment has been performed by this scaffold.

## Security baseline

- Deny access by default; enforce authorization on the server and at the data layer.
- Hiding an Admin link is not access control.
- Keep secrets in managed environment variables; never commit them.
- Classify content before ingestion or retrieval.
- Do not send RESTRICTED content to external AI services.
- Apply authorization before retrieval and before constructing model context.
- Log administrative changes without logging secrets or unnecessary sensitive content.
- Backups, retention, and export controls must be designed before production use.
- No paid services or production deployment without explicit approval.

See [SECURITY.md](SECURITY.md), [data classification](docs/DATA_CLASSIFICATION.md), [architecture](docs/ARCHITECTURE.md), and [Agent Reality ChatGPT](docs/AGENT_REALITY_CHATGPT.md).

## Local development

See [docs/LOCAL_DEVELOPMENT.md](docs/LOCAL_DEVELOPMENT.md) for Node.js requirements and commands to run the prototype locally.

## Repository status

- [x] Repository verified and write access confirmed
- [x] Public-safe initial documentation
- [x] Product brief and visual direction approved (AI Research Hub)
- [ ] Confirm repository visibility is Private before adding non-public content
- [ ] Select framework versions and establish the application scaffold
- [ ] Implement authentication, authorization, and RLS
- [ ] Build responsive application shell, Agent chat, and protected Admin workflows
- [ ] Implement and test the model-provider adapter and authorization-aware retrieval
- [ ] Add automated tests, security review, and deployment plan

## Working method

Use **PATCH-FIRST**: inspect → understand → plan → smallest safe patch → test → review diff → report. Never claim a test or deployment succeeded unless it was actually run and verified.
