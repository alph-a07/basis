package io.github.alph_a07.basis.theme.intent.controls

import io.github.alph_a07.basis.theme.core.FontWeightValue
import io.github.alph_a07.basis.theme.tokens.core.ResolvedTheme
import io.github.alph_a07.basis.theme.tokens.core.TypographyTokenPath
import io.github.alph_a07.basis.theme.tokens.typography.FontFamilyRef

/**
 * Type ladder controls for a [ResolvedTheme] tree, overriding role-level typography assignments.
 *
 * @property levelFamilies Font family control per [TypographyTokenPath].
 * @property weightClamps Weight bounds per [TypographyTokenPath]
 * @property features OpenType feature sets per [TypographyTokenPath].
 */
public data class FontControl(
    public val levelFamilies: Map<TypographyTokenPath, FontFamilyRef> = emptyMap(),
    public val weightClamps: Map<TypographyTokenPath, WeightClamp> = emptyMap(),
    public val features: Map<TypographyTokenPath, FontFeatureSpec> = emptyMap(),
)

/**
 * Inclusive weight bounds enforced on one typography level; either bound may be omitted.
 *
 * @property min Lowest allowed weight, or null for no floor.
 * @property max Highest allowed weight, or null for no ceiling.
 */
public data class WeightClamp(
    public val min: FontWeightValue? = null,
    public val max: FontWeightValue? = null,
) {
    init {
        val lower = min?.weight
        val upper = max?.weight

        require(lower == null || upper == null || lower <= upper) {
            "WeightClamp.min must be <= max, was $min > $max."
        }
    }
}

/**
 * OpenType feature tags applied to one typography level.
 *
 * @property features Feature tags such as `"tnum"` or `"ss01"`, matched case-insensitively.
 */
public data class FontFeatureSpec(public val features: Set<String>) {
    init {
        require(features.none { it.isBlank() }) {
            "FontFeatureSpec features must not contain blanks."
        }
    }
}
