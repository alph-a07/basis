package io.github.alph_a07.basis.components.theme

import androidx.compose.foundation.LocalIndication
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.ReadOnlyComposable
import androidx.compose.runtime.remember
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import io.github.alph_a07.basis.components.modifiers.createBasisIndication
import io.github.alph_a07.basis.components.theme.BasisTheme.colors
import io.github.alph_a07.basis.components.theme.BasisTheme.current
import io.github.alph_a07.basis.components.theme.BasisTheme.typography
import io.github.alph_a07.basis.components.theme.conversion.toBasisColorLocals
import io.github.alph_a07.basis.components.theme.conversion.toBasisMotionLocals
import io.github.alph_a07.basis.components.theme.conversion.toBasisTypographyLocals
import io.github.alph_a07.basis.components.theme.conversion.toDp
import io.github.alph_a07.basis.components.theme.font.FontFamilyRegistry
import io.github.alph_a07.basis.components.theme.locals.BasisColorLocals
import io.github.alph_a07.basis.components.theme.locals.BasisMotionLocals
import io.github.alph_a07.basis.components.theme.locals.BasisTypographyLocals
import io.github.alph_a07.basis.components.theme.locals.LocalBasisTheme
import io.github.alph_a07.basis.theme.intent.BasisIntent
import io.github.alph_a07.basis.theme.intent.controls.ConstraintsControl
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
 * ### Nested themes
 * When a `BasisTheme` is nested inside an existing `BasisTheme` block, the nested block completely
 * replaces the ambient for its composable subtree. There is no implicit blending or merging of the
 * outer and inner themes or their underlying intents. This allows localized mode overrides (such as
 * a dark card inside a light screen), branded feature sections, or isolated component previews.
 *
 * @param theme The resolved single-mode theme tree.
 * @param fontRegistry Registry mapping font references to Compose font families. Defaults to
 * [FontFamilyRegistry.Default].
 * @param report Optional resolution diagnostics; passed through to [BasisTheme.current] for
 * advanced consumers; not required for normal component use.
 * @param constraints Hard constraints controls; defaults to empty [ConstraintsControl].
 * @param componentOverrides Component-level overrides; defaults to empty [ComponentOverrides].
 * @param content Composable subtree under the theme ambient.
 */
@Composable
public fun BasisTheme(
    theme: ResolvedTheme,
    fontRegistry: FontFamilyRegistry = FontFamilyRegistry.Default,
    report: ResolutionReport? = null,
    constraints: ConstraintsControl = ConstraintsControl(),
    componentOverrides: ComponentOverrides = ComponentOverrides(),
    content: @Composable () -> Unit,
) {
    val ambient = buildAmbient(theme, fontRegistry, report, constraints, componentOverrides)

    CompositionLocalProvider(
        LocalBasisTheme provides ambient,
        LocalIndication provides remember { createBasisIndication() },
        content = content,
    )
}

/**
 * Convenience overload that accepts a pre-resolved [ResolvedThemePair] and selects the tree for
 * [useDarkTheme].
 *
 * Supports single-mode and dual-mode resolution targets. If only one mode was requested and generated
 * (for example, light-only or dark-only), this falls back to the available tree regardless of
 * [useDarkTheme].
 *
 * @param pair Resolved light and dark pair.
 * @param useDarkTheme Whether to select the dark tree; defaults to [isSystemInDarkTheme].
 * @param fontRegistry Registry mapping font references to Compose font families. Defaults to
 * [FontFamilyRegistry.Default].
 * @param constraints Hard constraints controls; defaults to empty [ConstraintsControl].
 * @param componentOverrides Component-level overrides; defaults to empty [ComponentOverrides].
 * @param content Composable subtree under the theme ambient.
 */
