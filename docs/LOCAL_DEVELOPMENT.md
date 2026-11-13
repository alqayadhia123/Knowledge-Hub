# Local Development

## Requirements
- Node.js 20.x
- npm 10 or compatible

## Run the prototype

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validation

```bash
npm run lint
npm run build
```

## Current boundaries

- The dashboard, navigation, language switch, theme switch, project search, and chat interaction are browser-side prototype behavior.
- Chat responses are static demo responses. No live model provider, API key, or private knowledge retrieval is configured.
- The `/admin` page is a placeholder notice, not an authenticated admin console.
- No database, identity provider, RLS policies, or object storage have been provisioned.
- Do not add real user records, credentials, or confidential research materials to this public repository.
- No production deployment or paid service is configured.
