package io.github.alph_a07.basis.theme.resolution.derive

import io.github.alph_a07.basis.theme.core.color.Oklch
import io.github.alph_a07.basis.theme.core.color.gamutMapped
import io.github.alph_a07.basis.theme.core.color.mixOklch
import io.github.alph_a07.basis.theme.core.color.safeOklch
import io.github.alph_a07.basis.theme.resolution.identity.PresencePlan
import io.github.alph_a07.basis.theme.tokens.color.BorderColors
import io.github.alph_a07.basis.theme.tokens.color.ColorTokens
import io.github.alph_a07.basis.theme.tokens.color.ContentColors
import io.github.alph_a07.basis.theme.tokens.color.IconColors
import io.github.alph_a07.basis.theme.tokens.color.SelectionColors
import io.github.alph_a07.basis.theme.tokens.color.StatusColors
import io.github.alph_a07.basis.theme.tokens.color.SurfaceColors

internal fun deriveSurfaces(
    surfaces: SurfaceColors,
    neutralHue: Float,
    modulators: ColorModulators,
    anchor: Oklch,
    plan: PresencePlan?,
): SurfaceColors = SurfaceColors(
    default = tint(neutral(surfaces.default, neutralHue, modulators), anchor, plan?.defaultSurface ?: 0f),
    elevated = tint(neutral(surfaces.elevated, neutralHue, modulators), anchor, plan?.elevated ?: 0f),
    recessed = neutral(surfaces.recessed, neutralHue, modulators),
    inverse = neutral(surfaces.inverse, neutralHue, modulators),
)

internal fun deriveContents(
    contents: ContentColors,
    surfaces: SurfaceColors,
    neutralHue: Float,
    modulators: ColorModulators,
): ContentColors = ContentColors(
    default = scaleContent(contents.default, surfaces.default.l, neutralHue, modulators),
    muted = scaleContent(contents.muted, surfaces.default.l, neutralHue, modulators),
    inverse = scaleContent(contents.inverse, surfaces.inverse.l, neutralHue, modulators),
)

internal fun deriveIcons(
    icons: IconColors,
    surfaces: SurfaceColors,
    neutralHue: Float,
    modulators: ColorModulators,
): IconColors = IconColors(
    default = scaleContent(icons.default, surfaces.default.l, neutralHue, modulators),
    muted = scaleContent(icons.muted, surfaces.default.l, neutralHue, modulators),
    inverse = scaleContent(icons.inverse, surfaces.inverse.l, neutralHue, modulators),
)

internal fun deriveBorders(
    borders: BorderColors,
    neutralHue: Float,
    modulators: ColorModulators,
    anchor: Oklch,
    plan: PresencePlan?,
): BorderColors = BorderColors(
    default = strengthen(borders.default, neutralHue, modulators),
    muted = strengthen(borders.muted, neutralHue, modulators),
    strong = tint(strengthen(borders.strong, neutralHue, modulators), anchor, plan?.borderStrong ?: 0f),
    inverse = strengthen(borders.inverse, neutralHue, modulators),
)

internal fun ColorTokens.deriveSelection(
    surfaces: SurfaceColors,
    anchor: Oklch,
    neutralHue: Float,
    modulators: ColorModulators,
    tint: Float,
): SelectionColors = SelectionColors(
    surface = tint(selection.surface, anchor, tint),
    content = scaleContent(selection.content, surfaces.default.l, neutralHue, modulators),
    border = tint(selection.border, anchor, tint),
)

internal fun deriveStatus(
    status: StatusColors,
    modulators: ColorModulators,
): StatusColors {
    val scale = modulators.statusScale

    return StatusColors(
        surface = status.surface.copy(c = status.surface.c * scale),
        content = status.content.copy(c = status.content.c * scale),
        border = status.border.copy(c = status.border.c * scale),
        icon = status.icon.copy(c = status.icon.c * scale),
    )
}

/** Applies the neutral chroma scale and the warmth hue shift. */
private fun neutral(color: Oklch, neutralHue: Float, modulators: ColorModulators): Oklch = safeOklch(
    l = color.l,
    c = color.c * modulators.neutralChromaScale,
    h = neutralHue,
    a = color.a,
)

/**
 * Scales a content token against the surface it is read on.
 *
 * The seeded surface-to-content lightness delta is multiplied by the contrast preference, so a
 * punchier mood widens the gap and a softer mood narrows it.
 */
private fun scaleContent(
    color: Oklch,
    surfaceL: Float,
    neutralHue: Float,
    modulators: ColorModulators,
): Oklch {
    val scaled = neutral(color, neutralHue, modulators)
    val delta = (surfaceL - scaled.l) * modulators.lightnessDeltaScale

    return safeOklch(l = surfaceL - delta, c = scaled.c, h = neutralHue, a = color.a)
}

/** Applies the combined border strength multiplier and the warmth hue shift. */
private fun strengthen(color: Oklch, neutralHue: Float, modulators: ColorModulators): Oklch = safeOklch(
    l = color.l,
    c = color.c * modulators.borderScale,
    h = neutralHue,
    a = color.a,
)

private fun tint(color: Oklch, anchor: Oklch, amount: Float): Oklch = mixOklch(color, anchor, amount).gamutMapped()
