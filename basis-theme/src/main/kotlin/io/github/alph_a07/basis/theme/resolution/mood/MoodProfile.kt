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

/** Projects [MoodProfile.typographyExpressiveness] from `[-1, 1]` to the unit interval `[0, 1]`. */
public val MoodProfile.typographyExpressiveness01: Float
    get() = ((typographyExpressiveness + 1.0f) * 0.5f).coerceIn(0.0f, 1.0f)

/** Projects [MoodProfile.roundness] from `[-1, 1]` to the unit interval `[0, 1]`. */
public val MoodProfile.roundness01: Float
    get() = ((roundness + 1.0f) * 0.5f).coerceIn(0.0f, 1.0f)

/** Projects [MoodProfile.density] from `[-1, 1]` to the unit interval `[0, 1]`. */
public val MoodProfile.density01: Float
    get() = ((density + 1.0f) * 0.5f).coerceIn(0.0f, 1.0f)
