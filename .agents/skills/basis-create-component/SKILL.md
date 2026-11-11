---
name: basis-create-component
description: Authoring rules and sign-off gates for creating or modifying public Basis Jetpack Compose components and modifiers in `basis-components`. Use for any new component or modifier, any new variant/configuration/state on an existing one, and whenever deciding whether a component or modifier is done.
---

# Basis Create Component

Flow: **Plan (§1) → Structure & Build (§2–§8) → Document (§9) → Sign off (§10) → Verify (§11) → Report (§12).** A
component is not done until §10–§12 are complete.

> [!IMPORTANT]
> **Performance & Visual Reality Rule (Visual & UX Reality + Performance over Theoretical Fidelity):**
> 1. **Prioritise visually and tactilely good UI/UX and runtime performance equally.** A design that sounds
     theoretically elegant on paper (e.g., complex multi-stage physics simulations, liquid mesh morphs, chained
     coroutine synchronization) is a critical red flag if it produces laggy, unresponsive, or janky real-world
     interaction.
> 2. **Performance strictly trumps theoretical UX ideals when a trade-off arises.** No theoretical animation fidelity or
     conceptual perfection justifies frame drops, garbage collection thrashing (e.g. allocating paths/outlines in draw),
     touch latency, or delayed input responsiveness.
> 3. **Exhaust best compliant efforts before compromising.** Make genuine, compliant efforts to achieve the visual and
     interactive vision efficiently (e.g., caching geometries, leveraging hardware-accelerated nodes, decoupling release
     fades). If performance or UX responsiveness still suffers, pivot to a cleaner, performant, mainstream design
     pattern and document the trade-off transparently in the task report (§12).

Use the context graph before manual search. Do not update it unless explicitly asked; report graph impact in §11.

## 0. Fill-once placeholders

An unfilled placeholder makes its gate `HUMAN` (not verifiable). Never mark such a gate `PASS`.

- `<UI_TEST_TASK>`: Gradle task for instrumented Compose tests
- `<SCREENSHOT_CMD>`: entry point of the shared screenshot capture and anatomy annotation script
- `<DEMO_REGISTRY>`: where demo-app entries are registered
- `<MULTI_PREVIEW>`: the shared multi-preview annotation
- `<BENCHMARK_TASK>`: Gradle task for the Macrobenchmark frame-timing run
- `<REFERENCE_DEVICE>`: physical low/mid-range device used for all performance numbers (never an emulator)

## 1. Plan before code

1. State the consumer responsibility in one sentence, and what the component is not responsible for. Start from the
   consumer problem, not from parameters.
2. Search the catalogue first (components, foundation modifiers, tokens). Take the first option that works: use as-is,
   compose around existing components, extract a reusable part, modify an existing component.
3. A dependant's convenience never justifies modifying an existing component. Test: would the change make sense for that
   component and its current consumers if the new component did not exist? If a modification is truly needed, **stop and
   lay out options** (compose around / extract / modify) with the blast radius (every dependant), then wait for the
   decision. If approved: additive only, defaults preserve current behaviour exactly, existing tests and snapshots pass
   unmodified, dependency direction stays one-way (new depends on existing, never the reverse).
4. Put each concept in the right category. Wrong category is the main source of API bloat.

   | Category | Meaning | Example |
         | --- | --- | --- |
   | Variant | Semantic presentation | Solid, Outlined |
   | Configuration | Reusable structure or behaviour | leading icon |
   | State | What it is currently doing | pressed, focused, hovered, disabled, loading, selected, error |
   | Content | Consumer data | label text, item data |

   Never turn content differences into variants.
5. Write down before coding: anatomy (every visual part has a reason to exist), variants, configurations, states,
   interaction model, tokens used. If one cannot be explained, ask instead of guessing.

## 2. Naming and declaration

