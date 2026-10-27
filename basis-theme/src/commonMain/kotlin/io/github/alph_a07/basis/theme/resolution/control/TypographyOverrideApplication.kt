package io.github.alph_a07.basis.theme.resolution.control

import io.github.alph_a07.basis.theme.intent.controls.overrides.ContentTypeOverrides
import io.github.alph_a07.basis.theme.intent.controls.overrides.MetadataTypeOverrides
import io.github.alph_a07.basis.theme.intent.controls.overrides.StructureTypeOverrides
import io.github.alph_a07.basis.theme.intent.controls.overrides.TokenOverrides
import io.github.alph_a07.basis.theme.intent.controls.overrides.TypeRolePatch
import io.github.alph_a07.basis.theme.tokens.typography.ContentType
import io.github.alph_a07.basis.theme.tokens.typography.MetadataType
import io.github.alph_a07.basis.theme.tokens.typography.StructureType
import io.github.alph_a07.basis.theme.tokens.typography.TypeRole
import io.github.alph_a07.basis.theme.tokens.typography.TypographyTokens

/**
 * Applies partial typography role overrides, which are mode-invariant.
 *
 * Only the fields a patch sets are replaced, so a patch that changes weight alone leaves the
 * resolved family, size, and tracking in place.
 *
 * @param typography Derived typography tree.
 * @param overrides Token overrides as specified, or null when Control specifies none.
 * @return The overridden typography tree.
 */
internal fun applyTypographyOverrides(
    typography: TypographyTokens,
    overrides: TokenOverrides?,
): TypographyTokens {
    val patch = overrides?.typography ?: return typography

    return typography.copy(
        structure = typography.structure.applyOverrides(patch.structure),
        content = typography.content.applyOverrides(patch.content),
        metadata = typography.metadata.applyOverrides(patch.metadata),
    )
}

private fun StructureType.applyOverrides(
    overrides: StructureTypeOverrides?,
): StructureType {
    if (overrides == null) {
        return this
    }

    return copy(
        level1 = level1.applyPatch(overrides.level1),
        level2 = level2.applyPatch(overrides.level2),
        level3 = level3.applyPatch(overrides.level3),
        level4 = level4.applyPatch(overrides.level4),
        level5 = level5.applyPatch(overrides.level5),
        level6 = level6.applyPatch(overrides.level6),
    )
}

private fun ContentType.applyOverrides(
    overrides: ContentTypeOverrides?,
): ContentType {
    if (overrides == null) {
        return this
    }

    return copy(
        level1 = level1.applyPatch(overrides.level1),
        level2 = level2.applyPatch(overrides.level2),
        level3 = level3.applyPatch(overrides.level3),
        level4 = level4.applyPatch(overrides.level4),
        level5 = level5.applyPatch(overrides.level5),
    )
}

private fun MetadataType.applyOverrides(
    overrides: MetadataTypeOverrides?,
): MetadataType {
    if (overrides == null) {
        return this
    }

    return copy(
        level1 = level1.applyPatch(overrides.level1),
        level2 = level2.applyPatch(overrides.level2),
        level3 = level3.applyPatch(overrides.level3),
    )
}

private fun TypeRole.applyPatch(patch: TypeRolePatch?): TypeRole {
    if (patch == null) {
        return this
    }

    return copy(
        family = patch.family ?: family,
        size = patch.size ?: size,
        weight = patch.weight ?: weight,
        lineHeight = patch.lineHeight ?: lineHeight,
        letterSpacing = patch.letterSpacing ?: letterSpacing,
        color = patch.color ?: color,
    )
}
