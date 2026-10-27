package io.github.alph_a07.basis.theme.resolution.fonts

import io.github.alph_a07.basis.theme.core.ThemeMode
import io.github.alph_a07.basis.theme.resolution.ResolutionContext

/**
 * Fonts stage applying resolved font roles and weight clamps to typography.
 */
internal object FontStage {
    /**
     * Resolves font role assignments from catalog and records diagnostics into [context].
     *
     * @param context Resolution context holding typography intent and unified profile.
     */
    fun plan(context: ResolutionContext) {
        val fonts = resolveFontRoles(context.normalized, context.profile)
        context.fonts = fonts
        context.reportAll(fonts.entries)
    }

    /**
     * Applies font role families and per-level weight clamps to the typography tokens for [mode].
     *
     * @param context Resolution context holding resolved font assignments and control weight clamps.
     * @param mode Target theme mode.
     */
    fun process(context: ResolutionContext, mode: ThemeMode) {
        val draft = requireNotNull(context.drafts[mode])
        val isDark = mode == ThemeMode.Dark

        context.drafts[mode] =
            draft.copy(
                typography =
                    applyResolvedFonts(
                        typography = draft.typography,
                        fonts = requireNotNull(context.fonts),
                        weightClamps = context.normalized.control?.fonts?.weightClamps ?: emptyMap(),
                        isDark = isDark,
                    ),
            )
    }
}
