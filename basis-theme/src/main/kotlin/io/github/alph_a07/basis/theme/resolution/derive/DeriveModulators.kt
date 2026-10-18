package io.github.alph_a07.basis.theme.resolution.derive

import io.github.alph_a07.basis.theme.resolution.domain.PriorStructural
import io.github.alph_a07.basis.theme.resolution.domain.PriorVector
import io.github.alph_a07.basis.theme.resolution.mood.MoodProfile
import io.github.alph_a07.basis.theme.resolution.mood.typographyExpressiveness01
import kotlin.math.pow
import kotlin.math.sqrt

/** Processable multipliers projected from all intent signals for the Derive stage. */
internal data class DeriveModulators(
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
)

/**
 * Builds [DeriveModulators] from the effective [MoodProfile], [PriorStructural] biases, and
 * the [PriorVector], applying non-linear, context-sensitive curves across all axes.
 *
 * @param effective Stacked `seed + mood` profile consumed by Derive.
 * @param structural Prior structural biases (post-gain) for clarity, depth and CTA hooks.
 * @param prior Blended prior for size hooks.
 */
internal fun buildDeriveModulators(
    effective: MoodProfile,
    structural: PriorStructural,
    prior: PriorVector,
): DeriveModulators {
    val densityT = (effective.density + 1f) / 2f
    val roundnessT = (effective.roundness + 1f) / 2f
    val motionT = (effective.motionEnergy + 1f) / 2f

    return DeriveModulators(
        neutralHueShiftDegrees = effective.warmth * DeriveConstants.NEUTRAL_HUE_DEGREES,
        brandDerivativeMaxShiftDegrees = effective.warmth * DeriveConstants.BRAND_HUE_DEGREES,
        accentChromaScale = calculateAccentChroma(effective.chroma, effective.contrast),
        neutralChromaScale = 1f + effective.chroma * DeriveConstants.NEUTRAL_CHROMA,
        lightnessDeltaScale = calculateLightnessDelta(effective.contrast, effective.chroma),
        borderStrengthScale = 1f + effective.contrast * DeriveConstants.BORDER_CONTRAST,
        statusChromaScale = 1f + structural.statusClarity * DeriveConstants.CLARITY_GAIN,
        clarityBorderScale = 1f + structural.borderClarity * DeriveConstants.CLARITY_GAIN,
        spacingScale = lerp(DeriveConstants.SPACING_AIRY, DeriveConstants.SPACING_COMPACT, smoothstep(densityT)),
        radiusScale =
            lerp(
                DeriveConstants.RADIUS_SHARP,
                DeriveConstants.RADIUS_ROUND,
                roundnessT.coerceIn(0f, 1f).pow(DeriveConstants.RADIUS_CURVE),
            ),
        depthScale = calculateDepthScale(effective.contrast, structural.depthEmphasis, effective.playfulness),
        controlScale =
            1f + sqrt(prior.inputHeaviness.coerceAtLeast(0f)) * DeriveConstants.CONTROL_INPUT -
                effective.density * DeriveConstants.CONTROL_DENSITY,
        avatarScale = 1f + structural.avatarBias * DeriveConstants.AVATAR_BIAS,
        iconDotScale = 1f - effective.density * DeriveConstants.ICON_DENSITY,
        structureDisplayScale = 1f + effective.typographyExpressiveness * DeriveConstants.DISPLAY_SCALE,
        typeRatioScale = 1f + effective.typographyExpressiveness * DeriveConstants.RATIO_SCALE,
        contentBodyScale = 1f - effective.density * DeriveConstants.BODY_DENSITY,
        structureTrackingScale = 1f - effective.typographyExpressiveness * DeriveConstants.TRACKING_SCALE,
        structureWeightBias = calculateWeightBias(effective.typographyExpressiveness01),
        durationScale = lerp(DeriveConstants.DURATION_QUIET, DeriveConstants.DURATION_LIVELY, smoothstep(motionT)),
        emphasisBoost = calculateEmphasisBoost(effective.motionEnergy, effective.playfulness),
        ctaEmphasis = structural.ctaEmphasis,
        focusEmphasis = structural.focusEmphasis,
    )
}

private fun calculateAccentChroma(chroma: Float, contrast: Float): Float {
    val pullback = 1f - contrast.coerceAtLeast(0f) * chroma.coerceAtLeast(0f) * DeriveConstants.ACCENT_CHROMA_PULLBACK
    return (1f + chroma * DeriveConstants.ACCENT_CHROMA) * pullback
}

