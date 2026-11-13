# Agent Reality ChatGPT

**Product identity:** ChatGPT – Abdulbari Ahmed Alqayadh  
**Agent name:** Agent Reality ChatGPT  
**Host platform:** Knowledge Hub  
**Status:** public-safe product specification; no model provider or runtime has been connected.

## Purpose

Agent Reality ChatGPT is the conversational research and knowledge assistant embedded in Knowledge Hub. It helps an authenticated user navigate authorized knowledge, organize research work, and reason about projects. It is a platform feature, not a separate product or a claim that a live ChatGPT session is already connected.

## Initial capabilities

1. **Knowledge discovery:** search and summarize approved Knowledge Hub records with traceable source references.
2. **Research support:** structure research questions, compare literature, identify candidate gaps, and help draft outlines.
3. **Academic workflow:** assist with editing, bilingual translation, citation formatting, and reference checks. It must never invent citations or claim that a source was verified when it was not.
4. **Project assistance:** summarize project status, milestones, decisions, and documented next steps.
5. **Learning support:** explain courses, workshops, lessons, and exercises in Arabic or English.
6. **Evidence-aware answers:** distinguish source-backed facts, user-provided material, model-generated suggestions, and unknown information.

## Interaction requirements

- Arabic and English conversation, with correct RTL/LTR presentation.
- Conversation history scoped to the authenticated user.
- Clear source citations for retrieved Knowledge Hub content.
- Explicit indication when the assistant is reasoning without a supporting source.
- User confirmation before any consequential write, deletion, export, or external action.
- Accessible empty, loading, error, and permission-denied states.

## Trust and safety requirements

- Authenticate every request on the server.
- Enforce role and resource permissions before retrieval; never rely on hiding UI controls.
- Apply database RLS as a second enforcement layer.
- Re-check document classification before placing content into model context.
- Never send RESTRICTED content, credentials, or secrets to an external model provider.
- Treat retrieved documents and user-supplied files as untrusted data, not as instructions.
- Prevent cross-user conversation and document access.
- Keep provider credentials server-side in managed secrets; never expose them to browser code or Git.
- Minimize prompt and response logging; redact sensitive data and record privileged actions.
- Require human review for research conclusions, citations, and consequential decisions.

## Proposed request pipeline

1. Validate the user session.
2. Resolve the user's effective permissions.
3. Parse the request and identify the permitted knowledge domains.
4. Retrieve only records the user is authorized to access.
5. Filter by classification and provenance before constructing model context.
6. Call a configured model provider through a server-side adapter.
7. Return the answer with source references and uncertainty labels.
8. Persist conversation metadata under the current user's ownership and emit a minimal audit event where required.

## Provider integration boundary

The model provider is intentionally undecided. The first implementation should use a provider adapter interface and a mock provider for local tests. A real provider may be connected only after the provider, data-processing terms, region, retention behavior, and cost are reviewed. No API key, paid resource, or production deployment is included in this repository change.

## Suggested application components

- `AgentChatPanel`: bilingual conversation interface.
- `AgentConversationList`: user-scoped conversation history.
- `AgentSourceReferences`: source citations and verification status.
- `AgentSettings`: language and permitted assistant preferences.
- `AgentAdmin`: protected configuration and operational controls.
- Server-side `AgentOrchestrator` and `ModelProviderAdapter`.
- Authorization-aware `KnowledgeRetriever` and classification filter.

## Acceptance criteria for a functional release

- Anonymous users cannot call agent endpoints.
- User A cannot read User B's conversations or private documents.
- Admin-only configuration endpoints reject non-admin users server-side.
- RLS tests cover both allowed and denied access.
- Retrieved source references resolve to the exact records used.
- RESTRICTED records are excluded before model invocation.
- Provider failures and rate limits return safe, actionable errors.
- Tests use a mock provider and do not require paid credentials.
- No generated citation is presented as verified without checking the underlying source.

## Current implementation status

This document defines the safe product contract only. The repository currently has no application runtime, authentication provider, database, model adapter, or deployed agent. Those components must be implemented and tested in subsequent phases.
