# ADR-004 — Merging to main is the deploy; no version tags
Status: Accepted
Date: 2026-10-18

Context: An app ships releases; a website has one live version. Vercel deploys every push to
the production branch and builds a preview for every pull request.

Decision: Production is whatever `main` holds: every squash merge deploys jorgeporragas.com,
and nothing else deploys production. Each pull request is checked on its Vercel preview before
merging. The site gets no version tags; git history is its changelog.

Consequences: Jorge's merge is the deploy decision, so the preview is the last check. Agent
settings deny production deploys and merging. Rollback is a revert pull request.
