package io.github.alph_a07.basis.tokens.vocabulary.motion

/**
 * The complete set of resolved motion values for one theme.
 *
 * Every motion contract in the catalogue has a value, so a component asks for a contract and gets
 * the tracks that express it rather than having to know which contracts a theme left unresolved.
 *
 * @property values The resolved value per motion contract.
 */
data class BasisMotionScheme(
    val values: Map<BasisMotionToken, ResolvedMotion>,
) {
    init {
        require(values.keys.containsAll(BasisMotionToken.entries)) {
            "A resolved motion scheme must cover every motion contract."
        }
    }

    /**
     * Returns the value [token] resolved to.
     *
     * @param token The motion contract to look up.
     * @return The tracks that express that contract.
     */
    operator fun get(token: BasisMotionToken): ResolvedMotion =
        requireNotNull(values[token]) { "No resolved motion for $token." }
}
