package io.github.alph_a07.basis.theme.resolution.derive

import io.github.alph_a07.basis.theme.core.color.GradientDirection
import io.github.alph_a07.basis.theme.core.color.Oklch
import io.github.alph_a07.basis.theme.core.color.OklchGradient
import io.github.alph_a07.basis.theme.core.color.OklchStop
import io.github.alph_a07.basis.theme.core.color.gamutMapped
import io.github.alph_a07.basis.theme.core.color.safeOklch
import io.github.alph_a07.basis.theme.core.color.shiftHue
import io.github.alph_a07.basis.theme.resolution.identity.BrandTints
import io.github.alph_a07.basis.theme.tokens.color.BrandColors
import io.github.alph_a07.basis.theme.tokens.color.ColorTokens
import io.github.alph_a07.basis.theme.tokens.color.FocusColors
import io.github.alph_a07.basis.theme.tokens.color.GradientColors

/**
 * Derives the semantic color tree from base neutrals, brand identity and color [weights].
 *
 * @param base Base color tree for the mode.
 * @param neutralHue Warmth-shifted hue shared by non-anchor neutrals.
 * @param brand Brand anchors, or null when no brand color anchors them.
 * @param tints Presence tint strengths in effect, or null when presence is absent.
 * @param weights Mood and structural color multipliers.
 * @return The derived color tree, gamut mapped token by token.
 */
internal fun deriveColorTokens(
    base: ColorTokens,
    neutralHue: Float,
    brand: BrandColors?,
    tints: BrandTints?,
    weights: DerivationWeights,
): ColorTokens {
    val anchor = (brand?.primary ?: base.brand.primary).gamutMapped()
    val surfaces = deriveSurfaces(base.surface, neutralHue, weights, anchor, tints)
    val selectionTint = tints?.selection ?: 0f

    return ColorTokens(
        surface = surfaces,
        content = deriveContents(base.content, surfaces, neutralHue, weights),
        icon = deriveIcons(base.icon, surfaces, neutralHue, weights),
        border = deriveBorders(base.border, neutralHue, weights, anchor, tints),
        selection = deriveSelection(base.selection, surfaces, anchor, neutralHue, weights, selectionTint),
        focus = deriveFocus(anchor, weights),
        positive = deriveStatus(base.positive, weights),
        negative = deriveStatus(base.negative, weights),
        caution = deriveStatus(base.caution, weights),
        info = deriveStatus(base.info, weights),
        gradient = deriveGradients(base, anchor, brand, weights),
        brand = mapBrandGamut(brand ?: base.brand),
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
    base: ColorTokens,
    anchor: Oklch,
    brand: BrandColors?,
    weights: DerivationWeights,
): GradientColors {
    val fallbackHue = anchor.h.shiftHue(BRAND_GRADIENT_ROTATION)
    val second =
        (brand?.secondary ?: anchor.copy(h = fallbackHue))
            .copy(c = anchor.c * weights.accentChromaScale)
            .gamutMapped()

    return GradientColors(
        brand = verticalGradient(anchor, second),
        surface = verticalGradient(base.surface.default, base.surface.elevated),
    )
}

private fun mapBrandGamut(brand: BrandColors): BrandColors {
    val primaryMapped = brand.primary.gamutMapped()
    val secondaryMapped = brand.secondary?.gamutMapped() ?: deriveHarmonicSecondary(primaryMapped)
    val tertiaryMapped = brand.tertiary?.gamutMapped() ?: deriveHarmonicTertiary(primaryMapped)
    val quaternaryMapped = brand.quaternary?.gamutMapped() ?: deriveHarmonicQuaternary(primaryMapped)

    return BrandColors(
        primary = primaryMapped,
        secondary = secondaryMapped,
        tertiary = tertiaryMapped,
        quaternary = quaternaryMapped,
    )
}

private fun deriveHarmonicSecondary(primary: Oklch): Oklch? {
    if (primary.c <= 0.01f) return null
    return primary.copy(h = primary.h.shiftHue(SECONDARY_HUE_OFFSET), c = primary.c * SECONDARY_CHROMA_SCALE)
        .gamutMapped()
}

private fun deriveHarmonicTertiary(primary: Oklch): Oklch? {
    if (primary.c <= 0.01f) return null
    return primary.copy(h = primary.h.shiftHue(TERTIARY_HUE_OFFSET), c = primary.c * TERTIARY_CHROMA_SCALE)
        .gamutMapped()
}

private fun deriveHarmonicQuaternary(primary: Oklch): Oklch? {
    if (primary.c <= 0.01f) return null
    return primary.copy(h = primary.h.shiftHue(QUATERNARY_HUE_OFFSET), c = primary.c * QUATERNARY_CHROMA_SCALE)
        .gamutMapped()
}

private fun deriveFocus(
    anchor: Oklch,
    weights: DerivationWeights,
): FocusColors {
    val chroma = (anchor.c + FOCUS_CHROMA_GAIN * weights.focusEmphasis) * weights.accentChromaScale

    return FocusColors(ring = safeOklch(anchor.l, chroma, anchor.h).gamutMapped())
}

/** Chroma boost applied to the focus ring per unit of focus emphasis. */
private const val FOCUS_CHROMA_GAIN: Float = 0.12f

/** Hue rotation applied to the second brand gradient stop, in degrees. */
private const val BRAND_GRADIENT_ROTATION: Float = 28f

/** Hue rotation for secondary split-complementary/analogous brand accent, in degrees. */
private const val SECONDARY_HUE_OFFSET: Float = 35f

/** Chroma scale for secondary brand accent relative to primary. */
private const val SECONDARY_CHROMA_SCALE: Float = 0.85f

/** Hue rotation for tertiary contrasting brand accent, in degrees. */
private const val TERTIARY_HUE_OFFSET: Float = 135f

/** Chroma scale for tertiary brand accent relative to primary. */
private const val TERTIARY_CHROMA_SCALE: Float = 0.75f

/** Hue rotation for quaternary brand accent, in degrees. */
private const val QUATERNARY_HUE_OFFSET: Float = 70f

/** Chroma scale for quaternary brand accent relative to primary. */
private const val QUATERNARY_CHROMA_SCALE: Float = 0.65f
