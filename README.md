# jorgeporragas.com

## What this is

This is the code behind my website, jorgeporragas.com, where I keep my work in sound, software
and other endeavors. I use the site as an opportunity to design and build a platform where I can
showcase my work the way I want to. Building it is part of the work.

I’m currently updating the old version based on my new design system.

## In case you want to run it

You’ll need Node.js 22.12 or newer and npm. Then:

```powershell
git clone https://github.com/jorgeporragas/portfolio.git
cd portfolio
npm ci
npm run dev
```

Open http://localhost:3000 to see the site.

Before I open a pull request, I run the same four checks CI does: `npm run lint`,
`npm run typecheck`, `npm test` and `npm run build`. If one goes red, I fix it instead of
skipping it.

## Finding your way around

Most of the thinking lives in `docs/`. A quick map:

| If you want to know… | Look at |
| --- | --- |
| What the site is for, who it’s for, and what it will never do | [docs/PRD.md](docs/PRD.md) |
| How it looks, and which version of my design system it follows | [docs/DESIGN.md](docs/DESIGN.md) |
| Why it’s built the way it is | [docs/adr/](docs/adr/) |
| How hosting and the domain are set up | [docs/runbooks/vercel.md](docs/runbooks/vercel.md) |
| What a release, ad, project or post file looks like | [src/content/schema.ts](src/content/schema.ts) |
| The house rules for writing code here | [CLAUDE.md](CLAUDE.md) |
| What I’m working on next | [Issues](https://github.com/jorgeporragas/portfolio/issues) and [milestones](https://github.com/jorgeporragas/portfolio/milestones) on GitHub |

## How I work on it

I design the site myself, but I run the repo the way a real team would, for the practice. Every
change goes through a pull request. CI checks it, Vercel builds a preview I click through on my
phone, and merging to `main` is what ships it.

The process has a name, FLOW, and its rules live in
[.claude/rules/flow.md](.claude/rules/flow.md). It’s slower than pushing straight to `main`,
which is the point.

## License & Copyright
### © 2026 Jorge Porragas. All Rights Reserved.

This repository is public for portfolio and demonstration purposes only. The source code, design, and assets may not be copied, cloned, distributed, or used for any commercial or personal projects without explicit permission.
