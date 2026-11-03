---
name: basis-create-component
description: Authoring guide and architectural rules for creating new Basis Jetpack Compose catalog components.
---

# Basis Create Component Skill

Use this skill when authoring new Jetpack Compose components in `basis-components`.

## 1. Naming & Declaration Conventions

- **Component Name:** `Basis<Name>` (e.g., `BasisButton`, `BasisSwitch`, `BasisTextField`).
- **Defaults Object:** `Basis<Name>Defaults` for default sizes, paddings, and constants.
- **Prefix Rule:** The `Basis` prefix is reserved strictly for public API root entrypoints, composables, and public contracts. Internal types and private helpers remain unprefixed.
- **1:1 Declaration Match:** Every public composable or class resides in a file named after the primary declaration (`Basis<Name>.kt`).
- **Terminology:** Always use "token" — never "leaf".

## 2. Token Consumption & Ambient Rules

Components **never** accept raw hex strings, hardcoded dimension `dp`, or raw font sizes. All visual attributes must resolve from `BasisTheme`:

```kotlin
// Colors
val surfaceColor = BasisTheme.colors.surface.elevated
val brandColor = BasisTheme.colors.brand.primary
val contentColor = BasisTheme.colors.content.default
val contentInverse = BasisTheme.colors.content.inverse

// Typography
val textStyle = BasisTheme.typography.content.level1

// Spacing & Radius
val paddingHorizontal = BasisTheme.spacing.level4.toDp()
val cornerRadius = BasisTheme.radius.level2.toDp()

// Motion
val motionSpec = BasisTheme.motion.interactive.spatial
```

## 3. Foundation Composition Pattern

Composables do not inherit from base classes. Build higher-order components by piping foundation modifiers into composable slots:

| Concern | Foundation Modifier | Role |
| --- | --- | --- |
| Base foundation | `Modifier.basisModifier()` | Common root for all Basis modifiers and components |
| Surface fill & clipping | `Modifier.basisSurface(shape, color)` | Background fill and clipping |
| Click interactions | `Modifier.basisClickable(role, onClick)` | Touch handling and a11y click action |
| Selection interactions | `Modifier.basisSelectable(selected, role, onClick)` | Radio and chip selection |
| Toggle interactions | `Modifier.basisToggleable(value, role, onValueChange)` | Switch and checkbox toggling |
| Focus affordance | `Modifier.basisFocusRing(shape)` | Accessible focus ring indicator |
| Touch target | `Modifier.basisMinTouchTarget()` | Enforces the 48dp floor |
| Border | `Modifier.basisBorder(width, color, shape)` | Subtle border stroke |
| Padding | `Modifier.basisPadding(...)` | Token-based inner padding |

## 4. Component Style Resolution

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

## 5. KDoc Requirements

Every public declaration must include release-ready KDoc:
- Third-person, present, neutral tone (e.g., `Displays an interactive button...`).
- Document all parameters (`@param`).
- Document properties in primary constructors (`@property`).
- Document exception contracts (`@throws`).
- References to other types in square brackets (`[BasisTheme]`).

## 6. Documentation Synchronization (Mandatory)

Documentation must be created and updated in lockstep with the component implementation in the same task:
1. Annotate the component with `@BasisComponentDoc(id = "<id>", family = "<Family>", role = "<Role>", ...)` from `io.github.alph_a07.basis.components.annotation`.
2. Author the companion sidecar in `docs/docs-model/fixtures/<id>.sidecar.mdx` with usage guidelines (`do`, `dont`, `notes`) and an `## Accessibility` section.
3. Run `./gradlew :docs:docs-extract:generateComponentsJson` to extract the component and update the catalog.
4. Validate schemas and fixtures with `npm test --prefix docs/docs-model`.
5. **Zero phantom components:** Never document undeveloped or non-existent components; documentation must strictly reflect real, implemented source code.

## 7. Verification Checklist

1. `./gradlew ktlintFormat` & `./gradlew ktlintCheck`
2. `./gradlew detekt` (0 issues allowed)
3. `./gradlew :basis-components:releaseApiDump` (dump new public API to `basis-components.api`)
4. `./gradlew :docs:docs-extract:generateComponentsJson` & `npm test --prefix docs/docs-model`
5. `npm test --prefix docs/docs-site`
6. `./gradlew verifyAll` (must pass 100%)
