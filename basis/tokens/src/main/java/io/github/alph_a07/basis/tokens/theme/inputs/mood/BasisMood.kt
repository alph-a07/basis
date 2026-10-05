package io.github.alph_a07.basis.tokens.theme.inputs.mood

/**
 * One position a [BasisMood] dimension may take.
 *
 * Each dimension is an ordinal preference rather than a magnitude. [Unspecified] contributes no
 * explicit preference, so resolution reads it the same way as an omitted Mood.
 */
enum class BasisMoodValue {
    /** No explicit preference on this dimension. */
    Unspecified,

    /** Quieter, cooler, more casual or more restrained expression, per dimension. */
    Low,

    /** Neutral activity, character or personality on this dimension. */
    Balanced,

    /** More energetic, warmer, more formal or more expressive character, per dimension. */
    High,
}

/**
 * An optional, composable set of aesthetic preferences across Energy, Warmth, Formality and
 * Expressiveness.
 *
 * Mood shapes how the resolved theme feels; it does not determine what the theme means or what
 * visual material it contains. Each dimension may influence applicable token families without
 * directly specifying token values or semantic roles, and [BasisMoodValue.Unspecified] dimensions
 * contribute no explicit preference.
 *
 * @property energy How active or tranquil the visual language should feel. Primarily influences
 *   Motion and visual emphasis; can also influence Color, Depth and others.
 * @property warmth Whether the visual character should feel cool and distant or warm and inviting.
 *   Primarily influences Color; secondarily Typography, Radius and Depth.
 * @property formality How casual and relaxed versus formal and structured the visual language should
 *   feel. Primarily influences Typography, Radius and structural treatment; can also influence
 *   Spacing, Depth, Motion and Size.
 * @property expressiveness How much visual personality the system should allow to surface. The
 *   broadest dimension: it can influence Color, Typography, Radius, Depth, Motion, Spacing and Size.
 */
data class BasisMood(
    val energy: BasisMoodValue = BasisMoodValue.Unspecified,
    val warmth: BasisMoodValue = BasisMoodValue.Unspecified,
    val formality: BasisMoodValue = BasisMoodValue.Unspecified,
    val expressiveness: BasisMoodValue = BasisMoodValue.Unspecified,
)
