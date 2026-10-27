package io.github.alph_a07.basis.theme.resolution.mood

import io.github.alph_a07.basis.theme.intent.MoodIntent
import io.github.alph_a07.basis.theme.intent.MoodKnobs
import io.github.alph_a07.basis.theme.intent.MoodPreset
import io.github.alph_a07.basis.theme.intent.isUnspecified
import io.github.alph_a07.basis.theme.resolution.ThemeProfile
import io.github.alph_a07.basis.theme.resolution.constants.InfluenceWeights
import io.github.alph_a07.basis.theme.resolution.constants.MOOD_PRESET_PROFILES
import io.github.alph_a07.basis.theme.resolution.constants.StructuralWeights

/** Mood influence gain scaling theme profile dimensions based on intent specificity. */
internal enum class MoodInfluenceGain(val value: Float) {
    UNSPECIFIED(0.55f),
    SPECIFIED(0.35f),
}

/** Mood presets mapped to theme profiles. Fallbacks to [ThemeProfile.NEUTRAL]. */
internal fun MoodPreset.toThemeProfile(): ThemeProfile = MOOD_PRESET_PROFILES[this] ?: ThemeProfile.NEUTRAL

/**
 * Applies non-null [MoodKnobs] axes onto [themeProfile] by replacement, not addition.
 *
 * @return Profile clamped per axis to `[-1, 1]`; null [knobs] returns [themeProfile].
 */
internal fun applyMoodKnobs(themeProfile: ThemeProfile, knobs: MoodKnobs?): ThemeProfile {
    val overlaid =
        when {
            knobs == null -> {
                themeProfile
            }

            else -> {
                themeProfile.copy(
                    warmth = (knobs.warmth ?: themeProfile.warmth).coerceIn(AXIS_MIN, AXIS_MAX),
                    chroma = (knobs.chroma ?: themeProfile.chroma).coerceIn(AXIS_MIN, AXIS_MAX),
                    contrast = (knobs.contrast ?: themeProfile.contrast).coerceIn(AXIS_MIN, AXIS_MAX),
                    density = (knobs.density ?: themeProfile.density).coerceIn(AXIS_MIN, AXIS_MAX),
                    roundness = (knobs.roundness ?: themeProfile.roundness).coerceIn(AXIS_MIN, AXIS_MAX),
                    typographyExpressiveness =
                        (knobs.typographyExpressiveness ?: themeProfile.typographyExpressiveness)
                            .coerceIn(AXIS_MIN, AXIS_MAX),
                    motionEnergy = (knobs.motionEnergy ?: themeProfile.motionEnergy).coerceIn(AXIS_MIN, AXIS_MAX),
                    playfulness = (knobs.playfulness ?: themeProfile.playfulness).coerceIn(AXIS_MIN, AXIS_MAX),
                )
            }
        }

    return overlaid
}

/**
 * Scales behavioral influence dimensions into style and structural dimensions using [gain].
 *
 * @param themeProfile Raw influence dimensions.
 * @param gain Weak-coupling gain.
 * @return Scaled profile with style, structural, and influence dimensions populated.
 */
@Suppress("LongMethod")
internal fun scaleInfluenceBiases(themeProfile: ThemeProfile, gain: MoodInfluenceGain): ThemeProfile {
    val scale = gain.value

    val rawDensity =
        themeProfile.dataDensity * InfluenceWeights.DENSITY_DATA +
            themeProfile.inputHeaviness * InfluenceWeights.DENSITY_INPUT
    val rawRoundness =
        themeProfile.socialPresence * InfluenceWeights.ROUND_SOCIAL -
            themeProfile.trustStrictness * InfluenceWeights.ROUND_TRUST -
            themeProfile.riskSensitivity * InfluenceWeights.ROUND_RISK
    val rawChroma =
        themeProfile.contentVelocity * InfluenceWeights.CHROMA_VELOCITY +
            themeProfile.mediaRichness * InfluenceWeights.CHROMA_MEDIA -
            themeProfile.trustStrictness * InfluenceWeights.CHROMA_TRUST
    val rawContrast =
        themeProfile.riskSensitivity * InfluenceWeights.CONTRAST_RISK +
            themeProfile.trustStrictness * InfluenceWeights.CONTRAST_TRUST
    val rawMotionEnergy =
        themeProfile.contentVelocity * InfluenceWeights.MOTION_VELOCITY +
            themeProfile.inputHeaviness * InfluenceWeights.MOTION_INPUT
    val rawPlayfulness =
        themeProfile.socialPresence * InfluenceWeights.PLAY_SOCIAL -
            themeProfile.riskSensitivity * InfluenceWeights.PLAY_RISK -
            themeProfile.trustStrictness * InfluenceWeights.PLAY_TRUST
    val rawTypography =
        -themeProfile.trustStrictness * InfluenceWeights.TYPE_TRUST +
            themeProfile.mediaRichness * InfluenceWeights.TYPE_MEDIA +
            themeProfile.socialPresence * InfluenceWeights.TYPE_SOCIAL

    val rawCta = themeProfile.transactionality
    val rawDepth =
        themeProfile.mediaRichness * StructuralWeights.DEPTH_MEDIA +
            themeProfile.dataDensity * StructuralWeights.DEPTH_DATA
    val rawBorder =
        themeProfile.riskSensitivity * StructuralWeights.BORDER_RISK +
            themeProfile.trustStrictness * StructuralWeights.BORDER_TRUST
    val rawStatus = themeProfile.riskSensitivity * StructuralWeights.STATUS_RISK
    val rawFocus =
        themeProfile.inputHeaviness * StructuralWeights.FOCUS_INPUT +
            themeProfile.riskSensitivity * StructuralWeights.FOCUS_RISK
    val rawAvatar = themeProfile.socialPresence * StructuralWeights.AVATAR_SOCIAL

    return ThemeProfile(
        warmth = 0f,
        chroma = (rawChroma * scale).coerceIn(AXIS_MIN, AXIS_MAX),
        contrast = (rawContrast * scale).coerceIn(AXIS_MIN, AXIS_MAX),
        density = (rawDensity * scale).coerceIn(AXIS_MIN, AXIS_MAX),
        roundness = (rawRoundness * scale).coerceIn(AXIS_MIN, AXIS_MAX),
        typographyExpressiveness = (rawTypography * scale).coerceIn(AXIS_MIN, AXIS_MAX),
        motionEnergy = (rawMotionEnergy * scale).coerceIn(AXIS_MIN, AXIS_MAX),
        playfulness = (rawPlayfulness * scale).coerceIn(AXIS_MIN, AXIS_MAX),
        ctaEmphasis = (rawCta * scale).coerceIn(AXIS_MIN, AXIS_MAX),
        depthEmphasis = (rawDepth * scale).coerceIn(AXIS_MIN, AXIS_MAX),
        borderClarity = (rawBorder * scale).coerceIn(AXIS_MIN, AXIS_MAX),
        statusClarity = (rawStatus * scale).coerceIn(AXIS_MIN, AXIS_MAX),
        focusEmphasis = (rawFocus * scale).coerceIn(AXIS_MIN, AXIS_MAX),
        avatarBias = (rawAvatar * scale).coerceIn(AXIS_MIN, AXIS_MAX),
        dataDensity = themeProfile.dataDensity,
        inputHeaviness = themeProfile.inputHeaviness,
        transactionality = themeProfile.transactionality,
        socialPresence = themeProfile.socialPresence,
        trustStrictness = themeProfile.trustStrictness,
        riskSensitivity = themeProfile.riskSensitivity,
        contentVelocity = themeProfile.contentVelocity,
        mediaRichness = themeProfile.mediaRichness,
    )
}

