package io.github.alph_a07.basis.theme.resolution.component

import io.github.alph_a07.basis.theme.intent.controls.overrides.ComponentId
import io.github.alph_a07.basis.theme.intent.controls.overrides.ComponentOverride
import io.github.alph_a07.basis.theme.intent.controls.overrides.ComponentOverrides
import io.github.alph_a07.basis.theme.intent.controls.overrides.StateId
import io.github.alph_a07.basis.theme.intent.controls.overrides.VariantId
import io.github.alph_a07.basis.theme.intent.controls.overrides.VariantStateKey
import io.github.alph_a07.basis.theme.tokens.core.ResolvedTheme

/**
 * Resolves the visual and structural styling of a component instance by merging [override]
 * with [theme] token trees.
 *
 * Precedence follows cascading specificity:
 * 1. [ComponentOverride.byVariantState] (most specific: exact variant and state combination)
 * 2. [ComponentOverride.byVariant] (variant-wide override)
 * 3. [ComponentOverride.byState] (state-wide override across all variants)
 * 4. [ComponentOverride.all] (base component-wide override)
 *
 * Irrelevant universal fields remain null, allowing components to fall back to their local
 * treatment defaults. Extra patches that do not match the expected type for [id] are rejected
 * and omitted per policy.
 *
 * @param id Stable identifier of the component family being resolved.
 * @param variant Optional variant within the component family (e.g. `"primary"`).
 * @param state Optional interaction state (e.g. `"pressed"`).
 * @param override Component override specification, or null if none was supplied.
 * @param theme The resolved theme tree used to resolve token paths into concrete values.
 * @return Fully resolved component style.
 */
public fun resolveComponentStyle(
    id: ComponentId,
    variant: VariantId? = null,
    state: StateId? = null,
    override: ComponentOverride? = null,
    theme: ResolvedTheme,
): ResolvedComponentStyle {
    val variantStatePatch =
        if (variant != null && state != null) {
            override?.byVariantState?.get(VariantStateKey(variant, state))
        } else {
            null
        }
    val variantPatch = if (variant != null) override?.byVariant?.get(variant) else null
    val statePatch = if (state != null) override?.byState?.get(state) else null
    val allPatch = override?.all

    val resolvedUniversal =
        resolveUniversal(
            variantState = variantStatePatch?.universal,
            variant = variantPatch?.universal,
            state = statePatch?.universal,
            all = allPatch?.universal,
            theme = theme,
        )

    val resolvedExtra =
        resolveExtra(
            id = id,
            variantState = variantStatePatch?.extra,
            variant = variantPatch?.extra,
            state = statePatch?.extra,
            all = allPatch?.extra,
        )

    return ResolvedComponentStyle(
        id = id,
        universal = resolvedUniversal,
        extra = resolvedExtra,
    )
}

/**
 * Resolves the visual and structural styling of a component instance by selecting [id] from [overrides]
 * and merging it with [theme] token trees.
 *
 * @param id Stable identifier of the component family being resolved.
 * @param variant Optional variant within the component family (e.g. `"primary"`).
 * @param state Optional interaction state (e.g. `"pressed"`).
 * @param overrides Collection of component overrides, or null if none was configured.
 * @param theme The resolved theme tree used to resolve token paths into concrete values.
 * @return Fully resolved component style.
 */
public fun resolveComponentStyle(
    id: ComponentId,
    variant: VariantId? = null,
    state: StateId? = null,
    overrides: ComponentOverrides? = null,
    theme: ResolvedTheme,
): ResolvedComponentStyle = resolveComponentStyle(
    id = id,
    variant = variant,
    state = state,
    override = overrides?.byComponent?.get(id),
    theme = theme,
)
