package io.github.alph_a07.basis.theme.intent.controls.overrides

/**
 * Composite key addressing one variant in one state.
 *
 * @property variant Variant within the component family.
 * @property state Interaction state within the component family.
 */
public data class VariantStateKey(
    public val variant: VariantId,
    public val state: StateId,
)
