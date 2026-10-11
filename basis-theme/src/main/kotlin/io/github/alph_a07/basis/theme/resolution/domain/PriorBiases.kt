package io.github.alph_a07.basis.theme.resolution.domain

import io.github.alph_a07.basis.theme.resolution.mood.MoodProfile

/**
 * Seed aesthetic axes derived weakly from a [PriorVector].
 *
 * Intentionally the same axis set as [MoodProfile]: domain contributes weak setpoints, mood
 * stacks on top via effective stacking. Domain never sets warmth.
 */
public data class PriorAesthetic(
    public val density: Float,
    public val roundness: Float,
    public val chroma: Float,
    public val contrast: Float,
    public val motionEnergy: Float,
    public val playfulness: Float,
    public val typographyExpressiveness: Float,
    public val warmth: Float,
) {
    public companion object {
        public val NEUTRAL: PriorAesthetic =
            PriorAesthetic(
                density = 0f,
                roundness = 0f,
                chroma = 0f,
                contrast = 0f,
                motionEnergy = 0f,
                playfulness = 0f,
                typographyExpressiveness = 0f,
                warmth = 0f,
            )
    }
}

/** Structural biases derived from a [PriorVector]. */
public data class PriorStructural(
    public val ctaEmphasis: Float,
    public val depthEmphasis: Float,
    public val borderClarity: Float,
    public val statusClarity: Float,
    public val focusEmphasis: Float,
    public val avatarBias: Float,
) {
    public companion object {
        public val NEUTRAL: PriorStructural =
            PriorStructural(
                ctaEmphasis = 0f,
                depthEmphasis = 0f,
                borderClarity = 0f,
                statusClarity = 0f,
                focusEmphasis = 0f,
                avatarBias = 0f,
            )
    }
}

/**
 * Weak seed biases produced from a blended [PriorVector].
 *
 * @property aesthetic Weak aesthetic setpoints after [PriorGain] scaling.
 * @property structural Structural biases after [PriorGain] scaling.
 */
public data class PriorSeedBiases(
    public val aesthetic: PriorAesthetic,
    public val structural: PriorStructural,
)
