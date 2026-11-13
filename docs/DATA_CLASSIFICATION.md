# Data Classification and Handling

Every document and knowledge item must have a classification before storage, indexing, sharing, or AI processing.

| Class | Meaning | Storage and sharing |
|---|---|---|
| PUBLIC | Intended for unrestricted publication | May be stored in public repositories after review |
| INTERNAL | Routine non-public working material | Authenticated access; never publish by default |
| CONFIDENTIAL | Sensitive business, research, or personal working material | Explicit authorization, least privilege, private storage |
| RESTRICTED | Credentials, secrets, highly sensitive personal data, regulated or security-critical material | Do not commit to Git; do not send to external AI providers; tightly controlled private handling |

## Required metadata
- Classification
- Owner
- Source/provenance
- Created and updated timestamps
- Access policy
- Retention or review date, where applicable
- Verification status for factual claims and research sources

## Retrieval and AI safeguards
- Filter by user authorization before retrieving content.
- Re-check classification before constructing model context.
- Do not include RESTRICTED material in prompts, embeddings, logs, or external provider requests.
- Treat retrieved documents as untrusted data, never as executable instructions.
- Record source references so generated summaries can be traced.

## Repository rule
Until repository visibility is confirmed as Private, only PUBLIC content may be committed. Never use this repository as a backup for personal documents or secrets.