package io.github.alph_a07.basis.theme.tokens.typography

import io.github.alph_a07.basis.theme.core.DpValue
import io.github.alph_a07.basis.theme.core.EmValue
import io.github.alph_a07.basis.theme.core.FontWeightValue
import io.github.alph_a07.basis.theme.core.LineHeightValue
import io.github.alph_a07.basis.theme.tokens.color.ColorTokens

/**
 * Role-centric typography tree of composite roles.
 * Structure carries hierarchy, Content carries readable body, Metadata carries captions and labels.
 */
public data class TypographyTokens(
    public val structure: StructureType,
    public val content: ContentType,
    public val metadata: MetadataType,
)

/** Title and hierarchy ladder, level 1 largest through level 6 smallest. */
public data class StructureType(
    public val level1: TypeRole,
    public val level2: TypeRole,
    public val level3: TypeRole,
    public val level4: TypeRole,
    public val level5: TypeRole,
    public val level6: TypeRole,
)

/** Body and readable-text ladder, level 1 largest through level 5 smallest. */
public data class ContentType(
    public val level1: TypeRole,
    public val level2: TypeRole,
    public val level3: TypeRole,
    public val level4: TypeRole,
    public val level5: TypeRole,
)

/** Caption, label, and helper ladder, level 1 largest through level 3 smallest. */
public data class MetadataType(
    public val level1: TypeRole,
    public val level2: TypeRole,
    public val level3: TypeRole,
)

/**
 * Composite typographic decision for one role level.
 *
 * @property family Font family selected by the fonts stage.
 * @property size Text size in dp.
 * @property weight Font weight, `100..900` in steps of 100.
 * @property lineHeight Line height multiplier, e.g. `1.25`.
 * @property letterSpacing Letter spacing in em relative to [size].
 * @property color Semantic color reference resolved against [ColorTokens].
 */
public data class TypeRole(
    public val family: FontFamilyRef,
    public val size: DpValue,
    public val weight: FontWeightValue,
    public val lineHeight: LineHeightValue,
    public val letterSpacing: EmValue,
    public val color: TypeColorRef,
)
