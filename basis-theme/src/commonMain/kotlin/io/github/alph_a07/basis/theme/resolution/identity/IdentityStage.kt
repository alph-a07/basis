package io.github.alph_a07.basis.theme.resolution.identity

import io.github.alph_a07.basis.theme.core.ThemeMode
import io.github.alph_a07.basis.theme.resolution.ResolutionContext

/**
 * Identity stage resolving mode-invariant brand anchors and per-mode presence tints.
 */
internal object IdentityStage {
    /**
     * Resolves brand anchors and per-mode presence tints into [context].
     *
     * @param context Resolution context holding brand identity inputs.
     */
    fun process(context: ResolutionContext) {
        val brandColor = context.normalized.brandColor
        val brand = brandAnchors(brandColor, context.normalized.supportingColors)
        context.brand = brand

        if (brand != null) {
            context.brandTints =
                context.modes.associateWith { mode ->
                    resolveBrandTints(
                        presence = context.normalized.presence,
                        isDark = mode == ThemeMode.Dark,
                        brandChroma = brand.primary.c,
                    )
                }
        }
    }
}
