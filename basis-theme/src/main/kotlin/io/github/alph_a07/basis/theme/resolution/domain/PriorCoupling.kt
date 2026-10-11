package io.github.alph_a07.basis.theme.resolution.domain

/**
 * Raw aesthetic setpoints from prior dimensions, before [PriorGain].
 *
 * @return Unscaled, unclamped bias; warmth is always 0, domain never sets it.
 */
public fun PriorVector.priorAesthetic(): PriorAesthetic = PriorAesthetic(
    density = dataDensity * AestheticWeights.DENSITY_DATA + inputHeaviness * AestheticWeights.DENSITY_INPUT,
    roundness =
        socialPresence * AestheticWeights.ROUND_SOCIAL - trustStrictness * AestheticWeights.ROUND_TRUST -
            riskSensitivity * AestheticWeights.ROUND_RISK,
    chroma =
        contentVelocity * AestheticWeights.CHROMA_VELOCITY + mediaRichness * AestheticWeights.CHROMA_MEDIA -
            trustStrictness * AestheticWeights.CHROMA_TRUST,
    contrast = riskSensitivity * AestheticWeights.CONTRAST_RISK + trustStrictness * AestheticWeights.CONTRAST_TRUST,
    motionEnergy = contentVelocity * AestheticWeights.MOTION_VELOCITY + inputHeaviness * AestheticWeights.MOTION_INPUT,
    playfulness =
        socialPresence * AestheticWeights.PLAY_SOCIAL - riskSensitivity * AestheticWeights.PLAY_RISK -
            trustStrictness * AestheticWeights.PLAY_TRUST,
    typographyExpressiveness =
        -trustStrictness * AestheticWeights.TYPE_TRUST +
            mediaRichness * AestheticWeights.TYPE_MEDIA + socialPresence * AestheticWeights.TYPE_SOCIAL,
    warmth = 0f,
)

/**
 * Raw structural biases from prior dimensions, before [PriorGain].
 *
 * @return Unscaled, unclamped structural biases.
 */
public fun PriorVector.priorStructural(): PriorStructural = PriorStructural(
    ctaEmphasis = transactionality,
    depthEmphasis = mediaRichness * StructuralWeights.DEPTH_MEDIA + dataDensity * StructuralWeights.DEPTH_DATA,
    borderClarity = riskSensitivity * StructuralWeights.BORDER_RISK + trustStrictness * StructuralWeights.BORDER_TRUST,
    statusClarity = riskSensitivity * StructuralWeights.STATUS_RISK,
    focusEmphasis = inputHeaviness * StructuralWeights.FOCUS_INPUT + riskSensitivity * StructuralWeights.FOCUS_RISK,
    avatarBias = socialPresence * StructuralWeights.AVATAR_SOCIAL,
)

/** Weights for the coupling of prior dimensions to aesthetic properties. */
private object AestheticWeights {
    const val DENSITY_DATA: Float = 0.70f
    const val DENSITY_INPUT: Float = 0.30f
    const val ROUND_SOCIAL: Float = 0.60f
    const val ROUND_TRUST: Float = 0.30f
    const val ROUND_RISK: Float = 0.20f
    const val CHROMA_VELOCITY: Float = 0.30f
    const val CHROMA_MEDIA: Float = 0.20f
    const val CHROMA_TRUST: Float = 0.20f
    const val CONTRAST_RISK: Float = 0.35f
    const val CONTRAST_TRUST: Float = 0.25f
    const val MOTION_VELOCITY: Float = 0.55f
    const val MOTION_INPUT: Float = 0.10f
    const val PLAY_SOCIAL: Float = 0.60f
    const val PLAY_RISK: Float = 0.50f
    const val PLAY_TRUST: Float = 0.30f
    const val TYPE_TRUST: Float = 0.40f
    const val TYPE_MEDIA: Float = 0.20f
    const val TYPE_SOCIAL: Float = 0.20f
}

/** Weights for the coupling of prior dimensions to structural properties. */
private object StructuralWeights {
    const val DEPTH_MEDIA: Float = 0.70f
    const val DEPTH_DATA: Float = 0.20f
    const val BORDER_RISK: Float = 0.60f
    const val BORDER_TRUST: Float = 0.30f
    const val STATUS_RISK: Float = 0.70f
    const val FOCUS_INPUT: Float = 0.70f
    const val FOCUS_RISK: Float = 0.20f
    const val AVATAR_SOCIAL: Float = 0.60f
}