- Component: `Basis<Name>` (`BasisButton`, `BasisSwitch`, `BasisTextField`). Defaults object: `Basis<Name>Defaults`.
- The `Basis` prefix is reserved strictly for public API entrypoints, composables, and public contracts. Internal
  primitives and private helpers stay unprefixed.
- Internal primitives stay flat under `io.github.alph_a07.basis.components.primitives` without the `Basis` prefix (
  `InteractiveNode`, etc.).
- Composition providers get their own package `io.github.alph_a07.basis.components.providers`. All composition providers
  go under `providers`. Never create duplicate providers for what the theme already provides (`BasisTheme` and its
  ambient locals own ambient theme resolution).
- Terminology rule: Nothing should be prefixed or suffixed with confusing Compose, Android, or Kotlin reserved
  terminologies unless they actually are that construct. In particular, non-provider types must NEVER be suffixed with
  `Provider` (e.g. calculation algorithms, placement strategies, or position calculators).
- Modifiers stay flat under `io.github.alph_a07.basis.components.modifiers`.
- Every public composable or class lives in a file named after its primary declaration (`Basis<Name>.kt`).
- Defaults stay inline in the same file with the concerned composable/node (e.g. `InteractiveNodeDefaults` in
  `InteractiveNode.kt`).
- Say "token", never "leaf".
- Tests mirror source structuring 1:1 (`src/test` and `src/androidTest` packages match `src/main` 1:1).

## 3. Architecture & Dependency Flow

Dependency flows strictly in a structured one-way order:
**Theme attributes (`BasisTheme`) → Optional shared utils as needed → Modifiers → T0 Primitives → T1 Components → Higher
tiers**

- **Lowest dependency layer — Theme attributes (`BasisTheme`):**
    - The absolute ground/foundation layer of the entire design system is `BasisTheme`.
    - Whatever `BasisTheme` provides MUST be consumed directly from the theme. Never duplicate what the theme already
      provides.
    - If a component or modifier requires a design token or attribute that `BasisTheme` might be missing but logically
      belongs in the theme, do NOT hardcode arbitrary literals or invent disconnected values. Use an implementation
      fallback and record the missing attribute in the task **Report (§12) under "Theme proposals"** to be wired into
      the theme engine.
- **Modifiers (`io.github.alph_a07.basis.components.modifiers`):** Independent shared low-level logic usable both for
  internal development and exposed to library consumers.
    - Modifiers must NEVER depend on private components or higher-tier components.
    - All three layers of node-based modifiers (`Modifier` extension function, `ModifierNodeElement`, and
      `Modifier.Node`) must be co-located in the same file.
    - Modifiers package stays flat under `io.github.alph_a07.basis.components.modifiers`.
- **Primitives (`io.github.alph_a07.basis.components.primitives`):** Low-level building blocks (T0) without `Basis`
  prefix (`InteractiveNode`, etc.). Flat package.
- **Providers (`io.github.alph_a07.basis.components.providers`):** Dedicated package exclusively for genuine composition
  providers (e.g., custom composition locals). Do not duplicate ambient providers that `BasisTheme` already supplies.
- **Components (`io.github.alph_a07.basis.components.*`):** Public composables (`BasisButton`, `BasisSwitch`, etc.)
  composed from modifiers and primitives.

## 4. Tokens

Components never accept raw hex, hardcoded `dp`, or raw font sizes. Every design value resolves from `BasisTheme`. Test
for any literal: "is this a design decision?" If yes, it comes from tokens. Literals are allowed only for implementation
mechanics.

```kotlin
val surfaceColor = BasisTheme.colors.surface.elevated
val brandColor = BasisTheme.colors.brand.primary
val contentColor = BasisTheme.colors.content.default
val contentInverse = BasisTheme.colors.content.inverse
val textStyle = BasisTheme.typography.content.level1
val paddingHorizontal = BasisTheme.spacing.level4.toDp()
val cornerRadius = BasisTheme.radius.level2.toDp()
val motionSpec = BasisTheme.motion.interactive.spatial
```

A component consumes resolved theme data. It never inspects brand colors, derives colors, or decides contrast itself.

