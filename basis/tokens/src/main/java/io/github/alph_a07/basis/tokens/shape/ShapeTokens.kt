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
    /** Zero corner radius (0dp) producing sharp rectangular corners for full-bleed containers. */
    val radiusNone = BasisRadius.Fixed(0)

    /** Extra-small corner radius (4dp) for compact tags, tooltips, and small badges. */
    val radiusXs = BasisRadius.Fixed(4)

    /** Small corner radius (8dp) for standard buttons, text input fields, and small cards. */
    val radiusSm = BasisRadius.Fixed(8)

    /** Medium corner radius (12dp) for standard cards, floating panels, and medium containers. */
    val radiusMd = BasisRadius.Fixed(12)

    /** Large corner radius (16dp) for large surface cards, bottom sheet containers, and modal sheets. */
    val radiusLg = BasisRadius.Fixed(16)

    /** Extra-large corner radius (24dp) for prominent floating containers and dialog windows. */
    val radiusXl = BasisRadius.Fixed(24)

    /** Maximum corner radius rendering completely rounded circular or pill-shaped containers. */
    val radiusFull = BasisRadius.Full
}

/** The border stroke width scale, in dp. */
object BasisBorderWidthTokens {
    /** Zero border width (0dp) for flat, borderless component surfaces. */
    const val BORDER_WIDTH_NONE = 0

    /** Thin border width (1dp) for subtle component outlines, dividers, and standard inputs. */
    const val BORDER_WIDTH_THIN = 1

    /** Medium border width (2dp) for focused input borders, active chips, and highlighted outlines. */
    const val BORDER_WIDTH_MEDIUM = 2

    /** Heavy border width (4dp) for high-contrast focus rings and strong selection boundaries. */
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

/**
 * Applies [radius] to the top corners only, leaving the bottom corners flat.
 *
 * Suited to surfaces that sit flush against the bottom of the viewport, such as bottom sheets.
 *
 * @param radius The radius applied to the top-start and top-end corners.
 * @return A [BasisCornerShape] with squared-off bottom corners.
 */
fun shapeTopRounded(radius: BasisRadius): BasisCornerShape = BasisCornerShape(
    topStart = radius,
    topEnd = radius,
    bottomEnd = BasisRadiusTokens.radiusNone,
    bottomStart = BasisRadiusTokens.radiusNone,
)

/**
 * Applies [radius] to the bottom corners only, leaving the top corners flat.
 *
 * Suited to surfaces anchored to the top of the viewport, such as top banners.
 *
 * @param radius The radius applied to the bottom-end and bottom-start corners.
 * @return A [BasisCornerShape] with squared-off top corners.
 */
fun shapeBottomRounded(radius: BasisRadius): BasisCornerShape = BasisCornerShape(
    topStart = BasisRadiusTokens.radiusNone,
    topEnd = BasisRadiusTokens.radiusNone,
    bottomEnd = radius,
    bottomStart = radius,
)

/**
 * Configures each of the four corner radii independently.
 *
 * Use this for asymmetrical shapes — speech bubbles, notched cards, or any container whose corners
 * deliberately differ from one another.
 *
 * @param topStart The radius of the top-start corner.
 * @param topEnd The radius of the top-end corner.
 * @param bottomEnd The radius of the bottom-end corner.
 * @param bottomStart The radius of the bottom-start corner.
 * @return A [BasisCornerShape] carrying the four radii in clockwise order.
 */
fun cornerShape(
    topStart: BasisRadius,
    topEnd: BasisRadius,
    bottomEnd: BasisRadius,
    bottomStart: BasisRadius,
): BasisCornerShape = BasisCornerShape(topStart, topEnd, bottomEnd, bottomStart)
