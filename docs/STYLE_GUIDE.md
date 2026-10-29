# Basis Documentation Style Guide

This style guide defines the editorial, architectural, and factual standards for all Basis documentation.

---

## 1. Audience

- **Target Reader**: An Android developer who has never seen Basis, has an app to ship, and needs working Jetpack Compose UI with correct dark mode and accessible contrast.
- **Tone**: Pragmatic, direct, technical, and engineering-first. No marketing adjectives, no hype.
- **Rule of Internal Types**: Internal engine types, pipeline stages, AST representations, or compiler internals appear *only* if the developer must type or import them in their code.

---

## 2. Page Taxonomy

Every page belongs to exactly one of three categories:

| Type | Purpose | Structure |
| :--- | :--- | :--- |
| **Guide** | Complete a specific developer task | 1. Outcome (1–2 sentences) + screenshot/swatch<br/>2. Steps (prerequisites, code, verify step)<br/>3. Single Next Step |
| **Concept** | Explain an architectural reason ("why") | Short explanation (under 500 words), focused on human eyesight & constraints. Placed last in the sidebar. Exempt from Next Step. |
| **Reference** | Exhaustive API signatures and parameters | Generated tables from Kotlin source schemas. Minimal explanatory prose. Exempt from Next Step. |

---

## 3. Titles & Naming

- **Task-Oriented Titles**: Page titles must name the developer's task:
  - ✅ *Set your brand color*
  - ❌ *OKLCH Color*
  - ✅ *Support dark mode*
  - ❌ *ThemeMode*
  - ✅ *Customize components*
  - ❌ *Overrides*
  - ✅ *Check your theme in CI*
  - ❌ *Resolution and Reports*
  - ✅ *How Basis picks colors*
  - ❌ *Philosophy*

---

## 4. Voice, Banned Words, and Scoped Claims

Every claim must be scoped to where and how it is enforced. Avoid sweeping absolutes.

| Banned Phrase | Why It Fails | Scoped Replacement |
| :--- | :--- | :--- |
| *seamlessly* | Marketing filler | *"automatically synchronizes with Android system mode"* |
| *surgical* | Melodramatic | *"targeted per-component override"* |
| *non-negotiable* | Dogmatic | *"enforced by the resolver during compilation"* |
| *guaranteed* | Unsubstantiated promise | *"verified against WCAG 2.1 AA (4.5:1) at build time"* |
| *zero drift* | Unrealistic absolute | *"flags unapproved hardcoded hexes via basis-lint"* |
| *cohesive* | Vague aesthetic buzzword | Name the actual shared tokens (e.g., *"shared radius and color tokens"*) |
| *calibrated* | Pompous | State the concrete values (e.g., *"0.12 / 0.16 / 0.22"*) |
| *luminous* | Marketing fluff | State the contrast ratio or lightness value |
| *natural physical depth* | Pseudoscience | *"dark surfaces step up in lightness instead of using shadows"* |
| *gently* | Anthropomorphic fluff | Describe the exact algorithmic adjustment |
| *perceptual lightness parity* | Academic jargon | *"uniform lightness across hues in OKLCH"* |
| *under five minutes* | Unverifiable promise | State what the step achieves, not how long it takes |

---

## 5. Content Rules

1. **Intro is not the frontmatter description**: The intro paragraph must say what the developer gets and does, rather than restating the page summary or metadata description.
2. **Guides need a Verify step**: Every guide must end its core workflow with an explicit verification step detailing what the developer should see or run (terminal command, assertion, or UI change) to confirm success.
3. **No table appears in both a guide and the reference; link instead**: Guides link to the reference page for exhaustive lists (presets, knobs, domains, interaction patterns); reference pages serve as the single source of truth.
4. **Guides use a screenshot or swatch; Mermaid is allowed once, on the Concept page**: Guides illustrate concrete visual outcomes using swatches or screenshots. Flow diagrams and Mermaid visualizations are prohibited on guide pages and restricted to at most one on the Concept page.
5. **Concept and Reference pages are exempt from Next Step**: Only task-oriented guides conclude with a Next Step link to guide progression.
6. **No circular Next Step chains**: Each guide's Next Step must point forward in the reading order, not back to a previous page or into a reference or concept page.

---

## 6. Code Snippet Rules

1. **Compilation Guarantee**: Every Kotlin code snippet shown in guides must compile in the `demo-app` test source set. Dead `onClick`s, invented imports, broken APIs, and syntax errors are prohibited. Non-Kotlin snippets (Gradle, bash, YAML) are exempt from compilation checks but must match tested versions.
2. **Copy-Paste Readiness**: Code snippets must be complete enough for a developer to paste into an Android Studio project and compile without guesswork.
3. **Canonical Imports**: Use public symbols only (`BasisTheme`, `BasisButton`, `BasisIntent`, `ThemeMode`).
4. **No Material3 imports**: Do not reference `androidx.compose.material3.Text` or any Material3 symbols; use `BasicText` from `androidx.compose.foundation.text`.
