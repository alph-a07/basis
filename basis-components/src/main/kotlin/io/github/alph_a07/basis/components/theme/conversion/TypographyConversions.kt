package io.github.alph_a07.basis.components.theme.conversion

import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.em
import androidx.compose.ui.unit.sp
import io.github.alph_a07.basis.components.theme.BasisColorLocals
import io.github.alph_a07.basis.components.theme.BasisContentType
import io.github.alph_a07.basis.components.theme.BasisMetadataType
import io.github.alph_a07.basis.components.theme.BasisStructureType
import io.github.alph_a07.basis.components.theme.BasisTypographyLocals
import io.github.alph_a07.basis.components.theme.font.FontFamilyRegistry
import io.github.alph_a07.basis.theme.tokens.color.ColorTokens
import io.github.alph_a07.basis.theme.tokens.typography.ContentType
import io.github.alph_a07.basis.theme.tokens.typography.FontFamilyRef
import io.github.alph_a07.basis.theme.tokens.typography.MetadataType
import io.github.alph_a07.basis.theme.tokens.typography.StructureType
import io.github.alph_a07.basis.theme.tokens.typography.TypeColorRef
import io.github.alph_a07.basis.theme.tokens.typography.TypeRole
import io.github.alph_a07.basis.theme.tokens.typography.TypographyTokens

/**
 * Converts [TypographyTokens] into [BasisTypographyLocals] using the provided family registry and
 * resolved [ColorTokens].
 *
 * Font families are resolved through [registry]; an unregistered [FontFamilyRef.Custom] key fails fast
 * at theme construction time.
 *
 * @param colors OKLCH source tree for color dereference.
 * @param registry Registry mapping [FontFamilyRef] to a Compose font family.
 * @return Populated typography locals tree.
 */
internal fun TypographyTokens.toBasisTypographyLocals(
    colors: ColorTokens,
    registry: FontFamilyRegistry,
): BasisTypographyLocals = BasisTypographyLocals(
    structure = structure.toBasisStructureType(colors, registry),
    content = content.toBasisContentType(colors, registry),
    metadata = metadata.toBasisMetadataType(colors, registry),
)

/**
 * Maps a single [TypeRole] composite to a Compose [TextStyle] using the provided [ColorTokens]
 * and [FontFamilyRegistry].
 *
 * @param colors Color tree for semantic color dereference.
 * @param registry Registry mapping font references to Compose font families.
 * @return Mapped [TextStyle].
 */
public fun TypeRole.toTextStyle(colors: ColorTokens, registry: FontFamilyRegistry): TextStyle {
    val resolvedColor =
        when (val ref = color) {
            TypeColorRef.ContentDefault -> colors.content.default.toColor()
            TypeColorRef.ContentMuted -> colors.content.muted.toColor()
            TypeColorRef.ContentInverse -> colors.content.inverse.toColor()
            is TypeColorRef.Explicit -> ref.color.toColor()
        }

    return TextStyle(
        fontFamily = registry.resolve(family),
        fontSize = size.value.sp,
        fontWeight = FontWeight(weight.weight),
        lineHeight = lineHeight.multiplier.em,
        letterSpacing = letterSpacing.em.em,
        color = resolvedColor,
    )
}

/**
 * Maps a single [TypeRole] composite to a Compose [TextStyle] using preconverted [BasisColorLocals]
 * and [FontFamilyRegistry].
 *
 * @param colors Preconverted Compose color locals.
 * @param registry Registry mapping font references to Compose font families.
 * @return Mapped [TextStyle].
 */
public fun TypeRole.toTextStyle(colors: BasisColorLocals, registry: FontFamilyRegistry): TextStyle {
    val resolvedColor =
        when (val ref = color) {
            TypeColorRef.ContentDefault -> colors.content.default
            TypeColorRef.ContentMuted -> colors.content.muted
            TypeColorRef.ContentInverse -> colors.content.inverse
            is TypeColorRef.Explicit -> ref.color.toColor()
        }

    return TextStyle(
        fontFamily = registry.resolve(family),
        fontSize = size.value.sp,
        fontWeight = FontWeight(weight.weight),
        lineHeight = lineHeight.multiplier.em,
        letterSpacing = letterSpacing.em.em,
        color = resolvedColor,
    )
}

private fun StructureType.toBasisStructureType(
    colors: ColorTokens,
    registry: FontFamilyRegistry,
): BasisStructureType = BasisStructureType(
    level1 = level1.toTextStyle(colors, registry),
    level2 = level2.toTextStyle(colors, registry),
    level3 = level3.toTextStyle(colors, registry),
    level4 = level4.toTextStyle(colors, registry),
    level5 = level5.toTextStyle(colors, registry),
    level6 = level6.toTextStyle(colors, registry),
)

private fun ContentType.toBasisContentType(
    colors: ColorTokens,
    registry: FontFamilyRegistry,
): BasisContentType = BasisContentType(
    level1 = level1.toTextStyle(colors, registry),
    level2 = level2.toTextStyle(colors, registry),
    level3 = level3.toTextStyle(colors, registry),
    level4 = level4.toTextStyle(colors, registry),
    level5 = level5.toTextStyle(colors, registry),
)

private fun MetadataType.toBasisMetadataType(
    colors: ColorTokens,
    registry: FontFamilyRegistry,
): BasisMetadataType = BasisMetadataType(
    level1 = level1.toTextStyle(colors, registry),
    level2 = level2.toTextStyle(colors, registry),
    level3 = level3.toTextStyle(colors, registry),
)
