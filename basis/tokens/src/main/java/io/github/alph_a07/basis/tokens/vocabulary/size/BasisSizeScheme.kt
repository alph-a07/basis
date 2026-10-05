package io.github.alph_a07.basis.tokens.vocabulary.size

/**
 * The complete set of resolved size values for one theme.
 *
 * Icon, avatar and dot levels resolve to a single magnitude, while control levels resolve to the
 * composite that keeps a control's contents correctly placed inside its height. All four families
 * are covered, so a component reading a size never has to handle an unresolved family.
 *
 * @property icons The resolved magnitude per icon level, in density-independent pixels.
 * @property avatars The resolved magnitude per avatar level, in density-independent pixels.
 * @property dots The resolved magnitude per dot level, in density-independent pixels.
 * @property controls The resolved dimensions per control level.
 */
data class BasisSizeScheme(
    val icons: Map<BasisIconSize, Int>,
    val avatars: Map<BasisAvatarSize, Int>,
    val dots: Map<BasisDotSize, Int>,
    val controls: Map<BasisControlSize, ResolvedControlSize>,
) {
    init {
        require(icons.keys.containsAll(BasisIconSize.entries)) {
            "A resolved size scheme must cover every icon level."
        }
        require(avatars.keys.containsAll(BasisAvatarSize.entries)) {
            "A resolved size scheme must cover every avatar level."
        }
        require(dots.keys.containsAll(BasisDotSize.entries)) {
            "A resolved size scheme must cover every dot level."
        }
        require(controls.keys.containsAll(BasisControlSize.entries)) {
            "A resolved size scheme must cover every control level."
        }
    }

    /**
     * Returns the magnitude [level] resolved to.
     *
     * @param level The icon level to look up.
     * @return The resolved magnitude in density-independent pixels.
     */
    operator fun get(level: BasisIconSize): Int = requireNotNull(icons[level]) { "No resolved icon size for $level." }

    /**
     * Returns the magnitude [level] resolved to.
     *
     * @param level The avatar level to look up.
     * @return The resolved magnitude in density-independent pixels.
     */
    fun avatar(level: BasisAvatarSize): Int =
        requireNotNull(avatars[level]) { "No resolved avatar size for $level." }

    /**
     * Returns the magnitude [level] resolved to.
     *
     * @param level The dot level to look up.
     * @return The resolved magnitude in density-independent pixels.
     */
    fun dot(level: BasisDotSize): Int = requireNotNull(dots[level]) { "No resolved dot size for $level." }

    /**
     * Returns the dimensions [level] resolved to.
     *
     * @param level The control level to look up.
     * @return The resolved control dimensions.
     */
    fun control(level: BasisControlSize): ResolvedControlSize =
        requireNotNull(controls[level]) { "No resolved control size for $level." }
}
