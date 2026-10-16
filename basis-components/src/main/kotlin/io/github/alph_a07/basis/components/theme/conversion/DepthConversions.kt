package io.github.alph_a07.basis.components.theme.conversion

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.Dp
import io.github.alph_a07.basis.theme.tokens.scalars.DepthSpec

/**
 * Extracts the elevation from this [DepthSpec] as a Compose [Dp].
 *
 * @return Elevation in [Dp].
 */
public fun DepthSpec.toElevationDp(): Dp = elevation.toDp()

/**
 * Computes a shadow [Color] derived from [baseColor] scaled by [DepthSpec.shadowAlpha].
 *
 * @param baseColor Base color to tint the shadow with, defaults to black.
 * @return Shadow color with modulated alpha.
 */
public fun DepthSpec.toShadowColor(baseColor: Color = Color.Black): Color =
    baseColor.copy(alpha = shadowAlpha * baseColor.alpha)