## 5. Modifier composition

No base classes. Build components by piping modifiers into composable slots. Never hand-roll clickable, selectable, or
toggleable behaviour: the modifiers give touch target, focus, and a11y actions by construction.

| Concern         | Modifier                                  | Role                                                          |
|-----------------|-------------------------------------------|---------------------------------------------------------------|
| Base            | `Modifier.basisModifier()`                | Common root for all Basis modifiers and components            |
| Surface         | `Modifier.basisSurface(...)`              | Fill, clipping, and ambient content color                     |
| Click           | `Modifier.basisClickable(...)`            | Touch handling, focus ring, indication, and a11y click action |
| Selection       | `Modifier.basisSelectable(...)`           | Radio and chip selection with focus ring and indication       |
| Toggle          | `Modifier.basisToggleable(...)`           | Switch and checkbox toggling with focus ring and indication   |
| Focus           | `Modifier.basisFocusRing(...)`            | Accessible focus ring indicator                               |
| Focusable       | `Modifier.basisFocusable(...)`            | Focusability with interaction source registration             |
| Touch target    | `Modifier.basisMinTouchTarget(...)`       | Enforces minimum touch target floor (default 48dp)            |
| Border          | `Modifier.basisBorder(...)`               | Border stroke with token or `DpValue` width                   |
| Padding         | `Modifier.basisPadding(...)`              | Token-based inner padding (all, directional, axial)           |
| Clip            | `Modifier.basisClip(...)`                 | Shape clipping                                                |
| Indication      | `Modifier.basisIndication(...)`           | State layer (hover, press, focus)                             |
| Semantics       | `Modifier.basisSemantics(...)`            | Accessibility and testing semantics                           |
| Clear semantics | `Modifier.basisClearAndSetSemantics(...)` | Clears descendant semantics and sets custom properties        |

All custom modifiers are `Modifier.Node`-based (`ModifierNodeElement`), never `composed {}`. All three layers (factory
extension, element, node) remain co-located in the same modifier file under `basis.components.modifiers`.

## 6. Component style resolution

If a component supports overrides via `ControlIntent`, wire resolution through `resolveComponentStyle`:

```kotlin
val resolvedStyle = resolveComponentStyle(
    id = ComponentId.Interactive,
    variant = variantId,
    state = stateId,
    patches = BasisTheme.componentOverrides,
    theme = BasisTheme.current,
)
```

Overrides must never be able to defeat accessibility constraints (contrast, touch target).

## 7. Public API rules

- Parameters express semantic intent (`variant`, `size`, `enabled`, `loading`, `onClick`). Never expose styling
  parameters (`backgroundColor`, `contentColor`, `cornerRadius`, `elevation`, `padding`). Appearance overrides (§6) are
  the only customisation surface.
- `Basis<Name>Defaults` exposes values that resolve from tokens, never literal `dp`/`sp`/hex. Defaults remain inline in
  the same file with their respective component.
- Match the catalogue's parameter ordering. If there is no precedent: required parameters, `modifier`, optional
  parameters with defaults, trailing content slot last.
- New parameters have defaults. Existing parameters are never removed, reordered, retyped, or renamed; use
  deprecate-and-replace with `ReplaceWith`.
- `internal` by default. Only intended symbols are public.

## 8. Accessibility, motion, state

- Every interactive node meets `MIN_TOUCH_TARGET`; the visible glyph size never defines the hit target.
- Expose role, label, enabled, selected/checked, state description, and progress where applicable. Decorative nodes stay
  silent. No nested duplicate interactive targets.
- Motion comes only from `BasisTheme.motion`. Every animation defines normal and reduced-motion behaviour, and the
  component stays understandable without animation.
- Stateless by default. State is hoisted; never duplicate consumer state. Effects are scoped and keyed.
- Every interactive component works with keyboard, pointer, and touch, not touch alone. Rules live in G11.
- Performance rules live in G10. Apply them while building, not as a final pass.

