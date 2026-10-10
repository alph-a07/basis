package io.github.alph_a07.basis.theme.intent.controls.overrides

import io.github.alph_a07.basis.theme.core.DpValue
import io.github.alph_a07.basis.theme.core.EmValue
import io.github.alph_a07.basis.theme.core.FontWeightValue
import io.github.alph_a07.basis.theme.core.LineHeightValue
import io.github.alph_a07.basis.theme.intent.controls.FontControl
import io.github.alph_a07.basis.theme.tokens.typography.FontFamilyRef
import io.github.alph_a07.basis.theme.tokens.typography.TypeColorRef

/** Typography overrides, only non-null fields are applied. */
public data class TypographyTokenOverrides(
    public val structure: StructureTypeOverrides? = null,
    public val content: ContentTypeOverrides? = null,
    public val metadata: MetadataTypeOverrides? = null,
)

/** Structure types overrides, only non-null fields are applied. */
public data class StructureTypeOverrides(
    public val level1: TypeRolePatch? = null,
    public val level2: TypeRolePatch? = null,
    public val level3: TypeRolePatch? = null,
    public val level4: TypeRolePatch? = null,
    public val level5: TypeRolePatch? = null,
    public val level6: TypeRolePatch? = null,
)

/** Content types overrides, only non-null fields are applied. */
public data class ContentTypeOverrides(
    public val level1: TypeRolePatch? = null,
    public val level2: TypeRolePatch? = null,
    public val level3: TypeRolePatch? = null,
    public val level4: TypeRolePatch? = null,
    public val level5: TypeRolePatch? = null,
)

/** Metadata types overrides, only non-null fields are applied. */
public data class MetadataTypeOverrides(
    public val level1: TypeRolePatch? = null,
    public val level2: TypeRolePatch? = null,
    public val level3: TypeRolePatch? = null,
)

/**
 * Partial replacement of one type role; only non-null fields are applied.
 *
 * @property family Replacement font family; per-level [FontControl] locks win over this field.
 * @property size Replacement text size in dp.
 * @property weight Replacement weight, `100..900` in steps of 100.
 * @property lineHeight Replacement line height multiplier.
 * @property letterSpacing Replacement letter spacing in em.
 * @property color Replacement semantic color reference.
 */
public data class TypeRolePatch(
    public val family: FontFamilyRef? = null,
    public val size: DpValue? = null,
    public val weight: FontWeightValue? = null,
    public val lineHeight: LineHeightValue? = null,
    public val letterSpacing: EmValue? = null,
    public val color: TypeColorRef? = null,
)
