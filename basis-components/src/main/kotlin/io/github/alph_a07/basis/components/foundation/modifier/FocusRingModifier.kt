package io.github.alph_a07.basis.components.foundation.modifier

import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.FocusEventModifierNode
import androidx.compose.ui.focus.FocusState
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.graphics.drawOutline
import androidx.compose.ui.graphics.drawscope.ContentDrawScope
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.isSpecified
import androidx.compose.ui.node.CompositionLocalConsumerModifierNode
import androidx.compose.ui.node.DrawModifierNode
import androidx.compose.ui.node.ModifierNodeElement
import androidx.compose.ui.node.currentValueOf
import androidx.compose.ui.node.invalidateDraw
import androidx.compose.ui.platform.InspectorInfo
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import io.github.alph_a07.basis.components.annotation.BasisModifierDoc
import io.github.alph_a07.basis.components.theme.locals.LocalBasisTheme

/**
 * Draws a high-contrast focus ring when the element receives input focus.
 *
 * @param shape Shape of the focus ring outline, typically matching the element's corner radius.
 * @param color Stroke [Color] for the focus ring, defaults to [Color.Unspecified] to read from the ambient theme.
 * @param width Stroke width of the ring in [Dp], defaults to 2.dp.
 * @return Configured [Modifier].
 */
@BasisModifierDoc(
    id = "basis-focus-ring",
    role = "None",
    minTouchTargetDp = 0,
    touchTargetEnforced = false,
    respectsReducedMotion = true,
    sampleCode =
        "Box(\n" +
            "    modifier = Modifier\n" +
            "        .basisFocusRing(shape = BasisTheme.shapes.small)\n" +
            "        .clickable { /* action */ }\n" +
            ") {\n" +
            "    Text(\"Focusable Target\")\n" +
            "}",
)
public fun Modifier.basisFocusRing(
    shape: Shape,
    color: Color = Color.Unspecified,
    width: Dp = 2.dp,
): Modifier = basisModifier() then FocusRingElement(color, width, shape)

/**
 * Conditionally draws a high-contrast focus ring when [visible] is true and the element receives input focus.
 *
 * @param visible Whether the focus ring behavior is enabled.
 * @param shape Shape of the focus ring outline, typically matching the element's corner radius.
 * @param color Stroke [Color] for the focus ring, defaults to [Color.Unspecified] to read from the ambient theme.
 * @param width Stroke width of the ring in [Dp], defaults to 2.dp.
 * @return Configured [Modifier].
 */
public fun Modifier.basisFocusRing(
    visible: Boolean,
    shape: Shape,
    color: Color = Color.Unspecified,
    width: Dp = 2.dp,
): Modifier = if (visible) basisFocusRing(shape = shape, color = color, width = width) else basisModifier()

private data class FocusRingElement(
    val color: Color,
    val width: Dp,
    val shape: Shape,
) : ModifierNodeElement<FocusRingModifierNode>() {

    override fun create(): FocusRingModifierNode = FocusRingModifierNode(color, width, shape)

    override fun update(node: FocusRingModifierNode) {
        node.color = color
        node.width = width
        node.shape = shape

        node.invalidateDraw()
    }

    override fun InspectorInfo.inspectableProperties() {
        name = "basisFocusRing"
        properties["color"] = color
        properties["width"] = width

        properties["shape"] = shape
    }
}

private class FocusRingModifierNode(
    var color: Color,
    var width: Dp,
    var shape: Shape,
) : Modifier.Node(), FocusEventModifierNode, DrawModifierNode, CompositionLocalConsumerModifierNode {

    private var isFocused = false

    override fun onFocusEvent(focusState: FocusState) {
        if (isFocused != focusState.isFocused) {
            isFocused = focusState.isFocused

            invalidateDraw()
        }
    }

    override fun ContentDrawScope.draw() {
        drawContent()

        if (isFocused) {
            val strokeWidthPx = width.toPx()
            val outline = shape.createOutline(size, layoutDirection, this)
            val ringColor =
                if (color.isSpecified) {
                    color
                } else {
                    currentValueOf(LocalBasisTheme)?.colors?.focus?.ring ?: Color.Black
                }

            drawOutline(
                outline = outline,
                color = ringColor,
                style = Stroke(width = strokeWidthPx),
            )
        }
    }
}
