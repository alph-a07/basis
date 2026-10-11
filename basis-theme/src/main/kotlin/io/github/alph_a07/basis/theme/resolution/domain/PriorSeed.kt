package io.github.alph_a07.basis.theme.resolution.domain

/** Lower bound of every bias axis. */
private const val AXIS_MIN: Float = -1f

/** Upper bound of every bias axis. */
private const val AXIS_MAX: Float = 1f

/**
 * Weak-coupling gain applied to prior-derived biases.
 *
 * Unspecified gain when mood is fully unspecified, else specified gain, so
 * explicit mood setpoints dominate magnitude over domain priors.
 */
@Suppress("MagicNumber")
public enum class PriorGain(public val value: Float) {
    /** Mood fully unspecified: priors speak louder. */
    UNSPECIFIED(0.55f),

    /** Any mood signal present: priors step back. */
    SPECIFIED(0.35f),
}

/**
 * Maps a blended [PriorVector] to weak seed biases using [PriorGain] rules.
 *
 * @param prior Blended prior from [blendPriorVectors]; dimensions in `[-1, 1]`.
 * @param gain Weak-coupling gain; [PriorGain.UNSPECIFIED] when mood is fully
 * unspecified, else [PriorGain.SPECIFIED].
 * @return Seed biases scaled by [gain] and clamped per axis to `[-1, 1]`.
 */
public fun priorSeedBiases(prior: PriorVector, gain: PriorGain): PriorSeedBiases {
    val aesthetic = prior.priorAesthetic().scaled(gain.value).clamped()
    val structural = prior.priorStructural().scaled(gain.value).clamped()

    return PriorSeedBiases(aesthetic = aesthetic, structural = structural)
}

internal fun PriorAesthetic.scaled(gain: Float): PriorAesthetic = PriorAesthetic(
    density = density * gain,
    roundness = roundness * gain,
    chroma = chroma * gain,
    contrast = contrast * gain,
    motionEnergy = motionEnergy * gain,
    playfulness = playfulness * gain,
    typographyExpressiveness = typographyExpressiveness * gain,
    warmth = warmth * gain,
)

internal fun PriorAesthetic.clamped(): PriorAesthetic = PriorAesthetic(
    density = density.clampedAxis(),
    roundness = roundness.clampedAxis(),
    chroma = chroma.clampedAxis(),
    contrast = contrast.clampedAxis(),
    motionEnergy = motionEnergy.clampedAxis(),
    playfulness = playfulness.clampedAxis(),
    typographyExpressiveness = typographyExpressiveness.clampedAxis(),
    warmth = warmth.clampedAxis(),
)

internal fun PriorStructural.scaled(gain: Float): PriorStructural = PriorStructural(
    ctaEmphasis = ctaEmphasis * gain,
    depthEmphasis = depthEmphasis * gain,
    borderClarity = borderClarity * gain,
    statusClarity = statusClarity * gain,
    focusEmphasis = focusEmphasis * gain,
    avatarBias = avatarBias * gain,
)

internal fun PriorStructural.clamped(): PriorStructural = PriorStructural(
    ctaEmphasis = ctaEmphasis.clampedAxis(),
    depthEmphasis = depthEmphasis.clampedAxis(),
    borderClarity = borderClarity.clampedAxis(),
    statusClarity = statusClarity.clampedAxis(),
    focusEmphasis = focusEmphasis.clampedAxis(),
    avatarBias = avatarBias.clampedAxis(),
)

private fun Float.clampedAxis(): Float = coerceIn(AXIS_MIN, AXIS_MAX)
