package io.github.alph_a07.basis.theme.resolution.mood

import io.github.alph_a07.basis.theme.intent.DomainIntent
import io.github.alph_a07.basis.theme.intent.MoodIntent
import io.github.alph_a07.basis.theme.resolution.domain.PriorAesthetic
import io.github.alph_a07.basis.theme.resolution.domain.PriorStructural
import io.github.alph_a07.basis.theme.resolution.domain.PriorVector
import kotlin.math.roundToInt

/** Processable multipliers derived from [DomainIntent] and [MoodIntent] inputs. */
public data class MoodModulators(
    /** Hue shift in degrees for non-anchor neutrals, borders and surfaces. */
    public val neutralHueShiftDegrees: Float,
    /** Max hue drift in degrees allowed for brand derivatives. */
    public val brandDerivativeMaxShiftDegrees: Float,
    /** Accent and status chroma multiplier. */
    public val accentChromaScale: Float,
    /** Neutral chroma multiplier. */
    public val neutralChromaScale: Float,
    /** Surface-to-content lightness delta multiplier. */
    public val lightnessDeltaScale: Float,
    /** Border strength multiplier from contrast preference. */
    public val borderStrengthScale: Float,
    /** Status chroma multiplier after mood chroma. */
    public val statusChromaScale: Float,
    /** Border strength multiplier after mood contrast. */
    public val clarityBorderScale: Float,
    /** Spacing Level1-8 multiplier. */
    public val spacingScale: Float,
    /** Radius Level1-8 multiplier; None and Full unchanged. */
    public val radiusScale: Float,
    /** Depth ladder magnitude multiplier. */
    public val depthScale: Float,
    /** Control visual scale; Enforce still guarantees the touch floor. */
    public val controlScale: Float,
    /** Avatar scale. */
    public val avatarScale: Float,
    /** Icon and dot density coupling. */
    public val iconDotScale: Float,
    /** Structure L1-L2 size multiplier. */
    public val structureDisplayScale: Float,
    /** Inter-level ratio multiplier. */
    public val typeRatioScale: Float,
    /** Content body density coupling. */
    public val contentBodyScale: Float,
    /** Structure tracking multiplier. */
    public val structureTrackingScale: Float,
    /** Font-weight step bias on Structure, in weight units. */
    public val structureWeightBias: Int,
    /** Duration multiplier. */
    public val durationScale: Float,
    /** Emphasis and expansion boost. */
    public val emphasisBoost: Float,
    /** Passthrough CTA hook for Derive. */
    public val ctaEmphasis: Float,
    /** Passthrough focus hook for Derive. */
    public val focusEmphasis: Float,
)

/**
 * Projects effective mood profile([MoodProfile] and [PriorAesthetic]) and [PriorStructural] biases
 * into a set of [MoodModulators].
 *
 * @param effective Stacked `seed + mood` profile consumed by Derive.
 * @param structural Prior structural biases (post-gain) for clarity, depth and CTA hooks.
 * @param prior Blended prior for size hooks.
 */
