package io.github.alph_a07.basis.theme.resolution

import io.github.alph_a07.basis.theme.core.ThemeMode
import io.github.alph_a07.basis.theme.resolution.identity.BrandTints
import io.github.alph_a07.basis.theme.tokens.color.ColorTokens
import io.github.alph_a07.basis.theme.tokens.core.ResolvedTheme
import io.github.alph_a07.basis.theme.tokens.motion.MotionTokens
import io.github.alph_a07.basis.theme.tokens.scalars.DepthTokens
import io.github.alph_a07.basis.theme.tokens.scalars.RadiusTokens
import io.github.alph_a07.basis.theme.tokens.scalars.SizeTokens
import io.github.alph_a07.basis.theme.tokens.scalars.SpacingTokens
import io.github.alph_a07.basis.theme.tokens.typography.TypographyTokens

/**
 * Token tree draft under construction for one [mode], carried between per-mode pipeline stages.
 *
 * Encapsulates the complete evolving state of a theme mode during resolution, including
 * synthesized neutral hue and brand tint strengths.
 *
 * @property mode Mode this draft is being resolved for.
 * @property color Semantic color tree, refined by derivation, control, and enforcement.
 * @property typography Role composites, with families resolved by the fonts stage.
 * @property spacing Spacing ladder after scaling and clamping.
 * @property radius Radius ladder after scaling and clamping.
 * @property depth Elevation ladder after scaling.
 * @property size Icon, avatar, control, and dot ladders after scaling.
 * @property motion Motion purposes after duration scaling.
 * @property neutralHue Mode-specific synthesized neutral hue in OKLCH degrees.
 * @property brandTints Mode-specific brand tint strengths applied during color derivation.
 */
internal data class ThemeDraft(
    val mode: ThemeMode,
    val color: ColorTokens,
    val typography: TypographyTokens,
    val spacing: SpacingTokens,
    val radius: RadiusTokens,
    val depth: DepthTokens,
    val size: SizeTokens,
    val motion: MotionTokens,
    val neutralHue: Float = 0f,
    val brandTints: BrandTints? = null,
) {
    /** Freezes this draft tree into the emitted theme for its mode. */
    fun toResolvedTheme(): ResolvedTheme = ResolvedTheme(
        mode = mode,
        color = color,
        typography = typography,
        spacing = spacing,
        radius = radius,
        depth = depth,
        size = size,
        motion = motion,
    )
}
