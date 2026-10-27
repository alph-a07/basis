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

internal fun deriveSpacingTokens(spacing: SpacingTokens, weights: DerivationWeights): SpacingTokens =
    deriveSpacingTokens(spacing, weights.toScalarWeights())

/**
 * Applies the spacing multiplier to every level of the ladder and snaps values to the grid.
 *
 * @param spacing Base spacing ladder.
 * @param weights Scalar multipliers in effect.
 * @return The scaled and grid-snapped spacing ladder.
 */
internal fun deriveSpacingTokens(spacing: SpacingTokens, weights: ScalarWeights): SpacingTokens {
    fun level(value: DpValue): DpValue = DpValue(snapToGrid(value.value * weights.spacing))

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

internal fun deriveRadiusTokens(radius: RadiusTokens, weights: DerivationWeights): RadiusTokens =
    deriveRadiusTokens(radius, weights.toScalarWeights())

/**
 * Applies the radius multiplier to every level except the `none` and `full` sentinels, snapping values to the grid.
 *
 * @param radius Base radius ladder.
 * @param weights Scalar multipliers in effect.
 * @return The scaled and grid-snapped radius ladder.
 */
internal fun deriveRadiusTokens(radius: RadiusTokens, weights: ScalarWeights): RadiusTokens {
    fun level(value: DpValue): DpValue = DpValue(snapToGrid(value.value * weights.radius))

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

internal fun deriveDepthTokens(depth: DepthTokens, weights: DerivationWeights): DepthTokens =
    deriveDepthTokens(depth, weights.toScalarWeights())

/**
 * Scales the depth ladder magnitudes without adding or removing levels.
 *
 * @param depth Base depth ladder.
 * @param weights Scalar multipliers in effect.
 * @return The scaled depth ladder.
 */
internal fun deriveDepthTokens(depth: DepthTokens, weights: ScalarWeights): DepthTokens = DepthTokens(
    level1 = depth.level1.scaled(weights.depth),
    level2 = depth.level2.scaled(weights.depth),
    level3 = depth.level3.scaled(weights.depth),
    level4 = depth.level4.scaled(weights.depth),
)

private fun DepthSpec.scaled(scale: Float): DepthSpec = DepthSpec(
    elevation = DpValue(elevation.value * scale),
    shadowAlpha = shadowAlpha,
    shadowBlur = DpValue(shadowBlur.value * scale),
    shadowYOffset = DpValue(shadowYOffset.value * scale),
)

internal fun deriveSizeTokens(size: SizeTokens, weights: DerivationWeights): SizeTokens =
    deriveSizeTokens(size, weights.toScalarWeights())

/**
 * Scales each size ladder by its own multiplier.
 *
 * @param size Base size ladders.
 * @param weights Scalar multipliers in effect.
 * @return The scaled size ladders.
 */
internal fun deriveSizeTokens(size: SizeTokens, weights: ScalarWeights): SizeTokens {
    fun icon(value: DpValue): DpValue = DpValue(value.value * weights.iconDot)

    fun avatar(value: DpValue): DpValue = DpValue(value.value * weights.avatar)

    fun control(value: DpValue): DpValue = DpValue(value.value * weights.control)

    fun dot(value: DpValue): DpValue = DpValue(value.value * weights.iconDot)

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

/** Snaps a scaled dp magnitude onto the whole-dp layout grid. */
internal fun snapToGrid(value: Float): Float =
    value.roundToInt().toFloat().coerceAtLeast(0f)
