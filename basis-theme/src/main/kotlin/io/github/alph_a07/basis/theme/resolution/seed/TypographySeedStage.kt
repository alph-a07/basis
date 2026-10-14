package io.github.alph_a07.basis.theme.resolution.seed

import io.github.alph_a07.basis.theme.core.DpValue
import io.github.alph_a07.basis.theme.core.EmValue
import io.github.alph_a07.basis.theme.core.FontWeightValue
import io.github.alph_a07.basis.theme.core.LineHeightValue
import io.github.alph_a07.basis.theme.tokens.typography.ContentType
import io.github.alph_a07.basis.theme.tokens.typography.FontFamilyRef
import io.github.alph_a07.basis.theme.tokens.typography.MetadataType
import io.github.alph_a07.basis.theme.tokens.typography.StructureType
import io.github.alph_a07.basis.theme.tokens.typography.TypeColorRef
import io.github.alph_a07.basis.theme.tokens.typography.TypeRole
import io.github.alph_a07.basis.theme.tokens.typography.TypographyTokens
import kotlin.math.pow

/**
 * Seeds the typography tree ladders.
 *
 * Sizes descend by a fixed per-ladder ratio from the seeded base size, and every role carries the
 * family the fonts stage resolved so no role is left unresolved.
 *
 * @param metrics Seeded base sizes and shared metrics.
 * @param structure Structure ladder family.
 * @param content Content ladder family.
 * @param metadata Metadata ladder family.
 * @return The unmodulated typography tree.
 */
internal fun seedTypographyTokens(
    metrics: TypeSeedMetrics,
    structure: FontFamilyRef,
    content: FontFamilyRef,
    metadata: FontFamilyRef,
): TypographyTokens {
    val weight = FontWeightValue(metrics.weight)
    val lineHeight = LineHeightValue(metrics.lineHeight)
    val tracking = EmValue(metrics.letterSpacingEm)

    fun role(size: Float, color: TypeColorRef, family: FontFamilyRef): TypeRole = TypeRole(
        family = family,
        size = DpValue(size),
        weight = weight,
        lineHeight = lineHeight,
        letterSpacing = tracking,
        color = color,
    )

    fun ladder(base: Float, ratio: Double, levels: Int): List<Float> =
        List(levels) { index -> (base / ratio.pow(index.toDouble())).toFloat() }

    val structureSizes = ladder(metrics.structureSizeDp, STRUCTURE_RATIO, STRUCTURE_LEVELS)
    val contentSizes = ladder(metrics.contentSizeDp, CONTENT_RATIO, CONTENT_LEVELS)
    val metadataSizes = ladder(metrics.metadataSizeDp, METADATA_RATIO, METADATA_LEVELS)

    return TypographyTokens(
        structure =
            StructureType(
                level1 = role(structureSizes[0], TypeColorRef.ContentDefault, structure),
                level2 = role(structureSizes[1], TypeColorRef.ContentDefault, structure),
                level3 = role(structureSizes[2], TypeColorRef.ContentDefault, structure),
                level4 = role(structureSizes[3], TypeColorRef.ContentDefault, structure),
                level5 = role(structureSizes[4], TypeColorRef.ContentDefault, structure),
                level6 = role(structureSizes[5], TypeColorRef.ContentDefault, structure),
            ),
        content =
            ContentType(
                level1 = role(contentSizes[0], TypeColorRef.ContentDefault, content),
                level2 = role(contentSizes[1], TypeColorRef.ContentDefault, content),
                level3 = role(contentSizes[2], TypeColorRef.ContentDefault, content),
                level4 = role(contentSizes[3], TypeColorRef.ContentDefault, content),
                level5 = role(contentSizes[4], TypeColorRef.ContentDefault, content),
            ),
        metadata =
            MetadataType(
                level1 = role(metadataSizes[0], TypeColorRef.ContentMuted, metadata),
                level2 = role(metadataSizes[1], TypeColorRef.ContentMuted, metadata),
                level3 = role(metadataSizes[2], TypeColorRef.ContentMuted, metadata),
            ),
    )
}

/** Size ratio between adjacent structure levels. */
private const val STRUCTURE_RATIO: Double = 1.22

/** Size ratio between adjacent content levels. */
private const val CONTENT_RATIO: Double = 1.15

/** Size ratio between adjacent metadata levels. */
private const val METADATA_RATIO: Double = 1.12

/** Level count of the structure ladder. */
private const val STRUCTURE_LEVELS: Int = 6

/** Level count of the content ladder. */
private const val CONTENT_LEVELS: Int = 5

/** Level count of the metadata ladder. */
private const val METADATA_LEVELS: Int = 3