## 9. KDoc and documentation sync

KDoc on every public declaration:

- Third-person, present, neutral tone (`Displays an interactive button...`, `Attaches accessible click handling...`).
- `@param` for all parameters, `@property` for primary-constructor properties, `@throws` for exception contracts.
- References to other types in square brackets (`[BasisTheme]`, `[DpValue]`).

Documentation is created and updated in lockstep in the same task as the implementation:

1. **Document at the source (Single Source of Truth):**
    - Components: Annotate with `@BasisComponentDoc(id = "<id>", family = "<Family>", role = "<Role>", ...)` from
      `io.github.alph_a07.basis.components.annotation`.
    - Modifiers: Annotate factory functions with
      `@BasisModifierDoc(id = "<id>", name = "<name>", summary = "<summary>", ...)` from
      `io.github.alph_a07.basis.components.annotation`.
2. **Sidecar authoring:**
    - Write the sidecar `docs/docs-model/sidecars/<id>.sidecar.mdx` with usage guidelines (`do`, `dont`, `notes`) and an
      `## Accessibility` section.
    - Consumer-facing only: focus on usage rules, accessibility expectations, and keyboard/pointer navigation; never
      duplicate low-level implementation details.
3. **Extraction pipeline (Driven by generated data):**
    - Run `./gradlew :docs:docs-extract:generateDocsJson` to extract component and modifier metadata into
      `docs/docs-site/src/content/components.json`.
    - The documentation website, navigation sidebars, and dynamic routes (`/docs/components/[id]`,
      `/docs/modifiers/[id]`) are driven strictly by this generated JSON schema.
    - **Never maintain duplicate sources of truth:** Do not manually hardcode component or modifier lists, tables, or
      inventories across prose markdown documents. Hand-written prose must reference the dynamic catalog routes.
4. **Validation:**
    - Run `npm test --prefix docs/docs-model` to validate models, schema conformity, and sidecar sync.
    - Run `npm test --prefix docs/docs-site` to validate Astro route rendering, sidebar integrity, and catalog
      integrity.
5. **Zero phantom declarations:**
    - Never document undeveloped or non-existent components or modifiers. Documentation strictly reflects real,
      implemented, and tested source code.

## 10. Sign-off gates

Run after the component is implemented and documented.

### Protocol

1. Each gate ends in `PASS`, `N/A`, `FAIL`, or `HUMAN`.
2. `PASS` needs evidence: the command run and its result, or the produced file path.
3. `N/A` needs a one-line reason that cites the gate's "Applies when" rule. Never skip silently.
4. `HUMAN` means an agent cannot verify it (on-device TalkBack, visual judgement, unfilled placeholder). Never mark it
   `PASS`; list it in §12.
5. `[PUBLIC]` gates apply to every declaration exposed in the public API (not `internal`), whatever its classification.
6. Never edit existing components, existing tests, baselines/snapshots, or the context graph to get green. A changed
   existing snapshot is a behaviour change: stop and flag it.
7. Stop and ask, do not decide, when: extracting a shared primitive, modifying a dependency, or a component the shared
   annotation script cannot express.

### G1 Skeleton

**Applies when:** the component renders content that can arrive asynchronously (data-driven text, media, avatars, list
items, cards). **N/A:** pure controls with immediate content, structural or non-visual primitives.

- [ ] Same outer size and spacing as the loaded state (assert equal bounds, no layout shift)
- [ ] One layout source of truth: skeleton and loaded content share structure, no hand-copied parallel layout
- [ ] Reuses a shared Basis skeleton primitive. If none exists, stop and ask whether to extract one
- [ ] Tokens only; shimmer uses `BasisTheme.motion` and runs as one shared draw-phase transition (never per-item
  recomposition); reduced motion gives a static placeholder
- [ ] Placeholder shapes hidden from the a11y tree, loading announced once at container level, nothing focusable or
  clickable while loading
