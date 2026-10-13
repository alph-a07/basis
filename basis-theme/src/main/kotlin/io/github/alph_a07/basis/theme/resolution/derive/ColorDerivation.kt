package io.github.alph_a07.basis.theme.resolution.derive

import io.github.alph_a07.basis.theme.core.color.GradientDirection
import io.github.alph_a07.basis.theme.core.color.Oklch
import io.github.alph_a07.basis.theme.core.color.OklchGradient
import io.github.alph_a07.basis.theme.core.color.OklchStop
import io.github.alph_a07.basis.theme.resolution.color.gamutMapped
import io.github.alph_a07.basis.theme.resolution.color.mixOklch
import io.github.alph_a07.basis.theme.resolution.color.safeOklch
import io.github.alph_a07.basis.theme.resolution.color.shiftHue
import io.github.alph_a07.basis.theme.resolution.identity.PresencePlan
import io.github.alph_a07.basis.theme.tokens.color.BorderColors
import io.github.alph_a07.basis.theme.tokens.color.BrandColors
import io.github.alph_a07.basis.theme.tokens.color.ColorTokens
import io.github.alph_a07.basis.theme.tokens.color.ContentColors
import io.github.alph_a07.basis.theme.tokens.color.FocusColors
import io.github.alph_a07.basis.theme.tokens.color.GradientColors
import io.github.alph_a07.basis.theme.tokens.color.IconColors
import io.github.alph_a07.basis.theme.tokens.color.SelectionColors
import io.github.alph_a07.basis.theme.tokens.color.StatusColors
import io.github.alph_a07.basis.theme.tokens.color.SurfaceColors

/**
 * Derives the semantic color tree from seeded neutrals, brand identity and color [modulators].
 *
 * @param seed Seeded color tree for the mode.
 * @param neutralHue Warmth-shifted hue shared by non-anchor neutrals.
 * @param brand Brand anchors, or null when no brand color anchors them.
 * @param plan Presence tint strengths in effect, or null when presence is absent.
 * @param modulators Mood and structural color multipliers.
 * @return The derived color tree, gamut mapped token by token.
 */
internal fun deriveColorTokens(
    seed: ColorTokens,
    neutralHue: Float,
    brand: BrandColors?,
    plan: PresencePlan?,
    modulators: ColorModulators,
): ColorTokens {
    val anchor = (brand?.primary ?: seed.brand.primary).gamutMapped()
    val surfaces = deriveSurfaces(seed.surface, neutralHue, modulators, anchor, plan)
    val selectionTint = plan?.selection ?: 0f

    return ColorTokens(
        surface = surfaces,
        content = deriveContents(seed.content, surfaces, neutralHue, modulators),
        icon = deriveIcons(seed.icon, surfaces, neutralHue, modulators),
        border = deriveBorders(seed.border, neutralHue, modulators, anchor, plan),
        selection = deriveSelection(seed, surfaces, anchor, neutralHue, modulators, selectionTint),
        focus = deriveFocus(anchor, modulators),
        positive = deriveStatus(seed.positive, modulators),
        negative = deriveStatus(seed.negative, modulators),
        caution = deriveStatus(seed.caution, modulators),
        info = deriveStatus(seed.info, modulators),
        gradient = deriveGradients(seed, anchor, brand, modulators),
        brand = mapBrandGamut(brand ?: seed.brand),
    )
}

internal fun verticalGradient(
    from: Oklch,
    to: Oklch,
): OklchGradient = OklchGradient(
    stops = listOf(OklchStop(from, 0f), OklchStop(to, 1f)),
    direction = GradientDirection.Vertical,
)

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

internal fun deriveSelection(
    seed: ColorTokens,
    surfaces: SurfaceColors,
    anchor: Oklch,
    neutralHue: Float,
    modulators: ColorModulators,
    tint: Float,
): SelectionColors = SelectionColors(
    surface = mix(seed.selection.surface, anchor, tint),
    content = scaleContent(seed.selection.content, surfaces.default.l, neutralHue, modulators),
    border = mix(seed.selection.border, anchor, tint),
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

private fun deriveGradients(
    seed: ColorTokens,
    anchor: Oklch,
    brand: BrandColors?,
    modulators: ColorModulators,
): GradientColors {
    val fallbackHue = anchor.h.shiftHue(BRAND_GRADIENT_ROTATION)
    val second =
        (brand?.secondary ?: anchor.copy(h = fallbackHue))
            .copy(c = anchor.c * modulators.accentChromaScale)
            .gamutMapped()

    return GradientColors(
        brand = verticalGradient(anchor, second),
        surface = verticalGradient(seed.surface.default, seed.surface.elevated),
    )
}

private fun mapBrandGamut(brand: BrandColors): BrandColors = brand.copy(
    primary = brand.primary.gamutMapped(),
    secondary = brand.secondary?.gamutMapped(),
    tertiary = brand.tertiary?.gamutMapped(),
    quaternary = brand.quaternary?.gamutMapped(),
)

private fun deriveFocus(
    anchor: Oklch,
    modulators: ColorModulators,
): FocusColors {
    val chroma = (anchor.c + FOCUS_CHROMA_GAIN * modulators.focusEmphasis) * modulators.accentChromaScale

    return FocusColors(ring = safeOklch(anchor.l, chroma, anchor.h).gamutMapped())
}

/** Applies the neutral chroma scale and the warmth hue shift. */
private fun neutral(color: Oklch, neutralHue: Float, modulators: ColorModulators): Oklch = safeOklch(
    l = color.l,
    c = color.c * modulators.neutralChromaScale,
    h = neutralHue,
    a = color.a,
)

/**
 * Scales a content color token against the surface it is read on.
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

private fun mix(color: Oklch, anchor: Oklch, amount: Float): Oklch = mixOklch(color, anchor, amount).gamutMapped()

private fun tint(color: Oklch, anchor: Oklch, amount: Float): Oklch = mix(color, anchor, amount)

/** Chroma boost applied to the focus ring per unit of focus emphasis. */
private const val FOCUS_CHROMA_GAIN: Float = 0.12f

/** Hue rotation applied to the second brand gradient stop, in degrees. */
private const val BRAND_GRADIENT_ROTATION: Float = 28f
