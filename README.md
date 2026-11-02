# Basis

A deterministic, intent-driven design system for Jetpack Compose, built on OKLCH color derivation, semantic typography composites, and accessible foundation primitives.

Published under the Apache 2.0 License.

---

## Features

- **Intent-Driven Resolution:** Express design intent via high-level axes (brand identity, mood, domain priors, accessibility floors). Basis deterministically derives a complete paired light/dark token tree.
- **Perceptually Uniform Color:** OKLCH-based color derivation guarantees contrast ratios, harmonic palette generation, and predictable accessibility compliance.
- **Accessible by Construction:** Foundation primitives enforce WCAG 2.1 touch target floors (48dp), accessible focus rings, and proper TalkBack semantics out of the box.
- **Single Choke Point:** Zero hardcoded styling knobs in components. Visual appearance flows strictly through theme tokens.

---

## Installation

Add the Basis components dependency to your app module's `build.gradle.kts`:

```kotlin
dependencies {
    implementation("io.github.alph-a07:basis-components:0.1.0")

    // Optional: for direct intent modeling or pure Kotlin JVM/JS modules
    implementation("io.github.alph-a07:basis-theme:0.1.0")
}
```

---

## Quickstart

### 1. Wrap Your App in `BasisTheme`

Wrap your composable hierarchy with `BasisTheme`. By default, it automatically adapts to the Android system dark theme:

```kotlin
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.runtime.Composable
import io.github.alph_a07.basis.components.theme.BasisTheme

@Composable
fun App() {
    BasisTheme(useDarkTheme = isSystemInDarkTheme()) {
        MainScreen()
    }
}
```

### 2. Express Design Intent

Instead of hand-crafting color hex codes and dimensions, define your product's design intent:

```kotlin
import io.github.alph_a07.basis.theme.core.color.ColorSpec
import io.github.alph_a07.basis.theme.intent.BasisIntent
import io.github.alph_a07.basis.theme.intent.BrandPresence
import io.github.alph_a07.basis.theme.intent.DomainIntent
import io.github.alph_a07.basis.theme.intent.IdentityIntent
import io.github.alph_a07.basis.theme.intent.InteractionPattern
import io.github.alph_a07.basis.theme.intent.MoodIntent
import io.github.alph_a07.basis.theme.intent.MoodPreset
import io.github.alph_a07.basis.theme.intent.ProductDomain

val AppIntent = BasisIntent(
    identity = IdentityIntent(
        brandColor = ColorSpec.Hex("#0284C7"),
        presence = BrandPresence.Strong,
    ),
    mood = MoodIntent(preset = MoodPreset.Professional),
    domain = DomainIntent(
        domains = setOf(ProductDomain.Productivity),
        interactions = setOf(InteractionPattern.DataNavigation),
    ),
)
```

Pass the intent directly into `BasisTheme`:

```kotlin
BasisTheme(intent = AppIntent, useDarkTheme = isSystemInDarkTheme()) {
    MainScreen()
}
```

---

## Consuming Design Tokens

Access resolved tokens via `BasisTheme`:

```kotlin
// Semantic Colors
val background = BasisTheme.colors.surface.default
val cardSurface = BasisTheme.colors.surface.elevated
val primaryBrand = BasisTheme.colors.brand.primary
val textPrimary = BasisTheme.colors.content.default
val textInverse = BasisTheme.colors.content.inverse

// Semantic Status Colors
val successBg = BasisTheme.colors.positive.surface
val successText = BasisTheme.colors.positive.content

// Typography Composites (Metrics + Font Family + Semantic Color)
val headingStyle = BasisTheme.typography.structure.level2
val bodyStyle = BasisTheme.typography.content.level1
val captionStyle = BasisTheme.typography.metadata.level1

// Spatial Dimensions
val horizontalPadding = BasisTheme.spacing.level4.toDp()
val cornerRadius = BasisTheme.radius.level3.toDp()
```

---

## Foundation Modifiers

