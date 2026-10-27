package io.github.alph_a07.basis.theme.intent.controls.overrides

import io.github.alph_a07.basis.theme.tokens.core.ResolvedTheme

/**
 * Token overrides for a [ResolvedTheme] tree. Only non-null or non-empty fields are applied.
 *
 * @property color Color role overrides, with mode-scoped OKLCH values.
 * @property typography Typography role overrides, applied to both modes.
 * @property spacing Spacing ladder overrides, applied to both modes.
 * @property radius Radius ladder overrides, applied to both modes.
 * @property depth Depth ladder overrides, with mode-scoped shadow alpha.
 * @property size Icon, avatar, control, and dot size overrides, applied to both modes.
 * @property motion Motion purpose overrides, applied to both modes.
 * @property paths Secondary path to override tokens keyed by dotted string, e.g.
 * `"color.surface.default"` to [OverrideValue.Color].
 */
public data class TokenOverrides(
    public val color: ColorTokenOverrides? = null,
    public val typography: TypographyTokenOverrides? = null,
    public val spacing: LevelSpacingOverrides? = null,
    public val radius: RadiusOverrides? = null,
    public val depth: DepthOverrides? = null,
    public val size: SizeOverrides? = null,
    public val motion: MotionOverrides? = null,
    public val paths: Map<String, OverrideValue> = emptyMap(),
) {
    public companion object {

        /**
         * Creates a [TokenOverrides] instance from a vararg of dotted-path to [OverrideValue] pairs.
         *
         * Example usage:
         * ```
         * val overrides = TokenOverrides.fromPaths(
         *     "color.surface.default" to OverrideValue.Color(OverrideMode.Both(Oklch(0.5, 0.1, 0.2))),
         *     "typography.structure.level1" to OverrideValue.Typography(TypeRole(...)),
         *     "spacing.level3" to OverrideValue.Dp(DpValue(16f)),
         *     "depth.level2" to OverrideValue.Depth(DepthSpec(...)),
         *     "motion.default" to OverrideValue.Motion(MotionSpec(...))
         * )
         * ```
         *
         * @param entries Vararg of pairs of dotted-path strings and their corresponding [OverrideValue]s.
         * @return A [TokenOverrides] instance with the provided path-value pairs in the [paths] map.
         */
        public fun fromPaths(vararg entries: Pair<String, OverrideValue>): TokenOverrides =
            TokenOverrides(paths = entries.toMap())
    }
}
