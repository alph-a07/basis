package io.github.alph_a07.basis.components.modifiers

import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.Measurable
import androidx.compose.ui.layout.MeasureResult
import androidx.compose.ui.layout.MeasureScope
import androidx.compose.ui.node.CompositionLocalConsumerModifierNode
import androidx.compose.ui.node.LayoutModifierNode
import androidx.compose.ui.node.ModifierNodeElement
import androidx.compose.ui.node.currentValueOf
import androidx.compose.ui.platform.InspectorInfo
import androidx.compose.ui.unit.Constraints
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.isSpecified
import io.github.alph_a07.basis.components.annotation.BasisModifierDoc
import io.github.alph_a07.basis.components.theme.BasisTheme
import io.github.alph_a07.basis.components.theme.conversion.toDp
import io.github.alph_a07.basis.components.theme.locals.LocalBasisTheme
import io.github.alph_a07.basis.theme.core.DpValue
import io.github.alph_a07.basis.theme.intent.controls.ConstraintsControl
import kotlin.math.max

private val DEFAULT_MIN_TOUCH_TARGET_DP: Dp = 48.dp

/**
 * Enforces a minimum accessible touch target size on the modified element without altering visual size.
 *
 * When [min] is unspecified ([Dp.Unspecified]), the minimum target dimension is driven by
 * [ConstraintsControl.minTouchTarget] from the ambient theme via [BasisTheme.minTouchTarget],
 * falling back to `48.dp` if no constraint was configured.
 *
 * @param min Minimum touch target dimension in [Dp], defaults to [Dp.Unspecified] to follow theme constraints.
 * @return Configured [Modifier].
 */
@BasisModifierDoc(
    id = "basis-min-touch-target",
    role = "None",
    minTouchTargetDp = 48,
    touchTargetEnforced = true,
    respectsReducedMotion = false,
    sampleCode =
        "Box(\n" +
            "    modifier = Modifier\n" +
            "        .size(24.dp)\n" +
            "        .basisMinTouchTarget()\n" +
            "        .basisClickable { /* action */ }\n" +
            ") {\n" +
            "    Icon(Icons.Default.Close, contentDescription = \"Close\")\n" +
            "}",
)
public fun Modifier.basisMinTouchTarget(min: Dp = Dp.Unspecified): Modifier =
    basisModifier() then TouchTargetElement(min)

/**
 * Enforces a minimum accessible touch target size on the modified element using a Basis token dimension.
 *
 * @param min Minimum touch target dimension in [DpValue].
 * @return Configured [Modifier].
 */
public fun Modifier.basisMinTouchTarget(min: DpValue): Modifier = basisMinTouchTarget(min.toDp())

private data class TouchTargetElement(
    val min: Dp,
) : ModifierNodeElement<TouchTargetModifierNode>() {

    override fun create(): TouchTargetModifierNode = TouchTargetModifierNode(min)

    override fun update(node: TouchTargetModifierNode) {
        node.minSize = min
    }

    override fun InspectorInfo.inspectableProperties() {
        name = "basisMinTouchTarget"

        properties["min"] = min
    }
}

private class TouchTargetModifierNode(
    var minSize: Dp,
) : Modifier.Node(), LayoutModifierNode, CompositionLocalConsumerModifierNode {

    override fun MeasureScope.measure(
        measurable: Measurable,
        constraints: Constraints,
    ): MeasureResult {
        val placeable = measurable.measure(constraints)
        val resolvedMin =
            if (minSize.isSpecified) {
                minSize
            } else {
                currentValueOf(LocalBasisTheme)?.constraints?.minTouchTarget?.minSize?.toDp()
                    ?: DEFAULT_MIN_TOUCH_TARGET_DP
            }
        val minPx = resolvedMin.roundToPx()
        val targetWidth = max(placeable.width, minPx).coerceIn(constraints.minWidth, constraints.maxWidth)
        val targetHeight = max(placeable.height, minPx).coerceIn(constraints.minHeight, constraints.maxHeight)

        val x = (targetWidth - placeable.width) / 2
        val y = (targetHeight - placeable.height) / 2

        return layout(targetWidth, targetHeight) {
            placeable.place(x, y)
        }
    }
}
