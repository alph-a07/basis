package io.github.alph_a07.basis.tokens.theme

/**
 * The neutral ramp is a set of lightness values for the neutral color tokens, used to derive the
 * actual colors in the theme.
 * Each value is a float between 0.0 and 1.0, representing the lightness of the color in the Oklch color space.
 * Lower values are darker, higher values are lighter. The ramp is used to derive the actual colors
 * in the theme, based on the brand hue and the vibe.
 */
data class BasisNeutralRamp(
    val surface: Float,
    val surfaceElevated: Float,
    val surfaceRecessed: Float,
    val surfaceInverse: Float,
    val surfaceDisabled: Float,
    val content: Float,
    val contentMuted: Float,
    val contentSubtle: Float,
    val contentDisabled: Float,
    val contentInverse: Float,
    val border: Float,
    val borderMuted: Float,
    val borderStrong: Float,
    val borderDisabled: Float,
    val interactiveDisabled: Float,
    val skeletonHighlight: Float,
) {
    companion object {
        val LightDefaults = BasisNeutralRamp(
            surface = 0.99f,
            surfaceElevated = 1.00f,
            surfaceRecessed = 0.96f,
            surfaceInverse = 0.16f,
            surfaceDisabled = 0.94f,
            content = 0.14f,
            contentMuted = 0.38f,
            contentSubtle = 0.55f,
            contentDisabled = 0.72f,
            contentInverse = 0.95f,
            border = 0.85f,
            borderMuted = 0.92f,
            borderStrong = 0.60f,
            borderDisabled = 0.90f,
            interactiveDisabled = 0.88f,
            skeletonHighlight = 0.99f,
        )
        val DarkDefaults = BasisNeutralRamp(
            surface = 0.16f,
            surfaceElevated = 0.22f,
            surfaceRecessed = 0.12f,
            surfaceInverse = 0.96f,
            surfaceDisabled = 0.20f,
            content = 0.95f,
            contentMuted = 0.75f,
            contentSubtle = 0.58f,
            contentDisabled = 0.40f,
            contentInverse = 0.14f,
            border = 0.32f,
            borderMuted = 0.24f,
            borderStrong = 0.50f,
            borderDisabled = 0.22f,
            interactiveDisabled = 0.28f,
            skeletonHighlight = 0.30f,
        )
    }
}

/**
 * Lightness/chroma treatment for interactive elements (buttons, chips, etc.) in light and dark mode.
 * This is used to derive the actual colors for interactive elements in the theme.
 */
data class BasisInteractiveTuning(
    val lightnessLight: Float = 0.55f,
    val lightnessDark: Float = 0.72f,
    val minChroma: Float = 0.14f,
    val hoverDeltaLight: Float = 0.06f,
    val hoverDeltaDark: Float = -0.06f,
    val pressedDeltaLight: Float = -0.08f,
    val pressedDeltaDark: Float = -0.10f,
    val mutedLightnessLight: Float = 0.92f,
    val mutedLightnessDark: Float = 0.28f,
    val mutedChromaScale: Float = 0.35f,
    val selectedMutedLightnessLight: Float = 0.93f,
    val selectedMutedLightnessDark: Float = 0.26f,
    val selectedMutedChromaScale: Float = 0.40f,
    val selectedBorderLightnessLight: Float = 0.50f,
    val selectedBorderLightnessDark: Float = 0.60f,
    val focusLightness: Float = 0.62f,
    val focusMinChroma: Float = 0.18f,
)

/** Lightness/chroma treatment for status indicators (success, warning, error, info) in light and dark mode. */
data class BasisStatusToneTuning(
    val iconLightness: Float,
    val iconChroma: Float,
    val textLightness: Float,
    val textChroma: Float,
    val surfaceLightness: Float,
    val surfaceChroma: Float,
    val borderLightness: Float,
    val borderChroma: Float,
) {
    companion object {
        val LightDefaults = BasisStatusToneTuning(
            iconLightness = 0.45f,
            iconChroma = 0.15f,
            textLightness = 0.35f,
            textChroma = 0.13f,
            surfaceLightness = 0.95f,
            surfaceChroma = 0.05f,
            borderLightness = 0.75f,
            borderChroma = 0.10f,
        )
        val DarkDefaults = BasisStatusToneTuning(
            iconLightness = 0.75f,
            iconChroma = 0.15f,
            textLightness = 0.85f,
            textChroma = 0.13f,
            surfaceLightness = 0.22f,
            surfaceChroma = 0.05f,
            borderLightness = 0.40f,
            borderChroma = 0.10f,
        )
    }
}

/** Lightness/alpha treatment for overlay surfaces (backdrops, hover states, gradients) in light and dark mode. */
data class BasisOverlayTuning(
    val backdropLightness: Float = 0.05f,
    val backdropAlpha: Int = 140,
    val hoverLightnessLight: Float = 0.1f,
    val hoverLightnessDark: Float = 0.9f,
    val hoverAlpha: Int = 20,
    val gradientStartLightness: Float = 0.08f,
    val gradientStartAlpha: Int = 0,
    val gradientEndLightness: Float = 0.05f,
    val gradientEndAlpha: Int = 200,
)

/** Lightness treatment for vibe tinting in light and dark mode, per [BasisVibe]. */
data class BasisVibeTintStrength(
    val monochrome: Float = 0.000f,
    val twoTone: Float = 0.015f,
    val threeTone: Float = 0.028f,
    val fullSpectrum: Float = 0.045f,
) {
    operator fun get(vibe: BasisVibe): Float = when (vibe) {
        BasisVibe.Monochrome -> monochrome
        BasisVibe.TwoTone -> twoTone
        BasisVibe.ThreeTone -> threeTone
        BasisVibe.FullSpectrum -> fullSpectrum
    }
}

/** A collection of all the tuning parameters for deriving a Basis color scheme values. */
data class BasisSchemeDerivationTuning(
    val vibeTintStrength: BasisVibeTintStrength = BasisVibeTintStrength(),
    val lightNeutrals: BasisNeutralRamp = BasisNeutralRamp.LightDefaults,
    val darkNeutrals: BasisNeutralRamp = BasisNeutralRamp.DarkDefaults,
    val interactive: BasisInteractiveTuning = BasisInteractiveTuning(),
    val statusLight: BasisStatusToneTuning = BasisStatusToneTuning.LightDefaults,
    val statusDark: BasisStatusToneTuning = BasisStatusToneTuning.DarkDefaults,
    val overlay: BasisOverlayTuning = BasisOverlayTuning(),
)
