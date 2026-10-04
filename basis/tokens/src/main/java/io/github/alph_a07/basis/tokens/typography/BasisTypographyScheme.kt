package io.github.alph_a07.basis.tokens.typography

/**
 * The complete set of resolved typography values for one theme.
 *
 * This is the value side of the Typography family: [BasisTypographyLevel] names each decision and
 * this scheme holds the composite each one resolved to, along with the font families the theme
 * assigned across them. Theme Resolution produces the scheme; components consume it and never
 * assemble type styles of their own.
 *
 * @property styles The resolved composite per typography level.
 * @property fontFamilies The families this theme assigned to its typography levels.
 */
data class BasisTypographyScheme(
    val styles: Map<BasisTypographyLevel, BasisTextStyle>,
    val fontFamilies: BasisFontFamilyAssignment,
) {
    init {
        require(styles.keys.containsAll(BasisTypographyLevel.all())) {
            "A resolved typography scheme must cover every typography level."
        }
    }

    /**
     * Returns the style [level] resolved to.
     *
     * Every level in the catalogue has a value, so this never fails: the catalogue and the scheme
     * are declared together and cannot drift apart.
     *
     * @param level The level to look up.
     * @return The resolved composite for that level.
     */
    operator fun get(level: BasisTypographyLevel): BasisTextStyle =
        requireNotNull(styles[level]) { "No resolved typography style for $level." }
}
