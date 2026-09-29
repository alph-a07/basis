# AGENTS.md: Basis

Basis is a stable, simple, configurable design system for Jetpack Compose. Public API is `Basis`-prefixed (`BasisButton`, `BasisTextField`). Apache 2.0. minSdk 24, targetSdk 36, compileSdk 37 (library, lint and demo app).

These rules are hard constraints, not suggestions. Where a rule and a request conflict, see §5.

## 1. Use the context graph before searching

The graph is `.context/graph.json`, a map of the codebase: modules, packages, components and concepts, with what each is for, its public surface, its invariants, and what depends on what. Query it with `bash .context/graph.sh` (format: `.context/SCHEMA.md`). Don't open or `cat` `graph.json` itself.

For any task involving code you haven't already read:

1. **Orient.** `graph.sh overview` lists every node in one line each. If you already have a file path, `graph.sh for-path <path>` tells you which nodes cover it.
2. **Read narrowly.** `graph.sh node <id> purpose invariants` first; add `public_surface`, `rationale`, `gotchas` only if needed. Follow edges only when the task crosses them: `deps <id>` for what it relies on, `used-by <id> [--all]` for what your change could break.
3. **Check freshness.** `graph.sh stale <id ...>` for the nodes you're relying on. A node reported `STALE` or `ORPHAN` is a hint, not a fact: trust the code over the node.
4. **Then read code**, only within the nodes' anchor paths.
5. **Fall back** to grep / repo-wide file search only when (a) no node covers the area, (b) a node you need is stale or orphaned, or (c) the node doesn't contain what you need. Say which, in one line.

If `graph.sh` fails with a `SETUP` error (for example, no `jq`), tell me, then continue with normal search and say the graph was unavailable.

The graph is a map, not an authority. The code and this file win over any node claim. Don't cite a node as evidence for a rule; cite the code or this file.

### Never write to the graph unless explicitly asked

Do not modify anything under `.context/`, and do not run `graph.sh put`, `rm`, `restamp` or `fmt`, unless my message explicitly asks you to build or update the graph (for example by running `.context/prompts/build.md` or `.context/prompts/update.md`). This holds even for a typo in a node, and even when your own change made a node stale.

Instead, when your change touches files inside any node's anchors, find the affected nodes with `graph.sh for-path <changed paths>` and end your final message with:

`Graph impact: <node ids>` (or `Graph impact: none`)

and stop there. Don't fix it. Also don't edit this file unless asked.

## 2. Architecture rules

**Module direction.** `basis:tokens` (pure Kotlin/JVM) ← main library ← demo app. Dependencies only point that way. Discover actual module names from `settings.gradle*`; don't guess. Additional module `basis-lint` is a lint plugin for the main library, not a consumer of it; It will be filled up as and when we feel need of lint rules. 

**Tokens module (`basis:tokens`, package `io.github.alph_a07.basis.tokens`).**
- Pure Kotlin/JVM. No Compose, Android or AndroidX dependency, ever.
- Holds definitions and derivation engines only. **No concrete brand/palette values**: no default color scheme, no baked categorical palette (not even Okabe-Ito). Concrete preset values live in the main library module.
- No bare hardcoded literals in function signatures. Derivation constants are exposed as fields on `BasisSchemeDerivationTuning` (`theme/`) and `BasisCategoricalTuning` (`color/`), which are nested on `BasisThemeConfig` as `derivationTuning` and `categoricalTuning`. Status hues are the one exception: fixed constants, not tunable.

**Main library (`basis`)**
- Layering is atoms (Internal) → molecules (Internal) → components (Public). Components are built by composing existing atoms/molecules, not by re-implementing them. Card is a `BasisSurface` preset; FAB is an icon-button variant. Creating a new atom or molecule is a big deal; ask first. 
- Interactive components use `Modifier.basisClickable` (resolver + indication + focus + touch target) instead of a hand-rolled `clickable`. It stays public so consumers' own components inherit accessibility.
- Sizes come from the `Sizing` token group (min touch target, icon sizes, control heights), not from per-component private size constants.
- Use Basis layout containers (Stack/Spacer-style) rather than raw `Row`/`Column` where one exists.
- No new third-party dependencies without asking.

**Source of truth for values.** Token values, atom/component lists and design decisions are owned by the Basis Governance sheet, which you can't read. Don't invent, tweak or "improve" token values. If a task needs a value that isn't already in code, ask me.

## 3. Code conventions

- Public API names carry the `Basis` prefix.
- Constants are `SCREAMING_SNAKE_CASE` (e.g. `WEIGHT_SEMIBOLD`). Existing spacing/motion/shape constants predate this; use the convention for anything new and don't mass-rename old ones unless asked.
- One source of truth. Every constant or piece of logic has one owner. If a fix would duplicate it, patch around it, or work around a problem in a consumer instead of the owner, stop and say so. Fix the root cause or ask.
- Keep changes scoped to the task. No drive-by refactors or renames.
- Keep comments sophisticated and production ready, do not add any explanatory or change-tracking comments. If a comment is needed, it should be clear and concise, and not include any personal notes or explanations.
- Professional, comprehensive enough and self-contained KDoc for public API. Don't leave a "TODO" or "FIXME" in public KDoc. KDoc need to be as good as any public libraries from Google, JetBrains, or AndroidX. If you can't write KDoc that good, ask me to do it.

## 4. Workflow and CI parity

- Branches: `feature/Issue-<n>`, `bugfix/Issue-<n>` or `enhancement/Issue-<n>`. `main` is protected.
- Commit messages: Conventional Commits, `<type>(<optional-scope>): <description>`, description <= 88 chars, `!` after type/scope for breaking. Types: `feat fix docs style refactor perf test build ci chore`. Example: `feat(button): add pill-shaped variant`.
- Don't run `git commit` or `git push` unless I ask.
- Before you call a task done, run what CI runs: `./gradlew assemble test lint detekt releaseApiCheck`. Report failures; don't hide them.
- If `releaseApiCheck` fails because of an intentional public-API change, stop and tell me. Don't regenerate or overwrite the API baseline unless asked.

## 5. When a request conflicts with a rule

Stop before writing code. Name the rule (section and bullet), say what the request would break, and offer the compliant alternative or the options if there are several. Wait for my answer. Don't silently comply, and don't work around the rule. If you think a rule is wrong or outdated, say that too. Don't edit this file to resolve it.