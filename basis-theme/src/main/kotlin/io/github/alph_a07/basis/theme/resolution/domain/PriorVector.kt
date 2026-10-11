package io.github.alph_a07.basis.theme.resolution.domain

/** Internal prior vector — 0 = no opinion, `[-1,1]` per dimension. */
public data class PriorVector(
    public val riskSensitivity: Float = 0f,
    public val trustStrictness: Float = 0f,
    public val dataDensity: Float = 0f,
    public val contentVelocity: Float = 0f,
    public val socialPresence: Float = 0f,
    public val transactionality: Float = 0f,
    public val mediaRichness: Float = 0f,
    public val inputHeaviness: Float = 0f,
) {
    public companion object {
        public val ZERO: PriorVector = PriorVector()
    }
}
