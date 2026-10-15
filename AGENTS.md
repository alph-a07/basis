# AGENTS.md: Basis

Basis — Jetpack Compose design system. Public API `Basis`-prefixed. Apache 2.0. minSdk 24, targetSdk 36, compileSdk 37.

---

## 1. Source-stage conventions (tight — enforce at source, not config copy)

Pointer `Conventions` branch: always load; `KDoc` / `Architecture` branches: only on relevant tasks.

Enforcement lives in source — reference, don't copy:

- **Editor / format:** `.editorconfig` (`utf-8`, `lf`, 4-space indent, `ktlint_code_style = android_studio`,
  `max_line_length = 120`, trailing commas allowed, `ktlint_standard_filename = disabled` for `basis/tokens/**`). Format
  with `./gradlew ktlintFormat`; check with `ktlintCheck`.
- **Detekt (current rules):** `config/detekt/detekt.yml` — `maxIssues: 0`, exclusions `basis|basis>.*`, custom rulesets
  active (see exclusions for `OklchDerivation.kt`, `FontAssignment.kt`, etc.). Check with `./gradlew detekt`. **Analyse
  violations:** if source complies and rule looks wrong, treat as false positive; for custom rules, tweak the rule (
  targeted but generalised) to avoid recurring false positives. If special-case exemptions are required, suppress or
  except files in `detekt.yml` (best suited: `excludes` or module-level `exclude`). Don't disable rules locally; fix
  source or update rule/config.
- **Compliance gate:** conclude only after `./gradlew verifyAll` passes (assemble / test / lint / detekt / ktlintCheck /
  releaseApiCheck across all modules + build-logic). Single command, not piecemeal.
- **Source of truth / tight scope:** One owner per constant / logic (`Single source`). Changes stay tight — scoped, no
  drive-by renames / refactors. If a fix duplicates logic, fix the root or ask.
- **Public API & naming:** `Basis` prefix reserved strictly for public API root entrypoints, composables, and public
  contracts. Internal types, pipeline stages, and internal files remain unprefixed. Constants `SCREAMING_SNAKE_CASE`.
  Existing spacing/motion/shape constants predate convention; don't mass-rename.
- **Files & declarations:** 1:1 match between file name and primary declaration (`ClassName.kt`). Extension and
  top-level function files take the receiver type or cohesive domain noun (`IntentValidation.kt`,
  `ColorConversions.kt`). Suffixes `*ExtensionFunctions`, `*Utils`, `*Helper` are banned.
- **Suffix consistency:** Suffixes declare layer role: `<Domain>Tokens` (models), `<Dimension>Value` (units),
  `<Domain>Intent` / `<Domain>Control` / `<Domain>Overrides` (contracts), `<Domain><Stage>` (pipeline), `Basis<Name>` /
  `Basis<Name>Defaults` / `<Name>Tokens` (components).
- **Extension Functions:** Prefer extension functions for single-parameter functions on existing types. Exceptions:
  Primitive types (`Int`, `Float`, `Double`, `Long`, `Short`, `Byte`, `Char`, `Boolean`) and `String` — prefer top-level
  functions.
- **Terminology:** Use "token" — never "leaf" — across KDoc, comments, test names, identifiers, and compiler plugins.
- **Comments & readability (co-located):** Sophisticated, production-ready comments only when needed; concise; no
  personal notes / change-tracking. Order APIs public → internal → private; higher-level to lower-level; top to bottom.
  Put private constants at bottom of file, after public API, to avoid cluttering the top. No explanatory comments
  tracking this edit.

**Done when (conventions):** `Basis` prefix verified for public API only → 1:1 declaration match → suffix consistency
verified → no 'leaf' terminology (use 'token') → `SCREAMING_SNAKE_CASE` for new constants → no duplication (single
source) → tight, no drive-by → `./gradlew verifyAll` passes.

---

## 2. KDoc (tight — observations from source)

Pointer `KDoc` branch: only when adding/changing public composables, tokens, or config.

Rules (tight):

- **Coverage:** every public symbol (class, enum, interface, object, annotation, value/data class,
  public fun with contract, public property) has KDoc. Zero exceptions. Internal / private excluded.
- **Structure:** `/** One-line standalone summary. */` mandatory for enums / simple types. For complex
  types, brief paragraph only if contract is non-obvious. `@property` for primary-constructor properties;
  never redundant `@param` for same props. Brief `@param` / `@return` / `@throws` only when they carry
  non-obvious contracts (units, ranges, coercion vs reject, `null` meaning, required vs optional).
- **Contracts at property level:** `@property` must include unit (`dp`, `em`, `ms`), range (`>= 0`),
  coercion (`Float` truncated), or `null` meaning when applicable — observe `DpValue` (`>= 0`, finite).
- **Init / require:** `@throws` documents every `require` / `check` condition in init block.
- **References:** references to other sources must be explicitly put between squared braces (`[DpValue]`), not just
  mentioned in text. Don't invent references; only reference existing public symbols. Add import to the referenced
  symbol if needed, do not put entire path inline in KDoc.
- **Usage examples:** minimal fenced `kotlin` when adding new public component; `@sample` only if
  `build-logic` samples source set exists (observed: none yet — do not invent).
- **Voice:** third person, present, neutral (`Reports loop bodies...`, `Value wrapper for...`).
  Never first/second person (`we`, `your`), never imperative (`Use this...`), never marketing
  (`beautiful`, `elegant`).
- **Release-ready:** must pass Google / JetBrains / AndroidX KDoc bar. If not, ask.

Reference (disclosed — only load on `KDoc` branch): `basis-theme` source (`DpValue`, `ThemeMode`,
`BasisTokenPathFamily`) and `basis-components` / `basis-lint` public detectors for live patterns.
Don't restate token values; Governance / token docs own them.

---

## 3. Architecture — module level (volatile deep structure; use graphs)

Pointer `Architecture deep-dive` branch: only when restructuring or cross-module dependency debates. Deeper layer/DAG,
pipeline stage symmetry, and domain breakdown are volatile — do not restate here.

Modules (module-level only; see `build-logic` / `settings.gradle.kts` for exact roles):

- `basis-components`: Android library (`android.library`), Compose compiler, namespace
  `io.github.alph_a07.basis.components`, public API `Basis*` composables.
- `basis-theme`: Kotlin JVM (`kotlin.jvm`) + KSP (`ksp`), resolution / codegen (`ThemeMode`, `ResolvedTheme`, tokens),
  conventions `detekt-conventions` / `ktlint-conventions`.
- `basis-lint`: Kotlin JVM, detekt rules (`io.github.alph-a07:basis-detekt-rules`); custom ruleset at
  `config/detekt/detekt.yml`.
- `demo-app`: Android application (`android.application`), Compose compiler, namespace `io.github.alph_a07.basis.demo`;
  SDK `compileSdk = 37`, `minSdk = 24`, `targetSdk = 36`.
- `build-logic`: convention plugins (`verify-all-conventions`, `detekt-conventions`, `ktlint-conventions`).

For live dependency graphs, domain symmetry, stage decomposition, and token-path structures: leverage `graphify` (
context graph / import / batch extraction) and `understand-*` skills (knowledge graph, explain, diff, domain-model)
rather than maintaining static descriptions here. Re-check with `./gradlew verifyAll` after any module move.

---

## 4. Conflict with a rule

Stop before writing. Name rule. Say what the request breaks. Offer compliant alternative or options. Wait
for answer. Don't silently comply, don't work around.

If you think a rule is wrong / outdated: say so. Don't edit this file to resolve it.

