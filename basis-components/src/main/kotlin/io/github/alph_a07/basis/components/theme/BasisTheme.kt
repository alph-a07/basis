package io.github.alph_a07.basis.components.theme

import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.ReadOnlyComposable
import io.github.alph_a07.basis.components.theme.BasisTheme.colors
import io.github.alph_a07.basis.components.theme.BasisTheme.current
import io.github.alph_a07.basis.components.theme.BasisTheme.typography
import io.github.alph_a07.basis.components.theme.conversion.toBasisColorLocals
import io.github.alph_a07.basis.components.theme.conversion.toBasisMotionLocals
import io.github.alph_a07.basis.components.theme.conversion.toBasisTypographyLocals
import io.github.alph_a07.basis.components.theme.font.FontFamilyRegistry
import io.github.alph_a07.basis.theme.intent.BasisIntent
import io.github.alph_a07.basis.theme.intent.controls.overrides.ComponentOverrides
import io.github.alph_a07.basis.theme.resolution.report.ResolutionReport
import io.github.alph_a07.basis.theme.resolution.resolve
import io.github.alph_a07.basis.theme.tokens.core.ResolvedTheme
import io.github.alph_a07.basis.theme.tokens.core.ResolvedThemePair
import io.github.alph_a07.basis.theme.tokens.scalars.DepthTokens
import io.github.alph_a07.basis.theme.tokens.scalars.RadiusTokens
import io.github.alph_a07.basis.theme.tokens.scalars.SizeTokens
import io.github.alph_a07.basis.theme.tokens.scalars.SpacingTokens
import io.github.alph_a07.basis.theme.tokens.typography.FontFamilyRef

/**
 * Ambient theme gate — all Basis components must be used within a `BasisTheme` block.
 *
 * ```kotlin
 * val pair = remember(intent) { resolve(intent) }
 * val theme = if (isSystemInDarkTheme()) pair.dark ?: pair.light!! else pair.light ?: pair.dark!!
 *
 * BasisTheme(theme = theme, report = pair.report) {
 *     // Basis components + app UI
 * }
 * ```
 *
 * Custom fonts must be registered in [fontRegistry] before entering this block; an unregistered
 * [FontFamilyRef.Custom] key will throw at theme construction time. Catalog Google Fonts are
 * resolved and downloaded automatically using [FontFamilyRegistry.Default].
 *
 * @param theme The resolved single-mode theme tree.
 * @param fontRegistry Registry mapping font references to Compose font families. Defaults to
 * [FontFamilyRegistry.Default].
 * @param report Optional resolution diagnostics; passed through to [BasisTheme.current] for
 * advanced consumers; not required for normal component use.
 * @param content Composable subtree under the theme ambient.
 */
@Composable
public fun BasisTheme(
    theme: ResolvedTheme,
    fontRegistry: FontFamilyRegistry = FontFamilyRegistry.Default,
    report: ResolutionReport? = null,
    content: @Composable () -> Unit,
) {
    val ambient = buildAmbient(theme, fontRegistry, report)

    CompositionLocalProvider(LocalBasisTheme provides ambient, content = content)
}

/**
 * Convenience overload that accepts a pre-resolved [ResolvedThemePair] and selects the tree for
 * [useDarkTheme].
 *
 * Falls back to the available tree when the requested mode was not generated (e.g. a `LightOnly`
 * pair used with [useDarkTheme] = true receives the light tree).
 *
 * @param pair Resolved light and dark pair.
 * @param useDarkTheme Whether to select the dark tree.
 * @param fontRegistry Registry mapping font references to Compose font families. Defaults to
 * [FontFamilyRegistry.Default].
 * @param content Composable subtree under the theme ambient.
 */
@Composable
public fun BasisTheme(
    pair: ResolvedThemePair,
    useDarkTheme: Boolean,
    fontRegistry: FontFamilyRegistry = FontFamilyRegistry.Default,
    content: @Composable () -> Unit,
) {
    val theme = selectTheme(pair, useDarkTheme)

    BasisTheme(
        theme = theme,
        fontRegistry = fontRegistry,
        report = pair.report,
        content = content,
    )
}

