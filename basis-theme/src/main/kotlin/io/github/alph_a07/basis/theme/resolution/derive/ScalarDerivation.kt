package io.github.alph_a07.basis.theme.resolution.derive

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
import kotlin.math.roundToInt

/**
 * Applies the spacing multiplier to every level of the ladder.
 *
 * @param spacing Seeded spacing ladder.
 * @param modulators Scalar multipliers in effect.
 * @return The scaled spacing ladder.
 */
internal fun deriveSpacingTokens(spacing: SpacingTokens, modulators: ScalarModulators): SpacingTokens {
    fun level(value: DpValue): DpValue = DpValue(value.value * modulators.spacing)

    return SpacingTokens(
        level1 = level(spacing.level1),
        level2 = level(spacing.level2),
        level3 = level(spacing.level3),
        level4 = level(spacing.level4),
        level5 = level(spacing.level5),
        level6 = level(spacing.level6),
        level7 = level(spacing.level7),
        level8 = level(spacing.level8),
    )
}

/**
 * Applies the radius multiplier to every level except the `none` and `full` sentinels.
 *
 * @param radius Seeded radius ladder.
 * @param modulators Scalar multipliers in effect.
 * @return The scaled radius ladder.
 */
internal fun deriveRadiusTokens(radius: RadiusTokens, modulators: ScalarModulators): RadiusTokens {
    fun level(value: DpValue): DpValue = DpValue(value.value * modulators.radius)

    return radius.copy(
        level1 = level(radius.level1),
        level2 = level(radius.level2),
        level3 = level(radius.level3),
        level4 = level(radius.level4),
        level5 = level(radius.level5),
        level6 = level(radius.level6),
        level7 = level(radius.level7),
        level8 = level(radius.level8),
    )
}

/**
 * Scales the depth ladder magnitudes without adding or removing levels.
 *
 * @param depth Seeded depth ladder.
 * @param modulators Scalar multipliers in effect.
 * @return The scaled depth ladder.
 */
internal fun deriveDepthTokens(depth: DepthTokens, modulators: ScalarModulators): DepthTokens = DepthTokens(
    level1 = depth.level1.scaled(modulators.depth),
    level2 = depth.level2.scaled(modulators.depth),
    level3 = depth.level3.scaled(modulators.depth),
    level4 = depth.level4.scaled(modulators.depth),
)

private fun DepthSpec.scaled(scale: Float): DepthSpec = DepthSpec(
    elevation = DpValue(elevation.value * scale),
    shadowAlpha = shadowAlpha,
    shadowBlur = DpValue(shadowBlur.value * scale),
    shadowYOffset = DpValue(shadowYOffset.value * scale),
)

/**
 * Scales each size ladder by its own multiplier.
 *
 * @param size Seeded size ladders.
 * @param modulators Scalar multipliers in effect.
 * @return The scaled size ladders.
 */
internal fun deriveSizeTokens(size: SizeTokens, modulators: ScalarModulators): SizeTokens {
    fun icon(value: DpValue): DpValue = DpValue(value.value * modulators.iconDot)

    fun avatar(value: DpValue): DpValue = DpValue(value.value * modulators.avatar)

    fun control(value: DpValue): DpValue = DpValue(value.value * modulators.control)

    fun dot(value: DpValue): DpValue = DpValue(value.value * modulators.iconDot)

    return SizeTokens(
        icon =
            IconSizes(
                level1 = icon(size.icon.level1),
                level2 = icon(size.icon.level2),
                level3 = icon(size.icon.level3),
                level4 = icon(size.icon.level4),
                level5 = icon(size.icon.level5),
            ),
        avatar =
            AvatarSizes(
                level1 = avatar(size.avatar.level1),
                level2 = avatar(size.avatar.level2),
                level3 = avatar(size.avatar.level3),
                level4 = avatar(size.avatar.level4),
                level5 = avatar(size.avatar.level5),
            ),
        control =
            ControlSizes(
                level1 = control(size.control.level1),
                level2 = control(size.control.level2),
                level3 = control(size.control.level3),
                level4 = control(size.control.level4),
                level5 = control(size.control.level5),
            ),
        dot =
            DotSizes(
                level1 = dot(size.dot.level1),
                level2 = dot(size.dot.level2),
                level3 = dot(size.dot.level3),
            ),
    )
}

/** Rounds a scaled millisecond magnitude onto whole milliseconds. */
internal fun scaleMilliseconds(milliseconds: Long, scale: Float): Long =
    (milliseconds * scale).roundToInt().toLong().coerceAtLeast(0L)
