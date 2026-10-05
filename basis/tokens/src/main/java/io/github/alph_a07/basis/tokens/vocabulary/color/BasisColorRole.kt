package io.github.alph_a07.basis.tokens.vocabulary.color

/** The status meanings a scheme expresses. */
enum class BasisStatus {
    /** Successful completion and positive feedback. */
    Positive,

    /** Failure, errors and destructive outcomes. */
    Negative,

    /** Non-blocking warnings and attention alerts. */
    Caution,

    /** Neutral information, tips and help. */
    Info,
}

/** The presentation slot a status occupies. */
enum class BasisStatusSlot {
    /** A background surface tinted to carry the status. */
    Surface,

    /** Text conveying the status. */
    Content,

    /** A glyph conveying the status. */
    Icon,

    /** A stroke framing the status. */
    Border,
}

/**
 * Identifies one semantic color role in the Basis color catalogue.
 *
 * A role names a design decision, not a color. Two themes may resolve [ContentDefault] to very
 * different values while both continue to express "the primary content color of this theme".
 *
 * Roles exist so that other token families can reference a color decision without copying its
 * resolved value. Typography is the current consumer: a typography token carries a role rather
 * than a color, so re-theming a scheme updates the typography without touching the type scale.
 *
 * The entries below are exactly the roles the color catalogue defines. Basis does not publish a
 * role for every combination of presentation role, context, state and status; disabled, hovered,
 * pressed and similar conditions are state applied to a role rather than roles of their own.
 *
 * A status role names both its [status] meaning and the [statusSlot] it fills, which is what lets a
 * scheme resolve any status role without a branch per combination.
 *
 * @property status The status meaning this role carries, or `null` for a role that is not a status.
 * @property statusSlot The presentation slot this role fills, or `null` for a role that is not a
 *   status.
 */
enum class BasisColorRole(
    val status: BasisStatus? = null,
    val statusSlot: BasisStatusSlot? = null,
) {
    /** Baseline background for application screens and primary containers. */
    SurfaceDefault,

    /** Raised container background for cards, bottom sheets and dialog surfaces. */
    SurfaceElevated,

    /** Recessed background for search inputs, well containers and sunken tracks. */
    SurfaceRecessed,

    /** Contrasting background for snackbars, banners and floating tooltips. */
    SurfaceInverse,

    /** Primary text color, for maximum hierarchy and legibility. */
    ContentDefault,

    /** Supporting text color for secondary descriptions, subtitles and labels. */
    ContentMuted,

    /** High-contrast text color for use on [SurfaceInverse] and other dark surfaces. */
    ContentInverse,

    /** Primary color for standalone, navigation and functional icons. */
    IconDefault,

    /** Secondary icon color for supporting actions and non-critical glyphs. */
    IconMuted,

    /** High-contrast icon color for use on [SurfaceInverse] and other dark surfaces. */
    IconInverse,

    /** Default stroke color for structural dividers, outlines and boundaries. */
    BorderDefault,

    /** Hairline divider color for secondary outlines. */
    BorderMuted,

    /** High-contrast stroke color for input borders and prominent frames. */
    BorderStrong,

    /** High-contrast stroke color for boundaries drawn on [SurfaceInverse]. */
    BorderInverse,

    /** Fill color marking the selected item across tabs, chips and segmented controls. */
    SelectionSurface,

    /** Content color drawn on top of [SelectionSurface]. */
    SelectionContent,

    /** Stroke color emphasizing a selected item's boundary. */
    SelectionBorder,

    /** High-visibility outline indicating active keyboard or assistive-technology focus. */
    FocusRing,

    /** Background surface expressing successful completion and positive feedback. */
    PositiveSurface(BasisStatus.Positive, BasisStatusSlot.Surface),

    /** Text color expressing successful completion and positive feedback. */
    PositiveContent(BasisStatus.Positive, BasisStatusSlot.Content),

    /** Icon color expressing successful completion and positive feedback. */
    PositiveIcon(BasisStatus.Positive, BasisStatusSlot.Icon),

    /** Border color framing a positive status. */
    PositiveBorder(BasisStatus.Positive, BasisStatusSlot.Border),

    /** Background surface expressing failure and destructive outcomes. */
    NegativeSurface(BasisStatus.Negative, BasisStatusSlot.Surface),

    /** Text color expressing failure and destructive outcomes. */
    NegativeContent(BasisStatus.Negative, BasisStatusSlot.Content),

    /** Icon color expressing failure and destructive outcomes. */
    NegativeIcon(BasisStatus.Negative, BasisStatusSlot.Icon),

    /** Border color framing a negative status. */
    NegativeBorder(BasisStatus.Negative, BasisStatusSlot.Border),

    /** Background surface expressing a warning that does not block progress. */
    CautionSurface(BasisStatus.Caution, BasisStatusSlot.Surface),

    /** Text color expressing a warning that does not block progress. */
    CautionContent(BasisStatus.Caution, BasisStatusSlot.Content),

    /** Icon color expressing a warning that does not block progress. */
    CautionIcon(BasisStatus.Caution, BasisStatusSlot.Icon),

    /** Border color framing a caution status. */
    CautionBorder(BasisStatus.Caution, BasisStatusSlot.Border),

    /** Background surface carrying neutral information and help. */
    InfoSurface(BasisStatus.Info, BasisStatusSlot.Surface),

    /** Text color carrying neutral information and help. */
    InfoContent(BasisStatus.Info, BasisStatusSlot.Content),

    /** Icon color carrying neutral information and help. */
    InfoIcon(BasisStatus.Info, BasisStatusSlot.Icon),

    /** Border color framing an informational status. */
    InfoBorder(BasisStatus.Info, BasisStatusSlot.Border),
}
