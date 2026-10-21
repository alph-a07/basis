package io.github.alph_a07.basis.theme.resolution

import io.github.alph_a07.basis.theme.core.ThemeMode
import io.github.alph_a07.basis.theme.intent.BasisIntent
import io.github.alph_a07.basis.theme.resolution.base.BaseStage
import io.github.alph_a07.basis.theme.resolution.control.ControlStage
import io.github.alph_a07.basis.theme.resolution.derive.DeriveStage
import io.github.alph_a07.basis.theme.resolution.domain.DomainStage
import io.github.alph_a07.basis.theme.resolution.enforce.EnforceStage
import io.github.alph_a07.basis.theme.resolution.fonts.FontStage
import io.github.alph_a07.basis.theme.resolution.identity.IdentityStage
import io.github.alph_a07.basis.theme.resolution.mood.MoodStage
import io.github.alph_a07.basis.theme.resolution.normalize.NormalizeStage
import io.github.alph_a07.basis.theme.resolution.report.ResolutionReport
import io.github.alph_a07.basis.theme.tokens.core.ResolvedThemePair

/**
 * Resolves intent into paired light and dark themes plus diagnostics.
 *
 * @param intent Consumer intent, every axis optional; the empty intent resolves to defaults.
 * @return The paired themes for the requested mode generation, with diagnostics.
 */
public fun resolve(intent: BasisIntent): ResolvedThemePair {
    val context = NormalizeStage.process(intent)

    DomainStage.process(context)
    MoodStage.process(context)
    IdentityStage.process(context)
    FontStage.plan(context)

    for (mode in context.modes) {
        BaseStage.process(context, mode)
        DeriveStage.process(context, mode)
        FontStage.process(context, mode)
        ControlStage.process(context, mode)
        EnforceStage.process(context, mode)
    }

    val light = context.drafts[ThemeMode.Light]?.toResolvedTheme()
    val dark = context.drafts[ThemeMode.Dark]?.toResolvedTheme()

    return ResolvedThemePair(
        light = light,
        dark = dark,
        report =
            ResolutionReport(
                entries = context.entries,
                baseVersion = context.baseTables.version,
                modes = context.modes.toSet(),
                fontAssignments = context.fontReport(),
            ),
    )
}
