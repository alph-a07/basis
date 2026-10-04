package io.github.alph_a07.basis.tokens.color

/** The background colors of a scheme, one per surface role. */
data class SurfaceColors(
    /** Baseline background for application screens and primary containers. */
    val surface: BasisColor,
    /** Raised container background for cards, bottom sheets and dialog surfaces. */
    val elevated: BasisColor,
    /** Recessed background for search inputs, well containers and sunken tracks. */
    val recessed: BasisColor,
    /** Contrasting background for snackbars, banners and floating tooltips. */
    val inverse: BasisColor,
)

/** The text colors of a scheme, one per content role. */
data class ContentColors(
    /** Primary text color, for maximum hierarchy and legibility. */
    val content: BasisColor,
    /** Supporting text color for secondary descriptions, subtitles and labels. */
    val muted: BasisColor,
    /** High-contrast text color for use on [SurfaceColors.inverse]. */
    val inverse: BasisColor,
)

/** The icon colors of a scheme, one per icon role. */
data class IconColors(
    /** Primary color for standalone, navigation and functional icons. */
    val icon: BasisColor,
    /** Secondary icon color for supporting actions and non-critical glyphs. */
    val muted: BasisColor,
    /** High-contrast icon color for use on [SurfaceColors.inverse]. */
    val inverse: BasisColor,
)

/** The border colors of a scheme, one per border role. */
data class BorderColors(
    /** Default stroke color for structural dividers, outlines and boundaries. */
    val border: BasisColor,
    /** Hairline divider color for secondary outlines. */
    val muted: BasisColor,
    /** High-contrast stroke color for input borders and prominent frames. */
    val strong: BasisColor,
    /** High-contrast stroke color for boundaries drawn on [SurfaceColors.inverse]. */
    val inverse: BasisColor,
)

/**
 * The colors marking a selected item.
 *
 * Selection is a context rather than a color role: the colors themselves are ordinary roles, and
 * a component reaches for them by describing "the selected item" rather than by naming a
 * component-shaped color.
 */
data class SelectionColors(
    /** Fill color marking the selected item. */
    val surface: BasisColor,
    /** Content color drawn on top of [surface]. */
    val content: BasisColor,
    /** Stroke color emphasizing the selected item's boundary. */
    val border: BasisColor,
)

/** The focus indicator color of a scheme. */
data class FocusColors(
    /**
     * High-visibility outline indicating active keyboard or assistive-technology focus.
     *
     * Focus is its own token rather than a border state because an indicator must be able to
     * appear on any component without depending on that component's border color.
     */
    val ring: BasisColor,
)

/**
 * The colors expressing one status.
 *
 * A status is semantic meaning and is distinct from interaction state, so it carries its own
 * presentation roles rather than borrowing the surface and content roles.
 */
data class StatusColorSet(
    /** Background surface tinting a region as carrying this status. */
    val surface: BasisColor,
    /** Text color for a label carrying this status. */
    val content: BasisColor,
    /** Icon color for a glyph carrying this status. */
    val icon: BasisColor,
    /** Border color framing this status. */
    val border: BasisColor,
)

/** The four status meanings a scheme expresses. */
data class StatusColors(
    /** Successful completion and positive feedback. */
    val positive: StatusColorSet,
    /** Failure, errors and destructive outcomes. */
    val negative: StatusColorSet,
    /** Non-blocking warnings and attention alerts. */
    val caution: StatusColorSet,
    /** Neutral information, tips and help. */
    val info: StatusColorSet,
)

/** The gradient tokens of a scheme. */
data class GradientColors(
    /** The brand gradient, carrying the theme's identity. */
    val brand: BasisGradient,
    /** The subtle surface wash, for large fills that would otherwise read as flat. */
    val surface: BasisGradient,
)
