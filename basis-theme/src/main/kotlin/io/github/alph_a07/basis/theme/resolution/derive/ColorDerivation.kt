package io.github.alph_a07.basis.theme.resolution.derive

import io.github.alph_a07.basis.theme.core.color.GradientDirection
import io.github.alph_a07.basis.theme.core.color.Oklch
import io.github.alph_a07.basis.theme.core.color.OklchGradient
import io.github.alph_a07.basis.theme.core.color.OklchStop
import io.github.alph_a07.basis.theme.core.color.gamutMapped
import io.github.alph_a07.basis.theme.core.color.safeOklch
import io.github.alph_a07.basis.theme.core.color.shiftHue
import io.github.alph_a07.basis.theme.resolution.identity.PresencePlan
import io.github.alph_a07.basis.theme.tokens.color.BrandColors
import io.github.alph_a07.basis.theme.tokens.color.ColorTokens
import io.github.alph_a07.basis.theme.tokens.color.FocusColors
import io.github.alph_a07.basis.theme.tokens.color.GradientColors

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
        selection = seed.deriveSelection(surfaces, anchor, neutralHue, modulators, selectionTint),
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

/** Chroma boost applied to the focus ring per unit of focus emphasis. */
private const val FOCUS_CHROMA_GAIN: Float = 0.12f

/** Hue rotation applied to the second brand gradient stop, in degrees. */
private const val BRAND_GRADIENT_ROTATION: Float = 28f
