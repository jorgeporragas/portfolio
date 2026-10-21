# DESIGN.md

This site uses Jorge's design system, [`jorgeporragas/design-system`](https://github.com/jorgeporragas/design-system)
(private), pinned at **`v0.2.1`**. This file points to the system; it does not restate it.

The UI in `src/` today predates this file and is being replaced. New UI code follows it now.

## Binding

- **Atmosphere:** one per section (D-017): **Me** sage, **Audio** magenta, **Development** teal.
  The home page brings all three together.
- **Expression level:** expressive (brief §12).
- **Platform adapter:** web.
- **Activity indicator shape set:** the brand marks, smile, star and ⌘ (D-016).

## Rules for anyone (human or AI) writing UI code here

1. Read `brief.md` before making visual decisions. If a request conflicts with it, say so instead
   of improvising.
2. Use **semantic or component tokens only**. Never primitives (`color.ion.700`), never hardcoded
   values (`#00657e`, `16px`).
3. Materials: ink by default, baked light on controls, live material only on persistent chrome and
   only via the adapter's capability tier. See `specs/materials.md`.
4. On atmosphere fields, primary actions use the knockout ink style, not signal colour (D-005).
5. Content text uses the content voice; metadata, status and data use the system (mono) voice.
   Text scramble only on the system voice (`specs/text-scramble.md`).
6. Motion uses the spring presets (`specs/motion.md`). Never block input on animation.
7. Indeterminate waits use the line-boil indicator after 400 ms (`specs/line-boil.md`). Nothing
   else boils. Hand-made effects (boil, dither, scramble) step on the shared hand clock; physical
   motion stays smooth (D-014).
8. Every expressive effect implements its degradation ladder and respects Reduce Motion.
9. New visual patterns: propose them against the brief first; don't invent per-screen styles.
10. Anything this site needs from the system goes back to the design-system repo as a pull
    request, not into a local override.

## Site-specific decisions

- **Section marks.** Each section is identified by its brand mark: smile for Me, star for Audio,
  ⌘ for Development (`brand/README.md`). The marks appear in the order smile, star, ⌘ whenever
  they are shown together.
