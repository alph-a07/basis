package io.github.alph_a07.basis.theme.resolution.mood

import io.github.alph_a07.basis.theme.core.format.coerceToFloat32
import io.github.alph_a07.basis.theme.core.format.toFloat32
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
    val scale = gain.value.coerceToFloat32().toDouble()

    fun Float.d(): Double = coerceToFloat32().toDouble()

    val rawDensity =
        themeProfile.dataDensity.d() * InfluenceWeights.DENSITY_DATA.d() +
            themeProfile.inputHeaviness.d() * InfluenceWeights.DENSITY_INPUT.d()
    val rawRoundness =
        themeProfile.socialPresence.d() * InfluenceWeights.ROUND_SOCIAL.d() -
            themeProfile.trustStrictness.d() * InfluenceWeights.ROUND_TRUST.d() -
            themeProfile.riskSensitivity.d() * InfluenceWeights.ROUND_RISK.d()
    val rawChroma =
        themeProfile.contentVelocity.d() * InfluenceWeights.CHROMA_VELOCITY.d() +
            themeProfile.mediaRichness.d() * InfluenceWeights.CHROMA_MEDIA.d() -
            themeProfile.trustStrictness.d() * InfluenceWeights.CHROMA_TRUST.d()
    val rawContrast =
        themeProfile.riskSensitivity.d() * InfluenceWeights.CONTRAST_RISK.d() +
            themeProfile.trustStrictness.d() * InfluenceWeights.CONTRAST_TRUST.d()
    val rawMotionEnergy =
        themeProfile.contentVelocity.d() * InfluenceWeights.MOTION_VELOCITY.d() +
            themeProfile.inputHeaviness.d() * InfluenceWeights.MOTION_INPUT.d()
    val rawPlayfulness =
        themeProfile.socialPresence.d() * InfluenceWeights.PLAY_SOCIAL.d() -
            themeProfile.riskSensitivity.d() * InfluenceWeights.PLAY_RISK.d() -
            themeProfile.trustStrictness.d() * InfluenceWeights.PLAY_TRUST.d()
    val rawTypography =
        -themeProfile.trustStrictness.d() * InfluenceWeights.TYPE_TRUST.d() +
            themeProfile.mediaRichness.d() * InfluenceWeights.TYPE_MEDIA.d() +
            themeProfile.socialPresence.d() * InfluenceWeights.TYPE_SOCIAL.d()

    val rawCta = themeProfile.transactionality.d()
    val rawDepth =
        themeProfile.mediaRichness.d() * StructuralWeights.DEPTH_MEDIA.d() +
            themeProfile.dataDensity.d() * StructuralWeights.DEPTH_DATA.d()
    val rawBorder =
        themeProfile.riskSensitivity.d() * StructuralWeights.BORDER_RISK.d() +
            themeProfile.trustStrictness.d() * StructuralWeights.BORDER_TRUST.d()
    val rawStatus = themeProfile.riskSensitivity.d() * StructuralWeights.STATUS_RISK.d()
    val rawFocus =
        themeProfile.inputHeaviness.d() * StructuralWeights.FOCUS_INPUT.d() +
            themeProfile.riskSensitivity.d() * StructuralWeights.FOCUS_RISK.d()
    val rawAvatar = themeProfile.socialPresence.d() * StructuralWeights.AVATAR_SOCIAL.d()

    return ThemeProfile(
        warmth = 0f,
        chroma = (rawChroma * scale).coerceIn(-1.0, 1.0).toFloat32(),
        contrast = (rawContrast * scale).coerceIn(-1.0, 1.0).toFloat32(),
        density = (rawDensity * scale).coerceIn(-1.0, 1.0).toFloat32(),
        roundness = (rawRoundness * scale).coerceIn(-1.0, 1.0).toFloat32(),
        typographyExpressiveness = (rawTypography * scale).coerceIn(-1.0, 1.0).toFloat32(),
        motionEnergy = (rawMotionEnergy * scale).coerceIn(-1.0, 1.0).toFloat32(),
        playfulness = (rawPlayfulness * scale).coerceIn(-1.0, 1.0).toFloat32(),
        ctaEmphasis = (rawCta * scale).coerceIn(-1.0, 1.0).toFloat32(),
        depthEmphasis = (rawDepth * scale).coerceIn(-1.0, 1.0).toFloat32(),
        borderClarity = (rawBorder * scale).coerceIn(-1.0, 1.0).toFloat32(),
        statusClarity = (rawStatus * scale).coerceIn(-1.0, 1.0).toFloat32(),
        focusEmphasis = (rawFocus * scale).coerceIn(-1.0, 1.0).toFloat32(),
        avatarBias = (rawAvatar * scale).coerceIn(-1.0, 1.0).toFloat32(),
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
    warmth = (profile.warmth.toDouble() + mood.warmth.toDouble()).coerceIn(-1.0, 1.0).toFloat32(),
    chroma = (profile.chroma.toDouble() + mood.chroma.toDouble()).coerceIn(-1.0, 1.0).toFloat32(),
    contrast = (profile.contrast.toDouble() + mood.contrast.toDouble()).coerceIn(-1.0, 1.0).toFloat32(),
    density = (profile.density.toDouble() + mood.density.toDouble()).coerceIn(-1.0, 1.0).toFloat32(),
    roundness = (profile.roundness.toDouble() + mood.roundness.toDouble()).coerceIn(-1.0, 1.0).toFloat32(),
    typographyExpressiveness =
        (profile.typographyExpressiveness.toDouble() + mood.typographyExpressiveness.toDouble())
            .coerceIn(-1.0, 1.0)
            .toFloat32(),
    motionEnergy = (profile.motionEnergy.toDouble() + mood.motionEnergy.toDouble()).coerceIn(-1.0, 1.0).toFloat32(),
    playfulness = (profile.playfulness.toDouble() + mood.playfulness.toDouble()).coerceIn(-1.0, 1.0).toFloat32(),
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
