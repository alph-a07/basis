package io.github.alph_a07.basis.tokens.theme

import io.github.alph_a07.basis.tokens.color.BasisColorScheme
import io.github.alph_a07.basis.tokens.color.BasisGradient
import io.github.alph_a07.basis.tokens.color.GradientDirection
import io.github.alph_a07.basis.tokens.color.InteractiveColors
import io.github.alph_a07.basis.tokens.color.SurfaceColors
import io.github.alph_a07.basis.tokens.color.gradient
import io.github.alph_a07.basis.tokens.color.toBasisColor
import io.github.alph_a07.basis.tokens.color.toOklch

/**
 * Preset gradient transitioning from the primary interactive color to a secondary tonal hue.
 *
 * The end stop is the interactive hue rotated and desaturated, so the gradient reads as one brand
 * color shifting in temperature rather than as two unrelated colors meeting.
 *
 * @param scheme The color scheme to derive the gradient from.
 * @param direction The direction of the gradient. Defaults to [GradientDirection.Diagonal].
 * @return A [BasisGradient] running from [InteractiveColors.interactive] to its tonal sibling.
 */
fun gradientBrand(
    scheme: BasisColorScheme,
    direction: GradientDirection = GradientDirection.Diagonal,
): BasisGradient {
    val start = scheme.interactive.interactive
    val startOklch = start.toOklch()
    val end = startOklch.rotateHue(30f).withChroma(startOklch.c * 0.75f).toBasisColor()
    return gradient(from = start, to = end, direction = direction)
}

/**
 * Subtle gradient wash preset for hero containers, cards, and header surfaces.
 *
 * Runs from the resting surface to its elevated counterpart, which is a deliberately shallow step —
 * enough to keep a large fill from reading as dead flat, not enough to look like a different surface.
 *
 * @param scheme The color scheme to derive the gradient from.
 * @param direction The direction of the gradient. Defaults to [GradientDirection.Vertical].
 * @return A [BasisGradient] from [SurfaceColors.surface] to [SurfaceColors.surfaceElevated].
 */
fun gradientSurface(
    scheme: BasisColorScheme,
    direction: GradientDirection = GradientDirection.Vertical,
): BasisGradient =
    gradient(from = scheme.surface.surface, to = scheme.surface.surfaceElevated, direction = direction)
