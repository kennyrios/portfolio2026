# Artisanal Torn Paper Horizon & Organic Paper Sway

Seamlessly transforms the top transition of the second section into multi-layered, deckled artisanal torn paper with natural paper fiber roughness and gentle organic sway, perfectly unified with the blue textured paper background and free of any artificial light-colored borders.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following choices were confirmed in the interactive clarification session:
> - **Motion Behavior**: Subtle organic drift with gentle paper sway (harmonic, low-frequency atmospheric motion resembling paper layers suspended in a calm room or gentle breeze).
> - **Edge Aesthetic**: Multi-layered deckled artisanal paper with natural fiber micro-roughness, replacing the previous ocean water waves with tactile handcrafted papermaking edges.
> - **Palette & Blending**: 100% color-matched to the deep cerulean and teal hues of `bg_blue.png`, eliminating bright cyan/white foam strokes or artificial border highlights for an authentic, seamless material blend.

- **Confirmed Decision 1**: Multi-layered deckled torn paper edge with layered depth (3 offset torn paper sheets with natural deckle contours).
- **Confirmed Decision 2**: Subtle paper sway animation using GPU-accelerated harmonic transforms without CPU overhead.
- **Confirmed Decision 3**: Complete removal of light-colored border strokes (`#fef08a`, `#e0f2fe`, cyan foam highlights, and drop-shadows that create an artificial halo).

---

## 1. Overview & Core Concept

- **What It Does**: Replaces the stylized ocean wave ribbon at the top of Section 2 (`#hero-content`) with an organic, multi-layered deckled torn paper boundary. As the user scrolls from Section 1 (the warm, sunlit monogram paper) to Section 2 (the deep blue architectural portfolio), Section 2 enters as a physical torn sheet of heavy watercolor/printmaking paper whose fibrous, deckled edge sways with organic realism.
- **Target Audience / Persona**: Creative directors, architectural firms, and senior design leaders reviewing Kenny's portfolio who value authentic craft, print-era tactility, and zero generic "AI template" aesthetics.
- **Key Value**: Replaces digital water tropes with a domain-authentic editorial printmaking metaphor (sunlit handmade paper transitioning into deep Prussian-blue cyanotype paper), achieving complete visual unity with `bg_blue.png`.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Intro Viewing (Section 1)**: User experiences the pinned sunlit paper stage with the monogram and architectural kicker.
2. **Scroll Initiation / "Enter Portfolio"**: As the user begins scrolling, the second section rises. Instead of a hard card line or shiny wave crest, a natural, fibrous torn edge of deep blue deckled paper laps organically over the sunlit paper.
3. **Resting State**: When paused anywhere during the overlap or at the top of Section 2, the torn paper sheets exhibit a breathing, subtle sway ($4\text{px}$–$6\text{px}$ slow harmonic drift over $14\text{s}$–$20\text{s}$), giving the interface life without distraction.
4. **Seamless Ingress**: The body of the torn paper sheets melts downward into `bg_blue.png` with identical pigment matching (`#092837`, `#0c354a`, `#0d3b51`), leaving zero visible lines, borders, or color steps.

### Visual Identity & Theme
- **Aesthetic Direction**: Fine-art printmaking, archival stationery, cyanotype architectural monograph.
- **Color Palette**:
  - *Deep Archival Blue (Base Paper Mass)*: `#092837` to `#0d3b51` (matches the exact top pixels of `bg_blue.png`).
  - *Secondary Torn Layer (Shadow Deckle)*: `#061d2a` (adds subtle under-tear depth where fibers overlap).
  - *Tertiary Accent Layer (Foreground Fibers)*: `#0b3348` with soft ambient fiber grain.
  - *No Light-Colored Borders*: Removed all white, cyan, and gold crest strokes. The edge is defined strictly by the organic silhouette and subtle paper casting shadow.
- **Edge Geometry & Texture**:
  - High-frequency micro-irregularities (simulating torn paper fibers and deckled pulp edges created by hand-tearing along a bone folder).
  - Multi-tier tear: 3 overlapping paper strata torn at slightly differing angles and depths.

### Motion & Micro-Interactions
- **Gentle Paper Sway**:
  - Keyframe `paperSwayLayer1`: 20s ease-in-out infinite horizontal drift ($\pm 1.5\%$) with subtle rotational micro-flex ($\pm 0.4^\circ$).
  - Keyframe `paperSwayLayer2`: 14s ease-in-out infinite counter-drift.
  - Keyframe `paperSwayLayer3`: 9s gentle vertical breathing ($\pm 3\text{px}$).
- **Accessibility**: Automatic fallback to static, non-moving deckled paper under `prefers-reduced-motion: reduce`.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: SVG Vector Deckle Paths vs. Heavy Bitmap Alpha Mask**
  - *Chosen Approach*: Multi-layered SVG paths with procedural high-frequency torn paper coordinates and SVG feTurbulence paper grain filter.
  - *Why*: SVG vector paths scale crisply to any retina/4K display, load instantly without network payloads, and animate via GPU compositing (`transform: translate3d`) at steady 60fps/120fps with 0% CPU drag.
  - *Alternatives Considered*: PNG alpha textures (heavy download, risk of pixelation or seams on wide screens).
- **Decision 2: Color Unification without Light Edge Strokes**
  - *Chosen Approach*: Fill layers with exact gradient stops sampled from `bg_blue.png` (`#061e2a` $\to$ `#092837` $\to$ `#0d3b51`). Eliminate bright foam lines and white borders completely.
  - *Why*: Fulfills the user's explicit directive: "without the light clolored border perfectly blending with the blue texture paper background".
  - *Alternatives Considered*: Retaining a 0.5px white paper core highlight (discarded per user instruction to ensure total harmony with the background).

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│ SECTION 1: IntroScrollHero (Pinned Sunlit Paper & Monogram Stage)     │
└────────────────────────────────────────────────────────────────────────┘
                                    ▲
                         [PARALLAX OVERLAP ZONE]
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ SECTION 2: #hero-content (z-20, Full Viewport Width, Straight Corners)  │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ <TornPaperSurfaceHorizon /> (z-30, pointer-events-none)           │  │
│  │  ├─ feTurbulence / feDisplacementMap (paper grain & fiber noise) │  │
│  │  ├─ Layer 1: Under-Tear Deckle Sheet (#061d2a, 20s sway)        │  │
│  │  ├─ Layer 2: Mid Torn Paper Strata (#0a2d3e, 14s sway)          │  │
│  │  └─ Layer 3: Foreground Deckled Horizon (#092837 -> #0d3b51)    │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ <Hero /> (z-10, Content & Status Strip)                          │  │
│  │  └─ bg_blue.png (Artisanal Cyanotype Paper Background)           │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

### Component & State Mapping

| Component | Responsibility & Interaction |
| :--- | :--- |
| `TornPaperSurfaceHorizon.tsx` (formerly `OceanSurfaceWaves`) | Renders 3 layered deckled paper horizons with procedural fiber silhouettes, paper grain filtering, and gentle organic sway animations. |
| `src/App.tsx` | Embeds `TornPaperSurfaceHorizon` at the top of `#hero-content`, retaining straight corners and smooth scroll cues. |
| `src/components/Hero.tsx` | Hosts the main content, providing comfortable top padding (`pt-16 sm:pt-24`) so editorial typography breathes beneath the deckled paper boundary. |
