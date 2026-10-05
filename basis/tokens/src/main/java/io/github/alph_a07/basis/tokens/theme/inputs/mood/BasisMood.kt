package io.github.alph_a07.basis.tokens.theme.inputs.mood

/**
 * A named starting position in the Mood dimensional space.
 *
 * A profile is a coherent point of view, not a visual preset and not a fixed set of token values.
 * It must translate into deterministic downstream preferences during resolution, but the values it
 * implies are produced there rather than stored here.
 *
 * Mood carries exactly one profile. Profiles are never stacked or blended by the consumer; a
 * combination of profiles is expressed by refining [BasisMoodDimensions].
 */
enum class BasisMoodProfile {
    /** Restrained and low-arousal: reduced intensity, gentle contrast and unhurried motion. */
    Calm,

    /** Precise and understated: disciplined spacing and type, with color used with restraint. */
    Refined,

    /** Bright and direct: higher intensity, faster response and stronger emphasis. */
    Energetic,

    /** Lighthearted and expressive: softer geometry, more color and more decorative detail. */
    Playful,
}

/**
 * The continuous dimensions beneath a [BasisMoodProfile], refined to express a mood the named
 * profiles alone do not describe.
 *
 * Each dimension is a normalized position on a continuum, from [MIN] to [MAX]:
 *
 * - [colorfulness]: restrained and muted at the low end, vivid and expressive at the high end.
 * - [shapeSoftness]: sharp and angular at the low end, rounded and soft at the high end.
 * - [typographicExpressiveness]: neutral and understated at the low end, distinctive and
 *   expressive at the high end.
 * - [depth]: flat and minimal at the low end, layered and dimensional at the high end.
 * - [visualComplexity]: minimal and quiet at the low end, rich and decorative at the high end.
 *
 * These dimensions express desired character only. They do not specify token values, assign
 * semantic color roles, name a font family, or fix a radius, spacing or typography magnitude; those
 * are derived during Theme Resolution.
 *
 * [typographicExpressiveness] influences how much typographic distinctiveness a resolution node
 * considers appropriate where that node declares the dimension applicable. It never selects a
 * concrete font family.
 *
 * Motion is deliberately absent: reduced motion is an accessibility constraint rather than a
 * dimension of taste.
 *
 * @property colorfulness Restraint to expressiveness of color use.
 * @property shapeSoftness Angularity to roundness of geometry.
 * @property typographicExpressiveness Understatement to distinctiveness of typography.
 * @property depth Flatness to layering.
 * @property visualComplexity Simplicity to decorative richness.
 */
data class BasisMoodDimensions(
    val colorfulness: Float = NEUTRAL,
    val shapeSoftness: Float = NEUTRAL,
    val typographicExpressiveness: Float = NEUTRAL,
    val depth: Float = NEUTRAL,
    val visualComplexity: Float = NEUTRAL,
) {
    companion object {
        /** The low end of every dimension: the most restrained position. */
        const val MIN = 0f

        /** The high end of every dimension: the most expressive position. */
        const val MAX = 1f

        /** The midpoint of a dimension, used where a consumer expresses no preference. */
        const val NEUTRAL = 0.5f

        /** Dimensions that commit to nothing on any continuum. */
        val NEUTRAL_ALL = BasisMoodDimensions()
    }
}

/**
 * The visual character a product should present: one named [BasisMoodProfile], refined by the
 * continuous [dimensions] behind it.
 *
 * Mood states desired character rather than supplying values. It is distinct from Identity, which
 * supplies visual material, from Domain, which supplies product context, from Appearance, which
 * supplies explicit customization, and from Constraints, which impose mandatory validity.
 *
 * Mood does not override a mandatory constraint. Where an explicit customization and a constraint
 * disagree, the constraint is authoritative.
 *
 * Providing [dimensions] is optional. A consumer who wants a named character without a stated
 * refinement may use the single-argument constructor, which leaves every dimension at its neutral
 * midpoint rather than guessing a preference the consumer did not express.
 *
 * @property profile The named character this theme should present.
 * @property dimensions The refinement of that profile along each continuum.
 */
data class BasisMood(
    val profile: BasisMoodProfile,
    val dimensions: BasisMoodDimensions = BasisMoodDimensions.NEUTRAL_ALL,
) {
    /**
     * Creates a Mood with [profile] and every dimension left at its neutral midpoint.
     *
     * @param profile The named character this theme should present.
     */
    constructor(profile: BasisMoodProfile) : this(profile, BasisMoodDimensions.NEUTRAL_ALL)
}
