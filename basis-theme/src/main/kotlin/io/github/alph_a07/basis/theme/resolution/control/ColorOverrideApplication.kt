package io.github.alph_a07.basis.theme.resolution.control

import io.github.alph_a07.basis.theme.core.ThemeMode
import io.github.alph_a07.basis.theme.intent.controls.overrides.BorderColorOverrides
import io.github.alph_a07.basis.theme.intent.controls.overrides.BrandColorOverrides
import io.github.alph_a07.basis.theme.intent.controls.overrides.ColorTokenOverrides
import io.github.alph_a07.basis.theme.intent.controls.overrides.ContentColorOverrides
import io.github.alph_a07.basis.theme.intent.controls.overrides.IconColorOverrides
import io.github.alph_a07.basis.theme.intent.controls.overrides.OverrideMode
import io.github.alph_a07.basis.theme.intent.controls.overrides.SelectionColorOverrides
import io.github.alph_a07.basis.theme.intent.controls.overrides.StatusColorOverrides
import io.github.alph_a07.basis.theme.intent.controls.overrides.SurfaceColorOverrides
import io.github.alph_a07.basis.theme.tokens.color.BorderColors
import io.github.alph_a07.basis.theme.tokens.color.BrandColors
import io.github.alph_a07.basis.theme.tokens.color.ColorTokens
import io.github.alph_a07.basis.theme.tokens.color.ContentColors
import io.github.alph_a07.basis.theme.tokens.color.IconColors
import io.github.alph_a07.basis.theme.tokens.color.SelectionColors
import io.github.alph_a07.basis.theme.tokens.color.StatusColors
import io.github.alph_a07.basis.theme.tokens.color.SurfaceColors
import io.github.alph_a07.basis.theme.tokens.core.ColorTokenPath

/**
 * Applies mode-scoped neutral, status, brand, and gradient overrides onto one mode's color tree.
 *
 * @param color Derived color tree.
 * @param overrides Color overrides as specified, or null when Control specifies none.
 * @param mode Mode being resolved.
 * @param locked Accumulator of the tokens this application replaced.
 * @return The color tree with overridden tokens replaced.
 */
internal fun applyColorOverrides(
    color: ColorTokens,
    overrides: ColorTokenOverrides?,
    mode: ThemeMode,
    locked: MutableSet<ColorTokenPath>,
): ColorTokens {
    if (overrides == null) {
        return color
    }

    return color.copy(
        surface = color.surface.applyOverrides(overrides.surface, mode, locked),
        content = color.content.applyOverrides(overrides.content, mode, locked),
        icon = color.icon.applyOverrides(overrides.icon, mode, locked),
        border = color.border.applyOverrides(overrides.border, mode, locked),
        selection = color.selection.applyOverrides(overrides.selection, mode, locked),
        focus =
            color.focus.copy(
                ring = color.focus.ring.orOverride(overrides.focus?.ring, mode, ColorTokenPath.FocusRing, locked),
            ),
        positive = color.positive.applyOverrides(overrides.positive, POSITIVE, mode, locked),
        negative = color.negative.applyOverrides(overrides.negative, NEGATIVE, mode, locked),
        caution = color.caution.applyOverrides(overrides.caution, CAUTION, mode, locked),
        info = color.info.applyOverrides(overrides.info, INFO, mode, locked),
        gradient =
            color.gradient.copy(
                brand = color.gradient.brand.orOverride(overrides.gradient?.brand, mode),
                surface = color.gradient.surface.orOverride(overrides.gradient?.surface, mode),
            ),
        brand = color.brand.applyOverrides(overrides.brand, mode, locked),
    )
}

private fun SurfaceColors.applyOverrides(
    overrides: SurfaceColorOverrides?,
    mode: ThemeMode,
    locked: MutableSet<ColorTokenPath>,
): SurfaceColors = copy(
    default = default.orOverride(overrides?.default, mode, ColorTokenPath.SurfaceDefault, locked),
    elevated = elevated.orOverride(overrides?.elevated, mode, ColorTokenPath.SurfaceElevated, locked),
    recessed = recessed.orOverride(overrides?.recessed, mode, ColorTokenPath.SurfaceRecessed, locked),
    inverse = inverse.orOverride(overrides?.inverse, mode, ColorTokenPath.SurfaceInverse, locked),
)

