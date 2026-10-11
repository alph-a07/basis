package io.github.alph_a07.basis.theme.resolution.mood

import io.github.alph_a07.basis.theme.resolution.domain.PriorAesthetic

/** Resolved mood setpoint on the same eight axes as [PriorAesthetic]. */
public data class MoodProfile(
    public val warmth: Float,
    public val chroma: Float,
    public val contrast: Float,
    public val density: Float,
    public val roundness: Float,
    public val typographyExpressiveness: Float,
    public val motionEnergy: Float,
    public val playfulness: Float,
) {
    public companion object {
        public val NEUTRAL: MoodProfile =
            MoodProfile(
                warmth = 0f,
                chroma = 0f,
                contrast = 0f,
                density = 0f,
                roundness = 0f,
                typographyExpressiveness = 0f,
                motionEnergy = 0f,
                playfulness = 0f,
            )
    }
}
