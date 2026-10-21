package io.github.alph_a07.basis.theme.resolution.derive

import io.github.alph_a07.basis.theme.resolution.ThemeProfile
import io.github.alph_a07.basis.theme.resolution.constants.DerivationConstants
import io.github.alph_a07.basis.theme.resolution.typographyExpressiveness01
import kotlin.math.pow
import kotlin.math.sqrt

/** Processable multipliers projected from the unified theme profile for the Derive stage. */
internal data class DerivationWeights(
    /** Hue shift in degrees for non-anchor neutrals, borders and surfaces. */
    val neutralHueShiftDegrees: Float,
    /** Max hue drift in degrees allowed for brand derivatives. */
    val brandDerivativeMaxShiftDegrees: Float,
    /** Accent and status chroma multiplier. */
    val accentChromaScale: Float,
    /** Neutral chroma multiplier. */
    val neutralChromaScale: Float,
    /** Surface-to-content lightness delta multiplier. */
    val lightnessDeltaScale: Float,
    /** Border strength multiplier from contrast preference. */
    val borderStrengthScale: Float,
    /** Status chroma multiplier after mood chroma. */
    val statusChromaScale: Float,
    /** Border strength multiplier after mood contrast. */
    val clarityBorderScale: Float,
    /** Spacing Level1-8 multiplier. */
    val spacingScale: Float,
    /** Radius Level1-8 multiplier; None and Full unchanged. */
    val radiusScale: Float,
    /** Depth ladder magnitude multiplier. */
    val depthScale: Float,
    /** Control visual scale; Enforce still guarantees the touch floor. */
    val controlScale: Float,
    /** Avatar scale. */
    val avatarScale: Float,
    /** Icon and dot density coupling. */
    val iconDotScale: Float,
    /** Structure L1-L2 size multiplier. */
    val structureDisplayScale: Float,
    /** Inter-level ratio multiplier. */
    val typeRatioScale: Float,
    /** Content body density coupling. */
    val contentBodyScale: Float,
    /** Structure tracking multiplier. */
    val structureTrackingScale: Float,
    /** Font-weight step bias on Structure, in weight units. */
    val structureWeightBias: Int,
    /** Duration multiplier. */
    val durationScale: Float,
    /** Emphasis and expansion boost. */
    val emphasisBoost: Float,
    /** Passthrough CTA hook for Derive. */
    val ctaEmphasis: Float,
    /** Passthrough focus hook for Derive. */
    val focusEmphasis: Float,
) {
    /** Combined border strength multiplier from mood contrast and influence clarity. */
    val borderScale: Float
        get() = borderStrengthScale * clarityBorderScale

    /** Combined chroma multiplier for status roles. */
    val statusScale: Float
        get() = accentChromaScale * statusChromaScale
}

/**
 * Builds [DerivationWeights] from the unified [ThemeProfile], applying non-linear,
 * context-sensitive curves across all axes.
 *
 * @param profile Unified theme profile carrying visual style, structural biases, and behavioral influences.
 */
