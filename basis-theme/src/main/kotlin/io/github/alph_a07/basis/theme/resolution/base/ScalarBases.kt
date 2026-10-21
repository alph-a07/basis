package io.github.alph_a07.basis.theme.resolution.base

import io.github.alph_a07.basis.theme.core.DpValue
import io.github.alph_a07.basis.theme.tokens.scalars.AvatarSizes
import io.github.alph_a07.basis.theme.tokens.scalars.ControlSizes
import io.github.alph_a07.basis.theme.tokens.scalars.DepthSpec
import io.github.alph_a07.basis.theme.tokens.scalars.DepthTokens
import io.github.alph_a07.basis.theme.tokens.scalars.DotSizes
import io.github.alph_a07.basis.theme.tokens.scalars.IconSizes
import io.github.alph_a07.basis.theme.tokens.scalars.RadiusTokens
import io.github.alph_a07.basis.theme.tokens.scalars.SizeTokens
import io.github.alph_a07.basis.theme.tokens.scalars.SpacingTokens

/**
 * Initializes the base spacing ladder.
 *
 * @param spacing Base magnitudes in dp, tightest first.
 * @return The base spacing ladder.
 */
internal fun baseSpacingTokens(spacing: FloatArray): SpacingTokens = SpacingTokens(
    level1 = DpValue(spacing[0]),
    level2 = DpValue(spacing[1]),
    level3 = DpValue(spacing[2]),
    level4 = DpValue(spacing[3]),
    level5 = DpValue(spacing[4]),
    level6 = DpValue(spacing[5]),
    level7 = DpValue(spacing[6]),
    level8 = DpValue(spacing[7]),
)

/**
 * Initializes the base radius ladder.
 *
 * The `none` and `full` sentinels are fixed, so mood roundness never moves them.
 *
 * @param radiusLevels Base magnitudes in dp for levels one through eight.
 * @return The base radius ladder.
 */
internal fun baseRadiusTokens(radiusLevels: FloatArray): RadiusTokens = RadiusTokens(
    none = DpValue(RADIUS_NONE_DP),
    level1 = DpValue(radiusLevels[0]),
    level2 = DpValue(radiusLevels[1]),
    level3 = DpValue(radiusLevels[2]),
    level4 = DpValue(radiusLevels[3]),
    level5 = DpValue(radiusLevels[4]),
    level6 = DpValue(radiusLevels[5]),
    level7 = DpValue(radiusLevels[6]),
    level8 = DpValue(radiusLevels[LAST_RADIUS_LEVEL]),
    full = DpValue(RADIUS_FULL_DP),
)

/**
 * Initializes the base four-level depth ladder.
 *
 * @param depth Base depth specs, lowest level first.
 * @return The base depth ladder.
 */
internal fun baseDepthTokens(depth: List<DepthSpec>): DepthTokens =
    DepthTokens(
        level1 = depth[FIRST_LEVEL],
        level2 = depth[1],
        level3 = depth[2],
        level4 = depth[3],
    )

/**
 * Initializes the base icon, avatar, control, and dot ladders.
 *
 * @param iconSizes Base icon magnitudes in dp, smallest first.
 * @param avatarSizes Base avatar magnitudes in dp, smallest first.
 * @param controlSizes Base control magnitudes in dp, smallest first.
 * @param dotSizes Base dot magnitudes in dp, smallest first.
 * @return The base size ladders.
 */
internal fun baseSizeTokens(
    iconSizes: FloatArray,
    avatarSizes: FloatArray,
    controlSizes: FloatArray,
    dotSizes: FloatArray,
): SizeTokens = SizeTokens(
    icon =
        IconSizes(
            level1 = DpValue(iconSizes[0]),
            level2 = DpValue(iconSizes[1]),
            level3 = DpValue(iconSizes[2]),
            level4 = DpValue(iconSizes[3]),
            level5 = DpValue(iconSizes[4]),
        ),
    avatar =
        AvatarSizes(
            level1 = DpValue(avatarSizes[0]),
            level2 = DpValue(avatarSizes[1]),
            level3 = DpValue(avatarSizes[2]),
            level4 = DpValue(avatarSizes[3]),
            level5 = DpValue(avatarSizes[4]),
        ),
    control =
        ControlSizes(
            level1 = DpValue(controlSizes[0]),
            level2 = DpValue(controlSizes[1]),
            level3 = DpValue(controlSizes[2]),
            level4 = DpValue(controlSizes[3]),
            level5 = DpValue(controlSizes[4]),
        ),
    dot =
        DotSizes(
            level1 = DpValue(dotSizes[0]),
            level2 = DpValue(dotSizes[1]),
            level3 = DpValue(dotSizes[2]),
        ),
)

/** Radius of the zero-radius sentinel ladder entry, in dp. */
private const val RADIUS_NONE_DP: Float = 0f

/** Radius of the pill sentinel ladder entry, in dp. */
private const val RADIUS_FULL_DP: Float = 9999f

/** Index of the first radius level in the base array. */
private const val FIRST_LEVEL: Int = 0

/** Index of the last radius level in the base array. */
private const val LAST_RADIUS_LEVEL: Int = 7
