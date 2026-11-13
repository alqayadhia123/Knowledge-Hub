# Implementation Roadmap

## Phase 0 — Repository and product baseline
- [x] Verify repository and write permission
- [x] Add public-safe project documentation
- [x] Finalize product brief and visual direction (AI Research Hub)
- [ ] Confirm repository visibility is Private before adding non-public content

## Phase 1 — Foundation
- [ ] Select framework versions and package manager
- [ ] Establish linting, formatting, type checks, and tests
- [ ] Define environment variable contract and safe example file
- [ ] Add CI without secrets or paid dependencies

## Phase 2 — Identity and authorization
- [ ] Select identity provider
- [ ] Implement server-side session validation
- [ ] Define roles and permissions
- [ ] Add RLS policies and positive/negative authorization tests
- [ ] Protect Admin routes and API operations

## Phase 3 — Core workspace and agent experience
- [ ] Responsive bilingual application shell and dashboard
- [ ] Projects and milestones
- [ ] Courses, workshops, lessons, and learning records
- [ ] Research sources, citations, and verification states
- [ ] Tools and resource catalogue
- [ ] Agent Reality ChatGPT conversation interface and user-scoped history
- [ ] Separate protected Agent Admin settings and controls

## Phase 4 — Knowledge management and agent runtime
- [ ] Private document storage
- [ ] Classification and metadata
- [ ] Search and filtering
- [ ] Authorization-aware retrieval and classification filtering
- [ ] Server-side agent orchestrator and mock provider
- [ ] Select and review a model provider before real integration
- [ ] Optional vector retrieval after model selection and security review

## Phase 5 — Admin and operations
- [ ] Content management workflows
- [ ] Audit log viewer
- [ ] Export and backup procedures
- [ ] Accessibility, localization, and security review
- [ ] Deployment plan and explicit approval

## Definition of done
A feature is complete only when implemented, tested, reviewed, documented, and its access-control behavior is verified. Planned targets are not reported as achieved results.
