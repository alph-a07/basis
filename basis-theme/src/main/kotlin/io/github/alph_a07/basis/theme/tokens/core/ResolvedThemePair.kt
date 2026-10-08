package io.github.alph_a07.basis.theme.tokens.core

import io.github.alph_a07.basis.theme.report.ResolutionReport

/**
 * Engine emit for a single intent: paired light/dark themes plus diagnostics.
 *
 * @property light Light tree, null only when `ModeGeneration` requests dark only.
 * @property dark Dark tree, null only when `ModeGeneration` requests light only.
 * @property report Public diagnostics; carries the `seedVersion` field expectation.
 */
public data class ResolvedThemePair(
    public val light: ResolvedTheme?,
    public val dark: ResolvedTheme?,
    public val report: ResolutionReport,
) {
    init {
        require(light != null || dark != null) { "ResolvedThemePair requires at least one mode." }
    }
}
