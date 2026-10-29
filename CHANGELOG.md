# Changelog

All notable changes to the Basis design system and its published modules are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## Versioning Policy

- **Pre-1.0 (`0.x.y`)**: During the `0.x.y` release cycle, public contracts and token models are stabilizing. Minor releases (such as `0.1.0` to `0.2.0`) may introduce breaking API changes. Every breaking change is documented in the release notes below with replacement guidance.
- **Post-1.0 (`x.y.z`)**: Breaking changes increment the major version. Minor releases add backwards-compatible features, and patch releases provide bug fixes.
- **Deprecations**: APIs scheduled for removal will be marked with Kotlin's `@Deprecated(replaceWith = ...)` for at least one minor release cycle prior to deletion.

---

## [0.1.0] - 2026-10-29

Initial public release of the Basis design system for Jetpack Compose.

### Highlights by Module

#### `basis-theme`
- **Resolution Engine**: Pure Kotlin multiplatform engine converting `BasisIntent` (`IdentityIntent`, `MoodIntent`, `DomainIntent`, `ControlIntent`) into typed token trees for colors, typography, spacing, radius, depth, size, and motion.
- **OKLCH Color Modeling**: Enforces automated WCAG AA contrast floors (≥ 4.5:1 for body text, ≥ 3:1 for interactive controls) with uniform lightness across hues.
- **Tonal Dark Mode**: Derives physical surface luminance steps (recessed: 0.12, default: 0.16, elevated: 0.22) instead of relying on invisible drop shadows.
- **Mood Presets & Knobs**: 7 archetypes on `MoodPreset` (Neutral, Calm, Professional, Bold, Playful, Minimal, Expressive) paired with 8 continuous scalar axes (`MoodKnobs`).
- **Domains & Interaction Patterns**: 10 industry domains (`ProductDomain`) and 11 practical interaction archetypes (`InteractionPattern`).
- **Component Overrides**: Fine-grained style patches via `ControlIntent.components` and `UniversalStylePatch` targeting semantic token paths.
- **Theme Diagnostics**: Emits an auditable `ResolutionReport` with status entries (`Honored`, `Modulated`, `OverriddenByConstraint`, `Rejected`, `Absent`) for automated CI verification.

#### `basis-components`
- **`BasisTheme` Composable**: Root ambient provider with automatic system dark mode synchronization via `useDarkTheme`.
- **Foundation Modifiers**: Atomic modifiers including `basisSurface()`, `basisMinTouchTarget()`, `basisBorder()`, `basisClickable()`, `basisFocusRing()`, `basisPadding()`, `basisSelectable()`, and `basisToggleable()`.
- **Token Conversions**: Direct conversion extensions for Jetpack Compose (`toDp()`, `TextStyle`, `Color`).
- **Font Management**: `FontFamilyRegistry`, `AssetFont`, `ResourceFont`, and automated Google Font downloader (`GoogleFontDownloader`).
- **Content Color Ambient**: `LocalBasisContentColor` provides automatic foreground content color inheritance across surface layers.

#### `basis-lint`
- **Typography Unit Enforcement**: Android Lint detector (`SpOnlyFontSizeDetector`) enforcing scalable text dimension units (`sp` only for font size, line height, and letter spacing) across client layouts.

### Migration Notes (0.1.0)

- Initial release. No migration required from prior versions.
