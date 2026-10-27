package io.github.alph_a07.basis.theme.intent.controls.overrides

/**
 * One component's patch set across variants and states.
 *
 * Precedence at read time is [byVariantState], then [byVariant], then [byState], then [all];
 * irrelevant fields for a component are ignored.
 *
 * @property all Patch applied to every variant and state of the component.
 * @property byVariant Patches per variant id.
 * @property byState Patches per state id.
 * @property byVariantState Patches per variant-and-state combination.
 */
public data class ComponentOverride(
    public val all: ComponentStylePatch? = null,
    public val byVariant: Map<VariantId, ComponentStylePatch> = emptyMap(),
    public val byState: Map<StateId, ComponentStylePatch> = emptyMap(),
    public val byVariantState: Map<VariantStateKey, ComponentStylePatch> = emptyMap(),
)