private fun calculateLightnessDelta(contrast: Float, chroma: Float): Float {
    val deltaGain =
        DeriveConstants.LIGHTNESS_DELTA_BASE +
            DeriveConstants.LIGHTNESS_DELTA_CHROMA * chroma.coerceAtLeast(0f)
    return 1f + contrast * deltaGain * superlinear(contrast)
}

private fun calculateDepthScale(contrast: Float, depthEmphasis: Float, playfulness: Float): Float {
    val emphasisAmp = 1f + contrast.coerceAtLeast(0f) * DeriveConstants.DEPTH_CONTRAST_AMP
    return 1f + contrast * DeriveConstants.DEPTH_CONTRAST +
        depthEmphasis * DeriveConstants.DEPTH_EMPHASIS * emphasisAmp +
        playfulness * DeriveConstants.DEPTH_PLAY
}

private fun calculateEmphasisBoost(motionEnergy: Float, playfulness: Float): Float {
    val linear = motionEnergy * DeriveConstants.EMPHASIS_MOTION + playfulness * DeriveConstants.EMPHASIS_PLAY
    val cross = motionEnergy * playfulness * DeriveConstants.EMPHASIS_CROSS
    return (linear + cross).coerceIn(AXIS_MIN, AXIS_MAX)
}

private fun calculateWeightBias(exprT: Float): Int = when {
    exprT < DeriveConstants.WEIGHT_THRESHOLD_LOW -> 0
    exprT < DeriveConstants.WEIGHT_THRESHOLD_HIGH -> 1
    else -> 2
}

/** Smoothstep `3t²−2t³` — ease-in/ease-out at both extremes for perceptual uniformity. */
private fun smoothstep(t: Float): Float {
    val x = t.coerceIn(0f, 1f)
    return x * x * (3f - 2f * x)
}

/** Slight superlinearity at high values: `1 + |x| * 0.15`. Keeps output bounded near 1 for mid inputs. */
private fun superlinear(x: Float): Float = 1f + x.coerceAtLeast(0f) * DeriveConstants.SUPERLINEAR_GAIN

private fun lerp(a: Float, b: Float, t: Float): Float = a + (b - a) * t.coerceIn(0f, 1f)

/** Lower bound of every modulator axis. */
private const val AXIS_MIN: Float = -1f

/** Upper bound of every modulator axis. */
private const val AXIS_MAX: Float = 1f

private object DeriveConstants {
    const val NEUTRAL_HUE_DEGREES: Float = 25f
    const val BRAND_HUE_DEGREES: Float = 6f
    const val ACCENT_CHROMA: Float = 0.40f
    const val ACCENT_CHROMA_PULLBACK: Float = 0.12f
    const val NEUTRAL_CHROMA: Float = 0.15f
    const val LIGHTNESS_DELTA_BASE: Float = 0.20f
    const val LIGHTNESS_DELTA_CHROMA: Float = 0.10f
    const val SUPERLINEAR_GAIN: Float = 0.15f
    const val BORDER_CONTRAST: Float = 0.20f
    const val CLARITY_GAIN: Float = 0.25f
    const val SPACING_AIRY: Float = 1.16f
    const val SPACING_COMPACT: Float = 0.84f
    const val RADIUS_SHARP: Float = 0.50f
    const val RADIUS_ROUND: Float = 1.55f
    const val RADIUS_CURVE: Float = 0.6f
    const val DEPTH_CONTRAST: Float = 0.15f
    const val DEPTH_EMPHASIS: Float = 0.25f
    const val DEPTH_CONTRAST_AMP: Float = 0.40f
    const val DEPTH_PLAY: Float = 0.05f
    const val CONTROL_INPUT: Float = 0.08f
    const val CONTROL_DENSITY: Float = 0.04f
    const val AVATAR_BIAS: Float = 0.12f
    const val ICON_DENSITY: Float = 0.03f
    const val DISPLAY_SCALE: Float = 0.12f
    const val RATIO_SCALE: Float = 0.08f
    const val BODY_DENSITY: Float = 0.04f
    const val TRACKING_SCALE: Float = 0.15f
    const val WEIGHT_THRESHOLD_LOW: Float = 0.30f
    const val WEIGHT_THRESHOLD_HIGH: Float = 0.70f
    const val DURATION_QUIET: Float = 1.35f
    const val DURATION_LIVELY: Float = 0.65f
    const val EMPHASIS_MOTION: Float = 0.50f
    const val EMPHASIS_PLAY: Float = 0.40f
    const val EMPHASIS_CROSS: Float = 0.25f
}
