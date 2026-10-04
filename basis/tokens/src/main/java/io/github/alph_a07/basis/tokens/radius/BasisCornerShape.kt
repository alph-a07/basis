package io.github.alph_a07.basis.tokens.radius

/**
 * The radius of each corner of a shape.
 *
 * Components compose radius decisions into concrete shapes, including asymmetric ones such as a
 * bottom sheet that is rounded only at its top. Basis does not need a separate public token per
 * component-shaped outline for that to be expressible.
 *
 * @property topStart The radius of the top-start corner.
 * @property topEnd The radius of the top-end corner.
 * @property bottomEnd The radius of the bottom-end corner.
 * @property bottomStart The radius of the bottom-start corner.
 */
data class BasisCornerShape(
    val topStart: BasisRadius,
    val topEnd: BasisRadius,
    val bottomEnd: BasisRadius,
    val bottomStart: BasisRadius,
) {
    companion object {
        /**
         * A shape with [radius] on every corner.
         *
         * @param radius The radius applied to all four corners.
         * @return A [BasisCornerShape] with four equal radii.
         */
        fun uniform(radius: BasisRadius): BasisCornerShape =
            BasisCornerShape(radius, radius, radius, radius)

        /**
         * A shape with [radius] on the top corners only, leaving the bottom corners square.
         *
         * Suits surfaces flush against the bottom of the viewport, such as a bottom sheet.
         *
         * @param radius The radius applied to the top-start and top-end corners.
         * @return A [BasisCornerShape] with squared-off bottom corners.
         */
        fun topRounded(radius: BasisRadius): BasisCornerShape =
            BasisCornerShape(radius, radius, BasisRadius.None, BasisRadius.None)

        /**
         * A shape with [radius] on the bottom corners only, leaving the top corners square.
         *
         * Suits surfaces anchored to the top of the viewport, such as a top banner.
         *
         * @param radius The radius applied to the bottom-end and bottom-start corners.
         * @return A [BasisCornerShape] with squared-off top corners.
         */
        fun bottomRounded(radius: BasisRadius): BasisCornerShape =
            BasisCornerShape(BasisRadius.None, BasisRadius.None, radius, radius)
    }
}