/**
 * Resolves the raw mood profile from preset and knob overrides.
 *
 * @param mood Consumer mood intent; null preset and null knobs yield [ThemeProfile.NEUTRAL].
 * @return Clamped mood profile per axis in `[-1, 1]`.
 */
internal fun resolveMoodProfile(mood: MoodIntent?): ThemeProfile {
    val base = mood?.preset?.toThemeProfile() ?: ThemeProfile.NEUTRAL
    return applyMoodKnobs(base, mood?.knobs)
}

/**
 * Blends mood intent into the [profile] by scaling influence biases and stacking mood setpoints.
 *
 * @param profile Theme profile carrying domain influences.
 * @param mood Consumer mood intent.
 * @return Effective [ThemeProfile] combining influence biases and mood setpoints clamped per axis.
 */
internal fun blendMoodInfluence(profile: ThemeProfile, mood: MoodIntent?): ThemeProfile {
    val scaledProfile = scaleInfluenceBiases(profile, mood.moodInfluenceGain())
    val moodProfile = resolveMoodProfile(mood)
    return stackMoodProfile(scaledProfile, moodProfile)
}

/**
 * Stacks mood setpoints onto the [profile] per axis.
 *
 * @return `clamp(profile + mood)` per axis in `[-1, 1]`.
 */
internal fun stackMoodProfile(profile: ThemeProfile, mood: ThemeProfile): ThemeProfile = profile.copy(
    warmth = (profile.warmth + mood.warmth).coerceIn(AXIS_MIN, AXIS_MAX),
    chroma = (profile.chroma + mood.chroma).coerceIn(AXIS_MIN, AXIS_MAX),
    contrast = (profile.contrast + mood.contrast).coerceIn(AXIS_MIN, AXIS_MAX),
    density = (profile.density + mood.density).coerceIn(AXIS_MIN, AXIS_MAX),
    roundness = (profile.roundness + mood.roundness).coerceIn(AXIS_MIN, AXIS_MAX),
    typographyExpressiveness =
        (profile.typographyExpressiveness + mood.typographyExpressiveness)
            .coerceIn(AXIS_MIN, AXIS_MAX),
    motionEnergy = (profile.motionEnergy + mood.motionEnergy).coerceIn(AXIS_MIN, AXIS_MAX),
    playfulness = (profile.playfulness + mood.playfulness).coerceIn(AXIS_MIN, AXIS_MAX),
)

/**
 * Selects the [MoodInfluenceGain] driven by whether this mood intent is specified.
 *
 * Returns [MoodInfluenceGain.UNSPECIFIED] when no mood preset or knobs are active;
 * returns [MoodInfluenceGain.SPECIFIED] when any mood preset or knobs are present.
 *
 * @return The corresponding [MoodInfluenceGain].
 */
internal fun MoodIntent?.moodInfluenceGain(): MoodInfluenceGain =
    if (isUnspecified()) MoodInfluenceGain.UNSPECIFIED else MoodInfluenceGain.SPECIFIED

/** Lower bound of every mood axis. */
private const val AXIS_MIN: Float = -1f

/** Upper bound of every mood axis. */
private const val AXIS_MAX: Float = 1f
