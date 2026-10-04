package io.github.alph_a07.basis.tokens.depth

/**
 * The default depth resolutions.
 *
 * Depth levels resolve to a different expression per theme mode and per component, so these are
 * the library defaults rather than a rule. A dark theme typically resolves the same level to
 * [BasisDepthExpression.Tonal], because a shadow cast onto a dark surface is barely visible, while
 * a light theme typically resolves it to [BasisDepthExpression.Elevation] or
 * [BasisDepthExpression.Shadow].
 */
object BasisDepthTokens {
    /**
     * The default resolution of [level] in a light theme.
     *
     * @param level The depth level to resolve.
     * @return The resolved depth value.
     */
    fun light(level: BasisDepth): BasisDepthValue = when (level) {
        BasisDepth.Level1 -> BasisDepthValue(level, BasisDepthExpression.Shadow)
        BasisDepth.Level2 -> BasisDepthValue(level, BasisDepthExpression.Elevation)
        BasisDepth.Level3 -> BasisDepthValue(level, BasisDepthExpression.Elevation)
        BasisDepth.Level4 -> BasisDepthValue(level, BasisDepthExpression.Elevation)
        BasisDepth.Level5 -> BasisDepthValue(level, BasisDepthExpression.Elevation)
        BasisDepth.Level6 -> BasisDepthValue(level, BasisDepthExpression.Combined)
    }

    /**
     * The default resolution of [level] in a dark theme.
     *
     * @param level The depth level to resolve.
     * @return The resolved depth value.
     */
    fun dark(level: BasisDepth): BasisDepthValue = when (level) {
        BasisDepth.Level1 -> BasisDepthValue(level, BasisDepthExpression.Tonal)
        BasisDepth.Level2 -> BasisDepthValue(level, BasisDepthExpression.Tonal)
        BasisDepth.Level3 -> BasisDepthValue(level, BasisDepthExpression.Tonal)
        BasisDepth.Level4 -> BasisDepthValue(level, BasisDepthExpression.Tonal)
        BasisDepth.Level5 -> BasisDepthValue(level, BasisDepthExpression.Combined)
        BasisDepth.Level6 -> BasisDepthValue(level, BasisDepthExpression.Combined)
    }
}
