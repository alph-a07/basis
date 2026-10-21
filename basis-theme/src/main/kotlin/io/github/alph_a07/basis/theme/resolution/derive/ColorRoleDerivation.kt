package io.github.alph_a07.basis.theme.resolution.derive

import io.github.alph_a07.basis.theme.core.color.Oklch
import io.github.alph_a07.basis.theme.core.color.gamutMapped
import io.github.alph_a07.basis.theme.core.color.mixOklch
import io.github.alph_a07.basis.theme.core.color.safeOklch
import io.github.alph_a07.basis.theme.resolution.identity.BrandTints
import io.github.alph_a07.basis.theme.tokens.color.BorderColors
import io.github.alph_a07.basis.theme.tokens.color.ContentColors
import io.github.alph_a07.basis.theme.tokens.color.IconColors
import io.github.alph_a07.basis.theme.tokens.color.SelectionColors
import io.github.alph_a07.basis.theme.tokens.color.StatusColors
import io.github.alph_a07.basis.theme.tokens.color.SurfaceColors

internal fun deriveSurfaces(
    surfaces: SurfaceColors,
    neutralHue: Float,
    weights: DerivationWeights,
    anchor: Oklch,
    tints: BrandTints?,
): SurfaceColors = SurfaceColors(
    default = tint(neutral(surfaces.default, neutralHue, weights), anchor, tints?.defaultSurface ?: 0f),
    elevated = tint(neutral(surfaces.elevated, neutralHue, weights), anchor, tints?.elevated ?: 0f),
    recessed = neutral(surfaces.recessed, neutralHue, weights),
    inverse = neutral(surfaces.inverse, neutralHue, weights),
)

internal fun deriveContents(
    contents: ContentColors,
    surfaces: SurfaceColors,
    neutralHue: Float,
    weights: DerivationWeights,
): ContentColors = ContentColors(
    default = scaleContent(contents.default, surfaces.default.l, neutralHue, weights),
    muted = scaleContent(contents.muted, surfaces.default.l, neutralHue, weights),
    inverse = scaleContent(contents.inverse, surfaces.inverse.l, neutralHue, weights),
)

internal fun deriveIcons(
    icons: IconColors,
    surfaces: SurfaceColors,
    neutralHue: Float,
    weights: DerivationWeights,
): IconColors = IconColors(
    default = scaleContent(icons.default, surfaces.default.l, neutralHue, weights),
    muted = scaleContent(icons.muted, surfaces.default.l, neutralHue, weights),
    inverse = scaleContent(icons.inverse, surfaces.inverse.l, neutralHue, weights),
)

internal fun deriveBorders(
    borders: BorderColors,
    neutralHue: Float,
    weights: DerivationWeights,
    anchor: Oklch,
    tints: BrandTints?,
): BorderColors = BorderColors(
    default = strengthen(borders.default, neutralHue, weights),
    muted = strengthen(borders.muted, neutralHue, weights),
    strong = tint(strengthen(borders.strong, neutralHue, weights), anchor, tints?.borderStrong ?: 0f),
    inverse = strengthen(borders.inverse, neutralHue, weights),
)

internal fun deriveSelection(
    selection: SelectionColors,
    surfaces: SurfaceColors,
    anchor: Oklch,
    neutralHue: Float,
    weights: DerivationWeights,
    tint: Float,
): SelectionColors = SelectionColors(
    surface = tint(selection.surface, anchor, tint),
    content = scaleContent(selection.content, surfaces.default.l, neutralHue, weights),
    border = tint(selection.border, anchor, tint),
)

internal fun deriveStatus(
    status: StatusColors,
    weights: DerivationWeights,
): StatusColors {
    val scale = weights.statusScale

    return StatusColors(
        surface = status.surface.copy(c = status.surface.c * scale),
        content = status.content.copy(c = status.content.c * scale),
        border = status.border.copy(c = status.border.c * scale),
        icon = status.icon.copy(c = status.icon.c * scale),
    )
}

/** Applies the neutral chroma scale and the warmth hue shift. */
private fun neutral(color: Oklch, neutralHue: Float, weights: DerivationWeights): Oklch = safeOklch(
    l = color.l,
    c = color.c * weights.neutralChromaScale,
    h = neutralHue,
    a = color.a,
)

/**
 * Scales a content token against the surface it is read on.
 *
 * The base surface-to-content lightness delta is multiplied by the contrast preference, so a
 * punchier mood widens the gap and a softer mood narrows it.
 */
private fun scaleContent(
    color: Oklch,
    surfaceL: Float,
    neutralHue: Float,
    weights: DerivationWeights,
): Oklch {
    val scaled = neutral(color, neutralHue, weights)
    val delta = (surfaceL - scaled.l) * weights.lightnessDeltaScale

    return safeOklch(l = surfaceL - delta, c = scaled.c, h = neutralHue, a = color.a)
}

/** Applies the combined border strength multiplier and the warmth hue shift. */
private fun strengthen(color: Oklch, neutralHue: Float, weights: DerivationWeights): Oklch = safeOklch(
    l = color.l,
    c = color.c * weights.borderScale,
    h = neutralHue,
    a = color.a,
)

private fun tint(color: Oklch, anchor: Oklch, amount: Float): Oklch = mixOklch(color, anchor, amount).gamutMapped()
