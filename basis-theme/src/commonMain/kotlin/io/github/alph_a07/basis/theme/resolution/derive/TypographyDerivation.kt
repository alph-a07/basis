package io.github.alph_a07.basis.theme.resolution.derive

import io.github.alph_a07.basis.theme.core.EmValue
import io.github.alph_a07.basis.theme.core.SpValue
import io.github.alph_a07.basis.theme.core.format.toFloat32
import io.github.alph_a07.basis.theme.resolution.fonts.offsetWeight
import io.github.alph_a07.basis.theme.tokens.typography.ContentType
import io.github.alph_a07.basis.theme.tokens.typography.MetadataType
import io.github.alph_a07.basis.theme.tokens.typography.StructureType
import io.github.alph_a07.basis.theme.tokens.typography.TypeRole
import io.github.alph_a07.basis.theme.tokens.typography.TypographyTokens
import kotlin.math.pow

/**
 * Applies typography weights to every role, keeping families and color references intact.
 *
 * @param typography Base typography tree.
 * @param weights Typography multipliers in effect.
 * @return The scaled typography tree.
 */
internal fun deriveTypographyTokens(
    typography: TypographyTokens,
    weights: DerivationWeights,
): TypographyTokens {
    val structure = typography.structure

    fun structureRole(role: TypeRole, index: Int, boosted: Boolean): TypeRole {
        val display = if (boosted) weights.structureDisplayScale.toDouble() else 1.0
        val ratio = weights.typeRatioScale.toDouble().pow(index.toDouble())

        return role.copy(
            size = SpValue((role.size.value.toDouble() * display / ratio).toFloat32()),
            weight = offsetWeight(role.weight, if (boosted) weights.structureWeightBias else 0),
            letterSpacing =
                EmValue(
                    (role.letterSpacing.em.toDouble() * weights.structureTrackingScale.toDouble()).toFloat32(),
                ),
        )
    }

    fun contentRole(role: TypeRole, index: Int): TypeRole {
        val ratio = weights.typeRatioScale.toDouble().pow(index.toDouble())

        return role.copy(
            size = SpValue((role.size.value.toDouble() * weights.contentBodyScale.toDouble() / ratio).toFloat32()),
        )
    }

    fun metadataRole(role: TypeRole, index: Int): TypeRole {
        val ratio = weights.typeRatioScale.toDouble().pow(index.toDouble())

        return role.copy(
            size = SpValue((role.size.value.toDouble() * weights.contentBodyScale.toDouble() / ratio).toFloat32()),
        )
    }

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