- [ ] Tests for skeleton-to-content transition and no interaction while skeleton; Preview and screenshot (light/dark)
  exist

### G2 Accessibility and TalkBack

**Applies when:** always for visual components.

- [ ] Touch target >= `MIN_TOUCH_TARGET` asserted for every interactive node
- [ ] Semantics asserted where applicable: role, label, enabled, selected/checked, state description, progress
- [ ] Automated accessibility checks enabled in Compose UI tests (if the repo cannot, flag it)
- [ ] Keyboard and pointer behaviour verified in G11
- [ ] Large text (1.5x and 2.0x) has no clipping; RTL and reduced motion covered by test or snapshot, or `N/A` with
  reason
- [ ] Contrast holds for every variant x state in light and dark
- [ ] `HUMAN`: manual TalkBack pass for interaction-heavy components. Record device, OS, TalkBack version, result

### G3 Tests

**Applies when:** always.

- [ ] JVM unit tests for pure state, logic, and token/theme resolution
- [ ] Instrumented Compose UI tests: behaviour (click, enabled, loading blocks input, selection, dismiss), state
  transitions, semantics, touch target
- [ ] Matrix covered or `N/A` with reason: default, variant x state, representative config combos, disabled, loading,
  error, empty, long/short content, dynamic updates, rapid state change, light/dark, theme customization
- [ ] Semantic matchers preferred over test tags; any test tag is internal
- [ ] No sleeps; Compose idling / main clock control; two consecutive runs with no flakes
- [ ] Visual regression baselines: default, variants, key states, light/dark, large text, narrow and wide widths. Never
  screenshot-only, never unit-only
- [ ] `git diff --name-status` shows no `M` or `D` on pre-existing test or baseline files

Evidence: `<UI_TEST_TASK>` plus the unit test task, with results.

### G4 Screenshots and anatomy [PUBLIC]

One shared script. Per component either **(a)** supply on-demand inputs to the shared script (default), or **(b)** add a
dedicated script, only when the shared inputs cannot express the component; state why in §11.

- [ ] Captured by `<SCREENSHOT_CMD>`, never by hand, from the demo scenes (G8). Deterministic: fixed size, density,
  locale, font, theme intent, animations off
- [ ] Neutral theme. Set: default, each meaningful variant, key states; light and dark
- [ ] (a) Inputs (scenes/states to capture, anatomy parts to label) declared as data; no component-specific logic added
  to the shared script
- [ ] (b) Dedicated script uses the same entry point and helpers and produces the identical output layout
- [ ] Every anatomy part from the plan (§1.5) is labeled; no hand-placed or hand-edited pixels
- [ ] Re-running with no code change produces zero diff; the docs page references the output

### G5 Previews

**Applies when:** the declaration is a visual composable. **N/A:** modifiers and pure logic.

- [ ] `private`, absent from the API dump, uses `<MULTI_PREVIEW>` (light/dark, font scale, RTL)
- [ ] Cover default, each variant, key states (disabled, loading, skeleton, error, selected, focused, hovered), long
  content, one theme-customized case
- [ ] Inline sample data, no network; theme through the Basis theme provider, no literals
- [ ] Previews compile and render without error

### G6 Stable API [PUBLIC]

- [ ] API dump diff is additive only for pre-existing symbols (see §11 step 3)
- [ ] Adding a property to a public `data class` breaks constructor/`copy`/`componentN`. Follow the repo's chosen
  pattern; if none exists, stop and ask
- [ ] Public parameters are stable or immutable (no bare `List`, no unstable types); skippability is verified in G10
- [ ] No styling parameters (§6)

### G7 Web documentation [PUBLIC]

- [ ] §9 steps 1 to 5 done: `@BasisComponentDoc` or `@BasisModifierDoc` present, sidecar created/updated
- [ ] Single source of truth respected: JSON regenerated via `./gradlew :docs:docs-extract:generateDocsJson`, never
  hand-edited; no duplicate manual lists maintained across docs prose
