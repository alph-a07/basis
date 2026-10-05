package io.github.alph_a07.basis.tokens.vocabulary.spacing

/**
 * The complete set of resolved spacing magnitudes for one theme.
 *
 * Every level of the scale has a magnitude in a resolved theme, so a component that asks for a level
 * never has to reason about whether that level was resolved at all.
 *
 * @property magnitudes The resolved magnitude per spacing level, in density-independent pixels.
 */
data class BasisSpacingScheme(
    val magnitudes: Map<BasisSpacing, Int>,
) {
    init {
        require(magnitudes.keys.containsAll(BasisSpacing.entries)) {
            "A resolved spacing scheme must cover every spacing level."
        }
    }

    /**
     * Returns the magnitude [level] resolved to.
     *
     * @param level The level to look up.
     * @return The resolved magnitude in density-independent pixels.
     */
    operator fun get(level: BasisSpacing): Int =
        requireNotNull(magnitudes[level]) { "No resolved spacing magnitude for $level." }
}