internal fun calculateDerivationWeights(profile: ThemeProfile): DerivationWeights {
    val densityT = (profile.density + 1f) / 2f
    val roundnessT = (profile.roundness + 1f) / 2f
    val motionT = (profile.motionEnergy + 1f) / 2f

    return DerivationWeights(
        neutralHueShiftDegrees = profile.warmth * DerivationConstants.MAX_NEUTRAL_HUE_SHIFT_DEGREES,
        brandDerivativeMaxShiftDegrees = profile.warmth * DerivationConstants.MAX_BRAND_HUE_SHIFT_DEGREES,
        accentChromaScale = calculateAccentChroma(profile.chroma, profile.contrast),
        neutralChromaScale = 1f + profile.chroma * DerivationConstants.NEUTRAL_CHROMA,
        lightnessDeltaScale = calculateLightnessDelta(profile.contrast, profile.chroma),
        borderStrengthScale = 1f + profile.contrast * DerivationConstants.BORDER_CONTRAST,
        statusChromaScale = 1f + profile.statusClarity * DerivationConstants.CLARITY_GAIN,
        clarityBorderScale = 1f + profile.borderClarity * DerivationConstants.CLARITY_GAIN,
        spacingScale =
            lerp(
                DerivationConstants.SPACING_AIRY,
                DerivationConstants.SPACING_COMPACT,
                smoothstep(densityT),
            ),
        radiusScale =
            lerp(
                DerivationConstants.RADIUS_SHARP,
                DerivationConstants.RADIUS_ROUND,
                roundnessT.coerceIn(0f, 1f).pow(DerivationConstants.RADIUS_CURVE),
            ),
        depthScale = calculateDepthScale(profile.contrast, profile.depthEmphasis, profile.playfulness),
        controlScale =
            1f + sqrt(profile.inputHeaviness.coerceAtLeast(0f)) * DerivationConstants.CONTROL_INPUT -
                profile.density * DerivationConstants.CONTROL_DENSITY,
        avatarScale = 1f + profile.avatarBias * DerivationConstants.AVATAR_BIAS,
        iconDotScale = 1f - profile.density * DerivationConstants.ICON_DENSITY,
        structureDisplayScale = 1f + profile.typographyExpressiveness * DerivationConstants.DISPLAY_SCALE,
        typeRatioScale = 1f + profile.typographyExpressiveness * DerivationConstants.RATIO_SCALE,
        contentBodyScale = 1f - profile.density * DerivationConstants.BODY_DENSITY,
        structureTrackingScale = 1f - profile.typographyExpressiveness * DerivationConstants.TRACKING_SCALE,
        structureWeightBias = calculateWeightBias(profile.typographyExpressiveness01),
        durationScale =
            lerp(
                DerivationConstants.DURATION_QUIET,
                DerivationConstants.DURATION_LIVELY,
                smoothstep(motionT),
            ),
        emphasisBoost = calculateEmphasisBoost(profile.motionEnergy, profile.playfulness),
        ctaEmphasis = profile.ctaEmphasis,
        focusEmphasis = profile.focusEmphasis,
    )
}

private fun calculateAccentChroma(chroma: Float, contrast: Float): Float {
    val pullback =
        1f - contrast.coerceAtLeast(0f) * chroma.coerceAtLeast(0f) * DerivationConstants.ACCENT_CHROMA_PULLBACK
    return (1f + chroma * DerivationConstants.ACCENT_CHROMA) * pullback
}

private fun calculateLightnessDelta(contrast: Float, chroma: Float): Float {
    val deltaGain =
        DerivationConstants.LIGHTNESS_DELTA_BASE +
            DerivationConstants.LIGHTNESS_DELTA_CHROMA * chroma.coerceAtLeast(0f)
    return 1f + contrast * deltaGain * superlinear(contrast)
}

private fun calculateDepthScale(contrast: Float, depthEmphasis: Float, playfulness: Float): Float {
    val emphasisAmp = 1f + contrast.coerceAtLeast(0f) * DerivationConstants.DEPTH_CONTRAST_AMP
    return 1f + contrast * DerivationConstants.DEPTH_CONTRAST +
        depthEmphasis * DerivationConstants.DEPTH_EMPHASIS * emphasisAmp +
        playfulness * DerivationConstants.DEPTH_PLAY
}

private fun calculateEmphasisBoost(motionEnergy: Float, playfulness: Float): Float {
    val linear = motionEnergy * DerivationConstants.EMPHASIS_MOTION + playfulness * DerivationConstants.EMPHASIS_PLAY
    val cross = motionEnergy * playfulness * DerivationConstants.EMPHASIS_CROSS
    return (linear + cross).coerceIn(AXIS_MIN, AXIS_MAX)
}

private fun calculateWeightBias(exprT: Float): Int = when {
    exprT < DerivationConstants.WEIGHT_THRESHOLD_LOW -> 0
    exprT < DerivationConstants.WEIGHT_THRESHOLD_HIGH -> 1
    else -> 2
}

/** Smoothstep `3t²−2t³` — ease-in/ease-out at both extremes for perceptual uniformity. */
private fun smoothstep(t: Float): Float {
    val x = t.coerceIn(0f, 1f)
    return x * x * (3f - 2f * x)
}

/** Slight superlinearity at high values: `1 + |x| * 0.15`. Keeps output bounded near 1 for mid inputs. */
private fun superlinear(x: Float): Float = 1f + x.coerceAtLeast(0f) * DerivationConstants.SUPERLINEAR_GAIN

private fun lerp(a: Float, b: Float, t: Float): Float = a + (b - a) * t.coerceIn(0f, 1f)

/** Lower bound of every weight axis. */
private const val AXIS_MIN: Float = -1f

/** Upper bound of every weight axis. */
private const val AXIS_MAX: Float = 1f
