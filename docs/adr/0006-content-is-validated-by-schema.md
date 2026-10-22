# ADR-006 — Content is validated against a schema, and Vitest runs the tests
Status: Accepted
Date: 2026-10-22

Context: ADR-002 puts all content in the repo as MDX with typed frontmatter. The Content phase
writes many such files by hand, and a misspelled field, a wrong date or a missing cover would
otherwise surface as a broken page on a preview, or not at all. The repo had no test runner.
The usual frontmatter parser, `gray-matter`, depends on js-yaml 3, which carried one of the
advisories found on 2026-10-18.

Decision: Frontmatter is parsed with `yaml` and validated against Zod schemas in
`src/content/schema.ts`, which encode PRD › Domain model. Objects are strict, so unknown keys
fail. `loadContent()` reports every problem in every file at once, and a test validates the
real `content/` folder on every pull request. Vitest runs the unit tests. How MDX bodies are
rendered is not decided here. Proposed in portfolio#23; the reasons above are the proposal's,
accepted when it merged.

Consequences: A content mistake fails CI with the file and field named, before its preview.
Jorge's roles on a work are derived from its credits (`selfRoles`), so they are written once.
Adding a role or a platform is a one-line schema change. `@types/node` moved from 20 to 22 to
match the Node version CI and the README use; Vitest 5 requires it.
