package io.github.alph_a07.basis.theme.resolution.fonts

import io.github.alph_a07.basis.theme.core.FontWeightValue
import io.github.alph_a07.basis.theme.intent.controls.WeightClamp
import io.github.alph_a07.basis.theme.resolution.constants.FONT_MAX_WEIGHT
import io.github.alph_a07.basis.theme.resolution.constants.FONT_MIN_WEIGHT
import io.github.alph_a07.basis.theme.resolution.constants.FONT_WEIGHT_STEP
import io.github.alph_a07.basis.theme.tokens.core.TypographyTokenPath
import io.github.alph_a07.basis.theme.tokens.typography.ContentType
import io.github.alph_a07.basis.theme.tokens.typography.FontFamilyRef
import io.github.alph_a07.basis.theme.tokens.typography.MetadataType
import io.github.alph_a07.basis.theme.tokens.typography.StructureType
import io.github.alph_a07.basis.theme.tokens.typography.TypeRole
import io.github.alph_a07.basis.theme.tokens.typography.TypographyTokens

/**
 * Propagates resolved families and optical weight compensations onto every role of the typography tree.
 *
 * @param typography Typography tree to update.
 * @param fonts Resolved font role assignments.
 * @param weightClamps Per-level weight bounds from Control, keyed by token path.
 * @param isDark Whether the mode being resolved is Dark mode; when false, light-mode optical weight bias applies.
 * @return The typography tree with every family resolved, optical weights compensated, and clamps applied.
 */
internal fun applyResolvedFonts(
    typography: TypographyTokens,
    fonts: ResolvedFonts,
    weightClamps: Map<TypographyTokenPath, WeightClamp>,
    isDark: Boolean = true,
): TypographyTokens {
    fun role(current: TypeRole, path: TypographyTokenPath): TypeRole {
        val family = fonts.familyFor(path)
        val opticalBias =
            if (!isDark && family is FontFamilyRef.Catalog) {
                val entry = GoogleFontCatalog.find(family.id)
                entry?.lightModeWeightBias ?: 0
            } else {
                0
            }
        val biasedWeight = offsetWeight(current.weight, opticalBias / FONT_WEIGHT_STEP)
        val clampedWeight = weightClamps[path].clamp(biasedWeight)

        return current.copy(
            family = family,
            weight = clampedWeight,
        )
    }

    return typography.copy(
        structure =
            StructureType(
                level1 = role(typography.structure.level1, TypographyTokenPath.StructureLevel1),
                level2 = role(typography.structure.level2, TypographyTokenPath.StructureLevel2),
                level3 = role(typography.structure.level3, TypographyTokenPath.StructureLevel3),
                level4 = role(typography.structure.level4, TypographyTokenPath.StructureLevel4),
                level5 = role(typography.structure.level5, TypographyTokenPath.StructureLevel5),
                level6 = role(typography.structure.level6, TypographyTokenPath.StructureLevel6),
            ),
        content =
            ContentType(
                level1 = role(typography.content.level1, TypographyTokenPath.ContentLevel1),
                level2 = role(typography.content.level2, TypographyTokenPath.ContentLevel2),
                level3 = role(typography.content.level3, TypographyTokenPath.ContentLevel3),
                level4 = role(typography.content.level4, TypographyTokenPath.ContentLevel4),
                level5 = role(typography.content.level5, TypographyTokenPath.ContentLevel5),
            ),
        metadata =
            MetadataType(
                level1 = role(typography.metadata.level1, TypographyTokenPath.MetadataLevel1),
                level2 = role(typography.metadata.level2, TypographyTokenPath.MetadataLevel2),
                level3 = role(typography.metadata.level3, TypographyTokenPath.MetadataLevel3),
            ),
    )
}

/**
 * Offsets a font weight by [steps] multiples of 100, rounding and clamping to `[100, 900]`.
 *
 * @param weight Current font weight value.
 * @param steps Number of 100-weight steps to offset (positive or negative).
 * @return The offset font weight clamped to valid range.
 */
internal fun offsetWeight(weight: FontWeightValue, steps: Int): FontWeightValue {
    val target = weight.weight + steps * FONT_WEIGHT_STEP
    return FontWeightValue(roundedWeight(target))
}

/**
 * Clamps and rounds a raw integer weight to a valid [FontWeightValue] in `[100, 900]`.
 *
 * @param weight Raw integer weight value.
 * @return A valid [FontWeightValue].
 */
internal fun clampWeight(weight: Int): FontWeightValue = FontWeightValue(roundedWeight(weight))

private fun roundedWeight(weight: Int): Int {
    val rounded = ((weight + FONT_WEIGHT_STEP / 2) / FONT_WEIGHT_STEP) * FONT_WEIGHT_STEP
    return rounded.coerceIn(FONT_MIN_WEIGHT, FONT_MAX_WEIGHT)
}

private fun WeightClamp?.clamp(weight: FontWeightValue): FontWeightValue {
    if (this == null) return weight
    val lower = min?.weight ?: FONT_MIN_WEIGHT
    val upper = max?.weight ?: FONT_MAX_WEIGHT
    return clampWeight(weight.weight.coerceIn(lower, upper))
}
