# ADR-003 — Jorge's own player first; platform embeds as a fallback
Status: Accepted
Date: 2026-10-19

Context: Step 2 of the core loop is hearing the work. The options were Jorge's own player with
hosted media (full control, but needs the right to host each piece), Spotify or Apple Music
embeds (free, but their design inside his page, heavy third-party JavaScript and cookies), or
platform links only (clean, but the visitor leaves to hear anything). Jorge believes he has the
right to host most of his work.

Decision: Jorge's own player is the primary way to hear a piece. Each release and ad declares
its playback: `player`, `embed` (loaded only when the visitor presses play) or `links`. Jorge's
reason: the player merges his disciplines, sound, code and design, into a single component.

Consequences: Media needs storage outside git; the provider is not chosen yet. Hosting rights
are confirmed piece by piece before launch (#10). An embed costs no performance and sets no
cookies until the visitor asks for it, which keeps PRD veto 3. The player is built on a native
`<audio>` element so it plays without JavaScript (PRD veto 4).