public fun projectMoodModulators(
    effective: MoodProfile,
    structural: PriorStructural,
    prior: PriorVector,
): MoodModulators {
    val densityT = (effective.density + 1f) / 2f
    val roundnessT = (effective.roundness + 1f) / 2f
    val motionT = (effective.motionEnergy + 1f) / 2f

    return MoodModulators(
        neutralHueShiftDegrees = effective.warmth * ModulatorConstants.NEUTRAL_HUE_DEGREES,
        brandDerivativeMaxShiftDegrees = effective.warmth * ModulatorConstants.BRAND_HUE_DEGREES,
        accentChromaScale = 1f + effective.chroma * ModulatorConstants.ACCENT_CHROMA,
        neutralChromaScale = 1f + effective.chroma * ModulatorConstants.NEUTRAL_CHROMA,
        lightnessDeltaScale = 1f + effective.contrast * ModulatorConstants.LIGHTNESS_DELTA,
        borderStrengthScale = 1f + effective.contrast * ModulatorConstants.BORDER_CONTRAST,
        statusChromaScale = 1f + structural.statusClarity * ModulatorConstants.CLARITY_GAIN,
        clarityBorderScale = 1f + structural.borderClarity * ModulatorConstants.CLARITY_GAIN,
        spacingScale =
            lerp(
                ModulatorConstants.SPACING_AIRY,
                ModulatorConstants.SPACING_COMPACT,
                densityT,
            ),
        radiusScale = lerp(ModulatorConstants.RADIUS_SHARP, ModulatorConstants.RADIUS_ROUND, roundnessT),
        depthScale =
            1f + effective.contrast * ModulatorConstants.DEPTH_CONTRAST +
                structural.depthEmphasis * ModulatorConstants.DEPTH_EMPHASIS +
                effective.playfulness * ModulatorConstants.DEPTH_PLAY,
        controlScale =
            1f + prior.inputHeaviness * ModulatorConstants.CONTROL_INPUT -
                effective.density * ModulatorConstants.CONTROL_DENSITY,
        avatarScale = 1f + structural.avatarBias * ModulatorConstants.AVATAR_BIAS,
        iconDotScale = 1f - effective.density * ModulatorConstants.ICON_DENSITY,
        structureDisplayScale = 1f + effective.typographyExpressiveness * ModulatorConstants.DISPLAY_SCALE,
        typeRatioScale = 1f + effective.typographyExpressiveness * ModulatorConstants.RATIO_SCALE,
        contentBodyScale = 1f - effective.density * ModulatorConstants.BODY_DENSITY,
        structureTrackingScale = 1f - effective.typographyExpressiveness * ModulatorConstants.TRACKING_SCALE,
        structureWeightBias =
            (effective.typographyExpressiveness * ModulatorConstants.WEIGHT_UNITS).roundToInt(),
        durationScale =
            lerp(
                ModulatorConstants.DURATION_QUIET,
                ModulatorConstants.DURATION_LIVELY,
                motionT,
            ),
        emphasisBoost =
            (
                effective.motionEnergy * ModulatorConstants.EMPHASIS_MOTION +
                    effective.playfulness * ModulatorConstants.EMPHASIS_PLAY
                ).coerceIn(AXIS_MIN, AXIS_MAX),
        ctaEmphasis = structural.ctaEmphasis,
        focusEmphasis = structural.focusEmphasis,
    )
}

private fun lerp(a: Float, b: Float, t: Float): Float = a + (b - a) * t.coerceIn(0f, 1f)

/** Lower bound of every modulator axis. */
private const val AXIS_MIN: Float = -1f

/** Upper bound of every modulator axis. */
private const val AXIS_MAX: Float = 1f

/** Per-family modulator constants. */
private object ModulatorConstants {
    const val NEUTRAL_HUE_DEGREES: Float = 25f
    const val BRAND_HUE_DEGREES: Float = 6f
    const val ACCENT_CHROMA: Float = 0.40f
    const val NEUTRAL_CHROMA: Float = 0.15f
    const val LIGHTNESS_DELTA: Float = 0.25f
    const val BORDER_CONTRAST: Float = 0.20f
    const val CLARITY_GAIN: Float = 0.25f
    const val SPACING_AIRY: Float = 1.16f
    const val SPACING_COMPACT: Float = 0.84f
    const val RADIUS_SHARP: Float = 0.50f
    const val RADIUS_ROUND: Float = 1.55f
    const val DEPTH_CONTRAST: Float = 0.15f
    const val DEPTH_EMPHASIS: Float = 0.25f
    const val DEPTH_PLAY: Float = 0.05f
    const val CONTROL_INPUT: Float = 0.06f
    const val CONTROL_DENSITY: Float = 0.04f
    const val AVATAR_BIAS: Float = 0.12f
    const val ICON_DENSITY: Float = 0.03f
    const val DISPLAY_SCALE: Float = 0.12f
    const val RATIO_SCALE: Float = 0.08f
    const val BODY_DENSITY: Float = 0.04f
    const val TRACKING_SCALE: Float = 0.15f
    const val WEIGHT_UNITS: Float = 100f
    const val DURATION_QUIET: Float = 1.35f
    const val DURATION_LIVELY: Float = 0.65f
    const val EMPHASIS_MOTION: Float = 0.5f
    const val EMPHASIS_PLAY: Float = 0.4f
}
