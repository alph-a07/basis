package io.github.alph_a07.basis.theme.resolution.derive

import io.github.alph_a07.basis.theme.core.DpValue
import io.github.alph_a07.basis.theme.core.FontWeightValue
import io.github.alph_a07.basis.theme.intent.controls.WeightClamp
import io.github.alph_a07.basis.theme.resolution.fonts.FontRolePlan
import io.github.alph_a07.basis.theme.tokens.core.TypographyTokenPath
import io.github.alph_a07.basis.theme.tokens.typography.ContentType
import io.github.alph_a07.basis.theme.tokens.typography.MetadataType
import io.github.alph_a07.basis.theme.tokens.typography.StructureType
import io.github.alph_a07.basis.theme.tokens.typography.TypeRole
import io.github.alph_a07.basis.theme.tokens.typography.TypographyTokens
import kotlin.math.pow

/**
 * Applies typography modulators to every role, keeping families and color references intact.
 *
 * @param typography Seeded typography tree.
 * @param modulators Typography multipliers in effect.
 * @return The scaled typography tree.
 */
internal fun deriveTypographyTokens(
    typography: TypographyTokens,
    modulators: TypographyModulators,
): TypographyTokens {
    val structure = typography.structure

    fun structureRole(role: TypeRole, index: Int, boosted: Boolean): TypeRole {
        val display = if (boosted) modulators.display else 1f
        val ratio = modulators.ratio.toDouble().pow(index.toDouble()).toFloat()

        return role.copy(
            size = DpValue(role.size.value * display / ratio),
            weight = offsetWeight(role.weight, if (boosted) modulators.weightBias else 0),
            letterSpacing =
                io.github.alph_a07.basis.theme.core.EmValue(role.letterSpacing.em * modulators.tracking),
        )
    }

    fun contentRole(role: TypeRole, index: Int): TypeRole = role.copy(
        size =
            DpValue(
                role.size.value * modulators.body / modulators.ratio.toDouble().pow(index.toDouble()).toFloat(),
            ),
    )

    fun metadataRole(role: TypeRole, index: Int): TypeRole = role.copy(
        size =
            DpValue(
                role.size.value * modulators.metadata /
                    modulators.ratio.toDouble().pow(index.toDouble()).toFloat(),
            ),
    )

    return typography.copy(
        structure =
            StructureType(
                level1 = structureRole(structure.level1, 0, true),
                level2 = structureRole(structure.level2, 1, true),
                level3 = structureRole(structure.level3, 2, false),
                level4 = structureRole(structure.level4, 3, false),
                level5 = structureRole(structure.level5, 4, false),
                level6 = structureRole(structure.level6, 5, false),
            ),
        content =
            ContentType(
                level1 = contentRole(typography.content.level1, 0),
                level2 = contentRole(typography.content.level2, 1),
                level3 = contentRole(typography.content.level3, 2),
                level4 = contentRole(typography.content.level4, 3),
                level5 = contentRole(typography.content.level5, 4),
            ),
        metadata =
            MetadataType(
                level1 = metadataRole(typography.metadata.level1, 0),
                level2 = metadataRole(typography.metadata.level2, 1),
                level3 = metadataRole(typography.metadata.level3, 2),
            ),
    )
}

/**
 * Propagates the resolved families onto every role of the tree.
 *
 * Each ladder takes its assigned family, and a per-level Control lock wins over the ladder family
 * for that level alone.
 *
 * @param typography Typography tree to update.
 * @param plan Resolved font role plan.
 * @param weightClamps Per-level weight bounds from Control, keyed by token path.
 * @return The typography tree with every family resolved and every weight clamped.
 */
internal fun applyFontPlan(
    typography: TypographyTokens,
    plan: FontRolePlan,
    weightClamps: Map<TypographyTokenPath, WeightClamp>,
): TypographyTokens {
    fun role(current: TypeRole, path: TypographyTokenPath): TypeRole = current.copy(
        family = plan.familyFor(path),
        weight = weightClamps[path].clamp(current.weight),
    )

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

internal fun offsetWeight(weight: FontWeightValue, steps: Int): FontWeightValue {
    val target = weight.weight + steps * WEIGHT_STEP

    return FontWeightValue(roundedWeight(target))
}

/**
 * Clamps a weight into the accepted range and rounds it onto the accepted grid.
 *
 * @param weight Raw weight, possibly off-grid.
 * @return The nearest accepted weight within `100..900`.
 */
internal fun clampWeight(weight: Int): FontWeightValue = FontWeightValue(roundedWeight(weight))

private fun roundedWeight(weight: Int): Int {
    val rounded = ((weight + WEIGHT_STEP / 2) / WEIGHT_STEP) * WEIGHT_STEP

    return rounded.coerceIn(MIN_WEIGHT, MAX_WEIGHT)
}

/** Applies a weight clamp to a role weight, leaving it untouched when no clamp applies. */
private fun WeightClamp?.clamp(weight: FontWeightValue): FontWeightValue {
    if (this == null) {
        return weight
    }

    val lower = min?.weight ?: MIN_WEIGHT_FLOOR
    val upper = max?.weight ?: MAX_WEIGHT_CEILING

    return clampWeight(weight.weight.coerceIn(lower, upper))
}

/** Lowest weight a [FontWeightValue] accepts. */
private const val MIN_WEIGHT: Int = 100

/** Highest weight a [FontWeightValue] accepts. */
private const val MAX_WEIGHT: Int = 900

/** Step between accepted weights. */
private const val WEIGHT_STEP: Int = 100

/** Lowest weight used when a clamp omits its lower bound. */
private const val MIN_WEIGHT_FLOOR: Int = 100

/** Highest weight used when a clamp omits its upper bound. */
private const val MAX_WEIGHT_CEILING: Int = 900
