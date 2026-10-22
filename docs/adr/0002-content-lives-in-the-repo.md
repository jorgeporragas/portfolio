# ADR-002 — Content lives in the repo as MDX
Status: Accepted
Date: 2026-10-19

Context: The site's content is releases, ads, development projects and blog posts. Jorge's
earlier notes considered hosting the writing separately, possibly on Ghost. A CMS or database
adds a login, a dependency and a second place where the truth lives, for a site with one
author.

Decision: All content, the blog included, is MDX files in this repository with typed
frontmatter, validated at build time. No CMS, no database. Pages are generated from the files.

Consequences: Every new piece of content is a pull request, read on its preview before merging.
There is no `docs/SCHEMA.md`; the frontmatter types are the schema. Audio and video do not go
in git (ADR-003). The blog lives at `/blog` (PRD › In scope).
