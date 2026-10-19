package io.github.alph_a07.basis.theme.resolution.domain

/** Neutral hue shared by non-anchor neutrals, borders, and surfaces, in degrees. */
internal const val NEUTRAL_HUE_DEGREES: Float = 255f

/**
 * Value container for synthesized chroma targets aligned with ColorTokens role axes.
 *
 * @property surface Neutral surface chroma.
 * @property content Neutral content chroma.
 * @property icon Icon tint chroma.
 * @property border Neutral border chroma.
 * @property selection Selection surface chroma.
 * @property focus Focus ring chroma.
 * @property brand Synthesized brand anchor chroma.
 */
internal data class SynthesizedChroma(
    val surface: Float,
    val content: Float,
    val icon: Float,
    val border: Float,
    val selection: Float,
    val focus: Float,
    val brand: Float,
)
