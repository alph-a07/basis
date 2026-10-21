package io.github.alph_a07.basis.theme.resolution.derive

/**
 * Scalar multipliers consumed by derivation.
 *
 * @property spacing Multiplier on every spacing level.
 * @property radius Multiplier on every radius level except the sentinels.
 * @property depth Multiplier on the depth ladder magnitudes.
 * @property control Multiplier on the control size ladder.
 * @property avatar Multiplier on the avatar size ladder.
 * @property iconDot Multiplier on the icon and dot size ladders.
 */
internal data class ScalarWeights(
    val spacing: Float,
    val radius: Float,
    val depth: Float,
    val control: Float,
    val avatar: Float,
    val iconDot: Float,
)

internal fun DerivationWeights.toScalarWeights(): ScalarWeights =
    ScalarWeights(
        spacing = spacingScale,
        radius = radiusScale,
        depth = depthScale,
        control = controlScale,
        avatar = avatarScale,
        iconDot = iconDotScale,
    )
