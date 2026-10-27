package io.github.alph_a07.basis.theme.resolution.base

import io.github.alph_a07.basis.theme.core.color.GradientDirection
import io.github.alph_a07.basis.theme.core.color.OklchGradient
import io.github.alph_a07.basis.theme.core.color.OklchStop
import io.github.alph_a07.basis.theme.core.color.safeOklch
import io.github.alph_a07.basis.theme.resolution.constants.BASE_BRAND_CHROMA
import io.github.alph_a07.basis.theme.resolution.constants.BaseStatus
import io.github.alph_a07.basis.theme.resolution.constants.CAUTION_HUE
import io.github.alph_a07.basis.theme.resolution.constants.FOCUS_RING_CHROMA
import io.github.alph_a07.basis.theme.resolution.constants.INFO_HUE
import io.github.alph_a07.basis.theme.resolution.constants.NEGATIVE_HUE
import io.github.alph_a07.basis.theme.resolution.constants.NEUTRAL_HUE_DEGREES
import io.github.alph_a07.basis.theme.resolution.constants.POSITIVE_HUE
import io.github.alph_a07.basis.theme.resolution.constants.STATUS_BORDER_CHROMA
import io.github.alph_a07.basis.theme.resolution.constants.STATUS_CONTENT_CHROMA
import io.github.alph_a07.basis.theme.resolution.constants.STATUS_SURFACE_CHROMA
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
 * Initializes the base color tree for one mode from its dual-mode neutral and status targets.
 *
 * @param targets Neutral lightness and chroma targets for the mode.
 * @param status Status surface lightness targets for the mode.
 * @param deriveColors Whether the pipeline derives colors from available signals.
 * @param hue Neutral hue in degrees when [deriveColors] is true.
 * @param chroma Synthesized chroma targets across color token role axes.
 * @return A color tree of base neutrals, status roles, and neutral gradients.
 */
internal fun baseColorTokens(
    targets: NeutralTargets,
    status: BaseStatus,
    deriveColors: Boolean = true,
    hue: Float = NEUTRAL_HUE_DEGREES,
    chroma: SynthesizedChroma? = null,
): ColorTokens {
    val effectiveHue = if (deriveColors) hue else NEUTRAL_HUE_DEGREES
    val chromas = resolveEffectiveChromas(deriveColors, chroma, targets)

    return ColorTokens(
        surface = baseSurfaceColors(targets, chromas.surface, effectiveHue),
        content = baseContentColors(targets, chromas.content, effectiveHue),
        icon = baseIconColors(targets, chromas.icon, effectiveHue),
        border = baseBorderColors(targets, chromas.border, effectiveHue),
        selection = baseSelectionColors(targets, chromas.selection, chromas.content, chromas.border, effectiveHue),
        focus = FocusColors(ring = safeOklch(targets.contentL, chromas.focus, effectiveHue)),
        positive = baseStatus(status.positiveSurfaceL, status.positiveContentL, POSITIVE_HUE),
        negative = baseStatus(status.negativeSurfaceL, status.negativeContentL, NEGATIVE_HUE),
        caution = baseStatus(status.cautionSurfaceL, status.cautionContentL, CAUTION_HUE),
        info = baseStatus(status.infoSurfaceL, status.infoContentL, INFO_HUE),
        gradient =
            GradientColors(
                brand = flatGradient(targets.selectionL, chromas.selection, effectiveHue),
                surface = flatGradient(targets.surfaceL, chromas.surface, effectiveHue),
            ),
        brand =
            BrandColors(
                primary = safeOklch(targets.contentL, chromas.brand, effectiveHue),
                secondary = null,
                tertiary = null,
                quaternary = null,
            ),
    )
}

private fun resolveEffectiveChromas(
    deriveColors: Boolean,
    chroma: SynthesizedChroma?,
    targets: NeutralTargets,
): SynthesizedChroma =
    if (!deriveColors) {
        SynthesizedChroma(0f, 0f, 0f, 0f, 0f, 0f, 0f)
    } else {
        SynthesizedChroma(
            surface = chroma?.surface ?: targets.surfaceC,
            content = chroma?.content ?: targets.contentC,
            icon = chroma?.icon ?: targets.contentC,
            border = chroma?.border ?: targets.borderC,
            selection = chroma?.selection ?: targets.selectionC,
            focus = chroma?.focus ?: FOCUS_RING_CHROMA,
            brand = chroma?.brand ?: BASE_BRAND_CHROMA,
        )
    }

private fun baseSurfaceColors(targets: NeutralTargets, chroma: Float, hue: Float): SurfaceColors =
    SurfaceColors(
        default = safeOklch(targets.surfaceL, chroma, hue),
        elevated = safeOklch(targets.elevatedL, chroma, hue),
        recessed = safeOklch(targets.recessedL, chroma, hue),
        inverse = safeOklch(targets.inverseSurfaceL, chroma, hue),
    )

private fun baseContentColors(targets: NeutralTargets, chroma: Float, hue: Float): ContentColors =
    ContentColors(
        default = safeOklch(targets.contentL, chroma, hue),
        muted = safeOklch(targets.mutedL, chroma, hue),
        inverse = safeOklch(targets.inverseContentL, chroma, hue),
    )

private fun baseIconColors(targets: NeutralTargets, chroma: Float, hue: Float): IconColors =
    IconColors(
        default = safeOklch(targets.contentL, chroma, hue),
        muted = safeOklch(targets.mutedL, chroma, hue),
        inverse = safeOklch(targets.inverseContentL, chroma, hue),
    )

private fun baseBorderColors(targets: NeutralTargets, chroma: Float, hue: Float): BorderColors =
    BorderColors(
        default = safeOklch(targets.borderL, chroma, hue),
        muted = safeOklch(targets.borderMutedL, chroma, hue),
        strong = safeOklch(targets.borderStrongL, chroma, hue),
        inverse = safeOklch(targets.inverseContentL, chroma, hue),
    )

private fun baseSelectionColors(
    targets: NeutralTargets,
    selectionChroma: Float,
    contentChroma: Float,
    borderChroma: Float,
    hue: Float,
): SelectionColors =
    SelectionColors(
        surface = safeOklch(targets.selectionL, selectionChroma, hue),
        content = safeOklch(targets.selectionContentL, contentChroma, hue),
        border = safeOklch(targets.borderStrongL, borderChroma, hue),
    )

private fun baseStatus(
    surfaceL: Float,
    contentL: Float,
    hue: Float,
): StatusColors = StatusColors(
    surface = safeOklch(surfaceL, STATUS_SURFACE_CHROMA, hue),
    content = safeOklch(contentL, STATUS_CONTENT_CHROMA, hue),
    border = safeOklch(contentL, STATUS_BORDER_CHROMA, hue),
    icon = safeOklch(contentL, STATUS_CONTENT_CHROMA, hue),
)

private fun flatGradient(
    lightness: Float,
    chroma: Float,
    hue: Float,
): OklchGradient {
    val color = safeOklch(lightness, chroma, hue)

    return OklchGradient(
        stops = listOf(OklchStop(color, 0f), OklchStop(color, 1f)),
        direction = GradientDirection.Vertical,
    )
}
