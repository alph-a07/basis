# Contributing to Basis

Basis is a Jetpack Compose design system, published to Maven Central as `io.github.alph-a07`.

Conventions, architecture rules and the KDoc standard live in [AGENTS.md](AGENTS.md). This file covers
the mechanics of getting a change through: the toolchain, the enforced checks, and the traps in each.

## Setup

JDK 21 (`build-logic` owns the level; `foojay` fetches it if your JDK differs). Use `./gradlew` — the
wrapper pins the version.

```bash
git clone https://github.com/alph-a07/basis.git
cd basis
./gradlew installGitHooks
```

`installGitHooks` points `core.hooksPath` at `.githooks`. Without it the local checks never run.

In the IDE, enable EditorConfig support and reformat-on-save; both read the same `.editorconfig` ktlint
does. Leave *Rearrange code* and *Run code cleanup* off — neither has a CI equivalent, so they only add
diff noise.

IntelliJ flags every `ktlint_*` property as unsupported and reports `[*]` as overlapping `[*.{kt,kts}]`.
Both are expected: it has no ktlint vocabulary, and the overlap is how EditorConfig overrides work.
Unticking **Settings → Editor → Inspections → EditorConfig** silences them. Deleting the properties
does not.

## Layout

| Module | Role |
| --- | --- |
| `basis` | The published library. |
| `basis:tokens` | Pure Kotlin/JVM tokens. No Compose, no Android, no AndroidX. |
| `basis-lint` | Android Lint plugin (`SpOnlyFontSize`). Not a consumer of the library. |
| `demo` | Component samples. |
| `build-logic` | Convention plugins. **An included build, not a subproject.** |

Dependencies run one way: `basis:tokens` → `basis` → `demo`.

`build-logic` being an included build means the root `detekt` and `ktlintCheck` do not reach it. Any
change to a convention plugin needs `-p build-logic` or it ships unchecked.

## Workflow

Branch from `main` as `feature|bugfix|enhancement/Issue-<n>`. Commits and PR titles use
[Conventional Commits](https://www.conventionalcommits.org/) (`feat(button): add pill-shaped variant`),
at most 88 characters, with `!` for breaking. The PR title's type must match the branch — `bugfix/`
requires `fix`.

## Checks

```bash
./gradlew assemble test lint detekt ktlintCheck releaseApiCheck
./gradlew -p build-logic detekt ktlintCheck
```

The second line is easy to forget and is required.

| Concern | Tool | Config |
| --- | --- | --- |
| Formatting | ktlint 1.8.0 | `.editorconfig` |
| Kotlin/Android lint | detekt 1.23.8 | `config/detekt/detekt.yml` |
| Android correctness | Android Lint + `basis-lint` | AGP defaults |
| Public API | BCV 0.18.2 | `basis/api/basis.api` |

`.editorconfig` is the only place Kotlin style is declared. Where detekt and ktlint could both report
one problem, exactly one is enabled — the ownership table in `detekt.yml` records which, and why.

Fix-it commands:

```bash
./gradlew ktlintFormat           # formatting; then git add -A
./gradlew :basis:lintFix         # Android Lint, per module
```

`ktlintFormat` and `lintFix` rewrite in place. Run them, review the diff, re-stage — don't hand-edit to
satisfy a formatter.

## Traps

**`releaseApiCheck` lives on `:basis`, not the root.** `./gradlew :basis:releaseApiCheck`.

It diffs the public API against the committed baseline. On a published library that baseline is a
compatibility contract, so decide whether the change is *meant* to be public before regenerating.
Regenerating to make a build pass converts an accidental API change into an accepted one. If it wasn't
intended — a widened visibility, a dropped `internal`, a changed parameter type — revert the code
instead. If it was, `./gradlew :basis:releaseApiDump` and commit `basis/api/basis.api`.

**ktlint's `filter { exclude(...) }` does nothing.** It registers a pattern on a `PatternFilterable`
the plugin never applies to the task's file collection. Excluding build output means retargeting the
task's `source`, as `build-logic/build.gradle.kts` does.

**ktlint reports are not always cleared.** Hundreds of violations in `build/generated-sources` usually
means a stale report, not a real regression:

```bash
rm -rf build-logic/build/reports/ktlint build-logic/build/intermediates/ktLint
```

**detekt findings are semantic, not cosmetic.** Fix the code. If a rule is genuinely wrong for this
codebase, disable that one rule in `detekt.yml` with a comment; disabling a ruleset to clear a single
finding hides the next one too. `build.maxIssues` stays at `0`.

A config rejected with `Property '...' is misspelled` means the ruleset has no plugin on the classpath —
see `build-logic/build.gradle.kts`.

**`SpOnlyFontSize` runs in `basis:tokens` too,** where it is inert. Registered through
`lintChecks(project(":basis-lint"))` on every module so a future rule applies without a second edit. An
inert report there is expected.

**Configuration-cache failures** after a build-logic change: re-run with `--no-configuration-cache` to
confirm the cause, then fix it rather than disabling the cache.

## License

Apache 2.0. See [LICENSE](LICENSE).
