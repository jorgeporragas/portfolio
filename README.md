# jorgeporragas.com

The source of [jorgeporragas.com](https://www.jorgeporragas.com): Jorge Porragas's work in
sound, software and writing, on a site designed and built from scratch.

The site is being rebuilt as the first public application of Jorge's design system. Until the
rebuild launches, `main` serves the previous design.

## Run it locally

Requires Node.js 22 and npm.

```powershell
git clone https://github.com/jorgeporragas/portfolio.git
cd portfolio
npm ci
npm run dev
```

Then open http://localhost:3000.

Before opening a pull request: `npm run lint`, `npm run typecheck` and `npm run build`. CI runs
the same checks.

## Where things are

| To know | Read |
|---|---|
| What the site is, who it's for, what it will never do | [docs/PRD.md](docs/PRD.md) |
| How it looks, and the design-system version it follows | [docs/DESIGN.md](docs/DESIGN.md) |
| Why it's built the way it is | [docs/adr/](docs/adr/) |
| How hosting and the domain are set up | [docs/runbooks/vercel.md](docs/runbooks/vercel.md) |
| Rules for writing code here | [CLAUDE.md](CLAUDE.md) |
| What's planned and in progress | [Issues](https://github.com/jorgeporragas/portfolio/issues) and [milestones](https://github.com/jorgeporragas/portfolio/milestones) |

Work follows [FLOW](.claude/rules/flow.md): every change is a pull request, checked by CI and on
its Vercel preview, and merging to `main` deploys it.

## License & Copyright
### © 2026 Jorge Porragas. All Rights Reserved.

This repository is public for portfolio and demonstration purposes only. The source code, design, and assets may not be copied, cloned, distributed, or used for any commercial or personal projects without explicit permission.
