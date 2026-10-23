# CLAUDE.md — jorgeporragas.com

Rules for writing code here. FLOW's rules load alongside these (`.claude/rules/flow.md`). What
the site is: [docs/PRD.md](docs/PRD.md). How it looks: [docs/DESIGN.md](docs/DESIGN.md).

## Commands

- Install with `npm ci`. Run locally with `npm run dev`.
- Before opening a pull request, run `npm run lint`, `npm run typecheck`, `npm test` and
  `npm run build`. CI runs the same four; a red one is fixed, not skipped.
- Jorge's shell is PowerShell on Windows. Give commands that work there.

## Next.js

- Server components by default. Put `"use client"` on the smallest component that needs state,
  effects or browser APIs, never on a page, layout or template. The current `src/app/` pages
  that break this predate the rule and are replaced in the Build phase; don't extend them.
- Content arrives visible. Never render content with an initial hidden or off-screen state that
  waits for JavaScript (PRD veto 4); animate from the visible state instead.
- Never fetch from a third-party site to build or serve a page (PRD veto 2).
  `src/lib/getMetadata.ts` still does; #9 removes it. Don't extend it or copy it.
- No API routes or other server functions without an ADR. A public function is attack surface
  and spends the hosting quota.
- Images go through `next/image`.

## Public text

- Every word a visitor reads is Jorge’s: pages, content files, alt text, page titles and
  descriptions, the README. He writes it or approves it word for word. Draft only when he asks,
  and never ship visible text he hasn’t signed off on.
- It follows his voice:
  [design-system › brand/VOICE.md](https://github.com/jorgeporragas/design-system/blob/main/brand/VOICE.md).

## Content

- Each release, ad, project and post is one file, `content/<collection>/<slug>.mdx`, with YAML
  frontmatter. The file name is the URL slug: lowercase words joined by hyphens.
- The frontmatter's shape is `src/content/schema.ts`; change the schema there, never work around
  it in a page. Images a file names live under `public/`.
- Read content only through `loadContent()` in `src/content/load.ts`, which validates it.
- Never write placeholder content to make a page look finished (PRD veto 5).

## Tests

- Vitest, run with `npm test`. Tests sit next to the code as `*.test.ts`.
- Test logic: parsing, validation, anything that can be wrong without looking wrong. Visual
  quality is checked on the preview, not in unit tests.
- A new test is seen to fail before it is trusted: break the code it guards, watch it go red,
  restore.

## TypeScript

- `strict` stays on. No `any`, no `@ts-ignore`. Use `@ts-expect-error` only with a comment
  giving the reason.
- Never swallow an error. Log it with context, and render a fallback state a visitor can
  understand.

## Style

- ESLint (`eslint-config-next`) is the style authority. Fix findings; disabling a rule inline
  needs a comment giving the reason.
- Comments are in English and explain why, not what.
- Visible text uses typographic apostrophes and quotes (’ “ ”), never straight ones.

## UI

- Follow `docs/DESIGN.md` for every visual decision. The current UI predates it; new UI code
  uses design-system tokens only, never raw colours or sizes.

## Dependencies

- Commit `package-lock.json`; CI installs with `npm ci`.
- A new dependency is named and justified in its pull request. If it brings a new pattern, the
  rule for it goes in this file in the same pull request.

## Git

- Branches: `type/short-description` (`fix/contact-address`). Commits and pull request titles
  follow Conventional Commits. The body says why.
