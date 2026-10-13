package io.github.alph_a07.basis.theme.resolution.seed

import io.github.alph_a07.basis.theme.core.color.GradientDirection
import io.github.alph_a07.basis.theme.core.color.OklchGradient
import io.github.alph_a07.basis.theme.core.color.OklchStop
import io.github.alph_a07.basis.theme.resolution.color.safeOklch
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
 * Seeds the color tree for one mode from its dual-mode neutral and status targets.
 *
 * @param targets Neutral lightness and chroma targets for the mode.
 * @param status Status surface lightness targets for the mode.
 * @return A color tree of seed neutrals, status roles, and neutral gradients.
 */
internal fun seedColorTokens(targets: NeutralTargets, status: StatusSeed): ColorTokens {
    val hue = NEUTRAL_HUE_DEGREES
    val surfaceChroma = targets.surfaceC

    return ColorTokens(
        surface =
            SurfaceColors(
                default = safeOklch(targets.surfaceL, surfaceChroma, hue),
                elevated = safeOklch(targets.elevatedL, surfaceChroma, hue),
                recessed = safeOklch(targets.recessedL, surfaceChroma, hue),
                inverse = safeOklch(targets.inverseSurfaceL, surfaceChroma, hue),
            ),
        content =
            ContentColors(
                default = safeOklch(targets.contentL, targets.contentC, hue),
                muted = safeOklch(targets.mutedL, targets.contentC, hue),
                inverse = safeOklch(targets.inverseContentL, targets.contentC, hue),
            ),
        icon =
            IconColors(
                default = safeOklch(targets.contentL, targets.contentC, hue),
                muted = safeOklch(targets.mutedL, targets.contentC, hue),
                inverse = safeOklch(targets.inverseContentL, targets.contentC, hue),
            ),
        border =
            BorderColors(
                default = safeOklch(targets.borderL, targets.borderC, hue),
                muted = safeOklch(targets.borderMutedL, targets.borderC, hue),
                strong = safeOklch(targets.borderStrongL, targets.borderC, hue),
                inverse = safeOklch(targets.inverseContentL, targets.borderC, hue),
            ),
        selection =
            SelectionColors(
                surface = safeOklch(targets.selectionL, targets.selectionC, hue),
                content = safeOklch(targets.selectionContentL, targets.contentC, hue),
                border = safeOklch(targets.borderStrongL, targets.borderC, hue),
            ),
        focus = FocusColors(ring = safeOklch(targets.contentL, FOCUS_RING_CHROMA, hue)),
        positive = seedStatus(status.positiveSurfaceL, status.positiveContentL, POSITIVE_HUE),
        negative = seedStatus(status.negativeSurfaceL, status.negativeContentL, NEGATIVE_HUE),
        caution = seedStatus(status.cautionSurfaceL, status.cautionContentL, CAUTION_HUE),
        info = seedStatus(status.infoSurfaceL, status.infoContentL, INFO_HUE),
        gradient =
            GradientColors(
                brand = flatGradient(targets.selectionL, targets.selectionC, hue),
                surface = flatGradient(targets.surfaceL, surfaceChroma, hue),
            ),
        brand =
            BrandColors(
                primary = safeOklch(targets.contentL, SEED_BRAND_CHROMA, hue),
                secondary = null,
                tertiary = null,
                quaternary = null,
            ),
    )
}

private fun seedStatus(
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

/** Baseline neutral hue shared by non-anchor neutrals, borders, and surfaces, in degrees. */
internal const val NEUTRAL_HUE_DEGREES: Float = 255f

/** Hue of positive status roles, in degrees. */
private const val POSITIVE_HUE: Float = 145f

/** Hue of negative status roles, in degrees. */
private const val NEGATIVE_HUE: Float = 25f

/** Hue of caution status roles, in degrees. */
private const val CAUTION_HUE: Float = 85f

/** Hue of informational status roles, in degrees. */
private const val INFO_HUE: Float = 250f

/** Chroma of a status surface leaf. */
private const val STATUS_SURFACE_CHROMA = 0.05f

/** Chroma of a status content leaf. */
private const val STATUS_CONTENT_CHROMA = 0.13f

/** Chroma of a status border leaf. */
private const val STATUS_BORDER_CHROMA = 0.09f

/** Chroma of the seed focus ring. */
private const val FOCUS_RING_CHROMA = 0.14f

/** Chroma of the seed brand anchor. */
private const val SEED_BRAND_CHROMA = 0.10f
