# Vercel and the domain

How jorgeporragas.com is hosted, and the state that lives outside this repo. Anything marked
`[founder]` is only visible in a dashboard; #8 fills it in.

## The project

| Setting | Value |
|---|---|
| Vercel project | `sitio-portafolio`, in the `jorgeporragas-1587s-projects` scope |
| Plan | `[founder]` (Hobby covers personal, non-commercial use only) |
| Git integration | GitHub `jorgeporragas/portfolio`: a preview per pull request, a production deploy per push to `main` (ADR-004) |
| Commit status | `Vercel`, required by the `protect-main` ruleset |
| Environment variables | None. The site reads none |
| Node.js version | `[founder]`. CI builds on Node 22; Vercel's project setting should match |

## The domain

| Setting | Value |
|---|---|
| Domain | `jorgeporragas.com` |
| Registrar | `[founder]` |
| DNS managed at | `[founder]` |
| Mail for `hola@jorgeporragas.com` | `[founder]` |

## Rolling back

1. Revert the pull request that broke production, and merge the revert. Production redeploys
   from `main`.
2. Only if production must recover before a revert can merge: in the Vercel dashboard, open
   *Deployments*, find the last good production deployment and use *Instant Rollback*. Then
   still revert on `main`; until you do, the next merge redeploys the broken code.
