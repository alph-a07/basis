package io.github.alph_a07.basis.tokens.vocabulary.radius

/**
 * One level of the radius scale.
 *
 * Radius is the public geometric token family: it decides the curvature of a boundary. Like
 * spacing, a level is an identity rather than a number, so the same level can resolve to
 * different magnitudes in different themes without becoming a different decision.
 *
 * [None] and [Full] are boundary concepts rather than indexed magnitudes. [None] means no
 * curvature at all, and [Full] means enough curvature to render fully rounded relative to the
 * bounds being drawn, which is not simply a larger number on the same scale. A renderer derives a
 * [Full] corner from the bounds it is drawing rather than from a distance.
 */
enum class BasisRadius {
    /** No curvature, for sharp corners and full-bleed containers. */
    None,

    /** The smallest indexed magnitude, for compact tags and small badges. */
    Level1,

    /** The second indexed magnitude, for buttons and text fields. */
    Level2,

    /** The third indexed magnitude, for cards and floating panels. */
    Level3,

    /** The fourth indexed magnitude, for large cards and bottom sheets. */
    Level4,

    /** The fifth indexed magnitude, for prominent floating containers. */
    Level5,

    /** The sixth indexed magnitude, for large dialogs and panels. */
    Level6,

    /** The seventh indexed magnitude, for the largest rounded containers. */
    Level7,

    /** The largest indexed magnitude. */
    Level8,

    /** Enough curvature to render fully rounded relative to the bounds being drawn. */
    Full,
}

/** The number of indexed levels in the radius scale, excluding the boundary concepts. */
const val RADIUS_INDEXED_LEVEL_COUNT = 8
