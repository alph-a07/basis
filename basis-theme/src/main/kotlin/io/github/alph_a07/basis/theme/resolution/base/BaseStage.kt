package io.github.alph_a07.basis.theme.resolution.base

import io.github.alph_a07.basis.theme.core.ThemeMode
import io.github.alph_a07.basis.theme.resolution.ResolutionContext
import io.github.alph_a07.basis.theme.resolution.ThemeDraft
import io.github.alph_a07.basis.theme.resolution.constants.NEUTRAL_HUE_DEGREES
import io.github.alph_a07.basis.theme.resolution.report.ReportEntry
import io.github.alph_a07.basis.theme.resolution.report.ReportStatus
import io.github.alph_a07.basis.theme.resolution.report.ResolutionStage

/**
 * Base stage that initializes the draft token trees and neutral colors for a mode.
 */
internal object BaseStage {
    /**
     * Initializes base token ladders and synthesized neutral colors for [mode] into [ResolutionContext.drafts].
     *
     * @param context Resolution context holding base tables, profile, and fonts.
     * @param mode Target theme mode to initialize.
     */
    fun process(context: ResolutionContext, mode: ThemeMode) {
        val deriveColors = context.normalized.deriveColors
        val synthesizedHue = resolveSynthesizedHue(context, deriveColors)
        val synthesizedChromas =
            if (deriveColors) {
                synthesizeNeutralChroma(context.profile.chroma)
            } else {
                SynthesizedChroma(0f, 0f, 0f, 0f, 0f, 0f, 0f)
            }

        recordBaseReport(context, deriveColors, synthesizedHue)

        val isLight = mode == ThemeMode.Light
        val tables = context.baseTables
        val neutralTargets = NeutralTargets(if (isLight) tables.lightNeutrals else tables.darkNeutrals, isLight)
        val fonts = requireNotNull(context.fonts) { "Fonts must be planned before BaseStage." }

        val neutralHue = if (deriveColors) synthesizedHue else NEUTRAL_HUE_DEGREES
        val brandTints = context.brandTints[mode]

        context.drafts[mode] =
            ThemeDraft(
                mode = mode,
                color =
                    baseColorTokens(
                        targets = neutralTargets,
                        status = if (isLight) tables.statusLight else tables.statusDark,
                        deriveColors = deriveColors,
                        hue = synthesizedHue,
                        chroma = synthesizedChromas,
                    ),
                typography =
                    baseTypographyTokens(
                        metrics = tables.typeMetrics,
                        structure = fonts.structure,
                        content = fonts.content,
                        metadata = fonts.metadata,
                    ),
                spacing = baseSpacingTokens(tables.spacing),
                radius = baseRadiusTokens(tables.radiusLevels),
                depth = baseDepthTokens(tables.depth),
                size = baseSizeTokens(tables.iconSizes, tables.avatarSizes, tables.controlSizes, tables.dotSizes),
                motion = tables.motion,
                neutralHue = neutralHue,
                brandTints = brandTints,
            )
    }

    private fun resolveSynthesizedHue(context: ResolutionContext, deriveColors: Boolean): Float =
        if (deriveColors && context.normalized.brandColor == null) {
            synthesizeNeutralHue(
                context.profile,
                context.normalized.domain.domains,
                context.profile.warmth,
            )
        } else {
            NEUTRAL_HUE_DEGREES
        }

    private fun recordBaseReport(context: ResolutionContext, deriveColors: Boolean, hue: Float) {
        if (context.entries.none { it.path == "color.derivation" }) {
            context.report(
                ReportEntry(
                    path = "color.derivation",
                    stage = ResolutionStage.Base,
                    status = if (deriveColors) ReportStatus.Honored else ReportStatus.Absent,
                    message =
                        if (deriveColors) {
                            "Color tokens derived from mood, brand, and domain signals."
                        } else {
                            "Color derivation disabled; fully achromatic base generated."
                        },
                    enforced = if (deriveColors) hue.toString() else null,
                ),
            )
        }
    }
}
