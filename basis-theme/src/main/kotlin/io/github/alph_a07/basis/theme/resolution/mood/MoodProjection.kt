package io.github.alph_a07.basis.theme.resolution.mood

import io.github.alph_a07.basis.theme.intent.MoodIntent
import io.github.alph_a07.basis.theme.intent.MoodKnobs
import io.github.alph_a07.basis.theme.intent.MoodPreset
import io.github.alph_a07.basis.theme.resolution.domain.PriorAesthetic
import io.github.alph_a07.basis.theme.resolution.domain.PriorGain

/** Lower bound of every mood axis. */
private const val AXIS_MIN: Float = -1f

/** Upper bound of every mood axis. */
private const val AXIS_MAX: Float = 1f

/** Preset base vector; unlisted presets fall back to neutral. */
public fun MoodPreset.moodBaseVector(): MoodProfile = MOOD_PRESET_PROFILES[this] ?: MoodProfile.NEUTRAL

/**
 * Overlays non-null [MoodKnobs] axes onto [base] by replacement, not addition.
 *
 * @return Profile clamped per axis to `[-1, 1]`; null [knobs] returns [base].
 */
public fun overlayMoodKnobs(base: MoodProfile, knobs: MoodKnobs?): MoodProfile {
    val overlaid =
        when {
            knobs == null -> {
                base
            }

            else -> {
                MoodProfile(
                    warmth = (knobs.warmth ?: base.warmth).coerceIn(AXIS_MIN, AXIS_MAX),
                    chroma = (knobs.chroma ?: base.chroma).coerceIn(AXIS_MIN, AXIS_MAX),
                    contrast = (knobs.contrast ?: base.contrast).coerceIn(AXIS_MIN, AXIS_MAX),
                    density = (knobs.density ?: base.density).coerceIn(AXIS_MIN, AXIS_MAX),
                    roundness = (knobs.roundness ?: base.roundness).coerceIn(AXIS_MIN, AXIS_MAX),
                    typographyExpressiveness =
                        (knobs.typographyExpressiveness ?: base.typographyExpressiveness)
                            .coerceIn(AXIS_MIN, AXIS_MAX),
                    motionEnergy = (knobs.motionEnergy ?: base.motionEnergy).coerceIn(AXIS_MIN, AXIS_MAX),
                    playfulness = (knobs.playfulness ?: base.playfulness).coerceIn(AXIS_MIN, AXIS_MAX),
                )
            }
        }

    return overlaid
}

/**
 * Resolves the mood stage: preset base, knob replacement, then stacking with
 * the weak seed aesthetic.
 *
 * @param mood Consumer mood intent; null preset and null knobs yield [MoodProfile.NEUTRAL].
 * @param seedAesthetic Weak prior-derived setpoints the mood stacks onto.
 * @return Pair of the clamped mood profile and the clamped effective aesthetic
 * (`seed + mood` per axis); knobs and presets dominate by magnitude.
 */
public fun resolveMood(mood: MoodIntent?, seedAesthetic: PriorAesthetic): Pair<MoodProfile, MoodProfile> {
    val base = mood?.preset?.moodBaseVector() ?: MoodProfile.NEUTRAL
    val profile = overlayMoodKnobs(base, mood?.knobs)

    return Pair(profile, stackMoodAesthetic(seedAesthetic, profile))
}

/**
 * Stacks mood setpoints onto weak seed priors per axis.
 *
 * @return `clamp(seed + mood)` per axis in `[-1, 1]`.
 */
public fun stackMoodAesthetic(seed: PriorAesthetic, mood: MoodProfile): MoodProfile = MoodProfile(
    warmth = (seed.warmth + mood.warmth).coerceIn(AXIS_MIN, AXIS_MAX),
    chroma = (seed.chroma + mood.chroma).coerceIn(AXIS_MIN, AXIS_MAX),
    contrast = (seed.contrast + mood.contrast).coerceIn(AXIS_MIN, AXIS_MAX),
    density = (seed.density + mood.density).coerceIn(AXIS_MIN, AXIS_MAX),
    roundness = (seed.roundness + mood.roundness).coerceIn(AXIS_MIN, AXIS_MAX),
    typographyExpressiveness =
        (seed.typographyExpressiveness + mood.typographyExpressiveness)
            .coerceIn(AXIS_MIN, AXIS_MAX),
    motionEnergy = (seed.motionEnergy + mood.motionEnergy).coerceIn(AXIS_MIN, AXIS_MAX),
    playfulness = (seed.playfulness + mood.playfulness).coerceIn(AXIS_MIN, AXIS_MAX),
)

/** True when no preset and no knob axis is set; drives [PriorGain] selection. */
public fun MoodIntent?.isUnspecified(): Boolean {
    val activeKnobs = this?.knobs
    val specified =
        when {
            this == null -> {
                false
            }

            preset != null -> {
                true
            }

            activeKnobs == null -> {
                false
            }

            else -> {
                activeKnobs.warmth != null || activeKnobs.chroma != null || activeKnobs.contrast != null ||
                    activeKnobs.density != null || activeKnobs.roundness != null ||
                    activeKnobs.typographyExpressiveness != null || activeKnobs.motionEnergy != null ||
                    activeKnobs.playfulness != null
            }
        }

    return !specified
}
