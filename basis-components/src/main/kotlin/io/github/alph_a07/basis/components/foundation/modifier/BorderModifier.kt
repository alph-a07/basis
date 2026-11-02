package io.github.alph_a07.basis.components.foundation.modifier

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.border
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.unit.Dp

/**
 * Applies a border stroke with a specified [color], [width], and [shape].
 *
 * @param width Border thickness in [Dp].
 * @param color Stroke [Color] for the border.
 * @param shape Corner [Shape] conforming to the element.
 * @return Configured [Modifier].
 */
public fun Modifier.basisBorder(
    width: Dp,
    color: Color,
    shape: Shape,
): Modifier = basisModifier().border(BorderStroke(width, color), shape)