- [ ] Sidecar is consumer-facing: `do`/`dont`/`notes` and an `## Accessibility` section covering role, labelling
  guidance, TalkBack and keyboard behaviour, reduced motion. No implementation details
- [ ] Overrides content matches exactly the consumer-overridable surface (§6) where applicable
- [ ] Anatomy and screenshots from G4 linked (for visual components); correct family/category; "added in" label set;
  changelog entry added
- [ ] Docs model and site tests pass (`npm test --prefix docs/docs-model`, `npm test --prefix docs/docs-site`)

### G8 Demo app entry [PUBLIC]

- [ ] Registered in `<DEMO_REGISTRY>` under the correct family
- [ ] Shows every variant, key states (disabled, loading, skeleton, error, selected), meaningful configurations, long
  content, and one dynamic scenario (live state change)
- [ ] Public API only. If the demo needs internals, that is an API gap: flag it
- [ ] Follows the global theme mode and intent; no literals
- [ ] These scenes are what G4 captures (single source)
- [ ] The demo app assembles and the entry launches without a crash

### G9 Theme and overrides

- [ ] Global theme changes, family-level customization, partial customization, and light/dark all resolve coherently
- [ ] `resolveComponentStyle` wired (§5) where overrides are supported, and tested
- [ ] No design literal bypasses the theme; no component-local token families without evidence

### G10 Performance and state

Target: sustained 60 fps (or 120 fps where supported). Every frame completes within its budget: 16.6 ms at 60 Hz,
`1000 / refresh rate` ms on higher-refresh devices. Input response is instantaneous with zero perceptual latency or
artificial delays.

**Visual & UX Reality Check (Anti-Theoretical Red Flag Gate)**

- [ ] Real-world responsiveness over theoretical physics: Touch down and release must feel immediate. Do not serialize
  gestures behind long springs, coroutine joins (`job.join()`), or artificial delay timers.
- [ ] Visual UI/UX evaluated empirically: Animations and states look crisp, non-distracting, and fluid in execution, not
  merely "academically sound" in mathematical specification.
- [ ] If a complex visual concept harms responsiveness or causes frame drops, transparently document the trade-off and
  pivot to a clean, performant, mainstream design pattern.

**Static checks (every component, agent-verifiable)**

- [ ] Composition is cheap: no IO or heavy calculation; derived values use `remember` / `derivedStateOf`
- [ ] Style resolution is memoized on its keys (variant, state, overrides, theme). `resolveComponentStyle` is never
  re-run on every recomposition
- [ ] Skippable per the Compose compiler stability report; no unstable parameters; lambdas stable or memoized
- [ ] Animated and fast-changing values are read in the draw/layout phase (`graphicsLayer {}`, `drawBehind {}`,
  `offset {}`) or passed as `State`, never read in composition every frame
- [ ] No allocations in draw, measure, or layout: hoist and `remember` `Brush`, `Path`, `Shape`, `TextStyle`
- [ ] No intrinsic measurements or `SubcomposeLayout` unless justified in a code comment. Shadows, blur, `RenderEffect`,
  and large clips are opt-in, never default
- [ ] Recomposition test: changing one input recomposes only what depends on it; an idle component recomposes nothing
- [ ] Lazy content: stable keys, `contentType` where item types differ
- [ ] State: ownership clear, no duplicate source of truth, effects scoped and keyed. Internal state the user can see (
  expanded, selected, entered text) survives configuration change and process death (state restoration test)

**Measured (applies when** a `[PUBLIC]` component animates, appears in lists, or is heavy: images, text-heavy, shadows.
Otherwise `N/A` with reason.)

- [ ] Run `<BENCHMARK_TASK>` on `<REFERENCE_DEVICE>` in a release-like build (minified, baseline profile applied).
  Scenarios: scroll a list of at least 100 instances; trigger every animated state change; first composition
- [ ] Frame timing: P95 `frameDurationCpuMs` within the frame budget and P95 `frameOverrunMs` <= 0. Record P50/P95/P99
  in §11
