# ADR-001 — Next.js, TypeScript and Tailwind on Vercel
Status: Accepted
Date: 2026-10-19

Context: The site is a content site: static pages, depth on every page, spring motion, strict
performance and accessibility budgets, content in the repo, a preview for every pull request,
and one maintainer. It already ran on Next.js 16, TypeScript and Tailwind 4 on Vercel. Astro
was the serious alternative: built for content sites and JavaScript-free by default, so its
performance ceiling is slightly higher for less effort. Next.js server components already ship
pages as HTML, which narrows the gap to the discipline of keeping client components few.

Decision: Keep Next.js (App Router), TypeScript and Tailwind CSS 4, hosted on Vercel. Jorge's
reason: the site is itself a showcase, so building it on the industry-standard stack is in
line with its goal.

Consequences: Client-side JavaScript is the main performance risk; the Lighthouse budget in
CI (#13) is what catches it. Learning time goes to design rather than to a new framework.
Vercel's Hobby plan covers personal, non-commercial use only; which plan the project is on is
`[founder]` (#8).
