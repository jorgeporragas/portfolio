# PRD — jorgeporragas.com

What the site is and what it will never do. Visual rules live in [DESIGN.md](DESIGN.md); work in
progress lives in GitHub issues.

## User

**Primary:** a creative or hiring lead at a design-forward company (Embark Studios, Nothing) who
lands on the site from a link Jorge sent and decides within a few minutes whether he is worth a
conversation. They are not filling a fixed role: they are judging whether his taste and range fit
the team, across sound, software, or the work where the two meet.

**Also served, with the same care:** artists and labels hiring a producer or engineer, agencies
hiring for advertising audio, people evaluating his development work, and readers of his blog.
The primary user decides what comes first on the home page, not which sections get the care.

What they do today without the site: read a CV, a LinkedIn profile and a Spotify link, separately.

## Problem

Each platform presents Jorge's work its own way, and none shows the depth he works at or the taste
that drives it. A lead sees outputs, never the choices behind them, and never one person behind
the music, the code and the writing.

**Thesis:** taste is the constant; the discipline varies. The site shows it in the work, and is
itself the proof: designed and coded from scratch, held to the same standard as everything on it,
down to load speed, the 404 page and how it reads on a phone.

## Core loop

1. **Land.** From a link, the visitor grasps who Jorge is and the thesis within seconds.
2. **Go deep on one piece.** They hear or see it, with the decisions behind it.
3. **Sense the range.** The same standard holds in another field.
4. **Get in touch** by email, `hola@jorgeporragas.com`. Platform links (Spotify, GitHub and
   others) stay available on every piece, as secondary actions.

## Domain model

**Work** is anything Jorge made for someone to hear or see. Every work has a title, a date, a
summary, Jorge's roles, its artefacts, its links, and a body that tells the decisions behind it.

| Entity | Is a | Adds |
|---|---|---|
| **Release** | Work | Artist, format (single, EP, album, or a track on someone else's release, named), cover, playback |
| **Ad** | Work | Brand, agency, the spot itself (audio or video), playback |
| **Project** | Work | Stack, repository, status, screens |
| **Post** | — | A blog entry of any kind: title, date, body; may reference the works it discusses |
| **Credit** | — | One person in one role on one work. Jorge's roles are credits that name him |
| **Link** | — | One platform and URL where a work also lives |

- A work has many credits and many links; a post references zero or more works.
- A credit names a role the way the platforms do: co-producer stays co-producer.
- **Playback** is a property of each release or ad: `player` (Jorge's own player, hosted media),
  `embed` (the platform's player, loaded on click) or `links` (platform links only).
- **Slim** is Jorge's artist name. Slim's releases are releases like any other, credited to Slim
  and linked to Slim's own channels.

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js (App Router), TypeScript | Jorge's active web stack and the industry standard, which matters on a site that is itself a showcase. Server components ship pages as HTML |
| Styling | Tailwind CSS 4, reading the design system's web tokens | One token source; Tailwind maps it to utilities |
| Content | MDX files in the repo, typed frontmatter validated at build | Each piece of content is a pull request with a preview. No CMS, no database |
| Motion | CSS for the no-JavaScript base; Motion for interruptible springs | Both read the design system's spring tokens |
| Hosting | Vercel | A preview for every pull request; merging is the deploy |
| Media | Object storage outside git | Audio and video are too large for git history. Provider not chosen yet |

Rejected: Astro. A better fit on paper for a content site, but the gap is small with server
components, and the site should show the standard stack.

## In scope (V1)

**Pages and URLs**

| URL | Page |
|---|---|
| `/` | Home: brings all three sections together |
| `/audio` | Audio index |
| `/audio/music`, `/audio/music/[slug]` | Releases |
| `/audio/advertising`, `/audio/advertising/[slug]` | Ads |
| `/dev`, `/dev/[slug]` | Development projects (case studies) |
| `/me` | About |
| `/blog`, `/blog/[slug]` | Blog posts, reached from Me |

Today's URLs (`/`, `/audio`, `/dev`, `/me`) keep working without redirects.

**Behaviour**

- Every work page shows its artefacts, Jorge's roles, the decisions behind it, its links, and the
  email action.
- Jorge's player plays hosted media, works by keyboard, and is built on a native `<audio>` element.
- Embeds load only when the visitor presses play; before that, a placeholder in the design system.
- Light and dark modes, both designed, following the visitor's system setting.
- Each section has its own atmosphere: Me sage, Audio magenta, Development teal (design system
  D-017).
- An RSS feed for the blog, a social preview image for every page, and a designed 404 page.
- CI on every pull request: FLOW's checks, lint, type-check, build, link check, Lighthouse budgets
  (performance, accessibility, best practices, SEO) and an automated accessibility scan. The
  thresholds live in the CI configuration.

**Content at launch**

- Every release and ad whose hosting rights Jorge has confirmed, piece by piece.
- Two development case studies: sticky.md and this site.
- The About text and one or two blog posts.
- Client work appears only with the client's agreement.

## Permanent vetoes

1. **No autoplay with sound.** Nothing makes noise until the visitor asks for it.
2. **No runtime scraping.** Everything the site shows lives in the repo or in Jorge's own storage.
3. **No third-party tracking**, and nothing that would require a cookie banner.
4. **Content never depends on JavaScript.** Text, images, links and a playable version of each
   piece work without it; effects and the custom player enhance that base. Nothing starts hidden
   and waits for JavaScript to reveal it.
5. **No invented content:** no fabricated metrics or testimonials, no placeholder copy, no stock or
   generated imagery standing in for real artefacts.

## Build phases

Each phase is a GitHub milestone with the same name.

1. **Foundation.** Close the security findings, install FLOW and CI. The live site keeps running
   unchanged.
2. **Brand** (design-system repo). The system's name, voice and tone, image treatment, and
   hand-drawn masters of the three marks.
3. **Content.** Inventory and write everything listed under *Content at launch*, including the
   release data and cover art that end the scraping.
4. **Design.** Wireframes on one grid in grey, then high fidelity in both modes for each page type:
   home, section index, release, ad, case study, blog post.
5. **Build.** Tokens, shared components, pages, content, player and motion.
6. **Launch.** CI budgets green, accessibility pass, rights confirmed, then the new site replaces
   the old one.

## Deployment

- **Production:** jorgeporragas.com on Vercel. Every merge to `main` deploys automatically; nothing
  else deploys production.
- **Previews:** one per pull request, checked before merging.
- **Releases:** none. The site has one live version, the merged `main`; git history is the
  changelog.
- **Rollback:** revert the pull request.
- Settings that live outside the repo (the Vercel project, the domain, DNS) belong in
  `docs/runbooks/`.
