package io.github.alph_a07.basis.theme.resolution.control

import io.github.alph_a07.basis.theme.core.ThemeMode
import io.github.alph_a07.basis.theme.resolution.ResolutionContext
import io.github.alph_a07.basis.theme.tokens.core.ColorTokenPath

/** Control stage applying token and path overrides for a mode. */
internal object ControlStage {
    /**
     * Applies family overrides and custom path overrides for [mode] into [context].
     *
     * @param context Resolution context holding control overrides and diagnostics.
     * @param mode Target theme mode.
     */
    fun process(context: ResolutionContext, mode: ThemeMode) {
        val overrides = context.normalized.control?.tokens ?: return
        val draft = requireNotNull(context.drafts[mode])
        val locked = mutableSetOf<ColorTokenPath>()

        val withFamilyOverrides =
            draft.copy(
                color = applyColorOverrides(draft.color, overrides.color, mode, locked),
                typography = applyTypographyOverrides(draft.typography, overrides),
                spacing = applySpacingOverrides(draft.spacing, overrides),
                radius = applyRadiusOverrides(draft.radius, overrides),
                depth = applyDepthOverrides(draft.depth, overrides.depth, mode),
                motion = applyMotionOverrides(draft.motion, overrides),
            )

        context.drafts[mode] =
            applyPathOverrides(
                draft = withFamilyOverrides,
                paths = overrides.paths,
                mode = mode,
                entries = context.entries,
            )
    }
}
