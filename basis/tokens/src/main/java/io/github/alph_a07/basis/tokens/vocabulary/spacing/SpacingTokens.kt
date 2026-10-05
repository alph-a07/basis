package io.github.alph_a07.basis.tokens.vocabulary.spacing

/**
 * One level of the spacing scale.
 *
 * Spacing is an indexed hierarchy of reusable spatial magnitudes, and a level is the identity of
 * one step in it. The identity is deliberately not a number: a name such as `Spacing16` would
 * encode one concrete magnitude and stop being a design decision the moment a theme resolved that
 * level differently. Components choose which magnitude applies where; Basis does not name spacing
 * tokens after the places they are used.
 */
enum class BasisSpacing {
    /** The smallest step, for tight pairings within a single group. */
    Level1,

    /** The second step, for inline padding and nested groups. */
    Level2,

    /** The third step, for icon-to-label spacing and button interior padding. */
    Level3,

    /** The fourth step, for standard screen margins and card padding. */
    Level4,

    /** The fifth step, for separation between distinct groups. */
    Level5,

    /** The sixth step, for layout gutters and content section breaks. */
    Level6,

    /** The seventh step, for major section transitions and expansive padding. */
    Level7,

    /** The largest step, for hero separation and empty-state margins. */
    Level8,
}

/** The number of levels in the spacing scale. */
const val SPACING_LEVEL_COUNT = 8
