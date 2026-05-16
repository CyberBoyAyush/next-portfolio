# Founder / Engineer Dual-View Homepage

Added: 2026-05-16
Last updated: 2026-05-16 (round 2)

The homepage ships two distinct experiences behind a single `/` route, gated by an audience switch:

- **For Founders** — the **default** landing experience. Outcome-led flow (hero → receipts → shipped fast → how I work → beyond the code → experience → what I do → GitHub stats → writing → contact).
- **For Engineers** — the existing portfolio (hero → skills → experience → portfolio → blogs → coding stats → terminal contact). Reached via `?for=engineers` or by clicking "For Engineers" in the hero switch.

## Architecture

### State

`src/context/audience-provider.tsx` exposes a context with `audience: "founder" | "engineer"`.

Resolution order on mount:
1. URL search param `?for=founders` / `?for=engineers` (also accepts `dev`/`devs`)
2. `localStorage["portfolio-audience"]`
3. Default: `founder`

The provider also subscribes to TanStack Router's `onResolved` event so browser back/forward updates the audience state in sync with the URL.

When audience changes:
- The choice is persisted to `localStorage`.
- The URL search param is updated via `history.replaceState` (only on `/`, to keep deep pages clean).

### Routing

`src/routes/index.tsx` reads the `for` search param using TanStack Router's `validateSearch`. The route component renders `FounderHome` when:
- URL param is `founders`, **or**
- Provider state is `founder` and no URL param overrides it.

This guarantees that share links like `aysh.me/?for=founders` SSR-render the founder view directly (no flash of engineer content).

### Switch UI

`src/components/audience-switch.tsx` is a single hero-style segmented control with animated `motion.div` indicator (`layoutId="activeAudienceHero"`). Uses `role="radiogroup"` + `aria-checked` for a11y.

It is embedded as the **first stagger child** inside both the Founder hero (`founder-hero.tsx`) and the existing engineer hero (`hero.tsx`). No absolute overlay, no navbar pill — switch lives where it belongs: above the photo on both modes.

## Founder sections

| File | Purpose |
|---|---|
| `founder-hero.tsx` | Headline ("I don't need a job description"), photo, primary CTA (Cal.com), Resume, DM. Hosts the audience switch. Metric chips intentionally removed (deduped with `OutcomesWall`). |
| `outcomes-wall.tsx` | Bento grid of 7 receipts: 140× latency, −50% infra, end-to-end features, millions of rows, 0 → CTO, production-ready, 4+ NPM packages. |
| `shipped-fast.tsx` | **MemContext first as a large flagship card**, then the rest of the projects in a 3-col grid with time-to-ship pill, status label (e.g. "Free to start · Live", "Live on npm"), and kind pill (plugin/product/work). No MRR claims. |
| `how-i-build.tsx` | 4 philosophy cards using Tabler icons (`IconSparkles`, `IconRocket`, `IconTarget`, `IconStack2`). **AI-first** card is featured (full width, includes plugin chips for Zenox/Plnr/MemContext). |
| `beyond-code.tsx` | The "not just into tech / team player / internal tools" message. Uses Tabler `IconTool`, `IconUsersGroup`, `IconHeartHandshake`. Leading statement card with inline accent pills + 3 supporting cards. |
| `what-i-do.tsx` | 5 services with Tabler icons (`IconRocket`, `IconSparkles`, `IconPuzzle`, `IconLifebuoy`, `IconCrown`). Zero-to-MVP, AI layer, Custom plugins, Rescue codebase, Fractional CTO. |
| `founder-coding-stats.tsx` | **GitHub-only** stats (no LeetCode). Three tiles: GitHub stats card, streak card, and a full-width contribution graph. |
| `founder-contact.tsx` | Large quote, gradient CTA card with Cal.com + DM + email, "Switch to Engineers" hint. |
| `writing-link.tsx` | Single tasteful link to `/blogs` (no carousel). |
| `founder-home.tsx` | Composer. |

Reused from engineer view: `Experience` only.

## Content source of truth

`src/data/founder-content.ts` holds every founder-mode string, metric, accent, and ordering decision. To tweak copy, only this file needs editing.

Types:
- `OutcomeTile` — receipts in `OutcomesWall`
- `PhilosophyCard` — `HowIBuild` (uses Tabler icon names)
- `BeyondCodeItem` — `BeyondCode` (uses Tabler icon names)
- `ShippedItem` — `ShippedFast` (`flagship?: boolean` for MemContext treatment, `statusLabel?: string` like "Free to start · Live" / "Live on npm" / "Day job · Ongoing")
- `ServiceTile` — `WhatIDo` (uses Tabler icon names)

Plus a centralized `accentMap` keyed by color name (blue/purple/emerald/amber/rose/cyan) that returns a typed object with consistent dark/light Tailwind classes. Every founder card pulls its visual accent from this map.

### Icon system

All founder sections use **Tabler icons** (`@tabler/icons-react`) instead of Lucide. Tabler has a more distinctive, less generic look — thinner strokes, sharper corners — that avoids the AI-generated default-icon feel. Strokes are tuned to 1.6–2.0 for consistency.

## SEO / AI discovery

`src/routes/llms[.]txt.ts` documents both modes including the `?for=founders` shareable URL.

## Verification

- `pnpm typecheck` ✓
- `pnpm lint` ✓
- `pnpm build` ✓ (32 pages prerendered, including `/` with default engineer view)
- Oracle review verdict: *Ship with minor fixes* — all High/Medium findings addressed before commit.

## Future improvements

- Add a small "Hiring? See For Founders" footer hint on the engineer view (symmetry with founder's "For Engineers" hint).
- Consider per-mode `head()` metadata (different `<title>` for founder URL) once Founder Mode gets external traffic.
- Lazy-load `FounderHome` if bundle analyzer shows engineer visitors paying for founder code.
