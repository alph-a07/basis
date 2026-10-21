package io.github.alph_a07.basis.theme.resolution

/**
 * Unified theme profile combining visual style setpoints, structural biases, and behavioral influences.
 *
 * All axes operate on the normalized range `[-1.0, 1.0]`, where `0.0` represents neutral balance.
 *
 * @property warmth Temperature bias from cool (-1) to warm (+1).
 * @property chroma Color saturation bias from muted (-1) to vibrant (+1).
 * @property contrast Lightness contrast bias from soft (-1) to high contrast (+1).
 * @property density Spatial density bias from airy (-1) to compact (+1).
 * @property roundness Corner radius bias from sharp (-1) to rounded (+1).
 * @property typographyExpressiveness Font personality bias from restrained (-1) to expressive (+1).
 * @property motionEnergy Animation speed and spring bias from calm (-1) to lively (+1).
 * @property playfulness Character and quirkiness bias from serious (-1) to playful (+1).
 *
 * @property ctaEmphasis Call-to-action prominence and visual weight.
 * @property depthEmphasis Elevation ladder contrast and shadow presence.
 * @property borderClarity Stroke clarity and edge definition.
 * @property statusClarity Status color distinction and alert prominence.
 * @property focusEmphasis Focus ring thickness and outline contrast.
 * @property avatarBias Avatar prominence in visual hierarchy.
 *
 * @property dataDensity Spatial compaction vs breathing room from domain context.
 * @property inputHeaviness Form controls, inputs, and density of user manipulation.
 * @property transactionality Focus on high-intent actions, commitment, and explicit CTAs.
 * @property socialPresence Conversational, user-facing, and expressive social elements.
 * @property trustStrictness Compliance, stability, and disciplined visual boundaries.
 * @property riskSensitivity Caution around destructive actions, errors, and ambiguity.
 * @property contentVelocity Dynamic, streaming, or time-sensitive content updates.
 * @property mediaRichness Imagery, audio, visual depth, and illustrative elements.
 */
internal data class ThemeProfile(
    // Visual Style Axes
    val warmth: Float = 0f,
    val chroma: Float = 0f,
    val contrast: Float = 0f,
    val density: Float = 0f,
    val roundness: Float = 0f,
    val typographyExpressiveness: Float = 0f,
    val motionEnergy: Float = 0f,
    val playfulness: Float = 0f,

    // Structural Biases
    val ctaEmphasis: Float = 0f,
    val depthEmphasis: Float = 0f,
    val borderClarity: Float = 0f,
    val statusClarity: Float = 0f,
    val focusEmphasis: Float = 0f,
    val avatarBias: Float = 0f,

    // Behavioral Influence Dimensions
    val dataDensity: Float = 0f,
    val inputHeaviness: Float = 0f,
    val transactionality: Float = 0f,
    val socialPresence: Float = 0f,
    val trustStrictness: Float = 0f,
    val riskSensitivity: Float = 0f,
    val contentVelocity: Float = 0f,
    val mediaRichness: Float = 0f,
) {
    companion object {
        /** Neutral theme profile with every axis centered at `0.0`. */
        val NEUTRAL: ThemeProfile = ThemeProfile()
    }
}

/** Projects [ThemeProfile.typographyExpressiveness] from `[-1, 1]` to the unit interval `[0, 1]`. */
internal val ThemeProfile.typographyExpressiveness01: Float
    get() = ((typographyExpressiveness + 1.0f) * 0.5f).coerceIn(0.0f, 1.0f)

/** Projects [ThemeProfile.roundness] from `[-1, 1]` to the unit interval `[0, 1]`. */
internal val ThemeProfile.roundness01: Float
    get() = ((roundness + 1.0f) * 0.5f).coerceIn(0.0f, 1.0f)

/** Projects [ThemeProfile.density] from `[-1, 1]` to the unit interval `[0, 1]`. */
internal val ThemeProfile.density01: Float
    get() = ((density + 1.0f) * 0.5f).coerceIn(0.0f, 1.0f)

/** Projects [ThemeProfile.trustStrictness] from `[-1, 1]` to the unit interval `[0, 1]`. */
internal val ThemeProfile.trustStrictness01: Float
    get() = ((trustStrictness + 1.0f) * 0.5f).coerceIn(0.0f, 1.0f)

/** Projects [ThemeProfile.dataDensity] from `[-1, 1]` to the unit interval `[0, 1]`. */
internal val ThemeProfile.dataDensity01: Float
    get() = ((dataDensity + 1.0f) * 0.5f).coerceIn(0.0f, 1.0f)