/**
 * Convenience overload that runs [resolve] on [intent], selects the tree for [useDarkTheme], and
 * provides the ambient.
 *
 * This overload is intended for simple use cases. When the caller manages a resolved pair (e.g.
 * to access the [ResolutionReport] independently), use the primary overload with [ResolvedTheme].
 *
 * @param intent Design intent; the empty intent yields a coherent default theme.
 * @param useDarkTheme Whether to select the dark tree.
 * @param fontRegistry Registry mapping font references to Compose font families. Defaults to
 * [FontFamilyRegistry.Default].
 * @param content Composable subtree under the theme ambient.
 */
@Composable
public fun BasisTheme(
    intent: BasisIntent,
    useDarkTheme: Boolean,
    fontRegistry: FontFamilyRegistry = FontFamilyRegistry.Default,
    content: @Composable () -> Unit,
) {
    val pair = resolve(intent)

    BasisTheme(
        pair = pair,
        useDarkTheme = useDarkTheme,
        fontRegistry = fontRegistry,
        content = content,
    )
}

/**
 * Accessor object for reading theme values inside a `BasisTheme` block.
 *
 * Every property calls [requireAmbient] internally, so reading any value outside a `BasisTheme`
 * block throws [IllegalStateException] immediately with a descriptive message.
 *
 * ```kotlin
 * val surfaceColor = BasisTheme.colors.surface.default  // Compose Color
 * val bodyStyle   = BasisTheme.typography.content.level2 // TextStyle
 * ```
 */
public object BasisTheme {

    /**
     * Full ambient for the current subtree.
     *
     * Prefer the typed accessors ([colors], [typography], etc.) for normal component work;
     * use [current] to access [BasisThemeAmbient.theme] (the raw OKLCH tree) or
     * [BasisThemeAmbient.report] for diagnostics.
     */
    public val current: BasisThemeAmbient
        @Composable @ReadOnlyComposable
        get() = requireAmbient()

    /** Compose-ready color locals. */
    public val colors: BasisColorLocals
        @Composable @ReadOnlyComposable
        get() = requireAmbient().colors

    /** Compose-ready typography locals. */
    public val typography: BasisTypographyLocals
        @Composable @ReadOnlyComposable
        get() = requireAmbient().typography

    /** Spacing ladder. */
    public val spacing: SpacingTokens
        @Composable @ReadOnlyComposable
        get() = requireAmbient().spacing

    /** Corner radius ladder. */
    public val radius: RadiusTokens
        @Composable @ReadOnlyComposable
        get() = requireAmbient().radius

    /** Elevation and shadow ladder. */
    public val depth: DepthTokens
        @Composable @ReadOnlyComposable
        get() = requireAmbient().depth

    /** Icon, avatar, control, and dot size ladders. */
    public val size: SizeTokens
        @Composable @ReadOnlyComposable
        get() = requireAmbient().size

    /** Compose animation-spec counterparts of semantic motion purposes. */
    public val motion: BasisMotionLocals
        @Composable @ReadOnlyComposable
        get() = requireAmbient().motion

    /** Per-component style patches from the resolved intent. */
    public val componentPatches: ComponentOverrides
        @Composable @ReadOnlyComposable
        get() = requireAmbient().componentPatches
}

/**
 * Returns the current [BasisThemeAmbient] or throws [IllegalStateException] when called outside
 * a `BasisTheme` block.
 *
 * Every public Basis component calls this (directly or through [BasisTheme] accessors) so
 * the error surfaces at the first composable read, not at a silent default.
 */
@Composable
@ReadOnlyComposable
internal fun requireAmbient(): BasisThemeAmbient =
    LocalBasisTheme.current
        ?: error("Basis components must be used within BasisTheme { … }")

private fun buildAmbient(
    theme: ResolvedTheme,
    fontRegistry: FontFamilyRegistry,
    report: ResolutionReport?,
): BasisThemeAmbient = BasisThemeAmbient(
    theme = theme,
    colors = theme.color.toBasisColorLocals(),
    typography = theme.typography.toBasisTypographyLocals(theme.color, fontRegistry),
    spacing = theme.spacing,
    radius = theme.radius,
    depth = theme.depth,
    size = theme.size,
    motion = theme.motion.toBasisMotionLocals(),
    componentPatches = ComponentOverrides(),
    report = report,
)

private fun selectTheme(pair: ResolvedThemePair, useDarkTheme: Boolean): ResolvedTheme =
    (if (useDarkTheme) pair.dark ?: pair.light else pair.light ?: pair.dark)
        ?: error("ResolvedThemePair requires at least one mode.")
