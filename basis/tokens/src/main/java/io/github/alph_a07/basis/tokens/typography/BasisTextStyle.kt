package io.github.alph_a07.basis.tokens.typography

import io.github.alph_a07.basis.tokens.color.BasisColorRole

/** The font weights available to typography roles. */
object BasisFontWeightTokens {
    /** Regular weight, for continuous body copy and baseline text. */
    const val REGULAR = 400

    /** Medium weight, for subtle emphasis, interactive labels and table headers. */
    const val MEDIUM = 500

    /** Semi-bold weight, for card titles, active tab labels and prominent metrics. */
    const val SEMIBOLD = 600

    /** Bold weight, for strong emphasis, major headings and high-impact values. */
    const val BOLD = 700
}

/**
 * One composite typography token.
 *
 * A typography role is a single coherent decision about how a class of text looks, so the family,
 * size, weight, line height, letter spacing and color belong together. Changing any one of them
 * alone would leave the role internally inconsistent, which is why they are modelled as one value
 * rather than as six independent tokens.
 *
 * The family here is one [BasisFontFamily] reference. A resolved theme may assign several families
 * across its typography tokens; which family each token receives is carried by
 * [BasisFontFamilyAssignment] and decided by Theme Resolution.
 *
 * The color is a [BasisColorRole] rather than a resolved color: Typography does not own a color
 * system, it references the Color family. A theme therefore re-colors its typography by resolving
 * new values for the same roles, without the type scale changing.
 *
 * This type is the shape of the composite, not a filled-in value. Theme Resolution produces the
 * sizes, weights and leading a given theme uses; the typography vocabulary fixes which tokens
 * exist, not the numbers they resolve to.
 *
 * Sizes and spacings are in scale-independent pixels so that type tracks the user's accessibility
 * font-size setting rather than sitting fixed against display density.
 */
data class BasisTextStyle(
    /** The family to render this role with. */
    val fontFamily: BasisFontFamily,
    /** The text size, in scale-independent pixels. */
    val fontSizeSp: Float,
    /** The line height, in scale-independent pixels. */
    val lineHeightSp: Float,
    /** The font weight, from [BasisFontWeightTokens]. */
    val fontWeight: Int,
    /** The letter spacing, in scale-independent pixels. */
    val letterSpacingSp: Float,
    /** The color role this role is drawn in. */
    val colorRole: BasisColorRole,
)
