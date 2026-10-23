package io.github.alph_a07.basis.components.theme.conversion

import androidx.compose.runtime.Composable
import androidx.compose.runtime.ReadOnlyComposable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.unit.Dp
import io.github.alph_a07.basis.components.theme.BasisTheme
import io.github.alph_a07.basis.components.theme.font.FontFamilyRegistry
import io.github.alph_a07.basis.theme.intent.controls.overrides.ComponentId
import io.github.alph_a07.basis.theme.intent.controls.overrides.ComponentOverride
import io.github.alph_a07.basis.theme.intent.controls.overrides.ProminenceTier
import io.github.alph_a07.basis.theme.intent.controls.overrides.StateId
import io.github.alph_a07.basis.theme.intent.controls.overrides.Treatment
import io.github.alph_a07.basis.theme.intent.controls.overrides.VariantId
import io.github.alph_a07.basis.theme.resolution.component.ResolvedComponentStyle
import io.github.alph_a07.basis.theme.resolution.component.ResolvedUniversalStyle
import io.github.alph_a07.basis.theme.resolution.component.resolveComponentStyle as resolveThemeComponentStyle
import io.github.alph_a07.basis.theme.tokens.core.ResolvedTheme
import io.github.alph_a07.basis.theme.tokens.scalars.DepthSpec

/**
 * Resolves the style for [id], [variant], and [state] against the active [BasisTheme] ambient.
 *
 * Looks up any configured [ComponentOverride] from [BasisTheme.componentOverrides] and merges
 * it against the theme token tree according to cascading specificity precedence.
 *
 * @param id The component family identifier.
 * @param variant Optional variant within the family (e.g. [VariantId.Primary]).
 * @param state Optional interaction state (e.g. [StateId.Pressed]).
 * @return Fully resolved component style.
 */
@Composable
@ReadOnlyComposable
public fun BasisTheme.resolveComponentStyle(
    id: ComponentId,
    variant: VariantId? = null,
    state: StateId? = null,
): ResolvedComponentStyle = resolveThemeComponentStyle(
    id = id,
    variant = variant,
    state = state,
    overrides = componentOverrides,
    theme = current.theme,
)

/**
 * Resolves the universal style for [id], [variant], and [state] against the active [BasisTheme] ambient,
 * returning Compose-ready primitives.
 *
 * @param id The component family identifier.
 * @param variant Optional variant within the family (e.g. [VariantId.Primary]).
 * @param state Optional interaction state (e.g. [StateId.Pressed]).
 * @return Fully resolved Compose universal style.
 */
@Composable
@ReadOnlyComposable
public fun BasisTheme.resolveUniversalStyle(
    id: ComponentId,
    variant: VariantId? = null,
    state: StateId? = null,
): ComposeUniversalStyle = resolveComponentStyle(id, variant, state).universal.toComposeUniversalStyle(
    theme = current.theme,
    fontRegistry = fontRegistry,
)

/**
 * Compose-ready representation of a [ResolvedUniversalStyle].
 *
 * @property prominence Hierarchy tier of the component instance.
 * @property treatment Visual treatment family of the component instance.
 * @property surface Surface fill color.
 * @property content Foreground content color.
 * @property border Border stroke color.
 * @property radius Corner radius dimension.
 * @property typography Typography text style.
 * @property padding Outer content padding dimension.
 * @property gap Inner slot spacing dimension.
 * @property depth Elevation and shadow spec.
 */
public data class ComposeUniversalStyle(
    public val prominence: ProminenceTier? = null,
    public val treatment: Treatment? = null,
    public val surface: Color? = null,
    public val content: Color? = null,
    public val border: Color? = null,
    public val radius: Dp? = null,
    public val typography: TextStyle? = null,
    public val padding: Dp? = null,
    public val gap: Dp? = null,
    public val depth: DepthSpec? = null,
)

/**
 * Converts this [ResolvedUniversalStyle] to a Compose-ready [ComposeUniversalStyle].
 *
 * @param theme The resolved theme tree.
 * @param fontRegistry The registry used to resolve custom and catalog font families.
 * @return Mapped Compose universal style.
 */
public fun ResolvedUniversalStyle.toComposeUniversalStyle(
    theme: ResolvedTheme,
    fontRegistry: FontFamilyRegistry = FontFamilyRegistry.Default,
): ComposeUniversalStyle = ComposeUniversalStyle(
    prominence = prominence,
    treatment = treatment,
    surface = surface?.toColor(),
    content = content?.toColor(),
    border = border?.toColor(),
    radius = radius?.toDp(),
    typography = typography?.toTextStyle(theme.color, fontRegistry),
    padding = padding?.toDp(),
    gap = gap?.toDp(),
    depth = depth,
)

/**
 * Converts this [ResolvedUniversalStyle] to a Compose-ready [ComposeUniversalStyle] using the
 * ambient [BasisTheme].
 *
 * @return Mapped Compose universal style.
 */
@Composable
@ReadOnlyComposable
public fun ResolvedUniversalStyle.toComposeUniversalStyle(): ComposeUniversalStyle =
    toComposeUniversalStyle(BasisTheme.current.theme, BasisTheme.fontRegistry)

/**
 * Converts this [ResolvedComponentStyle]'s universal style to a Compose-ready [ComposeUniversalStyle].
 *
 * @param theme The resolved theme tree.
 * @param fontRegistry The registry used to resolve custom and catalog font families.
 * @return Mapped Compose universal style.
 */
public fun ResolvedComponentStyle.toComposeUniversalStyle(
    theme: ResolvedTheme,
    fontRegistry: FontFamilyRegistry = FontFamilyRegistry.Default,
): ComposeUniversalStyle = universal.toComposeUniversalStyle(theme, fontRegistry)

/**
 * Converts this [ResolvedComponentStyle]'s universal style to a Compose-ready [ComposeUniversalStyle] using
 * the ambient [BasisTheme].
 *
 * @return Mapped Compose universal style.
 */
@Composable
@ReadOnlyComposable
public fun ResolvedComponentStyle.toComposeUniversalStyle(): ComposeUniversalStyle =
    universal.toComposeUniversalStyle()
