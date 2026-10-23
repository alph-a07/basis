package io.github.alph_a07.basis.theme.resolution.component

import io.github.alph_a07.basis.theme.intent.controls.overrides.ComponentExtraPatch
import io.github.alph_a07.basis.theme.intent.controls.overrides.ComponentId
import io.github.alph_a07.basis.theme.intent.controls.overrides.ComponentOverride
import io.github.alph_a07.basis.theme.intent.controls.overrides.ComponentOverrides
import io.github.alph_a07.basis.theme.intent.controls.overrides.StateId
import io.github.alph_a07.basis.theme.intent.controls.overrides.UniversalStylePatch
import io.github.alph_a07.basis.theme.intent.controls.overrides.VariantId
import io.github.alph_a07.basis.theme.intent.controls.overrides.VariantStateKey
import io.github.alph_a07.basis.theme.tokens.core.ResolvedTheme
import io.github.alph_a07.basis.theme.tokens.core.resolveIn
import kotlin.reflect.KClass

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

private fun resolveUniversal(
    variantState: UniversalStylePatch?,
    variant: UniversalStylePatch?,
    state: UniversalStylePatch?,
    all: UniversalStylePatch?,
    theme: ResolvedTheme,
): ResolvedUniversalStyle {
    val patches = arrayOf(variantState, variant, state, all)

    val prominence = resolveFirst(patches) { it.prominence }
    val treatment = resolveFirst(patches) { it.treatment }
    val surfacePath = resolveFirst(patches) { it.surface }
    val contentPath = resolveFirst(patches) { it.content }
    val borderPath = resolveFirst(patches) { it.border }
    val radiusPath = resolveFirst(patches) { it.radius }
    val typographyPath = resolveFirst(patches) { it.typography }
    val paddingPath = resolveFirst(patches) { it.padding }
    val gapPath = resolveFirst(patches) { it.gap }

    return ResolvedUniversalStyle(
        prominence = prominence,
        treatment = treatment,
        surface = surfacePath?.resolveIn(theme.color),
        content = contentPath?.resolveIn(theme.color),
        border = borderPath?.resolveIn(theme.color),
        radius = radiusPath?.resolveIn(theme.radius),
        typography = typographyPath?.resolveIn(theme.typography),
        padding = paddingPath?.resolveIn(theme.spacing),
        gap = gapPath?.resolveIn(theme.spacing),
    )
}

private fun <T> resolveFirst(
    patches: Array<UniversalStylePatch?>,
    selector: (UniversalStylePatch) -> T?,
): T? {
    for (patch in patches) {
        if (patch != null) {
            val value = selector(patch)
            if (value != null) {
                return value
            }
        }
    }

    return null
}

private fun resolveExtra(
    id: ComponentId,
    variantState: ComponentExtraPatch?,
    variant: ComponentExtraPatch?,
    state: ComponentExtraPatch?,
    all: ComponentExtraPatch?,
): ComponentExtraPatch? {
    val expectedClass = expectedExtraType(id) ?: return null

    return when (expectedClass) {
        ComponentExtraPatch.Button::class ->
            mergeButtonExtra(
                variantState as? ComponentExtraPatch.Button,
                variant as? ComponentExtraPatch.Button,
                state as? ComponentExtraPatch.Button,
                all as? ComponentExtraPatch.Button,
            )

        ComponentExtraPatch.TextField::class ->
            mergeTextFieldExtra(
                variantState as? ComponentExtraPatch.TextField,
                variant as? ComponentExtraPatch.TextField,
                state as? ComponentExtraPatch.TextField,
                all as? ComponentExtraPatch.TextField,
            )

        ComponentExtraPatch.Switch::class ->
            mergeSwitchExtra(
                variantState as? ComponentExtraPatch.Switch,
                variant as? ComponentExtraPatch.Switch,
                state as? ComponentExtraPatch.Switch,
                all as? ComponentExtraPatch.Switch,
            )

        ComponentExtraPatch.Dialog::class ->
            mergeDialogExtra(
                variantState as? ComponentExtraPatch.Dialog,
                variant as? ComponentExtraPatch.Dialog,
                state as? ComponentExtraPatch.Dialog,
                all as? ComponentExtraPatch.Dialog,
            )

        else -> null
    }
}

private fun expectedExtraType(id: ComponentId): KClass<out ComponentExtraPatch>? =
    when (id.value.lowercase()) {
        "button", "icon_button", "fab", "link" -> ComponentExtraPatch.Button::class
        "text_field", "textfield", "multiline_text_field", "search_field",
        "password_field", "pin_field",
        -> ComponentExtraPatch.TextField::class
        "switch" -> ComponentExtraPatch.Switch::class
        "dialog", "alert_dialog" -> ComponentExtraPatch.Dialog::class
        else -> null
    }

private fun mergeButtonExtra(
    vararg patches: ComponentExtraPatch.Button?,
): ComponentExtraPatch.Button? {
    val icon = patches.firstNotNullOfOrNull { it?.icon }
    val iconSize = patches.firstNotNullOfOrNull { it?.iconSize }
    val controlSize = patches.firstNotNullOfOrNull { it?.controlSize }
    val depth = patches.firstNotNullOfOrNull { it?.depth }
    val motion = patches.firstNotNullOfOrNull { it?.motion }

    if (listOfNotNull(icon, iconSize, controlSize, depth, motion).isEmpty()) {
        return null
    }

    return ComponentExtraPatch.Button(
        icon = icon,
        iconSize = iconSize,
        controlSize = controlSize,
        depth = depth,
        motion = motion,
    )
}

private fun mergeTextFieldExtra(
    vararg patches: ComponentExtraPatch.TextField?,
): ComponentExtraPatch.TextField? {
    val label = patches.firstNotNullOfOrNull { it?.labelTypography }
    val placeholder = patches.firstNotNullOfOrNull { it?.placeholderContent }
    val leadingIcon = patches.firstNotNullOfOrNull { it?.leadingIcon }
    val controlSize = patches.firstNotNullOfOrNull { it?.controlSize }

    if (listOfNotNull(label, placeholder, leadingIcon, controlSize).isEmpty()) {
        return null
    }

    return ComponentExtraPatch.TextField(
        labelTypography = label,
        placeholderContent = placeholder,
        leadingIcon = leadingIcon,
        controlSize = controlSize,
    )
}

private fun mergeSwitchExtra(
    vararg patches: ComponentExtraPatch.Switch?,
): ComponentExtraPatch.Switch? {
    val on = patches.firstNotNullOfOrNull { it?.trackOn }
    val off = patches.firstNotNullOfOrNull { it?.trackOff }
    val thumb = patches.firstNotNullOfOrNull { it?.thumb }

    if (listOfNotNull(on, off, thumb).isEmpty()) {
        return null
    }

    return ComponentExtraPatch.Switch(
        trackOn = on,
        trackOff = off,
        thumb = thumb,
    )
}

private fun mergeDialogExtra(
    vararg patches: ComponentExtraPatch.Dialog?,
): ComponentExtraPatch.Dialog? {
    val scrim = patches.firstNotNullOfOrNull { it?.scrim }
    val depth = patches.firstNotNullOfOrNull { it?.depth }

    if (listOfNotNull(scrim, depth).isEmpty()) {
        return null
    }

    return ComponentExtraPatch.Dialog(
        scrim = scrim,
        depth = depth,
    )
}
