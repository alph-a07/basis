package io.github.alph_a07.basis.theme.resolution

import io.github.alph_a07.basis.theme.core.ThemeMode
import io.github.alph_a07.basis.theme.core.color.Oklch
import io.github.alph_a07.basis.theme.intent.BrandPresence
import io.github.alph_a07.basis.theme.tokens.color.ColorTokens
import io.github.alph_a07.basis.theme.tokens.core.ResolvedTheme
import io.github.alph_a07.basis.theme.tokens.motion.MotionTokens
import io.github.alph_a07.basis.theme.tokens.scalars.DepthTokens
import io.github.alph_a07.basis.theme.tokens.scalars.RadiusTokens
import io.github.alph_a07.basis.theme.tokens.scalars.SizeTokens
import io.github.alph_a07.basis.theme.tokens.scalars.SpacingTokens
import io.github.alph_a07.basis.theme.tokens.typography.TypographyTokens

/**
 * Token tree under construction for one [mode], carried between pipeline stages.
 *
 * @property mode Mode this tree is derived for.
 * @property color Semantic color tree, refined by identity, derivation, and enforcement.
 * @property typography Role composites, with families resolved by the fonts stage.
 * @property spacing Spacing ladder after scaling and clamping.
 * @property radius Radius ladder after scaling and clamping.
 * @property depth Elevation ladder after scaling.
 * @property size Icon, avatar, control, and dot ladders after scaling.
 * @property motion Motion purposes after duration scaling.
 * @property neutralHue Hue shared by non-anchor neutrals, borders, and surfaces, in degrees.
 * @property brandPrimary Immutable brand hue anchor; enforcement may move lightness and chroma only.
 * @property presence Presence plan in effect, null when no brand color anchors one.
 */
internal data class WorkingTheme(
    val mode: ThemeMode,
    val color: ColorTokens,
    val typography: TypographyTokens,
    val spacing: SpacingTokens,
    val radius: RadiusTokens,
    val depth: DepthTokens,
    val size: SizeTokens,
    val motion: MotionTokens,
    val neutralHue: Float,
    val brandPrimary: Oklch?,
    val presence: BrandPresence?,
) {
    /** Freezes this working tree into the emitted theme for its mode. */
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
