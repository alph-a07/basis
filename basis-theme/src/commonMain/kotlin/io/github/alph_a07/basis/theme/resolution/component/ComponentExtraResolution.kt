package io.github.alph_a07.basis.theme.resolution.component

import io.github.alph_a07.basis.theme.intent.controls.overrides.ComponentExtraPatch
import io.github.alph_a07.basis.theme.intent.controls.overrides.ComponentId

internal fun resolveExtra(
    id: ComponentId,
    variantState: ComponentExtraPatch?,
    variant: ComponentExtraPatch?,
    state: ComponentExtraPatch?,
    all: ComponentExtraPatch?,
): ComponentExtraPatch? = when (id) {
    ComponentId.Surface ->
        typedPatches<ComponentExtraPatch.Surface>(variantState, variant, state, all).let { patches ->
            val depth = patches.firstNotNullOfOrNull { it?.depth }
            val borderWidth = patches.firstNotNullOfOrNull { it?.borderWidth }

            if (depth == null && borderWidth == null) {
                null
            } else {
                ComponentExtraPatch.Surface(depth = depth, borderWidth = borderWidth)
            }
        }

    ComponentId.Icon ->
        typedPatches<ComponentExtraPatch.Icon>(variantState, variant, state, all)
            .firstNotNullOfOrNull { it?.size }
            ?.let(ComponentExtraPatch::Icon)

    ComponentId.Divider ->
        typedPatches<ComponentExtraPatch.Divider>(variantState, variant, state, all)
            .firstNotNullOfOrNull { it?.thickness }
            ?.let(ComponentExtraPatch::Divider)

    ComponentId.Interactive ->
        typedPatches<ComponentExtraPatch.Interactive>(variantState, variant, state, all)
            .firstNotNullOfOrNull { it?.motion }
            ?.let(ComponentExtraPatch::Interactive)

    ComponentId.Spacer ->
        typedPatches<ComponentExtraPatch.Spacer>(variantState, variant, state, all)
            .firstNotNullOfOrNull { it?.size }
            ?.let(ComponentExtraPatch::Spacer)

    ComponentId.Text -> null
}

private inline fun <reified T : ComponentExtraPatch> typedPatches(
    vararg patches: ComponentExtraPatch?,
): Array<T?> = patches.map { it as? T }.toTypedArray()
