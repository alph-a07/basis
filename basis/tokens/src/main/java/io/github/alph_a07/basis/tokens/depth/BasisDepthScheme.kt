package io.github.alph_a07.basis.tokens.depth

/**
 * The complete set of resolved depth values for one theme.
 *
 * Every level of the scale is present, each pairing its perceptual magnitude with the expression
 * that theme draws that magnitude with. A component reads the expression rather than assuming one.
 *
 * @property values The resolved value per depth level.
 */
data class BasisDepthScheme(
    val values: Map<BasisDepth, BasisDepthValue>,
) {
    init {
        require(values.keys.containsAll(BasisDepth.entries)) {
            "A resolved depth scheme must cover every depth level."
        }
    }

    /**
     * Returns the value [level] resolved to.
     *
     * @param level The level to look up.
     * @return The magnitude of that level paired with the expression drawing it.
     */
    operator fun get(level: BasisDepth): BasisDepthValue =
        requireNotNull(values[level]) { "No resolved depth value for $level." }
}
