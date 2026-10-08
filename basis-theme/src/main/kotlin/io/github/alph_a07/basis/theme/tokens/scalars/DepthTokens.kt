package io.github.alph_a07.basis.theme.tokens.scalars

import io.github.alph_a07.basis.theme.core.DpValue

/** Depth ladders. */
public data class DepthTokens(
    public val level1: DepthSpec,
    public val level2: DepthSpec,
    public val level3: DepthSpec,
    public val level4: DepthSpec,
)

/**
 * Depth specification for a depth level.
 *
 * @property elevation Elevation in dp.
 * @property shadowAlpha Shadow alpha in `0..1`.
 * @property shadowBlur Shadow blur in dp.
 * @property shadowYOffset Shadow vertical offset in dp.
 */
public data class DepthSpec(
    public val elevation: DpValue,
    public val shadowAlpha: Float,
    public val shadowBlur: DpValue,
    public val shadowYOffset: DpValue,
) {
    init {
        require(shadowAlpha.isFinite() && shadowAlpha in 0f..1f) {
            "DepthSpec.shadowAlpha must be in 0..1, was $shadowAlpha."
        }
    }
}
