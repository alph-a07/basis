package io.github.alph_a07.basis.tokens.theme

import io.github.alph_a07.basis.tokens.color.BasisColorScheme
import io.github.alph_a07.basis.tokens.color.BasisGradient
import io.github.alph_a07.basis.tokens.color.GradientDirection
import io.github.alph_a07.basis.tokens.color.gradient
import io.github.alph_a07.basis.tokens.color.toBasisColor
import io.github.alph_a07.basis.tokens.color.toOklch
import io.github.alph_a07.basis.tokens.color.InteractiveColors
import io.github.alph_a07.basis.tokens.color.SurfaceColors

/**
 * Preset: a subtle wash from [InteractiveColors.interactive] to a rotated hue with reduced chroma.
 * @param scheme The color scheme to derive the gradient from.
 * @param direction The direction of the gradient. Defaults to diagonal.
 * @return A [BasisGradient] representing the brand gradient.
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

/** Preset: a subtle wash from [SurfaceColors.surface] to [SurfaceColors.surfaceElevated].
 * @param scheme The color scheme to derive the gradient from.
 * @param direction The direction of the gradient. Defaults to vertical.
 * @return A [BasisGradient] representing the surface gradient.
 */
fun gradientSurface(
    scheme: BasisColorScheme,
    direction: GradientDirection = GradientDirection.Vertical,
): BasisGradient =
    gradient(from = scheme.surface.surface, to = scheme.surface.surfaceElevated, direction = direction)