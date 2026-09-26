package io.github.alph_a07.basis.tokens.shape

/**
 * A closed set of corner radius values.
 * @property Fixed A specific corner radius in dp.
 * @property Full The maximum possible corner radius.
 */
sealed class BasisRadius {
    /**
     * A specific corner radius in dp.
     * @param dp The corner radius in density-independent pixels (dp).
     */
    data class Fixed(val dp: Int) : BasisRadius()
    data object Full : BasisRadius()
}

/** The corner radius scale. */
object BasisRadiusTokens {
    val radiusNone = BasisRadius.Fixed(0)
    val radiusXs = BasisRadius.Fixed(4)
    val radiusSm = BasisRadius.Fixed(8)
    val radiusMd = BasisRadius.Fixed(12)
    val radiusLg = BasisRadius.Fixed(16)
    val radiusXl = BasisRadius.Fixed(24)
    val radiusFull = BasisRadius.Full
}

/** The border stroke width scale, in dp. */
object BasisBorderWidthTokens {
    const val BORDER_WIDTH_NONE = 0
    const val BORDER_WIDTH_THIN = 1
    const val BORDER_WIDTH_MEDIUM = 2
    const val BORDER_WIDTH_THICK = 4
}

/** A set of four corner radii, one for each corner of a shape. */
data class BasisCornerShape(
    val topStart: BasisRadius,
    val topEnd: BasisRadius,
    val bottomEnd: BasisRadius,
    val bottomStart: BasisRadius,
)

/** The roundness of a shape. */
enum class BasisRoundness {
    /** Completely flat corners. */
    Sharp,

    /** Slightly rounded corners. */
    Soft,

    /** Moderately rounded corners. */
    Round,

    /** Completely rounded corners. */
    Pill,
}

/** Scaled corner radius values. */
data class BasisRadiusScale(
    val radiusNone: BasisRadius,
    val radiusXs: BasisRadius,
    val radiusSm: BasisRadius,
    val radiusMd: BasisRadius,
    val radiusLg: BasisRadius,
    val radiusXl: BasisRadius,
)

/** @return The scaled [BasisRadiusScale] for this [BasisRoundness]. */
fun BasisRoundness.radiusScale(): BasisRadiusScale {
    if (this == BasisRoundness.Pill) {
        return BasisRadiusScale(
            radiusNone = BasisRadiusTokens.radiusNone, // structurally flat corners stay flat even under Pill
            radiusXs = BasisRadius.Full,
            radiusSm = BasisRadius.Full,
            radiusMd = BasisRadius.Full,
            radiusLg = BasisRadius.Full,
            radiusXl = BasisRadius.Full,
        )
    }

    val factor = when (this) {
        BasisRoundness.Sharp -> 0.0f
        BasisRoundness.Soft -> 0.5f
        BasisRoundness.Round -> 1.0f
        BasisRoundness.Pill -> 1.0f // unreachable
    }

    fun scale(base: BasisRadius.Fixed) = BasisRadius.Fixed((base.dp * factor).toInt())

    return BasisRadiusScale(
        radiusNone = BasisRadiusTokens.radiusNone,
        radiusXs = scale(BasisRadiusTokens.radiusXs),
        radiusSm = scale(BasisRadiusTokens.radiusSm),
        radiusMd = scale(BasisRadiusTokens.radiusMd),
        radiusLg = scale(BasisRadiusTokens.radiusLg),
        radiusXl = scale(BasisRadiusTokens.radiusXl),
    )
}

/** Rounds only the top corners of a surface. */
fun shapeTopRounded(radius: BasisRadius): BasisCornerShape = BasisCornerShape(
    topStart = radius,
    topEnd = radius,
    bottomEnd = BasisRadiusTokens.radiusNone,
    bottomStart = BasisRadiusTokens.radiusNone,
)

/** Rounds only the bottom corners of a surface. */
fun shapeBottomRounded(radius: BasisRadius): BasisCornerShape = BasisCornerShape(
    topStart = BasisRadiusTokens.radiusNone,
    topEnd = BasisRadiusTokens.radiusNone,
    bottomEnd = radius,
    bottomStart = radius,
)

/** Configures all four corners radii independently. */
fun cornerShape(
    topStart: BasisRadius,
    topEnd: BasisRadius,
    bottomEnd: BasisRadius,
    bottomStart: BasisRadius,
): BasisCornerShape = BasisCornerShape(topStart, topEnd, bottomEnd, bottomStart)