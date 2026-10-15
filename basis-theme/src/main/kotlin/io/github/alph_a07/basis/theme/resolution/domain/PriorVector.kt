package io.github.alph_a07.basis.theme.resolution.domain

/**
 * Internal prior vector guiding weak seed biases.
 *
 * Each dimension is a setpoint in `[-1, 1]`; `0` means no opinion. Consumer
 * domain/interaction enums map to vectors; multi-select blends them.
 */
public data class PriorVector(
    /** Caution clarity, stricter chrome. Conservative blend: `max`. */
    public val riskSensitivity: Float = 0f,
    /** Restrained, hierarchical, trustworthy. Conservative blend: `max`. */
    public val trustStrictness: Float = 0f,
    /** Compact data UI. */
    public val dataDensity: Float = 0f,
    /** Feeds, snappy engagement. */
    public val contentVelocity: Float = 0f,
    /** People-forward, rounder, friendlier. */
    public val socialPresence: Float = 0f,
    /** CTA / checkout emphasis. */
    public val transactionality: Float = 0f,
    /** Depth, media surfaces. */
    public val mediaRichness: Float = 0f,
    /** Forms, focus, control comfort. */
    public val inputHeaviness: Float = 0f,
) {
    public companion object {
        public val ZERO: PriorVector = PriorVector()
    }
}

/** Projects [PriorVector.trustStrictness] from `[-1, 1]` to the unit interval `[0, 1]`. */
public val PriorVector.trustStrictness01: Float
    get() = ((trustStrictness + 1.0f) * 0.5f).coerceIn(0.0f, 1.0f)

/** Projects [PriorVector.dataDensity] from `[-1, 1]` to the unit interval `[0, 1]`. */
public val PriorVector.dataDensity01: Float
    get() = ((dataDensity + 1.0f) * 0.5f).coerceIn(0.0f, 1.0f)
