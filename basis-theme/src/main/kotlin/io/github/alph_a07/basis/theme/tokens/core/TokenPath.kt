package io.github.alph_a07.basis.theme.tokens.core

/**
 * Stable typed identifier of one token leaf or composite.
 *
 * Serializes to the dotted paths used by Control overrides and the resolution report, e.g.
 * `color.surface.default` or `typography.structure.level1.size`.
 */
public sealed interface TokenPath {
    /** Dotted path, e.g. `"spacing.level4"`. */
    public val path: String

    /**
     * Color leaf or composite path.
     *
     * @property path Dotted path such as `color.surface.default` or `color.gradient.brand`.
     */
    public data class Color(override val path: String) : TokenPath

    /**
     * Typography role or role-field path.
     *
     * @property path Dotted path such as `typography.structure.level1` or `typography.content.level2.weight`.
     */
    public data class Typography(override val path: String) : TokenPath

    /**
     * Spacing level path.
     *
     * @property path Dotted path such as `spacing.level4`.
     */
    public data class Spacing(override val path: String) : TokenPath

    /**
     * Radius level path.
     *
     * @property path Dotted path such as `radius.level2`.
     */
    public data class Radius(override val path: String) : TokenPath

    /**
     * Depth level path.
     *
     * @property path Dotted path such as `depth.level3`.
     */
    public data class Depth(override val path: String) : TokenPath

    /**
     * Size level path.
     *
     * @property path Dotted path such as `size.control.level3`.
     */
    public data class Size(override val path: String) : TokenPath

    /**
     * Motion purpose path.
     *
     * @property path Dotted path such as `motion.feedback`.
     */
    public data class Motion(override val path: String) : TokenPath
}
