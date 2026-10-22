# ADR-005 — The site follows the design system at a pinned tag
Status: Accepted
Date: 2026-10-21

Context: The site is the first public application of Jorge's design system
(`jorgeporragas/design-system`, private), which defines its type, colour, marks and motion.
The system changes on its own schedule, and the site must not change with it unseen.

Decision: The site follows one tagged design-system release, named in `docs/DESIGN.md`, first
`v0.2.1`. Moving to a newer release is a pull request in this repo, checked on its preview.
Anything the site needs from the system goes back to the design-system repo as a pull request,
not into a local override.

Consequences: The site is the system's test bed, so it will drive design-system releases
(#12 is the first). How the tokens reach the code is not decided yet; the design-system session
of 2026-10-19 recommended copying the generated `tokens.css` with a version file, with no npm
package until a second app needs one. `[founder]` to confirm.