Basis provides modifier extensions to build custom controls with built-in accessibility, touch target compliance, and press indication:

| Modifier | Description |
| --- | --- |
| `Modifier.basisSurface(...)` | Applies semantic background fill, shape clipping, and elevation. |
| `Modifier.basisClickable(...)` | Wires click handling, press indication ripple, and accessible roles. |
| `Modifier.basisSelectable(...)` | Configures radio/tab selection state with theme indication. |
| `Modifier.basisToggleable(...)` | Wires switch/checkbox state transitions. |
| `Modifier.basisMinTouchTarget()` | Enforces the 48dp minimum accessible touch target floor. |
| `Modifier.basisFocusRing(...)` | Renders high-visibility theme focus indicators for keyboard navigation. |
| `Modifier.basisBorder(...)` | Applies subtle hairline or accent borders. |
| `Modifier.basisPadding(...)` | Applies spacing token dimensions. |

### Example: Building a Custom Themed Card & Button

```kotlin
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.BasicText
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.unit.dp
import io.github.alph_a07.basis.components.foundation.modifier.basisBorder
import io.github.alph_a07.basis.components.foundation.modifier.basisClickable
import io.github.alph_a07.basis.components.foundation.modifier.basisFocusRing
import io.github.alph_a07.basis.components.foundation.modifier.basisMinTouchTarget
import io.github.alph_a07.basis.components.foundation.modifier.basisSurface
import io.github.alph_a07.basis.components.theme.BasisTheme
import io.github.alph_a07.basis.components.theme.conversion.toDp

@Composable
fun OrderSummaryCard(onCheckout: () -> Unit) {
    val cardShape = RoundedCornerShape(BasisTheme.radius.level3.toDp())
    val buttonShape = RoundedCornerShape(BasisTheme.radius.level2.toDp())

    Box(
        modifier = Modifier
            .fillMaxWidth()
            .basisSurface(
                shape = cardShape,
                color = BasisTheme.colors.surface.elevated,
            )
            .basisBorder(
                width = 1.dp,
                color = BasisTheme.colors.border.default,
                shape = cardShape,
            )
            .padding(BasisTheme.spacing.level4.toDp()),
    ) {
        Column {
            BasicText(
                text = "Order Details",
                style = BasisTheme.typography.structure.level3,
            )

            Spacer(modifier = Modifier.height(BasisTheme.spacing.level2.toDp()))

            BasicText(
                text = "All items packaged and ready for delivery.",
                style = BasisTheme.typography.content.level1,
            )

            Spacer(modifier = Modifier.height(BasisTheme.spacing.level4.toDp()))

            Box(
                modifier = Modifier
                    .basisSurface(
                        shape = buttonShape,
                        color = BasisTheme.colors.brand.primary,
                    )
                    .basisFocusRing(shape = buttonShape)
                    .basisClickable(role = Role.Button, onClick = onCheckout)
                    .basisMinTouchTarget()
                    .padding(
                        horizontal = BasisTheme.spacing.level4.toDp(),
                        vertical = BasisTheme.spacing.level2.toDp(),
                    ),
            ) {
                BasicText(
                    text = "Confirm Checkout",
                    style = BasisTheme.typography.content.level1.copy(
                        color = BasisTheme.colors.content.inverse,
                    ),
                )
            }
        }
    }
}
```

---

## Interactive Documentation & Theme Studio

Explore documentation, guides, and the interactive web workbench:

- **Documentation Portal:** [Basis Documentation](https://alph-a07.github.io/basis/)
- **Theme Studio:** Test and preview design intents interactively in the web browser at `/studio`.
- **Sample App:** Run `:demo-app` on an Android emulator or device to experience live theme resolution in Jetpack Compose.

---

## Contributing

For codebase architecture, development environment setup, and engineering invariants for authoring catalog components, see [CONTRIBUTING.md](CONTRIBUTING.md) and [AGENTS.md](AGENTS.md).
