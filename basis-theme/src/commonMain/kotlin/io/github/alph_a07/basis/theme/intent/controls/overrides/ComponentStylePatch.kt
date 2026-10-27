package io.github.alph_a07.basis.theme.intent.controls.overrides

/**
 * Split style patch: fields shared across component families plus a typed per-family extension.
 *
 * @property universal Fields with high hit-rate across most components.
 * @property extra Family-specific fields, opaque to theme core and interpreted only by the owning
 * component family.
 */
public data class ComponentStylePatch(
    public val universal: UniversalStylePatch? = null,
    public val extra: ComponentExtraPatch? = null,
)