- [ ] The component's primary journeys are in the baseline profile generator. If the module has none, flag it as a
  repo-level gap

### G11 Keyboard and pointer input

**Applies when:** the component is interactive or contains interactive parts. **N/A:** non-interactive display
components.

**Keyboard**

- [ ] Tab / Shift+Tab reaches every interactive node in reading order (mirrored in RTL), skips disabled nodes, and never
  traps focus
- [ ] Activation follows the control's convention: Enter and Space on buttons; Space on checkbox, switch, and other
  toggles
- [ ] Composite widgets (radio group, tabs, segmented control, menu, list, slider): arrow keys move within the group,
  with Home/End where the convention has them; the group is a single tab stop where the platform convention says so
- [ ] Overlays (dialog, menu, popup, sheet): focus moves in on open, Escape dismisses, focus returns to the trigger on
  close. A modal may hold focus only while it is open and dismissible
- [ ] Focus indicator comes from `Modifier.basisFocusRing`: visible for keyboard focus, meets contrast in light and
  dark, is not clipped, and is not shown on touch
- [ ] Tests use key input (`performKeyInput`) and focus assertions for traversal, activation, arrow movement, and Escape
- [ ] `HUMAN`: manual pass with a hardware keyboard for composite and overlay components

**Pointer**

- [ ] Hovered state defined for interactive components, derived from the interaction source and tokens (state layer),
  never shown for touch
- [ ] Pointer icon matches convention (hand for clickable controls, text cursor for text input). If the foundation
  modifiers do not provide it, flag the gap instead of patching locally
- [ ] Hover, pressed, focused, and selected combine with a defined precedence and no flicker
- [ ] Scrollable parts respond to mouse wheel; any drag gesture has a non-drag alternative
- [ ] Tests use `performMouseInput` for hover enter/exit and click; hovered and focused states are in the visual
  regression set (G3) and previews (G5)

## 11. Verification

Run in order. Each step must pass before the next.

1. `./gradlew ktlintFormat` then `./gradlew ktlintCheck`
2. `./gradlew detekt` (0 issues allowed)
3. `./gradlew :basis-components:releaseApiDump`, then inspect `git diff basis-components.api`. The dump accepts any
   change, so it is not a check by itself: for pre-existing symbols there must be no removed or changed lines. Any
   removal or change means stop and flag
4. `./gradlew :docs:docs-extract:generateDocsJson` and `npm test --prefix docs/docs-model`
5. `npm test --prefix docs/docs-site`
6. Gate commands not covered by `verifyAll`: `<UI_TEST_TASK>` (G3), `<SCREENSHOT_CMD>` (G4), and `<BENCHMARK_TASK>` on
   `<REFERENCE_DEVICE>` (G10, when it applies)
7. `./gradlew verifyAll` (must pass 100%)

## 12. Report

Output this at the end of every component task.

```
Component: <name>   Classification: <foundational|compound|public>   Public API: <yes|no>

| Gate | Status | Evidence / N/A reason |
|------|--------|-----------------------|
| G1 Skeleton | | |
| G2 Accessibility | | |
| G3 Tests | | |
| G4 Screenshots + anatomy (a|b) | | |
| G5 Previews | | |
| G6 Stable API | | |
| G7 Web docs | | |
| G8 Demo entry | | |
| G9 Theme + overrides | | |
| G10 Performance (60 fps) + state | | P50/P95/P99 frameDurationCpuMs on <device>, or N/A reason |
| G11 Keyboard + pointer | | |

HUMAN items: <list, e.g. TalkBack pass, hardware keyboard pass, unfilled placeholders>
Decisions needed: <list, or none>
Theme proposals: <tokens or theme attributes missing from BasisTheme that should be added to the theme engine, or none>
Graph impact: <nodes/edges to add or change, or none>
Verdict: DONE only if no FAIL and every HUMAN item is listed; otherwise NOT DONE
```
