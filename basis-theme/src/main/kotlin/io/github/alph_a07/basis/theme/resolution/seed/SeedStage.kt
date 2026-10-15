package io.github.alph_a07.basis.theme.resolution.seed

import io.github.alph_a07.basis.theme.core.ThemeMode
import io.github.alph_a07.basis.theme.core.color.Oklch
import io.github.alph_a07.basis.theme.intent.BrandPresence
import io.github.alph_a07.basis.theme.resolution.WorkingTheme
import io.github.alph_a07.basis.theme.resolution.fonts.FontRolePlan

/**
 * Seeds a working tree for one mode from the versioned [tables].
 *
 * Scalars, type metrics, and motion come straight from the seed ladders, while colors are the
 * dual-mode neutral and status targets for [mode].
 *
 * @param mode Mode being seeded.
 * @param tables Versioned seed tables to read.
 * @param fonts Resolved font role plan shared by every mode.
 * @param brandPrimary Brand anchor already converted by normalization, or null when unspecified.
 * @param presence Presence as specified, meaningful only when [brandPrimary] is present.
 * @return A working tree whose color tokens are seed neutrals and status roles.
 */
internal fun seedWorkingTheme(
    mode: ThemeMode,
    tables: BasisSeedTables,
    fonts: FontRolePlan,
    brandPrimary: Oklch?,
    presence: BrandPresence?,
): WorkingTheme {
    val isLight = mode == ThemeMode.Light

    return WorkingTheme(
        mode = mode,
        color =
            seedColorTokens(
                targets = NeutralTargets(if (isLight) tables.lightNeutrals else tables.darkNeutrals, isLight),
                status = if (isLight) tables.statusLight else tables.statusDark,
            ),
        typography =
            seedTypographyTokens(
                metrics = tables.typeMetrics,
                structure = fonts.structure,
                content = fonts.content,
                metadata = fonts.metadata,
            ),
        spacing = seedSpacingTokens(tables.spacing),
        radius = seedRadiusTokens(tables.radiusLevels),
        depth = seedDepthTokens(tables.depth),
        size = seedSizeTokens(tables.iconSizes, tables.avatarSizes, tables.controlSizes, tables.dotSizes),
        motion = tables.motion,
        neutralHue = NEUTRAL_HUE_DEGREES,
        brandPrimary = brandPrimary,
        presence = presence,
    )
}