private fun ContentColors.applyOverrides(
    overrides: ContentColorOverrides?,
    mode: ThemeMode,
    locked: MutableSet<ColorTokenPath>,
): ContentColors = copy(
    default = default.orOverride(overrides?.default, mode, ColorTokenPath.ContentDefault, locked),
    muted = muted.orOverride(overrides?.muted, mode, ColorTokenPath.ContentMuted, locked),
    inverse = inverse.orOverride(overrides?.inverse, mode, ColorTokenPath.ContentInverse, locked),
)

private fun IconColors.applyOverrides(
    overrides: IconColorOverrides?,
    mode: ThemeMode,
    locked: MutableSet<ColorTokenPath>,
): IconColors = copy(
    default = default.orOverride(overrides?.default, mode, ColorTokenPath.IconDefault, locked),
    muted = muted.orOverride(overrides?.muted, mode, ColorTokenPath.IconMuted, locked),
    inverse = inverse.orOverride(overrides?.inverse, mode, ColorTokenPath.IconInverse, locked),
)

private fun BorderColors.applyOverrides(
    overrides: BorderColorOverrides?,
    mode: ThemeMode,
    locked: MutableSet<ColorTokenPath>,
): BorderColors = copy(
    default = default.orOverride(overrides?.default, mode, ColorTokenPath.BorderDefault, locked),
    muted = muted.orOverride(overrides?.muted, mode, ColorTokenPath.BorderMuted, locked),
    strong = strong.orOverride(overrides?.strong, mode, ColorTokenPath.BorderStrong, locked),
    inverse = inverse.orOverride(overrides?.inverse, mode, ColorTokenPath.BorderInverse, locked),
)

private fun SelectionColors.applyOverrides(
    overrides: SelectionColorOverrides?,
    mode: ThemeMode,
    locked: MutableSet<ColorTokenPath>,
): SelectionColors = copy(
    surface = surface.orOverride(overrides?.surface, mode, ColorTokenPath.SelectionSurface, locked),
    content = content.orOverride(overrides?.content, mode, ColorTokenPath.SelectionContent, locked),
    border = border.orOverride(overrides?.border, mode, ColorTokenPath.SelectionBorder, locked),
)

private fun StatusColors.applyOverrides(
    overrides: StatusColorOverrides?,
    pathOf: (String) -> ColorTokenPath,
    mode: ThemeMode,
    locked: MutableSet<ColorTokenPath>,
): StatusColors = copy(
    surface = surface.orOverride(overrides?.surface, mode, pathOf("Surface"), locked),
    content = content.orOverride(overrides?.content, mode, pathOf("Content"), locked),
    border = border.orOverride(overrides?.border, mode, pathOf("Border"), locked),
    icon = icon.orOverride(overrides?.icon, mode, pathOf("Icon"), locked),
)

private fun BrandColors.applyOverrides(
    overrides: BrandColorOverrides?,
    mode: ThemeMode,
    locked: MutableSet<ColorTokenPath>,
): BrandColors = copy(
    primary = primary.orOverride(overrides?.primary, mode, ColorTokenPath.BrandPrimary, locked),
    secondary = secondary.orOverride(overrides?.secondary, mode, ColorTokenPath.BrandSecondary, locked),
    tertiary = tertiary.orOverride(overrides?.tertiary, mode, ColorTokenPath.BrandTertiary, locked),
    quaternary = quaternary.orOverride(overrides?.quaternary, mode, ColorTokenPath.BrandQuaternary, locked),
)

private fun <T> T.orOverride(
    override: OverrideMode<T>?,
    mode: ThemeMode,
    path: ColorTokenPath? = null,
    locked: MutableSet<ColorTokenPath>? = null,
): T {
    val value = override.forMode(mode) ?: return this
    if (path != null && locked != null) {
        locked += path
    }

    return value
}

/** Builds the token path of a positive status token. */
private val POSITIVE: (String) -> ColorTokenPath = { role -> ColorTokenPath.valueOf("Positive$role") }

/** Builds the token path of a negative status token. */
private val NEGATIVE: (String) -> ColorTokenPath = { role -> ColorTokenPath.valueOf("Negative$role") }

/** Builds the token path of a caution status token. */
private val CAUTION: (String) -> ColorTokenPath = { role -> ColorTokenPath.valueOf("Caution$role") }

/** Builds the token path of an informational status token. */
private val INFO: (String) -> ColorTokenPath = { role -> ColorTokenPath.valueOf("Info$role") }
