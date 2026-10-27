package io.github.alph_a07.basis.theme.tokens.scalars

import io.github.alph_a07.basis.theme.core.DpValue
import io.github.alph_a07.basis.theme.core.codegen.BasisTokenPathFamily

/**
 * Corner radius ladder.
 *
 * @property none Always zero.
 * @property full Sentinel pill/circle value (e.g. 9999dp).
 */
@BasisTokenPathFamily(prefix = "radius", kind = "radius level")
public data class RadiusTokens(
    public val none: DpValue,
    public val level1: DpValue,
    public val level2: DpValue,
    public val level3: DpValue,
    public val level4: DpValue,
    public val level5: DpValue,
    public val level6: DpValue,
    public val level7: DpValue,
    public val level8: DpValue,
    public val full: DpValue,
)
