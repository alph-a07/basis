package io.github.alph_a07.basis.tokens.radius

/**
 * The complete set of resolved radius magnitudes for one theme.
 *
 * [BasisRadius.Full] is deliberately absent: it means enough curvature to render fully rounded
 * relative to the bounds being drawn, which a fixed magnitude cannot express and a renderer derives
 * at draw time. Everything else on the scale carries a magnitude here.
 *
 * @property magnitudes The resolved magnitude per radius level, in density-independent pixels.
 */
data class BasisRadiusScheme(
    val magnitudes: Map<BasisRadius, Int>,
) {
    init {
        require(magnitudes.keys.containsAll(BasisRadius.entries.filterNot { it == BasisRadius.Full })) {
            "A resolved radius scheme must cover every radius level except Full."
        }
    }

    /**
     * Returns the magnitude [level] resolved to.
     *
     * @param level The level to look up. `Full` has no fixed magnitude and is not part of a scheme.
     * @return The resolved magnitude in density-independent pixels.
     */
    operator fun get(level: BasisRadius): Int =
        requireNotNull(magnitudes[level]) { "No resolved radius magnitude for $level." }
}
