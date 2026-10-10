# AGENTS.md: Basis

Basis — Jetpack Compose design system. Public API `Basis`-prefixed. Apache 2.0. minSdk 24, targetSdk 36, compileSdk 37.

Hard constraints. Conflict → §5.

---

## 1. Graph first (navigation is graph-handled)

Trigger branches: `Graph` (not read yet), `Stale` (node old / `ORPHAN`), `Red` (`graph.sh` fails / `SETUP`).

- `.context/graph.json` is the index (`graph.sh` queries it; `.context/SCHEMA.md` formats).
- Don't open `graph.json` directly.
- If `graph.sh` unavailable (`SETUP`, no `jq`): say so, continue.

Sequence — complete when node read → code in anchor paths read → `Graph impact` reported:

1. `graph.sh overview` / `for-path <path>` to find nodes.
2. `graph.sh node <id> purpose invariants [public_surface]` — read narrowly.
3. `graph.sh stale <id ...>` — check freshness; trust code over `STALE`/`ORPHAN`.
4. Read code only within node anchor paths.
5. Fallback (only when no node / stale / missing): grep / repo-wide. State which in one line.

**Never edit `.context/`** unless explicitly asked (see `.context/prompts/`). When you change a file inside a node's anchor, report at message end: `Graph impact: <ids>` or `Graph impact: none`.

---

## 2. Source-stage conventions (not re-state config files)

Enforcement lives in source — reference, don't copy:

- **Editor / format:** `.editorconfig` (`utf-8`, `lf`, 4-space indent, `ktlint_code_style = android_studio`,
  `max_line_length = 120`, trailing commas allowed, `ktlint_standard_filename = disabled` for `basis/tokens/**`). Format
  with `./gradlew ktlintFormat`; check with `ktlintCheck`.
- **Detekt:** `config/detekt/detekt.yml` (build `maxIssues: 0`, exclusions `basis|basis>.*`, custom rulesets active).
  Check with `./gradlew detekt`. Don't disable rules locally; fix or ask.
- **Source of truth / tight scope:** One owner per constant / logic (`Single source`). Changes stay **tight** — scoped,
  no drive-by renames / refactors. If a fix duplicates logic, fix the root or ask.
- **Public API:** `Basis` prefix. Constants `SCREAMING_SNAKE_CASE`. Existing spacing/motion/shape constants predate
  convention; don't mass-rename.

**Done when (conventions):** `Basis` prefix verified → `SCREAMING_SNAKE_CASE` for new constants → no duplication (single
source) → tight, no drive-by.

---

## 3. KDoc (match committed patterns — brief, not over-engineered)

Pointer `KDoc` branch: only when adding/changing public composables, tokens, or config.

Compliant pattern from source (`ThemeMode`, `ResolvedTheme`):

- `/** One-line standalone summary. */` for enums / simple types.
- `/** ... */` + `@property` for primary-constructor properties; no redundant `@param` for same props.
- Brief `@param` / `@return` / `@throws` when they carry non-obvious contracts (units, ranges, coercion vs reject,
  `null` meaning).
- Public KDoc must be release-ready (Google / JetBrains / AndroidX bar). If it isn't, ask.
- Usage: minimal fenced `kotlin` example when adding new component; `@sample` if samples source set exists.
- Voice: third person, present, neutral. No marketing.

Reference (disclosed — only load on `KDoc` branch): `basis-components` / `basis-theme` source for live examples. Don't
restate token values; Governance / token docs own them.

---

## 4. Theme module / resolution framework

Graph delegation + brief mention (explicit enough to find; details in graph):

- Framework: `ThemeMode` (`Light`/`Dark`) → `ResolvedTheme` (full tree for one mode, carries `ColorTokens`,
  `MotionTokens`, `DepthTokens`, `RadiusTokens`, `SizeTokens`, `SpacingTokens`, `TypographyTokens`) →
  `ResolvedThemePair`. Resolution / codegen lives in `basis-theme`; consult `graph.sh node theme-module` /
  `tokens-module` for codegen rules.
- When touching theme: mention `ThemeMode` / `ResolvedTheme` / `ResolvedThemePair` in changes; don't duplicate token
  definitions — reference token nodes.
- Theme resolution is graph-handled: navigation through `.context/graph.json`; don't write theme-lookup instructions
  here.

---

## 5. Conflict with a rule

Stop before writing. Name rule (§ and bullet). Say what the request breaks. Offer compliant alternative or options. Wait
for answer. Don't silently comply, don't work around.

If you think a rule is wrong / outdated: say so. Don't edit this file to resolve it.

---

## 6. Project architecture (high-level)

Modules (from `settings.gradle.kts` / source):

- `basis-components`: Android library (`android.library`), Compose compiler, namespace
  `io.github.alph_a07.basis.components`, public API `Basis*` composables.
- `basis-theme`: Kotlin JVM (`kotlin.jvm`) + KSP (`ksp`), resolution / codegen (`ThemeMode`, `ResolvedTheme`, tokens),
  conventions `detekt-conventions` / `ktlint-conventions`.
- `basis-lint`: Kotlin JVM, detekt rules (`io.github.alph-a07:basis-detekt-rules`); custom ruleset at
  `config/detekt/detekt.yml`.
- `demo-app`: Android application (`android.application`), Compose compiler, namespace `io.github.alph_a07.basis.demo`;
  SDK `compileSdk = 37`, `minSdk = 24`, `targetSdk = 36`.
- `build-logic`: convention plugins (`verify-all-conventions`, `detekt-conventions`, `ktlint-conventions`).

Build / runtime:

- Gradle: 9.4.1 (`gradle/wrapper/gradle-wrapper.properties`); `gradle.properties` sets `configuration-cache = true`,
  `org.gradle.jvmargs=-Xmx2048m -Dfile.encoding=UTF-8`.
- SDK: `compileSdk 37`, `minSdk 24`, `targetSdk 36`; `local.properties` points `sdk.dir` to Android SDK (
  `/Users/itsjeel01/Library/Android/sdk`).
- Format / lint: `.editorconfig` (4-space, `android_studio`, 120 chars) + `gradlew ktlintFormat` / `ktlintCheck`;
  `gradlew detekt` (maxIssues 0, exclusions `basis|basis>.*`).

Navigation (no duplication here): use `.context/graph.json` + `graph.sh`; graph handles module dependencies, token
nodes, theme-module/codegen nodes.

---

## 7. Comments & readability

- Sophisticated, production-ready comments only when needed. Concise, no personal notes / change-tracking.
- No explanatory comments tracking this edit.
