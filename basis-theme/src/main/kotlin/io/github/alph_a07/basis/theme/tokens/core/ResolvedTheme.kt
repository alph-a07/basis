package io.github.alph_a07.basis.theme.tokens.core

import io.github.alph_a07.basis.theme.core.ThemeMode
import io.github.alph_a07.basis.theme.tokens.color.ColorTokens
import io.github.alph_a07.basis.theme.tokens.motion.MotionTokens
import io.github.alph_a07.basis.theme.tokens.scalars.DepthTokens
import io.github.alph_a07.basis.theme.tokens.scalars.RadiusTokens
import io.github.alph_a07.basis.theme.tokens.scalars.SizeTokens
import io.github.alph_a07.basis.theme.tokens.scalars.SpacingTokens
import io.github.alph_a07.basis.theme.tokens.typography.TypographyTokens

/**
 * Fully resolved theme for one [mode].
 *
 * @property mode Color mode this tree was derived for.
 * @property color Semantic color tree.
 * @property typography Role-centric typography composites.
 * @property spacing Eight-level spacing ladder.
 * @property radius Radius ladder with `none` and `full` sentinels.
 * @property depth Four-level elevation ladder.
 * @property size Icon, avatar, control, and dot ladders.
 * @property motion Semantic motion purposes.
 */
public data class ResolvedTheme(
    public val mode: ThemeMode,
    public val color: ColorTokens,
    public val typography: TypographyTokens,
    public val spacing: SpacingTokens,
    public val radius: RadiusTokens,
    public val depth: DepthTokens,
    public val size: SizeTokens,
    public val motion: MotionTokens,
)