@Composable
public fun BasisTheme(
    pair: ResolvedThemePair,
    useDarkTheme: Boolean = isSystemInDarkTheme(),
    fontRegistry: FontFamilyRegistry = FontFamilyRegistry.Default,
    constraints: ConstraintsControl = ConstraintsControl(),
    componentOverrides: ComponentOverrides = ComponentOverrides(),
    content: @Composable () -> Unit,
) {
    val theme = selectTheme(pair, useDarkTheme)

    BasisTheme(
        theme = theme,
        fontRegistry = fontRegistry,
        report = pair.report,
        constraints = constraints,
        componentOverrides = componentOverrides,
        content = content,
    )
}

/**
 * Convenience overload that runs [resolve] on [intent], selects the tree for [useDarkTheme], and
 * provides the ambient.
 *
 * The resolved pair is remembered across recompositions for the same [intent] instance. Supports
 * single-mode and dual-mode intent configurations.
 *
 * @param intent Design intent; defaults to empty [BasisIntent] which yields a coherent default theme.
 * @param useDarkTheme Whether to select the dark tree; defaults to [isSystemInDarkTheme].
 * @param fontRegistry Registry mapping font references to Compose font families. Defaults to
 * [FontFamilyRegistry.Default].
 * @param content Composable subtree under the theme ambient.
 */
@Composable
public fun BasisTheme(
    intent: BasisIntent = BasisIntent(),
    useDarkTheme: Boolean = isSystemInDarkTheme(),
    fontRegistry: FontFamilyRegistry = FontFamilyRegistry.Default,
    content: @Composable () -> Unit,
) {
    val pair = remember(intent) { resolve(intent) }
    val constraints = intent.control?.constraints ?: ConstraintsControl()
    val componentOverrides = intent.control?.components ?: ComponentOverrides()

    BasisTheme(
        pair = pair,
        useDarkTheme = useDarkTheme,
        fontRegistry = fontRegistry,
        constraints = constraints,
        componentOverrides = componentOverrides,
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

    /** Active component overrides configured on the theme ambient. */
    public val componentOverrides: ComponentOverrides
        @Composable @ReadOnlyComposable
        get() = requireAmbient().componentOverrides

    /** Hard constraints controls from the resolved intent. */
    public val constraints: ConstraintsControl
        @Composable @ReadOnlyComposable
        get() = requireAmbient().constraints

    /**
     * Minimum accessible touch target dimension resolved from theme constraints.
     *
     * Resolves to [ConstraintsControl.minTouchTarget] when configured, falling back to 48.dp.
     */
    public val minTouchTarget: Dp
        @Composable @ReadOnlyComposable
        get() = requireAmbient().constraints.minTouchTarget?.minSize?.toDp() ?: DEFAULT_MIN_TOUCH_TARGET_DP

    /**
     * Optional resolution diagnostics; present when the host passed the report through
     * or when using the [ResolvedThemePair] / [BasisIntent] overloads.
     *
     * Normal component implementations must not depend on its presence.
     */
    public val report: ResolutionReport?
        @Composable @ReadOnlyComposable
        get() = requireAmbient().report

    /** Registry mapping font references to Compose font families. */
    public val fontRegistry: FontFamilyRegistry
        @Composable @ReadOnlyComposable
        get() = requireAmbient().fontRegistry
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
    constraints: ConstraintsControl,
    componentOverrides: ComponentOverrides,
): BasisThemeAmbient {
    val colors = theme.color.toBasisColorLocals()

    return BasisThemeAmbient(
        theme = theme,
        colors = colors,
        typography = theme.typography.toBasisTypographyLocals(colors, fontRegistry),
        spacing = theme.spacing,
        radius = theme.radius,
        depth = theme.depth,
        size = theme.size,
        motion = theme.motion.toBasisMotionLocals(),
        componentOverrides = componentOverrides,
        report = report,
        constraints = constraints,
        fontRegistry = fontRegistry,
    )
}

private fun selectTheme(pair: ResolvedThemePair, useDarkTheme: Boolean): ResolvedTheme =
    (if (useDarkTheme) pair.dark ?: pair.light else pair.light ?: pair.dark)
        ?: error("ResolvedThemePair requires at least one mode.")

private val DEFAULT_MIN_TOUCH_TARGET_DP: Dp = 48.dp
