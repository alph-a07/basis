package io.github.alph_a07.basis.theme.resolution.component

import io.github.alph_a07.basis.theme.intent.controls.overrides.UniversalStylePatch
import io.github.alph_a07.basis.theme.tokens.core.ResolvedTheme
import io.github.alph_a07.basis.theme.tokens.core.resolveIn

internal fun resolveUniversal(
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
    val depthPath = resolveFirst(patches) { it.depth }

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
        depth = depthPath?.resolveIn(theme.depth),
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
