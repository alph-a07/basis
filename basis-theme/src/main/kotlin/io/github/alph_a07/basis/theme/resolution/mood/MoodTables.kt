package io.github.alph_a07.basis.theme.resolution.mood

import io.github.alph_a07.basis.theme.intent.MoodPreset

/**
 * Mood presets to their [MoodProfile] setpoints.
 *
 * `Neutral` maps to [MoodProfile.NEUTRAL] and is intentionally absent: lookup
 * falls back to neutral so an unlisted preset can never silently resolve.
 */
public val MOOD_PRESET_PROFILES: Map<MoodPreset, MoodProfile> =
    mapOf(
        MoodPreset.Calm to
            MoodProfile(
                warmth = 0.15f,
                chroma = -0.45f,
                contrast = -0.35f,
                density = -0.40f,
                roundness = 0.25f,
                typographyExpressiveness = -0.30f,
                motionEnergy = -0.55f,
                playfulness = -0.40f,
            ),
        MoodPreset.Professional to
            MoodProfile(
                warmth = 0f,
                chroma = -0.25f,
                contrast = 0.15f,
                density = 0.25f,
                roundness = -0.20f,
                typographyExpressiveness = -0.45f,
                motionEnergy = -0.20f,
                playfulness = -0.60f,
            ),
        MoodPreset.Bold to
            MoodProfile(
                warmth = 0f,
                chroma = 0.35f,
                contrast = 0.55f,
                density = 0.10f,
                roundness = -0.35f,
                typographyExpressiveness = 0.25f,
                motionEnergy = 0.35f,
                playfulness = -0.15f,
            ),
        MoodPreset.Playful to
            MoodProfile(
                warmth = 0.25f,
                chroma = 0.40f,
                contrast = 0.10f,
                density = -0.10f,
                roundness = 0.65f,
                typographyExpressiveness = 0.35f,
                motionEnergy = 0.55f,
                playfulness = 0.75f,
            ),
        MoodPreset.Minimal to
            MoodProfile(
                warmth = 0f,
                chroma = -0.55f,
                contrast = 0.05f,
                density = -0.35f,
                roundness = -0.50f,
                typographyExpressiveness = -0.55f,
                motionEnergy = -0.40f,
                playfulness = -0.50f,
            ),
        MoodPreset.Expressive to
            MoodProfile(
                warmth = 0.10f,
                chroma = 0.65f,
                contrast = 0.25f,
                density = 0f,
                roundness = 0.35f,
                typographyExpressiveness = 0.70f,
                motionEnergy = 0.45f,
                playfulness = 0.40f,
            ),
    )
