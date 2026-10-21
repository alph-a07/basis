package io.github.alph_a07.basis.theme.resolution.constants

/** Mathematical coefficients and thresholds used in token derivation weights. */
internal object DerivationConstants {
    const val MAX_NEUTRAL_HUE_SHIFT_DEGREES: Float = 25f
    const val MAX_BRAND_HUE_SHIFT_DEGREES: Float = 6f
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
