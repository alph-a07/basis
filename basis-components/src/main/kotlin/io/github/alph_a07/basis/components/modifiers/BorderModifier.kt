package io.github.alph_a07.basis.components.modifiers

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.border
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.unit.Dp
import io.github.alph_a07.basis.components.annotation.BasisModifierDoc
import io.github.alph_a07.basis.components.theme.conversion.toDp
import io.github.alph_a07.basis.theme.core.DpValue

/**
 * Applies a border stroke with a specified [color], [width], and [shape].
 *
 * @param width Border thickness in [Dp].
 * @param color Stroke [Color] for the border.
 * @param shape Corner [Shape] conforming to the element.
 * @return Configured [Modifier].
 */
@BasisModifierDoc(
    id = "basis-border",
    role = "None",
    minTouchTargetDp = 0,
    touchTargetEnforced = false,
    respectsReducedMotion = false,
    sampleCode =
        "Box(\n" +
            "    modifier = Modifier\n" +
            "        .basisBorder(\n" +
            "            width = 1.dp,\n" +
            "            color = BasisTheme.colors.border.muted,\n" +
            "            shape = RoundedCornerShape(BasisTheme.radius.level1.toDp())\n" +
            "        )\n" +
            "        .basisPadding(all = BasisTheme.spacing.level2)\n" +
            ") {\n" +
            "    BasicText(\"Bordered Box\")\n" +
            "}",
)
public fun Modifier.basisBorder(
    width: Dp,
    color: Color,
    shape: Shape,
): Modifier = basisModifier().border(BorderStroke(width, color), shape)

/**
 * Applies a border stroke with a specified [border] stroke and [shape].
 *
 * @param border [BorderStroke] defining the stroke width and color or brush.
 * @param shape Corner [Shape] conforming to the element.
 * @return Configured [Modifier].
 */
public fun Modifier.basisBorder(
    border: BorderStroke,
    shape: Shape,
): Modifier = basisModifier().border(border, shape)

/**
 * Applies a border stroke using a token dimension [width], [color], and [shape].
 *
 * @param width Border thickness in [DpValue].
 * @param color Stroke [Color] for the border.
 * @param shape Corner [Shape] conforming to the element.
 * @return Configured [Modifier].
 */
public fun Modifier.basisBorder(
    width: DpValue,
    color: Color,
    shape: Shape,
): Modifier = basisBorder(width.toDp(), color, shape)
